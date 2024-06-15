import { ImagePickerAsset } from "expo-image-picker";
import { create } from "zustand";

type ProjectFieldsStore = {
  imageUri: string;
  imageBase64: string;
  imageMimeType: string;
  setImageFromPicker: (imagePickerAsset: ImagePickerAsset) => void;
  name: string;
  setName: (name: string) => void;
  organisation: string;
  setOrganisation: (organisation: string) => void;
  description: string;
  setDescription: (description: string) => void;
  minGroupSize: string;
  setMinGroupSize: (minGroupSize: string) => void;
  maxGroupSize: string;
  setMaxGroupSize: (maxGroupSize: string) => void;
  startDateTime: Date;
  setStartDateTime: (startDateTime: Date) => void;
  endDateTime: Date;
  setEndDateTime: (endDateTime: Date) => void;
  resetAddProjectStore: () => void;
};

export const useProjectFieldsStore = create<ProjectFieldsStore>((set) => ({
  imageUri: "",
  imageBase64: "",
  imageMimeType: "",
  setImageFromPicker: (imagePickerAsset) => {
    set({
      imageUri: imagePickerAsset.uri,
      imageBase64: imagePickerAsset.base64!,
      imageMimeType: imagePickerAsset.mimeType,
    });
  },
  name: "",
  setName: (name: string) => {
    set({ name });
  },
  organisation: "",
  setOrganisation: (organisation: string) => {
    set({ organisation });
  },
  description: "",
  setDescription: (description: string) => {
    set({ description });
  },
  minGroupSize: "",
  setMinGroupSize: (minGroupSize: string) => {
    set({ minGroupSize });
  },
  maxGroupSize: "",
  setMaxGroupSize: (maxGroupSize: string) => {
    set({ maxGroupSize });
  },
  startDateTime: new Date(),
  setStartDateTime: (startDateTime: Date) => {
    set({ startDateTime });
  },
  endDateTime: new Date(),
  setEndDateTime: (endDateTime: Date) => {
    set({ endDateTime });
  },
  resetAddProjectStore: () => {
    set({
      imageUri: "",
      imageBase64: "",
      imageMimeType: "",
      name: "",
      organisation: "",
      description: "",
      minGroupSize: "",
      maxGroupSize: "",
      startDateTime: new Date(),
      endDateTime: new Date(),
    });
  },
}));
