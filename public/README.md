# Drop your photo in this folder

Upload your portrait here and name it exactly **`Amanbaid.jpg`**, so the file
sits at `public/Amanbaid.jpg`. The hero picks it up automatically on the next
deploy. Until then the hero shows the ARN credential card instead, so nothing
looks broken.

## How to upload from GitHub in the browser

1. Open this folder: https://github.com/amanbaid99/mutualfund/tree/main/public
2. **Add file → Upload files**
3. Drag in your photo, renamed to `Amanbaid.jpg`
4. **Commit changes** to `main`

That push triggers a deploy on its own, so the photo is live in about a minute.

## What works best

- **Portrait orientation**, roughly 4:5. It is cropped to that ratio.
- **At least 800 x 1000 px** so it stays sharp on a retina screen.
- **Under ~500 KB.** Compress it at https://squoosh.app if it is larger,
  since every visitor downloads this file.
- **A plain, light background** matches the reference design. Head and
  shoulders, looking at the camera.

A `.jpg` is expected. To use a `.png` or `.webp` instead, change `photo` in
`src/config/site.ts` to match the filename.
