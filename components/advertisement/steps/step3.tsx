import Input from '@/components/shared/Input'
import { AdvertiseMentProps } from '@/types/advertisment.type'

const Step3 = ({ onChange, data }: AdvertiseMentProps) => {
    return (
        <>
            <h3 className='font-bold text-lg'>لطفا اطلاعات زیر را تکمیل کنید.</h3>
            <div className='grid grid-cols-2 gap-y-8 gap-x-4'>
                <Input onChange={onChange} value={data.number_of_bedrooms || ""} name='number_of_bedrooms' label='تعداد اتاق خواب' type='number' />
                <Input onChange={onChange} value={data.construction_year || ""} type='number' name='construction_year' label='سال ساخت' />
                <Input onChange={onChange} value={data.area||""} name='area' label='متراژ بنا' type='number' />
                <Input onChange={onChange} value={data.infrastructure_area || ""} name='infrastructure_area' label='متراژ زیربنا' type='number' />
                <div className='relative'>
                    <select value={data.geoLoaction || "empty"} name='geoLoaction' onChange={onChange} className='rounded-md ring ring-gray-400 focus:ring-primary peer pt-3 pb-2 px-4 w-full outline-0'>
                        <option value="empty" hidden></option>
                        <option value="South">جنوبی</option>
                        <option value="North">شمالی</option>
                    </select>
                    <label className='px-1 absolute -top-3 right-4 peer-focus:right-1 duration-300 text-sm text-gray-500 bg-white peer-focus:text-primary'>موقعیت جغرافیایی</label>
                </div>
                <Input onChange={onChange} value={data.floor || ""} type='number' name='floor' label='طبقه' />
                <Input onChange={onChange} value={data.all_floors || ""} type='number' name='all_floors' label='کل طبقات' />
                <Input onChange={onChange} value={data.apartment_per_floor || ""} type='number' name='apartment_per_floor' label='تعداد طبقه در هر واحد' />
            </div>

        </>
    )
}

export default Step3