import { AuthProvider, Module, Requests, Responses } from "@/globals";
import { ACCESS_TOKEN, OAUTH, REQUEST_TOKEN, RequestTokenScopes } from "@/interfaces/oauth";

export class OAuth {
    constructor(private api: AuthProvider) { }

    // /services/oauth/request_token
    public async getRequestToken(callback: string, scopes?: RequestTokenScopes[]): Promise<REQUEST_TOKEN> {
        const authHeader = await this.api.getAuthorizationHeader(undefined, undefined, callback)
        const params: Record<string, string> = { oauth_callback: callback }
        if (scopes && scopes.length > 0) {
            params.scopes = scopes.join('|')
        }

        const response = await this.api.POST_TEXT<typeof OAUTH>(
            OAUTH,
            "REQUEST_TOKEN",
            { 'Authorization': authHeader, 'Accept': 'text/plain' },
            params
        )

        const searchParams = new URLSearchParams(response)
        const oauth_token = searchParams.get('oauth_token')
        const oauth_token_secret = searchParams.get('oauth_token_secret')
        const oauth_callback_confirmed = searchParams.get('oauth_callback_confirmed')

        if (!oauth_token || !oauth_token_secret) {
            throw new Error(`Failed to parse request token.\n\n${response}`)
        }

        return {
            oauth_token,
            oauth_token_secret,
            oauth_callback_confirmed: oauth_callback_confirmed == 'true' ? true : false
        }
    }

    // /services/oauth/authorize
    // But it doesn't really need a HTTP call
    public getAuthorizeUrl(requestToken: string, interactivity?: "minimal" | "confirm_user"): string {
        const url = new URL(OAUTH.AUTHORIZE, this.api.url)
        url.searchParams.append("oauth_token", requestToken)
        if (interactivity) { url.searchParams.append("interactivity", interactivity) }
        return url.toString()
    }

    // /services/oauth/access_token
    public async getAccessToken(requestToken: string, requestTokenSecret: string, verifier: string): Promise<ACCESS_TOKEN> {
        const authHeader = await this.api.getAuthorizationHeader(requestToken, requestTokenSecret)
        const params: Record<string, string> = { oauth_verifier: verifier }
        const response = await this.api.POST_TEXT<typeof OAUTH>(
            OAUTH,
            "ACCESS_TOKEN",
            { 'Authorization': authHeader, 'Accept': 'text/plain' },
            params
        )
        const searchParams = new URLSearchParams(response)
        const oauth_token = searchParams.get('oauth_token')
        const oauth_token_secret = searchParams.get('oauth_token_secret')

        if (!oauth_token || !oauth_token_secret) {
            throw new Error(`Failed to parse access token.\n\n${response}`)
        }

        return {
            oauth_token,
            oauth_token_secret,
        }
    }

    // /services/oauth/proxy
    public async proxy<M extends Module, K extends keyof M>(
        module: M,
        method: K,
        parameters?: K extends keyof Requests ? Requests[K] : Record<string, any>,
        scopes?: RequestTokenScopes[] | "all",
        accessToken?: string,
        accessTokenSecret?: string
    ): Promise<K extends keyof Responses ? Responses[K] : any> {
        const authHeader = await this.api.getAuthorizationHeader(accessToken, accessTokenSecret)
        const name = String(module[method])
        const params: Record<string, string> = { method: name }

        if (parameters && Object.keys(parameters).length > 0) {
            const parsedParams = { ...parameters } as Record<string, any>
            for (const key in parsedParams) {
                if (Array.isArray(parsedParams[key])) {
                    parsedParams[key] = parsedParams[key].join('|')
                }
            }
            params.parameters = JSON.stringify(parsedParams)
        }

        if (scopes) {
            params.scopes = scopes === "all" ? "all" : scopes.join('|')
        }

        return await this.api.POST<typeof OAUTH, any>(
            OAUTH,
            "PROXY",
            { 'Authorization': authHeader },
            params
        )
    }
}