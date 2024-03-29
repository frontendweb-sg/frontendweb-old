import { ReactNode, createElement, forwardRef } from "react";

/**
 * Component
 * @param param0
 * @returns
 */

type ComponentProps = {
  children: ReactNode;
  className?: string;
  style?: object;
  as: string;
};
const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ as, children, ...rest }, ref) => {
    return createElement(as, { ref, ...rest }, children);
  }
);

export default Component;
