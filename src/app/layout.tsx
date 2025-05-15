import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import UIProvider from '@/components/ui/provider';
import { FilterProvider } from '@/context/FilterContext';

export const metadata: Metadata = {
  title: 'Financial Dashboard',
  description: 'A financial dashboard for BIX coding challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UIProvider>
          <StyledComponentsRegistry>
            <FilterProvider>{children}</FilterProvider>
          </StyledComponentsRegistry>
        </UIProvider>
      </body>
    </html>
  );
}
