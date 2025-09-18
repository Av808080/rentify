import { Facilities } from '@/constants/facilities'
import { AdvertiseMentProps } from '@/types/advertisment.type'

const Step4 = ({onChange , data}:AdvertiseMentProps) => {
    return (
        <>
            <h3 className='font-bold text-lg'>تجهیزات و امکانات</h3>
            <div className='grid grid-cols-3 gap-y-4'>
                {Facilities.map(facility => <div key={facility.id} className='flex gap-2 items-center'>
                    <input type='checkbox' name='facilities' value={facility.title} onChange={onChange}
                     className='cursor-pointer accent-primary w-4 h-4' checked={data.facilities.includes(facility.title)} />
                    <label >{facility.title}</label>
                </div>)}
            </div>
        </>
    )
}

export default Step4