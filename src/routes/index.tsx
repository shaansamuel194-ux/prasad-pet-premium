import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import Lenis from "lenis";
import {
  Phone,
  Calendar,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  ArrowUp,
  MessageCircle,
  Stethoscope,
  Syringe,
  Scissors,
  Bug,
  Heart,
  FlaskConical,
  FileText,
  Bird,
  Dog,
  Cat,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Zap,
  Menu,
  X,
  Check,
  ChevronDown,
  Instagram,
  Facebook,
  Send,
} from "lucide-react";

import heroVet from "@/assets/hero-vet.jpg";
import petCat from "@/assets/pet-cat.jpg";
import petDog from "@/assets/pet-dog.jpg";
import petBird from "@/assets/pet-bird.jpg";
import clinicInterior from "@/assets/clinic-interior.jpg";
import galleryTreatment from "@/assets/gallery-treatment.jpg";
import galleryHappy from "@/assets/gallery-happy.jpg";
import galleryGrooming from "@/assets/gallery-grooming.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr Prasad's Pet Clinic — Trusted Veterinary Care in Bengaluru" },
      {
        name: "description",
        content:
          "30+ years of compassionate veterinary care in Doddanekundi, Bengaluru. Book consultation, surgery, vaccinations, grooming, and emergency treatment for every pet.",
      },
      { property: "og:title", content: "Dr Prasad's Pet Clinic — Trusted Veterinary Care in Bengaluru" },
      {
        property: "og:description",
        content: "30+ years of compassionate veterinary care in Doddanekundi, Bengaluru. Book consultation, surgery, vaccinations, grooming, and emergency treatment for every pet.",
      },
    ],
  }),
  component: Home,
});

/* ---------- Data ---------- */

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { icon: Stethoscope, title: "General Consultation", desc: "Thorough checkups tailored to your pet." },
  { icon: Syringe, title: "Vaccinations", desc: "Complete immunisation for lifelong protection." },
  { icon: Heart, title: "Pet Surgery", desc: "Advanced surgical care with gentle recovery." },
  { icon: Zap, title: "Emergency Treatment", desc: "Rapid response when every minute matters." },
  { icon: Scissors, title: "Pet Grooming", desc: "Spa-style grooming for a pampered pet." },
  { icon: Bug, title: "Deworming", desc: "Safe, effective parasite control." },
  { icon: Sparkles, title: "Dental Care", desc: "Cleanings and treatments for healthy smiles." },
  { icon: FlaskConical, title: "Diagnostics & Lab", desc: "In-house laboratory for fast, accurate results." },
  { icon: FileText, title: "Health Certificates", desc: "Travel and residency certifications." },
];

const SPECIES = [
  { icon: Dog, label: "Dog Care" },
  { icon: Cat, label: "Cat Care" },
  { icon: Bird, label: "Bird Care" },
  { icon: Heart, label: "Cow Care" },
  { icon: Heart, label: "Goat Care" },
  { icon: Heart, label: "Sheep Care" },
];

const FEATURES = [
  { icon: Award, title: "30+ Years Experience", desc: "Three decades of trusted veterinary practice." },
  { icon: ShieldCheck, title: "Advanced Equipment", desc: "Modern diagnostics for precise care." },
  { icon: Users, title: "Trusted by Thousands", desc: "223+ five-star Google reviews." },
  { icon: Heart, title: "Gentle Treatment", desc: "Fear-free, compassionate handling." },
  { icon: Zap, title: "Emergency Care", desc: "Ready when you need us most." },
  { icon: Sparkles, title: "Affordable Pricing", desc: "Premium care that stays within reach." },
];

const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    pet: "with Luna, Golden Retriever",
    review:
      "Dr Prasad is beyond gentle with Luna. Every visit feels calm and reassuring — you can tell they truly love animals.",
    rating: 5,
    avatar: "AS",
  },
  {
    name: "Rahul Menon",
    pet: "with Mishti, Persian Cat",
    review:
      "The clinic is spotless, the staff is warm, and the diagnostics are spot on. Best vet in Bengaluru, hands down.",
    rating: 5,
    avatar: "RM",
  },
  {
    name: "Priya Iyer",
    pet: "with Coco, Beagle",
    review:
      "Emergency at midnight and they picked up instantly. Dr Prasad saved Coco's life. Forever grateful.",
    rating: 5,
    avatar: "PI",
  },
  {
    name: "Vikram Rao",
    pet: "with Buddy, Labrador",
    review:
      "Thirty years of experience shows. Honest advice, fair pricing, and Buddy actually enjoys going. Highly recommend.",
    rating: 5,
    avatar: "VR",
  },
  {
    name: "Sneha Kapoor",
    pet: "with Milo, Indie",
    review:
      "From vaccinations to grooming — everything under one roof, done with real care. Milo is thriving.",
    rating: 5,
    avatar: "SK",
  },
];

