import React, { useState } from 'react';
import { Plus, Trash2, Clock, MapPin, MoreHorizontal, ChevronRight, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ItineraryData, Activity, TagType } from '../types';

interface Props {
  data: ItineraryData;
  updateData: (d: ItineraryData) => void;
}

const CalendarSection: React.FC<Props> = ({ data, updateData }) => {
  const [selectedDayId, setSelectedDayId] = useState(data.days[0].id);

  const activeDay = data.days.find(d => d.id === selectedDayId) || data.days[0];

  const updateActivity = (activityId: string, updates: Partial<Activity>) => {
    const newDays = data.days.map(d => {
      if (d.id === selectedDayId) {
        const updatedActivities = d.activities.map(a => a.id === activityId ? { ...a, ...updates } : a);
        if (updates.time) {
          updatedActivities.sort((a, b) => a.time.localeCompare(b.time));
        }
        return { ...d, activities: updatedActivities };
      }
      return d;
    });
    updateData({ ...data, days: newDays });
  };

  const getTagStyle = (tag: TagType) => {
    switch (tag) {
      case 'Travel': return 'text-blue-600 bg-blue-50';
      case 'Hotel': return 'text-purple-600 bg-purple-50';
      case 'Sightseeing': return 'text-emerald-600 bg-emerald-50';
      case 'Food': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-10">
      {/* Top Floating Day Picker */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {data.days.map((day, idx) => (
          <button
            key={day.id}
            onClick={() => setSelectedDayId(day.id)}
            className={`flex-none px-6 py-4 rounded-[1.5rem] border transition-all ${
              selectedDayId === day.id 
              ? 'bg-black text-white border-black shadow-2xl scale-105 z-10' 
              : 'bg-white text-gray-400 border-transparent hover:bg-gray-50'
            }`}
          >
            <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Day 0{idx + 1}</div>
            <div className="text-sm font-black tracking-tight flex items-center gap-2">
              {new Date(day.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            </div>
          </button>
        ))}
        <button className="flex-none w-14 h-14 rounded-[1.5rem] bg-white border border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:text-black hover:border-black transition-all">
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2 mb-2">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Events Feed</h3>
           <div className="h-px flex-1 mx-4 bg-gray-100"></div>
           <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-1">
             Auto-Sort <ChevronRight size={10} />
           </button>
        </div>

        <div className="space-y-3 relative">
          <AnimatePresence mode="popLayout">
            {activeDay.activities.map((activity, idx) => (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="group relative"
              >
                {/* Horizontal Timeline Block */}
                <div className="flighty-card flex items-center overflow-hidden hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
                  {/* Left Column: TIME (Bigger, Bolder, Monospace-ish) */}
                  <div className="w-28 flex flex-col items-center justify-center border-r border-gray-50 bg-gray-50/30 py-6 shrink-0">
                    <input 
                      type="time" 
                      value={activity.time}
                      onChange={(e) => updateActivity(activity.id, { time: e.target.value })}
                      className="text-xl font-black text-black mono-time tracking-tighter text-center w-full focus:text-blue-600 cursor-pointer"
                    />
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Scheduled</span>
                  </div>

                  {/* Right Column: CONTENT */}
                  <div className="flex-1 p-6 flex items-center gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${getTagStyle(activity.tag)}`}>
                          {activity.tag}
                        </span>
                        <div className="h-1 w-1 bg-gray-200 rounded-full"></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Confirmation: {activity.id.toUpperCase().slice(0, 5)}</span>
                      </div>
                      
                      <input 
                        value={activity.title}
                        onChange={(e) => updateActivity(activity.id, { title: e.target.value })}
                        className="text-lg font-black text-black w-full outline-none tracking-tight block truncate mb-1"
                        placeholder="Activity Title"
                      />
                      
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-gray-300" strokeWidth={2.5} />
                        <input 
                          value={activity.location}
                          onChange={(e) => updateActivity(activity.id, { location: e.target.value })}
                          className="text-xs font-semibold text-gray-400 w-full outline-none italic truncate"
                          placeholder="Add Location"
                        />
                      </div>
                    </div>

                    {/* Action Column */}
                    <div className="flex items-center gap-2">
                      <div className="hidden lg:block w-px h-10 bg-gray-50 mx-2"></div>
                      <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-300 hover:text-black hover:border-black transition-all shadow-sm">
                        <MoreHorizontal size={16} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 hover:scale-110 active:scale-95 transition-all">
                        <Navigation size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Micro Connector */}
                {idx !== activeDay.activities.length - 1 && (
                  <div className="h-3 ml-14 border-l-2 border-dotted border-gray-200"></div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Item Trigger */}
          <button className="w-full mt-6 py-6 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-gray-300 hover:text-black hover:border-black hover:bg-white transition-all group">
            <Plus size={24} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add Entry to Log</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;