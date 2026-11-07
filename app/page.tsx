"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowUpRight, BookOpen, Briefcase, Check, Copy, EnvelopeSimple,
  Eye, Eyeglasses, FirstAidKit, Globe, GraduationCap, HandHeart, Heart,
  Hospital, MapPin, MicrosoftExcelLogo, MicrosoftPowerpointLogo, MicrosoftWordLogo,
  MusicNotes, PaperPlaneTilt, Phone, Plus, Sparkle,
} from "@phosphor-icons/react";
import { profile } from "./profile";

const navigation = [["About", "about"], ["My care", "care"], ["Experience", "experience"], ["Education", "education"]];
const care = [
  { title: "A warm welcome", label: "People first", icon: HandHeart, kind: "welcome", text: "A friendly face. A listening ear. A calmer start to every visit.", detail: "I help patients find their way, understand the next step, and feel listened to throughout their visit." },
  { title: "A clearer next step", label: "Eye test support", icon: Eye, kind: "tests", text: "Helping patients prepare and feel comfortable during eye related tests.", detail: "I support eye related tests within my role, following the clinical team’s guidance and helping patients feel at ease." },
  { title: "Care in the details", label: "Hospital support", icon: FirstAidKit, kind: "team", text: "Thoughtful assistance that keeps the everyday patient journey moving.", detail: "I work alongside colleagues to support patient handling and the hospital’s day to day operations." },
];
const steps = [
  { name: "Welcome", title: "A friendly first hello.", text: "A warm welcome makes an unfamiliar place feel a little easier.", icon: HandHeart },
  { name: "Prepare", title: "A little reassurance.", text: "Clear guidance helps patients feel ready for their next step.", icon: Eyeglasses },
  { name: "Support", title: "Together, with care.", text: "An attentive presence, working alongside the hospital team.", icon: Hospital },
];
const education = [
  { year: "2023", date: "February 2023 to present", title: "B.Com (Honours)", subject: "Accounting", school: "Fazlul Haque Mohila College", badge: "Currently studying", icon: GraduationCap },
  { year: "2022", date: "Higher secondary", title: "H.S.C.", subject: "Higher Secondary Certificate", school: "Fazlul Haque Mohila College", badge: "GPA 3.58 / 5", icon: BookOpen },
  { year: "2020", date: "Secondary", title: "S.S.C.", subject: "Secondary School Certificate", school: "Moniza Rahman Girls School and College", badge: "GPA 3.61 / 5", icon: GraduationCap },
];
const faqs = [
  ["Where do you currently work?", `I am a patient attendant at ${profile.hospital} in Dhaka. I began this role in January 2024.`],
  ["What does your role involve?", "Patient handling, assistance with eye related tests, and support for daily hospital operations, working under the clinical team’s guidance."],
  ["What are you studying?", "A Bachelor of Commerce (Honours) in Accounting at Fazlul Haque Mohila College, which I began in February 2023."],
  ["Which languages do you speak?", "Bengali and English. Clear, considerate communication is a big part of how I connect with people."],
  ["What other skills do you bring?", "Microsoft Word, Excel, PowerPoint, and web browsing. I enjoy building practical skills alongside my patient care experience."],
  ["How can we connect?", "Use the email or telephone links below. For a professional opportunity, please include your name, organisation, and a little about the role."],
];

function Brand() {
  return <span className="brand title-2"><span className="brand-mark"><Eye weight="duotone" size={24}/><Heart weight="fill" size={10}/></span>jhumur<span className="rose-text">.</span></span>;
}

