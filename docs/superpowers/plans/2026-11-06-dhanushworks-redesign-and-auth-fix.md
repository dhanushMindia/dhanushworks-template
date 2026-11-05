# Dhanushworks Redesign and Authentication Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely redesign the 4 Dhanushworks portfolio themes with distinct design languages (Editorial, Minimal, Creative, Academic), purge all personal/research/demo content (Alex Morgan, Adam Smith, policy research jargon) in favor of clean neutral defaults ("CSPR Participant"), restrict public navigation strictly to Home and Journal, redesign the footer, fix the NextAuth credentials login error (`CallbackRouteError`), and verify build and CMS functionality.

**Architecture:** 
- Theme A (Editorial): Warm paper background (#fbf9f5), terracotta/warm olive accents, elegant serif typography, publication layout.
- Theme B (Minimal): Clean white background (#ffffff), neutral grey palette, modern sans typography, grid layout.
- Theme C (Creative): Dark mode / expressive canvas (#0f172a), cobalt/lime/orange accents, bold typography, asymmetric cards.
- Theme D (Academic): Scholarly warm white (#fcfbf9), pale blue/navy accents, structured metadata and timelines.
- Authentication: Update `login/page.tsx` to use `redirect: false` with explicit `redirect('/admin')` on success to prevent NextAuth redirect error catching.
- Seed & Default Data: Update `prisma/seed.ts` and default profile values to use neutral CSPR Participant defaults.

**Tech Stack:** Next.js 16 App Router, Prisma ORM, Tailwind CSS, NextAuth v5 (Auth.js), TypeScript.

**Spec:** User prompt instructions (`0404`).

## Global Constraints
- Do not modify `~/portfolio` or `~/dhanushworks-installer`.
- Work exclusively in `~/dhanushworks-template`.
- Navigation must contain ONLY Home and Journal.
- No dark grainy imitation of the user's personal portfolio on Editorial/Minimal/Academic.

## Review Focus
1. NextAuth login error resolution (`CallbackRouteError`).
2. Distinct visual identities across all four themes.
3. Complete removal of all legacy research/personal placeholder names.
4. Clean production build and verification.

---

### Task 1: Fix Authentication Login Error

**Files:**
- Modify: `src/app/login/page.tsx`

**Interfaces:**
- Consumes: `signIn` from `@/lib/auth`
- Produces: Correct credential sign-in without catching redirect errors.

- [ ] **Step 1: Update `login/page.tsx` to use `redirect: false` pattern**
```tsx
  async function handleLogin(formData: FormData) {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      throw new Error("Invalid email or password")
    }

    redirect('/admin')
  }
```
- [ ] **Step 2: Test login handling and verify build**

---

### Task 2: Purge Legacy Demo Content & Update Seed Data

**Files:**
- Modify: `prisma/seed.ts`
- Modify: Default values in API routes and theme views (`src/app/api/profile/route.ts`, etc.)

**Interfaces:**
- Consumes: Prisma Profile and JournalEntry models
- Produces: Clean neutral demo data ("CSPR Participant", generic weekly learning logs).

- [ ] **Step 1: Update `prisma/seed.ts` with neutral template data**
- [ ] **Step 2: Run `npx prisma db seed` or reset test database**

---

### Task 3: Redesign the Four Portfolio Themes with Distinct Design Languages

**Files:**
- Modify: `src/themes/editorial/views.tsx`
- Modify: `src/themes/minimal/views.tsx`
- Modify: `src/themes/creative/views.tsx`
- Modify: `src/themes/academic/views.tsx`

**Interfaces:**
- Consumes: `data` prop with `profile` and `recentJournals`
- Produces: Distinct Editorial, Minimal, Creative, and Academic compositions meeting all prompt criteria.

- [ ] **Step 1: Implement Editorial theme (warm paper background, terracotta accents, publication typography)**
- [ ] **Step 2: Implement Minimal theme (clean white, neutral grey, modern sans, grid layout)**
- [ ] **Step 3: Implement Creative theme (expressive dark canvas, cobalt/lime accents, bold asymmetric cards)**
- [ ] **Step 4: Implement Academic theme (scholarly warm white, navy/slate accents, structured metadata)**

---

### Task 4: Redesign Footer & Navigation Scope

**Files:**
- Modify: `src/components/public/Header.tsx` (Ensure navigation only shows Home and Journal, no search shortcuts or legacy links)
- Create/Modify: `src/components/public/Footer.tsx` (Compact footer using configured site name, dynamic year, conditional social links)

**Interfaces:**
- Consumes: Profile data
- Produces: Clean header and footer across all themes.

- [ ] **Step 1: Create clean `Footer.tsx` component**
- [ ] **Step 2: Verify Header navigation contains ONLY Home and Journal**

---

### Task 5: Production Build and Verification

**Files:**
- Run: `npm run build`

- [ ] **Step 1: Execute `npm run build` and verify 0 errors**
- [ ] **Step 2: Final git commit and status check**
