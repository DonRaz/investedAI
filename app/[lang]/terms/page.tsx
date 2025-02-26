"use client";

import { useTranslationStore } from "@/lib/translations";
import { commonTranslations } from "@/lib/translations/common";
import { useEffect, useState } from "react";
import { Language } from "@/lib/translations";

export default function TermsPage({
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
        {lang === "en" ? "Terms of Use" : "תנאי שימוש"}
      </h1>
      
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "Disclaimer" : "הצהרה"}
        </h2>
        
        <p className="mb-4">
          {lang === "en" 
            ? "The information provided on this website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site."
            : "המידע המוצג באתר זה הוא למטרות מידע כללי בלבד. כל המידע באתר ניתן בתום לב, אולם אנו לא מספקים כל ייצוג או אחריות מכל סוג, מפורשת או משתמעת, לגבי דיוק, התאמה, תקפות, אמינות, זמינות או שלמות של כל מידע באתר."}
        </p>
        
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "Not Financial Advice" : "לא ייעוץ פיננסי"}
        </h2>
        
        <p className="mb-4">
          {lang === "en"
            ? "The calculators and information on this website are for educational purposes only and do not constitute financial advice. The results provided by our calculators are based on the information you input and assumptions that may not apply to your individual situation."
            : "המחשבונים והמידע באתר זה הם למטרות חינוכיות בלבד ואינם מהווים ייעוץ פיננסי. התוצאות המסופקות על ידי המחשבונים שלנו מבוססות על המידע שהזנת והנחות שעשויות לא להתאים למצב האישי שלך."}
        </p>
        
        <p className="mb-4">
          {lang === "en"
            ? "Before making any financial decisions, we strongly recommend consulting with a qualified financial advisor who can provide personalized advice based on your specific circumstances, goals, and needs."
            : "לפני קבלת החלטות פיננסיות, אנו ממליצים בחום להתייעץ עם יועץ פיננסי מוסמך שיכול לספק ייעוץ מותאם אישית בהתבסס על הנסיבות, המטרות והצרכים הספציפיים שלך."}
        </p>
        
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "No Liability" : "אין אחריות"}
        </h2>
        
        <p className="mb-4">
          {lang === "en"
            ? "In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website and its calculators."
            : "בשום מקרה לא נהיה אחראים לכל אובדן או נזק, כולל ללא הגבלה, אובדן או נזק עקיף או תוצאתי, או כל אובדן או נזק הנובע מאובדן נתונים או רווחים הנובעים מ, או בקשר עם, השימוש באתר זה ובמחשבונים שלו."}
        </p>
        
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "Accuracy of Information" : "דיוק המידע"}
        </h2>
        
        <p className="mb-4">
          {lang === "en"
            ? "While we strive to provide accurate calculations and information, we cannot guarantee that all information displayed on the website is accurate. The calculators use simplified models that may not account for all variables that could affect your financial situation."
            : "למרות שאנו שואפים לספק חישובים ומידע מדויקים, איננו יכולים להבטיח שכל המידע המוצג באתר הוא מדויק. המחשבונים משתמשים במודלים פשוטים שעשויים לא להתחשב בכל המשתנים שעשויים להשפיע על המצב הפיננסי שלך."}
        </p>
        
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "External Links" : "קישורים חיצוניים"}
        </h2>
        
        <p className="mb-4">
          {lang === "en"
            ? "Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with us. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites."
            : "האתר שלנו עשוי להכיל קישורים לאתרים חיצוניים שאינם מסופקים או מתוחזקים על ידינו או בכל דרך מסונפים אלינו. שים לב שאיננו מבטיחים את הדיוק, הרלוונטיות, העדכניות או השלמות של כל מידע באתרים חיצוניים אלה."}
        </p>
        
        <h2 className="text-xl font-semibold mb-4">
          {lang === "en" ? "Changes to Terms" : "שינויים בתנאים"}
        </h2>
        
        <p className="mb-4">
          {lang === "en"
            ? "We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the bottom of this page. It is your responsibility to check our website periodically for changes."
            : "אנו שומרים לעצמנו את הזכות לשנות תנאים אלה בכל עת. אנו נודיע למשתמשים על כל שינוי על ידי עדכון התאריך בתחתית עמוד זה. באחריותך לבדוק את האתר שלנו מעת לעת לשינויים."}
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