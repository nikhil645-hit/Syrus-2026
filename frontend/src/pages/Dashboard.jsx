import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { useChat } from '../hooks/useChat';
import { analyticsAPI } from '../services/api';
import TaskList from '../components/Checklist/TaskList';
import ChatWindow from '../components/Chat/ChatWindow';
import ProgressRing from '../components/Dashboard/ProgressRing';
import RiskMeter from '../components/Dashboard/RiskMeter';
import PitfallWarnings from '../components/Dashboard/PitfallWarnings';
import StarterTicket from '../components/Dashboard/StarterTicket';
import DashboardLayout from '../components/Layout/DashboardLayout';

export default function Dashboard() {
  const { tasks, loading: tasksLoading, startTask, verifyTask, completeTask } = useTasks();
  const chat = useChat();
  const [progress, setProgress] = useState(null);
  const [risk, setRisk] = useState(null);
  const [productivity, setProductivity] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      Promise.all([
        analyticsAPI.getProgress().catch(() => null),
        analyticsAPI.getRisk().catch(() => null),
        analyticsAPI.getProductivityEstimate().catch(() => null),
      ]).then(([progressRes, riskRes, prodRes]) => {
        if (cancelled) return;
        if (progressRes?.data?.success) setProgress(progressRes.data.data);
        if (riskRes?.data?.success) setRisk(riskRes.data.data);
        if (prodRes?.data?.success) setProductivity(prodRes.data.data);
      }).catch((err) => {
        console.error('Analytics load error:', err);
      });
    }, 1000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [tasks]);

  return (
    <DashboardLayout>
      <div className="absolute inset-0 p-6 flex gap-6 overflow-x-auto overflow-y-hidden custom-scrollbar">
        
        {/* Left Column: Metrics & Onboarding Stats (320px) */}
        <div className="w-[320px] flex-shrink-0 flex flex-col gap-6 overflow-y-auto pr-1 custom-scrollbar pb-6">
          
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-h2">Onboarding Status</h2>
          </div>

          <div className="panel p-5 relative group hover:border-white/10 transition-colors flex-none h-fit pb-6">
            
            <div className="relative flex flex-col items-center">
              <ProgressRing percentage={progress?.percentComplete || 0} size={110} strokeWidth={6} />
              <div className="mt-5 flex justify-between gap-2 w-full text-center">
                <div className="flex-1 p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <p className="text-xl font-bold text-emerald-400">{progress?.completed || 0}</p>
                  <p className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider mt-1">Done</p>
                </div>
                <div className="flex-1 p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <p className="text-xl font-bold text-amber-400">{progress?.inProgress || 0}</p>
                  <p className="text-[10px] text-amber-500 font-semibold uppercase tracking-wider mt-1">Active</p>
                </div>
                <div className="flex-1 p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <p className="text-xl font-bold text-indigo-400">{progress?.notStarted || 0}</p>
                  <p className="text-[10px] text-indigo-500 font-semibold uppercase tracking-wider mt-1">Left</p>
                </div>
              </div>
            </div>
          </div>

          {/* Productivity Estimate Card */}
          {productivity && (
            <div className="card p-5 group hover:border-white/10 flex-none h-fit">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Productivity</h4>
                <span className="text-xs text-zinc-500">Avg {productivity.tasksPerDay} / day</span>
              </div>
              <p className="text-sm text-zinc-200 mb-2">{productivity.message}</p>
              {productivity.estimatedReadyDate && (
                <div className="flex items-center gap-2 mt-3 p-3 bg-white/5 rounded-lg border border-white/5 w-full">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-cyan-400 font-medium">Target: {productivity.estimatedReadyDate}</p>
                </div>
              )}
            </div>
          )}

          {risk && (
            <div className="flex-none h-fit">
              <RiskMeter score={risk.score} factors={risk.factors} />
            </div>
          )}

        </div>

        {/* Center Column: Primary Chat Assistant (Flex Grow) */}
        <div className="flex-1 min-w-0 flex flex-col pt-1 pb-1">
          <div className="flex-1 panel flex flex-col overflow-hidden shadow-glass border-white/10">
             <ChatWindow
              messages={chat.messages}
              loading={chat.loading}
              error={chat.error}
              sendMessage={chat.sendMessage}
              loadHistory={chat.loadHistory}
            />
          </div>
        </div>

        {/* Right Column: Active Task & Smart Checklist (380px) */}
        <div className="w-[380px] flex-shrink-0 flex flex-col gap-6 overflow-y-auto pr-1 pb-6">
           
           <div className="flex items-center justify-between mb-2">
            <h2 className="text-h2">Agent Activity</h2>
          </div>

          <div className="flex-none h-fit w-full flex flex-col gap-6">
            <StarterTicket />
            <PitfallWarnings tasks={tasks} />
          </div>

          <div className="panel flex flex-col flex-1 min-h-[400px] flex-none h-fit">
            <div className="p-4 border-b border-white/5 bg-black/20 rounded-t-2xl flex justify-between items-center">
              <h3 className="text-sm font-semibold text-zinc-300">Required Tasks</h3>
              <span className="badge badge-neutral">{tasks?.length || 0} Total</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {tasksLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse flex gap-2 items-center text-sm text-zinc-500">
                    <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
                    Syncing playbook...
                  </div>
                </div>
              ) : (
                <TaskList
                  tasks={tasks}
                  onStart={startTask}
                  onVerify={verifyTask}
                  onComplete={completeTask}
                />
              )}
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
