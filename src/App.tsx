import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router';
import { Home, Landing, SignIn, SignUp } from '@/pages';
import { AppLayout, AuthLayout } from '@/layouts';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>

        <Route path="home" element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
