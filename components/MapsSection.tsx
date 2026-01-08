import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Info, ExternalLink, Globe, Layers, Map as MapIcon, Loader2 } from 'lucide-react';
import { ItineraryData, Activity } from '../types';

// Declare google global to avoid TypeScript namespace errors
declare var google: any;

interface Props {
  data: ItineraryData;
  updateData: (d: ItineraryData) => void;
}

const MapsSection: React.FC<Props> = ({ data }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useState<any>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any | null>(null);

  // Extract locations for the current view
  const activeDay = data.days[selectedDayIndex] || data.days[0];
  const dayLocations = activeDay.activities.filter(a => a.lat && a.lng);
  
  // All locations for the summary index
  const allLocationsWithDates = data.days.flatMap(day => 
    day.activities.map(act => ({
      ...act,
      date: day.date
    }))
  ).filter(loc => loc.lat && loc.lng);

  // Dynamic script loading to handle the API key correctly
  useEffect(() => {
    if (typeof google !== 'undefined' && google.maps) {
      setIsLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&v=weekly&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // Only initialize once script is loaded and ref is available
    if (!isLoaded || !mapRef.current || typeof google === 'undefined') return;

    const initialMap = new google.maps.Map(mapRef.current, {
      center: { lat: 41.7151, lng: 44.8271 }, // Center on Tbilisi
      zoom: 12,
      styles: [
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#7c7c7c" }]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }]
        }
      ],
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
    });

    setGoogleMap(initialMap);
  }, [isLoaded]);

  useEffect(() => {
    // Check if googleMap and google are both available
    if (!googleMap || typeof google === 'undefined') return;

    // Clear existing markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // Clear existing polyline
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    if (dayLocations.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    const path: any[] = [];

    dayLocations.forEach((loc, idx) => {
      const position = { lat: loc.lat!, lng: loc.lng! };
      path.push(position);
      bounds.extend(position);

      const marker = new google.maps.Marker({
        position,
        map: googleMap,
        title: loc.title,
        label: {
          text: (idx + 1).toString(),
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold'
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#000000', 
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: 'white',
          scale: 14,
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; font-family: 'Inter', sans-serif; min-width: 150px;">
            <div style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 2px;">${loc.time}</div>
            <div style="font-size: 14px; font-weight: 800; color: #000000; margin-bottom: 4px;">${loc.title}</div>
            <div style="font-size: 11px; color: #64748b; font-style: italic;">${loc.location}</div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMap, marker);
      });

      markersRef.current.push(marker);
    });

    // Draw connecting line
    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#1d4ed8', // flighty-blue
      strokeOpacity: 0.8,
      strokeWeight: 3,
      icons: [{
        icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
        offset: '50%',
        repeat: '100px'
      }]
    });

    polyline.setMap(googleMap);
    polylineRef.current = polyline;

    // Adjust zoom if multiple markers
    if (dayLocations.length > 1) {
      googleMap.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
    } else if (dayLocations.length === 1) {
      googleMap.setCenter(path[0]);
      googleMap.setZoom(14);
    }

  }, [googleMap, selectedDayIndex, data.days]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Controls */}
        <div className="w-full lg:w-64 space-y-6 shrink-0">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">Route Timeline</h3>
            <div className="space-y-1.5">
              {data.days.map((day, idx) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`w-full text-left px-5 py-4 rounded-2xl transition-all border ${
                    selectedDayIndex === idx 
                    ? 'bg-black text-white border-black flighty-shadow' 
                    : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className={`text-[9px] font-black uppercase tracking-tighter mb-0.5 ${selectedDayIndex === idx ? 'opacity-60' : 'text-gray-400'}`}>
                    Day 0{idx + 1}
                  </div>
                  <div className="font-bold text-[13px] tracking-tight truncate">
                    {day.activities.find(a => a.tag === 'Sightseeing')?.title || 'Travel Logistics'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white rounded-[2rem] border border-gray-100 flighty-card">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Waypoints</h4>
            <div className="space-y-4">
              {dayLocations.map((loc, idx) => (
                <div key={loc.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-black text-white rounded-lg flex items-center justify-center text-[10px] font-black shrink-0">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12px] font-black text-black truncate leading-tight">{loc.title}</div>
                    <div className="text-[9px] text-gray-400 font-bold mt-0.5 mono-time uppercase">{loc.time}</div>
                  </div>
                </div>
              ))}
              {dayLocations.length === 0 && (
                <div className="text-[11px] text-gray-400 italic">No GPS coordinates logged for today</div>
              )}
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 bg-white p-3 rounded-[2.5rem] flighty-card min-h-[550px] relative overflow-hidden">
          {!isLoaded ? (
            <div className="w-full h-full min-h-[550px] rounded-[2rem] bg-gray-50 flex flex-col items-center justify-center gap-4">
              <Loader2 size={32} className="text-gray-300 animate-spin" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Initialising Mapping Engine...</span>
            </div>
          ) : (
            <div ref={mapRef} className="w-full h-full min-h-[550px] rounded-[2rem] bg-gray-50 overflow-hidden" />
          )}
          
          {/* Floating Map Legend */}
          <div className="absolute top-8 left-8">
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-4">
               <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
                  <MapIcon size={18} />
               </div>
               <div>
                  <div className="text-[11px] font-black text-black uppercase tracking-widest leading-none">Global Navigation</div>
                  <div className="text-[9px] text-gray-400 font-bold mt-1.5 uppercase tracking-tighter">{activeDay.activities.length} Active Nodes</div>
               </div>
            </div>
          </div>

          {/* Share/External Link */}
          <div className="absolute bottom-8 right-8">
            <button className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/50 shadow-2xl flex items-center gap-2 hover:bg-black hover:text-white transition-all group active:scale-95">
              <Globe size={16} className="group-hover:rotate-45 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-widest">Sync Coordinates</span>
            </button>
          </div>
        </div>
      </div>

      {/* Waypoint Index List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flighty-card p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 text-black rounded-lg flex items-center justify-center border border-gray-100 shadow-sm">
                <Layers size={18} />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-black">Logistics Manifest</h3>
            </div>
            <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-widest">{allLocationsWithDates.length} Waypoints</span>
          </div>
          
          <div className="space-y-2 max-h-72 overflow-y-auto pr-3 custom-scrollbar">
            {allLocationsWithDates.map((loc) => (
              <div key={loc.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full group-hover:scale-125 transition-all shadow-[0_0_8px_rgba(29,78,216,0.3)]" />
                  <div>
                    <div className="text-[13px] font-black text-black tracking-tight">{loc.title}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{loc.location}</div>
                  </div>
                </div>
                <div className="text-[10px] font-black text-gray-500 bg-white border border-gray-100 px-3 py-1.5 rounded-xl uppercase tracking-tighter shadow-sm">
                  {new Date(loc.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black p-10 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <Globe size={220} className="absolute -right-24 -bottom-24 text-white opacity-[0.05] rotate-12 transition-transform group-hover:scale-110 duration-700" />
            
            <div className="w-16 h-16 bg-white/10 text-white rounded-[1.5rem] flex items-center justify-center mb-8 backdrop-blur-md shadow-xl">
              <ExternalLink size={28} />
            </div>
            <h4 className="text-xl font-black text-white mb-3 tracking-tighter">Mobile Handshake</h4>
            <p className="text-[13px] text-gray-400 mb-10 max-w-xs font-bold leading-relaxed">
              Generate a secure handover link to export all travel vectors directly to your primary mobile navigation software.
            </p>
            <button className="bg-white text-black px-10 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5">
              Secure Export
            </button>
        </div>
      </div>
    </div>
  );
};

export default MapsSection;