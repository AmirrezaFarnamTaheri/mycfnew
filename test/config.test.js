import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initKVStore, saveKVConfig, getConfigValue, setConfigValue, isKVEnabled, updateFullConfig } from '../src/config.js';

describe('config.js', () => {
    let mockKV;
    let env;

    beforeEach(() => {
        mockKV = {
            get: vi.fn(),
            put: vi.fn()
        };
        env = { C: mockKV };
    });

    it('should initialize KV store', async () => {
        mockKV.get.mockResolvedValue(JSON.stringify({ test: 'value' }));
        await initKVStore(env);
        expect(isKVEnabled()).toBe(true);
        expect(getConfigValue('test')).toBe('value');
    });

    it('should handle missing KV', async () => {
        await initKVStore({});
        expect(isKVEnabled()).toBe(false);
    });

    it('should handle invalid JSON in KV', async () => {
        mockKV.get.mockResolvedValue('invalid json');
        await initKVStore(env);
        expect(getConfigValue('test')).toBe('');
    });

    it('should set and save config', async () => {
        mockKV.get.mockResolvedValue('{}');
        await initKVStore(env);

        await setConfigValue('newKey', 'newValue');
        expect(getConfigValue('newKey')).toBe('newValue');
        expect(mockKV.put).toHaveBeenCalledWith('c', JSON.stringify({ newKey: 'newValue' }));
    });

    it('should fail to set config if KV missing', async () => {
        await initKVStore({});
        await setConfigValue('key', 'value');
        expect(getConfigValue('key')).toBe('value'); // In-memory update
        // But put should not be called since store is null, checked internally
    });

    it('should throw if put fails', async () => {
         mockKV.get.mockResolvedValue('{}');
         mockKV.put.mockRejectedValue(new Error('KV Error'));
         await initKVStore(env);
         await expect(setConfigValue('key', 'value')).rejects.toThrow('KV Error');
    });

    it('should update full config', () => {
        updateFullConfig({ a: 1, b: 2, c: null });
        expect(getConfigValue('a')).toBe(1);
        expect(getConfigValue('b')).toBe(2);
        expect(getConfigValue('c')).toBe('');
    });
});
