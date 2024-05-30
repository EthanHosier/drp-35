import { ImagePickerAsset } from "expo-image-picker";
import { create } from "zustand";

type ProfileStore = {
  imageUri: string;
  imageBase64: string;
  imageMimeType: string;
  setImageUri: (newImageUri: string) => void;
  setImageFromPicker: (imagePickerAsset: ImagePickerAsset) => void;
  fullName: string;
  setFullName: (newName: string) => void;
  pronouns: string;
  setPronouns: (newPronouns: string) => void;
  university: string;
  setUniversity: (newUniversity: string) => void;
  course: string;
  setCourse: (newCourse: string) => void;
  linkedin: string;
  setLinkedin: (newLinkedin: string) => void;
  github: string;
  setGithub: (newGithub: string) => void;
  website: string;
  setWebsite: (newWebsite: string) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  imageUri: "",
  imageBase64: "",
  imageMimeType: "",
  setImageUri: (newImageUri) => {
    set({ imageUri: newImageUri });
  },
  setImageFromPicker: (imagePickerAsset) => {
    set({
      imageUri: imagePickerAsset.uri,
      imageBase64: imagePickerAsset.base64!,
      imageMimeType: imagePickerAsset.mimeType,
    });
  },
  fullName: "",
  setFullName: (newName) => {
    set({ fullName: newName });
  },
  pronouns: "",
  setPronouns: (newPronouns) => {
    set({ pronouns: newPronouns });
  },
  university: "",
  setUniversity: (newUniversity) => {
    set({ university: newUniversity });
  },
  course: "",
  setCourse: (newCourse) => {
    set({ course: newCourse });
  },
  linkedin: "",
  setLinkedin: (newLinkedin) => {
    set({ linkedin: newLinkedin });
  },
  github: "",
  setGithub: (newGithub) => {
    set({ github: newGithub });
  },
  website: "",
  setWebsite: (newWebsite) => {
    set({ website: newWebsite });
  },
}));
