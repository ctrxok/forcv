declare namespace NodeJS {
    interface ProcessEnv {
        DB_URI: string;
        DB_NAME: string;
        CLIENT_ID: string;
        CLIENT_SECRET: string;
        REDIRECT_URI: string;
        TELEGRAM_BOT_TOKEN: string;
        WEBHOOK_DOMAIN: string;
        WEBHOOK_PATH: string;
        PORT: string;
    }
}


