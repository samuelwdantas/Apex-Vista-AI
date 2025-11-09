'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Zap, Play, Pause, Settings, Plus, Trash2, Edit, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Workflow {
  id: string
  name: string
  description: string
  trigger: string
  actions: WorkflowAction[]
  status: 'active' | 'paused' | 'draft'
  lastRun?: Date
  runsCount: number
}

interface WorkflowAction {
  id: string
  type: string
  name: string
  config: any
}

export default function WorkflowAutomationPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    trigger: 'manual'
  })

  const triggerTypes = [
    { value: 'manual', label: 'Manual Trigger' },
    { value: 'schedule', label: 'Scheduled' },
    { value: 'webhook', label: 'Webhook' },
    { value: 'email', label: 'Email Received' },
    { value: 'form', label: 'Form Submission' }
  ]

  const actionTypes = [
    { value: 'email', label: 'Send Email', icon: '📧' },
    { value: 'slack', label: 'Send Slack Message', icon: '💬' },
    { value: 'database', label: 'Update Database', icon: '🗄️' },
    { value: 'api', label: 'API Call', icon: '🔗' },
    { value: 'generate', label: 'Generate Content', icon: '✨' },
    { value: 'analyze', label: 'Analyze Data', icon: '📊' }
  ]

  // Sample workflows
  const sampleWorkflows: Workflow[] = [
    {
      id: '1',
      name: 'Lead Nurturing Campaign',
      description: 'Automatically send follow-up emails to new leads',
      trigger: 'form',
      actions: [
        { id: '1', type: 'email', name: 'Welcome Email', config: { template: 'welcome' } },
        { id: '2', type: 'database', name: 'Update CRM', config: { table: 'leads' } },
        { id: '3', type: 'slack', name: 'Notify Sales Team', config: { channel: '#sales' } }
      ],
      status: 'active',
      lastRun: new Date('2024-01-15'),
      runsCount: 47
    },
    {
      id: '2',
      name: 'Content Publishing',
      description: 'Generate and publish social media content',
      trigger: 'schedule',
      actions: [
        { id: '1', type: 'generate', name: 'Generate Post', config: { type: 'social' } },
        { id: '2', type: 'api', name: 'Post to Social Media', config: { platforms: ['twitter', 'linkedin'] } }
      ],
      status: 'active',
      lastRun: new Date('2024-01-16'),
      runsCount: 23
    },
    {
      id: '3',
      name: 'Weekly Report Generation',
      description: 'Generate and send weekly analytics reports',
      trigger: 'schedule',
      actions: [
        { id: '1', type: 'analyze', name: 'Analyze Data', config: { period: 'week' } },
        { id: '2', type: 'generate', name: 'Generate Report', config: { format: 'pdf' } },
        { id: '3', type: 'email', name: 'Send Report', config: { recipients: 'team@company.com' } }
      ],
      status: 'paused',
      lastRun: new Date('2024-01-10'),
      runsCount: 12
    }
  ]

  useEffect(() => {
    setWorkflows(sampleWorkflows)
  }, [])

  const handleCreateWorkflow = () => {
    if (!newWorkflow.name.trim()) return

    const workflow: Workflow = {
      id: Date.now().toString(),
      name: newWorkflow.name,
      description: newWorkflow.description,
      trigger: newWorkflow.trigger,
      actions: [],
      status: 'draft',
      runsCount: 0
    }

    setWorkflows([...workflows, workflow])
    setNewWorkflow({ name: '', description: '', trigger: 'manual' })
    setIsCreating(false)
  }

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === id 
        ? { ...workflow, status: workflow.status === 'active' ? 'paused' : 'active' }
        : workflow
    ))
  }

  const deleteWorkflow = (id: string) => {
    setWorkflows(workflows.filter(workflow => workflow.id !== id))
  }

  const runWorkflow = (id: string) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === id 
        ? { ...workflow, lastRun: new Date(), runsCount: workflow.runsCount + 1 }
        : workflow
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20'
      case 'paused': return 'text-yellow-400 bg-yellow-500/20'
      case 'draft': return 'text-gray-400 bg-gray-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'manual': return '👆'
      case 'schedule': return '⏰'
      case 'webhook': return '🔗'
      case 'email': return '📧'
      case 'form': return '📝'
      default: return '⚡'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-sm border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/276afa56-12ee-4cb4-b583-b25f4d82ca46.png" 
                alt="Apex Vista AI Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">Apex Vista AI</span>
            </Link>
            
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Workflow Automation</h1>
                <p className="text-xl text-gray-300">Automate your business processes</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-gray-900 font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:via-cyan-600 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Workflow</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Total Workflows</h3>
            </div>
            <div className="text-3xl font-bold text-blue-400">{workflows.length}</div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Active</h3>
            </div>
            <div className="text-3xl font-bold text-green-400">
              {workflows.filter(w => w.status === 'active').length}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Total Runs</h3>
            </div>
            <div className="text-3xl font-bold text-purple-400">
              {workflows.reduce((sum, w) => sum + w.runsCount, 0)}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Time Saved</h3>
            </div>
            <div className="text-3xl font-bold text-orange-400">24h</div>
          </div>
        </div>

        {/* Create Workflow Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-blue-500/30 rounded-2xl p-8 w-full max-w-md">
              <h3 className="text-2xl font-bold text-white mb-6">Create New Workflow</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Workflow Name
                  </label>
                  <input
                    type="text"
                    value={newWorkflow.name}
                    onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter workflow name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newWorkflow.description}
                    onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Describe what this workflow does"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Trigger Type
                  </label>
                  <select
                    value={newWorkflow.trigger}
                    onChange={(e) => setNewWorkflow({...newWorkflow, trigger: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {triggerTypes.map((trigger) => (
                      <option key={trigger.value} value={trigger.value}>
                        {trigger.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={handleCreateWorkflow}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors"
                >
                  Create Workflow
                </button>
                <button
                  onClick={() => setIsCreating(false)}
                  className="flex-1 border border-gray-600 text-gray-300 font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Workflows List */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Your Workflows</h2>
          
          {workflows.length > 0 ? (
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getTriggerIcon(workflow.trigger)}</span>
                        <h3 className="text-xl font-semibold text-white">{workflow.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(workflow.status)}`}>
                          {workflow.status}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-3">{workflow.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>Actions: {workflow.actions.length}</span>
                        <span>Runs: {workflow.runsCount}</span>
                        {workflow.lastRun && (
                          <span>Last run: {workflow.lastRun.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => runWorkflow(workflow.id)}
                        className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-colors"
                        title="Run workflow"
                      >
                        <Play className="w-5 h-5 text-green-400" />
                      </button>
                      
                      <button
                        onClick={() => toggleWorkflowStatus(workflow.id)}
                        className={`p-2 border rounded-lg transition-colors ${
                          workflow.status === 'active' 
                            ? 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30' 
                            : 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30'
                        }`}
                        title={workflow.status === 'active' ? 'Pause workflow' : 'Activate workflow'}
                      >
                        {workflow.status === 'active' ? (
                          <Pause className="w-5 h-5 text-yellow-400" />
                        ) : (
                          <Play className="w-5 h-5 text-green-400" />
                        )}
                      </button>

                      <button
                        onClick={() => setSelectedWorkflow(workflow)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors"
                        title="Edit workflow"
                      >
                        <Edit className="w-5 h-5 text-blue-400" />
                      </button>

                      <button
                        onClick={() => deleteWorkflow(workflow.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors"
                        title="Delete workflow"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Actions Preview */}
                  {workflow.actions.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <Settings className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-400">Actions:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {workflow.actions.map((action) => (
                          <span key={action.id} className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-lg text-sm text-gray-300">
                            {actionTypes.find(t => t.value === action.type)?.icon} {action.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Zap className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No workflows created yet</p>
              <p className="text-gray-500 text-sm mt-2">Create your first workflow to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}