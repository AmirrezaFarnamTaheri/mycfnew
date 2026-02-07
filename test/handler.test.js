import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleRequest } from '../src/handler.js';
import * as dns from '../src/dns.js';
import * as config from '../src/config.js';

// Mock config module
vi.mock('../src/config.js', async (importOriginal) => {
    return {
        initKVStore: vi.fn(),
        getConfigValue: vi.fn((key, def) => def || ''),
        setConfigValue: vi.fn(),
        getFullConfig: vi.fn(() => ({})),
        updateFullConfig: vi.fn(),
    };
});

// Mock DNS module
vi.mock('../src/dns.js', () => ({
    handleDoHRequest: vi.fn(),
    serveDNSEncodingExplanation: vi.fn(() => new Response('DNS Explanation'))
}));

describe('handler.js', () => {
    let env;
    let ctx;
    let consoleLogSpy;
    let consoleErrorSpy;

    beforeEach(() => {
        vi.clearAllMocks();
        env = {
            u: '03af76f9-e3d3-4a9b-9f08-c7f2ffc20356',
            C: { get: vi.fn(), put: vi.fn() }
        };
        ctx = { waitUntil: vi.fn() };

        consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Setup default mocks
        vi.mocked(dns.handleDoHRequest).mockResolvedValue(new Response('DoH Response'));
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should log request start and end', async () => {
        const req = new Request('https://worker.dev/');
        const res = await handleRequest(req, env, ctx);

        expect(res.status).toBe(200);

        // Check logs
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('"event":"request_start"'));
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('"event":"request_end"'));
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('"duration_ms":'));
    });

    it('should return 500 and log error if UUID not set', async () => {
        const req = new Request('https://worker.dev/');
        const res = await handleRequest(req, {}, ctx); // Empty env

        expect(res.status).toBe(500);
        expect(await res.text()).toBe('UUID not set');
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('UUID not set'));
    });

    it('should route to DNS handler', async () => {
        const req = new Request('https://worker.dev/dns-query?dns=x');
        await handleRequest(req, env, ctx);
        expect(dns.handleDoHRequest).toHaveBeenCalled();
    });

    it('should handle API Config POST', async () => {
        const req = new Request('https://worker.dev/03af76f9-e3d3-4a9b-9f08-c7f2ffc20356/api/config', {
            method: 'POST',
            body: JSON.stringify({ key: 'value' })
        });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(config.updateFullConfig).toHaveBeenCalledWith({ key: 'value' });
    });

    it('should catch unhandled errors', async () => {
        // Mock initKVStore to throw
        vi.mocked(config.initKVStore).mockRejectedValueOnce(new Error('KV Error'));

        const req = new Request('https://worker.dev/');
        const res = await handleRequest(req, env, ctx);

        expect(res.status).toBe(500);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Unhandled Exception:', expect.anything());
    });
});
