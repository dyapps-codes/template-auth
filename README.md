# Auth App Template

Starter template for applications with public email signup, sign in, password recovery, protected routes, and an optional admin users panel.

## Setup

Create `.env` from `.env.example`:

```env
VITE_APP_NAME=Auth App
VITE_DYPAI_URL=https://YOUR_PROJECT_ID.dypai.dev
```

Run the app:

```bash
npm install
npm run dev
```

## Structure

- `AGENTS.md` explains the template structure for automated code changes.
- `src/lib/dypai.ts` creates the DYPAI SDK client.
- `src/lib/app-config.ts` centralizes app name and route paths.
- `src/config/navigation.ts` centralizes sidebar items, route titles, and breadcrumbs.
- `src/App.tsx` defines public, private, and admin routes.
- `src/components/layout/AppLayout.tsx` renders the private shell.
- `src/components/layout/Sidebar.tsx` controls navigation.
- `src/components/layout/AuthLayout.tsx` is shared by signup, login, and password flows.
- `src/pages/admin/AdminUsers.tsx` manages users and roles through the SDK.

## Auth

Public routes:

- `/signup`
- `/login`
- `/forgot-password`
- `/reset-password`

Private routes are wrapped with `ProtectedRoute`. Guests are redirected to `/login`.

Signup uses the SDK `signUp` helper in `src/pages/SignUp.tsx`. If the backend requires email confirmation, the UI shows a confirmation state and sends the user back to sign in after they verify.

The signup form does not send a role. The engine reads the app's real `system.auth_config` row and assigns `default_signup_role` after account creation. New projects default to `viewer`; change that value per app when users should start as `member`, `customer`, or another real role from `system.roles`.

Public signup is controlled by `system.auth_config.allow_public_signup`. Email verification, password length, session duration, redirects, email subjects, templates, and auth email provider references also live in `system.auth_config`. Secrets stay encrypted in the project DB as `system.credentials` and are referenced from auth config.

Password recovery is configured in `src/lib/dypai.ts`:

```ts
redirects: {
  passwordRecovery: appConfig.passwordRecoveryPath,
  signIn: appConfig.homePath,
}
```

## Admin

The admin users screen is optional and lives at:

```txt
/admin/users
```

It uses:

- `client.users.list()`
- `client.users.create()`
- `client.users.update()`
- `client.users.delete()`
- `client.roles.list()`

Roles are loaded from the app's real `system.roles` table. Do not hardcode role names in the UI.

Backend permissions should control access:

- `manage_users` for user operations.
- `manage_roles` for role operations.
- `manage_system` for system-level operations.

The UI is a convenience layer. The backend remains the source of truth for authorization. Public signup should not grant admin permissions by default.

## Adding Routes

Add private pages inside the protected layout in `src/App.tsx`:

```tsx
<Route path="/workspace" element={<Workspace />} />
```

Then add navigation items and route titles in `src/config/navigation.ts`.

## Styling

This template uses Tailwind CSS and shared UI components under `src/components/ui`.

Use the existing tokens and components before adding new patterns:

- `Card` for grouped content.
- `Dialog` for create/edit forms.
- `AlertDialog` for destructive confirmation.
- `Table` for structured admin data.
- `Select` for role and option fields.
- `Badge` for status and role indicators.
- `Button`, `Input`, `DropdownMenu`, and `Toast` for common actions.

Keep private app screens dense, clear, and task-oriented.
