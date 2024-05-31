'use client';
import { ReduxProvider } from '@/state/provider';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Container from '../components/container/index';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.scss';
import theme from '../theme/themeConfig';
import { ConfigProvider } from 'antd';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </Head>

      <body className={inter.className} suppressHydrationWarning={true}>
        <ReduxProvider>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <Container>{children}</Container>
            </ConfigProvider>
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
