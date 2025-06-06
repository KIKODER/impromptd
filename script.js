function showScreen(id) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

function showThemeInput() {
    showScreen('theme-screen');
}

const randomThemes = [
  "A murder mystery at a frat party",
  "A thriller about rabid animals taking over Earth",
  "A heist where middle schoolers go rob a bank",
  "An adventure with expeditioners setting sail to go fight a large woman",
  "A thriller where a giant rat terrorizes a coastal town's beach",
  "A romcom about two rival gay baristas in Queens, New York",
  "A courtroom drama between two blind lawyers",
  "A musical set in Skid Row"
];

const themeInput = document.getElementById("theme-input");
const randomizeBtn = document.getElementById("randomize-btn");

randomizeBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * randomThemes.length);
  themeInput.value = randomThemes[randomIndex];
});

function generateStoryFields() {
    const story = `
      One bright sunny afternoon, a {noun} decided to walk in the park. 
      They loved to {verb} and {verb} all {time of day} while it was nice outside. 
      When they got to the park, they saw a {adjective} {noun}. 
      They felt {emotion}. The end.
    `;
  
    const form = document.getElementById('placeholder-form');
    form.innerHTML = ''; // Clear previous inputs
  
    const matches = [...story.matchAll(/{(.*?)}/g)];
    matches.forEach((match, index) => {
      const placeholder = match[1];
      const input = document.createElement('input');
      input.type = 'text';
      input.name = `placeholder-${index}`;
      input.placeholder = `Enter a ${placeholder}`;
      form.appendChild(input);
      form.appendChild(document.createElement('br'));
    });
}

function generateStory() {
    showScreen('choice-screen');
}
  
function showFinalStory() {
    const inputs = document.querySelectorAll('#placeholder-form input');
    let storyTemplate = `
      One bright sunny afternoon, a {noun} decided to walk in the park. 
      They loved to {verb} and {verb} all {time of day} while it was nice outside. 
      When they got to the park, they saw a {adjective} {noun}. 
      They felt {emotion}. The end.
    `;
  
    inputs.forEach(input => {
      storyTemplate = storyTemplate.replace(/{.*?}/, input.value);
    });
  
    document.getElementById('final-story').innerText = storyTemplate;
    showScreen('story-screen');
}
  
function restart() {
    showScreen('landing-screen');
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button.land').addEventListener('click', showThemeInput);
    document.querySelector('button.theme').addEventListener('click', () => {
      generateStoryFields();
      generateStory();
    });
    document.querySelector('button.choice').addEventListener('click', showFinalStory);
    document.querySelector('button.story').addEventListener('click', restart);
});
  