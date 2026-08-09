import { ApirefModules } from "@/services/apiref/index"

// ==========================================
// Master Mappings
// ==========================================

export type Modules =
    | typeof ApirefModules


// ==========================================
// University endpoints & mappings
// ==========================================

export const JAGIELLONIAN_UNIVERSITY = 'apps.usos.uj.edu.pl'
export const WARSAW_UNIVERSITY = 'usosapps.uw.edu.pl'
export const WROCLAW_UNIVERSITY = 'usosapps.uni.wroc.pl'

export type University = 
    | typeof JAGIELLONIAN_UNIVERSITY
    | typeof WARSAW_UNIVERSITY
    | typeof WROCLAW_UNIVERSITY