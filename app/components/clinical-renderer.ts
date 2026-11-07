import * as THREE from "three";
import { buildClinicalWorld, chartRows, createClinicalCamera, fitClinicalCamera, type ClinicalState } from "./clinical-world";

function textureCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas rendering is unavailable.");
  return { canvas, context };
}

function chartTexture() {
  const { canvas, context } = textureCanvas(512, 704);
  context.fillStyle = "#fffdfc";
  context.fillRect(0, 0, 512, 704);
  context.textAlign = "center";
  context.textBaseline = "middle";
  const sizes = [138, 87, 62, 43, 31];
  const heights = [110, 265, 380, 470, 548];
  chartRows.forEach((row, index) => {
    context.font = `600 ${sizes[index]}px Manrope, sans-serif`;
    context.fillStyle = "#433344";
    context.fillText(row, 256, heights[index]);
  });
  context.fillStyle = "#cc83a6";
  context.fillRect(70, 597, 372, 4);
  context.font = "500 18px Manrope, sans-serif";
  context.fillStyle = "#a27c95";
  context.fillText("VISION CARE", 256, 649);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  return texture;
}

function monitorTexture() {
  const { canvas, context } = textureCanvas(384, 208);
  context.fillStyle = "#e9e1ef";
  context.fillRect(0, 0, 384, 208);
  context.fillStyle = "#8a6687";
  context.font = "600 27px Manrope, sans-serif";
  context.fillText("BP", 23, 42);
  // Decorative dashes deliberately avoid presenting a patient reading.
  context.font = "600 58px Manrope, sans-serif";
  context.fillStyle = "#654463";
  context.fillText("— / —", 46, 126);
  context.strokeStyle = "#bd6e9b";
  context.lineWidth = 4;
  context.beginPath();
  [[24, 171], [100, 171], [120, 147], [139, 191], [159, 156], [179, 171], [350, 171]].forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y));
  context.stroke();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function mountClinicalRenderer(host: HTMLElement, getState: () => ClinicalState, onFailure: () => void) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.22;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = createClinicalCamera();
  scene.add(new THREE.HemisphereLight("#fff9fd", "#bb80a0", 2.1));
  const key = new THREE.DirectionalLight("#fff8ed", 3.1);
  key.position.set(-3, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = key.shadow.camera.bottom = -4;
  key.shadow.camera.right = key.shadow.camera.top = 4;
  key.shadow.normalBias = .035;
  key.shadow.bias = -.0003;
  key.shadow.radius = 3;
  scene.add(key);
  const fill = new THREE.DirectionalLight("#f2ddff", 1.3);
  fill.position.set(4, 3, -3);
  scene.add(fill);
  const textures = { chart: chartTexture(), monitor: monitorTexture() };
  const world = buildClinicalWorld(textures);
  scene.add(world.root);
  let frame = 0;
  let visible = true;
  let destroyed = false;
  let failed = false;
  let elapsed = 0;
  let lastTime = 0;
  let previousReplay = getState().replay;
  let pointer = 0;

  function draw(timestamp: number) {
    frame = 0;
    if (destroyed || failed || !visible || document.hidden) { lastTime = 0; return; }
    const state = getState();
    if (state.replay !== previousReplay) { elapsed = 0; previousReplay = state.replay; }
    if (lastTime && state.playing && !state.reducedMotion) elapsed += Math.min((timestamp - lastTime) / 1000, .05);
    lastTime = timestamp;
    world.update(elapsed, state);
    const targetRotation = state.reducedMotion || !state.playing ? 0 : pointer * .10;
    world.root.rotation.y += (targetRotation - world.root.rotation.y) * .08;
    renderer.render(scene, camera);
    if (state.playing && !state.reducedMotion) frame = requestAnimationFrame(draw);
    else lastTime = 0;
  }
  function render() {
    if (!frame && !destroyed && !failed && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    fitClinicalCamera(camera, width / height);
    renderer.setSize(width, height);
    render();
  }
  function onVisibility() {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
    else render();
  }
  function onPointer(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    const rect = host.getBoundingClientRect();
    pointer = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
  }
  function resetPointer() { pointer = 0; }
  function onContextLoss(event: Event) {
    event.preventDefault();
    failed = true;
    cancelAnimationFrame(frame);
    frame = 0;
    onFailure();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  document.addEventListener("visibilitychange", onVisibility);
  host.addEventListener("pointermove", onPointer);
  host.addEventListener("pointerleave", resetPointer);
  renderer.domElement.addEventListener("webglcontextlost", onContextLoss);
  resize();
  // Produce the first complete frame before the illustrated fallback fades away.
  world.update(0, getState());
  renderer.render(scene, camera);

  return {
    render,
    setVisible(value: boolean) {
      visible = value;
      if (value) render();
      else { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("pointerleave", resetPointer);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLoss);
      world.dispose();
      textures.chart.dispose();
      textures.monitor.dispose();
      key.shadow.map?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
