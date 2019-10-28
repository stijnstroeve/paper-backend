import rateLimit from "express-rate-limit";

export interface PaperConfig {
    environment: "development" | "production",
    suppressWarnings: boolean,
    suppressMessages: boolean,
    express?: ExpressPaperConfig
}

export interface ExpressPaperConfig {
    port?: number,
    rateLimitOptions?: rateLimit.Options
}
