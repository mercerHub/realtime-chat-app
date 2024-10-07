"use client";
import React, { FC, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  LogOut,
  UserRoundPlus,
  MessageSquare,
  UserCog
} from 'lucide-react';


interface linkInterface {
  label: string;
  href: string;
  icon: React.ReactNode;
  icon2?: React.ReactNode;
}


export function SidebarDemo() {
  const handleSignOut = async () => {
    await signOut();
  }
  const links: linkInterface[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Add Friend",
      href: "/friend/add",
      icon: (
        <UserRoundPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Friend Requests",
      href: "/friend/requests",
      icon: (
        <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      icon2: (
        <motion.span
          className="bg-teal-400 text-white text-xs rounded-full px-1 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >2</motion.span>
      )
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),

    },
  ];
  const [open, setOpen] = useState(false);
  return (

    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <MessageSquare />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center h-50">
          <Image
            src="/images/anime-profile-picture-jioug7q8n43yhlwn.jpg"
            alt="Acet Labs Logo"
            width={500}
            height={500}
            className="rounded-full h-8 w-8"
          />
          {open && <LogOut className="hover:cursor-pointer hover:text-zinc-600" onClick={handleSignOut} />}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
export const Logo = () => {
  return (
    <div className="flex items-center dark:bg-white rounded-lg gap-2">
      <MessageSquare />
      <span className="font-semibold">BAKA</span>
    </div>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

