// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Cameras
  const camera1 = await prisma.camera.create({
    data: { name: 'CAM-01', location: 'Shop Floor A' },
  });
  const camera2 = await prisma.camera.create({
    data: { name: 'CAM-02', location: 'Vault' },
  });
  const camera3 = await prisma.camera.create({
    data: { name: 'CAM-03', location: 'Main Entrance' },
  });
  console.log('Created 3 cameras.');

  // 2. Create Incidents
  const now = new Date();
  
  // Define only your local video URL
  const videoUrls =
  { ShopFloor:'/Video_Link_Provided.mp4',
    Vault:'/Jewelry_Shop_Video_Ready.mp4',
    MainEntrance:'/Video_Clip_Generation_Complete.mp4',

  };

const incidents = [
  // Incidents for Main Entrance (Camera 3) use videoUrls.MainEntrance
  { type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 2 * 3600000), tsEnd: new Date(now.getTime() - (2 * 60 - 1) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb1/400/300', videoUrl: videoUrls.MainEntrance, cameraId: camera3.id },
  { type: 'Gun Threat', tsStart: new Date(now.getTime() - 7 * 3600000), tsEnd: new Date(now.getTime() - (7 * 60 - 2) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb10/400/300', videoUrl: videoUrls.MainEntrance, cameraId: camera3.id },
  { type: 'Gun Threat', tsStart: new Date(now.getTime() - 10 * 3600000), tsEnd: new Date(now.getTime() - (10 * 60 - 1) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb5/400/300', videoUrl: videoUrls.MainEntrance, cameraId: camera3.id },
  { type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 11 * 3600000), tsEnd: new Date(now.getTime() - (11 * 60 - 1.5) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb12/400/300', videoUrl: videoUrls.MainEntrance, cameraId: camera3.id },

  // Incidents for Shop Floor (Camera 1) use videoUrls.ShopFloor
  { type: 'Gun Threat', tsStart: new Date(now.getTime() - 1 * 3600000), tsEnd: new Date(now.getTime() - (1 * 60 - 1.5) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb4/400/300', videoUrl: videoUrls.ShopFloor, cameraId: camera1.id },
  { type: 'Smoke Detected', tsStart: new Date(now.getTime() - 4 * 3600000), tsEnd: new Date(now.getTime() - (4 * 60 - 1) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb8/400/300', videoUrl: videoUrls.ShopFloor, cameraId: camera1.id },
  { type: 'Face Recognised', tsStart: new Date(now.getTime() - 9 * 3600000), tsEnd: new Date(now.getTime() - (9 * 60 - 1) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb11/400/300', videoUrl: videoUrls.ShopFloor, cameraId: camera1.id },
  { type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 8 * 3600000), tsEnd: new Date(now.getTime() - (8 * 60 - 1) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb3/400/300', videoUrl: videoUrls.ShopFloor, cameraId: camera1.id },
  { type: 'Smoke Detected', tsStart: new Date(now.getTime() - 5 * 3600000), tsEnd: new Date(now.getTime() - (5 * 60 - 1) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb7/400/300', videoUrl: videoUrls.ShopFloor, cameraId: camera1.id },

  // Incidents for Vault (Camera 2) use videoUrls.Vault
  { type: 'Face Recognised', tsStart: new Date(now.getTime() - 3 * 3600000), tsEnd: new Date(now.getTime() - (3 * 60 - 2) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb6/400/300', videoUrl: videoUrls.Vault, cameraId: camera2.id },
  { type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 6 * 3600000), tsEnd: new Date(now.getTime() - (6 * 60 - 1) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb9/400/300', videoUrl: videoUrls.Vault, cameraId: camera2.id },
  { type: 'Gun Threat', tsStart: new Date(now.getTime() - 12 * 3600000), tsEnd: new Date(now.getTime() - (12 * 60 - 1) * 60000), thumbnailUrl: 'https://picsum.photos/seed/thumb2/400/300', videoUrl: videoUrls.Vault, cameraId: camera2.id },
];
  for (const incident of incidents) {
    await prisma.incident.create({
      data: incident,
    });
  }
  console.log(`Created ${incidents.length} incidents.`);
  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });