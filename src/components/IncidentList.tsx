'use client';

import { motion } from 'framer-motion';
import type { IncidentWithCamera } from '@/types';

const typeColors: { [key: string]: string } = {
  'Unauthorised Access': 'border-yellow-500',
  'Gun Threat': 'border-red-600',
  'Face Recognised': 'border-blue-500',
  'Smoke Detected': 'border-gray-500',
};
interface IncidentListProps {
  incidents: IncidentWithCamera[];
  counts: { unresolved: number; resolved: number }; // <-- Change to this
  onSelectIncident: (incident: IncidentWithCamera) => void;
  onResolveIncident: (id: string) => void;
  selectedIncidentId?: string;
}


export default function IncidentList({ incidents, counts, onSelectIncident, selectedIncidentId }: IncidentListProps) 
  {
  return (
    <div>
      <h2 className="text-lg font-semibold">Unresolved Incidents ({counts.unresolved})</h2>
      <div className="space-y-3">
        {incidents.map((incident) => (
          <motion.div
            key={incident.id}
            layout
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer bg-gray-800 border-l-4 transition-colors hover:bg-gray-700/50 ${selectedIncidentId === incident.id ? 'bg-gray-700' : ''} ${typeColors[incident.type] || 'border-gray-400'}`}
            onClick={() => onSelectIncident(incident)}
          >
            <img src={incident.thumbnailUrl} alt={incident.type} className="w-24 h-16 object-cover rounded bg-gray-900" />
            <div className="flex-1">
              <p className="font-bold">{incident.type}</p>
              <p className="text-sm text-gray-400">{incident.camera.location}</p>
              <p className="text-xs text-gray-500">
                {new Date(incident.tsStart).toLocaleString()}
              </p>
            </div>
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                onResolveIncident(incident.id);
              }}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Resolve
            </button> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
}