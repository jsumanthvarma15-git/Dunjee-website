# Dhanjiva site

Static marketing site for **Dhanjiva** and its first tool **Ekko** (Hospital Administration).

## Contents

- `index.html` — home (Hero → Our Tools → How it works → Inside Ekko → Manage/Analyse → Learn Ekko → CTA → FAQ → Footer)
- `get-ekko.html` — early-access / coming-soon form
- `404.html` — not found
- `assets/` — logo, favicons, module walkthrough videos
- `assets/modules/modules.json` — Learn Ekko gallery metadata
- `css/`, `js/` — styles and interactive scenes

## Local preview

```bash
cd /workspace/dhanjiva-site
python3 -m http.server 8080
# open http://localhost:8080
```

Or any static host (Netlify, Cloudflare Pages, S3+CloudFront, GitHub Pages).

## FormSubmit (get-ekko.html)

The form POSTs via FormSubmit AJAX to **dhanjiva.health@gmail.com**.

1. Submit once for real from the live domain (or FormSubmit’s activation email) so FormSubmit can confirm the inbox.
2. Check `dhanjiva.health@gmail.com` and click the activation link if prompted.
3. Fields: `_subject` = `New Ekko early-access request`, `_template` = `table`, `_captcha` = `false`, honeypot `_honey`.
4. Mailto fallback is offered if the network request fails.

## Module videos

Eleven Learn Ekko walkthroughs live in `assets/modules/` as web-optimised MP4s (H.264 Main, 1280px wide, CRF 30, AAC 64k mono voice track, `+faststart`), each with a poster JPG. `modules.json` lists them; the first lesson is preselected in the player and every lesson plays inline. Ekko itself is still marked coming soon (`"available": false`).

## Deploy

Upload the whole `dhanjiva-site/` folder (including `assets/modules/*.mp4`) to your static host. Point the domain at it. Keep `404.html` as the custom 404 if the host supports it.

## Contact

**dhanjiva.health@gmail.com**
