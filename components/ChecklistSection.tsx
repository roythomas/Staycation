
import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Trash2 } from 'lucide-react';
import { ItineraryData, ChecklistItem } from '../types';

interface Props {
  data: ItineraryData;
  updateData: (d: ItineraryData) => void;
}

const ChecklistSection: React.FC<Props> = ({ data, updateData }) => {
  const [filter, setFilter] = useState<string>('all');

  const toggleItem = (id: string) => {
    const next = data.checklist.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    updateData({ ...data, checklist: next });
  };

  const filteredItems = data.checklist.filter(item => {
    if (filter === 'pending') return !item.isCompleted;
    if (filter === 'completed') return item.isCompleted;
    return true;
  });

  const progress = Math.round((data.checklist.filter(i => i.isCompleted).length / data.checklist.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Progress Card */}
      <div className="bg-white p-8 rounded-[2.5rem] premium-shadow border border-gray-50 text-center">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Readiness Index</h3>
        <div className="text-4xl font-black text-slate-900 tracking-tighter mb-6">{progress}%</div>
        <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
          <div 
            className="h-full bg-slate-900 transition-all duration-1000 ease-out rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {data.checklist.filter(i => i.isCompleted).length} / {data.checklist.length} Completed
        </p>
      </div>

      {/* Main List */}
      <div className="bg-white rounded-[2.5rem] premium-shadow border border-gray-50 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-slate-50/30">
          <div className="flex gap-1.5 p-1 bg-white border border-slate-100 rounded-xl">
            {(['all', 'pending', 'completed']).map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all ${
                  filter === f ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="p-2 bg-slate-900 text-white rounded-xl hover:scale-110 transition-transform shadow-lg shadow-slate-200">
            <Plus size={18} />
          </button>
        </div>

        <div className="divide-y divide-slate-50">
          {filteredItems.map((item) => (
            <div key={item.id} className="flex items-center gap-5 p-6 hover:bg-slate-50/50 transition-colors group">
              <button 
                onClick={() => toggleItem(item.id)}
                className={`transition-all ${item.isCompleted ? 'text-indigo-500 scale-105' : 'text-slate-200 hover:text-slate-400'}`}
              >
                {item.isCompleted ? <CheckSquare size={24} strokeWidth={3} /> : <Square size={24} strokeWidth={2} />}
              </button>
              
              <div className="flex-1 min-w-0">
                <input 
                  value={item.task}
                  onChange={(e) => {}} 
                  className={`w-full bg-transparent outline-none font-bold text-sm tracking-tight transition-all ${item.isCompleted ? 'text-slate-300 line-through' : 'text-slate-800'}`}
                />
                <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">{item.category}</div>
              </div>

              <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-200 hover:text-rose-500 transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChecklistSection;
