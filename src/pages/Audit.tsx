import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { postTrackingEvent, TRACKING_CONFIG } from "@/lib/tracking";

const goals = [
  "GoHighLevel CRM",
  "Sales Funnel",
  "AI Chatbot",
  "Email & SMS Automation",
  "Lead Generation",
  "Appointment Automation",
  "Other",
];

const AuditPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    phone: "",
    businessName: "",
    websiteUrl: "",
    primaryGoal: "",
    mainGoal: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Calculate form completion percentage (all 7 fields count)
  const filledCount = Object.values(formData).filter(
    (v) => v.trim() !== "",
  ).length;
  const completion = Math.round((filledCount / 7) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Split full name into first/last for CRM standard fields
    const nameParts = formData.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Send to CRM
    const trackingPayload = {
      type: "external_form_submission",
      timestamp: Date.now(),
      formId: "free-automation-audit",
      formData: {
        first_name: firstName,
        last_name: lastName,
        email: formData.businessEmail,
        phone: formData.phone,
        website: formData.websiteUrl,
        organization: formData.businessName,
      },
      formLabels: {
        first_name: "First Name",
        last_name: "Last Name",
        email: "Business Email",
        phone: "Phone / WhatsApp",
        website: "Website URL",
        organization: "Business Name",
      },
      url: window.location.href,
      title: document.title,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      trackingId: TRACKING_CONFIG.trackingId,
      locationId: TRACKING_CONFIG.locationId,
      sessionId: crypto.randomUUID(),
      properties: {
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent)
          ? "mobile"
          : "desktop",
        source: "ai_studio",
        projectId: TRACKING_CONFIG.projectId,
        formName: "Free Automation Audit",
        brand: "Nova Automate",
        companyName: "Nova Automate",
        sourceName: "Nova Automate — Website Audit Form",
      },
    };

    postTrackingEvent(trackingPayload, {
      customFields: {
        LIR4f5TzLvOPpYRcaaDr: {
          value: formData.primaryGoal,
          label: "Primary Goal",
        },
        B9sJ8RacmQRlHYxI09QA: {
          value: formData.mainGoal,
          label: "Main Business Goal",
        },
      },
    });

    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Audit Request Received!",
        description:
          "We'll review your business and reach out within 24 hours.",
      });
      setFormData({
        fullName: "",
        businessEmail: "",
        phone: "",
        businessName: "",
        websiteUrl: "",
        primaryGoal: "",
        mainGoal: "",
      });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 radial-fade" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      {/* Top bar: Logo + Back button — fixed at very top */}
      <div className="relative z-20 sticky top-0 backdrop-blur-xl bg-background/80 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img
              src="https://vibe.filesafe.space/1786109541213169282/attachments/2cfab49b-4394-4ec9-9383-b45aa8ab3b03.jpg"
              alt="Nova Automate Logo"
              className="h-9 w-auto object-contain rounded-lg"
            />
            <span className="font-bold text-lg tracking-tight text-gradient">
              Nova Automate
            </span>
          </a>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="glass-card rounded-full px-4 py-2 text-sm gap-2 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-4 lg:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-sm text-muted-foreground mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Free AI & Automation Audit</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
            Turn Your Business Into an{" "}
            <span className="text-gradient">Automated Growth System</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Your business may be losing leads, wasting time, or missing
            opportunities because of manual processes. We'll identify where
            smart automation can improve your lead generation, follow-ups,
            appointments, and customer journey.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-5 sm:p-6 space-y-3"
            >
              <h2 className="text-xl font-bold mb-0.5">
                Tell Us About Your Business
              </h2>
              <p className="text-sm text-muted-foreground mb-2">
                Fill in your details and we'll prepare your free audit.
              </p>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">
                    Form completion
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    {completion}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full btn-gradient"
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="bg-background/50"
                />
              </div>

              {/* Business Email */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="businessEmail">
                    Business Email <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Input
                  id="businessEmail"
                  type="email"
                  placeholder="Enter your business email"
                  required
                  value={formData.businessEmail}
                  onChange={(e) =>
                    handleChange("businessEmail", e.target.value)
                  }
                  className="bg-background/50"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="phone">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Input
                  id="phone"
                  placeholder="Enter your phone or WhatsApp number"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="bg-background/50"
                />
              </div>

              {/* Business Name */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="businessName">
                    Business Name <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  required
                  value={formData.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  className="bg-background/50"
                />
              </div>

              {/* Website URL */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="websiteUrl">
                    Website URL{" "}
                    <span className="text-xs text-muted-foreground/60">
                      (optional)
                    </span>
                  </Label>
                </div>
                <Input
                  id="websiteUrl"
                  placeholder="https://yourwebsite.com"
                  value={formData.websiteUrl}
                  onChange={(e) => handleChange("websiteUrl", e.target.value)}
                  className="bg-background/50"
                />
              </div>

              {/* Primary Goal Select */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>
                    What can we help you with?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Select
                  value={formData.primaryGoal}
                  onValueChange={(v) => handleChange("primaryGoal", v)}
                  required
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {goals.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Main Goal Textarea */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="mainGoal">
                    What is your main business goal?{" "}
                    <span className="text-xs text-muted-foreground/60">
                      (optional)
                    </span>
                  </Label>
                </div>
                <Textarea
                  id="mainGoal"
                  placeholder="Tell us what you want to achieve"
                  rows={4}
                  value={formData.mainGoal}
                  onChange={(e) => handleChange("mainGoal", e.target.value)}
                  className="bg-background/50 resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full btn-gradient font-semibold text-base"
                size="lg"
              >
                {submitting ? (
                  "Preparing Your Audit..."
                ) : (
                  <>
                    Get My Free Automation Audit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                No pressure. No obligation. Just a clear look at where
                automation can help your business.
              </p>

              <div className="flex items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
                <Lock className="w-3.5 h-3.5 text-primary" />
                <span>Your information is private and secure.</span>
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuditPage;
