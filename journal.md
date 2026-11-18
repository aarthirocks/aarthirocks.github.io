# Portfolio Website Revamp — Engineering Journal

This journal logs every meaningful action taken to recode and strengthen
[www.aarthirocks.com](https://www.aarthirocks.com) — Aarthi Anbalagan's personal
portfolio — along with the reasoning behind each decision.

**Owner:** Aarthi Anbalagan — Senior Software Engineer, Microsoft
**Branch:** `aarthian-microsoft-portfolio-website-revamp`
**Goal:** Rebuild the site as a professional portfolio, preserving existing
work samples and adding selected career highlights from the supplied résumé.

---

## Session start — context gathering

### 1. Explored the existing repository
- **What:** Read `index.html` (628 lines), inspected `CNAME` (`www.aarthirocks.com`),
  listed the `img/`, `img/aarthianbalagan/`, and `images/` folders.
- **Why:** To understand the current site's structure, content, dependencies, and
  available image assets before rebuilding — so I preserve every piece of content.
- **Findings:**
  - The legacy site is a **Bootstrap 3 + jQuery** single-page template
    ("Steve" style) with sections: Home (parallax), About Me, Skills, What I can do,
    Fun Facts counters, Side Projects grid, Recognitions, Follow Me, Contact, Blog.
  - It loads several **outdated / broken dependencies**: Visual Website Optimizer,
    `http://` Google Fonts (mixed-content), Google Maps JS with `sensor=true`
    (deprecated), `html5shim.googlecode.com` (dead), and Bootstrap 3.
  - The navbar links to `main.html` (which does not exist) for the brand logo.
  - Content is valuable and must be kept: full biography, skills, recognitions,
    side projects, community work, and article links.

### 2. Reviewed the supplied résumé
- **What:** Read the attached 4-page resume.
- **Why:** The resume contains far richer, more current content than the live site
  (detailed work history at Microsoft, GE Healthcare, Nokia; Brown University
  research/teaching; publications; professional memberships; certifications;
  achievements). The user asked to strengthen the site using this content.
- **Decision:** Merge resume content into the new site as first-class sections:
  a detailed **Experience timeline**, **Publications**, **Memberships**,
  **Certifications**, and an expanded **Achievements** section.

### 3. Evaluated photos
- **What:** Viewed `img/aarthianbalagan/Headshot.png` and `aarthi-profile2.JPG`.
- **Why:** The user asked whether a new picture is needed.
- **Decision:** `Headshot.png` is a clean, well-lit, professional headshot with a
  neutral background — ideal for the hero. `aarthi-profile2.JPG` has a busy
  cartoon background and is not suitable for a professional site. **Recommendation
  to user:** the existing `Headshot.png` works great; an optional upgrade would be
  a high-resolution professional headshot (square, 800×800+, neutral/office
  background) and a wider "speaking on stage" photo for the About section.

---

## Build phase

### 4. Backed up the legacy site
- **What:** Copied `index.html` → `index_legacy.html`.
- **Why:** Guarantee zero content loss and provide a rollback reference, honoring
  the "do not remove any content" requirement.

### 5. Created this journal (`journal.md`)
- **What:** Added a running engineering journal.
- **Why:** Explicitly requested — logs every action and the reasoning behind it.

### 6. Built the modern design system (`css/modern-style.css`)
- **What:** ~700-line self-contained CSS with design tokens (navy + teal palette),
  typography (Sora + Inter), a fixed glassmorphic navbar, an immersive hero, stat
  strip, sticky-media About, expertise cards, an experience timeline, skill chips
  + animated proficiency bars, publication/award/membership/certificate grids, a
  filterable project gallery, community cards, an article list, a contact card, a
  footer, scroll-reveal animations, a back-to-top button, and full responsive
  breakpoints (≤980px, ≤860px, ≤560px).
- **Why:** The legacy Bootstrap 3 look was dated. A bespoke design system gives a
  premium, senior-engineer feel and removes fragile/broken dependencies.

### 7. Recoded `index.html` (single-page portfolio)
- **What:** Replaced the legacy markup with a modern, semantic, accessible page that
  merges **all** legacy content **and** the full résumé:
  hero → stats → about (full bio) → expertise → **experience timeline** (Microsoft ×3,
  Brown TA + RA, GE Healthcare, Nokia) → **education** → skills → **publications** →
  projects (filterable, original links preserved) → recognitions + highlights →
  **memberships + certifications** → **community** → articles → contact → footer.
- **Why:** Strengthen and professionalize the site without losing any content, and
  surface the far richer résumé material the old site never showed.
- **Notes / decisions:**
  - Kept Google Analytics (`G-WJRBSXJ6G1`) and the CNAME (`www.aarthirocks.com`).
  - Removed only broken/obsolete third-party scripts (Visual Website Optimizer,
    dead `html5shim`, deprecated Google Maps `sensor=true`, mixed-content `http://`
    fonts). No **content** was removed — the legacy page is preserved as
    `index_legacy.html`.
  - Added SEO: meta description/keywords, Open Graph + Twitter cards, canonical URL,
    and JSON-LD `Person` structured data.
  - Fixed the legacy dead `main.html` brand link (now anchors to `#home`).
  - Preserved all six project cards and their original destination links.

### 8. Added interactions (`js/main.js`)
- **What:** Vanilla JS (no jQuery): navbar scroll state, mobile hamburger menu,
  scroll-spy active links, IntersectionObserver scroll-reveal, animated skill bars,
  project category filtering, and smooth back-to-top.
- **Why:** Replace the heavy legacy jQuery plugin stack with lightweight, dependency-free,
  reduced-motion-aware behavior.

### 9. Tested locally with Playwright + a static server
- **What:** Served the site on `127.0.0.1:8891`, then drove headless Chromium to
  capture desktop/tablet/mobile screenshots, verify **0 console/page errors**,
  confirm **0 broken images**, exercise the project filter (AI & ML → shows only the
  AI/ML card), and open the mobile menu.
- **Why:** The user explicitly asked me to test it myself. Visual + functional
  verification across breakpoints.
- **Findings & fixes:**
  - Skill-section sub-headings ("Cloud & Data Platforms", etc.) were dark-on-dark on
    the navy background → added `.section--navy .skill-block h4 { color:#fff }` (and
    teal icons). Re-verified — now clearly legible.
  - All 71 scroll-reveal elements trigger; every section renders full content.

### 10. Photo recommendation (answering the user's question)
- The existing `img/aarthianbalagan/Headshot.png` is professional and is used as the
  hero portrait; `aarthi-profile.png` is used in the About section. **No new photo is
  required.** Optional future upgrade: a high-res (800×800+) neutral-background
  headshot and a wide "speaking on stage" shot would elevate the hero and About further.

### 11. Finalization
- Updated todos, stopped the local server, and committed the rebuild.

### 12. Updated the title and copyright year
- **What:** (a) Updated footer copyright from `2018–2025` to `2018–2026`; (b) changed
  the professional title to **"Senior Software Engineer & Tech Lead"** in the page
  title, Open Graph title, hero badge, footer description, and JSON-LD `jobTitle`.
- **Why:** The title reflects the technical leadership described in the existing
  About section. Verified that the longer badge fits on one line at desktop width.

### 13. Added a career highlights section
- **What:** Added a dedicated section with themed cards, source links, and
  navigation links. See entry 15 for the subsequent rewrite.
- **Why:** Make notable career milestones easier to scan.
- **Fix:** Adding a 9th nav item overflowed the top bar. Tightened nav link
  spacing/size with `white-space: nowrap`, and moved the mobile-menu collapse
  breakpoint to ≤1080px (grids still collapse at their own breakpoints). Verified
  across 1600/1440/1280/1120/1080/1000/390px — no overflow at any width, links show
  ≥1120px, hamburger below. 0 console errors, 0 broken images.

### 14. Resolved stale-preview confusion
- **What:** User reported still seeing "© 2018–2025". Verified the on-disk file was
  already correct (`© 2018–2026`, line 920) and committed; the browser canvas was
  showing a cached copy because the local preview server had been stopped after the
  commits. Restarted the server, confirmed it serves the updated HTML, and reloaded
  the canvas with a cache-busting query (`?v=2026`). Screenshot confirms the footer
  now reads "© 2018–2026 Aarthi Anbalagan" and the brand line shows "Senior Software
  Engineer & Tech Lead @ Microsoft."
- **Why:** No code was wrong — this was purely a stale in-browser cache from a
  stopped server. Documented so the root cause is clear.

### 15. Professional reframe + title correction (user request)
- **What:** Corrected the title separator to a comma — now
  "Senior Software Engineer, Tech Lead @ Microsoft" (page title, OG title, hero badge,
  footer, JSON-LD). Reworked the highlights as "Distinctions & impact" with themed
  cards, icons, and matching navigation. Removed the earlier qualification language.
- **Why:** Keep the page focused on professional work, recognition, and mentorship.
- **Verified:** Playwright confirmed the updated badge, no console errors, and no
  broken images.

### 16. Content trims & privacy (user request)
- **Removed the telecommunications origin sentence** from the About bio (started the
  GE Healthcare paragraph directly with "At GE Healthcare, ...").
- **Removed the Publications entirely** (user not comfortable sharing): deleted the
  Selected Publications section, its nav + footer links, the "peer-reviewed
  publications" bullet in the distinctions card, and the "4 peer-reviewed
  publications" mention in the About highlights.
- **Renamed "Judging & mentorship" → "Mentoring"** (icon → hands-holding-child);
  kept ADPList + hackathon advisory/judging and mentoring of junior engineers.
- **Moved the FY26 Copilot Champs Presenter Hall of Fame** into Awards & Honors.
- **Removed the professional memberships sections** at the user's request:
  deleted the "Fellowships & memberships" distinctions card and the dedicated
  memberships grid (IEEE/BCS/RSA/IOASD). The section is now just **Certifications**.
- **Removed the public email address** (privacy): dropped the mailto icon in the hero,
  changed the contact "Email me" button to "Connect on LinkedIn", and removed the
  Email row from the contact card (LinkedIn is now the primary channel). No mailto:
  links remain anywhere.
- **Result:** Distinctions now has 5 clean cards (Awards, Media, Mentoring, Signature
  contributions, Leadership at scale). Nav trimmed to 8 links.
- **Verified (Playwright):** 0 email, 0 mailto, 0 "publications", 0 "telecommunications"
  in the DOM; 8 nav links; 5 distinction cards; 0 console errors; 0 broken images.

### 17. Refocused the profile on cloud and AI engineering
- Removed the floating labels from the hero portrait. Replaced the About photo
  with an optimized crop of the supplied Microsoft speaking photo. The crop
  excludes the projected screen, attendee thumbnails, and other people.
- Updated the opening copy, expertise cards, and experience timeline to put
  cloud infrastructure, observability, and applied AI ahead of adoption work.
  Added the current Azure Storage team and Azure Core Impact Award using facts
  the owner supplied; WorkIQ required sign-in and the shared CV was not accessible.
  No new project-specific claims were added from those sources.
- Confirmed the college's affiliation and the notable alumna listing on page 7
  of its 2026 brochure. Linked the listing and the supplied Fabric community
  badges and ADPList certificate; allowed longer labels to wrap on narrow screens.
- Removed leftover qualification language from this journal and replaced the
  private email link in both browsable legacy homepages with LinkedIn.
- Checked the local preview at 320, 390, 820, and 1440 pixels. Both photos
  loaded, the longer links stayed inside their cards, and mobile navigation
  still worked. Confirmed the Fabric badges link prompts for Microsoft sign-in.

### 18. Distinguished the three agentic engineering workstreams
- Listed AI Champs (lead), AI Learning Champs (co-lead), and Project Zerotoil
  (key contributor) in About and added a linked breakdown in the Microsoft
  experience entry. Kept cloud infrastructure and observability in their own
  subsection so the current role reflects both areas of work.
- Used the owner's role descriptions to correct the earlier wording about AI
  Learning Champs. The 2026 CV was not available to review, so no additional
  project claims were drawn from it.

### 19. Added highlights from the supplied 2026 CV
- Replaced the About speaking photo with the supplied portrait, resized for
  the web and saved without the original photo metadata. Kept the hero image.
- Used the attached CV text to expand the three agentic engineering
  workstreams, describe partner analytics and data availability monitoring,
  add the GE Digital internship, and refine the award and experience dates.
  Kept the event totals at the program level. Left out the personal email,
  scholarly publication list, compensation, internal records, and proposals.
