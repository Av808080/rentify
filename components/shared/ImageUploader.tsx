import { UploadButton } from '@/utils/uploadthing'
import React from 'react'

const ImageUploader = ({ setImage } : {setImage:( imageUrl: string[])=>void }) => {
    return (
        <>
            <UploadButton endpoint='imageUploader'
            
                appearance={{}}
                content={{
                    button: ({ ready, isUploading }) => {
                        if (!ready)
                            return "درحال آماده سازی"
                        if (isUploading)
                            return null
                        return "انتخاب تصاویر"
                    }, allowedContent: "حداکثر 6 تصویر میتوانید بارگذاری کنید.",
                }}
                onClientUploadComplete={(res) => setImage(res.map(i => i.url))}
            />

        </>
    )
}

export default ImageUploader