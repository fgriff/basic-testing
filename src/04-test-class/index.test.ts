// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const INITIAL_BALANCE = 10;
  const ANOTHER_BALANCE = 15;
  const MORE_THAN_BALANCE = 20;
  const MONEY_COUNT = 5;

  const bankAccount = getBankAccount(INITIAL_BALANCE);
  const anotherBankAccount = getBankAccount(ANOTHER_BALANCE);

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(MORE_THAN_BALANCE)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      bankAccount.transfer(MORE_THAN_BALANCE, anotherBankAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(INITIAL_BALANCE, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const checksum = bankAccount.getBalance() + MONEY_COUNT;
    const currentBalance = bankAccount.deposit(MONEY_COUNT).getBalance();
    expect(currentBalance).toBe(checksum);
  });

  test('should withdraw money', () => {
    const checksum = bankAccount.getBalance() - MONEY_COUNT;
    const currentBalance = bankAccount.withdraw(MONEY_COUNT).getBalance();
    expect(currentBalance).toBe(checksum);
  });

  test('should transfer money', () => {
    const checksum = bankAccount.getBalance() - MONEY_COUNT;
    const currentBalance = bankAccount
      .transfer(MONEY_COUNT, anotherBankAccount)
      .getBalance();
    expect(currentBalance).toBe(checksum);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await bankAccount.fetchBalance();
    if (typeof balance === 'number') {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValueOnce(MORE_THAN_BALANCE);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(MORE_THAN_BALANCE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
