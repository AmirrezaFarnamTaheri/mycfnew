import { build } from 'esbuild';
import { minify } from 'terser';
import fs from 'fs';

// Common Terser options for obfuscation
const terserOptions = {
    ecma: 2020,
    module: true,
    toplevel: true,
    compress: {
        passes: 5,
        unsafe: true,
        pure_getters: true,
        unsafe_arrows: true,
        drop_console: true,
        drop_debugger: true,
    },
    mangle: {
        toplevel: true,
    },
    format: {
        comments: false,
    }
};

// Build function
async function buildWorker(outfile, options = {}) {
    const result = await build({
        entryPoints: ['src/index.js'],
        bundle: true,
        write: false,
        format: 'esm',
        target: 'esnext',
        ...options
    });

    const code = result.outputFiles[0].text;

    // Obfuscate using Terser
    const obfuscated = await minify(code, terserOptions);

    if (obfuscated.error) {
        console.error('Terser error:', obfuscated.error);
        process.exit(1);
    }

    fs.writeFileSync(outfile, obfuscated.code);
    console.log(`Built and obfuscated: ${outfile}`);
}

// Build worker.js (main artifact)
buildWorker('worker.js').catch(() => process.exit(1));
