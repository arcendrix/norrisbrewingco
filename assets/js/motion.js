(() => {
  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const cinemas = Array.from(document.querySelectorAll('[data-scroll-cinema]'));
  if (!cinemas.length) return;

  root.classList.add('motion-enabled');

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const lerp = (from, to, progress) => from + (to - from) * progress;
  const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  let ticking = false;

  function setVars(section, p) {
    const phaseOne = clamp(p / 0.52);
    const phaseTwo = clamp((p - 0.34) / 0.66);
    const pub = easeInOut(phaseOne);
    const mountain = easeInOut(phaseTwo);
    const canEnergy = easeOut(clamp((p - 0.08) / 0.82));
    const ring = lerp(-18, 42, p);

    section.style.setProperty('--ring-r', `${ring}deg`);
    section.style.setProperty('--ring-r2', `${ring * -1}deg`);
    section.style.setProperty('--scrim-o', `${lerp(0.14, 0.34, p)}`);

    section.style.setProperty('--pub-x', `${lerp(-330, -18, pub)}px`);
    section.style.setProperty('--pub-y', `${lerp(-70, -10, pub)}px`);
    section.style.setProperty('--pub-z', `${lerp(-180, -50, pub)}px`);
    section.style.setProperty('--pub-ry', `${lerp(24, 1, pub)}deg`);
    section.style.setProperty('--pub-rz', `${lerp(-7, -1, pub)}deg`);
    section.style.setProperty('--pub-scale', `${lerp(0.82, 0.34, pub)}`);
    section.style.setProperty('--pub-o', `${lerp(0.95, 0.16, phaseTwo)}`);

    section.style.setProperty('--mountain-x', `${lerp(360, 8, mountain)}px`);
    section.style.setProperty('--mountain-y', `${lerp(78, 4, mountain)}px`);
    section.style.setProperty('--mountain-z', `${lerp(-190, -55, mountain)}px`);
    section.style.setProperty('--mountain-ry', `${lerp(-24, 1, mountain)}deg`);
    section.style.setProperty('--mountain-rz', `${lerp(7, 0, mountain)}deg`);
    section.style.setProperty('--mountain-scale', `${lerp(0.78, 0.38, mountain)}`);
    section.style.setProperty('--mountain-o', `${lerp(0.42, 0.94, phaseTwo)}`);

    section.style.setProperty('--can-y', `${lerp(32, -18, canEnergy)}px`);
    section.style.setProperty('--can-r', `${lerp(-2.5, 1.8, Math.sin(p * Math.PI))}deg`);
    section.style.setProperty('--can-scale', `${lerp(0.86, 1.08, canEnergy)}`);

    section.style.setProperty('--memory-o', `${lerp(0.08, 0.72, canEnergy)}`);
    section.style.setProperty('--memory-x', `0px`);
    section.style.setProperty('--memory-y', `${lerp(18, -8, canEnergy)}px`);
    section.style.setProperty('--memory-scale', `${lerp(0.9, 1.04, canEnergy)}`);
    section.style.setProperty('--memory-zoom', `${lerp(1.26, 1.04, p)}`);
    section.style.setProperty('--memory-pub-o', `${lerp(0.9, 0.04, phaseTwo)}`);
    section.style.setProperty('--memory-mountain-o', `${lerp(0.02, 0.9, phaseTwo)}`);

    section.style.setProperty('--caption-y', `${lerp(18, -10, p)}px`);
    section.style.setProperty('--caption-o', `${lerp(0.42, 0.94, canEnergy)}`);

    const steps = section.querySelectorAll('.cinema-step');
    steps.forEach((step, index) => {
      const local = clamp((p - index * 0.22) / 0.34);
      step.style.setProperty('--step-x', `${lerp(-18, 0, easeOut(local))}px`);
      step.style.setProperty('--step-o', `${lerp(0.38, 1, easeOut(local))}`);
    });
  }

  function update() {
    ticking = false;
    cinemas.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / travel);
      setVars(section, progress);
    });
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
})();
