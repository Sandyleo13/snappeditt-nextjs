
import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Download, FileText, Printer, Mail } from 'lucide-react';

// SEO Metadata


// Structured Data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'PaymentStatus',
  'name': 'Payment Confirmation',
  'description': 'Payment completed successfully',
  'confirmationNumber': 'AUTO_GENERATED', // This would be dynamic in real app
  'paymentMethod': 'Credit Card',
  'paymentStatus': 'PaymentComplete',
  'merchant': {
    '@type': 'Organization',
    'name': 'Your Company Name',
    'url': 'https://yourwebsite.com'
  }
};

interface PaymentThankYouPageProps {
  searchParams?: {
    orderId?: string;
    amount?: string;
    currency?: string;
    email?: string;
    product?: string;
    paymentMethod?: string;
    status?: string;
  };
}

export default function PaymentThankYouPage({ searchParams }: PaymentThankYouPageProps = {}) {
  // Parse search params with defaults
  // const orderId = searchParams?.orderId || `ORD-${Date.now().toString().slice(-8)}`;
  // const amount = searchParams?.amount || '0.00';
  // const currency = searchParams?.currency || 'USD';
  // const userEmail = searchParams?.email;
  // const productName = searchParams?.product || 'Your Purchase';
  // const paymentMethod = searchParams?.paymentMethod || 'Credit Card';
  // const paymentStatus = searchParams?.status || 'completed';
  
  // const paymentDate = new Date().toLocaleDateString('en-US', {
  //   weekday: 'long',
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  //   hour: '2-digit',
  //   minute: '2-digit'
  // });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your purchase. Your payment has been processed successfully.
            </p>
          </div>

          {/* Order Summary */}
          {/* <div className="border border-gray-200 rounded-xl p-6 mb-8 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-mono font-medium text-gray-900">{orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium text-gray-900">{paymentDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Product</p>
                    <p className="font-medium text-gray-900">{productName}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium text-gray-900">{paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100">
                      <span className="text-green-800 font-medium capitalize">{paymentStatus}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount Paid</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {currency === 'USD' ? '$' : currency} {amount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Next Steps */}
          
          {/* Action Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
            
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-5 h-5 mr-2" />
              Print Receipt
            </button>
            
            <Link
              href={`/api/invoice/${orderId}`} // This would be your invoice API endpoint
              className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Invoice
            </Link>
          </div> */}

          {/* Support Section */}
          {/* <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-2">
              Need help with your purchase?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Contact Support
              </Link>
              <Link 
                href="/faq"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Visit FAQ
              </Link>
              <Link 
                href="/orders"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View My Orders
              </Link>
            </div>
          </div> */}

          {/* Important Notes */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Please check your email id an copy of invoice is send to your email. Incase of delivering invoice
              to your email please contact our support team.
            </p>
          </div>
        </div>

        {/* Breadcrumb for SEO */}
        {/* <nav className="mt-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/shop" className="hover:text-blue-600">
                Shop
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Payment Confirmation</li>
          </ol>
        </nav> */}
      </main>
    </div>
  );
}