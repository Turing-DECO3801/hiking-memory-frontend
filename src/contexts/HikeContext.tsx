import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateHikeName } from '../api';

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

  const setHikeData = async (hike: HikeData) => {
    setHike(hike);
  };

  const updateHikePath = (name: string) => {
    setHike({
      ... hike as HikeData, path_name: name
    })
  }


  return { hike, setHikeData, updateHikePath };
};
