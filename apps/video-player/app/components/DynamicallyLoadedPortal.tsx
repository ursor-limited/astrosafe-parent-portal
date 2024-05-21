"use client";

import { createPortal } from "react-dom";

const DynamicallyLoadedPortal = (props: { children: React.ReactNode }) =>
  createPortal(props.children, document.body);

export default DynamicallyLoadedPortal;
