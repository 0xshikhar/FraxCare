import { ethers } from 'ethers';
import IdentityPassNFT from '@/lib/contracts/IdentityPassNFT.json';
import { IdentityCardContract } from '@/lib/constant'

export const getIDByAddress = async (address: string) => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(IdentityCardContract, IdentityPassNFT.abi, signer);

        const nft = await contract.getTokenIdByAddress(address);
        console.log("getNFTByAddress result:", nft);
        return nft;
    } catch (error) {
        console.error("getNFTByAddress error", error);
    }
}
