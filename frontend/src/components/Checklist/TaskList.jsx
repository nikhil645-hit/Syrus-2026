import { useState, useEffect, useMemo } from 'react';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';

export default function TaskList({ tasks, onStart, onVerify, onComplete }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('all');

  // Keep selectedTask in sync with the live tasks array
  useEffect(() => {
    if (selectedTask) {
      const updated = tasks.find((t) => t.id === selectedTask.id);
      if (updated) setSelectedTask(updated);
    }
  }, [tasks]);

  const categories = useMemo(() => [...new Set(
    [...tasks]
      .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
      .map((task) => task.category)
      .filter(Boolean)
  )], [tasks]);

  const grouped = useMemo(() => categories.reduce((acc, cat) => {
    acc[cat] = tasks.filter((t) => t.category === cat);
    return acc;
  }, {}), [categories, tasks]);

  const filteredCategories = filter === 'all'
    ? categories
    : categories.filter((cat) => {
        if (filter === 'pending') return grouped[cat]?.some((t) => t.status !== 'completed' && t.status !== 'verified');
        if (filter === 'completed') return grouped[cat]?.some((t) => t.status === 'completed' || t.status === 'verified');
        return true;
      });

  return (
    <div className="flex flex-col h-full bg-navy-900/40">
      {/* Header & Filters */}
      <div className="px-4 py-3 border-b border-white/5 bg-navy-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex gap-2">
          {['all', 'pending', 'completed'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-[11px] rounded-md font-medium tracking-wide capitalize transition-all duration-200 border ${
                filter === f 
                  ? 'bg-zinc-100 text-zinc-900 border-zinc-200 shadow-sm' 
                  : 'bg-white/5 text-zinc-400 border-transparent hover:bg-white/10 hover:text-zinc-200'
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar">
        {filteredCategories.map((cat) => {
          const catTasks = grouped[cat]?.filter((t) => {
            if (filter === 'pending') return t.status !== 'completed' && t.status !== 'verified';
            if (filter === 'completed') return t.status === 'completed' || t.status === 'verified';
            return true;
          }) || [];

          if (catTasks.length === 0) return null;

          const completedCount = catTasks.filter((t) => t.status === 'completed' || t.status === 'verified').length;

          return (
            <div key={cat} className="mb-6 last:mb-2">
              <div className="flex items-center justify-between mb-3 px-1">
                <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">{cat}</h4>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400/80 rounded-full transition-all duration-500" style={{ width: `${(completedCount/catTasks.length)*100}%` }}></div>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono font-medium">{completedCount}/{catTasks.length}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {catTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onStart={onStart} onOpenModal={setSelectedTask} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Modal Container overlay logic assumed inside TaskModal itself */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onVerify={async (id, evidence) => {
            const result = await onVerify(id, evidence);
            return result;
          }}
          onComplete={async (id) => {
            await onComplete(id);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}
