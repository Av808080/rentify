import { logOut } from '@/lib/actions/auth'
import { getAuth } from '@/lib/getAuth'
import Image from 'next/image'
import Link from 'next/link'

const Sidebar = async ({ mode }: { mode: string }) => {
    const user = await getAuth()
    return (
        <aside className='flex-1/4 text-gray-600 flex flex-col gap-8'>
            <div className='flex gap-2 items-center'>
                <Image src={user?.avatar || "/images/unknown-avatar.png"} alt='Avatar' width={64} height={64} className='rounded-full w-16 h-16 object-cover' />
                <p className='flex flex-col gap-0.5'>
                    <span className='text-gray-900 text-lg font-semibold'>{user?.firstName} {user?.lastName}</span>
                    <span>{(user?.phone)}</span>
                </p>
            </div>
            <Link className={`border-r-4 flex items-center gap-2 ${mode === "a" ? "font-semibold text-black border-primary" : "border-transparent" } px-4`} href="/dashboard?mode=a">
            <Image src="/svgs/profile1.svg" width={24} height={24} alt='profile' />
            ویرایش اطلاعات</Link>
            <Link className={ `border-r-4 flex items-center gap-2 ${mode === "b" ? "font-semibold text-black border-primary" : "border-transparent" } px-4 `} href="/dashboard?mode=b">
            <Image src="/svgs/favorite.svg" width={24} height={24} alt='profile' />
            آگهی های ذخیره شده</Link>
            <Link className={`border-r-4 flex items-center gap-2 ${mode === "c" ? "font-semibold text-black border-primary" : "border-transparent"} px-4`} href="/dashboard?mode=c">
            <Image src="/svgs/megaphone.svg" width={24} height={24} alt='profile' />
            آگهی های من</Link>
            <Link className={`border-r-4 flex items-center gap-2 ${mode === "d" ? "font-semibold text-black border-primary" : "border-transparent"} px-4`} href="/dashboard?mode=d">
            <Image src="/svgs/compress.svg" width={24} height={24} alt='profile' />
            مقایسه املاک</Link>
            <form action={logOut}>
            <button type='submit' className='text-red-600 cursor-pointer px-4'>
                    خروج از حساب کاربری
            </button>
            </form>
        </aside>
    )
}

export default Sidebar