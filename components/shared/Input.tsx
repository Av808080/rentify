"use client"
import { useState } from "react"
import Image from "next/image"

const Input = ({ label, placeholder, name, error,defaultValue , type = "text" }: { label: string, placeholder?: string, name: string, error?:string , defaultValue?:string|undefined, type?: "text" | "number" | "password" | "tel" }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className='relative flex flex-col gap-2'>
            <input type={type !== "password" ? type : (showPassword ? "text" : "password")} name={name} id={name} placeholder={placeholder} defaultValue={defaultValue||""}
                className={`outline-0 rounded-md ring ring-gray-400 focus:ring-primary peer pt-3 pb-2 px-4 w-full`} />
            {type === "password" &&
                <Image src={`/svgs/eye-${showPassword ? "hide" : "show"}-password.svg`}
                    className="absolute left-2 top-2.5"
                    alt="" width={24} height={24} onClick={() => setShowPassword(s => !s)} />
            }
            <label htmlFor={name} className='absolute text-sm -top-3 right-4 bg-white text-gray-600 px-1 peer-focus:right-1 duration-300 peer-focus:text-primary'>{label}</label>
            {error && <span className="text-red-600">{error}</span>}

        </div>
    )
}

export default Input