import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe("CheckServiceMultiple UseCase", () => {
  const mockLogRepo1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockLogRepo2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockLogRepo3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();
  const callLogsCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    successCallback,
    errorCallback,
    [mockLogRepo1, mockLogRepo2, mockLogRepo3]
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch returns true", async () => {
    const wasSuccesfully = await checkServiceMultiple.execute(
      "https://google.com"
    );

    expect(wasSuccesfully).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    expect(mockLogRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
  //
  test("should call errorsCAllback when fetch returns false", async () => {
    const wasSuccesfully = await checkServiceMultiple.execute(
      "https://googleasdae1231.com"
    );

    expect(wasSuccesfully).toBe(false);
    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();

    expect(mockLogRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
