export enum APISRV {
    CONSUMER,           // services/apisrv/consumer 
    INSTALLATION,       // services/apisrv/installation
    INSTALLATIONS,      // services/apisrv/installations
    MOBILE_USOS_CONFIG, // services/apisrv/mobile_usos_config
    NOW                 // services/apisrv/now
}

export enum APIREF {
    METHOD,             // services/apiref/method
    METHOD_INDEX,       // services/apiref/method_index
    MODULE,             // services/apiref/module
    SCOPES              // services/apiref/scopes
}

export type Module = typeof APIREF
| typeof APISRV;