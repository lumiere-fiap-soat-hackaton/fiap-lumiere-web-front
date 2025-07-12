import React from 'react';
import { NavLink } from 'react-router';
import { Clock, Github, History, Upload } from 'lucide-react';

import CameraIcon from '@/components/CameraIcon';
import styles from './Landing.module.css';
import Layout from '@/modules/public/layouts/Layout';
import Button from '@/components/button/Button.tsx';

export const Landing: React.FC = () => {
  //const { isAuthenticated, isLoading } = useAuth();

  return (
    <Layout showHeader={false}>
      <div className={styles.landing}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBackground}></div>
          <div className={styles.heroContent}>
            <div className={styles.heroIconContainer}>
              <div className={styles.heroIcon}>
                <CameraIcon className="w-12 h-12 text-yellow-400" />
                <div className={styles.heroIconDot}></div>
              </div>
            </div>
            <h1 className={styles.heroTitle}>
              LUMIÈRE
            </h1>

            <p className={styles.heroSubtitle}>
              Desconstruindo o movimento, um quadro de cada vez.
            </p>

            <NavLink to="/sign-up">
              <Button size="lg">
                Comece agora
              </Button>
            </NavLink>
          </div>
        </section>

        {/* Sobre o Projeto */}
        <section className={styles.about}>
          <div className={styles.aboutContainer}>
            <h2 className={styles.aboutTitle}>
              Sobre o Projeto
            </h2>
            <div className={styles.aboutContent}>
              <p>
                Lumière é uma plataforma moderna de processamento de vídeo voltada para a geração de imagens a partir de
                vídeos. Usuários autenticados podem enviar seus vídeos e receber arquivos processados com capturas em
                alta qualidade.
              </p>
            </div>
          </div>
        </section>

        {/* Funcionalidades */}
        <section className={styles.features}>
          <div className={styles.featuresContainer}>
            <h2 className={styles.featuresTitle}>
              Funcionalidades
            </h2>

            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Upload className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className={styles.featureTitle}>Upload Múltiplo</h3>
                <p className={styles.featureDescription}>
                  Envie vários vídeos simultaneamente com rastreamento de progresso em tempo real.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Clock className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className={styles.featureTitle}>Processamento Assíncrono</h3>
                <p className={styles.featureDescription}>
                  Receba notificações em tempo real quando seus vídeos estiverem prontos.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <History className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className={styles.featureTitle}>Histórico Completo</h3>
                <p className={styles.featureDescription}>
                  Acesse e reprocesse seus vídeos anteriores de forma simples e rápida.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className={styles.cta}>
          <div className={styles.ctaBackground}></div>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>
              Pronto para transformar seus vídeos em imagens incríveis?
            </h2>
            <p className={styles.ctaSubtitle}>
              Junte-se à revolução do processamento de vídeo e descubra uma nova forma de criar conteúdo visual.
            </p>
            <NavLink to="/sign-in">
              <Button size="lg">
                Acessar o app
              </Button>
            </NavLink>
          </div>
        </section>

        {/* Rodapé */}
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div>
              <h3 className={styles.footerTitle}>
                LUMIÈRE
              </h3>
              <p className={styles.footerSubtitle}>
                Transformando vídeos em experiências visuais
              </p>
            </div>

            <div className={styles.footerLinks}>
              <a
                href="https://github.com/lumiere-fiap-soat-hackaton"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>

            <p className={styles.footerCopyright}>
              © 2024 Lumière. Desenvolvido por alunos do curso de Sistemas de Informação da FIAP, como parte do projeto
              Hackathon.
            </p>
          </div>
          <div className={styles.footerCredits}>
            <blockquote className={styles.heroQuote}>
              "O cinema é uma invenção sem futuro."<br />

              <em>— Louis Lumière (uma das previsões mais gloriosamente erradas da história)</em>
            </blockquote>
          </div>

        </footer>
      </div>
    </Layout>
  );
};

