"use client";
import { DashboardCard } from '@/components/admin/DashboardCard';
import { BarChart, Book, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Fev', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Abr', revenue: 4500 },
  { name: 'Mai', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Painel de Controle</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Receita Total"
          value="$12,345"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="+20,1% em relação ao mês passado"
        />
        <DashboardCard 
          title="Total de Estudantes"
          value="1.250"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="+180,1% em relação ao mês passado"
        />
        <DashboardCard 
          title="Cursos"
          value="25"
          icon={<Book className="h-4 w-4 text-muted-foreground" />}
          description="+5 em relação ao mês passado"
        />
        <DashboardCard 
          title="Visualizações"
          value="150.000"
          icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
          description="+12,5% em relação ao mês passado"
        />
      </div>
      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Resumo de Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Novo estudante matriculado em &apos;Next.js para Iniciantes&apos;.</p>
                  <p className="text-sm text-muted-foreground">Há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Novo curso &apos;TypeScript Avançado&apos; publicado.</p>
                  <p className="text-sm text-muted-foreground">Há 1 dia</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Você recebeu uma nova mensagem de um estudante.</p>
                  <p className="text-sm text-muted-foreground">Há 3 dias</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
