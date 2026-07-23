import { Wrapper } from '@/client/wrapper'
import { University, AuthProvider } from '@/globals';
import { ApiSrv } from '@/modules/apisrv';
import { ApiRef } from '@/modules/apiref';
import { OAuth } from '@/modules/oauth';

export class Server extends Wrapper implements AuthProvider {
    public apisrv: ApiSrv;
    public apiref: ApiRef;
    public oauth: OAuth;

    constructor(uni: University, consumerKey: string, consumerSecret: string) {
        super(uni, consumerKey, consumerSecret)
        this.apisrv = new ApiSrv(this)
        this.apiref = new ApiRef(this)
        this.oauth = new OAuth(this)
    }

    public async getAuthorizationHeader(token?: string, tokenSecret?: string, callback?: string): Promise<string> {
        const timestamp = await this.apisrv.getNow()
        const nonce = crypto.randomUUID()
        let signatureSecret = `${encodeURIComponent(this.consumerSecret)}&`
        if (tokenSecret) {
            signatureSecret += encodeURIComponent(tokenSecret)
        }
        let header = `OAuth oauth_consumer_key="${this.consumerKey}", `
            + `oauth_signature_method="PLAINTEXT", `
            + `oauth_signature="${signatureSecret}", `
            + `oauth_timestamp="${timestamp}", `
            + `oauth_nonce="${nonce}", `
            + `oauth_version="1.0"`

        if (token) { header += `, oauth_token="${token}"` }
        if (callback) { header += `, oauth_callback="${encodeURIComponent(callback)}"` }
        return header
    }
}