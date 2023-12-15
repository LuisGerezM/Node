import nodemailer from "nodemailer";
import { EmailService, SendMailOptions } from "./email.service";

describe("EmailService", () => {
  const mockSendMail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  test("should send email ", async () => {
    const options: SendMailOptions = {
      to: "luis@gmail.com",
      subject: "Test",
      htmlBody: "<h1>Test</h1>",
    };

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: [],
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "luis@gmail.com",
    });
  });

  test("should send email with attachments", async () => {
    const email = "luis@mail.com";

    await emailService.sendEmailWithFileSystemsLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "Logs del servidor",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: "logs-all.log", path: "./logs/logs-all.log" },
        { filename: "logs-high.log", path: "./logs/logs-high.log" },
        {
          filename: "logs-medium.log",
          path: "./logs/logs-medium.log",
        },
      ]),
    });
  });
});
