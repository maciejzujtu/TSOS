import { University, Module } from "@/globals"

/**
 * @description Multi-purpose API wrapper for USOS API endpoint connections.
 */
export class Wrapper {
    public uni: University
    public url: URL
    public consumerKey: string
    protected consumerSecret: string
    protected headers: HeadersInit

    constructor(uni: University, consumerKey: string, consumerSecret: string) {
        this.uni = uni
        this.url = new URL(`https://${uni}`)
        this.consumerKey = consumerKey
        this.consumerSecret = consumerSecret
        this.headers = {}
    }

    protected async __buildFetch<M extends Module>(
        module: M,
        method: keyof M,
        type: "POST" | "GET",
        headers: HeadersInit = {},
        params?: Record<string, string>,
        body?: any
    ): Promise<Response> {
        const endpoint = module[method] as string
        const url = new URL(endpoint.replace(/^\//, ''), this.url)

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value)
            })
        }

        const requestHeaders: Record<string, string> = {
            'Accept': 'application/json',
            ...(this.headers as Record<string, string>),
            ...(headers as Record<string, string>),
        }

        let requestBody: string | undefined = undefined
        if (body) {
            requestHeaders['Content-Type'] = 'application/json'
            requestBody = JSON.stringify(body)
        }

        return await fetch(url, {
            method: type,
            headers: requestHeaders,
            body: requestBody
        })
    }

    public async POST<M extends Module, T = any>(
        module: M,
        method: keyof M,
        headers?: HeadersInit,
        params?: Record<string, string>
    ): Promise<T> {
        const response = await this.__buildFetch(module, method, "POST", headers, params)
        if (!response.ok) {
            const errorText = await response.text().catch(() => response.statusText)
            throw new Error(`POST ${String(module[method])} failed (${response.status}):\n${errorText}`)
        }
        return await response.json() as T
    }

    public async GET<M extends Module, T = any>(
        module: M,
        method: keyof M,
        headers?: HeadersInit,
        params?: Record<string, string>
    ): Promise<T> {
        const response = await this.__buildFetch(module, method, "GET", headers, params)
        if (!response.ok) {
            const errorText = await response.text().catch(() => response.statusText)
            throw new Error(`GET ${String(module[method])} failed (${response.status}):\n${errorText}`)
        }
        return await response.json() as T
    }

    public async GET_TEXT<M extends Module>(
        module: M,
        method: keyof M,
        headers?: HeadersInit,
        params?: Record<string, string>
    ): Promise<string> {
        const response = await this.__buildFetch(module, method, "GET", headers, params)
        if (!response.ok) {
            const errorText = await response.text().catch(() => response.statusText)
            throw new Error(`GET ${String(module[method])} failed (${response.status}):\n${errorText}`)
        }
        return await response.text()
    }

    public async POST_TEXT<M extends Module>(
        module: M,
        method: keyof M,
        headers?: HeadersInit,
        params?: Record<string, string>
    ): Promise<string> {
        const response = await this.__buildFetch(module, method, "POST", headers, params)
        if (!response.ok) {
            const errorText = await response.text().catch(() => response.statusText)
            throw new Error(`POST ${String(module[method])} failed (${response.status}):\n${errorText}`)
        }
        return await response.text()
    }
}
