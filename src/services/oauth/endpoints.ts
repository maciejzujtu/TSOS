import type { EndpointDefinition } from '@/core/endpoint'
import type {
    AccessTokenParams,
    AuthorizeParams,
    OAuthAccessTokenResponse,
    OAuthProxyParams,
    OAuthRequestTokenResponse,
    OAuthSuccess,
    RequestTokenParams,
    RevokeConsumerKeyParams,
    RevokeTokenParams,
} from '@/services/oauth/types'

export interface OAuthEndpoints {
    accessToken: EndpointDefinition<AccessTokenParams, OAuthAccessTokenResponse>
    authorize: EndpointDefinition<AuthorizeParams, never>
    proxy: EndpointDefinition<OAuthProxyParams, unknown>
    requestToken: EndpointDefinition<RequestTokenParams, OAuthRequestTokenResponse>
    revokeConsumerKey: EndpointDefinition<RevokeConsumerKeyParams, OAuthSuccess>
    revokeToken: EndpointDefinition<RevokeTokenParams, OAuthSuccess>
}

export const oauthEndpoints: OAuthEndpoints = {
    accessToken: {
        path: "services/oauth/access_token",
        method: "POST",
        response: "form",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
        },
    },
    authorize: {
        path: "services/oauth/authorize",
        method: "GET",
        response: "text",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: false,
        },
    },
    proxy: {
        path: "services/oauth/proxy",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: false,
        },
    },
    requestToken: {
        path: "services/oauth/request_token",
        method: "POST",
        response: "form",
        auth: {
            consumer: "required",
            token: "ignored",
            sslRequired: true,
        },
    },
    revokeConsumerKey: {
        path: "services/oauth/revoke_consumer_key",
        method: "POST",
        response: "json",
        auth: {
            consumer: "optional",
            token: "ignored",
            sslRequired: false,
        },
    },
    revokeToken: {
        path: "services/oauth/revoke_token",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
        },
    },
}
