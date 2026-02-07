import { sha224Hash } from './src/utils.js';

async function verify() {
    const input = 'test';
    const expected = '90a3ed9e32b2aaf4c61c410eb925426119e1a9dc53d4286ade99a809';
    const result = await sha224Hash(input);
    if (result === expected) {
        console.log('SHA224 verification passed');
    } else {
        console.error('SHA224 verification failed. Expected:', expected, 'Got:', result);
        process.exit(1);
    }
}

verify();
