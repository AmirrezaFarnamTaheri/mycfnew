import { build } from 'esbuild';
import { minify } from 'terser';
import fs from 'fs';

// Build the standard worker.js
build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'worker.js',
  format: 'esm',
  minify: false,
  target: 'esnext',
}).catch(() => process.exit(1));

// Build and obfuscate worker_obfuscated.js using Terser for better obfuscation
build({
  entryPoints: ['src/index.js'],
  bundle: true,
  write: false, // Don't write to file yet
  format: 'esm',
  target: 'esnext',
}).then(async (result) => {
    const code = result.outputFiles[0].text;

    // Terser configuration for maximum obfuscation
    const obfuscated = await minify(code, {
        ecma: 2020,
        module: true,
        toplevel: true,
        compress: {
            passes: 5, // More passes = better compression/mangling
            unsafe: true,
            pure_getters: true,
            unsafe_arrows: true,
            drop_console: true, // Remove console logs
            drop_debugger: true,
        },
        mangle: {
            toplevel: true,
            properties: false, // Dangerous for some code, but can be enabled if careful
        },
        format: {
            comments: false, // Remove all comments
        }
    });

    if (obfuscated.error) {
        console.error('Terser error:', obfuscated.error);
        process.exit(1);
    }

    fs.writeFileSync('worker_obfuscated.js', obfuscated.code);
}).catch(() => process.exit(1));
