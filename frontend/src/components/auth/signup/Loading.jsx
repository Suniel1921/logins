import React from 'react';

const Loading = () => {
  return (
    <>
      <div className="spinner"></div>

      <style>
        {`
          .spinner {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: conic-gradient(#0000 10%, #474bff);
            -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
            animation: spinner-zp9dbg 1s infinite linear;
          }

          @keyframes spinner-zp9dbg {
            to {
              transform: rotate(1turn);
            }
          }
        `}
      </style>
    </>
  );
};

export default Loading;
