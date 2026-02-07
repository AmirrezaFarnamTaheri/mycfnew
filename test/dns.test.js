import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleDoHRequest } from '../src/dns.js';

// Mock global fetch
global.fetch = vi.fn();

// Mock console
const consoleSpy = {
    log: vi.spyOn(console, 'log'),
    warn: vi.spyOn(console, 'warn'),
    error: vi.spyOn(console, 'error')
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
    });
});
