import { AdvertiseMentProps } from '@/types/advertisment.type'
import React from 'react'

const Step5 = ({ onChange, data }: AdvertiseMentProps) => {
    return (
        <>
            <h3 className='font-bold text-lg'>توضیحات تکمیلی</h3>
            <textarea onChange={onChange} name="description" value={data.description} rows={8} className='resize-none outline-0 ring ring-gray-400 focus:ring-primary px-4 py-2 rounded-md' placeholder='توضیحات خود را اینجا بنویسید.'
            ></textarea>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-2 items-center'>
                    <input name='is_empty' value={"false"} checked={!data.is_empty} type='radio' onChange={onChange} className='w-4 h-4 accent-primary cursor-pointer' />
                    <label htmlFor="">ملک در اجاره است.</label>
                </div>
                <div className='flex gap-2 items-center'>
                    <input name='is_empty' value={"true"} checked={data.is_empty} type='radio' onChange={onChange} className='w-4 h-4 accent-primary cursor-pointer' />
                    <label htmlFor="">ملک تخلیه و آماده بازدید است.</label>
                </div>
            </div>
        </>
    )
}

export default Step5