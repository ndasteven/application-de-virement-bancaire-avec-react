export interface Client {
  id: string;
  name: string;
  email: string;
  balance: number;
  accountNumber: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  description: string;
  fromAccount?: string;
  toAccount?: string;
}