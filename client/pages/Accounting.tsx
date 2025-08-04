import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  CreditCard,
  FileText,
  Calculator,
  PieChart,
  BarChart3,
  Calendar,
  Filter,
  Download,
  Print,
  Search,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface FinancialData {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  pendingPayments: number;
  completedPayments: number;
  monthlyGrowth: number;
}

interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  patientName?: string;
  invoiceNumber?: string;
}

export default function Accounting() {
  const [isArabic, setIsArabic] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [financialData, setFinancialData] = useState<FinancialData>({
    totalRevenue: 125800,
    totalExpenses: 45200,
    netProfit: 80600,
    pendingPayments: 15400,
    completedPayments: 110400,
    monthlyGrowth: 12.5
  });

  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-15',
      type: 'income',
      category: 'علاج',
      description: 'حشو ضرس',
      amount: 450,
      status: 'completed',
      patientName: 'أحمد محمد',
      invoiceNumber: 'INV-001'
    },
    {
      id: '2',
      date: '2024-01-15',
      type: 'expense',
      category: 'مواد طبية',
      description: 'شراء مواد حشو',
      amount: 1200,
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-01-14',
      type: 'income',
      category: 'تنظيف',
      description: 'تنظيف وتلميع',
      amount: 300,
      status: 'pending',
      patientName: 'فاطمة أحمد',
      invoiceNumber: 'INV-002'
    },
    {
      id: '4',
      date: '2024-01-14',
      type: 'expense',
      category: 'معدات',
      description: 'صيانة جهاز الأشعة',
      amount: 800,
      status: 'completed'
    },
    {
      id: '5',
      date: '2024-01-13',
      type: 'income',
      category: 'تقويم',
      description: 'تركيب تقويم',
      amount: 2500,
      status: 'completed',
      patientName: 'خالد سالم',
      invoiceNumber: 'INV-003'
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
      accounting: 'المحاسبة والمالية',
      overview: 'نظرة عامة',
      transactions: 'المعاملات المالية',
      reports: 'التقارير المالية',
      totalRevenue: 'إجمالي الإيرادات',
      totalExpenses: 'إجمالي المصروفات',
      netProfit: 'صافي الربح',
      pendingPayments: 'مدفوعات معلقة',
      completedPayments: 'مدفوعات مكتملة',
      monthlyGrowth: 'النمو الشهري',
      recentTransactions: 'المعاملات الأخيرة',
      addTransaction: 'إضافة معاملة',
      viewAll: 'عرض الكل',
      income: 'إيراد',
      expense: 'مصروف',
      completed: 'مكتمل',
      pending: 'معلق',
      cancelled: 'ملغي',
      date: 'التاريخ',
      type: 'النوع',
      category: 'الفئة',
      description: 'الوصف',
      amount: 'المبلغ',
      status: 'الحالة',
      patient: 'المريض',
      invoice: 'الفاتورة',
      actions: 'الإجراءات',
      search: 'بحث',
      filter: 'تصفية',
      export: 'تصدير',
      print: 'طباعة',
      sar: 'ريال',
      generateReport: 'إنشاء تقرير',
      financialSummary: 'الملخص المالي',
      profitLoss: 'الأرباح والخسائر',
      cashFlow: 'التدفق النقدي'
    },
    en: {
      accounting: 'Accounting & Finance',
      overview: 'Overview',
      transactions: 'Transactions',
      reports: 'Financial Reports',
      totalRevenue: 'Total Revenue',
      totalExpenses: 'Total Expenses',
      netProfit: 'Net Profit',
      pendingPayments: 'Pending Payments',
      completedPayments: 'Completed Payments',
      monthlyGrowth: 'Monthly Growth',
      recentTransactions: 'Recent Transactions',
      addTransaction: 'Add Transaction',
      viewAll: 'View All',
      income: 'Income',
      expense: 'Expense',
      completed: 'Completed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      date: 'Date',
      type: 'Type',
      category: 'Category',
      description: 'Description',
      amount: 'Amount',
      status: 'Status',
      patient: 'Patient',
      invoice: 'Invoice',
      actions: 'Actions',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      print: 'Print',
      sar: 'SAR',
      generateReport: 'Generate Report',
      financialSummary: 'Financial Summary',
      profitLoss: 'Profit & Loss',
      cashFlow: 'Cash Flow'
    }
  };

  const t = content[isArabic ? 'ar' : 'en'];

  const getTypeColor = (type: string) => {
    return type === 'income' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-success text-success-foreground',
      pending: 'bg-warning text-warning-foreground',
      cancelled: 'bg-muted text-muted-foreground'
    };
    return colors[status as keyof typeof colors] || 'bg-muted';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: t.completed,
      pending: t.pending,
      cancelled: t.cancelled
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <DashboardLayout>
      <div className={`space-y-6 ${isArabic ? 'rtl' : 'ltr'}`} lang={isArabic ? 'ar' : 'en'}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Calculator className="h-8 w-8 text-primary" />
              {t.accounting}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isArabic ? 'إدارة شاملة للمالية والمحاسبة' : 'Comprehensive financial and accounting management'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {t.export}
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              {t.generateReport}
            </Button>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.totalRevenue}</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {financialData.totalRevenue.toLocaleString()} {t.sar}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">+{financialData.monthlyGrowth}%</span> {isArabic ? 'من الشهر الماضي' : 'from last month'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-destructive">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.totalExpenses}</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {financialData.totalExpenses.toLocaleString()} {t.sar}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-destructive">+5.2%</span> {isArabic ? 'من الشهر الماضي' : 'from last month'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.netProfit}</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {financialData.netProfit.toLocaleString()} {t.sar}
              </div>
              <div className="mt-2">
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">75% {isArabic ? 'من الهدف' : 'of target'}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.pendingPayments}</CardTitle>
              <Receipt className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {financialData.pendingPayments.toLocaleString()} {t.sar}
              </div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? '8 فواتير معلقة' : '8 pending invoices'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="transactions">{t.transactions}</TabsTrigger>
            <TabsTrigger value="reports">{t.reports}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Transactions */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{t.recentTransactions}</CardTitle>
                    <CardDescription>
                      {isArabic ? 'آخر 5 معاملات مالية' : 'Last 5 financial transactions'}
                    </CardDescription>
                  </div>
                  <Link to="/accounting?tab=transactions">
                    <Button variant="outline" size="sm">
                      {t.viewAll}
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTransactions.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-medical"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${getTypeColor(transaction.type)}`}>
                            {transaction.type === 'income' ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium truncate">{transaction.description}</h4>
                              <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                                {getStatusLabel(transaction.status)}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.category} • {new Date(transaction.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${transaction.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                            {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} {t.sar}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Financial Charts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    {t.financialSummary}
                  </CardTitle>
                  <CardDescription>
                    {isArabic ? 'توزيع الإيرادات والمصروفات' : 'Revenue and expense distribution'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t.income}</span>
                        <span className="font-medium text-success">{financialData.totalRevenue.toLocaleString()} {t.sar}</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t.expense}</span>
                        <span className="font-medium text-destructive">{financialData.totalExpenses.toLocaleString()} {t.sar}</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{t.netProfit}</span>
                        <span className="font-bold text-primary">{financialData.netProfit.toLocaleString()} {t.sar}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t.transactions}</CardTitle>
                  <CardDescription>
                    {isArabic ? 'جميع المعاملات المالية للعيادة' : 'All clinic financial transactions'}
                  </CardDescription>
                </div>
                <Button>
                  <Calculator className="h-4 w-4 mr-2" />
                  {t.addTransaction}
                </Button>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={isArabic ? 'البحث في المعاملات...' : 'Search transactions...'}
                        className={`${isArabic ? 'pr-10' : 'pl-10'}`}
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    {t.filter}
                  </Button>
                  <Button variant="outline">
                    <Print className="h-4 w-4 mr-2" />
                    {t.print}
                  </Button>
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">{t.date}</th>
                        <th className="text-left p-2 font-medium">{t.type}</th>
                        <th className="text-left p-2 font-medium">{t.category}</th>
                        <th className="text-left p-2 font-medium">{t.description}</th>
                        <th className="text-left p-2 font-medium">{t.amount}</th>
                        <th className="text-left p-2 font-medium">{t.status}</th>
                        <th className="text-left p-2 font-medium">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-accent/50">
                          <td className="p-2">
                            {new Date(transaction.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                          </td>
                          <td className="p-2">
                            <Badge className={`${getTypeColor(transaction.type)}`}>
                              {transaction.type === 'income' ? t.income : t.expense}
                            </Badge>
                          </td>
                          <td className="p-2">{transaction.category}</td>
                          <td className="p-2">{transaction.description}</td>
                          <td className="p-2">
                            <span className={transaction.type === 'income' ? 'text-success' : 'text-destructive'}>
                              {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} {t.sar}
                            </span>
                          </td>
                          <td className="p-2">
                            <Badge className={`${getStatusColor(transaction.status)}`}>
                              {getStatusLabel(transaction.status)}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="cursor-pointer hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    {t.profitLoss}
                  </CardTitle>
                  <CardDescription>
                    {isArabic ? 'تقرير الأرباح والخسائر الشهري' : 'Monthly profit and loss report'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    {t.generateReport}
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    {t.cashFlow}
                  </CardTitle>
                  <CardDescription>
                    {isArabic ? 'تقرير التدفق النقدي' : 'Cash flow analysis report'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    {t.generateReport}
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-warning" />
                    {isArabic ? 'تقرير الضرائب' : 'Tax Report'}
                  </CardTitle>
                  <CardDescription>
                    {isArabic ? 'تقرير الضرائب والزكاة' : 'Tax and VAT report'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    {t.generateReport}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
