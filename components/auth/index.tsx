"use client"
import { AuthMode } from '@/types/AuthMode.type'
import Image from 'next/image'
import Input from '../shared/Input'
import Link from 'next/link'
import { useActionState } from 'react'
import { login } from '@/lib/actions/auth'

const Auth = ({ mode }: { mode: AuthMode }) => {
    const [state, formAction, isPending] = useActionState(login.bind(null , mode), undefined)
    return (
        <main className='flex gap-8 px-6 tablet:px-12 min-h-screen items-center '>
            <section className='flex-1/2 flex flex-col gap-8 items-center py-4'>
                <Image src='/svgs/logo.svg' alt='logo' width={230} height={80} />
                <h1 className='text-center font-bold text-3xl'>ورود | ثبت نام</h1>
                <form action={formAction} className='flex flex-col gap-6 w-full max-w-md mx-auto'>
                    {/* <input type="hidden" value={mode} name='mode' /> */}
                    {mode === "register" && <div className='grid grid-cols-2 gap-4'>
                        <Input label='نام' name='firstName' defaultValue={state?.values.firstName} error={state?.errors.firstName} />
                        <Input label='نام خانوادگی' name='lastName' defaultValue={state?.values.lastName} error={state?.errors.lastName} />
                    </div>}
                    <Input label='تلفن همراه' name='phone' defaultValue={state?.values.phone} error={state?.errors.phone} />
                    <Input label='رمزعبور' name='password' type='password' defaultValue={state?.values.password} error={state?.errors.password} />
                    {mode === 'register' && <div className='flex flex-col gap-1'>
                        <div className='flex gap-1 items-center'>

                        <input type='checkbox' id='rules' name='rules' className='accent-primary cursor-pointer' defaultChecked={state?.values.rules} />
                        <label htmlFor='rules'>
                            با قوانین <span className='text-primary font-semibold'>رنتی فای</span> موافق هستم.
                        </label>
                        </div>
                        <span className='text-red-600'>{state?.errors.rules}</span>
                    </div>}
                    <button className='text-white bg-primary py-2 rounded-md font-bold hover:bg-primary/90 disabled:opacity-60 cursor-pointer' disabled={isPending}>{mode === "login" ? "ورود" : "ثبت نام"}</button>
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