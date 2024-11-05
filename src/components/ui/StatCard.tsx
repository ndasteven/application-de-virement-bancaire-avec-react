import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  label: string;
  value: string | number;
  gradient?: 'default' | 'purple' | 'blue' | 'green';
}

export function StatCard({ 
  icon: Icon, 
  iconColor, 
  iconBgColor, 
  label, 
  value,
  gradient = 'default'
}: StatCardProps) {
  return (
    <Card gradient={gradient} className="group">
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconBgColor} p-3 rounded-lg transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
    </Card>
  );
}