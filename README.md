# Atul Shukla

Personal site at [atulshukla.me](https://atulshukla.me/), served as a static GitHub Pages site. No build step or external fonts are required. A small browser script handles the inline product demo and on-demand music players; the profile and links work without it. Microsoft Clarity analytics loads asynchronously from the snippet in `index.html`, using project ID `yv2yy4ppe8` supplied by Atul.

## Preview locally

From the repository root:

```sh
python3 -m http.server 8877 --bind 127.0.0.1
```

Open `http://127.0.0.1:8877/` and refresh after editing.

## Publish asset changes

Before committing changes to the stylesheet or browser script, update the content-based versions in `index.html`:

```sh
python3 scripts/version_assets.py
python3 scripts/version_assets.py --check
```

The URLs change when the files change, so returning visitors request the matching assets rather than reuse the previous deployment's cached CSS or JavaScript. The check exits unsuccessfully if either version is stale. This keeps the site static and requires no dependency installation or build service.

## Content and assets

The page gives product and engineering leadership equal weight, supported by selected product work, engineering experience and the founder's creative background. Business metrics are deliberately omitted from this public profile.

- `index.html` holds the profile, links and sharing metadata.
- `css/style.css` owns the responsive layout, keyboard focus and reduced-motion styling.
- `js/site.js` loads the YouTube demo on demand. Music tiles open one player in a native dialog; closing it removes the iframe and returns focus to the invoking link. Escape works from the dialog controls; provider frames may handle their own keyboard events. Without JavaScript or dialog support, the tiles retain their original links.
- `assets/to-video-logo.svg` is the product's existing brand asset.
- `assets/to-video-editor.webp` is an actual editor capture from the product overview. The person in the video is a podcast participant, not a portrait of Atul.
- `assets/atul-profile.jpg` is Atul's public X profile photo, used in the header and browser icon.
- `assets/social-card.png` is the personal-site sharing graphic.

Company logos come from the projects' public sites, including TryClaw's header SVG and the artsqft wordmark selected by Atul. Kollabia uses the original logo supplied by Atul. The education credential uses IIIT-B’s official website logo; the speaking credential uses the AWS website’s vector mark, with its standard brand colours. The old Spext beta suffix is removed from its vector asset. Side-project descriptions link to their source websites. The music gallery is an explicit list of the founder's Spotify releases rather than an artist embed, so the misattributed release is excluded. Artwork comes from Spotify's public oEmbed service and the film's YouTube thumbnail. Update the gallery when adding releases. Media players load only when selected and depend on their providers; direct links remain available if an embed is blocked. Spotify controls playback availability, which can be a preview for visitors who are not signed in.

Spotify, SoundCloud, YouTube, GitHub, X and Product Hunt icons use the brand paths from [Simple Icons](https://github.com/simple-icons/simple-icons), distributed under CC0. The LinkedIn icon comes from [Font Awesome Free](https://fontawesome.com/license/free), under CC BY 4.0, with the brand colour applied. The envelope is a local SVG. These marks identify the linked services; their text labels remain available to assistive technology.

Product Hunt links point to Echo's launch, Spext 3.0 and the archived AudioTools.app. Atul's public maker history lists all three, and his earlier Spext role describes the work on 3.0. The Spext link uses the exact 3.0 launch URL supplied by Atul. Earlier Spext launches are not attributed to him. AudioTools uses its launch-page icon and links to Product Hunt because its original website is inactive.

The writing section features Atul's published harness essay and links to his X profile for newer posts. The official timeline returned no visible posts on X's publisher and in a local integration probe, so Atul chose direct links. No failed widget or feed-service dependency is shipped. Its framing draws on the product's current runtime source and primary examples from OpenAI's harness engineering, Intercom's human decisions within Fin workflows, and Restate's durable execution. Research also included Anthropic's evolving harnesses, Pi Durable, Remotion and HyperFrames. The page presents Atul's product thesis with to.video as one application, rather than a claim of dependence on another authoring tool or proven customer outcomes.

The career and venture descriptions are grounded in Atul's account, his previous public profile and the linked work. The page does not imply that to.video is already serving paying customers, invent employment dates or claim a formal AI product-management title.

`CNAME` retains the existing custom domain. Local preview changes do not publish the site; updating the configured GitHub Pages source does.
