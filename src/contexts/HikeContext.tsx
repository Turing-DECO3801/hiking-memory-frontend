import { createContext, useState } from 'react';

interface HikeContext {
  hike: HikeData | undefined
  setHikeData: (data: HikeData) => void
  updateHikePath: (name: string) => void
}

export const HikeContext = createContext<HikeContext>({
  hike: undefined,
  setHikeData: (data: HikeData) => null,
  updateHikePath: (data: string) => null
});

export const useHikeState = (): HikeContext => {
  const [hike, setHike] = useState<HikeData>();

  /**
   * Updates the current hike to be shared between components
   * 
   * @param hike Hike Data
   */
  const setHikeData = async (hike: HikeData) => {
    setHike(hike);
  };

  /**
   * Updates the current hike name to be shared between components
   * 
   * @param name Name of the hike to be changed
   */
  const updateHikePath = (name: string) => {
    setHike({
      ... hike as HikeData, path_name: name
    })
  }


  return { hike, setHikeData, updateHikePath };
};
