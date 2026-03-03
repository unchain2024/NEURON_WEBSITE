"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   Interactive Neural Network — HTML5 Canvas
   Refined: more neurons, smaller/crisper, subtle glow,
   elegant connections, responsive to mouse & scroll.
   ═══════════════════════════════════════════════════════ */

const NEURON_COUNT = 160;
const CONNECTION_DISTANCE = 150;
const MAX_CONNECTIONS = 3;
const FIRE_DECAY = 0.965;
const PULSE_SPEED = 3;
const CHAIN_FIRE_CHANCE = 0.3;
const AMBIENT_FIRE_INTERVAL = 50;
const MOUSE_FIRE_RADIUS = 180;
const MOUSE_FIRE_COOLDOWN = 20;

interface Neuron {
  x: number;
  y: number;
  baseRadius: number;
  connections: number[];
  fire: number;
  lastFired: number;
}

interface Pulse {
  from: number;
  to: number;
  progress: number;
  speed: number;
  hue: number;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const neuronsRef = useRef<Neuron[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      generateNeurons();
    }

    function generateNeurons() {
      const neurons: Neuron[] = [];
      for (let i = 0; i < NEURON_COUNT; i++) {
        neurons.push({
          x: Math.random() * w,
          y: Math.random() * h,
          baseRadius: 1 + Math.random() * 1.5,
          connections: [],
          fire: 0,
          lastFired: -999,
        });
      }

      for (let i = 0; i < neurons.length; i++) {
        const dists: { idx: number; d: number }[] = [];
        for (let j = 0; j < neurons.length; j++) {
          if (i === j) continue;
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DISTANCE) dists.push({ idx: j, d });
        }
        dists.sort((a, b) => a.d - b.d);
        neurons[i].connections = dists.slice(0, MAX_CONNECTIONS).map((d) => d.idx);
      }

      neuronsRef.current = neurons;
      pulsesRef.current = [];
    }

    function fireNeuron(idx: number, frame: number) {
      const n = neuronsRef.current[idx];
      if (!n || frame - n.lastFired < 25) return;
      n.fire = 1;
      n.lastFired = frame;
      for (const target of n.connections) {
        const dx = neuronsRef.current[target].x - n.x;
        const dy = neuronsRef.current[target].y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        pulsesRef.current.push({
          from: idx,
          to: target,
          progress: 0,
          speed: PULSE_SPEED / dist,
          hue: 230 + Math.random() * 40,
        });
      }
    }

    function render() {
      if (!canvas || !ctx) return;
      const frame = frameRef.current++;
      const neurons = neuronsRef.current;
      const pulses = pulsesRef.current;

      ctx.clearRect(0, 0, w, h);

      const scrollY = scrollRef.current;
      const viewTop = scrollY - 200;
      const viewBot = scrollY + window.innerHeight + 200;

      // ── Connections ──
      for (let i = 0; i < neurons.length; i++) {
        const a = neurons[i];
        if (a.y < viewTop || a.y > viewBot) continue;

        for (const j of a.connections) {
          if (j <= i) continue;
          const b = neurons[j];
          const activity = Math.max(a.fire, b.fire);
          const alpha = 0.025 + activity * 0.12;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.3 + activity * 0.7;
          ctx.stroke();
        }
      }

      // ── Neurons ──
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        if (n.y < viewTop || n.y > viewBot) continue;

        n.fire *= FIRE_DECAY;
        if (n.fire < 0.005) n.fire = 0;

        const r = n.baseRadius + n.fire * 2.5;
        const alpha = 0.12 + n.fire * 0.88;

        // Subtle glow when firing
        if (n.fire > 0.15) {
          const glowR = r * 4;
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
          grad.addColorStop(0, `rgba(129, 140, 248, ${n.fire * 0.2})`);
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Neuron body
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        const lightness = 55 + n.fire * 35;
        ctx.fillStyle = `hsla(235, 70%, ${lightness}%, ${alpha})`;
        ctx.fill();
      }

      // ── Pulses ──
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          if (Math.random() < CHAIN_FIRE_CHANCE) fireNeuron(p.to, frame);
          pulses.splice(i, 1);
          continue;
        }

        const a = neurons[p.from];
        const b = neurons[p.to];
        if (!a || !b) { pulses.splice(i, 1); continue; }

        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;
        if (py < viewTop || py > viewBot) continue;

        // Glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 6);
        grad.addColorStop(0, `hsla(${p.hue}, 85%, 75%, 0.8)`);
        grad.addColorStop(0.5, `hsla(${p.hue}, 85%, 65%, 0.2)`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 90%, 1)`;
        ctx.fill();
      }

      // ── Mouse firing ──
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y + scrollY;
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        const dx = n.x - mx;
        const dy = n.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_FIRE_RADIUS && frame - n.lastFired > MOUSE_FIRE_COOLDOWN) {
          const chance = 0.04 * (1 - d / MOUSE_FIRE_RADIUS);
          if (Math.random() < chance) fireNeuron(i, frame);
        }
      }

      // ── Ambient firing ──
      if (frame % AMBIENT_FIRE_INTERVAL === 0) {
        const count = 2 + Math.floor(Math.random() * 2);
        const candidates = neurons
          .map((n, idx) => ({ idx, y: n.y }))
          .filter((n) => n.y > viewTop && n.y < viewBot);
        for (let c = 0; c < count && candidates.length > 0; c++) {
          const pick = candidates[Math.floor(Math.random() * candidates.length)];
          fireNeuron(pick.idx, frame);
        }
      }

      animRef.current = requestAnimationFrame(render);
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    function onScroll() {
      scrollRef.current = window.scrollY;
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    scrollRef.current = window.scrollY;

    resize();
    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none"
      style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
