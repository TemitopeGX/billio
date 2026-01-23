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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="rounded-xl border-slate-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">Notifications</h1>
            <p className="text-slate-500 text-lg">
              Stay updated with your business activities
              {unreadCount > 0 && (
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            disabled={isMarkingAllAsRead}
            className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 py-3 font-bold transition-colors shadow-none"
          >
            {isMarkingAllAsRead ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Marking all as read...
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
        <CardHeader className="pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-50 rounded-lg">
              <Bell className="h-6 w-6 text-slate-900" />
            </div>
            <CardTitle className="text-xl font-bold text-slate-900">All Notifications</CardTitle>
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
            <div className="space-y-4">
              {notifications.map((notification: { id: string; title: string; message: string; type: string; read: boolean; createdAt: string }) => {
                return (
                  <div
                    key={notification.id}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer group ${!notification.read
                      ? 'bg-slate-50 border-slate-200 shadow-sm'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                      }`}
                    onClick={() => handleMarkAsRead(notification.id, notification.read)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 h-3 w-3 rounded-full flex-shrink-0 ${!notification.read ? 'bg-red-500' : 'bg-slate-200'
                        }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-1">
                            <p className={`text-base ${!notification.read ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                              {notification.title}
                            </p>
                            <p className={`text-sm leading-relaxed ${!notification.read ? 'text-slate-600' : 'text-slate-500'}`}>
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                              <p className="text-xs text-slate-400 flex items-center font-medium">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatTimeAgo(notification.createdAt)}
                              </p>
                              {!notification.read && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-200 text-slate-700">
                                  New
                                </span>
                              )}
                            </div>
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
