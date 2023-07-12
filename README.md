# nextMessage

## Introduction

A Web messenger built with Next.JS, React, Tailwind CSS and Firebase as backend.
Main features:

- User can login/signup using an email or a Google account.
- search and add contact using email address
- real time messaging without additional middleware.
- light/dark mode
- responsive design

## Link to demo

[https://web-messenger-nextjs.vercel.app](https://web-messenger-nextjs.vercel.app/)

- create your own account or log in using test credential.

## To run the project

- clone the repo
- add firebase config to .env file:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""
```

- run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



