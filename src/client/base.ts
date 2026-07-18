import { Consumer } from '@/client/consumer';
import { Scheme } from '@/globals';

export class TSOS extends Consumer {


    public authenticated: boolean;
    public url: URL;




    constructor(scheme: Scheme, consumerKey: string, consumerSecret: string) {
        super(scheme, consumerKey, consumerSecret);



        this.authenticated = false;
        this.url = new URL(`${scheme}/services/oauth/authorize`);
    }
}