"use client";

import { useTranslationStore } from "@/lib/translations";
import { commonTranslations } from "@/lib/translations/common";
import { useEffect, useState, useRef } from "react";
import { Language } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Briefcase, Bug, Code, Users, Loader } from "lucide-react";

export default function ContactPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const { direction } = useTranslationStore();
  const t = commonTranslations[lang as Language];
  const [mounted, setMounted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get form data
      const formData = new FormData(e.target as HTMLFormElement);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;
      
      // In a real implementation, you would send this data to your email service
      // For example, using a serverless function or API route
      
      // Simulate sending email (replace with actual email sending logic)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear the form
      if (formRef.current) {
        formRef.current.reset();
      }
      
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4" dir={direction()}>
      <h1 className="text-3xl font-bold mb-8 text-center">
        {lang === "en" ? "Contact Us" : "צור קשר"}
      </h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {lang === "en" ? "Send us a message" : "שלח לנו הודעה"}
          </h2>

          {formSubmitted ? (
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md text-green-800 dark:text-green-100">
              {lang === "en"
                ? "Thank you for your message! We'll get back to you soon."
                : "תודה על פנייתך! נחזור אליך בהקדם."}
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} action={`https://formsubmit.co/${encodeURIComponent("SRaz.Sw@gmail.com")}`} method="POST">
              <input type="hidden" name="_subject" value="New contact from InvestCalc" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1">
                    {lang === "en" ? "Name" : "שם"}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={lang === "en" ? "Your name" : "השם שלך"}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1">
                    {lang === "en" ? "Email" : "אימייל"}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={lang === "en" ? "Your email" : "האימייל שלך"}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-1">
                    {lang === "en" ? "Message" : "הודעה"}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={
                      lang === "en" ? "Your message" : "ההודעה שלך"
                    }
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      {lang === "en" ? "Sending..." : "שולח..."}
                    </>
                  ) : (
                    lang === "en" ? "Send Message" : "שלח הודעה"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>

        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {lang === "en" ? "Get in Touch" : "יצירת קשר"}
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">
                  {lang === "en" ? "Email" : "אימייל"}
                </h3>
                <p className="text-muted-foreground">SRaz.Sw@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">
                  {lang === "en" ? "Location" : "מיקום"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "en"
                    ? "Tel Aviv, Israel"
                    : "תל אביב, ישראל"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <h3 className="font-medium text-lg border-b pb-2 border-muted">
              {lang === "en" ? "How Can I Help You?" : "איך אני יכול לעזור לך?"}
            </h3>
            
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">
                  {lang === "en" ? "Job Opportunities" : "הזדמנויות עבודה"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "en"
                    ? "Currently open to new software development opportunities. Feel free to reach out with positions that match my skills."
                    : "פתוח להזדמנויות חדשות בפיתוח תוכנה. אשמח לשמוע על משרות שמתאימות לכישורים שלי."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Code className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">
                  {lang === "en" ? "Custom Calculator Development" : "פיתוח מחשבונים מותאמים אישית"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "en"
                    ? "Need a custom financial calculator for your business? I offer freelance services to create tailored solutions that match your specific requirements."
                    : "צריכים מחשבון פיננסי מותאם אישית לעסק שלכם? אני מציע שירותי פרילנס ליצירת פתרונות מותאמים שעונים על הדרישות הספציפיות שלכם."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Bug className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">
                  {lang === "en" ? "Bug Reports & Feature Requests" : "דיווח על באגים ובקשות לתכונות"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "en"
                    ? "Found a bug or have a feature request for this project? Contact me via email with details."
                    : "מצאת באג או יש לך בקשה לתכונה חדשה לפרויקט זה? צור איתי קשר באימייל עם פרטים."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">
                  {lang === "en" ? "Collaboration Opportunities" : "הזדמנויות לשיתוף פעולה"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "en"
                    ? "Interested in collaborating on a project? I'm open to discussing potential partnerships and collaborative ventures."
                    : "מעוניינים לשתף פעולה בפרויקט? אני פתוח לדון בשותפויות פוטנציאליות ומיזמים משותפים."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 