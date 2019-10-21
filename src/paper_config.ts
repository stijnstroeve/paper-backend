export interface PaperConfig {
    environment: "development" | "production",
    suppressWarnings: boolean, //TODO: implement
    suppressMessages: boolean,
    express?: ExpressPaperConfig
}

export interface ExpressPaperConfig {
    port?: number
}