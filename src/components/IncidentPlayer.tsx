'use client';

import type { IncidentWithCamera } from '@/types';

export default function IncidentPlayer({ incident }: { incident: IncidentWithCamera | null }) {
  if (!incident) {
    return (
      <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
        No Incident Selected
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Main Video Frame */}
      <div className="w-full aspect-video bg-black rounded-lg mb-4 relative">
        <video
          key={incident.id}
          src={incident.videoUrl || '/CCTV_Video_Generation_Completed.mp4'}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/60 to-transparent w-full rounded-b-lg">
          <p className="text-white font-semibold">{incident.camera.name}: {incident.camera.location}</p>
        </div>
      </div>


<div className="flex gap-4 h-32">
  <div className="w-1/2 bg-black rounded-lg relative overflow-hidden">
    <video
      src="/Jewelry_Shop_Video_Ready.mp4" // <-- Use local path
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black/60 to-transparent w-full text-sm">
      CAM-02: Vault
    </div>
  </div>
  <div className="w-1/2 bg-black rounded-lg relative overflow-hidden">
    <video
      src="/Video_Clip_Generation_Complete.mp4" // <-- Use local path
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black/60 to-transparent w-full text-sm">
      CAM-03: Main Entrance
    </div>
  </div>
</div>
    </div>
  );
}