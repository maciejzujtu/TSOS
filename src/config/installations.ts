export const USOS_INSTALLATIONS = {
    JAGIELLONIAN_UNIVERSITY:   { name: 'Jagiellonian University', url: 'https://apps.usos.uj.edu.pl' },
    WARSAW_UNIVERSITY:         { name: 'University of Warsaw', url: 'https://usosapps.uw.edu.pl' },
    WROCLAW_UNIVERSITY:        { name: 'University of Wrocław', url: 'https://usosapps.uni.wroc.pl' },
} as const satisfies Record<string, { name: string; url: `https://${string}` }>

export type InstallationKey = keyof typeof USOS_INSTALLATIONS
export type Installation = (typeof USOS_INSTALLATIONS)[InstallationKey]
export type InstallationUrl = Installation['url']

export const JAGIELLONIAN_UNIVERSITY = USOS_INSTALLATIONS.JAGIELLONIAN_UNIVERSITY.url
export const WARSAW_UNIVERSITY = USOS_INSTALLATIONS.WARSAW_UNIVERSITY.url
export const WROCLAW_UNIVERSITY = USOS_INSTALLATIONS.WROCLAW_UNIVERSITY.url
