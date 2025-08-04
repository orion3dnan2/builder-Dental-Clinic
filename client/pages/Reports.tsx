import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  DollarSign,
  FileText,
  Download,
  Printer,
  Filter,
  RefreshCw,
  Eye,
  Target,
  Activity,
  Clock,
  Star,
  Award,
  AlertTriangle,
} from "lucide-react";

interface ReportData {
  daily: {
    revenue: number;
    patients: number;
    appointments: number;
    completionRate: number;
  };
  monthly: {
    revenue: number;
    growth: number;
    newPatients: number;
    totalAppointments: number;
    averageRevenue: number;
  };
  yearly: {
    revenue: number;
    patients: number;
    growth: number;
    profitMargin: number;
  };
}

interface TreatmentStats {
  name: string;
  count: number;
  revenue: number;
  percentage: number;
}

interface DoctorPerformance {
  name: string;
  appointments: number;
  revenue: number;
  rating: number;
  completionRate: number;
}

export default function Reports() {
  const [isArabic, setIsArabic] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("month");
  const [reportType, setReportType] = useState("financial");

  const [reportData, setReportData] = useState<ReportData>({
    daily: {
      revenue: 4850,
      patients: 18,
      appointments: 22,
      completionRate: 91,
    },
    monthly: {
      revenue: 125800,
      growth: 12.5,
      newPatients: 156,
      totalAppointments: 584,
      averageRevenue: 215,
    },
    yearly: {
      revenue: 1456000,
      patients: 2340,
      growth: 18.3,
      profitMargin: 68,
    },
  });

  const [treatmentStats, setTreatmentStats] = useState<TreatmentStats[]>([
    { name: "تنظيف الأسنان", count: 145, revenue: 43500, percentage: 35 },
    { name: "حشو الأسنان", count: 98, revenue: 44100, percentage: 28 },
    { name: "تقويم الأسنان", count: 32, revenue: 80000, percentage: 22 },
    { name: "زراعة الأسنان", count: 15, revenue: 37500, percentage: 10 },
    { name: "خلع الأسنان", count: 67, revenue: 13400, percentage: 5 },
  ]);

  const [doctorPerformance, setDoctorPerformance] = useState<
    DoctorPerformance[]
  >([
    {
      name: "د. محمد العلي",
      appointments: 156,
      revenue: 62400,
      rating: 4.8,
      completionRate: 94,
    },
    {
      name: "د. فاطمة أحمد",
      appointments: 142,
      revenue: 58200,
      rating: 4.9,
      completionRate: 96,
    },
    {
      name: "د. أحمد سالم",
      appointments: 128,
      revenue: 51200,
      rating: 4.7,
      completionRate: 92,
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
      reports: "التقارير والإحصائيات",
      overview: "نظرة عامة",
      financial: "التقارير المالية",
      patients: "تقارير المرضى",
      doctors: "أداء الأطباء",
      treatments: "إحصائيات العلاجات",
      dailyReport: "التقرير اليومي",
      monthlyReport: "التقرير ال��هري",
      yearlyReport: "التقرير السنوي",
      revenue: "الإيرادات",
      patients: "المرضى",
      appointments: "المواعيد",
      completionRate: "معدل الإنجاز",
      growth: "النمو",
      newPatients: "مرضى جدد",
      averageRevenue: "متوسط الإيراد",
      profitMargin: "هامش الربح",
      generateReport: "إنشاء تقرير",
      exportPDF: "تصدير PDF",
      exportExcel: "تصدير Excel",
      print: "طباعة",
      refresh: "تحديث",
      filter: "تصفية",
      selectPeriod: "اختر الفترة",
      today: "اليوم",
      week: "الأسبوع",
      month: "الشهر",
      year: "السنة",
      custom: "مخصص",
      mostPopularTreatments: "العلاجات الأكثر طلباً",
      doctorPerformance: "أداء الأطباء",
      rating: "التقييم",
      totalAppointments: "إجمالي المواعيد",
      revenueGenerated: "الإيراد المحقق",
      patientSatisfaction: "رضا المرضى",
      clinicEfficiency: "كفاءة العيادة",
      keyMetrics: "المؤشرات الرئيسية",
      performanceInsights: "تحليلات الأداء",
      sar: "ريال",
    },
    en: {
      reports: "Reports & Analytics",
      overview: "Overview",
      financial: "Financial Reports",
      patients: "Patient Reports",
      doctors: "Doctor Performance",
      treatments: "Treatment Statistics",
      dailyReport: "Daily Report",
      monthlyReport: "Monthly Report",
      yearlyReport: "Yearly Report",
      revenue: "Revenue",
      patients: "Patients",
      appointments: "Appointments",
      completionRate: "Completion Rate",
      growth: "Growth",
      newPatients: "New Patients",
      averageRevenue: "Average Revenue",
      profitMargin: "Profit Margin",
      generateReport: "Generate Report",
      exportPDF: "Export PDF",
      exportExcel: "Export Excel",
      print: "Print",
      refresh: "Refresh",
      filter: "Filter",
      selectPeriod: "Select Period",
      today: "Today",
      week: "Week",
      month: "Month",
      year: "Year",
      custom: "Custom",
      mostPopularTreatments: "Most Popular Treatments",
      doctorPerformance: "Doctor Performance",
      rating: "Rating",
      totalAppointments: "Total Appointments",
      revenueGenerated: "Revenue Generated",
      patientSatisfaction: "Patient Satisfaction",
      clinicEfficiency: "Clinic Efficiency",
      keyMetrics: "Key Metrics",
      performanceInsights: "Performance Insights",
      sar: "SAR",
    },
  };

  const t = content[isArabic ? "ar" : "en"];

  const getCurrentData = () => {
    switch (dateRange) {
      case "day":
        return reportData.daily;
      case "month":
        return reportData.monthly;
      case "year":
        return reportData.yearly;
      default:
        return reportData.monthly;
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${t.sar}`;
  };

  return (
    <DashboardLayout>
      <div
        className={`space-y-6 ${isArabic ? "rtl" : "ltr"}`}
        lang={isArabic ? "ar" : "en"}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              {t.reports}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isArabic
                ? "تحليلات شاملة لأداء العيادة والإحصائيات المالية"
                : "Comprehensive clinic performance analytics and financial statistics"}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t.selectPeriod} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">{t.today}</SelectItem>
                <SelectItem value="week">{t.week}</SelectItem>
                <SelectItem value="month">{t.month}</SelectItem>
                <SelectItem value="year">{t.year}</SelectItem>
                <SelectItem value="custom">{t.custom}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t.refresh}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {t.exportPDF}
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              {t.generateReport}
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.revenue}</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {formatCurrency(getCurrentData().revenue)}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-xs text-success">
                  +{reportData.monthly.growth}%
                </span>
                <span className="text-xs text-muted-foreground">
                  {isArabic ? "من الفترة السابقة" : "from previous period"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.patients}
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {dateRange === "day"
                  ? reportData.daily.patients
                  : dateRange === "month"
                    ? reportData.monthly.newPatients
                    : reportData.yearly.patients}
              </div>
              <p className="text-xs text-muted-foreground">
                {dateRange === "day"
                  ? isArabic
                    ? "مرضى اليوم"
                    : "Today's patients"
                  : dateRange === "month"
                    ? isArabic
                      ? "مرضى جدد هذا الشهر"
                      : "New patients this month"
                    : isArabic
                      ? "إجمالي المرضى"
                      : "Total patients"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.appointments}
              </CardTitle>
              <Calendar className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {dateRange === "day"
                  ? reportData.daily.appointments
                  : reportData.monthly.totalAppointments}
              </div>
              <div className="mt-2">
                <Progress
                  value={getCurrentData().completionRate}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {getCurrentData().completionRate}% {t.completionRate}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.averageRevenue}
              </CardTitle>
              <Target className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-foreground">
                {formatCurrency(reportData.monthly.averageRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? "لكل موعد" : "per appointment"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="financial">{t.financial}</TabsTrigger>
            <TabsTrigger value="treatments">{t.treatments}</TabsTrigger>
            <TabsTrigger value="doctors">{t.doctors}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Revenue Chart */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    {isArabic ? "تطور الإيرادات" : "Revenue Trends"}
                  </CardTitle>
                  <CardDescription>
                    {isArabic
                      ? "مقارنة الإيرادات خلال الأشهر الماضية"
                      : "Revenue comparison over past months"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        month: isArabic ? "يناير" : "January",
                        value: 85,
                        amount: 95600,
                      },
                      {
                        month: isArabic ? "فبراير" : "February",
                        value: 92,
                        amount: 108200,
                      },
                      {
                        month: isArabic ? "مارس" : "March",
                        value: 88,
                        amount: 98800,
                      },
                      {
                        month: isArabic ? "أبريل" : "April",
                        value: 95,
                        amount: 125800,
                      },
                    ].map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {data.month}
                          </span>
                          <span className="text-sm font-bold">
                            {formatCurrency(data.amount)}
                          </span>
                        </div>
                        <Progress value={data.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    {t.keyMetrics}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium">
                        {t.patientSatisfaction}
                      </span>
                    </div>
                    <span className="font-bold text-success">4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        {t.clinicEfficiency}
                      </span>
                    </div>
                    <span className="font-bold text-primary">94%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-warning" />
                      <span className="text-sm font-medium">
                        {t.profitMargin}
                      </span>
                    </div>
                    <span className="font-bold text-warning">68%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-success" />
                    {isArabic ? "الإيرادات حسب المصدر" : "Revenue by Source"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        source: isArabic
                          ? "مواعيد عادية"
                          : "Regular Appointments",
                        percentage: 65,
                        amount: 81700,
                      },
                      {
                        source: isArabic ? "حالات طوارئ" : "Emergency Cases",
                        percentage: 20,
                        amount: 25160,
                      },
                      {
                        source: isArabic ? "عمليات خاصة" : "Special Procedures",
                        percentage: 15,
                        amount: 18940,
                      },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {item.source}
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-bold">
                              {formatCurrency(item.amount)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.percentage}%
                            </div>
                          </div>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                    {isArabic ? "المصروفات حسب الفئة" : "Expenses by Category"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        category: isArabic
                          ? "رواتب الموظفين"
                          : "Staff Salaries",
                        percentage: 45,
                        amount: 20250,
                      },
                      {
                        category: isArabic ? "مواد طبية" : "Medical Supplies",
                        percentage: 30,
                        amount: 13500,
                      },
                      {
                        category: isArabic
                          ? "إيجار وخدمات"
                          : "Rent & Utilities",
                        percentage: 15,
                        amount: 6750,
                      },
                      {
                        category: isArabic ? "أخرى" : "Others",
                        percentage: 10,
                        amount: 4500,
                      },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {item.category}
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-bold text-destructive">
                              {formatCurrency(item.amount)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.percentage}%
                            </div>
                          </div>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  {t.mostPopularTreatments}
                </CardTitle>
                <CardDescription>
                  {isArabic
                    ? "العلاجات الأكثر طلباً وإيراداتها"
                    : "Most requested treatments and their revenue"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {treatmentStats.map((treatment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{treatment.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {treatment.count} {isArabic ? "حالة" : "cases"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          {formatCurrency(treatment.revenue)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={treatment.percentage}
                            className="w-20 h-2"
                          />
                          <span className="text-xs text-muted-foreground">
                            {treatment.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {t.doctorPerformance}
                </CardTitle>
                <CardDescription>
                  {isArabic
                    ? "إحصائيات أداء الأطباء والإيرادات"
                    : "Doctor performance statistics and revenue"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctorPerformance.map((doctor, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-success/10 p-2 rounded-full">
                            <Users className="h-4 w-4 text-success" />
                          </div>
                          <div>
                            <h4 className="font-medium">{doctor.name}</h4>
                            <div className="flex items-center gap-2">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-sm text-muted-foreground">
                                {doctor.rating}/5
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            {formatCurrency(doctor.revenue)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {doctor.appointments}{" "}
                            {isArabic ? "موعد" : "appointments"}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {t.completionRate}
                          </span>
                          <span className="text-xs font-medium">
                            {doctor.completionRate}%
                          </span>
                        </div>
                        <Progress
                          value={doctor.completionRate}
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Actions */}
        <Card className="bg-accent/20">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">
                    {isArabic ? "تصدير التقارير" : "Export Reports"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isArabic
                      ? "احفظ التقارير بصيغ مختلفة"
                      : "Save reports in different formats"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  {t.exportExcel}
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  {t.exportPDF}
                </Button>
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  {t.print}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
