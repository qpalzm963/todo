import React, { useState } from 'react';
import { Plus, ChevronDown, X, Trash2, Edit2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

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

const AVATARS = [
  'https://i.pravatar.cc/150?u=1',
  'https://i.pravatar.cc/150?u=2',
  'https://i.pravatar.cc/150?u=3',
  'https://i.pravatar.cc/150?u=4',
  'https://i.pravatar.cc/150?u=5',
  'https://i.pravatar.cc/150?u=6',
  'https://i.pravatar.cc/150?u=7',
  'https://i.pravatar.cc/150?u=8',
];

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

function Card({ task, index, onDelete, onEdit }: { task: Task; index: number; onDelete: (id: string) => void; onEdit: (task: Task) => void }) {
  const badgeStyles = {
    'High Priority': 'bg-red-100 text-red-700',
    'Medium Priority': 'bg-amber-100 text-amber-700',
    'Low Priority': 'bg-blue-100 text-blue-700',
    'In Review': 'bg-blue-100 text-blue-700',
    'Completed': 'bg-emerald-100 text-emerald-700',
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative ${snapshot.isDragging ? 'shadow-lg ring-2 ring-indigo-500/20' : ''}`}
        >
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <button onClick={() => onEdit(task)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onDelete(task.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <h3 className="font-semibold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors text-[15px] pr-12">{task.title}</h3>
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
      )}
    </Draggable>
  );
}

function Column({ data, onAddClick, onDeleteTask, onEditTask }: { data: ColumnData; onAddClick: (columnId: string) => void; onDeleteTask: (id: string) => void; onEditTask: (task: Task) => void }) {
  return (
    <div className="flex flex-col w-[340px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm max-h-full">
      <div className="flex items-center justify-between p-5 pb-3">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-lg text-slate-800">{data.title}</h2>
          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
            {data.count}
          </span>
        </div>
        <button 
          onClick={() => onAddClick(data.id)}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <Droppable droppableId={data.id}>
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar min-h-[150px] ${snapshot.isDraggingOver ? 'bg-slate-50/50' : ''}`}
          >
            {data.tasks.map((task, index) => (
              <Card key={task.id} task={task} index={index} onDelete={onDeleteTask} onEdit={onEditTask} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default function App() {
  const [boardData, setBoardData] = useState<ColumnData[]>(mockData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>('Medium Priority');
  const [newTaskAvatar, setNewTaskAvatar] = useState<string>(AVATARS[0]);

  const handleAddClick = (columnId: string) => {
    setActiveColumnId(columnId);
    setEditingTask(null);
    setNewTaskTitle('');
    setNewTaskPriority('Medium Priority');
    setNewTaskAvatar(AVATARS[Math.floor(Math.random() * AVATARS.length)]);
    setIsModalOpen(true);
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setNewTaskTitle(task.title);
    setNewTaskPriority(task.badge);
    setNewTaskAvatar(task.avatarUrl);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setBoardData(prevData => prevData.map(col => {
      const filteredTasks = col.tasks.filter(t => t.id !== taskId);
      if (filteredTasks.length !== col.tasks.length) {
        return {
          ...col,
          count: filteredTasks.length,
          tasks: filteredTasks
        };
      }
      return col;
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTaskTitle('');
    setNewTaskPriority('Medium Priority');
    setNewTaskAvatar(AVATARS[0]);
    setActiveColumnId(null);
    setEditingTask(null);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    if (editingTask) {
      setBoardData(prevData => prevData.map(col => {
        const hasTask = col.tasks.some(t => t.id === editingTask.id);
        if (hasTask) {
          return {
            ...col,
            tasks: col.tasks.map(t => t.id === editingTask.id ? { ...t, title: newTaskTitle.trim(), badge: newTaskPriority, avatarUrl: newTaskAvatar } : t)
          };
        }
        return col;
      }));
    } else if (activeColumnId) {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title: newTaskTitle.trim(),
        badge: newTaskPriority,
        avatarUrl: newTaskAvatar,
      };

      setBoardData(prevData => prevData.map(col => {
        if (col.id === activeColumnId) {
          return {
            ...col,
            count: col.count + 1,
            tasks: [newTask, ...col.tasks]
          };
        }
        return col;
      }));
    }

    handleCloseModal();
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColIndex = boardData.findIndex(col => col.id === source.droppableId);
    const destColIndex = boardData.findIndex(col => col.id === destination.droppableId);

    const sourceCol = boardData[sourceColIndex];
    const destCol = boardData[destColIndex];

    const sourceTasks = Array.from(sourceCol.tasks);
    const destTasks = source.droppableId === destination.droppableId ? sourceTasks : Array.from(destCol.tasks);

    const [removed] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, removed);

    const newBoardData = [...boardData];
    
    newBoardData[sourceColIndex] = {
      ...sourceCol,
      count: sourceTasks.length,
      tasks: sourceTasks
    };

    if (source.droppableId !== destination.droppableId) {
      newBoardData[destColIndex] = {
        ...destCol,
        count: destTasks.length,
        tasks: destTasks
      };
    }

    setBoardData(newBoardData);
  };

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
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 items-start h-full overflow-x-auto pb-4">
            {boardData.map(col => (
              <Column 
                key={col.id} 
                data={col} 
                onAddClick={handleAddClick} 
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditClick}
              />
            ))}
          </div>
        </DragDropContext>
      </main>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="font-semibold text-lg text-slate-800">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveTask} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Task Title</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="e.g., Update documentation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority / Status</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
                >
                  <option value="High Priority">High Priority</option>
                  <option value="Medium Priority">Medium Priority</option>
                  <option value="Low Priority">Low Priority</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Assignee</label>
                <div className="flex flex-wrap gap-3">
                  {AVATARS.map(avatar => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setNewTaskAvatar(avatar)}
                      className={`relative rounded-full transition-all ${newTaskAvatar === avatar ? 'ring-2 ring-indigo-600 ring-offset-2' : 'hover:ring-2 hover:ring-slate-300 hover:ring-offset-2'}`}
                    >
                      <img src={avatar} alt="Avatar option" className="w-8 h-8 rounded-full border border-slate-200" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
                >
                  {editingTask ? 'Save Changes' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
