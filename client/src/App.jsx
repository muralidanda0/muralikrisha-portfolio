import React, { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Background3D from "./components/Background3D";
import SectionWrapper from "./components/SectionWrapper";
import AICursor from "./components/AICursor";
import NeuralNetwork from "./components/NeuralNetwork";
import AIBrain from "./components/AIBrain";
import toast from "react-hot-toast";

/* ─────────────────────────────────────────
   TYPING HOOK
───────────────────────────────────────── */
function useFadeRole(words, intervalMs = 2800) {
  const [index, setIndex]   = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);                          // fade out
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);                         // fade in new word
      }, 400);
    }, intervalMs);
    return () => clearInterval(cycle);
  }, [words, intervalMs]);

  return { word: words[index], visible };
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const PROJECTS = [
  // ── DONE ──
  {
    title: "AI-Powered Real-Time Malpractice Detection",
    badge: "⭐ SIH — Institute Selected",
    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    desc: "Fully offline computer vision system that detects exam malpractice in real time using YOLOv8, OpenCV, and MediaPipe. Generates evidence-based PDF reports and real-time alerts — zero internet dependency.",
    tech: ["Python", "YOLOv8", "OpenCV", "MediaPipe", "Offline Deploy"],
    impact: [{ num: "65%", label: "Malpractice Reduction" }, { num: "0ms", label: "Network Latency" }, { num: "Real-time", label: "Alert System" }],
    featured: true, category: "ai", done: true, github: "#", demo: "#",
  },
  {
    title: "Cryptocurrency Price Forecasting Platform",
    badge: "ML / Time-Series", badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/30",
    desc: "ML-powered platform forecasting crypto prices using LSTM and regression models with a Flask API and live chart visualizations. Built during Infosys Springboard Internship.",
    tech: ["Python", "LSTM", "Scikit-learn", "Flask", "Pandas", "Matplotlib"],
    category: "ai", done: true, github: "#",
  },
  {
    title: "AI-Based Job Aligner",
    badge: "NLP / AI Tool", badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    desc: "NLP tool that parses job descriptions and optimizes resume keyword matching for ATS systems. Identifies skill gaps and improves candidate shortlist rates.",
    tech: ["Python", "NLP", "Machine Learning", "Flask"],
    category: "ai", done: true, github: "#", demo: "#",
  },
  {
    title: "E-Commerce MERN Platform",
    badge: "Full Stack", badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    desc: "Full-stack e-commerce app with JWT auth, product & inventory management, Stripe payment integration, and a responsive admin dashboard.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "JWT", "Stripe"],
    category: "web", done: true, github: "#", demo: "#",
  },
  {
    title: "Children's Therapy Center Website",
    badge: "Full Stack", badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    desc: "Interactive booking platform for parents and therapists — appointment scheduling, session detail pages, and a clean UI built with EJS and Node.js backend.",
    tech: ["Node.js", "EJS", "MongoDB", "Express.js", "HTML/CSS"],
    category: "web", done: true, github: "#",
  },
  // ── PLANNED ──
  {
    title: "Real-Time Chat Application",
    badge: "Full Stack", badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    desc: "Live chat app with Socket.io for real-time messaging, room-based conversations, user authentication, and online presence indicators.",
    tech: ["React.js", "Node.js", "Socket.io", "Express.js", "MongoDB"],
    category: "web", done: false, github: "#",
  },
  {
    title: "Dev Portfolio CMS",
    badge: "Full Stack", badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    desc: "A headless CMS-backed portfolio builder where developers can manage projects, blogs, and contact entries from an admin dashboard without touching code.",
    tech: ["Next.js", "Sanity CMS", "Tailwind CSS", "Vercel"],
    category: "web", done: false, github: "#",
  },
  {
    title: "Sentiment Analysis Dashboard",
    badge: "AI / NLP", badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/30",
    desc: "Analyzes social media/review sentiment using fine-tuned BERT. Visualizes trends over time with charts and word clouds via a FastAPI + React frontend.",
    tech: ["Python", "BERT", "FastAPI", "React.js", "Recharts"],
    category: "ai", done: false, github: "#",
  },
  {
    title: "Face Attendance System",
    badge: "Computer Vision", badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    desc: "Automated attendance marking using facial recognition with DeepFace. Stores records in MongoDB, generates reports, and flags unknown faces in real time.",
    tech: ["Python", "DeepFace", "OpenCV", "MongoDB", "Flask"],
    category: "ai", done: false, github: "#",
  },
  {
    title: "SportsEdge Event Hub — UI/UX",
    badge: "UI/UX Design", badgeColor: "text-pink-400 bg-pink-400/10 border-pink-400/30",
    desc: "End-to-end Figma design for a college sports event management platform — registration flows, leaderboards, mobile-first layouts, and a full design system.",
    tech: ["Figma", "Prototyping", "Design System", "Mobile-first"],
    category: "uiux", done: false, github: "#", demo: "#",
  },
  {
    title: "AI Therapy Companion — UX Design",
    badge: "UI/UX Design", badgeColor: "text-pink-400 bg-pink-400/10 border-pink-400/30",
    desc: "High-fidelity Figma prototype for a mental health companion — mood tracking, guided journaling, calm UI interactions, and an empathetic onboarding flow.",
    tech: ["Figma", "Interaction Design", "User Research", "Prototyping"],
    category: "uiux", done: false, github: "#", demo: "#",
  },
  {
    title: "Dev Tools Dashboard — UI Design",
    badge: "UI/UX Design", badgeColor: "text-pink-400 bg-pink-400/10 border-pink-400/30",
    desc: "Dark-mode developer dashboard UI with sidebar navigation, code snippet manager, API tester mockup, and notification system — designed entirely in Figma.",
    tech: ["Figma", "Dark Mode Design", "Component Library", "Auto-layout"],
    category: "uiux", done: false, github: "#",
  },
];

