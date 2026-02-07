import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleRequest } from '../src/handler.js';
import * as dns from '../src/dns.js';
import * as config from '../src/config.js';
import * as html from '../src/html.js';
import * as protocols from '../src/protocols.js';

// Mock config module
vi.mock('../src/config.js', async () => {
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

// Mock HTML module
vi.mock('../src/html.js', () => ({
    getTerminalHtml: vi.fn(() => '<html class="terminal">Terminal</html>'),
    getSubscriptionPageHtml: vi.fn(() => '<html class="dashboard">Dashboard</html>'),
    serveDNSEncodingExplanation: vi.fn(() => new Response('DNS Explanation'))
}));

// Mock Protocols module
vi.mock('../src/protocols.js', () => ({
    generateLinksFromSource: vi.fn(() => ['vless://link']),
    generateVMessLinksFromSource: vi.fn(() => ['vmess://link']),
    generateShadowsocksLinksFromSource: vi.fn(() => ['ss://link']),
    generateTrojanLinksFromSource: vi.fn(async () => ['trojan://link'])
}));

describe('handler.js', () => {
    let env;
    let ctx;
    let consoleLogSpy;
    let consoleErrorSpy;
    const UUID = '03af76f9-e3d3-4a9b-9f08-c7f2ffc20356';

    beforeEach(() => {
        vi.clearAllMocks();
        env = {
            u: UUID,
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

        expect(res.status).toBe(200); // Because it routes to Terminal HTML by default for /
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('"event":"request_start"'));
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('"event":"request_end"'));
    });

    it('should return 500 if UUID not set', async () => {
        const req = new Request('https://worker.dev/');
        const res = await handleRequest(req, {}, ctx);

        expect(res.status).toBe(500);
        expect(await res.text()).toBe('UUID not set');
    });

    it('should route to DNS handler', async () => {
        const req = new Request('https://worker.dev/dns-query?dns=x');
        await handleRequest(req, env, ctx);
        expect(dns.handleDoHRequest).toHaveBeenCalled();
    });

    // API Security Tests
    it('should block unauthorized access to /api/config', async () => {
        const req = new Request('https://worker.dev/api/config', { method: 'GET' });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(401);
    });

    it('should allow authorized access to /api/config via query param', async () => {
        const req = new Request(`https://worker.dev/api/config?u=${UUID}`, { method: 'GET' });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(config.getFullConfig).toHaveBeenCalled();
    });

    it('should allow authorized access to /api/config via Authorization header', async () => {
        const req = new Request('https://worker.dev/api/config', {
            method: 'GET',
            headers: { 'Authorization': UUID }
        });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
    });

    it('should handle API Config POST with valid auth', async () => {
        const req = new Request(`https://worker.dev/api/config?u=${UUID}`, {
            method: 'POST',
            body: JSON.stringify({ key: 'value' })
        });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(config.updateFullConfig).toHaveBeenCalledWith({ key: 'value' });
    });

    // Other Routing Tests
    it('should route / to Terminal HTML', async () => {
        const req = new Request('https://worker.dev/');
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(html.getTerminalHtml).toHaveBeenCalled();
    });

    it('should route /<UUID> to Dashboard HTML', async () => {
        const req = new Request(`https://worker.dev/${UUID}`);
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(html.getSubscriptionPageHtml).toHaveBeenCalled();
    });

    it('should route /<UUID>/sub to Subscription', async () => {
        const req = new Request(`https://worker.dev/${UUID}/sub`);
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(protocols.generateLinksFromSource).toHaveBeenCalled();
        expect(protocols.generateTrojanLinksFromSource).toHaveBeenCalled();
    });

    it('should fallback to default IP if yx config is empty', async () => {
        vi.mocked(config.getConfigValue).mockImplementation((key) => '');
        const req = new Request(`https://worker.dev/${UUID}/sub`);
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        // We verify that the generator was called with default IP
        expect(protocols.generateLinksFromSource).toHaveBeenCalledWith(
            expect.arrayContaining([expect.objectContaining({ ip: '104.16.1.1' })]),
            expect.any(String),
            expect.any(String)
        );
    });
});
