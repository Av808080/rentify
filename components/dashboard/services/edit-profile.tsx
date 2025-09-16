"use client"
import Image from 'next/image'
import { useActionState, useEffect, useRef, useState } from 'react'
import Input from '@/components/shared/Input'
import { deleteAvatar, editProfile } from '@/lib/actions/edit-profile'
import { User } from '@/types/user.type'
import toast from 'react-hot-toast'
import AvatarUploader from '@/components/shared/AvatarUploader'
import MiniSpinner from '@/components/shared/MiniSpinner'
import Modal from '@/components/shared/Modal'

const EditProfile = ({ user }: { user: User }) => {
  const [state, formAction, isPending] = useActionState(editProfile.bind(null, user.userId), undefined)
  const didMount = useRef(false)
  const [avatarUrl, setAvatarUrl] = useState(user.avatar)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    if (state?.ack)
      toast.success("اطلاعات با موفقیت به روز شد.")
    else
      toast.error("تغییر اطلاعات با خطا مواجه شد.")
  }, [state])

  return (
    <form action={formAction} className='flex flex-col gap-6'>
      <h1 className='font-bold text-3xl'>ویرایش اطلاعات</h1>
      <div className='flex gap-6'>
        <Image src={avatarUrl || `/images/unknown-avatar.png`} alt='avatar' width={123} height={123} className='rounded-full overflow-hidden w-28 h-28 object-cover' />
        <AvatarUploader setAvatar={(imageUrl: string) => { setAvatarUrl(imageUrl) }} />
        {user.avatar && (
          <button type='button' className='bg-red-500 cursor-pointer px-6 py-2 rounded-md self-center text-white'
            onClick={() => setIsModalOpen(true)}>حذف تصویر پروفایل</button>)
        }
        {user.avatar && isModalOpen && <Modal closeModal={() => setIsModalOpen(false)}>
          <h3 className='font-bold text-xl'>آیا از حذف تصویر اطمینان دارید؟</h3>
          <div className='flex gap-4 mt-6'>
            <button className='flex-1 font-semibold cursor-pointer bg-red-500 px-4 py-1 rounded-md text-white' onClick={() => setIsModalOpen(false)}>لغو</button>
            <button className='flex-1 font-semibold cursor-pointer bg-green-600 px-4 py-1 rounded-md text-white' onClick={() => { deleteAvatar(user.userId); setAvatarUrl("") ;setIsModalOpen(false) }}>بله</button>
          </div>
        </Modal>
        }
      </div>
      <div className='grid grid-cols-3 gap-x-4 gap-y-8 '>
        <input type='hidden' value={avatarUrl} name='avatar' />
        <Input error={state?.errors.firstName} label='نام' name='firstName' defaultValue={state?.values.firstName || user.firstName} />
        <Input error={state?.errors.lastName} label='نام خانوادگی' name='lastName' defaultValue={state?.values.lastName || user.lastName} />
        <Input label='شغل (اختیاری)' name='job' defaultValue={state?.values.job || user.job} />
        <Input error={state?.errors.phone} label='موبایل' name='phone' defaultValue={state?.values.phone || user.phone} />
        <Input error={state?.errors.email} label='ایمیل (اختیاری)' name='email' defaultValue={state?.values.email || user.email} />
        <Input error={state?.errors.password} label='رمزعبور' name='password'
          defaultValue={state?.values.password || user.password} />
      </div>
      <button className='mr-auto bg-primary px-8 py-2.5 text-white rounded-lg cursor-pointer hover:bg-primary/90 duration-200 disabled:opacity-60 flex items-center gap-3'
        disabled={isPending} >
        ثبت تغییرات
        {isPending && <MiniSpinner />}
      </button>
    </form>
  )
}

export default EditProfile