const EXPERIENCE = [
  {
    company: "Infosys Springboard",
    role: "AI / ML Intern — Internship 6.0",
    date: "Sep 2025 – Nov 2025",
    color: "#00d4ff",
    bullets: [
      "Designed and trained <b>LSTM and regression models</b> to forecast cryptocurrency prices using historical OHLCV data.",
      "Built a <b>Flask API layer</b> to serve model predictions with a React frontend for real-time Matplotlib chart visualizations.",
      "Feature-engineered <b>large time-series datasets</b> using Pandas and NumPy, applying sliding window techniques for sequence modeling.",
    ],
  },
  {
    company: "ApexPlanet Software Pvt. Ltd.",
    role: "Web Development Intern",
    date: "May 2025 – Jul 2025",
    color: "#7c3aed",
    bullets: [
      "Developed and shipped <b>full-stack web features</b> using the MERN stack with proper version control and code review practices.",
      "Built <b>RESTful API endpoints</b> with Node.js and Express.js — authentication, data validation, and error handling.",
      "Delivered features on schedule in an <b>Agile sprint environment</b>, collaborating with a cross-functional team.",
    ],
  },
  {
    company: "Spotmies LLP",
    role: "React Developer Intern",
    date: "May 2025 – Jun 2025",
    color: "#10b981",
    bullets: [
      "Built <b>responsive React components</b> and improved UX flows, reducing user drop-off on key screens.",
      "Worked with <b>state management and React Hooks</b> for dynamic data, contributing to a cleaner component architecture.",
    ],
  },
  {
    company: "Cognifyz Technologies",
    role: "Web Development Intern",
    date: "Mar 2025 – Apr 2025",
    color: "#f59e0b",
    bullets: [
      "Completed <b>structured web development tasks</b> covering frontend and backend fundamentals through weekly deliverables.",
      "Built and shipped <b>mini projects</b> using HTML, CSS, JavaScript, and Node.js as part of the internship curriculum.",
    ],
  },
];

const ACHIEVEMENTS = [
  { icon: "🏆", title: "Smart India Hackathon 2025 — Institute Level", desc: "Selected at institute level to represent ANITS for AI-Powered Real-Time Malpractice Detection, shortlisted from all department teams.", color: "#f59e0b" },
  { icon: "🎓", title: "Reliance Foundation Scholar", desc: "Awarded ₹2,00,000 (₹50K/year) for academic excellence and demonstrated leadership potential.", color: "#00d4ff" },
  { icon: "📊", title: "CGPA: 8.86 / 10", desc: "Consistently strong academic record at ANITS, Visakhapatnam — B.Tech Computer Science.", color: "#10b981" },
];

const CERTS_DONE = [
  { icon: "🌐", name: "Web Dev Bootcamp", issuer: "Udemy — Angela Yu", year: "2025", color: "#f59e0b", border: "rgba(245,158,11,0.25)", bg: "rgba(245,158,11,0.07)" },
  { icon: "☁️", name: "Azure Fundamentals (AZ-900)", issuer: "Microsoft Learn", year: "2025", color: "#3b82f6", border: "rgba(59,130,246,0.25)", bg: "rgba(59,130,246,0.07)" },
  { icon: "🤖", name: "ML Fundamentals", issuer: "Microsoft Learn", year: "2025", color: "#3b82f6", border: "rgba(59,130,246,0.25)", bg: "rgba(59,130,246,0.07)" },
  { icon: "🧠", name: "Principles of GenAI", issuer: "Infosys Springboard", year: "2025", color: "#7c3aed", border: "rgba(124,58,237,0.25)", bg: "rgba(124,58,237,0.07)" },
  { icon: "🔬", name: "Intro to Generative AI", issuer: "Google Cloud Skills Boost", year: "2025", color: "#ef4444", border: "rgba(239,68,68,0.25)", bg: "rgba(239,68,68,0.07)" },
  { icon: "✅", name: "Problem Solving (DSA)", issuer: "HackerRank", year: "2025", color: "#10b981", border: "rgba(16,185,129,0.25)", bg: "rgba(16,185,129,0.07)" },
];

const CERTS_PLANNED = [
  { icon: "⚛️", name: "React — Full Course", issuer: "freeCodeCamp", color: "#00d4ff", border: "rgba(0,212,255,0.2)", bg: "rgba(0,212,255,0.06)" },
  { icon: "🗄️", name: "MongoDB Associate Developer", issuer: "MongoDB University (Free)", color: "#10b981", border: "rgba(16,185,129,0.2)", bg: "rgba(16,185,129,0.06)" },
  { icon: "🤖", name: "Deep Learning Specialization", issuer: "Coursera — deeplearning.ai (Audit)", color: "#7c3aed", border: "rgba(124,58,237,0.2)", bg: "rgba(124,58,237,0.06)" },
  { icon: "💡", name: "DSA — NeetCode 150", issuer: "NeetCode.io (Free)", color: "#f59e0b", border: "rgba(245,158,11,0.2)", bg: "rgba(245,158,11,0.06)" },
  { icon: "🏗️", name: "System Design Fundamentals", issuer: "Educative.io (Free Tier)", color: "#f59e0b", border: "rgba(245,158,11,0.2)", bg: "rgba(245,158,11,0.06)" },
  { icon: "👁️", name: "Computer Vision — OpenCV", issuer: "Kaggle Learn (Free)", color: "#a78bfa", border: "rgba(167,139,250,0.2)", bg: "rgba(167,139,250,0.06)" },
];

const SKILLS = [
  { label: "Frontend", color: "text-cyan-400", tags: ["React.js", "JavaScript", "HTML5", "CSS3", "EJS"] },
  { label: "Backend", color: "text-purple-400", tags: ["Node.js", "Express.js", "Flask", "REST APIs"] },
  { label: "AI / ML", color: "text-emerald-400", tags: ["Python", "YOLOv8", "OpenCV", "Scikit-learn", "LSTM", "NLP", "MediaPipe"] },
  { label: "Core CS", color: "text-amber-400", tags: ["DSA", "OOP", "MongoDB", "SQL", "Git", "C / Java"] },
];

