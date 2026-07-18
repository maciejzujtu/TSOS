import { BaseURL, Module } from "@/globals"
import { APISRV, APIREF } from "@/globals"
import { MOBILE_USOS_CONFIG } from "@/services/apisrv"

/**
 * @description Multi-purpose API wrapper for all of the endpoint connections for our USOS app.
 * You can think of it as 'fetch' but as a class and more tailored for this API and you'd be right
 */

export class Wrapper {
    private url: URL
    protected consumerKey: string
    protected consumerSecret: string
    protected headers: HeadersInit

    constructor(base: BaseURL, consumerKey: string, consumerSecret: string) {
        this.url = new URL(`https://${base}`)
        this.consumerKey = consumerKey
        this.consumerSecret = consumerSecret
        this.headers = {}
    }    

    private async __buildFetch<M extends Module>(module: M, method: keyof M, type: "POST" | "GET", headers: HeadersInit = this.headers, params?: Record<string, string>) {
        const endpoint = module[method] as string
        const url = new URL(endpoint, this.url)

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        return await fetch(url, {
            method: type,
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                ...headers
            }
        })
    }
    
    protected async POST<M extends Module, T = any>(module: M, method: keyof M, headers: HeadersInit = this.headers, params?: Record<string, string>): Promise<T> {
        try {
            const response = await this.__buildFetch(module, method, "POST", headers, params);
            if (!response.ok) {
                throw new Error("Response is not valid\n\n" + response)
            }
            return await response.json() as T
        } catch (err) { 
            throw new Error("Failed to send POST request\n\n" + err) 
        }
    }

    protected async GET<M extends Module, T = any>(module: M, method: keyof M, headers: HeadersInit = this.headers, params?: Record<string, string>): Promise<T> {
        try {
            const response = await this.__buildFetch(module, method, "GET", headers, params)
            if (!response.ok) { 
                throw new Error("Response is not valid\n\n" + response) 
            }
            return await response.json() as T
        } catch (err) {
            throw new Error("Failed to retrieve response\n\n" + err)
        }
    }
}