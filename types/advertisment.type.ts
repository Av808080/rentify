import { ChangeEvent } from "react";
import { Property } from "./Property.type";

export type AdvertiseMentProps = {
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  data: Property;
};

export type SelectLocation = {
  onSelectLocation: (lat: number, lng: number) => void;
};
