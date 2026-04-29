# Yoga Booking Feature — Design Spec

**Date:** 2026-04-29
**Project:** SERVE Padel & Play (`servepadel-web`)
**Status:** Approved

---

## Overview

Add a yoga session booking system to the existing Next.js static site. Users can browse upcoming sessions and book spots. Admins can manage sessions, users, and view booking stats. No payment processing — payments are handled offline by admins.

---

## Architecture

**Approach:** Static export preserved. Supabase added as the backend (auth + Postgres DB). The Supabase JS client runs entirely in the browser. Supabase Row Level Security (RLS) policies enforce data access rules.

**No changes to:**
- `next.config.ts` (`output: "export"` stays)
- Netlify deployment configuration
- Existing pages or components

**Added dependency:** `@supabase/supabase-js`

---

## Database Schema

### `profiles`
Extends Supabase's built-in `auth.users` table.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | FK → `auth.users.id`, primary key |
| `name` | `text` | Full name |
| `email` | `text` | Mirrors auth email |
| `phone` | `text` | Phone number |
| `role` | `text` | `'user'` or `'admin'`, default `'user'` |
| `created_at` | `timestamptz` | Auto-set |

### `sessions`
Represents a single bookable yoga session instance.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | Primary key |
| `title` | `text` | e.g. "Morning Flow" |
| `instructor` | `text` | Instructor name |
| `date` | `date` | Session date |
| `start_time` | `time` | Session start time |
| `duration_minutes` | `integer` | Session length |
| `capacity` | `integer` | Max bookings allowed |
| `is_recurring` | `boolean` | Whether generated from a template |
| `recurrence_template_id` | `uuid` | FK → `recurrence_templates.id`, nullable |
| `is_active` | `boolean` | False = soft-deleted/hidden |
| `created_at` | `timestamptz` | Auto-set |

### `recurrence_templates`
Defines a recurring session schedule.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | Primary key |
| `title` | `text` | Session title |
| `instructor` | `text` | Instructor name |
| `day_of_week` | `integer` | 0 = Sunday … 6 = Saturday |
| `start_time` | `time` | Recurring start time |
| `duration_minutes` | `integer` | Session length |
| `capacity` | `integer` | Default capacity per instance |
| `is_active` | `boolean` | False = stop generating new instances |
| `created_at` | `timestamptz` | Auto-set |

### `bookings`

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | Primary key |
| `user_id` | `uuid` | FK → `profiles.id` |
| `session_id` | `uuid` | FK → `sessions.id` |
| `status` | `text` | `'confirmed'` or `'cancelled'` |
| `created_at` | `timestamptz` | Auto-set |

**Constraint:** Partial unique index on `(user_id, session_id) WHERE status = 'confirmed'` — prevents duplicate active bookings but allows re-booking after cancellation. If a cancelled booking exists for the same user + session, the app updates it back to `'confirmed'` instead of inserting a new row.

---

## RLS Policies

| Table | Policy |
|-------|--------|
| `profiles` | Users read/update their own row. Admins read all rows. |
| `sessions` | Public read (all active sessions). Admin-only insert/update/delete. |
| `recurrence_templates` | Admin-only all operations. |
| `bookings` | Users read/insert/update their own bookings. Admins read all bookings. |

Admin status is determined by `profiles.role = 'admin'`. RLS functions check this via `auth.uid()`.

---

## New Routes

### `/yoga`
Public page. Lists all upcoming active sessions sorted by date/time.

Each session card shows:
- Title, instructor, date, time, duration
- Spots remaining (`capacity - confirmed_booking_count`)
- Book button — states: **Book** (available) / **You're in** (user already booked) / **Full** (at capacity, disabled)

Clicking Book while unauthenticated redirects to `/login?redirect=/yoga`.

### `/login`
Handles both sign in and registration via a tabbed interface.

- **Sign in tab:** Email + password. On success, redirects to `redirect` query param or `/profile`.
- **Register tab:** Email + password + name + phone. Supabase sends a confirmation email. Profile row created on first sign-in via auth trigger.
- Password reset link on sign in tab.

### `/profile`
Requires authentication — unauthenticated users redirected to `/login?redirect=/profile`.

Three tabs:

**My Bookings tab**
- Lists confirmed upcoming bookings (date ascending)
- Each item shows session title, date, time
- Cancel button — opens confirm modal → sets booking status to `'cancelled'` → spot freed immediately
- Past bookings shown below in a collapsed/secondary section

