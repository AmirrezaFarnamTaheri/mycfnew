import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleDoHRequest, selectProvider, DOH_PROVIDERS } from '../src/dns.js';

// Mock global fetch
global.fetch = vi.fn();

// Mock console
const consoleSpy = {
    log: vi.spyOn(console, 'log').mockImplementation(() => {}),
    warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
    error: vi.spyOn(console, 'error').mockImplementation(() => {})
};

describe('handleDoHRequest', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if dns param is missing for GET', async () => {
        const req = new Request('https://worker.dev/dns-query', { method: 'GET' });
        const res = await handleDoHRequest(req, {}, {});
        expect(res.status).toBe(400);
        expect(await res.text()).toBe('Missing DNS query parameter');
    });

    it('should handle successful POST request', async () => {
        const body = new Uint8Array([1, 2, 3]).buffer;
        const req = new Request('https://worker.dev/dns-query', {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/dns-message' }
        });

        // Mock upstream success
        global.fetch.mockResolvedValueOnce(new Response('dns-response', { status: 200 }));

        const res = await handleDoHRequest(req, {}, {});
        expect(res.status).toBe(200);
        expect(await res.text()).toBe('dns-response');

        // Verify logs
        expect(consoleSpy.log).toHaveBeenCalledWith(expect.stringContaining('doh_start'));
        expect(consoleSpy.log).toHaveBeenCalledWith(expect.stringContaining('doh_response'));
    });

    it('should retry on failure with correct body', async () => {
        const body = new Uint8Array([1, 2, 3]).buffer;
        const req = new Request('https://worker.dev/dns-query', {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/dns-message' }
        });

        // Mock failure then success
        global.fetch
            .mockRejectedValueOnce(new Error('Network Error')) // First provider fails
            .mockResolvedValueOnce(new Response('fallback-response', { status: 200 })); // Fallback succeeds

        const res = await handleDoHRequest(req, {}, {});

        expect(res.status).toBe(200);
        expect(await res.text()).toBe('fallback-response');

        // Verify fallback logs
        expect(consoleSpy.warn).toHaveBeenCalledWith(expect.stringContaining('doh_error'));
        expect(consoleSpy.log).toHaveBeenCalledWith(expect.stringContaining('doh_fallback_start'));
        expect(consoleSpy.log).toHaveBeenCalledWith(expect.stringContaining('doh_fallback_response'));
    });

    it('should return 503 if all providers fail', async () => {
        const req = new Request('https://worker.dev/dns-query?dns=query', { method: 'GET' });

        // Mock 3 failures (1 primary + 2 fallbacks)
        global.fetch.mockRejectedValue(new Error('Fail'));

        const res = await handleDoHRequest(req, {}, {});
        expect(res.status).toBe(503);
        expect(consoleSpy.error).toHaveBeenCalledWith(expect.stringContaining('doh_all_failed'));
    });

    it('should handle OPTIONS request (CORS)', async () => {
        const req = new Request('https://worker.dev/dns-query', { method: 'OPTIONS' });
        const res = await handleDoHRequest(req, {}, {});
        expect(res.status).toBe(204);
        expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    });

    it('should handle invalid method', async () => {
        const req = new Request('https://worker.dev/dns-query', { method: 'PUT' });
        const res = await handleDoHRequest(req, {}, {});
        expect(res.status).toBe(405);
    });
});

describe('selectProvider', () => {
    it('should return a provider', () => {
        const provider = selectProvider(DOH_PROVIDERS);
        expect(provider).toBeDefined();
        expect(provider.url).toBeDefined();
    });

    it('should return null for empty list', () => {
        expect(selectProvider([])).toBeNull();
    });

    it('should respect weights (statistically)', () => {
        // Simple check that it doesn't crash
        const p = selectProvider([{ name: 'A', url: 'a', weight: 100 }]);
        expect(p.name).toBe('A');
    });
});
