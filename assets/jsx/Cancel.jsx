import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const Cancel = (props) => (
  <Svg
    width={23}
    height={23}
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={23} height={23} fill="url(#pattern0_421_24970)" />
    <Defs>
      <Pattern
        id="pattern0_421_24970"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_421_24970" transform="scale(0.0078125)" />
      </Pattern>
      <Image
        id="image0_421_24970"
        width={128}
        height={128}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default Cancel;
