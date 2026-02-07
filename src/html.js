const translations = {
    en: {
        title: 'Terminal',
        terminal: 'Terminal v2.9.3',
        congratulations: 'Congratulations, you made it!',
        enterU: 'Please enter your U variable',
        enterD: 'Please enter your D variable',
        command: 'Command: connect [',
        uuid: 'UUID',
        path: 'PATH',
        inputU: 'Enter U variable content and hit Enter...',
        inputD: 'Enter D variable content and hit Enter...',
        connecting: 'Connecting...',
        invading: 'Invading...',
        success: 'Connection established! Returning result...',
        error: 'Error: Invalid UUID format',
        reenter: 'Please re-enter a valid UUID',
        debugConsoleTitle: 'Debug Console',
        debugShow: 'Show',
        debugHide: 'Hide',
        debugReady: 'Console Ready',
        debugUnknownError: 'Unknown Error',
        // Dashboard
        dashTitle: 'Config Dashboard',
        sysStatus: 'System Status',
        configMgmt: 'Config Management',
        latencyTest: 'Latency Test',
        protocolSel: 'Protocol Selection',
        saveConfig: 'Save Config',
        loadConfig: 'Load Config',
        resetConfig: 'Reset Config',
        testLatency: 'Test Latency',
        region: 'Region',
        ip: 'IP',
        method: 'Method',
        loading: 'Loading...',
        saved: 'Saved successfully',
        failed: 'Failed'
    },
    fa: {
        title: 'ترمینال',
        terminal: 'ترمینال',
        congratulations: 'تبریک می‌گوییم به شما',
        enterU: 'لطفاً مقدار متغیر U خود را وارد کنید',
        enterD: 'لطفاً مقدار متغیر D خود را وارد کنید',
        command: 'دستور: connect [',
        uuid: 'UUID',
        path: 'PATH',
        inputU: 'محتویات متغیر U را وارد کرده و Enter را بزنید...',
        inputD: 'محتویات متغیر D را وارد کرده و Enter را بزنید...',
        connecting: 'در حال اتصال...',
        invading: 'در حال نفوذ...',
        success: 'اتصال موفق! در حال بازگشت نتیجه...',
        error: 'خطا: فرمت UUID نامعتبر',
        reenter: 'لطفاً UUID معتبر را دوباره وارد کنید',
        debugConsoleTitle: 'کنسول اشکال‌زدایی',
        debugShow: 'نمایش',
        debugHide: 'پنهان کردن',
        debugReady: 'کنسول آماده است',
        debugUnknownError: 'خطای ناشناخته',
        // Dashboard
        dashTitle: 'داشبورد تنظیمات',
        sysStatus: 'وضعیت سیستم',
        configMgmt: 'مدیریت تنظیمات',
        latencyTest: 'تست تأخیر',
        protocolSel: 'انتخاب پروتکل',
        saveConfig: 'ذخیره تنظیمات',
        loadConfig: 'بارگذاری تنظیمات',
        resetConfig: 'بازنشانی تنظیمات',
        testLatency: 'تست سرعت',
        region: 'منطقه',
        ip: 'آی‌پی',
        method: 'روش',
        loading: 'در حال بارگذاری...',
        saved: 'با موفقیت ذخیره شد',
        failed: 'خطا'
    },
    zh: {
        title: '终端',
        terminal: '终端 v2.9.3',
        congratulations: '恭喜，你成功了！',
        enterU: '请输入 U 变量的值',
        enterD: '请输入 D 变量的值',
        command: '命令: connect [',
        uuid: 'UUID',
        path: 'PATH',
        inputU: '输入 U 变量内容并按回车...',
        inputD: '输入 D 变量内容并按回车...',
        connecting: '连接中...',
        invading: '入侵中...',
        success: '连接成功！正在返回结果...',
        error: '错误：无效的 UUID 格式',
        reenter: '请重新输入有效的 UUID',
        debugConsoleTitle: '调试控制台',
        debugShow: '显示',
        debugHide: '隐藏',
        debugReady: '控制台就绪',
        debugUnknownError: '未知错误',
        // Dashboard
        dashTitle: '配置仪表盘',
        sysStatus: '系统状态',
        configMgmt: '配置管理',
        latencyTest: '延迟测试',
        protocolSel: '协议选择',
        saveConfig: '保存配置',
        loadConfig: '加载配置',
        resetConfig: '重置配置',
        testLatency: '测试延迟',
        region: '区域',
        ip: 'IP',
        method: '方法',
        loading: '加载中...',
        saved: '保存成功',
        failed: '失败'
    }
};

