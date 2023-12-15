import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe("sendEmailLogs", () => {
  const mockEmailService = {
    sendEmailWithFileSystemsLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call sendEmail and saveLog", async () => {
    const wasSuccesfully = await sendEmailLogs.execute("luis@mail.com");

    expect(wasSuccesfully).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemsLogs).toHaveBeenCalledTimes(
      1
    );

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Log email sent",
      origin: "send-email-logs.ts",
    });
  });

  test("should log in case of error", async () => {
    mockEmailService.sendEmailWithFileSystemsLogs.mockResolvedValue(false);

    const wasSuccesfully = await sendEmailLogs.execute("luis@mail.com");

    expect(wasSuccesfully).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemsLogs).toHaveBeenCalledTimes(
      1
    );

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error: Email log not sent",
      origin: "send-email-logs.ts",
    });
  });
});
