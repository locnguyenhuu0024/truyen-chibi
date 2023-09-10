import { useEffect, useState } from 'react';
import { Breakpoints } from '../types/Screen';

const getScreenWidth = (): number => {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

const useScreenSize = () => {
  const screenWidth: number = getScreenWidth();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    if (screenWidth < Breakpoints.ExtraSmall) {
      setIsMobile(true);
      setIsTablet(false);
      setIsLargeScreen(false);
    } else if (screenWidth >= Breakpoints.ExtraLarge && screenWidth < Breakpoints.Medium) {
      setIsMobile(false);
      setIsTablet(true);
      setIsLargeScreen(false);
    } else if (screenWidth >= Breakpoints.Medium && screenWidth < Breakpoints.Large) {
      setIsMobile(false);
      setIsTablet(false);
      setIsLargeScreen(true);
    } else {
      setIsMobile(false);
      setIsTablet(false);
      setIsLargeScreen(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isMobile,
    isTablet,
    isLargeScreen,
  };
};

export default useScreenSize;
