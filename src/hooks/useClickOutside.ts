import { useEffect, RefObject } from 'react';

interface ClickOutsideProps {
  current: HTMLElement | null;
}

export const useClickOutside = (
  ref: RefObject<ClickOutsideProps>,
  callback: () => void,
) => {
  const handleClick = (e: MouseEvent) => {
    if (
      ref.current &&
      ref.current instanceof HTMLElement &&
      !ref.current.contains(e.target as Node)
    ) {
      callback();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => handleClick(e);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
