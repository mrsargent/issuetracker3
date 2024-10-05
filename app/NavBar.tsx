'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { PiTreeLight } from "react-icons/pi";
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const NavBar = () => {




    //py is vertical padding px is horizontal padding
    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/">
                            <PiTreeLight />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>

            </Container>
        </nav>
    )
}


const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return <SkeletonTheme/>;

    if (status === "unauthenticated")
        return <Link className='nav-link' href="api/auth/signin">Log in</Link>;

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session!.user?.image!}
                        fallback="?"
                        size="2"
                        radius='full'
                        className='cursor-pointer'
                        referrerPolicy='no-referrer'
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">
                            {session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href="api/auth/signout">Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
};


const NavLinks = () => {
    const currentPath = usePathname();
    //console.log(currentPath);

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ];

    return (
        <ul className='flex space-x-5'>
            {links.map(link =>
                <li key={link.href}>
                    <Link
                        className={classNames({
                            "nav-link": true, 
                            '!text-zinc-900': link.href === currentPath,                           
                        })}
                        href={link.href}>
                        {link.label}
                    </Link>
                </li>
            )}
        </ul>
    )
}

export default NavBar