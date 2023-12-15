import { envs } from "./env.plugin";

describe("envs.plugis.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      POR: 3001,
      MAILER_EMAIL: "fernando.gerezmartinez@gmail.com",
      MAILER_SECRET_KEY: "123123123",
      MAILER_SERVICE: "gmail",
      PROD: false,
      MONGO_URL: "mongodb://luisfer:123456789@localhost:27018",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "luisfer",
      MONGO_PASS: "123456789",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./env.plugin");

      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
