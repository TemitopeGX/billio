"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";
import { Bell, ArrowLeft, Loader2, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    getNotificationIcon,
    formatTimeAgo,
    isMarkingAllAsRead
  } = useNotifications();

  const handleMarkAsRead = (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      markAsRead(notificationId);
    }
  };

  return (
    <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <Link href="/dashboard" className="self-start sm:self-auto">
            <Button variant="outline" size="sm" className="rounded-xl border-slate-200 h-9 sm:h-10 text-xs sm:text-sm font-bold text-slate-700">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back
            </Button>
          </Link>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Notifications</h1>
            <div className="flex items-center flex-wrap gap-2 text-slate-500 text-sm sm:text-lg">
              <span>Stay updated with your activities</span>
              {unreadCount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-red-100 text-red-600 border border-red-200 uppercase tracking-wider">
                  {unreadCount} unread
                </span>
              )}
            </div>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            disabled={isMarkingAllAsRead}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-10 sm:h-12 px-5 sm:px-6 font-bold transition-colors shadow-none text-xs sm:text-sm"
          >
            {isMarkingAllAsRead ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Marking all...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark all as read
              </>
            )}
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-4 sm:pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-slate-50 rounded-lg">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-slate-900" />
            </div>
            <CardTitle className="text-lg sm:text-xl font-bold text-slate-900">All Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-slate-900" />
                <p className="text-slate-500 font-medium">Loading notifications...</p>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-20">
              <div className="p-4 bg-slate-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Bell className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No notifications yet</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                You'll receive notifications here when there are updates about your invoices,
                payments, clients, and other business activities.
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {notifications.map((notification: { id: string; title: string; message: string; type: string; read: boolean; createdAt: string }) => {
                return (
                  <div
                    key={notification.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group ${!notification.read
                      ? 'bg-slate-50 border-slate-200 shadow-sm'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                      }`}
                    onClick={() => handleMarkAsRead(notification.id, notification.read)}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`mt-1.5 sm:mt-2 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full flex-shrink-0 ${!notification.read ? 'bg-red-500' : 'bg-slate-200'
                        }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex-1 space-y-0.5 sm:space-y-1">
                          <p className={`text-sm sm:text-base leading-snug ${!notification.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                            {notification.title}
                          </p>
                          <p className={`text-xs sm:text-sm leading-relaxed ${!notification.read ? 'text-slate-600' : 'text-slate-500'}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-3 pt-1.5 sm:pt-2">
                            <p className="text-[10px] sm:text-xs text-slate-400 flex items-center font-semibold uppercase tracking-wider">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTimeAgo(notification.createdAt)}
                            </p>
                            {!notification.read && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-black bg-slate-900 text-white uppercase tracking-tighter">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
