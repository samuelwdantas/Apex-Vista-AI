'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, BarChart3, TrendingUp, Users, DollarSign, Eye, Calendar, Filter, Download } from 'lucide-react'
import Link from 'next/link'

interface AnalyticsData {
  visitors: number
  pageViews: number
  revenue: number
  conversions: number
  bounceRate: number
  avgSessionDuration: string
}

interface ChartData {
  date: string
  visitors: number
  pageViews: number
  revenue: number
}

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('visitors')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    visitors: 0,
    pageViews: 0,
    revenue: 0,
    conversions: 0,
    bounceRate: 0,
    avgSessionDuration: '0:00'
  })
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const timeframes = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ]

  const metrics = [
    { value: 'visitors', label: 'Visitors', icon: Users, color: 'emerald' },
    { value: 'pageViews', label: 'Page Views', icon: Eye, color: 'blue' },
    { value: 'revenue', label: 'Revenue', icon: DollarSign, color: 'green' },
    { value: 'conversions', label: 'Conversions', icon: TrendingUp, color: 'purple' }
  ]

  // Generate sample data
  const generateSampleData = (days: number) => {
    const data: ChartData[] = []
    const baseVisitors = 1200
    const basePageViews = 2400
    const baseRevenue = 5000

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      const variation = (Math.random() - 0.5) * 0.4 // ±20% variation
      
      data.push({
        date: date.toISOString().split('T')[0],
        visitors: Math.round(baseVisitors * (1 + variation)),
        pageViews: Math.round(basePageViews * (1 + variation)),
        revenue: Math.round(baseRevenue * (1 + variation))
      })
    }
    
    return data
  }

  const calculateAnalytics = (data: ChartData[]): AnalyticsData => {
    const totalVisitors = data.reduce((sum, d) => sum + d.visitors, 0)
    const totalPageViews = data.reduce((sum, d) => sum + d.pageViews, 0)
    const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0)
    
    return {
      visitors: totalVisitors,
      pageViews: totalPageViews,
      revenue: totalRevenue,
      conversions: Math.round(totalVisitors * 0.03), // 3% conversion rate
      bounceRate: 45.2,
      avgSessionDuration: '2:34'
    }
  }

  useEffect(() => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 365
      const data = generateSampleData(days)
      setChartData(data)
      setAnalyticsData(calculateAnalytics(data))
      setIsLoading(false)
    }, 1000)
  }, [timeframe])

  const getMetricColor = (metric: string) => {
    const colors = {
      visitors: 'emerald',
      pageViews: 'blue',
      revenue: 'green',
      conversions: 'purple'
    }
    return colors[metric as keyof typeof colors] || 'gray'
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num)
  }

  const exportData = () => {
    const csvContent = [
      ['Date', 'Visitors', 'Page Views', 'Revenue'],
      ...chartData.map(row => [row.date, row.visitors, row.pageViews, row.revenue])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${timeframe}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Analytics</h1>
                <p className="text-xl text-gray-300">Track performance and insights</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {timeframes.map((tf) => (
                  <option key={tf.value} value={tf.value}>
                    {tf.label}
                  </option>
                ))}
              </select>
              
              <button
                onClick={exportData}
                className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-600 hover:via-violet-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Visitors</h3>
                <p className="text-gray-400 text-sm">Unique visitors</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              {isLoading ? '...' : formatNumber(analyticsData.visitors)}
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400">+12.5%</span>
              <span className="text-gray-500 ml-1">vs last period</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Page Views</h3>
                <p className="text-gray-400 text-sm">Total page views</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {isLoading ? '...' : formatNumber(analyticsData.pageViews)}
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400">+8.3%</span>
              <span className="text-gray-500 ml-1">vs last period</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Revenue</h3>
                <p className="text-gray-400 text-sm">Total revenue</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">
              {isLoading ? '...' : formatCurrency(analyticsData.revenue)}
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400">+15.7%</span>
              <span className="text-gray-500 ml-1">vs last period</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Conversions</h3>
                <p className="text-gray-400 text-sm">Goal completions</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {isLoading ? '...' : formatNumber(analyticsData.conversions)}
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400">+22.1%</span>
              <span className="text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Performance Overview</h2>
            <div className="flex items-center space-x-2">
              {metrics.map((metric) => (
                <button
                  key={metric.value}
                  onClick={() => setSelectedMetric(metric.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMetric === metric.value
                      ? `bg-${metric.color}-500/20 text-${metric.color}-400 border border-${metric.color}-500/30`
                      : 'text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <metric.icon className="w-4 h-4 inline mr-2" />
                  {metric.label}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Chart Visualization */}
          <div className="h-80 bg-gray-900/50 rounded-lg p-6 flex items-end space-x-2">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <div className="text-gray-400">Loading chart data...</div>
              </div>
            ) : (
              chartData.slice(-14).map((data, index) => {
                const value = data[selectedMetric as keyof ChartData] as number
                const maxValue = Math.max(...chartData.map(d => d[selectedMetric as keyof ChartData] as number))
                const height = (value / maxValue) * 100

                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full bg-gradient-to-t from-${getMetricColor(selectedMetric)}-500 to-${getMetricColor(selectedMetric)}-400 rounded-t-lg transition-all duration-300 hover:opacity-80`}
                      style={{ height: `${height}%` }}
                      title={`${data.date}: ${formatNumber(value)}`}
                    />
                    <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                      {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Top Pages</h3>
            <div className="space-y-4">
              {[
                { page: '/dashboard', views: 12543, percentage: 35 },
                { page: '/pricing', views: 8921, percentage: 25 },
                { page: '/', views: 7654, percentage: 21 },
                { page: '/contact', views: 4321, percentage: 12 },
                { page: '/about', views: 2456, percentage: 7 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-white font-medium">{item.page}</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-violet-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-purple-400 font-semibold">{formatNumber(item.views)}</div>
                    <div className="text-gray-500 text-sm">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Bounce Rate</div>
                  <div className="text-gray-400 text-sm">Percentage of single-page visits</div>
                </div>
                <div className="text-2xl font-bold text-yellow-400">
                  {analyticsData.bounceRate}%
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Avg Session Duration</div>
                  <div className="text-gray-400 text-sm">Average time on site</div>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {analyticsData.avgSessionDuration}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Conversion Rate</div>
                  <div className="text-gray-400 text-sm">Visitors who converted</div>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  3.2%
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Pages per Session</div>
                  <div className="text-gray-400 text-sm">Average pages viewed</div>
                </div>
                <div className="text-2xl font-bold text-purple-400">
                  2.8
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}