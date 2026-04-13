# Middleware Setup Guide

## Overview

`proxy.ts` only exists for backwards compatibility:

- Redirect legacy `/auth/login` -> `/app/login`.
- Keep old links/bookmarks working after app merge onto `hiringjourney.com/app`.

## Current Behavior

- No subdomain routing.
- No split-host auth toggles.
- Product routes run on the same host under `/app/*`.

## Quick Verification

1. Run `npm run dev`.
2. Open `/auth/login` and confirm redirect to `/app/login`.
3. Open `/app/login` and confirm Keycloak login starts.
