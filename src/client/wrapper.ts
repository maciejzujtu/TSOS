import { JAGIELLONIAN_UNIVERSITY, Modules, University } from '@'

export class Wrapper {
    public university: University
    public url: URL
    protected consumerKey: string
    protected consumerSecret: string
    protected headers: HeadersInit

    constructor(university: University, consumerKey: string, consumerSecret: string) {
        this.university = university
        this.url = new URL(`https://${university}`)
        this.consumerKey = consumerKey
        this.consumerSecret = consumerSecret
        this.headers = {}
    }

    // ========================================
    // 
    private async __fetch<Module extends Modules>(
        module: Module,
        endpoint: keyof Module,
        method: "POST" | "GET",
        headers?: HeadersInit,
        params?: Record<string, string>,
        body?: any
    ): Promise<Response> {
        const endpointPath = module[endpoint] as string
        const url = new URL(endpointPath, this.url)

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

        let requestBody: BodyInit | undefined = undefined
        if (body) {
            requestBody = JSON.stringify(body)
            requestHeaders['Content-Type'] = 'application/json'
        }

        return await fetch(url, {
            method,
            headers: requestHeaders,
            body: requestBody
        })
    }
}

new Wrapper(JAGIELLONIAN_UNIVERSITY, "consumerKey", "consumerSecret")


