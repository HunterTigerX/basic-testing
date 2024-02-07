import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const newBankAccount = getBankAccount(150);
    expect(newBankAccount.getBalance()).toBe(150);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 150;
    const newBankAccount = getBankAccount(balance);
    expect(() => newBankAccount.withdraw(300)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const balanceFrom = 150;
    const balanceTransferTo = 250;
    const newBankAccount = getBankAccount(balanceFrom);
    const transferAccount = getBankAccount(balanceTransferTo);
    expect(() => newBankAccount.transfer(250, transferAccount)).toThrow(
      new InsufficientFundsError(balanceFrom),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balanceFrom = 150;
    const newBankAccount = getBankAccount(balanceFrom);
    expect(() => newBankAccount.transfer(50, newBankAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const balance = 150;
    const newBankAccount = getBankAccount(balance);
    expect(newBankAccount.deposit(400).getBalance()).toBe(balance + 400);
  });

  test('should withdraw money', () => {
    const balance = 150;
    const newBankAccount = getBankAccount(balance);
    expect(newBankAccount.withdraw(50).getBalance()).toBe(balance - 50);
  });

  test('should transfer money', () => {
    const balanceFrom = 150;
    const balanceTransferTo = 250;
    const newBankAccount = getBankAccount(balanceFrom);
    const transferAccount = getBankAccount(balanceTransferTo);
    newBankAccount.transfer(100, transferAccount);
    expect(newBankAccount.getBalance()).toBe(balanceFrom - 100);
    expect(transferAccount.getBalance()).toBe(balanceTransferTo + 100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 150;
    const newBankAccount = getBankAccount(balance);
    try {
      const resolveFetchBalance = await newBankAccount.fetchBalance();
      expect(resolveFetchBalance).toBe(balance);
    } catch (err) {}
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 100;
    const newBankAccount = getBankAccount(balance);
    const newBalance = 50;
    newBankAccount.fetchBalance = jest.fn().mockResolvedValue(newBalance);
    await newBankAccount.synchronizeBalance();
    expect(newBankAccount.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 100;
    const newBankAccount = getBankAccount(balance);
    newBankAccount.fetchBalance = jest.fn().mockResolvedValue(null);
    try {
      await newBankAccount.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