**Profile tab**
- Editable fields: name, phone (email read-only, managed by Supabase auth)
- Save button

**Admin tab** *(conditionally rendered — only visible when `profiles.role = 'admin'`)*
See Admin Panel section below.

---

## Navigation Changes

**Desktop nav:** Add "Yoga" link between "Events" and "Eat & Drink". Right side: replace or supplement "Book a Court" CTA with auth state:
- Logged out: "Sign In" text link
- Logged in: "My Account" dropdown → links to /profile and Sign Out

**Mobile nav overlay:** Add "Yoga" link to mobile nav list. Add "Sign In" / "My Account" at the bottom alongside the existing "Book a Court" button.

---

## Booking Flow

1. User clicks **Book** on a session card
2. If not authenticated → redirect to `/login?redirect=/yoga`
3. After login → return to `/yoga`, confirmation modal opens for that session showing: title, date, time, duration, instructor, spots remaining
4. User confirms → booking inserted into `bookings` table with status `'confirmed'`
5. Session card button updates to **"You're in"**
6. If session reaches capacity during the process → error shown, button updates to **"Full"**

---

## Cancellation Flow

1. User navigates to `/profile` → My Bookings tab
2. Clicks **Cancel** on an upcoming booking
3. Confirm modal: "Cancel your spot in [Session Title] on [Date]?"
4. User confirms → booking status updated to `'cancelled'`
5. Spot becomes available immediately on `/yoga`
6. Booking remains in DB for admin reporting purposes

---

## Recurring Sessions

- Admin creates a `recurrence_template` (day of week, time, duration, capacity, instructor)
- App generates `sessions` rows for the next **8 weeks** from the template on creation and weekly via a client-side admin action ("Refresh schedule" button in admin panel)
- Each generated session has `is_recurring = true` and `recurrence_template_id` set
- Admin can edit any individual session instance (time, duration, capacity) without affecting the template
- Editing the template prompts: "Update template only (future auto-generated sessions) or update all upcoming instances?"
- Deleting a template sets `is_active = false` on the template; existing future instances remain unless admin explicitly deletes them

---

## Admin Panel

Accessed via the Admin tab on `/profile`. Only rendered when `profiles.role = 'admin'`. Three sub-tabs:

### Sessions sub-tab
- Lists upcoming sessions (date ascending) with: title, date, time, booking count vs capacity
- Per session actions: **Edit** (inline form — title, date, time, duration, capacity, instructor), **Delete** (sets `is_active = false`), **View bookings** (expandable list of confirmed bookers: name, email, phone)
- Separate section listing active `recurrence_templates` with: **Edit template**, **Delete template** actions
- Two create buttons: **+ One-off session** and **+ Recurring schedule**

### Users sub-tab
- Searchable list of all registered users (name, email, phone, upcoming booking count)
- Per user actions: **View bookings** (all bookings, paginated), **Promote to admin** / **Remove admin** (toggles role)

### Stats sub-tab
Four metric cards:
1. Total confirmed bookings (all time)
2. Total registered users
3. Sessions this week
4. Average fill rate (confirmed bookings / capacity across all past sessions)

Per-session fill rate table for all upcoming sessions (title, date, booked/capacity).

---

## Component Structure

```
src/
  app/
    yoga/
      page.tsx              # /yoga route
    login/
      page.tsx              # /login route
    profile/
      page.tsx              # /profile route (tabs)
  components/
    yoga/
      SessionCard.tsx       # Single session card with book button
      BookingModal.tsx      # Confirm booking modal
      CancelModal.tsx       # Confirm cancel modal
    profile/
      MyBookings.tsx        # My Bookings tab content
      ProfileForm.tsx       # Profile edit form
      AdminPanel.tsx        # Admin tab wrapper
      admin/
        SessionsTab.tsx     # Session management
        UsersTab.tsx        # User management
        StatsTab.tsx        # Booking stats
  lib/
    supabase.ts             # Supabase client singleton
    types.ts                # Shared TypeScript types (Session, Booking, Profile)
```

---

## Out of Scope

- Payment processing (handled offline by admins)
- Email notifications / booking confirmations (Supabase email used only for auth)
- Waitlist for full sessions
- Session ratings or feedback
- Multiple yoga session types/categories beyond the title field
