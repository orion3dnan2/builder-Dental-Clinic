import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Stethoscope,
  Phone,
  Mail,
  AlertCircle,
  Save,
  ArrowRight,
  ChevronLeft,
  Search,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  nationalId: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  availability: string[];
  image?: string;
}

interface TreatmentType {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
}

export default function NewAppointment() {
  const navigate = useNavigate();
  const [isArabic, setIsArabic] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType | null>(null);
  const [patientSearch, setPatientSearch] = useState("");
  const [notes, setNotes] = useState("");
  const [isNewPatient, setIsNewPatient] = useState(false);

  // Sample data
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "د. أحمد محمد العلي",
      specialization: "طب الأسنان العام",
      availability: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    },
    {
      id: "2",
      name: "د. فاطمة سالم",
      specialization: "تقويم الأسنان",
      availability: ["09:30", "11:00", "13:00", "14:30", "16:00"],
    },
    {
      id: "3",
      name: "د. محمد الأحمد",
      specialization: "جراحة الفم والأسنان",
      availability: ["08:00", "10:00", "13:00", "15:00"],
    },
  ];

  const treatmentTypes: TreatmentType[] = [
    { id: "1", name: "فحص دوري", duration: 30, price: 150, category: "فحص" },
    { id: "2", name: "تنظيف أسنان", duration: 45, price: 200, category: "وقاية" },
    { id: "3", name: "حشو ضرس", duration: 60, price: 300, category: "علاج" },
    { id: "4", name: "تقويم أسنان", duration: 90, price: 500, category: "تقويم" },
    { id: "5", name: "زراعة أسنان", duration: 120, price: 2000, category: "جراحة" },
    { id: "6", name: "تبييض أسنان", duration: 60, price: 800, category: "تجميل" },
  ];

  const patients: Patient[] = [
    {
      id: "1",
      name: "أحمد محمد العلي",
      phone: "+966501234567",
      email: "ahmed@example.com",
      nationalId: "1234567890",
    },
    {
      id: "2",
      name: "فاطمة أحمد سالم",
      phone: "+966507654321",
      email: "fatima@example.com",
      nationalId: "0987654321",
    },
    {
      id: "3",
      name: "محمد عبدالله",
      phone: "+966509876543",
      nationalId: "5678901234",
    },
  ];

  const content = {
    ar: {
      newAppointment: "حجز موعد جديد",
      appointmentBooking: "حجز موعد",
      patientInfo: "بيانات المريض",
      doctorSelection: "اختيار الطبيب",
      dateTimeSelection: "التاريخ والوقت",
      treatmentType: "نوع العلاج",
      appointmentDetails: "تفاصيل الموعد",
      confirmation: "تأكيد الموعد",
      next: "التالي",
      previous: "السابق",
      save: "حفظ",
      cancel: "إلغاء",
      searchPatient: "البحث عن مريض",
      newPatient: "مريض جديد",
      existingPatient: "مريض موجود",
      patientName: "اسم المريض",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      nationalId: "رقم الهوية",
      selectDoctor: "اختر الطبيب",
      selectDate: "اختر التاريخ",
      selectTime: "اختر الوقت",
      selectTreatment: "اختر نوع العلاج",
      duration: "المدة",
      price: "السعر",
      minutes: "دقيقة",
      sar: "ريال",
      notes: "ملاحظات",
      appointmentNotes: "ملاحظات الموعد",
      confirmation_text: "يرجى مراجعة تفاصيل الموعد قبل التأكيد",
      appointment_confirmed: "تم تأكيد الموعد بنجاح",
      specialization: "التخصص",
      available_times: "الأوقات المتاحة",
      step: "خطوة",
      of: "من",
    },
    en: {
      newAppointment: "New Appointment",
      appointmentBooking: "Appointment Booking",
      patientInfo: "Patient Information",
      doctorSelection: "Doctor Selection",
      dateTimeSelection: "Date & Time",
      treatmentType: "Treatment Type",
      appointmentDetails: "Appointment Details",
      confirmation: "Confirmation",
      next: "Next",
      previous: "Previous",
      save: "Save",
      cancel: "Cancel",
      searchPatient: "Search Patient",
      newPatient: "New Patient",
      existingPatient: "Existing Patient",
      patientName: "Patient Name",
      phone: "Phone Number",
      email: "Email",
      nationalId: "National ID",
      selectDoctor: "Select Doctor",
      selectDate: "Select Date",
      selectTime: "Select Time",
      selectTreatment: "Select Treatment Type",
      duration: "Duration",
      price: "Price",
      minutes: "minutes",
      sar: "SAR",
      notes: "Notes",
      appointmentNotes: "Appointment Notes",
      confirmation_text: "Please review appointment details before confirming",
      appointment_confirmed: "Appointment confirmed successfully",
      specialization: "Specialization",
      available_times: "Available Times",
      step: "Step",
      of: "of",
    },
  };

  const t = content[isArabic ? "ar" : "en"];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAppointment = () => {
    // Here you would save the appointment to your backend
    console.log("Saving appointment...", {
      patient: selectedPatient,
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      treatment: selectedTreatment,
      notes,
    });
    
    // Show success message and navigate back
    alert(t.appointment_confirmed);
    navigate("/dashboard");
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    patient.phone.includes(patientSearch) ||
    patient.nationalId.includes(patientSearch)
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              step <= currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {step < currentStep ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              step
            )}
          </div>
          {step < 4 && (
            <div
              className={cn(
                "w-8 h-px mx-2",
                step < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderPatientStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {t.patientInfo}
        </CardTitle>
        <CardDescription>
          {isArabic ? "اختر مريض موجود أو أضف مريض جديد" : "Select existing patient or add new patient"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          <Button
            variant={!isNewPatient ? "default" : "ghost"}
            onClick={() => setIsNewPatient(false)}
            className="flex-1"
            size="sm"
          >
            <User className="h-4 w-4 mr-2" />
            {t.existingPatient}
          </Button>
          <Button
            variant={isNewPatient ? "default" : "ghost"}
            onClick={() => setIsNewPatient(true)}
            className="flex-1"
            size="sm"
          >
            <User className="h-4 w-4 mr-2" />
            {t.newPatient}
          </Button>
        </div>

        {!isNewPatient ? (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.searchPatient}
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={cn(
                      "p-4 border rounded-lg cursor-pointer hover:bg-accent transition-medical",
                      selectedPatient?.id === patient.id && "border-primary bg-accent"
                    )}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{patient.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{patient.phone}</span>
                            <span>•</span>
                            <span>{patient.nationalId}</span>
                          </div>
                        </div>
                      </div>
                      {selectedPatient?.id === patient.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>{isArabic ? "لا توجد نتائج للبحث" : "No patients found"}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patientName">{t.patientName}</Label>
              <Input id="patientName" placeholder={t.patientName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t.phone}</Label>
              <Input id="phone" placeholder="+966xxxxxxxxx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input id="email" type="email" placeholder="example@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationalId">{t.nationalId}</Label>
              <Input id="nationalId" placeholder="1234567890" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderDoctorStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          {t.doctorSelection}
        </CardTitle>
        <CardDescription>
          {isArabic ? "اختر الطبيب المناسب للموعد" : "Select the appropriate doctor for the appointment"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={cn(
                "p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors",
                selectedDoctor?.id === doctor.id && "border-primary bg-accent"
              )}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                {selectedDoctor?.id === doctor.id && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </div>
              <h4 className="font-medium mb-1">{doctor.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{doctor.specialization}</p>
              <div className="flex flex-wrap gap-1">
                {doctor.availability.slice(0, 3).map((time) => (
                  <Badge key={time} variant="outline" className="text-xs">
                    {time}
                  </Badge>
                ))}
                {doctor.availability.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{doctor.availability.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderDateTimeStep = () => (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {t.selectDate}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="appointmentDate">{t.selectDate}</Label>
            <Input
              id="appointmentDate"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t.selectTime}
          </CardTitle>
          <CardDescription>
            {selectedDoctor ? selectedDoctor.name : t.selectDoctor}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDoctor && selectedDate ? (
            <div className="grid gap-2 grid-cols-3">
              {selectedDoctor.availability.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className="h-12"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              {isArabic ? "يرجى اختيار طبيب وتاريخ أولاً" : "Please select doctor and date first"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderTreatmentStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.selectTreatment}</CardTitle>
          <CardDescription>
            {isArabic ? "اختر نوع العلاج المطلوب" : "Select the required treatment type"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {treatmentTypes.map((treatment) => (
              <div
                key={treatment.id}
                className={cn(
                  "p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors",
                  selectedTreatment?.id === treatment.id && "border-primary bg-accent"
                )}
                onClick={() => setSelectedTreatment(treatment)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{treatment.name}</h4>
                  {selectedTreatment?.id === treatment.id && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{treatment.duration} {t.minutes}</span>
                  <span>{treatment.price} {t.sar}</span>
                </div>
                <Badge variant="outline" className="mt-2 text-xs">
                  {treatment.category}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.appointmentNotes}</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={isArabic ? "أضف أي ملاحظات خاصة بالموعد..." : "Add any special notes for the appointment..."}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );

  const renderConfirmationStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          {t.confirmation}
        </CardTitle>
        <CardDescription>{t.confirmation_text}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">{t.patientInfo}</Label>
              <div className="mt-1 p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedPatient?.name || "مريض جديد"}</p>
                <p className="text-sm text-muted-foreground">{selectedPatient?.phone}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">{t.doctorSelection}</Label>
              <div className="mt-1 p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedDoctor?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedDoctor?.specialization}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">{t.dateTimeSelection}</Label>
              <div className="mt-1 p-3 bg-muted rounded-lg">
                <p className="font-medium">
                  {selectedDate?.toLocaleDateString(isArabic ? "ar-SA" : "en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-muted-foreground">{selectedTime}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">{t.treatmentType}</Label>
              <div className="mt-1 p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedTreatment?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedTreatment?.duration} {t.minutes} • {selectedTreatment?.price} {t.sar}
                </p>
              </div>
            </div>
          </div>
        </div>
        {notes && (
          <div>
            <Label className="text-sm font-medium">{t.notes}</Label>
            <div className="mt-1 p-3 bg-muted rounded-lg">
              <p className="text-sm">{notes}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPatientStep();
      case 2:
        return renderDoctorStep();
      case 3:
        return renderDateTimeStep();
      case 4:
        return renderConfirmationStep();
      default:
        return renderPatientStep();
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedPatient || isNewPatient;
      case 2:
        return selectedDoctor;
      case 3:
        return selectedDate && selectedTime && selectedTreatment;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <DashboardLayout>
      <div className={`space-y-6 ${isArabic ? "rtl" : "ltr"}`} lang={isArabic ? "ar" : "en"}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <CalendarIcon className="h-8 w-8 text-primary" />
              {t.newAppointment}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t.step} {currentStep} {t.of} 4
            </p>
          </div>
          <Link to="/dashboard">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              {t.cancel}
            </Button>
          </Link>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Content */}
        <div className="min-h-[500px]">
          {getCurrentStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t.previous}
          </Button>
          
          {currentStep === 4 ? (
            <Button
              onClick={handleSaveAppointment}
              disabled={!canProceedToNext()}
              className="bg-success hover:bg-success/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {t.save}
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              disabled={!canProceedToNext()}
            >
              {t.next}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
