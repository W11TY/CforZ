import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Zap, User, X } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/opportunity', label: 'Discover', icon: Search },
  { to: '/feed', label: 'Execution Feed', icon: Zap },
  { to: '/profile', label: 'Profile', icon: User },
];

const AppSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) => {
  return (
    <aside
      className={`w-64 h-screen bg-black border-r border-zinc-900 flex flex-col p-8 fixed top-0 left-0 z-[100]
      shadow-[10px_0_30px_rgba(0,0,0,0.5)]
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-16">
        <NavLink
          to="/"
          className="flex items-center gap-4 transition-transform active:scale-95 group"
          onClick={onClose}
        >
          <img
            src="/XforZ/logo.png"
            alt="Concept X"
            className="w-6 h-6 object-contain brightness-125 transition-transform group-hover:scale-105"
          />
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white">
            Concept X
          </span>
        </NavLink>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-zinc-600 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isActive
                ? 'text-white translate-x-1'
                : 'text-zinc-600 hover:text-zinc-400 hover:translate-x-1'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 w-0.5 h-6 bg-primary rounded-full shadow-[0_0_8px_rgba(0,122,255,0.4)]" />
                )}
                <link.icon
                  className={`w-4 h-4 transition-all duration-300 ${isActive
                      ? 'text-primary scale-110'
                      : 'text-zinc-600 group-hover:text-zinc-300 group-hover:scale-110'
                    }`}
                />
                <span>{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-10 border-t border-zinc-900/50">
        <p className="text-[9px] font-bold text-zinc-800 uppercase tracking-[0.3em]">
          Operational Area • Node 01
        </p>
      </div>
    </aside>
  );
};

export default AppSidebar;