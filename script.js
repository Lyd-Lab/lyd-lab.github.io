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

  // Discussion animation: reveal pixel characters one by one and update their lines
  const discussionCharacters = document.querySelectorAll('.discussion .character');
  if (discussionCharacters.length) {
    // Hide all characters initially
    discussionCharacters.forEach(char => {
      char.style.display = 'none';
    });
    // Define a sequence of steps for the story. Each step targets a bubble and updates its text,
    // and ensures the associated character is shown. Characters that appear multiple times
    // will remain visible while their dialogue changes.
    // Define a longer story where the team debates and refines their campaign tagline.
    const storySteps = [
      {
        selector: '.char1 .bubble',
        text: 'Strategist: "I have a fun tagline: \u2018Succumb to the Crumb\u2019 – it\'s catchy and invites our audience to join our crumb revolution!"',
        charSelector: '.char1'
      },
      {
        selector: '.char2 .bubble',
        text: 'Designer: "Ooh, I can already see the visuals! Let\'s make it pop with bright colors and playful type."',
        charSelector: '.char2'
      },
      {
        selector: '.char3 .bubble',
        text: 'Intern: "And we can sprinkle some memes to go viral!"',
        charSelector: '.char3'
      },
      {
        selector: '.char4 .bubble',
        text: 'Boss: "Wait, \u2018Crumb\u2019 is too vague. Let\'s say \u2018Succumb to the Bread Crumb\u2019 to be clear."',
        charSelector: '.char4'
      },
      {
        selector: '.char1 .bubble',
        text: 'Strategist: "Hmm… I feel like that kills the pun and the fun. It\'s too wordy."',
        charSelector: '.char1'
      },
      {
        selector: '.char2 .bubble',
        text: 'Designer: "Maybe we could lean into the pun but still hint at bread… \u2018Follow the Crumb\u2019 like a trail leading to our product!"',
        charSelector: '.char2'
      },
      {
        selector: '.char3 .bubble',
        text: 'Intern: "Or \u2018Crumb and Get It\u2019 – that\'s snappy and invites people to join in!"',
        charSelector: '.char3'
      },
      {
        selector: '.char4 .bubble',
        text: 'Boss: "Okay, let\'s settle on \u2018Crumb and Get It\u2019. We\'ll test it with our audience and see their reactions!"',
        charSelector: '.char4'
      },
      {
        selector: '.char1 .bubble',
        text: 'Strategist: "Great! We\'ll monitor the metrics and adjust as needed. Let\'s get started."',
        charSelector: '.char1'
      }
    ];
    let stepIndex = 0;
    const stepDelay = 2500; // milliseconds delay between steps
    function runStoryStep() {
      if (stepIndex >= storySteps.length) {
        return;
      }
      const step = storySteps[stepIndex];
      const bubbleEl = document.querySelector(step.selector);
      const charEl = document.querySelector(step.charSelector);
      if (charEl) {
        charEl.style.display = 'block'; // show the character
      }
      if (bubbleEl) {
        bubbleEl.textContent = step.text;
      }
      stepIndex++;
      setTimeout(runStoryStep, stepDelay);
    }
    // Start the sequence shortly after page load to ensure images are ready
    setTimeout(runStoryStep, 600);
  }
});