const GALLERY: { src: string; alt: string; span: string }[] = [
  { src: heroVet, alt: "Doctor holding puppy", span: "md:col-span-2 md:row-span-2" },
  { src: petCat, alt: "Persian cat", span: "" },
  { src: galleryTreatment, alt: "Puppy examination", span: "" },
  { src: clinicInterior, alt: "Clinic interior", span: "md:col-span-2" },
  { src: petBird, alt: "Colourful parrot", span: "" },
  { src: galleryHappy, alt: "Happy owner with puppy", span: "" },
  { src: petDog, alt: "Beagle portrait", span: "" },
  { src: galleryGrooming, alt: "Kitten grooming", span: "" },
];

const FAQS = [
  {
    q: "What are your clinic hours?",
    a: "We're open every day until 9 PM. Emergency consultations available around the clock — just call +91 91339 36055.",
  },
  {
    q: "Do you treat exotic pets and farm animals?",
    a: "Yes. Beyond dogs and cats, we care for birds, cows, goats, sheep and more. Every species gets specialised attention.",
  },
  {
    q: "How do I book an appointment?",
    a: "Fill out the booking form on this page, call us directly, or WhatsApp us. We usually confirm within 15 minutes.",
  },
  {
    q: "Do you handle emergencies after hours?",
    a: "Absolutely. Call the clinic line for immediate guidance — Dr Prasad or a senior team member will respond promptly.",
  },
];

const STATS = [
  { value: 30, suffix: "+", label: "Years of care" },
  { value: 25000, suffix: "+", label: "Pets treated" },
  { value: 223, suffix: "+", label: "5-star reviews" },
  { value: 4.5, suffix: "★", label: "Google rating" },
];

