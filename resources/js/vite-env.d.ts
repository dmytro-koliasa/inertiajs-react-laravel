/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME?: string;
    // добавьте другие переменные окружения здесь
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob<T = any>(pattern: string): Record<string, () => Promise<T>>;
}
