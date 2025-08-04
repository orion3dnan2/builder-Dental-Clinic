import React from "react";
import PlaceholderPage from "./PlaceholderPage";

export default function Patients() {
  const features = [
    "عرض قائمة شاملة بجميع المرضى",
    "البحث السريع بالاسم أو الرقم المدني",
    "إضافة مريض جديد مع كامل البيانات",
    "عرض التاريخ الطبي للمريض",
    "تحديث بيانات المريض",
    "إرفاق الصور والوثائق الطبية",
    "إدارة معلومات التأمين الطبي",
    "تتبع حالة المريض والعلاجات",
  ];

  return (
    <PlaceholderPage
      title="إدارة المرضى"
      description="نظام شامل لإدارة ملفات المرضى والتاريخ الطبي"
      features={features}
    />
  );
}
