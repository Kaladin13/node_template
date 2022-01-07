import winston, {format, transports} from "winston";


export const Logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'node_template_project' },
    transports: [
        //
        // - Write to all logs with level `info` and below to 'logs/error.log'.
        // - Write all logs error (and below) to 'logs/combined.log' and to the console.
        //
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
    ]
})

if (process.env.NODE_ENV !== 'production') {
    Logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}