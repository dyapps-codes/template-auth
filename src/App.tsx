import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { DypaiProvider, ProtectedRoute } from '@dypai-ai/client-sdk/react'
import { Loader2 } from 'lucide-react'
import { dypai } from '@/lib/dypai'
import { appConfig } from '@/lib/app-config'
import { AppLayout } from './components/layout/AppLayout'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'
import { Dashboard } from './pages/Dashboard'
import { AdminUsers } from './pages/admin/AdminUsers'
import { PlaceholderPage } from './pages/PlaceholderPage'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient()

function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  )
}

const App = () => (
  <DypaiProvider client={dypai}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* ── Root → app entry. ProtectedRoute sends guests to login. ── */}
            <Route path="/" element={<Navigate to={appConfig.homePath} replace />} />

            {/* ── Public routes ── */}
            <Route path={appConfig.loginPath} element={<Login />} />
            <Route path={appConfig.signUpPath} element={<SignUp />} />
            <Route path={appConfig.forgotPasswordPath} element={<ForgotPassword />} />
            <Route path={appConfig.passwordRecoveryPath} element={<ResetPassword />} />

            {/* ── Protected routes (sidebar layout) ── */}
            <Route
              element={
                <ProtectedRoute
                  loadingComponent={<LoadingScreen />}
                  unauthenticatedComponent={<Navigate to={appConfig.loginPath} replace />}
                >
                  <Outlet />
                </ProtectedRoute>
              }
            >
              <Route element={<AppLayout appName={appConfig.name} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/workspace" element={<PlaceholderPage title="Workspace" />} />
                <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
                <Route
                  path={appConfig.adminUsersPath}
                  element={
                    <ProtectedRoute
                      roles={['admin']}
                      loadingComponent={<LoadingScreen />}
                      unauthorizedComponent={<PlaceholderPage title="Access denied" description="Admin access is required." />}
                    >
                      <AdminUsers />
                    </ProtectedRoute>
                  }
                />
                {/* ADD ALL PRIVATE ROUTES HERE */}
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </DypaiProvider>
)

export default App
