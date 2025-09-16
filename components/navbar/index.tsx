"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const closeMenu = ()=>{setIsMenuOpen(false)}
    return (
        <nav className='flex justify-between p-2 items-center z-30'>
            <button className='flex flex-col gap-1 md:hidden' onClick={() => setIsMenuOpen(true)}>
                <span className='w-6 h-1 bg-black rounded-md'></span>
                <span className='w-6 h-1 bg-black rounded-md'></span>
                <span className='w-6 h-1 bg-black rounded-md'></span>
            </button>
            <Link href="/">
                <Image src='/svgs/logo1.svg' alt='logo' width={132} height={52} />
            </Link>
            {isMenuOpen
                &&
                <div className='bg-slate-700/50 fixed inset-0 w-screen h-screen md:hidden z-20 backdrop-blur-[1.5px]' onClick={closeMenu} />
            }
            <div className={`flex md:flex-row items-center flex-col md:w-auto w-1/3 max-[471px]:w-1/2 bg-white shadow-2xl shadow-slate-700 md:shadow-none gap-4 font-semibold fixed h-screen md:h-auto md:relative inset-0 ${isMenuOpen ? "translate-x-0" : "translate-x-[100%]"} duration-300 md:translate-0 z-20 overflow-scroll md:overflow-hidden`}>
                <button className='md:hidden m-4' onClick={closeMenu}>
                    <span className='bg-black w-6 h-1 rounded-md block rotate-45 origin-center translate-y-0.5'></span>
                    <span className='bg-black w-6 h-1 rounded-md block -rotate-45 origin-center'></span>
                </button>
                <Link onClick={closeMenu} href=''>رهن و اجاره خانه</Link>
                <Link onClick={closeMenu} href='/blogs'>بلاگ رنتیفای</Link>
                <Link onClick={closeMenu} href=''>درباره رنتیفای</Link>
                <div className='md:hidden flex flex-col mt-auto mb-2 gap-2.5 items-center'>
                    {isLoggedIn ?
                        <Link onClick={closeMenu} href="/dashboard">حساب من</Link> :
                        <Link onClick={closeMenu} href="/auth?mode=login">ورود | ثبت نام</Link>
                    }
                    <Link onClick={closeMenu} href="" className='text-white bg-primary hover:bg-primary/90 duration-200 px-4 py-2 rounded-md'>ثبت آگهی رایگان</Link>
                </div>

            </div>
            <div className='md:flex hidden gap-2 items-center '>
                {isLoggedIn ?
                    <Link href="/dashboard">حساب من</Link> :
                    <Link href="/auth?mode=login">ورود | ثبت نام</Link>
                }
                <Link href="" className='text-white bg-primary hover:bg-primary/90 duration-200 px-4 py-2 rounded-md'>ثبت آگهی رایگان</Link>
            </div>
        </nav>
    )
}

export default Navbar