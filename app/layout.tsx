import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './Layout.module.css';

export const metadata: Metadata = {
  title: "Work Orders App",
  description: "Work Orders App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className={styles.main}>
          <div className="container">
            {children}</div>
        </main>

        <footer className={styles.footer}>
          <div className="container">
            <p>Work Orders Management System</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
