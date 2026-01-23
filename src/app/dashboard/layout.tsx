"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  User,
  Building2,
  Bell,
  Search,
  Home,
  Calculator,
  Plus,
  ChevronDown,
  MessageSquare,
  Clock,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useProfile } from "@/hooks/useProfile";
import { useNotifications } from "@/hooks/useNotifications";
import FeedbackModal from "@/components/FeedbackModal";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";
import { useFirstInvoiceFeedback } from "@/hooks/useFirstInvoiceFeedback";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { SearchModal } from "@/components/SearchModal";
import { Kbd } from "@/components/ui/kbd";

const topNav = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Verify", href: "/dashboard/payments-verification", icon: CreditCard },
  { name: "History", href: "/dashboard/payments/history", icon: Clock },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Expenses", href: "/dashboard/expenses", icon: Calculator },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading, isRememberMe } = useAuth();
  const { profile } = useProfile();
  const {
    notifications,
    unreadCount,
    isLoading: notificationsLoading,
    markAsRead,
    markAllAsRead,
    getNotificationIcon,
    formatTimeAgo,
    isMarkingAllAsRead
  } = useNotifications();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { showFirstInvoiceFeedback, closeFirstInvoiceFeedback } = useFirstInvoiceFeedback();

  const sessionConfig = isRememberMe
    ? { warningTime: 0, logoutTime: 60, checkInterval: 30 }
    : { warningTime: 0, logoutTime: 30, checkInterval: 30 };
  useSessionTimeout(sessionConfig);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (!isLoading && !isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
          <p className="mt-4 text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
  };

  const getUserInitials = (name: string | null | undefined) => {
    if (!name || typeof name !== 'string') {
      return 'U';
    }
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        {/* Top Navigation Bar */}
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="flex items-center group">
                <span className="text-2xl font-black text-slate-900 tracking-tighter">
                  Billio.
                </span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center gap-3 pl-4 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 text-sm group"
              >
                <Search className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                <span className="flex-1 text-left text-slate-400 group-hover:text-slate-600 transition-colors">
                  Search invoices, clients, payments...
                </span>
                <Kbd className="hidden sm:inline-flex bg-white border-slate-200 text-slate-500">⌘ + K</Kbd>
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Quick Actions */}
              <div className="hidden lg:flex items-center space-x-2">
                <Link href="/dashboard/invoices/new">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 py-2 font-bold shadow-none transition-all">
                    <Plus className="h-4 w-4 mr-2" />
                    New Invoice
                  </Button>
                </Link>
                <Link href="/dashboard/clients/new">
                  <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl px-4 py-2 font-medium">
                    <Users className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                </Link>
              </div>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative p-3 hover:bg-slate-100 rounded-xl">
                    <Bell className="h-5 w-5 text-slate-500" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-[10px] text-white font-bold leading-none">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 border-slate-200" align="end">
                  <DropdownMenuLabel>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900">Notifications</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-slate-500 hover:text-slate-900"
                        onClick={markAllAsRead}
                        disabled={isMarkingAllAsRead || unreadCount === 0}
                      >
                        {isMarkingAllAsRead ? 'Marking...' : 'Mark all as read'}
                      </Button>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <div className="max-h-80 overflow-y-auto">
                    {notificationsLoading ? (
                      <div className="p-4 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900 mx-auto"></div>
                        <p className="text-xs text-slate-500 mt-2">Loading notifications...</p>
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="p-4 text-center">
                        <Bell className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((notification: any) => {
                        const iconInfo = getNotificationIcon(notification.type);
                        return (
                          <DropdownMenuItem
                            key={notification.id}
                            className={`p-4 hover:bg-slate-50 cursor-pointer ${!notification.read ? 'bg-slate-50/50' : ''}`}
                            onClick={() => !notification.read && markAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 ${notification.read ? 'bg-slate-200' : 'bg-slate-900'} rounded-full mt-2`}></div>
                              <div className="flex-1">
                                <p className={`text-sm ${notification.read ? 'text-slate-500' : 'font-bold text-slate-900'}`}>
                                  {notification.title}
                                </p>
                                <p className="text-xs text-slate-500">{notification.message}</p>
                                <p className="text-xs text-slate-400 mt-1">{formatTimeAgo(notification.createdAt)}</p>
                              </div>
                            </div>
                          </DropdownMenuItem>
                        );
                      })
                    )}
                  </div>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <Link href="/dashboard/notifications">
                    <DropdownMenuItem className="p-3 text-center text-slate-600 hover:text-slate-900 cursor-pointer font-medium">
                      View all notifications
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Feedback Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFeedbackModalOpen(true)}
                className="p-3 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
                title="Share Feedback"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarImage src={profile?.avatar || undefined} />
                        <AvatarFallback className="bg-slate-900 text-white font-bold text-sm">
                          {profile ? getUserInitials(profile.name) : (user ? getUserInitials(user.name) : 'U')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:block text-left">
                        <p className="text-sm font-bold text-slate-900">{profile?.name || user?.name || 'User'}</p>
                        <p className="text-xs text-slate-500">Business Owner</p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 border-slate-200" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none text-slate-900">{profile?.name || user?.name}</p>
                      <p className="text-xs leading-none text-slate-500">{profile?.email || user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem asChild className="py-3 cursor-pointer text-slate-700 focus:text-slate-900 focus:bg-slate-50">
                    <Link href="/dashboard/settings?tab=profile">
                      <User className="mr-3 h-4 w-4" />
                      <div>
                        <p className="font-medium">Profile</p>
                        <p className="text-xs text-slate-500">Manage your account</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="py-3 cursor-pointer text-slate-700 focus:text-slate-900 focus:bg-slate-50">
                    <Link href="/dashboard/settings?tab=company">
                      <Building2 className="mr-3 h-4 w-4" />
                      <div>
                        <p className="font-medium">Business Settings</p>
                        <p className="text-xs text-slate-500">Company information</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="py-3 cursor-pointer text-slate-700 focus:text-slate-900 focus:bg-slate-50">
                    <Link href="/dashboard/settings?tab=appearance">
                      <Settings className="mr-3 h-4 w-4" />
                      <div>
                        <p className="font-medium">Preferences</p>
                        <p className="text-xs text-slate-500">App settings</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem onClick={handleLogout} className="py-3 text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
                    <LogOut className="mr-3 h-4 w-4" />
                    <div>
                      <p className="font-medium">Sign out</p>
                      <p className="text-xs opacity-70">End your session</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pb-2">
          <div className="flex items-center space-x-1 bg-slate-100/50 rounded-xl p-1 w-fit border border-slate-200/50">
            {topNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${isActive
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                    }`}
                >
                  <item.icon className={`h-4 w-4 mr-2 ${isActive ? "text-slate-900" : "text-slate-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="pt-36 px-6 pb-12 max-w-[100rem] mx-auto">
        {children}
      </main>

      {/* Floating Feedback Button */}
      <FloatingFeedbackButton />

      {/* Header Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        trigger="header"
      />

      {/* First Invoice Feedback Modal */}
      <FeedbackModal
        isOpen={showFirstInvoiceFeedback}
        onClose={closeFirstInvoiceFeedback}
        trigger="first_invoice"
      />

      {/* Search Modal */}
      <SearchModal
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
      />

    </div>
  );
}
