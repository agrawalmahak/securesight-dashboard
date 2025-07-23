// src/components/Header.tsx
'use client';

import { LayoutDashboard, Video, BarChart2, Bell, Users, ChevronDown } from 'lucide-react';

export default function Header() {
  const navLinks = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Cameras', icon: Video },
    { name: 'Scenes', icon: BarChart2 },
    { name: 'Incidents', icon: Bell },
    { name: 'Users', icon: Users },
  ];

  return (
    <header className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700 sticky top-0 z-10">
  
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-white">SecureSight</h1>
        <nav className="flex items-center gap-6 text-sm text-gray-300">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href="#"
              className={`flex items-center gap-2 hover:text-white transition-colors ${index === 0 ? 'text-white font-semibold' : ''}`}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </a>
          ))}
        </nav>
      </div>

    
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Mahak Agrawal</p>
          <p className="text-xs text-gray-400">mahakproag@gmail.com</p>
        </div>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </header>
  );
}