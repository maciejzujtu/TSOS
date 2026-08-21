# Contributing to TSOS

Thanks for contributing. TSOS is a typed client library, so changes should keep the public API, runtime behaviour, endpoint metadata, and documentation aligned.

## Development setup

```sh
git clone https://github.com/maciejzujtu/TSOS.git
cd TSOS
npm ci
```

Use Node.js 20 or newer.

## Before opening a pull request

```sh
npm run typecheck
npm test
npm run build
npm run pack:check
npm run test:package
```

`test:package` is important: it verifies the packed tarball can be installed and imported by a separate project.

## Adding a USOS endpoint

1. Confirm the endpoint's path, parameters, authentication, scopes, deprecation state, and beta/internal status in the target installation's API reference.
2. Add the endpoint definition in `src/services/<module>/endpoints.ts`.
3. Add precise parameter and result types in `types.ts`.
4. Add a camelCase service method in `service.ts` that maps to the documented USOS parameter names.
5. Export the service API from `index.ts` and wire it into the relevant client when appropriate.
6. Add tests covering path, parameters, optional values, authentication context, and response type.
7. Update `README.md` and `docs/api.md` when the public surface changes.

Do not implement an internal endpoint. Treat beta and destructive endpoints as opt-in work that requires a safe test account and cleanup plan.

## Testing rules

- Unit tests must use mocked `fetch` or `MockRequestExecutor`; they must not need personal credentials or external network access.
- Write endpoints must not run against production user data.
- Keep package tests independent of globally installed npm packages and configuration.
- Add regression coverage for every bug fix.

## Documentation and security

- Keep examples runnable and free of real credentials.
- Do not commit `.env` files, Consumer Secrets, Access Tokens, or sensitive response samples.
- Request only the minimum scopes and fields required by an example.
- Explain user-visible behaviour and breaking changes in the pull request.

## Licence

TSOS is currently marked `UNLICENSED`. Do not publish or redistribute it as an open-source package until the maintainers choose and add a licence.
