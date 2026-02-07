const fs = require('fs');
const { getTerminalHtml } = require('./src/html.js');

// Mock browser environment for canvas
// Since we can't easily run a full browser here without more setup,
// we will verify the HTML structure and key elements are present.

const html = getTerminalHtml('en', 'en-US', false, null, '/custom');

console.log('Verifying HTML structure...');

if (!html.includes('<!DOCTYPE html>')) throw new Error('Missing DOCTYPE');
if (!html.includes('<title>Terminal</title>')) throw new Error('Missing Title');
if (!html.includes('class="matrix-bg"')) throw new Error('Missing Matrix BG');
if (!html.includes('id="debugConsole"')) throw new Error('Missing Debug Console');
if (!html.includes('id="uuidInput"')) throw new Error('Missing UUID Input');
if (!html.includes('window.changeLanguage')) throw new Error('Missing Language Script');
if (!html.includes('console.log = function')) throw new Error('Missing Console Override');

console.log('Frontend verification passed: HTML structure is valid.');
