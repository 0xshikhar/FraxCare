import { createConfig, http } from "wagmi";
import { fraxtal, fraxtalTestnet } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";
import { createPublicClient } from "viem";

declare module "wagmi" {
    interface Register {
        config: typeof config;
    }
}

export const config = createConfig({
    chains: [fraxtal, fraxtalTestnet],
    connectors: [
        injected(),
        metaMask({
            dappMetadata: {
                name: "FraxCare",
                url: "http://fraxcare.xyz",
            },
        }),
    ],
    transports: {
        [fraxtal.id]: http(),
        [fraxtalTestnet.id]: http(),
    },
    ssr: true,
});


/**
 * Retrieves the Pinata settings from environment variables.
 * @returns An object containing the Pinata gateway and JWT.
 */
export const getPinataSettings = () => {
    const gateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY;
    const jwt = process.env.PINATA_JWT;

    return {
        gateway,
        jwt,
    };
};