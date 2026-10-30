# Kaustubh Singh — Portfolio

A responsive, static portfolio built with semantic HTML, CSS, and vanilla JavaScript. The visual system uses the original black and electric-blue palette, with separate sustainability greens for `rebottled`.

## Run locally

From this directory:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Deploy to GitHub Pages

Keep `index.html`, `style.css`, `script.js`, `favicon.svg`, and `CNAME` together in the root of the repository configured for GitHub Pages. `README.md` is optional for the site to run. Commit and push the files. The stylesheet and favicon URLs include a version query to help browsers fetch the latest assets.

## Notes

- No build step or npm dependencies required.
- Uses Google Fonts when online; system sans-serif fallbacks remain available.
- Includes reduced-motion support, keyboard-focus styling, a mobile navigation menu, project filters, a short branded loader, and a custom cursor for fine-pointer devices.
- The 2048 project links to the GitHub profile because a specific repository URL was not verified in the supplied context. Replace it with the exact repository URL when ready.
