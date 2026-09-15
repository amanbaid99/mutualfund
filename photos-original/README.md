# Original photos

Full-resolution originals, kept out of `public/` so they are **not** published
to the website. Vite copies everything in `public/` to the deployed site, and
these three files total about 10 MB.

| File | Note |
| --- | --- |
| `Amanbaid-original.jpg` | 3340x4175, 6.1 MB. Source for the hero portrait. |
| `AmanBaid2.jpg` | Black and white, unused. |
| `Amanbaid3.jpg` | Beach, unused. |

`public/Amanbaid.jpg` (1200x1500, ~155 KB) and `public/Amanbaid-small.jpg`
(640x800, ~55 KB) are generated from `Amanbaid-original.jpg`, cropped to the
4:5 the hero expects.

To regenerate after replacing the original:

```bash
pip install pillow
python3 - <<'PY'
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open('photos-original/Amanbaid-original.jpg')).convert('RGB')
for name, size in {'Amanbaid.jpg': (1200, 1500), 'Amanbaid-small.jpg': (640, 800)}.items():
    out = ImageOps.fit(im, size, method=Image.LANCZOS, centering=(0.5, 0.35))
    out.save(f'public/{name}', 'JPEG', quality=82, optimize=True, progressive=True)
PY
```

Deleting this folder is safe if you have the originals elsewhere; the site
does not read from it.
