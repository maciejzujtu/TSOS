import { Wrapper } from '@/client/wrapper'
import { APISRV, BaseURL } from '@/globals'
import { ConsumerFields, InstallationFields } from "@/types/apisrv"
import { CONSUMER, INSTALLATION } from '@/services/apisrv'

// services/apisrv/consumer

export class Server extends Wrapper {
    constructor(base: BaseURL, consumerKey: string, consumerSecret: string) {
        super(base, consumerKey, consumerSecret)
    }

    private async __getAuthorizationHeader(): Promise<string> {
        const timestamp = await this.getLocalTimestamp()
        const nonce = crypto.randomUUID()
        return `OAuth oauth_consumer_key="${this.consumerKey}", `
            + `oauth_signature_method="PLAINTEXT", `
            + `oauth_signature="${this.consumerSecret}%26", `
            + `oauth_timestamp="${timestamp}", `
            + `oauth_nonce="${nonce}", `
            + `oauth_version="1.0"`
    }

    // /services/apisrv/now
    public async getLocalTimestamp(): Promise<number> {
        const response = await this.GET<typeof APISRV, string>(APISRV, "NOW")
        const timestamp = response.replace(" ", "T")
        const date = new Date(timestamp)
        const unix = date.getTime()
        return Math.floor(unix / 1000)
    }

    // /services/apisrv/consumer
    public async getConsumer(fields: ConsumerFields[]): Promise<CONSUMER> {
        const authorizationHeader = await this.__getAuthorizationHeader()
        const params = { fields: fields.join('|') }
        const response = await this.GET<typeof APISRV, CONSUMER>(
            APISRV, 
            "CONSUMER", 
            { 'Authorization': authorizationHeader }, 
            params
        )
        return response
    }

    // /services/apisrv/installation
    public async getInstallation(fields: InstallationFields[]): Promise<INSTALLATION> {
        const params = { fields: fields.join('|') }
        const response = await this.GET<typeof APISRV, INSTALLATION>(APISRV, "INSTALLATION", {}, params)
        return response
    }

    
}