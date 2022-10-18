import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Routing from './Routing';
import { useAuthState, AuthContext } from '../contexts/AuthContext';
import { useHikeState, HikeContext } from '../contexts/HikeContext';
import { usePhotosState, PhotosContext } from '../contexts/PhotosContext';
import "../styles/index.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  /**
   * Contexts for passing of information between the different components
   */
  const authState = useAuthState();
  const hikeState = useHikeState();
  const photosState = usePhotosState();

  /**
   * Scrolls to the top of the page on page change
   * 
   * @returns 
   */
  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }
  
  return (
    <AuthContext.Provider value={authState}>
      <HikeContext.Provider value={hikeState}>
        <PhotosContext.Provider value={photosState}>
          <ScrollToTop />
          <div>
            <Routing />
          </div>
        </PhotosContext.Provider>
      </HikeContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;