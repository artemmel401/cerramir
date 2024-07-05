import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

const useWidth = (): number => {
  const [isMobile, setIsMobile] = useState(window.innerWidth);

  useEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth);
    };

    const debouncedUpdateSize = debounce(updateSize, 250);

    window.addEventListener('resize', debouncedUpdateSize);

    return (): void => {
      window.removeEventListener('resize', debouncedUpdateSize);
    };
  }, []);
  return isMobile;
};

export default useWidth;

