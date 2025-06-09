function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
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
  document.getElementById('youtube-icon').src = isDark ? 'YTDark.png' : 'YTLite.png';
  document.getElementById('github-icon').src = isDark ? 'GithubDark.png' : 'GithubLite.png';
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
    finalStory = finalStory.replace(/{.*?}/, input.value);
  });

  document.getElementById('final-story').innerText = finalStory;
  showScreen('story-screen');
}

function restart() {
  showScreen('landing-screen');
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('button.land').addEventListener('click', showThemeInput);

  document.querySelector('button.theme').addEventListener('click', async () => {
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
  });

  document.querySelector('button.choice').addEventListener('click', showFinalStory);
  document.querySelector('button.story').addEventListener('click', restart);
});