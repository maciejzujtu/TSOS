import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

interface PackageMetadata {
    name: string
}

interface PackedTarball {
    filename: string
}

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url))
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm"

function isolatedNpmEnvironment(cwd: string): NodeJS.ProcessEnv {
    const environment = { ...process.env }
    delete environment.npm_config_allow_scripts
    delete environment.NPM_CONFIG_ALLOW_SCRIPTS

    return {
        ...environment,
        npm_config_globalconfig: join(cwd, ".npm-globalrc"),
        npm_config_userconfig: join(cwd, ".npm-userrc"),
    }
}

function runNpm(args: readonly string[], cwd: string): string {
    return execFileSync(npmCommand, args, {
        cwd,
        encoding: "utf8",
        env: isolatedNpmEnvironment(cwd),
        stdio: ["ignore", "pipe", "pipe"],
    })
}

test("packed package installs and exposes a mocked public read-only client", () => {
    const packageMetadata = JSON.parse(
        readFileSync(join(repositoryRoot, "package.json"), "utf8"),
    ) as PackageMetadata
    const fixtureDirectory = mkdtempSync(join(tmpdir(), "tsos-package-smoke-"))

    try {
        const packedTarballs = JSON.parse(runNpm([
            "pack",
            "--ignore-scripts",
            "--json",
            "--pack-destination",
            fixtureDirectory,
        ], repositoryRoot)) as PackedTarball[]
        assert.equal(packedTarballs.length, 1)

        const tarballPath = join(fixtureDirectory, packedTarballs[0]!.filename)
        writeFileSync(join(fixtureDirectory, "package.json"), JSON.stringify({
            allowScripts: {},
            name: "tsos-package-smoke-fixture",
            private: true,
            type: "module",
        }))
        runNpm([
            "install",
            "--ignore-scripts",
            "--no-audit",
            "--no-fund",
            "--no-package-lock",
            "--no-save",
            "--offline",
            tarballPath,
        ], fixtureDirectory)

        const installedPackageDirectory = join(
            fixtureDirectory,
            "node_modules",
            ...packageMetadata.name.split("/"),
        )
        assert.equal(existsSync(join(installedPackageDirectory, "dist", "index.js")), true)
        assert.equal(existsSync(join(installedPackageDirectory, "src")), false)

        writeFileSync(join(fixtureDirectory, "smoke.mjs"), `
import assert from "node:assert/strict"
import { JAGIELLONIAN_UNIVERSITY, UsosClient } from ${JSON.stringify(packageMetadata.name)}

const client = new UsosClient({
    baseUrl: JAGIELLONIAN_UNIVERSITY,
    fetch: async (input) => {
        const url = new URL(input)
        assert.equal(url.pathname, "/services/apisrv/now")
        return new Response(JSON.stringify("2026-08-21 12:00:00"), { status: 200 })
    },
})

assert.equal(await client.apisrv.getNow(), "2026-08-21 12:00:00")
`)
        execFileSync(process.execPath, ["smoke.mjs"], {
            cwd: fixtureDirectory,
            stdio: "pipe",
        })
    } finally {
        rmSync(fixtureDirectory, { force: true, recursive: true })
    }
})
