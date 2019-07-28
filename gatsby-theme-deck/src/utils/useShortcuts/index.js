import { useEffect } from 'react';
import { nextSlide, previousSlide, firstSlide, home } from '../navigation';
import {
  nextKeyCodes,
  previousKeyCodes,
  resetKeyCodes,
  homeKeyCodes,
} from './config';

const useShortcuts = ({ deckSlug, slideNumber, lastSlide }) => {
  useEffect(() => {
    const shortcutListener = e => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
        // don't want to muck with browser shortcuts (ALT+left, CTRL/meta + R)
        return;
      }

      if (nextKeyCodes.includes(e.code) && slideNumber !== lastSlide) {
        nextSlide({ deckSlug, slideNumber });
      }
      if (previousKeyCodes.includes(e.code) && slideNumber !== 1) {
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
};

export default useShortcuts;
