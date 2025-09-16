"use client";
import { UploadButton } from "@/utils/uploadthing";
import toast from "react-hot-toast";

const AvatarUploader = ({ setAvatar }: { setAvatar: (imageUrl: string) => void }) => {
  return (
    <main className="py-4">
      <UploadButton
        content={{
          button: ({ ready, isUploading }) => {
            if (!ready)
              return "درحال آماده سازی"
            if (isUploading)
              return null
            return "تغییر تصویر"
          }, allowedContent: "تصویری تا حداکثر 4 مگابایت آپلود کنید",
        }}
        appearance={{ container: { padding: "4px" }, button: { background: "#0d6efd" } }}
        endpoint="avatarUploader"
        onClientUploadComplete={(res) => {
          setAvatar(res[0].url)
          toast.success("برای تایید تصویر تغییرات را ثبت کنید." ,{duration:6000})
        }}
        onUploadError={() => {
          toast.error("تغییر تصویر پروفایل با خطا مواجه شد.")
        }}
      />
    </main>
  );
}

export default AvatarUploader