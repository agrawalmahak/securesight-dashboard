// src/components/IncidentTimeline.tsx
'use client';

import type { IncidentWithCamera } from '@/types';

const typeColors: { [key:string]: string } = {
  'Unauthorised Access': 'bg-yellow-500',
  'Gun Threat': 'bg-red-600',
  'Face Recognised': 'bg-blue-500',
  'Smoke Detected': 'bg-gray-500',
};

interface IncidentTimelineProps {
  incidents: IncidentWithCamera[];
  selectedIncident: IncidentWithCamera | null;
  onSelectIncident: (incident: IncidentWithCamera) => void;
}

export default function IncidentTimeline({ incidents, selectedIncident, onSelectIncident }: IncidentTimelineProps) {
  const totalMinutesInDay = 24 * 60;

  const calculatePosition = (timestamp: string) => {
    const date = new Date(timestamp);
    const minutes = date.getHours() * 60 + date.getMinutes();
    return (minutes / totalMinutesInDay) * 100;
  };

  const scrubberPosition = selectedIncident ? calculatePosition(selectedIncident.tsStart) : -100;

  return (
    <div className="w-full bg-gray-800 p-4 border-t border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Incident Timeline (24h)</h3>
      <div className="relative w-full h-16">
        {/* The main timeline bar */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-600 rounded-full" />
        
        {/* Hour markers */}
        {Array.from({ length: 9 }).map((_, i) => {
          const hour = i * 3;
          return (
            <div key={`hour-${i}`} className="absolute top-1/2 -translate-y-1/2 text-center" style={{ left: `${(hour / 24) * 100}%` }}>
              <div className="h-4 w-px bg-gray-500" />
              <span className="text-xs text-gray-500 mt-2 absolute -translate-x-1/2">{`${hour.toString().padStart(2, '0')}:00`}</span>
            </div>
          );
        })}

        {/* Incident markers */}
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`absolute top-1/2 w-3 h-3 rounded-full -translate-y-1/2 -translate-x-1/2 cursor-pointer transition-transform hover:scale-150 ${typeColors[incident.type] || 'bg-white'}`}
            style={{ left: `${calculatePosition(incident.tsStart)}%` }}
            title={`${incident.type} at ${new Date(incident.tsStart).toLocaleTimeString()}`}
            onClick={() => onSelectIncident(incident)} // <-- Add this click handler
          />
        ))}

        {/* Scrubber (Playhead) */}
        <div 
          className="absolute top-1/2 h-5 w-1 bg-blue-400 rounded-full -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
          style={{ left: `${scrubberPosition}%` }}
        />
      </div>
    </div>
  );
}