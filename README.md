# Sutikshan Upman - Portfolio

**Live site:** https://sutikshanupman.github.io/Portfolio/

Personal portfolio featuring my education, skills, experience, and projects.

Built with HTML, CSS, Bootstrap 5, and TypeScript.

## Run locally

Use Node.js 22 or later. From the project folder, run the following commands.

```sh
npm ci
npm run build
python -m http.server 8081 --bind 127.0.0.1
```

Open http://127.0.0.1:8081. Edit `index.html` for content, `style.css` for styling, and `script.ts` for behavior. Run `npm run build` after TypeScript changes, or use `npm run watch` while editing. The generated `script.js` is included for static hosting.

Run `npm run check` before committing. It builds TypeScript and checks local assets, navigation anchors, four project cards, and README source links. GitHub Actions runs the same check on pushes and pull requests.

## Projects

Four projects selected from both resumes. The internship's Lead Intelligence & Auto-Quote System belongs in Experience.

| Project | Focus and contribution | Links |
| --- | --- | --- |
| Resolv | Multilingual entity resolution using LightGBM and transformer retrieval. Built with a team of four for the Amazon ML Challenge 2026; ranked 471 of 32,000 teams. | [Source](https://github.com/rajveer1421/resolv-) |
| Chest X-ray Pneumonia Detection | Full-stack model comparison with Next.js, Express, FastAPI, and TensorFlow. Includes scan history and Grad-CAM visualizations; fine-tuned MobileNetV2 achieved 86.22% accuracy and 99.49% pneumonia recall on the reported test set. | [Source](https://github.com/SutikshanUpman/Chest-Xray-Pneumonia-Detection) |
| RecruiterEye | FastAPI service that reviews GitHub profiles against job descriptions using TF-IDF ranking and selective LLM code review. | [Source](https://github.com/SutikshanUpman/RecruiterEye) |
| MediGuard-AI | OpenEnv ICU triage environment built with a team of three using Python, PyTorch, Docker, and Gradio. Uses reward shaping and a confidence-gated fallback to reduce alarm fatigue. | [Source](https://github.com/SutikshanUpman/MediGuard-AI) / [Demo](https://huggingface.co/spaces/SutikshanUpman/MediGuard-AI) |

## Phase 1 - Foundation

- [x] Standalone HTML, CSS, Bootstrap, and TypeScript portfolio with local build instructions.
- [x] Remove copied coursework files and ignore local resume PDFs.
- [x] Review both resumes and select the four projects above.

## Phase 2 - Content, space, and motion

1. [x] Present four resume projects in a two-column grid; separate internship experience and credit team contributions.
2. [x] Create a spacious, Google-inspired interface with clear typography, responsive navigation, and keyboard access.
3. [x] Add lightweight entrance, scroll, hover, and navigation animations with reduced-motion support.

## Phase 3 - Release preparation

1. [x] Add search/share metadata and a small local favicon.
2. [x] Add a simple build/link check and GitHub Actions validation.
3. [x] Verify the release, document remaining browser checks, and finish the hosting handoff.

## Phase 4 - Go live on GitHub Pages

Use [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) for this static portfolio. It serves HTML, CSS, and JavaScript directly; there is no application process to restart. Project backends are separate deployments. The existing MediGuard-AI demo link still points to Hugging Face.

1. [x] Check portfolio workflow passed; enabled GitHub Pages from `main` and `/ (root)`.
2. [x] Verified the public HTTPS URL and added its canonical URL and `og:url` to `index.html`.
3. [ ] Check the public site at desktop and mobile widths: navigation, keyboard focus, reduced motion, all four project links, and the demo. Confirm resume PDFs remain excluded.

## Verification

- Local TypeScript build, assets, fragment links, unique IDs, four project cards, and matching README source links passed.
- Footer year, one-time scroll reveals, reduced-motion handling, and mobile-menu close behavior passed script checks.
- The page and all five local assets returned HTTP 200. Resume PDFs remain ignored and untracked.
- Visual desktop/mobile and real keyboard checks remain for Phase 4: browser automation could not verify the current browser URL in this session. Source checks do not replace visual review.
- GitHub Actions validation passed before Pages was enabled: [successful check](https://github.com/SutikshanUpman/Portfolio/actions/runs/43840712109).
