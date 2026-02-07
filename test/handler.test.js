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

    it('should route to DNS Encoding Explanation', async () => {
        const req = new Request('https://worker.dev/dns-encoding');
        await handleRequest(req, env, ctx);
        expect(html.serveDNSEncodingExplanation).toHaveBeenCalled();
    });

    it('should handle API Config GET', async () => {
        const req = new Request(`https://worker.dev/${UUID}/api/config`);
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(config.getFullConfig).toHaveBeenCalled();
    });

    it('should handle API Config POST', async () => {
        const req = new Request(`https://worker.dev/${UUID}/api/config`, {
            method: 'POST',
            body: JSON.stringify({ key: 'value' })
        });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(config.updateFullConfig).toHaveBeenCalledWith({ key: 'value' });
    });

    it('should handle API Config POST Error', async () => {
        vi.mocked(config.updateFullConfig).mockImplementationOnce(() => {
            throw new Error('Config Error');
        });
        const req = new Request(`https://worker.dev/${UUID}/api/config`, {
            method: 'POST',
            body: JSON.stringify({ key: 'value' })
        });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(500);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Config API Error:', expect.anything());
    });

    it('should handle API Config Invalid Method', async () => {
        const req = new Request(`https://worker.dev/${UUID}/api/config`, {
            method: 'PUT'
        });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(405);
    });

    it('should catch unhandled errors', async () => {
        // Mock initKVStore to throw
        vi.mocked(config.initKVStore).mockRejectedValueOnce(new Error('KV Error'));

        const req = new Request('https://worker.dev/');
        const res = await handleRequest(req, env, ctx);

        expect(res.status).toBe(500);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Unhandled Exception:', expect.anything());
    });

    // New tests for routing

    it('should route / to Terminal HTML', async () => {
        const req = new Request('https://worker.dev/');
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(html.getTerminalHtml).toHaveBeenCalled();
        expect(await res.text()).toContain('Terminal');
    });

    it('should route /<UUID> to Dashboard HTML', async () => {
        const req = new Request(`https://worker.dev/${UUID}`);
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(html.getSubscriptionPageHtml).toHaveBeenCalled();
        expect(await res.text()).toContain('Dashboard');
    });

    it('should detect Chinese language cookie', async () => {
        const req = new Request('https://worker.dev/', {
            headers: { 'Cookie': 'preferredLanguage=zh' }
        });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(html.getTerminalHtml).toHaveBeenCalledWith('zh', 'zh-CN', false, null, expect.anything());
    });

    it('should detect Farsi language cookie', async () => {
        const req = new Request('https://worker.dev/', {
            headers: { 'Cookie': 'preferredLanguage=fa' }
        });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(html.getTerminalHtml).toHaveBeenCalledWith('fa', 'fa-IR', true, null, expect.anything());
    });

     it('should detect Chinese language cookie on Dashboard', async () => {
        const req = new Request(`https://worker.dev/${UUID}`, {
            headers: { 'Cookie': 'preferredLanguage=zh' }
        });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(html.getSubscriptionPageHtml).toHaveBeenCalledWith('zh', 'zh-CN', false, null, expect.anything());
    });

    it('should detect Farsi language cookie on Dashboard', async () => {
        const req = new Request(`https://worker.dev/${UUID}`, {
            headers: { 'Cookie': 'preferredLanguage=fa' }
        });
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(html.getSubscriptionPageHtml).toHaveBeenCalledWith('fa', 'fa-IR', true, null, expect.anything());
    });

    it('should route /<UUID>/sub to Subscription', async () => {
        const req = new Request(`https://worker.dev/${UUID}/sub`);
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        const text = await res.text();
        expect(text).toContain('vless://link');
        expect(text).toContain('vmess://link');
        expect(text).toContain('ss://link');
        expect(text).toContain('trojan://link');
        expect(protocols.generateLinksFromSource).toHaveBeenCalled();
        expect(protocols.generateTrojanLinksFromSource).toHaveBeenCalled();
    });

    it('should use preferred IPs from config in subscription', async () => {
        // Mock getConfigValue to return IPs
        vi.mocked(config.getConfigValue).mockImplementation((key) => {
            if (key === 'yx') return '8.8.8.8, 1.1.1.1';
            return '';
        });

        const req = new Request(`https://worker.dev/${UUID}/sub`);
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        expect(protocols.generateLinksFromSource).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({ ip: '8.8.8.8' }),
                expect.objectContaining({ ip: '1.1.1.1' })
            ]),
            UUID,
            'worker.dev'
        );
    });

    it('should route /<UUID>/region to Region API', async () => {
        const req = new Request(`https://worker.dev/${UUID}/region`);
        Object.defineProperty(req, 'cf', { value: { colo: 'SJC' } });

        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.region).toBe('SJC');
        expect(json.method).toBe('worker');
    });

    it('should return 404 for invalid UUID', async () => {
        const req = new Request('https://worker.dev/invalid-uuid');
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(404);
    });

    it('should return 404 for invalid sub-path', async () => {
        const req = new Request(`https://worker.dev/${UUID}/invalid`);
        const res = await handleRequest(req, env, ctx);
        expect(res.status).toBe(404);
    });
});
