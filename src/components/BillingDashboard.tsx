'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Download, ExternalLink, Calendar, DollarSign } from 'lucide-react'
import { useStripeWrapper } from '@/hooks/useStripeWrapper'

interface BillingDashboardProps {
  customerId: string
  subscriptionId: string
}

export default function BillingDashboard({ customerId, subscriptionId }: BillingDashboardProps) {
  const {
    createBillingPortalSession,
    getCustomerInvoices,
    getCustomerPaymentMethods,
    loading,
    error
  } = useStripeWrapper()

  const [invoices, setInvoices] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const loadBillingData = async () => {
      try {
        setLoadingData(true)
        
        // Load invoices and payment methods in parallel
        const [invoicesData, paymentMethodsData] = await Promise.all([
          getCustomerInvoices(customerId),
          getCustomerPaymentMethods(customerId)
        ])
        
        setInvoices(invoicesData)
        setPaymentMethods(paymentMethodsData)
      } catch (err) {
        console.error('Error loading billing data:', err)
      } finally {
        setLoadingData(false)
      }
    }

    if (customerId) {
      loadBillingData()
    }
  }, [customerId, getCustomerInvoices, getCustomerPaymentMethods])

  const handleManageBilling = async () => {
    try {
      const { url } = await createBillingPortalSession(customerId)
      window.open(url, '_blank')
    } catch (err) {
      console.error('Error opening billing portal:', err)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loadingData) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          <span className="ml-3 text-gray-300">Loading billing information...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Billing Overview */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Billing & Invoices</h2>
            <p className="text-gray-300">Manage your subscription and view billing history</p>
          </div>
          
          <button
            onClick={handleManageBilling}
            disabled={loading}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Manage Billing</span>
          </button>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-emerald-400" />
            Payment Methods
          </h3>
          
          {paymentMethods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-emerald-400" />
                      <div>
                        <p className="text-white font-medium">
                          •••• •••• •••• {method.card?.last4}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {method.card?.brand?.toUpperCase()} • Expires {method.card?.exp_month}/{method.card?.exp_year}
                        </p>
                      </div>
                    </div>
                    {method.id === paymentMethods[0]?.id && (
                      <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900/50 rounded-lg p-6 text-center">
              <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No payment methods found</p>
            </div>
          )}
        </div>

        {/* Recent Invoices */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-emerald-400" />
            Recent Invoices
          </h3>
          
          {invoices.length > 0 ? (
            <div className="bg-gray-900/50 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {invoices.slice(0, 10).map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-800/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            #{invoice.number || invoice.id.slice(-8)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(invoice.created)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {formatCurrency(invoice.amount_paid)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            invoice.status === 'paid'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : invoice.status === 'open'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {invoice.invoice_pdf && (
                            <a
                              href={invoice.invoice_pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 flex items-center"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900/50 rounded-lg p-6 text-center">
              <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No invoices found</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400 text-center">{error}</p>
        </div>
      )}
    </div>
  )
}