# La Familia Adult Day Care Center — Website

A 6-page static website (no build step required) for La Familia Adult Day Care Center, built in a gold/yellow and green color scheme, using the same overall layout style as hillsideseniorcenter.com (top bar → sticky header/nav → hero → about → services → stats → testimonials → gallery preview → CTA → footer, plus dedicated inner pages).

## Pages

- `index.html` — Home
- `about.html` — About Us (story, mission/values, team)
- `services.html` — Services, daily schedule, FAQ
- `gallery.html` — Photo gallery with category filters + lightbox
- `testimonials.html` — Full testimonials
- `contact.html` — Contact form, info card, map placeholder

## How to preview

Just open `index.html` in a browser, or serve the folder locally, e.g.:

```
cd LaFamilia
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## What still needs to be filled in

Everything in **`[BRACKETS]`** across the site is placeholder text — search for it in each `.html` file and replace with real info:

- `[PHONE NUMBER]` and the matching `tel:+1XXXXXXXXXX` links
- `[STREET ADDRESS]`, `[CITY, STATE ZIP]`
- `[EMAIL ADDRESS]`
- `[Family Member Name]` / `[Staff Name]` in testimonials and the team section
- Hours of operation (currently set to Mon–Fri, 7 AM–6 PM as a placeholder)
- Payment/insurance info in the Services page FAQ
- Facebook/Instagram links (currently `#`)

## Adding your photos

Every photo spot on the site currently shows a gold/green "PHOTO COMING SOON" placeholder box (a `<div class="photo-placeholder">`). Once you send your pictures:

1. Drop the image files into the `images/` folder.
2. I'll swap each placeholder `<div class="photo-placeholder">...</div>` for an `<img src="images/your-photo.jpg" alt="...">` in the matching spot (hero, about section, gallery grid, team headshots, etc.).

Photo spots on the site, and roughly how many images are useful for each:
- Hero (home page) — 1 wide photo
- About section (home + about page) — 1–2 photos
- Team headshots (about page) — 1 per staff member
- Gallery page — as many as you'd like, organized into: Facility, Activities, Meals, Events
- Gallery preview (home page) — 4 highlight photos

## Notes

- The contact form currently shows a "message received" confirmation but doesn't send email yet — it needs to be connected to a form backend (e.g., Formspree, Netlify Forms, or a custom server) to actually deliver messages.
- The map on the Contact page is a placeholder — once you share the real address, it can be swapped for an embedded Google Map.
- Colors and fonts are defined as CSS variables at the top of `css/style.css` (`:root`), so the gold/green palette can be adjusted from one place.
