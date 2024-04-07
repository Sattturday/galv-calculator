import React from 'react';
import ResizableComponent from '../../components/Resizeble';

export const Mass: React.FC = () => {
  return (
    <div className="wrapper">
      <ResizableComponent>
        <p
          className="title"
          style={{
            padding: '50px',
          }}
        >
          Очень скоро здесь будет калькулятор
        </p>
      </ResizableComponent>
    </div>
  );
};
