import { describe, it, expect } from 'vitest';
import { getTerminalHtml, serveDNSEncodingExplanation, getSubscriptionPageHtml } from '../src/html.js';

describe('html.js', () => {
    it('serveDNSEncodingExplanation should return correct response', () => {
        const res = serveDNSEncodingExplanation();
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    });

    it('getTerminalHtml should return HTML string', () => {
        const html = getTerminalHtml('en', 'en-US', false, null, '/custom');
        expect(html).toContain('<!DOCTYPE html>');
        expect(html).toContain('Terminal');
        expect(html).toContain('/custom');
    });

    it('getSubscriptionPageHtml should return HTML string', () => {
        const html = getSubscriptionPageHtml({}, 'en-US', false, '', {});
        expect(html).toContain('Placeholder');
    });
});
