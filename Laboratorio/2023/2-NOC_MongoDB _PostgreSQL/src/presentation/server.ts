import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(new PostgresLogDatasource());

const fileSysteRepository = new LogRepositoryImpl(new FileSystemDatasource());
const postgresRepository = new LogRepositoryImpl(new PostgresLogDatasource());
const mongoRepository = new LogRepositoryImpl(new MongoLogDatasource());

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob("*/10 * * * * *", () => {
      const url = "https://google.com";

      new CheckServiceMultiple(
        () => console.log(`${url} is ok`),
        (error) => console.log(error),
        [fileSysteRepository, postgresRepository, mongoRepository]
      ).execute(url);
    });
  }
}
