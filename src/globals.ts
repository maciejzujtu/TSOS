import { APIREF_REQUEST, APIREF_RESPONSE, APIREF } from "@/interfaces/apiref";
import { APISRV_REQUEST, APISRV_RESPONSE, APISRV } from "@/interfaces/apisrv";
import { OAUTH, OAUTH_REQUEST, OAUTH_RESPONSE } from "@/interfaces/oauth";
import { ATTENDANCE } from "./interfaces/attendence";

export const JAGIELLONIAN_UNIVERSITY = 'apps.usos.uj.edu.pl'
export const WARSAW_UNIVERSITY = 'uosapps.uw.edu.pl'
export const WROCLAW_UNIVERSITY = 'usosapps.uni.wroc.pl'

export type University =
    | typeof JAGIELLONIAN_UNIVERSITY
    | typeof WARSAW_UNIVERSITY
    | typeof WROCLAW_UNIVERSITY



// ==========================================
// MASTER TYPE REGISTRIES
// ==========================================

export type Module =
    | typeof APIREF
    | typeof APISRV
    | typeof OAUTH
    | typeof ATTENDANCE

export interface Requests extends
    APIREF_REQUEST,
    APISRV_REQUEST,
    OAUTH_REQUEST { }

export interface Responses extends
    APIREF_RESPONSE,
    APISRV_RESPONSE,
    OAUTH_RESPONSE { }

// ==========================================


export interface AuthProvider {
    uni: University;
    url: URL;
    consumerKey: string;
    getAuthorizationHeader(token?: string, tokenSecret?: string, callback?: string): Promise<string>;
    GET<M extends Module, T = any>(module: M, method: keyof M, headers?: HeadersInit, params?: Record<string, string>): Promise<T>;
    POST<M extends Module, T = any>(module: M, method: keyof M, headers?: HeadersInit, params?: Record<string, string>): Promise<T>;
    GET_TEXT<M extends Module>(module: M, method: keyof M, headers?: HeadersInit, params?: Record<string, string>): Promise<string>;
    POST_TEXT<M extends Module>(module: M, method: keyof M, headers?: HeadersInit, params?: Record<string, string>): Promise<string>;
}

