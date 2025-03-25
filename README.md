<p align="center">
  <img src="./assets/icons/128.png" alt="Logo"></img>
  <h1 align="center">YT Playback Calc.</h1>
</p>

### Tired of guessing how long a video will take at 1.5x speed or any other playback rate?

This simple extension shows you the actual video duration at any playback speed. See the duration of the video for different playback speed easily!

## 🌐 Tested Browsers:

<p align="center">
<img height="48" width="46" src="./assets/logos/Brave.png"/>
<img height="48" width="46" src="./assets/logos/Chrome.png"/>
<img height="48" width="46" src="./assets/logos/Edge.png"/>
<img height="48" width="46" src="./assets/logos/Firefox.png"/>
<img height="48" width="46" src="./assets/logos/LibreWolf.png"/>
<img height="48" width="46" src="./assets/logos/Zen.png"/>
</p>

> [!NOTE]  
> Theoretically it should work on any chromium / firefox forks. (mobile versions are not currently supported)

## 🌟 Features

- Supports Sponsorblock addon

## 🎥 Extension in Action:

<p align="center">
<img src="./assets/docs/example.webp">
<i>I had this topic on my exam. Read more below.</i>
</p>

## ⚡ Installation

### Firefox / Forks

1. Visit the [Official Firefox Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/yt-playback-calculator/)
2. Click "Add to Firefox"
3. Done!

### Chromium / Forks

1. Head over to [releases](https://github.com/kurtnettle/yt-pb-calc/releases/latest) and download the `yt-pb-calc-x.x.signed.crx` file.
2. On your browser, goto `chrome://extensions`
3. Enable Developer Mode (toggle in top-right or center-right for Edge)
4. Drag N Drop the crx file into the extension page.
5. Confirm installation when prompted.
6. Enjoy!

> [!TIP]
> **Why Different Methods?**
>
> 1. Firefox extensions can be published openly on [AMO](https://addons.mozilla.org)
> 2. Chrome requires paid developer accounts ($5 one-time fee)

## 💻 Development

**⚠️ The build system currently only supports Linux environments.**

### Prerequisites

Before you begin, ensure you have the followings:

- **Runtime**:

  1. [pnpm](https://pnpm.io/installation) (v10.6.5+)
  2. [Node.js](https://nodejs.org/) (v22.14.0 LTS+)

- **Signing**:
  1. A keypair for CRX signing. I used [this tool](https://itero.plasmo.com/tools/generate-keypairs) from plasmo.
  2. Add the generated **public key** to the `key` field in [chrome-manifest.json](./manifest/chrome-manifest.json)

### Build Process

1. Clone the repository:
   ```bash
   git clone https://github.com/kurtnettle/yt-pb-calc.git
   ```
2. Enter the directory:
   ```bash
   cd yt-pb-calc
   ```
3. Install the dependencies
   ```bash
   pnpm i
   ```
4. Make your changes to the source code. 💫

5. Build the extensions:
   ```bash
   chmod +x build.sh
   ./build.sh
   ```
   This will generate a `.xpi` and `.crx` file inside the `dist/` directory.

> [!IMPORTANT]
> **Chromium CRX**
>
> If you want auto-update then don't forget to fill the `update_url` field in the [chrome-manifest.json](./manifest/chrome-manifest.json)

### ❓ Why this extension?

You know, there's always one more tutorial video to watch, but never enough hours before the exam.

It's 1 AM before your exam. You've got three 30-minute tutorials left:

- At normal speed: 90 minutes total
- You need to sleep in 70 minutes
- At 1.5x speed... is that 60 minutes? 45?

Your tired brain struggles with the math while the clock keeps ticking.

> "Is this 60 minutes now? 45? Can I actually finish this and sleep?"

That's when I realized - in the crucial moments when every minute counts, we shouldn't waste mental
energy on speed calculations. This extension was born from that midnight circus.

I am also sorry for such dry extension name :) Couldn't find any better.

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the tool or fix bugs, feel free to submit a pull request. Please ensure your changes align with the project's coding standards and include appropriate tests.

## 📜 Attributions

Browser icons used in this README are from [Wikimedia Commons](https://commons.wikimedia.org)

_All icons are used under their respective licenses._

## 🙌 Acknowledgments

I am grateful to these amazing open-source projects:

- [Pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- [Rollup](https://rollupjs.org/) - JS module bundler
- [web-ext](https://github.com/mozilla/web-ext) - Firefox extension tooling
- [Jest](https://jestjs.io/) - Delightful JavaScript testing
- [XO](https://github.com/xojs/xo) - ESLint wrapper with great defaults
- [@types/chrome](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/chrome) - Chrome extension type definitions
- [@types/firefox-webext-browser](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/firefox-webext-browser) - Firefox-webext-browser type definitions

_And all their maintainers and contributors!_

## 📜 License

This project is licensed under the GPLv3 License. See the [LICENSE](./LICENSE) file for full details.

By contributing to this project, you agree that your contributions will be licensed under the GPLv3 License as well.
