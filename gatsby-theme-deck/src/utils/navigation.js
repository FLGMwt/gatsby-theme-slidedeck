import { navigate } from 'gatsby';

export const nextSlide = ({ deckSlug, slideNumber }) =>
  navigate(`/${deckSlug}/${slideNumber + 1}`);

export const previousSlide = ({ deckSlug, slideNumber }) =>
  navigate(`/${deckSlug}/${slideNumber - 1}`);

export const firstSlide = ({ deckSlug }) => navigate(`/${deckSlug}/1`);

export const lastSlide = ({ deckSlug, lastSlide }) =>
  navigate(`/${deckSlug}/${lastSlide}`);

export const home = () => navigate(`/`);
