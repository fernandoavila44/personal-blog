
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.scss';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'SantiDev | Tecnología, Desarrollo y Aprendizaje',
    description:
        'Blog personal de Santiago Valencia sobre tecnología, programación y desarrollo web.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" data-theme="light">
            <body
                className={`${geistSans.variable} ${geistMono.variable}`}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <ThemeProvider>
                    <Header />

                    <main style={{ flex: 1 }}>
                        {children}
                    </main>

                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