/* ─────────────────────────────────────────
   SECTION LABEL COMPONENT
───────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="block w-6 h-px bg-cyan-400" />
    <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">{children}</span>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2
    className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-14"
    style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}
  >
    {children}
  </h2>
);

/* ─────────────────────────────────────────
   PROFESSIONAL PROFILE CARD
───────────────────────────────────────── */
function CyberpunkProfileCard() {
  return (
    <div className="hidden md:flex flex-col items-center gap-4 select-none">

      {/* ── Floating card wrapper ── */}
      <div className="prof-card-float relative" style={{ width: 240 }}>

        {/* ── Animated gradient border ── */}
        <div className="prof-border absolute inset-[-2px] rounded-[20px] z-0" />

        {/* ── Card body ── */}
        <div className="relative z-10 rounded-[18px] overflow-hidden" style={{ background: "#0a0d16" }}>

          {/* Photo */}
          <div className="relative" style={{ height: 260 }}>
            <img src="/profile.jpg" alt="Murali Krishna"
              className="w-full h-full object-cover object-top"
              style={{ display: "block" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback */}
            <div className="absolute inset-0 items-center justify-center"
              style={{ display: "none", background: "linear-gradient(135deg,#1a2035,#0a0d16)" }}>
              <span className="font-extrabold text-7xl"
                style={{ fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#00d4ff,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                MK
              </span>
            </div>

            {/* Bottom fade */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(10,13,22,0.98) 100%)" }} />

            {/* Name + status */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 z-10">
              <div className="name-shimmer font-extrabold text-base leading-tight"
                style={{ fontFamily: "'Syne',sans-serif", letterSpacing: "-0.01em" }}>
                Murali Krishna Danda
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="badge-pulse status-pulse w-2 h-2 rounded-full inline-block" style={{ background: "#10b981", flexShrink: 0 }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", color: "#10b981", letterSpacing: "0.06em" }}>Open to work</span>
              </div>
            </div>
          </div>

          {/* ── Social links bar ── */}
          <div className="grid grid-cols-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { icon: "in", label: "LinkedIn", href: "https://www.linkedin.com/in/murali-krishna-danda-61b8a92a5", color: "#0a66c2", accent: "rgba(10,102,194,0.9)" },
              { icon: "{}",  label: "LeetCode", href: "https://leetcode.com/u/murali_15/",                          color: "#ffa116", accent: "rgba(255,161,22,0.9)"  },
              { icon: "gh", label: "GitHub",   href: "https://github.com/muralidanda0",                             color: "#e8eaf0", accent: "rgba(232,234,240,0.8)" },
            ].map((s, i) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className={`stat-in flex flex-col items-center justify-center py-3 gap-1 hover:bg-white/[0.04] transition ${i < 2 ? "border-r" : ""}`}
                style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <span className="font-extrabold text-[0.6rem] tracking-wider"
                  style={{ fontFamily: "'JetBrains Mono',monospace", color: s.accent }}>{s.icon}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", color: "#6b7280", letterSpacing: "0.06em" }}>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Chip row — ordered ── */}
      <div className="flex flex-wrap justify-center gap-2" style={{ maxWidth: 260 }}>
        {[
          { label: "React",   c: "rgba(0,212,255,0.9)",   b: "rgba(0,212,255,0.2)",   bg: "rgba(0,212,255,0.06)"  },
          { label: "Node.js", c: "rgba(16,185,129,0.9)",  b: "rgba(16,185,129,0.2)",  bg: "rgba(16,185,129,0.06)" },
          { label: "MongoDB", c: "rgba(16,185,129,0.9)",  b: "rgba(16,185,129,0.2)",  bg: "rgba(16,185,129,0.06)" },
          { label: "Python",  c: "rgba(245,158,11,0.9)",  b: "rgba(245,158,11,0.2)",  bg: "rgba(245,158,11,0.06)" },
          { label: "DSA",     c: "rgba(232,234,240,0.8)", b: "rgba(255,255,255,0.12)", bg: "rgba(255,255,255,0.04)" },
        ].map((t) => (
          <span key={t.label} className="px-3 py-1 rounded-md text-[0.68rem]"
            style={{ fontFamily: "'JetBrains Mono',monospace", color: t.c, border: `1px solid ${t.b}`, background: t.bg }}>
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN APP
───────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const { scrollYProgress } = useScroll();
  const { word: activeRole, visible: roleVisible } = useFadeRole(
    ["Full Stack Developer", "AI / ML Engineer", "Problem Solver", "MERN Stack Dev"]
  );

  /* ── Scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      document.querySelectorAll("section[id]").forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) setActiveSection(sec.id);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Contact submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!form.email.includes("@")) errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Message cannot be empty";
    if (Object.keys(errs).length) { setErrors(errs); toast.error("Please fix the errors above"); return; }

    setSending(true);
    try {
      await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toast.success("Message sent successfully 🚀");
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setTimeout(() => setSent(false), 3000);
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setSending(false);
    }
  };

  const navItems = ["home", "about", "skills", "projects", "experience", "achievements", "activities", "contact"];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: darkMode ? "#060810" : "#f0f4f8",
        color:      darkMode ? "#e8eaf0"  : "#0f172a",
        transition: "background 0.4s ease, color 0.4s ease",
      }}
    >

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-mono-custom { font-family: 'JetBrains Mono', monospace; }
        .font-display { font-family: 'Syne', sans-serif; }
        .typing-cursor::after { content: ''; }
        @keyframes role-fade-in  { from { opacity:0; transform:translateY(6px);  } to { opacity:1; transform:translateY(0);    } }
        @keyframes role-fade-out { from { opacity:1; transform:translateY(0);    } to { opacity:0; transform:translateY(-6px); } }
        .role-in  { animation: role-fade-in  0.4s ease both; }
        .role-out { animation: role-fade-out 0.4s ease both; }
        @keyframes blink { 50% { opacity: 0; } }
        .timeline-line::before {
          content: '';
          position: absolute;
          left: 0; top: 8px; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, #00d4ff, transparent);
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .grad-text {
          background: linear-gradient(135deg, #00d4ff, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .border-glow { border-color: rgba(0,212,255,0.25) !important; }
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
        .ambient1 { animation: float1 12s ease-in-out infinite; }
        .ambient2 { animation: float2 15s ease-in-out infinite; }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        @keyframes slide-line { 0%{left:-100%} 100%{left:100%} }
        .slide-line::after { content:''; position:absolute; left:-100%; top:0; width:100%; height:100%; background:#00d4ff; animation: slide-line 2s ease-in-out infinite; }
        @keyframes rotate-border { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }
        .rotate-border { animation: rotate-border 6s linear infinite; }
        @keyframes blink-alert { 50%{opacity:0.3} }
        .blink-alert { animation: blink-alert 1s ease-in-out infinite; }

        /* ── Dark / Light mode transitions ── */
        * { transition: background-color 0.35s ease, border-color 0.35s ease, color 0.2s ease; }

        /* ── Toggle pill ── */
        .theme-toggle {
          position: relative;
          width: 52px; height: 28px;
          border-radius: 100px;
          cursor: pointer;
          border: none;
          outline: none;
          flex-shrink: 0;
          transition: background 0.35s ease, box-shadow 0.35s ease;
        }
        .theme-toggle.dark  {
          background: rgba(0,212,255,0.15);
          box-shadow: 0 0 0 1px rgba(0,212,255,0.3), 0 0 12px rgba(0,212,255,0.15);
        }
        .theme-toggle.light {
          background: rgba(245,158,11,0.18);
          box-shadow: 0 0 0 1px rgba(245,158,11,0.4), 0 0 12px rgba(245,158,11,0.2);
        }
        .toggle-thumb {
          position: absolute;
          top: 4px;
          width: 20px; height: 20px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          transition: left 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.35s ease;
        }
        .theme-toggle.dark  .toggle-thumb { left: 4px;  background: #00d4ff; }
        .theme-toggle.light .toggle-thumb { left: 28px; background: #f59e0b; }

        @keyframes icon-pop { 0%{transform:scale(0.6)} 100%{transform:scale(1)} }
        .toggle-thumb span { animation: icon-pop 0.25s ease both; }

        /* ── Professional Profile Card ── */
        @keyframes card-float {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-8px); }
        }
        .prof-card-float { animation: card-float 5s ease-in-out infinite; }

        @keyframes border-rotate {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .prof-border {
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 40%, #10b981 70%, #00d4ff 100%);
          background-size: 300% 300%;
          animation: border-rotate 5s ease infinite;
        }

        @keyframes stat-count {
          from { opacity:0; transform: translateY(6px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .stat-in { animation: stat-count 0.5s ease both; }

        @keyframes badge-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50%     { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        .badge-pulse { animation: badge-pulse 2.5s ease-in-out infinite; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .name-shimmer {
          background: linear-gradient(90deg, #e8eaf0 30%, #00d4ff 50%, #e8eaf0 70%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        @keyframes status-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.6)} 50%{box-shadow:0 0 0 6px rgba(16,185,129,0)} }
        .status-pulse { animation: status-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* Ambient blobs — dark mode only */}
      {darkMode && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="ambient1 absolute w-[600px] h-[600px] rounded-full -top-40 -right-24"
            style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)" }} />
          <div className="ambient2 absolute w-[500px] h-[500px] rounded-full bottom-1/4 -left-32"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        </div>
      )}

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[60] origin-left"
        style={{ scaleX: scrollYProgress, background: "linear-gradient(90deg,#00d4ff,#7c3aed,#10b981)" }}
      />

      <AIBrain />
      <AICursor />
      <NeuralNetwork />
      <Background3D />
      <div className="pointer-events-none absolute inset-0 holographic-grid opacity-40" />

      <div className="relative z-10">

        {/* ══════════════════════════════
            NAV
        ══════════════════════════════ */}
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 h-16 transition-all duration-300 ${
            scrolled
              ? darkMode
                ? "bg-[rgba(6,8,16,0.85)] backdrop-blur-xl border-b border-white/[0.07]"
                : "bg-[rgba(240,244,248,0.9)] backdrop-blur-xl border-b border-black/[0.07]"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <span className="font-extrabold text-lg tracking-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
            Murali Krishna <span className="text-cyan-400">Danda</span>
          </span>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3 py-1.5 text-[0.78rem] font-medium uppercase tracking-widest rounded-md transition-colors ${
                  activeSection === item ? "text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
                }`}
                style={{ fontFamily: "'JetBrains Mono',monospace" }}
              >
                {activeSection === item && (
                  <motion.div layoutId="nav-pill" transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-md bg-cyan-400/10" />
                )}
                <span className="relative z-10">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
              </motion.a>
            ))}
          </div>

          {/* Right side: toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle pill */}
            <button
              onClick={() => setDarkMode(d => !d)}
              className={`theme-toggle ${darkMode ? "dark" : "light"}`}
              aria-label="Toggle theme"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="toggle-thumb">
                <span key={darkMode ? "moon" : "sun"}>
                  {darkMode ? "🌙" : "☀️"}
                </span>
              </div>
            </button>

            <a href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,212,255,0.35)]"
              style={{ fontFamily: "'Syne',sans-serif" }}>
              Hire Me →
            </a>
          </div>
        </motion.nav>

        {/* ══════════════════════════════
            HOME
        ══════════════════════════════ */}
        <SectionWrapper>
          <section id="home" className="min-h-screen flex items-center pt-20 px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[1fr_320px] gap-16 items-center w-full">

              {/* Left */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

                {/* Available badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs mb-6"
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    letterSpacing: "0.08em",
                    color: "#00d4ff",
                    background: "rgba(0,212,255,0.08)",
                    borderColor: "rgba(0,212,255,0.2)"
                  }}>
                  <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                  Available for Internships &amp; Full-time Roles
                </motion.div>

                {/* Name */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="font-extrabold leading-[1.05] tracking-tight mb-3"
                  style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.8rem,5vw,4.5rem)", letterSpacing: "-0.03em" }}>
                  Murali Krishna<br />
                  <span className="grad-text">Danda</span>
                </motion.h1>

                {/* Role + tagline */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                  className="mb-8 max-w-lg">

                  {/* Role badge — fixed height, no layout shift */}
                  <div className="mb-3" style={{ height: "2rem", overflow: "hidden" }}>
                    <span
                      className={roleVisible ? "role-in" : "role-out"}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        background: "linear-gradient(90deg,#00d4ff,#7c3aed)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {activeRole}
                    </span>
                  </div>

                  {/* Static description — never moves */}
                  <p className="text-gray-400 text-[0.95rem]" style={{ lineHeight: 1.8 }}>
                    Computer Science undergrad shipping&nbsp;
                    <span className="text-white font-medium">real-world AI and full-stack solutions.</span>
                  </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                  className="flex flex-wrap gap-3 mb-10">
                  <a href="#projects"
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg bg-cyan-400 text-black font-bold text-sm transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,212,255,0.35)]"
                    style={{ fontFamily: "'Syne',sans-serif" }}>
                    View My Work →
                  </a>
                  <a href="#contact"
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg border border-white/[0.12] text-white font-semibold text-sm transition hover:border-white/25 hover:bg-white/[0.04]"
                    style={{ fontFamily: "'Syne',sans-serif" }}>
                    Get in Touch
                  </a>
                  <a href="https://github.com" target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg border border-white/[0.12] text-white font-semibold text-sm transition hover:border-white/25 hover:bg-white/[0.04]"
                    style={{ fontFamily: "'Syne',sans-serif" }}>
                    GitHub ↗
                  </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                  className="flex gap-8 mb-8">
                  {[
                    { num: "10+", label: "Projects Built" },
                    { num: "4+",  label: "Internships" },
                    { num: "8.86", label: "CGPA" },
                    { num: "₹2L", label: "Scholarship" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="font-extrabold text-2xl text-white leading-none" style={{ fontFamily: "'Syne',sans-serif" }}>
                        <span className="text-cyan-400">{s.num}</span>
                      </div>
                      <div className="text-[0.7rem] text-gray-500 uppercase tracking-widest mt-1"
                        style={{ fontFamily: "'JetBrains Mono',monospace" }}>{s.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                  className="flex items-center gap-3 text-gray-500 text-[0.72rem] uppercase tracking-widest"
                  style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                  <div className="relative w-10 h-px bg-gray-600 overflow-hidden slide-line" />
                  Scroll to explore
                </motion.div>
              </motion.div>

              {/* Right — Cyberpunk Profile Card */}
              <CyberpunkProfileCard />

            </div>
          </section>
        </SectionWrapper>

        {/* ══════════════════════════════
            ABOUT
        ══════════════════════════════ */}
        <SectionWrapper>
          <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
            <SectionLabel>About Me</SectionLabel>
            <SectionTitle>Who I Am &amp;<br />What I Do</SectionTitle>

            <div className="grid md:grid-cols-[1.1fr_1fr] gap-14 items-start">

              {/* Left — bio */}
              <div className="space-y-5">
                <p className="text-gray-400 text-[0.92rem] leading-[1.9]">
                  I'm <strong className="text-white font-medium">Murali Krishna Danda</strong>, a 3rd-year Computer Science undergraduate at Anil Neerukonda Institute of Technology and Sciences, Visakhapatnam. I'm a <strong className="text-white font-medium">Reliance Foundation Scholar (₹2L)</strong> — awarded for academic excellence and leadership potential.
                </p>
                <p className="text-gray-400 text-[0.92rem] leading-[1.9]">
                  I work at the intersection of <strong className="text-white font-medium">full-stack engineering and applied AI</strong> — shipping MERN applications, real-time computer vision systems, and NLP-powered tools. Across <strong className="text-white font-medium">4 internships</strong>, I've contributed to production codebases and collaborated in Agile teams.
                </p>
                <p className="text-gray-400 text-[0.92rem] leading-[1.9]">
                  I'm focused on becoming a strong <strong className="text-white font-medium">Full Stack SDE</strong> with a deep understanding of <strong className="text-white font-medium">AI/ML engineering</strong> — solving real problems through clean code and scalable systems.
                </p>

                {/* ── Facts — distinct style ── */}
                <div className="mt-2 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  {/* header */}
                  <div className="px-5 py-3 flex items-center gap-2"
                    style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                    <span className="text-[0.65rem] text-cyan-400 uppercase tracking-widest font-medium" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                      Quick facts
                    </span>
                  </div>
                  {/* rows */}
                  {[
                    { icon: "🏸", text: <>Spend <strong className="text-white">1–2 hrs on the badminton court daily</strong> — it's non-negotiable. Also run all sports events at ANITS as Central Sports Coordinator.</> },
                    { icon: "🏏", text: <>Follow cricket obsessively off the court — sport in general is wired into how I think and compete.</> },
                    { icon: "⚡", text: <>My best debugging sessions happen right after sport. The same competitive mindset that makes me win on the court is what makes me ship.</> },
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-4 px-5 py-3.5"
                      style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none", background: "#0d1117" }}>
                      <span className="text-lg mt-0.5 flex-shrink-0">{f.icon}</span>
                      <p className="text-gray-400 text-[0.82rem] leading-relaxed">{f.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — stats + 2 roles + availability */}
              <div className="space-y-4">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { num: "8.86", label: "CGPA",        icon: "📊", color: "#00d4ff" },
                    { num: "4+",   label: "Internships", icon: "💼", color: "#7c3aed" },
                    { num: "10+",  label: "Projects",    icon: "🚀", color: "#10b981" },
                    { num: "₹2L",  label: "Scholarship", icon: "🎓", color: "#f59e0b" },
                  ].map((s) => (
                    <div key={s.label} className="p-4 rounded-xl flex flex-col gap-1"
                      style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <span className="text-xl">{s.icon}</span>
                      <span className="font-extrabold text-2xl" style={{ fontFamily: "'Syne',sans-serif", color: s.color }}>{s.num}</span>
                      <span className="text-[0.65rem] text-gray-500 uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono',monospace" }}>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Target roles — only 2 */}
                <div className="p-5 rounded-xl" style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                    Target roles
                  </div>
                  {[
                    { label: "Full Stack SDE", icon: "🌐", color: "#00d4ff", desc: "MERN · REST · System Design" },
                    { label: "AI / ML Engineer", icon: "🤖", color: "#7c3aed", desc: "Computer Vision · NLP · Deep Learning" },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center gap-4 py-3 border-b last:border-0"
                      style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: `${r.color}12`, border: `1px solid ${r.color}25` }}>
                        {r.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Syne',sans-serif" }}>{r.label}</div>
                        <div className="text-[0.65rem] mt-0.5" style={{ fontFamily: "'JetBrains Mono',monospace", color: r.color }}>{r.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Availability */}
                <div className="p-4 rounded-xl flex items-center gap-3"
                  style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <span className="status-pulse w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0 inline-block" />
                  <span className="text-sm text-emerald-400 font-medium" style={{ fontFamily: "'Syne',sans-serif" }}>
                    Available for internships &amp; full-time roles
                  </span>
                </div>
              </div>

            </div>
          </section>
        </SectionWrapper>

        {/* ══════════════════════════════
            SKILLS (detailed)
        ══════════════════════════════ */}
        <SectionWrapper>
          <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
            <SectionLabel>Skills</SectionLabel>
            <SectionTitle>Technical<br />Stack</SectionTitle>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Frontend", color: "text-cyan-400", tags: ["React.js", "JavaScript", "Tailwind", "HTML5", "CSS3"] },
                { label: "Backend", color: "text-purple-400", tags: ["Node.js", "Express.js", "REST APIs", "Flask"] },
                { label: "Database", color: "text-amber-400", tags: ["MongoDB", "MySQL", "Mongoose"] },
                { label: "AI / ML", color: "text-emerald-400", tags: ["Python", "YOLOv8", "OpenCV", "Scikit-learn", "LSTM", "NLP", "MediaPipe", "Pandas", "NumPy"] },
                { label: "Tools", color: "text-gray-300", tags: ["Git", "GitHub", "VS Code", "Postman", "XAMPP", "Google Colab"] },
                { label: "Core CS", color: "text-rose-400", tags: ["DSA", "OOP", "DBMS", "OS", "C", "Java"] },
              ].map((cat) => (
                <motion.div
                  key={cat.label}
                  whileHover={{ y: -4, borderColor: "rgba(0,212,255,0.25)" }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="p-5 bg-[#0d1117] border border-white/[0.07] rounded-2xl">
                  <div className={`text-[0.75rem] font-bold uppercase tracking-widest mb-3 ${cat.color}`}
                    style={{ fontFamily: "'Syne',sans-serif" }}>
                    {cat.label}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.tags.map((tag) => (
                      <span key={tag}
                        className="px-2 py-0.5 text-[0.68rem] rounded border border-white/[0.07] bg-white/[0.04] text-gray-300"
                        style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </SectionWrapper>

        {/* ══════════════════════════════
            PROJECTS
        ══════════════════════════════ */}
        <SectionWrapper>
          <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
            <SectionLabel>Projects</SectionLabel>
            <SectionTitle>Things I've<br />Built & Plan to Build</SectionTitle>

            {/* Tab filter */}
            {(() => {
              const [activeTab, setActiveTab] = React.useState("all");
              const tabs = [
                { key: "all",  label: "All Projects" },
                { key: "web",  label: "Web Dev" },
                { key: "ai",   label: "AI / ML" },
                { key: "uiux", label: "UI / UX" },
              ];
              const filtered = activeTab === "all" ? PROJECTS : PROJECTS.filter(p => p.category === activeTab);
              return (
                <>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tabs.map(t => (
                      <button key={t.key} onClick={() => setActiveTab(t.key)}
                        className="px-4 py-1.5 rounded-lg text-[0.75rem] font-medium transition-all"
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          background: activeTab === t.key ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                          border: activeTab === t.key ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                          color: activeTab === t.key ? "#00d4ff" : "#6b7280",
                        }}>
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {filtered.map((p) => (
                      <motion.div key={p.title}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`relative bg-[#0d1117] border border-white/[0.07] rounded-2xl p-6 overflow-hidden group
                          ${p.featured && activeTab === "all" ? "md:col-span-2 grid md:grid-cols-2 gap-8 items-start" : ""}`}>

                        {/* Top border glow */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: p.category === "uiux" ? "linear-gradient(90deg,#ec4899,#7c3aed)" : p.category === "ai" ? "linear-gradient(90deg,#7c3aed,#10b981)" : "linear-gradient(90deg,#00d4ff,#7c3aed)" }} />

                        <div>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded border text-[0.65rem] font-mono mb-4 uppercase tracking-widest ${p.badgeColor}`}
                            style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                            {p.badge}
                          </span>
                          <h3 className="font-bold text-lg mb-2 leading-snug" style={{ fontFamily: "'Syne',sans-serif", letterSpacing: "-0.01em" }}>
                            {p.title}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>

                          {p.impact && (
                            <div className="flex gap-6 mb-4">
                              {p.impact.map((imp) => (
                                <div key={imp.label}>
                                  <div className="font-extrabold text-2xl text-cyan-400 leading-none" style={{ fontFamily: "'Syne',sans-serif" }}>{imp.num}</div>
                                  <div className="text-[0.62rem] text-gray-500 uppercase tracking-wider mt-0.5" style={{ fontFamily: "'JetBrains Mono',monospace" }}>{imp.label}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {p.tech.map((t) => (
                              <span key={t} className="px-2 py-0.5 text-[0.66rem] rounded border border-white/[0.07] bg-white/[0.04] text-gray-400"
                                style={{ fontFamily: "'JetBrains Mono',monospace" }}>{t}</span>
                            ))}
                          </div>

                          <div className="flex gap-4">
                            {p.github && <a href={p.github} target="_blank" rel="noreferrer"
                              className="text-cyan-400 text-xs flex items-center gap-1 hover:opacity-70 transition"
                              style={{ fontFamily: "'JetBrains Mono',monospace" }}>↗ GitHub</a>}
                            {p.demo && <a href={p.demo} target="_blank" rel="noreferrer"
                              className="text-cyan-400 text-xs flex items-center gap-1 hover:opacity-70 transition"
                              style={{ fontFamily: "'JetBrains Mono',monospace" }}>↗ Demo</a>}
                          </div>
                        </div>

                        {p.featured && activeTab === "all" && (
                          <div className="hidden md:block bg-[#0a0e18] border border-cyan-400/20 rounded-xl p-4"
                            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem" }}>
                            <div className="flex justify-between items-center mb-3 text-gray-500">
                              <span className="text-cyan-400">CAM_01 — Exam Hall A</span>
                              <span className="text-emerald-400">● LIVE</span>
                            </div>
                            {[["Subjects Detected","24",false],["Suspicious Activity","⚠ 2 flagged",true],["Phone Detected","⚠ YES",true],["Head Turn Angle","47° — anomaly",false],["Confidence Score","0.94",false],["Model","YOLOv8n",false]].map(([k,v,alert]) => (
                              <div key={k} className="flex justify-between py-1.5 border-b border-white/[0.04]">
                                <span className="text-gray-500">{k}</span>
                                <span className={alert ? "text-red-400 blink-alert" : "text-emerald-400"}>{v}</span>
                              </div>
                            ))}
                            <div className="mt-3 text-cyan-400 text-[0.6rem]">[ALERT] Evidence snapshot saved → report_hall_A_14:32.pdf</div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </>
              );
            })()}
          </section>
        </SectionWrapper>

        {/* ══════════════════════════════
            EXPERIENCE
        ══════════════════════════════ */}
        <SectionWrapper>
          <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
            <SectionLabel>Experience</SectionLabel>
            <SectionTitle>Where I've<br />Worked</SectionTitle>

            <div className="relative pl-8" style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}>
              {EXPERIENCE.map((exp, i) => (
                <motion.div key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative pb-10 last:pb-0">

                  {/* Colored dot */}
                  <div className="absolute -left-[2.15rem] top-1.5 w-3 h-3 rounded-full border-2 border-[#060810]"
                    style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}60` }} />

                  <div className="p-5 rounded-2xl group hover:-translate-y-1 transition-transform duration-200"
                    style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {/* Top accent line */}
                    <div className="h-[2px] rounded-full mb-4 w-12" style={{ background: exp.color }} />

                    <div className="flex flex-wrap items-start gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-base text-white leading-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
                          {exp.company}
                        </div>
                        <div className="text-[0.75rem] mt-0.5 font-medium" style={{ color: exp.color, fontFamily: "'JetBrains Mono',monospace" }}>
                          {exp.role}
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-lg text-[0.65rem] font-medium flex-shrink-0"
                        style={{ background: `${exp.color}12`, border: `1px solid ${exp.color}30`, color: exp.color, fontFamily: "'JetBrains Mono',monospace" }}>
                        {exp.date}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="relative pl-4 text-[0.875rem] text-gray-400 leading-relaxed">
                          <span className="absolute left-0 top-[0.45rem] text-[0.5rem]" style={{ color: exp.color }}>▸</span>
                          <span dangerouslySetInnerHTML={{ __html: b.replace(/<b>/g, '<strong class="text-white font-medium">').replace(/<\/b>/g, '</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </SectionWrapper>

        {/* ══════════════════════════════
            ACHIEVEMENTS
        ══════════════════════════════ */}
        <SectionWrapper>
          <section id="achievements" className="py-24 px-6 max-w-6xl mx-auto">
            <SectionLabel>Achievements &amp; Certifications</SectionLabel>
            <SectionTitle>Recognition &amp;<br />Learning</SectionTitle>

            {/* ── Achievements ── */}
            <div className="grid md:grid-cols-3 gap-4 mb-14">
              {ACHIEVEMENTS.map((a) => (
                <motion.div key={a.title}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="p-5 rounded-2xl relative overflow-hidden group"
                  style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: a.color, opacity: 0.6 }} />
                  <span className="text-3xl block mb-3">{a.icon}</span>
                  <div className="font-bold text-sm mb-1" style={{ fontFamily: "'Syne',sans-serif", color: a.color }}>{a.title}</div>
                  <div className="text-gray-400 text-[0.8rem] leading-relaxed">{a.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* ── Certifications heading ── */}
            <div className="flex items-center gap-4 mb-7">
              <div className="flex items-center gap-3">
                <span className="block w-6 h-px bg-cyan-400" />
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Certifications</span>
              </div>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
            </div>

            {/* All certs — no status labels */}
            <div className="grid md:grid-cols-3 gap-3">
              {[...CERTS_DONE, ...CERTS_PLANNED].map((c) => (
                <div key={c.name}
                  className="flex items-center gap-3 p-3.5 rounded-xl transition hover:-translate-y-0.5 duration-200"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{ background: "rgba(255,255,255,0.05)" }}>{c.icon}</div>
                  <div className="min-w-0">
                    <div className="text-[0.8rem] font-semibold text-white truncate">{c.name}</div>
                    <div className="text-[0.62rem] mt-0.5 truncate" style={{ fontFamily: "'JetBrains Mono',monospace", color: c.color }}>{c.issuer}{c.year ? ` · ${c.year}` : ""}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </SectionWrapper>

        {/* ══════════════════════════════
            ACTIVITIES
        ══════════════════════════════ */}
        <SectionWrapper>
          <section id="activities" className="py-24 px-6 max-w-6xl mx-auto">
            <SectionLabel>Leadership &amp; Activities</SectionLabel>
            <SectionTitle>Beyond the<br />Code</SectionTitle>

            <div className="grid md:grid-cols-2 gap-5">

              {/* Central Sports Coordinator */}
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}
                className="md:col-span-2 relative p-6 rounded-2xl overflow-hidden group"
                style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg,#00d4ff,#7c3aed)" }} />
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>🏆</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-bold text-base text-white" style={{ fontFamily: "'Syne',sans-serif" }}>Central Sports Coordinator</h3>
                      <span className="px-2.5 py-0.5 rounded border text-[0.65rem]"
                        style={{ fontFamily: "'JetBrains Mono',monospace", color: "#00d4ff", borderColor: "rgba(0,212,255,0.25)", background: "rgba(0,212,255,0.07)" }}>
                        ANITS College
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      The go-to person for every sports event at the college — I plan, coordinate, and execute all inter- and intra-college sports activities.
                      <strong className="text-white font-medium"> No sports event at ANITS happens without my involvement.</strong> This role sharpened my leadership, communication, and large-group management skills in real pressure situations.
                    </p>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
                      style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.12)" }}>
                      <span className="text-lg">🎯</span>
                      <div>
                        <div className="text-white text-sm font-semibold" style={{ fontFamily: "'Syne',sans-serif" }}>SportsEdge — College Sports Fest</div>
                        <div className="text-gray-400 text-xs mt-0.5">Successfully planned and executed the college-wide annual sports festival end-to-end</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Badminton + NGO */}
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}
                className="relative p-6 rounded-2xl overflow-hidden group"
                style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg,#10b981,#00d4ff)" }} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>🏸</div>
                <h3 className="font-bold text-base text-white mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>Badminton Tournament Coordinator</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[["NexusArena Sports Club","#10b981","rgba(16,185,129,0.25)","rgba(16,185,129,0.07)"],["× Street Cause NGO","#a78bfa","rgba(167,139,250,0.25)","rgba(167,139,250,0.07)"]].map(([l,c,b,bg]) => (
                    <span key={l} className="px-2 py-0.5 rounded border text-[0.62rem]"
                      style={{ fontFamily: "'JetBrains Mono',monospace", color: c, borderColor: b, background: bg }}>{l}</span>
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Coordinated a fundraiser badminton event in collaboration with <strong className="text-white font-medium">Street Cause</strong> — a nationally registered student-run NGO — raising funds to uplift underprivileged communities including orphans, the elderly, and the disabled, while <strong className="text-white font-medium">empowering youth as socially conscious leaders.</strong>
                </p>
              </motion.div>

              {/* Vibe Coding Hackathon */}
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}
                className="relative p-6 rounded-2xl overflow-hidden group"
                style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg,#f59e0b,#7c3aed)" }} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>💻</div>
                <h3 className="font-bold text-base text-white mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>Hackathon Coordinator — Vibe Coding</h3>
                <span className="inline-block px-2 py-0.5 rounded border text-[0.62rem] mb-3"
                  style={{ fontFamily: "'JetBrains Mono',monospace", color: "#f59e0b", borderColor: "rgba(245,158,11,0.25)", background: "rgba(245,158,11,0.07)" }}>
                  Vibe Coding Hackathon
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Organised and ran a vibe coding hackathon that brought together students, mentors, and industry peers. Gained hands-on exposure to <strong className="text-white font-medium">AI-assisted development workflows</strong>, built cross-disciplinary connections, and deepened both technical and people skills through meaningful conversations with participants.
                </p>
              </motion.div>

              {/* Discipline Coordinator */}
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}
                className="md:col-span-2 relative p-6 rounded-2xl overflow-hidden group"
                style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg,#7c3aed,#10b981)" }} />
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>🎓</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-white mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                      Discipline Coordinator — Technical Events
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      Appointed as the department discipline coordinator for all technical events during our college tech fests — responsible for maintaining order, managing participant flow, and ensuring smooth execution across parallel event tracks.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { name: "Cursors 2026", icon: "⌨️", color: "#a78bfa", border: "rgba(167,139,250,0.25)", bg: "rgba(167,139,250,0.07)" },
                        { name: "Pragnotsav Tech Fest", icon: "🚀", color: "#00d4ff", border: "rgba(0,212,255,0.25)", bg: "rgba(0,212,255,0.07)" },
                      ].map((ev) => (
                        <div key={ev.name} className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                          style={{ background: ev.bg, border: `1px solid ${ev.border}` }}>
                          <span className="text-base">{ev.icon}</span>
                          <span className="font-semibold text-sm" style={{ fontFamily: "'Syne',sans-serif", color: ev.color }}>{ev.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </section>
        </SectionWrapper>

        {/* ══════════════════════════════
            CONTACT
        ══════════════════════════════ */}
        <SectionWrapper>
          <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
            <SectionLabel>Contact</SectionLabel>
            <SectionTitle>Let's Work<br />Together</SectionTitle>

            <div className="grid md:grid-cols-[1fr_1.4fr] gap-14 items-start">

              {/* Left info */}
              <div>
                <h3 className="font-extrabold text-2xl mb-3 text-white" style={{ fontFamily: "'Syne',sans-serif", letterSpacing: "-0.02em" }}>
                  Open to the right opportunity
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  I'm actively looking for internships and entry-level roles where I can contribute and grow. Whether it's full-stack, AI/ML, or SDE — if you're building something meaningful, I'd love to be part of it.
                </p>

                <div className="space-y-2.5 mb-5">
                  {[
                    { icon: "✉️", label: "Email",    value: "muralidanda0@gmail.com",              href: "mailto:muralidanda0@gmail.com",                              bg: "rgba(0,212,255,0.08)",   border: "rgba(0,212,255,0.18)"   },
                    { icon: "💼", label: "LinkedIn", value: "murali-krishna-danda",                href: "https://www.linkedin.com/in/murali-krishna-danda-61b8a92a5", bg: "rgba(10,102,194,0.08)",  border: "rgba(10,102,194,0.2)"   },
                    { icon: "⌨️", label: "GitHub",   value: "github.com/muralidanda0",             href: "https://github.com/muralidanda0",                            bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)"  },
                    { icon: "{}",  label: "LeetCode", value: "leetcode.com/u/murali_15",            href: "https://leetcode.com/u/murali_15/",                          bg: "rgba(255,161,22,0.07)",  border: "rgba(255,161,22,0.18)"  },
                  ].map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-xl hover:-translate-y-0.5 transition-all duration-200 group"
                      style={{ background: link.bg, border: `1px solid ${link.border}` }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                        style={{ background: "rgba(255,255,255,0.05)", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem" }}>{link.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[0.65rem] text-gray-500 uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono',monospace" }}>{link.label}</div>
                        <div className="text-sm font-medium text-white truncate">{link.value}</div>
                      </div>
                      <span className="text-gray-600 text-sm group-hover:text-gray-300 transition">↗</span>
                    </a>
                  ))}
                </div>

                {/* Location — distinct style */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-base">📍</span>
                  <div>
                    <div className="text-white text-sm font-semibold" style={{ fontFamily: "'Syne',sans-serif" }}>Visakhapatnam, India</div>
                    <div className="text-gray-500 text-[0.65rem] mt-0.5" style={{ fontFamily: "'JetBrains Mono',monospace" }}>Open to Remote · Relocation-flexible</div>
                  </div>
                </div>

                {/* Availability */}
                <div className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-xl"
                  style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <span className="status-pulse w-2 h-2 rounded-full bg-emerald-400 inline-block flex-shrink-0" />
                  <span className="text-xs text-emerald-400 font-medium" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                    Currently available for new opportunities
                  </span>
                </div>
              </div>

              {/* Right form */}
              <div className="rounded-2xl p-7" style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-sm font-bold text-white mb-5" style={{ fontFamily: "'Syne',sans-serif" }}>Send me a message</div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.68rem] text-gray-500 uppercase tracking-widest mb-1.5" style={{ fontFamily: "'JetBrains Mono',monospace" }}>Name</label>
                      <input type="text" placeholder="Jane Smith" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#060810] border border-white/[0.07] rounded-lg text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] transition" />
                      {errors.name && <p className="text-red-400 text-xs mt-1 animate-pulse">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-[0.68rem] text-gray-500 uppercase tracking-widest mb-1.5" style={{ fontFamily: "'JetBrains Mono',monospace" }}>Email</label>
                      <input type="email" placeholder="jane@company.com" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#060810] border border-white/[0.07] rounded-lg text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] transition" />
                      {errors.email && <p className="text-red-400 text-xs mt-1 animate-pulse">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.68rem] text-gray-500 uppercase tracking-widest mb-1.5" style={{ fontFamily: "'JetBrains Mono',monospace" }}>Subject</label>
                    <input type="text" placeholder="Internship opportunity / Collaboration / Freelance" value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#060810] border border-white/[0.07] rounded-lg text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] transition" />
                  </div>
                  <div>
                    <label className="block text-[0.68rem] text-gray-500 uppercase tracking-widest mb-1.5" style={{ fontFamily: "'JetBrains Mono',monospace" }}>Message</label>
                    <textarea rows={5} placeholder="Tell me about the role, project, or idea..." value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#060810] border border-white/[0.07] rounded-lg text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] transition resize-none" />
                    {errors.message && <p className="text-red-400 text-xs mt-1 animate-pulse">{errors.message}</p>}
                  </div>
                  <motion.button type="submit" disabled={sending}
                    whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${sent ? "bg-emerald-500 text-white" : "bg-cyan-400 text-black hover:shadow-[0_8px_30px_rgba(0,212,255,0.35)]"} disabled:opacity-60`}
                    style={{ fontFamily: "'Syne',sans-serif" }}>
                    {sending ? "Sending..." : sent ? "✓ Message Sent!" : "Send Message →"}
                  </motion.button>
                </form>
              </div>

            </div>
          </section>
        </SectionWrapper>

        {/* ══════════════════════════════
            FOOTER
        ══════════════════════════════ */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

              {/* Left — name + tagline */}
              <div>
                <div className="font-extrabold text-base text-white mb-1" style={{ fontFamily: "'Syne',sans-serif", letterSpacing: "-0.01em" }}>
                  Murali Krishna Danda
                </div>
                <div className="text-[0.72rem] text-gray-500" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                  Full Stack SDE &nbsp;·&nbsp; AI / ML Engineer &nbsp;·&nbsp; B.Tech CSE @ ANITS
                </div>
              </div>

              {/* Centre — social links */}
              <div className="flex items-center gap-5">
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/murali-krishna-danda-61b8a92a5", color: "#3b82f6" },
                  { label: "GitHub",   href: "https://github.com/muralidanda0",                             color: "#e8eaf0" },
                  { label: "LeetCode", href: "https://leetcode.com/u/murali_15/",                          color: "#ffa116" },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="text-[0.72rem] font-medium transition hover:opacity-100 opacity-50"
                    style={{ fontFamily: "'JetBrains Mono',monospace", color: s.color }}>
                    {s.label}
                  </a>
                ))}
              </div>

              {/* Right — copyright */}
              <div className="text-[0.68rem] text-gray-600 text-right" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                <div>© {new Date().getFullYear()} Murali Krishna Danda</div>
                <div className="mt-0.5 text-gray-700">Designed &amp; built from scratch</div>
              </div>

            </div>

            {/* Bottom rule */}
            <div className="mt-8 pt-5 flex items-center justify-center gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <span className="status-pulse w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-[0.65rem] text-gray-600" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                Open to work · muralidanda0@gmail.com
              </span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}