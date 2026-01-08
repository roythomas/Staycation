import React, { useState, useEffect } from 'react';
import { 
  Calendar, Map as MapIcon, ShieldCheck, Home, 
  CreditCard, CheckSquare, Briefcase, Menu, X, 
  Globe, Plane, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_DATA } from './constants';
import { ItineraryData } from './types';

// UI Components
import SummarySection from './components/SummarySection';
import CalendarSection from './components/CalendarSection';
import VisaSection from './components/VisaSection';
import StaysSection from './components/StaysSection';
import ExpensesSection from './components/ExpensesSection';
import ChecklistSection from './components/ChecklistSection';
import MapsSection from './components/MapsSection';

const App: React.FC = () => {
  const [data, setData] = useState<ItineraryData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<string>('calendar');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('georgia_itinerary');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved data");
      }
    }
  }, []);

  const updateData = (newData: ItineraryData) => {
    setData(newData);
    localStorage.setItem('georgia_itinerary', JSON.stringify(newData));
  };

  const navItems = [
    { id: 'summary', label: 'Summary', icon: Briefcase },
    { id: 'calendar', label: 'Itinerary', icon: Calendar },
    { id: 'map', label: 'Routes', icon: MapIcon },
    { id: 'visa', label: 'Travelers', icon: ShieldCheck },
    { id: 'stays', label: 'Stays', icon: Home },
    { id: 'expenses', label: 'Finance', icon: CreditCard },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'summary': return <SummarySection data={data} updateData={updateData} />;
      case 'calendar': return <CalendarSection data={data} updateData={updateData} />;
      case 'map': return <MapsSection data={data} updateData={updateData} />;
      case 'visa': return <VisaSection data={data} updateData={updateData} />;
      case 'stays': return <StaysSection data={data} updateData={updateData} />;
      case 'expenses': return <ExpensesSection data={data} updateData={updateData} />;
      case 'checklist': return <ChecklistSection data={data} updateData={updateData} />;
      default: return <SummarySection data={data} updateData={updateData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F2F4F7]">
      {/* Flighty Integrated Sidebar */}
      <aside className={`fixed h-screen ${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-100 transition-all duration-500 ease-in-out z-50 flex flex-col`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
            <Plane size={20} className="transform -rotate-45" />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight leading-none">Dreamliner's</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Explorer</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 ${
                activeTab === item.id 
                ? 'bg-black text-white shadow-xl translate-x-1' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-black'
              }`}
            >
              <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              {isSidebarOpen && <span className="text-[13px] font-bold tracking-tight">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-black transition-all"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Top Integrated Header */}
          <header className="flex items-center justify-between mb-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Active Itinerary</span>
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-black flex items-center gap-2">
                {navItems.find(n => n.id === activeTab)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-bold text-gray-400 uppercase leading-none">Status</span>
                  <span className="text-xs font-black text-black leading-none mt-1">On Track</span>
                </div>
                <div className="w-2 h-8 bg-gray-50 rounded-full overflow-hidden">
                  <div className="h-2/3 bg-green-500 w-full"></div>
                </div>
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;