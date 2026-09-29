import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParticleField } from "@/components/ParticleField";

const articleData: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    read: string;
    author: string;
    content: { heading: string; body: string[] }[];
  }
> = {
  "ai-lead-generation-2026": {
    title: "How AI is Rewriting the Rules of Lead Generation in 2026",
    category: "AI Strategy",
    date: "Aug 2026",
    read: "8 min",
    author: "M Izzan",
    content: [
      {
        heading: "The Old Way is Dead",
        body: [
          "For decades, lead generation meant cold calls, purchased lists, and spray-and-pray advertising. You'd spend thousands on ads, hope someone clicked, and then manually chase each lead through a spreadsheet. That world is gone.",
          "In 2026, AI has fundamentally changed how businesses find and capture leads. The companies winning right now aren't spending more — they're spending smarter. They've replaced manual processes with intelligent systems that work 24/7, never get tired, and continuously improve.",
        ],
      },
      {
        heading: "AI-Powered Lead Scoring",
        body: [
          "Not all leads are created equal. Traditional lead scoring relied on gut feeling or simple demographic rules. AI lead scoring analyzes hundreds of behavioral signals in real-time — pages visited, time on site, email opens, form interactions — and predicts which leads are most likely to convert.",
          "This means your sales team talks to the right people at the right time. No more wasting hours on cold leads while hot prospects go cold waiting for a response.",
        ],
      },
      {
        heading: "Conversational AI as a Lead Capture Tool",
        body: [
          "AI chatbots have evolved far beyond clunky rule-based scripts. Modern conversational AI understands intent, answers complex questions, qualifies leads, and books appointments — all without human intervention.",
          "When a visitor lands on your site at 2 AM, your AI assistant greets them, understands their needs, captures their information, and schedules a call. By the time your team logs in the next morning, qualified appointments are already on the calendar.",
        ],
      },
      {
        heading: "Predictive Analytics for Lead Generation",
        body: [
          "AI doesn't just react — it predicts. By analyzing historical data and market trends, predictive analytics can forecast which campaigns will perform best, which audiences will respond, and which channels deserve your budget.",
          "Imagine knowing that leads from a specific LinkedIn campaign have a 73% higher close rate before you even launch it. That's the power of predictive AI.",
        ],
      },
      {
        heading: "Automated Follow-Up Sequences",
        body: [
          "The fortune is in the follow-up — but most businesses follow up once, maybe twice, then give up. AI automation changes this completely. Multi-channel sequences (email, SMS, voicemail drops) are triggered automatically based on lead behavior.",
          "A lead downloads your guide? They get a personalized email sequence. They open but don't click? They get an SMS. They visit your pricing page? Your AI books a call. Every interaction is tracked, scored, and acted upon instantly.",
        ],
      },
      {
        heading: "The Future is Already Here",
        body: [
          "The businesses that adopt AI lead generation now will dominate their markets. Those that wait will spend the next few years wondering why their competitors are growing 5x faster with smaller teams.",
          "At Nova Automate, we build these systems every day. The technology exists. The question is whether you'll be the one using it — or the one competing against it.",
        ],
      },
    ],
  },
  "crm-automation-guide": {
    title: "The Complete Guide to CRM Automation for Scaling Businesses",
    category: "Automation",
    date: "Jul 2026",
    read: "12 min",
    author: "M Izzan",
    content: [
      {
        heading: "Why Most CRMs Fail",
        body: [
          "Here's the uncomfortable truth: most businesses buy a CRM, use it for two weeks, and then it becomes an expensive digital filing cabinet. Leads get entered manually, follow-ups are forgotten, and the data sits there doing nothing.",
          "The problem isn't the CRM. The problem is that it's not automated. A CRM without automation is just a database. A CRM with automation is a growth engine.",
        ],
      },
      {
        heading: "The Foundation: Clean Data Pipelines",
        body: [
          "Before you automate anything, your data needs to flow cleanly. Every lead source — your website, ads, social media, referrals — should feed into your CRM automatically. No manual entry. No spreadsheets. No gaps.",
          "When a lead fills out a form, they should appear in your CRM within seconds, tagged, scored, and routed to the right pipeline stage. This is non-negotiable.",
        ],
      },
      {
        heading: "Pipeline Automation: Moving Leads Automatically",
        body: [
          "A pipeline stage should never require a human to drag a card. When a lead books a call, they move to 'Appointment Set.' When the call happens, they move to 'Qualified.' When they pay, they move to 'Customer.'",
          "This happens through triggers — events that automatically advance leads based on their actions. The result? Your pipeline is always accurate, always current, and never depends on someone remembering to update it.",
        ],
      },
      {
        heading: "Automated Tagging & Segmentation",
        body: [
          "AI takes tagging to another level. Instead of manually categorizing contacts, AI analyzes behavior, purchase history, and engagement patterns to automatically tag and segment your audience.",
          "This means you can send the right message to the right person at the right time — without lifting a finger. A lead interested in CRM automation gets CRM content. A lead interested in ads gets ad content. Personalization at scale.",
        ],
      },
      {
        heading: "Email & SMS Automation Sequences",
        body: [
          "The heart of CRM automation is multi-channel sequencing. A new lead should immediately enter an automated sequence: welcome email, value content, social proof, soft pitch, hard pitch, re-engagement.",
          "But it's not a dumb blast. Smart sequences branch based on behavior. Opened the email? Send the next one. Ignored it? Switch to SMS. Clicked a link? Trigger a call. Every path is automated, personalized, and optimized.",
        ],
      },
      {
        heading: "Appointment Automation",
        body: [
          "Calendar automation is where CRM automation pays for itself. Integrated calendars let leads book themselves based on your real availability. Automated reminders reduce no-shows by 70%. Follow-up sequences trigger after every call.",
          "When a lead books, your CRM automatically creates the contact, schedules the appointment, sends a confirmation email, sends an SMS reminder, creates a follow-up task, and notifies your team. One action, seven automated steps.",
        ],
      },
      {
        heading: "Reporting & Analytics Automation",
        body: [
          "You shouldn't have to build reports manually. Your CRM should automatically track every metric that matters: lead source ROI, pipeline velocity, conversion rates, campaign performance, revenue attribution.",
          "Dashboards update in real-time. Alerts fire when something needs attention. AI highlights anomalies and opportunities you'd never spot manually. Your CRM becomes a strategic advisor, not just a tool.",
        ],
      },
      {
        heading: "Getting Started with CRM Automation",
        body: [
          "Start small. Pick one workflow — new lead follow-up, for example — and automate it completely. Once that's running smoothly, add the next. Within 90 days, you can have a fully automated CRM that works while you sleep.",
          "The businesses that win aren't the ones with the biggest teams. They're the ones with the smartest systems. CRM automation is how you build yours.",
        ],
      },
    ],
  },
  "meta-ads-ai-fix": {
    title: "Why Your Meta Ads Are Bleeding Money (And How AI Fixes It)",
    category: "Paid Ads",
    date: "Jul 2026",
    read: "6 min",
    author: "M Izzan",
    content: [
      {
        heading: "The $10,000 Leak",
        body: [
          "Most businesses running Meta Ads are losing money and don't even know it. They check their dashboard, see clicks and impressions, and assume everything is fine. But beneath the surface, their budget is draining on bad targeting, poor creative, and zero optimization.",
          "The average business wastes 30-40% of their ad spend on audiences that will never convert. That's $3,000-$4,000 out of every $10,000, gone.",
        ],
      },
      {
        heading: "Problem #1: Audience Targeting by Guesswork",
        body: [
          "Most advertisers set up their audiences once and never touch them again. They target 'interests' that seem relevant and hope for the best. AI changes this completely.",
          "AI-powered audience optimization analyzes your existing customers, identifies the patterns that predict conversion, and builds lookalike audiences that are 3-5x more likely to convert. It tests thousands of audience combinations simultaneously and shifts budget to the winners automatically.",
        ],
      },
      {
        heading: "Problem #2: Creative Fatigue",
        body: [
          "Ad fatigue is silent and expensive. Your creative performs well for a week, then slowly dies. Most advertisers don't notice until they've wasted weeks of budget on a dead ad.",
          "AI monitors creative performance in real-time and flags fatigue before it impacts your ROI. It can even generate new creative variations automatically, testing headlines, images, and copy combinations to keep your campaigns fresh.",
        ],
      },
      {
        heading: "Problem #3: No Conversion Tracking",
        body: [
          "If you're not tracking every conversion — form fills, calls, purchases — you're flying blind. Meta's pixel alone isn't enough. You need server-side tracking, offline conversions, and CRM integration to see the full picture.",
          "AI connects your ad platform to your CRM, so every lead's journey is tracked from click to close. You know exactly which ad generated which customer, and how much revenue each campaign produced.",
        ],
      },
      {
        heading: "The AI Fix: Automated Campaign Optimization",
        body: [
          "Here's what AI-powered Meta Ads management looks like: Your system monitors performance 24/7, automatically pauses underperforming ads, reallocates budget to top performers, tests new audiences, generates creative variations, and adjusts bids based on conversion probability.",
          "Instead of checking your ads once a week and making guesses, your AI system optimizes every hour. The result? Lower cost per lead, higher conversion rates, and ad spend that actually generates revenue.",
        ],
      },
      {
        heading: "Stop Bleeding, Start Scaling",
        body: [
          "If you're spending money on Meta Ads without AI optimization, you're donating to Meta. Every day you wait is another day of wasted budget. The fix exists — you just need to implement it.",
          "At Nova Automate, we build AI-powered ad systems that turn ad spend into predictable revenue. Stop guessing. Start growing.",
        ],
      },
    ],
  },
};

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = slug ? articleData[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <ParticleField />
      <main className="relative pt-24 pb-8">
        <div className="container max-w-3xl">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to articles
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-primary">
                <Tag className="h-3.5 w-3.5" /> {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {article.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {article.read} read
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-muted-foreground mb-6">By {article.author}</p>

            <article className="space-y-6">
              {article.content.map((section, i) => (
                <motion.section
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gradient">
                    {section.heading}
                  </h2>
                  {section.body.map((para, j) => (
                    <p
                      key={j}
                      className="text-muted-foreground leading-relaxed mb-4"
                    >
                      {para}
                    </p>
                  ))}
                </motion.section>
              ))}
            </article>

            <div className="mt-8 pt-6 border-t border-border">
              <Link
                to="/audit"
                className="inline-flex items-center gap-2 btn-gradient rounded-full px-6 py-3 text-sm font-semibold transition-all"
              >
                Get your free automation audit{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
