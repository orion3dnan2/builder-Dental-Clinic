import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Calendar,
  DollarSign,
  Activity,
  Clock,
  UserCheck,
  AlertCircle,
  TrendingUp,
  Stethoscope,
  FileText,
  Phone,
  Mail,
  Settings,
  Receipt,
  BarChart3,
} from "lucide-react";

interface DashboardStats {
  todayAppointments: number;
  totalPatients: number;
  waitingPatients: number;
  completedAppointments: number;
  pendingAppointments: number;
  cancelledAppointments: number;
}

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  phone: string;
}

export default function Dashboard() {
  const [isArabic, setIsArabic] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    todayAppointments: 12,
    totalPatients: 847,
    waitingPatients: 3,
    completedAppointments: 8,
    pendingAppointments: 4,
    cancelledAppointments: 0,
  });

  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "أحمد محمد العلي",
      time: "09:00",
      type: "فحص دوري",
      status: "confirmed",
      phone: "+966501234567",
    },
    {
      id: "2",
      patientName: "فاطمة أحمد",
      time: "10:30",
      type: "تنظيف أسنان",
      status: "completed",
      phone: "+966507654321",
    },
    {
      id: "3",
      patientName: "محمد عبدالله",
      time: "11:00",
      type: "حشو ضرس",
      status: "pending",
      phone: "+966509876543",
    },
    {
      id: "4",
      patientName: "نورا سالم",
      time: "14:00",
      type: "تقويم أسنان",
      status: "confirmed",
      phone: "+966502345678",
    },
    {
      id: "5",
      patientName: "خالد أحمد",
      time: "15:30",
      type: "زراعة أسنان",
      status: "pending",
      phone: "+966508765432",
    },
  ]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const content = {
    ar: {
      welcome: "مرحباً",
      todayOverview: "نظرة عامة على اليوم",
      todayAppointments: "مواعيد اليوم",
      totalPatients: "إجمالي المرضى",
      waitingPatients: "مرضى في الانتظار",
      appointmentStatus: "حالة المواعيد",
      completed: "مكتملة",
      pending: "في الانتظار",
      cancelled: "ملغية",
      confirmed: "مؤكدة",
      callsToMake: "اتصالات مطلوبة",
      checkedInToday: "حضور اليوم",
      remindersSent: "تذكيرات مرسلة",
      quickActions: "إجراءات سريعة",
      newAppointment: "موعد جديد",
      newPatient: "مريض ج��يد",
      viewReports: "عرض التقارير",
      manageSettings: "إدارة الإعدادات",
      viewPatients: "عرض المرضى",
      invoices: "الفواتير",
      financialReports: "تقارير مالية",
      viewAppointments: "عرض المواعيد",
      upcomingAppointments: "المواعيد القادمة",
      viewAll: "عرض الكل",
      recentActivity: "النشاطات الأخيرة",
      clinicPerformance: "أداء العيادة",
      financialOverview: "الإحصائيات المالية",
      todayRevenue: "إيرادات اليوم",
      pendingInvoices: "فواتير معلقة",
      netProfit: "صافي الربح",
      viewDetails: "عرض التفاصيل",
      appointmentsToday: "مواعيد اليوم",
      patientsThisMonth: "مرضى هذا الشهر",
      revenue: "الإيرادات",
      sar: "ريال",
      time: "الوقت",
      patient: "المريض",
      type: "نوع العلاج",
      status: "الحالة",
      contact: "التواصل",
      from: "من",
      growth: "نمو",
    },
    en: {
      welcome: "Welcome",
      todayOverview: "Today's Overview",
      todayAppointments: "Today's Appointments",
      totalPatients: "Total Patients",
      waitingPatients: "Waiting Patients",
      appointmentStatus: "Appointment Status",
      completed: "Completed",
      pending: "Pending",
      cancelled: "Cancelled",
      confirmed: "Confirmed",
      callsToMake: "Calls to Make",
      checkedInToday: "Checked In Today",
      remindersSent: "Reminders Sent",
      quickActions: "Quick Actions",
      newAppointment: "New Appointment",
      newPatient: "New Patient",
      viewReports: "View Reports",
      manageSettings: "Manage Settings",
      viewPatients: "View Patients",
      invoices: "Invoices",
      financialReports: "Financial Reports",
      viewAppointments: "View Appointments",
      upcomingAppointments: "Upcoming Appointments",
      viewAll: "View All",
      recentActivity: "Recent Activity",
      clinicPerformance: "Clinic Performance",
      financialOverview: "Financial Overview",
      todayRevenue: "Today's Revenue",
      pendingInvoices: "Pending Invoices",
      netProfit: "Net Profit",
      viewDetails: "View Details",
      appointmentsToday: "Appointments Today",
      patientsThisMonth: "Patients This Month",
      revenue: "Revenue",
      sar: "SAR",
      time: "Time",
      patient: "Patient",
      type: "Treatment Type",
      status: "Status",
      contact: "Contact",
      from: "from",
      growth: "growth",
    },
  };

  const t = content[isArabic ? "ar" : "en"];

  const getStatusColor = (status: string) => {
    const colors = {
      completed: "bg-success text-success-foreground",
      confirmed: "bg-primary text-primary-foreground",
      pending: "bg-warning text-warning-foreground",
      cancelled: "bg-destructive text-destructive-foreground",
    };
    return colors[status as keyof typeof colors] || "bg-muted";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: t.completed,
      confirmed: t.confirmed,
      pending: t.pending,
      cancelled: t.cancelled,
    };
    return labels[status as keyof typeof labels] || status;
  };

  const completionRate = Math.round(
    (stats.completedAppointments / stats.todayAppointments) * 100,
  );

  return (
    <DashboardLayout>
      <div
        className={`space-y-6 ${isArabic ? "rtl" : "ltr"}`}
        lang={isArabic ? "ar" : "en"}
      >
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.welcome}{" "}
              {user
                ? isArabic
                  ? user.nameAr || user.name
                  : user.nameEn || user.name
                : ""}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t.todayOverview} •{" "}
              {new Date().toLocaleDateString(isArabic ? "ar-SA" : "en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          {/* زر موعد جديد - فقط لموظف الاستقبال والمدير */}
          {(user?.type === "receptionist" || user?.type === "admin") && (
            <div className="flex gap-2">
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                {t.newAppointment}
              </Button>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.todayAppointments}
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.todayAppointments}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Progress value={completionRate} className="flex-1" />
                <span className="text-xs text-muted-foreground">
                  {completionRate}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.totalPatients}
              </CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">+12%</span> {t.from}{" "}
                {isArabic ? "الشهر الماضي" : "last month"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.waitingPatients}
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.waitingPatients}
              </div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? "مرضى في انتظار الفحص" : "patients waiting for examination"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.appointmentStatus}
              </CardTitle>
              <Activity className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t.completed}</span>
                  <span className="font-medium">
                    {stats.completedAppointments}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t.pending}</span>
                  <span className="font-medium">
                    {stats.pendingAppointments}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reception-specific Dashboard for current day tasks */}
        {user?.type === "receptionist" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t.confirmed}
                </CardTitle>
                <UserCheck className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9</div>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? "مواعيد مؤكدة اليوم" : "confirmed appointments today"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-warning">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t.callsToMake}
                </CardTitle>
                <Phone className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? "تذكير بالمواعيد غداً" : "reminder calls for tomorrow"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-success">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t.checkedInToday}
                </CardTitle>
                <Activity className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? "مرضى حضروا اليوم" : "patients arrived today"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t.remindersSent}
                </CardTitle>
                <Mail className="h-4 w-4 text-accent-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? "تذكيرات أرسلت اليوم" : "reminders sent today"}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Grid */}
        <div
          className={`grid gap-6 ${user?.type === "receptionist" || user?.type === "doctor" || user?.type === "admin" ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-1 lg:grid-cols-2"}`}
        >
          {/* Waiting List - لموظف الاستقبال فقط */}
          {user?.type === "receptionist" && (
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-warning" />
                    {isArabic ? "قائمة الانتظار" : "Waiting List"}
                  </CardTitle>
                  <CardDescription>
                    {stats.waitingPatients} {isArabic ? "مريض في الانتظار" : "patients waiting"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    {isArabic ? "إشعار التالي" : "Call Next"}
                  </Button>
                  <Button size="sm">
                    <UserCheck className="h-4 w-4 mr-2" />
                    {isArabic ? "تسجيل حضور" : "Check In"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "1", name: "عبدالله محمد", time: "09:15", waitingTime: "15 دقيقة", priority: "normal" },
                    { id: "2", name: "منى أحمد", time: "09:30", waitingTime: "30 دقيقة", priority: "urgent" },
                    { id: "3", name: "سعد الخالدي", time: "10:00", waitingTime: "10 دقائق", priority: "normal" },
                  ].map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-medical"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${patient.priority === "urgent" ? "bg-destructive" : "bg-success"}`}></div>
                        <div>
                          <h4 className="font-medium">{patient.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? "موعد" : "Appointment"} {patient.time} • {isArabic ? "ينتظر" : "waiting"} {patient.waitingTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Today's Appointments - للطبيب والمدير فقط */}
          {(user?.type === "doctor" || user?.type === "admin") && (
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t.upcomingAppointments}</CardTitle>
                  <CardDescription>
                    {stats.todayAppointments} {t.appointmentsToday}
                  </CardDescription>
                </div>
                <Link to="/appointments">
                  <Button variant="outline" size="sm">
                    {t.viewAll}
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.slice(0, 5).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-medical"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium truncate">
                              {appointment.patientName}
                            </h4>
                            <Badge
                              className={`text-xs ${getStatusColor(appointment.status)}`}
                            >
                              {getStatusLabel(appointment.status)}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.time} • {appointment.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* إحصائيات مالية سريعة للمحاسب */}
          {user?.type === "accountant" && (
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-success" />
                    {isArabic ? "الإحصائيات المالية" : "Financial Overview"}
                  </CardTitle>
                  <CardDescription>
                    {isArabic
                      ? "نظرة عامة على الوضع المالي اليوم"
                      : "Today's financial status"}
                  </CardDescription>
                </div>
                <Link to="/accounting">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    {isArabic ? "عرض التفاصيل" : "View Details"}
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-success/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-success/20 p-2 rounded-full">
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <h4 className="font-medium text-success">
                          {isArabic ? "إيرادات اليوم" : "Today's Revenue"}
                        </h4>
                        <p className="text-2xl font-bold text-success">
                          4,850 {isArabic ? "ريال" : "SAR"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-warning/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-warning/20 p-2 rounded-full">
                        <Receipt className="h-4 w-4 text-warning" />
                      </div>
                      <div>
                        <h4 className="font-medium text-warning">
                          {isArabic ? "فواتير معلقة" : "Pending Invoices"}
                        </h4>
                        <p className="text-2xl font-bold text-warning">8</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <BarChart3 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">
                          {isArabic ? "صافي الربح" : "Net Profit"}
                        </h4>
                        <p className="text-2xl font-bold text-primary">
                          80,600 {isArabic ? "ريال" : "SAR"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Call Management - لموظف الاستقبال فقط */}
          {user?.type === "receptionist" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-warning" />
                  {isArabic ? "مكالمات مطلوبة" : "Required Calls"}
                </CardTitle>
                <CardDescription>
                  {isArabic ? "تذكيرات ومتابعات اليوم" : "Today's reminders and follow-ups"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "أحمد سالم", reason: "تذكير بموعد غداً", phone: "+966501234567", priority: "normal" },
                    { name: "فاطمة علي", reason: "تأكيد موعد الأسبوع القادم", phone: "+966507654321", priority: "normal" },
                    { name: "محمد الأحمد", reason: "إلغاء وإعادة جدولة", phone: "+966509876543", priority: "urgent" },
                  ].map((call, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-medical"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${call.priority === "urgent" ? "bg-destructive" : "bg-warning"}`}></div>
                        <div>
                          <h4 className="font-medium text-sm">{call.name}</h4>
                          <p className="text-xs text-muted-foreground">{call.reason}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t">
                  <Button variant="outline" className="w-full" size="sm">
                    {isArabic ? "عرض جميع المكالمات" : "View All Calls"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card
            className={`${user?.type === "accountant" ? "md:col-span-1 lg:col-span-2" : user?.type === "receptionist" ? "" : ""}`}
          >
            <CardHeader>
              <CardTitle>{t.quickActions}</CardTitle>
              <CardDescription>
                {isArabic
                  ? `إجراءات سريعة لـ${
                      user?.type === "admin"
                        ? "مدير النظام"
                        : user?.type === "doctor"
                          ? "الطبيب"
                          : user?.type === "receptionist"
                            ? "موظف الاستقبال"
                            : user?.type === "accountant"
                              ? "المحاسب"
                              : "المستخدم"
                    }`
                  : `Quick access for ${
                      user?.type === "admin"
                        ? "System Admin"
                        : user?.type === "doctor"
                          ? "Doctor"
                          : user?.type === "receptionist"
                            ? "Receptionist"
                            : user?.type === "accountant"
                              ? "Accountant"
                              : "User"
                    } tasks`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* موظف الاستقبال - إجراءات الاستقبال الأساسية */}
              {(user?.type === "receptionist" || user?.type === "admin") && (
                <>
                  <Link to="/appointments/new" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      {t.newAppointment}
                    </Button>
                  </Link>
                  <Link to="/patients/new" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <UserCheck className="h-4 w-4 mr-2" />
                      {t.newPatient}
                    </Button>
                  </Link>
                  <Button className="w-full justify-start" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    {isArabic ? "إجراء مكالمة" : "Make Call"}
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    {isArabic ? "تسجيل حضور مريض" : "Check-in Patient"}
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    {isArabic ? "إرسال تذكير" : "Send Reminder"}
                  </Button>
                </>
              )}

              {/* الطبيب - عرض المرضى والتقارير */}
              {(user?.type === "doctor" || user?.type === "admin") && (
                <>
                  <Link to="/patients" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      {isArabic ? "عرض المرضى" : "View Patients"}
                    </Button>
                  </Link>
                  <Link to="/reports" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      {t.viewReports}
                    </Button>
                  </Link>
                </>
              )}

              {/* المحاسب - المحاسبة والتقارير المالية */}
              {(user?.type === "accountant" || user?.type === "admin") && (
                <>
                  <Link to="/accounting" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {isArabic ? "المحاسبة" : "Accounting"}
                    </Button>
                  </Link>
                  <Link to="/invoices" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Receipt className="h-4 w-4 mr-2" />
                      {isArabic ? "الفواتير" : "Invoices"}
                    </Button>
                  </Link>
                  <Link to="/reports" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      {isArabic ? "تقارير مالية" : "Financial Reports"}
                    </Button>
                  </Link>
                </>
              )}

              {/* مدير النظام - إدارة الإعدادات */}
              {user?.type === "admin" && (
                <Link to="/settings" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    {t.manageSettings}
                  </Button>
                </Link>
              )}

              {/* إجراءات مشتركة للجميع */}
              <Link to="/appointments" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  {isArabic ? "عرض المواعيد" : "View Appointments"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Reception Performance */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                {user?.type === "receptionist" ?
                  (isArabic ? "أداء الاستقبال" : "Reception Performance") :
                  t.clinicPerformance
                }
              </CardTitle>
              <CardDescription>
                {user?.type === "receptionist" ?
                  (isArabic ? "إحصائيات عملك اليوم" : "Your work statistics today") :
                  (isArabic ? "أداء العيادة هذا الشهر" : "Clinic performance this month")
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.type === "receptionist" ? (
                <>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {isArabic ? "مواعيد محجوزة اليوم" : "Appointments booked today"}
                      </span>
                      <span className="font-medium">8</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {isArabic ? "مكالمات مكتملة" : "Calls completed"}
                      </span>
                      <span className="font-medium">12</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {isArabic ? "مرضى مسجلين جدد" : "New patients registered"}
                      </span>
                      <span className="font-medium">3</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {t.appointmentsToday}
                      </span>
                      <span className="font-medium">{stats.todayAppointments}</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {t.patientsThisMonth}
                      </span>
                      <span className="font-medium">156</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {isArabic ? "معدل الحضور" : "Attendance Rate"}
                      </span>
                      <span className="font-medium">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                {t.recentActivity}
              </CardTitle>
              <CardDescription>
                {isArabic
                  ? "آخر الأنشطة في النظام"
                  : "Latest system activities"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(user?.type === "receptionist" ? [
                  {
                    action: isArabic
                      ? "تم تسجيل مريض جديد"
                      : "New patient registered",
                    patient: "سارة أحمد",
                    time: "10 دقائق",
                    icon: UserCheck,
                    color: "text-success",
                  },
                  {
                    action: isArabic
                      ? "تم حجز موعد جديد"
                      : "New appointment booked",
                    patient: "أحمد محمد",
                    time: "25 دقيقة",
                    icon: Calendar,
                    color: "text-primary",
                  },
                  {
                    action: isArabic ? "تم إرسال تذكير" : "Reminder sent",
                    patient: "فاطمة سالم",
                    time: "45 دقيقة",
                    icon: Mail,
                    color: "text-warning",
                  },
                ] : [
                  {
                    action: isArabic
                      ? "تم تسجيل مريض جديد"
                      : "New patient registered",
                    patient: "سارة أحمد",
                    time: "10 دقائق",
                    icon: UserCheck,
                    color: "text-success",
                  },
                  {
                    action: isArabic
                      ? "تم إكمال موعد"
                      : "Appointment completed",
                    patient: "محمد علي",
                    time: "30 دقيقة",
                    icon: Clock,
                    color: "text-primary",
                  },
                  {
                    action: isArabic ? "تم إرسال فاتورة" : "Invoice sent",
                    patient: "فاطمة سالم",
                    time: "1 ساعة",
                    icon: FileText,
                    color: "text-warning",
                  },
                ]).map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50 transition-medical"
                  >
                    <div className={`p-1.5 rounded-full bg-background border`}>
                      <activity.icon className={`h-3 w-3 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.patient} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
