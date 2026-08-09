export class UsosError extends Error {
    public constructor(message: string) {
        super(message)
        this.name = new.target.name
    }
}

export class UsosAuthenticationError extends UsosError {}
export class UsosConfigurationError extends UsosError {}
export class UsosApiError extends UsosError {
    public constructor(
        message: string,
        public readonly status: number,
        public readonly endpoint: string,
        public readonly responseBody: string
    ) {
        super(message)
    }
}