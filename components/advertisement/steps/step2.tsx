import Map from '@/components/Map'
import Input from '@/components/shared/Input'
import { AdvertiseMentProps, SelectLocation } from '@/types/advertisment.type'

const Step2 = ({ data, onChange ,onSelectLocation }: AdvertiseMentProps & SelectLocation ) => {
    return (
        <>
            <h3 className='font-bold text-lg'>لطفا اطلاعات زیر را تکمیل کنید.</h3>
            <div className='grid grid-cols-2 gap-4 w-full'>
                <div className='relative'>
                    <select value={data.city || "empty"} name='city' onChange={onChange} className='rounded-md ring ring-gray-400 focus:ring-primary peer pt-3 pb-2 px-4 w-full outline-0'>
                        <option value="empty" hidden></option>
                        <option value="Tehran">تهران</option>
                        <option value="Karaj">کرج</option>
                    </select>
                    <label className='px-1 absolute -top-3 right-4 peer-focus:right-1 duration-300 text-sm text-gray-500 bg-white peer-focus:text-primary'>شهر</label>
                </div>
                <Input name='district' value={data.district || ""} onChange={onChange} label='خیابان یا محله اصلی' />
                <div className='col-span-2'>
                    <Input name='address' value={data.address || ""} onChange={onChange} label='آدرس کامل' />
                </div>
            </div>
            <div className='w-full h-60'>
                <Map onSelectLocation={onSelectLocation} lat={data.lat} lng={data.lng} />
            </div>
        </>
    )
}

export default Step2