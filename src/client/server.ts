import { Consumer, } from '@/client/consumer';


type fields = 'name' 
    | 'url' 
    | 'email' 
    | 'dateRegistered' 
    | 'administrativeMethods' 
    | 'tokenScopes' 
    | 'isVerified';

// services/apisrv/consumer

export class Server extends Consumer {}