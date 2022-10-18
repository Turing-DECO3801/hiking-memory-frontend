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

  /**
   * Updates the index of the currently selected gallery for stored
   * information on page changes
   * 
   * @param index Index of the currently selected image gallery
   */
  const updateSelectedGallery = (index: number) => {
    setGalleryIndex(index);
  };

  /**
   * Updates the status of the gallery
   * 
   * @param status Whether the gallery should be displayed
   */
  const setGalleryStatus = (status: boolean) => {
    setGallerySelected(status);
  }

  return { galleryIndex, gallerySelected, updateSelectedGallery, setGalleryStatus };
};
