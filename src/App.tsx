import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';

import { AuthProvider } from '@/contexts';
import NotificationSystem from '@/components/NotificationSystem';
import { Dashboard, Landing, NotFound, SignIn, SignUp, Upload } from '@/pages';
import { AuthLayout } from './modules/authentication/layouts';
import { RecordsProvider } from '@/modules/application/providers/RecordsProvider.tsx';
import { AppLayout } from '@/modules/application/layouts';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <RecordsProvider>
            <BrowserRouter>
              <NotificationSystem />
              <Routes>
                <Route path="/" element={<Landing />} />

                <Route element={<AuthLayout />}>
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                </Route>

                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/upload" element={<Upload />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </RecordsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

/*
* <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route element={<AuthLayout />}>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
            </Route>

            <Route path="home" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      * */
