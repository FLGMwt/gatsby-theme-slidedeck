import React from 'react';

const PageWrapper = ({ otherProps, children, style }) => (
  <div {...otherProps} style={{ ...style, backgroundColor: 'red' }}>
    {children}
  </div>
);

export default PageWrapper;
