"use client";

import { useTranslationStore } from "@/lib/translations";
import { commonTranslations } from "@/lib/translations/common";
import { useEffect, useState } from "react";
import { Language } from "@/lib/translations";

export default function PrivacyPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const { direction } = useTranslationStore();
  const t = commonTranslations[lang as Language];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto py-12 px-4" dir={direction()}>
      <h1 className="text-3xl font-bold mb-8 text-center">
        {lang === "en" ? "Privacy Policy" : "מדיניות פרטיות"}
      </h1>
      
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "Introduction" : "הקדמה"}
        </h2>
        
        <p className="mb-4">
          {lang === "en" 
            ? "At InvestCalc, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
            : "ב-InvestCalc, אנו מכבדים את פרטיותך ומחויבים להגן על הנתונים האישיים שלך. מדיניות פרטיות זו תיידע אותך כיצד אנו שומרים על הנתונים האישיים שלך כאשר אתה מבקר באתר שלנו ותספר לך על זכויות הפרטיות שלך וכיצד החוק מגן עליך."}
        </p>
        
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "Data We Collect" : "מידע שאנו אוספים"}
        </h2>
        
        <p className="mb-4">
          {lang === "en"
            ? "Our website operates primarily as a calculator tool that processes data locally in your browser. We do not collect, store, or transmit any personal information you enter into our calculators. All calculations are performed client-side, and your data remains on your device."
            : "האתר שלנו פועל בעיקר ככלי מחשבון שמעבד נתונים באופן מקומי בדפדפן שלך. אנו לא אוספים, מאחסנים או מעבירים כל מידע אישי שאתה מזין למחשבונים שלנו. כל החישובים מתבצעים בצד הלקוח, והנתונים שלך נשארים במכשיר שלך."}
        </p>
        
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "Cookies and Analytics" : "עוגיות וניתוח"}
        </h2>
        
        <p className="mb-4">
          {lang === "en"
            ? "We may use cookies to remember your preferences, such as language selection and theme choice. These cookies are essential for the proper functioning of our website and do not contain any personal information."
            : "אנו עשויים להשתמש בעוגיות כדי לזכור את ההעדפות שלך, כגון בחירת שפה ובחירת ערכת נושא. עוגיות אלה חיוניות לתפקוד התקין של האתר שלנו ואינן מכילות מידע אישי כלשהו."}
        </p>
        
        <p className="mb-4">
          {lang === "en"
            ? "We may use analytics tools to collect anonymous information about how users interact with our website. This helps us improve our services and user experience. The analytics data is aggregated and does not identify individual users."
            : "אנו עשויים להשתמש בכלי ניתוח כדי לאסוף מידע אנונימי על האופן שבו משתמשים מתקשרים עם האתר שלנו. זה עוזר לנו לשפר את השירותים שלנו ואת חוויית המשתמש. נתוני הניתוח מצטברים ואינם מזהים משתמשים בודדים."}
        </p>
        
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "Third-Party Services" : "שירותי צד שלישי"}
        </h2>
        
        <p className="mb-4">
          {lang === "en"
            ? "Our website may use third-party services for hosting, analytics, and other functions. These services may collect some standard information such as your IP address, browser type, and the pages you visit. We ensure that any third-party service we use complies with applicable data protection laws."
            : "האתר שלנו עשוי להשתמש בשירותי צד שלישי לאירוח, ניתוח ופונקציות אחרות. שירותים אלה עשויים לאסוף מידע סטנדרטי כגון כתובת ה-IP שלך, סוג הדפדפן והדפים שאתה מבקר בהם. אנו מבטיחים שכל שירות צד שלישי שבו אנו משתמשים עומד בחוקי הגנת הנתונים החלים."}
        </p>
        
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "Your Rights" : "הזכויות שלך"}
        </h2>
        
        <p className="mb-4">
          {lang === "en"
            ? "Under data protection laws, you have rights including the right to access, correct, or delete any personal data we hold about you. Since we do not collect or store personal data through our calculators, these rights primarily apply to any cookies or analytics data that may be collected."
            : "על פי חוקי הגנת הנתונים, יש לך זכויות כולל הזכות לגשת, לתקן או למחוק כל נתון אישי שיש לנו עליך. מכיוון שאיננו אוספים או מאחסנים נתונים אישיים באמצעות המחשבונים שלנו, זכויות אלה חלות בעיקר על עוגיות או נתוני ניתוח שעשויים להיאסף."}
        </p>
        
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "Changes to This Policy" : "שינויים במדיניות זו"}
        </h2>
        
        <p className="mb-4">
          {lang === "en"
            ? "We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the date at the bottom of this page."
            : "אנו עשויים לעדכן את מדיניות הפרטיות שלנו מעת לעת. אנו נודיע לך על כל שינוי על ידי פרסום מדיניות הפרטיות החדשה בדף זה ועדכון התאריך בתחתית דף זה."}
        </p>
        
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "Contact Us" : "צור קשר"}
        </h2>
        
        <p className="mb-4">
          {lang === "en"
            ? "If you have any questions about this privacy policy or our data practices, please contact us through the contact form on our website."
            : "אם יש לך שאלות כלשהן לגבי מדיניות פרטיות זו או נוהלי הנתונים שלנו, אנא צור איתנו קשר באמצעות טופס יצירת הקשר באתר שלנו."}
        </p>
        
        <p className="mt-12 text-sm text-gray-500 text-center">
          {lang === "en"
            ? `Last updated: ${new Date().toLocaleDateString()}`
            : `עודכן לאחרונה: ${new Date().toLocaleDateString()}`}
        </p>
      </div>
    </div>
  );
} 