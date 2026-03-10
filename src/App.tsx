import React from 'react';
import { Plus, ChevronDown } from 'lucide-react';

type Priority = 'High Priority' | 'Medium Priority' | 'Low Priority' | 'In Review' | 'Completed';

interface Task {
  id: string;
  title: string;
  badge: Priority;
  avatarUrl: string;
}

interface ColumnData {
  id: string;
  title: string;
  count: number;
  tasks: Task[];
}

const mockData: ColumnData[] = [
  {
    id: 'todo',
    title: 'To Do',
    count: 7,
    tasks: [
      {
        id: 't1',
        title: 'Design System Update',
        badge: 'High Priority',
        avatarUrl: 'https://i.pravatar.cc/150?u=1',
      },
      {
        id: 't2',
        title: 'User Research Planning',
        badge: 'Medium Priority',
        avatarUrl: 'https://i.pravatar.cc/150?u=2',
      },
      {
        id: 't3',
        title: 'Create Marketing Assets',
        badge: 'Low Priority',
        avatarUrl: 'https://i.pravatar.cc/150?u=3',
      },
      {
        id: 't4',
        title: 'Content Analysis',
        badge: 'Low Priority',
        avatarUrl: 'https://i.pravatar.cc/150?u=4',
      }
    ]
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    count: 5,
    tasks: [
      {
        id: 'p1',
        title: 'API Integration',
        badge: 'In Review',
        avatarUrl: 'https://i.pravatar.cc/150?u=5',
      },
      {
        id: 'p2',
        title: 'Content Strategy',
        badge: 'In Review',
        avatarUrl: 'https://i.pravatar.cc/150?u=6',
      },
      {
        id: 'p3',
        title: 'Content Tnneting',
        badge: 'In Review',
        avatarUrl: 'https://i.pravatar.cc/150?u=7',
      },
      {
        id: 'p4',
        title: 'Content Strategy',
        badge: 'In Review',
        avatarUrl: 'https://i.pravatar.cc/150?u=8',
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    count: 12,
    tasks: [
      {
        id: 'd1',
        title: 'Homepage Redesign',
        badge: 'Completed',
        avatarUrl: 'https://i.pravatar.cc/150?u=9',
      },
      {
        id: 'd2',
        title: 'Set up CI/CD Pipeline',
        badge: 'Completed',
        avatarUrl: 'https://i.pravatar.cc/150?u=10',
      },
      {
        id: 'd3',
        title: 'Set up CI/CD Pipeline',
        badge: 'Completed',
        avatarUrl: 'https://i.pravatar.cc/150?u=11',
      },
      {
        id: 'd4',
        title: 'Set up CI/CD Pipeline',
        badge: 'Completed',
        avatarUrl: 'https://i.pravatar.cc/150?u=12',
      }
    ]
  }
];

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L22 7.77778V16.2222L12 22L2 16.2222V7.77778L12 2Z" fill="#1E293B"/>
    <path d="M12 12L22 6.22222" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 12L2 6.22222" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 12V22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

function Card({ task }: { task: Task }) {
  const badgeStyles = {
    'High Priority': 'bg-red-100 text-red-700',
    'Medium Priority': 'bg-amber-100 text-amber-700',
    'Low Priority': 'bg-blue-100 text-blue-700',
    'In Review': 'bg-blue-100 text-blue-700',
    'Completed': 'bg-emerald-100 text-emerald-700',
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      <h3 className="font-semibold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors text-[15px]">{task.title}</h3>
      <div className="flex items-end justify-between">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${badgeStyles[task.badge]}`}>
          {task.badge}
        </span>
        <img
          src={task.avatarUrl}
          alt="Assignee"
          className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
        />
      </div>
    </div>
  );
}

function Column({ data }: { data: ColumnData }) {
  return (
    <div className="flex flex-col w-[340px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm max-h-full">
      <div className="flex items-center justify-between p-5 pb-3">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-lg text-slate-800">{data.title}</h2>
          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
            {data.count}
          </span>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
        {data.tasks.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="h-screen bg-[#F4F5F7] font-sans text-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-[#F4F5F7]">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Project Alpha</h1>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-200/50 p-1.5 rounded-lg transition-colors">
          <img
            src="https://i.pravatar.cc/150?u=admin"
            alt="User"
            className="w-8 h-8 rounded-full border border-slate-200"
          />
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </header>

      {/* Board */}
      <main className="flex-1 overflow-hidden p-6 pt-2">
        <div className="flex gap-6 items-start h-full overflow-x-auto pb-4">
          {mockData.map(col => (
            <Column key={col.id} data={col} />
          ))}
        </div>
      </main>
    </div>
  );
}
