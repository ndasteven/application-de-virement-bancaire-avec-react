import React from 'react';
import { LayoutDashboard, Users, RefreshCcw, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { id: 'clients', icon: Users, label: 'Clients' },
    { id: 'transfers', icon: RefreshCcw, label: 'Virements' },
  ];

  return (
    <div className="bg-indigo-800 text-white w-64 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8 p-2">
        <Users className="w-8 h-8" />
        <span className="text-xl font-bold">BanqueWeb</span>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors
              ${activeTab === item.id 
                ? 'bg-indigo-700 text-white' 
                : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'}`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="w-full flex items-center gap-3 p-3 rounded-lg mt-auto text-indigo-200 hover:bg-indigo-700 hover:text-white absolute bottom-4 left-0 right-0 mx-4">
        <LogOut className="w-5 h-5 flex-shrink-0" />
        <span className="truncate">Déconnexion</span>
      </button>
    </div>
  );
}