# Norris Brewing Co.

A static GitHub Pages launch website for Norris Brewing Co., a Canadian non-alcoholic beer brand built around three clear opening products:

- Norris Lager
- Norris Pale Ale
- Norris West Coast IPA

Confirmed nutrition profile used across the launch site:

- 60 calories
- 3g carbs
- 1g sugar

## Site structure

- `index.html` — homepage with launch story, product lineup, cinematic scroll section, and CTA
- `lager.html` — product page for Norris Lager
- `pale-ale.html` — product page for Norris Pale Ale
- `west-coast-ipa.html` — product page for West Coast IPA
- `story.html` — founder/category story
- `wholesale.html` — retailer, restaurant, venue, and buyer pitch
- `contact.html` — launch list and inquiry page
- `assets/css/style.css` — full responsive design system
- `assets/css/nutrition.css` — nutrition highlight components
- `assets/css/motion.css` — premium scroll-cinema and motion styling
- `assets/js/main.js` — mobile nav, reveal animations, and email-form handling
- `assets/js/motion.js` — scroll-linked cinematic motion engine
- `assets/img/` — logo, can concept SVGs, pub scene, and mountain scene

## Motion system

The homepage includes a sticky scroll-cinema section where pub and mountain scenes move toward the can while a masked scene layer appears inside the can. The motion uses lightweight vanilla JavaScript and CSS variables so the site remains GitHub Pages friendly.

## GitHub Pages

In GitHub, go to:

`Settings → Pages → Build and deployment → Source → Deploy from a branch`

Then choose:

`main` branch and `/root` folder.

The site will publish from `index.html`.

## Notes

The product pages still avoid unconfirmed production, ingredient, ABV, and packaging claims until final liquid details are confirmed.
