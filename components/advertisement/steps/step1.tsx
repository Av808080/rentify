import Input from '@/components/shared/Input'
import { AdvertiseMentProps } from '@/types/advertisment.type'

const Step1 = ({onChange , data}:AdvertiseMentProps) => {
  return (
      <>
            <h3 className='font-bold text-lg'>لطفا اطلاعات زیر را تکمیل کنید.</h3>
            <Input onChange={onChange} name='mortgage_value' value={data.mortgage_value||""} type='number' label='رهن' placeholder='مثلا 350,0000,000 تومان' />
            <Input onChange={onChange} name='rent_value'value={data.rent_value||""} type='number' label='اجاره' placeholder='مثلا 15,0000,000 تومان' />
            <div className='relative'>

            <select value={data.type || "empty"} name='type' onChange={onChange} className='rounded-md ring ring-gray-400 focus:ring-primary peer pt-3 pb-2 px-4 w-full outline-0'>
                <option value="empty" hidden></option>
                <option value="Villa">ویلا</option>
                <option value="Villa_Apartment">خانه ویلایی</option>
                <option value="Apartment">آپارتمان</option>
            </select>
            <label className='px-1 absolute -top-3 right-4 peer-focus:right-1 duration-300 text-sm text-gray-500 bg-white peer-focus:text-primary'>نوع ملک</label>
            </div>
      </>
  )
}

export default Step1