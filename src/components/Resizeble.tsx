import React, { useState, useRef, useEffect } from 'react';

const ResizableComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        height: 200,
        width: 500,
        border: '1px solid black',
        position: 'relative',
        resize: 'both',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default ResizableComponent;
