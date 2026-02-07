import { describe, it, expect } from 'vitest';
import { isValidFormat, isValidIP, parseAddressAndPort, parseSocksConfig, sha224Hash, formatIdentifier, base64ToArray, isValidDomain, E_INVALID_SOCKS_ADDR } from '../src/utils.js';

describe('utils.js', () => {
    describe('isValidFormat', () => {
        it('should return true for valid UUID', () => {
            expect(isValidFormat('03af76f9-e3d3-4a9b-9f08-c7f2ffc20356')).toBe(true);
        });
        it('should return false for invalid UUID', () => {
            expect(isValidFormat('invalid-uuid')).toBe(false);
            expect(isValidFormat('03af76f9-e3d3-4a9b-9f08-c7f2ffc2035')).toBe(false);
        });
    });

    describe('isValidIP', () => {
        it('should validate IPv4', () => {
            expect(isValidIP('1.1.1.1')).toBe(true);
            expect(isValidIP('256.256.256.256')).toBe(false);
        });
        it('should validate IPv6', () => {
            expect(isValidIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
            expect(isValidIP('::1')).toBe(true);
            expect(isValidIP('invalid::ipv6::')).toBe(false);
        });
    });

    describe('parseAddressAndPort', () => {
        it('should parse IPv4 with port', () => {
            expect(parseAddressAndPort('1.1.1.1:8080')).toEqual({ address: '1.1.1.1', port: 8080 });
        });
        it('should parse IPv6 with port', () => {
            expect(parseAddressAndPort('[::1]:8080')).toEqual({ address: '::1', port: 8080 });
        });
        it('should parse domain with port', () => {
            expect(parseAddressAndPort('example.com:443')).toEqual({ address: 'example.com', port: 443 });
        });
        it('should handle missing port', () => {
            expect(parseAddressAndPort('example.com')).toEqual({ address: 'example.com', port: null });
        });
        it('should handle invalid port', () => {
             expect(parseAddressAndPort('example.com:70000')).toEqual({ address: 'example.com:70000', port: null });
        });
    });

    describe('sha224Hash', () => {
        it('should generate correct hash', async () => {
            // Echo -n "test" | openssl dgst -sha224
            const expected = '90a3ed9e32b2aaf4c61c410eb925426119e1a9dc53d4286ade99a809';
            expect(await sha224Hash('test')).toBe(expected);
        });
    });

    describe('parseSocksConfig', () => {
        it('should parse full config', () => {
            expect(parseSocksConfig('user:pass@host:1080')).toEqual({
                username: 'user',
                password: 'pass',
                hostname: 'host',
                socksPort: 1080
            });
        });
        it('should throw on invalid format', () => {
             expect(() => parseSocksConfig('invalid')).toThrow(); // E_INVALID_SOCKS_ADDR
        });
        it('should throw if no port in simple address', () => {
             // 'example.com' parseAddressAndPort returns port null
             expect(() => parseSocksConfig('example.com')).toThrow();
        });
        it('should throw if no port in auth address', () => {
             expect(() => parseSocksConfig('user:pass@example.com')).toThrow();
        });
    });

    describe('isValidDomain', () => {
         it('should validate domains', () => {
             expect(isValidDomain('example.com')).toBe(true);
             expect(isValidDomain('sub.example.com')).toBe(true);
             expect(isValidDomain('invalid')).toBe(false);
         });
    });

    describe('base64ToArray', () => {
        it('should return null error for empty input', () => {
            expect(base64ToArray('')).toEqual({ error: null });
        });
        it('should return error for invalid base64', () => {
            const res = base64ToArray('invalid-base64%');
            expect(res.error).toBeDefined();
        });
        it('should parse valid base64', () => {
             const res = base64ToArray('dGVzdA=='); // "test"
             expect(res.error).toBeNull();
             expect(new Uint8Array(res.earlyData)).toEqual(new Uint8Array([116, 101, 115, 116]));
        });
    });

    describe('formatIdentifier', () => {
        it('should format valid identifier', () => {
            const arr = new Uint8Array([3, 175, 118, 249, 227, 211, 74, 155, 159, 8, 199, 242, 255, 194, 3, 86]);
            expect(formatIdentifier(arr)).toBe('03af76f9-e3d3-4a9b-9f08-c7f2ffc20356');
        });

        it('should throw for invalid buffer size (triggering undefined accesses)', () => {
            const shortArr = new Uint8Array(10);
            expect(() => formatIdentifier(shortArr)).toThrow();
        });
    });
});
