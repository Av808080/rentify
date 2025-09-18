import { register_AdvertiseMent } from "@/lib/actions/register-advertiseMent"
import { Property } from "@/types/Property.type"

type Props = {
    changeNextStep: () => void,
    changePreviousStep: () => void,
    step: number
    data: Property
}

const PaginationButtons = ({ changeNextStep, changePreviousStep, step, data }: Props) => {

    return (
        <div className='mt-auto mr-auto flex gap-4'>
            {step > 1 && <button onClick={changePreviousStep} className='cursor-pointer px-12 py-2 rounded-md ring-primary ring'>مرحله قبل</button>}
            {step === 6 ? <form>
                <button type="submit" className='cursor-pointer px-12 py-2 rounded-md bg-primary hover:bg-primary/90 duration-200 disabled:opacity-50 text-white ring ring-primary'>ثبت نهایی</button>
            </form> : <button onClick={() => step < 6 && changeNextStep()} disabled={step > 5}
                className='cursor-pointer px-12 py-2 rounded-md bg-primary hover:bg-primary/90 duration-200 disabled:opacity-50 text-white ring ring-primary'>ادامه</button>
            }
        </div>
    )
}

export default PaginationButtons