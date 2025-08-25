// script.js – minimal interactivity for the portfolio site

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }

  // Simple smooth scroll for internal anchor links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        window.scrollTo({ top: targetEl.offsetTop - 40, behavior: 'smooth' });
      }
    });
  });

  // Discussion animation: characters line up and speak one by one when play is pressed
  const discussionCharacters = document.querySelectorAll('.discussion .character');
  const playButton = document.getElementById('playButton');
  if (discussionCharacters.length && playButton) {
    // Ensure characters are visible and bubbles hidden initially
    discussionCharacters.forEach(char => {
      // make sure character containers are visible in flex layout
      char.style.display = 'flex';
      const bubble = char.querySelector('.bubble');
      if (bubble) {
        bubble.style.display = 'none';
      }
      char.classList.remove('active');
    });
    // Define the story steps with character selectors and their lines
    const storySteps = [
      {
        charSelector: '.char1',
        text: 'Strategist: "I have a fun tagline: \u2018Succumb to the Crumb\u2019 – it\'s catchy and invites our audience to join our crumb revolution!"'
      },
      {
        charSelector: '.char2',
        text: 'Designer: "Ooh, I can already see the visuals! Let\'s make it pop with bright colors and playful type."'
      },
      {
        charSelector: '.char3',
        text: 'Intern: "And we can sprinkle some memes to go viral!"'
      },
      {
        charSelector: '.char4',
        text: 'Boss: "Wait, \u2018Crumb\u2019 is too vague. Let\'s say \u2018Succumb to the Bread Crumb\u2019 to be clear."'
      },
      {
        charSelector: '.char1',
        text: 'Strategist: "Hmm… I feel like that kills the pun and the fun. It\'s too wordy."'
      },
      {
        charSelector: '.char2',
        text: 'Designer: "Maybe we could lean into the pun but still hint at bread… \u2018Follow the Crumb\u2019 like a trail leading to our product!"'
      },
      {
        charSelector: '.char3',
        text: 'Intern: "Or \u2018Crumb and Get It\u2019 – that\'s snappy and invites people to join in!"'
      },
      {
        charSelector: '.char4',
        text: 'Boss: "Okay, let\'s settle on \u2018Crumb and Get It\u2019. We\'ll test it with our audience and see their reactions!"'
      },
      {
        charSelector: '.char1',
        text: 'Strategist: "Great! We\'ll monitor the metrics and adjust as needed. Let\'s get started."'
      }
    ];
    const stepDelay = 2500; // milliseconds delay between steps
    let isRunning = false;
    function runSequence() {
      if (isRunning) return;
      isRunning = true;
      let stepIndex = 0;
      // Hide play button when sequence starts
      playButton.style.display = 'none';
      function runStep() {
        if (stepIndex >= storySteps.length) {
          // End of sequence: reset active states and show play button again
          discussionCharacters.forEach(c => {
            c.classList.remove('active');
            const bub = c.querySelector('.bubble');
            if (bub) bub.style.display = 'none';
          });
          playButton.style.display = 'inline-block';
          isRunning = false;
          return;
        }
        // Remove active state and hide bubbles from all characters
        discussionCharacters.forEach(c => {
          c.classList.remove('active');
          const bub = c.querySelector('.bubble');
          if (bub) bub.style.display = 'none';
        });
        const step = storySteps[stepIndex];
        const charEl = document.querySelector(step.charSelector);
        if (charEl) {
          charEl.classList.add('active');
          const bubbleEl = charEl.querySelector('.bubble');
          if (bubbleEl) {
            bubbleEl.textContent = step.text;
            bubbleEl.style.display = 'block';
          }
        }
        stepIndex++;
        setTimeout(runStep, stepDelay);
      }
      runStep();
    }
    // Attach click handler to play button
    playButton.addEventListener('click', runSequence);
  }
});