import React from "react";
import MovingText from "react-moving-text";

const MyAnimatedTypo = ({children}) => {
  return (
    <div>
      <MovingText
        type="animation_type"
        duration="1000ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="infinite"
        fillMode="none"
      >
        {children}
      </MovingText>
    </div>
  );
};

export default MyAnimatedTypo;