function VisionBuddy({ className = "" }: { className?: string }) {
  return <svg className={`vision-buddy ${className}`} viewBox="0 0 240 200" fill="none" aria-hidden="true">
    <ellipse cx="120" cy="179" rx="67" ry="8" fill="#eebbd1"/>
    <g className="buddy-body">
      <path d="M45 57C68 18 159 19 190 61c29 39 15 93-25 108-41 15-103 2-123-32-16-28-14-57 3-80Z" fill="#f8b5d3"/>
      <path d="M37 101s31-47 83-47 83 47 83 47-31 47-83 47-83-47-83-47Z" fill="#fffafc" stroke="#b53070" strokeWidth="3"/>
      <g className="buddy-iris"><circle cx="120" cy="101" r="29" fill="#b98bcb"/><circle cx="120" cy="101" r="17" fill="#663b72"/><circle cx="129" cy="91" r="7" fill="white"/><circle cx="112" cy="108" r="3" fill="white"/></g>
      <path d="m56 68-8-13m28 0-4-14m99 27 8-13m-28 0 4-14" stroke="#b53070" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="63" cy="131" rx="12" ry="6" fill="#ef84b4"/><ellipse cx="177" cy="131" rx="12" ry="6" fill="#ef84b4"/>
      <path d="M111 155q9 8 18 0" stroke="#b53070" strokeWidth="3" strokeLinecap="round"/>
    </g>
    <g className="buddy-spark" stroke="#b53070" strokeWidth="2" strokeLinecap="round"><path d="M211 30v19m-9-9h18M24 143v13m-6-7h12"/></g>
    <path className="buddy-heart" d="M21 43c-12-9-10-18-3-18 5 0 7 5 7 5s2-5 7-5c8 0 8 11-11 18Z" fill="#e85e9b"/>
  </svg>;
}

function EyeChart({ small = false }: { small?: boolean }) {
  return <div className={`eye-chart ${small ? "small" : ""}`} aria-hidden="true"><div className="chart-clip"/><span>E</span><span>F P</span><span>T O Z</span><span>L P E D</span><span>P E C F D</span><div className="chart-bottom"><Heart size={14} weight="fill"/></div></div>;
}

