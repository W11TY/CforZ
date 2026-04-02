import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import { Menu, Bell, Search } from 'lucide-react';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-black overflow-x-hidden">

      {/* 🔥 Overlay */}
      <div
        className={`fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* 🔥 Sidebar (NO WRAPPER — FIXED) */}
      <AppSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 🔥 Main Container */}
      <div className="flex-1 w-full bg-black min-h-screen">

        {/* 🔥 HEADER */}
        <header className="sticky top-0 z-[100] bg-black/80 backdrop-blur-md h-20 border-b border-zinc-900">
          <div className="max-w-[1400px] mx-auto h-full px-6 sm:px-12 flex items-center justify-between relative">

            {/* Logo (centered) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              <img
                src="/XforZ/logo.png"
                alt="Concept X"
                className="w-8 h-8 object-contain brightness-125"
              />
            </div>

            {/* LEFT */}
            <div className="flex items-center gap-12 flex-1">

              {/* Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 -ml-2 text-zinc-500 hover:text-white transition-all active:scale-90 z-[110]"
                aria-label="Toggle Navigation"
              >
                <Menu
                  className={`w-6 h-6 transition-transform duration-300 ${sidebarOpen ? 'rotate-90' : 'rotate-0'
                    }`}
                />
              </button>

              {/* Status */}
              <div className="hidden sm:flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500">
                    NODE 01
                  </span>
                </div>

                <div className="h-4 w-px bg-zinc-900" />

                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-800 hidden lg:block">
                  System Online
                </span>
              </div>

              {/* Search */}
              <div className="hidden md:flex flex-1 max-w-md relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-600 group-focus-within:text-white">
                  <Search className="w-3.5 h-3.5" />
                </div>

                <input
                  type="text"
                  placeholder="Execute global query..."
                  className="w-full h-10 bg-zinc-950 border border-zinc-900 pl-12 pr-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white placeholder:text-zinc-800 focus:outline-none focus:border-zinc-700 transition-all duration-300"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6 shrink-0 z-10">
              <button className="hidden sm:flex w-10 h-10 items-center justify-center text-zinc-600 hover:text-white transition-all">
                <Bell className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/profile')}
                className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-bold text-xs hover:bg-white hover:text-black transition-all active:scale-95"
              >
                A
              </button>
            </div>
          </div>
        </header>

        {/* 🔥 MAIN CONTENT */}
        <main className="max-w-[1400px] mx-auto min-h-[calc(100vh-5rem)] px-6 sm:px-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;