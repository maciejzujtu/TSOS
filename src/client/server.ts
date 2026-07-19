import { Wrapper } from '@/client/wrapper'
import { University } from '@/globals';
import { ApiSrv } from '@/modules/apisrv';
import { ApiRef } from '@/modules/apiref';

// services/apisrv/consumer

export class Server extends Wrapper {
    public apisrv: ApiSrv;
    public apiref: ApiRef;

    constructor(uni: University, consumerKey: string, consumerSecret: string) {
        super(uni, consumerKey, consumerSecret)
        this.apisrv = new ApiSrv(this)
        this.apiref = new ApiRef(this)
    }

    public async getAuthorizationHeader(): Promise<string> {
        const timestamp = await this.apisrv.getNow()
        const nonce = crypto.randomUUID()
        return `OAuth oauth_consumer_key="${this.consumerKey}", `
            + `oauth_signature_method="PLAINTEXT", `
            + `oauth_signature="${this.consumerSecret}%26", `
            + `oauth_timestamp="${timestamp}", `
            + `oauth_nonce="${nonce}", `
            + `oauth_version="1.0"`
    }
}