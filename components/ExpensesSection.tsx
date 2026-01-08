
import React from 'react';
import { CreditCard, DollarSign, Plus, Trash2, Wallet, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ItineraryData, Expense } from '../types';

interface Props {
  data: ItineraryData;
  updateData: (d: ItineraryData) => void;
}

const ExpensesSection: React.FC<Props> = ({ data, updateData }) => {
  const addExpense = () => {
    const newExpense: Expense = {
      id: Math.random().toString(36).substr(2, 9),
      category: 'Food',
      description: 'New Expense',
      paidBy: data.travelers[0].name,
      amount: 0,
      currency: 'USD',
      splitBetween: data.travelers.map(t => t.name)
    };
    updateData({ ...data, expenses: [...data.expenses, newExpense] });
  };

  const totalsByCategory = data.expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(totalsByCategory).map(key => ({
    name: key,
    value: totalsByCategory[key]
  }));

  const totalBudget = data.expenses.reduce((sum, e) => sum + e.amount, 0);
  const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 bg-slate-900 p-8 rounded-[2.5rem] text-white premium-shadow transition-transform hover:scale-[1.01]">
          <div className="flex justify-between items-start mb-10">
            <div className="bg-white/10 p-2.5 rounded-xl">
              <Wallet size={20} />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <ArrowUpRight size={14} /> Total Est.
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-widest">Global Budget</p>
            <h3 className="text-4xl font-black tracking-tighter">$ {totalBudget.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-50 premium-shadow md:col-span-2">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Allocation</h4>
           <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#94a3b8', textAnchor: 'middle'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '10px'}}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-white rounded-[2.5rem] premium-shadow border border-gray-50 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-slate-50/30">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Line Items</h3>
          <button 
            onClick={addExpense}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-900 hover:text-white transition-all premium-shadow"
          >
            <Plus size={14} className="inline mr-1" /> New Entry
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-gray-50">
                <th className="py-5 px-8">Category</th>
                <th className="py-5 px-4">Description</th>
                <th className="py-5 px-4">Paid By</th>
                <th className="py-5 px-4">Amount</th>
                <th className="py-5 px-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.expenses.map((expense) => (
                <tr key={expense.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-8">
                    <span className="text-[10px] font-black px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg border border-slate-100 uppercase tracking-tighter">
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <input 
                      value={expense.description}
                      onChange={(e) => {}} 
                      className="text-xs font-bold text-slate-700 bg-transparent outline-none w-full"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs font-medium text-slate-400">{expense.paidBy}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 font-black text-xs text-slate-900">
                      $ {expense.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-8 text-right">
                    <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpensesSection;
