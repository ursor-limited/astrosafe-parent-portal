import { build } from "esbuild";

await build({
    entryPoints: ["index.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: 'node',
    target: 'es2020',
    format: 'esm',
    outExtension: {'.js': '.mjs'},
    outfile: 'dist/handler.mjs',
    banner: {
        js: [
            `import { createRequire as topLevelCreateRequire } from 'module'`,
            `const require = topLevelCreateRequire(import.meta.url)`
        ].join('\n')
    }
}
  )

export {}