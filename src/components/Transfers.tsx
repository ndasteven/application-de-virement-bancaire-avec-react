import React, { useState } from 'react';
import { mockClients } from '../data';
import { Card } from './ui/Card';
import { Alert } from './ui/Alert';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { useTransfers } from '../hooks/useTransfers';

export default function Transfers() {
  const { transfer, setTransfer, handleTransfer } = useTransfers();
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState<{ id: number; message: string }[]>([]);

  const addAlert = (message: string) => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message }]);
  };

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const validateAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transfer.fromAccount) {
      addAlert('Veuillez sélectionner un compte émetteur');
      return;
    }
    if (!transfer.toAccount) {
      addAlert('Veuillez sélectionner un compte bénéficiaire');
      return;
    }
    if (!transfer.amount || parseFloat(transfer.amount) <= 0) {
      addAlert('Veuillez saisir un montant valide');
      return;
    }
    if (!transfer.description.trim()) {
      addAlert('Veuillez saisir une description');
      return;
    }

    setIsLoading(true);
    
    try {
      await handleTransfer(e);
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAlerts([{ id: Date.now(), message: 'Virement effectué avec succès' }]);
    } catch (error) {
      addAlert('Une erreur est survenue lors du virement');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <h1 className="text-xl lg:text-2xl font-bold mb-6">Effectuer un virement</h1>

      {alerts.map(alert => (
        <Alert
          key={alert.id}
          message={alert.message}
          type={alert.message.includes('succès') ? 'success' : 'error'}
          onClose={() => removeAlert(alert.id)}
        />
      ))}

      <Card gradient="purple" className="max-w-2xl mx-auto">
        <form onSubmit={validateAndSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Compte émetteur</label>
            <select
              className="w-full p-2 border rounded-lg bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              value={transfer.fromAccount}
              onChange={(e) => setTransfer({ ...transfer, fromAccount: e.target.value })}
            >
              <option value="">Sélectionnez un compte</option>
              {mockClients.map((client) => (
                <option key={client.id} value={client.accountNumber}>
                  {client.name} - {client.accountNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Compte bénéficiaire</label>
            <select
              className="w-full p-2 border rounded-lg bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              value={transfer.toAccount}
              onChange={(e) => setTransfer({ ...transfer, toAccount: e.target.value })}
            >
              <option value="">Sélectionnez un compte</option>
              {mockClients.map((client) => (
                <option key={client.id} value={client.accountNumber}>
                  {client.name} - {client.accountNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Montant</label>
            <div className="relative">
              <input
                type="number"
                className="w-full p-2 border rounded-lg pr-8 bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                value={transfer.amount}
                onChange={(e) => setTransfer({ ...transfer, amount: e.target.value })}
                min="0.01"
                step="0.01"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-2 border rounded-lg bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              value={transfer.description}
              onChange={(e) => setTransfer({ ...transfer, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Traitement en cours...
                </>
              ) : (
                'Effectuer le virement'
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}