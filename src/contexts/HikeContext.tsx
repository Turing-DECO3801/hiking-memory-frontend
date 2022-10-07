import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HikeContext {
  hike: HikeData | undefined
  setHikeData: (data: HikeData) => void
}

export const HikeContext = createContext<HikeContext>({
  hike: undefined,
  setHikeData: (data: HikeData) => null
});

export const useHikeState = (): HikeContext => {
  const [hike, setHike] = useState<HikeData>();

  const setHikeData = async (hike: HikeData) => {
    setHike(hike);
  };


  return { hike, setHikeData };
};
