import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Zap, User, X } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/opportunity', label: 'Discover', icon: Search },
  { to: '/feed', label: 'Execution Feed', icon: Zap },
  { to: '/profile', label: 'Profile', icon: User },
];

const AppSidebar = ({ onClose }: { onClose?: () => void }) => {
  return (
    <aside className="w-56 h-screen bg-black border-r border-zinc-900 flex flex-col p-6 fixed top-0 left-0 z-40">
      <div className="flex items-center justify-between mb-10">
        <NavLink to="/" className="flex items-center gap-3 active:scale-95 transition-transform">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 p-2 flex items-center justify-center border border-zinc-800 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:border-zinc-600 transition-colors">
            <img src="/logo.png" alt="Concept X" className="w-full h-full object-contain" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white hidden sm:block">Concept X</span>
        </NavLink>
        {onClose && (
          <button onClick={onClose} className="text-zinc-600 hover:text-white lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                ? 'bg-sidebar-accent text-primary'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`
            }
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
