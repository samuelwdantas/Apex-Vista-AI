import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-sm border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/276afa56-12ee-4cb4-b583-b25f4d82ca46.png" 
                alt="Apex Vista AI Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">Apex Vista AI</span>
            </Link>
            
            <Link 
              href="/subscribe" 
              className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Subscribe</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">Privacy Policy</span>
          </h1>
          <p className="text-xl text-gray-300">
            Last Updated: November 7, 2025
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 shadow-2xl">
          <div className="prose prose-invert prose-emerald max-w-none">
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              This Privacy Policy governs the manner in which Apex Vista AI ("we," "us," or "our") collects, uses, maintains, and discloses your personal information when you use our website, subscribe to the "Reach Booster" Service, or book a "FREE AI Strategy Session."
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">1. Acceptance and Agreement to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By subscribing to the Service, booking a consultation, or otherwise accessing the Apex Vista AI platform, you signify your acceptance of this Privacy Policy. If you do not agree to this policy, please do not use our Service. Your continued use following the posting of changes will be deemed your acceptance of those changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">2. Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We collect information directly from you when you interact with our Service.
              </p>
              
              <div className="bg-gray-900/50 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-white mb-4">Data Collection Overview</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 px-3 text-emerald-400 font-semibold">Data Category</th>
                        <th className="text-left py-2 px-3 text-emerald-400 font-semibold">What We Collect</th>
                        <th className="text-left py-2 px-3 text-emerald-400 font-semibold">Purpose of Collection</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700/50">
                        <td className="py-3 px-3 font-medium">Account & Billing Data</td>
                        <td className="py-3 px-3">Email, Name, Password (encrypted), Business Name, Billing Address, Payment Information (via secure processor)</td>
                        <td className="py-3 px-3">To provide the Service, process subscription fees, manage your account, and deliver essential customer support</td>
                      </tr>
                      <tr className="border-b border-gray-700/50">
                        <td className="py-3 px-3 font-medium">Consultation Data</td>
                        <td className="py-3 px-3">Phone Number, Specific Pain Points/Goals (from booking form)</td>
                        <td className="py-3 px-3">To schedule and personalize the FREE AI Strategy Session, ensuring the consultation provides the highest value</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-medium">Voluntary Data</td>
                        <td className="py-3 px-3">Industry/Niche</td>
                        <td className="py-3 px-3">To improve the accuracy and relevance of the content and analysis generated by our AI tools for you</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">3. Usage, AI Data, and Non-Personal Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We automatically collect data whenever you interact with our platform.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Usage Data:</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We collect data on which features are used, generation history (inputs and outputs), and frequency of tool use. This is collected to monitor and enforce the usage limit of the Reach Booster plan (50 assets/month) and to continuously train and improve the performance and accuracy of our underlying AI models.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Technical Data:</h3>
                  <p className="text-gray-300 leading-relaxed">
                    This includes IP addresses, browser information, and access times. This is used for platform security, maintenance, and technical troubleshooting.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">4. How We Use Collected Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Apex Vista AI uses your personal identification information for the following specific purposes:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <strong className="text-white">To Fulfill Service Obligations:</strong> To operate and maintain the core functionality of the Reach Booster Service and deliver custom solutions through On-Demand Development.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <strong className="text-white">To Enhance and Personalize the User Experience:</strong> We use aggregated usage data to understand how our Subscribers utilize the platform, allowing us to prioritize feature development and improve AI model outputs.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <strong className="text-white">To Send Communication:</strong> To send essential security alerts, password resets, and critical updates pertaining to your account. You can opt-out of marketing emails at any time via the unsubscribe link.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <strong className="text-white">To Improve Customer Service:</strong> Information you provide helps us respond to support needs and technical requests more efficiently.
                  </div>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">5. Sharing and Disclosure of Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or rent Subscriber personal identification information to others for marketing purposes. We share your information only in the following limited circumstances:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <strong className="text-white">Service Providers:</strong> We share data with trusted third-party vendors (e.g., payment processors, hosting services) necessary for the effective operation of the Service. These parties are contractually bound to keep your information confidential.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <strong className="text-white">Legal Compliance:</strong> We will disclose information when required by law or judicial process, specifically including courts in Okaloosa County, Florida, to protect our rights or the rights of others, or to enforce our Terms and Conditions.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <strong className="text-white">Business Transfers:</strong> If Apex Vista AI is involved in a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.
                  </div>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">6. Your Rights and Choices</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <strong className="text-white">Access and Correction:</strong> You may review and update most of your account information directly in your dashboard.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <strong className="text-white">Marketing Opt-Out:</strong> You can unsubscribe from marketing emails at any time.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <strong className="text-white">Data Deletion (Right to be Forgotten):</strong> You may request that we delete your account and associated data, subject to mandatory retention periods for legal, tax, or regulatory purposes.
                  </div>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">7. Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement reasonable physical, technical, and administrative security measures designed to protect your Personal Information. You are responsible for maintaining the confidentiality of your account password.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                The Provider has the discretion to update this Privacy Policy at any time. We will notify you of any material changes by posting the new policy on our website or through an email notification.
              </p>
            </section>

          </div>
        </div>

        {/* Back to Subscribe Button */}
        <div className="text-center mt-12">
          <Link 
            href="/subscribe"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Subscribe</span>
          </Link>
        </div>
      </div>
    </div>
  )
}