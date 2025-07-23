import type { Camera, Incident } from '@prisma/client';

export type IncidentWithCamera = Incident & {
  camera: Camera;
  videoUrl?: string; // Make sure this is in your type
};