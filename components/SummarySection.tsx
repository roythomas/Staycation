import React, { useState } from 'react';
import { Plane, Star, MapPin, Users, Phone, Info, ChevronRight, Globe } from 'lucide-react';
import { ItineraryData } from '../types';

interface Props {
  data: ItineraryData;
  updateData: (d: ItineraryData) => void;
}

const SummarySection: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      {/* Primary Status Card (Flighty Vibe) */}
      <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-600 rounded-lg text-[9px] font-black uppercase tracking-[0.15em]">Live</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trip Identifier #TBS-2025</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter mb-2">Adventure in Sakartvelo</h2>
            <div className="flex items-center gap-4 text-gray-400 font-bold text-sm tracking-tight">
              <span className="flex items-center gap-1.5"><Globe size={14} /> {data.destination}</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span>{new Date(data.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(data.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-10 md:border-l md:border-white/10 md:pl-10 shrink-0">
            <div className="text-center">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Travelers</div>
              <div className="text-2xl font-black tracking-tighter">{data.travelers.length} PAX</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Duration</div>
              <div className="text-2xl font-black tracking-tighter">6 DAYS</div>
            </div>
          </div>
        </div>
        <Plane size={180} className="absolute right-[-40px] bottom-[-40px] text-white opacity-[0.03] transform -rotate-45" />
      </div>

      {/* Info Pills Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flighty-card p-6 flex items-center gap-4 hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
             <MapPin size={24} />
          </div>
          <div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Destination</div>
            <div className="text-sm font-black text-black tracking-tight">{data.destination}</div>
          </div>
        </div>
        
        <div className="flighty-card p-6 flex items-center gap-4 hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
             <Users size={24} />
          </div>
          <div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Capacity</div>
            <div className="text-sm font-black text-black tracking-tight">{data.travelers.length} Travelers</div>
          </div>
        </div>

        <div className="flighty-card p-6 flex items-center gap-4 hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
             <Phone size={24} />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Helpdesk</div>
            <div className="text-sm font-black text-black tracking-tight truncate">{data.summary.emergencyContact}</div>
          </div>
        </div>
      </div>

      {/* Highlights Feed */}
      <div className="flighty-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Star size={18} fill="black" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Highlights Feed</h3>
          </div>
          <button className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Manage Items</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.summary.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-4 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all group">
              <div className="w-8 h-8 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-[11px] font-black shadow-sm group-hover:scale-110 transition-transform">
                {String(i + 1).padStart(2, '0')}
              </div>
              <span className="text-sm font-extrabold tracking-tight text-gray-800">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummarySection;