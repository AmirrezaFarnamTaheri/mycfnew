import { describe, it, expect } from 'vitest';
import { getTerminalHtml, serveDNSEncodingExplanation, getSubscriptionPageHtml } from '../src/html.js';

describe('html.js', () => {
    describe('serveDNSEncodingExplanation', () => {
        it('should return correct response', () => {
            const res = serveDNSEncodingExplanation();
            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });
    });

    describe('getTerminalHtml', () => {
        it('should return valid HTML structure', () => {
            const html = getTerminalHtml('en', 'en-US', false, null, '/custom');
            expect(html).toContain('<!DOCTYPE html>');
            expect(html).toContain('<html lang="en-US" dir="ltr">');
            expect(html).toContain('<title>Terminal</title>');
            expect(html).toContain('class="matrix-bg"');
        });

        it('should include custom path if provided', () => {
             const html = getTerminalHtml('en', 'en-US', false, null, '/custom-path');
             expect(html).toContain('<!DOCTYPE html>');
        });

        it('should support Farsi (RTL)', () => {
            const html = getTerminalHtml('fa', 'fa-IR', true, null, null);
            expect(html).toContain('dir="rtl"');
            expect(html).toContain('ترمینال');
        });

        it('should support Chinese', () => {
            const html = getTerminalHtml('zh', 'zh-CN', false, null, null);
            expect(html).toContain('终端');
        });
    });

    describe('getSubscriptionPageHtml (Dashboard)', () => {
        it('should return valid HTML structure', () => {
            const html = getSubscriptionPageHtml('en', 'en-US', false, null, {});
            expect(html).toContain('<!DOCTYPE html>');
            expect(html).toContain('<html lang="en-US" dir="ltr" class="dashboard">');
            expect(html).toContain('<title>Configuration Dashboard</title>');
        });

        it('should include key dashboard sections', () => {
            const html = getSubscriptionPageHtml('en', 'en-US', false, null, {});
            expect(html).toContain('System Status');
            expect(html).toContain('Configuration Management');
            expect(html).toContain('Latency Test');
            expect(html).toContain('id="regionValue"');
            expect(html).toContain('id="ipValue"');
        });

        it('should include CSS styles and animations', () => {
            const html = getSubscriptionPageHtml('en', 'en-US', false, null, {});
            expect(html).toContain('.card {');
            expect(html).toContain('animation: fadeIn');
            expect(html).toContain('@keyframes fadeIn');
        });

        it('should include client-side scripts', () => {
            const html = getSubscriptionPageHtml('en', 'en-US', false, null, {});
            expect(html).toContain('async function fetchStatus()');
            expect(html).toContain('async function saveConfig()');
        });

        it('should support Farsi translation in dashboard', () => {
            const html = getSubscriptionPageHtml('fa', 'fa-IR', true, null, {});
            expect(html).toContain('dir="rtl"');
            expect(html).toContain('داشبورد تنظیمات'); // Dashboard Title in Farsi
            expect(html).toContain('وضعیت سیستم'); // System Status
        });

        it('should support Chinese translation in dashboard', () => {
            const html = getSubscriptionPageHtml('zh', 'zh-CN', false, null, {});
            expect(html).toContain('配置仪表盘');
            expect(html).toContain('系统状态');
        });
    });

    describe('Edge Cases', () => {
        it('should default to English if lang is missing', () => {
            const html = getTerminalHtml(null, 'en-US', false, null, null);
            expect(html).toContain('<html lang="en-US" dir="ltr">');
            expect(html).toContain('Terminal');
        });

        it('should default to English translations if lang is unknown', () => {
            const html = getTerminalHtml('fr', 'fr-FR', false, null, null);
            expect(html).toContain('Terminal'); // Default English title
        });

        it('should default to English for dashboard if lang is missing', () => {
             const html = getSubscriptionPageHtml(null, 'en-US', false, null, {});
             expect(html).toContain('Configuration Dashboard');
        });

        it('should default to English translations for dashboard if lang is unknown', () => {
             const html = getSubscriptionPageHtml('fr', 'fr-FR', false, null, {});
             expect(html).toContain('Configuration Dashboard');
        });
    });
});
