import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Users, DollarSign, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OnboardingStep {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    action: string;
    route: string;
}

export function OnboardingWelcome() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [dismissed, setDismissed] = useState(false);

    const steps: OnboardingStep[] = [
        {
            id: 1,
            title: "Welcome to Billio! 🎉",
            description: "Let's get you set up in just a few steps. We'll help you create your first invoice and start getting paid faster.",
            icon: (
                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Welcome illustration */}
                    <circle cx="100" cy="100" r="80" fill="#F1F5F9" />
                    <circle cx="100" cy="100" r="60" fill="#0F172A" opacity="0.1" />
                    <path d="M70 90 L90 110 L130 70" stroke="#0F172A" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            ),
            action: "Get Started",
            route: "",
        },
        {
            id: 2,
            title: "Add Your First Client",
            description: "Start by adding a client to your database. You'll need at least one client to create invoices.",
            icon: (
                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Client illustration */}
                    <circle cx="100" cy="100" r="80" fill="#F1F5F9" />
                    <circle cx="100" cy="80" r="30" fill="#0F172A" opacity="0.2" />
                    <path d="M60 140 Q100 120 140 140" fill="#0F172A" opacity="0.2" />
                </svg>
            ),
            action: "Add Client",
            route: "/dashboard/clients/new",
        },
        {
            id: 3,
            title: "Create Your First Invoice",
            description: "Create a professional invoice in minutes. Add line items, set due dates, and send it to your client.",
            icon: (
                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Invoice illustration */}
                    <rect x="60" y="40" width="80" height="120" rx="8" fill="#F1F5F9" />
                    <rect x="70" y="60" width="60" height="8" rx="4" fill="#0F172A" opacity="0.2" />
                    <rect x="70" y="80" width="40" height="6" rx="3" fill="#0F172A" opacity="0.1" />
                    <rect x="70" y="100" width="60" height="6" rx="3" fill="#0F172A" opacity="0.1" />
                    <rect x="70" y="120" width="50" height="6" rx="3" fill="#0F172A" opacity="0.1" />
                </svg>
            ),
            action: "Create Invoice",
            route: "/dashboard/invoices/new",
        },
        {
            id: 4,
            title: "You're All Set! 🚀",
            description: "You're ready to start invoicing! Explore your dashboard to see insights, manage clients, and track payments.",
            icon: (
                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Success illustration */}
                    <circle cx="100" cy="100" r="80" fill="#10B981" opacity="0.1" />
                    <circle cx="100" cy="100" r="60" fill="#10B981" opacity="0.2" />
                    <path d="M70 100 L90 120 L130 80" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            ),
            action: "Go to Dashboard",
            route: "/dashboard",
        },
    ];

    const handleNext = () => {
        const step = steps[currentStep];
        if (step.route) {
            router.push(step.route);
            handleDismiss();
        } else {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handleSkip = () => {
        setCurrentStep(steps.length - 1);
    };

    const handleDismiss = () => {
        setDismissed(true);
        localStorage.setItem('onboarding_completed', 'true');
    };

    if (dismissed) return null;

    const step = steps[currentStep];

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8 md:p-12">
                    {/* Progress indicator */}
                    <div className="flex gap-2 mb-8">
                        {steps.map((s, idx) => (
                            <div
                                key={s.id}
                                className={`h-1.5 flex-1 rounded-full transition-all ${idx <= currentStep ? 'bg-slate-900' : 'bg-slate-200'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Illustration */}
                    <div className="w-48 h-48 mx-auto mb-8">
                        {step.icon}
                    </div>

                    {/* Content */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-slate-900 mb-4">
                            {step.title}
                        </h2>
                        <p className="text-lg text-slate-600 max-w-lg mx-auto">
                            {step.description}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        {currentStep < steps.length - 1 && (
                            <Button
                                variant="outline"
                                onClick={handleSkip}
                                className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl px-6"
                            >
                                Skip Tour
                            </Button>
                        )}
                        <Button
                            onClick={handleNext}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl px-8 flex items-center gap-2"
                        >
                            {step.action}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Step indicator */}
                    <div className="text-center mt-6 text-sm text-slate-400">
                        Step {currentStep + 1} of {steps.length}
                    </div>
                </div>
            </Card>
        </div>
    );
}

// Quick start checklist component for dashboard
interface QuickStartChecklistProps {
    hasClients: boolean;
    hasInvoices: boolean;
    hasCompanyInfo: boolean;
}

export function QuickStartChecklist({ hasClients, hasInvoices, hasCompanyInfo }: QuickStartChecklistProps) {
    const router = useRouter();
    const [dismissed, setDismissed] = useState(false);

    const checklist = {
        hasClients,
        hasInvoices,
        hasCompanyInfo,
    };

    const tasks = [
        {
            id: 'company',
            title: 'Set up company information',
            description: 'Add your logo and business details',
            completed: checklist.hasCompanyInfo,
            action: () => router.push('/dashboard/settings?tab=company'),
            icon: <Users className="w-5 h-5" />,
        },
        {
            id: 'client',
            title: 'Add your first client',
            description: 'Create a client to invoice',
            completed: checklist.hasClients,
            action: () => router.push('/dashboard/clients/new'),
            icon: <Users className="w-5 h-5" />,
        },
        {
            id: 'invoice',
            title: 'Create your first invoice',
            description: 'Start getting paid',
            completed: checklist.hasInvoices,
            action: () => router.push('/dashboard/invoices/new'),
            icon: <FileText className="w-5 h-5" />,
        },
    ];

    const completedCount = tasks.filter(t => t.completed).length;
    const allCompleted = completedCount === tasks.length;

    if (dismissed || allCompleted) return null;

    return (
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-lg">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold mb-1">Quick Start Guide</h3>
                        <p className="text-slate-300 text-sm">
                            {completedCount} of {tasks.length} completed
                        </p>
                    </div>
                    <button
                        onClick={() => setDismissed(true)}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-700 rounded-full mb-6 overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                        style={{ width: `${(completedCount / tasks.length) * 100}%` }}
                    />
                </div>

                {/* Tasks */}
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <button
                            key={task.id}
                            onClick={task.action}
                            className="w-full flex items-start gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-left group"
                        >
                            <div className={`p-2 rounded-lg ${task.completed ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                                {task.completed ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    task.icon
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold mb-1 group-hover:text-emerald-400 transition-colors">
                                    {task.title}
                                </h4>
                                <p className="text-sm text-slate-300">{task.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </button>
                    ))}
                </div>
            </div>
        </Card>
    );
}
