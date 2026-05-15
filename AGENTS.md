# Auth App Template Instructions

This template is prepared for apps where users can register themselves from outside the app. Keep the structure predictable so future automated edits can find the right place quickly.

## Main Edit Points

- App name and route defaults live in `src/lib/app-config.ts`.
- SDK setup and auth redirects live in `src/lib/dypai.ts`.
- Public and protected route wiring lives in `src/App.tsx`.
- Private app shell layout lives in `src/components/layout/AppLayout.tsx`.
- Sidebar UI lives in `src/components/layout/Sidebar.tsx`.
- Navigation items, page titles, and breadcrumbs live in `src/config/navigation.ts`.
- Admin user management lives in `src/pages/admin/AdminUsers.tsx`.
- Public signup lives in `src/pages/SignUp.tsx`.

## Layout

The current private shell uses a sidebar. If the app needs a top header, tab bar, or another navigation model, keep `src/App.tsx` routes intact and replace the shell component used around the private routes.

Do not scatter navigation definitions across layout components. Add or remove app sections in `src/config/navigation.ts`, then let the shell render from that config.

## Branding

Do not hardcode a product or company name inside components. Use `appConfig.name` for visible app branding and `VITE_APP_NAME` for per-app configuration.

The static `index.html` can only show a neutral loading fallback because Vite runtime config is not available there before the app loads.

## Auth And Roles

Public auth pages are:

- `/signup`
- `/login`
- `/forgot-password`
- `/reset-password`

Private routes must stay wrapped with `ProtectedRoute`.

This template supports public self-service signup. Do not remove the signup route unless the app is intentionally becoming invite-only or admin-created only.

Public signup must not send or choose a role from the frontend. The engine reads the app DB's `system.auth_config.default_signup_role`, and that role must exist in the same app's real `system.roles` table.

Auth behavior belongs to the app DB: `system.auth_config.allow_public_signup`, email verification flags, redirect URL, password policy, session duration, sender/subject/template settings, and references to encrypted `system.credentials`. Do not hardcode auth policy in the frontend and do not store app auth secrets in central project metadata.

Admin-only UI can be hidden by role in the frontend, but permissions must be enforced by the backend. Do not hardcode role lists for management screens; load real roles through the SDK.

## Adding A Private Page

1. Add the route inside the protected `AppLayout` section in `src/App.tsx`.
2. Add the sidebar item and page title in `src/config/navigation.ts`.
3. Add any role restriction with `ProtectedRoute` when the page is not for every authenticated user.

## Admin Users

The admin users panel should keep using SDK modules for user and role management. Keep create/edit inside dialogs, use confirmation for destructive actions, and avoid allowing users to delete themselves from the UI.

Public signup and admin user creation are different flows. Public signup is for normal external users; admin user creation is for privileged operators.
