export interface ConsumerCredentials {
    key: string
    secret: string
}

export interface AccessTokenCredentials {
    token: string
    secret: string
}

export type AnonymousAuth = {
    kind: "anonymous"
}

export type ConsumerAuth = {
    kind: "consumer"
    consumer: ConsumerCredentials
}

export type UserAuth = {
    kind: "user"
    consumer: ConsumerCredentials
    accessToken: AccessTokenCredentials
}

export type AdminAuth = {
    kind: "admin"
    consumer: ConsumerCredentials
}

export type AuthContext =
    | AnonymousAuth
    | ConsumerAuth
    | UserAuth
    | AdminAuth