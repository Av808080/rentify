import Image from 'next/image'
import ImageUploader from '@/components/shared/ImageUploader'
import { AdvertiseMentProps } from '@/types/advertisment.type'

type Props = AdvertiseMentProps & {
  onSetImages: (images: string[]) => void,
  onDeleteImage: (imageUrl: string) => void
}

const Step6 = ({ onSetImages, onDeleteImage, data }: Props) => {
  return (
    <>
      <h3 className='font-bold text-lg'>تصاویر ملک خود را بارگذاری کنید.</h3>
      <ImageUploader setImage={onSetImages} />
      {!!data.imageUrls.length && (
        <div className='grid grid-cols-3 gap-6'>
          {data.imageUrls.map(image => <div key={image} className='relative'>
            <button type='button' onClick={onDeleteImage.bind(null, image)} title='حذف تصویر' className='bg-red-500 rounded-full w-5 h-5 text-white flex justify-center items-center absolute top-1 right-1 text-lg cursor-pointer'>&times;</button>
            <Image src={image} alt='' width={400} height={200} className='w-80 h-40 object-cover rounded-md' />
          </div>
          )}
        </div>
      )
      }
    </>
  )
}

export default Step6