import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Construction, ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description: string;
  features?: string[];
}

export default function PlaceholderPage({ title, description, features = [] }: PlaceholderPageProps) {
  const [isArabic, setIsArabic] = useState(true);

  const content = {
    ar: {
      comingSoon: 'قيد التطوير',
      description: 'هذه الصفحة قيد التطوير حالياً',
      backToDashboard: 'العودة للوحة التحكم',
      requestFeature: 'طلب تطوير هذه الصفحة',
      features: 'المميزات المخططة',
      helpText: 'يمكنك طلب تطوير هذه الصفحة بإرسال تفاصيل أكثر حول ما تريده بالضبط.'
    },
    en: {
      comingSoon: 'Coming Soon',
      description: 'This page is currently under development',
      backToDashboard: 'Back to Dashboard',
      requestFeature: 'Request This Feature',
      features: 'Planned Features',
      helpText: 'You can request development of this page by providing more details about what exactly you need.'
    }
  };

  const t = content[isArabic ? 'ar' : 'en'];

  return (
    <DashboardLayout>
      <div className={`max-w-4xl mx-auto space-y-6 ${isArabic ? 'rtl' : 'ltr'}`} lang={isArabic ? 'ar' : 'en'}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.backToDashboard}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-dashed border-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                <Construction className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">{t.comingSoon}</CardTitle>
              <CardDescription>
                {t.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Badge variant="outline" className="mb-4">
                {isArabic ? 'قيد التطوير' : 'Under Development'}
              </Badge>
              <p className="text-sm text-muted-foreground mb-6">
                {t.helpText}
              </p>
              <Button className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                {t.requestFeature}
              </Button>
            </CardContent>
          </Card>

          {features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{t.features}</CardTitle>
                <CardDescription>
                  {isArabic ? 'المميزات التي سيتم إضافتها لهذه الصفحة' : 'Features planned for this page'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Help Section */}
        <Card className="bg-accent/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">
                  {isArabic ? 'تحتاج مساعدة؟' : 'Need Help?'}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {isArabic 
                    ? 'يمكنك طلب تطوير هذه الصفحة أو أي صفحة أخرى بتقديم المزيد من التفاصيل حول متطلباتك.'
                    : 'You can request development of this page or any other page by providing more details about your requirements.'
                  }
                </p>
                <Button variant="outline" size="sm">
                  {isArabic ? 'تواصل معنا' : 'Contact Us'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