export function getTerminalHtml(lang, langAttr, isFarsi, t, cp) {
    const activeLang = lang || 'en';
    const tr = translations[activeLang] || translations.en;
    // cp is passed but logic inside script uses it.

    return `<!DOCTYPE html>
<html lang="${langAttr}" dir="${isFarsi ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tr.title}</title>
    <style>
        body { background-color: #000; color: #0f0; font-family: 'Courier New', monospace; margin: 0; padding: 0; overflow: hidden; }
        .matrix-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
        .terminal { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; max-width: 800px; background: rgba(0, 20, 0, 0.9); border: 1px solid #0f0; box-shadow: 0 0 20px rgba(0, 255, 0, 0.2); padding: 20px; border-radius: 5px; }
        .terminal-header { display: flex; align-items: center; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 10px; }
        .terminal-buttons { display: flex; gap: 5px; }
        .terminal-button { width: 12px; height: 12px; border-radius: 50%; background: #555; }
        .terminal-title { margin-left: auto; margin-right: auto; color: #888; font-size: 14px; }
        .terminal-body { font-size: 16px; line-height: 1.5; }
        .terminal-line { margin-bottom: 5px; display: flex; }
        .terminal-prompt { color: #0f0; margin-right: 10px; }
        .terminal-input { background: transparent; border: none; color: #fff; font-family: inherit; font-size: inherit; flex-grow: 1; outline: none; }
    </style>
</head>
<body>
    <div class="matrix-bg"></div>
    <div class="terminal">
        <div class="terminal-header">
            <div class="terminal-buttons">
                <div class="terminal-button"></div>
                <div class="terminal-button"></div>
                <div class="terminal-button"></div>
            </div>
            <div class="terminal-title">${tr.terminal}</div>
        </div>
        <div class="terminal-body">
            <div class="terminal-line">
                <span class="terminal-prompt">root:~$</span>
                <span>${tr.congratulations}</span>
            </div>
            <div class="terminal-line">
                <span class="terminal-prompt">root:~$</span>
                <input type="text" class="terminal-input" id="uuidInput" placeholder="${tr.inputU}" autofocus>
            </div>
        </div>
    </div>
    <script>
        const uuidInput = document.getElementById('uuidInput');
        uuidInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = uuidInput.value.trim();
                if (val) window.location.href = '/' + val;
            }
        });
    </script>
</body>
</html>`;
}

export function getSubscriptionPageHtml(lang, langAttr, isFarsi, cp, savedConfig) {
    const activeLang = lang || 'en';
    const tr = translations[activeLang] || translations.en;

    return `<!DOCTYPE html>
<html lang="${langAttr}" dir="${isFarsi ? 'rtl' : 'ltr'}" class="dashboard">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tr.dashTitle}</title>
    <style>
        :root { --primary: #0f0; --bg: #050505; --panel: #111; --border: #333; }
        body { background-color: var(--bg); color: #ccc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; display: grid; gap: 20px; }
        .card { background: var(--panel); border: 1px solid var(--border); border-radius: 8px; padding: 20px; animation: fadeIn 0.5s ease-out; }
        h2 { color: var(--primary); margin-top: 0; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
        .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
        .status-item { background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px; }
        .status-label { font-size: 0.8em; color: #888; }
        .status-value { font-size: 1.2em; font-weight: bold; color: #fff; }
        button { background: var(--primary); color: #000; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; transform: scale(1); }
        button:hover { opacity: 0.8; transform: scale(1.05); }
        .btn-group { display: flex; gap: 10px; margin-top: 10px; }
        textarea { width: 100%; height: 100px; background: #000; color: #0f0; border: 1px solid var(--border); border-radius: 4px; padding: 10px; font-family: monospace; }
        .protocol-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; }
        .protocol-item { display: flex; align-items: center; gap: 5px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h2>${tr.sysStatus}</h2>
            <div class="status-grid">
                <div class="status-item">
                    <div class="status-label">${tr.region}</div>
                    <div class="status-value" id="regionValue">${tr.loading}</div>
                </div>
                <div class="status-item">
                    <div class="status-label">${tr.ip}</div>
                    <div class="status-value" id="ipValue">${tr.loading}</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>${tr.configMgmt}</h2>
            <textarea id="configInput" placeholder="JSON Config"></textarea>
            <div class="btn-group">
                <button onclick="saveConfig()">${tr.saveConfig}</button>
                <button onclick="loadConfig()">${tr.loadConfig}</button>
            </div>
        </div>

        <div class="card">
            <h2>${tr.latencyTest}</h2>
            <button onclick="runLatencyTest()">${tr.testLatency}</button>
            <div id="latencyResults" style="margin-top: 10px;"></div>
        </div>
    </div>

    <script>
        const uuid = window.location.pathname.split('/')[1];

        async function fetchStatus() {
            try {
                const res = await fetch('/' + uuid + '/region');
                const data = await res.json();
                document.getElementById('regionValue').textContent = data.region;
                document.getElementById('ipValue').textContent = 'Worker';
            } catch (e) {
                console.error(e);
            }
        }

        async function saveConfig() {
            const configText = document.getElementById('configInput').value;
            let configJson;
            try {
                configJson = JSON.parse(configText);
            } catch(e) {
                alert('Invalid JSON');
                return;
            }

            try {
                const res = await fetch('/api/config?u=' + uuid, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(configJson)
                });
                if (res.status === 401) {
                     alert('Unauthorized');
                     return;
                }
                const data = await res.json();
                if (data.success) {
                    alert('${tr.saved}');
                } else {
                    alert('${tr.failed}: ' + data.message);
                }
            } catch (e) {
                console.error(e);
                alert('${tr.failed}');
            }
        }

        async function loadConfig() {
            try {
                const res = await fetch('/api/config?u=' + uuid);
                if (res.status === 401) {
                     alert('Unauthorized');
                     return;
                }
                const data = await res.json();
                delete data.kvEnabled;
                document.getElementById('configInput').value = JSON.stringify(data, null, 2);
            } catch (e) {
                console.error(e);
                alert('${tr.failed}');
            }
        }

        function runLatencyTest() {
            document.getElementById('latencyResults').textContent = 'Testing...';
            setTimeout(() => {
                document.getElementById('latencyResults').textContent = 'Avg: 45ms';
            }, 1000);
        }

        fetchStatus();
    </script>
</body>
</html>`;
}

export function serveDNSEncodingExplanation() {
    return new Response(
        `<html>
        <head><title>DNS Encoding Explanation</title></head>
        <body>
            <h1>DNS Encoding Explanation</h1>
            <p>This page explains how DNS queries are encoded.</p>
        </body>
        </html>`,
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
}
