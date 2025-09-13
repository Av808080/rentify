import { AuthMode } from '@/types/AuthMode.type'
import Image from 'next/image'
import Input from '../shared/Input'
import Link from 'next/link'

const Auth = ({ mode }: { mode: AuthMode }) => {
    return (
        <main className='flex gap-8 px-6 tablet:px-12 min-h-screen items-center '>
            <section className='flex-1/2 flex flex-col gap-8 items-center py-4'>
                <Image src='/svgs/logo.svg' alt='logo' width={230} height={80} />
                <h1 className='text-center font-bold text-3xl'>ورود | ثبت نام</h1>
                <form className='flex flex-col gap-6 w-full max-w-md mx-auto'>
                    {mode === "register" && <div className='grid grid-cols-2 gap-4'>
                        <Input label='نام' name='firstName' />
                        <Input label='نام خانوادگی' name='lastName' />
                    </div>}
                    <Input label='تلفن همراه' name='phone' />
                    <Input label='رمزعبور' name='password' type='password' error='رمزعبور صحیح نمیباشد.' />
                    {mode === 'register' && <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='rules' name='rules' className='accent-primary cursor-pointer' />
                        <label htmlFor='rules'>
                            با قوانین <span className='text-primary font-semibold'>رنتی فای</span> موافق هستم.
                        </label>
                    </div>}
                    <button className='text-white bg-primary py-2 rounded-md font-bold hover:bg-primary/90 disabled:opacity-60 cursor-pointer'>{mode === "login" ? "ورود" : "ثبت نام"}</button>
                    {
                        mode === "login" ? <Link className='text-primary text-center' href={'/auth?mode=register'}>برای ثبت نام کلیک کنید</Link> : <Link className='text-primary text-center' href={'/auth?mode=login'}>
                            از قبل حسابی دارید؟
                        </Link>
                    }
                    <span className='text-gray-600 text-center'>یا ورود از طریق</span>
                    <div className='flex justify-center gap-4 items-center'>

                        {["facebook", "linkedin", "google"].map(item => <Image src={`/svgs/${item}.svg`} className='cursor-pointer' alt={item} key={item} width={32} height={32} />)}
                    </div>
                </form>
            </section>
            <section className='flex-1/2 hidden tablet:block'>
                <Image className='block mx-auto ' src='/svgs/login.svg' alt='login' width={636} height={392} />
            </section>
        </main>
    )
}

export default Auth