"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowClockwise, ArrowRight, Check, Eye, Heart, Heartbeat, Pause, Play, Sparkle } from "@phosphor-icons/react";
import type { ClinicalMode, ClinicalState } from "./clinical-world";
import type { mountClinicalRenderer } from "./clinical-renderer";
import "./clinical-showcase.css";

const details = {
  vision: {
    title: "Helping every patient see their next step.",
    text: "I guide patients through eye chart tests, checking their vision with clear instructions and a reassuring approach.",
    labels: ["Eye chart testing", "Patient guidance", "Vision checks"],
    scene: "A 3D illustration of a female visionist pointing to an eye chart while guiding a vision test.",
  },
  bp: {
    title: "A careful check. A calmer patient.",
    text: "I check every patient’s blood pressure, helping them feel comfortable while taking care of this part of their visit.",
    labels: ["Blood pressure checks", "Patient comfort", "Everyday care"],
    scene: "A 3D illustration of a seated patient with an upper arm blood pressure cuff, a monitor, and a female care professional.",
  },
};

function IllustratedFallback({ mode, row }: { mode: ClinicalMode; row: number }) {
  return <div className={`clinical-fallback fallback-${mode}`} aria-hidden="true">
    <div className="fallback-plinth"/>
    {mode === "vision" ? <>
      <div className="fallback-chart"><span className="fallback-chart-clip"/>{["E", "F P", "T O Z", "L P E D", "P E C F D"].map((line, index) => <span className={row === index ? "selected-row" : ""} key={line}>{line}</span>)}<span className="fallback-chart-stand"/></div>
      <div className="fallback-clinician"><span className="clay-hair"/><span className="clay-head"><i/><i/><b/></span><span className="clay-body"><i/></span><span className="clay-arm"/><span className="clay-pointer" style={{ transform: `rotate(${-28 + row * 11}deg)` }}/><span className="clay-leg leg-one"/><span className="clay-leg leg-two"/></div>
    </> : <><div className="fallback-arm"><span className="fallback-cuff"/><span className="fallback-tube"/></div><div className="fallback-monitor"><span className="caption-3">BP</span><span className="heading-4">— / —</span><Heartbeat size={40} weight="duotone"/><span className="monitor-button"/></div><Heart className="fallback-heart" weight="duotone" size={48}/></>}
    <Sparkle className="fallback-spark" size={28} weight="duotone"/>
  </div>;
}

export default function ClinicalShowcase() {
  const [mode, setMode] = useState<ClinicalMode>("vision");
  const [row, setRow] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [replay, setReplay] = useState(0);
  const [ready, setReady] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof mountClinicalRenderer> | null>(null);
  const stateRef = useRef<ClinicalState>({ mode, row, playing, reducedMotion, replay });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReducedMotion(media.matches);
    change();
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    stateRef.current = { mode, row, playing, reducedMotion, replay };
    rendererRef.current?.render();
  }, [mode, row, playing, reducedMotion, replay]);
  useEffect(() => {
    const frame = frameRef.current;
    const host = hostRef.current;
    if (!frame || !host) return;
    let cancelled = false;
    let requested = false;
    let visible = false;
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      rendererRef.current?.setVisible(visible);
      if (!visible || requested) return;
      requested = true;
      import("./clinical-renderer").then(({ mountClinicalRenderer }) => {
        if (cancelled) return;
        try {
          rendererRef.current = mountClinicalRenderer(host, () => stateRef.current, () => setReady(false));
          rendererRef.current.setVisible(visible);
          setReady(true);
        } catch {
          // The complete illustrated scene and its controls remain usable.
          host.replaceChildren();
          setReady(false);
        }
      }).catch(() => { if (!cancelled) setReady(false); });
    }, { rootMargin: "150px" });
    observer.observe(frame);
    return () => { cancelled = true; observer.disconnect(); rendererRef.current?.destroy(); rendererRef.current = null; };
  }, []);

  const detail = details[mode];
  return <section className="clinical-showcase reveal" aria-labelledby="clinical-title" data-paused={!playing || reducedMotion}>
    <div className="clinical-copy">
      <span className="eyebrow caption-3"><Sparkle size={16} weight="duotone"/> A glimpse of my day</span>
      <h3 className="heading-3" id="clinical-title">Vision checks.{" "}<br/>Vital care.<br/><span className="rose-text">A human touch.</span></h3>
      <div className="clinical-switches" role="group" aria-label="Explore Jhumur’s clinical responsibilities">
        <button className="clinical-switch" aria-pressed={mode === "vision"} onClick={() => setMode("vision")}><span><Eye size={24} weight="duotone"/></span><span className="title-4">Vision testing<small className="caption-3">Eye chart assessments</small></span><ArrowRight size={18}/></button>
        <button className="clinical-switch" aria-pressed={mode === "bp"} onClick={() => setMode("bp")}><span><Heartbeat size={24} weight="duotone"/></span><span className="title-4">Blood pressure<small className="caption-3">A check for every patient</small></span><ArrowRight size={18}/></button>
      </div>
      <div className="clinical-description" key={mode}>
        <h4 className="title-1">{detail.title}</h4>
        <p className="body-6">{detail.text}</p>
      </div>
    </div>
    <div className="clinical-stage" ref={frameRef}>
      <div className="clinical-stage-top"><span className="clinical-badge caption-3">{mode === "vision" ? <Eye size={16} weight="duotone"/> : <Heartbeat size={16} weight="duotone"/>}{mode === "vision" ? "Vision testing" : "Blood pressure care"}</span><span className="clinical-scene-label caption-3">Care in motion</span></div>
      <div className="clinical-viewport" role="img" aria-label={detail.scene} data-ready={ready}>
        <IllustratedFallback mode={mode} row={row}/>
        <div className="clinical-canvas-host" ref={hostRef} aria-hidden="true"/>
      </div>
      <div className="clinical-controls">
        {mode === "vision" ? <button className="clinical-action button-sm" onClick={() => setRow(value => (value + 1) % 5)}>Next chart line <ArrowRight size={16}/><span className="caption-3">{row + 1}/5</span></button> : reducedMotion ? <span className="caption-3">Blood pressure care, at a glance.</span> : <button className="clinical-action button-sm" onClick={() => { setReplay(value => value + 1); setPlaying(true); }}>Replay the scene <ArrowClockwise size={18}/></button>}
        {!reducedMotion && <button className="clinical-pause" aria-label={playing ? "Pause scene animation" : "Play scene animation"} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={20} weight="fill"/> : <Play size={20} weight="fill"/>}</button>}
      </div>
      <p className="clinical-row-status caption-3" aria-live="polite">{mode === "vision" ? `Eye chart line ${row + 1} of 5. An illustration of my daily work.` : "An illustration of an everyday blood pressure check."}</p>
      <div className="clinical-labels">{detail.labels.map(label => <span key={label} className="caption-3"><Check size={14}/>{label}</span>)}</div>
    </div>
  </section>;
}
