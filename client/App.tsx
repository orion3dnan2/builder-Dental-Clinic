import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Accounting from "./pages/Accounting";
import Reports from "./pages/Reports";
import NewAppointment from "./pages/NewAppointment";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route
            path="/patients/new"
            element={
              <PlaceholderPage
                title="إضافة مريض جديد"
                description="نظام تسجيل مريض جديد في العيادة"
                features={[
                  "بيانات شخصية كاملة",
                  "الرقم المدني أو الإقامة",
                  "بيانات التواصل",
                  "التاريخ الطبي",
                  "بيانات التأمين",
                  "ملاحظات وتنبيهات",
                  "صور ومرفقات",
                  "حفظ وإنشاء ملف",
                ]}
              />
            }
          />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/appointments/new" element={<NewAppointment />} />
          <Route
            path="/appointments"
            element={
              <PlaceholderPage
                title="إدارة المواعيد"
                description="نظام حجز وإدارة مواعيد المرضى"
                features={[
                  "عرض التقويم الشهري والأسبوعي",
                  "حجز موعد جديد للمريض",
                  "تأكيد وإلغاء المواعيد",
                  "إرسال تذكيرات SMS ووتساب",
                  "إدارة أ��قات عمل الأطباء",
                  "تتبع حالة الموعد",
                  "طباعة قوا��م المواعيد",
                  "إحصائيات المواعيد",
                ]}
              />
            }
          />
          <Route
            path="/invoices"
            element={
              <PlaceholderPage
                title="الفواتير والمدفوعات"
                description="نظام إدارة الفواتير والمدفوعات المالية"
                features={[
                  "إنشاء فاتورة جديدة",
                  "تتبع المدفوعات والمتأخرات",
                  "طرق دفع متعددة (نقد، كارت، تحويل)",
                  "طباعة الفواتير والإيصالات",
                  "تقارير مالية تفصيلية",
                  "إدارة خطط التقسيط",
                  "تكامل مع أنظمة المحاسبة",
                  "متابعة التأمينات الطبية",
                ]}
              />
            }
          />
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="إعدادات النظام"
                description="إدارة إعدادات العيادة ��النظام"
                features={[
                  "إعدادات العيادة الأساسية",
                  "إدارة المستخدمين والصلاحيات",
                  "أوقات العمل والإجازات",
                  "إعدادات التذكيرات والإشعارات",
                  "تخصيص الفواتير والوثائق",
                  "نسخ احتياطية للبيانات",
                  "إعدادات الأمان والخصوصية",
                  "تكامل مع الأنظمة الخارجية",
                ]}
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
