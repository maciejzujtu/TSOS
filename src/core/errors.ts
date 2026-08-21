export class UsosError extends Error {
    public constructor(message: string) {
        super(message)
        this.name = new.target.name
    }
}

export class UsosAuthenticationError extends UsosError {}
export class UsosConfigurationError extends UsosError {}

export type UsosNetworkErrorKind = "aborted" | "network" | "timeout"

export class UsosNetworkError extends UsosError {
    public constructor(
        message: string,
        public readonly endpoint: string,
        public readonly kind: UsosNetworkErrorKind,
        public readonly originalError?: unknown,
    ) {
        super(message)
    }
}

export class UsosApiError extends UsosError {
    public constructor(
        message: string,
        public readonly status: number,
        public readonly endpoint: string,
        public readonly responseBody: string,
        public readonly responseJson?: unknown,
    ) {
        super(message)
    }
}
