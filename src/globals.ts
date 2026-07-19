import { APIREF } from "@/interfaces/apiref";
import { APISRV } from "@/interfaces/apisrv";

export const JAGIELLONIAN_UNIVERSITY = 'apps.usos.uj.edu.pl'
export const WARSAW_UNIVERSITY       = 'uosapps.uw.edu.pl'
export const WROCLAW_UNIVERSITY      = 'usosapps.uni.wroc.pl'

export type University =
    | typeof JAGIELLONIAN_UNIVERSITY
    | typeof WARSAW_UNIVERSITY
    | typeof WROCLAW_UNIVERSITY

export type Module = typeof APIREF | typeof APISRV;
