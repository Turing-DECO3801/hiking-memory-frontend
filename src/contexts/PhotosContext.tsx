import { createContext, useState } from 'react';

interface PhotosContext {
    images: HikeData | undefined
    setImages: (data: HikeData) => void
    updateImages: (name: string) => void
}

export const PhotosContext = createContext<PhotosContext>({
    images: undefined,
    setImages: (data: HikeData) => null,
    updateImages: (data: string) => null
});

export const usePhotosState = (): PhotosContext => {
  const [images, setImages] = useState<HikeData>();

  const setHikeData = async (hike: HikeData) => {
    setImages(images);
  };

  const updateImages = (name: string) => {
    setImages({
      ... images as HikeData, path_name: name
    })
  }


  return { images, setImages, updateImages };
};
