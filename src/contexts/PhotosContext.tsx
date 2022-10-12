import { createContext, useState } from 'react';

interface PhotosContext {
  galleryIndex: number
  gallerySelected: boolean
  updateSelectedGallery: (index: number) => void
  setGalleryStatus: (status: boolean) => void
}

export const PhotosContext = createContext<PhotosContext>({
    galleryIndex: 0,
    gallerySelected: false,
    updateSelectedGallery: (index: number) => null,
    setGalleryStatus: (status: boolean) => null,
});

export const usePhotosState = (): PhotosContext => {
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [gallerySelected, setGallerySelected] = useState<boolean>(false);

  const updateSelectedGallery = (index: number) => {
    setGalleryIndex(index);
  };

  const setGalleryStatus = (status: boolean) => {
    setGallerySelected(status);
  }

  return { galleryIndex, gallerySelected, updateSelectedGallery, setGalleryStatus };
};
