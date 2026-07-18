import { Base } from "@/globals"
import { Module } from "@/interfaces";

/**
 * @description Multi-purpose API wrapper for all of the endpoint connections for our USOS app.
 * You can think of it as 'fetch' but as a class and more tailored for this API and you'd be right
 */

export class Wrapper {
    private url: URL
    private headers: HeadersInit | undefined

    private async getTimeStamp(): Promise<Date | Error> {
        if (!this.url) {
            throw new Error("")
        }

        return new Date()
    }


    constructor(base: Base, consumerKey: string, consumerSecret: string) {
        this.url = new URL(`https://${base}`)
    }    
        
    // !!! TODO
    // Add module validation for request method kind (GET/POST)
    
    public async POST<M extends Module>(module: M, method: keyof M, headers: HeadersInit = {}) {
        
    }

    public async GET<M extends Module>(module: M, method: keyof M) {

    }
}