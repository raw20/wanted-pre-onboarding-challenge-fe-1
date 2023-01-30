import React from "react";
import { forwardRef } from "react";
import { BarProps, Ref } from "../../types/IProps";

export const Bar = forwardRef<Ref, BarProps>((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));
