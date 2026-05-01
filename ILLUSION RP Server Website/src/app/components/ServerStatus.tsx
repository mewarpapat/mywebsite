import { useState, useEffect } from "react";
import { Users, Server, Signal } from "lucide-react";

export function ServerStatus() {
  const [players, setPlayers] = useState(128);
  const [isOnline, setIsOnline] = useState(true);

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const newValue = prev + change;
        return Math.max(80, Math.min(256, newValue));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 px-6 py-3 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse' : 'bg-red-500'}`} />
        <span className="text-sm font-bold text-white uppercase tracking-wider">
          {isOnline ? "Server Online" : "Server Offline"}
        </span>
      </div>
      
      <div className="h-4 w-px bg-white/10 hidden md:block" />
      
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-medium text-zinc-300">
          Players: <span className="text-white font-bold">{players}</span> / 256
        </span>
      </div>

      <div className="h-4 w-px bg-white/10 hidden md:block" />

      <div className="flex items-center gap-2">
        <Signal className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-medium text-zinc-300">
          Ping: <span className="text-white font-bold">12ms</span>
        </span>
      </div>
    </div>
  );
}
