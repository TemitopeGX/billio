"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Scale, Users, Shield, AlertTriangle, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-black">Billio</span>
                <p className="text-sm text-gray-600 -mt-1">Invoice Management</p>
              </div>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-blue-100 rounded-2xl">
                <Scale className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-black mb-4">Terms of Service</CardTitle>
            <p className="text-gray-600 text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <FileText className="h-6 w-6 mr-3 text-blue-600" />
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Billio! These Terms of Service ("Terms") govern your use of our invoice management platform 
                and related services. By accessing or using Billio, you agree to be bound by these Terms. If you do 
                not agree to these Terms, please do not use our services.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-blue-600" />
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By creating an account, accessing our platform, or using any of our services, you acknowledge that you 
                have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms constitute 
                a legally binding agreement between you and Billio.
              </p>
            </section>

            {/* Description of Service */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <Users className="h-6 w-6 mr-3 text-blue-600" />
                Description of Service
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Billio is a comprehensive invoice management platform designed for small and medium-sized enterprises (SMEs) 
                in Africa. Our services include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Invoice creation, management, and tracking</li>
                <li>Client management and contact organization</li>
                <li>Payment processing and reconciliation</li>
                <li>Financial reporting and analytics</li>
                <li>Document storage and management</li>
                <li>Mobile and web-based access</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">User Accounts</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Creation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To use our services, you must create an account by providing accurate, complete, and current information. 
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities 
                    that occur under your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Security</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You must notify us immediately of any unauthorized use of your account or any other breach of security. 
                    We are not liable for any loss or damage arising from your failure to protect your account information.
                  </p>
                </div>
              </div>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-3 text-blue-600" />
                Acceptable Use
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Transmit or upload malicious code or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services for fraudulent or illegal activities</li>
                <li>Interfere with the proper functioning of our platform</li>
                <li>Resell or redistribute our services without permission</li>
              </ul>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Payment Terms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Subscription Fees</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our services are provided on a subscription basis. Fees are charged in advance and are non-refundable 
                    except as required by law. We reserve the right to change our pricing with 30 days' notice.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Processing</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Payments are processed securely through our payment partners. You authorize us to charge your chosen 
                    payment method for all applicable fees. Failed payments may result in service suspension.
                  </p>
                </div>
              </div>
            </section>

            {/* Data and Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Data and Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Our collection, use, and protection of your data is governed by our 
                Privacy Policy, which is incorporated into these Terms by reference. By using our services, you consent 
                to the collection and use of your information as described in our Privacy Policy.
              </p>
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-blue-800 font-medium">
                  <strong>Note:</strong> We implement industry-standard security measures to protect your data, but no 
                  system is completely secure. You use our services at your own risk.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Billio platform, including its design, functionality, and content, is owned by us and protected by 
                intellectual property laws. You retain ownership of your data and content, but grant us a license to use 
                it to provide our services.
              </p>
            </section>

            {/* Service Availability */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Service Availability</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to provide reliable service, but we do not guarantee uninterrupted access. We may temporarily 
                suspend services for maintenance, updates, or other reasons. We are not liable for any downtime or 
                service interruptions.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-3 text-blue-600" />
                Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Billio shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including but not limited to loss of profits, data, or business 
                opportunities, arising from your use of our services.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Either party may terminate this agreement at any time. Upon termination, your access to our services will 
                cease, and we may delete your data after a reasonable period. You are responsible for exporting your data 
                before termination.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by the laws of Nigeria. Any disputes arising from these Terms or your use of our 
                services will be resolved in the courts of Nigeria.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <Mail className="h-6 w-6 mr-3 text-blue-600" />
                Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@billio.com<br />
                  <strong>Address:</strong> 123 Business Street, Lagos, Nigeria<br />
                  <strong>Phone:</strong> +234 800 000 0000
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by 
                email or through our platform. Your continued use of our services after such modifications constitutes 
                acceptance of the updated Terms.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 Billio. All rights reserved. | <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link></p>
        </div>
      </div>
    </div>
  );
}
