import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Clock,
  Check,
  Sparkles,
  Video,
  MapPin,
  User,
  Mail,
  Phone,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { postTrackingEvent, TRACKING_CONFIG } from "@/lib/tracking";

// Time slots available for booking
const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

// Generate next 14 days for date selection
const generateDates = () => {
  const dates: {
    day: string;
    date: number;
    month: string;
    full: string;
    isWeekend: boolean;
  }[] = [];
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = dayNames[d.getDay()];
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    dates.push({
      day: dayName,
      date: d.getDate(),
      month: monthNames[d.getMonth()],
      full: d.toISOString().split("T")[0],
      isWeekend,
    });
  }
  return dates;
};

const meetingTypes = [
  {
    id: "video",
    label: "Video Call",
    icon: Video,
    duration: "30 min",
    desc: "Google Meet / Zoom",
  },
  {
    id: "phone",
    label: "Phone Call",
    icon: Phone,
    duration: "30 min",
    desc: "We'll call you",
  },
];

const BookingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dates = generateDates();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState("video");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  const handleInfoChange = (field: string, value: string) => {
    setBookingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    if (!bookingInfo.name || !bookingInfo.email || !bookingInfo.phone) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Split name into first/last for CRM standard fields
    const nameParts = bookingInfo.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Send to CRM
    const trackingPayload = {
      type: "external_form_submission",
      timestamp: Date.now(),
      formId: "strategy-call-booking",
      formData: {
        first_name: firstName,
        last_name: lastName,
        email: bookingInfo.email,
        phone: bookingInfo.phone,
        organization: bookingInfo.company,
      },
      formLabels: {
        first_name: "Full Name",
        last_name: "Last Name",
        email: "Email",
        phone: "Phone",
        organization: "Company",
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
        formName: "Nova Automate Calendar",
        brand: "Nova Automate",
        companyName: "Nova Automate",
        sourceName: "Nova Automate — Strategy Call Booking",
        calendarName: "Nova Automate Calendar",
      },
    };

    postTrackingEvent(trackingPayload, {
      customFields: {
        rSmj8Ss87HNHzl5EOsM0: {
          value: selectedType === "video" ? "Video Call" : "Phone Call",
          label: "Meeting Type",
        },
        QoyabG7tsg7x58C2unSG: { value: selectedDate, label: "Booking Date" },
        DWbUeW2t2WiADkC3prsc: { value: selectedTime, label: "Booking Time" },
      },
    });

    // Save booking to localStorage (local backup)
    const booking = {
      id: Date.now().toString(),
      brand: "Nova Automate",
      name: bookingInfo.name,
      email: bookingInfo.email,
      phone: bookingInfo.phone,
      company: bookingInfo.company,
      type: selectedType,
      date: selectedDate,
      time: selectedTime,
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("nova_bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("nova_bookings", JSON.stringify(existing));
    setConfirmed(true);
    toast({
      title: "Strategy Call Booked!",
      description: `We've scheduled your call for ${selectedDate} at ${selectedTime}. Check your email for details.`,
    });
  };

  const selectedDateObj = dates.find((d) => d.full === selectedDate);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 radial-fade" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      {/* Top bar */}
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
            onClick={() => navigate("/audit")}
            className="glass-card rounded-full px-4 py-2 text-sm gap-2 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-sm text-muted-foreground mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Book Your Free Strategy Call</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1.5">
            Let's Talk About{" "}
            <span className="text-gradient">Your Business</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Book a 30-minute strategy call and let's explore how AI and
            automation can help you save time, capture more leads, and grow.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-5">
          {[
            { n: 1, label: "Meeting Type" },
            { n: 2, label: "Date & Time" },
            { n: 3, label: "Your Details" },
          ].map((s) => (
            <div key={s.n} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s.n
                      ? "btn-gradient text-background"
                      : "glass-card text-muted-foreground"
                  }`}
                >
                  {step > s.n ? <Check className="w-4 h-4" /> : s.n}
                </div>
                <span
                  className={`text-xs sm:text-sm hidden sm:inline ${step >= s.n ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s.label}
                </span>
              </div>
              {s.n < 3 && (
                <div
                  className={`w-8 sm:w-16 h-0.5 rounded ${step > s.n ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Confirmed State */}
        {confirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto glass-card rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full btn-gradient mx-auto flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-background" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Call Booked Successfully!
            </h2>
            <p className="text-muted-foreground mb-4">
              Your strategy call is scheduled for{" "}
              <span className="text-primary font-semibold">
                {selectedDateObj?.day}, {selectedDateObj?.date}{" "}
                {selectedDateObj?.month}
              </span>{" "}
              at{" "}
              <span className="text-primary font-semibold">{selectedTime}</span>
              .
            </p>
            <p className="text-sm text-muted-foreground mb-5">
              We've sent a confirmation email to{" "}
              <span className="text-foreground">{bookingInfo.email}</span> with
              all the details and meeting link.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => navigate("/")}
                className="btn-gradient font-semibold gap-2"
              >
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl p-5 sm:p-6"
            >
              {/* STEP 1: Meeting Type */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold">Choose Meeting Type</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {meetingTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`p-4 rounded-xl text-left transition-all border-2 ${
                            selectedType === type.id
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedType === type.id ? "btn-gradient" : "glass"}`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm">
                                {type.label}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {type.duration}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {type.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={() => setStep(2)}
                      className="btn-gradient font-semibold gap-2"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Date & Time */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    Select Date & Time
                  </h2>

                  {/* Date picker - horizontal scroll */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Choose a date (next 14 days)
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                      {dates.map((d) => (
                        <button
                          key={d.full}
                          onClick={() => setSelectedDate(d.full)}
                          disabled={d.isWeekend}
                          className={`flex-shrink-0 w-16 py-3 rounded-xl text-center transition-all border-2 ${
                            selectedDate === d.full
                              ? "border-primary bg-primary/10"
                              : d.isWeekend
                                ? "border-border/30 opacity-40 cursor-not-allowed"
                                : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="text-xs text-muted-foreground">
                            {d.day}
                          </div>
                          <div className="text-lg font-bold">{d.date}</div>
                          <div className="text-xs text-muted-foreground">
                            {d.month}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        Available times (PKT)
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2.5 rounded-lg text-sm font-medium transition-all border ${
                              selectedTime === time
                                ? "btn-gradient text-background border-primary"
                                : "glass-card border-border hover:border-primary/50"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-between pt-2">
                    <Button
                      variant="ghost"
                      onClick={() => setStep(1)}
                      className="glass-card gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="btn-gradient font-semibold gap-2 disabled:opacity-40"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Your Details */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold">Your Details</h2>

                  {/* Booking Summary */}
                  <div className="glass rounded-xl p-3 space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      <span>
                        {selectedDateObj?.day}, {selectedDateObj?.date}{" "}
                        {selectedDateObj?.month}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{selectedTime} — 30 min</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {selectedType === "video" ? (
                        <Video className="w-4 h-4 text-primary" />
                      ) : (
                        <Phone className="w-4 h-4 text-primary" />
                      )}
                      <span>
                        {selectedType === "video" ? "Video Call" : "Phone Call"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="bk-name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="bk-name"
                          placeholder="Your name"
                          required
                          value={bookingInfo.name}
                          onChange={(e) =>
                            handleInfoChange("name", e.target.value)
                          }
                          className="bg-background/50 pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="bk-email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="bk-email"
                          type="email"
                          placeholder="you@email.com"
                          required
                          value={bookingInfo.email}
                          onChange={(e) =>
                            handleInfoChange("email", e.target.value)
                          }
                          className="bg-background/50 pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="bk-phone">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="bk-phone"
                          placeholder="+92 321 1234567"
                          required
                          value={bookingInfo.phone}
                          onChange={(e) =>
                            handleInfoChange("phone", e.target.value)
                          }
                          className="bg-background/50 pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="bk-company">
                        Company{" "}
                        <span className="text-xs text-muted-foreground/60">
                          (optional)
                        </span>
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="bk-company"
                          placeholder="Your company"
                          value={bookingInfo.company}
                          onChange={(e) =>
                            handleInfoChange("company", e.target.value)
                          }
                          className="bg-background/50 pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>Office: DHA Multan, Pakistan</span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button
                      variant="ghost"
                      onClick={() => setStep(2)}
                      className="glass-card gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      className="btn-gradient font-semibold gap-2"
                    >
                      Confirm Booking
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Trust note */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              No pressure. No obligation. Just a clear look at where automation
              can help your business.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
