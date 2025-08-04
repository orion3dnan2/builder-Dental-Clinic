import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Activity,
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  UserCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  Globe,
  Stethoscope,
} from "lucide-react";

interface User {
  name: string;
  type: "admin" | "doctor" | "receptionist" | "accountant";
  isAuthenticated: boolean;
}

interface Notification {
  id: string;
  type: "appointment" | "reminder" | "activity" | "urgent";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
  patientName?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isArabic, setIsArabic] = useState(true);
  const getNotificationsForUser = (userType: string) => {
    const baseNotifications = [
      {
        id: "1",
        type: "reminder" as const,
        title: isArabic ? "تذكير موعد" : "Appointment Reminder",
        message: isArabic ? "موعد أحمد محمد غداً الساعة 10:00 ص" : "Ahmed Mohammed appointment tomorrow at 10:00 AM",
        time: isArabic ? "منذ 5 دقائق" : "5 minutes ago",
        isRead: false,
        actionUrl: "/appointments",
        patientName: "أحمد محمد",
      },
      {
        id: "2",
        type: "activity" as const,
        title: isArabic ? "مريض جديد" : "New Patient",
        message: isArabic ? "تم تسجيل مريض جديد: فاطمة أحمد" : "New patient registered: Fatima Ahmed",
        time: isArabic ? "منذ 15 دقيقة" : "15 minutes ago",
        isRead: false,
        actionUrl: "/patients",
        patientName: "فاطمة أحمد",
      },
      {
        id: "3",
        type: "urgent" as const,
        title: isArabic ? "موعد عاجل" : "Urgent Appointment",
        message: isArabic ? "مريض في الانتظار لأكثر من 30 دقيقة" : "Patient waiting for more than 30 minutes",
        time: isArabic ? "منذ 30 دقيقة" : "30 minutes ago",
        isRead: false,
        actionUrl: "/dashboard",
        patientName: "محمد سالم",
      },
    ];

    if (userType === "receptionist") {
      return [
        ...baseNotifications,
        {
          id: "4",
          type: "reminder" as const,
          title: isArabic ? "مكالمة مطلوبة" : "Call Required",
          message: isArabic ? "تذكير: اتصال بخالد أحمد لتأكيد الموعد" : "Reminder: Call Khalid Ahmed to confirm appointment",
          time: isArabic ? "منذ ساعة" : "1 hour ago",
          isRead: false,
          actionUrl: "/appointments",
          patientName: "خالد أحمد",
        },
        {
          id: "5",
          type: "activity" as const,
          title: isArabic ? "موعد ملغي" : "Appointment Cancelled",
          message: isArabic ? "تم إلغاء موعد نورا سالم" : "Nora Salem appointment cancelled",
          time: isArabic ? "منذ ساعتين" : "2 hours ago",
          isRead: true,
          actionUrl: "/appointments",
          patientName: "نورا سالم",
        },
      ];
    }

    if (userType === "doctor") {
      return [
        ...baseNotifications.slice(0, 2),
        {
          id: "6",
          type: "appointment" as const,
          title: isArabic ? "المريض التالي" : "Next Patient",
          message: isArabic ? "المريض التالي: سعد الخالدي في الساعة 2:30 م" : "Next patient: Saad Al-Khalidi at 2:30 PM",
          time: isArabic ? "منذ 10 دقائق" : "10 minutes ago",
          isRead: false,
          actionUrl: "/patients",
          patientName: "سعد الخالدي",
        },
        {
          id: "7",
          type: "urgent" as const,
          title: isArabic ? "حالة طارئة" : "Emergency Case",
          message: isArabic ? "مريض يحتاج فحص عاجل" : "Patient needs urgent examination",
          time: isArabic ? "منذ 45 دقيقة" : "45 minutes ago",
          isRead: false,
          actionUrl: "/dashboard",
          patientName: "عبدالله أحمد",
        },
      ];
    }

    if (userType === "accountant") {
      return [
        {
          id: "8",
          type: "activity" as const,
          title: isArabic ? "فاتورة جديدة" : "New Invoice",
          message: isArabic ? "فاتورة جديدة بقيمة 450 ريال" : "New invoice worth 450 SAR",
          time: isArabic ? "منذ 20 دقيقة" : "20 minutes ago",
          isRead: false,
          actionUrl: "/accounting",
          patientName: "محمد العلي",
        },
        {
          id: "9",
          type: "reminder" as const,
          title: isArabic ? "دفعة متأخرة" : "Overdue Payment",
          message: isArabic ? "دفعة متأخرة من أحمد سالم" : "Overdue payment from Ahmed Salem",
          time: isArabic ? "منذ ساعة" : "1 hour ago",
          isRead: false,
          actionUrl: "/accounting",
          patientName: "أحمد سالم",
        },
        {
          id: "10",
          type: "activity" as const,
          title: isArabic ? "تقرير شهري" : "Monthly Report",
          message: isArabic ? "تقرير الإيرادات الشهرية جاهز" : "Monthly revenue report ready",
          time: isArabic ? "منذ 3 ساعات" : "3 hours ago",
          isRead: true,
          actionUrl: "/reports",
        },
      ];
    }

    return baseNotifications;
  };

  const [notifications, setNotifications] = useState<Notification[]>(
    getNotificationsForUser(user?.type || "admin")
  );

  useEffect(() => {
    if (user?.type) {
      setNotifications(getNotificationsForUser(user.type));
    }
  }, [user?.type, isArabic]);

  // Simulate live notifications every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotifications = [
        {
          id: Date.now().toString(),
          type: "reminder" as const,
          title: isArabic ? "تذكير جديد" : "New Reminder",
          message: isArabic ? "حان وقت مراجعة المواعيد" : "Time to review appointments",
          time: isArabic ? "الآن" : "now",
          isRead: false,
          actionUrl: "/appointments",
        },
      ];

      // Add new notification only if we have fewer than 10
      setNotifications(prev => {
        if (prev.length < 10) {
          return [newNotifications[0], ...prev];
        }
        return prev;
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [isArabic]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return CalendarIcon;
      case 'reminder':
        return Clock;
      case 'activity':
        return UserCheck;
      case 'urgent':
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return 'text-primary';
      case 'reminder':
        return 'text-warning';
      case 'activity':
        return 'text-success';
      case 'urgent':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const content = {
    ar: {
      dashboard:
        user?.type === "accountant"
          ? "لوحة المحاسب"
          : user?.type === "doctor"
            ? "لوحة الط��يب"
            : user?.type === "receptionist"
              ? "لوحة الاستقبال"
              : "لوحة التحكم",
      patients: "��لمرضى",
      appointments: "المواعيد",
      invoices: "الفواتير",
      reports: "التقارير",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      profile: "الملف الشخصي",
      notifications: "الإشعارات",
      admin: "مدير النظام",
      doctor: "طبيب",
      receptionist: "موظف الاستقبال",
      accountant: "محاسب",
      clinicName: "عيادة الأسنان المتطورة",
      switchLang: "English",
    },
    en: {
      dashboard:
        user?.type === "accountant"
          ? "Accounting Dashboard"
          : user?.type === "doctor"
            ? "Doctor Dashboard"
            : user?.type === "receptionist"
              ? "Reception Dashboard"
              : "Dashboard",
      patients: "Patients",
      appointments: "Appointments",
      invoices: "Invoices",
      reports: "Reports",
      settings: "Settings",
      logout: "Logout",
      profile: "Profile",
      notifications: "Notifications",
      admin: "System Admin",
      doctor: "Doctor",
      receptionist: "Receptionist",
      accountant: "Accountant",
      clinicName: "Advanced Dental Clinic",
      switchLang: "العر��ية",
    },
  };

  const t = content[isArabic ? "ar" : "en"];

  // تحديد لوحة التحكم المناسبة حسب نوع المستخدم
  const getDashboardHref = () => {
    if (user?.type === "accountant") {
      return "/dashboard"; // لوحة تحكم عامة مع إحصائيات مالية
    }
    return "/dashboard"; // لوحة تحكم عامة للجميع
  };

  // تحديد الأيقونة المناسبة لنوع المستخدم
  const getDashboardIcon = () => {
    switch (user?.type) {
      case "accountant":
        return DollarSign;
      case "doctor":
        return Stethoscope;
      case "receptionist":
        return UserCheck;
      default:
        return LayoutDashboard;
    }
  };

  const navigationItems = [
    {
      name: t.dashboard,
      href: getDashboardHref(),
      icon: getDashboardIcon(),
      roles: ["admin", "doctor", "receptionist", "accountant"],
    },
    {
      name: t.patients,
      href: "/patients",
      icon: Users,
      roles: ["admin", "doctor", "receptionist"],
    },
    {
      name: t.appointments,
      href: "/appointments",
      icon: Calendar,
      roles: ["admin", "doctor", "receptionist"],
    },
    {
      name: t.invoices,
      href: "/invoices",
      icon: DollarSign,
      roles: ["admin", "receptionist", "accountant"],
    },
    {
      name: t.reports,
      href: "/reports",
      icon: FileText,
      roles: ["admin", "doctor", "accountant"],
    },
    {
      name: isArabic ? "المحاسبة" : "Accounting",
      href: "/accounting",
      icon: DollarSign,
      roles: ["admin", "accountant"],
    },
    {
      name: t.settings,
      href: "/settings",
      icon: Settings,
      roles: ["admin"],
    },
  ];

  const filteredNavigation = navigationItems.filter(
    (item) => user && item.roles.includes(user.type),
  );

  const getUserTypeLabel = (type: string) => {
    const labels = {
      admin: t.admin,
      doctor: t.doctor,
      receptionist: t.receptionist,
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getUserTypeColor = (type: string) => {
    const colors = {
      admin: "bg-primary",
      doctor: "bg-success",
      receptionist: "bg-warning",
      accountant: "bg-purple-500",
    };
    return colors[type as keyof typeof colors] || "bg-muted";
  };

  if (!user) return null;

  return (
    <div
      className={`min-h-screen bg-background ${isArabic ? "rtl" : "ltr"}`}
      lang={isArabic ? "ar" : "en"}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isArabic ? "right-0" : "left-0"}`}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar border-r border-sidebar-border px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-2">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sidebar-foreground">
                  {t.clinicName}
                </span>
                <span className="text-xs text-sidebar-foreground/60">
                  نظام إدارة متكامل
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {filteredNavigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.name}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                to={item.href}
                                className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-medical ${
                                  isActive
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                    : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
                                } ${
                                  item.name === t.dashboard
                                    ? "border-l-2 border-l-primary"
                                    : ""
                                }`}
                                onClick={() => setIsSidebarOpen(false)}
                              >
                                <item.icon
                                  className={`h-6 w-6 shrink-0 ${
                                    item.name === t.dashboard
                                      ? "text-primary"
                                      : ""
                                  }`}
                                  aria-hidden="true"
                                />
                                {item.name}
                                {item.name === t.dashboard && (
                                  <span className="ml-auto">
                                    <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-normal">
                                      {isArabic ? "رئيسي" : "Main"}
                                    </span>
                                  </span>
                                )}
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side={isArabic ? "left" : "right"}>
                              <p>{item.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </li>

              <li className="mt-auto">
                <div className="bg-sidebar-accent/50 rounded-lg p-3 border border-sidebar-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-sidebar-foreground truncate">
                        {user.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getUserTypeColor(user.type)} text-white`}
                      >
                        {getUserTypeLabel(user.type)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => setIsArabic(!isArabic)}
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      {t.switchLang}
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${isArabic ? "lg:pr-72" : "lg:pl-72"}`}>
        {/* Top Header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden sm:flex items-center gap-2">
                <Activity className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">
                  {isArabic ? "نشط الآن" : "Online Now"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
              {/* Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-0" align="end">
                  <div className="p-4 border-b space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">
                        {isArabic ? "الإشعارات" : "Notifications"}
                        {unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            {unreadCount}
                          </Badge>
                        )}
                      </h3>
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs hover:bg-primary/10"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {isArabic ? "قراءة الكل" : "Mark all read"}
                        </Button>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs cursor-pointer hover:bg-accent">
                        {isArabic ? "الكل" : "All"}
                      </Badge>
                      <Badge variant="outline" className="text-xs cursor-pointer hover:bg-accent">
                        {isArabic ? "تذكيرات" : "Reminders"}
                      </Badge>
                      <Badge variant="outline" className="text-xs cursor-pointer hover:bg-accent">
                        {isArabic ? "عاجل" : "Urgent"}
                      </Badge>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => {
                        const IconComponent = getNotificationIcon(notification.type);
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 border-b last:border-b-0 hover:bg-accent/50 cursor-pointer transition-all duration-200 ${
                              !notification.isRead ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                            }`}
                            onClick={() => {
                              markAsRead(notification.id);
                              if (notification.actionUrl) {
                                navigate(notification.actionUrl);
                              }
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full ${
                                notification.type === 'urgent' ? 'bg-destructive/10' :
                                notification.type === 'reminder' ? 'bg-warning/10' :
                                notification.type === 'activity' ? 'bg-success/10' :
                                'bg-primary/10'
                              }`}>
                                <IconComponent className={`h-4 w-4 ${getNotificationColor(notification.type)}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <h4 className={`text-sm font-medium leading-tight ${
                                    !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  <div className="flex items-center gap-2 ml-2">
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                    )}
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                      {notification.time}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between mt-3">
                                  {notification.patientName && (
                                    <div className="flex items-center gap-1">
                                      <User className="h-3 w-3 text-muted-foreground" />
                                      <Badge variant="outline" className="text-xs">
                                        {notification.patientName}
                                      </Badge>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1">
                                    {notification.actionUrl && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 text-xs"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(notification.actionUrl!);
                                        }}
                                      >
                                        {isArabic ? "عرض" : "View"}
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-12 text-center text-muted-foreground">
                        <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
                          <Bell className="h-8 w-8 opacity-50" />
                        </div>
                        <h4 className="font-medium mb-2">
                          {isArabic ? "لا توجد إشعارات" : "No notifications"}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {isArabic ? "ستظهر الإشعارات الجديدة هنا" : "New notifications will appear here"}
                        </p>
                      </div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-3 border-t bg-gradient-to-r from-muted/20 to-muted/10">
                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs hover:bg-primary/10"
                          onClick={() => navigate("/notifications")}
                        >
                          <Bell className="h-3 w-3 mr-1" />
                          {isArabic ? "جميع الإشعارات" : "All notifications"}
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {notifications.length} {isArabic ? "إشعار" : "notifications"}
                        </span>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align={isArabic ? "start" : "end"}
                >
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {getUserTypeLabel(user.type)}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCheck className="mr-2 h-4 w-4" />
                    <span>{t.profile}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t.settings}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t.logout}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
