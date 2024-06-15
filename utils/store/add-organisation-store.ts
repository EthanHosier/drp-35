import { ImagePickerAsset } from "expo-image-picker";
import { create } from "zustand";

type OrganisationFieldsStore = {
  imageUri: string;
  imageBase64: string;
  imageMimeType: string;
  setImageFromPicker: (imagePickerAsset: ImagePickerAsset) => void;
  name: string;
  setName: (name: string) => void;
  subtitle: string;
  setSubtitle: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  resetAddOrganisationStore: () => void;
};

export const useOrganisationFieldsStore = create<OrganisationFieldsStore>(
  (set) => ({
    active: false,
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
    subtitle: "",
    setSubtitle: (subtitle: string) => {
      set({ subtitle });
    },
    description: "",
    setDescription: (description: string) => {
      set({ description });
    },
    resetAddOrganisationStore: () => {
      set({
        imageUri: "",
        imageBase64: "",
        imageMimeType: "",
        name: "",
        subtitle: "",
        description: "",
      });
    },
  })
);
