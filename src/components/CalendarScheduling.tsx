import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

const CalendarScheduling = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min' });
      cal('ui', {
        cssVarsPerTheme: { light: { 'cal-brand': '#3f196d' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <section id="calendar" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-6">
              Schedule a Consultation
            </h2>
            <p className="text-xl text-muted-foreground font-body leading-relaxed max-w-3xl mx-auto">
              Ready to discuss your private-label leather goods project? Book a
              consultation with our team to explore possibilities and get expert
              guidance.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-card">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-display">
                  Free Consultation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-body">
                  30-minute session to discuss your requirements, timeline, and
                  explore how we can bring your vision to life.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-display">
                  Flexible Timing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-body">
                  Available slots throughout the week to accommodate your
                  schedule across UK, EU, and US time zones.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-display">
                  Expert Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-body">
                  Connect directly with our manufacturing specialists and design
                  consultants for personalized advice.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-luxury bg-gradient-to-br from-background to-muted/30">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center mb-12">
                <h3 className="text-2xl lg:text-3xl font-display font-semibold text-primary mb-6">
                  Book Your Discovery Call
                </h3>
                <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                  Select a convenient time slot from the calendar below to
                  schedule your free 30-minute consultation
                </p>
              </div>

              <div className="flex justify-center">
                <div className="w-full max-w-5xl">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-accent/10">
                    <Cal
                      namespace="30min"
                      calLink="forthandvale/30min"
                      style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'scroll',
                      }}
                      config={{ layout: 'month_view' }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-center mt-12 pt-8 border-t border-accent/10">
                <p className="text-muted-foreground font-body">
                  Having trouble with the calendar?{' '}
                  <a
                    href="mailto:info@forthandvale.com"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Contact us directly
                  </a>
                </p>
                <p className="text-sm text-muted-foreground/70 mt-2">
                  We'll get back to you within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CalendarScheduling;
