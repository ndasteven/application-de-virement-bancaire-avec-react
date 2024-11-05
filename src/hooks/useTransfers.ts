import { useState, useCallback } from 'react';
import { mockClients } from '../data';
import { Transaction } from '../types';

export function useTransfers() {
  const [transfer, setTransfer] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: '',
  });

  const handleTransfer = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const fromClient = mockClients.find(c => c.accountNumber === transfer.fromAccount);
    const toClient = mockClients.find(c => c.accountNumber === transfer.toAccount);
    
    if (!fromClient || !toClient) return;
    
    const amount = parseFloat(transfer.amount);
    if (fromClient.balance < amount) {
      alert('Solde insuffisant');
      return;
    }

    // In a real app, this would be handled by the backend
    fromClient.balance -= amount;
    toClient.balance += amount;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount: -amount,
      type: 'transfer',
      description: transfer.description,
      fromAccount: transfer.fromAccount,
      toAccount: transfer.toAccount,
    };

    console.log('Transaction effectuée:', newTransaction);
    
    setTransfer({
      fromAccount: '',
      toAccount: '',
      amount: '',
      description: '',
    });
  }, [transfer]);

  return {
    transfer,
    setTransfer,
    handleTransfer,
  };
}