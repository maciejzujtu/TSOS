import type { AccessTokenCredentials, ConsumerCredentials } from '@/core/auth'

export interface BaseClientOptions {
    baseUrl: string | URL
    fetch?: typeof globalThis.fetch
    /** Default timeout for requests made through this client, in milliseconds. */
    timeoutMs?: number
}

export interface ClientOptions extends BaseClientOptions {
    consumer?: ConsumerCredentials
}

export interface UserClientOptions extends BaseClientOptions {
    consumer: ConsumerCredentials
    accessToken: AccessTokenCredentials
}

export interface AdminClientOptions extends BaseClientOptions {
    consumer: ConsumerCredentials
}
