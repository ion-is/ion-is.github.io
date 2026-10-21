# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal homepage for 이창연 (Lee Changyeon): a facilitator with 15 years of experience who also runs **Ion-is**, a YouTube channel of domestic-travel Shorts starring an avatar character. The page gives both identities equal weight. All user-facing text is Korean, and the owner edits content by hand, so keep the `<!-- 수정: ... -->` markers on placeholder content and keep comments in `js/main.js` in Korean.

## Running

This is a static site with no build, package manager, linter, or tests (Node is not installed on this machine). To view it, open `index.html` in a browser. To deploy, upload the folder as-is to Netlify Drop or GitHub Pages.

## Architecture

- `index.html` is a single page with anchor sections: `#top` (hero), `#about`, `#ion-is`, `#facilitation`, `#contact`. The nav links target these IDs.
- `css/style.css` gets all colors from design tokens on `:root`: `--sea` (teal) and `--sunset` (coral) are the two accents. Dark mode overrides the same tokens under `prefers-color-scheme: dark`, so new colors should be added as tokens in both blocks. The mobile breakpoint is 720px.
- `js/main.js` renders the `#shorts-grid` and runs the mobile nav toggle.
  - **Top-viewed videos:** when `YOUTUBE_API_KEY` is set, the script calls YouTube Data API v3 from the browser in three steps. It gets the channel by `forHandle=@CHANNEL_HANDLE` to find the uploads playlist, pages through `playlistItems` (up to `MAX_PAGES` × 50), and fetches `videos` statistics. It then sorts by `viewCount` and embeds the top `TOP_COUNT` (4) via `youtube-nocookie.com`.
  - **Fallback:** with no key, or if any request fails, the grid shows the hand-maintained `SHORTS` ID array. Empty slots are filled with "곧 업로드됩니다" placeholder cards.
  - The script avoids `search.list` on purpose because it costs 100 quota units; the current approach costs about 3 units per page load.
  - The API key is visible in the page source, so it is expected to be HTTP-referrer-restricted. A restricted key cannot work from `file://`, which means the live list only shows on the deployed site.
- `assets/avatar.svg` and `assets/profile.svg` are placeholder drawings that will be replaced with real images.

## Pending owner-supplied content

These are tracked in `README.md`: the YouTube API key, confirmation of the real channel handle (`Ion-is` has not been verified), the Instagram URL, the real facilitation timeline (the current 2011/2015/2020 entries are examples), and the real images. The contact email is final: changyeon0@gmail.com.
