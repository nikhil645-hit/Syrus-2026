import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { analyticsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function ManagerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDev, setSelectedDev] = useState(null);
  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    analyticsAPI.getAllDevelopers().then((res) => {
      if (res.data.success) setDevelopers(res.data.data.developers);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const viewReport = async (devId) => {
    setSelectedDev(devId);
    setReportLoading(true);
    setReport(null);
    try {
      const res = await analyticsAPI.getOnboardingReport(devId);
      if (res.data.success) setReport(res.data.data.report);
    } catch (err) {
      console.error('Failed to load report:', err);
    } finally {
      setReportLoading(false);
    }
  };

  const riskBadge = (risk) => {
    if (risk.level === 'high') return 'badge-danger';
    if (risk.level === 'medium') return 'badge-warning';
    return 'badge-success';
  };

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-navy-600 bg-navy-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center">
            <span className="text-cyan-400 font-heading font-bold text-sm">A</span>
          </div>
          <h1 className="text-lg font-heading font-semibold text-white">Axiom</h1>
          <span className="text-xs text-slate-500 ml-2 font-mono">Manager Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="btn-secondary text-xs py-1.5 px-3">
            Developer View
          </button>
          <span className="text-sm text-white">{user?.name}</span>
          <button onClick={logout} className="text-xs text-slate-500 hover:text-slate-300">Sign out</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-bold text-white">Developer Onboarding Overview</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input
              type="text"
              placeholder="Search developers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-9 pr-3 py-2 bg-navy-900/50 border border-white/5 rounded-lg text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading developer data...</div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-600 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Developer</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Persona</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Progress</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Days</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700">
                {developers
                  .filter(dev => {
                    if (!searchQuery.trim()) return true;
                    const q = searchQuery.toLowerCase();
                    return dev.name.toLowerCase().includes(q) || dev.email.toLowerCase().includes(q) || (dev.personaName || '').toLowerCase().includes(q);
                  })
                  .map((dev) => (
                  <tr key={dev.id}
                    className={`hover:bg-navy-800/50 transition-colors ${dev.risk.flagged ? 'bg-red-500/5' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {dev.risk.flagged && (
                          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-white">{dev.name}</p>
                          <p className="text-[10px] text-slate-500">{dev.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-300">{dev.personaName || 'Unassigned'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-navy-700 overflow-hidden">
                          <div className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                            style={{ width: `${dev.progress.percentage}%` }} />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">{dev.progress.percentage}%</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {dev.progress.completed}/{dev.progress.total} tasks
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`${riskBadge(dev.risk)} text-[11px]`}>
                        {Math.round(dev.risk.score * 100)}% — {dev.risk.level}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-400 font-mono">{dev.daysSinceStart}d</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => viewReport(dev.id)}
                        className="btn-secondary text-xs py-1 px-3">
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {developers.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm">No developers onboarding</div>
            )}
          </div>
        )}

        {/* Report Modal */}
        {selectedDev && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => { setSelectedDev(null); setReport(null); }}>
            <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto card-elevated p-6 animate-fade-in"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-heading font-bold text-white">Onboarding Report</h3>
                <button onClick={() => { setSelectedDev(null); setReport(null); }}
                  className="text-slate-500 hover:text-slate-300">✕</button>
              </div>

              {reportLoading && <div className="text-center py-8 text-slate-500">Generating report...</div>}

              {report && (
                <div className="space-y-6">
                  {/* Developer Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Developer</p>
                      <p className="text-sm text-white font-medium">{report.developer.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Persona</p>
                      <p className="text-sm text-white">{report.persona_match.persona_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Team</p>
                      <p className="text-sm text-white">{report.developer.team || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Days Elapsed</p>
                      <p className="text-sm text-white">{report.developer.days_elapsed}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="card p-4">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Progress Summary</h4>
                    <div className="grid grid-cols-4 gap-3 text-center">
                      <div>
                        <p className="text-xl font-bold text-cyan-400">{report.progress_summary.completion_percentage}%</p>
                        <p className="text-[10px] text-slate-500">Complete</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-green-400">{report.progress_summary.completed}</p>
                        <p className="text-[10px] text-slate-500">Done</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-yellow-400">{report.progress_summary.in_progress}</p>
                        <p className="text-[10px] text-slate-500">Active</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-slate-500">{report.progress_summary.not_started}</p>
                        <p className="text-[10px] text-slate-500">Remaining</p>
                      </div>
                    </div>
                  </div>

                  {/* Velocity */}
                  <div className="card p-4">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Velocity Metrics</h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-lg font-bold text-white">{report.velocity_metrics.tasks_per_day}</p>
                        <p className="text-[10px] text-slate-500">Tasks/Day</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">{report.velocity_metrics.average_task_duration_minutes || '-'}m</p>
                        <p className="text-[10px] text-slate-500">Avg Duration</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">{report.verification_stats.pass_rate_percentage}%</p>
                        <p className="text-[10px] text-slate-500">Verify Rate</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk & Productivity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card p-4">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Risk</h4>
                      <p className={`text-lg font-bold ${
                        report.risk_assessment.risk_level === 'HIGH' ? 'text-red-400' :
                        report.risk_assessment.risk_level === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'
                      }`}>{report.risk_assessment.risk_level}</p>
                      <p className="text-xs text-slate-500 mt-1">Score: {(report.risk_assessment.current_score * 100).toFixed(0)}%</p>
                    </div>
                    <div className="card p-4">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Productivity</h4>
                      <p className="text-sm text-white">{report.time_to_productivity.assessment}</p>
                      {report.time_to_productivity.estimated_completion_date && (
                        <p className="text-xs text-cyan-400 font-mono mt-1">
                          ETA: {report.time_to_productivity.estimated_completion_date}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Task Details Table */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Task Details</h4>
                    <div className="space-y-1">
                      {report.task_details.map((task, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-navy-800/50 text-sm">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                            task.status === 'completed' || task.status === 'verified'
                              ? 'bg-green-500/20 text-green-400' : task.status === 'in_progress'
                                ? 'bg-yellow-500/20 text-yellow-400' : 'bg-navy-700 text-slate-500'
                          }`}>
                            {task.status === 'completed' || task.status === 'verified' ? '✓' : task.status === 'in_progress' ? '◐' : '○'}
                          </span>
                          <span className="flex-1 text-slate-300 truncate">{task.title}</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {task.actual_minutes ? `${task.actual_minutes}m` : '-'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {task.attempts || 0} attempts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
