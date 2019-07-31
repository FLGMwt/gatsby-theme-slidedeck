import React from 'react';
import { Styled } from 'theme-ui';

const SlideHeader = ({ title, slideNumber, lastSlide }) => (
  <Styled.h3 css={{ textAlign: 'right' }}>
    {title} {slideNumber}/{lastSlide}
  </Styled.h3>
);
export default SlideHeader;
