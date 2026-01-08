
import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, UserPlus, ShieldAlert } from 'lucide-react';
import { ItineraryData, Traveler } from '../types';

interface Props {
  data: ItineraryData;
  updateData: (d: ItineraryData) => void;
}

const VisaSection: React.FC<Props> = ({ data, updateData }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTraveler, setNewTraveler] = useState<Partial<Traveler>>({
    name: '',
    group: 'A',
    visaStatus: 'Pending',
    visaRequired: true
  });

  const updateTraveler = (id: string, updates: Partial<Traveler>) => {
    const next = data.travelers.map(t => t.id === id ? { ...t, ...updates } : t);
    updateData({ ...data, travelers: next });
  };

  const removeTraveler = (id: string) => {
    updateData({ ...data, travelers: data.travelers.filter(t => t.id !== id) });
  };

  const addTraveler = () => {
    if (!newTraveler.name) return;
    const traveler: Traveler = {
      id: Math.random().toString(36).substr(2, 9),
      name: newTraveler.name!,
      group: newTraveler.group!,
      visaStatus: newTraveler.visaStatus as any,
      visaRequired: newTraveler.visaRequired!
    };
    updateData({ ...data, travelers: [...data.travelers, traveler] });
    setNewTraveler({ name: '', group: 'A', visaStatus: 'Pending', visaRequired: true });
    setIsAdding(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="text-green-500" size={18} />;
      case 'In Progress': return <AlertCircle className="text-orange-500" size={18} />;
      case 'Not Required': return <CheckCircle2 className="text-blue-500" size={18} />;
      default: return <Circle className="text-gray-300" size={18} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Traveler Passports & Visas</h2>
          <p className="text-indigo-200 text-sm max-w-md">Track the documentation status for all group members. Group A (Doha) and Group B (Kochi) have different requirements.</p>
        </div>
        <ShieldAlert className="absolute right-[-20px] top-[-20px] w-48 h-48 text-indigo-800 opacity-50 rotate-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.travelers.map((traveler) => (
          <div key={traveler.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${traveler.group === 'A' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'}`}>
                  {traveler.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{traveler.name}</h4>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">Group {traveler.group}</span>
                    {traveler.visaRequired && <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-red-50 text-red-500 rounded-full">Visa Required</span>}
                  </div>
                </div>
              </div>
              <button onClick={() => removeTraveler(traveler.id)} className="text-gray-300 hover:text-red-500 p-2">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
               <div className="flex-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Visa Status</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                    {getStatusIcon(traveler.visaStatus)}
                    <select 
                      value={traveler.visaStatus}
                      onChange={(e) => updateTraveler(traveler.id, { visaStatus: e.target.value as any })}
                      className="bg-transparent text-sm font-semibold outline-none w-full cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Not Required">Not Required</option>
                    </select>
                  </div>
               </div>

               <div className="flex items-center gap-2 sm:mt-6">
                 <input 
                   type="checkbox" 
                   checked={traveler.visaRequired} 
                   onChange={(e) => updateTraveler(traveler.id, { visaRequired: e.target.checked })}
                   className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                 />
                 <span className="text-xs font-medium text-gray-500">Requires Visa Entry</span>
               </div>
            </div>
          </div>
        ))}

        <button 
          onClick={() => setIsAdding(true)}
          className="h-full min-h-[160px] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-indigo-500 hover:border-indigo-200 transition-all bg-gray-50/50"
        >
          <UserPlus size={32} />
          <span className="font-bold">Add New Traveler</span>
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Add Traveler</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Full Name</label>
                <input 
                  autoFocus
                  value={newTraveler.name} 
                  onChange={(e) => setNewTraveler({...newTraveler, name: e.target.value})}
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Group</label>
                  <select 
                    value={newTraveler.group} 
                    onChange={(e) => setNewTraveler({...newTraveler, group: e.target.value})}
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent"
                  >
                    <option value="A">Group A</option>
                    <option value="B">Group B</option>
                    <option value="Local">Local</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Requirement</label>
                  <select 
                    value={String(newTraveler.visaRequired)} 
                    onChange={(e) => setNewTraveler({...newTraveler, visaRequired: e.target.value === 'true'})}
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent"
                  >
                    <option value="true">Visa Needed</option>
                    <option value="false">Exempt</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setIsAdding(false)} className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-100 rounded-2xl transition-colors">Cancel</button>
                <button onClick={addTraveler} className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaSection;
