import { funk } from '@theme-ui/presets';
import prism from './prism';

export default {
  ...funk,
  styles: {
    ...funk.styles,
    pre: {
      ...funk.styles.pre,
      ...prism,
    },
  },
};
