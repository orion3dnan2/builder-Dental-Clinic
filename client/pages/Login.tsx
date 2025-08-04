import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  Activity,
  User,
  Lock,
  Mail,
  Phone,
  Building2,
  Shield,
} from "lucide-react";

interface LoginForm {
  username: string;
  password: string;
  userType: "admin" | "doctor" | "receptionist" | "accountant";
}

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  clinicName: string;
  licenseNumber: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [isArabic, setIsArabic] = useState(true);
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
    userType: "admin",
  });
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    clinicName: "",
    licenseNumber: "",
  });

  // Test users for different roles
  const testUsers = {
    admin: {
      username: "admin",
      password: "123456",
      name: isArabic ? "د. محمد العلي" : "Dr. Mohammed Al-Ali",
      nameEn: "Dr. Mohammed Al-Ali",
      nameAr: "د. محمد العلي",
    },
    doctor: {
      username: "doctor",
      password: "123456",
      name: isArabic ? "د. فاطمة أحمد" : "Dr. Fatima Ahmed",
      nameEn: "Dr. Fatima Ahmed",
      nameAr: "د. فاطمة أحمد",
    },
    receptionist: {
      username: "reception",
      password: "123456",
      name: isArabic ? "سارة محمد" : "Sara Mohammed",
      nameEn: "Sara Mohammed",
      nameAr: "سارة محمد",
    },
    accountant: {
      username: "accountant",
      password: "123456",
      name: isArabic ? "خالد السالم" : "Khalid Al-Salem",
      nameEn: "Khalid Al-Salem",
      nameAr: "خالد السالم",
    },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if credentials match any test user
    const testUser = testUsers[loginForm.userType as keyof typeof testUsers];

    if (
      loginForm.username === testUser.username &&
      loginForm.password === testUser.password
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: testUser.name,
          nameEn: testUser.nameEn,
          nameAr: testUser.nameAr,
          username: testUser.username,
          type: loginForm.userType,
          isAuthenticated: true,
        }),
      );
      navigate("/dashboard");
    } else {
      alert(
        isArabic
          ? "اسم المستخدم أو كلمة المرور غير صحيحة"
          : "Invalid username or password",
      );
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration logic
    if (registerForm.password !== registerForm.confirmPassword) {
      alert(isArabic ? "كلمات المرور غير متطابقة" : "Passwords do not match");
      return;
    }
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: registerForm.name,
        type: "admin",
        isAuthenticated: true,
      }),
    );
    navigate("/dashboard");
  };

  const content = {
    ar: {
      title: "نظام إدارة عيادة الأسنان",
      subtitle: "منصة متكاملة لإدارة العيادات الطبية",
      login: "تسجيل الدخول",
      register: "إنشاء حساب جديد",
      username: "اسم المستخدم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      clinicName: "اسم العيادة",
      licenseNumber: "رقم الترخيص",
      userType: "نوع المستخدم",
      admin: "مدير النظام",
      doctor: "طبيب",
      receptionist: "موظف الاستقبال",
      accountant: "محاسب",
      loginBtn: "دخول",
      registerBtn: "إنشاء حساب",
      switchToEn: "English",
      forgotPassword: "نسيت كلمة المرور؟",
      loginDesc: "أدخل بياناتك للوصول إلى لوحة التحكم",
      registerDesc: "إنشاء حساب جديد لإدارة عيادتك",
      features: {
        title: "مميزات النظام",
        patient: "إدارة المرضى",
        appointments: "حجز المواعيد",
        billing: "الفواتير والمدفوعات",
        reports: "التقارير والإحصائيات",
      },
    },
    en: {
      title: "Dental Clinic Management System",
      subtitle: "Comprehensive platform for medical clinic management",
      login: "Sign In",
      register: "Create New Account",
      username: "Username",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      name: "Full Name",
      phone: "Phone Number",
      clinicName: "Clinic Name",
      licenseNumber: "License Number",
      userType: "User Type",
      admin: "System Admin",
      doctor: "Doctor",
      receptionist: "Receptionist",
      accountant: "Accountant",
      loginBtn: "Sign In",
      registerBtn: "Create Account",
      switchToEn: "العربية",
      forgotPassword: "Forgot Password?",
      loginDesc: "Enter your credentials to access the dashboard",
      registerDesc: "Create a new account to manage your clinic",
      features: {
        title: "System Features",
        patient: "Patient Management",
        appointments: "Appointment Booking",
        billing: "Billing & Payments",
        reports: "Reports & Analytics",
      },
    },
  };

  const t = content[isArabic ? "ar" : "en"];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 flex items-center justify-center p-4 ${isArabic ? "rtl" : "ltr"}`}
      lang={isArabic ? "ar" : "en"}
    >
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary rounded-full p-3">
                <Activity className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {t.title}
                </h1>
                <p className="text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
          </div>

          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                {t.features.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/20">
                <User className="h-5 w-5 text-primary" />
                <span className="font-medium">{t.features.patient}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/20">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-medium">{t.features.appointments}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/20">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">{t.features.billing}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/20">
                <Stethoscope className="h-5 w-5 text-primary" />
                <span className="font-medium">{t.features.reports}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-warning" />
                {isArabic ? "مستخدمين تجريبيين" : "Test Users"}
              </CardTitle>
              <CardDescription>
                {isArabic
                  ? "يمكنك استخدام هذه الحسابات للتجربة"
                  : "You can use these accounts for testing"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 rounded bg-primary/10">
                  <span className="font-medium">
                    {isArabic ? "مدير النظام" : "System Admin"}
                  </span>
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    admin
                  </code>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-success/10">
                  <span className="font-medium">
                    {isArabic ? "طبيب" : "Doctor"}
                  </span>
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    doctor
                  </code>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-warning/10">
                  <span className="font-medium">
                    {isArabic ? "موظف استقبال" : "Receptionist"}
                  </span>
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    reception
                  </code>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-purple-100">
                  <span className="font-medium">
                    {isArabic ? "محاسب" : "Accountant"}
                  </span>
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    accountant
                  </code>
                </div>
                <div className="text-center pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    {isArabic ? "كلمة المرور للجميع: " : "Password for all: "}
                    <code>123456</code>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div className="lg:hidden flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">
                {isArabic ? "عيادة الأسنان" : "Dental Clinic"}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsArabic(!isArabic)}
              className="transition-medical"
            >
              {t.switchToEn}
            </Button>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t.login}</TabsTrigger>
              <TabsTrigger value="register">{t.register}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">
                    {t.login}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {t.loginDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">{t.username}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="username"
                          type="text"
                          placeholder={
                            isArabic ? "أدخل اسم المستخدم" : "Enter username"
                          }
                          className={`${isArabic ? "pr-10" : "pl-10"} focus-medical`}
                          value={loginForm.username}
                          onChange={(e) =>
                            setLoginForm((prev) => ({
                              ...prev,
                              username: e.target.value,
                            }))
                          }
                          required
                        />
                        {/* Auto-fill username when user type changes */}
                        {loginForm.username === "" && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {isArabic ? "مثال: " : "Example: "}
                            {
                              testUsers[
                                loginForm.userType as keyof typeof testUsers
                              ]?.username
                            }
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">{t.password}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="123456"
                          className={`${isArabic ? "pr-10" : "pl-10"} focus-medical`}
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          required
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                          {isArabic
                            ? "كلمة المرور التجريبية: 123456"
                            : "Test password: 123456"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{t.userType}</Label>
                      <div className="flex gap-2 flex-wrap">
                        {[
                          {
                            value: "admin",
                            label: t.admin,
                            color: "bg-primary",
                          },
                          {
                            value: "doctor",
                            label: t.doctor,
                            color: "bg-success",
                          },
                          {
                            value: "receptionist",
                            label: t.receptionist,
                            color: "bg-warning",
                          },
                          {
                            value: "accountant",
                            label: t.accountant,
                            color: "bg-purple-500",
                          },
                        ].map((type) => (
                          <Badge
                            key={type.value}
                            variant={
                              loginForm.userType === type.value
                                ? "default"
                                : "outline"
                            }
                            className={`cursor-pointer transition-medical ${
                              loginForm.userType === type.value
                                ? type.color + " text-white"
                                : "hover:bg-accent"
                            }`}
                            onClick={() => {
                              setLoginForm((prev) => ({
                                ...prev,
                                userType: type.value as any,
                                username:
                                  testUsers[
                                    type.value as keyof typeof testUsers
                                  ]?.username || "",
                                password: "123456",
                              }));
                            }}
                          >
                            {type.label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" className="w-full transition-medical">
                      {t.loginBtn}
                    </Button>

                    <div className="text-center space-y-3">
                      <Link
                        to="#"
                        className="text-sm text-primary hover:underline"
                      >
                        {t.forgotPassword}
                      </Link>

                      <div className="pt-3 border-t">
                        <p className="text-xs text-muted-foreground mb-2">
                          {isArabic ? "تسجيل دخول سريع:" : "Quick Login:"}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(testUsers).map(
                            ([userType, userData]) => (
                              <Button
                                key={userType}
                                type="button"
                                variant="outline"
                                size="sm"
                                className="text-xs h-7"
                                onClick={() => {
                                  setLoginForm({
                                    username: userData.username,
                                    password: "123456",
                                    userType: userType as any,
                                  });
                                  // Auto login after a short delay
                                  setTimeout(() => {
                                    localStorage.setItem(
                                      "user",
                                      JSON.stringify({
                                        name: userData.name,
                                        nameEn: userData.nameEn,
                                        nameAr: userData.nameAr,
                                        username: userData.username,
                                        type: userType,
                                        isAuthenticated: true,
                                      }),
                                    );
                                    navigate("/dashboard");
                                  }, 100);
                                }}
                              >
                                {userType === "admin"
                                  ? isArabic
                                    ? "مدير"
                                    : "Admin"
                                  : userType === "doctor"
                                    ? isArabic
                                      ? "طبيب"
                                      : "Doctor"
                                    : userType === "receptionist"
                                      ? isArabic
                                        ? "استقبال"
                                        : "Reception"
                                      : isArabic
                                        ? "محاسب"
                                        : "Accountant"}
                              </Button>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">
                    {t.register}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {t.registerDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.name}</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            className={`${isArabic ? "pr-10" : "pl-10"} focus-medical`}
                            value={registerForm.name}
                            onChange={(e) =>
                              setRegisterForm((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-email">{t.email}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="reg-email"
                            type="email"
                            className={`${isArabic ? "pr-10" : "pl-10"} focus-medical`}
                            value={registerForm.email}
                            onChange={(e) =>
                              setRegisterForm((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.phone}</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            className={`${isArabic ? "pr-10" : "pl-10"} focus-medical`}
                            value={registerForm.phone}
                            onChange={(e) =>
                              setRegisterForm((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clinicName">{t.clinicName}</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="clinicName"
                            className={`${isArabic ? "pr-10" : "pl-10"} focus-medical`}
                            value={registerForm.clinicName}
                            onChange={(e) =>
                              setRegisterForm((prev) => ({
                                ...prev,
                                clinicName: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">{t.licenseNumber}</Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="licenseNumber"
                          className={`${isArabic ? "pr-10" : "pl-10"} focus-medical`}
                          value={registerForm.licenseNumber}
                          onChange={(e) =>
                            setRegisterForm((prev) => ({
                              ...prev,
                              licenseNumber: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="reg-password">{t.password}</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="reg-password"
                            type="password"
                            className={`${isArabic ? "pr-10" : "pl-10"} focus-medical`}
                            value={registerForm.password}
                            onChange={(e) =>
                              setRegisterForm((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          {t.confirmPassword}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            className={`${isArabic ? "pr-10" : "pl-10"} focus-medical`}
                            value={registerForm.confirmPassword}
                            onChange={(e) =>
                              setRegisterForm((prev) => ({
                                ...prev,
                                confirmPassword: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full transition-medical">
                      {t.registerBtn}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
