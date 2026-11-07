"use client";
import { useEffect, useRef, useState } from "react";

const email = "tanjiakterjhumur@gmail.com";
const links = [["About", "about"], ["My care", "care"], ["Journey", "journey"]];
function Arrow({ down = false }: { down?: boolean }) {
  return <svg className={down ? "arrow down" : "arrow"} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Eye({ className = "" }: { className?: string }) {
  return <svg className={className} width="48" height="48" viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M5 32S15 15 32 15s27 17 27 17-10 17-27 17S5 32 5 32Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="32" cy="32" r="9" stroke="currentColor" strokeWidth="1.5"/><circle cx="35" cy="29" r="2" fill="currentColor"/></svg>;
}
function Flower({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">{Array.from({length:8},(_,i)=><ellipse key={i} cx="50" cy="29" rx="13" ry="23" fill="currentColor" transform={`rotate(${i*45} 50 50)`}/>)}<circle cx="50" cy="50" r="10" fill="var(--paper)"/></svg>;
}
const careItems = [
  { n: "01", title: "A warm welcome", tag: "Patient handling", text: "Helping patients feel heard, guiding them through their visit, and offering a calm, friendly presence in a busy hospital environment.", detail: "From the first conversation to the next step in their visit, I focus on clear guidance, patience, and treating each person with respect." },
  { n: "02", title: "Support at every step", tag: "Eye test assistance", text: "Supporting eye related tests, helping patients prepare, and assisting with the practical steps of their eye care visit.", detail: "I help patients understand where to go and what comes next, while working within my responsibilities and following the clinical team's guidance." },
  { n: "03", title: "The little things matter", tag: "Daily care support", text: "Assisting with day to day hospital operations and working alongside the team to keep patient care organised and considerate.", detail: "Care also lives in the details: being attentive, communicating with colleagues, and helping the daily patient journey move smoothly." },
];
const faqs = [
  ["What do you do?", "I work as a patient attendant in an eye hospital in Dhaka. My responsibilities include patient handling, support with eye related tests, and assistance with daily hospital operations."],
  ["When did you begin working in patient care?", "I began my current hospital role in January 2024 and have continued working in patient care alongside my studies."],
  ["What are you studying?", "I am pursuing a Bachelor of Commerce (Honours) in Accounting at Fazlul Haque Mohila College, which I began in February 2023."],
  ["Which languages do you speak?", "I speak Bengali and English. Clear, considerate communication is an important part of how I approach working with people."],
  ["What other skills do you bring?", "Alongside patient care, I use Microsoft Word, Excel, PowerPoint, and the internet for everyday work. I enjoy learning and building my skills."],
  ["How can I contact you?", "You can reach me by email or phone using the contact links below. For professional opportunities, please include your name, organisation, and a little about the role."],
];
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [tab, setTab] = useState("experience");
  const [openCare, setOpenCare] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: .14 });
    document.querySelectorAll(".reveal, .word").forEach(el => observer.observe(el));
    const sections = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: "-20% 0px -55% 0px" });
    document.querySelectorAll("main > section[id]").forEach(el => sections.observe(el));
    return () => { observer.disconnect(); sections.disconnect(); };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
      if (e.key === "Tab") {
        const items = [menuButton.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") || [])].filter(Boolean) as HTMLElement[];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);
  function closeMenu() { setMenuOpen(false); menuButton.current?.focus(); }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopied(true); setCopyError(false); setTimeout(() => setCopied(false), 3000); }
    catch { setCopyError(true); }
  }
  function movePortrait(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width - .5, y = (e.clientY - bounds.top) / bounds.height - .5;
    if (portraitRef.current) portraitRef.current.style.transform = `rotate(${3 + x * 3}deg) translate(${x*8}px, ${y*8}px)`;
  }
  return <>
    <a className="skip-link button-md" href="#main">Skip to content</a>
    <header className="site-header"><nav className="navigation" aria-label="Main navigation">
      <a className="brand title-3" href="#home" aria-label="Jhumur, home"><Flower/>jhumur<span className="brand-dot">.</span></a>
      <div className="desktop-links">{links.map(([label,id])=><a key={id} className="title-4" href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>)}</div>
      <a className="nav-contact button-sm" href="#contact">Let’s connect <Arrow/></a>
      <button ref={menuButton} className={`menu-toggle ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={()=>setMenuOpen(!menuOpen)}><span/><span/></button>
    </nav></header>
    {menuOpen && <div className="mobile-menu" id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Navigation"><span className="eyebrow caption-3">A little look around</span>{[...links,["Get in touch","contact"]].map(([label,id],i)=><a className="heading-3" key={id} href={`#${id}`} onClick={closeMenu} style={{animationDelay:`${i*60}ms`}}><span>{label}</span><Arrow/></a>)}<p className="body-6">Tanji Akhter Jhumur<br/>Patient attendant · Dhaka, Bangladesh</p><Flower className="menu-flower"/></div>}
    <main id="main">
      <section className="hero container" id="home" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow caption-3 hero-enter"><span className="tiny-spark">✳</span> Care with kindness. Always.</div>
          <h1 className="heading-1 hero-title hero-enter" id="hero-title">A little kindness.<br/>A <span>clearer</span> world<span className="pink-period">.</span></h1>
          <div className="hero-intro hero-enter"><span className="hello title-2">Hi, I’m Jhumur <span aria-hidden="true">↗</span></span><p className="body-3">A patient attendant in eye care, bringing a gentle touch and a thoughtful approach to every patient’s journey.</p></div>
          <a className="primary-button button-md hero-enter" href="#contact">Get in touch <span><Arrow/></span></a>
          <div className="hero-location caption-2 hero-enter"><span className="location-dot"/> Based in Dhaka, Bangladesh</div>
        </div>
        <div className="portrait-stage hero-enter" onPointerMove={movePortrait} onPointerLeave={()=>{if(portraitRef.current) portraitRef.current.style.transform="rotate(3deg)";}}>
          <div className="portrait-orbit" aria-hidden="true"/><Flower className="hero-flower"/>
          <div className="portrait-card" ref={portraitRef}><div className="portrait-image"><img src="/images/jhumur-hero.png" alt="Tanji Akhter Jhumur smiling in a black sari against a soft blush studio backdrop" width="1024" height="1365" fetchPriority="high"/></div><div className="portrait-caption caption-3"><span>TANJI AKHTER JHUMUR</span><span>With care, always ♡</span></div></div>
          <div className="care-sticker"><Eye/><div className="caption-3">A heart for people.<br/>An eye for care.</div></div>
          <div className="portrait-label caption-3">PATIENT ATTENDANT <span aria-hidden="true">✳</span></div>
          <span className="portrait-note caption-2">a person behind the care</span>
        </div>
        <div className="hero-bottom"><a className="scroll-prompt caption-3" href="#about"><span>Scroll to get to know me</span><Arrow down/></a><span className="caption-4">PATIENT CARE <span> / </span> EYE HEALTH <span> / </span> HUMAN CONNECTION</span></div>
      </section>
      <div className="values-ribbon" aria-hidden="true"><div className="container ribbon-inner"><span>People first</span><Flower/><span>Care in the details</span><Flower/><span>A softer approach</span><Flower/><span>Always learning</span><Flower/></div></div>
      <section className="about-section container section-space" id="about" aria-labelledby="about-title">
        <div className="section-label caption-3 reveal"><span>01 / A little about me</span><span>More than a job title</span></div>
        <div className="about-grid">
          <div className="about-image-wrap reveal"><div className="about-image"><img src="/images/jhumur-about.png" alt="Jhumur in a black sari, looking thoughtfully to the side against a warm ivory backdrop" width="1024" height="1365" loading="lazy"/></div><span className="photo-tag caption-3">A calm presence. A caring heart.</span><Flower className="about-flower"/></div>
          <div className="about-copy reveal"><span className="eyebrow caption-3">The person behind the smile</span><h2 className="heading-2" id="about-title">Thoughtful by nature.<br/><span className="rose-text">Caring by choice.</span></h2><p className="body-3">I’m Tanji Akhter Jhumur, a patient attendant at an eye hospital in Dhaka. Since January 2024, my work has centred on people: welcoming patients, supporting eye tests, and helping with everyday care.</p><p className="body-3">Alongside my work, I’m studying Accounting at Fazlul Haque Mohila College. I believe there is always something new to learn, and always a small way to make someone’s day better.</p><div className="about-signoff"><span className="title-2">Tanji Akhter Jhumur</span><span className="caption-2">Patient attendant & lifelong learner</span></div><div className="personal-notes caption-2"><span>♡ Reading</span><span>↗ Travelling</span><span>♪ Singing</span></div></div>
        </div>
      </section>
      <section className="care-section section-space" id="care" aria-labelledby="care-title"><div className="container">
        <div className="section-label caption-3 reveal"><span>02 / How I help</span><span>Every detail is a chance to care</span></div>
        <div className="section-heading reveal"><h2 className="heading-2" id="care-title">Small gestures.<br/><span className="rose-text">Meaningful care.</span></h2><p className="body-3">A hospital visit can feel unfamiliar.<br/>I help make the journey a little more comfortable.</p></div>
        <div className="care-list">{careItems.map((item,i)=><article key={item.n} className={`care-row reveal ${openCare === i ? "expanded" : ""}`}><span className="care-number caption-3">{item.n}</span><div className="care-row-main"><span className="care-tag caption-3">{item.tag}</span><h3 className="heading-4">{item.title}</h3><p className="body-3">{item.text}</p><div id={`care-detail-${i}`} hidden={openCare !== i}><p className="care-detail body-6">{item.detail}</p></div></div><button className="round-button" onClick={()=>setOpenCare(openCare === i ? null : i)} aria-expanded={openCare === i} aria-controls={`care-detail-${i}`} aria-label={`${openCare === i ? "Close" : "Read more about"} ${item.title}`}><span className="plus"/></button></article>)}</div>
        <div className="patient-journey reveal"><span className="caption-3">A little reassurance, at every step</span><div><span className="title-3">Welcome</span><span aria-hidden="true">⟶</span><span className="title-3">Prepare</span><span aria-hidden="true">⟶</span><span className="title-3">Support</span></div></div>
      </div></section>
      <section className="statement-section container" aria-label="My approach to care"><Flower className="statement-flower"/><p className="heading-1 statement">{"Behind every pair of eyes is a person who deserves to feel seen.".split(" ").map((word,i)=><span className="word" key={i} style={{transitionDelay:`${i*45}ms`}}>{word} </span>)}</p><span className="caption-3">A simple belief. At the heart of everything.</span></section>
      <section className="journey-section container section-space" id="journey" aria-labelledby="journey-title"><div className="section-label caption-3 reveal"><span>03 / Growing along the way</span><span>Work, learning & everything between</span></div><div className="journey-grid"><div className="journey-intro reveal"><h2 className="heading-2" id="journey-title">Rooted in care.<br/><span className="rose-text">Still growing.</span></h2><p className="body-3">Building a career with purpose, while making room to learn something new.</p><a className="text-link button-sm" href="/resume" target="_blank" rel="noreferrer">View my résumé <Arrow/></a><div className="skill-note"><Eye/><p className="caption-2">A practical mind.<br/>A people focused heart.</p></div></div>
        <div className="journey-details reveal"><div className="tabs" role="tablist" aria-label="Professional journey">{["experience","education"].map(t=><button key={t} className="button-sm" id={`${t}-tab`} role="tab" aria-selected={tab===t} aria-controls={`${t}-panel`} tabIndex={tab===t ? 0 : -1} onClick={()=>setTab(t)} onKeyDown={e=>{if(["ArrowRight","ArrowLeft","Home","End"].includes(e.key)){e.preventDefault();const next=e.key==="Home"?"experience":e.key==="End"?"education":t==="experience"?"education":"experience";setTab(next);document.getElementById(`${next}-tab`)?.focus();}}}>{t === "experience" ? "Experience" : "Education"}</button>)}</div>
          {tab==="experience" ? <div className="timeline" id="experience-panel" role="tabpanel" aria-labelledby="experience-tab" tabIndex={0}><article><span className="timeline-date caption-3">JANUARY 2024 — PRESENT</span><h3 className="heading-5">Patient attendant</h3><p className="title-4 hospital-name" lang="bn">মাজেদা খাতুন সরদার দাতব্য চক্ষু হাসপাতাল</p><span className="caption-2">Dhaka, Bangladesh</span><p className="body-6 timeline-description">Patient handling, assistance with eye related tests, and support for everyday hospital operations.</p><div className="tags"><span className="caption-4">Patient care</span><span className="caption-4">Eye test support</span><span className="caption-4">Teamwork</span></div></article><p className="timeline-footnote caption-2">Bringing patience, attention, and a willingness to learn to each day.</p></div> : <div className="timeline education-timeline" id="education-panel" role="tabpanel" aria-labelledby="education-tab" tabIndex={0}><article><span className="timeline-date caption-3">FEBRUARY 2023 — PRESENT</span><h3 className="title-1">B.Com (Honours) in Accounting</h3><p className="body-6">Fazlul Haque Mohila College</p><span className="caption-2">Ongoing</span></article><article><span className="timeline-date caption-3">2022</span><h3 className="title-1">Higher Secondary Certificate</h3><p className="body-6">Fazlul Haque Mohila College</p><span className="caption-2">GPA 3.58 / 5</span></article><article><span className="timeline-date caption-3">2020</span><h3 className="title-1">Secondary School Certificate</h3><p className="body-6">Moniza Rahman Girls School and College</p><span className="caption-2">GPA 3.61 / 5</span></article></div>}
        </div></div>
        <div className="skills-strip reveal"><div><span className="eyebrow caption-3">Everyday toolkit</span><p className="title-3">Word <span> / </span> Excel <span> / </span> PowerPoint <span> / </span> Web browsing</p></div><div><span className="eyebrow caption-3">Words that connect</span><p className="title-3">Bengali <span> / </span> English</p></div></div>
      </section>
      <section className="faq-section container section-space" aria-labelledby="faq-title"><div className="faq-intro reveal"><span className="eyebrow caption-3">A few things you might wonder</span><h2 className="heading-2" id="faq-title">A little more<br/><span className="rose-text">about me.</span></h2><Flower/></div><div className="faq-list reveal">{faqs.map(([q,a],i)=><details key={q}><summary className="title-3"><span><small className="caption-4">0{i+1}</small>{q}</span><span className="plus" aria-hidden="true"/></summary><p className="body-6">{a}</p></details>)}</div></section>
      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-inner"><div className="contact-top caption-3 reveal"><span>04 / The next conversation</span><span>Good things start with hello</span></div><div className="contact-main reveal"><div><span className="eyebrow caption-3">Have an opportunity in mind?</span><h2 className="heading-1" id="contact-title">Let’s make<br/><span>good things happen.</span></h2><p className="body-3">For professional opportunities and thoughtful connections,<br className="desktop-break"/> I’d love to hear from you.</p><a className="primary-button button-md" href={`mailto:${email}`}>Say hello <span><Arrow/></span></a></div><div className="contact-flower-wrap"><Flower className="contact-flower"/><span className="caption-3">With care,<br/>Jhumur</span></div></div><div className="contact-details reveal"><div><span className="caption-3">WRITE TO ME</span><div className="email-line"><a className="title-3" href={`mailto:${email}`}>{email}</a><button className="copy-button caption-3" onClick={copyEmail} aria-label="Copy email address">{copied ? "Copied ✓" : "Copy ↗"}</button></div><span className="copy-status caption-2" role="status">{copyError ? "Please select the email address to copy it." : copied ? "Email address copied." : ""}</span></div><div><span className="caption-3">GIVE ME A CALL</span><a className="title-3" href="tel:+8801956636560">+880 1956 636560 <Arrow/></a></div><div><span className="caption-3">FIND ME IN</span><p className="title-3">Dhaka, Bangladesh</p></div></div></div></section>
    </main>
    <footer className="container footer"><a className="brand title-3" href="#home"><Flower/>jhumur<span className="brand-dot">.</span></a><span className="caption-2">© {new Date().getFullYear()} Tanji Akhter Jhumur. Made with care.</span><div className="footer-links caption-2"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="#home" aria-label="Back to top">Back to top ↑</a></div></footer>
  </>;
}
