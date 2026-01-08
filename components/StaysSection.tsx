
import React from 'react';
import { Home, Calendar, Users, DollarSign, Plus, Trash2, MapPin } from 'lucide-react';
import { ItineraryData, Stay } from '../types';

interface Props {
  data: ItineraryData;
  updateData: (d: ItineraryData) => void;
}

const StaysSection: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
            <Home size={18} />
            Accommodation
          </h3>
          <p className="text-xs font-medium text-slate-400 mt-1">Managed lodging details</p>
        </div>
        <button 
          className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all premium-shadow shadow-slate-200"
        >
          <Plus size={14} /> Add Stay
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {data.stays.map((stay) => (
          <div key={stay.id} className="bg-white rounded-[2.5rem] premium-shadow border border-gray-50 overflow-hidden group transition-all hover:scale-[1.005]">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-80 h-48 lg:h-auto bg-slate-50 relative shrink-0">
                <img 
                  src={`https://picsum.photos/seed/${stay.id}/800/600`} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
                  alt="Hotel"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
                  <MapPin size={12} className="text-indigo-500" strokeWidth={3} />
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{stay.city}</span>
                </div>
              </div>

              <div className="flex-1 p-8 lg:p-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="max-w-md">
                    <input 
                      value={stay.hotelName}
                      onChange={(e) => {}} 
                      className="text-2xl font-black text-slate-900 outline-none border-b-2 border-transparent w-full tracking-tighter"
                    />
                    <div className="flex items-center gap-2 mt-1.5">
                       <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-400 rounded-lg">
                        {stay.roomType}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 text-slate-200 hover:text-rose-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar size={12} /> Duration
                    </div>
                    <div className="text-xs font-bold text-slate-700 tracking-tight">
                      {new Date(stay.checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} – {new Date(stay.checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Users size={12} /> Guests
                    </div>
                    <div className="text-xs font-bold text-slate-700 tracking-tight">
                      {stay.occupants.length} Travelers
                    </div>
                  </div>

                  <div className="space-y-1.5 text-right sm:text-left">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center sm:justify-start justify-end gap-1.5">
                      <DollarSign size={12} /> Pricing
                    </div>
                    <div className="text-lg font-black text-slate-900 tracking-tighter">
                      $ {stay.cost.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50">
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Internal Notes</div>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                    {stay.notes || "No additional check-in instructions provided yet."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaysSection;
