'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, TrendingUp, Search, Filter, BarChart3, Globe, Calendar } from 'lucide-react'
import Link from 'next/link'

interface TrendData {
  keyword: string
  volume: number
  growth: number
  difficulty: number
  category: string
  region: string
}

export default function TrendAnalyzerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('global')
  const [timeframe, setTimeframe] = useState('30d')
  const [trends, setTrends] = useState<TrendData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'health', label: 'Health' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' }
  ]

  const regions = [
    { value: 'global', label: 'Global' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'br', label: 'Brazil' }
  ]

  const timeframes = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ]

  // Sample trend data
  const sampleTrends: TrendData[] = [
    { keyword: 'AI automation', volume: 125000, growth: 45.2, difficulty: 72, category: 'technology', region: 'global' },
    { keyword: 'Digital marketing trends', volume: 89000, growth: 32.1, difficulty: 68, category: 'marketing', region: 'global' },
    { keyword: 'Remote work tools', volume: 156000, growth: 28.7, difficulty: 55, category: 'business', region: 'global' },
    { keyword: 'Cryptocurrency investment', volume: 234000, growth: 67.3, difficulty: 81, category: 'finance', region: 'global' },
    { keyword: 'Sustainable business', volume: 78000, growth: 41.8, difficulty: 49, category: 'business', region: 'global' },
    { keyword: 'Machine learning applications', volume: 167000, growth: 52.4, difficulty: 76, category: 'technology', region: 'global' },
    { keyword: 'Social media strategy', volume: 198000, growth: 23.6, difficulty: 64, category: 'marketing', region: 'global' },
    { keyword: 'Cloud computing services', volume: 145000, growth: 38.9, difficulty: 71, category: 'technology', region: 'global' }
  ]

  useEffect(() => {
    // Initialize with sample data
    setTrends(sampleTrends)
  }, [])

  const handleSearch = async () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      let filteredTrends = sampleTrends

      if (searchQuery.trim()) {
        filteredTrends = filteredTrends.filter(trend =>
          trend.keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      if (selectedCategory !== 'all') {
        filteredTrends = filteredTrends.filter(trend =>
          trend.category === selectedCategory
        )
      }

      setTrends(filteredTrends)
      setIsLoading(false)
    }, 1500)
  }

  const getGrowthColor = (growth: number) => {
    if (growth >= 50) return 'text-green-400'
    if (growth >= 30) return 'text-emerald-400'
    if (growth >= 10) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 80) return 'text-red-400'
    if (difficulty >= 60) return 'text-yellow-400'
    return 'text-green-400'
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
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
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Trend Analyzer</h1>
              <p className="text-xl text-gray-300">Analyze market trends and opportunities</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-500/30 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Keywords
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter keywords to analyze..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-green-500/30 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-green-500/30 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Timeframe */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Timeframe
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-green-500/30 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {timeframes.map((tf) => (
                  <option key={tf.value} value={tf.value}>
                    {tf.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:from-green-600 hover:via-emerald-600 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Filter className="w-5 h-5" />
                  <span>Analyze Trends</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-500/30 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Trending Keywords</h2>
            <div className="flex items-center space-x-2 text-gray-400">
              <BarChart3 className="w-5 h-5" />
              <span>{trends.length} results found</span>
            </div>
          </div>

          {trends.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-2 text-gray-300 font-semibold">Keyword</th>
                    <th className="text-left py-4 px-2 text-gray-300 font-semibold">Search Volume</th>
                    <th className="text-left py-4 px-2 text-gray-300 font-semibold">Growth</th>
                    <th className="text-left py-4 px-2 text-gray-300 font-semibold">Difficulty</th>
                    <th className="text-left py-4 px-2 text-gray-300 font-semibold">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {trends.map((trend, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-2">
                        <div className="text-white font-medium">{trend.keyword}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="text-gray-300">{formatNumber(trend.volume)}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className={`font-semibold ${getGrowthColor(trend.growth)}`}>
                          +{trend.growth}%
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className={`font-semibold ${getDifficultyColor(trend.difficulty)}`}>
                          {trend.difficulty}/100
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm capitalize">
                          {trend.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No trends found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Insights Panel */}
        {trends.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-500/30 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Top Growth</h3>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-2">
                +{Math.max(...trends.map(t => t.growth)).toFixed(1)}%
              </div>
              <p className="text-gray-400 text-sm">Highest growth rate</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Avg Volume</h3>
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {formatNumber(Math.round(trends.reduce((sum, t) => sum + t.volume, 0) / trends.length))}
              </div>
              <p className="text-gray-400 text-sm">Average search volume</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Opportunities</h3>
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {trends.filter(t => t.difficulty < 60 && t.growth > 30).length}
              </div>
              <p className="text-gray-400 text-sm">Low competition, high growth</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}