/* ---------- Helpers ---------- */

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const dur = 1600;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(value * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  const isFloat = value % 1 !== 0;
  return (
    <span ref={ref}>
      {isFloat ? display.toFixed(1) : Math.floor(display).toLocaleString()}
      {suffix}
    </span>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
} as const;

/* ---------- Cursor ---------- */

function CursorGlow() {
  const hydrated = useHydrated();
  const x = useSpring(0, { stiffness: 400, damping: 40 });
  const y = useSpring(0, { stiffness: 400, damping: 40 });
  useEffect(() => {
    if (!hydrated) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [hydrated, x, y]);
  if (!hydrated) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply md:block"
      style={{
        x,
        y,
        background:
          "radial-gradient(closest-side, color-mix(in oklab, var(--gold) 22%, transparent), transparent 70%)",
      }}
    />
  );
}

/* ---------- Loading Screen ---------- */

function LoadingScreen() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-cream"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-7 w-7" />
              <span className="absolute inset-0 animate-pulse-ring rounded-full" />
            </div>
            <p className="font-display text-2xl tracking-wide text-charcoal">Dr Prasad's Pet Clinic</p>
            <div className="mt-1 h-[2px] w-40 overflow-hidden rounded-full bg-beige/60">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Nav ---------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-5"
      >
        <div
          className={[
            "flex w-full max-w-6xl items-center justify-between rounded-full border transition-all duration-500",
            scrolled
              ? "border-border/60 bg-card/70 px-4 py-2.5 shadow-[0_20px_50px_-30px_rgba(60,40,20,0.35)] backdrop-blur-2xl md:px-6"
              : "border-transparent bg-card/30 px-5 py-3.5 backdrop-blur-md md:px-8",
          ].join(" ")}
        >
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-4 w-4" />
            </span>
            <span className="font-display text-lg leading-none text-charcoal">
              Dr Prasad's
              <span className="ml-1 text-xs font-sans font-medium tracking-widest text-muted-foreground uppercase">
                Pet Clinic
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="group relative text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#booking"
              className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_rgba(60,40,20,0.6)] transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              Book Appointment
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-full border border-border/60 bg-card/50 p-2.5 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-cream/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-5 pt-5">
              <span className="font-display text-xl">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-full border border-border/60 bg-card p-2.5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-14 flex flex-col items-center gap-7">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.label}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.06 * i } }}
                  className="font-display text-3xl"
                >
                  {n.label}
                </motion.a>
              ))}
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full bg-primary px-8 py-3.5 text-primary-foreground"
              >
                Book Appointment
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate min-h-[100vh] overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
    >
      {/* floating decorative paws */}
      <FloatingPaws />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[80%] grain-bg opacity-[0.35]"
      />
      <div
        aria-hidden
        className="absolute -left-40 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-accent/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-40 bottom-10 -z-10 h-[420px] w-[420px] rounded-full bg-beige/60 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div style={{ y: textY, opacity }} className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Trusted since 1993 · Bengaluru
          </motion.div>

          <h1 className="mt-8 font-display text-5xl leading-[1.02] text-balance-x text-charcoal md:text-7xl lg:text-[88px]">
            Trusted veterinary care{" "}
            <span className="relative inline-block italic text-primary">
              for every pet
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden
              >
                <motion.path
                  d="M2 8 Q80 2 150 6 T298 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2, duration: 1.4, ease: "easeInOut" }}
                />
              </svg>
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-balance-x text-lg text-muted-foreground md:text-xl">
            Three decades of compassionate, expert care from Dr Prasad's Pet Clinic — where every wag,
            whisker, and heartbeat matters.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#booking"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-[0_20px_60px_-20px_rgba(60,40,20,0.7)] transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+919133936055"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-7 py-4 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-card"
            >
              <Phone className="h-4 w-4" />
              Call +91 91339 36055
            </a>
          </div>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border/50 bg-card/50 px-4 py-2 text-xs backdrop-blur">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-muted-foreground">
              <strong className="text-foreground">4.5</strong> · 223+ Google Reviews
            </span>
          </div>
        </motion.div>

        {/* hero triptych */}
        <motion.div style={{ y: imgY, scale: imgScale }} className="relative mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-6 md:col-span-3"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-[28px] bg-accent/40 shadow-[var(--shadow-soft)]">
                <img
                  src={petCat}
                  alt="Persian cat portrait"
                  width={900}
                  height={1100}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-12 md:col-span-6"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] bg-beige shadow-[var(--shadow-glow)] md:aspect-[5/6]">
                <img
                  src={heroVet}
                  alt="Veterinarian with Golden Retriever puppy"
                  width={1400}
                  height={1600}
                  className="h-full w-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.8 }}
                  className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-card/85 p-4 backdrop-blur-md md:bottom-8 md:left-8 md:right-8"
                >
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Available today</p>
                    <p className="mt-1 font-display text-lg text-charcoal">Dr Prasad is on duty</p>
                  </div>
                  <span className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    Open till 9 PM
                  </span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-6 md:col-span-3"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-[28px] bg-accent/40 shadow-[var(--shadow-soft)]">
                <img
                  src={petDog}
                  alt="Beagle portrait"
                  width={900}
                  height={1100}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingPaws() {
  const paws = [
    { top: "18%", left: "6%", size: 32, delay: 0, color: "bg-accent/50" },
    { top: "30%", right: "8%", size: 28, delay: 1.2, color: "bg-primary/15" },
    { top: "62%", left: "10%", size: 22, delay: 2, color: "bg-beige" },
    { top: "70%", right: "12%", size: 36, delay: 0.6, color: "bg-accent/40" },
    { top: "45%", left: "48%", size: 18, delay: 1.5, color: "bg-primary/10" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {paws.map((p, i) => (
        <div
          key={i}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
          }}
          className={`absolute animate-floaty rounded-full ${p.color} flex items-center justify-center`}
        >
          <PawIcon className="h-1/2 w-1/2 text-charcoal/60" />
        </div>
      ))}
    </div>
  );
}

function PawIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <ellipse cx="6" cy="10" rx="2" ry="2.8" />
      <ellipse cx="18" cy="10" rx="2" ry="2.8" />
      <ellipse cx="9.5" cy="5.5" rx="1.7" ry="2.4" />
      <ellipse cx="14.5" cy="5.5" rx="1.7" ry="2.4" />
      <path d="M12 11.5c-3.5 0-6 2.5-6 5 0 2 1.6 3.5 3.5 3.5.9 0 1.6-.4 2.5-.4s1.6.4 2.5.4c1.9 0 3.5-1.5 3.5-3.5 0-2.5-2.5-5-6-5z" />
    </svg>
  );
}

