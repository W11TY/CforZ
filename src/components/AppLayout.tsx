import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import { Menu, Bell, User, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-black overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {/* Mobile/Tablet Sidebar Backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden backdrop-blur-xl transition-all duration-500">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 h-full animate-in slide-in-from-left duration-300">
            <AppSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 lg:ml-56 w-full bg-black min-h-screen">
        <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl h-20 border-b border-zinc-900">
          <div className="max-w-[1400px] mx-auto h-full px-6 sm:px-12 flex items-center justify-between gap-8">
            <div className="flex items-center gap-8 lg:gap-12 flex-1">
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-zinc-500 hover:text-white transition-colors active:scale-95">
                  <Menu className="w-6 h-6" />
                </button>
                <div className="lg:hidden w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 p-1.5 flex items-center justify-center shrink-0">
                  <img src="/XforZ/logo.png" alt="Concept X" className="w-full h-full object-contain" />
                </div>
              </div>
              
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 whitespace-nowrap">Execution Node: 01</span>
              </div>

              {/* Global Search Engine */}
              <div className="hidden md:flex flex-1 max-w-md relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-600 group-focus-within:text-white transition-colors duration-300">
                  <Search className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  placeholder="Query execution stack..." 
                  className="w-full h-11 bg-zinc-950 border border-zinc-900 rounded-xl pl-12 pr-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white placeholder:text-zinc-700 focus:outline-none focus:border-zinc-700 focus:bg-zinc-900 focus:ring-1 focus:ring-primary/20 transition-all duration-300 shadow-inner shadow-black/50"
                  onChange={() => {}} // Placeholder for future logic
                />
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <button className="hidden sm:flex w-11 h-11 rounded-xl items-center justify-center text-zinc-600 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all duration-300 active:scale-95">
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-black text-xs sm:text-sm hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl shadow-white/5 active:bg-zinc-700"
              >
                A
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-[1400px] mx-auto min-h-[calc(100vh-5rem)] px-6 sm:px-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
