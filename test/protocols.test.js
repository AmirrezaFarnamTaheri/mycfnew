import { describe, it, expect } from 'vitest';
import { generateLinksFromSource, generateVMessLinksFromSource, generateShadowsocksLinksFromSource, generateTrojanLinksFromSource } from '../src/protocols.js';

describe('protocols.js', () => {
    const list = [{ ip: '1.1.1.1', port: 443, isp: 'Cloudflare', colo: 'LAX' }];
    const user = 'test-uuid';
    const workerDomain = 'worker.dev';

    describe('generateLinksFromSource (VLESS)', () => {
        it('should generate valid VLESS links', () => {
            const links = generateLinksFromSource(list, user, workerDomain);
            expect(links.length).toBeGreaterThan(0);
            expect(links[0]).toContain('vless://');
            expect(links[0]).toContain(user);
            expect(links[0]).toContain('1.1.1.1:443');
            expect(links[0]).toContain('Cloudflare-LAX-443-TLS');
        });

        it('should handle diverse proxies option', () => {
            const links = generateLinksFromSource(list, user, workerDomain, null, { enableDiverseProxies: true });
            expect(links.length).toBeGreaterThan(1);
        });

        it('should respect disableNonTLS', () => {
             const httpList = [{ ip: '1.1.1.1', port: 80, isp: 'Cloudflare' }];
             const links = generateLinksFromSource(httpList, user, workerDomain, null, { disableNonTLS: true });
             expect(links.length).toBe(0);
        });
    });

    describe('generateVMessLinksFromSource', () => {
        it('should generate valid VMess links', () => {
            const links = generateVMessLinksFromSource(list, user, workerDomain);
            expect(links.length).toBeGreaterThan(0);
            expect(links[0]).toContain('vmess://');
            const decoded = JSON.parse(atob(links[0].replace('vmess://', '')));
            expect(decoded.ps).toBe('Cloudflare-LAX');
            expect(decoded.add).toBe('1.1.1.1');
        });
    });

    describe('generateShadowsocksLinksFromSource', () => {
        it('should generate valid SS links', () => {
            const links = generateShadowsocksLinksFromSource(list, user, workerDomain);
            expect(links.length).toBeGreaterThan(0);
            expect(links[0]).toContain('ss://');
        });
    });

    describe('generateTrojanLinksFromSource', () => {
        it('should generate valid Trojan links', async () => {
            const links = await generateTrojanLinksFromSource(list, user, workerDomain);
            expect(links.length).toBeGreaterThan(0);
            const link = links[0];
            expect(link).toContain('trojan://');
            expect(link).toContain('@1.1.1.1:443');
            expect(link).toContain('security=tls');
            expect(link).toContain('type=ws');
            expect(link).toContain('path=%2Ftr%3Fed%3D2048');
            expect(link).toContain('#Cloudflare-LAX');

            // Verify password hash length (SHA-224 is 56 hex chars)
            const match = link.match(/trojan:\/\/([a-f0-9]+)@/);
            expect(match).not.toBeNull();
            expect(match[1].length).toBe(56);
        });

        it('should respect disableNonTLS for Trojan', async () => {
             const httpList = [{ ip: '1.1.1.1', port: 80, isp: 'Cloudflare' }];
             const links = await generateTrojanLinksFromSource(httpList, user, workerDomain, null, { disableNonTLS: true });
             expect(links.length).toBe(0);
        });

        it('should add ECH config if provided', async () => {
             const ech = 'test-ech-config';
             const links = await generateTrojanLinksFromSource(list, user, workerDomain, ech);
             expect(links[0]).toContain(`ech=${encodeURIComponent(ech)}`);
        });
    });
});
