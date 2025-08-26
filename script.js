document.addEventListener('DOMContentLoaded', () => {
  // smooth scroll for nav (keep yours if already present)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
    });
  });

  // --- Slide-deck style discussion ---
  const container = document.getElementById('discussion');
  const grid = container?.querySelector('.discussion-grid');
  const characters = container ? container.querySelectorAll('.character') : [];
  const playButton = document.getElementById('playButton');
  const indicator = document.getElementById('clickIndicator');

  if (!container || !grid || !characters.length || !playButton || !indicator) return;

  // Your story beats (edit freely)
  const storySteps = [
    { sel: '.char1', text: 'Strategist: “Our tagline is ‘Succumb to the Crumb’. Thoughts?”' },
    { sel: '.char2', text: 'Designer: “It’s punchy. I can make fun pixel crumbs.”' },
    { sel: '.char3', text: 'Intern: “Manager says it’s vague… wants ‘bread crumb’ spelled out.”' },
    { sel: '.char1', text: 'Strategist: “Over-specifying kills memorability.”' },
    { sel: '.char4', text: 'Boss: “We need clarity. Can we A/B test instead of guessing?”' },
    { sel: '.char2', text: 'Designer: “Ok: Version A ‘Succumb to the Crumb’. Version B ‘Succumb to the Bread Crumb’. Measure lift.”' },
    { sel: '.char1', text: 'Strategist: “Define success: brand recall + CTR + comments sentiment.”' },
    { sel: '.char3', text: 'Intern: “I’ll set the UTM scheme and comment classifier.”' },
    { sel: '.char4', text: 'Boss: “Ship A/B, report Friday. If A wins, we keep it.”' },
  ];

  let step = -1;
  let running = false;
  let waiting = false;

  function clearAll() {
    characters.forEach(c => {
      c.classList.remove('active');
      const b = c.querySelector('.bubble');
      if (b) b.style.display = 'none';
    });
  }

  function render(i) {
    clearAll();
    const s = storySteps[i];
    if (!s) {
      // finished — show replay hint
      indicator.textContent = 'Replay ▸';
      indicator.classList.add('show');
      container.classList.add('ready');
      running = false;
      waiting = true;   // allow click to restart
      return;
    }
    const el = container.querySelector(s.sel);
    if (!el) return;
    el.classList.add('active');
    const bubble = el.querySelector('.bubble');
    if (bubble) {
      bubble.textContent = s.text;
      bubble.style.display = 'block';
    }
    // Ask for click to continue
    indicator.textContent = 'Click to advance ▸';
    indicator.classList.add('show');
    container.classList.add('ready');
    waiting = true;
  }

  function nextStep() {
    step += 1;
    render(step);
  }

  // Start the deck
  playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    running = true;
    step = -1;
    nextStep();
  });

  // Advance only on click
  container.addEventListener('click', () => {
    if (!running && waiting && step >= storySteps.length) {
      // replay from start
      running = true;
      step = -1;
    }
    if (!waiting) return;
    waiting = false;
    indicator.classList.remove('show');
    container.classList.remove('ready');
    // small delay so the indicator fades before the next beat
    setTimeout(nextStep, 120);
  });
});
