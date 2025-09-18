"use client"
import { SelectLocation } from '@/types/advertisment.type'
import dynamic from 'next/dynamic'

const _Map = dynamic(() => import("./map"), { ssr: false })

const Map = ({ onSelectLocation, lat, lng }: SelectLocation & { lat: number, lng: number }) => {
    return <_Map lat={lat} lng={lng} onSelectLocation={onSelectLocation} />
}

export default Map