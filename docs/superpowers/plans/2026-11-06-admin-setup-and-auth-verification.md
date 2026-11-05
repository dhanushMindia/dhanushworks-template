# Dhanushworks First-Time Admin Setup & Authentication Architecture

> **Document Version:** 1.0.0
> **Target Scope:** `dhanushworks-template`

## 1. Authentication Architecture & Root Cause Analysis

### Previous Issue (`CallbackRouteError`)
In NextAuth v5 (Auth.js), calling `signIn('credentials', { ... })` with `redirect: false` inside a Next.js Server Action previously caused unexpected exception handling and `CallbackRouteError` when Auth.js encountered a failure or redirect instruction.

### Resolution
1. **Direct `redirectTo` Parameter**: We configured `signIn('credentials', { email, password, redirectTo: '/admin' })` which allows NextAuth v5 to natively handle successful credential authentication and redirect handling via standard Next.js redirect exceptions.
2. **Robust `AuthError` Catching**: We imported `AuthError` from `next-auth` and explicitly catch `CredentialsSignin` errors, cleanly redirecting back to `/login?error=Invalid+email+or+password` without bubbling uncaught route callbacks.
3. **Prisma & Bcrypt Verification**: The credentials provider queries the database via Prisma client, verifies password hashes securely using `bcrypt.compare`, and returns serialized user session objects.

---

## 2. First-Time Admin Setup Workflow

When initializing a fresh clone or deploying `dhanushworks-template` for the first time with an empty database:

1. **Zero-User Detection**: 
   When visiting `/login`, the application checks `await prisma.user.count()`. If the count is `0`, the application automatically switches to the **First-Time Configuration** view.
2. **Administrator Account Creation**:
   - The user inputs their Name, Email, and Password.
   - The server action hashes the password with `bcrypt`, creates the `User` record, initializes a default `Profile` record, and automatically logs the user in, redirecting them to `/admin`.
3. **Subsequent Visits**:
   Once an administrator exists (`userCount > 0`), visiting `/login` presents the standard secure sign-in form.

---

## 3. Verification Checklist

- [x] **Successful Real Admin Login**: Verified via credentials provider and session establishment.
- [x] **Incorrect Password Rejection**: Caught by `AuthError` and safely reported to the user.
- [x] **Protected Admin Routes**: Middleware and session checks protect `/admin/*` routes.
- [x] **Session Persistence**: JWT session strategy maintains authenticated state.
- [x] **Search & Navigation**: Public search and Home/Journal navigation remain fully functional.
- [x] **Four Art-Directed Themes**: Editorial, Minimal, Creative, and Academic maintain independent visual identities.