function Scene({ step }: { step: number }) {
  return <div className={`care-scene scene-${step}`} aria-hidden="true">
    <span className="scene-dot dot-one"/><span className="scene-dot dot-two"/>
    <Sparkle className="scene-spark" size={40} weight="duotone"/>
    {step === 0 ? <><VisionBuddy/><div className="speech-bubble caption-3">Hello, you <Heart size={16} weight="fill"/></div><HandHeart className="scene-float-icon" size={56} weight="duotone"/></> : step === 1 ? <><EyeChart/><div className="glasses-float"><Eyeglasses size={112} weight="duotone"/></div><span className="scene-note caption-3">A little clarity <Sparkle size={14} weight="fill"/></span></> : <><div className="hospital-illustration"><span className="hospital-sign"><Heart size={28} weight="fill"/></span><Hospital size={144} weight="duotone"/><span className="hospital-door"/></div><div className="care-heart"><HandHeart size={64} weight="duotone"/></div><span className="scene-note caption-3">People, at the heart of it.</span></>}
  </div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [openCare, setOpenCare] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const ActiveStepIcon = steps[step].icon;

  useEffect(() => {
    const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); reveals.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(el => reveals.observe(el));
    const words = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); words.unobserve(entry.target); }
    }), { threshold: 1, rootMargin: "0px 0px -12% 0px" });
    document.querySelectorAll(".word").forEach(el => words.observe(el));
    const sections = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: "-15% 0px -60% 0px" });
    document.querySelectorAll("main > section[id]").forEach(el => sections.observe(el));
    return () => { reveals.disconnect(); words.disconnect(); sections.disconnect(); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
      if (event.key !== "Tab") return;
      const items = [menuButton.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") || [])].filter(Boolean) as HTMLElement[];
      if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
      if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0]?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  function closeMenu() { setMenuOpen(false); menuButton.current?.focus(); }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setCopyError(false); setTimeout(() => setCopied(false), 3000); }
    catch { setCopyError(true); }
  }
  function movePortrait(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    if (portraitRef.current) portraitRef.current.style.transform = `rotate(${-3 + x * 4}deg) translate(${x * 8}px, ${y * 8}px)`;
  }

  return <>
    <a href="#main" className="skip-link button-md">Skip to content</a>
    <header className="site-header">
      <nav className="navigation" aria-label="Main navigation">
        <a href="#home" aria-label="Jhumur, home" tabIndex={menuOpen ? -1 : undefined}><Brand/></a>
        <div className="desktop-links">{navigation.map(([label, id]) => <a className="title-4" href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined}>{label}</a>)}</div>
        <a href="#contact" className="nav-contact button-sm" tabIndex={menuOpen ? -1 : undefined}>Say hello <ArrowUpRight size={18}/></a>
        <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} ref={menuButton} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
      </nav>
    </header>
    {menuOpen && <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation" ref={menuRef}><span className="eyebrow caption-3">A little look around <Sparkle size={18} weight="duotone"/></span>{[...navigation, ["Get in touch", "contact"]].map(([label, id], i) => <a className="heading-3" href={`#${id}`} key={id} style={{ animationDelay: `${i * 60}ms` }} onClick={closeMenu}>{label}<ArrowUpRight size={28}/></a>)}<div className="menu-bottom"><VisionBuddy/><p className="caption-2">A gentle hand. A caring heart.<br/>Dhaka, Bangladesh.</p></div></div>}

    <main id="main" inert={menuOpen}>
      <section id="home" className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-heading hero-enter"><span className="eyebrow caption-3"><span className="status-dot"/> A heart for people. An eye for care.</span><h1 id="hero-title" className="heading-1 hero-title">A little kindness.<br/>A <span>clearer</span> world<span className="rose-text">.</span></h1></div>
        <div className="hero-intro hero-enter"><span className="hero-name heading-5">Hi, I’m Jhumur <Heart weight="duotone" size={24}/></span><p className="body-3">A patient attendant in eye care.<br/>A gentle hand, a little reassurance, and a whole lot of heart.</p><span className="hero-role caption-3"><Eye size={16} weight="duotone"/> Patient care, with kindness</span></div>
        <div className="hero-actions hero-enter"><a className="primary-button button-md" href="#contact">Let’s connect <span><ArrowUpRight size={20}/></span></a><span className="location caption-2"><MapPin size={16} weight="duotone"/> Dhaka, Bangladesh</span></div>
        <div className="portrait-stage hero-enter" onPointerMove={movePortrait} onPointerLeave={() => { if (portraitRef.current) portraitRef.current.style.transform = "rotate(-3deg)"; }}>
          <div className="portrait-halo" aria-hidden="true"/><Sparkle className="portrait-spark" weight="duotone" size={56}/>
          <div className="portrait-card" ref={portraitRef}><div className="portrait-image"><img src="/images/jhumur-hero.png" alt="Tanji Akhter Jhumur smiling against a blush studio backdrop" width={1086} height={1448} fetchPriority="high"/></div><div className="portrait-caption caption-3"><span>Tanji Akhter Jhumur</span><Heart size={16} weight="fill"/></div></div>
          <div className="hero-glasses" aria-hidden="true"><Eyeglasses size={56} weight="duotone"/><span className="caption-3">A clearer world</span></div>
          <div className="hero-heart" aria-hidden="true"><HandHeart size={40} weight="duotone"/></div>
          <span className="portrait-tag caption-3"><span className="status-dot"/> Patient attendant</span>
        </div>
        <div className="hero-notes hero-enter"><span className="caption-3"><HandHeart weight="duotone" size={20}/> People first</span><span className="caption-3"><Eye weight="duotone" size={20}/> Eye care</span><span className="caption-3"><GraduationCap weight="duotone" size={20}/> Always learning</span></div>
        <a className="hero-scroll caption-3" href="#care">A little look into my world <ArrowDown size={16}/></a>
      </section>

      <div className="care-ribbon" aria-hidden="true"><div className="ribbon-track">{[0, 1].map(copy => <div key={copy}><span>Good care starts with a little kindness</span><Eye size={28} weight="duotone"/><span>A softer touch. A brighter day.</span><Heart size={24} weight="duotone"/><span>People, always</span><Sparkle size={24} weight="duotone"/></div>)}</div></div>

      <section className="care-section section-space" id="care" aria-labelledby="care-title"><div className="wrap">
        <div className="section-label caption-3 reveal"><span>01 / The way I care</span><span>Small gestures, real meaning <Heart size={16} weight="duotone"/></span></div>
        <div className="section-heading reveal"><h2 className="heading-2" id="care-title">A little support.<br/><span className="rose-text">A lot of heart.</span></h2><p className="body-3">Making a hospital visit feel<br/>a little more human.</p></div>
        <div className="care-cards">{care.map((item, index) => { const Icon = item.icon; return <article className={`care-card reveal care-card-${index} ${openCare === index ? "expanded" : ""}`} key={item.title} style={{ transitionDelay: `${index * 70}ms` }}><div className={`care-art care-art-${item.kind}`} aria-hidden="true"><span className="art-disc"/>{index === 1 ? <><EyeChart small/><Eyeglasses className="art-glasses" size={80} weight="duotone"/></> : <Icon className="art-main-icon" size={96} weight="duotone"/>}<Heart className="art-heart" size={24} weight="duotone"/><Sparkle className="art-spark" size={24} weight="duotone"/></div><div className="care-card-copy"><span className="eyebrow caption-3">{item.label}</span><h3 className="heading-5">{item.title}</h3><p className="body-6">{item.text}</p><div id={`care-detail-${index}`} hidden={openCare !== index}><p className="care-detail body-6">{item.detail}</p></div><button className="care-more button-sm" aria-expanded={openCare === index} aria-controls={`care-detail-${index}`} onClick={() => setOpenCare(openCare === index ? null : index)}><span>{openCare === index ? "A little less" : "A little more"}</span><Plus size={20}/></button></div></article>; })}</div>
        <div className="care-playground reveal"><div className="playground-copy"><span className="eyebrow caption-3">Care, illustrated</span><h3 className="heading-3">Every step deserves<br/>a softer touch.</h3><div className="journey-controls" role="group" aria-label="Explore the patient journey">{steps.map((item, index) => { const Icon = item.icon; return <button key={item.name} className="journey-step" aria-pressed={step === index} onClick={() => setStep(index)}><span className="step-icon"><Icon weight="duotone" size={24}/></span><span className="title-4">{item.name}</span><span className="step-index caption-3">0{index + 1}</span></button>; })}</div><p className="playground-hint caption-2">Pick a step. Take a little look <ArrowUpRight size={16}/></p></div><div className="playground-stage"><div className="scene-content" key={step}><Scene step={step}/><div className="scene-caption"><span className="scene-caption-icon"><ActiveStepIcon weight="duotone" size={24}/></span><div><h4 className="title-1">{steps[step].title}</h4><p className="body-6">{steps[step].text}</p></div></div></div></div></div>
      </div></section>

      <section className="about-section wrap section-space" id="about" aria-labelledby="about-title"><div className="section-label caption-3 reveal"><span>02 / Behind the caring hands</span><span>A person, a purpose, a little pink</span></div><div className="about-grid"><div className="about-visual reveal"><div className="about-image"><img src="/images/jhumur-about.png" alt="Jhumur in a black sari against a warm ivory studio backdrop" width={1086} height={1448} loading="lazy"/></div><div className="about-note caption-3"><Heart weight="fill" size={18}/> A calm presence. A caring heart.</div><div className="about-eye" aria-hidden="true"><VisionBuddy/></div></div><div className="about-copy reveal"><span className="eyebrow caption-3">A little about me</span><h2 className="heading-2" id="about-title">Thoughtful by nature.<br/><span className="rose-text">Caring by choice.</span></h2><p className="body-3">I’m Tanji Akhter Jhumur. I spend my working days helping patients feel comfortable, and my study time building a future in Accounting.</p><div className="about-facts"><div><HandHeart size={28} weight="duotone"/><span className="caption-3">My work</span><p className="title-3">Patient attendant</p></div><div><GraduationCap size={28} weight="duotone"/><span className="caption-3">My studies</span><p className="title-3">B.Com in Accounting</p></div><div><Globe size={28} weight="duotone"/><span className="caption-3">My words</span><p className="title-3">Bengali & English</p></div><div><Heart size={28} weight="duotone"/><span className="caption-3">My approach</span><p className="title-3">People come first</p></div></div><div className="off-duty"><span className="caption-3">Away from work</span><span className="caption-2"><BookOpen size={18} weight="duotone"/> Reading</span><span className="caption-2"><PaperPlaneTilt size={18} weight="duotone"/> Travelling</span><span className="caption-2"><MusicNotes size={18} weight="duotone"/> Singing</span></div></div></div></section>

      <section id="experience" className="experience-section section-space" aria-labelledby="experience-title"><div className="wrap"><div className="section-label caption-3 reveal"><span>03 / My experience</span><span>Care is something you show up for</span></div><div className="section-heading reveal"><div><span className="section-kicker caption-3"><Briefcase size={18} weight="duotone"/> The work I do</span><h2 className="heading-2" id="experience-title">Experience.<br/><span className="rose-text">With a human touch.</span></h2></div><a className="text-link button-sm" href="/resume" target="_blank" rel="noreferrer">View my résumé <ArrowUpRight size={18}/></a></div><article className="experience-card reveal"><div className="experience-identity"><span className="current-badge caption-3"><span className="status-dot"/> My current chapter</span><span className="experience-icon"><Hospital weight="duotone" size={80}/><Heart weight="fill" size={24}/></span><h3 className="heading-3">Patient<br/>attendant</h3><p className="caption-2">January 2024 to present</p><span className="location caption-2"><MapPin size={16}/> Dhaka, Bangladesh</span></div><div className="experience-workplace"><span className="eyebrow caption-3">Where I make a difference</span><h4 lang="bn" className="hospital-name heading-4">{profile.hospitalBn}</h4><p className="hospital-english body-6">{profile.hospital}</p><div className="experience-duties">{[[HandHeart, "Patient handling", "A welcoming, attentive presence."], [Eye, "Eye test assistance", "Support through each practical step."], [FirstAidKit, "Daily hospital support", "Working together for better care."]].map(([Icon, title, text]) => { const DutyIcon = Icon as typeof Eye; return <div key={title as string}><span className="duty-icon"><DutyIcon size={24} weight="duotone"/></span><div><h5 className="title-3">{title as string}</h5><p className="body-6">{text as string}</p></div><Check size={18} weight="bold"/></div>; })}</div></div><Sparkle className="experience-spark" size={64} weight="duotone" aria-hidden="true"/></article></div></section>

      <section id="education" className="education-section wrap section-space" aria-labelledby="education-title"><div className="section-label caption-3 reveal"><span>04 / My education</span><span>Always making room to grow</span></div><div className="section-heading reveal"><div><span className="section-kicker caption-3"><GraduationCap size={20} weight="duotone"/> A curious mind</span><h2 className="heading-2" id="education-title">Learning today.<br/><span className="rose-text">Growing for tomorrow.</span></h2></div><div className="education-doodle" aria-hidden="true"><BookOpen size={64} weight="duotone"/><Sparkle size={24} weight="duotone"/></div></div><div className="education-cards">{education.map((item, index) => { const Icon = item.icon; return <article key={item.year} className={`education-card education-card-${index} reveal`} style={{ transitionDelay: `${index * 80}ms` }}><div className="education-card-top"><span className="education-icon"><Icon size={32} weight="duotone"/></span><span className="education-year heading-2">{item.year}<span className="caption-3">{index === 0 ? "ONWARDS" : "COMPLETED"}</span></span></div><span className="education-date caption-3">{item.date}</span><h3 className="heading-5">{item.title}</h3><span className="education-subject title-4">{item.subject}</span><p className="education-school body-6">{item.school}</p><span className="education-badge caption-3">{index === 0 ? <span className="status-dot"/> : <Check size={14} weight="bold"/>}{item.badge}</span></article>; })}</div><div className="toolkit reveal"><div><span className="eyebrow caption-3">A few practical favourites</span><h3 className="title-1">My everyday toolkit</h3></div><div className="toolkit-items">{[[MicrosoftWordLogo, "Word"], [MicrosoftExcelLogo, "Excel"], [MicrosoftPowerpointLogo, "PowerPoint"], [Globe, "Web browsing"]].map(([Icon, name]) => { const ToolIcon = Icon as typeof Eye; return <span className="tool-chip title-4" key={name as string}><ToolIcon size={24} weight="duotone"/>{name as string}</span>; })}</div></div></section>

      <section className="statement-section" aria-label="My approach to care"><div className="wrap statement-inner"><span className="statement-decoration" aria-hidden="true"><Eyeglasses size={64} weight="duotone"/><Heart size={24} weight="fill"/></span><span className="eyebrow caption-3 reveal">A simple belief, at the heart of it all</span><p className="heading-2 statement">{"Behind every pair of eyes is a person who deserves to feel seen.".split(" ").map((word, index) => <span key={index}><span className="word" style={{ transitionDelay: `${index * 35}ms` }}>{word}</span>{" "}</span>)}</p><div className="statement-signoff caption-3 reveal"><Heart weight="duotone" size={20}/> With care, Jhumur</div></div></section>

      <section className="faq-section wrap section-space" aria-labelledby="faq-title"><div className="faq-heading reveal"><span className="eyebrow caption-3">A little more to know</span><h2 className="heading-3" id="faq-title">Curious about something?</h2><Eye size={40} weight="duotone"/></div><div className="faq-list reveal">{faqs.map(([question, answer]) => <details key={question}><summary className="title-3">{question}<Plus size={20}/></summary><p className="body-6">{answer}</p></details>)}</div></section>

      <section id="contact" className="contact-section section-space" aria-labelledby="contact-title"><div className="wrap"><div className="section-label caption-3 reveal"><span>05 / Good things start with hello</span><span>Let’s make a little connection <Heart size={16} weight="duotone"/></span></div><div className="contact-main reveal"><div><span className="eyebrow caption-3">Have an opportunity in mind?</span><h2 id="contact-title" className="heading-1">A good connection<br/>starts with <span>hello.</span></h2><p className="body-3">For professional opportunities and thoughtful conversations.</p><a className="primary-button button-md" href={`mailto:${profile.email}`}>Say hello <span><EnvelopeSimple size={20}/></span></a></div><div className="contact-art" aria-hidden="true"><span className="contact-art-disc"/><EnvelopeSimple size={144} weight="duotone"/><Heart className="contact-heart" size={64} weight="duotone"/><Sparkle className="contact-spark" size={40} weight="duotone"/><span className="contact-note caption-3">Sent with a little kindness.</span></div></div><div className="contact-details reveal"><div><span className="eyebrow caption-3">Write to me</span><div className="email-line"><a className="title-3" href={`mailto:${profile.email}`}>{profile.email}</a><button className="copy-button" aria-label="Copy email address" onClick={copyEmail}>{copied ? <Check size={20}/> : <Copy size={20}/>}</button></div><span className="copy-status caption-3" role="status">{copyError ? "Select the email address to copy it." : copied ? "Email address copied." : ""}</span></div><div><span className="eyebrow caption-3">Give me a call</span><a className="title-3" href={`tel:${profile.phone}`}><Phone size={18} weight="duotone"/> +880 1956 636560</a></div><div><span className="eyebrow caption-3">My little corner</span><span className="title-3"><MapPin size={18} weight="duotone"/> Dhaka, Bangladesh</span></div></div></div></section>
    </main>
    <footer className="footer wrap" inert={menuOpen}><a href="#home" aria-label="Jhumur, back to home"><Brand/></a><span className="caption-2">© {new Date().getFullYear()} Tanji Akhter Jhumur. Made with care.</span><div className="footer-links caption-2"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="#home">Back to top ↑</a></div></footer>
  </>;
}
