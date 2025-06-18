
![Logo](https://github.com/KIKODER/impromptd/blob/main/assets/Title-dark.png?raw=true)


# Imprompt'd

**Imprompt'd** is a fun, AI-powered web app that generates unique stories based on the user's provided prompt, in the style of classic Mad Libs. Built with HTML, CSS, JavaScript, and the OpenAI API, the app walks users through a short process that culminates in a custom-generated story using their word choices.



## Screenshots

**Landing Screen:**
![App Screenshot](https://github.com/KIKODER/impromptd/blob/main/assets/impromptdlanding.png?raw=true)
**Theme Input Screen:**
![App Screenshot](https://github.com/KIKODER/impromptd/blob/main/assets/themescreen2.png?raw=true)
**Story Screen:**
![App Screenshot](https://github.com/KIKODER/impromptd/blob/main/assets/storyscreen.png?raw=true)


## Features

- Dynamic AI-generated stories using user input
- Interactive fill-in-the-blank interface
- Responsive design for all screens
- Light/dark mode toggle
- Custom animated branding and subtle logo animation
- Styled placeholder words in generated stories using theme colors
- Play again functionality for replayability
- Loading feedback while the AI generates content
- Fully accessible keyboard navigation and clean UI

## Tech Stack

**Client:** HTML, CSS, JavaScript (Vanilla), OpenAI API

**Server:** Node.js, Express, dotenv
## Setup

Clone the repository

```bash
  git clone https://github.com/kikoder/impromptd.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Create a .env file in the root directory and include your OpenAI API key

```ini
  OPENAI_API_KEY=your_api_key_here
```

Start the server

```bash
  npm run start
```

Open the browser and navigate to:

```arduino
  http://localhost:3000
```

## FAQ

### What is Imprompt'd?
Imprompt'd is a single-player web game that generates custom Mad Libs-style stories using AI. Users fill in various word types (like adjectives and nouns), and the AI crafts a unique story based on their inputs.

### How does it work?
The app uses HTML, CSS, and JavaScript on the front end, and a Node.js/Express server on the back end. It connects to the OpenAI API to generate stories dynamically based on user-supplied words.

### Do I need an OpenAI API key to run this?
Yes. To run the project locally, you’ll need to create a `.env` file in the root directory with your own `OPENAI_API_KEY`.

### Can this app be used by multiple users at the same time?
Currently, the app is designed for a single user experience per session. Multiplayer or shared usage is not supported yet.

### Why is the project called "Imprompt'd"?
Based on the word "impromptu", meaning "-done without being planned, organized, or rehearsed." I wanted to incorporate a word that properly describes the unique, spontaneous nature of this project.

### How can I contribute?
Message me and let's talk!


## Authors

- [@KIKODER](https://www.github.com/KIKODER)

