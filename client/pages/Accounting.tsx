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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  Printer,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  Briefcase,
  Wallet,
  Building2,
  Users,
  ShoppingCart,
  Banknote,
  ChevronsUpDown,
  MoreHorizontal,
  RefreshCw,
  Star,
  Bell
} from 'lucide-react';

interface FinancialData {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  pendingPayments: number;
  completedPayments: number;
  monthlyGrowth: number;
  cashFlow: number;
  avgDailyRevenue: number;
  profitMargin: number;
  outstandingInvoices: number;
}

interface Transaction {
  id: string;
  date: string;
  time: string;
  type: 'income' | 'expense';
  category: string;
  subcategory: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: string;
  patientName?: string;
  invoiceNumber?: string;
  notes?: string;
  recurring?: boolean;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  action: () => void;
}

export default function Accounting() {
  const [isArabic, setIsArabic] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

  const [financialData, setFinancialData] = useState<FinancialData>({
    totalRevenue: 125800,
    totalExpenses: 45200,
    netProfit: 80600,
    pendingPayments: 15400,
    completedPayments: 110400,
    monthlyGrowth: 12.5,
    cashFlow: 95200,
    avgDailyRevenue: 4193,
    profitMargin: 64.1,
    outstandingInvoices: 8
  });

  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '14:30',
      type: 'income',
      category: 'علاج',
      subcategory: 'حشو',
      description: 'حشو ضرس علوي - مريض أحمد محمد',
      amount: 450,
      status: 'completed',
      paymentMethod: 'نقد',
      patientName: 'أحمد محمد العلي',
      invoiceNumber: 'INV-2024-001',
      notes: 'دفع كامل فوري'
    },
    {
      id: '2',
      date: '2024-01-15',
      time: '11:15',
      type: 'expense',
      category: 'مواد طبية',
      subcategory: 'مواد حشو',
      description: 'شراء مواد حشو كومبوزيت - دفعة جديدة',
      amount: 1200,
      status: 'completed',
      paymentMethod: 'تحويل بنكي',
      notes: 'فاتورة مورد رئيسي'
    },
    {
      id: '3',
      date: '2024-01-14',
      time: '16:45',
      type: 'income',
      category: 'تنظيف',
      subcategory: 'تنظيف عادي',
      description: 'تنظيف وتلميع أسنان - مريضة فاطمة أحمد',
      amount: 300,
      status: 'pending',
      paymentMethod: 'مؤجل',
      patientName: 'فاطمة أحمد سالم',
      invoiceNumber: 'INV-2024-002',
      notes: 'موعد للدفع الأسبوع القادم'
    },
    {
      id: '4',
      date: '2024-01-14',
      time: '09:30',
      type: 'expense',
      category: 'معدات',
      subcategory: 'صيانة',
      description: 'صيانة دورية لجهاز الأشعة السيني',
      amount: 800,
      status: 'completed',
      paymentMethod: 'شيك',
      notes: 'صيانة شهرية مجدولة'
    },
    {
      id: '5',
      date: '2024-01-13',
      time: '13:20',
      type: 'income',
      category: 'تقويم',
      subcategory: 'تركيب تقويم',
      description: 'تركيب تقويم معدني كامل - مريض خالد سالم',
      amount: 2500,
      status: 'completed',
      paymentMethod: 'تقسيط',
      patientName: 'خالد سالم الأحمد',
      invoiceNumber: 'INV-2024-003',
      notes: 'دفعة أولى من 3 دفعات'
    },
    {
      id: '6',
      date: '2024-01-13',
      time: '10:00',
      type: 'expense',
      category: 'رواتب',
      subcategory: 'راتب شهري',
      description: 'راتب مساعدة طبيب الأسنان - يناير 2024',
      amount: 3500,
      status: 'completed',
      paymentMethod: 'تحويل بنكي',
      notes: 'راتب شهر يناير'
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
      accounting: 'المحاسبة والمالية المتقدمة',
      subtitle: 'نظام محاسبة شامل ومتطور لإدارة مالية احترافية',
      overview: 'نظرة عامة',
      transactions: 'المعاملات المالية',
      reports: 'التقارير والتحليلات',
      invoices: 'إدارة الفواتير',
      cashFlow: 'التدفق النقدي',
      totalRevenue: 'إجمالي الإيرادات',
      totalExpenses: 'إجمالي المصروفات',
      netProfit: 'صافي الربح',
      pendingPayments: 'مدفوعات معلقة',
      monthlyGrowth: 'النمو الشهري',
      avgDailyRevenue: 'متوسط الإيراد اليومي',
      profitMargin: 'هامش الربح',
      outstandingInvoices: 'فواتير مستحقة',
      addTransaction: 'إضافة معاملة جديدة',
      exportData: 'تصدير البيانات',
      generateReport: 'إنشاء تقرير',
      quickActions: 'إجراءات سريعة',
      recentTransactions: 'آخر المعاملات المالية',
      viewAll: 'عرض الكل',
      income: 'إيراد',
      expense: 'مصروف',
      completed: 'مكتمل',
      pending: 'معلق',
      cancelled: 'ملغي',
      cash: 'نقد',
      transfer: 'تحويل',
      check: 'شيك',
      installment: 'تقسيط',
      search: 'بحث في المعاملات...',
      filter: 'تصفية',
      date: 'التاريخ',
      time: 'الوقت',
      category: 'الفئة',
      description: 'الوصف',
      amount: 'المبلغ',
      status: 'الحالة',
      paymentMethod: 'طريقة الدفع',
      actions: 'الإجراءات',
      sar: 'ريال',
      today: 'اليوم',
      week: 'الأسبوع',
      month: 'الشهر',
      year: 'السنة',
      custom: 'مخصص',
      financialHealth: 'الصحة المالية',
      performanceMetrics: 'مؤشرات الأداء',
      profitLossAnalysis: 'تحليل الأرباح والخسائر',
      expenseBreakdown: 'تحليل المصروفات',
      revenueStreams: 'مصادر الإيرادات',
      paymentAnalysis: 'تحليل المدفوعات',
      newInvoice: 'فاتورة جديدة',
      paymentReminder: 'تذكير دفع',
      expenseEntry: 'تسجيل مصروف',
      reconciliation: 'تسوية حسابات',
      budgetPlanning: 'تخطيط الميزانية',
      taxCalculation: 'حساب الضرائب'
    },
    en: {
      accounting: 'Advanced Accounting & Finance',
      subtitle: 'Comprehensive accounting system for professional financial management',
      overview: 'Overview',
      transactions: 'Financial Transactions',
      reports: 'Reports & Analytics',
      invoices: 'Invoice Management',
      cashFlow: 'Cash Flow',
      totalRevenue: 'Total Revenue',
      totalExpenses: 'Total Expenses',
      netProfit: 'Net Profit',
      pendingPayments: 'Pending Payments',
      monthlyGrowth: 'Monthly Growth',
      avgDailyRevenue: 'Avg Daily Revenue',
      profitMargin: 'Profit Margin',
      outstandingInvoices: 'Outstanding Invoices',
      addTransaction: 'Add New Transaction',
      exportData: 'Export Data',
      generateReport: 'Generate Report',
      quickActions: 'Quick Actions',
      recentTransactions: 'Recent Financial Transactions',
      viewAll: 'View All',
      income: 'Income',
      expense: 'Expense',
      completed: 'Completed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      cash: 'Cash',
      transfer: 'Transfer',
      check: 'Check',
      installment: 'Installment',
      search: 'Search transactions...',
      filter: 'Filter',
      date: 'Date',
      time: 'Time',
      category: 'Category',
      description: 'Description',
      amount: 'Amount',
      status: 'Status',
      paymentMethod: 'Payment Method',
      actions: 'Actions',
      sar: 'SAR',
      today: 'Today',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      custom: 'Custom',
      financialHealth: 'Financial Health',
      performanceMetrics: 'Performance Metrics',
      profitLossAnalysis: 'Profit & Loss Analysis',
      expenseBreakdown: 'Expense Breakdown',
      revenueStreams: 'Revenue Streams',
      paymentAnalysis: 'Payment Analysis',
      newInvoice: 'New Invoice',
      paymentReminder: 'Payment Reminder',
      expenseEntry: 'Expense Entry',
      reconciliation: 'Account Reconciliation',
      budgetPlanning: 'Budget Planning',
      taxCalculation: 'Tax Calculation'
    }
  };

  const t = content[isArabic ? 'ar' : 'en'];

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: t.newInvoice,
      description: isArabic ? 'إنشاء فاتورة جديدة للمريض' : 'Create new patient invoice',
      icon: Receipt,
      color: 'bg-blue-500',
      action: () => console.log('New Invoice')
    },
    {
      id: '2',
      title: t.expenseEntry,
      description: isArabic ? 'تسجيل مصروف أو شراء جديد' : 'Record new expense or purchase',
      icon: Wallet,
      color: 'bg-red-500',
      action: () => setIsNewTransactionOpen(true)
    },
    {
      id: '3',
      title: t.paymentReminder,
      description: isArabic ? 'إرسال تذكير للمدفوعات المتأخرة' : 'Send payment reminders',
      icon: Bell,
      color: 'bg-orange-500',
      action: () => console.log('Payment Reminder')
    },
    {
      id: '4',
      title: t.reconciliation,
      description: isArabic ? 'تسوية الحسابات البنكية' : 'Bank account reconciliation',
      icon: CheckCircle,
      color: 'bg-green-500',
      action: () => console.log('Reconciliation')
    }
  ];

  const getTypeColor = (type: string) => {
    return type === 'income' 
      ? 'bg-green-50 text-green-700 border-green-200' 
      : 'bg-red-50 text-red-700 border-red-200';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-50 text-green-700 border-green-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      cancelled: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: t.completed,
      pending: t.pending,
      cancelled: t.cancelled
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${t.sar}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US');
  };

  const getHealthScore = () => {
    const score = (financialData.profitMargin + financialData.monthlyGrowth * 2) / 3;
    return Math.min(Math.max(score, 0), 100);
  };

  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.includes(searchTerm) ||
                         transaction.patientName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className={`space-y-8 ${isArabic ? 'rtl' : 'ltr'}`} lang={isArabic ? 'ar' : 'en'}>
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t.accounting}
                </h1>
                <p className="text-muted-foreground text-lg mt-1">{t.subtitle}</p>
              </div>
            </div>
            
            {/* Financial Health Indicator */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getHealthScore() > 70 ? 'bg-green-500' : getHealthScore() > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">{t.financialHealth}</span>
                <Badge variant="outline" className="font-semibold">
                  {getHealthScore().toFixed(1)}%
                </Badge>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4" />
                <span>{isArabic ? 'آخر تحديث: منذ 5 دقائق' : 'Last updated: 5 minutes ago'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              {isArabic ? 'تحديث' : 'Refresh'}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              {t.exportData}
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600">
              <Plus className="h-4 w-4" />
              {t.addTransaction}
            </Button>
          </div>
        </div>

        {/* Enhanced Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.totalRevenue}</CardTitle>
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatCurrency(financialData.totalRevenue)}
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">+{financialData.monthlyGrowth}%</span>
                <span className="text-sm text-muted-foreground">
                  {isArabic ? 'من الشهر السابق' : 'from last month'}
                </span>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {isArabic ? 'متوسط يومي:' : 'Daily avg:'} {formatCurrency(financialData.avgDailyRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.totalExpenses}</CardTitle>
              <div className="bg-red-100 p-2 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {formatCurrency(financialData.totalExpenses)}
              </div>
              <div className="flex items-center gap-2">
                <ArrowDownRight className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-600 font-medium">+5.2%</span>
                <span className="text-sm text-muted-foreground">
                  {isArabic ? 'من الشهر السابق' : 'from last month'}
                </span>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {isArabic ? 'نسبة من الإيرادات:' : 'Revenue ratio:'} {((financialData.totalExpenses / financialData.totalRevenue) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.netProfit}</CardTitle>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatCurrency(financialData.netProfit)}
              </div>
              <div className="mt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">{t.profitMargin}</span>
                  <span className="text-sm font-medium">{financialData.profitMargin}%</span>
                </div>
                <Progress value={financialData.profitMargin} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.pendingPayments}</CardTitle>
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {formatCurrency(financialData.pendingPayments)}
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-medium">
                  {financialData.outstandingInvoices} {isArabic ? 'فاتورة معلقة' : 'invoices pending'}
                </span>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {isArabic ? 'متوسط عمر الدين:' : 'Avg age:'} {isArabic ? '12 يوم' : '12 days'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              {t.quickActions}
            </CardTitle>
            <CardDescription>
              {isArabic ? 'إجراءات محاسبية سريعة ومهمة للعمل اليومي' : 'Quick accounting actions for daily work'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Card key={action.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200" onClick={action.action}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`${action.color} p-2 rounded-lg text-white`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1">{action.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              {t.overview}
            </TabsTrigger>
            <TabsTrigger value="transactions" className="gap-2">
              <CreditCard className="h-4 w-4" />
              {t.transactions}
            </TabsTrigger>
            <TabsTrigger value="invoices" className="gap-2">
              <Receipt className="h-4 w-4" />
              {t.invoices}
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="h-4 w-4" />
              {t.reports}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Recent Transactions */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      {t.recentTransactions}
                    </CardTitle>
                    <CardDescription>
                      {isArabic ? 'آخر المعاملات المالية المسجلة في النظام' : 'Latest financial transactions in the system'}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('transactions')}>
                    {t.viewAll}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTransactions.slice(0, 6).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/30 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                            {transaction.type === 'income' ? (
                              <ArrowUpRight className={`h-4 w-4 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                            ) : (
                              <ArrowDownRight className={`h-4 w-4 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm truncate">{transaction.description}</h4>
                              <Badge className={`text-xs border ${getStatusColor(transaction.status)}`}>
                                {getStatusLabel(transaction.status)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{transaction.category}</span>
                              <span>•</span>
                              <span>{formatDate(transaction.date)} {transaction.time}</span>
                              <span>•</span>
                              <span>{transaction.paymentMethod}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </div>
                          {transaction.patientName && (
                            <div className="text-xs text-muted-foreground mt-1">{transaction.patientName}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Financial Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    {t.performanceMetrics}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t.cashFlow}</span>
                      <span className="font-bold text-green-600">{formatCurrency(financialData.cashFlow)}</span>
                    </div>
                    <Progress value={75} className="h-3" />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{isArabic ? 'هدف الشهر' : 'Monthly Target'}</span>
                      <span className="font-bold">150,000 {t.sar}</span>
                    </div>
                    <Progress value={83.9} className="h-3" />
                    <div className="text-xs text-muted-foreground text-center">
                      83.9% {isArabic ? 'من الهدف' : 'of target achieved'}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">{isArabic ? 'أهم المؤشرات' : 'Key Indicators'}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{isArabic ? 'معدل النمو' : 'Growth Rate'}</span>
                        <Badge variant="outline" className="text-green-600 border-green-600">+{financialData.monthlyGrowth}%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{isArabic ? 'الكفاءة المالية' : 'Financial Efficiency'}</span>
                        <Badge variant="outline" className="text-blue-600 border-blue-600">94%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{isArabic ? 'سرعة التحصيل' : 'Collection Speed'}</span>
                        <Badge variant="outline" className="text-purple-600 border-purple-600">{isArabic ? '8 أيام' : '8 days'}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  {t.transactions}
                </CardTitle>
                <CardDescription>
                  {isArabic ? 'جميع المعاملات المالية مع إمكانية البحث والتصفية المتقدمة' : 'All financial transactions with advanced search and filtering'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Advanced Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t.search}
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder={t.filter} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{isArabic ? 'جميع الحالات' : 'All Status'}</SelectItem>
                      <SelectItem value="completed">{t.completed}</SelectItem>
                      <SelectItem value="pending">{t.pending}</SelectItem>
                      <SelectItem value="cancelled">{t.cancelled}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    {isArabic ? 'طباعة' : 'Print'}
                  </Button>
                </div>

                {/* Enhanced Transactions Table */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-semibold text-sm">{t.date}</th>
                          <th className="text-left p-4 font-semibold text-sm">{isArabic ? 'النوع' : 'Type'}</th>
                          <th className="text-left p-4 font-semibold text-sm">{t.description}</th>
                          <th className="text-left p-4 font-semibold text-sm">{t.amount}</th>
                          <th className="text-left p-4 font-semibold text-sm">{t.status}</th>
                          <th className="text-left p-4 font-semibold text-sm">{t.paymentMethod}</th>
                          <th className="text-left p-4 font-semibold text-sm">{t.actions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((transaction, index) => (
                          <tr key={transaction.id} className={`border-t hover:bg-accent/30 transition-colors ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                            <td className="p-4">
                              <div className="text-sm">
                                <div className="font-medium">{formatDate(transaction.date)}</div>
                                <div className="text-muted-foreground text-xs">{transaction.time}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className={`border ${getTypeColor(transaction.type)}`}>
                                <div className="flex items-center gap-1">
                                  {transaction.type === 'income' ? (
                                    <ArrowUpRight className="h-3 w-3" />
                                  ) : (
                                    <ArrowDownRight className="h-3 w-3" />
                                  )}
                                  {transaction.type === 'income' ? t.income : t.expense}
                                </div>
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="max-w-xs">
                                <div className="font-medium text-sm truncate">{transaction.description}</div>
                                <div className="text-xs text-muted-foreground">{transaction.category} • {transaction.subcategory}</div>
                                {transaction.patientName && (
                                  <div className="text-xs text-blue-600 mt-1">{transaction.patientName}</div>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className={`border ${getStatusColor(transaction.status)}`}>
                                {getStatusLabel(transaction.status)}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <span className="text-sm">{transaction.paymentMethod}</span>
                            </td>
                            <td className="p-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    {isArabic ? 'عرض التفاصيل' : 'View Details'}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    {isArabic ? 'تعديل' : 'Edit'}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    {isArabic ? 'حذف' : 'Delete'}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {isArabic ? `عرض ${filteredTransactions.length} من أصل ${recentTransactions.length} معاملة` : 
                                `Showing ${filteredTransactions.length} of ${recentTransactions.length} transactions`}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      {isArabic ? 'السابق' : 'Previous'}
                    </Button>
                    <Button variant="outline" size="sm">
                      {isArabic ? 'التالي' : 'Next'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-green-600" />
                  {t.invoices}
                </CardTitle>
                <CardDescription>
                  {isArabic ? 'إدارة متقدمة للفواتير والمدفوعات' : 'Advanced invoice and payment management'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {isArabic ? 'قسم إدارة الفواتير' : 'Invoice Management Section'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {isArabic ? 'سيتم تطوير هذا القسم قريباً لإدارة الفواتير بشكل متقدم' : 'This section will be developed soon for advanced invoice management'}
                  </p>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    {t.newInvoice}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: t.profitLossAnalysis,
                  description: isArabic ? 'تحليل مفصل للأرباح والخسائر' : 'Detailed profit and loss analysis',
                  icon: BarChart3,
                  color: 'bg-blue-500'
                },
                {
                  title: t.expenseBreakdown,
                  description: isArabic ? 'تحليل وتصنيف المصروفات' : 'Expense analysis and categorization',
                  icon: PieChart,
                  color: 'bg-red-500'
                },
                {
                  title: t.revenueStreams,
                  description: isArabic ? 'تحليل مصادر الإيرادات' : 'Revenue source analysis',
                  icon: TrendingUp,
                  color: 'bg-green-500'
                },
                {
                  title: t.paymentAnalysis,
                  description: isArabic ? 'تحليل أنماط الدفع' : 'Payment pattern analysis',
                  icon: CreditCard,
                  color: 'bg-purple-500'
                },
                {
                  title: t.budgetPlanning,
                  description: isArabic ? 'تخطيط وإدارة الميزا��ية' : 'Budget planning and management',
                  icon: Target,
                  color: 'bg-orange-500'
                },
                {
                  title: t.taxCalculation,
                  description: isArabic ? 'حساب الضرائب والزكاة' : 'Tax and VAT calculation',
                  icon: Calculator,
                  color: 'bg-indigo-500'
                }
              ].map((report, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`${report.color} p-3 rounded-lg text-white`}>
                        <report.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{report.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                        <Button size="sm" variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          {t.generateReport}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* New Transaction Dialog */}
        <Dialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t.addTransaction}</DialogTitle>
              <DialogDescription>
                {isArabic ? 'إضافة معاملة مالية جديدة للنظام' : 'Add a new financial transaction to the system'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isArabic ? 'نوع المعاملة' : 'Transaction Type'}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={isArabic ? 'اختر النوع' : 'Select type'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">{t.income}</SelectItem>
                      <SelectItem value="expense">{t.expense}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t.amount}</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
              </div>
              <div>
                <Label>{t.description}</Label>
                <Input placeholder={isArabic ? 'وصف المعاملة' : 'Transaction description'} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.category}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={isArabic ? 'اختر الفئة' : 'Select category'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="treatment">{isArabic ? 'علاج' : 'Treatment'}</SelectItem>
                      <SelectItem value="supplies">{isArabic ? 'مواد طبية' : 'Medical Supplies'}</SelectItem>
                      <SelectItem value="equipment">{isArabic ? 'معدات' : 'Equipment'}</SelectItem>
                      <SelectItem value="salary">{isArabic ? 'رواتب' : 'Salary'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t.paymentMethod}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={isArabic ? 'طريقة الدفع' : 'Payment method'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">{t.cash}</SelectItem>
                      <SelectItem value="transfer">{t.transfer}</SelectItem>
                      <SelectItem value="check">{t.check}</SelectItem>
                      <SelectItem value="installment">{t.installment}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewTransactionOpen(false)}>
                {isArabic ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {isArabic ? 'إضافة المعاملة' : 'Add Transaction'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
