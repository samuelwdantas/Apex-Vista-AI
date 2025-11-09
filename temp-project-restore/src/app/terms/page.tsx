import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 shadow-2xl">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">
              Apex Vista AI: Terms and Conditions
            </h1>
            
            <p className="text-gray-400 text-center mb-8">
              <strong>Last Updated:</strong> November 7, 2025
            </p>

            <div className="text-gray-300 space-y-6 leading-relaxed">
              <p>
                This Subscription and Services Agreement ("Agreement") is entered into between Apex Vista AI ("Provider," "we," "us") and you, the subscriber or client ("Subscriber" or "you"). By clicking "Subscribe Now," submitting payment, or accessing the Apex Vista AI platform, you agree to be legally bound by these Terms and Conditions.
              </p>

              <h2 className="text-2xl font-bold text-emerald-400 mt-8 mb-4">1. The Apex Vista AI Service</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">1.1. The Reach Booster Subscription</h3>
              <p>
                The "Reach Booster" is a single-tier, self-service subscription product providing access to the Apex Vista AI platform, including AI-powered content generation, trend analysis, and workflow automation tools, subject to the limits defined herein.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">1.2. Usage Limits and Scope of Service</h3>
              <p>
                The Reach Booster plan is strictly limited to 50 total content assets generated per month (or as specified on the plan details). The subscription does not include 1:1 consultation time, dedicated support beyond standard email support, or custom development scoping.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">1.3. Eligibility</h3>
              <p>
                By using the Service, you confirm that you are at least 18 years of age and legally capable of entering into a binding contract.
              </p>

              <h2 className="text-2xl font-bold text-emerald-400 mt-8 mb-4">2. Subscription Terms, Payment, and Cancellation</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">2.1. Term and Automatic Renewal</h3>
              <p>
                The subscription is offered on a monthly or annual basis. The subscription will automatically renew at the end of the current term (the "Negative Option Feature") unless you cancel prior to the renewal date. By subscribing, you provide explicit affirmative consent to the automatic renewal and the recurring charges.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">2.2. Fees and Non-Refundability</h3>
              <p>
                Fees are due in advance. All subscription payments (monthly and annual) are final and non-refundable, except as explicitly stated in Section 5.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">2.3. Cancellation</h3>
              <p>
                You may cancel your subscription at any time through your Apex Vista AI account dashboard. Cancellation is designed to be as easy as enrollment. Cancellation takes effect at the end of your current billing period, and no prorated refunds will be issued for prepaid time.
              </p>

              <h2 className="text-2xl font-bold text-emerald-400 mt-8 mb-4">3. On-Demand Development Services (Custom Work)</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.1. Scope and Agreement</h3>
              <p>
                On-Demand Development services ("Apex Solution Build," "Feature Enhancement") are custom, high-value, one-time projects. The fees, precise scope, and delivery timelines for these projects will be formally agreed upon and documented in a separate, written Statement of Work (SOW) specific to the project.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">3.2. Ownership of Custom Solutions</h3>
              <p>
                Upon full and final payment for the On-Demand Development Services, you receive a perpetual, non-exclusive license to use the specific custom code or application developed for you. The Provider retains full ownership and all Intellectual Property of the underlying Apex Vista AI platform, core technology, and infrastructure used to create the solution.
              </p>

              <h2 className="text-2xl font-bold text-emerald-400 mt-8 mb-4">4. Intellectual Property and License Grant (Provider Protection)</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">4.1. Ownership of the Platform (The Engine)</h3>
              <p>
                The Subscriber acknowledges that Apex Vista AI retains all right, title, and interest, including all Intellectual Property Rights (copyrights, patents, trade secrets), in and to the underlying AI models, algorithms, infrastructure, and any associated software or technology used to provide the Service ("The Platform").
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">4.2. Restrictions on Use (Prohibited Actions)</h3>
              <p>You may not, nor may you permit any third party to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Reverse Engineer:</strong> Decompile, reverse engineer, or attempt to derive the source code or underlying structure of The Platform.</li>
                <li><strong>Resell Access:</strong> Rent, lease, lend, sell, sublicense, or otherwise distribute The Platform access to third parties.</li>
                <li><strong>Modify/Copy:</strong> Modify, copy, or create derivative works based on The Platform.</li>
                <li><strong>Circumvent Limits:</strong> Attempt to bypass any usage limits or security features of the Service.</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.3. Ownership of AI Output (Subscriber Content)</h3>
              <p>
                Notwithstanding Section 4.1, you retain ownership of the final content assets generated by the Service (e.g., social media captions, drafts) for your own business use, provided they were generated in compliance with these Terms and the usage limits of your subscription.
              </p>

              <h2 className="text-2xl font-bold text-emerald-400 mt-8 mb-4">5. Disclaimer and Limitation of Liability</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1. Disclaimer of AI Accuracy and Business Risk</h3>
              <p>
                The Service is provided "as is" and "as available." The Provider does not warrant the accuracy, completeness, or reliability of the data, analysis, or content generated by the AI tools. You acknowledge that you are solely responsible for verifying the accuracy and appropriateness of any generated content before use. The Provider is not liable for any business loss or damages resulting from reliance on the AI's output.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">5.2. General Limitation of Liability</h3>
              <p>
                In no event shall the Provider be liable for any indirect, incidental, special, punitive, or consequential damages (including, but not limited to, damages for loss of profits, data, or business interruption) arising from the use or inability to use the Service. The Provider's total cumulative liability shall not exceed the total amount paid by the Subscriber in the six (6) months immediately preceding the event giving rise to the claim.
              </p>

              <h2 className="text-2xl font-bold text-emerald-400 mt-8 mb-4">6. Governing Law and Jurisdiction</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1. Governing Law</h3>
              <p>
                This Agreement shall be governed by and construed in accordance with the laws of the State of Florida and the Federal Laws of the United States, without regard to its conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">6.2. Jurisdiction and Venue</h3>
              <p>
                You and Apex Vista AI agree to submit to the exclusive jurisdiction of the state and federal courts located in Okaloosa County, Florida, to resolve any legal matter arising from these Terms or the Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}