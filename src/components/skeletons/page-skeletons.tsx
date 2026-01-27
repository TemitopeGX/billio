import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SettingsPageSkeleton() {
    return (
        <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
            {/* Page Header Skeleton */}
            <div>
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-6 w-96" />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation Skeleton */}
                <div className="lg:w-64 space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-12 w-full rounded-xl" />
                    ))}
                </div>

                {/* Main Content Skeleton */}
                <div className="flex-1">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-6 border-b border-slate-100">
                            <div className="flex items-center space-x-3">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-48" />
                                    <Skeleton className="h-4 w-64" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            {/* Form Fields Skeleton */}
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-12 w-full rounded-xl" />
                                </div>
                            ))}

                            {/* Button Skeleton */}
                            <div className="flex justify-end pt-6 border-t border-slate-100">
                                <Skeleton className="h-12 w-40 rounded-xl" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export function ExpensesPageSkeleton() {
    return (
        <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
            {/* Page Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Skeleton className="h-9 w-48 mb-2" />
                    <Skeleton className="h-6 w-96" />
                </div>
                <Skeleton className="h-12 w-full md:w-40 rounded-xl" />
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <Skeleton className="h-12 w-12 rounded-xl" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-8 w-40" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center space-x-3">
                                <Skeleton className="h-9 w-9 rounded-lg" />
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-40" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <Skeleton className="h-[300px] w-full rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="p-6 space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 flex-1">
                                <Skeleton className="h-10 w-24" />
                                <Skeleton className="h-8 w-32 rounded-full" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-8 w-8 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function InvoicesPageSkeleton() {
    return (
        <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Skeleton className="h-9 w-48 mb-2" />
                    <Skeleton className="h-6 w-96" />
                </div>
                <Skeleton className="h-12 w-full md:w-40 rounded-xl" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-8 w-32 mb-1" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="h-12 flex-1 rounded-xl" />
                <Skeleton className="h-12 w-full md:w-40 rounded-xl" />
                <Skeleton className="h-12 w-full md:w-40 rounded-xl" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-6 space-y-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-12 w-24" />
                            <Skeleton className="h-12 flex-1" />
                            <Skeleton className="h-8 w-20 rounded-full" />
                            <Skeleton className="h-12 w-32" />
                            <Skeleton className="h-8 w-8 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function ClientsPageSkeleton() {
    return (
        <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Skeleton className="h-9 w-48 mb-2" />
                    <Skeleton className="h-6 w-96" />
                </div>
                <Skeleton className="h-12 w-full md:w-40 rounded-xl" />
            </div>

            {/* Search */}
            <Skeleton className="h-12 w-full md:w-96 rounded-xl" />

            {/* Client Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="flex-1">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                        <div className="flex gap-2 mt-4">
                            <Skeleton className="h-10 flex-1 rounded-xl" />
                            <Skeleton className="h-10 w-10 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PaymentsPageSkeleton() {
    return (
        <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Skeleton className="h-9 w-48 mb-2" />
                    <Skeleton className="h-6 w-96" />
                </div>
                <Skeleton className="h-12 w-full md:w-40 rounded-xl" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-8 w-40" />
                    </div>
                ))}
            </div>

            {/* Payments List */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                            <div className="flex items-center gap-4 flex-1">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-24" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function ReportsPageSkeleton() {
    return (
        <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
            {/* Header */}
            <div>
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-6 w-96" />
            </div>

            {/* Date Range Selector */}
            <div className="flex gap-4">
                <Skeleton className="h-12 w-full md:w-64 rounded-xl" />
                <Skeleton className="h-12 w-full md:w-40 rounded-xl" />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <Skeleton className="h-6 w-40 mb-2" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-8 w-8 rounded" />
                        </div>
                        <Skeleton className="h-[300px] w-full rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
}
