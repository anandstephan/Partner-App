import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const TodoListIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={24} height={24} fill="url(#pattern0_421_3269)" />
    <Defs>
      <Pattern
        id="pattern0_421_3269"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_421_3269" transform="scale(0.0078125)" />
      </Pattern>
      <Image
        id="image0_421_3269"
        width={128}
        height={128}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default TodoListIcon;
