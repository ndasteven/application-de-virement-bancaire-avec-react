import { useState, useCallback } from 'react';
import { mockClients } from '../data';
import { Client } from '../types';

export function useClients() {
  const [clients, setClients] = useState(mockClients);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.accountNumber.includes(searchTerm)
  );

  const addClient = useCallback((newClient: Omit<Client, 'id'>) => {
    const client: Client = {
      ...newClient,
      id: (clients.length + 1).toString(),
    };
    setClients(prev => [...prev, client]);
  }, [clients]);

  const deleteClient = useCallback((id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  }, []);

  return {
    clients: filteredClients,
    searchTerm,
    setSearchTerm,
    addClient,
    deleteClient
  };
}