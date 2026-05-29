# soundaryaramesh.github.io — modern static site (dev)

A modern, framework-free HTML5/CSS reconstruction of Soundarya Ramesh's
academic site. This `dev` branch holds the new static site; the `master`
branch holds the original Jekyll (Hyde theme) site.

## Structure

```
index.html          Home — bio, awards, news timeline
publications.html   Publication list
blogs.html          Blog index
blog/               Individual posts (vim, privacy)
assets/             css / js / images
papers/             paper PDFs
cv.pdf              CV
404.html            Not-found page
```

## Run locally

No build step — it's static. From VS Code, use the **"Serve Modern Site +
open browser"** launch config, or from a terminal:

```bash
python3 -m http.server 4040
# then open http://localhost:4040
```
