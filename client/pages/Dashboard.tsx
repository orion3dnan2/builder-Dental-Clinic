import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Mail
} from 'lucide-react';

interface DashboardStats {
  todayAppointments: number;
  totalPatients: number;
  monthlyRevenue: number;
  completedAppointments: number;
  pendingAppointments: number;
  cancelledAppointments: number;
}

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  phone: string;
}

export default function Dashboard() {
  const [isArabic, setIsArabic] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    todayAppointments: 12,
    totalPatients: 847,
    monthlyRevenue: 45600,
    completedAppointments: 8,
    pendingAppointments: 4,
    cancelledAppointments: 0
  });

  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'أحمد محمد العلي',
      time: '09:00',
      type: 'فحص دوري',
      status: 'confirmed',
      phone: '+966501234567'
    },
    {
      id: '2',
      patientName: 'فاطمة أحمد',
      time: '10:30',
      type: 'تنظيف أسنان',
      status: 'completed',
      phone: '+966507654321'
    },
    {
      id: '3',
      patientName: 'محمد عبد��لله',
      time: '11:00',
      type: 'حشو ضرس',
      status: 'pending',
      phone: '+966509876543'
    },
    {
      id: '4',
      patientName: 'نورا سالم',
      time: '14:00',
      type: 'تقويم أسنان',
      status: 'confirmed',
      phone: '+966502345678'
    },
    {
      id: '5',
      patientName: 'خالد أحمد',
      time: '15:30',
      type: 'زراعة أسنان',
      status: 'pending',
      phone: '+966508765432'
    }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const content = {
    ar: {
      welcome: 'مرحباً',
      todayOverview: 'نظرة عامة على اليوم',
      todayAppointments: 'مواعيد اليوم',
      totalPatients: 'إجمالي المرضى',
      monthlyRevenue: 'الإيرادات الشهرية',
      appointmentStatus: 'حالة المواعيد',
      completed: 'مكتملة',
      pending: 'في الانتظار',
      cancelled: 'ملغية',
      confirmed: 'مؤكدة',
      quickActions: 'إجراءات سريعة',
      newAppointment: 'موعد جديد',
      newPatient: 'مريض جديد',
      viewReports: 'عرض التقارير',
      manageSettings: 'إدارة الإعدادات',
      upcomingAppointments: 'المواعيد القادمة',
      viewAll: 'عرض الكل',
      recentActivity: 'النشاطات الأخيرة',
      clinicPerformance: 'أداء العيادة',
      appointmentsToday: 'مواعيد اليوم',
      patientsThisMonth: 'مرضى هذا الشهر',
      revenue: 'الإيرادات',
      sar: 'ريال',
      time: 'الوقت',
      patient: 'المريض',
      type: 'نوع العلاج',
      status: 'الحالة',
      contact: 'التواصل',
      from: 'من',
      growth: 'نمو'
    },
    en: {
      welcome: 'Welcome',
      todayOverview: 'Today\'s Overview',
      todayAppointments: 'Today\'s Appointments',
      totalPatients: 'Total Patients',
      monthlyRevenue: 'Monthly Revenue',
      appointmentStatus: 'Appointment Status',
      completed: 'Completed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      confirmed: 'Confirmed',
      quickActions: 'Quick Actions',
      newAppointment: 'New Appointment',
      newPatient: 'New Patient',
      viewReports: 'View Reports',
      manageSettings: 'Manage Settings',
      upcomingAppointments: 'Upcoming Appointments',
      viewAll: 'View All',
      recentActivity: 'Recent Activity',
      clinicPerformance: 'Clinic Performance',
      appointmentsToday: 'Appointments Today',
      patientsThisMonth: 'Patients This Month',
      revenue: 'Revenue',
      sar: 'SAR',
      time: 'Time',
      patient: 'Patient',
      type: 'Treatment Type',
      status: 'Status',
      contact: 'Contact',
      from: 'from',
      growth: 'growth'
    }
  };

  const t = content[isArabic ? 'ar' : 'en'];

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-success text-success-foreground',
      confirmed: 'bg-primary text-primary-foreground',
      pending: 'bg-warning text-warning-foreground',
      cancelled: 'bg-destructive text-destructive-foreground'
    };
    return colors[status as keyof typeof colors] || 'bg-muted';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: t.completed,
      confirmed: t.confirmed,
      pending: t.pending,
      cancelled: t.cancelled
    };
    return labels[status as keyof typeof labels] || status;
  };

  const completionRate = Math.round((stats.completedAppointments / stats.todayAppointments) * 100);

  return (
    <DashboardLayout>
      <div className={`space-y-6 ${isArabic ? 'rtl' : 'ltr'}`} lang={isArabic ? 'ar' : 'en'}>
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.welcome} {user?.name ? `${isArabic ? 'د.' : 'Dr.'} ${user.name.split(' ')[isArabic ? 1 : 0]}` : ''}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t.todayOverview} • {new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              {t.newAppointment}
            </Button>
          </div>
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
              <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              <div className="flex items-center gap-2 mt-2">
                <Progress value={completionRate} className="flex-1" />
                <span className="text-xs text-muted-foreground">{completionRate}%</span>
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
                <span className="text-success">+12%</span> {t.from} {isArabic ? 'الشهر الماضي' : 'last month'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.monthlyRevenue}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.monthlyRevenue.toLocaleString()} {t.sar}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">+8%</span> {t.from} {isArabic ? 'الشهر الماضي' : 'last month'}
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
                  <span className="font-medium">{stats.completedAppointments}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t.pending}</span>
                  <span className="font-medium">{stats.pendingAppointments}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Today's Appointments */}
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
                          <h4 className="font-medium truncate">{appointment.patientName}</h4>
                          <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
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

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{t.quickActions}</CardTitle>
              <CardDescription>
                {isArabic ? 'إجراءات سريعة للعمليات الشائعة' : 'Quick access to common tasks'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
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
              <Link to="/reports" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  {t.viewReports}
                </Button>
              </Link>
              {user?.type === 'accountant' && (
                <Link to="/accounting" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {isArabic ? 'المحاسبة' : 'Accounting'}
                  </Button>
                </Link>
              )}
              <Link to="/settings" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  {t.manageSettings}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Performance */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                {t.clinicPerformance}
              </CardTitle>
              <CardDescription>
                {isArabic ? 'أداء العيادة هذا الشهر' : 'Clinic performance this month'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t.appointmentsToday}</span>
                  <span className="font-medium">{stats.todayAppointments}</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t.patientsThisMonth}</span>
                  <span className="font-medium">156</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t.revenue}</span>
                  <span className="font-medium">{stats.monthlyRevenue.toLocaleString()} {t.sar}</span>
                </div>
                <Progress value={93} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                {t.recentActivity}
              </CardTitle>
              <CardDescription>
                {isArabic ? 'آخر الأنشطة في النظام' : 'Latest system activities'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: isArabic ? 'تم تسجيل مريض جديد' : 'New patient registered',
                    patient: 'سارة أحمد',
                    time: '10 دقائق',
                    icon: UserCheck,
                    color: 'text-success'
                  },
                  {
                    action: isArabic ? 'تم إكمال موعد' : 'Appointment completed',
                    patient: 'محمد علي',
                    time: '30 دقيقة',
                    icon: Clock,
                    color: 'text-primary'
                  },
                  {
                    action: isArabic ? 'تم إرسال فاتورة' : 'Invoice sent',
                    patient: 'فاطمة سالم',
                    time: '1 ساعة',
                    icon: FileText,
                    color: 'text-warning'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50 transition-medical">
                    <div className={`p-1.5 rounded-full bg-background border`}>
                      <activity.icon className={`h-3 w-3 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.patient} • {activity.time}</p>
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
