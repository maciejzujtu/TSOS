import type { AccessTokenCredentials } from '@/core/auth'
import type { AnyEndpoint, ParamsOf, ResultOf } from '@/core/endpoint'
import type { RequestExecutor } from '@/core/requester'
import { oauthEndpoints } from '@/services/oauth/endpoints'
import type {
    OAuthAccessToken,
    OAuthInteractivity,
    OAuthProxyOptions,
    OAuthRequestToken,
    OAuthSuccess,
    RequestTokenScope,
    RevokeConsumerKeyOptions,
} from '@/services/oauth/types'

function serializeProxyParameters(parameters: unknown): string | undefined {
    if (!parameters || typeof parameters !== "object") {
        return undefined
    }

    const serialized: Record<string, string> = {}

    for (const [key, value] of Object.entries(parameters)) {
        if (value === undefined || value === null) {
            continue
        }

        if (Array.isArray(value)) {
            serialized[key] = value.map(String).join("|")
            continue
        }

        serialized[key] = typeof value === "object"
            ? JSON.stringify(value)
            : String(value)
    }

    return Object.keys(serialized).length > 0
        ? JSON.stringify(serialized)
        : undefined
}

export class OAuthService {
    public constructor(private readonly request: RequestExecutor) {}

    public async getRequestToken(
        callback: string,
        scopes?: readonly RequestTokenScope[],
    ): Promise<OAuthRequestToken> {
        const response = await this.request.request(oauthEndpoints.requestToken, {
            params: {
                oauth_callback: callback,
                scopes,
            },
            oauthCallback: callback,
        })

        if (!response.oauth_token || !response.oauth_token_secret) {
            throw new Error("Failed to parse OAuth Request Token response")
        }

        return {
            oauth_token: response.oauth_token,
            oauth_token_secret: response.oauth_token_secret,
            oauth_callback_confirmed: response.oauth_callback_confirmed === "true",
        }
    }

    public getAuthorizeUrl(
        requestToken: string,
        interactivity?: OAuthInteractivity,
    ): string {
        const url = new URL(oauthEndpoints.authorize.path, this.request.baseUrl)
        url.searchParams.set("oauth_token", requestToken)

        if (interactivity) {
            url.searchParams.set("interactivity", interactivity)
        }

        return url.toString()
    }

    public async getAccessToken(
        requestToken: string,
        requestTokenSecret: string,
        verifier: string,
    ): Promise<OAuthAccessToken> {
        const response = await this.request.request(oauthEndpoints.accessToken, {
            params: { oauth_verifier: verifier },
            token: {
                token: requestToken,
                secret: requestTokenSecret,
            },
        })

        if (!response.oauth_token || !response.oauth_token_secret) {
            throw new Error("Failed to parse OAuth Access Token response")
        }

        return {
            oauth_token: response.oauth_token,
            oauth_token_secret: response.oauth_token_secret,
        }
    }

    public async proxy<Endpoint extends AnyEndpoint>(
        endpoint: Endpoint,
        options: OAuthProxyOptions<ParamsOf<Endpoint>> = {},
    ): Promise<ResultOf<Endpoint>> {
        const scopes = options.scopes === "all"
            ? "all"
            : options.scopes?.join("|")

        const response = await this.request.request(oauthEndpoints.proxy, {
            params: {
                method: endpoint.path,
                parameters: serializeProxyParameters(options.parameters),
                scopes,
                as_user_id: options.asUserId,
            },
            token: options.accessToken,
        })

        return response as ResultOf<Endpoint>
    }

    public async revokeConsumerKey(
        options: RevokeConsumerKeyOptions = {},
    ): Promise<OAuthSuccess> {
        return await this.request.request(oauthEndpoints.revokeConsumerKey, {
            params: {
                consumer_key: options.consumerKey,
                consumer_secret: options.consumerSecret,
                callback: options.callback,
            },
        })
    }

    public async revokeToken(
        deauthorize = false,
        accessToken?: AccessTokenCredentials,
    ): Promise<OAuthSuccess> {
        return await this.request.request(oauthEndpoints.revokeToken, {
            params: { deauthorize },
            token: accessToken,
        })
    }
}
