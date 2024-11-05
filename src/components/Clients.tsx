import React, { useState } from 'react';
import { Plus, Search, Edit, Trash } from 'lucide-react';
import { Card } from './ui/Card';
import { useClients } from '../hooks/useClients';
import { Client } from '../types';

export default function Clients() {
  const { clients, searchTerm, setSearchTerm, addClient, deleteClient } = useClients();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState<Partial<Client>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.email || !newClient.balance) return;

    addClient({
      name: newClient.name,
      email: newClient.email,
      balance: newClient.balance,
      accountNumber: `FR76${Math.random().toString().slice(2, 20)}`,
    });

    setShowAddModal(false);
    setNewClient({});
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl lg:text-2xl font-bold">Gestion des clients</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" />
          Nouveau client
        </button>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 px-6">Nom</th>
                  <th className="pb-3 px-6">Email</th>
                  <th className="pb-3 px-6">N° de compte</th>
                  <th className="pb-3 px-6 text-right">Solde</th>
                  <th className="pb-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b last:border-0">
                    <td className="py-3 px-6">{client.name}</td>
                    <td className="py-3 px-6">{client.email}</td>
                    <td className="py-3 px-6 font-mono text-sm">{client.accountNumber}</td>
                    <td className="py-3 px-6 text-right">{client.balance.toLocaleString('fr-FR')} €</td>
                    <td className="py-3 px-6">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button 
                          onClick={() => deleteClient(client.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Trash className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Ajouter un nouveau client</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={newClient.name || ''}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-lg"
                  value={newClient.email || ''}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Solde initial</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg"
                  value={newClient.balance || ''}
                  onChange={(e) => setNewClient({ ...newClient, balance: Number(e.target.value) })}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}