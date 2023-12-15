export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;

    const { message, level, createdAt, origin } = JSON.parse(json);

    if (!message) throw new Error("Message is required");
    if (!level) throw new Error("level is required");
    if (!createdAt) throw new Error("createdAt is required");

    const log = new LogEntity({ message, level, createdAt, origin });

    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;

    const log = new LogEntity({ message, level, createdAt, origin });

    return log;
  };
}
