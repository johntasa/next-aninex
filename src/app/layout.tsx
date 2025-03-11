"use client";

import { ApolloProvider } from '@apollo/client';
import client from '@/api/apolloClient';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Topbar from '@/components/TobBar/Topbar';
import { Provider } from 'react-redux';
import store from '@/redux/store';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <head>
        <title>ANINEX</title>
        <meta name="description" content="A modern web application for browsing and managing your favorite anime" />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <Topbar />
            <main className="h-lvh">{children}</main>
          </Provider>
        </ApolloProvider>
      </body>
    </html>
  );
}