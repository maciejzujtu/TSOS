import type { AccessTokenCredentials, AuthContext } from '@/core/auth'

export interface SignRequestOptions {
    token?: AccessTokenCredentials
    callback?: string
    useContextToken?: boolean
}

function encode(value: string): string {
    return encodeURIComponent(value).replace(
        /[!'()*]/g,
        character =>
        `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
    )
}

export class OAuth1Signer {
    public createHeader(
        auth: Exclude<AuthContext, { kind: "anonymous" }>,
        options: SignRequestOptions = {},
    ): string {
        const contextToken = options.useContextToken === false
            ? undefined
            : auth.kind === "user"
                ? auth.accessToken
                : undefined
        const token = options.token ?? contextToken
        const signature = `${encode(auth.consumer.secret)}&` + encode(token?.secret ?? "")

        const values: Record<string, string> = {
            oauth_consumer_key: auth.consumer.key,
            oauth_signature_method: "PLAINTEXT",
            oauth_signature: signature,
            oauth_timestamp: String(Math.floor(Date.now() / 1000)),
            oauth_nonce: crypto.randomUUID(),
            oauth_version: "1.0",
        }

        if (token) {
            values.oauth_token = token.token
        }

        if (options.callback) {
            values.oauth_callback = options.callback
        }

        return `OAuth ${Object.entries(values)
            .map(([key, value]) => `${encode(key)}="${encode(value)}"`)
            .join(", ")}`
    }
}
