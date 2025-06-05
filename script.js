// Helper to show one screen and hide the others
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}
  
// Event handlers
function showThemeInput() {
    showScreen('theme-screen');
}

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
  
// Attach functions to buttons
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button.land').addEventListener('click', showThemeInput);
    document.querySelector('button.theme').addEventListener('click', () => {
      generateStoryFields();
      generateStory();
    });
    document.querySelector('button.choice').addEventListener('click', showFinalStory);
    document.querySelector('button.story').addEventListener('click', restart);
});
  