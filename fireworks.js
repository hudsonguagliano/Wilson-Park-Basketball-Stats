// =============================================================
//  FIREWORKS  (Home page only)
// =============================================================
//
//  Plays once per visit when the Home page opens: about 5 seconds
//  of fireworks, then the sparks fly together into a basketball,
//  which holds for about a second and fades out.
//
//  - Drawn on a see-through layer that ignores taps, so people can
//    tap and scroll the page while it plays.
//  - Stops right away if someone switches to another tab.
//  - Skipped if the phone's "Reduce Motion" setting is on.
//  - "Once per visit": it won't replay on reload until the browser
//    tab is closed.
//  - To watch it again while testing, add ?fireworks to the end of
//    the address, e.g.  https://wilson-park-basketball-stats.vercel.app/?fireworks
//
//  TO REMOVE: delete this file and the <script src="fireworks.js">
//  line near the bottom of index.html.
// =============================================================

(function () {
  "use strict";

  // ---------- Settings you can tweak ----------
  const FIREWORKS_SECONDS = 5;   // bursts before the basketball forms
  const GATHER_SECONDS = 1.3;    // sparks flying together into the ball
  const HOLD_SECONDS = 1;        // basketball stays on screen
  const FADE_SECONDS = 0.6;      // basketball fades away
  const HUES = [0, 25, 45, 120, 170, 200, 270, 310]; // firework colors (spots on the color wheel)
  const MAX_SPARKS = 900;        // cap so phones stay smooth

  // ---------- Should it play? ----------
  const home = document.getElementById("home");
  if (!home || home.hidden) return; // only when the Home page is showing

  const forced = new URLSearchParams(location.search).has("fireworks");
  if (!forced) {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("fireworksPlayed")) return; // already played this visit
      sessionStorage.setItem("fireworksPlayed", "1");
    } catch (e) { /* storage blocked: just play it */ }
  }

  // ---------- The see-through drawing layer ----------
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1000;";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let W, H, SCALE, GRAVITY;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap sharpness for speed
    W = window.innerWidth;
    H = window.innerHeight;
    SCALE = Math.min(W, H);
    GRAVITY = SCALE * 0.32;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  // ---------- Small helpers ----------
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const easeOutBack = (p) => 1 + 2.70158 * Math.pow(p - 1, 3) + 1.70158 * Math.pow(p - 1, 2);
  const rgb = (c) => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
  function hsl(h, s, l) { // color wheel spot -> [red, green, blue]
    h = ((h % 360) + 360) % 360; s /= 100; l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  }

  // ---------- Sparks ----------
  // drag = how much speed a spark keeps each second (smaller = slows faster)
  const sparks = [];
  function addSpark(x, y, vx, vy, color, o) {
    if (sparks.length >= MAX_SPARKS) return;
    sparks.push({
      x, y, vx, vy, color, fill: rgb(color), age: 0,
      life: o.life, size: o.size,
      drag: o.drag ?? 0.35, gravity: o.gravity ?? 1,
      twinkle: !!o.twinkle, crackle: !!o.crackle,
    });
  }

  function updateSparks(dt) {
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.age += dt;
      if (s.age >= s.life) {
        if (s.crackle) { // tiny white pops when a crackle spark dies
          for (let k = 0; k < 4; k++) {
            addSpark(s.x, s.y, rand(-70, 70), rand(-70, 70), [255, 255, 220],
              { life: rand(0.15, 0.3), size: 1.1, drag: 0.3, gravity: 0.5, twinkle: true });
          }
        }
        sparks[i] = sparks[sparks.length - 1];
        sparks.pop();
        continue;
      }
      const keep = Math.pow(s.drag, dt);
      s.vx *= keep;
      s.vy = s.vy * keep + GRAVITY * s.gravity * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
    }
  }

  function drawSparks() {
    ctx.globalCompositeOperation = "lighter"; // overlapping sparks glow brighter
    for (const s of sparks) {
      let a = 1 - Math.pow(s.age / s.life, 2);
      if (s.twinkle && Math.random() < 0.35) a *= 0.25;
      ctx.globalAlpha = a;
      ctx.fillStyle = s.fill;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  // One firework bursting at (x, y), in a random style
  function explode(x, y) {
    const type = pick(["peony", "ring", "twoTone", "willow", "crackle"]);
    const hue = pick(HUES);
    const hue2 = pick(HUES);
    const count = type === "ring" ? 56 : 80;
    const speed = SCALE * rand(0.34, 0.44);
    for (let i = 0; i < count; i++) {
      const angle = type === "ring" ? (i / count) * Math.PI * 2 : Math.random() * Math.PI * 2;
      const v = type === "ring" ? speed : speed * Math.sqrt(Math.random()) * rand(0.85, 1.05);
      const willow = type === "willow";
      const h = type === "twoTone" && i % 2 ? hue2 : hue;
      addSpark(x, y, Math.cos(angle) * v, Math.sin(angle) * v,
        willow ? hsl(40, 90, 65) : hsl(h + rand(-10, 10), 100, rand(55, 70)), {
          life: willow ? rand(1.6, 2.2) : rand(0.9, 1.5),
          size: rand(1.4, 2.4),
          drag: willow ? 0.25 : 0.35,
          gravity: willow ? 0.6 : 1,
          twinkle: Math.random() < 0.35,
          crackle: type === "crackle" && Math.random() < 0.5,
        });
    }
    // Bright flash in the middle of the burst
    addSpark(x, y, 0, 0, [255, 255, 240], { life: 0.15, size: SCALE * 0.03, drag: 1, gravity: 0 });
  }

  // ---------- Rockets (shoot up, then burst) ----------
  const rockets = [];
  function launch() {
    const x0 = W * rand(0.15, 0.85);
    rockets.push({
      x0, y0: H + 10,
      x1: x0 + W * rand(-0.08, 0.08), y1: H * rand(0.12, 0.45),
      age: 0, dur: rand(0.55, 0.8), x: x0, y: H + 10,
    });
  }

  function updateRockets(dt) {
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.age += dt;
      const p = clamp01(r.age / r.dur);
      const e = 1 - (1 - p) * (1 - p); // slows down near the top
      r.x = r.x0 + (r.x1 - r.x0) * e;
      r.y = r.y0 + (r.y1 - r.y0) * e;
      addSpark(r.x, r.y, rand(-15, 15), rand(10, 40), [255, 200, 120],
        { life: 0.35, size: 1.2, drag: 0.5, gravity: 0.3 }); // trail
      if (p >= 1) {
        explode(r.x1, r.y1);
        rockets.splice(i, 1);
      }
    }
  }

  function drawRockets() {
    ctx.fillStyle = "#fff";
    for (const r of rockets) {
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // When each rocket goes up (seconds from the start)
  const launchTimes = [0, 0.1];
  for (let s = 0.35; s < FIREWORKS_SECONDS - 1.1; s += rand(0.28, 0.55)) {
    launchTimes.push(s);
    if (Math.random() < 0.3) launchTimes.push(s + 0.08); // sometimes two at once
  }
  launchTimes.push(FIREWORKS_SECONDS - 0.85, FIREWORKS_SECONDS - 0.82, FIREWORKS_SECONDS - 0.8); // finale
  launchTimes.sort((a, b) => a - b);

  // ---------- The basketball ----------
  let ball = null;      // where the ball goes: { cx, cy, R }
  let gatherers = null; // sparks flying to their spot on the ball

  // Points in the shape of a basketball: orange dots fill it, dark dots are the seams
  function ballTargets() {
    const R = Math.min(W * 0.3, H * 0.22, 150);
    const cx = W / 2, cy = H * 0.45;
    ball = { cx, cy, R };
    const pts = [];
    const ORANGE = [[249, 115, 22], [234, 88, 12], [194, 65, 12]];
    const SEAM = [20, 20, 20];

    const N = 230; // evenly spread dots filling the circle
    for (let i = 0; i < N; i++) {
      const r = R * 0.95 * Math.sqrt((i + 0.5) / N);
      const a = i * 2.399963;
      pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), color: pick(ORANGE), size: R * 0.075 });
    }

    const step = R / 12;
    const seam = (x, y) => pts.push({ x, y, color: SEAM, size: R * 0.04 });
    const rim = Math.round((2 * Math.PI * R) / step); // outline
    for (let i = 0; i < rim; i++) {
      const a = (i / rim) * Math.PI * 2;
      seam(cx + R * Math.cos(a), cy + R * Math.sin(a));
    }
    for (let d = -R + step; d < R; d += step) { // straight seams
      seam(cx, cy + d);
      seam(cx + d, cy);
    }
    for (const side of [-1, 1]) { // the two curved side seams
      const ax = cx + side * 1.25 * R, ar = 0.95 * R;
      for (let i = 0; i < 72; i++) {
        const a = (i / 72) * Math.PI * 2;
        const x = ax + ar * Math.cos(a), y = cy + ar * Math.sin(a);
        if (Math.hypot(x - cx, y - cy) < R * 0.97) seam(x, y);
      }
    }
    return pts;
  }

  function startGather() {
    const targets = ballTargets();
    for (let i = sparks.length - 1; i > 0; i--) { // shuffle, so random sparks get picked
      const j = Math.floor(Math.random() * (i + 1));
      [sparks[i], sparks[j]] = [sparks[j], sparks[i]];
    }
    gatherers = targets.map((t, i) => {
      const s = sparks[i]; // reuse a live spark if there is one, otherwise start a new one
      return {
        sx: s ? s.x : rand(0, W), sy: s ? s.y : rand(0, H * 0.7),
        tx: t.x, ty: t.y,
        from: s ? s.color : hsl(pick(HUES), 100, 62), to: t.color,
        size0: s ? s.size : 1.8, size1: t.size,
        delay: rand(0, 0.35), curve: rand(-0.35, 0.35),
      };
    });
    sparks.splice(0, Math.min(sparks.length, targets.length)); // those sparks are now gatherers
    for (const s of sparks) s.life = Math.min(s.life, s.age + 0.35); // leftovers fade fast
    rockets.length = 0;
  }

  function drawGatherers(g, alpha) {
    ctx.globalAlpha = alpha;
    for (const p of gatherers) {
      const q = clamp01((g - p.delay) / (GATHER_SECONDS - p.delay));
      const e = easeInOut(q);
      const dx = p.tx - p.sx, dy = p.ty - p.sy;
      const bend = Math.sin(Math.PI * e) * p.curve; // curved flight path
      const x = p.sx + dx * e - dy * bend;
      const y = p.sy + dy * e + dx * bend;
      ctx.fillStyle = rgb([
        p.from[0] + (p.to[0] - p.from[0]) * e,
        p.from[1] + (p.to[1] - p.from[1]) * e,
        p.from[2] + (p.to[2] - p.from[2]) * e,
      ]);
      ctx.beginPath();
      ctx.arc(x, y, p.size0 + (p.size1 - p.size0) * e, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // The solid basketball that replaces the dots
  function drawBall(alpha, grow) {
    const { cx, cy } = ball;
    const R = ball.R * grow;
    ctx.save();
    ctx.globalAlpha = alpha;
    const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R);
    g.addColorStop(0, "#fb923c");
    g.addColorStop(0.6, "#ea580c");
    g.addColorStop(1, "#c2410c");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    ctx.clip(); // seams stay inside the ball
    ctx.strokeStyle = "#141414";
    ctx.lineWidth = Math.max(2, R * 0.05);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
    ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
    const ar = 0.95 * R;
    ctx.moveTo(cx - 1.25 * R + ar * Math.cos(-1), cy + ar * Math.sin(-1));
    ctx.arc(cx - 1.25 * R, cy, ar, -1, 1);
    ctx.moveTo(cx + 1.25 * R + ar * Math.cos(Math.PI - 1), cy + ar * Math.sin(Math.PI - 1));
    ctx.arc(cx + 1.25 * R, cy, ar, Math.PI - 1, Math.PI + 1);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = "#141414";
    ctx.lineWidth = Math.max(2, R * 0.05);
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // A ring of sparkles shooting out when the ball forms
  function ringBurst() {
    const { cx, cy, R } = ball;
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const v = R * rand(1.6, 2.2);
      addSpark(cx + R * Math.cos(a), cy + R * Math.sin(a), Math.cos(a) * v, Math.sin(a) * v,
        i % 2 ? [255, 255, 230] : [253, 186, 116],
        { life: rand(0.5, 0.8), size: rand(1.4, 2), drag: 0.2, gravity: 0.2, twinkle: true });
    }
  }

  // ---------- Fading trails ----------
  // Instead of wiping the layer every frame, fade what's there a bit, so sparks leave short trails.
  function fadeTrails(dt, keep) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = `rgba(0,0,0,${1 - Math.pow(keep, dt * 60)})`;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";
  }

  // ---------- The main loop (runs once per screen refresh) ----------
  const FORM_AT = FIREWORKS_SECONDS + GATHER_SECONDS; // ball fully formed
  const FADE_AT = FORM_AT + HOLD_SECONDS;             // ball starts fading
  const END_AT = FADE_AT + FADE_SECONDS;              // all done
  let t = 0, lastTime = null, nextLaunch = 0, formed = false, stopped = false;

  function stop() {
    stopped = true;
    window.removeEventListener("resize", resize);
    canvas.remove();
  }

  function frame(now) {
    if (stopped) return;
    if (home.hidden) return stop(); // someone opened another tab
    if (lastTime === null) lastTime = now;
    const dt = Math.min((now - lastTime) / 1000, 0.05); // real time, so speed is the same on every phone
    lastTime = now;
    t += dt;

    while (nextLaunch < launchTimes.length && launchTimes[nextLaunch] <= t) {
      launch();
      nextLaunch++;
    }
    if (!gatherers && t >= FIREWORKS_SECONDS) startGather();
    if (gatherers && !formed && t >= FORM_AT) {
      formed = true;
      ringBurst();
    }

    if (t < FORM_AT) fadeTrails(dt, gatherers ? 0.55 : 0.78);
    else ctx.clearRect(0, 0, W, H);

    updateRockets(dt);
    updateSparks(dt);
    drawRockets();

    if (gatherers) {
      const since = t - FORM_AT;                     // time since the ball formed
      const appear = clamp01(since / 0.25);          // solid ball fades in over 0.25 s
      const fade = clamp01((t - FADE_AT) / FADE_SECONDS);
      if (appear < 1) drawGatherers(t - FIREWORKS_SECONDS, 1 - appear);
      if (since >= 0) drawBall(appear * (1 - fade), 0.9 + 0.1 * easeOutBack(appear));
    }
    drawSparks();

    if (t >= END_AT) return stop();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
