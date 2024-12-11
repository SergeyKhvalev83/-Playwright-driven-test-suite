import winston from "winston";
import path from "path";
import moment from "moment-timezone";

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");
const loggingDir = path.resolve(srcDir, "logging");
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});


const timeZone = "Asia/Kolkata";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: () => moment().tz(timeZone).format() }),
    customFormat
  ),
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: path.join(loggingDir, "test_run.log"),
      maxFiles: 5, // Number of log files to retain
      maxsize: 300 * 1024, // 10 * 1024 ==10 KB, specify the size in bytes
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(loggingDir, "test_error.log"),
      maxFiles: 5, // Number of log files to retain
      maxsize: 10 * 1024, // 10 KB, specify the size in bytes
      level: "error",
    }),
  ],
});


export default logger;