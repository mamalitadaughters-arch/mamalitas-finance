# 🌸 Mama Lita's Family Finance Dashboard

A free, faith-inspired family finance tool for moms — budget tracking, savings goals, debt payoff, and an AI money coach.

---

## 🚀 How to Get This Live (Free — Two Options)

---

### ✅ OPTION A — Easiest: Deploy directly from Vercel (no GitHub needed)

1. Go to **https://vercel.com** and create a free account
2. From your Vercel dashboard, click **Add New Project**
3. Click **"Upload"** (you don't need GitHub for this option)
4. Unzip the `mamalitas-app.zip` file on your computer
5. Drag the entire unzipped `mamalitas-app` folder into Vercel's upload area
6. Click **Deploy**
7. In about 2 minutes you'll get a live link like:
   `https://mamalitas-finance.vercel.app`
8. Share that link anywhere — Instagram bio, newsletter, Facebook group

---

### ✅ OPTION B — Via GitHub (better for future updates)

**Step 1 — Create a GitHub account**
Go to https://github.com and sign up free.

**Step 2 — Create a new repository**
1. Click the **+** icon (top right corner) → **New repository**
2. Name it `mamalitas-finance`
3. Set visibility to **Public**
4. Click **Create repository**

**Step 3 — Upload your files**
1. On the repository page, look for the link that says **"uploading an existing file"** and click it
2. On your computer, open (don't drag) the unzipped `mamalitas-app` folder
3. Press **Cmd+A** (Mac) or **Ctrl+A** (Windows) to select everything inside
4. Drag the selected files into the GitHub upload box
5. ⚠️ Important: upload the FILES inside the folder, not the folder itself
6. Scroll down and click the green **Commit changes** button

**Step 4 — Deploy on Vercel**
1. Go to https://vercel.com and sign up with your GitHub account
2. Click **Add New Project**
3. Select your `mamalitas-finance` repository
4. Leave all settings as default — Vercel detects React automatically
5. Click **Deploy**
6. Your app will be live in about 2 minutes

---

## 🔧 Before You Deploy — Add Your Affiliate Links

Open the file `src/App.jsx` in any text editor (even Notepad).
Search for `#your-affiliate-link` — you'll find 5 of them.
Replace each one with your real affiliate URL from:
- Monarch Money affiliate program
- Your bank's referral program
- Acorns affiliate program
- Amazon Associates (for the book)
- Rocket Money affiliate program

---

## 📱 Embed on Your Website

Once deployed, paste this into any website that supports HTML code blocks
(Squarespace, Wix, WordPress, Carrd):

```html
<iframe src="YOUR-VERCEL-URL-HERE" width="100%" height="850px" frameborder="0"></iframe>
```

Replace `YOUR-VERCEL-URL-HERE` with your actual Vercel link.

---

## 📁 What Each File Does

```
mamalitas-app/
├── public/
│   └── index.html    ← The browser shell that loads the app
├── src/
│   ├── index.js      ← Starts the app (don't edit this)
│   └── App.jsx       ← THE DASHBOARD — all your content lives here
├── package.json      ← Tells Vercel what to install
├── vercel.json       ← Tells Vercel how to build it
└── README.md         ← This guide
```

---

## ❓ Need Help?

If you get stuck at any step, screenshot the error and bring it back to Claude.
The most common issue is accidentally uploading the folder instead of the files inside it.

---

Built with love for every mama managing the heart of her home. 🤍
