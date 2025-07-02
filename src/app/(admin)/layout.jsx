import { Sidebar } from '@/components/admin/Sidebar';
export default function AdminLayout({ children, }) {
    return (<div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-slate-50 to-blue-50">
        {children}
      </main>
    </div>);
}
