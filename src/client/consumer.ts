import { Scheme } from '@/globals';


/**
 * @description Configures the consumer key and secret of our USOS app.
 */

export abstract class Consumer {
    protected scheme: Scheme | undefined;
    protected consumerKey: String | undefined;
    protected consumerSecret: String | undefined;

    constructor(scheme?: Scheme, consumerKey?: String, consumerSecret?: String) {
        this.scheme = scheme;
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
    }

    // !!! DEBUG METHOD
    public getConfig(): { scheme: Scheme; consumerKey: String; consumerSecret: String } {
        return {
            scheme: this.scheme!,
            consumerKey: this.consumerKey!,
            consumerSecret: this.consumerSecret!,
        };
    }


    public setScheme(scheme: Scheme): void {
        this.scheme = scheme;
    }

    public setConsumerKey(consumerKey: string): void {
        this.consumerKey = consumerKey;
    }
    
    public setConsumerSecret(consumerSecret: string): void {
        this.consumerSecret = consumerSecret;
    }
}
