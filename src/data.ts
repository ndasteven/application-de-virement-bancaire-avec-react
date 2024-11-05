import { Client, Transaction } from './types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    balance: 5000.00,
    accountNumber: 'FR7630001007941234567890185',
  },
  {
    id: '2',
    name: 'Marie Laurent',
    email: 'marie@example.com',
    balance: 3500.00,
    accountNumber: 'FR7630001007941234567890186',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-15',
    amount: 1000.00,
    type: 'deposit',
    description: 'Dépôt salaire',
  },
  {
    id: '2',
    date: '2024-03-14',
    amount: -50.00,
    type: 'withdrawal',
    description: 'Retrait DAB',
  },
  {
    id: '3',
    date: '2024-03-13',
    amount: -200.00,
    type: 'transfer',
    description: 'Virement à Marie Laurent',
    fromAccount: 'FR7630001007941234567890185',
    toAccount: 'FR7630001007941234567890186',
  },
];