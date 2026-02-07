import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleRequest } from '../src/handler.js';

// Mock config module to avoid side effects
vi.mock('../src/config.js', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        initKVStore: vi.fn(),
        getConfigValue: vi.fn((key, def) => def || ''),
        setConfigValue: vi.fn(),
        getFullConfig: vi.fn(() => ({})),
        updateFullConfig: vi.fn(),
    };
});

// Mock DNS module to avoid external calls
vi.mock('../src/dns.js', () => ({
    handleDoHRequest: vi.fn().mockResolvedValue(new Response('DoH')),
}));

// Mock Utils
vi.mock('../src/utils.js', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        // Keep actual implementations for logic testing, mock specific if needed
    };
});

describe('handler.js', () => {
    let env;
    let ctx;

    beforeEach(() => {
        env = {
            u: '03af76f9-e3d3-4a9b-9f08-c7f2ffc20356', // Valid UUID
            C: { get: vi.fn(), put: vi.fn() }
        };
        ctx = { waitUntil: vi.fn() };
    });

    it('should return 500 if UUID not set', async () => {
        const req = new Request('https://worker.dev/');
        const res = await handleRequest(req, {}, ctx);
        expect(res.status).toBe(500);
        expect(await res.text()).toBe('UUID not set');
    });

    it('should serve terminal on root', async () => {
        const req = new Request('https://worker.dev/');
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toContain('text/html');
    });

    it('should handle DNS query', async () => {
        const req = new Request('https://worker.dev/dns-query?dns=x');
        const res = await handleRequest(req, env, ctx);
        expect(await res.text()).toBe('DoH');
    });

    it('should handle config API GET', async () => {
        const req = new Request('https://worker.dev/03af76f9-e3d3-4a9b-9f08-c7f2ffc20356/api/config', { method: 'GET' });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toContain('application/json');
    });

    it('should handle config API POST', async () => {
        const req = new Request('https://worker.dev/03af76f9-e3d3-4a9b-9f08-c7f2ffc20356/api/config', {
            method: 'POST',
            body: JSON.stringify({ key: 'value' })
        });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.success).toBe(true);
    });

    it('should return 404 for unknown paths', async () => {
        const req = new Request('https://worker.dev/unknown');
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(404);
    });
});
