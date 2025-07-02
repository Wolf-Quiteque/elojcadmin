"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, LogOut, MonitorPlay, GraduationCap, Calendar, BarChart3, User } from 'lucide-react';
const navLinks = [
    { href: '/dashboard', icon: <BarChart size={20}/>, label: 'Painel' },
    { href: '/courses', icon: <MonitorPlay size={20}/>, label: 'Cursos' },
    { href: '/students', icon: <GraduationCap size={20}/>, label: 'Alunos' },
    { href: '/meetings', icon: <Calendar size={20}/>, label: 'Reuniões' },
    { href: '/analytics', icon: <BarChart3 size={20}/>, label: 'Análises' },
    { href: '/profile', icon: <User size={20}/>, label: 'Perfil' },
];
export function Sidebar() {
    const pathname = usePathname();
    return (<div className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          EduSphere
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((item) => (<Link key={item.label} href={item.href} className={`flex items-center p-3 rounded-lg transition-all group ${pathname === item.href
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-blue-50 text-slate-700'}`}>
            <span className={`mr-3 group-hover:scale-110 transition-transform ${pathname === item.href ? 'text-blue-600' : 'text-blue-500'}`}>
              {item.icon}
            </span>
            <span className="font-medium">
              {item.label}
            </span>
          </Link>))}
      </nav>
      
      <div className="p-4 border-t border-slate-200">
        <button className="flex items-center w-full p-3 text-slate-500 hover:text-red-500 transition-colors">
          <LogOut className="mr-3"/>
          <span>Sair</span>
        </button>
      </div>
    </div>);
}
