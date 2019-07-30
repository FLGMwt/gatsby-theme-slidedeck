import { useEffect } from 'react';
import { nextSlide, previousSlide, firstSlide, home } from '../navigation';
import {
  nextKeyCodes,
  previousKeyCodes,
  resetKeyCodes,
  homeKeyCodes,
} from './config';
import { useSwipeable } from 'react-swipeable';

const useShortcuts = ({ deckSlug, slideNumber, lastSlide }) => {
  const canNext = slideNumber !== lastSlide;
  const canPrevious = slideNumber !== 1;
  useEffect(() => {
    const shortcutListener = e => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
        // don't want to muck with browser shortcuts (ALT+left, CTRL/meta + R)
        return;
      }

      if (nextKeyCodes.includes(e.code) && canNext) {
        nextSlide({ deckSlug, slideNumber });
      }
      if (previousKeyCodes.includes(e.code) && canPrevious) {
        previousSlide({ deckSlug, slideNumber });
      }
      if (resetKeyCodes.includes(e.code)) {
        firstSlide({ deckSlug });
      }
      if (homeKeyCodes.includes(e.code)) {
        home();
      }
    };
    document.addEventListener('keyup', shortcutListener);
    return () => document.removeEventListener('keyup', shortcutListener);
  }, []);

  return useSwipeable({
    onSwipedLeft: () => canNext && nextSlide({ deckSlug, slideNumber }),
    onSwipedRight: () =>
      canPrevious && previousSlide({ deckSlug, slideNumber }),
    preventDefaultTouchmoveEvent: true,
  });
};

export default useShortcuts;
