"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Eye, Lock, Database, Users, Mail, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-black mb-4">Privacy Policy</CardTitle>
            <p className="text-gray-600 text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-3 text-blue-600" />
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At Billio, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                invoice management platform and related services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <Database className="h-6 w-6 mr-3 text-blue-600" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Name, email address, and phone number</li>
                    <li>Business information and contact details</li>
                    <li>Billing and payment information</li>
                    <li>Profile pictures and account preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Data</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Invoice and payment records</li>
                    <li>Client information and contact details</li>
                    <li>Financial data and transaction history</li>
                    <li>Business documents and files</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Usage patterns and analytics data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <Users className="h-6 w-6 mr-3 text-blue-600" />
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide and maintain our invoice management services</li>
                <li>Process payments and manage billing</li>
                <li>Send important notifications and updates</li>
                <li>Improve our platform and develop new features</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Comply with legal obligations and enforce our terms</li>
                <li>Prevent fraud and ensure platform security</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <Lock className="h-6 w-6 mr-3 text-blue-600" />
                Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure servers and regular security audits</li>
                <li>Access controls and authentication protocols</li>
                <li>Regular backups and disaster recovery procedures</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Data Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>With trusted service providers who assist in our operations</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your data</li>
                <li>Data portability and export options</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <Mail className="h-6 w-6 mr-3 text-blue-600" />
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@billio.com<br />
                  <strong>Address:</strong> 123 Business Street, Lagos, Nigeria<br />
                  <strong>Phone:</strong> +234 800 000 0000
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of 
                our services after any modifications constitutes acceptance of the updated policy.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 Billio. All rights reserved. | <Link href="/terms" className="text-blue-600 hover:text-blue-800">Terms of Service</Link></p>
        </div>
      </div>
    </div>
  );
}
