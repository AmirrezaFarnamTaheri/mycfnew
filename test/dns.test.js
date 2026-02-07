import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleDoHRequest } from '../src/dns.js';

describe('dns.js', () => {
    let globalFetch;

    beforeEach(() => {
        globalFetch = global.fetch;
        global.fetch = vi.fn();
    });

    afterEach(() => {
        global.fetch = globalFetch;
    });

    it('should block non-GET/POST methods', async () => {
        const req = new Request('https://worker.dev/dns-query', { method: 'PUT' });
        const res = await handleDoHRequest(req);
        expect(res.status).toBe(405);
    });

    it('should require dns param for GET', async () => {
        const req = new Request('https://worker.dev/dns-query', { method: 'GET' });
        const res = await handleDoHRequest(req);
        expect(res.status).toBe(400);
    });

    it('should handle OPTIONS for CORS', async () => {
        const req = new Request('https://worker.dev/dns-query', { method: 'OPTIONS' });
        const res = await handleDoHRequest(req);
        expect(res.status).toBe(204);
        expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    });

    it('should forward valid request', async () => {
        global.fetch.mockResolvedValue(new Response('dns-response', { status: 200 }));
        const req = new Request('https://worker.dev/dns-query?dns=query', { method: 'GET' });
        const res = await handleDoHRequest(req);
        expect(res.status).toBe(200);
        expect(global.fetch).toHaveBeenCalled();
    });

    it('should fallback on failure', async () => {
        // First call fails, second succeeds (fallback)
        global.fetch
            .mockRejectedValueOnce(new Error('Network Error'))
            .mockResolvedValueOnce(new Response('fallback-response', { status: 200 }));

        const req = new Request('https://worker.dev/dns-query?dns=query', { method: 'GET' });
        const res = await handleDoHRequest(req);
        expect(res.status).toBe(200);
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });
});
