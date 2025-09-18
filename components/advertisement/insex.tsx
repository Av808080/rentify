"use client"
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { Step1, Step2, Step3, Step4, Step5, Step6 } from './steps'
import PaginationButtons from './PaginationButtons'
import { Property } from '@/types/Property.type'

const Advertisement = () => {
  const [step, setStep] = useState(6)
  const [data, setData] = useState({
    facilities: [] as string[],
    is_empty: false,
    imageUrls: [] as string[]
  } as Property)
  console.log({ data });
  const onSelectLocation = (lat: number, lng: number) => setData((d) => ({ ...d, lat, lng }))
  const onSetImages = (images:string[])=>setData(d=> ({...d , imageUrls:[...d.imageUrls , ... images]})) 
  const onDeleteImage = (imageUrl:string) => setData(d=>({...d , imageUrls:d.imageUrls.filter(_image => _image !== imageUrl )}))
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === "is_empty")
      return setData(d => ({ ...d, is_empty: value === "true" }))
    if (name === "facilities")
      if (data.facilities.includes(value))
        return setData(d => ({ ...d, facilities: d.facilities.filter(facility => facility !== value) }))
      else
        return setData(d => ({ ...d, facilities: [...d.facilities, value] }))
    setData(d => ({ ...d, [name]: value }))
  }
  return (
    <main className='flex h-[530px] gap-6 px-4'>
      <aside className='flex-1/4 flex flex-col justify-around items-center'>
        <div className='flex flex-col gap-4'>
          <h1 className='font-bold text-4xl text-center'>ثبت آگهی</h1>
          <p className='text-gray-500 text-center'>آگهی ملکت رو اینجا ثبت کن و به راحتی مستاجر پیدا کن.</p>
        </div>
        <Image src='/svgs/amico.svg' alt='' width={250} height={245} />
      </aside>
      <section className='flex-3/4 flex gap-4'>
        <Image src={`/svgs/advertisement/step-${step}.svg`} width={287} height={608} alt={`مرحله ${step}`} />
        <div className='flex flex-col gap-8 w-full py-4 px-2'>
          {step === 1 && <Step1 data={data} onChange={onChange} />}
          {step === 2 && <Step2 data={data} onChange={onChange} onSelectLocation={onSelectLocation} />}
          {step === 3 && <Step3 data={data} onChange={onChange} />}
          {step === 4 && <Step4 data={data} onChange={onChange} />}
          {step === 5 && <Step5 data={data} onChange={onChange} />}
          {step === 6 && <Step6 data={data} onSetImages={onSetImages} onDeleteImage={onDeleteImage} />}
          <PaginationButtons data={data} step={step} changePreviousStep={() => setStep(s => s - 1)} changeNextStep={() => setStep(s => s + 1)} />
        </div>

      </section>

    </main>
  )
}

export default Advertisement