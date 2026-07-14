# Buddy Script — Frontend

Next.js frontend for the Buddy Script social feed, built from the provided HTML/CSS mocks. **Next.js 16 (App Router) + TypeScript + TanStack Query**, feature-based structure.

## Structure

```
src/
├─ app/
│  ├─ (auth)/login, register       auth pages
│  ├─ (protected)/feed             protected feed + nav shell
│  ├─ layout.tsx                   Poppins font + ported Bootstrap/theme CSS + providers
│  └─ proxy.ts (src/proxy.ts)      route guard (cookie check)
├─ features/
│  ├─ auth/       components / api / hooks / schemas / types
│  ├─ posts/      PostComposer, PostCard, Feed, WhoLikedModal + hooks
│  └─ comments/   CommentList, CommentItem, CommentBox + hooks
├─ components/ui/ Avatar, Modal
├─ lib/           api-client (credentials:'include'), utils
└─ providers/     QueryProvider
```

The original mock markup + assets are preserved in `design-reference/`; the design CSS is served from `public/assets/`.

## Features

- **Auth** — login + register (register includes first name, last name, email, password), client validation (Zod + react-hook-form), inline + server errors.
- **Protected feed** — `proxy.ts` redirects unauthenticated users to `/login`; the API validates the JWT on every request.
- **Feed** — create posts (text + image + Public/Private), infinite keyset pagination, newest first.
- **Interactions** — optimistic like/unlike on posts and comments, comments, nested replies, "who liked" modals.

## Prerequisites

- Node.js 20+
- The backend API running (see the backend repo)

## Configuration

`.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5199
```

Point this at your deployed API URL in production. The backend's `Cors:AllowedOrigins` must include this app's origin, and (cross-site prod) the auth cookie is issued `SameSite=None; Secure`.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
# or
npm run build && npm run start
```

## Auth note

The JWT lives in an **httpOnly cookie** — never in JavaScript/localStorage. All API calls use `credentials: 'include'`. `proxy.ts` only checks cookie presence for navigation UX; real authorization is enforced server-side.
