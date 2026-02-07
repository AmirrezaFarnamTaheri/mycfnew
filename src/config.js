let kvStore = null;
let kvConfig = {};

export async function initKVStore(env) {
    if (env.C) {
        try {
            kvStore = env.C;
            await loadKVConfig();
        } catch (error) {
            kvStore = null;
        }
    } else {
        kvStore = null; // Explicitly set to null if env.C is missing
    }
}

async function loadKVConfig() {
    if (!kvStore) return;
    try {
        const configData = await kvStore.get('c');
        if (configData) {
            kvConfig = JSON.parse(configData);
        }
    } catch (error) {
        kvConfig = {};
    }
}

export async function saveKVConfig() {
    if (!kvStore) return;
    try {
        const configString = JSON.stringify(kvConfig);
        await kvStore.put('c', configString);
    } catch (error) {
        throw error;
    }
}

export function getConfigValue(key, defaultValue = '') {
    if (kvConfig[key] !== undefined) {
        return kvConfig[key];
    }
    return defaultValue;
}

export async function setConfigValue(key, value) {
    kvConfig[key] = value;
    await saveKVConfig();
}

export function getFullConfig() {
    return { ...kvConfig };
}

export function updateFullConfig(newConfig) {
     for (const [key, value] of Object.entries(newConfig)) {
        if (value === '' || value === null || value === undefined) {
            delete kvConfig[key];
        } else {
            kvConfig[key] = value;
        }
    }
}

export function isKVEnabled() {
    return !!kvStore;
}
