import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const BoxIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={24} height={24} fill="url(#pattern0_421_3270)" />
    <Defs>
      <Pattern
        id="pattern0_421_3270"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_421_3270" transform="scale(0.0078125)" />
      </Pattern>
      <Image
        id="image0_421_3270"
        width={128}
        height={128}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default BoxIcon;
