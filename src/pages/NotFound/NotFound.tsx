import React from 'react';
import { ArrowLeft } from 'lucide-react';
import CameraIcon from '@/components/CameraIcon';
import { NavLink } from 'react-router';
import Layout from '@/modules/public/layouts/Layout.tsx';
import Button from '@/components/button/Button.tsx';

export const NotFound: React.FC = () => {
  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <CameraIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-serif text-6xl font-bold text-muted-foreground mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Página não encontrada</h2>
            <p className="text-muted-foreground">
              A página que você está procurando não existe ou foi movida.
            </p>
          </div>

          <NavLink to="/">
            <Button variant="secondary" className="inline-flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao início</span>
            </Button>
          </NavLink>
        </div>
      </div>
    </Layout>
  );
};

