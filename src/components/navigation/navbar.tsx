"use client"
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
import React, { useState } from "react";
import fraxLogo from "../../../public/assets/frax-logo.png"
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { ConnectButton } from "@rainbow-me/rainbowkit";


const style = {
	wrapper: `flex flex-wrap items-center justify-between bg-black w-screen px-[1.2rem] py-[0.8rem] `,
	logoContainer: `flex items-center cursor-pointer`,
	logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
	searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
	searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
	searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
	headerItems: ` flex items-center align-right justify-end`,
	headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
	headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};

export default function Navbar() {
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className={style.wrapper}>
			<Link href="/">
				<div className={style.logoContainer}>
					<Image src={fraxLogo} height={40} width={70} alt="mantle logo" />
					<div className="text-[32px] text-white font-serif pl-5"
					>
						FraxCare
					</div>
					<div className={style.logoText}></div>
				</div>
			</Link>
			<div
				className={`items-center justify-between ${isMenuOpen && "bg-[#181818c5]"
					} w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"
					}`}
				id="navbar-sticky"
			>
				<div className={style.headerItems}>
					<div
						className={style.headerItem}
						onClick={() => {
							router.push("/create");
						}}
					>
						Create Profile
					</div>
					
					<div
						className={style.headerItem}
						onClick={() => {
							router.push("/dashboard");
						}}
					>
						Dashboard
					</div>

					<div
						className={style.headerItem}
						onClick={() => {
							router.push("/records");
						}}
					>
						Records
					</div>
					<div
						className={style.headerItem}
						onClick={() => {
							router.push("/doctors");
						}}
					>
						Doctors
					</div>
				</div>
			</div>
			<div className="flex md:order-2 space-x-1 md:space-x-0">
				<ConnectButton />
			</div>

		</div>
	);
}
