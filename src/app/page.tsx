// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import type { IncidentWithCamera } from '@/types';
import IncidentList from '@/components/IncidentList';
import IncidentPlayer from '@/components/IncidentPlayer';
import Header from '@/components/Header';
import IncidentTimeline from '@/components/IncidentTimeline';

export default function DashboardPage() {
  const [incidents, setIncidents] = useState<IncidentWithCamera[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<IncidentWithCamera | null>(null);
  const [counts, setCounts] = useState({ unresolved: 0, resolved: 0 });
 

  useEffect(() => {
    // Fetch both the incidents list and the counts at the same time
    Promise.all([
      fetch('/api/incidents?resolved=false').then(res => res.json()),
      fetch('/api/incidents/counts').then(res => res.json())
    ]).then(([incidentsData, countsData]) => {
      setIncidents(incidentsData);
      setCounts(countsData);
      if (incidentsData.length > 0) {
        setSelectedIncident(incidentsData[0]);
      }
    }).catch(error => {
      console.error("Failed to fetch initial data:", error);
    })
  }, []);

  const handleResolve = async (incidentId: string) => {
    // Optimistic UI update for the list
    setIncidents(prev => prev.filter(inc => inc.id !== incidentId));

    // Optimistic UI update for the counts
    setCounts(prev => ({
      unresolved: prev.unresolved - 1,
      resolved: prev.resolved + 1,
    }));

    if (selectedIncident?.id === incidentId) {
      const remaining = incidents.filter(inc => inc.id !== incidentId);
      setSelectedIncident(remaining.length > 0 ? remaining[0] : null);
    }
    
    await fetch(`/api/incidents/${incidentId}/resolve`, { method: 'PATCH' });
  };

  // ... the return statement is the same, but we need to update the props passed to IncidentList
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 p-4">
          <div className="md:sticky md:top-24">
            <IncidentPlayer incident={selectedIncident} />
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4 border-t md:border-t-0 md:border-l border-gray-700">
          <IncidentList
            incidents={incidents}
            counts={counts} 
            onSelectIncident={setSelectedIncident}
            onResolveIncident={handleResolve}
            selectedIncidentId={selectedIncident?.id}
          />
        </div>
      </main>
      <footer className="w-full">
        <IncidentTimeline
          incidents={incidents}
          selectedIncident={selectedIncident}
          onSelectIncident={setSelectedIncident}
        />
      </footer>
    </div>
  );
}