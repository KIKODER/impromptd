function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

const colors = ["red", "green", "blue"];

function wrapWithColor(word) {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `<span class="${randomColor}">${word}</span>`;
}

const splashPhrases = [
  "He [VERB ENDING WITH -ED] his buddy's [NOUN]???",
  "The [ADJECTIVE] butler whipped out his [ADJECTIVE] [NOUN].",
  "She's never seen so many freaking [PLURAL ANIMAL] in [PLACE] before!",
  "That [ADJECTIVE] ghost just [VERB ENDING WITH -ED] my [NOUN]!",
  "They [VERB] together until the [TIME OF DAY] with their [PLURAL NOUN].",
  "He said he wouldn't touch that [NOUN] with a ten foot [NOUN]!",
  "She was making him [EMOTION] just by [VERB ENDING WITH -ED]"
];

function getRandomSplashPhrase() {
  const colors = ['red', 'green', 'blue']; // Correspond to your CSS classes
  const phrase = splashPhrases[Math.floor(Math.random() * splashPhrases.length)];

  // Replace [PLACEHOLDER] with a random colored span
  return phrase.replace(/\[(.*?)\]/g, (_, word) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    return `<span class="${color}">[${word}]</span>`;
  });
}

const themeToggle = document.getElementById('toggle-theme');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Optional: toggle icon
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }
  // Update icons based on mode
  const isDark = document.body.classList.contains('dark-mode');
  document.getElementById('kiko-icon').src = isDark ? 'assets/KikoDark.png' : 'assets/KikoLite.png';
  document.getElementById('youtube-icon').src = isDark ? 'assets/YTDark.png' : 'assets/YTLite.png';
  document.getElementById('github-icon').src = isDark ? 'assets/GithubDark.png' : 'assets/GithubLite.png';
});

function showThemeInput() {
  showScreen('theme-screen');
}

const randomThemes = [
  "A murder mystery at a kindergarten",
  "A thriller about grandmothers taking over Earth",
  "A heist where middle schoolers go rob a bank",
  "An adventure with expeditioners setting sail to go fight a large woman",
  "A thriller where a giant-ass rat terrorizes a coastal town's beach",
  "A romcom about two rival gay baristas in Queens, New York",
  "A courtroom drama between two blind lawyers",
  "A musical set in Skid Row written by Lin-Manuel Miranda",
  "An emotional tale between a daughter and her really fat father",
  "A coming-of-age story of five children fighting an old lady",
  "A story of four animals escaping a zoo and escaping to Africa",
  "An adventure of a chosen Polar Bear learning BJJ"
];

const themeInput = document.getElementById("theme-input");
const randomizeBtn = document.getElementById("randomize-btn");

randomizeBtn.addEventListener("click", () => {
  let rollCount = 0;
  const maxRolls = 10;
  const rollSpeed = 40;

  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * randomThemes.length);
    themeInput.value = randomThemes[randomIndex];
    rollCount++;

    if (rollCount >= maxRolls) {
      clearInterval(interval);
      const finalIndex = Math.floor(Math.random() * randomThemes.length);
      themeInput.value = randomThemes[finalIndex];
    }
  }, rollSpeed);
});

// This will store the AI-generated story template
let storyTemplate = '';

function generateStoryFieldsFromText(story) {
  const form = document.getElementById('placeholder-form');
  form.innerHTML = '';

  const matches = [...story.matchAll(/{(.*?)}/g)];
  matches.forEach((match, index) => {
    const placeholder = match[1];
    const input = document.createElement('input');
    input.type = 'text';
    input.name = `placeholder-${index}`;
    input.placeholder = placeholder.charAt(0).toUpperCase() + placeholder.slice(1);;
    form.appendChild(input);
    form.appendChild(document.createElement('br'));
  });
}

function showFinalStory() {
  const inputs = document.querySelectorAll('#placeholder-form input');
  let finalStory = storyTemplate;

  inputs.forEach(input => {
    const coloredWord = wrapWithColor(input.value); // ← this line wraps the value with a random class
    finalStory = finalStory.replace(/{.*?}/, coloredWord);
  });

  document.getElementById('final-story').innerHTML = finalStory;
  showScreen('story-screen');
}

function restart() {
  showScreen('landing-screen');
}

window.addEventListener('DOMContentLoaded', () => {
  const splashEl = document.getElementById('splash-text');
  if (splashEl) splashEl.innerHTML = getRandomSplashPhrase();
  document.querySelector('button.land').addEventListener('click', showThemeInput);
  const loadingIndicator = document.getElementById('loading-indicator');

  document.querySelector('button.theme').addEventListener('click', async () => {
    loadingIndicator.classList.remove('hidden');
    const themeInputValue = document.querySelector('.input.theme').value.trim();
    if (!themeInputValue) return;

    try {
      const res = await fetch('http://localhost:3000/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ theme: themeInputValue })
      });

      const data = await res.json();

      if (data.story) {
        storyTemplate = data.story; // Save it globally for later replacement
        generateStoryFieldsFromText(storyTemplate);
        showScreen('choice-screen');
      } else {
        alert('Failed to generate story.');
      }
    } catch (err) {
      console.error(err);
      alert('Error contacting AI server.');
    }
    loadingIndicator.classList.add('hidden');
  });

  document.querySelector('button.choice').addEventListener('click', showFinalStory);
  document.querySelector('button.story').addEventListener('click', restart);
});