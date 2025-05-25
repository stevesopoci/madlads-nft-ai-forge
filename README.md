# 🔥 Mad Lads AI Forge 🔥

An AI-powered mobile app built with React Native + Expo that brings your favorite [**Mad Lads**](https://www.tensor.trade/trade/madlads) to life through text-to-video & image-to-video generation using [Replicate's](https://replicate.com/) cutting-edge models.

![MadLadsAIForgeDemo](https://github.com/user-attachments/assets/15cf860a-bc42-4a40-996c-b928ad72ea4f)

---

## ✨ Features

- 🔁 Auto-looping HD video playback with native controls
- 🧠 Powered by Replicate AI models
- ⌨️ Submit prompt with keyboard (no button needed)
- 📱 Mobile-optimized interface using Expo + React Native
- 📦 Modular, commented codebase with logic & styles extracted

---

## ⚙️ How It Works

1. Enter a Mad Lads ID (e.g. `1234`)
2. Enter a prompt (e.g. `"laughing with red laser eyes"`)
3. Your selected Mad Lads image is sent to Replicate
4. The app polls the API and returns the final animated video
5. The video is displayed in the app with native controls and looping

---

## 🧪 Feature Roadmap (Planned / In Progress)

The following are ideas for future improvements or community contributions:

- 📱 Share creations to X, LinkedIn, TikTok, YouTube, Discord, Telegram, and more
- 🎙️ Voice input for hands-free prompt generation
- 🎥 Audio-enabled video generation via models like [**Veo 3**](https://deepmind.google/models/veo/) — truly bring scenes to life
- 🧩 Model switching between Replicate and non-Replicate AI models (open/private)
- 🔎 Filter Mad Lads by specific traits
- 🧠 Dynamic prompt enhancements using GPT to auto-improve ideas
- 🖼️ AI image generation with inpainting and style options
- 📤 Export & download videos and images in multiple formats
- 🎛️ Ingredients mode — upload supporting media (audio, images, etc.) to enrich output
- 📜 Scroll through the full Mad Lads collection
- 💾 Save & load favorite prompts
- 🖥️ Full-screen playback for cinematic viewing
- ☁️ Backend optionality for secure API proxying

---

## 🛠️ Tech Stack

- **React Native + Expo**  
- **TypeScript**  
- **Replicate API** – for AI video generation  
- **Expo AV** – for native video playback  
- **Clean architecture** – modular logic and UI separation  
- **No backend required**

---

## 🔐 Replicate API Key

To run this app, you need a [Replicate API token](https://replicate.com/account/api-tokens).

In `/utils/generateVideo.ts`, replace:

```ts
Authorization: "Bearer YOUR_REPLICATE_API_KEY"
```
> ⚠️ **API Key Notice**  
> Never commit your API key to version control.  
> Consider using environment variables or secrets in a secure backend for production use.

---

## 🤝 Acknowledgements

- [**Backpack**](https://github.com/backpack-exchange) & [**Coral**](https://github.com/coral-xyz) — for the ecosystem & inspiration  
- [**Replicate**](https://github.com/replicate) — for incredible developer tools  

---

## 🪪 License

MIT — feel free to fork and build on this for fun, for education, or even for production.
