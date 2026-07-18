import { Consumer, } from '@/client/consumer';
import { Scheme } from '@/globals';


type fields = 'name' 
    | 'url' 
    | 'email' 
    | 'dateRegistered' 
    | 'administrativeMethods' 
    | 'tokenScopes' 
    | 'isVerified';

// services/apisrv/consumer

interface Authorization {
    consumerKey: String
    consumerSecret: String
    method: "PLAINTEXT" | "JSON"
    timestamp: Number
    nonce: Number
    version: "1.0"
}



export class Server extends Consumer {
    public url: URL;

            private async __initConnection(scheme: Scheme, consumerKey: String, consumerSecret: String): Promise<void> {
        try {
            const url = new URL(`${scheme}/services/apisrv/consumer`);
            const now = Date.now();




            const timestamp = Math.floor(Date.now() / 1000).toString();
            const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);

            const headers: HeadersInit = {
                'Authorization': `OAuth oauth_consumer_key="${consumerKey}", oauth_signature_method="PLAINTEXT", oauth_signature="${consumerSecret}%26", oauth_timestamp="${timestamp}", oauth_nonce="${nonce}", oauth_version="1.0"`,
                'Accept': 'application/json'
            };
            
            // 3. Używamy metody GET (najlepsza dla pobierania danych)
            const response = await fetch(url, { method: 'GET', headers, });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error(`[Server] API odrzuciło zapytanie (Status: ${response.status}):`, errorData);
                return;
            }

            const data = await response.json();
            console.log(`[Server] Sukces! Odpowiedź serwera:`, data);

        } catch (error) {
            console.error('[Server] Błąd krytyczny sieci:', error);
        }
    }

    constructor(scheme: Scheme, consumerKey: String, consumerSecret: String) {
        super(scheme, consumerKey, consumerSecret);
        
        this.scheme = scheme;
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
        this.url = new URL(`${scheme}/services/apisrv/consumer`);

        this.__initConnection(scheme, consumerKey, consumerSecret);
    }
    
}