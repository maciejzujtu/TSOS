import { Wrapper } from "@/client/wrapper";
import { University, AuthProvider } from "@/globals";
import { ApiSrv } from "@/modules/apisrv";
import { ApiRef } from "@/modules/apiref";

export class User extends Wrapper implements AuthProvider {
    public apisrv: ApiSrv;
    public apiref: ApiRef;
    public accessToken: string;
    public accessTokenSecret: string;

    constructor(
        uni: University,
        consumerKey: string,
        consumerSecret: string,
        accessToken: string,
        accessTokenSecret: string
    ) {
        super(uni, consumerKey, consumerSecret);
        this.accessToken = accessToken;
        this.accessTokenSecret = accessTokenSecret;
        this.apisrv = new ApiSrv(this);
        this.apiref = new ApiRef(this);
    }

    public async getAuthorizationHeader(token?: string, tokenSecret?: string, callback?: string): Promise<string> {
        const activeToken = token || this.accessToken;
        const activeTokenSecret = tokenSecret || this.accessTokenSecret;

        const timestamp = await this.apisrv.getNow();
        const nonce = crypto.randomUUID();

        let signatureSecret = `${encodeURIComponent(this.consumerSecret)}&`
        if (activeTokenSecret) {
            signatureSecret += encodeURIComponent(activeTokenSecret)
        }

        let header = `OAuth oauth_consumer_key="${this.consumerKey}", `
            + `oauth_signature_method="PLAINTEXT", `
            + `oauth_signature="${signatureSecret}", `
            + `oauth_timestamp="${timestamp}", `
            + `oauth_nonce="${nonce}", `
            + `oauth_version="1.0"`

        if (activeToken) {
            header += `, oauth_token="${activeToken}"`
        }
        if (callback) {
            header += `, oauth_callback="${encodeURIComponent(callback)}"`
        }
        return header;
    }
}