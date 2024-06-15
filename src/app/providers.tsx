'use client';

import * as React from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultConfig,
    RainbowKitProvider,
    connectorsForWallets,
    getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient} from "@tanstack/react-query";
import 'dotenv/config'
import { config } from '@/lib/config';

import {
    polygonMumbai,
    fraxtal,
    fraxtalTestnet
} from 'wagmi/chains';

// const config = getDefaultConfig({
//     appName: 'My RainbowKit App',
//     projectId: 'YOUR_PROJECT_ID',
//     chains: [fraxtal, fraxtalTestnet, polygonMumbai, ],
//     ssr: true, // If your dApp uses server side rendering (SSR)
// });

const projectId = '9811958bd307518b364ff7178034c435';

const { wallets } = getDefaultWallets({
    appName: 'RainbowKit demo',
    projectId,
});

const demoAppInfo = {
    appName: 'My Wallet Demo',
};

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider appInfo={demoAppInfo}>
                    {mounted && children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
