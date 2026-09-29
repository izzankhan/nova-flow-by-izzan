import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText, Download, Search } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { toast } from "sonner";

const articles = [
  {
    slug: "ai-lead-generation-2026",
    title: "How AI is Rewriting the Rules of Lead Generation in 2026",
    category: "AI Strategy",
    date: "Aug 2026",
    read: "8 min",
  },
  {
    slug: "crm-automation-guide",
    title: "The Complete Guide to CRM Automation for Scaling Businesses",
    category: "Automation",
    date: "Jul 2026",
    read: "12 min",
  },
  {
    slug: "meta-ads-ai-fix",
    title: "Why Your Meta Ads Are Bleeding Money (And How AI Fixes It)",
    category: "Paid Ads",
    date: "Jul 2026",
    read: "6 min",
  },
];

const resources = [
  {
    icon: FileText,
    title: "AI Automation Playbook",
    desc: "47-page guide to building your first AI growth engine.",
    filename: "AI-Automation-Playbook.txt",
    content: `NOVA AUTOMATE — AI AUTOMATION PLAYBOOK
=====================================

A 47-Page Guide to Building Your First AI Growth Engine

TABLE OF CONTENTS
1. Introduction to AI Marketing Automation
2. Understanding Your Customer Journey
3. Building Your First AI Funnel
4. Lead Capture & Qualification
5. Automated Follow-Up Sequences
6. CRM Setup & Pipeline Management
7. Email Automation Workflows
8. SMS Automation Strategies
9. AI Chatbot Integration
10. Appointment Scheduling Automation
11. Analytics & Performance Tracking
12. Scaling With AI Optimization

CHAPTER 1: INTRODUCTION
AI marketing automation is not about replacing humans — it is about amplifying them.
The businesses that win in 2026 are the ones that respond faster, follow up consistently,
and never let a lead go cold. This playbook walks you through every step.

CHAPTER 2: CUSTOMER JOURNEY
Map every touchpoint from first ad click to closed deal. Identify where leads drop off.
AI can plug those gaps automatically with timely follow-ups and personalized messaging.

CHAPTER 3: BUILDING YOUR FIRST AI FUNNEL
Start with a simple 3-step funnel: Landing page → Opt-in form → Thank you page.
Add automated email sequences. Layer in SMS reminders. Connect your CRM.
Then let AI optimize the copy, timing, and targeting.

CHAPTER 4: LEAD CAPTURE
Use AI-powered forms that qualify leads in real time. Score leads automatically.
Route hot leads to your sales team instantly. Nurture cold leads with automated sequences.

CHAPTER 5: FOLLOW-UP SEQUENCES
The fortune is in the follow-up. 80% of sales require 5+ touchpoints.
Automate your follow-up with personalized email + SMS sequences triggered by behavior.

CHAPTER 6: CRM SETUP
Organize contacts by pipeline stage. Use tags for segmentation.
Set automation triggers for each stage transition. Track deal value and probability.

CHAPTER 7: EMAIL AUTOMATION
Welcome sequences, nurture campaigns, re-engagement flows, and win-back emails.
Use AI to write subject lines, optimize send times, and personalize content.

CHAPTER 8: SMS AUTOMATION
SMS has a 98% open rate. Use it for appointment reminders, flash offers,
and urgent follow-ups. Keep messages short and action-oriented.

CHAPTER 9: AI CHATBOTS
Deploy an AI chatbot on your website to capture leads 24/7.
Qualify visitors, answer FAQs, book appointments, and hand off to humans when needed.

CHAPTER 10: APPOINTMENT AUTOMATION
Let clients book themselves. Send automatic confirmations and reminders.
Reduce no-shows by 40% with automated SMS + email reminders.

CHAPTER 11: ANALYTICS
Track conversion rates at every funnel stage. Monitor cost per lead and cost per acquisition.
Use AI insights to identify bottlenecks and recommend fixes.

CHAPTER 12: SCALING
Once your system works, scale it. Add more traffic sources. Expand your funnels.
Let AI handle optimization while you focus on strategy and growth.

— Nova Automate | AI Marketing Automation Agency
  Contact: niceaz0323@gmail.com | +923231034955
`,
  },
  {
    icon: Download,
    title: "Free CRM Template",
    desc: "Pre-built pipeline template used by our 500+ clients.",
    filename: "Nova-Automate-CRM-Template.csv",
    content: `Contact Name,Email,Phone,Company,Pipeline Stage,Deal Value,Lead Source,Tags,Next Action,Next Action Date,Owner,Status,Notes
John Smith,john@example.com,+1234567890,Smith Corp,New Lead,5000,Website,["hot","enterprise"],Send proposal,2026-08-20,Sales Team,Active,Interested in AI chatbot
Sarah Lee,sarah@techco.com,+1987654321,TechCo,Qualified,12000,Referral,["warm","saas"],Schedule call,2026-08-18,Sales Team,Active,Needs CRM automation
Mike Brown,mike@retail.io,+1555123456,RetailIO,Proposal Sent,8000,Cold Outreach,["retail"],Follow up,2026-08-22,Sales Team,Active,Reviewing proposal
Emma Wilson,emma@fitness.com,+1444555666,FitLife,Negotiation,15000,Webinar,["hot","fitness"],Send contract,2026-08-16,Sales Team,Active,Ready to sign
David Kim,david@legal.com,+1777888999,LegalEase,Closed Won,20000,Referral,["legal","enterprise"],Onboard client,2026-08-25,Onboarding,Won,Signed contract
Lisa Chen,lisa@edu.org,+1222333444,EduPro,Lost,3000,Cold Outreach,["education"],Re-engage in 3 months,2026-11-01,Sales Team,Lost,Budget constraints
Tom Reed,tom@build.com,+16667778888,BuildCo,New Lead,7000,Website,["construction"],Qualify lead,2026-08-19,Sales Team,Active,Filled out form
Amy Patel,amy@health.com,+1555999000,HealthPlus,Qualified,18000,Webinar,["hot","healthcare"],Book demo,2026-08-17,Sales Team,Active,Needs funnel audit
Chris Nova,chris@nova.io,+1111222333,NovaLabs,Proposal Sent,25000,Referral,["enterprise","saas"],Negotiate terms,2026-08-21,Sales Team,Active,Wants custom build
Olivia Park,olivia@fashion.com,+1333444555,FashionHub,New Lead,4000,Website,["ecommerce"],Send catalog,2026-08-23,Sales Team,Active,Ecommerce automation
`,
  },
  {
    icon: Search,
    title: "Funnel Audit Checklist",
    desc: "32-point checklist to find leaks in your funnel.",
    filename: "Funnel-Audit-Checklist.txt",
    content: `NOVA AUTOMATE — FUNNEL AUDIT CHECKLIST
=====================================
32-Point Checklist to Find Leaks in Your Funnel

LANDING PAGE (Points 1-8)
[ ] 1. Headline clearly states the value proposition in under 10 words
[ ] 2. Page loads in under 3 seconds on mobile
[ ] 3. Call-to-action button is above the fold
[ ] 4. Form has 5 or fewer fields
[ ] 5. Mobile layout is fully responsive
[ ] 6. Trust signals (testimonials, logos, ratings) are visible
[ ] 7. Page has a single primary CTA (no competing actions)
[ ] 8. Exit-intent popup or offer is configured

LEAD CAPTURE (Points 9-14)
[ ] 9. Form submission redirects to a thank-you page
[ ] 10. Lead data is captured in CRM automatically
[ ] 11. Lead receives immediate confirmation email
[ ] 12. Lead is tagged and scored automatically
[ ] 13. Hot leads trigger instant notification to sales team
[ ] 14. Duplicate leads are merged automatically

FOLLOW-UP SEQUENCE (Points 15-20)
[ ] 15. Automated email sequence triggers within 5 minutes
[ ] 16. Sequence has at least 5 touchpoints over 14 days
[ ] 17. SMS follow-up is sent within 24 hours
[ ] 18. Follow-up messages are personalized (name, company, source)
[ ] 19. Unsubscribe/opt-out is available in every email
[ ] 20. Non-responders enter a re-engagement campaign

APPOINTMENT BOOKING (Points 21-26)
[ ] 21. Leads can self-book appointments via calendar link
[ ] 22. Booking confirmations are sent automatically
[ ] 23. SMS + email reminders are sent 24h and 1h before
[ ] 24. Rescheduling is self-service
[ ] 25. No-show follow-up sequence is configured
[ ] 26. Booked appointments sync to CRM pipeline

CRM & PIPELINE (Points 27-32)
[ ] 27. Every lead is assigned to a pipeline stage
[ ] 28. Stage transitions trigger automated actions
[ ] 29. Deal values are tracked and updated
[ ] 30. Stale deals (no activity 14+ days) trigger follow-up
[ ] 31. Won/lost deals are analyzed for patterns
[ ] 32. Dashboard shows real-time conversion rates by stage

SCORING YOUR FUNNEL
30-32 Points: Your funnel is well-optimized. Focus on scaling.
25-29 Points: Good foundation. Fix the unchecked items to improve.
20-24 Points: Significant leaks. Prioritize follow-up and CRM automation.
Below 20: Major gaps. Book a strategy call to get a full audit.

— Nova Automate | AI Marketing Automation Agency
  Contact: niceaz0323@gmail.com | +923231034955
`,
  },
];

export const Articles = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Latest Articles"
          title={
            <>
              Insights from the <span className="text-gradient">Frontier</span>
            </>
          }
          description="Deep dives on AI, automation, and growth from our team of experts."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/articles/${a.slug}`)}
              className="group glass-card rounded-3xl p-8 cursor-pointer"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="rounded-full glass px-3 py-1 text-primary">
                  {a.category}
                </span>
                <span>{a.date}</span>
                <span>· {a.read}</span>
              </div>
              <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                {a.title}
              </h3>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                Read article{" "}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Resources = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Resources"
          title={
            <>
              Free Tools to <span className="text-gradient">Get Started</span>
            </>
          }
          description="Download the same frameworks we use with our clients — free."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {resources.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => {
                const blob = new Blob([r.content], {
                  type: "text/plain;charset=utf-8",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = r.filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                toast.success(`Downloading: ${r.title}`);
              }}
              className="glass-card rounded-3xl p-8 group cursor-pointer"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform">
                <r.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                Download free <Download className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
