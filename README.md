# 🤖 Week 5 — AI Career Mentor
### 💬 React + Gemini API + Prompt Engineering

Welcome to **Week 5: AI Career Mentor** — where you'll build an interactive AI chatbot that helps students explore technology careers!  
You'll learn to integrate **Google's Gemini API** into a **React** application, design effective prompts, and deploy your mentor to the web. By the end, you'll have your own personalized AI career advisor running live.

---

## 📦 What's Inside

- `src/App.jsx` — main React component with chat interface
- `src/hooks/useGemini.js` — custom hook for Gemini API calls
- `src/prompts/basePrompt.js` — the default career mentor prompt
- `src/prompts/customPrompt.js` — your space to customize the AI's personality
- `.env.example` — template for your API key (create your own `.env` file)
- `package.json` — project dependencies and scripts

---

## 🚀 Quick Start

### 1️⃣ Open the Repository

1. Visit the class GitHub link:  
   ```
   https://github.com/The-Pritzker-Tech-Talent-Labs/DC_Fall-Week-5-AI-Mentor
   ```
   *(Update this URL with your actual repository link)*

2. **Fork this repo** (top-right button) and open in **GitHub Codespace**
   - Click the green **"Code"** button → select **Codespaces** tab → **"Create codespace on main"**
   - Wait for it to load (it'll look like VS Code in your browser)

---

### 2️⃣ Install Dependencies

**In your Codespace terminal, type:**
```bash
npm install
```

This installs React, Vite, and all the packages your app needs. Wait for it to finish (usually 30-60 seconds).

---

### 3️⃣ Get Your Gemini API Key

1. Go to **[https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. **Copy your API key** — you'll need it in the next step!

> 💡 *Tip:* Keep this key private! Never share it or commit it to GitHub.

---

### 4️⃣ Create Your `.env` File

1. In your Codespace, create a new file called `.env` in the root directory (same level as `package.json`)
2. Add this line (replace `your-key-here` with your actual API key):
   ```
   VITE_GEMINI_API_KEY=your-key-here
   ```
3. **Save the file**

> ⚠️ **Important:** The `.env` file is already listed in `.gitignore`, which means Git will **never commit it**. This keeps your API key safe! Never remove `.env` from `.gitignore`.

---

### 5️⃣ Run Your App

**In your Codespace terminal, type:**
```bash
npm run dev
```

After a few seconds, you'll see a URL like `http://localhost:5173`. Click it or open it in a new tab.

You should see your AI Career Mentor chat interface! Try asking it a question like:
- "What careers use React?"
- "I like art and coding. What should I explore?"

---

## 🧩 Mini Project — Talk to Your AI

**Goal:** Test the base mentor and understand how prompts shape AI responses.

1. **Open the chat interface** (if it's not already open from step 5)
2. **Ask the mentor questions** about careers, skills, or interests
3. **Observe the responses:**
   - What tone does it use?
   - How does it structure answers?
   - What careers does it suggest?
4. **Try different types of questions:**
   - Career exploration: "What can I do with data science?"
   - Skill connections: "I know HTML and CSS. What's next?"
   - Interest-based: "I love music and technology"

**Behind the scenes:** The mentor's personality and knowledge come from `/src/prompts/basePrompt.js`. This file contains all the instructions that tell the AI how to behave, what careers to mention, and how to respond to students.

---

## 🚀 Main Project — Customize Your Agent

**Goal:** Make the AI mentor your own by editing the prompt.

### Step 1: Open the Custom Prompt File

1. Navigate to `/src/prompts/customPrompt.js` in your Codespace
2. You'll see it's currently empty: `export const customPrompt = ``;`

### Step 2: Design Your Prompt

This is where you get creative! You can:

**Change the Tone:**
```javascript
export const customPrompt = `
You are a motivational tech coach who speaks like a friend.
Use emojis, short sentences, and lots of encouragement.
Always end with: "You've got this! 🚀"
`;
```

**Focus on Specific Interests:**
```javascript
export const customPrompt = `
You specialize in helping students who love art and design.
Connect every career suggestion to creative technology roles.
Mention tools like Figma, Adobe Creative Suite, and Three.js.
`;
```

**Add a Unique Personality:**
```javascript
export const customPrompt = `
You are a wise tech mentor who speaks like Yoda.
Share career wisdom in a playful, philosophical way.
Always connect technology to real-world impact.
`;
```

### Step 3: Test Your Custom Prompt

1. **Save** `customPrompt.js`
2. Check `src/App.jsx` — it should use `customPrompt` if it exists, otherwise fall back to `basePrompt`
3. **Refresh your browser** (or the app will auto-reload)
4. **Ask the same questions** and see how the responses change!

### Step 4: Iterate and Refine

- Try different styles and see what works
- Test with various questions
- Adjust the prompt until the AI feels like "yours"

**You've just done prompt engineering!** The words you choose directly shape how the AI responds.

---

## 💬 Discussion — Prompt & Context Engineering

Take a moment to reflect on what you've learned:

- **What changed when you edited your prompt?** Did the AI's personality, tone, or focus shift?
- **How do context and wording shape AI responses?** Why does "motivational coach" sound different than "technical advisor"?
- **Why is clarity important when working with AI?** What happens if your prompt is vague or contradictory?

**Real-world connection:** Professional prompt engineers spend hours crafting instructions for AI systems. The better your prompt, the better your AI assistant!

---

## 🌐 Deploy & Share

### Step 1: Commit Your Safe Files

**Important:** Make sure your `.env` file is **NOT** in your commits!

1. Check what you're about to commit:
   ```bash
   git status
   ```
2. You should **NOT** see `.env` in the list (it's in `.gitignore`)
3. If `.env` appears, **DO NOT commit it!** Check your `.gitignore` file.

**Commit your changes:**
```bash
git add .
git commit -m "Complete AI Career Mentor with custom prompt"
git push
```

### Step 2: Deploy to Vercel

1. Go to **[https://vercel.com](https://vercel.com)** and sign in with GitHub
2. Click **"Add New Project"**
3. Import your repository
4. **Before deploying, add your environment variable:**
   - Click **"Environment Variables"**
   - Add: `VITE_GEMINI_API_KEY` = `your-actual-api-key`
   - Click **"Save"**
5. Click **"Deploy"**
6. Wait ~30 seconds for your site to go live
7. **Copy your live URL** — you'll need it for your portfolio!

> 💡 *Note:* Vercel needs the API key as an environment variable because `.env` files aren't deployed. This keeps your key secure while making your app work live.

---

## 🧱 Add Your Week 5 Project to Your Portfolio

You now have another live project 🎉

Add a new project card to the portfolio page you created in Week 1.

Open your Week 1 repo and find `index.html`.

Duplicate one of your existing cards and update the details:

```html
<h1 class="text-2xl font-bold text-purple-600">AI Career Mentor</h1>
<p class="mt-2 text-gray-600">Week 5 Project — React + Gemini API + Prompt Engineering</p>
<a
  href="https://YOUR-VERCEL-URL.vercel.app"
  target="_blank"
  class="mt-4 inline-block rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
>
  View Project
</a>
```

---

## ✅ Submission Checklist

- [ ] App runs locally with `npm run dev`
- [ ] Gemini API key works and responses appear in chat
- [ ] `.env` file exists and is **NOT** committed to GitHub
- [ ] Custom prompt is created and tested in `customPrompt.js`
- [ ] Changes are committed and pushed to GitHub
- [ ] Site is deployed on Vercel with environment variable set
- [ ] Live Vercel URL works and chat functions correctly
- [ ] Portfolio page updated with Week 5 project card

---

## 🔗 Helpful References

**Gemini API**
- [Google AI Studio](https://makersuite.google.com/app/apikey) — get your API key
- [Gemini API Documentation](https://ai.google.dev/docs) — learn more about the API

**React & Vite**
- [React Documentation](https://react.dev/) — learn React basics
- [Vite Documentation](https://vitejs.dev/) — understand the build tool

**Prompt Engineering**
- [Prompt Engineering Guide](https://www.promptingguide.ai/) — best practices for writing prompts
- [OpenAI Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering) — concepts apply to all AI models

**Deployment**
- [Vercel Documentation](https://vercel.com/docs) — deploying React apps
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables) — managing secrets

---

## 🛠️ Troubleshooting

### "API key not found" error
- Make sure your `.env` file is in the root directory (same level as `package.json`)
- Check that the variable name is exactly: `VITE_GEMINI_API_KEY`
- Restart your dev server after creating/editing `.env`
- On Vercel, verify the environment variable is set correctly

### App won't start
- Make sure you ran `npm install` first
- Check for error messages in the terminal
- Try deleting `node_modules` and running `npm install` again

### Chat not responding
- Check browser console (F12 → Console) for errors
- Verify your API key is valid at [makersuite.google.com](https://makersuite.google.com/app/apikey)
- Make sure you're not hitting API rate limits (free tier has limits)

### Custom prompt not working
- Check that `customPrompt.js` exports a string (not empty)
- Verify `App.jsx` is importing and using `customPrompt`
- Refresh your browser after saving changes

### `.env` file showing in Git
- Check that `.env` is listed in `.gitignore`
- If you accidentally committed it, remove it: `git rm --cached .env`
- **Important:** If your key was exposed, generate a new one immediately!

---

## 🧑‍🤝‍🧑 Pair Programming Tips

- **Driver:** types the code and edits prompts
- **Navigator:** reads instructions, tests the chat, suggests prompt improvements
- Switch every 5–7 minutes
- Test prompts together — one person writes, the other tests
- Discuss: "What makes a good prompt?" and "How can we make the AI more helpful?"

---

## 🤖 AI Assist Prompts

If you get stuck, try asking AI assistants:

- "How do I set up environment variables in Vercel?"
- "My Gemini API call isn't working. Here's my code: `[paste code]`"
- "Explain what this React hook does: `useGemini`"
- "How can I make my AI prompt more engaging?"
- "Why isn't my `.env` file working in Vite?"

> Always **test** AI suggestions one step at a time and make sure you understand what the code does.

---

**🌟 Next Steps:** Try adding more features — save chat history, add multiple AI personas, or create a prompt library!

---

###### 🧑‍🏫 Credits  
###### Developed for the **DPI Discover Computing Program**  
###### Curriculum by Aaron Douglas LLC
