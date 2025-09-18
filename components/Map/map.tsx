"use client"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapIcon } from '@/constants/MapIcon'
import { SelectLocation } from '@/types/advertisment.type';

const LocationSeletor = ({ onSelect }: { onSelect: (lat: number, lng: number) => void }) => {
    useMapEvents({
        click: (e) => {
            onSelect(e.latlng.lat, e.latlng.lng)
        }
    })
    return null
}

const Map = ({ onSelectLocation, lat = 35.74, lng = 51.3 }: SelectLocation & {lat:number , lng:number}) => {

    return (
        <MapContainer className='h-full border border-gray-400 rounded-md shadow-md shadow-slate-400' center={[lat, lng]} zoom={15} scrollWheelZoom={false} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSeletor onSelect={onSelectLocation} />
            <Marker position={[lat, lng]} icon={MapIcon}>
                <Popup>
                    {/* <h2 className='font-semibold font-vazirmatn'>
                        جنت آباد جنوبی - {position}
                    </h2> */}
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map


