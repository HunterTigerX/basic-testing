import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const timeoutNumber = 1000;
    const callback = jest.fn();
    doStuffByTimeout(callback, timeoutNumber);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeoutNumber);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    jest.spyOn(global, 'setTimeout');
    const timeoutNumber = 1000;
    const callback = () => {
      console.log('callback only after timeout');
    };
    doStuffByTimeout(callback, timeoutNumber);
    expect(consoleSpy).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(consoleSpy).toHaveBeenCalledWith('callback only after timeout');
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeoutNumber);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const consoleSpy = jest.spyOn(console, 'log');
    const timeoutNumber = 1000;
    const callback = () => {
      console.log('interval log');
    };
    doStuffByInterval(callback, timeoutNumber);
    jest.advanceTimersByTime(timeoutNumber);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(intervalSpy).toHaveBeenLastCalledWith(callback, timeoutNumber);
    expect(consoleSpy).toHaveBeenCalledWith('interval log');
  });

  test('should call callback multiple times after multiple intervals', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const timeoutNumber = 1000;
    const advancedInterval = 10000;
    const callback = jest.fn();
    doStuffByInterval(callback, timeoutNumber);
    jest.advanceTimersByTime(advancedInterval);
    expect(callback).toHaveBeenCalledTimes(advancedInterval / timeoutNumber);
    expect(intervalSpy).toHaveBeenLastCalledWith(callback, timeoutNumber);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinCallSpy = jest.spyOn(path, 'join');
    const testPath = './hi/';
    await readFileAsynchronously(testPath);
    expect(joinCallSpy).toHaveBeenCalledTimes(1);
    expect(joinCallSpy).toHaveBeenLastCalledWith(__dirname, testPath);
  });

  test('should return null if file does not exist', async () => {
    const joinCallSpy = jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const testPath = './hi.txt';
    const fileContent = await readFileAsynchronously(testPath);
    expect(fileContent).toBe(null);
    expect(joinCallSpy).toHaveBeenLastCalledWith(__dirname, testPath);
  });

  test('should return file content if file exists', async () => {
    const testPath = './hi.txt';
    const mockedFileContent = 'Mocked file content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    (fsPromises.readFile as jest.Mock).mockResolvedValue(
      Buffer.from(mockedFileContent),
    );
    const fileContent = await readFileAsynchronously(testPath);
    expect(fileContent).toBe(mockedFileContent);
  });
});