function Marquee() {
  const items = [
    "General Consultation",
    "Vaccinations",
    "Pet Surgery",
    "Emergency Care",
    "Grooming",
    "Deworming",
    "Dental Care",
    "Diagnostics",
    "Health Certificates",
    "Bird · Dog · Cat · Cow · Goat · Sheep",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-ivory py-6">
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-4 whitespace-nowrap">
            <PawIcon className="h-4 w-4 text-primary/70" />
            <span className="font-display text-2xl text-charcoal/80 md:text-3xl">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyUs() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Why choose us"
          title={
            <>
              A clinic built on <em className="italic text-primary">trust,</em>
              <br className="hidden md:block" /> refined over three decades.
            </>
          }
          copy="Everything we do is guided by empathy, expertise, and an obsession with your pet's comfort."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group glass-card relative overflow-hidden rounded-3xl p-8"
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/30 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:rotate-6">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-2xl text-charcoal">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-6 rounded-[32px] border border-border/60 bg-ivory p-8 md:grid-cols-4 md:p-12">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-5xl text-primary md:text-6xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ivory to-transparent"
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Our services"
          title={
            <>
              Veterinary care <em className="italic text-primary">tailored</em>
              <br className="hidden md:block" /> to your pet's needs.
            </>
          }
          copy="From routine checkups to advanced surgery — a full spectrum of care under one warm roof."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8, rotate: -0.4 }}
                className="group relative overflow-hidden rounded-[28px] border border-border/60 bg-card p-8 transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(60,40,20,0.35)]"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-br from-accent/20 via-transparent to-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl text-charcoal">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <a
                  href="#booking"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  Book a service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.article>
            );
          })}
        </div>

        {/* Species pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {SPECIES.map((sp) => {
            const Icon = sp.icon;
            return (
              <div
                key={sp.label}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-5 py-2.5 text-sm backdrop-blur transition-transform hover:-translate-y-0.5"
              >
                <Icon className="h-4 w-4 text-primary" />
                {sp.label}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutDoctor() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-2 md:px-8">
        <motion.div style={{ y }} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] shadow-[var(--shadow-soft)]">
            <img
              src={galleryTreatment}
              alt="Dr Prasad examining a puppy"
              width={1000}
              height={1200}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card absolute -bottom-8 -right-4 flex items-center gap-4 rounded-3xl px-6 py-5 md:-right-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-2xl text-charcoal leading-none">30+</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Years serving pets</p>
            </div>
          </motion.div>
        </motion.div>
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Meet Dr Prasad</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-charcoal md:text-5xl">
            A gentle hand, a<br />
            <em className="italic text-primary">seasoned heart.</em>
          </h2>
          <p className="mt-6 max-w-lg text-muted-foreground">
            For more than three decades, Dr Prasad has cared for the pets of Bengaluru with the kind of
            unhurried, thoughtful attention that turns first-time visitors into lifelong families. Every
            treatment is guided by science and softened by empathy.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Personalised treatment plans for every pet",
              "In-house laboratory and diagnostics",
              "Modern surgical suite with gentle recovery care",
              "Emergency assistance around the clock",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-foreground/85">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground hover:-translate-y-0.5 transition-transform"
            >
              <Calendar className="h-4 w-4" />
              Book with Dr Prasad
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-6 py-3 text-sm hover:bg-card"
            >
              Visit the clinic
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3800);
    (e.currentTarget as HTMLFormElement).reset();
  };
  const field =
    "w-full rounded-2xl border border-border/70 bg-card/70 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary/60 focus:ring-4 focus:ring-primary/10";
  return (
    <section id="booking" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[40px] border border-border/60 bg-gradient-to-br from-ivory via-cream to-accent/20 p-6 shadow-[var(--shadow-soft)] md:p-14">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl"
          />
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Book appointment
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-charcoal md:text-5xl">
                Let's meet your <em className="italic text-primary">little companion.</em>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Share a few details and we'll confirm your slot within 15 minutes.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <span>10, 3rd Cross, Doddanekundi Main Road, Bengaluru 560037</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+919133936055" className="hover:text-primary">
                    +91 91339 36055
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-primary" />
                  Open daily · Till 9 PM
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="grid gap-3 md:col-span-3 md:grid-cols-2">
              <input required placeholder="Pet name" className={field} />
              <input required placeholder="Owner name" className={field} />
              <input required type="tel" placeholder="Phone number" className={field} />
              <input type="email" placeholder="Email address" className={field} />
              <select required defaultValue="" className={field}>
                <option value="" disabled>
                  Pet type
                </option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
                <option>Cow</option>
                <option>Goat</option>
                <option>Sheep</option>
                <option>Other</option>
              </select>
              <input placeholder="Breed" className={field} />
              <select required defaultValue="" className={field}>
                <option value="" disabled>
                  Service
                </option>
                {SERVICES.map((s) => (
                  <option key={s.title}>{s.title}</option>
                ))}
              </select>
              <input type="date" className={field} />
              <input type="time" className={`${field} md:col-span-2`} />
              <textarea
                rows={3}
                placeholder="Anything we should know?"
                className={`${field} md:col-span-2`}
              />
              <button
                type="submit"
                className="group relative col-span-full mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-[0_18px_50px_-20px_rgba(60,40,20,0.7)] transition-transform hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 18, stiffness: 220 }}
            className="glass-card fixed bottom-8 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full px-6 py-4 shadow-[var(--shadow-glow)]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-5 w-5" strokeWidth={3} />
            </span>
            <div>
              <p className="text-sm font-medium">Appointment received</p>
              <p className="text-xs text-muted-foreground">We'll call you shortly to confirm.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Kind words"
          title={
            <>
              Loved by families <em className="italic text-primary">across Bengaluru.</em>
            </>
          }
          copy="223+ five-star reviews from pet parents who trust us with what they love most."
        />
        <div className="relative mt-14">
          <div className="relative h-[340px] md:h-[280px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card absolute inset-0 flex flex-col items-center justify-center rounded-[32px] p-8 text-center md:p-14"
              >
                <div className="flex">
                  {Array.from({ length: TESTIMONIALS[i].rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-6 max-w-2xl font-display text-2xl leading-snug text-charcoal md:text-3xl">
                  "{TESTIMONIALS[i].review}"
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {TESTIMONIALS[i].avatar}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-medium">{TESTIMONIALS[i].name}</p>
                    <p className="text-xs text-muted-foreground">{TESTIMONIALS[i].pet}</p>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Testimonial ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  k === i ? "w-8 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Moments"
          title={
            <>
              A glimpse into <em className="italic text-primary">our clinic</em>
              <br className="hidden md:block" /> and the pets we love.
            </>
          }
          copy="Real care, real faces, real happy tails."
        />
        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[240px] md:gap-5">
          {GALLERY.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-[24px] bg-beige shadow-[var(--shadow-soft)] ${g.span}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Answers to the <em className="italic text-primary">common questions.</em>
            </>
          }
          copy="Still curious? Reach out — we love a good chat about pets."
        />
        <div className="mt-12 divide-y divide-border/60 rounded-[28px] border border-border/60 bg-card/60 backdrop-blur">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
                >
                  <span className="font-display text-lg text-charcoal md:text-xl">{f.q}</span>
                  <span
                    className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border border-border/70 transition-transform duration-500 ${
                      isOpen ? "rotate-180 bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm text-muted-foreground md:px-8">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Visit us"
          title={
            <>
              Come say <em className="italic text-primary">hello</em> at the clinic.
            </>
          }
          copy="Doddanekundi, Bengaluru. Open every day, till 9 PM."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="overflow-hidden rounded-[32px] border border-border/60 shadow-[var(--shadow-soft)]">
              <iframe
                title="Dr Prasad's Pet Clinic location"
                src="https://www.google.com/maps?q=Doddanekundi+Main+Road,+Bengaluru,+Karnataka+560037&output=embed"
                loading="lazy"
                className="h-[480px] w-full border-0"
              />
            </div>
          </div>
          <div className="grid gap-4 md:col-span-2">
            <ContactCard
              icon={MapPin}
              title="Address"
              lines={["10, 3rd Cross", "Doddanekundi Main Road", "Bengaluru, Karnataka 560037"]}
              cta={{
                label: "Get directions",
                href: "https://maps.google.com/?q=Doddanekundi+Main+Road,+Bengaluru,+560037",
              }}
            />
            <ContactCard
              icon={Phone}
              title="Call or WhatsApp"
              lines={["+91 91339 36055", "Emergency? We answer 24/7."]}
              cta={{ label: "Call now", href: "tel:+919133936055" }}
            />
            <ContactCard
              icon={Clock}
              title="Business hours"
              lines={["Monday — Sunday", "9:00 AM — 9:00 PM"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
  cta,
}: {
  icon: typeof Phone;
  title: string;
  lines: string[];
  cta?: { label: string; href: string };
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card rounded-3xl p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <p className="font-display text-lg text-charcoal">{title}</p>
      </div>
      <div className="mt-4 space-y-1 text-sm text-muted-foreground">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
      {cta && (
        <a
          href={cta.href}
          target={cta.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          {cta.label}
          <ArrowRight className="h-4 w-4" />
        </a>
      )}
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-cream">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-charcoal">
                <Heart className="h-4 w-4" />
              </span>
              <span className="font-display text-2xl">Dr Prasad's Pet Clinic</span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70">
              Trusted veterinary care for every pet — from puppies and kittens to birds and farm
              animals. Thirty years of compassion, backed by modern medicine.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-xs">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-cream/80">4.5 on Google · 223+ reviews</span>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cream/50">Explore</p>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="text-cream/80 hover:text-cream">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cream/50">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li>10, 3rd Cross, Doddanekundi</li>
              <li>Bengaluru, KA 560037</li>
              <li>
                <a href="tel:+919133936055" className="hover:text-cream">
                  +91 91339 36055
                </a>
              </li>
              <li>Open daily · till 9 PM</li>
            </ul>
            <div className="mt-6 flex gap-2">
              {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:bg-cream/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} Dr Prasad's Pet Clinic. Crafted with care in Bengaluru.</p>
          <p>Emergency? Call +91 91339 36055 — anytime.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating widgets ---------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-primary via-accent to-primary"
    />
  );
}

function FloatingCTAs() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.a
            key="top"
            href="#home"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            aria-label="Scroll to top"
            className="glass-card flex h-11 w-11 items-center justify-center rounded-full text-foreground"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.a>
        )}
      </AnimatePresence>
      <a
        href="#booking"
        className="hidden items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground shadow-[0_20px_50px_-20px_rgba(60,40,20,0.7)] md:inline-flex"
      >
        <Calendar className="h-4 w-4" />
        Book Appointment
      </a>
      <a
        href="https://wa.me/919133936055"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_20px_40px_-15px_rgba(37,211,102,0.7)]"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full" />
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

function EmergencyBar() {
  return (
    <div className="fixed bottom-5 left-5 z-[70] hidden md:block">
      <a
        href="tel:+919133936055"
        className="glass-card group flex items-center gap-3 rounded-full py-2.5 pl-2.5 pr-5 text-sm"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
          <Phone className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
            Emergency
          </span>
          <span className="block font-medium">+91 91339 36055</span>
        </span>
      </a>
    </div>
  );
}

function CookieBar() {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    setOk(typeof window !== "undefined" && window.localStorage.getItem("cookie_ok") === "1");
  }, []);
  if (ok) return null;
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-4 bottom-24 z-[65] mx-auto flex max-w-lg items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/90 p-4 backdrop-blur"
    >
      <p className="text-xs text-muted-foreground">
        We use cookies to make your visit warmer. By continuing, you agree.
      </p>
      <button
        onClick={() => {
          window.localStorage.setItem("cookie_ok", "1");
          setOk(true);
        }}
        className="rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground"
      >
        Accept
      </button>
    </motion.div>
  );
}

/* ---------- Section header ---------- */

function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-muted-foreground"
      >
        <span className="h-px w-6 bg-primary/60" />
        {eyebrow}
        <span className="h-px w-6 bg-primary/60" />
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 font-display text-4xl leading-[1.05] text-balance-x text-charcoal md:text-6xl"
      >
        {title}
      </motion.h2>
      {copy && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 text-muted-foreground text-balance-x md:text-lg"
        >
          {copy}
        </motion.p>
      )}
    </div>
  );
}

/* ---------- Page ---------- */

function Home() {
  useLenis();
  return (
    <div className="relative overflow-x-hidden">
      <LoadingScreen />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <WhyUs />
        <Services />
        <AboutDoctor />
        <Booking />
        <Testimonials />
        <Gallery />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCTAs />
      <EmergencyBar />
      <CookieBar />
    </div>
  );
}
