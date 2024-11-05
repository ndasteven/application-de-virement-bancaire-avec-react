import React from 'react';
import { ArrowUpRight, Users, RefreshCcw } from 'lucide-react';
import { mockTransactions, mockClients } from '../data';
import { Card } from './ui/Card';
import { StatCard } from './ui/StatCard';

export default function Dashboard() {
  const totalBalance = mockClients.reduce((sum, client) => sum + client.balance, 0);
  const totalClients = mockClients.length;
  const totalTransactions = mockTransactions.length;

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <h1 className="text-xl lg:text-2xl font-bold mb-6">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          icon={ArrowUpRight}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          label="Total des avoirs"
          value={`${totalBalance.toLocaleString('fr-FR')} €`}
          gradient="green"
        />
        <StatCard
          icon={Users}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          label="Clients actifs"
          value={totalClients}
          gradient="blue"
        />
        <StatCard
          icon={RefreshCcw}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
          label="Transactions"
          value={totalTransactions}
          gradient="purple"
        />
      </div>

      <Card gradient="blue">
        <h2 className="text-lg font-semibold mb-4">Dernières transactions</h2>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 px-6">Date</th>
                  <th className="pb-3 px-6">Description</th>
                  <th className="pb-3 px-6">Type</th>
                  <th className="pb-3 px-6 text-right">Montant</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 last:border-0 hover:bg-white/50 transition-colors">
                    <td className="py-3 px-6 whitespace-nowrap">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-6">{transaction.description}</td>
                    <td className="py-3 px-6">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs lg:text-sm ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100 text-green-800'
                          : transaction.type === 'withdrawal'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {transaction.type === 'deposit' 
                          ? 'Dépôt'
                          : transaction.type === 'withdrawal'
                          ? 'Retrait'
                          : 'Virement'
                        }
                      </span>
                    </td>
                    <td className={`py-3 px-6 text-right whitespace-nowrap ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount.toLocaleString('fr-FR')} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}