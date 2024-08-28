// src/account/index.tsx
import React31 from "react";
import { isMobile as isMobile2 } from "react-device-detect";

// src/images/icons/PhoneIcon.svg
var PhoneIcon_default = "./PhoneIcon-MJHFFITM.svg";

// src/images/icons/PeopleIcon.svg
var PeopleIcon_default = "./PeopleIcon-K7ASISCP.svg";

// src/images/icons/ClockIcon.svg
var ClockIcon_default = "./ClockIcon-DSLNP6CH.svg";

// src/account/contents/common.tsx
import { Stack as Stack46 } from "@mui/system";
import { useCallback as useCallback2, useContext as useContext4, useEffect as useEffect22, useState as useState38 } from "react";

// src/ui/ursor-button.tsx
import { Stack, keyframes } from "@mui/system";
import React3, { useEffect, useState } from "react";

// src/ui/palette.ts
var PALETTE = {
  primary: {
    indigo: "#2E2657",
    navy: "#0D2839",
    offWhite: "#F8F8F8"
  },
  secondary: {
    blue: {
      1: "#89AFFF",
      2: "#6596FF",
      3: "#1D62F6",
      4: "#0042CF",
      5: "#003098"
    },
    green: {
      1: "#D6FFF0",
      2: "#90F7D2",
      3: "#0AE799",
      4: "#12D08D",
      5: "#129A6A"
    },
    orange: {
      1: "#FFF3DD",
      2: "#FFD7B2",
      3: "#FD9B41",
      4: "#F28521",
      5: "#E06E04"
    },
    purple: {
      1: "#A594FF",
      2: "#7B61FF",
      3: "#584AA4",
      4: "#2E2657",
      5: "#221D3D"
    },
    pink: {
      1: "#FDD2ED",
      2: "#F9A6DA",
      3: "#F279C5",
      4: "#E758B2",
      5: "#D92E99"
    },
    grey: {
      1: "#F7F7F7",
      2: "#EBEBEB",
      3: "#A9A9A9",
      4: "#787878",
      5: "#3C3C43"
    },
    red: {
      1: "#ffd1d9",
      2: "#ff99aa",
      3: "#ff5c78",
      4: "#e8092f",
      5: "#b0001d"
    },
    yellow: {
      1: "#fffdd1",
      2: "#fffb9c",
      3: "#fff95c",
      4: "#f2eb00",
      5: "#dbd400"
    }
  },
  font: {
    light: "#F8F8F8",
    dark: "#0D2839"
  },
  system: {
    green: "#09D08A",
    orange: "#FD9B41",
    red: "#FC5C5C"
  }
};

// src/ui/typography.tsx
import React2 from "react";
import { Box } from "@mui/system";
var DEFAULT_FONT_WEIGHT = 360;
var BOLD_FONT_WEIGHT = 500;
var getMaxLinesStyle = (n) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: n
  //wordBreak: "break-word",
});
var FONT_SIZES = {
  h0: 80,
  h1: 56,
  h2: 48,
  h3: 40,
  h4: 32,
  h5: 24,
  large: 20,
  medium: 18,
  normal: 16,
  small: 14,
  tiny: 10
};
var LINE_HEIGHTS = {
  h0: 80,
  h1: 62,
  h2: 53,
  h3: 44,
  h4: 35,
  h5: 26,
  large: 28,
  medium: 25,
  normal: 22,
  small: 20,
  tiny: 11
};
var DEFAULT_BOLD = [
  "h0",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5"
];
function Typography(props) {
  return /* @__PURE__ */ React2.createElement(
    Box,
    {
      color: props.color || PALETTE.font.dark,
      fontSize: `${(props.scale || 1) * FONT_SIZES[props.variant ?? "normal"]}px`,
      fontWeight: props.bold || props.variant && DEFAULT_BOLD.includes(props.variant) ? BOLD_FONT_WEIGHT : DEFAULT_FONT_WEIGHT,
      lineHeight: `${(props.scale || 1) * LINE_HEIGHTS[props.variant ?? "normal"]}px`,
      maxWidth: "fit-content",
      onClick: props.onClick,
      sx: {
        ...props.sx,
        ...props.faded ? {
          opacity: 0.6
        } : null,
        ...props.noWrap ? {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        } : null,
        ...props.maxLines ? getMaxLinesStyle(props.maxLines) : null,
        transition: "0.2s"
      }
    },
    props.htmlTag ? /* @__PURE__ */ React2.createElement(
      props.htmlTag,
      {
        style: {
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          lineHeight: "inherit",
          display: "contents"
        }
      },
      props.children
    ) : props.children
  );
}

// src/ui/ursor-button.tsx
var spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(180deg);
}
`;
var HEIGHTS = {
  large: 52,
  medium: 42,
  small: 28,
  tiny: 20
};
var ICON_SIZES = {
  large: 26,
  medium: 20,
  small: 20,
  tiny: 16
};
var PADDINGS = {
  large: { x: 32, y: 12 },
  medium: {
    x: 24,
    y: 8
  },
  small: {
    x: 16,
    y: 4
  },
  tiny: {
    x: 12,
    y: 2
  }
};
var BACKGROUND_COLORS = {
  light: {
    primary: {
      enabled: PALETTE.primary.indigo,
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.secondary.purple[3]
    },
    secondary: {
      enabled: PALETTE.font.light,
      hover: PALETTE.font.light,
      pressed: PALETTE.secondary.grey[2]
    }
  },
  dark: {
    primary: {
      enabled: "rgb(255,255,255)",
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.secondary.grey[1]
    },
    tertiary: {
      enabled: PALETTE.secondary.purple[2],
      hover: PALETTE.secondary.purple[3],
      pressed: PALETTE.secondary.purple[1]
    }
  }
};
var FONT_COLORS = {
  light: {
    primary: {
      enabled: PALETTE.font.light,
      hover: PALETTE.font.light,
      pressed: PALETTE.font.light
    },
    secondary: {
      enabled: PALETTE.primary.indigo,
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.primary.indigo
    }
  },
  dark: {
    primary: {
      enabled: PALETTE.font.dark,
      hover: PALETTE.font.light,
      pressed: PALETTE.secondary.purple[2]
    },
    secondary: {
      enabled: PALETTE.font.light,
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.secondary.grey[3]
    },
    tertiary: {
      enabled: PALETTE.font.light,
      hover: PALETTE.font.light,
      pressed: PALETTE.font.light
    }
  }
};
var BORDER_COLORS = {
  light: {
    secondary: {
      enabled: PALETTE.primary.indigo,
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.primary.indigo
    }
  },
  dark: {
    secondary: {
      enabled: PALETTE.font.light,
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.secondary.grey[3]
    }
  }
};
function UrsorButton(props) {
  var _a, _b, _c, _d;
  const mode = props.dark ? "dark" : "light";
  const variant = props.variant ?? "primary";
  const size = props.size ?? "medium";
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [state, setState] = useState("enabled");
  useEffect(() => {
    if (pressed) {
      setState("pressed");
    } else if (hovering) {
      setState("hover");
    } else {
      setState("enabled");
    }
  }, [hovering, pressed]);
  return /* @__PURE__ */ React3.createElement(
    Stack,
    {
      alignItems: "center",
      bgcolor: (_a = BACKGROUND_COLORS[mode][variant]) == null ? void 0 : _a[state],
      border: `2px solid ${props.borderColor || ((_b = BORDER_COLORS[mode][variant]) == null ? void 0 : _b[state])}`,
      borderRadius: `${HEIGHTS[size] / 2}px`,
      boxSizing: "border-box",
      direction: "row",
      height: props.height || HEIGHTS[size],
      justifyContent: "center",
      onClick: props.onClick,
      onMouseDown: () => {
        setPressed(true);
      },
      onMouseEnter: () => {
        setHovering(true);
      },
      onMouseLeave: () => {
        setHovering(false);
        setPressed(false);
      },
      onMouseUp: () => {
        setPressed(false);
      },
      px: props.paddingX || `${PADDINGS[size].x}px`,
      pl: props.startIcon && !props.paddingX ? `${0.7 * PADDINGS[size].x}px` : void 0,
      pr: props.endIcon && !props.paddingX ? `${0.7 * PADDINGS[size].x}px` : void 0,
      spacing: "12px",
      boxShadow: (
        // eslint-disable-next-line no-nested-ternary -- no tyme to fiks dis
        props.strongShadow ? "0 0 25px rgba(0,0,0,0.08)" : props.shadow ? "0 0 20px rgba(0,0,0,0.05)" : void 0
      ),
      sx: {
        cursor: "pointer",
        pointerEvents: props.disabled ? "none" : void 0,
        transition: "0.2s",
        background: props.backgroundColor,
        // eslint-disable-next-line no-nested-ternary -- annoying
        opacity: props.disabled ? 0.35 : state === "hover" ? props.hoverOpacity : void 0,
        svg: {
          animation: props.iconSpin ? `${spin} 6s linear infinite` : void 0,
          path: {
            fill: props.useNaturalIconColor ? void 0 : props.iconColor || props.fontColor || ((_c = FONT_COLORS[mode][variant]) == null ? void 0 : _c[state]) || PALETTE.font.light,
            transition: "0.2s"
          }
        }
      },
      width: props.width || "fit-content"
    },
    props.startIcon ? /* @__PURE__ */ React3.createElement(
      props.startIcon,
      {
        height: props.iconSize || ICON_SIZES[props.size || "medium"],
        width: props.iconSize || ICON_SIZES[props.size || "medium"]
      }
    ) : null,
    /* @__PURE__ */ React3.createElement(
      Typography,
      {
        bold: true,
        color: props.fontColor ?? ((_d = FONT_COLORS[mode][variant]) == null ? void 0 : _d[state]) ?? PALETTE.font.dark,
        noWrap: true,
        sx: {
          transition: "0.2s",
          paddingY: props.paddingY,
          ...props.fontSize ? { fontSize: props.fontSize } : {}
        },
        variant: size
      },
      props.children
    ),
    props.endIcon ? /* @__PURE__ */ React3.createElement(
      props.endIcon,
      {
        height: props.iconSize || ICON_SIZES[props.size || "medium"],
        width: props.iconSize || ICON_SIZES[props.size || "medium"]
      }
    ) : null
  );
}

// src/ui/ursor-input-field.tsx
import { Input, InputAdornment } from "@mui/material";
import { useState as useState2 } from "react";
var HEIGHT = "40px";
var BORDER_RADIUS = "8px";
var BOLD_FONT_WEIGHT2 = 450;
function UrsorInputField(props) {
  const [hovering, setHovering] = useState2(false);
  const [active, setActive] = useState2(false);
  const customSx = {
    width: props.width ?? "100%",
    height: props.height ?? HEIGHT,
    minHeight: props.height ?? HEIGHT,
    borderRadius: props.borderRadius ?? BORDER_RADIUS,
    background: props.backgroundColor ?? PALETTE.secondary.grey[1],
    border: `2px solid ${// eslint-disable-next-line no-nested-ternary -- idiotic rule
    active ? PALETTE.secondary.purple[2] : hovering ? PALETTE.secondary.purple[1] : "transparent"}`,
    transition: "0.2s",
    // : props.border
    // ? `1.4px solid ${PALETTE.secondary.grey[2]}`
    // : null,
    boxSizing: "border-box",
    outline: props.outline,
    backdropFilter: props.backgroundBlur,
    fontFamily: "inherit"
  };
  const inputProps = {
    type: props.password ? "password" : void 0,
    style: {
      paddingLeft: props.paddingLeft ?? "10px",
      paddingRight: props.leftAlign ? "10px" : 0,
      textAlign: props.leftAlign ? "left" : "center",
      textOverflow: "ellipsis",
      fontSize: props.fontSize ?? FONT_SIZES.normal,
      color: props.color ?? PALETTE.font.dark,
      fontWeight: props.boldValue || props.value && !props.noBold ? BOLD_FONT_WEIGHT2 : "unset",
      lineHeight: "100%",
      transition: "0.2s"
    },
    form: {
      autoComplete: "off"
    }
  };
  return /* @__PURE__ */ React.createElement(
    Input,
    {
      autoFocus: props.autoFocus,
      endAdornment: props.endIcon ? /* @__PURE__ */ React.createElement(InputAdornment, { position: "end", sx: { pr: "11px" } }, props.endIcon) : null,
      disableUnderline: true,
      inputProps,
      onBlur: () => {
        var _a;
        setActive(false);
        (_a = props.onBlur) == null ? void 0 : _a.call(props);
      },
      onChange: props.onChange,
      onFocus: () => {
        setActive(true);
      },
      onKeyPress: (event) => {
        var _a;
        if (event.key === "Enter") {
          (_a = props.onEnterKey) == null ? void 0 : _a.call(props);
        }
      },
      onMouseEnter: () => {
        setHovering(true);
      },
      onMouseLeave: () => {
        setHovering(false);
      },
      placeholder: props.placeholder,
      sx: customSx,
      value: props.value
    }
  );
}

// src/ui/ursor-text-field.tsx
import { useState as useState3 } from "react";
import { TextField } from "@mui/material";
import { Stack as Stack2 } from "@mui/system";

// src/ui/dynamic-container.tsx
import React4, { useRef as useRef2 } from "react";
import { Box as Box2 } from "@mui/system";

// src/ui/use-resize-observer.tsx
import { useEffect as useEffect2, useRef, useState as useState4 } from "react";
function useResizeObserver(ref) {
  const [element, setElement] = useState4(null);
  const [rect, setRect] = useState4(void 0);
  const observer = useRef(void 0);
  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };
  useEffect2(() => {
    setElement(ref.current);
  }, [ref]);
  useEffect2(() => {
    if (!element) return;
    cleanOb();
    const ob = observer.current = new ResizeObserver(([entry]) => {
      setRect(entry.target.getBoundingClientRect());
    });
    ob.observe(element);
    return () => {
      cleanOb();
    };
  }, [element]);
  return rect;
}

// src/ui/dynamic-container.tsx
function DynamicContainer(props) {
  const content = useRef2(null);
  const rect = useResizeObserver(content);
  return /* @__PURE__ */ React4.createElement(
    Box2,
    {
      style: {
        transition: `${props.duration || 600}ms`,
        //@ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        height: `${rect == null ? void 0 : rect.height}px`,
        width: props.width ?? "100%",
        overflow: "hidden"
      }
    },
    /* @__PURE__ */ React4.createElement(
      Box2,
      {
        ref: content,
        style: {
          width: props.width ?? "100%",
          height: "fit-content"
        }
      },
      props.children
    )
  );
}

// src/account/contents/common.tsx
import _11 from "lodash";

// src/components/UrsorDialog.tsx
import React9, { useEffect as useEffect6, useState as useState9 } from "react";
import { Box as Box6, Dialog, keyframes as keyframes4, Stack as Stack6 } from "@mui/material";

// src/images/icons/X.svg
var X_default = "./X-RF7X26JX.svg";

// src/images/icons/ChevronLeftIcon.svg
var ChevronLeftIcon_default = "./ChevronLeftIcon-5PUKKS6Q.svg";

// src/components/UrsorDialog.tsx
import _ from "lodash";
import { useWindowSize as useWindowSize2 } from "usehooks-ts";

// src/components/InfoButton.tsx
import React6 from "react";
import { Stack as Stack4 } from "@mui/system";
import { useState as useState6 } from "react";

// src/images/icons/InfoIcon.svg
var InfoIcon_default = "./InfoIcon-EPTUCAUL.svg";

// src/components/UrsorPopover.tsx
import React5, { useEffect as useEffect3, useState as useState5 } from "react";
import { Box as Box3, Stack as Stack3, keyframes as keyframes2 } from "@mui/system";
import { Backdrop } from "@mui/material";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { useWindowSize } from "usehooks-ts";
var fadeIn = keyframes2`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
var fadeOut = keyframes2`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;
var DEFAULT_CORNER_RADIUS = "12px";
var PADDING = "16px";
function UrsorPopover(props) {
  const [width, setWidth] = useState5(void 0);
  const [yOffset, setYOffset] = useState5(void 0);
  const [maxWidth, setMaxWidth] = useState5(void 0);
  const [maxHeight, setMaxHeight] = useState5(void 0);
  const [referenceElement, setReferenceElement] = React5.useState(null);
  const [popperElement, setPopperElement] = React5.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: props.placement === "left" || props.buttonWidth ? `${props.top ? "top" : "bottom"}-start` : props.placement === "right" ? `${props.top ? "top" : "bottom"}-end` : `${props.top ? "top" : "bottom"}`,
    modifiers: [{ name: "flip", enabled: props.flip }]
  });
  const [buttonRef, setButtonRef] = useState5(null);
  const [isFlipped, setIsFlipped] = useState5(false);
  useEffect3(
    () => {
      var _a;
      return setIsFlipped(
        !!((_a = attributes.popper) == null ? void 0 : _a["data-popper-placement"].includes("top"))
      );
    },
    [attributes.popper]
  );
  useEffect3(() => {
    buttonRef == null ? void 0 : buttonRef.focus();
  }, [buttonRef]);
  const { width: windowWidth, height } = useWindowSize();
  useEffect3(() => {
    setYOffset((props.yOffset ?? 0) - ((referenceElement == null ? void 0 : referenceElement.offsetHeight) ?? 0));
    setWidth(referenceElement == null ? void 0 : referenceElement.offsetWidth);
    setMaxWidth(
      (width ?? window.innerWidth) - ((referenceElement == null ? void 0 : referenceElement.getBoundingClientRect().left) ?? 0)
    );
    setMaxHeight(
      (height ?? window.innerHeight) - ((referenceElement == null ? void 0 : referenceElement.getBoundingClientRect().top) ?? 0) - 62
    );
  }, [
    width,
    referenceElement,
    referenceElement == null ? void 0 : referenceElement.offsetTop,
    referenceElement == null ? void 0 : referenceElement.getBoundingClientRect().top,
    props.yOffset,
    height,
    windowWidth
  ]);
  return /* @__PURE__ */ React5.createElement(React5.Fragment, null, /* @__PURE__ */ React5.createElement(
    Stack3,
    {
      ref: setReferenceElement,
      flex: props.flexButton ? 1 : void 0,
      sx: {
        pointerEvents: props.disabled ? "none" : "auto",
        //opacity: props.open && !props.noFloatButton ? 0 : 1,
        zIndex: 2
      },
      width: props.fieldWidth
    },
    props.children
  ), props.open ? createPortal(
    /* @__PURE__ */ React5.createElement(React5.Fragment, null, !props.noBackdrop ? /* @__PURE__ */ React5.createElement(
      Backdrop,
      {
        sx: {
          background: "transparent",
          //backdropFilter: "blur(3px)",
          zIndex: props.zIndex || 2
        },
        open: props.open,
        onClick: props.closeCallback
      }
    ) : null, /* @__PURE__ */ React5.createElement(
      Box3,
      {
        ref: setPopperElement,
        style: styles.popper,
        ...attributes.popper,
        zIndex: props.zIndex || 3
      },
      /* @__PURE__ */ React5.createElement(
        Stack3,
        {
          pt: props.margin ?? "8px",
          justifyContent: "center",
          alignItems: props.placement === "right" ? "flex-end" : props.placement === "left" ? "flex-start" : "center",
          ref: setButtonRef,
          sx: {
            opacity: 0,
            animation: `${fadeIn} 0.2s ease-out`,
            animationFillMode: "forwards"
          }
        },
        props.content ? /* @__PURE__ */ React5.createElement(
          Box3,
          {
            width: props.width ?? (props.buttonWidth ? width : void 0),
            boxSizing: "border-box",
            borderRadius: props.cornerRadius ?? DEFAULT_CORNER_RADIUS,
            p: props.noCard || props.noPadding ? void 0 : PADDING,
            sx: {
              background: props.noCard ? void 0 : "white",
              pointerEvents: props.open ? "auto" : "none",
              opacity: props.open && !props.fadedOut ? 1 : 0,
              transition: "0.3s",
              animation: props.animation,
              boxShadow: "0 0 90px rgba(0,0,0,0.15)"
            },
            height: "100%",
            maxHeight: props.maxHeight || (!props.flip ? maxHeight : void 0),
            overflow: "scroll"
          },
          props.content
        ) : null
      )
    )),
    document.body
  ) : null);
}

// src/components/InfoButton.tsx
var InfoButton = (props) => {
  const [open, setOpen] = useState6(false);
  return /* @__PURE__ */ React6.createElement(
    UrsorPopover,
    {
      open,
      content: /* @__PURE__ */ React6.createElement(
        Stack4,
        {
          bgcolor: "rgb(255,255,255)",
          borderRadius: "12px",
          p: "16px",
          boxSizing: "border-box",
          spacing: "6px",
          maxWidth: "333px"
        },
        /* @__PURE__ */ React6.createElement(Typography, { variant: "small" }, props.text)
      ),
      closeCallback: () => setOpen(false),
      placement: props.rightAlign ? "right" : "left",
      noPadding: true,
      zIndex: 9999
    },
    /* @__PURE__ */ React6.createElement(
      Stack4,
      {
        onClick: () => setOpen(true),
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s"
        }
      },
      /* @__PURE__ */ React6.createElement(
        Stack4,
        {
          sx: {
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.8 },
            svg: {
              path: {
                fill: PALETTE.secondary.grey[3]
              }
            }
          },
          direction: "row",
          spacing: "6px",
          alignItems: "center"
        },
        /* @__PURE__ */ React6.createElement(
          Typography,
          {
            variant: "small",
            bold: true,
            color: PALETTE.secondary.grey[3],
            maxLines: 1
          },
          props.title
        ),
        /* @__PURE__ */ React6.createElement(InfoIcon_default, { width: "14px", height: "14px" })
      )
    )
  );
};
var InfoButton_default = InfoButton;

// src/components/ByteStepper.tsx
import React8 from "react";
import { Box as Box5, keyframes as keyframes3, Stack as Stack5 } from "@mui/system";

// src/components/Byte.tsx
import React7, { useEffect as useEffect4, useState as useState7 } from "react";
import { useLottie } from "lottie-react";

// src/lotties/byteAppear.json
var byteAppear_default = { v: "5.7.4", fr: 29.9700012207031, ip: 0, op: 30.0000012219251, w: 800, h: 800, nm: "Appear_Comb", ddd: 0, assets: [{ id: "comp_0", layers: [{ ddd: 0, ind: 1, ty: 4, nm: "C", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 10, s: [719.582, 79.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 25.0000010182709, s: [559.582, 239.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [0, 0, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [1, 1, 1] }, o: { x: [0.167, 0.167, 0.167], y: [0, 0, 0] }, t: 25, s: [100.5, 100.5, 100] }, { t: 36.0000014663101, s: [100.3, 100.3, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 40.0000016292334, st: 10.0000004073083, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "A", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 10, s: [79.582, 79.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 25.0000010182709, s: [239.582, 239.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [0, 0, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [1, 1, 1] }, o: { x: [0.167, 0.167, 0.167], y: [0, 0, 0] }, t: 25, s: [100.5, 100.5, 100] }, { t: 36.0000014663101, s: [100.3, 100.3, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 40.0000016292334, st: 10.0000004073083, bm: 0 }, { ddd: 0, ind: 3, ty: 4, nm: "H", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 10, s: [719.582, 719.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 25.0000010182709, s: [559.582, 559.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [0, 0, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [1, 1, 1] }, o: { x: [0.167, 0.167, 0.167], y: [0, 0, 0] }, t: 25, s: [100.5, 100.5, 100] }, { t: 36.0000014663101, s: [100.3, 100.3, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 40.0000016292334, st: 10.0000004073083, bm: 0 }, { ddd: 0, ind: 4, ty: 4, nm: "B", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 5, s: [399.582, 79.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [399.582, 239.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 31.0000012626559, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 5, ty: 4, nm: "F", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 5, s: [719.582, 399.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [559.582, 399.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 31.0000012626559, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 6, ty: 4, nm: "D", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 5, s: [79.582, 399.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [239.582, 399.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 31.0000012626559, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 7, ty: 4, nm: "G", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 5, s: [399.582, 719.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [399.582, 559.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 31.0000012626559, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 8, ty: 4, nm: "E", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [399.582, 399.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [1, 1, 1] }, o: { x: [0.167, 0.167, 0.167], y: [0, 0, 0] }, t: 15, s: [100, 100, 100] }, { t: 26.0000010590017, s: [100.3, 100.3, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 30.0000012219251, st: 0, bm: 0 }] }, { id: "comp_1", layers: [{ ddd: 0, ind: 1, ty: 4, nm: "C", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 10, s: [799.582, 159.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 25.0000010182709, s: [639.582, 319.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [0, 0, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [1, 1, 1] }, o: { x: [0.167, 0.167, 0.167], y: [0, 0, 0] }, t: 25, s: [100.5, 100.5, 100] }, { t: 36.0000014663101, s: [100.3, 100.3, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 40.0000016292334, st: 10.0000004073083, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "A", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 10, s: [159.582, 159.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 25.0000010182709, s: [319.582, 319.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [0, 0, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [1, 1, 1] }, o: { x: [0.167, 0.167, 0.167], y: [0, 0, 0] }, t: 25, s: [100.5, 100.5, 100] }, { t: 36.0000014663101, s: [100.3, 100.3, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 40.0000016292334, st: 10.0000004073083, bm: 0 }, { ddd: 0, ind: 3, ty: 4, nm: "H", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 10, s: [799.582, 799.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 25.0000010182709, s: [639.582, 639.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [0, 0, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [1, 1, 1] }, o: { x: [0.167, 0.167, 0.167], y: [0, 0, 0] }, t: 25, s: [100.5, 100.5, 100] }, { t: 36.0000014663101, s: [100.3, 100.3, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 40.0000016292334, st: 10.0000004073083, bm: 0 }, { ddd: 0, ind: 4, ty: 4, nm: "B", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 5, s: [479.582, 159.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [479.582, 319.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 31.0000012626559, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 5, ty: 4, nm: "F", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 5, s: [799.582, 479.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [639.582, 479.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 31.0000012626559, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 6, ty: 4, nm: "D", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 5, s: [159.582, 479.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [319.582, 479.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 31.0000012626559, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 7, ty: 4, nm: "G", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 5, s: [479.582, 799.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [479.582, 639.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: -1.00000004073083, op: 31.0000012626559, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 8, ty: 4, nm: "E", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.582, 479.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [1, 1, 1] }, o: { x: [0.167, 0.167, 0.167], y: [0, 0, 0] }, t: 15, s: [100, 100, 100] }, { t: 26.0000010590017, s: [100.3, 100.3, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 30.0000012219251, st: 0, bm: 0 }] }], layers: [{ ddd: 0, ind: 1, ty: 0, nm: "Appear_Body", refId: "comp_0", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 0, op: 30.0000012219251, st: 0, bm: 0 }, { ddd: 0, ind: 2, ty: 0, nm: "Appear_Shadow", refId: "comp_1", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 0, op: 30.0000012219251, st: 0, bm: 0 }], markers: [] };

// src/lotties/byteDisappear.json
var byteDisappear_default = {
  v: "5.7.4",
  fr: 29.9700012207031,
  ip: 0,
  op: 30.0000012219251,
  w: 800,
  h: 800,
  nm: "Disappear_Comb",
  ddd: 0,
  assets: [
    {
      id: "comp_0",
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: "FilltheGap Outlines",
          sr: 1,
          ks: {
            o: {
              a: 1,
              k: [
                {
                  i: { x: [0.833], y: [0.833] },
                  o: { x: [0.167], y: [0.167] },
                  t: 0,
                  s: [100]
                },
                { t: 10.0000004073083, s: [0] }
              ],
              ix: 11
            },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [399, 400, 0], ix: 2, l: 2 },
            a: { a: 0, k: [480, 480, 0], ix: 1, l: 2 },
            s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [400.002, 239.676],
                        [400.002, 720.317]
                      ],
                      c: false
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "st",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 3
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 1,
                  lj: 1,
                  ml: 10,
                  bm: 0,
                  nm: "Stroke 1",
                  mn: "ADBE Vector Graphic - Stroke",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 3",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            },
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [560.002, 239.676],
                        [560.002, 720.317]
                      ],
                      c: false
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "st",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 3
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 1,
                  lj: 1,
                  ml: 10,
                  bm: 0,
                  nm: "Stroke 1",
                  mn: "ADBE Vector Graphic - Stroke",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 4",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 2,
              mn: "ADBE Vector Group",
              hd: false
            },
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [239.999, 559.993],
                        [720.64, 559.993]
                      ],
                      c: false
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "st",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 3
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 1,
                  lj: 1,
                  ml: 10,
                  bm: 0,
                  nm: "Stroke 1",
                  mn: "ADBE Vector Graphic - Stroke",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 5",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 3,
              mn: "ADBE Vector Group",
              hd: false
            },
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [239.999, 400],
                        [720.64, 400]
                      ],
                      c: false
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "st",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 3
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 1,
                  lj: 1,
                  ml: 10,
                  bm: 0,
                  nm: "Stroke 1",
                  mn: "ADBE Vector Graphic - Stroke",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 6",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 4,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: 0,
          op: 45.0000018328876,
          st: -34.0000013848484,
          bm: 0
        },
        {
          ddd: 0,
          ind: 2,
          ty: 4,
          nm: "C",
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 0,
                  s: [559.582, 239.627, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 15.0000006109625, s: [719.582, 79.627, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 0,
                  s: [100.5, 100.5, 100]
                },
                { t: 15.0000006109625, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [699.582, 379.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 7",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: 0,
          op: 45.0000018328876,
          st: 0,
          bm: 0
        },
        {
          ddd: 0,
          ind: 3,
          ty: 4,
          nm: "A",
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 0,
                  s: [239.582, 239.627, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 15.0000006109625, s: [79.582, 79.627, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 0,
                  s: [100.5, 100.5, 100]
                },
                { t: 15.0000006109625, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [379.582, 379.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 6",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: 0,
          op: 45.0000018328876,
          st: 0,
          bm: 0
        },
        {
          ddd: 0,
          ind: 4,
          ty: 4,
          nm: "H",
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 0,
                  s: [559.582, 559.627, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 15.0000006109625, s: [719.582, 719.627, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 0,
                  s: [100.5, 100.5, 100]
                },
                { t: 15.0000006109625, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [699.582, 699.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 2",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: 0,
          op: 45.0000018328876,
          st: 0,
          bm: 0
        },
        {
          ddd: 0,
          ind: 5,
          ty: 4,
          nm: "B",
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 5,
                  s: [399.582, 239.627, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 20.0000008146167, s: [399.582, 79.627, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 5,
                  s: [100.5, 100.5, 100]
                },
                { t: 20.0000008146167, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [539.582, 379.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 8",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: -5.00000020365417,
          op: 40.0000016292334,
          st: 5.00000020365417,
          bm: 0
        },
        {
          ddd: 0,
          ind: 6,
          ty: 4,
          nm: "F",
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 5,
                  s: [559.582, 399.627, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 20.0000008146167, s: [719.582, 399.627, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 5,
                  s: [100.5, 100.5, 100]
                },
                { t: 20.0000008146167, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [699.582, 539.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 4",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: -5.00000020365417,
          op: 40.0000016292334,
          st: 5.00000020365417,
          bm: 0
        },
        {
          ddd: 0,
          ind: 7,
          ty: 4,
          nm: "D",
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 5,
                  s: [239.582, 399.627, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 20.0000008146167, s: [79.582, 399.627, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 5,
                  s: [100.5, 100.5, 100]
                },
                { t: 20.0000008146167, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [379.582, 539.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 1",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: -5.00000020365417,
          op: 40.0000016292334,
          st: 5.00000020365417,
          bm: 0
        },
        {
          ddd: 0,
          ind: 8,
          ty: 4,
          nm: "G",
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 5,
                  s: [399.582, 559.627, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 20.0000008146167, s: [399.582, 719.627, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 5,
                  s: [100.5, 100.5, 100]
                },
                { t: 20.0000008146167, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [539.582, 699.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 3",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: -5.00000020365417,
          op: 40.0000016292334,
          st: 5.00000020365417,
          bm: 0
        },
        {
          ddd: 0,
          ind: 9,
          ty: 4,
          nm: "E",
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [399.582, 399.627, 0], ix: 2, l: 2 },
            a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 10,
                  s: [100, 100, 100]
                },
                { t: 25.0000010182709, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.482352971096, 0.380392186782, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [539.582, 539.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 5",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: -10.0000004073083,
          op: 35.0000014255792,
          st: 10.0000004073083,
          bm: 0
        }
      ]
    },
    {
      id: "comp_1",
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 3,
          nm: "Null 45",
          sr: 1,
          ks: {
            o: { a: 0, k: 0, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [480, 480, 0], ix: 2, l: 2 },
            a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 },
            s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
          },
          ao: 0,
          ip: 0,
          op: 195.000007942513,
          st: 0,
          bm: 0
        },
        {
          ddd: 0,
          ind: 2,
          ty: 4,
          nm: "FilltheGap Outlines",
          parent: 1,
          sr: 1,
          ks: {
            o: {
              a: 1,
              k: [
                {
                  i: { x: [0.833], y: [0.833] },
                  o: { x: [0.167], y: [0.167] },
                  t: 0,
                  s: [100]
                },
                { t: 10.0000004073083, s: [0] }
              ],
              ix: 11
            },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [-1, 0, 0], ix: 2, l: 2 },
            a: { a: 0, k: [480, 480, 0], ix: 1, l: 2 },
            s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [400.002, 239.676],
                        [400.002, 720.317]
                      ],
                      c: false
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "st",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 3
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 1,
                  lj: 1,
                  ml: 10,
                  bm: 0,
                  nm: "Stroke 1",
                  mn: "ADBE Vector Graphic - Stroke",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 3",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            },
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [560.002, 239.676],
                        [560.002, 720.317]
                      ],
                      c: false
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "st",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 3
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 1,
                  lj: 1,
                  ml: 10,
                  bm: 0,
                  nm: "Stroke 1",
                  mn: "ADBE Vector Graphic - Stroke",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 4",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 2,
              mn: "ADBE Vector Group",
              hd: false
            },
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [239.999, 559.993],
                        [720.64, 559.993]
                      ],
                      c: false
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "st",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 3
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 1,
                  lj: 1,
                  ml: 10,
                  bm: 0,
                  nm: "Stroke 1",
                  mn: "ADBE Vector Graphic - Stroke",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 5",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 3,
              mn: "ADBE Vector Group",
              hd: false
            },
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [239.999, 400],
                        [720.64, 400]
                      ],
                      c: false
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "st",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 3
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 1,
                  lj: 1,
                  ml: 10,
                  bm: 0,
                  nm: "Stroke 1",
                  mn: "ADBE Vector Graphic - Stroke",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 6",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 4,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: 0,
          op: 45.0000018328876,
          st: -34.0000013848484,
          bm: 0
        },
        {
          ddd: 0,
          ind: 3,
          ty: 4,
          nm: "C",
          parent: 1,
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 0,
                  s: [159.582, -160.373, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 15.0000006109625, s: [319.582, -320.373, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 0,
                  s: [100, 100, 100]
                },
                { t: 15.0000006109625, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [699.582, 379.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 7",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: 0,
          op: 45.0000018328876,
          st: 0,
          bm: 0
        },
        {
          ddd: 0,
          ind: 4,
          ty: 4,
          nm: "A",
          parent: 1,
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 0,
                  s: [-160.418, -160.373, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 15.0000006109625, s: [-320.418, -320.373, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 0,
                  s: [100, 100, 100]
                },
                { t: 15.0000006109625, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [379.582, 379.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 6",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: 0,
          op: 45.0000018328876,
          st: 0,
          bm: 0
        },
        {
          ddd: 0,
          ind: 5,
          ty: 4,
          nm: "H",
          parent: 1,
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 0,
                  s: [159.582, 159.627, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 15.0000006109625, s: [319.582, 319.627, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 0,
                  s: [100, 100, 100]
                },
                { t: 15.0000006109625, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [699.582, 699.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 2",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: 0,
          op: 45.0000018328876,
          st: 0,
          bm: 0
        },
        {
          ddd: 0,
          ind: 6,
          ty: 4,
          nm: "B",
          parent: 1,
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 5,
                  s: [-0.418, -160.373, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 20.0000008146167, s: [-0.418, -320.373, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 5,
                  s: [100, 100, 100]
                },
                { t: 20.0000008146167, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [539.582, 379.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 8",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: -5.00000020365417,
          op: 40.0000016292334,
          st: 5.00000020365417,
          bm: 0
        },
        {
          ddd: 0,
          ind: 7,
          ty: 4,
          nm: "F",
          parent: 1,
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 5,
                  s: [159.582, -0.373, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 20.0000008146167, s: [319.582, -0.373, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 5,
                  s: [100, 100, 100]
                },
                { t: 20.0000008146167, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [699.582, 539.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 4",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: -5.00000020365417,
          op: 40.0000016292334,
          st: 5.00000020365417,
          bm: 0
        },
        {
          ddd: 0,
          ind: 8,
          ty: 4,
          nm: "D",
          parent: 1,
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 5,
                  s: [-160.418, -0.373, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 20.0000008146167, s: [-320.418, -0.373, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 5,
                  s: [100, 100, 100]
                },
                { t: 20.0000008146167, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [379.582, 539.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 1",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: -5.00000020365417,
          op: 40.0000016292334,
          st: 5.00000020365417,
          bm: 0
        },
        {
          ddd: 0,
          ind: 9,
          ty: 4,
          nm: "G",
          parent: 1,
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0.667, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 5,
                  s: [-0.418, 159.627, 0],
                  to: [0, 0, 0],
                  ti: [0, 0, 0]
                },
                { t: 20.0000008146167, s: [-0.418, 319.627, 0] }
              ],
              ix: 2,
              l: 2
            },
            a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 5,
                  s: [100, 100, 100]
                },
                { t: 20.0000008146167, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [539.582, 699.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 3",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: -5.00000020365417,
          op: 40.0000016292334,
          st: 5.00000020365417,
          bm: 0
        },
        {
          ddd: 0,
          ind: 10,
          ty: 4,
          nm: "E",
          parent: 1,
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [-0.418, -0.373, 0], ix: 2, l: 2 },
            a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 },
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                  o: { x: [1, 1, 0.333], y: [0, 0, 0] },
                  t: 10,
                  s: [100, 100, 100]
                },
                { t: 25.0000010182709, s: [0, 0, 100] }
              ],
              ix: 6,
              l: 2
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ind: 0,
                  ty: "sh",
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],
                      v: [
                        [80, 80],
                        [-80, 80],
                        [-80, -80],
                        [80, -80]
                      ],
                      c: true
                    },
                    ix: 2
                  },
                  nm: "Path 1",
                  mn: "ADBE Vector Shape - Group",
                  hd: false
                },
                {
                  ty: "fl",
                  c: {
                    a: 0,
                    k: [0.325490196078, 0.235294117647, 1, 1],
                    ix: 4
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: "Fill 1",
                  mn: "ADBE Vector Graphic - Fill",
                  hd: false
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [539.582, 539.627], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: "Transform"
                }
              ],
              nm: "Group 5",
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: "ADBE Vector Group",
              hd: false
            }
          ],
          ip: -10.0000004073083,
          op: 35.0000014255792,
          st: 10.0000004073083,
          bm: 0
        }
      ]
    }
  ],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 0,
      nm: "Disappear_Body",
      refId: "comp_0",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 },
        a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 },
        s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
      },
      ao: 0,
      w: 800,
      h: 800,
      ip: 0,
      op: 30.0000012219251,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 0,
      nm: "Disappear_Shadow",
      refId: "comp_1",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 },
        a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 },
        s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
      },
      ao: 0,
      w: 800,
      h: 800,
      ip: 0,
      op: 30.0000012219251,
      st: 0,
      bm: 0
    }
  ],
  markers: []
};

// src/lotties/byteCelebration.json
var byteCelebration_default = { v: "5.7.4", fr: 29.9700012207031, ip: 0, op: 105.000004276738, w: 800, h: 800, nm: "Celebration_Comb", ddd: 0, assets: [{ id: "comp_0", layers: [{ ddd: 0, ind: 1, ty: 4, nm: "G 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 399.582, ix: 3 }, y: { a: 0, k: 559.627, ix: 4 } }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] }, { t: 15.0000006109625, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352941176, 0.380392156863, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 49.0000019958109, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "D 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 239.582, ix: 3 }, y: { a: 0, k: 399.6, ix: 4 } }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] }, { t: 15.0000006109625, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352941176, 0.380392156863, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 50.0000020365418, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 3, ty: 4, nm: "H 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [559.582, 559.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352941176, 0.380392156863, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 54.0000021994651, st: -2.00000008146167, bm: 0 }, { ddd: 0, ind: 4, ty: 4, nm: "E 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [399.582, 399.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352941176, 0.380392156863, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 55.0000022401959, st: -1.00000004073083, bm: 0 }, { ddd: 0, ind: 5, ty: 4, nm: "A 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 239.582, ix: 3 }, y: { a: 0, k: 239.627, ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352941176, 0.380392156863, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 56.0000022809268, st: 0, bm: 0 }, { ddd: 0, ind: 6, ty: 4, nm: "F 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [559.582, 399.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [0, 0, 100] }, { t: 25.0000010182709, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352941176, 0.380392156863, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 60.0000024438501, st: 4.00000016292334, bm: 0 }, { ddd: 0, ind: 7, ty: 4, nm: "B 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [399.582, 239.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [0, 0, 100] }, { t: 25.0000010182709, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352941176, 0.380392156863, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 61.0000024845809, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 8, ty: 4, nm: "C 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [559.582, 239.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 15, s: [0, 0, 100] }, { t: 30.0000012219251, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352941176, 0.380392156863, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 66.0000026882351, st: 10.0000004073083, bm: 0 }, { ddd: 0, ind: 9, ty: 4, nm: "G 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 399.582, ix: 3 }, y: { a: 0, k: 559.627, ix: 4 } }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [100.5, 100.5, 100] }, { t: 15.0000006109625, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 49.0000019958109, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 10, ty: 4, nm: "D 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 239.582, ix: 3 }, y: { a: 0, k: 399.6, ix: 4 } }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [100.5, 100.5, 100] }, { t: 15.0000006109625, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 50.0000020365418, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 11, ty: 4, nm: "H 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [559.582, 559.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [100.5, 100.5, 100] }, { t: 20.0000008146167, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 54.0000021994651, st: -2.00000008146167, bm: 0 }, { ddd: 0, ind: 12, ty: 4, nm: "E 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [399.582, 399.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [100.5, 100.5, 100] }, { t: 20.0000008146167, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 55.0000022401959, st: -1.00000004073083, bm: 0 }, { ddd: 0, ind: 13, ty: 4, nm: "A 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 239.582, ix: 3 }, y: { a: 0, k: 239.627, ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [100.5, 100.5, 100] }, { t: 20.0000008146167, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 56.0000022809268, st: 0, bm: 0 }, { ddd: 0, ind: 14, ty: 4, nm: "F 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [559.582, 399.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [100.5, 100.5, 100] }, { t: 25.0000010182709, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 60.0000024438501, st: 4.00000016292334, bm: 0 }, { ddd: 0, ind: 15, ty: 4, nm: "B 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [399.582, 239.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [100.5, 100.5, 100] }, { t: 25.0000010182709, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 61.0000024845809, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 16, ty: 4, nm: "C 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [559.582, 239.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 15, s: [100.5, 100.5, 100] }, { t: 30.0000012219251, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 66.0000026882351, st: 10.0000004073083, bm: 0 }] }, { id: "comp_1", layers: [{ ddd: 0, ind: 1, ty: 4, nm: "G 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 479.582, ix: 3 }, y: { a: 0, k: 639.627, ix: 4 } }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] }, { t: 15.0000006109625, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 49.0000019958109, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "D 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 319.582, ix: 3 }, y: { a: 0, k: 479.6, ix: 4 } }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] }, { t: 15.0000006109625, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 50.0000020365418, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 3, ty: 4, nm: "H 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [639.582, 639.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 54.0000021994651, st: -2.00000008146167, bm: 0 }, { ddd: 0, ind: 4, ty: 4, nm: "E 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.582, 479.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 55.0000022401959, st: -1.00000004073083, bm: 0 }, { ddd: 0, ind: 5, ty: 4, nm: "A 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 319.582, ix: 3 }, y: { a: 0, k: 319.627, ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [0, 0, 100] }, { t: 20.0000008146167, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 56.0000022809268, st: 0, bm: 0 }, { ddd: 0, ind: 6, ty: 4, nm: "F 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [639.582, 479.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [0, 0, 100] }, { t: 25.0000010182709, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 60.0000024438501, st: 4.00000016292334, bm: 0 }, { ddd: 0, ind: 7, ty: 4, nm: "B 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.582, 319.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [0, 0, 100] }, { t: 25.0000010182709, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 61.0000024845809, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 8, ty: 4, nm: "C 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [639.582, 319.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 15, s: [0, 0, 100] }, { t: 30.0000012219251, s: [100.5, 100.5, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 66.0000026882351, st: 10.0000004073083, bm: 0 }, { ddd: 0, ind: 9, ty: 4, nm: "G 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 479.582, ix: 3 }, y: { a: 0, k: 639.627, ix: 4 } }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [100.5, 100.5, 100] }, { t: 15.0000006109625, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 49.0000019958109, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 10, ty: 4, nm: "D 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 319.582, ix: 3 }, y: { a: 0, k: 479.6, ix: 4 } }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [100.5, 100.5, 100] }, { t: 15.0000006109625, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 50.0000020365418, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 11, ty: 4, nm: "H 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [639.582, 639.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [100.5, 100.5, 100] }, { t: 20.0000008146167, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 54.0000021994651, st: -2.00000008146167, bm: 0 }, { ddd: 0, ind: 12, ty: 4, nm: "E 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.582, 479.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [100.5, 100.5, 100] }, { t: 20.0000008146167, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 55.0000022401959, st: -1.00000004073083, bm: 0 }, { ddd: 0, ind: 13, ty: 4, nm: "A 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 319.582, ix: 3 }, y: { a: 0, k: 319.627, ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [100.5, 100.5, 100] }, { t: 20.0000008146167, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 56.0000022809268, st: 0, bm: 0 }, { ddd: 0, ind: 14, ty: 4, nm: "F 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [639.582, 479.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [100.5, 100.5, 100] }, { t: 25.0000010182709, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 60.0000024438501, st: 4.00000016292334, bm: 0 }, { ddd: 0, ind: 15, ty: 4, nm: "B 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.582, 319.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 10, s: [100.5, 100.5, 100] }, { t: 25.0000010182709, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 61.0000024845809, st: 5.00000020365417, bm: 0 }, { ddd: 0, ind: 16, ty: 4, nm: "C 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [639.582, 319.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 15, s: [100.5, 100.5, 100] }, { t: 30.0000012219251, s: [0, 0, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 66.0000026882351, st: 10.0000004073083, bm: 0 }] }, { id: "comp_2", layers: [{ ddd: 0, ind: 1, ty: 4, nm: "G 6", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0, y: 0 }, t: 6, s: [131.582, 264.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [53.582, 199.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 6, s: [0, 0, 100] }, { t: 11.0000004480392, s: [45, 45, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.992156862745, 0.607843137255, 0.254901960784, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 6.00000024438501, op: 20.0000008146167, st: -10.0000004073083, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "G 5", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0, y: 0 }, t: 1, s: [131.582, 400, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [35.582, 397.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 1, s: [0, 0, 100] }, { t: 6.00000024438501, s: [45, 45, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.992156862745, 0.823529411765, 0.929411764706, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 1.00000004073083, op: 20.0000008146167, st: -15.0000006109625, bm: 0 }, { ddd: 0, ind: 3, ty: 4, nm: "G 4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0, y: 0 }, t: 3, s: [653.582, 574.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [765.582, 687.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 3, s: [0, 0, 100] }, { t: 8.00000032584668, s: [45, 45, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.992156862745, 0.607843137255, 0.254901960784, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 3.00000012219251, op: 20.0000008146167, st: -13.0000005295009, bm: 0 }, { ddd: 0, ind: 4, ty: 4, nm: "G 3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0, y: 0 }, t: 0, s: [675.582, 124.627, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [765.582, 35.627, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0, 0, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] }, { t: 5.00000020365417, s: [45, 45, 100] }], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.992156862745, 0.823529411765, 0.929411764706, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 20.0000008146167, st: -16.0000006516934, bm: 0 }] }, { id: "comp_3", layers: [{ ddd: 0, ind: 1, ty: 4, nm: "Shape Layer 16", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [349.582, 314.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [39.504, 153.455, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 3.00000012219251, op: 5.00000020365418, st: -7.00000028511585, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "Shape Layer 15", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [479.958, 464.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [46.179, 235.257, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 5.00000020365417, op: 8.00000032584668, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 3, ty: 4, nm: "Shape Layer 14", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [399.582, 314.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [38.67, 231.7, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 3.00000012219251, op: 8.00000032584668, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 4, ty: 4, nm: "Shape Layer 17", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [639.371, 365.189, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.811, 0], ix: 1, l: 2 }, s: { a: 0, k: [65.789, 100, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 5, ty: 4, nm: "Shape Layer 13", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [399.686, 181.189, 0], ix: 2, l: 2 }, a: { a: 0, k: [-0.314, -218.811, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 5.00000020365417, op: 8.00000032584668, st: -5.00000020365417, bm: 0 }, { ddd: 0, ind: 6, ty: 4, nm: "Shape Layer 11", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [349.582, 314.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [46.179, 153.455, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 10.0000004073083, st: -2.00000008146167, bm: 0 }, { ddd: 0, ind: 7, ty: 4, nm: "Shape Layer 12", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [479.958, 464.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [46.179, 235.257, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 20.0000008146167, st: 0, bm: 0 }, { ddd: 0, ind: 8, ty: 4, nm: "Shape Layer 10", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [399.582, 314.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [46.179, 235.257, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 19.0000007738859, st: 0, bm: 0 }, { ddd: 0, ind: 9, ty: 4, nm: "Shape Layer 9", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [399.686, 181.189, 0], ix: 2, l: 2 }, a: { a: 0, k: [-0.314, -218.811, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 19.0000007738859, st: 0, bm: 0 }, { ddd: 0, ind: 10, ty: 3, nm: "Null 34", sr: 1, ks: { o: { a: 0, k: 0, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [400, 400, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 1, y: 0 }, t: 10, s: [400, 320, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [400, 400, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [1, 1, 0.333], y: [0, 0, 0] }, t: 0, s: [100, 100, 100] }, { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [100, 85, 100] }, { t: 10.0000004073083, s: [100, 100, 100] }], ix: 6, l: 2 } }, ao: 0, ip: 0, op: 308.000012545097, st: 0, bm: 0 }, { ddd: 0, ind: 11, ty: 4, nm: "A 2", parent: 10, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -160.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 10, s: [-240.373] }, { t: 20.0000008146167, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 6.00000024438501, op: 30.0000012219251, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 12, ty: 4, nm: "D 2", parent: 11, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 6.00000024438501, op: 30.0000012219251, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 13, ty: 4, nm: "A", parent: 10, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -160.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-160.373] }, { i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 10, s: [-240.373] }, { t: 20.0000008146167, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 14, ty: 4, nm: "D", parent: 13, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 15, ty: 4, nm: "B 2", parent: 10, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -0.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 2, s: [-160.373] }, { i: { x: [0.631], y: [1] }, o: { x: [1], y: [0] }, t: 12, s: [-240.373] }, { t: 22.0000008960784, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 30.0000012219251, st: 14.0000005702317, bm: 0 }, { ddd: 0, ind: 16, ty: 4, nm: "G 2", parent: 15, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 30.0000012219251, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 17, ty: 4, nm: "E 2", parent: 15, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 30.0000012219251, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 18, ty: 4, nm: "B", parent: 10, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -0.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 2, s: [-160.373] }, { i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 12, s: [-240.373] }, { t: 22.0000008960784, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 14.0000005702317, bm: 0 }, { ddd: 0, ind: 19, ty: 4, nm: "G", parent: 18, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 20, ty: 4, nm: "E", parent: 18, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 21, ty: 4, nm: "C 2", parent: 10, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 159.582, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [-160.373] }, { i: { x: [0.762], y: [1] }, o: { x: [1], y: [0] }, t: 14, s: [-240.373] }, { t: 24.00000097754, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 30.000001221925, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 22, ty: 4, nm: "H 2", parent: 21, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 30.000001221925, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 23, ty: 4, nm: "F 2", parent: 21, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 30.000001221925, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 24, ty: 4, nm: "C", parent: 10, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 159.582, ix: 3 }, y: { a: 1, k: [{ i: { x: [0.011], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [-160.373] }, { i: { x: [0.758], y: [1] }, o: { x: [1], y: [0] }, t: 14, s: [-240.373] }, { t: 24.00000097754, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 25, ty: 4, nm: "H", parent: 24, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 26, ty: 4, nm: "F", parent: 24, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }] }, { id: "comp_4", layers: [{ ddd: 0, ind: 1, ty: 4, nm: "Shape Layer 12", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 5, s: [615.686, 427.189, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 8.00000032584668, s: [615.686, 299.189, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [-0.314, -218.811, 0], ix: 1, l: 2 }, s: { a: 0, k: [40.756, 100, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: -10.0000004073083, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "Shape Layer 11", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [429.582, 394.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [46.179, 153.455, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 10.0000004073083, st: -2.00000008146167, bm: 0 }, { ddd: 0, ind: 3, ty: 4, nm: "Shape Layer 10", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [479.582, 394.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [46.179, 235.257, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 19.0000007738859, st: 0, bm: 0 }, { ddd: 0, ind: 4, ty: 4, nm: "Shape Layer 9", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.686, 261.189, 0], ix: 2, l: 2 }, a: { a: 0, k: [-0.314, -218.811, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 19.0000007738859, st: 0, bm: 0 }, { ddd: 0, ind: 5, ty: 3, nm: "Null 34", sr: 1, ks: { o: { a: 0, k: 0, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 1, y: 0 }, t: 0, s: [480, 480, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { i: { x: 1, y: 1 }, o: { x: 1, y: 0 }, t: 10, s: [480, 400, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [480, 480, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [1, 1, 0.333], y: [0, 0, 0] }, t: 0, s: [100, 100, 100] }, { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [100, 85, 100] }, { t: 10.0000004073083, s: [100, 100, 100] }], ix: 6, l: 2 } }, ao: 0, ip: 0, op: 308.000012545097, st: 0, bm: 0 }, { ddd: 0, ind: 6, ty: 4, nm: "A 3", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -160.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 10, s: [-240.373] }, { t: 20.0000008146167, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 20.0000008146167, op: 205.000008349821, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 7, ty: 4, nm: "D 3", parent: 6, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 20.0000008146167, op: 205.000008349821, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 8, ty: 4, nm: "A 2", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -160.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 10, s: [-240.373] }, { t: 20.0000008146167, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 6.00000024438501, op: 20.0000008146167, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 9, ty: 4, nm: "D 2", parent: 8, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 6.00000024438501, op: 20.0000008146167, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 10, ty: 4, nm: "A", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -160.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 10, s: [-240.373] }, { t: 20.0000008146167, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 6.00000024438501, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 11, ty: 4, nm: "D", parent: 10, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 6.00000024438501, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 12, ty: 4, nm: "B 3", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -0.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 2, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 12, s: [-240.373] }, { t: 22.0000008960784, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 22.0000008960784, op: 210.000008553475, st: 14.0000005702317, bm: 0 }, { ddd: 0, ind: 13, ty: 4, nm: "G 3", parent: 12, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 22.0000008960784, op: 202.000008227629, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 14, ty: 4, nm: "E 3", parent: 12, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 22.0000008960784, op: 202.000008227629, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 15, ty: 4, nm: "B 2", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -0.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 2, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 12, s: [-240.373] }, { t: 22.0000008960784, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 22.0000008960784, st: 14.0000005702317, bm: 0 }, { ddd: 0, ind: 16, ty: 4, nm: "G 2", parent: 15, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 22.0000008960784, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 17, ty: 4, nm: "E 2", parent: 15, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 22.0000008960784, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 18, ty: 4, nm: "B", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -0.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 2, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 12, s: [-240.373] }, { t: 22.0000008960784, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 14.0000005702317, bm: 0 }, { ddd: 0, ind: 19, ty: 4, nm: "G", parent: 18, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 20, ty: 4, nm: "E", parent: 18, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 21, ty: 4, nm: "C 3", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 159.582, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 14, s: [-240.373] }, { t: 24.00000097754, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 24.00000097754, op: 204.00000830909, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 22, ty: 4, nm: "H 3", parent: 21, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 24.00000097754, op: 204.00000830909, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 23, ty: 4, nm: "F 3", parent: 21, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 24.00000097754, op: 204.00000830909, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 24, ty: 4, nm: "C 2", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 159.582, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 14, s: [-240.373] }, { t: 24.00000097754, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 24.00000097754, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 25, ty: 4, nm: "H 2", parent: 24, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 24.00000097754, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 26, ty: 4, nm: "F 2", parent: 24, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 24.00000097754, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 27, ty: 4, nm: "C", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 159.582, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 14, s: [-240.373] }, { t: 24.00000097754, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 28, ty: 4, nm: "H", parent: 27, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 29, ty: 4, nm: "F", parent: 27, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 30, ty: 3, nm: "Null 42", sr: 1, ks: { o: { a: 0, k: 0, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [480, 480, 0], ix: 2, l: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, ip: 0, op: 308.000012545097, st: 0, bm: 0 }] }, { id: "comp_5", layers: [{ ddd: 0, ind: 1, ty: 4, nm: "Shape Layer 11", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [349.582, 314.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [46.179, 153.455, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 10.0000004073083, st: -2.00000008146167, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "Shape Layer 12", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [479.958, 464.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [46.179, 235.257, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 20.0000008146167, st: 0, bm: 0 }, { ddd: 0, ind: 3, ty: 4, nm: "Shape Layer 10", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [399.582, 314.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [46.179, 235.257, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 19.0000007738859, st: 0, bm: 0 }, { ddd: 0, ind: 4, ty: 4, nm: "Shape Layer 9", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [399.686, 181.189, 0], ix: 2, l: 2 }, a: { a: 0, k: [-0.314, -218.811, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215087891, 0.905853271484, 0.599975585938, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 19.0000007738859, st: 0, bm: 0 }, { ddd: 0, ind: 5, ty: 3, nm: "Null 34", sr: 1, ks: { o: { a: 0, k: 0, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [400, 400, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 1, y: 0 }, t: 10, s: [400, 320, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [400, 400, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [1, 1, 0.333], y: [0, 0, 0] }, t: 0, s: [100, 100, 100] }, { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [100, 85, 100] }, { t: 10.0000004073083, s: [100, 100, 100] }], ix: 6, l: 2 } }, ao: 0, ip: 0, op: 308.000012545097, st: 0, bm: 0 }, { ddd: 0, ind: 6, ty: 4, nm: "A 3", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -160.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 10, s: [-240.373] }, { t: 20.0000008146167, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 20.0000008146167, op: 205.000008349821, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 7, ty: 4, nm: "D 3", parent: 6, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 20.0000008146167, op: 205.000008349821, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 8, ty: 4, nm: "A 2", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -160.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 10, s: [-240.373] }, { t: 20.0000008146167, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 6.00000024438501, op: 20.0000008146167, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 9, ty: 4, nm: "D 2", parent: 8, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 6.00000024438501, op: 20.0000008146167, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 10, ty: 4, nm: "A", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -160.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-160.373] }, { i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 10, s: [-240.373] }, { t: 20.0000008146167, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 11, ty: 4, nm: "D", parent: 10, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 12, ty: 4, nm: "B 3", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -0.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 2, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 12, s: [-240.373] }, { t: 22.0000008960784, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 22.0000008960784, op: 210.000008553475, st: 14.0000005702317, bm: 0 }, { ddd: 0, ind: 13, ty: 4, nm: "G 3", parent: 12, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 22.0000008960784, op: 202.000008227629, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 14, ty: 4, nm: "E 3", parent: 12, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 22.0000008960784, op: 202.000008227629, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 15, ty: 4, nm: "B 2", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -0.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 2, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 12, s: [-240.373] }, { t: 22.0000008960784, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 22.0000008960784, st: 14.0000005702317, bm: 0 }, { ddd: 0, ind: 16, ty: 4, nm: "G 2", parent: 15, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 22.0000008960784, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 17, ty: 4, nm: "E 2", parent: 15, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 22.0000008960784, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 18, ty: 4, nm: "B", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -0.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 2, s: [-160.373] }, { i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 12, s: [-240.373] }, { t: 22.0000008960784, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 14.0000005702317, bm: 0 }, { ddd: 0, ind: 19, ty: 4, nm: "G", parent: 18, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 20, ty: 4, nm: "E", parent: 18, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 21, ty: 4, nm: "C 3", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 159.582, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 14, s: [-240.373] }, { t: 24.00000097754, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 24.00000097754, op: 204.00000830909, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 22, ty: 4, nm: "H 3", parent: 21, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 24.00000097754, op: 204.00000830909, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 23, ty: 4, nm: "F 3", parent: 21, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 24.00000097754, op: 204.00000830909, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 24, ty: 4, nm: "C 2", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 159.582, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [-160.373] }, { i: { x: [0.762], y: [1] }, o: { x: [1], y: [0] }, t: 14, s: [-240.373] }, { t: 24.00000097754, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 24.00000097754, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 25, ty: 4, nm: "H 2", parent: 24, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 24.00000097754, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 26, ty: 4, nm: "F 2", parent: 24, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.039215686275, 0.905882352941, 0.6, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 24.00000097754, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 27, ty: 4, nm: "C", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 159.582, ix: 3 }, y: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [-160.373] }, { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 14, s: [-240.373] }, { t: 24.00000097754, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 28, ty: 4, nm: "H", parent: 27, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 29, ty: 4, nm: "F", parent: 27, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.482352971096, 0.380392186782, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }] }, { id: "comp_6", layers: [{ ddd: 0, ind: 1, ty: 4, nm: "Shape Layer 12", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 5, s: [615.686, 427.189, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 8.00000032584668, s: [615.686, 299.189, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [-0.314, -218.811, 0], ix: 1, l: 2 }, s: { a: 0, k: [40.756, 100, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0.325469970703, 0.235290527344, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: -10.0000004073083, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "Shape Layer 11", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [429.582, 394.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [46.179, 153.455, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 10.0000004073083, st: -2.00000008146167, bm: 0 }, { ddd: 0, ind: 3, ty: 4, nm: "Shape Layer 10", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 90, ix: 10 }, p: { a: 0, k: [479.582, 394.875, 0], ix: 2, l: 2 }, a: { a: 0, k: [239.371, -218.767, 0], ix: 1, l: 2 }, s: { a: 0, k: [46.179, 235.257, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 19.0000007738859, st: 0, bm: 0 }, { ddd: 0, ind: 4, ty: 4, nm: "Shape Layer 9", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.686, 261.189, 0], ix: 2, l: 2 }, a: { a: 0, k: [-0.314, -218.811, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "rc", d: 1, s: { a: 0, k: [479.371, 112.379], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, nm: "Rectangle Path 1", mn: "ADBE Vector Shape - Rect", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258819580078, 0.811737060547, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [-0.314, -218.811], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Rectangle 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 19.0000007738859, st: 0, bm: 0 }, { ddd: 0, ind: 5, ty: 3, nm: "Null 34", sr: 1, ks: { o: { a: 0, k: 0, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0, y: 1 }, o: { x: 1, y: 0 }, t: 0, s: [480, 480, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { i: { x: 1, y: 1 }, o: { x: 1, y: 0 }, t: 10, s: [480, 400, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { t: 20.0000008146167, s: [480, 480, 0] }], ix: 2, l: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 }, s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [1, 1, 0.333], y: [0, 0, 0] }, t: 0, s: [100, 100, 100] }, { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 5, s: [100, 85, 100] }, { t: 10.0000004073083, s: [100, 100, 100] }], ix: 6, l: 2 } }, ao: 0, ip: 0, op: 308.000012545097, st: 0, bm: 0 }, { ddd: 0, ind: 6, ty: 4, nm: "A 3", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -160.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 10, s: [-240.373] }, { t: 20.0000008146167, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 20.0000008146167, op: 205.000008349821, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 7, ty: 4, nm: "A 2", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -160.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 10, s: [-240.373] }, { t: 20.0000008146167, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 6.00000024438501, op: 20.0000008146167, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 8, ty: 4, nm: "D 2", parent: 7, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 6.00000024438501, op: 20.0000008146167, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 9, ty: 4, nm: "A", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -160.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 10, s: [-240.373] }, { t: 20.0000008146167, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [379.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 6.00000024438501, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 10, ty: 4, nm: "D 3", parent: 6, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 20.0000008146167, op: 205.000008349821, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 11, ty: 4, nm: "D", parent: 9, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [379.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [379.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 6.00000024438501, st: 9.00000036657752, bm: 0 }, { ddd: 0, ind: 12, ty: 4, nm: "B 3", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -0.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 2, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 12, s: [-240.373] }, { t: 22.0000008960784, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 22.0000008960784, op: 210.000008553475, st: 14.0000005702317, bm: 0 }, { ddd: 0, ind: 13, ty: 4, nm: "G 3", parent: 12, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 22.0000008960784, op: 202.000008227629, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 14, ty: 4, nm: "E 3", parent: 12, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 22.0000008960784, op: 202.000008227629, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 15, ty: 4, nm: "B 2", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -0.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 2, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 12, s: [-240.373] }, { t: 22.0000008960784, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 22.0000008960784, st: 14.0000005702317, bm: 0 }, { ddd: 0, ind: 16, ty: 4, nm: "G 2", parent: 15, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 22.0000008960784, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 17, ty: 4, nm: "E 2", parent: 15, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 8.00000032584668, op: 22.0000008960784, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 18, ty: 4, nm: "B", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: -0.418, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 2, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 12, s: [-240.373] }, { t: 22.0000008960784, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [539.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 14.0000005702317, bm: 0 }, { ddd: 0, ind: 19, ty: 4, nm: "G", parent: 18, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 20, ty: 4, nm: "E", parent: 18, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [539.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [539.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [539.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 8.00000032584668, st: 6.00000024438501, bm: 0 }, { ddd: 0, ind: 21, ty: 4, nm: "C 3", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 159.582, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 14, s: [-240.373] }, { t: 24.00000097754, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 24.00000097754, op: 204.00000830909, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 22, ty: 4, nm: "H 3", parent: 21, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 24.00000097754, op: 204.00000830909, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 23, ty: 4, nm: "F 3", parent: 21, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 24.00000097754, op: 204.00000830909, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 24, ty: 4, nm: "C 2", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 159.582, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 14, s: [-240.373] }, { t: 24.00000097754, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 24.00000097754, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 25, ty: 4, nm: "H 2", parent: 24, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 24.00000097754, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 26, ty: 4, nm: "F 2", parent: 24, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0, 0.258823529412, 0.811764705882, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 10.0000004073083, op: 24.00000097754, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 27, ty: 4, nm: "C", parent: 5, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { s: true, x: { a: 0, k: 159.582, ix: 3 }, y: { a: 1, k: [{ i: { x: [0], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [-160.373] }, { i: { x: [1], y: [1] }, o: { x: [1], y: [0] }, t: 14, s: [-240.373] }, { t: 24.00000097754, s: [-160.373] }], ix: 4 } }, a: { a: 0, k: [699.582, 379.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 379.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 28, ty: 4, nm: "H", parent: 27, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 699.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 699.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 699.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 29, ty: 4, nm: "F", parent: 27, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [699.582, 539.627, 0], ix: 2, l: 2 }, a: { a: 0, k: [699.582, 539.627, 0], ix: 1, l: 2 }, s: { a: 0, k: [100.6, 100.6, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[80, 80], [-80, 80], [-80, -80], [80, -80]], c: true }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "fl", c: { a: 0, k: [0.325490196078, 0.235294117647, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [699.582, 539.627], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false }], ip: 0, op: 10.0000004073083, st: 8.00000032584668, bm: 0 }, { ddd: 0, ind: 30, ty: 3, nm: "Null 42", sr: 1, ks: { o: { a: 0, k: 0, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [480, 480, 0], ix: 2, l: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, ip: 0, op: 308.000012545097, st: 0, bm: 0 }] }], layers: [{ ddd: 0, ind: 1, ty: 0, nm: "Celebration_BodyEnd", refId: "comp_0", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 67.0000027289659, op: 225.000009164438, st: 67.0000027289659, bm: 0 }, { ddd: 0, ind: 2, ty: 0, nm: "Celebration_ShadowEnd", refId: "comp_1", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 67.0000027289659, op: 225.000009164438, st: 67.0000027289659, bm: 0 }, { ddd: 0, ind: 3, ty: 0, nm: "Confetti", refId: "comp_2", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 40.0000016292334, op: 68.0000027696968, st: 40.0000016292334, bm: 0 }, { ddd: 0, ind: 4, ty: 0, nm: "Celebration_Body04A", refId: "comp_3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 40.0000016292334, op: 68.0000027696968, st: 40.0000016292334, bm: 0 }, { ddd: 0, ind: 5, ty: 0, nm: "Celebration_Shadow04A", refId: "comp_4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 40.0000016292334, op: 68.0000027696968, st: 40.0000016292334, bm: 0 }, { ddd: 0, ind: 6, ty: 0, nm: "Confetti", refId: "comp_2", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 20.0000008146167, op: 40.0000016292334, st: 20.0000008146167, bm: 0 }, { ddd: 0, ind: 7, ty: 0, nm: "Celebration_Body04A", refId: "comp_3", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 20.0000008146167, op: 40.0000016292334, st: 20.0000008146167, bm: 0 }, { ddd: 0, ind: 8, ty: 0, nm: "Celebration_Shadow04A", refId: "comp_4", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 20.0000008146167, op: 40.0000016292334, st: 20.0000008146167, bm: 0 }, { ddd: 0, ind: 9, ty: 0, nm: "Celebration_Body04", refId: "comp_5", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 0, op: 20.0000008146167, st: 0, bm: 0 }, { ddd: 0, ind: 10, ty: 0, nm: "Celebration_Shadow04", refId: "comp_6", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [400, 400, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, w: 800, h: 800, ip: 0, op: 20.0000008146167, st: 0, bm: 0 }], markers: [] };

// src/components/Byte.tsx
import { Box as Box4 } from "@mui/system";
var HEIGHT2 = 45;
var JSONS = {
  appear: byteAppear_default,
  disappear: byteDisappear_default,
  celebration: byteCelebration_default
};
function ByteAnimation(props) {
  const options = {
    animationData: props.lottieJson,
    autoplay: true,
    loop: false,
    onComplete: props.callback
  };
  const { View } = useLottie(options, { height: HEIGHT2 });
  return View;
}
function Byte(props) {
  const [animation, setAnimation] = useState7(null);
  useEffect4(() => {
    (animation || !noTransitionFromNull.includes(props.animation)) && setTimeout(() => setAnimation(props.animation), props.delay ?? 0);
  }, [props.animation]);
  const noTransitionFromNull = ["disappear"];
  const callbacks = {
    appear: () => null,
    disappear: () => setAnimation(null),
    celebration: () => null
  };
  return /* @__PURE__ */ React7.createElement(
    Box4,
    {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: HEIGHT2
    },
    animation ? /* @__PURE__ */ React7.createElement(
      ByteAnimation,
      {
        lottieJson: JSONS[animation],
        callback: callbacks[animation]
      }
    ) : null
  );
}

// src/components/ByteStepper.tsx
var SPACING = "62px";
var CIRCLE_SIZE = 24;
var CIRCLE_BORDER_THICKNESS = 2;
var ROUNDING = "20px";
var APPEAR_DELAY = 800;
var BAR_DELAY = "0.6s";
var BAR_LENGTH_CHANGE_DURATION = "0.7s";
var BAR_BEZIER = "cubic-bezier(0.64, 0.27, 0.47, 1.53)";
var BAR_Z_INDEX = 2;
var PULSE_AMPLITUDE = "1.5px";
var PULSE_PERIOD = "1.4s";
var pulse = keyframes3`
  from {
    transform: translateY(-${PULSE_AMPLITUDE})
  }
  to {
    transform: translateY(${PULSE_AMPLITUDE})
  }
`;
function ByteStepper(props) {
  const getCircle = (disappear) => {
    return /* @__PURE__ */ React8.createElement(
      Box5,
      {
        sx: {
          width: "100%",
          height: "100%",
          border: `${CIRCLE_BORDER_THICKNESS}px dashed ${PALETTE.secondary.purple[1]}`,
          borderRadius: "100%",
          background: "white",
          boxShadow: "0 0 20px white",
          boxSizing: "border-box",
          animation: disappear ? `${fadeOut2} 0.5s ease-in-out` : null,
          animationDelay: `${APPEAR_DELAY}ms`,
          animationFillMode: "forwards"
        }
      }
    );
  };
  const getByte = (animation, delay) => /* @__PURE__ */ React8.createElement(
    Stack5,
    {
      height: "100%",
      width: 0,
      position: "absolute",
      overflow: "visible",
      alignItems: "center",
      justifyContent: "center",
      sx: {
        transform: "translateY(-3px)"
      },
      zIndex: BAR_Z_INDEX + 1
    },
    /* @__PURE__ */ React8.createElement(
      Box5,
      {
        sx: {
          animation: `${pulse} ${PULSE_PERIOD} ease-in-out`,
          animationDirection: "alternate",
          animationIterationCount: "infinite"
        }
      },
      /* @__PURE__ */ React8.createElement(Byte, { animation, delay })
    )
  );
  return /* @__PURE__ */ React8.createElement(
    Box5,
    {
      position: "relative",
      width: "fit-content",
      height: CIRCLE_SIZE,
      overflow: "visible",
      sx: { background: PALETTE.secondary.grey[1] },
      borderRadius: ROUNDING
    },
    /* @__PURE__ */ React8.createElement(Box5, { width: "100%", height: "100%", position: "absolute" }, /* @__PURE__ */ React8.createElement(
      Box5,
      {
        width: `calc(${props.step > 0 && props.step < props.nSteps - 1 ? CIRCLE_SIZE / 2 : 0}px + ${100 * props.step / (props.nSteps - 1)}%)`,
        height: "100%",
        sx: {
          background: PALETTE.secondary.purple[1],
          transition: BAR_LENGTH_CHANGE_DURATION,
          transitionDelay: BAR_DELAY,
          transitionTimingFunction: BAR_BEZIER
        },
        borderRadius: ROUNDING,
        position: "relative",
        zIndex: BAR_Z_INDEX
      }
    )),
    /* @__PURE__ */ React8.createElement(Stack5, { direction: "row", spacing: SPACING, overflow: "visible" }, [...Array(props.nSteps).keys()].map((n) => {
      return /* @__PURE__ */ React8.createElement(Stack5, { key: n, overflow: "visible", alignItems: "center" }, /* @__PURE__ */ React8.createElement(
        Box5,
        {
          sx: {
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE
          }
        },
        getCircle(n === 0)
      ), getByte(
        n === props.step ? n === props.nSteps - 1 ? "celebration" : "appear" : "disappear",
        n === props.step ? APPEAR_DELAY : void 0
      ));
    }))
  );
}

// src/components/UrsorDialog.tsx
var WIDTH = "926px";
var HEIGHT3 = "630px";
var BORDER_RADIUS2 = "24px";
var PADDING2 = "32px";
var PADDING_MOBILE = "20px";
var DEFAULT_FADEIN_DURATION = 400;
var LONG_FADEIN_DURATION = 2e3;
var Z_INDEX = 999;
var STEPPER_TITLE_SEPARATION = "30px";
var BACKDROP_STYLE = {
  backdropFilter: "blur(3px)",
  backgroundColor: "rgba(0, 0, 0, 0.3) !important"
};
var BODY_FADE_DURATION = 850;
var fadeIn2 = keyframes4`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
var fadeOut2 = keyframes4`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;
function UrsorDialog(props) {
  var _a, _b;
  const [bodyFadeout, setBodyFadeout] = useState9(false);
  const [canFade, setCanFade] = useState9(false);
  useEffect6(() => {
    if (canFade && _.isNumber(props.step)) {
      setBodyFadeout(true);
      setTimeout(() => {
        setBodyFadeout(false);
      }, BODY_FADE_DURATION);
    }
    setCanFade(true);
  }, [props.step]);
  const animation = {
    animation: `${bodyFadeout ? fadeOut2 : fadeIn2} ${BODY_FADE_DURATION / 1e3}s ease-in-out`
  };
  const PrimaryButtonEndIcon = React9.isValidElement(props.button) ? void 0 : (_a = props.button) == null ? void 0 : _a.icon;
  const SecondaryButtonEndIcon = React9.isValidElement(props.secondaryButton) ? void 0 : (_b = props.secondaryButton) == null ? void 0 : _b.icon;
  const { width: windowWidth } = useWindowSize2();
  return /* @__PURE__ */ React9.createElement(
    Dialog,
    {
      transitionDuration: props.longFadeIn ? LONG_FADEIN_DURATION : DEFAULT_FADEIN_DURATION,
      open: props.open,
      onClose: () => {
        var _a2;
        (_a2 = props.onCloseCallback) == null ? void 0 : _a2.call(props);
      },
      PaperProps: {
        style: {
          width: props.width || WIDTH,
          maxWidth: props.maxWidth || WIDTH,
          maxHeight: "100%",
          height: props.dynamicHeight ? void 0 : props.height || HEIGHT3,
          borderRadius: BORDER_RADIUS2,
          margin: "20px"
        }
      },
      sx: {
        py: "10px",
        ".MuiBackdrop-root": {
          display: props.noBackdrop ? "none" : "visible",
          ...BACKDROP_STYLE
        }
      }
    },
    /* @__PURE__ */ React9.createElement(
      Stack6,
      {
        position: "relative",
        p: props.noPadding ? void 0 : props.isMobile ? PADDING_MOBILE : PADDING2,
        px: props.paddingX,
        py: props.paddingY,
        pt: props.paddingTop || `calc(${PADDING2} - 4px)`,
        borderRadius: "25px",
        overflow: props.scrollable ? "s croll" : "hidden",
        flex: 1
      },
      props.backButtonCallback ? /* @__PURE__ */ React9.createElement(
        Box6,
        {
          position: "absolute",
          top: props.isMobile ? PADDING_MOBILE : PADDING2,
          left: props.isMobile ? PADDING_MOBILE : PADDING2,
          onClick: props.backButtonCallback,
          sx: {
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
            zIndex: Z_INDEX
          }
        },
        /* @__PURE__ */ React9.createElement(ChevronLeftIcon_default, { height: "27px" })
      ) : null,
      _.isNumber(props.step) && props.nSteps ? /* @__PURE__ */ React9.createElement(
        Stack6,
        {
          width: "100%",
          alignItems: "center",
          position: "relative",
          marginBottom: STEPPER_TITLE_SEPARATION,
          sx: {
            transform: "translateY(1px)"
          }
        },
        /* @__PURE__ */ React9.createElement(ByteStepper, { nSteps: props.nSteps, step: props.step })
      ) : null,
      props.onCloseCallback && !props.noCloseButton ? /* @__PURE__ */ React9.createElement(
        Box6,
        {
          position: "absolute",
          top: props.isMobile ? "29px" : "34px",
          right: props.isMobile ? "20px" : "34px",
          onClick: props.onCloseCallback,
          sx: {
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
            zIndex: Z_INDEX
          }
        },
        /* @__PURE__ */ React9.createElement(X_default, { height: props.isMobile ? "26px" : "27px" })
      ) : null,
      /* @__PURE__ */ React9.createElement(
        Stack6,
        {
          flex: 1,
          spacing: props.isMobile ? "24px" : props.bunchedUpContent ? "12px" : "25px",
          justifyContent: props.bunchedUpContent ? void 0 : "s pace-between",
          alignItems: "center",
          sx: _.isNumber(props.step) ? animation : null,
          overflow: "hidden"
        },
        props.subtitle || props.title || props.supertitle ? /* @__PURE__ */ React9.createElement(
          Stack6,
          {
            spacing: props.isMobile ? "0px" : "12px",
            width: "100%",
            alignItems: "center",
            textAlign: "center",
            boxSizing: "border-box"
          },
          props.supertitle ? /* @__PURE__ */ React9.createElement(Stack6, { direction: "row", width: "100%" }, props.supertitle ? /* @__PURE__ */ React9.createElement(Stack6, { width: "100%", alignItems: "center" }, /* @__PURE__ */ React9.createElement(
            Typography,
            {
              variant: props.title ? "medium" : "large",
              bold: true,
              color: PALETTE.font.dark
            },
            props.supertitle
          )) : null) : null,
          props.title ? /* @__PURE__ */ React9.createElement(Stack6, { maxWidth: props.titleMaxWidth, spacing: "3px" }, /* @__PURE__ */ React9.createElement(
            Typography,
            {
              variant: props.isMobile ? "h5" : props.titleSize || "h4",
              bold: true,
              color: PALETTE.secondary.purple[2],
              sx: { maxWidth: props.titleMaxWidth }
            },
            props.title
          ), props.info ? /* @__PURE__ */ React9.createElement(InfoButton_default, { ...props.info }) : null) : null,
          props.subtitle ? /* @__PURE__ */ React9.createElement(Stack6, { alignItems: "center", pt: "6px" }, windowWidth < 750 ? /* @__PURE__ */ React9.createElement(
            Typography,
            {
              variant: props.isMobile ? "normal" : "medium",
              sx: { textAlign: "center" }
            },
            props.subtitle.join(" ")
          ) : props.subtitle.map((sentence, index) => /* @__PURE__ */ React9.createElement(
            Typography,
            {
              key: index,
              variant: "medium",
              sx: { textAlign: "center" }
            },
            sentence
          ))) : null
        ) : null,
        /* @__PURE__ */ React9.createElement(
          Stack6,
          {
            flex: 1,
            width: "100%",
            minHeight: 0,
            maxHeight: props.bunchedUpContent ? 0 : void 0,
            alignItems: "center",
            justifyContent: "start",
            overflow: props.noOverflowHidden ? void 0 : "hidden"
          },
          props.children
        ),
        props.button || props.secondaryButton ? /* @__PURE__ */ React9.createElement(Stack6, { spacing: "8px", width: "300px", maxWidth: "100%" }, !!props.button ? React9.isValidElement(props.button) ? props.button : /* @__PURE__ */ React9.createElement(
          UrsorButton,
          {
            disabled: props.button.disabled || bodyFadeout,
            onClick: () => {
              props.button.callback();
            },
            backgroundColor: props.button.color,
            variant: props.button.variant ?? "primary",
            endIcon: PrimaryButtonEndIcon,
            width: "100%"
          },
          props.button.text
        ) : null, props.button || props.secondaryButton || props.googleButton || !props.noCloseButton ? /* @__PURE__ */ React9.createElement(Stack6, { spacing: "12px", width: "100%", alignItems: "center" }, !!props.secondaryButton ? React9.isValidElement(props.secondaryButton) ? props.secondaryButton : /* @__PURE__ */ React9.createElement(
          UrsorButton,
          {
            disabled: props.secondaryButton.disabled || bodyFadeout,
            onClick: () => {
              props.secondaryButton.callback();
            },
            backgroundColor: props.secondaryButton.color,
            variant: props.secondaryButton.variant ?? "secondary",
            endIcon: SecondaryButtonEndIcon,
            width: "100%"
          },
          props.secondaryButton.text
        ) : null) : null) : null
      )
    )
  );
}

// src/account/components/EditProfileDialog.tsx
import { Stack as Stack8 } from "@mui/system";
import { useEffect as useEffect7, useState as useState10 } from "react";

// src/ui/labeled-input-field.tsx
import { Stack as Stack7 } from "@mui/system";
function LabeledInputField(props) {
  return /* @__PURE__ */ React.createElement(Stack7, { spacing: "6px" }, props.label ? /* @__PURE__ */ React.createElement(Typography, { variant: "small", color: PALETTE.secondary.grey[4] }, props.label) : null, props.children);
}

// src/account/components/EditProfileDialog.tsx
var EditProfileDialog = (props) => {
  const [nickname, setNickname] = useState10("");
  const [name, setName] = useState10("");
  useEffect7(() => {
    setNickname(props.nickName);
    setName(props.name);
  }, [props.name, props.nickName]);
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Edit profile",
      width: "586px",
      height: props.isMobile ? void 0 : "390px",
      dynamicHeight: props.isMobile,
      xButtonRight: "34px",
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(Stack8, { spacing: "40px", alignItems: "center", width: "100%" }, /* @__PURE__ */ React.createElement(
      Stack8,
      {
        direction: props.isMobile ? "column" : "row",
        spacing: "24px",
        alignItems: props.isMobile ? "center" : "flex-end",
        width: "100%"
      },
      /* @__PURE__ */ React.createElement(UserInitialsCircle, { name: name ?? "" }),
      /* @__PURE__ */ React.createElement(
        Stack8,
        {
          spacing: "24px",
          flex: 1,
          width: props.isMobile ? "100%" : void 0
        },
        /* @__PURE__ */ React.createElement(LabeledInputField, { label: "Name" }, /* @__PURE__ */ React.createElement(
          UrsorInputField,
          {
            value: name,
            onChange: (event) => setName(event.target.value),
            placeholder: "Set your name",
            width: "100%",
            leftAlign: true
          }
        )),
        /* @__PURE__ */ React.createElement(LabeledInputField, { label: "Nickname" }, /* @__PURE__ */ React.createElement(
          UrsorInputField,
          {
            value: nickname,
            onChange: (event) => setNickname(event.target.value),
            placeholder: "Set your nickname",
            width: "100%",
            leftAlign: true
          }
        ))
      )
    ), /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        variant: "tertiary",
        width: props.isMobile ? "100%" : "358px",
        onClick: () => props.onSave(name, nickname)
      },
      "Save"
    ))
  );
};
var EditProfileDialog_default = EditProfileDialog;

// src/account/components/InviteDialog.tsx
import { Stack as Stack9 } from "@mui/system";
import { useState as useState11 } from "react";
var InviteDialog = (props) => {
  const [email, setEmail] = useState11();
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Invite",
      subtitle: [
        "Add a parents or teacher's email address to join your AstroSafe Group Plan."
      ],
      width: "462px",
      height: "343px"
    },
    /* @__PURE__ */ React.createElement(Stack9, { justifyContent: "space-between", height: "100%", width: "100%" }, /* @__PURE__ */ React.createElement(LabeledInputField, { label: "Email" }, /* @__PURE__ */ React.createElement(
      UrsorInputField,
      {
        value: email,
        onChange: (event) => setEmail(event.target.value),
        placeholder: "Email",
        width: "100%",
        leftAlign: true
      }
    )), /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        variant: "tertiary",
        width: "100%",
        onClick: () => email && props.onSubmit(email),
        disabled: !email || !email.includes("@") || !email.includes(".")
      },
      "Invite"
    ))
  );
};
var InviteDialog_default = InviteDialog;

// src/profiles/components/DeviceConnectDialog.tsx
import { Stack as Stack12 } from "@mui/system";

// src/profiles/components/DeviceInstructionsView.tsx
import { Stack as Stack11, alpha as alpha2, keyframes as keyframes5 } from "@mui/system";

// src/images/icons/ChevronRight.svg
var ChevronRight_default = "./ChevronRight-FOB27Q5H.svg";

// src/images/icons/DownloadIcon.svg
var DownloadIcon_default = "./DownloadIcon-4VSQMRI6.svg";

// src/profiles/components/DownloadDialog.tsx
import { Stack as Stack10 } from "@mui/system";
var PLATFORMS = [
  {
    name: "iOS",
    logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/appleLogo.png",
    url: "https://test.com"
  },
  {
    name: "Mac",
    logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/appleLogo.png",
    url: "https://test.com"
  },
  {
    name: "Android",
    logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/androidLogo.png",
    url: "https://test.com"
  },
  {
    name: "Chrome extension",
    logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/chromeLogo.png",
    url: "https://test.com"
  }
];
var DownloadCard = (props) => /* @__PURE__ */ React.createElement(
  Stack10,
  {
    width: "200px",
    height: "207px",
    bgcolor: PALETTE.secondary.grey[1],
    borderRadius: "12px",
    p: "12px",
    boxSizing: "border-box",
    justifyContent: "space-between",
    alignItems: "center"
  },
  /* @__PURE__ */ React.createElement(
    Stack10,
    {
      borderRadius: "8px",
      bgcolor: "rgb(255,255,255)",
      width: "100%",
      alignItems: "center"
    },
    /* @__PURE__ */ React.createElement("img", { src: props.imageUrl, height: 83, width: 83, alt: "platform logo" })
  ),
  /* @__PURE__ */ React.createElement(Typography, { bold: true, variant: "medium" }, props.name),
  /* @__PURE__ */ React.createElement(
    UrsorButton,
    {
      size: "small",
      endIcon: DownloadIcon_default,
      iconSize: 16,
      dark: true,
      variant: "tertiary",
      width: "123px"
    },
    "Download"
  )
);
var DownloadDialog = (props) => /* @__PURE__ */ React.createElement(
  UrsorDialog,
  {
    open: props.open,
    onCloseCallback: props.onClose,
    title: "Download Browser App",
    subtitle: [
      "Download the version of AstroSafe that matches",
      "your kid's Device."
    ],
    width: "926px",
    height: "510px",
    isMobile: props.isMobile,
    scrollable: true
  },
  /* @__PURE__ */ React.createElement(
    Stack10,
    {
      spacing: props.isMobile ? "12px" : "20px",
      direction: props.isMobile ? "column" : "row",
      alignItems: "center",
      flex: 1
    },
    PLATFORMS.map((p) => /* @__PURE__ */ React.createElement(DownloadCard, { key: p.name, imageUrl: p.logoUrl, name: p.name }))
  )
);
var DownloadDialog_default = DownloadDialog;

// src/profiles/components/DeviceInstructionsView.tsx
import { useState as useState12 } from "react";
var PULSE_AMPLITUDE2 = "12px";
var pulse2 = keyframes5`
  from {
    transform: translateY(-${PULSE_AMPLITUDE2})
  }
  to {
    transform: translateY(${PULSE_AMPLITUDE2})
  }
`;
var FloatingIntroCards = (props) => /* @__PURE__ */ React.createElement(Stack11, { position: "relative", width: "100%" }, props.fadedEdges ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
  Stack11,
  {
    position: "absolute",
    right: 0,
    top: 0,
    width: "230px",
    height: "100%",
    sx: {
      background: `linear-gradient(-90deg, ${PALETTE.secondary.grey[1]}, ${alpha2(PALETTE.secondary.grey[1], 0)})`
    },
    zIndex: 2
  }
), /* @__PURE__ */ React.createElement(
  Stack11,
  {
    position: "absolute",
    left: 0,
    top: 0,
    width: "230px",
    height: "100%",
    sx: {
      background: `linear-gradient(90deg, ${PALETTE.secondary.grey[1]}, ${alpha2(PALETTE.secondary.grey[1], 0)})`
    },
    zIndex: 2
  }
)) : null, /* @__PURE__ */ React.createElement(Stack11, { left: 0, position: "absolute", width: "100%" }, /* @__PURE__ */ React.createElement(Stack11, { position: "relative", width: "100%", height: "100px" }, /* @__PURE__ */ React.createElement(
  "img",
  {
    src: "https://ursorassets.s3.eu-west-1.amazonaws.com/Vector+86.png",
    fill: true,
    alt: "wave"
  }
))), /* @__PURE__ */ React.createElement(
  Stack11,
  {
    direction: "row",
    width: "100%",
    spacing: props.spacing,
    justifyContent: "center"
  },
  /* @__PURE__ */ React.createElement(
    Stack11,
    {
      sx: {
        transform: `translateY(-${PULSE_AMPLITUDE2 + 51})`,
        animation: `${pulse2} 5s ease-in-out`,
        animationDirection: "alternate",
        animationIterationCount: "infinite"
      }
    },
    /* @__PURE__ */ React.createElement(
      InstructionCard,
      {
        stepIndex: 1,
        text: "Download the AstroSafe App on child's Device",
        grey: props.greyCards
      },
      /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          onClick: props.onOpen,
          size: "small",
          variant: "secondary",
          endIcon: ChevronRight_default,
          iconSize: 16
        },
        "Download options"
      )
    )
  ),
  /* @__PURE__ */ React.createElement(
    Stack11,
    {
      sx: {
        transform: `translateY(-${PULSE_AMPLITUDE2})`,
        animation: `${pulse2} 5s ease-in-out`,
        animationDirection: "alternate",
        animationDelay: "1.5s",
        animationIterationCount: "infinite"
      }
    },
    /* @__PURE__ */ React.createElement(
      InstructionCard,
      {
        stepIndex: 2,
        text: "Enter join code to connect.",
        grey: props.greyCards
      },
      /* @__PURE__ */ React.createElement(
        Typography,
        {
          variant: "h3",
          color: PALETTE.secondary.purple[2],
          sx: { transform: "translateY(-3px)" }
        },
        "700-008"
      )
    )
  ),
  /* @__PURE__ */ React.createElement(
    Stack11,
    {
      sx: {
        transform: `translateY(-${PULSE_AMPLITUDE2 + 40})`,
        animation: `${pulse2} 5s ease-in-out`,
        animationDirection: "alternate",
        animationDelay: "3s",
        animationIterationCount: "infinite"
      }
    },
    /* @__PURE__ */ React.createElement(
      InstructionCard,
      {
        stepIndex: 3,
        text: "Delete all other Browsers on Device",
        grey: props.greyCards
      }
    )
  )
));
var MobileIntroCards = (props) => /* @__PURE__ */ React.createElement(Stack11, { position: "relative", spacing: "16px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
  InstructionCard,
  {
    stepIndex: 1,
    text: "Download the AstroSafe App on child's Device",
    grey: props.greyCards
  },
  /* @__PURE__ */ React.createElement(
    UrsorButton,
    {
      onClick: props.onOpen,
      size: "small",
      variant: "secondary",
      endIcon: ChevronRight_default,
      iconSize: 16
    },
    "Download options"
  )
), /* @__PURE__ */ React.createElement(
  InstructionCard,
  {
    stepIndex: 2,
    text: "Enter join code to connect.",
    grey: props.greyCards
  },
  /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "h3",
      color: PALETTE.secondary.purple[2],
      sx: { transform: "translateY(-3px)" }
    },
    "700-008"
  )
), /* @__PURE__ */ React.createElement(
  InstructionCard,
  {
    stepIndex: 3,
    text: "Delete all other Browsers on Device",
    grey: props.greyCards
  }
));
var InstructionCard = (props) => /* @__PURE__ */ React.createElement(
  Stack11,
  {
    width: "260px",
    borderRadius: "12px",
    bgcolor: props.grey ? PALETTE.secondary.grey[1] : "rgb(255,255,255)",
    alignItems: "center",
    p: "12px",
    boxSizing: "border-box",
    justifyContent: "space-between",
    spacing: "5px"
  },
  /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "small",
      bold: true,
      color: PALETTE.secondary.grey[3]
    },
    `Step ${props.stepIndex}`
  ),
  /* @__PURE__ */ React.createElement(Stack11, { width: "90%" }, /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "medium",
      bold: true,
      sx: { textAlign: "center", lineHeight: "25px" }
    },
    props.text
  )),
  props.children ? /* @__PURE__ */ React.createElement(Stack11, { pt: "6px" }, props.children) : null
);
var DeviceInstructionsView = () => {
  const [downloadDialogOpen, setDownloadDialogOpen] = useState12(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Stack11,
    {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      position: "relative"
    },
    /* @__PURE__ */ React.createElement(
      Stack11,
      {
        spacing: "8px",
        alignItems: "center",
        sx: {
          transform: "translateY(-160px)"
        }
      },
      /* @__PURE__ */ React.createElement(
        Stack11,
        {
          sx: {
            background: `linear-gradient(${PALETTE.secondary.purple[2]}, ${PALETTE.secondary.blue[2]})`,
            "-webkit-text-fill-color": "transparent",
            backgroundClip: "text",
            "-webkit-background-clip": "text"
          }
        },
        /* @__PURE__ */ React.createElement(Typography, { variant: "h4" }, "Welcome to AstroSafe")
      ),
      /* @__PURE__ */ React.createElement(Stack11, { width: "444px" }, /* @__PURE__ */ React.createElement(
        Typography,
        {
          variant: "medium",
          bold: true,
          sx: { textAlign: "center" },
          color: PALETTE.secondary.grey[4]
        },
        "Connect your child or student's device to start exploring the internet with them safely!"
      ))
    ),
    /* @__PURE__ */ React.createElement(
      FloatingIntroCards,
      {
        onOpen: () => setDownloadDialogOpen(true),
        spacing: "120px",
        fadedEdges: true
      }
    )
  ), /* @__PURE__ */ React.createElement(
    DownloadDialog_default,
    {
      open: downloadDialogOpen,
      onClose: () => setDownloadDialogOpen(false)
    }
  ));
};
var DeviceInstructionsView_default = DeviceInstructionsView;

// src/profiles/components/DeviceConnectDialog.tsx
var DeviceConnectDialog = (props) => {
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Connect a Device",
      subtitle: [
        "Connect your child's or student's Device to start",
        "exploring the internet with them safely!"
      ],
      width: "926px",
      height: "510px",
      paddingX: props.isMobile ? void 0 : "0px",
      xButtonRight: props.isMobile ? void 0 : "34px",
      isMobile: props.isMobile,
      scrollable: true
    },
    /* @__PURE__ */ React.createElement(Stack12, { justifyContent: "center", width: "100%", height: "100%" }, props.isMobile ? /* @__PURE__ */ React.createElement(MobileIntroCards, { onOpen: props.onOpen, greyCards: true }) : /* @__PURE__ */ React.createElement(FloatingIntroCards, { onOpen: props.onOpen, spacing: "36px", greyCards: true }))
  );
};
var DeviceConnectDialog_default = DeviceConnectDialog;

// src/images/icons/VerifiedIcon.svg
var VerifiedIcon_default = "./VerifiedIcon-IL7PWZHH.svg";

// src/images/icons/CheckIcon.svg
var CheckIcon_default = "./CheckIcon-FFIJMWGG.svg";

// src/components/UpgradeDialog.tsx
import { Stack as Stack25 } from "@mui/system";

// src/components/UserContext.tsx
import React16, {
  useContext as useContext2,
  createContext,
  useState as useState24,
  useEffect as useEffect14,
  useCallback
} from "react";
import { useLocalStorage } from "usehooks-ts";

// src/profile/components/MobileInsightsTab.tsx
import { Stack as Stack23 } from "@mui/system";

// src/images/icons/ChevronLeft.svg
var ChevronLeft_default = "./ChevronLeft-FSXTSQCC.svg";

// src/filter/components/AstroBentoCard.tsx
import { Stack as Stack13 } from "@mui/system";

// src/images/icons/ChevronDown.svg
var ChevronDown_default = "./ChevronDown-QWYZG6AQ.svg";

// src/filter/components/AstroBentoCard.tsx
import { useState as useState14 } from "react";

// src/components/DynamicContainer.tsx
import React10 from "react";
import { useRef as useRef4 } from "react";

// src/components/useResizeObserver.tsx
import { useEffect as useEffect8, useRef as useRef3, useState as useState13 } from "react";
function useResizeObserver2(ref) {
  const [element, setElement] = useState13(null);
  const [rect, setRect] = useState13(void 0);
  const observer = useRef3(void 0);
  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };
  useEffect8(() => {
    setElement(ref.current);
  }, [ref]);
  useEffect8(() => {
    if (!element) return;
    cleanOb();
    const ob = observer.current = new ResizeObserver(([entry]) => {
      setRect(entry.target.getBoundingClientRect());
    });
    ob.observe(element);
    return () => {
      cleanOb();
    };
  }, [element]);
  return rect;
}

// src/components/DynamicContainer.tsx
function DynamicContainer2(props) {
  const content = useRef4(null);
  const rect = useResizeObserver2(content);
  return /* @__PURE__ */ React10.createElement(
    "div",
    {
      style: {
        transition: `${props.duration}ms`,
        height: `${rect == null ? void 0 : rect.height}px`,
        width: props.fullWidth ? "100%" : `${rect == null ? void 0 : rect.width}px`,
        maxWidth: props.fullWidth ? "100%" : `${rect == null ? void 0 : rect.width}px`,
        overflowY: "hidden"
      }
    },
    /* @__PURE__ */ React10.createElement(
      "div",
      {
        ref: content,
        style: {
          width: props.fullWidth ? "100%" : "fit-content",
          maxWidth: props.fullWidth ? "100%" : "fit-content",
          height: "fit-content",
          overflow: "visible"
        }
      },
      props.children
    )
  );
}

// src/filter/components/AstroBentoCard.tsx
var AstroBentoCard = (props) => {
  const [collapsed, setCollapsed] = useState14(false);
  return /* @__PURE__ */ React.createElement(
    Stack13,
    {
      bgcolor: "rgb(255,255,255)",
      borderRadius: "12px",
      spacing: "20px",
      p: "16px",
      paddingBottom: props.paddingBottom,
      flex: 1,
      border: `1px solid ${PALETTE.secondary.grey[2]}`
    },
    /* @__PURE__ */ React.createElement(Stack13, null, /* @__PURE__ */ React.createElement(Stack13, { justifyContent: "space-between", direction: "row" }, /* @__PURE__ */ React.createElement(Stack13, { spacing: props.isMobile ? "6px" : void 0 }, /* @__PURE__ */ React.createElement(Stack13, null, /* @__PURE__ */ React.createElement(
      Stack13,
      {
        direction: "row",
        sx: props.iconColor ? { svg: { path: { fill: props.iconColor } } } : void 0,
        alignItems: "center",
        spacing: "6px"
      },
      props.icon ? /* @__PURE__ */ React.createElement(props.icon, { height: "20px", width: "20px" }) : null,
      /* @__PURE__ */ React.createElement(Typography, { variant: props.isMobile ? "normal" : "large", bold: true }, props.title),
      props.info && !props.isMobile && !props.infoButtonBelowTitle ? /* @__PURE__ */ React.createElement(
        Stack13,
        {
          pl: "12px",
          height: "100%",
          justifyContent: "flex-end",
          sx: { transform: "translateY(-2px)" }
        },
        /* @__PURE__ */ React.createElement(InfoButton_default, { small: true, ...props.info })
      ) : null
    ), props.info && (props.isMobile || props.infoButtonBelowTitle) ? /* @__PURE__ */ React.createElement(InfoButton_default, { small: true, ...props.info }) : null), props.subtitle ? /* @__PURE__ */ React.createElement(Typography, { color: PALETTE.secondary.grey[4], variant: "small" }, props.subtitle) : null), /* @__PURE__ */ React.createElement(Stack13, { direction: "row", spacing: "24px", height: "fit-content" }, props.topRightStuff, !props.notCollapsible ? /* @__PURE__ */ React.createElement(
      Stack13,
      {
        sx: {
          transform: `rotate(${collapsed ? 0 : 180}deg)`,
          transition: "0.2s",
          cursor: "pointer",
          "&:hover": { opacity: 0.6 }
        },
        onClick: () => setCollapsed(!collapsed)
      },
      /* @__PURE__ */ React.createElement(ChevronDown_default, { height: "24px", width: "24px" })
    ) : null))),
    !props.notCollapsible ? /* @__PURE__ */ React.createElement(DynamicContainer2, { duration: 800, fullWidth: true }, collapsed ? null : props.children) : /* @__PURE__ */ React.createElement(Stack13, { flex: 1 }, props.children)
  );
};

// src/profile/components/MobileInsightsTab.tsx
import _7 from "lodash";

// src/profile/components/AstroTimeChart.tsx
import { Stack as Stack14 } from "@mui/system";
import dayjs from "dayjs";
import _2 from "lodash";
import { useEffect as useEffect9, useState as useState15 } from "react";
var yInterval = 1;
var AstroTimeChart = (props) => {
  const [maxTime, setMaxTime] = useState15(0);
  useEffect9(
    () => {
      var _a;
      return setMaxTime(
        _2.max(props.times.map((t) => t.screenTime)) ?? ((_a = props.times[0]) == null ? void 0 : _a.screenTime)
      );
    },
    [props.times]
  );
  const [nHorizontalLines, setNHorizontalLines] = useState15(1);
  useEffect9(() => {
    const nIntervals = Math.ceil(maxTime / (60 * yInterval));
    setNHorizontalLines(nIntervals === 1 ? 1 : nIntervals + 1);
  }, [maxTime]);
  return /* @__PURE__ */ React.createElement(
    Stack14,
    {
      flex: 1,
      px: props.barsXPadding ? `${props.barsXPadding}px` : "24px",
      position: "relative",
      mr: "56px !important"
    },
    /* @__PURE__ */ React.createElement(Stack14, { top: 0, left: 0, width: "100%", height: "100%", position: "absolute" }, /* @__PURE__ */ React.createElement(Stack14, { flex: 1, justifyContent: "space-between", pb: "28px" }, _2.reverse([...Array(nHorizontalLines + 1).keys()]).map((i) => /* @__PURE__ */ React.createElement(
      Stack14,
      {
        key: i,
        height: "2px",
        width: "100%",
        bgcolor: PALETTE.secondary.grey[2],
        position: "relative",
        sx: {
          opacity: nHorizontalLines > 9 && i % 2 ? 0 : 1
        }
      },
      /* @__PURE__ */ React.createElement(
        Stack14,
        {
          width: "30px",
          right: "-42px",
          position: "absolute",
          sx: { transform: "translateY(-50%)" }
        },
        /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[3] }, `${i * yInterval}h`)
      )
    )))),
    /* @__PURE__ */ React.createElement(Stack14, { direction: "row", flex: 1, justifyContent: "space-between", zIndex: 2 }, props.times.map((dayTime, i) => /* @__PURE__ */ React.createElement(
      Stack14,
      {
        key: dayTime.date,
        alignItems: "center",
        width: "60px",
        justifyContent: "flex-end",
        spacing: "6px",
        sx: props.selected !== dayTime.date ? {
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
          transition: "0.2s"
        } : null,
        onClick: () => props.setSelectedDatetime(dayTime.date)
      },
      /* @__PURE__ */ React.createElement(
        Stack14,
        {
          height: `${100 * dayTime.screenTime / 60 / (yInterval * nHorizontalLines)}%`,
          width: props.barWidth ?? "32px",
          borderRadius: "4px 4px 0 0",
          bgcolor: props.selected === dayTime.date ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[2],
          sx: {
            transition: "0.2s"
          },
          position: "relative"
        },
        dayTime.timeLimitReached ? /* @__PURE__ */ React.createElement(
          Stack14,
          {
            position: "absolute",
            left: 0,
            right: 0,
            margin: "0 auto",
            width: 0,
            overflow: "visible",
            alignItems: "center"
          },
          /* @__PURE__ */ React.createElement(
            Stack14,
            {
              width: "50px",
              justifyContent: "center",
              position: "absolute",
              top: "-25px",
              sx: {
                // transform: `translateX(-${
                //   props.limitReachedXTranslation ?? "8.5"
                // }px)`,
              }
            },
            /* @__PURE__ */ React.createElement(
              Typography,
              {
                variant: "tiny",
                bold: true,
                color: PALETTE.secondary.grey[3],
                sx: {
                  textAlign: "center"
                }
              },
              "Limit reached"
            )
          )
        ) : null
      ),
      /* @__PURE__ */ React.createElement(Stack14, null, /* @__PURE__ */ React.createElement(
        Typography,
        {
          bold: true,
          color: props.selected === dayTime.date ? void 0 : PALETTE.secondary.grey[3],
          variant: props.labelFontSize ?? "normal"
        },
        dayjs(dayTime.date).format(
          dayjs().utc().diff(dayTime.date, "days") < 7 ? "ddd" : "MM/DD"
        )
      ), /* @__PURE__ */ React.createElement(
        Stack14,
        {
          width: "100%",
          height: "2px",
          bgcolor: props.selected === dayTime.date ? PALETTE.secondary.purple[2] : void 0,
          sx: {
            transition: "0.2s"
          }
        }
      ))
    )))
  );
};
var AstroTimeChart_default = AstroTimeChart;

// src/profile/components/MobileInsightsTab.tsx
import { useEffect as useEffect13, useState as useState23 } from "react";
import dayjs5 from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

// src/components/CalendarButton.tsx
import { Stack as Stack15 } from "@mui/system";
import { useState as useState17 } from "react";

// src/components/UrsorCalendar.tsx
import React11, { useState as useState16 } from "react";
import { Box as Box7 } from "@mui/system";
import Calendar from "react-calendar";
import dayjs2 from "dayjs";
function UrsorCalendar(props) {
  const [viewMonthStartDate, setViewMonthStartDate] = useState16(
    dayjs2().isAfter(props.value) ? /* @__PURE__ */ new Date() : new Date(props.value.getFullYear(), props.value.getMonth(), 1)
  );
  const showingCurrentMonth = (viewMonthStartDate == null ? void 0 : viewMonthStartDate.getMonth()) === (/* @__PURE__ */ new Date()).getMonth() && (viewMonthStartDate == null ? void 0 : viewMonthStartDate.getFullYear()) === (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ React11.createElement(
    Box7,
    {
      p: "10px",
      pb: "5px",
      width: "320px",
      sx: {
        ".react-calendar__tile": {
          color: PALETTE.font.dark,
          transition: "0.2s",
          borderRadius: "100%",
          height: "42px",
          border: "none",
          fontSize: 15,
          background: "transparent",
          fontFamily: "inherit",
          "&:hover": {
            opacity: 0.7
          },
          cursor: "pointer"
        },
        ".react-calendar__tile--active": {
          "> abbr": {
            color: "white !important",
            background: PALETTE.secondary.purple[2],
            width: "36px",
            height: "34px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100%"
          },
          "&:hover": {
            "> abbr": {
              background: PALETTE.secondary.purple[2]
            },
            opacity: 1
          },
          cursor: "default"
        },
        ".react-calendar__month-view__weekdays__weekday": {
          color: PALETTE.font.dark,
          fontSize: 13,
          fontWeight: 500,
          //opacity: 0.8,
          textAlign: "center",
          textTransform: "uppercase",
          "> abbr": {
            textDecoration: "none !important",
            border: "none !important"
          },
          pointerEvents: "none"
        },
        ".react-calendar__navigation": {
          display: "flex",
          marginBottom: "17px"
        },
        ".react-calendar__navigation__label": {
          color: PALETTE.font.dark,
          background: "none",
          border: "none",
          fontSize: 15,
          fontFamily: "inherit"
        },
        ".react-calendar__navigation__arrow": {
          display: "flex",
          alignItems: "center",
          background: "none",
          border: "none",
          "&:hover": { opacity: 0.6 },
          cursor: "pointer",
          transition: "0.2s"
        },
        ".react-calendar__navigation__prev-button": {
          opacity: props.hidePast && showingCurrentMonth ? 0 : 1,
          pointerEvents: props.hidePast && showingCurrentMonth ? "none" : "auto"
        },
        ".hidePast": {
          opacity: 0.16,
          pointerEvents: "none"
        },
        ".disableFuture": {
          opacity: 0.16,
          pointerEvents: "none"
        }
      }
    },
    /* @__PURE__ */ React11.createElement(DynamicContainer2, { duration: 800 }, /* @__PURE__ */ React11.createElement(
      Calendar,
      {
        onChange: props.onChange,
        onActiveStartDateChange: (x) => setViewMonthStartDate(x.activeStartDate),
        value: props.value,
        prevLabel: /* @__PURE__ */ React11.createElement(ChevronLeftIcon_default, { height: "20px", width: "20px" }),
        nextLabel: /* @__PURE__ */ React11.createElement(
          ChevronLeftIcon_default,
          {
            height: "20px",
            width: "20px",
            style: { transform: "rotate(180deg)" }
          }
        ),
        prev2Label: null,
        next2Label: null,
        tileClassName: (tileProps) => props.hidePast && dayjs2().diff(tileProps.date, "days") >= 1 ? "hidePast" : props.disableFuture && dayjs2(tileProps.date).isAfter(dayjs2(), "days") ? "hidePast" : "",
        maxDate: /* @__PURE__ */ new Date(),
        minDetail: "month"
      }
    ))
  );
}

// src/components/CalendarButton.tsx
var CalendarButton = (props) => {
  const [open, setOpen] = useState17(false);
  return /* @__PURE__ */ React.createElement(
    UrsorPopover,
    {
      open,
      content: /* @__PURE__ */ React.createElement(
        UrsorCalendar,
        {
          value: props.value,
          onChange: (value) => {
            setOpen(false);
            props.setValue(value);
          },
          disableFuture: true
        }
      ),
      closeCallback: () => setOpen(false),
      placement: "right",
      noPadding: true
    },
    /* @__PURE__ */ React.createElement(
      Stack15,
      {
        bgcolor: "rgb(255,255,255)",
        height: "32px",
        alignItems: "center",
        borderRadius: "8px",
        pl: "12px",
        pr: "8px",
        boxSizing: "border-box",
        spacing: "8px",
        direction: "row",
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.6 }
        },
        onClick: () => setOpen(true)
      },
      /* @__PURE__ */ React.createElement(Typography, { variant: "small", bold: true }, "Select date"),
      /* @__PURE__ */ React.createElement(ChevronDown_default, { height: "20px", width: "20px" })
    )
  );
};
var CalendarButton_default = CalendarButton;

// src/profile/components/MobileHistorySection.tsx
import { Stack as Stack20 } from "@mui/system";
import dayjs4 from "dayjs";
import { useEffect as useEffect11, useState as useState20 } from "react";

// src/profile/components/HistorySection.tsx
import { Stack as Stack19 } from "@mui/system";
import dayjs3 from "dayjs";
import { useEffect as useEffect10, useState as useState19 } from "react";
import _3 from "lodash";

// src/components/PageSelector.tsx
import React12 from "react";
import { Stack as Stack16 } from "@mui/system";
var PageSelector = (props) => {
  return /* @__PURE__ */ React12.createElement(
    Stack16,
    {
      direction: "row",
      spacing: "4px",
      alignItems: "center",
      justifyContent: "center"
    },
    [
      /* @__PURE__ */ React12.createElement(
        Stack16,
        {
          key: "left",
          sx: {
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.7 },
            pointerEvents: props.pageIndex === 0 ? "none" : void 0,
            opacity: props.pageIndex === 0 ? 0.3 : 1
          },
          onClick: () => props.setPageIndex(props.pageIndex - 1),
          width: "30px",
          height: "30px",
          justifyContent: "center",
          alignItems: "center"
        },
        /* @__PURE__ */ React12.createElement(ChevronLeft_default, { height: "15px", width: "15px" })
      ),
      ...[...Array(props.nPages).keys()].map((i) => /* @__PURE__ */ React12.createElement(
        Stack16,
        {
          key: i,
          sx: {
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.7 },
            pointerEvents: props.pageIndex === i ? "none" : void 0
          },
          onClick: () => props.setPageIndex(i),
          width: "30px",
          height: "30px",
          justifyContent: "center",
          alignItems: "center"
        },
        /* @__PURE__ */ React12.createElement(
          Typography,
          {
            bold: true,
            sx: { fontSize: 14 },
            color: i === props.pageIndex ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[3]
          },
          i + 1
        )
      )),
      /* @__PURE__ */ React12.createElement(
        Stack16,
        {
          key: "right",
          sx: {
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.7 },
            pointerEvents: props.pageIndex === props.nPages - 1 ? "none" : void 0,
            opacity: props.pageIndex === props.nPages - 1 ? 0.3 : 1
          },
          onClick: () => props.setPageIndex(props.pageIndex + 1),
          width: "30px",
          height: "30px",
          justifyContent: "center",
          alignItems: "center"
        },
        /* @__PURE__ */ React12.createElement(ChevronRight_default, { height: "15px", width: "15px" })
      )
    ]
  );
};
var PageSelector_default = PageSelector;

// src/components/SearchInput.tsx
import { Stack as Stack17 } from "@mui/system";
import { useState as useState18 } from "react";

// src/images/icons/SearchIcon.svg
var SearchIcon_default = "./SearchIcon-YIM5YRGE.svg";

// src/components/SearchInput.tsx
import { Input as Input2 } from "@mui/material";
var SearchInput = (props) => {
  const [active, setActive] = useState18(false);
  const [hovering, setHovering] = useState18(false);
  return /* @__PURE__ */ React.createElement(
    Stack17,
    {
      height: props.height || "28px",
      width: props.fullWidth ? "100%" : "160px",
      direction: "row",
      borderRadius: "8px",
      alignItems: "center",
      bgcolor: props.grey ? PALETTE.secondary.grey[1] : "rgb(255,255,255)",
      px: "10px",
      spacing: "8px",
      boxSizing: "border-box",
      sx: {
        svg: {
          path: {
            fill: PALETTE.secondary.grey[4]
          }
        },
        transition: "0.2s"
      },
      border: `${active || hovering ? 2 : 0}px solid ${PALETTE.secondary.purple[active ? 2 : 1]}`,
      onMouseEnter: () => setHovering(true),
      onMouseLeave: () => setHovering(false),
      boxShadow: props.shadow ? "0 0 16px rgba(0,0,0,0.03)" : void 0
    },
    /* @__PURE__ */ React.createElement(
      SearchIcon_default,
      {
        width: props.iconSize || "24px",
        height: props.iconSize || "24px"
      }
    ),
    /* @__PURE__ */ React.createElement(
      Input2,
      {
        style: {
          textAlign: "left",
          textOverflow: "ellipsis",
          fontSize: FONT_SIZES["small"],
          color: PALETTE.font.dark,
          fontWeight: 480,
          lineHeight: "100%",
          transition: "0.2s",
          fontFamily: "inherit",
          width: props.fullWidth ? "100%" : void 0
        },
        value: props.value,
        disableUnderline: true,
        sx: {
          background: props.grey ? PALETTE.secondary.grey[1] : "rgb(255,255,255)",
          input: {
            padding: "0 !important"
          }
        },
        onChange: (event) => {
          props.callback(event.target.value);
        },
        placeholder: "Search",
        onBlur: () => setActive(false),
        onFocus: () => setActive(true)
      }
    ),
    /* @__PURE__ */ React.createElement(
      Stack17,
      {
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
          opacity: props.value ? 1 : 0
        },
        onClick: props.clearCallback
      },
      /* @__PURE__ */ React.createElement(X_default, { width: "16px", height: "16px" })
    )
  );
};

// src/components/UrsorFadeIn.tsx
import React13 from "react";
import FadeIn from "react-fade-in";
import { Stack as Stack18 } from "@mui/system";
var FULL_SIZE_CLASSNAME = "fullSize";
function UrsorFadeIn(props) {
  return /* @__PURE__ */ React13.createElement(
    Stack18,
    {
      height: props.fullHeight ? "100%" : "auto",
      width: props.fullWidth ? "100%" : "auto",
      sx: {
        [`& .${FULL_SIZE_CLASSNAME}`]: {
          height: props.fullHeight ? "100%" : "auto",
          width: props.fullWidth ? "100%" : "auto",
          overflow: "visible",
          display: props.centerAlign ? "flex" : void 0,
          justifyContent: props.centerAlign ? "center" : void 0
        }
      },
      overflow: "visible"
    },
    /* @__PURE__ */ React13.createElement(
      FadeIn,
      {
        transitionDuration: props.duration,
        delay: props.delay,
        className: FULL_SIZE_CLASSNAME,
        childClassName: FULL_SIZE_CLASSNAME
      },
      props.children
    )
  );
}

// src/profile/components/HistorySection.tsx
var PAGE_LENGTH = 55;
var HistoryRow = (props) => {
  const [duration, setDuration] = useState19(0);
  useEffect10(() => {
    setDuration(
      props.duration || dayjs3(props.finishedAt).diff(props.searchedAt, "seconds")
    );
  }, [props.duration, props.searchedAt, props.finishedAt]);
  return /* @__PURE__ */ React.createElement(Stack19, { direction: "row", spacing: "40px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Stack19, { width: "94px" }, /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[4] }, dayjs3(props.searchedAt).format("hh:mm:HHa"))), /* @__PURE__ */ React.createElement(Stack19, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    Stack19,
    {
      borderRadius: "3px",
      overflow: "hidden",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    },
    /* @__PURE__ */ React.createElement(
      "img",
      {
        height: 20,
        width: 20,
        src: props.faviconUrl,
        alt: "favicon url"
      }
    )
  ), /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.title), /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[4] }, "-"), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: getAbsoluteUrl(cleanUrl(props.url)),
      target: "_blank",
      style: { textDecoration: "none" }
    },
    /* @__PURE__ */ React.createElement(
      Stack19,
      {
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.7 }
        }
      },
      /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[4] }, cleanUrl(props.url).replace(/\/$/, ""))
    )
  ), /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[4] }, "-"), duration ? /* @__PURE__ */ React.createElement(
    Stack19,
    {
      direction: "row",
      spacing: "8px",
      alignItems: "center",
      sx: {
        svg: {
          path: {
            fill: PALETTE.secondary.grey[4]
          }
        }
      }
    },
    /* @__PURE__ */ React.createElement(ClockIcon_default, { height: "16px", width: "16px" }),
    /* @__PURE__ */ React.createElement(Typography, { color: PALETTE.secondary.grey[4], bold: true }, duration < 60 ? `${duration}s` : `${Math.floor(duration / (60 * 60))}h ${Math.floor(
      duration % (60 * 60) / 60
    )}m`)
  ) : null));
};
var HistoryDomainRow = (props) => {
  const [expanded, setExpanded] = useState19(false);
  return /* @__PURE__ */ React.createElement(DynamicContainer2, { duration: 650, fullWidth: true }, /* @__PURE__ */ React.createElement(Stack19, { spacing: "12px" }, /* @__PURE__ */ React.createElement(
    Stack19,
    {
      justifyContent: "space-between",
      alignItems: "center",
      direction: "row",
      sx: {
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.6 }
      },
      onClick: () => setExpanded(!expanded)
    },
    /* @__PURE__ */ React.createElement(
      HistoryRow,
      {
        ...props.domain,
        duration: _3.sum(
          props.rows.map(
            (r) => dayjs3(r.finishedAt).diff(r.searchedAt, "seconds")
          )
        )
      }
    ),
    /* @__PURE__ */ React.createElement(
      Stack19,
      {
        sx: {
          transform: `rotate(${expanded ? 180 : 0}deg)`,
          transition: "0.2s",
          svg: {
            path: {
              fill: PALETTE.secondary.grey[4]
            }
          }
        }
      },
      /* @__PURE__ */ React.createElement(ChevronDown_default, { width: "20px", height: "20px" })
    )
  ), expanded ? /* @__PURE__ */ React.createElement(
    Stack19,
    {
      borderRadius: "12px",
      bgcolor: PALETTE.secondary.grey[1],
      pl: "28px",
      py: "12px",
      spacing: "16px"
    },
    props.rows.map((row, i) => /* @__PURE__ */ React.createElement(HistoryRow, { key: i, ...row }))
  ) : null));
};
var HistorySection = (props) => {
  const [nPages, setNPages] = useState19(1);
  const [pageIndex, setPageIndex] = useState19(0);
  const [history, setHistory] = useState19([]);
  const [searchValue, setSearchValue] = useState19("");
  useEffect10(() => setPageIndex(0), [searchValue]);
  useEffect10(() => {
    api_default.getHistory(
      props.deviceId,
      props.date,
      pageIndex + 1,
      PAGE_LENGTH,
      searchValue
    ).then((response) => {
      setHistory(response.history);
      setNPages(response.pages);
    });
  }, [props.deviceId, props.date, pageIndex, searchValue]);
  const [domainGroups, setDomainGroups] = useState19([]);
  useEffect10(() => {
    const simplisticDomainGroups = _3.reduce(
      history,
      (acc, cur) => {
        const currentDomain = new URL(cur.url).hostname;
        const latestGroup = acc[acc.length - 1];
        const latestUrl = latestGroup == null ? void 0 : latestGroup.rows[latestGroup.rows.length - 1].url;
        if (latestUrl === cur.url) return acc;
        const latestDomain = latestGroup == null ? void 0 : latestGroup.domain;
        return currentDomain === latestDomain ? [
          ...acc.slice(0, -1),
          { domain: latestDomain, rows: [...latestGroup.rows, cur] }
        ] : [...acc, { domain: currentDomain, rows: [cur] }];
      },
      []
    );
    setDomainGroups(
      simplisticDomainGroups.map((dg) => {
        var _a, _b, _c, _d;
        return {
          domain: {
            url: dg.domain,
            title: ((_a = dg.rows[dg.rows.length - 1]) == null ? void 0 : _a.title) ?? "",
            faviconUrl: ((_b = dg.rows[0]) == null ? void 0 : _b.faviconUrl) ?? "",
            searchedAt: ((_c = dg.rows[dg.rows.length - 1]) == null ? void 0 : _c.searchedAt) ?? "",
            finishedAt: ((_d = dg.rows[0]) == null ? void 0 : _d.finishedAt) ?? ""
          },
          rows: dg.rows
        };
      })
    );
  }, [history]);
  return /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: "Browser history",
      notCollapsible: true,
      topRightStuff: /* @__PURE__ */ React.createElement(
        SearchInput,
        {
          value: searchValue,
          callback: setSearchValue,
          clearCallback: () => setSearchValue(""),
          grey: true
        }
      )
    },
    /* @__PURE__ */ React.createElement(Stack19, { spacing: "16px" }, domainGroups.map((dg, i) => /* @__PURE__ */ React.createElement(
      UrsorFadeIn,
      {
        key: `${i}${pageIndex}${props.date}`,
        delay: i * 70,
        duration: 600
      },
      /* @__PURE__ */ React.createElement(HistoryDomainRow, { ...dg })
    ))),
    nPages > 1 ? /* @__PURE__ */ React.createElement(Stack19, { pt: "24px", pb: "9px" }, /* @__PURE__ */ React.createElement(
      PageSelector_default,
      {
        pageIndex,
        setPageIndex,
        nPages
      }
    )) : null
  );
};
var HistorySection_default = HistorySection;

// src/profile/components/MobileHistorySection.tsx
import _4 from "lodash";
var MobileHistoryRow = (props) => {
  const [duration, setDuration] = useState20(0);
  useEffect11(() => {
    setDuration(
      props.duration || dayjs4(props.finishedAt).diff(props.searchedAt, "seconds")
    );
  }, [props.duration, props.searchedAt, props.finishedAt]);
  return /* @__PURE__ */ React.createElement(Stack20, { direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Stack20, { direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    Stack20,
    {
      borderRadius: "8px",
      overflow: "hidden",
      minHeight: "42px",
      minWidth: "42px",
      boxShadow: "0 0 12px rgba(0,0,0,0.1)"
    },
    /* @__PURE__ */ React.createElement(
      "img",
      {
        height: 42,
        width: 42,
        src: props.faviconUrl,
        alt: "favicon url"
      }
    )
  ), /* @__PURE__ */ React.createElement(Stack20, { justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(Stack20, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    Typography,
    {
      bold: true,
      maxLines: 1,
      sx: {
        wordBreak: "break-all"
      }
    },
    props.title
  ), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: props.url,
      target: "_blank",
      style: { textDecoration: "none" }
    },
    /* @__PURE__ */ React.createElement(Stack20, { minWidth: "20%" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        bold: true,
        color: PALETTE.secondary.grey[3],
        maxLines: 1,
        sx: {
          wordBreak: "break-all"
        }
      },
      cleanUrl(props.url).replace(/\/$/, "")
    ))
  )), /* @__PURE__ */ React.createElement(Stack20, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Typography, { variant: "tiny", bold: true, color: PALETTE.secondary.grey[4] }, dayjs4(props.searchedAt).utc().format("hh:mm a")), /* @__PURE__ */ React.createElement(
    Typography,
    {
      bold: true,
      sx: { lineHeight: "100%" },
      color: PALETTE.secondary.grey[4]
    },
    "-"
  ), duration ? /* @__PURE__ */ React.createElement(
    Stack20,
    {
      direction: "row",
      spacing: "4px",
      alignItems: "center",
      sx: {
        svg: {
          path: {
            fill: PALETTE.secondary.grey[4]
          }
        }
      }
    },
    /* @__PURE__ */ React.createElement(ClockIcon_default, { height: "12px", width: "12px" }),
    /* @__PURE__ */ React.createElement(
      Typography,
      {
        variant: "tiny",
        color: PALETTE.secondary.grey[4],
        bold: true
      },
      duration < 60 ? `${duration}s` : `${Math.floor(duration / (60 * 60))}h ${Math.floor(
        duration % (60 * 60) / 60
      )}m`
    )
  ) : null))));
};
var MobileHistoryDomainRow = (props) => {
  const [expanded, setExpanded] = useState20(false);
  return /* @__PURE__ */ React.createElement(DynamicContainer2, { duration: 650, fullWidth: true }, /* @__PURE__ */ React.createElement(Stack20, { spacing: "5px", py: "8px" }, /* @__PURE__ */ React.createElement(
    Stack20,
    {
      justifyContent: "space-between",
      alignItems: "center",
      direction: "row",
      sx: {
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.6 }
      },
      onClick: () => setExpanded(!expanded)
    },
    /* @__PURE__ */ React.createElement(
      MobileHistoryRow,
      {
        ...props.domain,
        duration: _4.sum(
          props.rows.map(
            (r) => dayjs4(r.finishedAt).diff(r.searchedAt, "seconds")
          )
        )
      }
    ),
    /* @__PURE__ */ React.createElement(
      Stack20,
      {
        sx: {
          svg: {
            transform: `rotate(${expanded ? 180 : 0}deg)`,
            transition: "0.2s",
            path: {
              fill: PALETTE.secondary.grey[4]
            }
          }
        },
        minWidth: "30px",
        alignItems: "flex-end"
      },
      /* @__PURE__ */ React.createElement(ChevronDown_default, { width: "20px", height: "20px" })
    )
  ), expanded ? /* @__PURE__ */ React.createElement(
    Stack20,
    {
      borderRadius: "12px",
      bgcolor: PALETTE.secondary.grey[1],
      pl: "12px",
      py: "12px",
      spacing: "16px"
    },
    props.rows.map((row, i) => /* @__PURE__ */ React.createElement(MobileHistoryRow, { key: i, ...row }))
  ) : null));
};
var MobileHistorySection = (props) => {
  const [nPages, setNPages] = useState20(1);
  const [pageIndex, setPageIndex] = useState20(0);
  const [history, setHistory] = useState20([]);
  const [searchValue, setSearchValue] = useState20("");
  useEffect11(() => setPageIndex(0), [searchValue]);
  useEffect11(() => {
    api_default.getHistory(
      props.deviceId,
      props.date,
      pageIndex + 1,
      PAGE_LENGTH,
      searchValue
    ).then((response) => {
      setHistory(response.history);
      setNPages(response.pages);
    });
  }, [props.deviceId, props.date, pageIndex, searchValue]);
  const [domainGroups, setDomainGroups] = useState20([]);
  useEffect11(() => {
    const simplisticDomainGroups = _4.reduce(
      history,
      (acc, cur) => {
        const currentDomain = new URL(cur.url).hostname;
        const latestGroup = acc[acc.length - 1];
        const latestUrl = latestGroup == null ? void 0 : latestGroup.rows[latestGroup.rows.length - 1].url;
        if (latestUrl === cur.url) return acc;
        const latestDomain = latestGroup == null ? void 0 : latestGroup.domain;
        return currentDomain === latestDomain ? [
          ...acc.slice(0, -1),
          { domain: latestDomain, rows: [...latestGroup.rows, cur] }
        ] : [...acc, { domain: currentDomain, rows: [cur] }];
      },
      []
    );
    setDomainGroups(
      simplisticDomainGroups.map((dg) => {
        var _a, _b, _c, _d;
        return {
          domain: {
            url: dg.domain,
            title: ((_a = dg.rows[dg.rows.length - 1]) == null ? void 0 : _a.title) ?? "",
            faviconUrl: ((_b = dg.rows[0]) == null ? void 0 : _b.faviconUrl) ?? "",
            searchedAt: ((_c = dg.rows[dg.rows.length - 1]) == null ? void 0 : _c.searchedAt) ?? "",
            finishedAt: ((_d = dg.rows[0]) == null ? void 0 : _d.finishedAt) ?? ""
          },
          rows: dg.rows
        };
      })
    );
  }, [history]);
  return /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: "Browser history",
      notCollapsible: true,
      isMobile: true,
      topRightStuff: /* @__PURE__ */ React.createElement(
        SearchInput,
        {
          value: searchValue,
          callback: setSearchValue,
          clearCallback: () => setSearchValue(""),
          grey: true
        }
      )
    },
    /* @__PURE__ */ React.createElement(Stack20, { spacing: "16px" }, domainGroups.map((dg, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: `${i}${pageIndex}`, delay: i * 70, duration: 600 }, /* @__PURE__ */ React.createElement(MobileHistoryDomainRow, { ...dg })))),
    nPages > 1 ? /* @__PURE__ */ React.createElement(Stack20, { pt: "24px", pb: "9px" }, /* @__PURE__ */ React.createElement(
      PageSelector_default,
      {
        pageIndex,
        setPageIndex,
        nPages
      }
    )) : null
  );
};
var MobileHistorySection_default = MobileHistorySection;

// src/profile/components/MostVisitedSitesSection.tsx
import React15, { useState as useState22 } from "react";
import { Stack as Stack22 } from "@mui/system";
import _6 from "lodash";

// src/profile/components/AllMostVisitedSitesDialog.tsx
import React14 from "react";
import { Stack as Stack21 } from "@mui/system";
import { Dialog as Dialog2 } from "@mui/material";
import { useEffect as useEffect12, useState as useState21 } from "react";
import _5 from "lodash";
var AllMostVisitedSitesDialog = (props) => {
  const [searchValue, setSearchValue] = useState21("");
  const [filteredSites, setFilteredSites] = useState21([]);
  useEffect12(
    () => setFilteredSites(
      props.sites.filter(
        (d) => !searchValue || d.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    [props.sites, searchValue]
  );
  return /* @__PURE__ */ React14.createElement(
    Dialog2,
    {
      transitionDuration: 800,
      open: props.open,
      onClose: props.onClose,
      PaperProps: {
        style: {
          maxWidth: 1308,
          width: props.isMobile ? "100%" : "70%",
          maxHeight: 726,
          height: "70%",
          borderRadius: BORDER_RADIUS2,
          margin: "20px",
          padding: props.isMobile ? "20px" : "32px"
        }
      },
      sx: {
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE
      }
    },
    /* @__PURE__ */ React14.createElement(Stack21, { spacing: "32px" }, /* @__PURE__ */ React14.createElement(
      Stack21,
      {
        direction: props.isMobile ? "column" : "row",
        justifyContent: "space-between",
        spacing: props.isMobile ? "6px" : void 0
      },
      /* @__PURE__ */ React14.createElement(Stack21, { direction: "row", justifyContent: "space-between" }, /* @__PURE__ */ React14.createElement(Typography, { bold: true, variant: props.isMobile ? "large" : "h5" }, "Most visited sites today"), /* @__PURE__ */ React14.createElement(
        Stack21,
        {
          width: "40px",
          alignItems: "flex-end",
          pt: "3px",
          onClick: props.onClose
        },
        /* @__PURE__ */ React14.createElement(X_default, { height: "22px", width: "22px" })
      )),
      /* @__PURE__ */ React14.createElement(Stack21, { direction: "row", spacing: "0px", alignItems: "center" }, /* @__PURE__ */ React14.createElement(
        SearchInput,
        {
          value: searchValue,
          callback: setSearchValue,
          clearCallback: () => setSearchValue(""),
          fullWidth: props.isMobile,
          iconSize: props.isMobile ? "16px" : void 0,
          grey: true
        }
      ), !props.isMobile ? /* @__PURE__ */ React14.createElement(
        Stack21,
        {
          width: "40px",
          alignItems: "flex-end",
          pt: "3px",
          onClick: props.onClose
        },
        /* @__PURE__ */ React14.createElement(X_default, { height: "22px", width: "22px" })
      ) : null)
    ), /* @__PURE__ */ React14.createElement(Stack21, null, _5.reverse(filteredSites.slice()).map((site, i) => /* @__PURE__ */ React14.createElement(
      VisitedSiteRow,
      {
        key: i,
        ...site,
        maxScreenTime: _5.max(props.sites.map((s) => s.screenTime)) ?? 1,
        borderTop: i > 0
      }
    ))))
  );
};
var AllMostVisitedSitesDialog_default = AllMostVisitedSitesDialog;

// src/profile/components/MostVisitedSitesSection.tsx
var VisitedSiteRow = (props) => /* @__PURE__ */ React15.createElement(
  Stack22,
  {
    height: "73px",
    borderTop: props.borderTop ? `2px solid ${PALETTE.secondary.grey[2]}` : void 0,
    sx: {
      cursor: "pointer",
      "&:hover": { opacity: 0.7 },
      transition: "0.2s"
    },
    justifyContent: "center"
  },
  /* @__PURE__ */ React15.createElement(
    "a",
    {
      href: props.url,
      target: "_blank",
      style: {
        textDecoration: "none"
      }
    },
    /* @__PURE__ */ React15.createElement(Stack22, { flex: 1, direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React15.createElement(
      Stack22,
      {
        borderRadius: "8px",
        overflow: "hidden",
        minHeight: 42,
        minWidth: 42,
        boxShadow: "0 0 12px rgba(0,0,0,0.1)"
      },
      /* @__PURE__ */ React15.createElement("img", { src: props.faviconUrl, height: 42, width: 42, alt: "favicon" })
    ), /* @__PURE__ */ React15.createElement(Stack22, { spacing: "8px", width: "100%" }, /* @__PURE__ */ React15.createElement(Stack22, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React15.createElement(
      Typography,
      {
        bold: true,
        maxLines: 1,
        sx: {
          wordBreak: "break-all"
        }
      },
      props.title
    ), /* @__PURE__ */ React15.createElement(Stack22, { minWidth: "20%" }, /* @__PURE__ */ React15.createElement(
      Typography,
      {
        bold: true,
        color: PALETTE.secondary.grey[3],
        maxLines: 1,
        sx: {
          wordBreak: "break-all"
        }
      },
      cleanUrl(props.url).replace(/\/$/, "")
    ))), /* @__PURE__ */ React15.createElement(Stack22, { direction: "row", alignItems: "center", spacing: "12px" }, /* @__PURE__ */ React15.createElement(
      Stack22,
      {
        width: `${100 * props.screenTime / props.maxScreenTime}%`,
        height: "8px",
        bgcolor: PALETTE.secondary.purple[1],
        borderRadius: "4px"
      }
    ), /* @__PURE__ */ React15.createElement(Stack22, { width: "60px" }, /* @__PURE__ */ React15.createElement(Typography, { bold: true, variant: "tiny" }, `${Math.floor(
      props.screenTime / 60
    )}h ${Math.floor(props.screenTime % 60)}m`)))))
  )
);
var MostVisitedSitesSection = (props) => {
  const [allMostVisitedSitesDialogOpen, setAllMostVisitedSitesDialogOpen] = useState22(false);
  return /* @__PURE__ */ React15.createElement(React15.Fragment, null, /* @__PURE__ */ React15.createElement(
    AstroBentoCard,
    {
      title: "Most visited sites today",
      notCollapsible: true,
      paddingBottom: "0",
      isMobile: props.isMobile,
      topRightStuff: /* @__PURE__ */ React15.createElement(
        UrsorButton,
        {
          size: "small",
          variant: "secondary",
          onClick: () => setAllMostVisitedSitesDialogOpen(true)
        },
        "View all"
      )
    },
    _6.reverse(props.sites.slice(-3)).map((site, i) => /* @__PURE__ */ React15.createElement(UrsorFadeIn, { key: site.url, delay: i * 90, duration: 800 }, /* @__PURE__ */ React15.createElement(
      VisitedSiteRow,
      {
        ...site,
        maxScreenTime: _6.max(props.sites.map((s) => s.screenTime)) ?? 1,
        borderTop: i > 0
      }
    )))
  ), /* @__PURE__ */ React15.createElement(
    AllMostVisitedSitesDialog_default,
    {
      sites: props.sites,
      open: allMostVisitedSitesDialogOpen,
      onClose: () => setAllMostVisitedSitesDialogOpen(false),
      isMobile: props.isMobile
    }
  ));
};
var MostVisitedSitesSection_default = MostVisitedSitesSection;

// src/profile/components/MobileInsightsTab.tsx
dayjs5.extend(advancedFormat);
var cleanUrl = (url) => url.replace("http://", "").replace("https://", "").replace("www.", "");
var DevicePageMobileInsightsTab = (props) => {
  const [times, setTimes] = useState23([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState23(0);
  const [rangeEndDayIndex, setRangeEndDayIndex] = useState23(0);
  const [rangeStartDayIndex, setRangeStartDayIndex] = useState23(6);
  const [visitedSites, setVisitedSites] = useState23([]);
  useEffect13(() => {
    api_default.getStats(
      props.deviceId,
      dayjs5().utc().subtract(rangeStartDayIndex, "days").format("YYYY-MM-DD"),
      dayjs5().utc().subtract(rangeEndDayIndex, "days").format("YYYY-MM-DD")
    ).then((stats) => {
      var _a, _b;
      setTimes(stats.screenTime);
      setVisitedSites(
        _7.sortBy(
          ((_b = (_a = stats.visitedWebsites) == null ? void 0 : _a.find(
            (w) => w.date === dayjs5().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
          )) == null ? void 0 : _b.websites) || [],
          (t) => t.screenTime
        )
      );
    });
  }, [props.deviceId, rangeStartDayIndex, rangeEndDayIndex, selectedDayIndex]);
  const [timeSpent, setTimeSpent] = useState23(0);
  useEffect13(
    () => {
      var _a;
      return setTimeSpent(
        ((_a = times.find(
          (t) => t.date === dayjs5().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
        )) == null ? void 0 : _a.screenTime) ?? 0
      );
    },
    [times, selectedDayIndex]
  );
  useEffect13(() => {
    if (selectedDayIndex < 4) {
      const shiftNDays = selectedDayIndex - 3;
      setRangeStartDayIndex(selectedDayIndex + 3 - shiftNDays);
      setRangeEndDayIndex(Math.max(0, shiftNDays));
    } else {
      setRangeStartDayIndex(selectedDayIndex + 3);
      setRangeEndDayIndex(selectedDayIndex - 3);
    }
  }, [selectedDayIndex, times]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Stack23, { spacing: "12px" }, /* @__PURE__ */ React.createElement(Stack23, { direction: "row", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(Stack23, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    Stack23,
    {
      sx: {
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.6 }
      },
      onClick: () => setSelectedDayIndex(selectedDayIndex + 1)
    },
    /* @__PURE__ */ React.createElement(ChevronLeft_default, { height: "18px", width: "18px" })
  ), /* @__PURE__ */ React.createElement(Typography, { variant: "medium", bold: true }, `${selectedDayIndex === 0 ? "Today" : selectedDayIndex === 1 ? "Yesterday" : `${dayjs5().subtract(selectedDayIndex, "days").format("dddd")}`}, ${dayjs5().subtract(selectedDayIndex, "days").format("Do MMMM")}`), /* @__PURE__ */ React.createElement(
    Stack23,
    {
      sx: {
        opacity: selectedDayIndex === 0 ? 0.3 : 1,
        pointerEvents: selectedDayIndex === 0 ? "none" : void 0,
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.6 }
      },
      onClick: () => setSelectedDayIndex(selectedDayIndex - 1)
    },
    /* @__PURE__ */ React.createElement(ChevronRight_default, { height: "18px", width: "18px" })
  )), /* @__PURE__ */ React.createElement(
    CalendarButton_default,
    {
      value: dayjs5().subtract(selectedDayIndex, "days").toDate(),
      setValue: (date) => setSelectedDayIndex(dayjs5().diff(date, "days"))
    }
  )), /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: `${Math.floor(timeSpent / 60)}h ${Math.floor(
        timeSpent % 60
      )}m spent on screen`,
      notCollapsible: true,
      isMobile: true
    },
    /* @__PURE__ */ React.createElement(
      Stack23,
      {
        height: "200px",
        mt: "10px",
        borderRadius: "12px",
        bgcolor: "rgb(255,255,255)",
        py: "8px",
        boxSizing: "border-box"
      },
      times.length > 0 ? /* @__PURE__ */ React.createElement(
        AstroTimeChart_default,
        {
          times,
          selected: dayjs5().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD"),
          setSelectedDatetime: (datetime) => setSelectedDayIndex(dayjs5().utc().diff(datetime, "days")),
          labelFontSize: "small",
          barsXPadding: 12,
          barWidth: 22
        }
      ) : null
    )
  ), /* @__PURE__ */ React.createElement(Stack23, { flex: 1 }, /* @__PURE__ */ React.createElement(MostVisitedSitesSection_default, { sites: visitedSites, isMobile: true })), /* @__PURE__ */ React.createElement(
    MobileHistorySection_default,
    {
      deviceId: props.deviceId,
      date: dayjs5().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
    }
  )));
};
var MobileInsightsTab_default = DevicePageMobileInsightsTab;

// src/api.ts
var BACKEND_URLS = {
  local: "http://localhost:8000",
  development: "https://api.astrosafe.co",
  preview: "https://api.astrosafe.co",
  production: "https://api.astrosafe.co"
};
var BACKEND_URL = BACKEND_URLS[process.env.REACT_ENV] || "https://api.astrosafe.co";
var getAbsoluteUrl = (url) => `https://${url}`;
var get = (route) => fetch(
  //@ts-ignore
  `${BACKEND_URLS[process.env.REACT_ENV]}/${route}`,
  {
    method: "GET",
    credentials: "include"
  }
);
var post = (route, body) => fetch(
  //@ts-ignore
  `${BACKEND_URLS[process.env.REACT_ENV]}/${route}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : void 0,
    cache: "no-store"
  }
);
var put = (route, body) => fetch(
  //@ts-ignore
  `${BACKEND_URLS[process.env.REACT_ENV]}/${route}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(body)
  }
);
var patch = (route, body) => fetch(
  //@ts-ignore
  `${BACKEND_URLS[process.env.REACT_ENV]}/${route}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(body)
  }
);
var dellete = (route) => fetch(
  //@ts-ignore
  `${BACKEND_URLS[process.env.REACT_ENV]}/${route}`,
  {
    method: "DELETE",
    headers: { "Access-Control-Allow-Origin": "*" },
    credentials: "include"
  }
);
var ApiController = class {
  static async getDevice(id) {
    return get(`devices/${id}`).then((response) => response.json());
  }
  static async getEnrichedDevice(id) {
    return get(
      `devices/${id}?includeScreenTime=true&includeConfig=true&includeTimeLimits=true&includeAllowedTimes=true&includeOnlineStatus=true&includeLatestBrowsing=true`
    ).then((response) => response.json());
  }
  static async getDeviceWithTimesAndConfig(id) {
    return get(
      `devices/${id}?includeTimeLimits=true&includeAllowedTimes=true&includeConfig=true`
    ).then((response) => response.json());
  }
  static async renameDevice(id, name) {
    return patch(`devices/${id}`, { name });
  }
  static async getGroupEnrichedDevices(id) {
    return get(
      `devices?groupId=${id}&includeScreenTime=true&includeConfig=true&includeTimeLimits=true&includeAllowedTimes=true&includeOnlineStatus=true&includeLatestBrowsing=true`
    ).then((response) => response.json());
  }
  static async getFolderDevices(id) {
    return get(`devices?contentBucketId=${id}&includeConfig=true`).then(
      (response) => response.json()
    );
  }
  static async getDeviceFolders(id) {
    return get(`content/buckets?deviceId=${id}&includePreview=true`).then(
      (response) => response.json()
    );
  }
  static async getGroupFolders(id) {
    return get(`content/buckets?groupId=${id}`).then(
      (response) => response.json()
    );
  }
  static async addFolderToDevice(folderId, deviceId) {
    return post(`content/buckets/${folderId}/devices`, { deviceId });
  }
  static async removeFolderFromDevice(folderId, deviceId) {
    return dellete(`content/buckets/${folderId}/devices/${deviceId}`);
  }
  static async createFolder(title, groupId) {
    return post("content/buckets", { title, groupId }).then(
      (response) => response.json()
    );
  }
  static async removeFolder(id) {
    return dellete(`content/buckets/${id}`);
  }
  static async getFolder(id) {
    return get(`content/buckets/${id}`).then(
      (response) => response.json()
    );
  }
  static async getEnrichedFolders(id) {
    return get(`content/buckets?groupId=${id}&includePreview=true`).then(
      (response) => response.json()
    );
  }
  static async renameFolder(id, title) {
    return put(`content/buckets/${id}`, { title });
  }
  static async createLink(title, url, thumbnailUrl, contentBucketId) {
    return post(`content/links`, { title, url, thumbnailUrl, contentBucketId });
  }
  static async updateLink(id, title, url, thumbnailUrl) {
    return put(`content/links/${id}`, { title, url, thumbnailUrl });
  }
  static async deleteLink(id) {
    return dellete(`content/links/${id}`);
  }
  static async createVideo(title, url, thumbnailUrl, contentBucketId) {
    return post(`content/videos`, {
      title,
      url,
      thumbnailUrl,
      contentBucketId
    });
  }
  static async updateVideo(id, title, url, contentBucketId, isChannel) {
    return put(`content/videos/${id}${isChannel ? "?isChannel=true" : ""}`, {
      title,
      url,
      contentBucketId
    });
  }
  static async deleteVideo(id, isChannel) {
    return dellete(`content/videos/${id}${isChannel ? "?isChannel=true" : ""}`);
  }
  static async createChannel(title, url, bannerUrl, profileUrl, contentBucketId) {
    return post(`content/channels`, {
      title,
      url,
      bannerUrl,
      profileUrl,
      contentBucketId
    });
  }
  static async updateChannel(id, title, url, bannerUrl, profileUrl) {
    return put(`content/channels/${id}`, {
      title,
      url,
      bannerUrl,
      profileUrl
    });
  }
  static async deleteChannel(id) {
    return dellete(`content/channels/${id}`);
  }
  static async getUser(id) {
    return get(`users/${id}`).then((response) => response.json());
  }
  static async getGroupUsers(id) {
    return get(`users?groupId=${id}`).then((response) => response.json());
  }
  static async createUser(email) {
    return post("users", { email, realName: "", displayName: "" });
  }
  static async createFilter(groupId, title) {
    return post(`groups/${groupId}/filters`, { title }).then(
      (response) => response.json()
    );
  }
  static async changeFilterName(id, title) {
    return patch(`filters/${id}`, { title });
  }
  static async removeFilter(id) {
    return dellete(`filters/${id}`);
  }
  static async getFilter(id) {
    return get(`filters/${id}`).then((response) => response.json());
  }
  static async getGroupFilters(id) {
    return get(`filters?groupId=${id}`).then(
      (response) => response.json()
    );
  }
  static async getAllFilterCategories() {
    return get("filters/categories").then((response) => response.json());
  }
  static async getFilterCategories(id) {
    return get(`filters/${id}/whitelist/categories`).then(
      (response) => response.json()
    );
  }
  static async getFilterDevices(id, groupId) {
    return get(
      `devices?groupId=${groupId}&filterId=${id}&includeConfig=true`
    ).then((response) => response.json());
  }
  static async addFilterToDevice(filterId, deviceId) {
    return post(`filters/${filterId}/devices`, { deviceId });
  }
  static async getBlockedSites(filterId) {
    return get(`filters/${filterId}/blacklist`).then(
      (response) => response.json()
    );
  }
  static async getAllowedSites(filterId) {
    return get(`filters/${filterId}/whitelist`).then(
      (response) => response.json()
    );
  }
  static async removeBlockedSite(filterId, url) {
    return dellete(
      `filters/${filterId}/blacklist/${encodeURIComponent(
        getAbsoluteUrl(cleanUrl(url))
      )}`
    );
  }
  static async addBlockedSite(filterId, url) {
    return post(`filters/${filterId}/blacklist`, {
      url: getAbsoluteUrl(cleanUrl(url))
    });
  }
  static async removeAllowedSite(filterId, url) {
    return dellete(
      `filters/${filterId}/whitelist/${encodeURIComponent(
        getAbsoluteUrl(cleanUrl(url))
      )}`
    );
  }
  static async addAllowedSite(filterId, url) {
    return post(`filters/${filterId}/whitelist`, {
      url: getAbsoluteUrl(cleanUrl(url))
    });
  }
  static async addWhitelistSubcategory(filterId, id) {
    return post(`filters/${filterId}/whitelist/categories`, {
      categoryId: id.toString()
    });
  }
  static async removeWhitelistSubcategory(filterId, id) {
    return dellete(`filters/${filterId}/whitelist/categories/${id}`);
  }
  static async addWhitelistCategory(filterId, id) {
    return post(`filters/${filterId}/whitelist/categories?isGroup=true`, {
      categoryId: id.toString()
    });
  }
  static async removeWhitelistCategory(filterId, id) {
    return dellete(
      `filters/${filterId}/whitelist/categories/${id}?isGroup=true`
    );
  }
  static async getBlockedSearchWords(filterId) {
    return get(`filters/${filterId}/blacklist/words`).then(
      (response) => response.json()
    );
  }
  static async addBlockedSearchWord(filterId, word) {
    return post(`filters/${filterId}/blacklist/words`, { word });
  }
  static async removeBlockedSearchWord(filterId, word) {
    return dellete(`filters/${filterId}/blacklist/words/${word}`);
  }
  static async getRequestedSites(deviceId) {
    return get(`devices/${deviceId}/requests?status=pending`).then(
      (response) => response.json()
    );
  }
  static async approveRequestedSite(id) {
    return post(`devices/requests/${id}/approve`, {});
  }
  static async denyRequestedSite(id) {
    return dellete(`devices/requests/${id}/deny`);
  }
  static async getLinkPreview(url) {
    return get(`content/links/preview/${url}`).then(
      (response) => response.json()
    );
  }
  static async getVideoPreview(url) {
    return get(`content/videos/preview/${url}`).then(
      (response) => response.json()
    );
  }
  static async getChannelPreview(url) {
    return get(`content/channels/preview/${url}`).then(
      (response) => response.json()
    );
  }
  static async setTimeLimit(limitId, timeLimit) {
    return patch(`devices/configs/screentime/limits/${limitId}`, { timeLimit });
  }
  static async addAllowedTimeRange(deviceId, day, startTime, endTime) {
    return post(`devices/${deviceId}/config/screentime/allowed`, {
      startTime,
      endTime
    });
  }
  static async changeAllowedTimeRange(id, startTime, endTime) {
    return patch(`devices/configs/screentime/allowed/${id}`, {
      startTime,
      endTime
    });
  }
  static async removeAllowedTimeRange(id) {
    return dellete(`devices/configs/screentime/allowed/${id}`);
  }
  static async resetAllowedTimes(deviceId, day) {
    return put(
      `devices/${deviceId}/config/screentime/allowed/reset?day=${day}`,
      {}
    );
  }
  static async flipBrowsingAllowed(deviceId, browsingAllowed) {
    return patch(`devices/${deviceId}/configs/browsing`, { browsingAllowed });
  }
  static async getQRCode(groupId) {
    return post(`groups/${groupId}/devices/qrcode`, {}).then(
      (response) => response.text()
    );
  }
  static async flipTimeLimitsEnabled(deviceId, enabled) {
    return patch(`devices/${deviceId}/config/screentime/toggle`, {
      timeLimitsEnabled: enabled
    });
  }
  static async flipAllowedTimesEnabled(deviceId, enabled) {
    return patch(`devices/${deviceId}/config/screentime/toggle`, {
      allowedTimesEnabled: enabled
    });
  }
  static async getStats(deviceId, startDate, endDate) {
    return get(
      `devices/${deviceId}/statistics?startDate=${startDate}&endDate=${endDate}`
    ).then((response) => response.json());
  }
  static async getHistory(deviceId, date, pageIndex, pageSize, searchTerm) {
    return get(
      `devices/${deviceId}/history?date=${date}&page=${pageIndex}&limit=${pageSize}${searchTerm ? `&search=${searchTerm}` : ""}`
    ).then((response) => response.json());
  }
  static async getApps(deviceId, pageIndex, pageSize, categoryId, searchTerm) {
    return get(
      `devices/${deviceId}/apps?page=${pageIndex}&limit=${pageSize}${searchTerm ? `&search=${searchTerm}` : ""}${categoryId ? `&categoryId=${categoryId}` : ""}`
    ).then((response) => response.json());
  }
  static async enableApp(deviceId, appId) {
    return post(`devices/${deviceId}/apps/${appId}/enable`, {});
  }
  static async disableApp(deviceId, appId) {
    return dellete(`devices/${deviceId}/apps/${appId}/disable`);
  }
  static async updateUser(id, realName, displayName) {
    return put(`users/${id}`, { realName, displayName });
  }
  static async getChannel(id) {
    return get(`content/channels/${id}`).then(
      (response) => response.json()
    );
  }
  static async changeChannelName(id, title) {
    return put(`content/channels/${id}`, { title });
  }
};
var api_default = ApiController;

// src/components/UserContext.tsx
var UserContext = createContext({ loaded: false });
var useUserContext = () => {
  const context = useContext2(UserContext);
  if (context === void 0) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

// src/components/UpgradeDialog.tsx
import { useNavigate } from "react-router-dom";
import { useLocalStorage as useLocalStorage2 } from "usehooks-ts";
import { useEffect as useEffect15, useState as useState26 } from "react";

// src/components/AstroSwitch.tsx
import { Stack as Stack24 } from "@mui/system";
import { useState as useState25 } from "react";
var AstroSwitch = (props) => {
  const [hovering, setHovering] = useState25(false);
  return /* @__PURE__ */ React.createElement(
    Stack24,
    {
      height: props.small ? "16px" : "28px",
      minHeight: props.small ? "16px" : "28px",
      width: props.small ? "34px" : "60px",
      minWidth: props.small ? "34px" : "60px",
      bgcolor: props.compromise ? PALETTE.system.orange : props.on ? PALETTE.system.green : PALETTE.secondary.grey[3],
      borderRadius: props.small ? "8px" : "20px",
      px: "2px",
      boxSizing: "border-box",
      justifyContent: "center",
      onMouseEnter: () => {
        setHovering(true);
      },
      onMouseLeave: () => {
        setHovering(false);
      },
      sx: {
        cursor: "pointer"
      },
      onClick: props.callback
    },
    /* @__PURE__ */ React.createElement(
      Stack24,
      {
        height: props.small ? "13px" : "24px",
        width: props.small ? "13px" : "24px",
        borderRadius: "100%",
        sx: {
          background: "rgb(255,255,255)",
          opacity: hovering ? 0.7 : 1,
          transition: "0.2s ease-out",
          transform: `translateX(${props.compromise ? props.small ? 9 : 16 : !props.on ? 0 : props.small ? 17 : 32}px)`,
          svg: {
            path: {
              fill: PALETTE.secondary.grey[3]
            }
          }
        },
        justifyContent: "center",
        alignItems: "center"
      },
      props.icon ? /* @__PURE__ */ React.createElement(props.icon, { height: "14px", width: "14px" }) : null
    )
  );
};
var AstroSwitch_default = AstroSwitch;

// src/components/UpgradeDialog.tsx
var CURRENCY_SYMBOLS = {
  USD: "$",
  GBP: "\xA3",
  CAD: "CA$",
  EUR: "\u20AC"
};
var PRODUCT_DETAILS = [
  {
    monthlyId: process.env.REACT_ENV === "production" ? "prod_PlC9OCbk8oBkWW" : "prod_QBufh97tFHY0PT",
    annualId: process.env.REACT_ENV === "production" ? "prod_PlWrHG8V57yjrn" : "prod_QBufh97tFHY0PT",
    plan: "home",
    items: [
      "10 devices monitored",
      "Unlimited parents/teachers",
      "All features included"
    ],
    title: "Home",
    subtitle: "Ideal for families",
    monthlyPrices: {
      USD: 12.99,
      GBP: 8.99,
      CAD: 15.99,
      EUR: 10.99
    },
    annualPrices: {
      USD: 119.99,
      GBP: 79.99,
      CAD: 149.99,
      EUR: 99.99
    }
  },
  {
    monthlyId: process.env.REACT_ENV === "production" ? "prod_QAEaFpLDEJnlli" : "prod_QBufZ1xT1eUOx8",
    annualId: process.env.REACT_ENV === "production" ? "prod_QAEYttD39HvFKz" : "prod_QBufZ1xT1eUOx8",
    plan: "s chool",
    items: [
      "10 devices monitored",
      "Unlimited parents/teachers",
      "All features included"
    ],
    title: "s chool",
    subtitle: "Ideal for Schools",
    monthlyPrices: {
      USD: 59.99,
      GBP: 39.99,
      CAD: 74.99,
      EUR: 49.99
    },
    annualPrices: {
      USD: 599.99,
      GBP: 399.99,
      CAD: 749.99,
      EUR: 499.99
    }
  }
];
var FrequencySwitch = (props) => /* @__PURE__ */ React.createElement(Stack25, { direction: "row", spacing: "12px", alignItems: "center", height: "26px" }, /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[4] }, "Annual discount"), /* @__PURE__ */ React.createElement(AstroSwitch_default, { on: props.value === "annual", callback: props.callback }));
var LOCALE_CURRENCIES = {
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  AT: "EUR",
  BE: "EUR",
  BG: "EUR",
  HR: "EUR",
  CY: "EUR",
  CZ: "EUR",
  DK: "EUR",
  EE: "EUR",
  FI: "EUR",
  FR: "EUR",
  DE: "EUR",
  GR: "EUR",
  HU: "EUR",
  IE: "EUR",
  IT: "EUR",
  LV: "EUR",
  LT: "EUR",
  LU: "EUR",
  MT: "EUR",
  NL: "EUR",
  PL: "EUR",
  PT: "EUR",
  RO: "EUR",
  SK: "EUR",
  SI: "EUR",
  ES: "EUR",
  SE: "EUR",
  AL: "EUR",
  AD: "EUR",
  AM: "EUR",
  BY: "EUR",
  BA: "EUR",
  FO: "EUR",
  GE: "EUR",
  GI: "EUR",
  IS: "EUR",
  IM: "EUR",
  XK: "EUR",
  LI: "EUR",
  MK: "EUR",
  MD: "EUR",
  MC: "EUR",
  ME: "EUR",
  NO: "EUR",
  RU: "EUR",
  SM: "EUR",
  RS: "EUR",
  CH: "EUR",
  TR: "EUR",
  UA: "EUR",
  VA: "EUR"
};
var getPaymentUrl = (email, plan, frequency) => `${frequency === "monthly" ? plan === "home" ? process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL_MONTHLY_INDIVIDUAL : process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL_MONTHLY_DEPARTMENT : plan === "home" ? process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL_ANNUAL_INDIVIDUAL : process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL_ANNUAL_DEPARTMENT}?prefilled_email=${encodeURIComponent(email)}`;
var PricingCard = (props) => /* @__PURE__ */ React.createElement(
  Stack25,
  {
    flex: 1,
    bgcolor: props.dark ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[1],
    p: "28px",
    boxSizing: "border-box",
    alignItems: "center",
    borderRadius: "20px",
    border: props.border ? `4px solid ${PALETTE.secondary.purple[3]}` : void 0,
    position: "relative"
  },
  props.notif ? /* @__PURE__ */ React.createElement(
    Stack25,
    {
      borderRadius: "10px",
      bgcolor: PALETTE.system.orange,
      height: "24px",
      position: "absolute",
      top: "-16px",
      right: "-26px",
      justifyContent: "center",
      px: "16px"
    },
    /* @__PURE__ */ React.createElement(Typography, { variant: "small", bold: true, color: PALETTE.font.light }, props.notif)
  ) : null,
  /* @__PURE__ */ React.createElement(Stack25, { spacing: "2px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Stack25, { spacing: "20px", justifyContent: "center", alignItems: "center" }, /* @__PURE__ */ React.createElement(Stack25, { spacing: "4px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Stack25, { spacing: "4px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "h4",
      color: props.dark ? PALETTE.font.light : PALETTE.secondary.grey[4]
    },
    props.title
  ), /* @__PURE__ */ React.createElement(
    Typography,
    {
      color: props.dark ? PALETTE.font.light : PALETTE.secondary.grey[4],
      variant: "small",
      bold: true
    },
    props.subtitle
  ))), /* @__PURE__ */ React.createElement(Stack25, { direction: "row", alignItems: "center", spacing: "3px" }, /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "small",
      bold: true,
      color: PALETTE.secondary.grey[props.dark ? 2 : 4]
    },
    props.currency
  ), /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "h3",
      color: props.dark ? PALETTE.font.light : PALETTE.font.dark
    },
    props.price
  ), /* @__PURE__ */ React.createElement(
    Stack25,
    {
      height: "28px",
      bgcolor: PALETTE.secondary.orange[4],
      borderRadius: "10px",
      px: "8px",
      justifyContent: "center"
    },
    /* @__PURE__ */ React.createElement(Typography, { bold: true, variant: "small", color: "rgb(255,255,255)" }, "Save 30%")
  ))), /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "tiny",
      bold: true,
      color: PALETTE.secondary.grey[props.dark ? 2 : 4]
    },
    `per ${props.unit}`
  ), /* @__PURE__ */ React.createElement(Stack25, { alignItems: "center", width: "100%", pb: "20px" }, /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "tiny",
      bold: true,
      color: PALETTE.secondary.grey[props.dark ? 2 : 4]
    },
    props.tinyText
  ))),
  /* @__PURE__ */ React.createElement(
    Stack25,
    {
      justifyContent: "flex-end",
      sx: props.dark ? {
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s"
      } : void 0,
      onClick: props.callback
    },
    /* @__PURE__ */ React.createElement(Stack25, { sx: { pointerEvents: props.dark ? "none" : void 0 } }, /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        variant: props.dark ? "primary" : "tertiary",
        endIcon: props.icon || (props.noButtonIcon ? void 0 : VerifiedIcon_default)
      },
      props.buttonText
    ))
  ),
  props.items ? /* @__PURE__ */ React.createElement(Stack25, { spacing: "8px", pt: "18px" }, props.items.map((item, i) => /* @__PURE__ */ React.createElement(Stack25, { key: i, direction: "row", spacing: "6px" }, /* @__PURE__ */ React.createElement(
    Stack25,
    {
      borderRadius: "100%",
      height: "18px",
      width: "18px",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "rgb(255,255,255)"
    },
    /* @__PURE__ */ React.createElement(CheckIcon_default, { width: "12px", height: "12px" })
  ), /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "small",
      color: props.dark ? PALETTE.secondary.grey[1] : void 0
    },
    item
  )))) : null,
  props.text ? /* @__PURE__ */ React.createElement(Stack25, { pt: "22px" }, /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "small",
      color: props.dark ? PALETTE.secondary.grey[1] : void 0
    },
    "Contact sales for custom pricing based on the number of teacher accounts and devices you would like in your plan, and we'll make it happen!!!"
  )) : null
);
var UpgradeDialog = (props) => {
  var _a, _b, _c, _d;
  const user = useUserContext().user;
  const [upgradedNotificationPending, setUpgradedNotificationPending] = useLocalStorage2("upgradedNotificationPending", false);
  const navigate = useNavigate();
  const [locale, setLocale] = useState26("US");
  const getIp = async () => {
    const response = await fetch("https://ipapi.co/json/").then(
      async (response2) => {
        const data = await response2.json();
        data.country_code && setLocale(data.country_code);
      }
    );
  };
  useEffect15(() => {
    getIp();
  }, []);
  const [frequency, setFrequency] = useState26("annual");
  const [licenseKeyInputValue, setLicenseKeyInputValue] = useState26("");
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      title: "Upgrade to a paid plan and enjoy unlimited access.",
      open: props.open,
      titleSize: props.mobile ? "h5" : "h3",
      noOverflowHidden: true,
      onCloseCallback: props.closeCallback,
      dynamicHeight: true,
      width: "1030px",
      maxWidth: "1030px",
      titleMaxWidth: "600px",
      scrollable: true
    },
    /* @__PURE__ */ React.createElement(Stack25, { width: "100%", alignItems: "center" }, /* @__PURE__ */ React.createElement(
      FrequencySwitch,
      {
        value: frequency,
        callback: () => setFrequency(frequency === "annual" ? "monthly" : "annual")
      }
    )),
    /* @__PURE__ */ React.createElement(
      Stack25,
      {
        direction: props.mobile ? "column" : "row",
        spacing: "32px",
        width: "100%",
        pt: "20px"
      },
      /* @__PURE__ */ React.createElement(
        PricingCard,
        {
          title: "Home",
          subtitle: "Ideal for families",
          buttonText: "Upgrade",
          price: ((frequency === "annual" ? (_a = PRODUCT_DETAILS[0]) == null ? void 0 : _a.annualPrices : (_b = PRODUCT_DETAILS[0]) == null ? void 0 : _b.monthlyPrices)[LOCALE_CURRENCIES[locale]] ?? 0).toString(),
          currency: CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale]],
          unit: frequency === "monthly" ? "month" : "year",
          items: PRODUCT_DETAILS[0].items,
          callback: () => {
            navigate(
              (user == null ? void 0 : user.email) ? getPaymentUrl(user.email, "home", frequency) : ""
            );
            setUpgradedNotificationPending(true);
          }
        }
      ),
      /* @__PURE__ */ React.createElement(
        PricingCard,
        {
          dark: true,
          border: true,
          title: "School",
          subtitle: "Ideal for schools",
          buttonText: "Upgrade",
          price: ((frequency === "annual" ? (_c = PRODUCT_DETAILS[1]) == null ? void 0 : _c.annualPrices : (_d = PRODUCT_DETAILS[1]) == null ? void 0 : _d.monthlyPrices)[LOCALE_CURRENCIES[locale]] ?? 0).toString(),
          currency: CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale]],
          unit: frequency === "monthly" ? "month" : "year",
          items: PRODUCT_DETAILS[1].items,
          callback: () => {
            navigate(
              (user == null ? void 0 : user.email) ? getPaymentUrl(user.email, "s chool", frequency) : ""
            );
            setUpgradedNotificationPending(true);
          }
        }
      ),
      /* @__PURE__ */ React.createElement(
        Stack25,
        {
          flex: 1,
          bgcolor: PALETTE.secondary.grey[1],
          p: "28px",
          boxSizing: "border-box",
          alignItems: "center",
          borderRadius: "20px",
          position: "relative",
          spacing: "20px"
        },
        /* @__PURE__ */ React.createElement(Stack25, { spacing: "4px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Typography, { color: PALETTE.secondary.grey[4], variant: "h4" }, "License key"), /* @__PURE__ */ React.createElement(Typography, { variant: "small", bold: true, color: PALETTE.secondary.grey[4] }, "Add your AstroSafe license key")),
        /* @__PURE__ */ React.createElement(Stack25, { alignItems: "center", spacing: "10px" }, /* @__PURE__ */ React.createElement(
          UrsorInputField,
          {
            value: licenseKeyInputValue,
            onChange: (event) => {
              setLicenseKeyInputValue(event.target.value);
            },
            leftAlign: true,
            backgroundColor: "rgb(255,255,255)",
            width: "100%"
          }
        ), /* @__PURE__ */ React.createElement(Typography, { color: PALETTE.secondary.grey[4], bold: true, variant: "tiny" }, "12 digit code sent to you by the Astro team")),
        /* @__PURE__ */ React.createElement(UrsorButton, { variant: "secondary" }, "Unlock")
      )
    ),
    /* @__PURE__ */ React.createElement(
      Stack25,
      {
        height: "52px",
        width: "100%",
        justifyContent: "center",
        bgcolor: PALETTE.secondary.grey[1],
        alignItems: "center",
        mt: "24px",
        spacing: "20px",
        direction: "row",
        borderRadius: "20px"
      },
      /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[4] }, "Need a plan with more devices?"),
      /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          variant: "secondary",
          size: "small",
          onClick: () => window.location.href = "mailto:hello@astrosafe.co"
        },
        "Contact sales"
      )
    )
  );
};
var UpgradeDialog_default = UpgradeDialog;

// src/components/PageLayout.tsx
import React20, { forwardRef } from "react";
import { Box as Box8, Stack as Stack30 } from "@mui/material";
import { useWindowSize as useWindowSize3 } from "usehooks-ts";

// src/components/UrsorActionButton.tsx
import { Stack as Stack27 } from "@mui/system";
import React18, { useState as useState27 } from "react";

// src/components/ActionPopup.tsx
import React17 from "react";
import { Stack as Stack26 } from "@mui/system";
var SPACING2 = "8px";
var ICON_SIZE = "16px";
var PopupList = (props) => /* @__PURE__ */ React17.createElement(Stack26, { spacing: SPACING2 }, props.items.map((item, index) => /* @__PURE__ */ React17.createElement(
  Stack26,
  {
    key: index,
    sx: {
      cursor: "pointer",
      transition: "0.2s",
      "&:hover": { opacity: 0.3 },
      svg: { path: { fill: item.color ?? PALETTE.font.dark } }
    },
    onClick: () => {
      props.closeCallback();
      item.kallback();
    },
    direction: "row",
    spacing: "8px",
    alignItems: "center"
  },
  item.icon ? /* @__PURE__ */ React17.createElement(item.icon, { height: ICON_SIZE, width: ICON_SIZE }) : null,
  /* @__PURE__ */ React17.createElement(Typography, { color: item.color, variant: "normal", bold: true }, item.text)
)));
function ActionPopup(props) {
  return /* @__PURE__ */ React17.createElement(
    UrsorPopover,
    {
      open: props.open,
      content: /* @__PURE__ */ React17.createElement(PopupList, { items: props.items, closeCallback: props.closeCallback }),
      closeCallback: props.closeCallback,
      placement: props.placement,
      zIndex: props.zIndex,
      flip: true
    },
    props.children
  );
}

// src/images/icons/MoreIcon.svg
var MoreIcon_default = "./MoreIcon-J2ZZOVBR.svg";

// src/components/UrsorActionButton.tsx
var DEFAULT_SIZE = "12px";
var LARGE_SIZE = "20px";
function UrsorActionButton(props) {
  const [open, setOpen] = useState27(false);
  return /* @__PURE__ */ React18.createElement(
    ActionPopup,
    {
      open,
      items: props.actions,
      closeCallback: () => setOpen(false),
      placement: "right",
      zIndex: 9999
    },
    /* @__PURE__ */ React18.createElement(
      Stack27,
      {
        height: props.size ?? "40px",
        width: props.size ?? "40px",
        justifyContent: "center",
        alignItems: "center",
        sx: {
          background: props.background || "rgb(255,255,255)",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.7
          },
          transition: "0.2s",
          svg: {
            transform: "rotate(90deg)",
            path: {
              fill: props.fontColor || (props.light ? PALETTE.font.light : PALETTE.font.dark)
            }
          }
        },
        borderRadius: "100%",
        border: props.border ? `2px solid ${props.fontColor || (props.light ? PALETTE.font.light : PALETTE.font.dark)}` : void 0,
        boxSizing: "border-box",
        onClick: () => {
          var _a;
          if (props.notClickable) return;
          setOpen(!open);
          (_a = props.buttonClickCallback) == null ? void 0 : _a.call(props);
        },
        boxShadow: props.shadow ? "0 0 16px rgba(0,0,0,0.08)" : void 0
      },
      /* @__PURE__ */ React18.createElement(
        MoreIcon_default,
        {
          height: props.iconSize || (props.large ? LARGE_SIZE : DEFAULT_SIZE),
          width: props.iconSize || (props.large ? LARGE_SIZE : DEFAULT_SIZE)
        }
      )
    )
  );
}

// src/components/TitleRow.tsx
import { Stack as Stack28 } from "@mui/system";
import { useState as useState28 } from "react";
var TitleRowItemCore = (props) => {
  var _a;
  const [open, setOpen] = useState28(false);
  const ActualItem = /* @__PURE__ */ React.createElement(
    Stack28,
    {
      direction: "row",
      spacing: props.isMobile ? "6px" : "12px",
      onClick: () => {
        var _a2, _b;
        if (((_a2 = props.options) == null ? void 0 : _a2.length) === 0) return;
        setOpen(true);
        (_b = props.callback) == null ? void 0 : _b.call(props);
      },
      alignItems: "flex-end"
    },
    props.image,
    /* @__PURE__ */ React.createElement(Stack28, { justifyContent: "center" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        bold: true,
        variant: props.isMobile ? "medium" : "h4",
        color: !props.last ? PALETTE.secondary.grey[3] : void 0,
        maxLines: 1,
        sx: { wordBreak: "break-all" }
      },
      props.text
    )),
    props.label ? /* @__PURE__ */ React.createElement(
      Stack28,
      {
        justifyContent: "flex-end",
        height: "100%",
        sx: { transform: "translateY(-1px)" }
      },
      /* @__PURE__ */ React.createElement(
        Typography,
        {
          variant: props.isMobile ? "tiny" : "normal",
          color: PALETTE.secondary.grey[4]
        },
        props.label
      )
    ) : null,
    props.options && props.options.length > 0 ? /* @__PURE__ */ React.createElement(
      ChevronDown_default,
      {
        height: props.isMobile ? "24px" : "32px",
        width: props.isMobile ? "24px" : "32px"
      }
    ) : null
  );
  return props.options && props.options.length > 0 ? /* @__PURE__ */ React.createElement(
    UrsorPopover,
    {
      open,
      content: /* @__PURE__ */ React.createElement(Stack28, { spacing: "10px" }, (_a = props.options) == null ? void 0 : _a.map((o, i) => /* @__PURE__ */ React.createElement(
        Stack28,
        {
          key: i,
          direction: "row",
          alignItems: "center",
          spacing: "8px",
          sx: {
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s"
          },
          onClick: o.callback
        },
        o.image || o.imageUrl ? /* @__PURE__ */ React.createElement(Stack28, { borderRadius: "100%", overflow: "hidden" }, /* @__PURE__ */ React.createElement(
          "img",
          {
            src: o.imageUrl ?? "",
            height: 20,
            width: 20,
            alt: "option image"
          }
        )) : null,
        /* @__PURE__ */ React.createElement(Typography, { bold: true }, o.text)
      ))),
      placement: "left",
      closeCallback: () => setOpen(false)
    },
    ActualItem
  ) : ActualItem;
};
var TitleRow = (props) => {
  return /* @__PURE__ */ React.createElement(
    Stack28,
    {
      direction: "row",
      spacing: props.isMobile ? "6px" : "12px",
      alignItems: "center"
    },
    props.items.map((x, i) => {
      var _a, _b, _c;
      const isLast = i === (((_a = props.items) == null ? void 0 : _a.length) ?? 0) - 1;
      return /* @__PURE__ */ React.createElement(
        Stack28,
        {
          key: i,
          alignItems: "center",
          direction: "row",
          spacing: props.isMobile ? "6px" : "12px",
          sx: !(isLast && ((_b = x.options) == null ? void 0 : _b.length) === 0) ? {
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.7 }
          } : void 0
        },
        /* @__PURE__ */ React.createElement(
          TitleRowItemCore,
          {
            ...x,
            last: i === (((_c = props.items) == null ? void 0 : _c.length) ?? 0) - 1,
            isMobile: props.isMobile
          }
        ),
        !isLast ? /* @__PURE__ */ React.createElement(
          Typography,
          {
            bold: true,
            variant: props.isMobile ? "medium" : "h4",
            color: PALETTE.secondary.grey[3]
          },
          "/"
        ) : null
      );
    })
  );
};
var TitleRow_default = TitleRow;

// src/components/Sidebar.tsx
import * as React19 from "react";
import { Stack as Stack29, keyframes as keyframes6 } from "@mui/system";
import { useElementSize } from "usehooks-ts";

// src/images/icons/BookIcon.svg
var BookIcon_default = "./BookIcon-EOL744IS.svg";

// src/images/icons/GearIcon.svg
var GearIcon_default = "./GearIcon-PWV5I3LC.svg";

// src/images/icons/FilterIcon.svg
var FilterIcon_default = "./FilterIcon-4ZV7IESR.svg";

// src/components/Sidebar.tsx
import { useNavigate as useNavigate2 } from "react-router-dom";
var WIDTH2 = "106px";
var Y_PADDING = "26px";
var ICON_SIZE2 = "28px";
var SMALL_ICON_SIZE = "22px";
var BUTTON_SELECTED_BACKGROUND = PALETTE.secondary.purple[2];
var SMALL_ICON_HEIGHT_THRESHOLD = 630;
var NO_TEXT_HEIGHT_THRESHOLD = 469;
var slideIn = keyframes6`
from {
  transform: translateX(-1000px);
}
to {
  transform: translateX(40px);
}
`;
var slideOut = keyframes6`
from {
  transform: translateX(40px);
}
to {
  transform: translateX(-1000px);
}
`;
var SidebarItem = (props) => /* @__PURE__ */ React19.createElement(
  Stack29,
  {
    id: props.tourId,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    sx: {
      cursor: "pointer",
      "&:hover": { opacity: 0.6 },
      transition: "0.2s",
      svg: {
        path: {
          fill: props.selected ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[5]
        },
        rect: {
          stroke: props.selected ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[5]
        }
      }
    },
    onClick: props.callback,
    position: "relative"
  },
  props.notificationCount ? /* @__PURE__ */ React19.createElement(
    Stack29,
    {
      top: "-3px",
      right: "26px",
      position: "absolute",
      height: "20px",
      width: "20px",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "100%",
      bgcolor: PALETTE.system.orange
    },
    /* @__PURE__ */ React19.createElement(Typography, { variant: "tiny", bold: true, color: "rgb(255,255,255)" }, props.notificationCount)
  ) : null,
  /* @__PURE__ */ React19.createElement(Stack29, { flex: 1, spacing: "4px", justifyContent: "center", alignItems: "center" }, props.children, !props.noText ? /* @__PURE__ */ React19.createElement(
    Typography,
    {
      variant: props.small ? "tiny" : "small",
      bold: true,
      color: props.selected ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[5]
    },
    props.title
  ) : null)
);
function Sidebar(props) {
  const user = useUserContext().user;
  const navigate = useNavigate2();
  const topItems = [
    {
      id: "devices",
      //tourId: "devices-button",
      icon: PeopleIcon_default,
      title: "Kids",
      callback: () => navigate("/profiles")
    },
    {
      id: "filters",
      //tourId: "devices-button",
      icon: FilterIcon_default,
      title: "Filters",
      callback: () => navigate("/filters")
    },
    {
      id: "content",
      //tourId: "devices-button",
      icon: BookIcon_default,
      title: "Content",
      callback: () => navigate("/folders")
    }
  ];
  const bottomItems = [
    {
      id: "account",
      icon: GearIcon_default,
      title: "Account",
      callback: () => navigate("/account")
    }
  ];
  const getList = (items, small2, noText2) => /* @__PURE__ */ React19.createElement(Stack29, { spacing: small2 ? "16px" : "24px", width: "100%" }, items.map((item, index) => {
    const selected = item.id === props.selectedItemId;
    return /* @__PURE__ */ React19.createElement(
      SidebarItem,
      {
        key: index,
        title: item.title,
        callback: item.callback,
        selected,
        small: small2,
        noText: noText2,
        tourId: item.tourId,
        notificationCount: item.notificationCount
      },
      /* @__PURE__ */ React19.createElement(item.icon, { height: small2 ? SMALL_ICON_SIZE : ICON_SIZE2 })
    );
  }));
  const [ref, { width, height }] = useElementSize();
  const small = !!height && height > 0 && height < SMALL_ICON_HEIGHT_THRESHOLD;
  const noText = !!height && height < NO_TEXT_HEIGHT_THRESHOLD;
  return /* @__PURE__ */ React19.createElement(React19.Fragment, null, /* @__PURE__ */ React19.createElement(
    Stack29,
    {
      ref,
      height: "100%",
      width: WIDTH2,
      sx: { background: "white", fontSize: "10px" },
      borderRadius: "20px",
      py: Y_PADDING,
      justifyContent: "space-between",
      id: "my-first-step"
    },
    /* @__PURE__ */ React19.createElement(Stack29, { spacing: small ? "16px" : "24px", alignItems: "center" }, getList(topItems, small, noText)),
    /* @__PURE__ */ React19.createElement(
      SidebarItem,
      {
        title: "Account",
        callback: () => navigate("/account"),
        selected: "account" === props.selectedItemId,
        small,
        noText,
        tourId: "account"
      },
      /* @__PURE__ */ React19.createElement(
        UserInitialsCircle,
        {
          size: 32,
          fontSize: 12,
          name: user ? user == null ? void 0 : user.realName : ""
        }
      )
    )
  ));
}

// src/components/DynamicallyLoadedPortal.tsx
import { createPortal as createPortal2 } from "react-dom";
var DynamicallyLoadedPortal = (props) => createPortal2(props.children, document.body);
var DynamicallyLoadedPortal_default = DynamicallyLoadedPortal;

// src/components/PageLayout.tsx
var PADDING_TOP = "51px";
var SIDEBAR_X_MARGIN = 48;
var SIDEBAR_Y_MARGIN = "31px";
var PageLayout = forwardRef(
  (props, ref) => {
    var _a, _b, _c, _d;
    const { width } = useWindowSize3();
    return /* @__PURE__ */ React20.createElement(React20.Fragment, null, /* @__PURE__ */ React20.createElement(
      Stack30,
      {
        direction: "row",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        sx: {
          background: PALETTE.secondary.grey[1]
        }
      },
      !props.noSidebar ? /* @__PURE__ */ React20.createElement(
        Stack30,
        {
          minWidth: `calc(${WIDTH2} + ${SIDEBAR_X_MARGIN}px)`,
          alignItems: "flex-end",
          py: SIDEBAR_Y_MARGIN,
          mr: "5px",
          justifyContent: "center"
        },
        /* @__PURE__ */ React20.createElement(
          Sidebar,
          {
            selectedItemId: props.selectedSidebarItemId,
            classroomId: props.classroomId
          }
        )
      ) : null,
      /* @__PURE__ */ React20.createElement(
        Stack30,
        {
          sx: {
            height: props.scrollable ? void 0 : "100%",
            width: "100%"
          },
          overflow: props.scrollable ? "s croll" : "hidden",
          spacing: "20px",
          pr: `${SIDEBAR_X_MARGIN}px`,
          pt: PADDING_TOP,
          ref,
          onScroll: props.onScroll
        },
        props.header ? /* @__PURE__ */ React20.createElement(Stack30, { pl: "50px", pb: "24px" }, props.header) : null,
        /* @__PURE__ */ React20.createElement(
          Stack30,
          {
            spacing: "30px",
            justifyContent: "space-between",
            pl: `${SIDEBAR_X_MARGIN}px`
          },
          /* @__PURE__ */ React20.createElement(
            Stack30,
            {
              direction: "row",
              width: "100%",
              justifyContent: "space-between",
              spacing: "18px"
            },
            /* @__PURE__ */ React20.createElement(
              Stack30,
              {
                direction: "row",
                spacing: "30px",
                alignItems: "flex-end",
                width: "100%"
              },
              /* @__PURE__ */ React20.createElement(
                Stack30,
                {
                  flex: 1,
                  direction: "row",
                  justifyContent: "space-between"
                },
                /* @__PURE__ */ React20.createElement(Stack30, { direction: "row", spacing: "15px", alignItems: "center" }, props.titleBackButtonCallback ? /* @__PURE__ */ React20.createElement(Stack30, { width: "25px" }, /* @__PURE__ */ React20.createElement(
                  Stack30,
                  {
                    sx: {
                      cursor: "pointer",
                      "&:hover": { opacity: 0.6 },
                      transition: "0.2s"
                    },
                    onClick: props.titleBackButtonCallback,
                    justifyContent: "center"
                  },
                  /* @__PURE__ */ React20.createElement(ChevronLeft_default, { height: "32px", width: "32px" })
                )) : null, /* @__PURE__ */ React20.createElement(
                  Stack30,
                  {
                    direction: "row",
                    spacing: "12px",
                    alignItems: "center",
                    overflow: "hidden"
                  },
                  props.dotColor ? /* @__PURE__ */ React20.createElement(
                    Box8,
                    {
                      height: "23px",
                      width: "23px",
                      minWidth: "23px",
                      bgcolor: props.dotColor,
                      borderRadius: "100%"
                    }
                  ) : null,
                  /* @__PURE__ */ React20.createElement(UrsorFadeIn, { delay: 200, duration: 600 }, /* @__PURE__ */ React20.createElement(
                    Stack30,
                    {
                      direction: "row",
                      spacing: "20px",
                      alignItems: "flex-end",
                      width: "100%",
                      overflow: "hidden"
                    },
                    /* @__PURE__ */ React20.createElement(Stack30, { overflow: "hidden", spacing: "5px" }, props.titleRow ? /* @__PURE__ */ React20.createElement(TitleRow_default, { items: props.titleRow }) : /* @__PURE__ */ React20.createElement(
                      Typography,
                      {
                        variant: "h3",
                        color: props.dark ? PALETTE.font.light : PALETTE.font.dark,
                        noWrap: true
                      },
                      props.title
                    ), props.description ? /* @__PURE__ */ React20.createElement(
                      Typography,
                      {
                        variant: "small",
                        color: PALETTE.secondary.grey[4]
                      },
                      props.description
                    ) : null),
                    props.titleRowLefthandElement ? /* @__PURE__ */ React20.createElement(
                      Stack30,
                      {
                        style: {
                          paddingBottom: "3px"
                          // overflow: "hidden",
                        },
                        position: "relative",
                        overflow: "visible"
                      },
                      props.titleRowLefthandElement
                    ) : null,
                    props.info ? /* @__PURE__ */ React20.createElement(Stack30, { sx: { transform: "translateY(-3px)" } }, /* @__PURE__ */ React20.createElement(InfoButton_default, { ...props.info })) : null
                  ))
                )),
                props.button || props.secondaryButton || props.buttonRowExtraElement || props.actions ? /* @__PURE__ */ React20.createElement(
                  UrsorFadeIn,
                  {
                    delay: props.buttonsDelay || 600,
                    duration: 1100
                  },
                  /* @__PURE__ */ React20.createElement(
                    Stack30,
                    {
                      direction: "row",
                      spacing: "16px",
                      position: "relative",
                      alignItems: "center"
                    },
                    props.buttonRowExtraElement,
                    props.secondaryButton ? /* @__PURE__ */ React20.createElement(Box8, { id: (_a = props.button) == null ? void 0 : _a.tourId }, /* @__PURE__ */ React20.createElement(
                      UrsorButton,
                      {
                        onClick: props.secondaryButton.callback,
                        endIcon: props.secondaryButton.icon,
                        variant: "secondary",
                        disabled: (_b = props.button) == null ? void 0 : _b.disabled
                      },
                      props.secondaryButton.text
                    )) : null,
                    props.button ? /* @__PURE__ */ React20.createElement(Box8, { id: (_c = props.button) == null ? void 0 : _c.tourId }, /* @__PURE__ */ React20.createElement(
                      UrsorButton,
                      {
                        onClick: props.button.callback,
                        endIcon: props.button.icon,
                        dark: true,
                        variant: "tertiary",
                        disabled: (_d = props.button) == null ? void 0 : _d.disabled
                      },
                      props.button.text
                    )) : null,
                    props.buttonRowExtraElementRight,
                    props.actions ? /* @__PURE__ */ React20.createElement(
                      UrsorActionButton,
                      {
                        actions: props.actions,
                        large: true,
                        iconSize: "18px",
                        background: "transparent",
                        border: true
                      }
                    ) : null
                  )
                ) : null
              )
            )
          )
        ),
        /* @__PURE__ */ React20.createElement(
          Stack30,
          {
            width: props.bodyWidth ?? "100%",
            height: "100%"
          },
          props.children
        )
      )
    ), props.maxWidth && width < props.maxWidth ? /* @__PURE__ */ React20.createElement(DynamicallyLoadedPortal_default, null, /* @__PURE__ */ React20.createElement(
      Stack30,
      {
        top: 0,
        left: 0,
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        sx: {
          backdropFilter: "blur(5px)"
        },
        bgcolor: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        spacing: "3px"
      },
      /* @__PURE__ */ React20.createElement(Typography, { bold: true, color: "rgba(255,255,255,0.93)" }, "This screen is too narrow to have a proper Astro experience."),
      /* @__PURE__ */ React20.createElement(Typography, { bold: true, color: "rgba(255,255,255,0.93)" }, "Please switch to a wider screen.")
    )) : null);
  }
);
PageLayout.displayName = "Page layout";
var PageLayout_default = PageLayout;

// src/account/contents/body-desktop.tsx
import { Stack as Stack39 } from "@mui/system";

// src/images/icons/LogOutIcon.svg
var LogOutIcon_default = "./LogOutIcon-VCERV6YZ.svg";

// src/images/icons/Pencil.svg
var Pencil_default = "./Pencil-VGUBMJUT.svg";

// src/images/icons/PersonIcon.svg
var PersonIcon_default = "./PersonIcon-JVUN3UUH.svg";

// src/account/components/UsersTable.tsx
import { useEffect as useEffect18, useState as useState32 } from "react";

// src/components/UrsorTable.tsx
import React23, { useState as useState31 } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box as Box11, Stack as Stack33 } from "@mui/material";
import { alpha as alpha5 } from "@mui/system";

// src/images/icons/ArrowDownIcon.svg
var ArrowDownIcon_default = "./ArrowDownIcon-IZ7QT243.svg";

// src/components/UrsorTable.tsx
import dayjs6 from "dayjs";

// src/components/NewActivityTag.tsx
import React21 from "react";
import { Box as Box9, Stack as Stack31 } from "@mui/system";
import _8 from "lodash";
function NewActivityTag(props) {
  return /* @__PURE__ */ React21.createElement(
    Stack31,
    {
      height: "20px",
      width: "100%",
      maxWidth: "fit-content",
      direction: "row",
      spacing: "5px",
      borderRadius: "10px",
      alignItems: "center",
      bgcolor: PALETTE.system.orange,
      py: "7px",
      px: "11px",
      boxSizing: "border-box"
    },
    /* @__PURE__ */ React21.createElement(
      Box9,
      {
        borderRadius: "100%",
        bgcolor: "rgb(255,255,255)",
        height: "7.5px",
        width: "7.5px"
      }
    ),
    /* @__PURE__ */ React21.createElement(
      Typography,
      {
        variant: "tiny",
        bold: true,
        sx: { lineHeight: "100%" },
        color: "rgb(255,255,255)",
        noWrap: true
      },
      _8.isNumber(props.n) ? `${props.n} New` : "New"
    )
  );
}

// src/components/UrsorDropdown.tsx
import React22, { useState as useState30 } from "react";
import { Box as Box10, Stack as Stack32 } from "@mui/system";
var ROW_HEIGHT = "45px";
var X_PADDING = "20px";
var LIST_MAX_HEIGHT = "400px";
function UrsorDropdownListRow(props) {
  return /* @__PURE__ */ React22.createElement(
    Stack32,
    {
      width: "100%",
      direction: "row",
      spacing: "7px",
      height: ROW_HEIGHT,
      px: X_PADDING,
      alignItems: "center",
      sx: {
        cursor: "pointer"
      },
      bgcolor: props.hovering ? PALETTE.secondary.grey[1] : "rgba(255,255,255)"
    },
    props.icon ? props.icon : null,
    /* @__PURE__ */ React22.createElement(Stack32, { width: "100%", minWidth: 0 }, /* @__PURE__ */ React22.createElement(
      Typography,
      {
        noWrap: true,
        variant: "small",
        sx: { lineHeight: "100%" },
        color: props.hovering ? PALETTE.secondary.purple[2] : PALETTE.font.dark
      },
      props.value
    ), props.secondaryValue ? /* @__PURE__ */ React22.createElement(Typography, { noWrap: true, variant: "tiny", color: PALETTE.secondary.grey[3] }, props.secondaryValue) : null)
  );
}
function UrsorDropdownList(props) {
  const [hoverRowId, setHoverRowId] = useState30(void 0);
  return /* @__PURE__ */ React22.createElement(Stack32, { width: "100%", maxHeight: LIST_MAX_HEIGHT }, props.rows.map((row) => /* @__PURE__ */ React22.createElement(
    Box10,
    {
      key: row.id,
      onClick: row.callback,
      onMouseEnter: () => setHoverRowId(row.id),
      onMouseLeave: () => setHoverRowId((prev) => prev === row.id ? void 0 : prev)
    },
    /* @__PURE__ */ React22.createElement(UrsorDropdownListRow, { ...row, hovering: row.id === hoverRowId })
  )));
}
function UrsorDropdownButton(props) {
  const [popupOpen, setPopupOpen] = useState30(false);
  return /* @__PURE__ */ React22.createElement(
    UrsorPopover,
    {
      open: popupOpen,
      content: /* @__PURE__ */ React22.createElement(UrsorDropdownList, { rows: props.rows }),
      closeCallback: () => setPopupOpen(false),
      floatButton: "duplicate",
      noPadding: true
    },
    /* @__PURE__ */ React22.createElement(
      Box10,
      {
        sx: { "&:hover": { opacity: 0.5 }, transition: "0.2s" },
        onClick: () => setPopupOpen(true)
      },
      props.children
    )
  );
}

// src/components/UrsorTable.tsx
var GLASS_WHITE_STROKE = "rgba(251, 251, 251, 0.35)";
var ROW_HEIGHT2 = "55px";
var BORDER_THICKNESS = "1.5px";
var BORDER = `${BORDER_THICKNESS} solid ${PALETTE.secondary.grey[2]}`;
var ROUNDING2 = "12px";
var BODY_CELL_Y_PADDING = "13px";
var CELL_BUTTON_SIZE = "16px";
var NEW_TAG_DURATION = 8;
var fadedRowStyle = {
  opacity: 0.7,
  transition: "0.5s"
};
var disabledRowItemStyle = {
  opacity: 0.3
};
var headerRowStyle = {
  // "& th": {
  //   //paddingTop: "0px",
  //   //paddingBottom: "15px",
  //   border: BORDER,
  // },
  // "& th:first-of-type": {
  //   borderTopLeftRadius: ROUNDING,
  // },
  // "& th:last-of-type": {
  //   borderTopRightRadius: ROUNDING,
  // },
  position: "relative",
  zIndex: 0
};
var bodyCellStyle = {
  //overflow: "visible",
  "& td": {
    maxWidth: "450px",
    paddingTop: BODY_CELL_Y_PADDING,
    paddingBottom: BODY_CELL_Y_PADDING,
    border: 0,
    borderLeft: `1px solid ${alpha5(PALETTE.secondary.grey[2], 0.5)}`,
    borderTop: `1px solid ${alpha5(PALETTE.secondary.grey[3], 0.2)}`
  },
  "& tr:first-of-type": {
    borderTop: BORDER
  },
  "& td:last-of-type": {
    borderLeft: 0
  }
  // "& td:last-of-type": {
  //   borderRight: BORDER,
  // },
  // "& td:last-of-type": {
  //   borderRight: BORDER,
  // },
  // "& tr:first-of-type": {
  //   "& td": {
  //     borderTop: BORDER,
  //   },
  //   "& td:first-of-type": {
  //     borderTopLeftRadius: ROUNDING,
  //   },
  //   "& td:last-of-type": {
  //     borderTopRightRadius: ROUNDING,
  //   },
  // },
  // "& tr:last-of-type": {
  //   "& td": {
  //     borderBottom: BORDER,
  //   },
  //   // "& td:first-of-type": {
  //   //   borderBottomLeftRadius: ROUNDING,
  //   // },
  //   "& td:last-of-type": {
  //     borderBottom: 0,
  //   },
  // },
};
var Checkbox = (props) => /* @__PURE__ */ React23.createElement(
  Stack33,
  {
    border: `2px solid ${PALETTE.font.dark}`,
    borderRadius: "3px",
    height: "18px",
    width: "18px",
    sx: {
      svg: {
        path: {
          fill: "rgb(0,0,0)"
        }
      }
    },
    justifyContent: "center",
    alignItems: "center"
  },
  props.checked ? /* @__PURE__ */ React23.createElement(Box11, { bgcolor: "rgb(0,0,0)", height: "7px", width: "7px", borderRadius: "100%" }) : null
);
var UrsorTableBodyCell = (props) => {
  const [newTagOn, setNewTagOn] = useState31(false);
  React23.useEffect(() => {
    if (props.newTagDatetime && -dayjs6(props.newTagDatetime).diff(dayjs6(), "seconds") < NEW_TAG_DURATION) {
      setNewTagOn(true);
      setTimeout(() => setNewTagOn(false), NEW_TAG_DURATION * 1e3);
    }
  }, [props.newTagDatetime]);
  return /* @__PURE__ */ React23.createElement(
    TableCell,
    {
      key: props.columnName,
      width: props.columnName === "title" ? props.titleColumnWidth || "37%" : props.columnName === "domain" || props.columnName === "url" ? "23%" : props.columnName === "accessLevel" ? "40px" : void 0,
      sx: {
        fontFamily: "unset"
      }
    },
    /* @__PURE__ */ React23.createElement(
      Stack33,
      {
        flex: 1,
        sx: {
          display: "flex",
          position: "relative",
          svg: { path: { fill: PALETTE.font.dark } }
        },
        justifyContent: "flex-end",
        overflow: typeof props.item === "s tring" ? "hidden" : void 0
      },
      /* @__PURE__ */ React23.createElement(
        Stack33,
        {
          direction: "row",
          spacing: "16px",
          position: "relative",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          minWidth: props.columnName === "title" ? "200px" : void 0
        },
        /* @__PURE__ */ React23.createElement(
          Stack33,
          {
            width: "100%",
            direction: "row",
            spacing: "10px",
            alignItems: "center",
            onClick: props.onClick
          },
          props.checkbox ? /* @__PURE__ */ React23.createElement(
            Box11,
            {
              onClick: props.checkbox.callback,
              sx: {
                //width: props.checkbox.checked || props.rowHovering ? "20px" : 0,
                opacity: props.checkbox.checked || props.rowHovering ? 1 : 0,
                "&:hover": {
                  opacity: 0.5
                },
                transition: "0.2s"
              }
            },
            /* @__PURE__ */ React23.createElement(Checkbox, { checked: props.checkbox.checked })
          ) : null,
          /* @__PURE__ */ React23.createElement(
            Stack33,
            {
              minWidth: "100%",
              maxWidth: 0,
              direction: "row",
              spacing: "10px",
              alignItems: "center",
              overflow: "hidden"
            },
            props.avatar,
            typeof props.item === "s tring" || typeof props.item === "number" ? /* @__PURE__ */ React23.createElement(
              Stack33,
              {
                width: "100%",
                sx: {
                  ...props.disabled ? disabledRowItemStyle : {}
                  // ...(props.columnName === "title"
                  //   ? { maxWidth: 0, minWidth: "100%" }
                  //   : {}),
                }
              },
              /* @__PURE__ */ React23.createElement(
                "a",
                {
                  target: "_blank",
                  href: props.url ? props.url : void 0,
                  style: {
                    textDecoration: "none",
                    width: "100%"
                  }
                },
                /* @__PURE__ */ React23.createElement(
                  Typography,
                  {
                    sx: {
                      opacity: props.faded ? 0.4 : 1,
                      maxWidth: props.columnName === "title" ? 0 : props.columnName === "domain" || props.columnName === "url" ? "200px" : 0,
                      minWidth: "100%"
                    },
                    noWrap: true
                  },
                  props.item
                )
              )
            ) : props.item,
            newTagOn ? /* @__PURE__ */ React23.createElement(NewActivityTag, null) : null
          )
        ),
        props.button || props.listButton || props.actionButtonItems ? /* @__PURE__ */ React23.createElement(Box11, { width: "fit-content" }, props.button ? /* @__PURE__ */ React23.createElement(
          Stack33,
          {
            onClick: props.button.callback,
            sx: {
              opacity: props.rowHovering ? 1 : 0,
              "&:hover": {
                opacity: 0.5
              },
              transition: "0.2s"
            }
          },
          /* @__PURE__ */ React23.createElement(props.button.icon, { height: "20px", width: "20px" })
        ) : null, props.listButton && props.listButton.rows.length > 1 ? /* @__PURE__ */ React23.createElement(
          Stack33,
          {
            direction: "row",
            spacing: "4px",
            sx: { opacity: props.rowHovering ? 1 : 0 }
          },
          props.listButton.showCount && props.listButton.rows.length > 1 ? /* @__PURE__ */ React23.createElement(Typography, { variant: "medium", faded: true }, `+${props.listButton.rows.length - 1}`) : null,
          /* @__PURE__ */ React23.createElement(UrsorDropdownButton, { rows: props.listButton.rows }, /* @__PURE__ */ React23.createElement(
            props.listButton.icon,
            {
              height: CELL_BUTTON_SIZE,
              width: CELL_BUTTON_SIZE
            }
          ))
        ) : null, props.actionButtonItems ? /* @__PURE__ */ React23.createElement(Stack33, { width: "16px", sx: { opacity: props.rowHovering ? 1 : 0 } }, /* @__PURE__ */ React23.createElement(UrsorActionButton, { actions: props.actionButtonItems })) : null) : null,
        props.extraElement
      )
    )
  );
};
function UrsorTable(props) {
  const [hoveredRow, setHoveredRow] = useState31(null);
  const getRowStyle = (index, clickable) => {
    const highlightStyle = hoveredRow === null || index === hoveredRow ? null : fadedRowStyle;
    return {
      height: ROW_HEIGHT2,
      //background: "#1A415A",
      transition: "0.2s",
      ...highlightStyle,
      position: "relative",
      cursor: "pointer",
      overflow: "visible"
    };
  };
  const getHeaderCell = (displayName, fitBodyContent, sort, selectAll, button) => {
    return /* @__PURE__ */ React23.createElement(
      TableCell,
      {
        key: displayName,
        sx: {
          background: props.noHeaderGradient ? void 0 : `linear-gradient(${PALETTE.secondary.grey[1]}, ${alpha5(
            PALETTE.secondary.grey[1],
            0.5
          )}, ${alpha5(PALETTE.secondary.grey[1], 0)})`,
          width: fitBodyContent ? 0 : "auto",
          fontFamily: "unset"
        }
      },
      /* @__PURE__ */ React23.createElement(Stack33, { direction: "row", spacing: "10px", alignItems: "center" }, selectAll ? /* @__PURE__ */ React23.createElement(
        Box11,
        {
          sx: {
            "&:hover": { opacity: 0.75 },
            transition: "0.2s",
            cursor: "pointer"
          },
          onClick: selectAll.callback
        },
        /* @__PURE__ */ React23.createElement(Checkbox, { checked: selectAll.ticked })
      ) : null, /* @__PURE__ */ React23.createElement(
        Stack33,
        {
          direction: "row",
          spacing: "8px",
          onClick: sort == null ? void 0 : sort.callback,
          sx: sort ? {
            "&:hover": { opacity: 0.75 },
            transition: "0.2s",
            cursor: "pointer"
          } : void 0,
          width: "100%"
        },
        /* @__PURE__ */ React23.createElement(Typography, { variant: "small", bold: true }, displayName.toUpperCase()),
        /* @__PURE__ */ React23.createElement(
          Stack33,
          {
            justifyContent: "center",
            sx: {
              transform: `rotate(${(sort == null ? void 0 : sort.direction) === "asc" ? 180 : 0}deg)`,
              transition: "0.2s",
              svg: {
                path: {
                  fill: PALETTE.font.dark
                }
              },
              // opacity: sort ? (sort?.direction || hovering ? 1 : 0.4) : 0,
              opacity: sort ? (sort == null ? void 0 : sort.direction) ? 1 : 0.4 : 0
            }
          },
          /* @__PURE__ */ React23.createElement(ArrowDownIcon_default, { width: "16px", height: "16px" })
        )
      ), button)
    );
  };
  return /* @__PURE__ */ React23.createElement(
    TableContainer,
    {
      sx: {
        width: "unset",
        zIndex: 0,
        // needed to prevent the sticky header from being on top of dialogs
        border: BORDER,
        borderRadius: "12px"
      }
    },
    /* @__PURE__ */ React23.createElement(Table, { sx: { overflow: "visible" } }, /* @__PURE__ */ React23.createElement(TableHead, null, /* @__PURE__ */ React23.createElement(TableRow, { sx: headerRowStyle }, [
      ...props.columns.map(
        (column) => {
          var _a;
          return getHeaderCell(
            column.displayName,
            false,
            column.sortable ? {
              direction: props.selectedSort === column.name ? props.ascending ? "asc" : "desc" : void 0,
              // sortedColumn === column.name
              //   ? sortDirection
              //   : undefined,
              callback: () => {
                props.sortSelectionCallback(column.name);
              }
            } : void 0,
            column.selectAll && props.checkboxes ? {
              ticked: ((_a = props.checkboxes) == null ? void 0 : _a.checked.length) === props.rows.length,
              callback: props.checkboxes.selectAllCallback
            } : void 0,
            column.headerButton
          );
        }
      )
    ])), /* @__PURE__ */ React23.createElement(
      TableBody,
      {
        sx: {
          ...bodyCellStyle,
          border: `${BORDER_THICKNESS} solid ${GLASS_WHITE_STROKE}`,
          borderRadius: ROUNDING2
        },
        onMouseLeave: () => setHoveredRow(null)
      },
      props.rows.map((row, rowIndex) => /* @__PURE__ */ React23.createElement(
        TableRow,
        {
          key: rowIndex,
          sx: getRowStyle(rowIndex, !!props.rowClickCallback),
          onMouseOver: () => setHoveredRow(rowIndex)
        },
        [
          ...props.columns.map((column) => {
            var _a, _b, _c, _d, _e, _f, _g;
            return /* @__PURE__ */ React23.createElement(
              UrsorTableBodyCell,
              {
                key: column.name,
                columnName: column.name,
                item: ((_a = column.itemDisplay) == null ? void 0 : _a.call(column, row.items[column.name])) ?? row.items[column.name],
                avatar: (_b = column.getAvatar) == null ? void 0 : _b.call(column, row.id),
                disabled: row.disabled,
                tags: row.tags,
                rowHovering: hoveredRow === rowIndex,
                faded: (_c = column.faded) == null ? void 0 : _c.call(column, row),
                url: column.link ? row.url : void 0,
                button: (_d = column.getButton) == null ? void 0 : _d.call(column, row.id),
                listButton: (_e = column.getListButton) == null ? void 0 : _e.call(column, row.items[column.name]),
                titleColumnWidth: props.titleColumnWidth,
                actionButtonItems: (_f = column.getActionButtonItems) == null ? void 0 : _f.call(column, row.id),
                checkbox: column.checkbox && props.checkboxes ? {
                  checked: props.checkboxes.checked.includes(row.id),
                  callback: () => props.checkboxes.callback(row.id)
                } : void 0,
                extraElement: (_g = column.getExtraElement) == null ? void 0 : _g.call(
                  column,
                  row.id,
                  hoveredRow === rowIndex
                ),
                newTagDatetime: column.newTag ? row.newTagDatetime : void 0,
                onClick: !column.noRowClick ? () => {
                  var _a2;
                  return (_a2 = props.rowClickCallback) == null ? void 0 : _a2.call(props, row.id);
                } : void 0
              }
            );
          }),
          ...props.getActionButtonItems ? [
            /* @__PURE__ */ React23.createElement(
              TableCell,
              {
                key: "actionButton",
                sx: {
                  width: 0
                }
              },
              /* @__PURE__ */ React23.createElement(Stack33, { alignItems: "flex-end" }, /* @__PURE__ */ React23.createElement(
                UrsorActionButton,
                {
                  background: "transparent",
                  iconSize: "16px",
                  size: "16px",
                  actions: props.getActionButtonItems(row.id)
                }
              ))
            )
          ] : [],
          ...props.getEndButton ? [
            /* @__PURE__ */ React23.createElement(
              TableCell,
              {
                key: "endButton",
                sx: {
                  width: 0,
                  fontFamily: "unset"
                }
              },
              props.getEndButton(row.id)
            )
          ] : []
        ]
      ))
    ))
  );
}

// src/account/components/UsersTable.tsx
import { Stack as Stack34 } from "@mui/system";
import dayjs7 from "dayjs";
import _9 from "lodash";
var UsersTable = (props) => {
  const TABLE_COLUMNS = [
    {
      name: "name",
      displayName: `${props.users.length ?? 0} Adult${props.users.length === 1 ? "" : "s "}`,
      sortable: true,
      newTag: true,
      getAvatar: (id) => {
        return /* @__PURE__ */ React.createElement(
          Stack34,
          {
            borderRadius: "100%",
            overflow: "hidden",
            bgcolor: PALETTE.secondary.blue[2],
            minWidth: "20px",
            minHeight: "20px"
          }
        );
      }
    },
    {
      name: "email",
      displayName: "Email",
      sortable: true
    },
    {
      name: "dateJoined",
      displayName: "Date joined",
      sortable: true,
      itemDisplay: (createdAt) => dayjs7(createdAt).format("MM/DD/YYYY")
    }
  ];
  const [rows, setRows] = useState32(
    []
  );
  useEffect18(() => {
    (async () => {
      var _a;
      const userRows = ((_a = props.users) == null ? void 0 : _a.map((a) => ({
        id: a.id.toString(),
        items: {
          name: a.realName ?? "",
          email: a.email,
          dateJoined: a.createdAt
        },
        tags: [],
        disabled: false
      }))) || [];
      setRows(userRows);
    })();
  }, [props.users]);
  const [sortedRows, setSortedRows] = useState32([]);
  const [sortedColumn, setSortedColumn] = useState32("name");
  const [sortDirection, setSortDirection] = useState32("desc");
  useEffect18(() => {
    if (!rows) return;
    const sorted = _9.sortBy(
      rows,
      (row) => {
        var _a, _b;
        return (
          //@ts-ignore
          (_b = (_a = row.items) == null ? void 0 : _a[sortedColumn]) == null ? void 0 : _b.toLowerCase()
        );
      }
    );
    setSortedRows(sortDirection === "asc" ? _9.reverse(sorted.slice()) : sorted);
  }, [rows, sortDirection, sortedColumn]);
  return /* @__PURE__ */ React.createElement(
    UrsorTable,
    {
      columns: TABLE_COLUMNS,
      rows: sortedRows,
      defaultSortedByColumn: "createdAt",
      defaultSortedAscending: true,
      selectedSort: sortedColumn,
      ascending: sortDirection === "asc",
      sortSelectionCallback: (columnId) => {
        if (columnId === sortedColumn) {
          setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
          setSortedColumn(columnId);
          setSortDirection("asc");
        }
      },
      noHeaderGradient: true,
      rowClickCallback: (id) => null
    }
  );
};
var UsersTable_default = UsersTable;

// src/account/components/DevicesTable.tsx
import { useEffect as useEffect21, useState as useState35 } from "react";
import { Stack as Stack37 } from "@mui/system";
import dayjs8 from "dayjs";
import _10 from "lodash";

// src/profiles/components/DeviceCard.tsx
import { Stack as Stack36 } from "@mui/system";

// src/filter/components/AstroCard.tsx
import { Stack as Stack35 } from "@mui/system";
var AstroCard = (props) => /* @__PURE__ */ React.createElement(
  Stack35,
  {
    borderRadius: "12px",
    justifyContent: "center",
    border: `1px solid ${PALETTE.secondary.grey[2]}`,
    bgcolor: "rgb(255,255,255)"
  },
  props.children
);
var AstroCard_default = AstroCard;

// src/images/icons/GlobeIcon.svg
var GlobeIcon_default = "./GlobeIcon-FUMIGJI2.svg";

// src/images/icons/StrikeThroughGlobeIcon.svg
var StrikeThroughGlobeIcon_default = "./StrikeThroughGlobeIcon-COQPTICO.svg";

// src/profiles/components/DeviceCard.tsx
import { useContext as useContext3, useEffect as useEffect19, useState as useState33 } from "react";
import { useNavigate as useNavigate3 } from "react-router-dom";
import { useElementSize as useElementSize2 } from "usehooks-ts";

// src/components/NotificationContext.tsx
import { createContext as createContext2 } from "react";
var NotificationContext = createContext2({
  message: null,
  type: null,
  success: (message) => null,
  negativeSuccess: (message) => null,
  error: (message) => null
});
var NotificationContext_default = NotificationContext;

// src/profiles/components/DeviceCard.tsx
var DEVICE_TYPE_DISPLAY_NAMES = {
  android: "Android",
  chrome: "Chromebook",
  ios: "iOS"
};
var DeviceCardSection = (props) => /* @__PURE__ */ React.createElement(
  Stack36,
  {
    flex: 1,
    height: "72px",
    minHeight: "72px",
    boxSizing: "border-box",
    px: "12px",
    py: "10px",
    justifyContent: "space-between",
    borderRadius: "8px",
    border: `1px solid ${PALETTE.secondary.grey[2]}`
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: "small", bold: true, color: PALETTE.secondary.grey[3] }, props.title),
  props.children
);
var DeviceCardBrowsingStatusSection = (props) => {
  const [setRef, size] = useElementSize2();
  return /* @__PURE__ */ React.createElement(Stack36, { ref: setRef, flex: 1 }, /* @__PURE__ */ React.createElement(DeviceCardSection, { title: "Browsing status" }, /* @__PURE__ */ React.createElement(
    Stack36,
    {
      direction: "row",
      alignItems: "center",
      justifyContent: "space-between",
      spacing: "6px"
    },
    /* @__PURE__ */ React.createElement(
      Stack36,
      {
        spacing: "8px",
        direction: "row",
        alignItems: "center",
        sx: {
          svg: {
            path: {
              fill: PALETTE.secondary.grey[4]
            }
          }
        }
      },
      (size.width ?? 0) > 276 ? /* @__PURE__ */ React.createElement(GlobeIcon_default, { height: "20px", width: "20px" }) : null,
      /* @__PURE__ */ React.createElement(
        Typography,
        {
          bold: true,
          color: PALETTE.secondary.grey[5],
          maxLines: 1,
          sx: { maxWidth: "100%", minWidth: 0 }
        },
        `Browsing is ${props.browsingEnabled ? "enabled" : "disabled"}`
      )
    ),
    /* @__PURE__ */ React.createElement(
      AstroSwitch_default,
      {
        on: props.browsingEnabled,
        callback: props.flipBrowsingEnabled
      }
    )
  )));
};
var DeviceCardScreenTimeSection = (props) => /* @__PURE__ */ React.createElement(DeviceCardSection, { title: "Screen time left today" }, /* @__PURE__ */ React.createElement(Stack36, { direction: "row", alignItems: "center", spacing: "38px" }, /* @__PURE__ */ React.createElement(
  Stack36,
  {
    direction: "row",
    alignItems: "center",
    justifyContent: "space-between",
    spacing: "8px",
    width: "100%"
  },
  /* @__PURE__ */ React.createElement(
    Stack36,
    {
      flex: 1,
      height: "11px",
      bgcolor: PALETTE.secondary.grey[2],
      borderRadius: "6px",
      position: "relative",
      overflow: "hidden"
    },
    /* @__PURE__ */ React.createElement(
      Stack36,
      {
        height: "100%",
        width: `${Math.min(
          100,
          100 * props.elapsedTime / props.totalTime
        )}%`,
        bgcolor: PALETTE.secondary.purple[1],
        borderRadius: "6px"
      }
    )
  ),
  /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[3] }, `${Math.floor(
    Math.max(0, props.totalTime - props.elapsedTime) / 60
  )}h ${Math.floor(
    Math.max(0, props.totalTime - props.elapsedTime) % 60
  )}m`)
), /* @__PURE__ */ React.createElement(UrsorButton, { variant: "secondary", size: "small", onClick: props.onClickView }, "View")));
var DeviceCardCurrentUrlSection = (props) => {
  const navigate = useNavigate3();
  return /* @__PURE__ */ React.createElement(DeviceCardSection, { title: "Currently visiting" }, /* @__PURE__ */ React.createElement(
    Stack36,
    {
      direction: "row",
      alignItems: "center",
      justifyContent: "space-between",
      spacing: "8px",
      sx: !props.disabled ? {
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.7 },
        svg: {
          path: {
            fill: PALETTE.secondary.purple[2]
          }
        }
      } : void 0,
      onClick: !props.disabled ? () => navigate(getAbsoluteUrl(cleanUrl(props.url))) : void 0
    },
    /* @__PURE__ */ React.createElement(Stack36, { direction: "row", spacing: "8px" }, !props.disabled && props.faviconUrl ? /* @__PURE__ */ React.createElement(
      Stack36,
      {
        height: "20px",
        width: "20px",
        borderRadius: "5px",
        overflow: "hidden"
      },
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: props.faviconUrl,
          height: 20,
          width: 20,
          alt: "favicon"
        }
      )
    ) : null, /* @__PURE__ */ React.createElement(
      Typography,
      {
        bold: true,
        color: props.disabled ? PALETTE.secondary.grey[4] : PALETTE.secondary.purple[2],
        maxLines: 1
      },
      props.disabled === "browsingDisabled" ? "Currently locked" : props.disabled === "offline" ? "Offline" : props.title
    )),
    !props.disabled ? /* @__PURE__ */ React.createElement("aExternalIcon", { height: "20px", width: "20px" }) : null
  ));
};
var DeviceCard = (props) => {
  var _a, _b, _c, _d, _e, _f;
  const [browsingEnabled, setBrowsingEnabled] = useState33(false);
  useEffect19(
    () => {
      var _a2;
      return setBrowsingEnabled(!!((_a2 = props.config) == null ? void 0 : _a2.browsingAllowed));
    },
    [(_a = props.config) == null ? void 0 : _a.browsingAllowed]
  );
  const navigate = useNavigate3();
  const onClick = () => navigate(`/profiles/${props.id}`);
  const notificationCtx = useContext3(NotificationContext_default);
  return /* @__PURE__ */ React.createElement(AstroCard_default, null, /* @__PURE__ */ React.createElement(Stack36, { p: "20px", boxSizing: "border-box", position: "relative" }, props.button ? /* @__PURE__ */ React.createElement(
    Stack36,
    {
      position: "absolute",
      top: "28px",
      right: "15px",
      sx: {
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s"
      },
      zIndex: 2
    },
    props.button
  ) : null, /* @__PURE__ */ React.createElement(
    Stack36,
    {
      direction: "row",
      spacing: "18px",
      position: "relative",
      height: props.small ? "58px" : "90px",
      alignItems: "center",
      width: "94%",
      onClick: props.onClick
    },
    /* @__PURE__ */ React.createElement(Stack36, { position: "relative" }, /* @__PURE__ */ React.createElement(
      Stack36,
      {
        minHeight: props.small ? "40px" : "84px",
        minWidth: props.small ? "40px" : "84px",
        borderRadius: "100%",
        overflow: "hidden",
        bgcolor: PALETTE.secondary.blue[2],
        justifyContent: "center",
        alignItems: "center",
        onClick,
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.6 }
        }
      },
      props.profileAvatarUrl ? /* @__PURE__ */ React.createElement(
        "img",
        {
          src: props.profileAvatarUrl,
          height: props.small ? 40 : 84,
          width: props.small ? 40 : 84,
          alt: "device profile"
        }
      ) : /* @__PURE__ */ React.createElement(Typography, { color: "rgb(255,255,255)", bold: true, variant: "h4" }, getInitials(props.name))
    ), /* @__PURE__ */ React.createElement(
      Stack36,
      {
        position: "absolute",
        bottom: -2,
        right: -2,
        height: "22px",
        width: "22px",
        borderRadius: "100%",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: props.online && browsingEnabled ? PALETTE.secondary.green[4] : PALETTE.secondary.grey[3],
        border: `2px solid rgb(255,255,255)`,
        sx: {
          svg: {
            path: {
              fill: "rgb(255,255,255)"
            }
          }
        }
      },
      props.online && browsingEnabled ? /* @__PURE__ */ React.createElement(GlobeIcon_default, { height: "12px", width: "12px" }) : /* @__PURE__ */ React.createElement(StrikeThroughGlobeIcon_default, { height: "12px", width: "12px" })
    )),
    /* @__PURE__ */ React.createElement(Stack36, { justifyContent: "center", spacing: "4px" }, /* @__PURE__ */ React.createElement(
      Stack36,
      {
        onClick,
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.6 }
        }
      },
      /* @__PURE__ */ React.createElement(
        Typography,
        {
          bold: true,
          variant: "h5",
          maxLines: 1,
          sx: { wordBreak: "break-all" }
        },
        props.name
      )
    ), /* @__PURE__ */ React.createElement(Stack36, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(PhoneIcon_default, { height: "16px", width: "16px" }), /* @__PURE__ */ React.createElement(Typography, { maxLines: 1 }, DEVICE_TYPE_DISPLAY_NAMES[props.deviceType])), props.filterName ? /* @__PURE__ */ React.createElement(
      Stack36,
      {
        direction: "row",
        spacing: "8px",
        alignItems: "center",
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.7 },
          svg: {
            path: {
              fill: PALETTE.system.orange
            }
          }
        },
        onClick: () => navigate(`/filters/${props.filterId}`)
      },
      /* @__PURE__ */ React.createElement(FilterIcon_default, { height: "16px", width: "16px" }),
      /* @__PURE__ */ React.createElement(Typography, { maxLines: 1 }, props.filterName)
    ) : null)
  ), !props.noExtras ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Stack36, { spacing: "12px", pt: "20px" }, /* @__PURE__ */ React.createElement(
    DeviceCardCurrentUrlSection,
    {
      url: (_b = props.latestBrowsing) == null ? void 0 : _b.url,
      disabled: !browsingEnabled ? "browsingDisabled" : !props.online ? "offline" : void 0,
      title: (_c = props.latestBrowsing) == null ? void 0 : _c.title,
      faviconUrl: (_d = props.latestBrowsing) == null ? void 0 : _d.faviconUrl
    }
  ), /* @__PURE__ */ React.createElement(
    DeviceCardScreenTimeSection,
    {
      totalTime: ((_e = props.screenTime) == null ? void 0 : _e.allowed) ?? 0,
      elapsedTime: ((_f = props.screenTime) == null ? void 0 : _f.current) ?? 0,
      onClickView: () => navigate(`/profiles/${props.id}?tab=limits`)
    }
  ), /* @__PURE__ */ React.createElement(
    DeviceCardBrowsingStatusSection,
    {
      browsingEnabled,
      flipBrowsingEnabled: () => {
        setBrowsingEnabled(!browsingEnabled);
        api_default.flipBrowsingAllowed(props.id, !browsingEnabled);
        notificationCtx.success(
          `Browsing is now ${!browsingEnabled ? "enabled" : "disabled"} on ${props.name}`
        );
      }
    }
  )), /* @__PURE__ */ React.createElement(Stack36, { pt: "20px" }, /* @__PURE__ */ React.createElement(
    UrsorButton,
    {
      variant: "secondary",
      endIcon: ChevronRight_default,
      onClick: () => navigate(`/profiles/${props.id}`),
      width: "100%",
      backgroundColor: "white"
    },
    "Go to Device"
  ))) : null));
};
var DeviceCard_default = DeviceCard;

// src/hooks/useAuth/index.ts
import { useEffect as useEffect20, useState as useState34 } from "react";
import Cookies from "js-cookie";
import { useNavigate as useNavigate4 } from "react-router-dom";

// src/auth/index.ts
var getUserInfo = async () => {
  const resp = await fetch(`${BACKEND_URL}/users/self`, {
    credentials: "include"
  });
  const data = await resp.json();
  return data;
};

// src/hooks/useAuth/index.ts
var useAuth = () => {
  const [user, setUser] = useState34({});
  const navigate = useNavigate4();
  useEffect20(() => {
    const storedUserInfo = Cookies.get("user_info");
    if (storedUserInfo) {
      setUser(JSON.parse(storedUserInfo));
      return;
    }
    const accessToken = Cookies.get("access_token");
    const pathname = window.location.href;
    if (!accessToken) navigate(`${BACKEND_URL}/login?origin_uri=${pathname}`);
    getUserInfo().then((data) => {
      setUser(data);
      Cookies.set("user_info", JSON.stringify(data));
    });
  }, []);
  const login = () => navigate(`${BACKEND_URL}/login?redirect_uri=${window.location.href}`);
  const logout = () => navigate(`${BACKEND_URL}/logout`);
  return { user, login, logout };
};
var useAuth_default = useAuth;

// src/account/components/DevicesTable.tsx
var DevicesTable = () => {
  const { user } = useAuth_default();
  const [devices, setDevices] = useState35([]);
  useEffect21(() => {
    {
      (user == null ? void 0 : user.group_id) && api_default.getGroupEnrichedDevices(user.group_id).then(
        (d) => setDevices(d)
      );
    }
  }, [user == null ? void 0 : user.group_id]);
  const TABLE_COLUMNS = [
    {
      name: "name",
      displayName: `${devices.length} Device${devices.length === 1 ? "" : "s "}`,
      sortable: true,
      newTag: true,
      getAvatar: (id) => {
        var _a, _b;
        return /* @__PURE__ */ React.createElement(
          Stack37,
          {
            minWidth: 20,
            minHeight: 20,
            width: 20,
            height: 20,
            bgcolor: PALETTE.secondary.blue[2],
            borderRadius: "100%"
          },
          ((_a = devices.find((d) => d.id.toString() === id)) == null ? void 0 : _a.profileAvatarUrl) ? /* @__PURE__ */ React.createElement(
            "img",
            {
              src: ((_b = devices.find((d) => d.id.toString() === id)) == null ? void 0 : _b.profileAvatarUrl) ?? "",
              height: 20,
              width: 20,
              alt: "allowed site favicon"
            }
          ) : null
        );
      }
    },
    {
      name: "type",
      displayName: "Device type",
      sortable: true,
      itemDisplay: (type) => DEVICE_TYPE_DISPLAY_NAMES[type]
    },
    {
      name: "lastActive",
      displayName: "Last active",
      sortable: true,
      itemDisplay: (lastActive) => {
        const hours = dayjs8().diff(lastActive, "hours");
        return `${hours} hour${hours === 1 ? "" : "s "} ago`;
      }
    },
    {
      name: "dateJoined",
      displayName: "Date joined",
      sortable: true,
      itemDisplay: (createdAt) => dayjs8(createdAt).format("MM/DD/YYYY")
    }
  ];
  const [rows, setRows] = useState35([]);
  useEffect21(() => {
    (async () => {
      const devicesRows = (devices == null ? void 0 : devices.map((d) => ({
        id: d.id.toString(),
        items: {
          name: d.name ?? "",
          type: d.deviceType,
          lastActive: d.lastOnline,
          dateJoined: d.createdAt ?? "",
          profileAvatarUrl: d.profileAvatarUrl
        },
        tags: [],
        disabled: false
      }))) || [];
      setRows(devicesRows);
    })();
  }, [devices]);
  const [sortedRows, setSortedRows] = useState35([]);
  const [sortedColumn, setSortedColumn] = useState35("name");
  const [sortDirection, setSortDirection] = useState35("desc");
  useEffect21(() => {
    if (!rows) return;
    const sorted = _10.sortBy(
      rows,
      (row) => {
        var _a, _b;
        return (
          //@ts-ignore
          (_b = (_a = row.items) == null ? void 0 : _a[sortedColumn]) == null ? void 0 : _b.toLowerCase()
        );
      }
    );
    setSortedRows(sortDirection === "asc" ? _10.reverse(sorted.slice()) : sorted);
  }, [rows, sortDirection, sortedColumn]);
  return /* @__PURE__ */ React.createElement(
    UrsorTable,
    {
      columns: TABLE_COLUMNS,
      rows: sortedRows,
      defaultSortedByColumn: "createdAt",
      defaultSortedAscending: true,
      selectedSort: sortedColumn,
      ascending: sortDirection === "asc",
      sortSelectionCallback: (columnId) => {
        if (columnId === sortedColumn) {
          setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
          setSortedColumn(columnId);
          setSortDirection("asc");
        }
      },
      noHeaderGradient: true,
      rowClickCallback: (id) => null
    }
  );
};
var DevicesTable_default = DevicesTable;

// src/account/components/AccountPageHeader.tsx
import { Stack as Stack38 } from "@mui/system";
var AccountPageHeader = (props) => /* @__PURE__ */ React.createElement(
  Stack38,
  {
    height: props.isMobile ? void 0 : "71px",
    px: "24px",
    alignItems: "center",
    direction: props.isMobile ? "column" : "row",
    justifyContent: "space-between",
    sx: {
      background: VIBRANT_GRADIENT
    },
    borderRadius: "12px",
    pr: "54px",
    spacing: props.smallerFont || props.isMobile ? "12px" : void 0
  },
  /* @__PURE__ */ React.createElement(
    Stack38,
    {
      spacing: "16px",
      alignItems: "center",
      direction: props.isMobile ? "column" : "row"
    },
    /* @__PURE__ */ React.createElement(
      Typography,
      {
        variant: props.smallerFont || props.isMobile ? "normal" : "large",
        bold: true,
        color: "rgb(255,255,255)"
      },
      "Upgrade to a Family or School account to get unlimited access!"
    ),
    /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        endIcon: VerifiedIcon_default,
        iconSize: 15,
        size: "small",
        backgroundColor: "rgb(255,255,255)",
        fontColor: PALETTE.primary.navy,
        hoverOpacity: 0.7,
        onClick: props.setUpgradeDialogOpen
      },
      "Upgrade"
    )
  ),
  /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "https://ursorassets.s3.eu-west-1.amazonaws.com/Ellipse+399.png",
      height: 71,
      width: 245,
      alt: "upgrade"
    }
  )
);
var AccountPageHeader_default = AccountPageHeader;

// src/account/contents/body-desktop.tsx
import { useWindowSize as useWindowSize4 } from "usehooks-ts";
var SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD = 1408;
var AccountPageDesktopBody = (props) => {
  const { width } = useWindowSize4();
  return /* @__PURE__ */ React.createElement(
    PageLayout_default,
    {
      title: "My Account",
      bodyWidth: "100%",
      fullHeight: true,
      selectedSidebarItemId: "account",
      secondaryButton: {
        text: "Log out",
        callback: () => null,
        icon: LogOutIcon_default
      },
      maxWidth: 834,
      scrollable: true,
      header: /* @__PURE__ */ React.createElement(
        AccountPageHeader_default,
        {
          setUpgradeDialogOpen: props.setUpgradeDialogOpen,
          smallerFont: width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD
        }
      )
    },
    /* @__PURE__ */ React.createElement(Stack39, { pl: "50px", spacing: "12px", pb: "31px" }, /* @__PURE__ */ React.createElement(
      Stack39,
      {
        direction: width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD ? "column" : "row",
        spacing: "12px",
        height: width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD ? void 0 : "248px"
      },
      /* @__PURE__ */ React.createElement(
        AstroBentoCard,
        {
          title: "My profile",
          notCollapsible: true,
          topRightStuff: /* @__PURE__ */ React.createElement(
            UrsorButton,
            {
              size: "small",
              variant: "secondary",
              onClick: props.setEditDialogOpen,
              endIcon: Pencil_default,
              iconSize: 13
            },
            "Edit"
          )
        },
        /* @__PURE__ */ React.createElement(Stack39, { direction: "row", spacing: "20px", alignItems: "center", flex: 1 }, /* @__PURE__ */ React.createElement(UserInitialsCircle, { name: props.user.realName ?? "" }), /* @__PURE__ */ React.createElement(Stack39, { direction: "row", spacing: "26px", minWidth: "400px" }, /* @__PURE__ */ React.createElement(Stack39, { width: "100%", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Stack39, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
          Typography,
          {
            variant: "tiny",
            bold: true,
            color: PALETTE.secondary.grey[3]
          },
          "Name"
        ), /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.user.realName)), /* @__PURE__ */ React.createElement(Stack39, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
          Typography,
          {
            variant: "tiny",
            bold: true,
            color: PALETTE.secondary.grey[3]
          },
          "Nickname"
        ), /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.user.displayName)), /* @__PURE__ */ React.createElement(Stack39, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
          Typography,
          {
            variant: "tiny",
            bold: true,
            color: PALETTE.secondary.grey[3]
          },
          "Email"
        ), /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.user.email)))))
      ),
      /* @__PURE__ */ React.createElement(
        AstroBentoCard,
        {
          title: "My plan",
          notCollapsible: true,
          topRightStuff: /* @__PURE__ */ React.createElement(
            UrsorButton,
            {
              size: "small",
              variant: "secondary",
              onClick: props.onManagePlan,
              endIcon: ChevronRight_default,
              iconSize: 14
            },
            "Manage plan"
          )
        },
        /* @__PURE__ */ React.createElement(
          Stack39,
          {
            borderRadius: "12px",
            sx: {
              background: VIBRANT_GRADIENT
            },
            justifyContent: "space-between",
            p: "20px",
            flex: 1
          },
          /* @__PURE__ */ React.createElement(Typography, { variant: "h4", color: "rgb(255,255,255)" }, PLAN_DISPLAY_NAMES[props.planState]),
          /* @__PURE__ */ React.createElement(Stack39, { direction: "row", alignItems: "center", spacing: "24px" }, /* @__PURE__ */ React.createElement(Stack39, { flex: 1 }, PLAN_BANNER_ITEMS[props.planState].map((item, i) => /* @__PURE__ */ React.createElement(
            Stack39,
            {
              key: i,
              direction: "row",
              spacing: "8px",
              alignItems: "center",
              sx: {
                svg: {
                  path: {
                    fill: "rgb(255,255,255)"
                  }
                }
              }
            },
            /* @__PURE__ */ React.createElement(item.icon, { height: "12px", width: "12px" }),
            /* @__PURE__ */ React.createElement(Typography, { color: "rgb(255,255,255)" }, item.text)
          ))), props.planState !== "troomi" ? /* @__PURE__ */ React.createElement(Stack39, { height: "100%", justifyContent: "flex-end" }, /* @__PURE__ */ React.createElement(
            UrsorButton,
            {
              dark: true,
              endIcon: VerifiedIcon_default,
              backgroundColor: "rgb(255,255,255)",
              fontColor: PALETTE.primary.navy,
              hoverOpacity: 0.7,
              onClick: props.setUpgradeDialogOpen
            },
            "Upgrade"
          )) : null)
        )
      )
    ), /* @__PURE__ */ React.createElement(
      AstroBentoCard,
      {
        title: "Users in my space",
        notCollapsible: true,
        topRightStuff: /* @__PURE__ */ React.createElement(Stack39, { direction: "row", spacing: "12px" }, /* @__PURE__ */ React.createElement(
          UrsorButton,
          {
            endIcon: PersonIcon_default,
            size: "small",
            variant: "secondary",
            iconSize: 16,
            onClick: props.setInviteDialogOpen
          },
          "Add an adult"
        ), /* @__PURE__ */ React.createElement(
          UrsorButton,
          {
            endIcon: PhoneIcon_default,
            size: "small",
            variant: "secondary",
            iconSize: 16,
            onClick: props.setConnectDialogOpen
          },
          "Add a Device"
        ))
      },
      /* @__PURE__ */ React.createElement(Stack39, { spacing: "24px" }, /* @__PURE__ */ React.createElement(UsersTable_default, { users: props.allUsers }), /* @__PURE__ */ React.createElement(DevicesTable_default, null))
    ), /* @__PURE__ */ React.createElement(
      Stack39,
      {
        direction: width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD ? "column" : "row",
        spacing: "12px"
      },
      /* @__PURE__ */ React.createElement(AstroBentoCard, { title: "Boring bits", notCollapsible: true }, /* @__PURE__ */ React.createElement(Stack39, { spacing: "6px" }, /* @__PURE__ */ React.createElement(
        "a",
        {
          target: "_blank",
          href: "https://www.astrosafe.co/terms-and-conditions",
          style: {
            textDecoration: "none"
          }
        },
        /* @__PURE__ */ React.createElement(
          Stack39,
          {
            sx: {
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s"
            }
          },
          /* @__PURE__ */ React.createElement(Typography, { color: PALETTE.secondary.blue[3] }, "Terms & Conditions")
        )
      ), /* @__PURE__ */ React.createElement(
        "a",
        {
          target: "_blank",
          href: "https://www.astrosafe.co/app/privacy-policy",
          style: {
            textDecoration: "none"
          }
        },
        /* @__PURE__ */ React.createElement(
          Stack39,
          {
            sx: {
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s"
            }
          },
          /* @__PURE__ */ React.createElement(Typography, { color: PALETTE.secondary.blue[3] }, "Privacy policy")
        )
      ))),
      /* @__PURE__ */ React.createElement(
        AstroBentoCard,
        {
          title: "Feedback",
          notCollapsible: true,
          topRightStuff: /* @__PURE__ */ React.createElement(
            UrsorButton,
            {
              variant: "secondary",
              size: "small",
              onClick: () => window.open("mailto:hello@astrosafe.co")
            },
            "Send"
          )
        },
        /* @__PURE__ */ React.createElement(Typography, null, `We"d love to hear your thoughts! Please send us through any ideas you have about the app, or let us know if you encounter any bugs or hiccups!`)
      )
    ))
  );
};
var body_desktop_default = AccountPageDesktopBody;

// src/account/contents/body-mobile.tsx
import { Stack as Stack44 } from "@mui/system";

// src/components/MobilePageLayout.tsx
import { Stack as Stack42 } from "@mui/system";

// src/components/MobileTitleRow.tsx
import React25 from "react";
import { Stack as Stack40 } from "@mui/system";
import { useState as useState36 } from "react";
var MobileTitleRow = (props) => {
  var _a;
  const [open, setOpen] = useState36(false);
  return /* @__PURE__ */ React25.createElement(Stack40, { direction: "row", spacing: "6px", alignItems: "center" }, /* @__PURE__ */ React25.createElement(
    Stack40,
    {
      alignItems: "center",
      direction: "row",
      spacing: "6px",
      sx: {
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.7 }
      }
    },
    /* @__PURE__ */ React25.createElement(
      UrsorPopover,
      {
        open,
        content: /* @__PURE__ */ React25.createElement(Stack40, { spacing: "10px" }, (_a = props.item.options) == null ? void 0 : _a.map((o, i) => /* @__PURE__ */ React25.createElement(
          Stack40,
          {
            key: i,
            direction: "row",
            alignItems: "center",
            spacing: "8px",
            sx: {
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s"
            },
            onClick: o.callback
          },
          o.image || (o.imageUrl ? /* @__PURE__ */ React25.createElement(Stack40, { borderRadius: "100%", overflow: "hidden" }, /* @__PURE__ */ React25.createElement(
            "img",
            {
              src: o.imageUrl,
              height: 20,
              width: 20,
              alt: "option image"
            }
          )) : null),
          /* @__PURE__ */ React25.createElement(Typography, { bold: true }, o.text)
        ))),
        placement: "left",
        closeCallback: () => setOpen(false)
      },
      /* @__PURE__ */ React25.createElement(
        Stack40,
        {
          direction: "row",
          spacing: "6px",
          onClick: () => {
            var _a2, _b;
            setOpen(true);
            (_b = (_a2 = props.item).callback) == null ? void 0 : _b.call(_a2);
          },
          alignItems: "center"
        },
        /* @__PURE__ */ React25.createElement(Stack40, { justifyContent: "center" }, /* @__PURE__ */ React25.createElement(
          Typography,
          {
            bold: true,
            variant: "medium",
            maxLines: 1,
            sx: { wordBreak: "break-all" }
          },
          props.item.text
        )),
        props.item.options && props.item.options.length > 0 ? /* @__PURE__ */ React25.createElement(ChevronDown_default, { height: "20px", width: "20px" }) : null
      )
    )
  ));
};
var MobileTitleRow_default = MobileTitleRow;

// src/components/MobilePageLayout.tsx
import React26, { useState as useState37 } from "react";

// src/images/icons/ThreeBarsIcon.svg
var ThreeBarsIcon_default = "./ThreeBarsIcon-KPCBSQNX.svg";

// src/components/MobileSideBar.tsx
import { Stack as Stack41 } from "@mui/system";

// src/images/icons/VersionsIcon.svg
var VersionsIcon_default = "./VersionsIcon-WVOYU2VC.svg";

// src/components/MobileSideBar.tsx
import { useNavigate as useNavigate5 } from "react-router-dom";
var PAGE_ICONS = {
  profiles: PeopleIcon_default,
  filters: FilterIcon_default,
  content: BookIcon_default,
  lessons: VersionsIcon_default,
  account: VersionsIcon_default
};
var PAGE_ROUTES = {
  profiles: "profiles",
  filters: "filters",
  content: "folders",
  lessons: "lessons",
  account: "account"
};
var PAGE_DISPLAY_NAMES = {
  profiles: "Kids",
  filters: "Filters",
  content: "Content",
  lessons: "Lessons",
  account: "Account"
};
var MobileSideBar = (props) => {
  const navigate = useNavigate5();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Stack41,
    {
      position: "absolute",
      bgcolor: "rgba(0,0,0,0.2)",
      width: "100%",
      height: "100%",
      onClick: props.onClose,
      sx: {
        pointerEvents: props.open ? void 0 : "none",
        opacity: props.open ? 1 : 0,
        transition: "0.5s",
        backdropFilter: "blur(2px)"
      },
      zIndex: 999
    }
  ), /* @__PURE__ */ React.createElement(
    Stack41,
    {
      position: "absolute",
      spacing: "32px",
      height: "100%",
      width: "272px",
      bgcolor: "rgb(255,255,255)",
      px: "28px",
      py: "56px",
      boxSizing: "border-box",
      sx: {
        transform: `translateX(${props.open ? 0 : "-100%"})`,
        transition: "0.5s"
      },
      zIndex: 1e3
    },
    /* @__PURE__ */ React.createElement(
      Stack41,
      {
        direction: "row",
        alignItems: "center",
        justifyContent: "space-between"
      },
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: "https://ursorassets.s3.eu-west-1.amazonaws.com/astroLogo!.png",
          height: 20,
          width: 59,
          alt: "astro"
        }
      ),
      /* @__PURE__ */ React.createElement(Stack41, { onClick: props.onClose }, /* @__PURE__ */ React.createElement(X_default, { height: "28px", width: "28px" }))
    ),
    /* @__PURE__ */ React.createElement(Stack41, { justifyContent: "space-between", height: "100%" }, /* @__PURE__ */ React.createElement(Stack41, { spacing: "24px" }, ["profiles", "filters", "content"].map((page) => {
      const Icon = PAGE_ICONS[page];
      return /* @__PURE__ */ React.createElement(
        Stack41,
        {
          key: page,
          direction: "row",
          spacing: "12px",
          alignItems: "center",
          sx: {
            cursor: "pointer",
            "&:hover": { opacity: 0.7 },
            transition: "0.2s",
            svg: {
              path: {
                fill: props.selectedPage === page ? PALETTE.secondary.purple[2] : PALETTE.primary.navy
              }
            }
          },
          onClick: () => navigate(`/${PAGE_ROUTES[page]}`)
        },
        /* @__PURE__ */ React.createElement(Icon, { height: "28px", width: "28px" }),
        /* @__PURE__ */ React.createElement(
          Typography,
          {
            bold: true,
            color: props.selectedPage === page ? PALETTE.secondary.purple[2] : PALETTE.primary.navy
          },
          PAGE_DISPLAY_NAMES[page]
        )
      );
    })), /* @__PURE__ */ React.createElement(
      Stack41,
      {
        direction: "row",
        spacing: "12px",
        alignItems: "center",
        onClick: () => navigate(`/${PAGE_ROUTES["account"]}`),
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
          transition: "0.2s"
        }
      },
      /* @__PURE__ */ React.createElement(UserInitialsCircle, { size: 32, fontSize: 12, name: "Mario Super" }),
      /* @__PURE__ */ React.createElement(
        Typography,
        {
          bold: true,
          color: props.selectedPage === "account" ? PALETTE.secondary.purple[2] : PALETTE.primary.navy
        },
        "Account"
      )
    ))
  ));
};
var MobileSideBar_default = MobileSideBar;

// src/components/MobilePageLayout.tsx
var MobilePageLayout = (props) => {
  const [sideBarOpen, setSideBarOpen] = useState37(false);
  return /* @__PURE__ */ React26.createElement(React26.Fragment, null, /* @__PURE__ */ React26.createElement(
    Stack42,
    {
      height: "100%",
      width: "100%",
      overflow: "scroll",
      px: "12px",
      py: "24px",
      boxSizing: "border-box"
    },
    props.header ? /* @__PURE__ */ React26.createElement(Stack42, { pb: "24px" }, props.header) : null,
    /* @__PURE__ */ React26.createElement(Stack42, { pb: "24px", spacing: "4px" }, /* @__PURE__ */ React26.createElement(
      Stack42,
      {
        justifyContent: "space-between",
        alignItems: "center",
        direction: "row"
      },
      /* @__PURE__ */ React26.createElement(Stack42, { direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React26.createElement(Stack42, { onClick: () => setSideBarOpen(true) }, /* @__PURE__ */ React26.createElement(ThreeBarsIcon_default, { height: "20px", width: "20px" })), props.titleBackButtonCallback ? /* @__PURE__ */ React26.createElement(Stack42, { width: "25px" }, /* @__PURE__ */ React26.createElement(
        Stack42,
        {
          sx: {
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s"
          },
          onClick: props.titleBackButtonCallback,
          justifyContent: "center"
        },
        /* @__PURE__ */ React26.createElement(ChevronLeftIcon_default, { height: "24px", width: "24px" })
      )) : null, props.title ? /* @__PURE__ */ React26.createElement(Typography, { bold: true, variant: "medium" }, props.title) : null, props.titleRow ? /* @__PURE__ */ React26.createElement(MobileTitleRow_default, { item: props.titleRow }) : null),
      props.topRightElement,
      props.actions ? /* @__PURE__ */ React26.createElement(
        UrsorActionButton,
        {
          actions: props.actions,
          iconSize: "14px",
          size: "32px",
          background: "transparent",
          border: true
        }
      ) : null
    ), props.info ? /* @__PURE__ */ React26.createElement(InfoButton_default, { ...props.info }) : null),
    props.children
  ), /* @__PURE__ */ React26.createElement(
    MobileSideBar_default,
    {
      selectedPage: props.selectedPage,
      open: sideBarOpen,
      onClose: () => setSideBarOpen(false)
    }
  ));
};
var MobilePageLayout_default = MobilePageLayout;

// src/account/components/MobileAccountPageHeader.tsx
import React27 from "react";
import { Stack as Stack43 } from "@mui/system";
var MobileAccountPageHeader = (props) => /* @__PURE__ */ React27.createElement(
  Stack43,
  {
    minHeight: props.isMobile ? "107px" : "71px",
    direction: "row",
    alignItems: "space-between",
    sx: {
      background: VIBRANT_GRADIENT
    },
    borderRadius: "12px",
    overflow: "hidden",
    spacing: props.smallerFont || props.isMobile ? "12px" : void 0,
    width: "100%"
  },
  /* @__PURE__ */ React27.createElement(Stack43, { spacing: "16px", direction: "column", p: "12px", boxSizing: "border-box" }, /* @__PURE__ */ React27.createElement(Typography, { bold: true, color: "rgb(255,255,255)" }, "Upgrade to a Family or School account to get unlimited access!"), /* @__PURE__ */ React27.createElement(
    UrsorButton,
    {
      dark: true,
      endIcon: VerifiedIcon_default,
      iconSize: 15,
      size: "small",
      backgroundColor: "rgb(255,255,255)",
      fontColor: PALETTE.primary.navy,
      hoverOpacity: 0.7,
      onClick: props.setUpgradeDialogOpen
    },
    "Upgrade"
  )),
  /* @__PURE__ */ React27.createElement(Stack43, { justifyContent: "flex-end", alignItems: "flex-end" }, /* @__PURE__ */ React27.createElement(
    "img",
    {
      src: "https://ursorassets.s3.eu-west-1.amazonaws.com/ELLIPSE!.png",
      height: 95,
      width: 84,
      alt: "upgrade"
    }
  ))
);
var MobileAccountPageHeader_default = MobileAccountPageHeader;

// src/account/contents/body-mobile.tsx
var AccountPageMobileBody = (props) => /* @__PURE__ */ React.createElement(
  MobilePageLayout_default,
  {
    title: "My Account",
    selectedPage: "account",
    topRightElement: /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        size: "small",
        dark: true,
        variant: "tertiary",
        onClick: () => null,
        endIcon: LogOutIcon_default,
        iconSize: 16
      },
      "Log out"
    ),
    header: /* @__PURE__ */ React.createElement(
      MobileAccountPageHeader_default,
      {
        setUpgradeDialogOpen: props.setUpgradeDialogOpen
      }
    )
  },
  /* @__PURE__ */ React.createElement(Stack44, { spacing: "12px" }, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: "My profile",
      notCollapsible: true,
      topRightStuff: /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          size: "small",
          variant: "secondary",
          onClick: props.setEditDialogOpen,
          endIcon: Pencil_default,
          iconSize: 13
        },
        "Edit"
      ),
      isMobile: true
    },
    /* @__PURE__ */ React.createElement(Stack44, { direction: "row", spacing: "20px", flex: 1 }, /* @__PURE__ */ React.createElement(
      UserInitialsCircle,
      {
        name: props.user.realName ?? "",
        size: 50,
        fontSize: 18
      }
    ), /* @__PURE__ */ React.createElement(Stack44, { direction: "row", spacing: "26px", minWidth: "400px" }, /* @__PURE__ */ React.createElement(Stack44, { width: "100%", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Stack44, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        variant: "tiny",
        bold: true,
        color: PALETTE.secondary.grey[3]
      },
      "Name"
    ), /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.user.realName)), /* @__PURE__ */ React.createElement(Stack44, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        variant: "tiny",
        bold: true,
        color: PALETTE.secondary.grey[3]
      },
      "Nickname"
    ), /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.user.displayName)), /* @__PURE__ */ React.createElement(Stack44, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        variant: "tiny",
        bold: true,
        color: PALETTE.secondary.grey[3]
      },
      "Email"
    ), /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.user.email)))))
  ), /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: "My plan",
      notCollapsible: true,
      topRightStuff: /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          size: "small",
          variant: "secondary",
          onClick: props.onManagePlan,
          endIcon: ChevronRight_default,
          iconSize: 14
        },
        "Manage plan"
      ),
      isMobile: true
    },
    /* @__PURE__ */ React.createElement(
      Stack44,
      {
        borderRadius: "12px",
        sx: {
          background: VIBRANT_GRADIENT
        },
        justifyContent: "space-between",
        p: "20px",
        flex: 1
      },
      /* @__PURE__ */ React.createElement(
        Stack44,
        {
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between"
        },
        /* @__PURE__ */ React.createElement(Typography, { variant: "large", bold: true, color: "rgb(255,255,255)" }, PLAN_DISPLAY_NAMES[props.planState]),
        props.planState !== "troomi" ? /* @__PURE__ */ React.createElement(
          UrsorButton,
          {
            dark: true,
            endIcon: VerifiedIcon_default,
            size: "small",
            backgroundColor: "rgb(255,255,255)",
            fontColor: PALETTE.primary.navy,
            hoverOpacity: 0.7,
            onClick: props.setUpgradeDialogOpen,
            iconSize: 16
          },
          "Upgrade"
        ) : null
      ),
      /* @__PURE__ */ React.createElement(Stack44, { pt: "12px", direction: "row", alignItems: "center", spacing: "24px" }, /* @__PURE__ */ React.createElement(Stack44, { flex: 1 }, PLAN_BANNER_ITEMS[props.planState].map((item, i) => /* @__PURE__ */ React.createElement(
        Stack44,
        {
          key: i,
          direction: "row",
          spacing: "8px",
          alignItems: "center",
          sx: {
            svg: {
              path: {
                fill: "rgb(255,255,255)"
              }
            }
          }
        },
        /* @__PURE__ */ React.createElement(item.icon, { height: "12px", width: "12px" }),
        /* @__PURE__ */ React.createElement(Typography, { variant: "small", color: "rgb(255,255,255)" }, item.text)
      ))))
    )
  ), /* @__PURE__ */ React.createElement(AstroBentoCard, { title: "Users in my space", notCollapsible: true, isMobile: true }, /* @__PURE__ */ React.createElement(Stack44, { spacing: "12px" }, /* @__PURE__ */ React.createElement(Stack44, { direction: "row", spacing: "12px" }, /* @__PURE__ */ React.createElement(
    UrsorButton,
    {
      endIcon: PersonIcon_default,
      size: "small",
      variant: "secondary",
      iconSize: 16,
      onClick: props.setInviteDialogOpen,
      width: "100%"
    },
    "Add an adult"
  ), /* @__PURE__ */ React.createElement(
    UrsorButton,
    {
      endIcon: PhoneIcon_default,
      size: "small",
      variant: "secondary",
      iconSize: 16,
      onClick: props.setConnectDialogOpen,
      width: "100%"
    },
    "Add a Device"
  )), /* @__PURE__ */ React.createElement(UsersTable_default, { users: props.allUsers }), /* @__PURE__ */ React.createElement(DevicesTable_default, null))), /* @__PURE__ */ React.createElement(AstroBentoCard, { title: "Boring bits", notCollapsible: true, isMobile: true }, /* @__PURE__ */ React.createElement(Stack44, { spacing: "6px" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      target: "_blank",
      href: "https://www.astrosafe.co/terms-and-conditions",
      style: {
        textDecoration: "none"
      }
    },
    /* @__PURE__ */ React.createElement(
      Stack44,
      {
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s"
        }
      },
      /* @__PURE__ */ React.createElement(Typography, { color: PALETTE.secondary.blue[3] }, "Terms & Conditions")
    )
  ), /* @__PURE__ */ React.createElement(
    "a",
    {
      target: "_blank",
      href: "https://www.astrosafe.co/app/privacy-policy",
      style: {
        textDecoration: "none"
      }
    },
    /* @__PURE__ */ React.createElement(
      Stack44,
      {
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s"
        }
      },
      /* @__PURE__ */ React.createElement(Typography, { color: PALETTE.secondary.blue[3] }, "Privacy policy")
    )
  ))), /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: "Feedback",
      notCollapsible: true,
      topRightStuff: /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          variant: "secondary",
          size: "small",
          onClick: () => window.open("mailto:hello@astrosafe.co")
        },
        "Send"
      ),
      isMobile: true
    },
    /* @__PURE__ */ React.createElement(Typography, null, `We"d love to hear your thoughts! Please send us through any ideas you have about the app, or let us know if you encounter any bugs or hiccups!`)
  ))
);
var body_mobile_default = AccountPageMobileBody;

// src/account/components/TroomiManagePlanDialog.tsx
import React28 from "react";
import { Stack as Stack45 } from "@mui/system";
var TroomiManagePlanDialog = (props) => {
  return /* @__PURE__ */ React28.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      button: {
        text: "Got it",
        callback: props.onClose
      },
      title: "Contact us",
      subtitle: [
        "Please email hello@astrosafe.co if you want to update or change your AstroSafe subscription which comes with your Troomi plan."
      ],
      width: "482px",
      dynamicHeight: true,
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React28.createElement(Stack45, null)
  );
};
var TroomiManagePlanDialog_default = TroomiManagePlanDialog;

// src/account/contents/common.tsx
var DUMMY_USER_ID = 1;
var VIBRANT_GRADIENT = `linear-gradient(0, ${PALETTE.secondary.blue[2]}, ${PALETTE.secondary.purple[2]})`;
var PLAN_DISPLAY_NAMES = {
  freeTrial: "Free trial",
  troomi: "Troomi Plan"
};
var PLAN_BANNER_ITEMS = {
  freeTrial: [
    {
      icon: PhoneIcon_default,
      text: "Connect unlimited Devices"
    },
    {
      icon: PeopleIcon_default,
      text: "Add unlimited parents or teachers"
    },
    {
      icon: ClockIcon_default,
      text: "X days left"
    }
  ],
  troomi: [
    {
      icon: PhoneIcon_default,
      text: "Connect up to 10 Devices"
    },
    {
      icon: PeopleIcon_default,
      text: "Add unlimited parents or teachers"
    }
  ]
};
var getInitials = (name) => {
  var _a;
  return (_a = name == null ? void 0 : name.split(" ").map((x) => _11.capitalize(x)[0])) == null ? void 0 : _a.slice(0, 2).join("");
};
var UserInitialsCircle = (props) => /* @__PURE__ */ React.createElement(
  Stack46,
  {
    height: `${props.size || 132}px`,
    width: `${props.size || 132}px`,
    minHeight: `${props.size || 132}px`,
    minWidth: `${props.size || 132}px`,
    bgcolor: PALETTE.secondary.blue[2],
    borderRadius: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "h2",
      color: "rgb(255,255,255)",
      sx: props.fontSize ? { fontSize: props.fontSize } : void 0
    },
    props.name ? getInitials(props.name) : ""
  )
);
var AccountPage = (props) => {
  const { user } = useAuth_default();
  const [planState, setPlanState] = useState38("troomi");
  const [editDialogOpen, setEditDialogOpen] = useState38(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState38(false);
  const [connectDialogOpen, setConnectDialogOpen] = useState38(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState38(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState38(false);
  const [allUsers, setAllUsers] = useState38([]);
  const loadUsers = useCallback2(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupUsers(user.group_id).then(setAllUsers);
  }, [user == null ? void 0 : user.group_id]);
  useEffect22(() => {
    loadUsers();
  }, [loadUsers]);
  const [currentUser, setCurrentUser] = useState38();
  useEffect22(() => {
    (user == null ? void 0 : user.user_id) && setCurrentUser(allUsers.find((u) => u.id === user.user_id));
  }, [user == null ? void 0 : user.user_id, allUsers]);
  const [troomiManagePlanDialogOpen, setTroomiManagePlanDialogOpen] = useState38(false);
  const MANAGE_PLAN_CALLBACKS = {
    freeTrial: () => null,
    troomi: () => setTroomiManagePlanDialogOpen(true)
  };
  const notificationCtx = useContext4(NotificationContext_default);
  return currentUser ? /* @__PURE__ */ React.createElement(React.Fragment, null, props.isMobile ? /* @__PURE__ */ React.createElement(
    body_mobile_default,
    {
      user: currentUser,
      allUsers,
      planState,
      setUpgradeDialogOpen: () => setUpgradeDialogOpen(true),
      setEditDialogOpen: () => setEditDialogOpen(true),
      setInviteDialogOpen: () => setInviteDialogOpen(true),
      setConnectDialogOpen: () => setConnectDialogOpen(true),
      onManagePlan: () => MANAGE_PLAN_CALLBACKS[planState]()
    }
  ) : /* @__PURE__ */ React.createElement(
    body_desktop_default,
    {
      user: currentUser,
      allUsers,
      planState,
      setUpgradeDialogOpen: () => setUpgradeDialogOpen(true),
      setEditDialogOpen: () => setEditDialogOpen(true),
      setInviteDialogOpen: () => setInviteDialogOpen(true),
      setConnectDialogOpen: () => setConnectDialogOpen(true),
      onManagePlan: () => MANAGE_PLAN_CALLBACKS[planState]()
    }
  ), /* @__PURE__ */ React.createElement(
    EditProfileDialog_default,
    {
      open: editDialogOpen,
      onClose: () => setEditDialogOpen(false),
      name: currentUser.realName,
      nickName: currentUser.displayName,
      onSave: (name, nickname) => api_default.updateUser(DUMMY_USER_ID, name, nickname).then(() => notificationCtx.success("Updated your details")).then(loadUsers).then(() => setEditDialogOpen(false)),
      isMobile: props.isMobile
    }
  ), /* @__PURE__ */ React.createElement(
    InviteDialog_default,
    {
      open: inviteDialogOpen,
      onClose: () => setInviteDialogOpen(false),
      onSubmit: (email) => api_default.createUser(email).then(loadUsers)
    }
  ), /* @__PURE__ */ React.createElement(
    DeviceConnectDialog_default,
    {
      open: connectDialogOpen,
      onClose: () => setConnectDialogOpen(false),
      onOpen: () => {
        setDownloadDialogOpen(true);
        setConnectDialogOpen(false);
      }
    }
  ), /* @__PURE__ */ React.createElement(
    DownloadDialog_default,
    {
      open: downloadDialogOpen,
      onClose: () => setDownloadDialogOpen(false)
    }
  ), /* @__PURE__ */ React.createElement(
    UpgradeDialog_default,
    {
      open: upgradeDialogOpen,
      closeCallback: () => setUpgradeDialogOpen(false)
    }
  ), /* @__PURE__ */ React.createElement(
    TroomiManagePlanDialog_default,
    {
      open: troomiManagePlanDialogOpen,
      onClose: () => setTroomiManagePlanDialogOpen(false),
      isMobile: props.isMobile
    }
  )) : /* @__PURE__ */ React.createElement(React.Fragment, null);
};
var common_default = AccountPage;

// src/layout.tsx
import { Stack as Stack48 } from "@mui/system";

// src/components/NotificationProvider.tsx
import React29, { useEffect as useEffect23, useState as useState39 } from "react";
function NotificationProvider(props) {
  const [type, setType] = useState39(null);
  const [message, setMessage] = useState39(null);
  const success = (text) => {
    window.scroll(0, 0);
    setMessage(text);
    setType("s uccess");
  };
  const negativeSuccess = (text) => {
    window.scroll(0, 0);
    setMessage(text);
    setType("negativeSuccess");
  };
  const error = (text) => {
    if (process.env.REACT_APP_BUILD_ENV !== "prod") {
      window.scroll(0, 0);
      setMessage(text);
      setType("error");
    }
  };
  useEffect23(() => {
    message && setTimeout(() => setMessage(null), 2500);
  }, [message]);
  return /* @__PURE__ */ React29.createElement(
    NotificationContext_default.Provider,
    {
      value: {
        message,
        type,
        success,
        negativeSuccess,
        error
      }
    },
    props.children
  );
}

// src/components/UrsorNotificationBar.tsx
import * as React30 from "react";
import { Stack as Stack47 } from "@mui/material";
import { useContext as useContext5 } from "react";
import { isMobile } from "react-device-detect";
var HEIGHT4 = "44px";
var WIDTH3 = "421px";
var DURATION = 2e3;
var TOP_PADDING = "31px";
var COLORS = {
  error: PALETTE.system.red,
  success: PALETTE.secondary.purple[2],
  negativeSuccess: PALETTE.system.red
};
function UrsorNotificationBar(props) {
  const notificationCtx = useContext5(NotificationContext_default);
  const [visible, setVisible] = React30.useState(false);
  React30.useEffect(() => {
    if (notificationCtx.message) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, DURATION);
    }
  }, [notificationCtx.message]);
  return /* @__PURE__ */ React30.createElement(
    Stack47,
    {
      position: "absolute",
      left: 0,
      right: 0,
      margin: "auto auto",
      py: isMobile ? "8px" : 0,
      minHeight: HEIGHT4,
      width: WIDTH3,
      maxWidth: "calc(90% - 28px)",
      bgcolor: notificationCtx.type && notificationCtx.message ? COLORS[notificationCtx.type] : "transparent",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999999,
      borderRadius: "12px",
      top: visible ? TOP_PADDING : `-${HEIGHT4}`,
      sx: { transition: "0.5s", willChange: "transform" }
    },
    /* @__PURE__ */ React30.createElement(
      Stack47,
      {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      },
      /* @__PURE__ */ React30.createElement(
        Typography,
        {
          bold: true,
          color: PALETTE.font.light,
          sx: { textAlign: "center" }
        },
        notificationCtx.type === "error" ? `Technical Error: ${notificationCtx.message}` : notificationCtx.message
      )
    )
  );
}

// src/layout.tsx
function RootLayout({
  children
}) {
  return /* @__PURE__ */ React.createElement("html", { lang: "en", style: { zIndex: 999999999999 } }, /* @__PURE__ */ React.createElement("meta", { name: "theme-color", content: PALETTE.secondary.purple[2] }), /* @__PURE__ */ React.createElement(
    "body",
    {
      className: "__className_5c20f6",
      style: {
        margin: 0,
        overflow: "hidden"
      }
    },
    /* @__PURE__ */ React.createElement(
      Stack48,
      {
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        width: "100vw",
        position: "relative",
        bgcolor: PALETTE.secondary.purple[2]
      },
      /* @__PURE__ */ React.createElement(NotificationProvider, null, /* @__PURE__ */ React.createElement(Stack48, { width: "100%", justifyContent: "center", zIndex: 999999999 }, /* @__PURE__ */ React.createElement(UrsorNotificationBar, null)), children)
    )
  ));
}

// src/account/index.tsx
var Account = () => {
  return /* @__PURE__ */ React31.createElement(RootLayout, null, /* @__PURE__ */ React31.createElement(common_default, { isMobile: isMobile2 }));
};
var account_default = Account;

// src/channel/index.tsx
import React43 from "react";
import { isMobile as isMobile4 } from "react-device-detect";

// src/channel/contents/common.tsx
import React42, { useContext as useContext12, useEffect as useEffect39 } from "react";
import { useNavigate as useNavigate12 } from "react-router-dom";
import { useCallback as useCallback7, useState as useState61 } from "react";

// src/images/icons/TrashcanIcon.svg
var TrashcanIcon_default = "./TrashcanIcon-GDIRSPRM.svg";

// src/channel/contents/body-desktop.tsx
import React39 from "react";
import { Stack as Stack71 } from "@mui/system";

// src/components/DynamicCardGrid.tsx
import React32 from "react";
var DynamicCardGrid = (props) => {
  return /* @__PURE__ */ React32.createElement(
    "div",
    {
      style: {
        display: "grid",
        width: "100%",
        gridTemplateColumns: `repeat(auto-fill, minmax(${props.cardWidth}, 1fr))`,
        columnGap: props.columnGap,
        rowGap: props.rowGap,
        paddingRight: props.paddingRight
      }
    },
    props.children
  );
};
var DynamicCardGrid_default = DynamicCardGrid;

// src/folder/components/VideoCard.tsx
import { Stack as Stack69 } from "@mui/system";

// src/images/play.svg
var play_default = "./play-3YLE3PKV.svg";

// src/folder/components/ContentCard.tsx
import { Stack as Stack68 } from "@mui/system";

// src/folder/contents/common.tsx
import React38, { useCallback as useCallback6, useContext as useContext11, useEffect as useEffect37, useState as useState58 } from "react";

// src/images/icons/CirclePlay.svg
var CirclePlay_default = "./CirclePlay-NJRUSAOB.svg";

// src/images/icons/LinkIcon.svg
var LinkIcon_default = "./LinkIcon-OZ2WJ36F.svg";

// src/images/icons/VideoCameraIcon.svg
var VideoCameraIcon_default = "./VideoCameraIcon-CDSS5VQP.svg";

// src/folder/contents/common.tsx
import _15 from "lodash";
import { useNavigate as useNavigate10 } from "react-router-dom";

// src/folder/components/AddDeviceDialog.tsx
import { Stack as Stack49 } from "@mui/system";
import { useEffect as useEffect25, useState as useState41 } from "react";
var AddDeviceDialog = (props) => {
  const [searchValue, setSearchValue] = useState41("");
  const [allDevices, setAllDevices] = useState41([]);
  useEffect25(() => {
    props.groupId && api_default.getGroupEnrichedDevices(props.groupId).then(
      (d) => setAllDevices(d)
    );
  }, [props.groupId]);
  const [nonAddedDevices, setNonAddedDevices] = useState41([]);
  useEffect25(
    () => setNonAddedDevices(
      allDevices.filter(
        (d) => !props.addedDevices.find((device) => device.id === d.id)
      )
    ),
    [allDevices, props.addedDevices]
  );
  const [filteredDevices, setFilteredDevices] = useState41([]);
  useEffect25(
    () => setFilteredDevices(
      nonAddedDevices.filter(
        (d) => !searchValue || d.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    [nonAddedDevices, searchValue]
  );
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: props.title,
      subtitle: props.subtitle,
      width: "434px",
      height: props.isMobile ? "76%" : void 0,
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(
      SearchInput,
      {
        value: searchValue,
        callback: setSearchValue,
        clearCallback: () => setSearchValue(""),
        fullWidth: true,
        iconSize: "18px",
        grey: true
      }
    ),
    nonAddedDevices.length === 0 ? /* @__PURE__ */ React.createElement(Stack49, { flex: 1, justifyContent: "center", width: "66%" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        color: PALETTE.secondary.grey[3],
        bold: true,
        sx: { textAlign: "center" }
      },
      props.emptyText
    )) : /* @__PURE__ */ React.createElement(Stack49, { pt: "16px", spacing: "16px", width: "100%" }, filteredDevices.map((d) => /* @__PURE__ */ React.createElement(
      Stack49,
      {
        key: d.id,
        direction: "row",
        spacing: "8px",
        px: "8px",
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.7 }
        },
        onClick: () => props.onAdd(d.id)
      },
      /* @__PURE__ */ React.createElement(
        Stack49,
        {
          borderRadius: "100%",
          overflow: "hidden",
          minWidth: 23,
          minHeight: 23,
          bgcolor: PALETTE.secondary.blue[2]
        },
        d.profileAvatarUrl ? /* @__PURE__ */ React.createElement(
          "img",
          {
            src: d.profileAvatarUrl,
            height: 23,
            width: 23,
            alt: "avatar"
          }
        ) : null
      ),
      /* @__PURE__ */ React.createElement(Typography, { maxLines: 1, bold: true }, d.name)
    )))
  );
};
var AddDeviceDialog_default = AddDeviceDialog;

// src/folder/components/ChannelCreationDialog.tsx
import { Stack as Stack53 } from "@mui/system";

// src/folder/components/ContentCreationDialog.tsx
import React33 from "react";
import { Stack as Stack50 } from "@mui/system";
import { isMobile as isMobile3 } from "react-device-detect";
function ContentCreationDialog(props) {
  return /* @__PURE__ */ React33.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.closeCallback,
      title: `${props.editing ? "Edit" : "Add a"} ${CONTENT_DISPLAY_NAMES[props.type]}`,
      info: props.info,
      dynamicHeight: true,
      maxWidth: "780px",
      isMobile: isMobile3
    },
    /* @__PURE__ */ React33.createElement(
      Stack50,
      {
        boxSizing: "border-box",
        flex: 1,
        width: "100%",
        alignItems: "center",
        spacing: "24px"
      },
      /* @__PURE__ */ React33.createElement(
        Stack50,
        {
          direction: isMobile3 ? "column" : "row",
          width: "100%",
          height: "100%",
          spacing: "32px",
          justifyContent: "space-between"
        },
        /* @__PURE__ */ React33.createElement(Stack50, { flex: 1, spacing: "20px", overflow: "hidden" }, /* @__PURE__ */ React33.createElement(LabeledInputField, { label: "URL" }, /* @__PURE__ */ React33.createElement(
          UrsorInputField,
          {
            value: props.url,
            placeholder: "Set a URL",
            onChange: (event) => {
              props.setUrl(event.target.value);
            },
            leftAlign: true,
            width: "100%",
            onBlur: props.onUrlFieldBlur
          }
        )), /* @__PURE__ */ React33.createElement(LabeledInputField, { label: "Title" }, /* @__PURE__ */ React33.createElement(
          UrsorInputField,
          {
            value: props.title,
            placeholder: "Set a title",
            onChange: (event) => {
              props.setTitle(event.target.value);
            },
            leftAlign: true,
            width: "100%"
          }
        )), props.extraBottomElement ? /* @__PURE__ */ React33.createElement(Stack50, null, /* @__PURE__ */ React33.createElement(Stack50, { height: "20px" }, /* @__PURE__ */ React33.createElement(
          Stack50,
          {
            height: "2px",
            width: "100%",
            bgcolor: PALETTE.secondary.grey[2]
          }
        )), props.extraBottomElement) : null),
        !isMobile3 ? /* @__PURE__ */ React33.createElement(Stack50, { width: "1px", bgcolor: PALETTE.secondary.grey[2] }) : null,
        /* @__PURE__ */ React33.createElement(Stack50, { width: isMobile3 ? "100%" : "299px" }, props.children)
      ),
      /* @__PURE__ */ React33.createElement(
        UrsorButton,
        {
          width: isMobile3 ? "100%" : "358px",
          dark: true,
          variant: "tertiary",
          onClick: props.onSubmit,
          disabled: props.buttonDisabled || !props.title || !props.url
        },
        props.editing ? "s ave changes" : `Add ${CONTENT_DISPLAY_NAMES[props.type]}`
      )
    )
  );
}

// src/folder/components/ChannelCreationDialog.tsx
import { useContext as useContext7, useEffect as useEffect27, useState as useState43 } from "react";

// src/folder/components/ChannelCard.tsx
import { Stack as Stack51 } from "@mui/system";
import { useNavigate as useNavigate6 } from "react-router-dom";
var IMAGE_HEIGHT = 160;
var ChannelCard = (props) => {
  const navigate = useNavigate6();
  return /* @__PURE__ */ React.createElement(
    ContentCard_default,
    {
      type: "channel",
      title: props.title,
      onClick: props.noPointerEvents ? void 0 : () => navigate(`/channel/${props.id}`),
      noPointerEvents: props.noPointerEvents,
      noMenu: props.noMenu,
      onDelete: () => props.id && api_default.deleteChannel(props.id).then(props.onDelete),
      onOpenEditingDialog: () => {
        var _a;
        return (_a = props.onOpenEditingDialog) == null ? void 0 : _a.call(props);
      },
      isMobile: props.isMobile,
      twoLineTitleSectionHeight: props.twoLineTitleSectionHeight
    },
    /* @__PURE__ */ React.createElement(
      Stack51,
      {
        height: IMAGE_HEIGHT,
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 0 4px rgba(0,0,0,0.08)"
      },
      props.bannerUrl ? /* @__PURE__ */ React.createElement(
        "img",
        {
          src: props.bannerUrl,
          style: {
            objectFit: "cover",
            justifyContent: "center",
            alignItems: "center"
          },
          fill: true,
          alt: "banner image"
        }
      ) : /* @__PURE__ */ React.createElement(Stack51, { flex: 1, bgcolor: PALETTE.secondary.grey[2] }),
      props.profileUrl ? /* @__PURE__ */ React.createElement(
        Stack51,
        {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center"
        },
        /* @__PURE__ */ React.createElement(
          Stack51,
          {
            height: "72px",
            width: "72px",
            borderRadius: "100%",
            overflow: "hidden",
            border: "3px solid rgb(255,255,255)",
            position: "relative",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)"
          },
          props.profileUrl ? /* @__PURE__ */ React.createElement(
            "img",
            {
              src: props.profileUrl,
              style: {
                objectFit: "cover",
                justifyContent: "center",
                alignItems: "center"
              },
              fill: true,
              alt: "profile image"
            }
          ) : /* @__PURE__ */ React.createElement(Stack51, { flex: 1, bgcolor: PALETTE.secondary.grey[3] })
        )
      ) : null
    )
  );
};
var ChannelCard_default = ChannelCard;

// src/images/icons/CheckboxIcon.svg
var CheckboxIcon_default = "./CheckboxIcon-VS5YLD25.svg";

// src/images/icons/EmptyCheckboxIcon.svg
var EmptyCheckboxIcon_default = "./EmptyCheckboxIcon-63Z6LTYM.svg";

// src/profile/components/ProfilePageTabLayout.tsx
import React34 from "react";
import { Stack as Stack52 } from "@mui/system";
var INFOS = {
  folders: {
    title: "What are Content Folders?",
    text: "A Folder is a collection of Links, Videos, and Video Channels that can be assigned to Devices. Once assigned to the Device they will be discover this Content from their homepage. Please note that the Folder will override the Filters and allow access to the sites you add to make it easy to share Content with your kids without worrying about Filter settings."
  },
  folderDevice: {
    title: "What happens when I add a Device?",
    text: "By adding a Device to a Content Folder all of the Content will appear on the Device's homepage and will be accessible on their Device. You won't have to worry about configuring the Filter to access the Content!"
  },
  filters: {
    title: "How does a Filter work?",
    text: "A Filter is a set of rules to keep your Device safe. Toggle on the Categories you want to be accessible and we'll take care of the rest. If you want to handle websites more specifically you can add them to the Allow list or Block list. This lets you create exceptions to your Categories. For example you might want to block social media - but allow Facebook because your family uses it in a safe and appropriate environment. You can toggle off social media but add facebook.com to the Allow list. Similarly for the Block list you might want to specifically block sites that would otherwise be allowed. The Blocked Words apply only to search engines, to prevent certain terms being searched."
  },
  filterDevice: {
    title: "What happens when I add a Device?",
    text: "Add a Device to this Filter and the Device will follow the safety rules set out by this Filter. You can easily change this by adding it to another Filter."
  },
  addLink: {
    title: "How do I add a site?",
    text: "Copy and paste the URL of the site you want to add into the URL field. If the data is available we will automatically get the title and image for the page. But feel free to edit them!"
  },
  addVideo: {
    title: "How do I add a Safe Video?",
    text: "Copy and paste the URL of the YouTube video you want to add into the URL field. We will automatically get the video title and thumbnail for you and the Video will show up on the assigned Devices in a safe viewing portal without ads, recommendations, comments, or distractions."
  },
  addChannel: {
    title: "How do I add a Safe Video Channel?",
    text: "Copy and paste the URL of the YouTube channel you want to add into the URL field. We will automatically get the channel name and thumbnail image. Once a Channel is added all of the live videos on the Youtube channel will appear in the Channel folder on the Device. All of the new videos posted to the channel will appear too!"
  }
};
var ProfilePageTabLayout = (props) => /* @__PURE__ */ React34.createElement(Stack52, { flex: 1, spacing: "24px" }, /* @__PURE__ */ React34.createElement(Stack52, { spacing: "6px" }, /* @__PURE__ */ React34.createElement(Stack52, { direction: "row", justifyContent: "space-between", alignItems: "center" }, /* @__PURE__ */ React34.createElement(Stack52, { direction: "row", alignItems: "flex-end", spacing: "16px" }, /* @__PURE__ */ React34.createElement(Typography, { variant: "h5" }, props.title), !props.mobile ? /* @__PURE__ */ React34.createElement(Stack52, { sx: { transform: "translateY(1px)" } }, /* @__PURE__ */ React34.createElement(InfoButton_default, { ...props.info })) : null), props.rightSideElement), props.mobile ? /* @__PURE__ */ React34.createElement(InfoButton_default, { ...props.info }) : null), props.children);
var ProfilePageTabLayout_default = ProfilePageTabLayout;

// src/folder/components/ChannelCreationDialog.tsx
var ChannelCreationDialog = (props) => {
  const [title, setTitle] = useState43("");
  const [url, setUrl] = useState43("");
  const [profileUrl, setProfileUrl] = useState43("");
  const [bannerUrl, setBannerUrl] = useState43("");
  useEffect27(() => {
    var _a, _b, _c, _d;
    props.updateDetails && setTitle((_a = props.updateDetails) == null ? void 0 : _a.channel.title);
    props.updateDetails && setUrl((_b = props.updateDetails) == null ? void 0 : _b.channel.url);
    props.updateDetails && setProfileUrl((_c = props.updateDetails) == null ? void 0 : _c.channel.profileUrl);
    props.updateDetails && setBannerUrl((_d = props.updateDetails) == null ? void 0 : _d.channel.bannerUrl);
  }, [props.updateDetails]);
  const notificationCtx = useContext7(NotificationContext_default);
  const submitCreation = () => api_default.createChannel(
    title,
    getAbsoluteUrl(cleanUrl(url)),
    bannerUrl,
    profileUrl,
    props.folderId
  ).then(props.creationCallback);
  const submitUpdate = () => {
    var _a, _b;
    return ((_a = props.updateDetails) == null ? void 0 : _a.channel.id) && api_default.updateChannel(
      props.updateDetails.channel.id,
      title,
      getAbsoluteUrl(cleanUrl(url)),
      bannerUrl,
      profileUrl
    ).then((_b = props.updateDetails) == null ? void 0 : _b.callback).then(() => notificationCtx.success("Updated Channel"));
  };
  const [checked, setChecked] = useState43(false);
  const [manuallyChangedTitle, setManuallyChangedTitle] = useState43(false);
  const loadPreview = () => {
    api_default.getChannelPreview(
      encodeURIComponent(getAbsoluteUrl(cleanUrl(url)))
    ).then((result) => {
      result.title && !manuallyChangedTitle && setTitle(result.title);
      result.bannerUrl && setBannerUrl(result.bannerUrl);
      result.profileUrl && setProfileUrl(result.profileUrl);
    }).catch(() => null);
  };
  return /* @__PURE__ */ React.createElement(
    ContentCreationDialog,
    {
      open: props.open,
      closeCallback: props.onClose,
      onSubmit: () => {
        var _a;
        (((_a = props.updateDetails) == null ? void 0 : _a.callback) ? submitUpdate : submitCreation)();
        props.onClose();
      },
      info: INFOS.addChannel,
      type: "channel",
      setTitle: (t) => {
        setTitle(t);
        setManuallyChangedTitle(true);
      },
      title,
      setUrl,
      url,
      onUrlFieldBlur: loadPreview,
      buttonDisabled: !checked && !props.updateDetails,
      editing: !!props.updateDetails,
      extraBottomElement: !props.updateDetails ? /* @__PURE__ */ React.createElement(Stack53, { direction: "row", spacing: "8px" }, /* @__PURE__ */ React.createElement(
        Stack53,
        {
          pt: "3px",
          sx: {
            cursor: "pointer",
            "&:hover": { opacity: 0.7 },
            transition: "0.2s",
            svg: {
              path: {
                fill: PALETTE.secondary.purple[2]
              }
            }
          },
          onClick: () => setChecked(!checked)
        },
        checked ? /* @__PURE__ */ React.createElement(CheckboxIcon_default, { width: "20px", height: "20px" }) : /* @__PURE__ */ React.createElement(EmptyCheckboxIcon_default, { width: "20px", height: "20px" })
      ), /* @__PURE__ */ React.createElement(Typography, { variant: "small", bold: true }, "I'm aware that I'm adding all Videos from this Channel to the Folder.")) : null
    },
    /* @__PURE__ */ React.createElement(
      Stack53,
      {
        sx: {
          pointerEvents: "none"
        }
      },
      /* @__PURE__ */ React.createElement(
        ChannelCard_default,
        {
          id: 0,
          title,
          url,
          profileUrl,
          bannerUrl,
          noPointerEvents: true,
          noMenu: true,
          twoLineTitleSectionHeight: true
        }
      )
    )
  );
};
var ChannelCreationDialog_default = ChannelCreationDialog;

// src/folder/components/FolderRenameDialog.tsx
import { Stack as Stack54 } from "@mui/system";
import { useEffect as useEffect28, useState as useState44 } from "react";
var FolderRenameDialog = (props) => {
  const [name, setName] = useState44("");
  useEffect28(() => setName(props.name), [props.name]);
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Rename Folder",
      width: "422px",
      height: "294px",
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(Stack54, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(LabeledInputField, { label: "Name" }, /* @__PURE__ */ React.createElement(
      UrsorInputField,
      {
        value: name,
        onChange: (event) => setName(event.target.value),
        placeholder: "Write a new name",
        width: "100%",
        leftAlign: true
      }
    )), /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        variant: "tertiary",
        width: "100%",
        onClick: () => {
          props.onSubmit(name);
          props.onClose();
        }
      },
      "Save"
    ))
  );
};
var FolderRenameDialog_default = FolderRenameDialog;

// src/folder/components/useLoadFolderAndContents.tsx
import { useCallback as useCallback4, useEffect as useEffect29, useState as useState45 } from "react";
import _12 from "lodash";
var useLoadFolderAndContents = (folderId) => {
  const [folder, setFolder] = useState45();
  const [contents, setContents] = useState45([]);
  const loadFolderAndContents = useCallback4(
    () => api_default.getFolder(folderId).then((f) => {
      setFolder(f);
      setContents(
        _12.sortBy(
          [
            ...f.links.map((l) => ({
              type: "link",
              content: l
            })),
            ...f.videos.map((v) => ({
              type: "video",
              content: v
            })),
            ...f.channels.map((c) => ({
              type: "channel",
              content: c
            }))
            // ...f.Lessons.map((l) => ({ type: "lesson", content: l })),
          ],
          (c) => c.content.createdAt
        )
      );
    }),
    [folderId]
  );
  useEffect29(() => {
    loadFolderAndContents();
  }, []);
  return { folder, contents, loadFolderAndContents };
};
var useLoadFolderAndContents_default = useLoadFolderAndContents;

// src/folder/components/VideoCreationDialog.tsx
import { Stack as Stack55 } from "@mui/system";
import { useContext as useContext8, useEffect as useEffect30, useState as useState46 } from "react";
var VideoCreationDialog = (props) => {
  const [title, setTitle] = useState46("");
  const [url, setUrl] = useState46("");
  const [thumbnailUrl, setThumbnailUrl] = useState46("");
  useEffect30(() => {
    var _a, _b, _c;
    props.updateDetails && setTitle((_a = props.updateDetails) == null ? void 0 : _a.video.title);
    props.updateDetails && setUrl((_b = props.updateDetails) == null ? void 0 : _b.video.url);
    props.updateDetails && setThumbnailUrl((_c = props.updateDetails) == null ? void 0 : _c.video.thumbnailUrl);
  }, [props.updateDetails]);
  const [manuallyChangedTitle, setManuallyChangedTitle] = useState46(false);
  const loadPreview = () => {
    api_default.getVideoPreview(
      encodeURIComponent(getAbsoluteUrl(cleanUrl(url)))
    ).then((result) => {
      result.title && !manuallyChangedTitle && setTitle(result.title);
      result.thumbnailUrl && setThumbnailUrl(result.thumbnailUrl);
    }).catch(() => null);
  };
  const notificationCtx = useContext8(NotificationContext_default);
  const submitCreation = () => api_default.createVideo(
    title,
    getAbsoluteUrl(cleanUrl(url)),
    thumbnailUrl,
    props.folderId
  ).then(props.creationCallback);
  const submitUpdate = () => {
    var _a, _b;
    return ((_a = props.updateDetails) == null ? void 0 : _a.video.id) && api_default.updateVideo(
      props.updateDetails.video.id,
      title,
      getAbsoluteUrl(cleanUrl(url)),
      !props.belongsToChannel ? props.folderId : void 0,
      props.belongsToChannel
      //thumbnailUrl
    ).then((_b = props.updateDetails) == null ? void 0 : _b.callback).then(() => notificationCtx.success("Updated Video"));
  };
  return /* @__PURE__ */ React.createElement(
    ContentCreationDialog,
    {
      open: props.open,
      closeCallback: () => {
        props.onClose();
      },
      onSubmit: () => {
        var _a;
        (((_a = props.updateDetails) == null ? void 0 : _a.callback) ? submitUpdate : submitCreation)();
        props.onClose();
      },
      info: INFOS.addVideo,
      type: "video",
      setTitle: (t) => {
        setTitle(t);
        setManuallyChangedTitle(true);
      },
      title,
      setUrl,
      url,
      editing: !!props.updateDetails,
      onUrlFieldBlur: loadPreview
    },
    /* @__PURE__ */ React.createElement(
      Stack55,
      {
        sx: {
          pointerEvents: "none"
        }
      },
      /* @__PURE__ */ React.createElement(
        VideoCard_default,
        {
          id: 0,
          title,
          url,
          thumbnailUrl,
          noPointerEvents: true,
          noMenu: true,
          twoLineTitleSectionHeight: true
        }
      )
    )
  );
};
var VideoCreationDialog_default = VideoCreationDialog;

// src/folder/contents/body-mobile.tsx
import { Stack as Stack63 } from "@mui/system";

// src/components/SortButton.tsx
import React36, { useState as useState48 } from "react";
import { Stack as Stack57 } from "@mui/system";

// src/components/UrsorSelectList.tsx
import React35, { useState as useState47 } from "react";
import { Stack as Stack56 } from "@mui/system";
function UrsorSelectList(props) {
  const [open, setOpen] = useState47(false);
  return /* @__PURE__ */ React35.createElement(Stack56, { spacing: "6px" }, props.items.map((item) => /* @__PURE__ */ React35.createElement(
    Stack56,
    {
      direction: "row",
      spacing: "8px",
      alignItems: "center",
      justifyContent: props.centerAlign ? "center" : void 0,
      key: item.id,
      onClick: () => {
        props.callback(item.id);
        !props.keepOpenOnSelect && setOpen(false);
      },
      sx: {
        opacity: props.selected.length === 0 || props.selected.includes(item.id) ? 1 : 0.5,
        "&:hover": {
          opacity: 1
        },
        transition: "0.2s",
        cursor: "pointer"
      }
    },
    item.icon,
    /* @__PURE__ */ React35.createElement(Typography, { variant: "small", bold: true }, item.value)
  )));
}

// src/components/SortButton.tsx
var SortButton = (props) => {
  const [open, setOpen] = useState48(false);
  return /* @__PURE__ */ React36.createElement(
    UrsorPopover,
    {
      open,
      content: /* @__PURE__ */ React36.createElement(
        UrsorSelectList,
        {
          selected: [props.selected],
          items: props.types.map((sortType) => ({
            id: sortType,
            value: props.displayNames[sortType]
          })),
          callback: (id) => {
            props.callback(id);
            setOpen(false);
          }
        }
      ),
      closeCallback: () => setOpen(false),
      placement: "right",
      disabled: props.disabled,
      buttonWidth: true
    },
    props.iconOnly ? /* @__PURE__ */ React36.createElement(
      Stack57,
      {
        height: "28px",
        width: "28px",
        borderRadius: "28px",
        justifyContent: "center",
        alignItems: "center"
      },
      /* @__PURE__ */ React36.createElement(FilterIcon_default, { height: "14px", width: "14px" })
    ) : /* @__PURE__ */ React36.createElement(
      UrsorButton,
      {
        size: "small",
        dark: true,
        endIcon: FilterIcon_default,
        onClick: () => setOpen(true),
        shadow: true,
        backgroundColor: "rgb(255,255,255)",
        fontColor: PALETTE.secondary.grey[5],
        iconColor: PALETTE.secondary.grey[5],
        iconSize: 16,
        hoverOpacity: 0.6,
        width: props.width
      },
      props.noText ? props.displayNames[props.selected] : `${props.text || "s ort by"}: ${props.displayNames[props.selected]}`
    )
  );
};
var SortButton_default = SortButton;

// src/folder/components/AddContentButton.tsx
import { Stack as Stack58 } from "@mui/system";

// src/images/icons/PlusIcon.svg
var PlusIcon_default = "./PlusIcon-6XAFXQ3T.svg";

// src/folder/components/AddContentButton.tsx
var AddContentButton = (props) => {
  return /* @__PURE__ */ React.createElement(
    Stack58,
    {
      direction: "row",
      width: props.fullWidth ? "100%" : props.mobile ? void 0 : "294px",
      minHeight: "40px",
      borderRadius: "8px",
      boxShadow: props.strongShadow ? "0 0 16px rgba(0,0,0,0.05)" : "0 0 16px rgba(0,0,0,0.02)",
      bgcolor: "rgb(255,255,255)",
      position: "relative"
    },
    /* @__PURE__ */ React.createElement(
      Stack58,
      {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        onClick: props.onClick,
        sx: {
          cursor: "pointer",
          "&:hover": { background: "rgba(255,255,255,0.5)" },
          transition: "0.2s"
        }
      }
    ),
    /* @__PURE__ */ React.createElement(Stack58, { direction: "row", spacing: "14px", flex: 1 }, /* @__PURE__ */ React.createElement(
      Stack58,
      {
        width: "44px",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px 0 0 4px",
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
          svg: {
            path: {
              fill: PALETTE.font.light
            }
          }
        },
        bgcolor: props.color
      },
      /* @__PURE__ */ React.createElement(props.icon, { height: "20px", width: "20px" })
    ), /* @__PURE__ */ React.createElement(Stack58, { flex: 1, py: "11px", justifyContent: "center" }, /* @__PURE__ */ React.createElement(Stack58, { width: "fit-content" }, /* @__PURE__ */ React.createElement(Typography, { bold: true, color: props.color }, props.title))), /* @__PURE__ */ React.createElement(
      Stack58,
      {
        height: "100%",
        justifyContent: "center",
        pr: "15px",
        sx: {
          svg: {
            path: {
              fill: props.color
            }
          }
        }
      },
      /* @__PURE__ */ React.createElement(PlusIcon_default, { height: "24px", width: "24px" })
    ))
  );
};

// src/folder/components/MobileDevicesSection.tsx
import { Stack as Stack62 } from "@mui/system";
import { useState as useState51 } from "react";

// src/components/MobileAllDevicesDialog.tsx
import { Stack as Stack60 } from "@mui/system";
import { Dialog as Dialog3 } from "@mui/material";
import { useEffect as useEffect32, useState as useState50 } from "react";

// src/profiles/components/MobileDeviceCard.tsx
import { Stack as Stack59 } from "@mui/system";

// src/images/icons/CheckCircleFillIcon.svg
var CheckCircleFillIcon_default = "./CheckCircleFillIcon-ESFE5D4L.svg";

// src/profiles/components/MobileDeviceCard.tsx
import { useContext as useContext9, useEffect as useEffect31, useState as useState49 } from "react";
import { useNavigate as useNavigate7 } from "react-router-dom";
var MobileDeviceCardFilterRow = (props) => {
  var _a;
  const { user } = useAuth_default();
  const [allFilters, setAllFilters] = useState49([]);
  useEffect31(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupFilters(user.group_id).then(setAllFilters);
  }, [user == null ? void 0 : user.group_id]);
  const [open, setOpen] = useState49(false);
  return /* @__PURE__ */ React.createElement(
    UrsorPopover,
    {
      open,
      content: /* @__PURE__ */ React.createElement(Stack59, { bgcolor: "rgb(255,255,255)", borderRadius: "12px", spacing: "12px" }, allFilters.map((f, i) => /* @__PURE__ */ React.createElement(
        Stack59,
        {
          key: i,
          sx: {
            opacity: props.filterId != f.id ? 0.55 : 1,
            pointerEvents: props.filterId == f.id ? "none" : void 0,
            cursor: "pointer",
            "&:hover": { opacity: 0.7 },
            transition: "0.2s"
          },
          onClick: () => {
            setOpen(false);
            props.changeFilter(f.id);
          },
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between"
        },
        /* @__PURE__ */ React.createElement(
          Stack59,
          {
            sx: {
              svg: {
                path: {
                  fill: PALETTE.secondary.orange[3]
                }
              }
            },
            spacing: "6px",
            alignItems: "center",
            direction: "row"
          },
          /* @__PURE__ */ React.createElement(FilterIcon_default, { height: "16px", width: "16px" }),
          /* @__PURE__ */ React.createElement(Typography, { variant: "small", bold: true }, f.title)
        ),
        props.filterId === f.id ? /* @__PURE__ */ React.createElement(CheckCircleFillIcon_default, { height: "16px", width: "16px" }) : null
      ))),
      closeCallback: () => setOpen(false),
      buttonWidth: true,
      flexButton: true
    },
    /* @__PURE__ */ React.createElement(Stack59, { onClick: () => setOpen(true), flex: 1 }, /* @__PURE__ */ React.createElement(
      MobileDeviceCardRow,
      {
        text: ((_a = allFilters == null ? void 0 : allFilters.find((f) => f.id == props.filterId)) == null ? void 0 : _a.title) ?? "",
        rightSideElement: /* @__PURE__ */ React.createElement(ChevronDown_default, { height: "16px", width: "16px" }),
        icon: FilterIcon_default,
        iconColor: PALETTE.secondary.orange[3]
      }
    ))
  );
};
var MobileDeviceCardRow = (props) => /* @__PURE__ */ React.createElement(
  Stack59,
  {
    maxHeight: "20px",
    height: "20px",
    direction: "row",
    alignItems: "center",
    spacing: "12px",
    justifyContent: "space-between"
  },
  /* @__PURE__ */ React.createElement(
    Stack59,
    {
      alignItems: "center",
      spacing: "6px",
      direction: "row",
      sx: {
        svg: {
          path: {
            fill: props.iconColor
          }
        }
      }
    },
    /* @__PURE__ */ React.createElement(props.icon, { height: "16px", width: "16px" }),
    /* @__PURE__ */ React.createElement(Typography, { variant: "small" }, props.text)
  ),
  props.rightSideElement
);
var MobileDeviceCard = (props) => {
  var _a, _b, _c, _d, _e;
  const [browsingEnabled, setBrowsingEnabled] = useState49(false);
  useEffect31(
    () => {
      var _a2;
      return setBrowsingEnabled(!!((_a2 = props.config) == null ? void 0 : _a2.browsingAllowed));
    },
    [(_a = props.config) == null ? void 0 : _a.browsingAllowed]
  );
  const navigate = useNavigate7();
  const notificationCtx = useContext9(NotificationContext_default);
  const onClick = () => navigate(`/profiles/${props.id}`);
  const changeFilter = (id) => api_default.addFilterToDevice(id, props.id).then(props.onUpdate).then(() => notificationCtx.success("Changed Filter"));
  return /* @__PURE__ */ React.createElement(AstroCard_default, null, /* @__PURE__ */ React.createElement(
    Stack59,
    {
      px: "16px",
      py: "12px",
      boxSizing: "border-box",
      position: "relative",
      justifyContent: "center"
    },
    /* @__PURE__ */ React.createElement(
      Stack59,
      {
        position: "absolute",
        top: "12px",
        right: "12px",
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s"
        },
        zIndex: 2
      },
      props.button
    ),
    /* @__PURE__ */ React.createElement(
      Stack59,
      {
        spacing: "20px",
        direction: "row",
        justifyContent: "center",
        alignItems: "center",
        onClick: props.onClick
      },
      /* @__PURE__ */ React.createElement(
        Stack59,
        {
          spacing: "8px",
          position: "relative",
          alignItems: "center",
          width: props.noExtras ? void 0 : "91px"
        },
        /* @__PURE__ */ React.createElement(Stack59, { position: "relative" }, /* @__PURE__ */ React.createElement(
          Stack59,
          {
            minHeight: "80px",
            minWidth: "80px",
            borderRadius: "100%",
            overflow: "hidden",
            bgcolor: PALETTE.secondary.blue[2],
            justifyContent: "center",
            alignItems: "center",
            onClick,
            sx: {
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { opacity: 0.6 }
            }
          },
          props.profileAvatarUrl ? /* @__PURE__ */ React.createElement(
            "img",
            {
              src: props.profileAvatarUrl,
              height: 80,
              width: 80,
              alt: "device profile"
            }
          ) : /* @__PURE__ */ React.createElement(Typography, { color: "rgb(255,255,255)", bold: true, variant: "h5" }, getInitials(props.name))
        ), /* @__PURE__ */ React.createElement(
          Stack59,
          {
            position: "absolute",
            bottom: -2,
            right: -2,
            height: "22px",
            width: "22px",
            borderRadius: "100%",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: props.online && browsingEnabled ? PALETTE.secondary.green[4] : PALETTE.secondary.grey[3],
            border: `2px solid rgb(255,255,255)`,
            sx: {
              svg: {
                path: {
                  fill: "rgb(255,255,255)"
                }
              }
            }
          },
          props.online && browsingEnabled ? /* @__PURE__ */ React.createElement(GlobeIcon_default, { height: "12px", width: "12px" }) : /* @__PURE__ */ React.createElement(StrikeThroughGlobeIcon_default, { height: "12px", width: "12px" })
        )),
        /* @__PURE__ */ React.createElement(Stack59, { spacing: "2px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
          Typography,
          {
            variant: "small",
            bold: true,
            maxLines: 1,
            sx: { wordBreak: "break-all" }
          },
          props.name
        ), !props.noDeviceTypeUnderAvatar ? /* @__PURE__ */ React.createElement(Stack59, { direction: "row", spacing: "6px", alignItems: "center" }, /* @__PURE__ */ React.createElement(PhoneIcon_default, { height: "14px", width: "14px" }), /* @__PURE__ */ React.createElement(Typography, { variant: "small", maxLines: 1 }, DEVICE_TYPE_DISPLAY_NAMES[props.deviceType])) : null)
      ),
      !props.noExtras ? /* @__PURE__ */ React.createElement(Stack59, { spacing: "8px", flex: 1 }, /* @__PURE__ */ React.createElement(
        MobileDeviceCardRow,
        {
          text: DEVICE_TYPE_DISPLAY_NAMES[props.deviceType],
          icon: PhoneIcon_default,
          iconColor: PALETTE.primary.navy
        }
      ), /* @__PURE__ */ React.createElement(
        Stack59,
        {
          onClick: props.onClickViewScreenTime,
          sx: {
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.7 }
          }
        },
        /* @__PURE__ */ React.createElement(
          MobileDeviceCardRow,
          {
            text: `${Math.floor(
              Math.max(
                0,
                (((_b = props.screenTime) == null ? void 0 : _b.allowed) ?? 0) - (((_c = props.screenTime) == null ? void 0 : _c.current) ?? 0)
              ) / 60
            )}h ${Math.floor(
              Math.max(
                0,
                (((_d = props.screenTime) == null ? void 0 : _d.allowed) ?? 0) - (((_e = props.screenTime) == null ? void 0 : _e.current) ?? 0)
              ) % 60
            )}m left`,
            icon: ClockIcon_default,
            iconColor: PALETTE.secondary.purple[1],
            rightSideElement: /* @__PURE__ */ React.createElement(Pencil_default, { width: "16px", height: "16px" })
          }
        )
      ), /* @__PURE__ */ React.createElement(
        Stack59,
        {
          sx: {
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.7 }
          }
        },
        /* @__PURE__ */ React.createElement(
          MobileDeviceCardFilterRow,
          {
            filterId: props.filterId,
            changeFilter
          }
        )
      ), /* @__PURE__ */ React.createElement(
        MobileDeviceCardRow,
        {
          text: `Browsing is ${browsingEnabled ? "enabled" : "disabled"}`,
          icon: GlobeIcon_default,
          iconColor: PALETTE.secondary.grey[3],
          rightSideElement: /* @__PURE__ */ React.createElement(
            AstroSwitch_default,
            {
              on: browsingEnabled,
              small: true,
              callback: () => {
                setBrowsingEnabled(!browsingEnabled);
                api_default.flipBrowsingAllowed(
                  props.id,
                  !browsingEnabled
                );
              }
            }
          )
        }
      )) : null
    )
  ));
};
var MobileDeviceCard_default = MobileDeviceCard;

// src/components/MobileAllDevicesDialog.tsx
var MobileAllDevicesDialog = (props) => {
  const [searchValue, setSearchValue] = useState50("");
  const [filteredDevices, setFilteredDevices] = useState50([]);
  useEffect32(
    () => setFilteredDevices(
      props.devices.filter(
        (d) => d.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    [props.devices, searchValue]
  );
  return /* @__PURE__ */ React.createElement(
    Dialog3,
    {
      transitionDuration: 800,
      open: props.open,
      onClose: props.onClose,
      PaperProps: {
        style: {
          maxWidth: "90%",
          width: "90%",
          height: "70%",
          borderRadius: BORDER_RADIUS2,
          margin: "20px",
          padding: "24px"
        }
      },
      sx: {
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE
      }
    },
    /* @__PURE__ */ React.createElement(Stack60, { spacing: "32px", flex: 1 }, /* @__PURE__ */ React.createElement(
      Stack60,
      {
        justifyContent: "space-between",
        alignItems: "center",
        spacing: "12px"
      },
      /* @__PURE__ */ React.createElement(Stack60, { direction: "row" }, /* @__PURE__ */ React.createElement(Typography, { variant: "large", bold: true }, props.title), /* @__PURE__ */ React.createElement(
        Stack60,
        {
          width: "40px",
          alignItems: "flex-end",
          pt: "3px",
          onClick: props.onClose
        },
        /* @__PURE__ */ React.createElement(X_default, { height: "22px", width: "22px" })
      )),
      /* @__PURE__ */ React.createElement(
        SearchInput,
        {
          value: searchValue,
          callback: setSearchValue,
          clearCallback: () => setSearchValue(""),
          grey: true,
          fullWidth: true,
          iconSize: "18px"
        }
      )
    ), /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "150px", columnGap: "12px", rowGap: "12px" }, filteredDevices.map((d, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: i, duration: 800, delay: i * 150 }, /* @__PURE__ */ React.createElement(
      MobileDeviceCard_default,
      {
        ...d,
        button: /* @__PURE__ */ React.createElement(Stack60, { onClick: () => props.onRemove(d.id) }, /* @__PURE__ */ React.createElement(X_default, { height: 16, width: 16 })),
        noExtras: true
      }
    ))))),
    /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        variant: "tertiary",
        onClick: props.onAdd,
        width: "100%",
        endIcon: PlusIcon_default
      },
      "Add Device"
    )
  );
};
var MobileAllDevicesDialog_default = MobileAllDevicesDialog;

// src/folder/components/FolderDeviceRemovalConfirmationDialog.tsx
import { Stack as Stack61 } from "@mui/system";
var FolderDeviceRemovalConfirmationDialog = (props) => {
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Are you sure?",
      width: "446px",
      dynamicHeight: true,
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(Stack61, { alignItems: "center", spacing: "2px" }, /* @__PURE__ */ React.createElement(Typography, { sx: { textAlign: "center" } }, "Removing"), /* @__PURE__ */ React.createElement(Typography, { sx: { textAlign: "center" }, bold: true }, props.deviceName), /* @__PURE__ */ React.createElement(Typography, { sx: { textAlign: "center" } }, "from this Folder means that its Contents will no longer be accessible on that Device. Are you sure you want to remove it?")),
    /* @__PURE__ */ React.createElement(Stack61, { pt: "20px", flex: 1, width: "100%", height: "100%", spacing: "12px" }, /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        variant: "tertiary",
        width: "100%",
        onClick: () => {
          props.onSubmit();
          props.onClose();
        }
      },
      "Yes"
    ), /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        variant: "secondary",
        width: "100%",
        onClick: () => {
          props.onClose();
        }
      },
      "No"
    ))
  );
};
var FolderDeviceRemovalConfirmationDialog_default = FolderDeviceRemovalConfirmationDialog;

// src/folder/components/MobileDevicesSection.tsx
var MobileDevicesSection = (props) => {
  var _a;
  const [hoveringOnButton, setHoveringOnButton] = useState51(false);
  const [devicesGridDialogOpen, setDevicesGridDialogOpen] = useState51(false);
  const [removalConfirmationDialogId, setRemovalConfirmationDialogId] = useState51();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: props.title,
      notCollapsible: true,
      isMobile: true,
      info: INFOS.folderDevice
    },
    props.devices.length > 0 ? /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "150px", rowGap: "12px", columnGap: "12px" }, props.devices.map((d, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: d.id, duration: 800, delay: i * 150 }, /* @__PURE__ */ React.createElement(
      MobileDeviceCard_default,
      {
        ...d,
        button: /* @__PURE__ */ React.createElement(Stack62, { onClick: () => setRemovalConfirmationDialogId(d.id) }, /* @__PURE__ */ React.createElement(X_default, { height: 16, width: 16 })),
        noExtras: true
      }
    )))) : /* @__PURE__ */ React.createElement(
      Stack62,
      {
        height: "90px",
        spacing: "1px",
        borderRadius: "8px",
        border: `1px solid ${PALETTE.secondary.grey[2]}`,
        justifyContent: "center",
        alignItems: "center",
        bgcolor: hoveringOnButton ? PALETTE.secondary.grey[1] : "rgb(255,255,255)",
        sx: {
          transition: "0.2s",
          cursor: "pointer",
          svg: {
            path: {
              fill: PALETTE.secondary.grey[4]
            }
          }
        },
        onMouseEnter: () => setHoveringOnButton(true),
        onMouseLeave: () => setHoveringOnButton(false),
        onClick: props.onAdd
      },
      /* @__PURE__ */ React.createElement(PlusIcon_default, { height: "32px", width: "32px" }),
      /* @__PURE__ */ React.createElement(
        Typography,
        {
          bold: true,
          color: PALETTE.secondary.grey[hoveringOnButton ? 4 : 3]
        },
        "Add a Device"
      )
    ),
    /* @__PURE__ */ React.createElement(Stack62, { direction: "row", spacing: "12px", pt: "14px" }, /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        size: "small",
        variant: "secondary",
        endIcon: ChevronRight_default,
        onClick: () => setDevicesGridDialogOpen(true),
        width: "100%"
      },
      "View all"
    ), /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        variant: "tertiary",
        size: "small",
        endIcon: PlusIcon_default,
        onClick: props.onAdd,
        width: "100%"
      },
      "Add Device"
    ))
  ), /* @__PURE__ */ React.createElement(
    MobileAllDevicesDialog_default,
    {
      title: `${props.devices.length} ${props.devices.length === 1 ? "Device has" : "Devices have"} access to this Folder`,
      devices: props.devices.slice(0, 4),
      open: devicesGridDialogOpen,
      onClose: () => setDevicesGridDialogOpen(false),
      onAdd: () => {
        props.onAdd();
      },
      onRemove: setRemovalConfirmationDialogId
    }
  ), removalConfirmationDialogId ? /* @__PURE__ */ React.createElement(
    FolderDeviceRemovalConfirmationDialog_default,
    {
      open: true,
      onClose: () => setRemovalConfirmationDialogId(void 0),
      onSubmit: () => props.onRemove(removalConfirmationDialogId),
      deviceName: ((_a = props.devices.find((d) => d.id === removalConfirmationDialogId)) == null ? void 0 : _a.name) ?? "",
      isMobile: true
    }
  ) : null);
};
var MobileDevicesSection_default = MobileDevicesSection;

// src/folder/contents/body-mobile.tsx
import { useNavigate as useNavigate8 } from "react-router-dom";
var FolderPageMobileBody = (props) => {
  const navigate = useNavigate8();
  return /* @__PURE__ */ React.createElement(
    MobilePageLayout_default,
    {
      titleRow: props.titleRow.slice(-1)[0],
      titleBackButtonCallback: () => navigate("/folders"),
      selectedPage: "content",
      actions: props.actions
    },
    /* @__PURE__ */ React.createElement(Stack63, { spacing: "24px", pb: "32px" }, /* @__PURE__ */ React.createElement(
      MobileDevicesSection_default,
      {
        title: `${props.devices.length} ${props.devices.length === 1 ? "Device has" : "Devices have"} access to this Folder`,
        devices: props.devices,
        folderId: props.folderId,
        onAdd: props.setAddDeviceDialogOpen,
        onRemove: (id) => api_default.removeFolderFromDevice(props.folderId, id).then(
          props.onRemoveDevice
        )
      }
    ), /* @__PURE__ */ React.createElement(Stack63, { justifyContent: "center" }, /* @__PURE__ */ React.createElement(
      Stack63,
      {
        width: "100%",
        height: "1px",
        bgcolor: PALETTE.secondary.grey[2]
      }
    )), /* @__PURE__ */ React.createElement(Stack63, { justifyContent: "space-between", spacing: "8px" }, /* @__PURE__ */ React.createElement(Typography, { variant: "medium", bold: true }, `${props.contents.length} item${props.contents.length === 1 ? "" : "s "} in this Folder`), /* @__PURE__ */ React.createElement(Stack63, { direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
      SearchInput,
      {
        value: props.searchValue ?? "",
        callback: (value) => {
          props.setSearchValue(value);
        },
        clearCallback: () => props.setSearchValue(""),
        shadow: true,
        fullWidth: true,
        iconSize: "18px"
      }
    ), /* @__PURE__ */ React.createElement(
      SortButton_default,
      {
        noText: true,
        selected: props.selectedContentType,
        callback: (id) => props.setSelectedContentType(id),
        types: ["all", "link", "video", "channel"],
        displayNames: {
          all: "All",
          video: "Video",
          channel: "Channel",
          link: "Link"
        },
        width: "120px"
      }
    ))), /* @__PURE__ */ React.createElement(Stack63, { spacing: "12px" }, ["link", "video", "channel"].map((c) => /* @__PURE__ */ React.createElement(
      Stack63,
      {
        key: c,
        onClick: () => props.setCreationDialogOpen(c),
        flex: 1
      },
      /* @__PURE__ */ React.createElement(
        AddContentButton,
        {
          key: c,
          onClick: () => null,
          ...CONTENT_BRANDING[c],
          fullWidth: true
        }
      )
    ))), /* @__PURE__ */ React.createElement(
      Stack63,
      {
        bgcolor: "rgb(255,255,255)",
        borderRadius: "12px",
        border: `1px solid ${PALETTE.secondary.grey[2]}`,
        p: "16px",
        boxSizing: "border-box"
      },
      /* @__PURE__ */ React.createElement(Stack63, { overflow: "hidden", flex: 1 }, props.contents.length > 0 ? /* @__PURE__ */ React.createElement(Stack63, { flex: 1, spacing: "12px" }, props.contents.map((x, i) => /* @__PURE__ */ React.createElement(Stack63, { key: `${x.content.id}${x.type}` }, /* @__PURE__ */ React.createElement(UrsorFadeIn, { delay: i * 80, duration: 800 }, x.type === "link" ? /* @__PURE__ */ React.createElement(
        "aCard",
        {
          ...x.content,
          onDelete: props.loadFolderAndContents,
          onOpenEditingDialog: () => props.setLinkEditingDialogId(x.content.id),
          isMobile: true
        }
      ) : x.type === "video" ? /* @__PURE__ */ React.createElement(
        VideoCard_default,
        {
          ...x.content,
          onDelete: props.loadFolderAndContents,
          onOpenEditingDialog: () => props.setVideoEditingDialogId(x.content.id),
          isMobile: true
        }
      ) : x.type === "channel" ? /* @__PURE__ */ React.createElement(
        ChannelCard_default,
        {
          ...x.content,
          onDelete: props.loadFolderAndContents,
          onOpenEditingDialog: () => props.setChannelEditingDialogId(x.content.id),
          isMobile: true,
          folderId: props.folderId
        }
      ) : null)))) : /* @__PURE__ */ React.createElement(
        Stack63,
        {
          height: "457px",
          justifyContent: "center",
          alignItems: "center",
          spacing: "13px"
        },
        /* @__PURE__ */ React.createElement(
          "img",
          {
            src: "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321506.png",
            width: 179,
            height: 152,
            alt: "empty state illustration"
          }
        ),
        /* @__PURE__ */ React.createElement(Stack63, { width: "444px" }, /* @__PURE__ */ React.createElement(
          Typography,
          {
            color: PALETTE.secondary.grey[3],
            sx: { textAlign: "center" },
            bold: true
          },
          "This Folder is currently empty. Click one of the buttons above to add Content to the assigned Devices."
        ))
      ))
    ))
  );
};
var body_mobile_default2 = FolderPageMobileBody;

// src/folder/contents/body-desktop.tsx
import { Stack as Stack66 } from "@mui/system";

// src/folder/components/DevicesSection.tsx
import { Stack as Stack65 } from "@mui/system";
import { useState as useState53 } from "react";

// src/components/AllDevicesDialog.tsx
import { Stack as Stack64 } from "@mui/system";
import { Dialog as Dialog4 } from "@mui/material";
import { useEffect as useEffect33, useState as useState52 } from "react";
var AllDevicesDialog = (props) => {
  const [searchValue, setSearchValue] = useState52("");
  const [filteredDevices, setFilteredDevices] = useState52([]);
  useEffect33(
    () => setFilteredDevices(
      props.devices.filter(
        (d) => d.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    [props.devices, searchValue]
  );
  return /* @__PURE__ */ React.createElement(
    Dialog4,
    {
      transitionDuration: 800,
      open: props.open,
      onClose: props.onClose,
      PaperProps: {
        style: {
          maxWidth: 1308,
          width: "70%",
          maxHeight: 726,
          height: "70%",
          borderRadius: BORDER_RADIUS2,
          margin: "20px",
          padding: "32px"
        }
      },
      sx: {
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE
      }
    },
    /* @__PURE__ */ React.createElement(Stack64, { spacing: "32px" }, /* @__PURE__ */ React.createElement(
      Stack64,
      {
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      /* @__PURE__ */ React.createElement(Stack64, { direction: "row", spacing: "8px" }, /* @__PURE__ */ React.createElement(Typography, { variant: "h5" }, props.title), /* @__PURE__ */ React.createElement(InfoButton_default, { ...INFOS.folderDevice })),
      /* @__PURE__ */ React.createElement(Stack64, { direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          size: "small",
          endIcon: PlusIcon_default,
          onClick: props.onAdd
        },
        "Add Device"
      ), /* @__PURE__ */ React.createElement(
        SearchInput,
        {
          value: searchValue,
          callback: setSearchValue,
          clearCallback: () => setSearchValue(""),
          grey: true
        }
      ))
    ), /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "292px", rowGap: "8px", columnGap: "20px" }, filteredDevices.map((d, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: i, duration: 800, delay: i * 150 }, /* @__PURE__ */ React.createElement(
      DeviceCard_default,
      {
        ...d,
        button: props.onRemove ? /* @__PURE__ */ React.createElement(Stack64, { onClick: () => props.onRemove(d.id) }, /* @__PURE__ */ React.createElement(X_default, { height: 16, width: 16 })) : void 0,
        hideToggles: true,
        noExtras: true
      }
    )))))
  );
};
var AllDevicesDialog_default = AllDevicesDialog;

// src/folder/components/DevicesSection.tsx
var DevicesSection = (props) => {
  var _a, _b;
  const [hoveringOnButton, setHoveringOnButton] = useState53(false);
  const [devicesGridDialogOpen, setDevicesGridDialogOpen] = useState53(false);
  const removeDevice = (id) => api_default.removeFolderFromDevice(props.folderId, id).then(
    props.onRemove
  );
  const [removalConfirmationDialogId, setRemovalConfirmationDialogId] = useState53();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: props.title,
      info: INFOS.folderDevice,
      notCollapsible: true,
      topRightStuff: /* @__PURE__ */ React.createElement(Stack65, { direction: "row", spacing: "12px" }, /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          size: "small",
          variant: "secondary",
          endIcon: ChevronRight_default,
          iconSize: 16,
          onClick: () => setDevicesGridDialogOpen(true)
        },
        "View all"
      ), /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          size: "small",
          endIcon: PlusIcon_default,
          iconSize: 16,
          onClick: props.onAdd
        },
        "Add Device"
      ))
    },
    props.devices.length > 0 ? /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "292px", rowGap: "8px", columnGap: "20px" }, props.devices.map((d, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: d.id, duration: 800, delay: i * 150 }, /* @__PURE__ */ React.createElement(
      DeviceCard_default,
      {
        ...d,
        button: /* @__PURE__ */ React.createElement(Stack65, { onClick: () => setRemovalConfirmationDialogId(d.id) }, /* @__PURE__ */ React.createElement(X_default, { height: 16, width: 16 })),
        noExtras: true
      }
    )))) : /* @__PURE__ */ React.createElement(
      Stack65,
      {
        height: "90px",
        spacing: "1px",
        borderRadius: "8px",
        border: `1px solid ${PALETTE.secondary.grey[2]}`,
        justifyContent: "center",
        alignItems: "center",
        bgcolor: hoveringOnButton ? PALETTE.secondary.grey[1] : "rgb(255,255,255)",
        sx: {
          transition: "0.2s",
          cursor: "pointer",
          svg: {
            path: {
              fill: PALETTE.secondary.grey[4]
            }
          }
        },
        onMouseEnter: () => setHoveringOnButton(true),
        onMouseLeave: () => setHoveringOnButton(false),
        onClick: props.onAdd
      },
      /* @__PURE__ */ React.createElement(PlusIcon_default, { height: "32px", width: "32px" }),
      /* @__PURE__ */ React.createElement(
        Typography,
        {
          bold: true,
          color: PALETTE.secondary.grey[hoveringOnButton ? 4 : 3]
        },
        "Add a Device"
      )
    )
  ), /* @__PURE__ */ React.createElement(
    AllDevicesDialog_default,
    {
      title: `${props.devices.length} ${props.devices.length === 1 ? "Device has" : "Devices have"} access to this Folder`,
      devices: ((_a = props.devices) == null ? void 0 : _a.slice(0, 4)) || [],
      open: devicesGridDialogOpen,
      onClose: () => setDevicesGridDialogOpen(false),
      onAdd: () => {
        props.onAdd();
      },
      onRemove: setRemovalConfirmationDialogId
    }
  ), removalConfirmationDialogId ? /* @__PURE__ */ React.createElement(
    FolderDeviceRemovalConfirmationDialog_default,
    {
      open: true,
      onClose: () => setRemovalConfirmationDialogId(void 0),
      onSubmit: () => removeDevice(removalConfirmationDialogId),
      deviceName: ((_b = props.devices.find((d) => d.id === removalConfirmationDialogId)) == null ? void 0 : _b.name) ?? "",
      isMobile: props.isMobile
    }
  ) : null);
};
var DevicesSection_default = DevicesSection;

// src/folder/contents/body-desktop.tsx
import { useEffect as useEffect35, useState as useState55 } from "react";
import _13 from "lodash";

// src/components/useColumnWidth.tsx
import { useEffect as useEffect34, useState as useState54 } from "react";
import { useWindowSize as useWindowSize5 } from "usehooks-ts";
var MIN_COLUMN_WIDTH = 245;
var MAX_COLUMN_WIDTH = 402;
var IDEAL_COLUMN_WIDTH = 271;
var useColumnWidth = (idealWidth, minWidth, maxWidth) => {
  const [nColumns, setNColumns] = useState54(1);
  const { width } = useWindowSize5();
  const [columnsContainerRef, setColumnsContainerRef] = useState54(null);
  useEffect34(() => {
    const possibleNColumns = Math.floor(
      ((columnsContainerRef == null ? void 0 : columnsContainerRef.getBoundingClientRect().width) ?? 0) / (idealWidth || IDEAL_COLUMN_WIDTH)
    );
    const possibleColumnWidth = ((columnsContainerRef == null ? void 0 : columnsContainerRef.getBoundingClientRect().width) ?? 0) / possibleNColumns;
    if (possibleColumnWidth > (minWidth || MIN_COLUMN_WIDTH)) {
      if (possibleColumnWidth < (maxWidth || MAX_COLUMN_WIDTH)) {
        setNColumns(possibleNColumns);
      } else {
        setNColumns(possibleNColumns + 1);
      }
    } else {
      setNColumns(Math.max(1, possibleNColumns - 1));
    }
  }, [columnsContainerRef, width]);
  return { nColumns, setColumnsContainerRef };
};
var useColumnWidth_default = useColumnWidth;

// src/folder/contents/body-desktop.tsx
import { useNavigate as useNavigate9 } from "react-router-dom";
import { useWindowSize as useWindowSize6 } from "usehooks-ts";
var SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD2 = 1134;
var FolderPageDesktopBody = (props) => {
  const { nColumns, setColumnsContainerRef } = useColumnWidth_default(400, 350, 510);
  const [columns, setColumns] = useState55([]);
  useEffect35(() => {
    const chunked = _13.chunk(props.contents, nColumns);
    setColumns(
      [...Array(nColumns).keys()].map(
        (i) => _13.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [nColumns, props.contents]);
  const navigate = useNavigate9();
  const { width } = useWindowSize6();
  return /* @__PURE__ */ React.createElement(
    PageLayout_default,
    {
      titleRow: props.titleRow,
      titleBackButtonCallback: () => navigate("/folders"),
      bodyWidth: "100%",
      fullHeight: true,
      selectedSidebarItemId: "content",
      actions: props.actions,
      maxWidth: 834,
      scrollable: true
    },
    /* @__PURE__ */ React.createElement(Stack66, { pl: "48px", spacing: "24px", pb: "32px" }, /* @__PURE__ */ React.createElement(
      DevicesSection_default,
      {
        title: `${props.devices.length} ${props.devices.length === 1 ? "Device has" : "Devices have"} access to this Folder`,
        devices: props.devices,
        folderId: props.folderId,
        onAdd: props.setAddDeviceDialogOpen,
        onRemove: props.onRemoveDevice
      }
    ), /* @__PURE__ */ React.createElement(Stack66, { justifyContent: "center" }, /* @__PURE__ */ React.createElement(
      Stack66,
      {
        width: "100%",
        height: "1px",
        bgcolor: PALETTE.secondary.grey[2]
      }
    )), /* @__PURE__ */ React.createElement(
      Stack66,
      {
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      /* @__PURE__ */ React.createElement(Typography, { variant: "large", bold: true }, `${props.contents.length} item${props.contents.length === 1 ? "" : "s "} in this Folder`),
      /* @__PURE__ */ React.createElement(
        Stack66,
        {
          direction: "row",
          spacing: "12px",
          alignItems: "center",
          width: "fit-content"
        },
        /* @__PURE__ */ React.createElement(
          SearchInput,
          {
            value: props.searchValue ?? "",
            callback: (value) => {
              props.setSearchValue(value);
            },
            clearCallback: () => props.setSearchValue(""),
            shadow: true
          }
        ),
        /* @__PURE__ */ React.createElement(
          SortButton_default,
          {
            noText: true,
            selected: props.selectedContentType,
            callback: (id) => props.setSelectedContentType(id),
            types: ["all", "link", "video", "channel"],
            displayNames: {
              all: "All",
              video: "Video",
              channel: "Channel",
              link: "Link"
            },
            width: "120px"
          }
        )
      )
    ), /* @__PURE__ */ React.createElement(UrsorFadeIn, { delay: 800, duration: 1200 }, /* @__PURE__ */ React.createElement(
      Stack66,
      {
        direction: width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD2 ? "column" : "row",
        spacing: width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD2 ? "8px" : "24px"
      },
      ["link", "video", "channel"].map((c) => /* @__PURE__ */ React.createElement(
        Stack66,
        {
          key: c,
          onClick: () => props.setContentCreationDialogOpen(c),
          flex: 1
        },
        /* @__PURE__ */ React.createElement(
          AddContentButton,
          {
            key: c,
            onClick: () => null,
            ...CONTENT_BRANDING[c],
            fullWidth: true
          }
        )
      ))
    )), /* @__PURE__ */ React.createElement(
      Stack66,
      {
        bgcolor: "rgb(255,255,255)",
        borderRadius: "12px",
        border: `1px solid ${PALETTE.secondary.grey[2]}`,
        p: "16px",
        boxSizing: "border-box"
      },
      /* @__PURE__ */ React.createElement(Stack66, { ref: setColumnsContainerRef, overflow: "hidden", flex: 1 }, props.contents.length > 0 ? /* @__PURE__ */ React.createElement(Stack66, { flex: 1, direction: "row", spacing: "20px" }, [
        ...columns.map((column, i) => /* @__PURE__ */ React.createElement(Stack66, { key: i, flex: 1, spacing: "20px", overflow: "hidden" }, column.map((x, j) => /* @__PURE__ */ React.createElement(Stack66, { key: `${x.content.id}${x.type}` }, /* @__PURE__ */ React.createElement(UrsorFadeIn, { delay: j * 150 + i * 80, duration: 800 }, x.type === "link" ? /* @__PURE__ */ React.createElement(
          "aCard",
          {
            ...x.content,
            onDelete: props.loadFolderAndContents,
            onOpenEditingDialog: () => props.setLinkEditingDialogId(x.content.id)
          }
        ) : x.type === "video" ? /* @__PURE__ */ React.createElement(
          VideoCard_default,
          {
            ...x.content,
            onDelete: props.loadFolderAndContents,
            onOpenEditingDialog: () => props.setVideoEditingDialogId(x.content.id)
          }
        ) : x.type === "channel" ? /* @__PURE__ */ React.createElement(
          ChannelCard_default,
          {
            ...x.content,
            onDelete: props.loadFolderAndContents,
            onOpenEditingDialog: () => props.setChannelEditingDialogId(x.content.id)
          }
        ) : null)))))
      ]) : /* @__PURE__ */ React.createElement(
        Stack66,
        {
          height: "457px",
          justifyContent: "center",
          alignItems: "center",
          spacing: "13px"
        },
        /* @__PURE__ */ React.createElement(
          "img",
          {
            src: "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321506.png",
            width: 179,
            height: 152,
            alt: "empty state illustration"
          }
        ),
        /* @__PURE__ */ React.createElement(Stack66, { width: "444px" }, /* @__PURE__ */ React.createElement(
          Typography,
          {
            color: PALETTE.secondary.grey[3],
            sx: { textAlign: "center" },
            bold: true
          },
          "This Folder is currently empty. Click one of the buttons above to add Content to the assigned Devices."
        ))
      ))
    ))
  );
};
var body_desktop_default2 = FolderPageDesktopBody;

// src/components/DeletionDialog.tsx
import { Stack as Stack67 } from "@mui/system";
import { useContext as useContext10, useState as useState56 } from "react";
import _14 from "lodash";
var INPUT_PHRASE = "delete";
var DeletionDialog = (props) => {
  const [inputValue, setInputValue] = useState56("");
  const notificationCtx = useContext10(NotificationContext_default);
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Are you sure?",
      subtitle: [props.subtitle],
      width: "422px",
      dynamicHeight: true,
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(
      Stack67,
      {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        spacing: "32px"
      },
      !props.noConfirmation ? /* @__PURE__ */ React.createElement(
        LabeledInputField,
        {
          label: `Type "${INPUT_PHRASE}" to delete this ${_14.capitalize(
            props.type
          )}`
        },
        /* @__PURE__ */ React.createElement(
          UrsorInputField,
          {
            value: inputValue,
            onChange: (event) => setInputValue(event.target.value),
            placeholder: INPUT_PHRASE,
            width: "100%",
            leftAlign: true
          }
        )
      ) : null,
      /* @__PURE__ */ React.createElement(Stack67, { spacing: "8px", width: "100%" }, /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          width: "100%",
          disabled: !props.noConfirmation && inputValue !== INPUT_PHRASE,
          onClick: () => {
            props.onSubmit();
            notificationCtx.negativeSuccess(
              `Deleted ${_14.capitalize(props.type)}`
            );
          },
          backgroundColor: PALETTE.system.red,
          hoverOpacity: 0.7
        },
        "Delete"
      ), /* @__PURE__ */ React.createElement(UrsorButton, { variant: "secondary", width: "100%", onClick: props.onClose }, "Keep"))
    )
  );
};
var DeletionDialog_default = DeletionDialog;

// src/profiles/components/useDeviceOnlineStatus.tsx
import { useEffect as useEffect36, useState as useState57 } from "react";
import { useCallback as useCallback5 } from "react";
var useDeviceOnlineStatus = (devices) => {
  const { user } = useAuth_default();
  const [cuttingEdgeOnlineStatusDevices, setCuttingEdgeOnlineStatusDevices] = useState57([]);
  useEffect36(() => setCuttingEdgeOnlineStatusDevices(devices), [devices.length]);
  const setDeviceOnlineStatus = useCallback5(
    (deviceId, online) => {
      deviceId && setCuttingEdgeOnlineStatusDevices(
        (prev) => prev.map(
          (device) => device.id === deviceId ? { ...device, online } : device
        )
      );
    },
    []
  );
  const websocketUrl = process.env.NEXT_PUBLIC_VERCEL_ENV === "local" ? "ws://localhost:8000" : "wss://api.astrosafe.co";
  useEffect36(() => {
    if (!(user == null ? void 0 : user.group_id)) return;
    const socket = new WebSocket(
      `${websocketUrl}/sessions/groups/${user.group_id}`
    );
    const handleMessage = (event) => {
      if (!event.data) return;
      const data = JSON.parse(event.data);
      data.deviceId && setDeviceOnlineStatus(data.deviceId, data.online);
    };
    socket.addEventListener("message", handleMessage);
    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [setDeviceOnlineStatus, user == null ? void 0 : user.group_id]);
  return cuttingEdgeOnlineStatusDevices;
};
var useDeviceOnlineStatus_default = useDeviceOnlineStatus;

// src/folder/contents/common.tsx
var FOLDER_DELETION_DIALOG_SUBTITLE = "If you delete this Folder all of the Content within the Folder will also be deleted and it will no longer be accessible on the assigned Devices.";
var CONTENT_BRANDING = {
  video: {
    title: "Add Video",
    color: "#FC5C5C",
    icon: CirclePlay_default
  },
  channel: {
    title: "Add Youtube Channel",
    color: PALETTE.system.orange,
    icon: VideoCameraIcon_default
  },
  // lesson: {
  //   title: "Add Lesson",
  //   color: PALETTE.secondary.green[5],
  //   icon: VersionsIcon,
  // },
  link: {
    title: "Add Link",
    color: PALETTE.secondary.blue[3],
    icon: LinkIcon_default
  }
};
function FolderPage(props) {
  var _a, _b, _c;
  const navigate = useNavigate10();
  const { user } = useAuth_default();
  const [devices, setDevices] = useState58([]);
  const loadDevices = useCallback6(
    () => api_default.getFolderDevices(props.folderId).then((d) => setDevices(d)),
    [props.folderId]
  );
  useEffect37(() => {
    loadDevices();
  }, [loadDevices]);
  const cuttingEdgeOnlineStatusDevices = useDeviceOnlineStatus_default(devices);
  const { folder, contents, loadFolderAndContents } = useLoadFolderAndContents_default(
    props.folderId
  );
  const [searchValue, setSearchValue] = useState58("");
  const [selectedContentType, setSelectedContentType] = useState58("all");
  const [filteredContents, setFilteredContents] = useState58([]);
  useEffect37(
    () => setFilteredContents(
      _15(contents).filter(
        (c) => selectedContentType === "all" || c.type === selectedContentType
      ).filter(
        (c) => !searchValue || c.content.title.toLowerCase().includes(searchValue.toLowerCase())
      ).reverse().value()
    ),
    [searchValue, selectedContentType, contents]
  );
  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = useState58(false);
  const [contentCreationDialogOpen, setContentCreationDialogOpen] = useState58();
  const [allFolders, setFolders] = useState58([]);
  useEffect37(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupFolders(user.group_id).then(setFolders);
  }, [user == null ? void 0 : user.group_id]);
  const [folderRenameDialogOpen, setFolderRenameDialogOpen] = useState58(false);
  const notificationCtx = useContext11(NotificationContext_default);
  const [linkEditingDialogId, setLinkEditingDialogId] = useState58(void 0);
  const [videoEditingDialogId, setVideoEditingDialogId] = useState58(void 0);
  const [channelEditingDialogId, setChannelEditingDialogId] = useState58(void 0);
  const titleRow = [
    {
      text: "My Folders",
      callback: () => navigate("/folders")
    },
    {
      text: (folder == null ? void 0 : folder.title) ?? "",
      options: allFolders.filter((f) => f.id !== props.folderId).map((f) => ({
        text: f.title,
        callback: () => navigate(`/folders/${f.id}`)
      }))
    }
  ];
  const [deletionDialogOpen, setDeletionDialogOpen] = useState58(false);
  const deleteFolder = () => api_default.removeFolder(props.folderId).then(() => navigate("/folders"));
  const actions = [
    {
      text: "Edit name",
      kallback: () => setFolderRenameDialogOpen(true),
      icon: Pencil_default
    },
    // {
    //   text: "Duplicate",
    //   kallback: () => null,
    //   icon: DuplicateIcon,
    // },
    {
      text: "Delete",
      kallback: () => setDeletionDialogOpen(true),
      icon: TrashcanIcon_default,
      color: PALETTE.system.red
    }
  ];
  return /* @__PURE__ */ React38.createElement(React38.Fragment, null, props.isMobile ? /* @__PURE__ */ React38.createElement(
    body_mobile_default2,
    {
      folderId: props.folderId,
      folder,
      contents: filteredContents,
      allFolders,
      devices: cuttingEdgeOnlineStatusDevices,
      setCreationDialogOpen: setContentCreationDialogOpen,
      loadFolderAndContents,
      setAddDeviceDialogOpen: () => {
        setAddDeviceDialogOpen(true);
      },
      onRemoveDevice: () => {
        loadDevices();
        notificationCtx.negativeSuccess("Removed Device");
      },
      searchValue,
      setSearchValue,
      selectedContentType,
      setSelectedContentType,
      setLinkEditingDialogId,
      setVideoEditingDialogId,
      setChannelEditingDialogId,
      titleRow,
      actions
    }
  ) : /* @__PURE__ */ React38.createElement(
    body_desktop_default2,
    {
      folderId: props.folderId,
      folder,
      contents: filteredContents,
      allFolders,
      devices: cuttingEdgeOnlineStatusDevices,
      setContentCreationDialogOpen,
      loadFolderAndContents,
      setAddDeviceDialogOpen: () => {
        setAddDeviceDialogOpen(true);
      },
      onRemoveDevice: () => {
        loadDevices();
        notificationCtx.negativeSuccess("Removed Device");
      },
      searchValue,
      setSearchValue,
      selectedContentType,
      setSelectedContentType,
      setLinkEditingDialogId,
      setVideoEditingDialogId,
      setChannelEditingDialogId,
      titleRow,
      actions
    }
  ), devices ? /* @__PURE__ */ React38.createElement(
    AddDeviceDialog_default,
    {
      open: addDeviceDialogOpen,
      groupId: user == null ? void 0 : user.group_id,
      onClose: () => setAddDeviceDialogOpen(false),
      title: "Share to a Device",
      subtitle: ["Add Device access to this", "Content Folder."],
      emptyText: "This Content Folder is on all of your Devices",
      addedDevices: devices,
      onAdd: (id) => {
        api_default.addFolderToDevice(props.folderId, id).then(() => {
          setAddDeviceDialogOpen(false);
          loadDevices();
          notificationCtx.success("Added Device");
        });
      },
      isMobile: props.isMobile
    }
  ) : null, /* @__PURE__ */ React38.createElement(
    FolderRenameDialog_default,
    {
      open: folderRenameDialogOpen,
      onClose: () => setFolderRenameDialogOpen(false),
      name: (folder == null ? void 0 : folder.title) ?? "",
      onSubmit: (name) => api_default.renameFolder(props.folderId, name).then(() => {
        loadFolderAndContents();
        notificationCtx.success("Renamed Folder");
      }),
      isMobile: props.isMobile
    }
  ), contentCreationDialogOpen ? contentCreationDialogOpen === "video" ? /* @__PURE__ */ React38.createElement(
    VideoCreationDialog_default,
    {
      open: true,
      onClose: () => {
        setContentCreationDialogOpen(void 0);
      },
      folderId: props.folderId,
      creationCallback: loadFolderAndContents
    }
  ) : contentCreationDialogOpen === "link" ? /* @__PURE__ */ React38.createElement(
    "aCreationDialog",
    {
      open: true,
      onClose: () => {
        setContentCreationDialogOpen(void 0);
      },
      folderId: props.folderId,
      creationCallback: loadFolderAndContents
    }
  ) : contentCreationDialogOpen === "channel" ? /* @__PURE__ */ React38.createElement(
    ChannelCreationDialog_default,
    {
      open: true,
      onClose: () => {
        setContentCreationDialogOpen(void 0);
      },
      folderId: props.folderId,
      creationCallback: loadFolderAndContents
    }
  ) : null : null, linkEditingDialogId && contents ? /* @__PURE__ */ React38.createElement(
    "aCreationDialog",
    {
      open: true,
      onClose: () => {
        setLinkEditingDialogId(void 0);
      },
      folderId: props.folderId,
      creationCallback: loadFolderAndContents,
      updateDetails: {
        link: (_a = contents.find(
          (c) => c.content.id === linkEditingDialogId && c.type === "link"
        )) == null ? void 0 : _a.content,
        callback: loadFolderAndContents
      }
    }
  ) : null, videoEditingDialogId && contents ? /* @__PURE__ */ React38.createElement(
    VideoCreationDialog_default,
    {
      open: true,
      onClose: () => {
        setVideoEditingDialogId(void 0);
      },
      folderId: props.folderId,
      creationCallback: loadFolderAndContents,
      updateDetails: {
        video: (_b = contents.find(
          (c) => c.content.id === videoEditingDialogId && c.type === "video"
        )) == null ? void 0 : _b.content,
        callback: loadFolderAndContents
      }
    }
  ) : null, channelEditingDialogId && contents ? /* @__PURE__ */ React38.createElement(
    ChannelCreationDialog_default,
    {
      open: true,
      onClose: () => {
        setChannelEditingDialogId(void 0);
      },
      folderId: props.folderId,
      creationCallback: loadFolderAndContents,
      updateDetails: {
        channel: (_c = contents.find(
          (c) => c.content.id === channelEditingDialogId && c.type === "channel"
        )) == null ? void 0 : _c.content,
        callback: loadFolderAndContents
      }
    }
  ) : null, /* @__PURE__ */ React38.createElement(
    DeletionDialog_default,
    {
      open: deletionDialogOpen,
      type: "Folder",
      onClose: () => setDeletionDialogOpen(false),
      subtitle: FOLDER_DELETION_DIALOG_SUBTITLE,
      onSubmit: deleteFolder,
      isMobile: props.isMobile
    }
  ));
}

// src/folder/components/ContentCard.tsx
import _16 from "lodash";
import { useState as useState59 } from "react";
var CONTENT_DISPLAY_NAMES = {
  video: "Video",
  channel: "Channel",
  link: "Link"
};
var ContentCardCore = (props) => {
  const Icon = CONTENT_BRANDING[props.type].icon;
  return /* @__PURE__ */ React.createElement(
    Stack68,
    {
      onClick: props.onClick,
      sx: {
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.6 }
      },
      spacing: "6px"
    },
    props.children,
    /* @__PURE__ */ React.createElement(
      Stack68,
      {
        width: "calc(100% - 24px)",
        minHeight: props.twoLineTitleSectionHeight ? "44px" : "24px"
      },
      /* @__PURE__ */ React.createElement(Typography, { bold: true, maxLines: 2 }, props.title)
    ),
    /* @__PURE__ */ React.createElement(
      Stack68,
      {
        height: "24px",
        px: "8px",
        alignItems: "center",
        sx: {
          svg: { path: { fill: CONTENT_BRANDING[props.type].color } }
        },
        bgcolor: PALETTE.secondary.grey[1],
        direction: "row",
        spacing: "8px",
        borderRadius: "12px",
        width: "fit-content"
      },
      /* @__PURE__ */ React.createElement(Icon, { height: "16px", width: "16px" }),
      /* @__PURE__ */ React.createElement(
        Typography,
        {
          variant: "tiny",
          bold: true,
          color: CONTENT_BRANDING[props.type].color
        },
        CONTENT_DISPLAY_NAMES[props.type]
      )
    )
  );
};
var ContentCard = (props) => {
  const [deletionDialogOpen, setDeletionDialogOpen] = useState59(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Stack68,
    {
      position: "relative",
      borderRadius: "12px",
      bgcolor: "rgb(255,255,255)",
      border: `1px solid ${PALETTE.secondary.grey[2]}`,
      p: "4px",
      boxSizing: "border-box",
      overflow: "hidden",
      sx: { pointerEvents: props.noPointerEvents ? "none" : void 0 }
    },
    /* @__PURE__ */ React.createElement(Stack68, { position: "absolute", right: "2px", bottom: "32px" }, !props.noMenu ? /* @__PURE__ */ React.createElement(
      UrsorActionButton,
      {
        notClickable: props.noPointerEvents,
        iconSize: "16px",
        size: "26px",
        background: "transparent",
        actions: [
          {
            text: "Edit",
            kallback: props.onOpenEditingDialog,
            icon: Pencil_default
          },
          {
            text: "Delete",
            kallback: () => setDeletionDialogOpen(true),
            icon: TrashcanIcon_default,
            color: PALETTE.system.red
          }
        ]
      }
    ) : null),
    props.url ? /* @__PURE__ */ React.createElement(
      "a",
      {
        href: getAbsoluteUrl(cleanUrl(props.url)),
        target: "_blank",
        style: {
          textDecoration: "none"
        },
        rel: "noreferrer"
      },
      /* @__PURE__ */ React.createElement(
        ContentCardCore,
        {
          type: props.type,
          title: props == null ? void 0 : props.title,
          twoLineTitleSectionHeight: props.twoLineTitleSectionHeight
        },
        props.children
      )
    ) : /* @__PURE__ */ React.createElement(
      ContentCardCore,
      {
        onClick: props.onClick,
        type: props.type,
        title: props == null ? void 0 : props.title,
        twoLineTitleSectionHeight: props.twoLineTitleSectionHeight
      },
      props.children
    )
  ), /* @__PURE__ */ React.createElement(
    DeletionDialog_default,
    {
      open: deletionDialogOpen,
      type: props.type,
      onClose: () => setDeletionDialogOpen(false),
      subtitle: `Are you sure that you want to get rid of this ${_16.capitalize(
        props.type
      )}?`,
      noConfirmation: true,
      onSubmit: props.onDelete,
      isMobile: props.isMobile
    }
  ));
};
var ContentCard_default = ContentCard;

// src/folder/components/VideoCard.tsx
var IMAGE_HEIGHT2 = 144;
var VideoCard = (props) => {
  return /* @__PURE__ */ React.createElement(
    ContentCard_default,
    {
      type: "video",
      title: props.title,
      url: props.url,
      noPointerEvents: props.noPointerEvents,
      noMenu: props.noMenu,
      onDelete: () => props.id && api_default.deleteVideo(props.id, !!props.channelId).then(
        props.onDelete
      ),
      onOpenEditingDialog: () => {
        var _a;
        return (_a = props.onOpenEditingDialog) == null ? void 0 : _a.call(props);
      },
      isMobile: props.isMobile,
      twoLineTitleSectionHeight: props.twoLineTitleSectionHeight
    },
    /* @__PURE__ */ React.createElement(
      Stack69,
      {
        height: IMAGE_HEIGHT2,
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 0 4px rgba(0,0,0,0.08)"
      },
      props.thumbnailUrl ? /* @__PURE__ */ React.createElement(
        "img",
        {
          src: props.thumbnailUrl,
          style: {
            objectFit: "cover",
            justifyContent: "center",
            alignItems: "center"
          },
          fill: true,
          alt: "video card image"
        }
      ) : /* @__PURE__ */ React.createElement(Stack69, { flex: 1, bgcolor: PALETTE.secondary.grey[2] }),
      /* @__PURE__ */ React.createElement(
        Stack69,
        {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          sx: {
            background: "radial-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0))",
            svg: {
              fill: {
                path: "rgb(255,255,255)"
              }
            }
          }
        },
        /* @__PURE__ */ React.createElement(play_default, { width: "26px", height: "26px" })
      )
    )
  );
};
var VideoCard_default = VideoCard;

// src/components/EmptyStateIllustration.tsx
import { Stack as Stack70 } from "@mui/system";
var EmptyStateIllustration = (props) => /* @__PURE__ */ React.createElement(
  Stack70,
  {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    sx: {
      pointerEvents: "none",
      filter: "grayscale(1)"
    },
    zIndex: 999
  },
  /* @__PURE__ */ React.createElement(UrsorFadeIn, { delay: 500, duration: 800 }, /* @__PURE__ */ React.createElement(Stack70, { position: "relative" }, /* @__PURE__ */ React.createElement(Stack70, { sx: { opacity: 0.3 } }, /* @__PURE__ */ React.createElement(
    "img",
    {
      height: 217,
      width: 217,
      src: "https://ursorassets.s3.eu-west-1.amazonaws.com/wondering_.png",
      alt: "Empty state illustration"
    }
  )), /* @__PURE__ */ React.createElement(
    Stack70,
    {
      width: "100%",
      alignItems: "center",
      sx: { transform: "translateY(-12px)" }
    },
    /* @__PURE__ */ React.createElement(
      Typography,
      {
        bold: true,
        variant: "medium",
        color: PALETTE.secondary.grey[3],
        sx: { textAlign: "center" }
      },
      props.children
    )
  )))
);
var EmptyStateIllustration_default = EmptyStateIllustration;

// src/channel/contents/body-desktop.tsx
var ChannelPageDesktopBody = (props) => {
  return /* @__PURE__ */ React39.createElement(
    PageLayout_default,
    {
      titleRow: props.titleRow,
      titleBackButtonCallback: props.onBack,
      bodyWidth: "100%",
      fullHeight: true,
      selectedSidebarItemId: "content",
      actions: props.actions,
      maxWidth: 834,
      scrollable: true
    },
    props.videos.length > 0 ? /* @__PURE__ */ React39.createElement(Stack71, { pt: "20px", pb: "33px", pl: "51px" }, /* @__PURE__ */ React39.createElement(DynamicCardGrid_default, { cardWidth: "292px", rowGap: "40px", columnGap: "20px" }, props.videos.map((v, i) => /* @__PURE__ */ React39.createElement(UrsorFadeIn, { key: v.id, duration: 800, delay: i * 90 }, /* @__PURE__ */ React39.createElement(
      VideoCard_default,
      {
        ...v,
        onDelete: props.onUpdate,
        onOpenEditingDialog: () => props.setVideoEditingDialogId(v.id),
        twoLineTitleSectionHeight: true
      }
    ))))) : /* @__PURE__ */ React39.createElement(EmptyStateIllustration_default, { paddingTop: 20 }, "No Videos in this Channel")
  );
};
var body_desktop_default3 = ChannelPageDesktopBody;

// src/channel/components/ChannelRenameDialog.tsx
import React40 from "react";
import { Stack as Stack72 } from "@mui/system";
import { useEffect as useEffect38, useState as useState60 } from "react";
var ChannelRenameDialog = (props) => {
  const [name, setName] = useState60("");
  useEffect38(() => setName(props.name), [props.name]);
  return /* @__PURE__ */ React40.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Rename Channel",
      width: "422px",
      height: "226px",
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React40.createElement(Stack72, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ React40.createElement(LabeledInputField, { label: "Name" }, /* @__PURE__ */ React40.createElement(
      UrsorInputField,
      {
        value: name,
        onChange: (event) => setName(event.target.value),
        placeholder: "Choose a new name",
        width: "100%",
        leftAlign: true
      }
    )), /* @__PURE__ */ React40.createElement(
      UrsorButton,
      {
        dark: true,
        variant: "tertiary",
        width: "100%",
        onClick: () => {
          props.onSubmit(name);
          props.onClose();
        }
      },
      "Save"
    ))
  );
};
var ChannelRenameDialog_default = ChannelRenameDialog;

// src/channel/contents/body-mobile.tsx
import React41 from "react";
import { useNavigate as useNavigate11 } from "react-router-dom";
import { Stack as Stack73 } from "@mui/system";
var ChannelPageMobileBody = (props) => {
  const navigate = useNavigate11();
  return /* @__PURE__ */ React41.createElement(
    MobilePageLayout_default,
    {
      titleRow: props.titleRow.slice(-1)[0],
      titleBackButtonCallback: props.onBack,
      selectedPage: "content",
      actions: props.actions
    },
    props.videos.length > 0 ? /* @__PURE__ */ React41.createElement(Stack73, { pb: "33px" }, /* @__PURE__ */ React41.createElement(Stack73, { spacing: "20px" }, props.videos.map((v, i) => /* @__PURE__ */ React41.createElement(UrsorFadeIn, { key: v.id, duration: 800, delay: i * 90 }, /* @__PURE__ */ React41.createElement(
      VideoCard_default,
      {
        ...v,
        onDelete: props.onUpdate,
        onOpenEditingDialog: () => props.setVideoEditingDialogId(v.id),
        twoLineTitleSectionHeight: true
      }
    ))))) : /* @__PURE__ */ React41.createElement(EmptyStateIllustration_default, { paddingTop: 20 }, "No Videos in this Channel")
  );
};
var body_mobile_default3 = ChannelPageMobileBody;

// src/channel/contents/common.tsx
var ChannelPage = (props) => {
  const navigate = useNavigate12();
  const [title, setTitle] = useState61("");
  const [folderId, setFolderId] = useState61();
  const [videos, setVideos] = useState61([]);
  const load = useCallback7(
    () => api_default.getChannel(props.id).then((c) => {
      setTitle(c.title);
      setFolderId(c.contentBucketId);
      setVideos(c.videos);
    }),
    [props.id]
  );
  useEffect39(() => {
    load();
  }, [load]);
  const [folder, setFolder] = useState61();
  useEffect39(() => {
    folderId && api_default.getFolder(folderId).then(setFolder);
  }, [folderId]);
  const [videoEditingDialogId, setVideoEditingDialogId] = useState61();
  const titleRow = [
    ...folder ? [
      {
        text: "My Folders",
        callback: () => navigate("/folders")
      },
      {
        text: (folder == null ? void 0 : folder.title) ?? "",
        callback: () => navigate(`/folders/${folderId}`)
      }
    ] : [],
    {
      text: title
    }
  ];
  const [deletionDialogOpen, setDeletionDialogOpen] = useState61(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState61(false);
  const actions = [
    {
      text: "Edit name",
      kallback: () => setRenameDialogOpen(true),
      icon: Pencil_default
    },
    {
      text: "Delete",
      kallback: () => setDeletionDialogOpen(true),
      icon: TrashcanIcon_default,
      color: PALETTE.system.red
    }
  ];
  const notificationCtx = useContext12(NotificationContext_default);
  const deleteChannel = () => api_default.deleteChannel(props.id).then(
    () => navigate(folderId ? `/folders/${folderId}` : "/folders")
  );
  return /* @__PURE__ */ React42.createElement(React42.Fragment, null, props.isMobile ? /* @__PURE__ */ React42.createElement(
    body_mobile_default3,
    {
      videos,
      onUpdate: load,
      titleRow,
      setVideoEditingDialogId,
      actions,
      onBack: () => navigate(folderId ? `/folders/${folderId}` : "/folders")
    }
  ) : /* @__PURE__ */ React42.createElement(
    body_desktop_default3,
    {
      videos,
      onUpdate: load,
      titleRow,
      setVideoEditingDialogId,
      actions,
      onBack: () => navigate(folderId ? `/folders/${folderId}` : "/folders")
    }
  ), videoEditingDialogId && folderId ? /* @__PURE__ */ React42.createElement(
    VideoCreationDialog_default,
    {
      open: true,
      onClose: () => {
        setVideoEditingDialogId(void 0);
      },
      folderId,
      creationCallback: load,
      updateDetails: {
        video: videos.find((v) => v.id === videoEditingDialogId),
        callback: load
      },
      belongsToChannel: true
    }
  ) : null, /* @__PURE__ */ React42.createElement(
    DeletionDialog_default,
    {
      open: deletionDialogOpen,
      type: "channel",
      onClose: () => setDeletionDialogOpen(false),
      subtitle: "If you remove this Channel, all of its Videos too will be deleted.",
      onSubmit: deleteChannel,
      isMobile: props.isMobile
    }
  ), /* @__PURE__ */ React42.createElement(
    ChannelRenameDialog_default,
    {
      open: renameDialogOpen,
      onClose: () => setRenameDialogOpen(false),
      name: title,
      onSubmit: (title2) => api_default.changeChannelName(props.id, title2).then(load).then(() => notificationCtx.success("Renamed Channel")),
      isMobile: props.isMobile
    }
  ));
};
var common_default2 = ChannelPage;

// src/channel/index.tsx
var Channel = ({ params }) => {
  return /* @__PURE__ */ React43.createElement(RootLayout, null, /* @__PURE__ */ React43.createElement(common_default2, { id: parseInt(params.id), isMobile: isMobile4 }));
};
var channel_default = Channel;

// src/filters/index.tsx
import React46 from "react";
import { isMobile as isMobile5 } from "react-device-detect";

// src/filters/contents/common.tsx
import { useEffect as useEffect42, useState as useState64 } from "react";

// src/filters/contents/body-desktop.tsx
import React44 from "react";
import { Stack as Stack76 } from "@mui/system";
import { useNavigate as useNavigate13 } from "react-router-dom";

// src/filter/components/FilterCard.tsx
import { Stack as Stack75 } from "@mui/system";

// src/images/icons/ListUnorderedIcon.svg
var ListUnorderedIcon_default = "./ListUnorderedIcon-XSAFOQHG.svg";

// src/images/icons/StopIcon.svg
var StopIcon_default = "./StopIcon-TEDRKAKM.svg";

// src/images/icons/LockIcon.svg
var LockIcon_default = "./LockIcon-IPAOEEA7.svg";

// src/filter/components/ProfileImageRow.tsx
import { Stack as Stack74 } from "@mui/system";
var ProfileImageRow = (props) => /* @__PURE__ */ React.createElement(Stack74, { direction: "row", spacing: "4px", height: "42px" }, props.devices.length > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Stack74, { direction: "row", spacing: "36px" }, props.devices.slice(0, 3).map((d, i) => /* @__PURE__ */ React.createElement(Stack74, { key: i, width: 0, position: "relative", overflow: "visible" }, /* @__PURE__ */ React.createElement(Stack74, { position: "absolute", bottom: 0, left: 0 }, /* @__PURE__ */ React.createElement(
  Stack74,
  {
    borderRadius: "100%",
    overflow: "hidden",
    boxShadow: "0 0 12px rgba(0,0,0,0.14)",
    minWidth: 42,
    minHeight: 42,
    justifyContent: "center",
    alignItems: "center",
    bgcolor: PALETTE.secondary.blue[2]
  },
  d.profileAvatarUrl ? /* @__PURE__ */ React.createElement(
    "img",
    {
      src: d.profileAvatarUrl,
      height: 42,
      width: 42,
      alt: "profile image"
    }
  ) : /* @__PURE__ */ React.createElement(Typography, { color: "rgb(255,255,255)", bold: true }, getInitials(d.name))
))))), props.totalDeviceCount > 3 ? /* @__PURE__ */ React.createElement(
  Stack74,
  {
    height: "63px",
    direction: "row",
    spacing: "4px",
    alignItems: "center",
    sx: {
      transform: "translate(48px, -10px)",
      svg: {
        path: {
          fill: PALETTE.secondary.grey[4]
        }
      }
    }
  },
  /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "small",
      bold: true,
      color: PALETTE.secondary.grey[4]
    },
    `+${props.totalDeviceCount - 3}`
  ),
  /* @__PURE__ */ React.createElement(PeopleIcon_default, { height: "12px", width: "12px" })
) : null) : /* @__PURE__ */ React.createElement(Stack74, { direction: "row", spacing: "6px", height: "42px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
  Stack74,
  {
    bgcolor: PALETTE.secondary.grey[2],
    width: "42px",
    height: "42px",
    overflow: "hidden",
    borderRadius: "100%"
  }
), /* @__PURE__ */ React.createElement(Typography, { variant: "small", bold: true, color: PALETTE.secondary.grey[3] }, "No Devices yet")));
var ProfileImageRow_default = ProfileImageRow;

// src/filter/components/FilterCard.tsx
var FilterCard = (props) => /* @__PURE__ */ React.createElement(
  Stack75,
  {
    height: props.isMobile ? "172px" : "213px",
    borderRadius: "12px",
    bgcolor: props.official ? "#EDEAFF" : "rgb(255,255,255)",
    p: "16px",
    boxSizing: "border-box",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden"
  },
  /* @__PURE__ */ React.createElement(Stack75, { spacing: "12px" }, /* @__PURE__ */ React.createElement(Stack75, { direction: "row", spacing: "4px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Typography, { bold: true, variant: props.isMobile ? "medium" : "h5" }, props.title), /* @__PURE__ */ React.createElement(VerifiedIcon_default, { height: "20px", width: "20px" })), /* @__PURE__ */ React.createElement(Typography, { variant: "small", bold: true, color: PALETTE.secondary.grey[4] }, /* @__PURE__ */ React.createElement(
    Stack75,
    {
      spacing: "4px",
      sx: { svg: { path: { fill: PALETTE.secondary.grey[4] } } }
    },
    /* @__PURE__ */ React.createElement(Stack75, { spacing: "4px", direction: "row", alignItems: "center" }, /* @__PURE__ */ React.createElement(ListUnorderedIcon_default, { width: "12px", height: "12px" }), /* @__PURE__ */ React.createElement("div", null, `${props.whitelistedCategories ?? 0} ${props.whitelistedCategories === 1 ? "Category" : "Categories"} allowed`)),
    /* @__PURE__ */ React.createElement(Stack75, { spacing: "4px", direction: "row", alignItems: "center" }, /* @__PURE__ */ React.createElement(StopIcon_default, { width: "12px", height: "12px" }), /* @__PURE__ */ React.createElement("div", null, `${props.blacklistedWords ?? 0} blocked ${props.blacklistedWords === 1 ? "word" : "words"}`))
  ))),
  /* @__PURE__ */ React.createElement(
    Stack75,
    {
      position: "absolute",
      right: props.isMobile ? 13 : 0,
      top: props.isMobile ? "56px" : "75px",
      sx: {
        svg: {
          path: {
            fill: "rgba(0,0,0,0.06)"
          }
        }
      }
    },
    /* @__PURE__ */ React.createElement(
      LockIcon_default,
      {
        height: props.isMobile ? "146px" : "171px",
        width: props.isMobile ? "146px" : "171px"
      }
    )
  ),
  /* @__PURE__ */ React.createElement(
    ProfileImageRow_default,
    {
      devices: props.devices,
      totalDeviceCount: props.totalDeviceCount
    }
  )
);
var FilterCard_default = FilterCard;

// src/filters/contents/body-desktop.tsx
function AllFiltersPageDesktopBody(props) {
  const navigate = useNavigate13();
  return /* @__PURE__ */ React44.createElement(
    PageLayout_default,
    {
      title: "My Filters",
      titleBackButton: true,
      info: INFOS.filters,
      bodyWidth: "100%",
      fullHeight: true,
      selectedSidebarItemId: "filters",
      button: {
        text: "Add a Filter",
        callback: props.setCreateFilterDialogOpen,
        icon: PlusIcon_default
      },
      maxWidth: 834
    },
    /* @__PURE__ */ React44.createElement(Stack76, { pl: "50px" }, /* @__PURE__ */ React44.createElement(DynamicCardGrid_default, { cardWidth: "350px", rowGap: "20px", columnGap: "20px" }, props.filters.map((f, i) => /* @__PURE__ */ React44.createElement(
      Stack76,
      {
        key: f.id,
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.6 }
        },
        onClick: () => navigate(`/filters/${f.id}`)
      },
      /* @__PURE__ */ React44.createElement(UrsorFadeIn, { duration: 800, delay: i * 150 }, /* @__PURE__ */ React44.createElement(FilterCard_default, { ...f }))
    ))))
  );
}

// src/filters/contents/body-mobile.tsx
import React45 from "react";
import { Stack as Stack77 } from "@mui/system";
import { useNavigate as useNavigate14 } from "react-router-dom";
function AllFiltersPageMobileBody(props) {
  const navigate = useNavigate14();
  return /* @__PURE__ */ React45.createElement(
    MobilePageLayout_default,
    {
      title: "My Filters",
      info: INFOS.filters,
      selectedPage: "filters",
      topRightElement: /* @__PURE__ */ React45.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          size: "small",
          endIcon: PlusIcon_default,
          onClick: props.setCreateFilterDialogOpen
        },
        "Add a Filter"
      )
    },
    /* @__PURE__ */ React45.createElement(DynamicCardGrid_default, { cardWidth: "350px", rowGap: "20px", columnGap: "20px" }, props.filters.map((f, i) => /* @__PURE__ */ React45.createElement(
      Stack77,
      {
        key: f.id,
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.6 }
        },
        onClick: () => navigate(`/filters/${f.id}`)
      },
      /* @__PURE__ */ React45.createElement(UrsorFadeIn, { duration: 800, delay: i * 150 }, /* @__PURE__ */ React45.createElement(FilterCard_default, { ...f, isMobile: true }))
    )))
  );
}

// src/filters/contents/common.tsx
import { useNavigate as useNavigate15 } from "react-router-dom";

// src/filter/components/FilterCreationDialog.tsx
import { Stack as Stack78 } from "@mui/system";
import { useState as useState63 } from "react";
var FilterCreationDialog = (props) => {
  const [name, setName] = useState63("");
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Create Filter",
      subtitle: ["Choose a name for", "your Filter."],
      width: "422px",
      dynamicHeight: true,
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(
      Stack78,
      {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        spacing: "12px"
      },
      /* @__PURE__ */ React.createElement(LabeledInputField, { label: "Name" }, /* @__PURE__ */ React.createElement(
        UrsorInputField,
        {
          value: name,
          onChange: (event) => setName(event.target.value),
          placeholder: "Choose a name",
          width: "100%",
          leftAlign: true
        }
      )),
      /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          width: "100%",
          onClick: () => {
            props.onSubmit(name);
            props.onClose();
          }
        },
        "Create"
      )
    )
  );
};
var FilterCreationDialog_default = FilterCreationDialog;

// src/filters/contents/common.tsx
import _17 from "lodash";
var AllFiltersPage = (props) => {
  const { user } = useAuth_default();
  const [filters, setFilters] = useState64([]);
  useEffect42(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupFilters(user.group_id).then(
      (filtahs) => setFilters(_17.sortBy(filtahs, (f) => f.id))
    );
  }, [user == null ? void 0 : user.group_id]);
  const [filterCreationDialogOpen, setFilterCreationDialogOpen] = useState64(false);
  const navigate = useNavigate15();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, props.isMobile ? /* @__PURE__ */ React.createElement(
    AllFiltersPageMobileBody,
    {
      filters,
      setCreateFilterDialogOpen: () => setFilterCreationDialogOpen(true)
    }
  ) : /* @__PURE__ */ React.createElement(
    AllFiltersPageDesktopBody,
    {
      filters,
      setCreateFilterDialogOpen: () => setFilterCreationDialogOpen(true)
    }
  ), /* @__PURE__ */ React.createElement(
    FilterCreationDialog_default,
    {
      open: filterCreationDialogOpen,
      onClose: () => setFilterCreationDialogOpen(false),
      onSubmit: (title) => (user == null ? void 0 : user.group_id) && api_default.createFilter(user.group_id, title).then(
        (f) => navigate(`/filters/${f.filterId}`)
      ),
      isMobile: props.isMobile
    }
  ));
};
var common_default3 = AllFiltersPage;

// src/filters/index.tsx
var Filter = () => {
  return /* @__PURE__ */ React46.createElement(RootLayout, null, /* @__PURE__ */ React46.createElement(common_default3, { isMobile: isMobile5 }));
};
var filters_default = Filter;

// src/filter/index.tsx
import React52 from "react";
import { isMobile as isMobile6 } from "react-device-detect";

// src/filter/contents/common.tsx
import React51, { useCallback as useCallback9, useContext as useContext14, useEffect as useEffect50, useState as useState75 } from "react";

// src/filter/contents/body-desktop.tsx
import React47 from "react";
import { Stack as Stack86 } from "@mui/system";

// src/images/icons/ThumbsUpIcon.svg
var ThumbsUpIcon_default = "./ThumbsUpIcon-KOAYIHKO.svg";

// src/filter/components/CategoriesSection.tsx
import { Stack as Stack79 } from "@mui/system";
import { useEffect as useEffect43, useState as useState65 } from "react";
var FilterLegend = (props) => /* @__PURE__ */ React.createElement(Stack79, { direction: "row", spacing: "20px" }, /* @__PURE__ */ React.createElement(Stack79, null, /* @__PURE__ */ React.createElement(
  Stack79,
  {
    direction: "row",
    alignItems: "center",
    spacing: props.small ? "7px" : "10px"
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: props.small ? "small" : "normal", bold: true }, "Allowed"),
  /* @__PURE__ */ React.createElement(
    Stack79,
    {
      height: props.small ? "12px" : "16px",
      width: props.small ? "12px" : "16px",
      borderRadius: "100%",
      bgcolor: PALETTE.system.green
    }
  )
)), /* @__PURE__ */ React.createElement(Stack79, null, /* @__PURE__ */ React.createElement(
  Stack79,
  {
    direction: "row",
    alignItems: "center",
    spacing: props.small ? "7px" : "10px"
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: props.small ? "small" : "normal", bold: true }, "Blocked"),
  /* @__PURE__ */ React.createElement(
    Stack79,
    {
      height: props.small ? "12px" : "16px",
      width: props.small ? "12px" : "16px",
      borderRadius: "100%",
      bgcolor: PALETTE.secondary.grey[3]
    }
  )
)), /* @__PURE__ */ React.createElement(Stack79, null, /* @__PURE__ */ React.createElement(
  Stack79,
  {
    direction: "row",
    alignItems: "center",
    spacing: props.small ? "7px" : "10px"
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: props.small ? "small" : "normal", bold: true }, "Custom"),
  /* @__PURE__ */ React.createElement(
    Stack79,
    {
      height: props.small ? "12px" : "16px",
      width: props.small ? "12px" : "16px",
      borderRadius: "100%",
      bgcolor: PALETTE.system.orange
    }
  )
)));
var CategoryCard = (props) => {
  const [collapsed, setCollapsed] = useState65(true);
  const [status, setStatus] = useState65("off");
  useEffect43(
    () => setStatus(
      props.subCategories.every((c) => props.allowedCategories.includes(c.id)) ? "on" : props.subCategories.some(
        (c) => props.allowedCategories.includes(c.id)
      ) ? "custom" : "off"
    ),
    [props.subCategories, props.allowedCategories]
  );
  const [nAllowedCategories, setNAllowedCategories] = useState65(0);
  useEffect43(() => {
    setNAllowedCategories(
      props.subCategories.filter(
        (sc) => props.allowedCategories.includes(sc.id)
      ).length ?? 0
    );
  }, [props.allowedCategories]);
  return /* @__PURE__ */ React.createElement(AstroCard_default, { key: props.categoryId }, /* @__PURE__ */ React.createElement(DynamicContainer, { duration: 600 }, /* @__PURE__ */ React.createElement(Stack79, { p: "16px", spacing: "16px" }, /* @__PURE__ */ React.createElement(
    Stack79,
    {
      direction: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    /* @__PURE__ */ React.createElement(Stack79, null, /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.title), /* @__PURE__ */ React.createElement(
      Typography,
      {
        bold: true,
        variant: "small",
        color: PALETTE.secondary.grey[3]
      },
      `${nAllowedCategories} ${nAllowedCategories === 1 ? "Category" : "Categories"} allowed`
    )),
    /* @__PURE__ */ React.createElement(Stack79, { direction: "row", spacing: "20px" }, /* @__PURE__ */ React.createElement(
      Stack79,
      {
        sx: {
          pointerEvents: props.permanentlyBlocked ? "none" : void 0
        }
      },
      /* @__PURE__ */ React.createElement(
        AstroSwitch_default,
        {
          on: status === "on",
          compromise: status === "custom",
          callback: () => props.flipCategory(props.categoryId),
          icon: props.permanentlyBlocked ? LockIcon_default : void 0
        }
      )
    ), /* @__PURE__ */ React.createElement(
      Stack79,
      {
        sx: {
          transform: `rotate(${collapsed ? 0 : 180}deg)`,
          transition: "0.2s",
          cursor: "pointer",
          "&:hover": { opacity: 0.6 }
        },
        onClick: () => setCollapsed(!collapsed)
      },
      /* @__PURE__ */ React.createElement(ChevronDown_default, { height: "24px", width: "24px" })
    ))
  ), !collapsed ? /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "292px", rowGap: "8px", columnGap: "20px" }, props.subCategories.map((sc, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: sc.id, duration: 800, delay: i * 40 }, /* @__PURE__ */ React.createElement(
    Stack79,
    {
      height: "72px",
      bgcolor: "rgb(255,255,255)",
      borderRadius: "12px",
      border: `1px solid ${PALETTE.secondary.grey[2]}`,
      px: "16px",
      boxSizing: "border-box",
      justifyContent: "space-between",
      alignItems: "center",
      direction: "row",
      onClick: () => props.flipSubcategory(sc.id),
      sx: {
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.7 },
        pointerEvents: props.permanentlyBlocked ? "none" : void 0
      }
    },
    /* @__PURE__ */ React.createElement(Stack79, { justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(Stack79, { spacing: "16px", alignItems: "center", direction: "row" }, /* @__PURE__ */ React.createElement(Typography, { maxLines: 1, bold: true }, sc.title))),
    /* @__PURE__ */ React.createElement(
      AstroSwitch_default,
      {
        on: props.allowedCategories.includes(sc.id),
        callback: () => null,
        icon: props.permanentlyBlocked ? LockIcon_default : void 0
      }
    )
  )))) : null)));
};
var FilterPageCategoriesSection = (props) => /* @__PURE__ */ React.createElement(
  AstroBentoCard,
  {
    icon: ThumbsUpIcon_default,
    title: `${props.allowedCategories.length} allowed ${props.allowedCategories.length === 1 ? "Category" : "Categories"}`,
    subtitle: "Turn the switch on to allow the Category to be browsed on the assigned Devices.",
    topRightStuff: /* @__PURE__ */ React.createElement(FilterLegend, null)
  },
  /* @__PURE__ */ React.createElement(Stack79, { spacing: "20px" }, props.categories.map((cg) => /* @__PURE__ */ React.createElement(
    CategoryCard,
    {
      key: cg.categoryId,
      ...cg,
      flipCategory: props.flipCategory,
      flipSubcategory: props.flipSubcategory,
      allowedCategories: props.allowedCategories
    }
  )))
);
var CategoriesSection_default = FilterPageCategoriesSection;

// src/filter/components/AllowedSitesSection.tsx
import { Stack as Stack81 } from "@mui/system";
import dayjs9 from "dayjs";
import { useEffect as useEffect44, useState as useState66 } from "react";
import _18 from "lodash";

// src/filter/components/FilterWhitelistExceptionDialog.tsx
import { Stack as Stack80 } from "@mui/system";
var FilterWhitelistExceptionDialog = (props) => {
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Are you sure?",
      subtitle: [
        "This will override our Filters and give all of the assigned Devices access to this site. They will be able to access this site until it is removed or they change Filter."
      ],
      width: "422px",
      dynamicHeight: true,
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(Stack80, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(
      Stack80,
      {
        spacing: "8px",
        width: "100%",
        height: "100%",
        justifyContent: "flex-end"
      },
      /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          width: "100%",
          onClick: () => {
            props.onSubmit();
            props.onClose();
          }
        },
        "Yes"
      ),
      /* @__PURE__ */ React.createElement(UrsorButton, { variant: "secondary", width: "100%", onClick: props.onClose }, "No")
    ))
  );
};
var FilterWhitelistExceptionDialog_default = FilterWhitelistExceptionDialog;

// src/filter/components/AllowedSitesSection.tsx
var FilterPageAllowedSitesSection = (props) => {
  const TABLE_COLUMNS = [
    {
      name: "title",
      displayName: "Title",
      sortable: true,
      newTag: true,
      getAvatar: (i) => {
        var _a;
        return /* @__PURE__ */ React.createElement(Stack81, { minWidth: "20px", borderRadius: "100%", overflow: "hidden" }, /* @__PURE__ */ React.createElement(
          "img",
          {
            src: ((_a = props.allowedSites[parseInt(i)]) == null ? void 0 : _a.favicon) ?? "",
            height: 20,
            width: 20,
            alt: "allowed site favicon"
          }
        ));
      }
    },
    {
      name: "domain",
      displayName: "Domain",
      sortable: true
    },
    ...props.isMobile ? [] : [
      {
        name: "createdAt",
        displayName: "Added on",
        sortable: true,
        itemDisplay: (createdAt) => dayjs9(createdAt).format("MM/DD/YYYY")
      }
    ]
  ];
  const [rows, setRows] = useState66([]);
  useEffect44(() => {
    (async () => {
      var _a;
      const linkRows = ((_a = props.allowedSites) == null ? void 0 : _a.map((a, i) => ({
        id: i.toString(),
        items: {
          title: a.title ?? "",
          domain: a.domain,
          createdAt: a.createdAt
        },
        tags: [],
        disabled: false,
        url: a.domain
      }))) || [];
      setRows(linkRows);
    })();
  }, [props.allowedSites]);
  const [sortedRows, setSortedRows] = useState66([]);
  const [filteredRows, setFilteredRows] = useState66([]);
  const [inputValue, setInputValue] = useState66("");
  useEffect44(() => {
    setFilteredRows(
      rows.filter(
        (row) => inputValue ? [row.items.title, row.items.domain.replace("www.", "")].join("_").toLowerCase().includes(inputValue.toLowerCase()) : true
      )
    );
  }, [rows, inputValue]);
  const [sortedColumn, setSortedColumn] = useState66("createdAt");
  const [sortDirection, setSortDirection] = useState66("desc");
  useEffect44(() => {
    if (!filteredRows) return;
    const sorted = _18.sortBy(
      rows,
      (row) => {
        var _a, _b;
        return (
          //@ts-ignore
          (_b = (_a = row.items) == null ? void 0 : _a[sortedColumn]) == null ? void 0 : _b.toLowerCase()
        );
      }
    );
    setSortedRows(sortDirection === "asc" ? _18.reverse(sorted.slice()) : sorted);
  }, [rows, sortDirection, sortedColumn]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState66(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      icon: ThumbsUpIcon_default,
      title: `${props.allowedSites.length ?? 0} allowed site exception${props.allowedSites.length === 1 ? "" : "s "}`,
      subtitle: "Add sites here that you always want to be accessible. Even if you block their corresponding Category. Be careful this overrides the Filter!",
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(Stack81, { spacing: "20px" }, /* @__PURE__ */ React.createElement(
      UrsorInputField,
      {
        value: inputValue,
        onChange: (event) => setInputValue(event.target.value),
        onEnterKey: () => setConfirmationDialogOpen(true),
        placeholder: "Add a URL",
        width: "100%",
        leftAlign: true,
        boldValue: true
      }
    ), sortedRows.length > 0 ? /* @__PURE__ */ React.createElement(
      UrsorTable,
      {
        columns: TABLE_COLUMNS,
        rows: sortedRows,
        defaultSortedByColumn: "createdAt",
        defaultSortedAscending: true,
        selectedSort: sortedColumn,
        ascending: sortDirection === "asc",
        sortSelectionCallback: (columnId) => {
          if (columnId === sortedColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
          } else {
            setSortedColumn(columnId);
            setSortDirection("asc");
          }
        },
        noHeaderGradient: true,
        getActionButtonItems: (i) => [
          {
            icon: TrashcanIcon_default,
            text: "Delete",
            kallback: () => props.delete(props.allowedSites[parseInt(i)].domain),
            color: PALETTE.system.red
          }
        ],
        rowClickCallback: (id) => null,
        titleColumnWidth: "20%"
      }
    ) : null)
  ), /* @__PURE__ */ React.createElement(
    FilterWhitelistExceptionDialog_default,
    {
      open: confirmationDialogOpen,
      onClose: () => setConfirmationDialogOpen(false),
      onSubmit: () => {
        props.add(inputValue);
        setInputValue("");
      },
      isMobile: props.isMobile
    }
  ));
};
var AllowedSitesSection_default = FilterPageAllowedSitesSection;

// src/images/icons/ThumbsDownIcon.svg
var ThumbsDownIcon_default = "./ThumbsDownIcon-HCCZMO6F.svg";

// src/filter/components/BlockedSitesSection.tsx
import { Stack as Stack83 } from "@mui/system";
import dayjs10 from "dayjs";
import { useEffect as useEffect45, useState as useState67 } from "react";
import _19 from "lodash";

// src/filter/components/FilterBlacklistExceptionDialog.tsx
import { Stack as Stack82 } from "@mui/system";
var FilterBlacklistExceptionDialog = (props) => {
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Are you sure?",
      subtitle: [
        "This will override our Filters and remove access to this site from all of the assigned Devices. They will not be able to access this site until it is removed or they change Filter."
      ],
      width: "422px",
      dynamicHeight: true,
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(Stack82, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(
      Stack82,
      {
        spacing: "8px",
        width: "100%",
        height: "100%",
        justifyContent: "flex-end"
      },
      /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          width: "100%",
          onClick: () => {
            props.onSubmit();
            props.onClose();
          }
        },
        "Yes"
      ),
      /* @__PURE__ */ React.createElement(UrsorButton, { variant: "secondary", width: "100%", onClick: props.onClose }, "No")
    ))
  );
};
var FilterBlacklistExceptionDialog_default = FilterBlacklistExceptionDialog;

// src/filter/components/BlockedSitesSection.tsx
var FilterPageBlockedSitesSection = (props) => {
  const TABLE_COLUMNS = [
    {
      name: "title",
      displayName: "Title",
      sortable: true,
      newTag: true,
      getAvatar: (i) => {
        var _a;
        return /* @__PURE__ */ React.createElement(Stack83, { minWidth: "20px", borderRadius: "100%", overflow: "hidden" }, /* @__PURE__ */ React.createElement(
          "img",
          {
            src: ((_a = props.blockedSites[parseInt(i)]) == null ? void 0 : _a.favicon) ?? "",
            height: 20,
            width: 20,
            alt: "allowed site favicon"
          }
        ));
      }
    },
    {
      name: "domain",
      displayName: "Domain",
      sortable: true
    },
    {
      name: "createdAt",
      displayName: "Added on",
      sortable: true,
      itemDisplay: (createdAt) => dayjs10(createdAt).format("MM/DD/YYYY")
    }
  ];
  const [rows, setRows] = useState67([]);
  useEffect45(() => {
    (async () => {
      var _a;
      const linkRows = ((_a = props.blockedSites) == null ? void 0 : _a.map((b, i) => ({
        id: i.toString(),
        items: {
          title: b.title ?? "",
          domain: b.domain,
          createdAt: b.createdAt
        },
        tags: [],
        disabled: false,
        url: b.domain
      }))) || [];
      setRows(linkRows);
    })();
  }, [props.blockedSites]);
  const [sortedRows, setSortedRows] = useState67([]);
  const [filteredRows, setFilteredRows] = useState67([]);
  const [inputValue, setInputValue] = useState67("");
  useEffect45(() => {
    setFilteredRows(
      rows.filter(
        (row) => inputValue ? [row.items.title, row.items.domain.replace("www.", "")].join("_").toLowerCase().includes(inputValue.toLowerCase()) : true
      )
    );
  }, [rows, inputValue]);
  const [sortedColumn, setSortedColumn] = useState67("createdAt");
  const [sortDirection, setSortDirection] = useState67("desc");
  useEffect45(() => {
    if (!filteredRows) return;
    const sorted = _19.sortBy(
      rows,
      (row) => {
        var _a, _b;
        return (
          //@ts-ignore
          (_b = (_a = row.items) == null ? void 0 : _a[sortedColumn]) == null ? void 0 : _b.toLowerCase()
        );
      }
    );
    setSortedRows(sortDirection === "asc" ? _19.reverse(sorted.slice()) : sorted);
  }, [rows, sortDirection, sortedColumn]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState67(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      icon: ThumbsDownIcon_default,
      title: `${props.blockedSites.length ?? 0} blocked site exception${props.blockedSites.length === 1 ? "" : "s"}`,
      subtitle: "Add sites here that you never want to be accessible. This will make sure the site isn't accessible even if the rest of the corresponding Category is!",
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(Stack83, { spacing: "20px" }, /* @__PURE__ */ React.createElement(
      UrsorInputField,
      {
        value: inputValue,
        onChange: (event) => setInputValue(event.target.value),
        onEnterKey: () => setConfirmationDialogOpen(true),
        placeholder: "Add a URL",
        width: "100%",
        leftAlign: true,
        boldValue: true
      }
    ), sortedRows.length > 0 ? /* @__PURE__ */ React.createElement(
      UrsorTable,
      {
        columns: TABLE_COLUMNS,
        rows: sortedRows,
        defaultSortedByColumn: "createdAt",
        defaultSortedAscending: true,
        selectedSort: sortedColumn,
        ascending: sortDirection === "asc",
        sortSelectionCallback: (columnId) => {
          if (columnId === sortedColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
          } else {
            setSortedColumn(columnId);
            setSortDirection("asc");
          }
        },
        noHeaderGradient: true,
        getActionButtonItems: (i) => [
          {
            icon: TrashcanIcon_default,
            text: "Delete",
            kallback: () => props.delete(props.blockedSites[parseInt(i)].domain),
            color: PALETTE.system.red
          }
        ],
        rowClickCallback: (id) => null
      }
    ) : null)
  ), /* @__PURE__ */ React.createElement(
    FilterBlacklistExceptionDialog_default,
    {
      open: confirmationDialogOpen,
      onClose: () => setConfirmationDialogOpen(false),
      onSubmit: () => {
        props.add(inputValue);
        setInputValue("");
      },
      isMobile: props.isMobile
    }
  ));
};
var BlockedSitesSection_default = FilterPageBlockedSitesSection;

// src/filter/components/SearchWordsSection.tsx
import { Stack as Stack84 } from "@mui/system";
import { useState as useState68 } from "react";
import { Grid } from "@mui/material";
var BlockedWordTag = (props) => /* @__PURE__ */ React.createElement(
  Stack84,
  {
    height: "36px",
    minWidth: "98px",
    direction: "row",
    bgcolor: PALETTE.secondary.grey[1],
    borderRadius: "8px",
    px: "12px",
    alignItems: "center",
    justifyContent: "space-between",
    spacing: "9px"
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: "small", bold: true }, props.word),
  /* @__PURE__ */ React.createElement(
    Stack84,
    {
      sx: {
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s"
      },
      onClick: props.onClick
    },
    /* @__PURE__ */ React.createElement(X_default, { width: "16px", height: "16px" })
  )
);
var SearchWordsSection = (props) => {
  const [inputValue, setInputValue] = useState68("");
  return /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      icon: StopIcon_default,
      iconColor: PALETTE.system.red,
      title: `${props.blockedSearchWords.length} blocked search word${props.blockedSearchWords.length === 1 ? "" : "s "}`,
      subtitle: "Enter words that you want to be blocked or flagged if they are entered in the search engine on the Device.",
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(Stack84, { spacing: "6px" }, /* @__PURE__ */ React.createElement(
      UrsorInputField,
      {
        value: inputValue,
        onChange: (event) => setInputValue(event.target.value),
        onEnterKey: () => {
          props.addWord(inputValue);
          setInputValue("");
        },
        placeholder: "Add a word to block",
        width: "100%",
        leftAlign: true,
        boldValue: true
      }
    ), props.isMobile ? /* @__PURE__ */ React.createElement(Grid, { container: true, gap: "6px" }, props.blockedSearchWords.map((bs, i) => /* @__PURE__ */ React.createElement(Grid, { key: i, item: true }, /* @__PURE__ */ React.createElement(
      BlockedWordTag,
      {
        word: bs,
        onClick: () => props.removeWord(bs)
      }
    )))) : /* @__PURE__ */ React.createElement(Stack84, { direction: "row", spacing: "12px" }, props.blockedSearchWords.map((bs, i) => /* @__PURE__ */ React.createElement(
      BlockedWordTag,
      {
        key: i,
        word: bs,
        onClick: () => props.removeWord(bs)
      }
    ))))
  );
};
var SearchWordsSection_default = SearchWordsSection;

// src/filter/components/FilterDevicesSection.tsx
import { Stack as Stack85 } from "@mui/system";
import { useNavigate as useNavigate16 } from "react-router-dom";
import { useState as useState69 } from "react";
var FilterPageDevicesSection = (props) => {
  const navigate = useNavigate16();
  const [hoveringOnButton, setHoveringOnButton] = useState69(false);
  const [devicesGridDialogOpen, setDevicesGridDialogOpen] = useState69(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: props.devices.length === 0 ? "No Devices yet have this Filter applied" : props.devices.length === 1 ? "Filter applied to this Device" : `Filter applied to these ${props.devices.length ?? 0} Devices`,
      info: INFOS.filterDevice,
      notCollapsible: true,
      topRightStuff: /* @__PURE__ */ React.createElement(Stack85, { direction: "row", spacing: "12px" }, /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          size: "small",
          variant: "secondary",
          endIcon: ChevronRight_default,
          iconSize: 16,
          onClick: () => setDevicesGridDialogOpen(true)
        },
        "View all"
      ), /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          size: "small",
          endIcon: PlusIcon_default,
          iconSize: 16,
          onClick: props.onAdd
        },
        "Add Device"
      ))
    },
    props.devices.length > 0 ? /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "292px", rowGap: "8px", columnGap: "20px" }, props.devices.map((d, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: i, duration: 800, delay: i * 150 }, /* @__PURE__ */ React.createElement(
      Stack85,
      {
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
          transition: "0.2s"
        }
      },
      /* @__PURE__ */ React.createElement(
        DeviceCard_default,
        {
          ...d,
          button: /* @__PURE__ */ React.createElement(
            Stack85,
            {
              onClick: () => props.openChangeFilterDialogForDevice(d)
            },
            /* @__PURE__ */ React.createElement(X_default, { height: 16, width: 16 })
          ),
          noExtras: true,
          onClick: () => navigate(`/profiles/${d.id}`)
        }
      )
    )))) : /* @__PURE__ */ React.createElement(
      Stack85,
      {
        height: "90px",
        spacing: "1px",
        borderRadius: "8px",
        border: `1px solid ${PALETTE.secondary.grey[2]}`,
        justifyContent: "center",
        alignItems: "center",
        bgcolor: hoveringOnButton ? PALETTE.secondary.grey[1] : "rgb(255,255,255)",
        sx: {
          transition: "0.2s",
          cursor: "pointer",
          svg: {
            path: {
              fill: PALETTE.secondary.grey[4]
            }
          }
        },
        onMouseEnter: () => setHoveringOnButton(true),
        onMouseLeave: () => setHoveringOnButton(false),
        onClick: props.onAdd
      },
      /* @__PURE__ */ React.createElement(PlusIcon_default, { height: "32px", width: "32px" }),
      /* @__PURE__ */ React.createElement(
        Typography,
        {
          bold: true,
          color: PALETTE.secondary.grey[hoveringOnButton ? 4 : 3]
        },
        "Add a Device"
      )
    )
  ), /* @__PURE__ */ React.createElement(
    AllDevicesDialog_default,
    {
      title: `${props.devices.length} ${props.devices.length === 1 ? "Device has" : "Devices have"} this Filter applied`,
      devices: props.devices.slice(0, 4),
      open: devicesGridDialogOpen,
      onClose: () => setDevicesGridDialogOpen(false),
      onAdd: props.onAdd,
      onRemove: (id) => {
        const device = props.devices.find((d) => d.id === id);
        device && props.openChangeFilterDialogForDevice(device);
      }
    }
  ));
};
var FilterDevicesSection_default = FilterPageDevicesSection;

// src/filter/contents/body-desktop.tsx
import { useNavigate as useNavigate17 } from "react-router-dom";
function FilterPageDesktopBody(props) {
  const navigate = useNavigate17();
  return /* @__PURE__ */ React47.createElement(
    PageLayout_default,
    {
      titleRow: props.titleRow,
      titleBackButtonCallback: () => navigate("/filters"),
      bodyWidth: "100%",
      fullHeight: true,
      selectedSidebarItemId: "filters",
      maxWidth: 834,
      scrollable: true,
      actions: props.actions
    },
    /* @__PURE__ */ React47.createElement(Stack86, { pl: "49px", pr: "2px", spacing: "20px", pb: "33px" }, /* @__PURE__ */ React47.createElement(
      FilterDevicesSection_default,
      {
        devices: props.devices,
        onAdd: props.setAddDeviceDialogOpen,
        onRemove: props.onRemoveDevice,
        openChangeFilterDialogForDevice: props.openChangeFilterDialogForDevice
      }
    ), /* @__PURE__ */ React47.createElement(
      CategoriesSection_default,
      {
        filter: props.filter,
        categories: props.categories,
        allowedCategories: props.allowedCategories,
        flipCategory: props.flipCategory,
        flipSubcategory: props.flipSubcategory
      }
    ), /* @__PURE__ */ React47.createElement(
      AllowedSitesSection_default,
      {
        allowedSites: props.allowedSites,
        add: props.addAllowedSite,
        delete: props.removeAllowedSite
      }
    ), /* @__PURE__ */ React47.createElement(
      BlockedSitesSection_default,
      {
        blockedSites: props.blockedSites,
        add: props.addBlockedSite,
        delete: props.removeBlockedSite
      }
    ), /* @__PURE__ */ React47.createElement(
      SearchWordsSection_default,
      {
        blockedSearchWords: props.blockedSearchWords,
        addWord: props.addToBlockedSearchWords,
        removeWord: props.removeFromBlockedSearchWords
      }
    ))
  );
}

// src/filter/contents/common.tsx
import { useNavigate as useNavigate20 } from "react-router-dom";

// src/filter/contents/body-mobile.tsx
import React49 from "react";
import { Stack as Stack89 } from "@mui/system";

// src/filter/components/MobileFilterDevicesSection.tsx
import React48 from "react";
import { Stack as Stack87 } from "@mui/system";
import { useNavigate as useNavigate18 } from "react-router-dom";
import { useState as useState71 } from "react";
var MobileFilterPageDevicesSection = (props) => {
  const navigate = useNavigate18();
  const [hoveringOnButton, setHoveringOnButton] = useState71(false);
  const [devicesGridDialogOpen, setDevicesGridDialogOpen] = useState71(false);
  return /* @__PURE__ */ React48.createElement(React48.Fragment, null, /* @__PURE__ */ React48.createElement(
    AstroBentoCard,
    {
      title: props.devices.length === 0 ? "No Devices yet have this Filter applied" : props.devices.length === 1 ? "Filter applied to this Device" : `Filter applied to these ${props.devices.length ?? 0} Devices`,
      info: INFOS.filterDevice,
      isMobile: true,
      notCollapsible: true
    },
    props.devices.length > 0 ? /* @__PURE__ */ React48.createElement(DynamicCardGrid_default, { cardWidth: "150px", rowGap: "12px", columnGap: "12px" }, props.devices.map((d, i) => /* @__PURE__ */ React48.createElement(UrsorFadeIn, { key: i, duration: 800, delay: i * 150 }, /* @__PURE__ */ React48.createElement(
      Stack87,
      {
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
          transition: "0.2s"
        }
      },
      /* @__PURE__ */ React48.createElement(
        MobileDeviceCard_default,
        {
          ...d,
          button: /* @__PURE__ */ React48.createElement(
            Stack87,
            {
              onClick: () => props.openChangeFilterDialogForDevice(d)
            },
            /* @__PURE__ */ React48.createElement(X_default, { height: 16, width: 16 })
          ),
          noExtras: true,
          onClick: () => navigate(`/profiles/${d.id}`)
        }
      )
    )))) : /* @__PURE__ */ React48.createElement(
      Stack87,
      {
        height: "90px",
        spacing: "1px",
        borderRadius: "8px",
        border: `1px solid ${PALETTE.secondary.grey[2]}`,
        justifyContent: "center",
        alignItems: "center",
        bgcolor: hoveringOnButton ? PALETTE.secondary.grey[1] : "rgb(255,255,255)",
        sx: {
          transition: "0.2s",
          cursor: "pointer",
          svg: {
            path: {
              fill: PALETTE.secondary.grey[4]
            }
          }
        },
        onMouseEnter: () => setHoveringOnButton(true),
        onMouseLeave: () => setHoveringOnButton(false),
        onClick: props.onAdd
      },
      /* @__PURE__ */ React48.createElement(PlusIcon_default, { height: "32px", width: "32px" }),
      /* @__PURE__ */ React48.createElement(
        Typography,
        {
          bold: true,
          color: PALETTE.secondary.grey[hoveringOnButton ? 4 : 3]
        },
        "Add a Device"
      )
    ),
    /* @__PURE__ */ React48.createElement(Stack87, { direction: "row", spacing: "12px", pt: "14px" }, /* @__PURE__ */ React48.createElement(
      UrsorButton,
      {
        size: "small",
        variant: "secondary",
        endIcon: ChevronRight_default,
        iconSize: 16,
        onClick: () => setDevicesGridDialogOpen(true),
        width: "100%"
      },
      "View all"
    ), /* @__PURE__ */ React48.createElement(
      UrsorButton,
      {
        dark: true,
        variant: "tertiary",
        size: "small",
        endIcon: PlusIcon_default,
        iconSize: 16,
        onClick: props.onAdd,
        width: "100%"
      },
      "Add Device"
    ))
  ), /* @__PURE__ */ React48.createElement(
    MobileAllDevicesDialog_default,
    {
      title: `${props.devices.length} ${props.devices.length === 1 ? "Device has" : "Devices have"} this Filter applied`,
      devices: props.devices.slice(0, 4),
      open: devicesGridDialogOpen,
      onClose: () => setDevicesGridDialogOpen(false),
      onAdd: props.onAdd,
      onRemove: (id) => {
        const device = props.devices.find((d) => d.id === id);
        device && props.openChangeFilterDialogForDevice(device);
      }
    }
  ));
};
var MobileFilterDevicesSection_default = MobileFilterPageDevicesSection;

// src/filter/components/MobileCategoriesSection.tsx
import { Stack as Stack88 } from "@mui/system";
var MobileFilterPageCategoriesSection = (props) => /* @__PURE__ */ React.createElement(
  AstroBentoCard,
  {
    icon: ThumbsUpIcon_default,
    title: `${props.allowedCategories.length} allowed ${props.allowedCategories.length === 1 ? "Category" : "Categories"}`,
    subtitle: "Turn the switch on to allow the Category to be browsed on the assigned Devices.",
    isMobile: true
  },
  /* @__PURE__ */ React.createElement(Stack88, { spacing: "10px" }, /* @__PURE__ */ React.createElement(Stack88, { alignItems: "flex-end" }, /* @__PURE__ */ React.createElement(FilterLegend, { small: true })), props.categories.map((c, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: c.categoryId, duration: 800, delay: i * 80 }, /* @__PURE__ */ React.createElement(
    Stack88,
    {
      height: "50px",
      bgcolor: "rgb(255,255,255)",
      borderRadius: "12px",
      border: `1px solid ${PALETTE.secondary.grey[2]}`,
      px: "16px",
      boxSizing: "border-box",
      justifyContent: "space-between",
      alignItems: "center",
      direction: "row"
    },
    /* @__PURE__ */ React.createElement(Stack88, { justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(Stack88, { spacing: "16px", alignItems: "center", direction: "row" }, /* @__PURE__ */ React.createElement(Typography, { maxLines: 1, bold: true }, c.title))),
    /* @__PURE__ */ React.createElement(
      AstroSwitch_default,
      {
        on: props.allowedCategories.includes(c.categoryId),
        callback: () => props.flipCategory(c.categoryId)
      }
    )
  ))))
);
var MobileCategoriesSection_default = MobileFilterPageCategoriesSection;

// src/filter/contents/body-mobile.tsx
import { useNavigate as useNavigate19 } from "react-router-dom";
function FilterPageMobileBody(props) {
  const navigate = useNavigate19();
  return /* @__PURE__ */ React49.createElement(
    MobilePageLayout_default,
    {
      actions: props.actions,
      titleRow: props.titleRow.slice(-1)[0],
      titleBackButtonCallback: () => navigate("/filters"),
      selectedPage: "filters"
    },
    /* @__PURE__ */ React49.createElement(Stack89, { spacing: "20px", pb: "33px" }, /* @__PURE__ */ React49.createElement(
      MobileFilterDevicesSection_default,
      {
        devices: props.devices,
        onAdd: props.setAddDeviceDialogOpen,
        openChangeFilterDialogForDevice: props.openChangeFilterDialogForDevice
      }
    ), /* @__PURE__ */ React49.createElement(
      MobileCategoriesSection_default,
      {
        filter: props.filter,
        categories: props.categories,
        allowedCategories: props.allowedCategories,
        flipCategory: props.flipCategory,
        flipSubcategory: props.flipSubcategory
      }
    ), /* @__PURE__ */ React49.createElement(
      AllowedSitesSection_default,
      {
        allowedSites: props.allowedSites,
        add: props.addAllowedSite,
        delete: props.removeAllowedSite,
        isMobile: true
      }
    ), /* @__PURE__ */ React49.createElement(
      BlockedSitesSection_default,
      {
        blockedSites: props.blockedSites,
        add: props.addBlockedSite,
        delete: props.removeBlockedSite,
        isMobile: true
      }
    ), /* @__PURE__ */ React49.createElement(
      SearchWordsSection_default,
      {
        blockedSearchWords: props.blockedSearchWords,
        addWord: props.addToBlockedSearchWords,
        removeWord: props.removeFromBlockedSearchWords,
        isMobile: true
      }
    ))
  );
}

// src/filter/components/FilterRenameDialog.tsx
import { Stack as Stack90 } from "@mui/system";
import { useEffect as useEffect48, useState as useState73 } from "react";
var FilterRenameDialog = (props) => {
  const [name, setName] = useState73("");
  useEffect48(() => setName(props.name), [props.name]);
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Rename Filter",
      width: "422px",
      height: "226px",
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(Stack90, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(LabeledInputField, { label: "Name" }, /* @__PURE__ */ React.createElement(
      UrsorInputField,
      {
        value: name,
        onChange: (event) => setName(event.target.value),
        placeholder: "Choose a new name",
        width: "100%",
        leftAlign: true
      }
    )), /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        variant: "tertiary",
        width: "100%",
        onClick: () => {
          props.onSubmit(name);
          props.onClose();
        }
      },
      "Save"
    ))
  );
};
var FilterRenameDialog_default = FilterRenameDialog;

// src/filter/components/ChangeFilterDialog.tsx
import React50 from "react";
import { Stack as Stack91 } from "@mui/system";
import { useEffect as useEffect49, useState as useState74 } from "react";
var ChangeFilterDialog = (props) => {
  const [allFilters, setAllFilters] = useState74([]);
  useEffect49(() => {
    api_default.getGroupFilters(props.groupId).then((d) => setAllFilters(d));
  }, [props.groupId]);
  return /* @__PURE__ */ React50.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Change Filter",
      subtitle: ["Change the Filter of", props.deviceName],
      width: "434px",
      dynamicHeight: true,
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React50.createElement(Stack91, { pt: "16px", spacing: "16px", width: "100%" }, allFilters.filter((f) => f.id !== props.currentFilterId).map((f) => /* @__PURE__ */ React50.createElement(
      Stack91,
      {
        key: f.id,
        direction: "row",
        spacing: "8px",
        px: "8px",
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.7 },
          svg: {
            path: {
              fill: PALETTE.secondary.orange[3]
            }
          }
        },
        onClick: () => {
          props.submitChange(f.id);
          props.onClose();
        },
        alignItems: "center"
      },
      /* @__PURE__ */ React50.createElement(FilterIcon_default, { height: "16px", width: "16px" }),
      /* @__PURE__ */ React50.createElement(Typography, { maxLines: 1, bold: true }, f.title)
    )))
  );
};
var ChangeFilterDialog_default = ChangeFilterDialog;

// src/filter/contents/common.tsx
import { Stack as Stack92 } from "@mui/system";
import _20 from "lodash";
function FilterPage(props) {
  const { user } = useAuth_default();
  const [filter, setFilter] = useState75();
  const loadFilter = useCallback9(
    () => api_default.getFilter(props.filterId).then(setFilter),
    [props.filterId]
  );
  useEffect50(() => {
    loadFilter();
  }, [loadFilter]);
  const [blockedSites, setBlockedSites] = useState75([]);
  const loadBlockedSites = useCallback9(
    () => api_default.getBlockedSites(props.filterId).then(setBlockedSites),
    [props.filterId]
  );
  useEffect50(() => {
    loadBlockedSites();
  }, [loadBlockedSites]);
  const [allowedSites, setAllowedSites] = useState75([]);
  const loadAllowedSites = useCallback9(
    () => api_default.getAllowedSites(props.filterId).then(setAllowedSites),
    [props.filterId]
  );
  useEffect50(() => {
    loadAllowedSites();
  }, [loadAllowedSites]);
  const [categories, setCategories] = useState75([]);
  useEffect50(() => {
    api_default.getAllFilterCategories().then(setCategories);
  }, []);
  const [allowedSubcategories, setAllowedSubcategories] = useState75([]);
  useEffect50(() => {
    api_default.getFilterCategories(props.filterId).then(
      (response) => setAllowedSubcategories(response.map((x) => x.categoryId))
    );
  }, [props.filterId]);
  const [blockedSearchWords, setBlockedSearchWords] = useState75([]);
  useEffect50(() => {
    api_default.getBlockedSearchWords(props.filterId).then(
      setBlockedSearchWords
    );
  }, [props.filterId]);
  const [exceptionDialogOpen, setExceptionDialogOpen] = useState75(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState75(false);
  const [devices, setDevices] = useState75([]);
  const loadDevices = useCallback9(() => {
    (user == null ? void 0 : user.group_id) && api_default.getFilterDevices(props.filterId, user.group_id).then(
      setDevices
    );
  }, [props.filterId, user == null ? void 0 : user.group_id]);
  useEffect50(() => {
    loadDevices();
  }, [loadDevices]);
  const cuttingEdgeOnlineStatusDevices = useDeviceOnlineStatus_default(devices);
  const [allFilters, setAllFilters] = useState75([]);
  useEffect50(() => {
    user.group_id && api_default.getGroupFilters(user.group_id).then(setAllFilters);
  }, [user == null ? void 0 : user.group_id]);
  const actions = [
    {
      text: "Edit name",
      kallback: () => setRenameDialogOpen(true),
      icon: Pencil_default
    },
    // {
    //   text: "Duplicate",
    //   kallback: () => null,
    //   icon: DuplicateIcon,
    // },
    {
      text: "Delete",
      kallback: () => {
        devices.length > 0 ? notificationCtx.negativeSuccess(
          "Cannot delete a Filter that is applied to Devices."
        ) : setDeletionDialogOpen(true);
      },
      icon: TrashcanIcon_default,
      color: PALETTE.system.red
    }
  ];
  const navigate = useNavigate20();
  const titleRow = [
    {
      text: "My Filters",
      callback: () => navigate("/filters")
    },
    {
      text: (filter == null ? void 0 : filter.title) ?? "",
      options: allFilters.filter((f) => f.id !== props.filterId).map((f) => ({
        text: f.title,
        image: /* @__PURE__ */ React51.createElement(
          Stack92,
          {
            sx: {
              svg: {
                path: {
                  fill: PALETTE.secondary.orange[3]
                }
              }
            },
            height: "16px",
            width: "16px"
          },
          /* @__PURE__ */ React51.createElement(FilterIcon_default, { height: "16px", width: "16px" })
        ),
        callback: () => navigate(`/filters/${f.id}`)
      }))
    }
  ];
  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = useState75(false);
  const notificationCtx = useContext14(NotificationContext_default);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState75(false);
  const [changeFilterDialogOpenForDevice, setChangeFilterDialogOpenForDevice] = useState75();
  const deleteFilter = () => api_default.removeFilter(props.filterId).then(() => navigate("/filters"));
  const flipSubcategory = (id) => {
    if (allowedSubcategories.includes(id)) {
      setAllowedSubcategories(allowedSubcategories.filter((sid) => sid !== id));
      api_default.removeWhitelistSubcategory(props.filterId, id);
    } else {
      setAllowedSubcategories([...allowedSubcategories, id]);
      api_default.addWhitelistSubcategory(props.filterId, id);
    }
  };
  const flipCategory = (id) => {
    var _a;
    const subcategoryIds = (_a = categories.find((cg) => cg.categoryId === id)) == null ? void 0 : _a.subCategories.map((c) => c.id);
    if (!subcategoryIds) return;
    if (subcategoryIds == null ? void 0 : subcategoryIds.every((cid) => allowedSubcategories.includes(cid))) {
      setAllowedSubcategories(
        allowedSubcategories.filter((acid) => !subcategoryIds.includes(acid))
      );
      api_default.removeWhitelistCategory(props.filterId, id);
    } else {
      setAllowedSubcategories(
        _20.uniq([...allowedSubcategories, ...subcategoryIds])
      );
      api_default.addWhitelistCategory(props.filterId, id);
    }
  };
  const addToBlockedSearchWords = (word) => {
    setBlockedSearchWords([...blockedSearchWords, word]);
    api_default.addBlockedSearchWord(props.filterId, word);
  };
  const removeFromBlockedSearchWords = (word) => {
    setBlockedSearchWords(blockedSearchWords.filter((w) => w !== word));
    api_default.removeBlockedSearchWord(props.filterId, word);
  };
  const addBlockedSite = (url) => api_default.addBlockedSite(props.filterId, url).then(loadBlockedSites).then(() => notificationCtx.success("Added blocked site."));
  const addAllowedSite = (url) => api_default.addAllowedSite(props.filterId, url).then(loadAllowedSites).then(() => notificationCtx.success("Added allowed site."));
  const removeBlockedSite = (url) => api_default.removeBlockedSite(props.filterId, url).then(loadBlockedSites).then(() => notificationCtx.negativeSuccess("Removed blocked site."));
  const removeAllowedSite = (url) => api_default.removeAllowedSite(props.filterId, url).then(loadAllowedSites).then(() => notificationCtx.negativeSuccess("Removed allowed site."));
  const applyFilterToDevice = (id) => api_default.addFilterToDevice(props.filterId, id).then(() => {
    setAddDeviceDialogOpen(false);
    loadDevices();
    notificationCtx.success("Applied this Filter to Device.");
  });
  return filter ? /* @__PURE__ */ React51.createElement(React51.Fragment, null, props.isMobile ? /* @__PURE__ */ React51.createElement(
    FilterPageMobileBody,
    {
      filterId: props.filterId,
      filter,
      flipCategory,
      flipSubcategory,
      devices: cuttingEdgeOnlineStatusDevices,
      actions,
      categories,
      allowedCategories: allowedSubcategories,
      allowedSites,
      blockedSites,
      blockedSearchWords,
      addToBlockedSearchWords,
      removeFromBlockedSearchWords,
      setExceptionDialogOpen: () => setExceptionDialogOpen(true),
      titleRow,
      onRemoveDevice: loadDevices,
      setAddDeviceDialogOpen: () => setAddDeviceDialogOpen(true),
      addBlockedSite,
      addAllowedSite,
      removeBlockedSite,
      removeAllowedSite,
      openChangeFilterDialogForDevice: setChangeFilterDialogOpenForDevice
    }
  ) : /* @__PURE__ */ React51.createElement(
    FilterPageDesktopBody,
    {
      filterId: props.filterId,
      filter,
      flipCategory,
      flipSubcategory,
      devices: cuttingEdgeOnlineStatusDevices,
      actions,
      categories,
      allowedCategories: allowedSubcategories,
      allowedSites,
      blockedSites,
      blockedSearchWords,
      addToBlockedSearchWords,
      removeFromBlockedSearchWords,
      setExceptionDialogOpen: () => setExceptionDialogOpen(true),
      titleRow,
      onRemoveDevice: loadDevices,
      setAddDeviceDialogOpen: () => setAddDeviceDialogOpen(true),
      addBlockedSite,
      addAllowedSite,
      removeBlockedSite,
      removeAllowedSite,
      openChangeFilterDialogForDevice: setChangeFilterDialogOpenForDevice
    }
  ), devices ? /* @__PURE__ */ React51.createElement(
    AddDeviceDialog_default,
    {
      open: addDeviceDialogOpen,
      groupId: user.group_id,
      onClose: () => setAddDeviceDialogOpen(false),
      title: "Apply to a Device",
      subtitle: ["Replace a Device's current Filter", "with this one."],
      emptyText: "This Filter is applied to all of your Devices",
      addedDevices: cuttingEdgeOnlineStatusDevices,
      onAdd: applyFilterToDevice,
      isMobile: props.isMobile
    }
  ) : null, /* @__PURE__ */ React51.createElement(
    DeletionDialog_default,
    {
      open: deletionDialogOpen,
      type: "Filter",
      onClose: () => setDeletionDialogOpen(false),
      subtitle: "If you delete this Filter all of the Category configurations, blocked search terms, and blocked and allowed sites will be lost. Any Device still connected to this Filter will be set to the default.",
      onSubmit: deleteFilter,
      isMobile: props.isMobile
    }
  ), /* @__PURE__ */ React51.createElement(
    FilterRenameDialog_default,
    {
      open: renameDialogOpen,
      onClose: () => setRenameDialogOpen(false),
      name: filter.title,
      onSubmit: (name) => api_default.changeFilterName(props.filterId, name).then(loadFilter).then(() => notificationCtx.success("Renamed Filter")),
      isMobile: props.isMobile
    }
  ), changeFilterDialogOpenForDevice ? /* @__PURE__ */ React51.createElement(
    ChangeFilterDialog_default,
    {
      open: true,
      onClose: () => setChangeFilterDialogOpenForDevice(void 0),
      submitChange: (id) => api_default.addFilterToDevice(
        id,
        changeFilterDialogOpenForDevice.id
      ).then(loadDevices).then(
        () => notificationCtx.success(
          `${changeFilterDialogOpenForDevice.name} changed to new Filter`
        )
      ),
      currentFilterId: props.filterId,
      groupId: user.group_id,
      deviceName: changeFilterDialogOpenForDevice.name,
      isMobile: props.isMobile
    }
  ) : null) : null;
}

// src/filter/index.tsx
var Filter2 = ({ params }) => {
  return /* @__PURE__ */ React52.createElement(FilterPage, { filterId: parseInt(params.id), isMobile: isMobile6 });
};
var filter_default = Filter2;

// src/folders/index.tsx
import React53 from "react";

// src/folders/contents/common.tsx
import { useNavigate as useNavigate24 } from "react-router-dom";
import { useCallback as useCallback10, useEffect as useEffect53, useState as useState78 } from "react";

// src/folders/contents/body-desktop.tsx
import { Stack as Stack94 } from "@mui/system";
import { useNavigate as useNavigate22 } from "react-router-dom";

// src/components/FolderCard.tsx
import { useContext as useContext15, useEffect as useEffect51, useState as useState76 } from "react";
import { Stack as Stack93, keyframes as keyframes7 } from "@mui/system";

// src/images/Star.svg
var Star_default = "./Star-C4VM577T.svg";

// src/components/FolderCard.tsx
import { useNavigate as useNavigate21 } from "react-router-dom";
import _21 from "lodash";

// src/images/icons/ArrowUpRight.svg
var ArrowUpRight_default = "./ArrowUpRight-EAFXXM3E.svg";

// src/components/FolderCard.tsx
var spin2 = keyframes7`
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
`;
var SECONDARY_COLOR_ORDER = [
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
  "grey",
  "green",
  "blue"
];
var FolderCard = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
  const [stackCard1Color, setStackCard1Color] = useState76("#ffffff");
  const [stackCard2Color, setStackCard2Color] = useState76("#ffffff");
  useEffect51(() => {
    setStackCard1Color(
      PALETTE.secondary[SECONDARY_COLOR_ORDER[_21.random(SECONDARY_COLOR_ORDER.length - 1)]][_21.random(2, 5)]
    );
    setStackCard2Color(
      PALETTE.secondary[SECONDARY_COLOR_ORDER[_21.random(SECONDARY_COLOR_ORDER.length - 1)]][_21.random(2, 5)]
    );
  }, []);
  const [hovering, setHovering] = useState76(false);
  const navigate = useNavigate21();
  const notificationCtx = useContext15(NotificationContext_default);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState76(false);
  const deleteFolder = () => api_default.removeFolder(props.id).then(() => {
    var _a2;
    (_a2 = props.deletionCallback) == null ? void 0 : _a2.call(props);
    notificationCtx.negativeSuccess("Removed Folder");
  });
  const [renameDialogOpen, setRenameDialogOpen] = useState76(false);
  const renameFolder = (title) => api_default.renameFolder(props.id, title).then(() => {
    var _a2;
    (_a2 = props.editingCallback) == null ? void 0 : _a2.call(props);
    notificationCtx.success("Renamed Folder");
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Stack93,
    {
      width: "100%",
      position: "relative",
      onMouseEnter: () => {
        setHovering(true);
      },
      onMouseLeave: () => {
        setHovering(false);
      }
    },
    /* @__PURE__ */ React.createElement(
      Stack93,
      {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        marginLeft: "auto",
        marginRight: "auto",
        width: "calc(100% - 36px)",
        height: "60px",
        borderRadius: "12px",
        bgcolor: stackCard1Color,
        sx: {
          transform: `rotate(-${hovering ? 6 : 2.6}deg) translateY(-7px)`,
          transition: "0.4s"
        },
        boxShadow: props.strongShadow ? "0 0 20px rgba(0,0,0,0.08)" : "0 0 12px rgba(0,0,0,0.06)",
        zIndex: 0
      }
    ),
    /* @__PURE__ */ React.createElement(
      Stack93,
      {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        marginLeft: "auto",
        marginRight: "auto",
        width: "calc(100% - 20px)",
        height: "60px",
        borderRadius: "12px",
        bgcolor: stackCard2Color,
        sx: {
          transform: `rotate(${hovering ? 5 : 1.4}deg) translateY(-7px)`,
          transition: "0.4s"
        },
        boxShadow: props.strongShadow ? "0 0 20px rgba(0,0,0,0.08)" : "0 0 12px rgba(0,0,0,0.06)",
        zIndex: 0
      }
    ),
    props.editingCallback && props.deletionCallback ? /* @__PURE__ */ React.createElement(
      Stack93,
      {
        position: "absolute",
        top: "163px",
        right: "3px",
        zIndex: 2
      },
      /* @__PURE__ */ React.createElement(
        UrsorActionButton,
        {
          size: "32px",
          iconSize: "16px",
          actions: [
            {
              text: "Open",
              kallback: () => navigate(`/folders/${props.id}`),
              icon: ArrowUpRight_default
            },
            {
              text: "Edit",
              kallback: () => setRenameDialogOpen(true),
              icon: Pencil_default
            },
            {
              text: "Delete",
              kallback: () => setDeletionDialogOpen(true),
              icon: TrashcanIcon_default,
              color: PALETTE.system.red
            },
            ...props.extraActions || []
          ]
        }
      )
    ) : null,
    /* @__PURE__ */ React.createElement(
      Stack93,
      {
        borderRadius: "12px",
        border: `4px solid rgb(255,255,255)`,
        boxSizing: "border-box",
        sx: {
          transition: "0.2s"
          // outline: orangeBorderOn
          //   ? `3px solid ${PALETTE.system.orange}`
          //   : undefined,
        },
        bgcolor: "rgb(255,255,255)",
        width: "100%",
        boxShadow: props.strongShadow ? "0 0 20px rgba(0,0,0,0.08)" : "0 0 12px rgba(0,0,0,0.06)",
        position: "relative",
        pb: "6px"
      },
      /* @__PURE__ */ React.createElement(
        Stack93,
        {
          flex: 1,
          onClick: props.clickCallback,
          sx: {
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.6 }
          },
          borderRadius: "8px 8px 0 0",
          overflow: "hidden"
        },
        /* @__PURE__ */ React.createElement(
          Stack93,
          {
            height: "156px",
            minHeight: "156px",
            width: "100%",
            direction: "row",
            spacing: "4px"
          },
          /* @__PURE__ */ React.createElement(
            Stack93,
            {
              flex: 1,
              bgcolor: PALETTE.secondary.orange[4],
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              sx: {
                opacity: 0.74,
                svg: {
                  transform: "rotate(26deg)"
                },
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: ((_b = (_a = props.preview) == null ? void 0 : _a.thumbnailUrls) == null ? void 0 : _b[0]) ? `url(${props.preview.thumbnailUrls[0]})` : void 0
              }
            },
            !((_d = (_c = props.preview) == null ? void 0 : _c.thumbnailUrls) == null ? void 0 : _d[0]) ? /* @__PURE__ */ React.createElement(
              Stack93,
              {
                sx: {
                  animation: `${spin2} 9s linear`,
                  animationIterationCount: "infinite"
                }
              },
              /* @__PURE__ */ React.createElement(Star_default, { height: "52px", width: "52px" })
            ) : null
          ),
          /* @__PURE__ */ React.createElement(Stack93, { spacing: "4px", width: "30%" }, /* @__PURE__ */ React.createElement(
            Stack93,
            {
              flex: 1,
              bgcolor: PALETTE.secondary.blue[2],
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              sx: {
                opacity: 0.74,
                svg: {
                  transform: "rotate(39deg)"
                },
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: ((_f = (_e = props.preview) == null ? void 0 : _e.thumbnailUrls) == null ? void 0 : _f[1]) ? `url(${props.preview.thumbnailUrls[1]})` : void 0
              }
            },
            !((_h = (_g = props.preview) == null ? void 0 : _g.thumbnailUrls) == null ? void 0 : _h[1]) ? /* @__PURE__ */ React.createElement(
              Stack93,
              {
                sx: {
                  animation: `${spin2} 12s linear`,
                  animationDirection: "reverse",
                  animationIterationCount: "infinite"
                }
              },
              /* @__PURE__ */ React.createElement(Star_default, { height: "20px", width: "20px" })
            ) : null
          ), /* @__PURE__ */ React.createElement(
            Stack93,
            {
              flex: 1,
              bgcolor: PALETTE.secondary.green[3],
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              sx: {
                opacity: 0.74,
                svg: {
                  transform: "rotate(50deg)"
                },
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: ((_j = (_i = props.preview) == null ? void 0 : _i.thumbnailUrls) == null ? void 0 : _j[2]) ? `url(${(_k = props.preview) == null ? void 0 : _k.thumbnailUrls[2]})` : void 0
              }
            },
            !((_m = (_l = props.preview) == null ? void 0 : _l.thumbnailUrls) == null ? void 0 : _m[2]) ? /* @__PURE__ */ React.createElement(
              Stack93,
              {
                sx: {
                  animation: `${spin2} 4s linear`,
                  animationIterationCount: "infinite"
                }
              },
              /* @__PURE__ */ React.createElement(Star_default, { height: "20px", width: "20px" })
            ) : null
          ))
        ),
        /* @__PURE__ */ React.createElement(Stack93, { px: "4px" }, /* @__PURE__ */ React.createElement(Stack93, { direction: "row", flex: 1, minHeight: "58px" }, /* @__PURE__ */ React.createElement(Stack93, { pt: "8px", flex: 1 }, /* @__PURE__ */ React.createElement(Typography, { bold: true, variant: "medium", maxLines: 2 }, props.title)), /* @__PURE__ */ React.createElement(Stack93, { minWidth: "27px" })), ((_n = props.preview) == null ? void 0 : _n.devices) ? /* @__PURE__ */ React.createElement(
          ProfileImageRow_default,
          {
            devices: (_o = props.preview) == null ? void 0 : _o.devices,
            totalDeviceCount: props.preview.totalDeviceCount ?? 0
          }
        ) : null)
      )
    )
  ), /* @__PURE__ */ React.createElement(
    DeletionDialog_default,
    {
      open: deletionDialogOpen,
      type: "Folder",
      onClose: () => setDeletionDialogOpen(false),
      subtitle: FOLDER_DELETION_DIALOG_SUBTITLE,
      onSubmit: deleteFolder,
      isMobile: props.isMobile
    }
  ), /* @__PURE__ */ React.createElement(
    FolderRenameDialog_default,
    {
      open: renameDialogOpen,
      onClose: () => setRenameDialogOpen(false),
      name: props.title ?? "",
      onSubmit: renameFolder,
      isMobile: false
    }
  ));
};
var FolderCard_default = FolderCard;

// src/folders/contents/body-desktop.tsx
var AllFoldersPageDesktopBody = (props) => {
  const navigate = useNavigate22();
  return /* @__PURE__ */ React.createElement(
    PageLayout_default,
    {
      title: "My Content",
      info: INFOS.folders,
      bodyWidth: "100%",
      fullHeight: true,
      selectedSidebarItemId: "content",
      button: {
        text: "Create a Folder",
        callback: props.createFolder,
        icon: PlusIcon_default
      },
      maxWidth: 834,
      scrollable: true
    },
    props.folders.length > 0 ? /* @__PURE__ */ React.createElement(Stack94, { pt: "20px", pb: "33px", pl: "51px" }, /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "292px", rowGap: "40px", columnGap: "20px" }, props.folders.map((f, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: f.id, duration: 800, delay: i * 90 }, /* @__PURE__ */ React.createElement(
      FolderCard_default,
      {
        ...f,
        clickCallback: () => navigate(`/folders/${f.id}`),
        editingCallback: props.onUpdate,
        deletionCallback: props.onUpdate
      }
    ))))) : /* @__PURE__ */ React.createElement(EmptyStateIllustration_default, { paddingTop: 20 }, "No Folders yet")
  );
};
var body_desktop_default4 = AllFoldersPageDesktopBody;

// src/folders/contents/body-mobile.tsx
import { Stack as Stack95 } from "@mui/system";
import { useNavigate as useNavigate23 } from "react-router-dom";
var AllFoldersPageMobileBody = (props) => {
  const navigate = useNavigate23();
  return /* @__PURE__ */ React.createElement(
    MobilePageLayout_default,
    {
      title: "My Folders",
      info: INFOS.folders,
      selectedPage: "content",
      topRightElement: /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          size: "small",
          endIcon: PlusIcon_default,
          onClick: props.createFolder
        },
        "Create a Folder"
      )
    },
    props.folders.length > 0 ? /* @__PURE__ */ React.createElement(Stack95, { pt: "20px" }, /* @__PURE__ */ React.createElement(Stack95, { spacing: "36px" }, props.folders.map((f, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: f.id, duration: 800, delay: i * 90, fullWidth: true }, /* @__PURE__ */ React.createElement(
      FolderCard_default,
      {
        ...f,
        clickCallback: () => navigate(`/folders/${f.id}`),
        editingCallback: props.onUpdate,
        deletionCallback: props.onUpdate,
        isMobile: true
      }
    ))))) : /* @__PURE__ */ React.createElement(EmptyStateIllustration_default, { paddingTop: 20 }, "No Folders yet")
  );
};
var body_mobile_default4 = AllFoldersPageMobileBody;

// src/folder/components/FolderCreationDialog.tsx
import { Stack as Stack96 } from "@mui/system";
import { useState as useState77 } from "react";
var FolderCreationDialog = (props) => {
  const [name, setName] = useState77("");
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Create Folder",
      subtitle: ["Choose a name for", "your Folder."],
      width: "422px",
      dynamicHeight: true,
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(
      Stack96,
      {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        spacing: "12px"
      },
      /* @__PURE__ */ React.createElement(LabeledInputField, { label: "Name" }, /* @__PURE__ */ React.createElement(
        UrsorInputField,
        {
          value: name,
          onChange: (event) => setName(event.target.value),
          placeholder: "Choose a name",
          width: "100%",
          leftAlign: true
        }
      )),
      /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          width: "100%",
          onClick: () => {
            props.onSubmit(name);
            props.onClose();
          }
        },
        "Create"
      )
    )
  );
};
var FolderCreationDialog_default = FolderCreationDialog;

// src/folders/contents/common.tsx
var AllFoldersPage = (props) => {
  const { user } = useAuth_default();
  const navigate = useNavigate24();
  const [folders, setFolders] = useState78([]);
  const loadFolders = useCallback10(
    () => (user == null ? void 0 : user.group_id) && api_default.getEnrichedFolders(user.group_id).then(
      (f) => setFolders(f)
    ),
    [user == null ? void 0 : user.group_id]
  );
  useEffect53(() => {
    loadFolders();
  }, [loadFolders]);
  const createFolder = (title) => (user == null ? void 0 : user.group_id) && api_default.createFolder(title, user.group_id).then(
    (response) => navigate(`/folders/${response.contentBucketId}`)
  );
  const [creationDialogOpen, setCreationDialogOpen] = useState78(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, props.isMobile ? /* @__PURE__ */ React.createElement(
    body_mobile_default4,
    {
      folders,
      createFolder: () => setCreationDialogOpen(true),
      onUpdate: loadFolders
    }
  ) : /* @__PURE__ */ React.createElement(
    body_desktop_default4,
    {
      folders,
      createFolder: () => setCreationDialogOpen(true),
      onUpdate: loadFolders
    }
  ), /* @__PURE__ */ React.createElement(
    FolderCreationDialog_default,
    {
      open: creationDialogOpen,
      onClose: () => setCreationDialogOpen(false),
      onSubmit: createFolder,
      isMobile: props.isMobile
    }
  ));
};
var common_default4 = AllFoldersPage;

// src/folders/index.tsx
import { isMobile as isMobile7 } from "react-device-detect";
var Folders = () => {
  return /* @__PURE__ */ React53.createElement(RootLayout, null, /* @__PURE__ */ React53.createElement(common_default4, { isMobile: isMobile7 }));
};
var folders_default = Folders;

// src/folder/index.tsx
import React54 from "react";
import { isMobile as isMobile8 } from "react-device-detect";
var Folder = ({ params }) => {
  return /* @__PURE__ */ React54.createElement(FolderPage, { folderId: parseInt(params.id), isMobile: isMobile8 });
};
var folder_default = Folder;

// src/profiles/index.tsx
import React56 from "react";
import { isMobile as isMobile9 } from "react-device-detect";

// src/profiles/contents/common.tsx
import React55, { useEffect as useEffect56, useState as useState82 } from "react";

// src/profiles/components/DeviceRenameDialog.tsx
import { Stack as Stack97 } from "@mui/system";
import { useEffect as useEffect54, useState as useState79 } from "react";
var DeviceRenameDialog = (props) => {
  const [name, setName] = useState79("");
  useEffect54(() => setName(props.name), [props.name]);
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Rename Device",
      subtitle: ["Give this Device a new name", "of your choice."],
      width: "422px",
      height: props.isMobile ? void 0 : "343px",
      dynamicHeight: props.isMobile,
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(
      Stack97,
      {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        spacing: props.isMobile ? "12px" : void 0
      },
      /* @__PURE__ */ React.createElement(LabeledInputField, { label: "Name" }, /* @__PURE__ */ React.createElement(
        UrsorInputField,
        {
          value: name,
          onChange: (event) => setName(event.target.value),
          placeholder: "Write a new name",
          width: "100%",
          leftAlign: true
        }
      )),
      /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          width: "100%",
          onClick: () => props.onSubmit(name)
        },
        "Save"
      )
    )
  );
};
var DeviceRenameDialog_default = DeviceRenameDialog;

// src/profiles/components/DeviceDisconnectDialog.tsx
import { Stack as Stack98 } from "@mui/system";
import { useContext as useContext16, useState as useState80 } from "react";
var INPUT_PHRASE2 = "yes";
var DeviceDisconnectDialog = (props) => {
  const [inputValue, setInputValue] = useState80("");
  const notificationCtx = useContext16(NotificationContext_default);
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Are you sure?",
      subtitle: [
        "If you delete this Device, all of the configurations, browsing history, and insights will be lost. The Browser on this Device will also be reset and has to be set up again."
      ],
      width: "422px",
      height: "432px"
    },
    /* @__PURE__ */ React.createElement(Stack98, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(
      LabeledInputField,
      {
        label: `Type "${INPUT_PHRASE2}" to remove this device`
      },
      /* @__PURE__ */ React.createElement(
        UrsorInputField,
        {
          value: inputValue,
          onChange: (event) => setInputValue(event.target.value),
          placeholder: "yes",
          width: "100%",
          leftAlign: true
        }
      )
    ), /* @__PURE__ */ React.createElement(Stack98, { spacing: "8px", width: "100%" }, /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        variant: "tertiary",
        backgroundColor: PALETTE.system.red,
        width: "100%",
        disabled: inputValue !== INPUT_PHRASE2,
        onClick: () => {
          props.onSubmit();
          notificationCtx.negativeSuccess("Disconnected Device.");
        }
      },
      "Disconnect"
    ), /* @__PURE__ */ React.createElement(UrsorButton, { variant: "secondary", width: "100%", onClick: props.onClose }, "Keep Device")))
  );
};
var DeviceDisconnectDialog_default = DeviceDisconnectDialog;

// src/profiles/contents/desktop-body.tsx
import { Stack as Stack100 } from "@mui/system";
import { useNavigate as useNavigate25 } from "react-router-dom";

// src/profiles/components/QRCodeView.tsx
import { Stack as Stack99 } from "@mui/system";
import { useEffect as useEffect55, useState as useState81 } from "react";
var QRCodeView = () => {
  const { user } = useAuth_default();
  const [image, setImage] = useState81("");
  useEffect55(() => {
    (user == null ? void 0 : user.group_id) && api_default.getQRCode(user.group_id).then(setImage);
  }, [user == null ? void 0 : user.group_id]);
  return /* @__PURE__ */ React.createElement(
    Stack99,
    {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      position: "relative",
      spacing: "65px"
    },
    /* @__PURE__ */ React.createElement(Stack99, { spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
      Stack99,
      {
        sx: {
          background: `linear-gradient(${PALETTE.secondary.purple[2]}, ${PALETTE.secondary.blue[2]})`,
          "-webkit-text-fill-color": "transparent",
          backgroundClip: "text",
          "-webkit-background-clip": "text"
        }
      },
      /* @__PURE__ */ React.createElement(Typography, { variant: "h4" }, "Welcome to AstroSafe")
    ), /* @__PURE__ */ React.createElement(Stack99, { width: "444px" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        variant: "medium",
        bold: true,
        sx: { textAlign: "center" },
        color: PALETTE.secondary.grey[4]
      },
      "Connect your child or student's device to start exploring the internet with them safely!"
    ))),
    /* @__PURE__ */ React.createElement(
      Stack99,
      {
        bgcolor: "rgb(255,255,255)",
        borderRadius: "16px",
        width: "347px",
        height: "438px",
        alignItems: "center",
        justifyContent: "space-between",
        py: "20px",
        boxSizing: "border-box"
      },
      /* @__PURE__ */ React.createElement(Stack99, { width: "267px" }, /* @__PURE__ */ React.createElement(
        Typography,
        {
          variant: "large",
          bold: true,
          sx: { textAlign: "center" },
          color: PALETTE.secondary.grey[5]
        },
        "Scan and download the browser on your kids device"
      )),
      image ? /* @__PURE__ */ React.createElement("img", { src: image, width: 237, height: 237, alt: "qr" }) : null,
      /* @__PURE__ */ React.createElement(UrsorButton, { dark: true, variant: "tertiary" }, "Or follow this link")
    )
  );
};
var QRCodeView_default = QRCodeView;

// src/profiles/contents/desktop-body.tsx
var AllDevicesPageDesktopBody = (props) => {
  const navigate = useNavigate25();
  return /* @__PURE__ */ React.createElement(
    PageLayout_default,
    {
      title: "My Kids",
      titleBackButton: true,
      bodyWidth: "100%",
      fullHeight: true,
      selectedSidebarItemId: "devices",
      button: {
        text: "Add a Device",
        callback: props.setConnectDialogOpen,
        icon: PlusIcon_default
      },
      maxWidth: 834,
      scrollable: true
    },
    /* @__PURE__ */ React.createElement(Stack100, { pl: "50px", flex: 1, pb: "31px" }, props.devices.length > 0 ? /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "355px", rowGap: "20px", columnGap: "20px" }, props.devices.map((d, i) => {
      var _a;
      return /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: d.id, delay: i * 100, duration: 800 }, /* @__PURE__ */ React.createElement(
        DeviceCard_default,
        {
          ...d,
          showBrowsing: true,
          filterName: ((_a = props.filters.find((f) => f.id === d.filterId)) == null ? void 0 : _a.title) ?? "",
          button: /* @__PURE__ */ React.createElement(
            UrsorActionButton,
            {
              size: "18px",
              iconSize: "18px",
              actions: [
                {
                  text: "Open",
                  kallback: () => navigate(`/profiles/${d.id}`),
                  icon: ArrowUpRight_default
                },
                {
                  text: "Edit name",
                  kallback: () => props.setRenameDeviceDialogId(d.id),
                  icon: Pencil_default
                }
                // {
                //   text: "Disconnect",
                //   kallback: () => props.setDisconnectDialogOpen(d.id),
                //   icon: PlugIcon,
                //   color: PALETTE.system.red,
                // },
              ]
            }
          )
        }
      ));
    })) : /* @__PURE__ */ React.createElement(UrsorFadeIn, { delay: 700, duration: 800 }, /* @__PURE__ */ React.createElement(QRCodeView_default, null)))
  );
};
var desktop_body_default = AllDevicesPageDesktopBody;

// src/profiles/contents/mobile-body.tsx
import { Stack as Stack101 } from "@mui/system";
import { useNavigate as useNavigate26 } from "react-router-dom";
var AllDevicesPageMobileBody = (props) => {
  const navigate = useNavigate26();
  return (
    // <PageLayout
    //   title="My Devices"
    //   titleBackButton={true}
    //   bodyWidth="100%"
    //   fullHeight
    //   selectedSidebarItemId="devices"
    //   button={{
    //     text: "Add a Device",
    //     callback: props.setConnectDialogOpen,
    //     icon: PlusIcon,
    //   }}
    //   secondaryButton={{
    //     text: "Get Browser",
    //     callback: props.setDownloadDialogOpen,
    //     icon: DownloadIcon,
    //   }}
    //   maxWidth={834}
    //   scrollable
    // >
    /* @__PURE__ */ React.createElement(
      MobilePageLayout_default,
      {
        title: "My Kids",
        selectedPage: "profiles",
        topRightElement: /* @__PURE__ */ React.createElement(Stack101, { direction: "row", spacing: "8px" }, /* @__PURE__ */ React.createElement(
          UrsorButton,
          {
            size: "small",
            endIcon: PlusIcon_default,
            dark: true,
            variant: "tertiary",
            onClick: props.setConnectDialogOpen
          },
          "Add a Device"
        ))
      },
      /* @__PURE__ */ React.createElement(Stack101, { flex: 1 }, props.devices.length > 0 ? /* @__PURE__ */ React.createElement(Stack101, { spacing: "12px" }, props.devices.map((d) => {
        var _a;
        return /* @__PURE__ */ React.createElement(
          DeviceCard_default,
          {
            key: d.id,
            ...d,
            showBrowsing: true,
            filterName: ((_a = props.filters.find((f) => f.id === d.filterId)) == null ? void 0 : _a.title) ?? "",
            button: /* @__PURE__ */ React.createElement(
              UrsorActionButton,
              {
                size: "16px",
                iconSize: "16px",
                actions: [
                  {
                    text: "Open",
                    kallback: () => navigate(`/profiles/${d.id}`),
                    icon: ArrowUpRight_default
                  },
                  {
                    text: "Edit name",
                    kallback: () => props.setRenameDeviceDialogId(d.id),
                    icon: Pencil_default
                  }
                  // {
                  //   text: "Disconnect",
                  //   kallback: () => props.setDisconnectDialogOpen(d.id),
                  //   icon: PlugIcon,
                  //   color: PALETTE.system.red,
                  // },
                ]
              }
            )
          }
        );
      })) : /* @__PURE__ */ React.createElement(DeviceInstructionsView_default, null))
    )
  );
};
var mobile_body_default = AllDevicesPageMobileBody;

// src/profiles/contents/common.tsx
function AllDevicesPage(props) {
  var _a;
  const { user } = useAuth_default();
  const [devices, setDevices] = useState82([]);
  useEffect56(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupEnrichedDevices(user == null ? void 0 : user.group_id).then(setDevices);
  }, [user == null ? void 0 : user.group_id]);
  const [filters, setFilters] = useState82([]);
  useEffect56(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupFilters(user.group_id).then(setFilters);
  }, [user == null ? void 0 : user.group_id]);
  const [renameDeviceDialogId, setRenameDeviceDialogId] = useState82();
  const [connectDialogOpen, setConnectDialogOpen] = useState82(false);
  const [disconnectDeviceDialogId, setDisconnectDeviceDialogId] = useState82();
  const [downloadDialogOpen, setDownloadDialogOpen] = useState82(false);
  const cuttingEdgeOnlineStatusDevices = useDeviceOnlineStatus_default(devices);
  return /* @__PURE__ */ React55.createElement(React55.Fragment, null, props.isMobile ? /* @__PURE__ */ React55.createElement(
    mobile_body_default,
    {
      devices: cuttingEdgeOnlineStatusDevices,
      filters,
      setConnectDialogOpen: () => setConnectDialogOpen(true),
      setRenameDeviceDialogId,
      setDisconnectDialogOpen: setDisconnectDeviceDialogId
    }
  ) : /* @__PURE__ */ React55.createElement(
    desktop_body_default,
    {
      devices: cuttingEdgeOnlineStatusDevices,
      filters,
      setConnectDialogOpen: () => setConnectDialogOpen(true),
      setRenameDeviceDialogId,
      setDisconnectDialogOpen: setDisconnectDeviceDialogId
    }
  ), renameDeviceDialogId ? /* @__PURE__ */ React55.createElement(
    DeviceRenameDialog_default,
    {
      open: true,
      onClose: () => setRenameDeviceDialogId(void 0),
      onSubmit: (name) => {
        api_default.renameDevice(renameDeviceDialogId, name).then();
        setRenameDeviceDialogId(void 0);
      },
      name: ((_a = devices.find((d) => d.id === renameDeviceDialogId)) == null ? void 0 : _a.name) ?? ""
    }
  ) : null, disconnectDeviceDialogId ? /* @__PURE__ */ React55.createElement(
    DeviceDisconnectDialog_default,
    {
      open: true,
      onClose: () => setDisconnectDeviceDialogId(void 0),
      onSubmit: () => null
    }
  ) : null, /* @__PURE__ */ React55.createElement(
    DeviceConnectDialog_default,
    {
      open: connectDialogOpen,
      onClose: () => setConnectDialogOpen(false),
      onOpen: () => {
        setDownloadDialogOpen(true);
        setConnectDialogOpen(false);
      },
      isMobile: props.isMobile
    }
  ), /* @__PURE__ */ React55.createElement(
    DownloadDialog_default,
    {
      open: downloadDialogOpen,
      onClose: () => setDownloadDialogOpen(false),
      isMobile: props.isMobile
    }
  ));
}

// src/profiles/index.tsx
var Profile = () => {
  return /* @__PURE__ */ React56.createElement(RootLayout, null, /* @__PURE__ */ React56.createElement(AllDevicesPage, { isMobile: isMobile9 }));
};
var profiles_default = Profile;

// src/profile/index.tsx
import React62 from "react";
import { isMobile as isMobile10 } from "react-device-detect";

// src/profile/contents/common.tsx
import React61, { useCallback as useCallback14, useContext as useContext22, useEffect as useEffect67, useState as useState95 } from "react";
import { Stack as Stack120 } from "@mui/system";
import _29 from "lodash";
import { useNavigate as useNavigate31 } from "react-router-dom";

// src/profile/contents/body-desktop.tsx
import { Stack as Stack117 } from "@mui/system";
import { useNavigate as useNavigate29 } from "react-router-dom";

// src/profile/components/AstroTabSwitch.tsx
import { Stack as Stack102 } from "@mui/system";
var AstroTabSwitch = (props) => /* @__PURE__ */ React.createElement(Stack102, { direction: "row", spacing: "12px" }, props.items.map((item) => /* @__PURE__ */ React.createElement(
  Stack102,
  {
    key: item.id,
    height: "32px",
    px: "12px",
    boxSizing: "border-box",
    onClick: () => props.select(item.id),
    borderRadius: "8px",
    justifyContent: "center",
    bgcolor: "rgb(255,255,255)"
  },
  /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "small",
      bold: true,
      color: props.selected === item.id ? PALETTE.secondary.purple[2] : void 0,
      sx: {
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s"
      }
    },
    item.text
  )
)));
var AstroTabSwitch_default = AstroTabSwitch;

// src/profile/components/InsightsTab.tsx
import { Stack as Stack103 } from "@mui/system";
import _22 from "lodash";
import { useEffect as useEffect57, useState as useState83 } from "react";
import dayjs11 from "dayjs";
import advancedFormat2 from "dayjs/plugin/advancedFormat";
import { useWindowSize as useWindowSize7 } from "usehooks-ts";
dayjs11.extend(advancedFormat2);
var SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD = 1260;
var DevicePageInsightsTab = (props) => {
  const [times, setTimes] = useState83([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState83(0);
  const [rangeEndDayIndex, setRangeEndDayIndex] = useState83(0);
  const [rangeStartDayIndex, setRangeStartDayIndex] = useState83(6);
  const [visitedSites, setVisitedSites] = useState83([]);
  useEffect57(() => {
    api_default.getStats(
      props.deviceId,
      dayjs11().utc().subtract(rangeStartDayIndex, "days").format("YYYY-MM-DD"),
      dayjs11().utc().subtract(rangeEndDayIndex, "days").format("YYYY-MM-DD")
    ).then((stats) => {
      var _a, _b;
      setTimes(stats.screenTime);
      setVisitedSites(
        _22.sortBy(
          ((_b = (_a = stats.visitedWebsites) == null ? void 0 : _a.find(
            (w) => w.date === dayjs11().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
          )) == null ? void 0 : _b.websites) || [],
          (t) => t.screenTime
        )
      );
    });
  }, [props.deviceId, rangeStartDayIndex, rangeEndDayIndex, selectedDayIndex]);
  const [timeSpent, setTimeSpent] = useState83(0);
  useEffect57(
    () => {
      var _a;
      return setTimeSpent(
        ((_a = times.find(
          (t) => t.date === dayjs11().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
        )) == null ? void 0 : _a.screenTime) ?? 0
      );
    },
    [times, selectedDayIndex]
  );
  useEffect57(() => {
    if (selectedDayIndex < 4) {
      const shiftNDays = selectedDayIndex - 3;
      setRangeStartDayIndex(selectedDayIndex + 3 - shiftNDays);
      setRangeEndDayIndex(Math.max(0, shiftNDays));
    } else {
      setRangeStartDayIndex(selectedDayIndex + 3);
      setRangeEndDayIndex(selectedDayIndex - 3);
    }
  }, [selectedDayIndex, times]);
  const { width } = useWindowSize7();
  const [switchToColumn, setSwitchToColumn] = useState83(false);
  useEffect57(() => {
    setSwitchToColumn(width < SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD);
  }, [width]);
  return /* @__PURE__ */ React.createElement(Stack103, { spacing: "24px", pb: "32px" }, /* @__PURE__ */ React.createElement(Stack103, { direction: "row", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(Stack103, { direction: "row", spacing: "10px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    Stack103,
    {
      sx: {
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.6 }
      },
      onClick: () => setSelectedDayIndex(selectedDayIndex + 1)
    },
    /* @__PURE__ */ React.createElement(ChevronLeft_default, { height: "24px", width: "24px" })
  ), /* @__PURE__ */ React.createElement(Typography, { variant: "h5" }, `${selectedDayIndex === 0 ? "Today" : selectedDayIndex === 1 ? "Yesterday" : `${dayjs11().utc().subtract(selectedDayIndex, "days").format("dddd")}`}, ${dayjs11().utc().subtract(selectedDayIndex, "days").format("Do MMMM")}`), /* @__PURE__ */ React.createElement(
    Stack103,
    {
      sx: {
        opacity: selectedDayIndex === 0 ? 0.3 : 1,
        pointerEvents: selectedDayIndex === 0 ? "none" : void 0,
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.6 }
      },
      onClick: () => setSelectedDayIndex(selectedDayIndex - 1)
    },
    /* @__PURE__ */ React.createElement(ChevronRight_default, { height: "24px", width: "24px" })
  )), /* @__PURE__ */ React.createElement(
    CalendarButton_default,
    {
      value: dayjs11().utc().subtract(selectedDayIndex, "days").toDate(),
      setValue: (date) => setSelectedDayIndex(dayjs11().diff(date, "days"))
    }
  )), /* @__PURE__ */ React.createElement(Stack103, { spacing: "28px", direction: switchToColumn ? "column" : "row" }, /* @__PURE__ */ React.createElement(Stack103, { width: switchToColumn ? "100%" : "54%", height: "290px" }, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: `${Math.floor(timeSpent / 60)}h ${Math.floor(
        timeSpent % 60
      )}m spent on screen`,
      notCollapsible: true
    },
    /* @__PURE__ */ React.createElement(
      Stack103,
      {
        mt: "33p",
        flex: 1,
        borderRadius: "12px",
        bgcolor: "rgb(255,255,255)",
        py: "8px",
        boxSizing: "border-box",
        spacing: "30px"
      },
      times.length > 0 ? /* @__PURE__ */ React.createElement(
        AstroTimeChart_default,
        {
          times,
          selected: dayjs11().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD"),
          setSelectedDatetime: (datetime) => setSelectedDayIndex(dayjs11().utc().diff(datetime, "days"))
        }
      ) : null
    )
  )), /* @__PURE__ */ React.createElement(Stack103, { height: "290px", flex: 1 }, /* @__PURE__ */ React.createElement(MostVisitedSitesSection_default, { sites: visitedSites }))), /* @__PURE__ */ React.createElement(
    HistorySection_default,
    {
      deviceId: props.deviceId,
      date: dayjs11().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
    }
  ));
};
var InsightsTab_default = DevicePageInsightsTab;

// src/profile/components/ContentTab.tsx
import { Stack as Stack104 } from "@mui/system";
import { useNavigate as useNavigate27 } from "react-router-dom";
import { useContext as useContext17, useState as useState84 } from "react";
var DevicePageContentTab = (props) => {
  const navigate = useNavigate27();
  const [
    folderDeviceRemovalConfirmationDialogId,
    setFolderDeviceRemovalConfirmationDialogId
  ] = useState84();
  const notificationCtx = useContext17(NotificationContext_default);
  return /* @__PURE__ */ React.createElement(
    ProfilePageTabLayout_default,
    {
      title: `${props.folders.length} Content Folder${props.folders.length === 1 ? "" : "s "}`,
      rightSideElement: /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          size: "small",
          endIcon: PlusIcon_default,
          iconSize: 18,
          onClick: props.openAddFolderDialog
        },
        "Add Folder"
      ),
      mobile: props.isMobile,
      info: INFOS.folders
    },
    props.folders.length > 0 ? /* @__PURE__ */ React.createElement(Stack104, { pt: "20px" }, /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "292px", rowGap: "40px", columnGap: "20px" }, props.folders.map((f, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: f.id, duration: 800, delay: 100 * i }, /* @__PURE__ */ React.createElement(
      FolderCard_default,
      {
        key: f.id,
        ...f,
        clickCallback: () => navigate(`/folders/${f.id}`),
        isMobile: props.isMobile,
        editingCallback: props.onUpdate,
        deletionCallback: props.onUpdate
      }
    ))))) : /* @__PURE__ */ React.createElement(Stack104, { flex: 1, justifyContent: "center", alignItems: "center" }, /* @__PURE__ */ React.createElement(UrsorFadeIn, { delay: 600, duration: 800 }, /* @__PURE__ */ React.createElement(
      Stack104,
      {
        height: props.isMobile ? "100%" : "457px",
        justifyContent: "center",
        alignItems: "center",
        spacing: "13px"
      },
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321506.png",
          width: props.isMobile ? 179 : 230,
          height: props.isMobile ? 152 : 195,
          alt: "empty state illustration"
        }
      ),
      /* @__PURE__ */ React.createElement(
        Stack104,
        {
          width: props.isMobile ? "100%" : "304px",
          alignItems: "center"
        },
        /* @__PURE__ */ React.createElement(
          Typography,
          {
            color: PALETTE.secondary.grey[3],
            sx: { textAlign: "center" },
            bold: true
          },
          "There is no Content currently assigned to this Device. Add a Folder to get started."
        )
      )
    ))),
    folderDeviceRemovalConfirmationDialogId ? /* @__PURE__ */ React.createElement(
      FolderDeviceRemovalConfirmationDialog_default,
      {
        open: true,
        onClose: () => setFolderDeviceRemovalConfirmationDialogId(void 0),
        onSubmit: () => api_default.removeFolderFromDevice(
          folderDeviceRemovalConfirmationDialogId,
          props.deviceId
        ).then(props.onUpdate).then(
          () => notificationCtx.negativeSuccess("Removed Folder from Device.")
        ),
        deviceName: props.deviceName,
        isMobile: props.isMobile
      }
    ) : null
  );
};
var ContentTab_default = DevicePageContentTab;

// src/profile/contents/body-desktop.tsx
import { useEffect as useEffect65, useState as useState92 } from "react";

// src/profiles/components/HorizontalDeviceCard.tsx
import { Stack as Stack106 } from "@mui/system";
import { useContext as useContext18, useEffect as useEffect58, useState as useState85 } from "react";
import { useNavigate as useNavigate28 } from "react-router-dom";

// src/filter/components/AstroSettingCard.tsx
import { Stack as Stack105 } from "@mui/system";
import React57 from "react";
var AstroSettingCard = (props) => /* @__PURE__ */ React57.createElement(
  Stack105,
  {
    height: "54px",
    bgcolor: "rgb(255,255,255)",
    borderRadius: "12px",
    border: `1px solid ${PALETTE.secondary.grey[2]}`,
    px: "16px",
    boxSizing: "border-box",
    justifyContent: "space-between",
    alignItems: "center",
    direction: "row"
  },
  /* @__PURE__ */ React57.createElement(Stack105, { justifyContent: "space-between" }, /* @__PURE__ */ React57.createElement(Stack105, { spacing: "8px", alignItems: "center", direction: "row" }, props.image, /* @__PURE__ */ React57.createElement(Stack105, null, /* @__PURE__ */ React57.createElement(Typography, { maxLines: 1, bold: true, color: props.textColor }, props.title), props.subtitle ? /* @__PURE__ */ React57.createElement(Typography, { maxLines: 1, variant: "small", color: props.textColor }, props.subtitle) : null))),
  props.rightContent
);
var AstroSettingCard_default = AstroSettingCard;

// src/profiles/components/HorizontalDeviceCard.tsx
var DeviceCardFilterSection = (props) => {
  var _a;
  const { user } = useAuth_default();
  const [allFilters, setAllFilters] = useState85([]);
  useEffect58(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupFilters(user.group_id).then(setAllFilters);
  }, [user == null ? void 0 : user.group_id]);
  const [open, setOpen] = useState85(false);
  return /* @__PURE__ */ React.createElement(
    UrsorPopover,
    {
      open,
      content: /* @__PURE__ */ React.createElement(Stack106, { bgcolor: "rgb(255,255,255)", borderRadius: "12px", spacing: "8px" }, allFilters.map((f, i) => /* @__PURE__ */ React.createElement(
        Stack106,
        {
          key: i,
          sx: {
            opacity: props.filterId != f.id ? 0.6 : 1,
            pointerEvents: props.filterId == f.id ? "none" : void 0,
            cursor: "pointer",
            "&:hover": { opacity: 0.7 },
            transition: "0.2s"
          },
          onClick: () => {
            setOpen(false);
            props.changeFilter(f.id);
          }
        },
        /* @__PURE__ */ React.createElement(
          AstroSettingCard_default,
          {
            image: /* @__PURE__ */ React.createElement(
              Stack106,
              {
                sx: {
                  svg: {
                    path: {
                      fill: PALETTE.system.orange
                    }
                  }
                }
              },
              /* @__PURE__ */ React.createElement(FilterIcon_default, { height: "20px", width: "20px" })
            ),
            title: f.title,
            rightContent: props.filterId == f.id ? /* @__PURE__ */ React.createElement(CheckCircleFillIcon_default, { height: "24px", width: "24px" }) : void 0,
            textColor: props.filterId == f.id ? PALETTE.secondary.purple[2] : void 0
          }
        )
      ))),
      closeCallback: () => setOpen(false),
      buttonWidth: true,
      flexButton: true
    },
    /* @__PURE__ */ React.createElement(Stack106, { onClick: () => setOpen(true), flex: 1 }, /* @__PURE__ */ React.createElement(DeviceCardSection, { title: "Filter" }, /* @__PURE__ */ React.createElement(
      Stack106,
      {
        direction: "row",
        alignItems: "center",
        justifyContent: "space-between",
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
          transition: "0.2s"
        }
      },
      /* @__PURE__ */ React.createElement(
        Stack106,
        {
          spacing: "8px",
          sx: {
            svg: {
              path: {
                fill: PALETTE.system.orange
              }
            }
          },
          direction: "row"
        },
        /* @__PURE__ */ React.createElement(Stack106, { justifyContent: "center" }, /* @__PURE__ */ React.createElement(FilterIcon_default, { direction: "row", height: "20px", width: "20px" })),
        /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[5] }, (_a = allFilters == null ? void 0 : allFilters.find((f) => f.id == props.filterId)) == null ? void 0 : _a.title)
      ),
      /* @__PURE__ */ React.createElement(ChevronDown_default, { height: "20px", width: "20px" })
    )))
  );
};
var HorizontalDeviceCard = (props) => {
  var _a, _b, _c, _d, _e, _f;
  const [browsingEnabled, setBrowsingEnabled] = useState85(false);
  useEffect58(
    () => {
      var _a2;
      return setBrowsingEnabled(!!((_a2 = props.config) == null ? void 0 : _a2.browsingAllowed));
    },
    [(_a = props.config) == null ? void 0 : _a.browsingAllowed]
  );
  const navigate = useNavigate28();
  const onClick = () => navigate(`/profiles/${props.id}`);
  const notificationCtx = useContext18(NotificationContext_default);
  const changeFilter = (id) => api_default.addFilterToDevice(id, props.id).then(props.onUpdate).then(() => notificationCtx.success("Changed Filter"));
  return /* @__PURE__ */ React.createElement(AstroCard_default, null, /* @__PURE__ */ React.createElement(Stack106, { direction: "row", alignItems: "center", px: "16px", spacing: "20px" }, /* @__PURE__ */ React.createElement(
    Stack106,
    {
      direction: "row",
      spacing: "20px",
      position: "relative",
      height: "104px",
      alignItems: "center",
      boxSizing: "border-box"
    },
    /* @__PURE__ */ React.createElement(Stack106, { position: "relative" }, /* @__PURE__ */ React.createElement(
      Stack106,
      {
        minHeight: "70px",
        minWidth: "70px",
        borderRadius: "100%",
        overflow: "hidden",
        bgcolor: PALETTE.secondary.blue[2],
        justifyContent: "center",
        alignItems: "center",
        onClick,
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.6 }
        }
      },
      props.profileAvatarUrl ? /* @__PURE__ */ React.createElement(
        "img",
        {
          src: props.profileAvatarUrl,
          height: 70,
          width: 70,
          alt: "device profile"
        }
      ) : /* @__PURE__ */ React.createElement(Typography, { color: "rgb(255,255,255)", bold: true, variant: "h5" }, getInitials(props.name))
    ), /* @__PURE__ */ React.createElement(
      Stack106,
      {
        position: "absolute",
        bottom: -2,
        right: -2,
        height: "22px",
        width: "22px",
        borderRadius: "100%",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: props.online && browsingEnabled ? PALETTE.secondary.green[4] : PALETTE.secondary.grey[3],
        border: `2px solid rgb(255,255,255)`,
        sx: {
          svg: {
            path: {
              fill: "rgb(255,255,255)"
            }
          }
        }
      },
      props.online && browsingEnabled ? /* @__PURE__ */ React.createElement(GlobeIcon_default, { height: "12px", width: "12px" }) : /* @__PURE__ */ React.createElement(StrikeThroughGlobeIcon_default, { height: "12px", width: "12px" })
    ))
  ), /* @__PURE__ */ React.createElement(Stack106, { spacing: "12px", direction: "row", flex: 1 }, /* @__PURE__ */ React.createElement(
    DeviceCardCurrentUrlSection,
    {
      url: (_b = props.latestBrowsing) == null ? void 0 : _b.url,
      title: (_c = props.latestBrowsing) == null ? void 0 : _c.title,
      disabled: !browsingEnabled ? "browsingDisabled" : !props.online ? "offline" : void 0,
      faviconUrl: (_d = props.latestBrowsing) == null ? void 0 : _d.faviconUrl
    }
  ), /* @__PURE__ */ React.createElement(
    DeviceCardScreenTimeSection,
    {
      totalTime: ((_e = props.screenTime) == null ? void 0 : _e.allowed) ?? 0,
      elapsedTime: ((_f = props.screenTime) == null ? void 0 : _f.current) ?? 0,
      onClickView: props.onClickViewScreenTime
    }
  ), /* @__PURE__ */ React.createElement(
    DeviceCardFilterSection,
    {
      filterId: props.filterId,
      changeFilter
    }
  ), /* @__PURE__ */ React.createElement(
    DeviceCardBrowsingStatusSection,
    {
      browsingEnabled,
      flipBrowsingEnabled: () => {
        setBrowsingEnabled(!browsingEnabled);
        api_default.flipBrowsingAllowed(props.id, !browsingEnabled);
        notificationCtx.success(
          `Browsing is now ${!browsingEnabled ? "enabled" : "disabled"} on ${props.name}`
        );
      }
    }
  ))));
};
var HorizontalDeviceCard_default = HorizontalDeviceCard;

// src/profile/components/LimitsTab.tsx
import { Stack as Stack114 } from "@mui/system";
import { useCallback as useCallback13, useContext as useContext20, useEffect as useEffect63, useState as useState90 } from "react";
import _27 from "lodash";

// src/profile/components/RequestedSitesSection.tsx
import { Stack as Stack107 } from "@mui/system";
import { useContext as useContext19 } from "react";
var RequestedSiteRow = (props) => /* @__PURE__ */ React.createElement(
  Stack107,
  {
    direction: "row",
    height: "58px",
    alignItems: "center",
    px: "16px",
    justifyContent: "space-between",
    spacing: "10px",
    border: `2px solid ${PALETTE.secondary.orange[3]}`,
    borderRadius: "8px",
    bgcolor: PALETTE.secondary.orange[1],
    overflow: "hidden"
  },
  /* @__PURE__ */ React.createElement(Stack107, { direction: "row", spacing: "10px", alignItems: "center", flex: 1 }, /* @__PURE__ */ React.createElement(Stack107, { borderRadius: "100%", overflow: "hidden", minWidth: "32px" }, /* @__PURE__ */ React.createElement(
    Stack107,
    {
      minHeight: "32px",
      minWidth: "32px",
      borderRadius: "100%",
      overflow: "hidden"
    },
    props.faviconUrl ? /* @__PURE__ */ React.createElement("img", { src: props.faviconUrl, height: 32, width: 32, alt: "favicon" }) : null
  )), /* @__PURE__ */ React.createElement(
    Stack107,
    {
      sx: { transform: "translateY(-2px)" },
      flex: 1
    },
    /* @__PURE__ */ React.createElement(Typography, { bold: true, maxLines: 1 }, props.title),
    /* @__PURE__ */ React.createElement(Stack107, { flex: 1 }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        variant: "tiny",
        bold: true,
        color: PALETTE.secondary.grey[3],
        maxLines: 1
      },
      props.url
    ))
  )),
  /* @__PURE__ */ React.createElement(Stack107, { direction: "row", spacing: "6px" }, /* @__PURE__ */ React.createElement(
    UrsorButton,
    {
      dark: true,
      variant: "tertiary",
      size: "small",
      onClick: props.onApprove
    },
    "Approve"
  ), /* @__PURE__ */ React.createElement(
    UrsorButton,
    {
      size: "small",
      backgroundColor: "transparent",
      variant: "secondary",
      onClick: props.onDeny
    },
    "Deny"
  ))
);
var RequestedSitesSection = (props) => {
  const notificationCtx = useContext19(NotificationContext_default);
  return /* @__PURE__ */ React.createElement(Stack107, { spacing: "12px" }, /* @__PURE__ */ React.createElement(Typography, { variant: "large", bold: true }, `${props.sites.length} requested site${props.sites.length === 1 ? "" : "s "}`), /* @__PURE__ */ React.createElement(Stack107, { spacing: "12px" }, props.sites.slice(0, 3).map((s) => /* @__PURE__ */ React.createElement(
    RequestedSiteRow,
    {
      key: s.id,
      ...s,
      onApprove: () => api_default.approveRequestedSite(s.id).then(() => {
        props.onUpdate();
        notificationCtx.success("Approved site");
      }),
      onDeny: () => api_default.denyRequestedSite(s.id).then(() => {
        props.onUpdate();
        notificationCtx.negativeSuccess("Denied site");
      })
    }
  ))));
};
var RequestedSitesSection_default = RequestedSitesSection;

// src/profile/components/TimeLimitsSection.tsx
import { Stack as Stack109 } from "@mui/system";

// src/profile/components/TimeLimitRow.tsx
import { Stack as Stack108 } from "@mui/system";

// src/images/icons/TimeMinusIcon.svg
var TimeMinusIcon_default = "./TimeMinusIcon-MCJ6EY4R.svg";

// src/images/icons/TimePlusIcon.svg
var TimePlusIcon_default = "./TimePlusIcon-2GMLQDFC.svg";

// src/profile/components/TimeLimitRow.tsx
import _23 from "lodash";
import { useEffect as useEffect59, useState as useState86 } from "react";
var TimeLimitRow = (props) => {
  const [decrementDisabled, setDecrementDisabled] = useState86(false);
  const [incrementDisabled, setIncrementDisabled] = useState86(false);
  useEffect59(() => {
    setDecrementDisabled(props.allowedMinutes < DAILY_LIMIT_INCREMENT);
    setIncrementDisabled(
      props.allowedMinutes > 24 * 60 - DAILY_LIMIT_INCREMENT
    );
  }, [props.allowedMinutes]);
  return /* @__PURE__ */ React.createElement(Stack108, { direction: "row", justifyContent: "space-between", alignItems: "center" }, /* @__PURE__ */ React.createElement(Typography, { variant: "large", bold: true, color: PALETTE.secondary.grey[3] }, _23.capitalize(props.dayName)), /* @__PURE__ */ React.createElement(Stack108, { direction: "row", spacing: "6px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    Stack108,
    {
      sx: {
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
        opacity: decrementDisabled ? 0.3 : 1,
        pointerEvents: decrementDisabled ? "none" : void 0
      },
      onClick: props.decrement
    },
    /* @__PURE__ */ React.createElement(TimeMinusIcon_default, { height: "20px", width: "20px" })
  ), /* @__PURE__ */ React.createElement(Stack108, { width: "86px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Typography, { variant: "large", bold: true }, `${Math.floor(
    Math.min((props.allowedMinutes ?? 0) / 60)
  )}:${(props.allowedMinutes ?? 0) % 60 || "00"} hr`)), /* @__PURE__ */ React.createElement(
    Stack108,
    {
      sx: {
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
        opacity: incrementDisabled ? 0.3 : 1,
        pointerEvents: incrementDisabled ? "none" : void 0
      },
      onClick: props.increment
    },
    /* @__PURE__ */ React.createElement(TimePlusIcon_default, { height: "20px", width: "20px" })
  )));
};
var TimeLimitRow_default = TimeLimitRow;

// src/profile/components/TimeLimitsSection.tsx
var TimeLimitsSection = (props) => /* @__PURE__ */ React.createElement(
  AstroBentoCard,
  {
    title: "Daily limits",
    notCollapsible: true,
    info: {
      title: "s etting your daily limits",
      text: "This is the total amount of time you are happy with being spent on the Browser for the specific day. Turn this off to remove all time limits."
    },
    infoButtonBelowTitle: true,
    isMobile: props.isMobile,
    topRightStuff: props.topRightElement
  },
  /* @__PURE__ */ React.createElement(
    Stack109,
    {
      spacing: "36px",
      pb: "12px",
      sx: {
        opacity: props.disabled ? 0.4 : 1,
        pointerEvents: props.disabled ? "none" : void 0,
        transition: "0.2s"
      }
    },
    ["mon", "tue", "wed", "thu", "fri", "s at", "s un"].map((day, i) => {
      var _a;
      return /* @__PURE__ */ React.createElement(
        TimeLimitRow_default,
        {
          key: day,
          dayName: day,
          decrement: () => props.decrement(day === "s un" ? 0 : i + 1),
          increment: () => props.increment(day === "s un" ? 0 : i + 1),
          allowedMinutes: ((_a = props.timeLimits.find(
            (l) => day === "s un" ? l.day === 0 : l.day === i + 1
          )) == null ? void 0 : _a.allowedMinutes) ?? 0
        }
      );
    })
  )
);
var TimeLimitsSection_default = TimeLimitsSection;

// src/profile/components/AllowedTimesSection.tsx
import { Stack as Stack111 } from "@mui/system";

// src/profile/components/AllowedTimeRow.tsx
import { Stack as Stack110 } from "@mui/system";
import { useCallback as useCallback12, useEffect as useEffect61, useState as useState88 } from "react";
import _25 from "lodash";
import dayjs13 from "dayjs";

// src/profile/components/useNewSegmentTimes.tsx
import { useEffect as useEffect60, useState as useState87 } from "react";
import dayjs12 from "dayjs";
import _24 from "lodash";
var MIN_ALLOWED_TIME_ADDITION_PERIOD = 0.75;
var useNewSegmentTimes = (times) => {
  const [newSegmentTimes, setNewSegmentTimes] = useState87(null);
  useEffect60(() => {
    if (times && times.length > 0) {
      var possibleStartTime = 0;
      var possibleEndTime = dayjs12(times[0].startTime).utc().hour() + (dayjs12(times[0].startTime).utc().minute() - 30) / 60;
      var finalizedStartTime;
      var finalizedEndTime;
      for (let i = 0; i < times.length + 1; i++) {
        if (possibleStartTime < possibleEndTime && possibleEndTime - possibleStartTime >= MIN_ALLOWED_TIME_ADDITION_PERIOD) {
          finalizedStartTime = possibleStartTime;
          finalizedEndTime = possibleEndTime;
          break;
        } else if (i + 1 < times.length) {
          possibleStartTime = dayjs12(times[i].endTime).utc().hour() + (dayjs12(times[i].endTime).utc().minute() + 30) / 60;
          possibleEndTime = dayjs12(times[i + 1].startTime).utc().hour() + (dayjs12(times[i + 1].startTime).utc().minute() - 30) / 60;
        } else if (i + 1 === times.length && dayjs12(times[i].endTime).utc().hour() > 0) {
          possibleStartTime = dayjs12(times[i].endTime).utc().hour() + (dayjs12(times[i].endTime).utc().minute() + 30) / 60;
          possibleEndTime = 24;
        }
      }
      if (_24.isNumber(finalizedStartTime) && finalizedEndTime) {
        setNewSegmentTimes([finalizedStartTime, finalizedEndTime]);
      } else {
        setNewSegmentTimes(null);
      }
    }
  }, [times]);
  return {
    newSegmentTimes,
    clearNewSegmentTimes: () => setNewSegmentTimes(null)
  };
};
var useNewSegmentTimes_default = useNewSegmentTimes;

// src/profile/components/AllowedTimeRow.tsx
var DISPLAY_INTERVAL = 2;
var DRAG_INTERVAL = 0.25;
var BrowsingTimeSelectorRange = (props) => {
  const [draggingDot1, setDraggingDot1] = useState88(false);
  const [draggingDot2, setDraggingDot2] = useState88(false);
  const [dot1X, setDot1X] = useState88(0);
  const [dot2X, setDot2X] = useState88(0);
  useEffect61(() => {
    if (_25.isNumber(props.start) && _25.isNumber(props.end)) {
      setDot1X(props.lineWidth * props.start / 24);
      setDot2X(props.lineWidth * props.end / 24);
    }
  }, [props.start, props.end, props.lineWidth]);
  useEffect61(() => {
    if (draggingDot1) {
      const newDotX = Math.max(
        0,
        Math.min(props.lineWidth, props.mouseX - props.lineLeftX)
      );
      const lockedEndLineX = Math.round(newDotX / props.dragInterval) * props.dragInterval;
      setDot1X(lockedEndLineX);
    }
  }, [draggingDot1, props.mouseX]);
  useEffect61(() => {
    if (draggingDot2) {
      const newDotX = Math.max(
        0,
        Math.min(props.lineWidth, props.mouseX - props.lineLeftX)
      );
      const lockedEndLineX = Math.round(newDotX / props.dragInterval) * props.dragInterval;
      setDot2X(lockedEndLineX);
    }
  }, [draggingDot2, props.mouseX]);
  const handleDraggingEnd = useCallback12(() => {
    if (draggingDot1 || draggingDot2) {
      setDraggingDot1(false);
      setDraggingDot2(false);
      props.setTimes(
        Math.max(0, Math.min(dot1X, dot2X) / props.lineWidth * 24),
        Math.min(24, Math.max(dot1X, dot2X) / props.lineWidth * 24)
      );
    }
  }, [dot1X, dot2X, props.lineWidth, draggingDot1, draggingDot2]);
  useEffect61(() => {
    window.addEventListener("mouseup", handleDraggingEnd);
    return () => {
      window.removeEventListener("mouseup", handleDraggingEnd);
    };
  }, [handleDraggingEnd]);
  const [hovering, setHovering] = useState88(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Stack110, { position: "absolute", left: dot1X, zIndex: 3 }, /* @__PURE__ */ React.createElement(Stack110, { flex: 1, position: "relative" }, /* @__PURE__ */ React.createElement(
    Stack110,
    {
      position: "absolute",
      top: 0,
      left: 0,
      sx: {
        transform: "translate(-50%, -35%)",
        cursor: draggingDot1 ? "grabbing" : "grab"
      },
      height: "14px",
      width: "14px",
      bgcolor: PALETTE.secondary.blue[2],
      borderRadius: "100%",
      onMouseDown: (e) => {
        setDraggingDot1(true);
        e.preventDefault();
      }
    }
  ))), /* @__PURE__ */ React.createElement(Stack110, { position: "absolute", left: dot2X, zIndex: 3 }, /* @__PURE__ */ React.createElement(Stack110, { flex: 1, position: "relative" }, /* @__PURE__ */ React.createElement(
    Stack110,
    {
      position: "absolute",
      top: 0,
      left: 0,
      sx: {
        transform: "translate(-50%, -35%)",
        cursor: draggingDot2 ? "grabbing" : "grab"
      },
      height: "14px",
      width: "14px",
      bgcolor: PALETTE.secondary.blue[2],
      borderRadius: "100%",
      onMouseDown: (e) => {
        setDraggingDot2(true);
        e.preventDefault();
      }
    }
  ))), /* @__PURE__ */ React.createElement(
    Stack110,
    {
      position: "absolute",
      left: Math.min(dot1X, dot2X),
      width: Math.abs(dot2X - dot1X),
      height: "20px",
      alignItems: "center",
      zIndex: 2,
      onMouseEnter: () => {
        setHovering(true);
      },
      onMouseLeave: () => {
        setHovering(false);
      }
    },
    /* @__PURE__ */ React.createElement(
      Stack110,
      {
        height: "4px",
        width: "100%",
        bgcolor: PALETTE.secondary.blue[1],
        position: "relative"
      },
      !props.noDeletion ? /* @__PURE__ */ React.createElement(
        Stack110,
        {
          position: "absolute",
          left: props.mouseX - props.lineLeftX - dot1X,
          top: "-26px",
          zIndex: 3,
          sx: {
            transform: "translate(-50%)",
            opacity: hovering && !draggingDot1 && !draggingDot2 ? 1 : 0,
            transition: "0.2s",
            svg: {
              path: {
                fill: PALETTE.system.red
              }
            },
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            pointerEvents: hovering ? void 0 : "none"
          },
          pb: "6px",
          onClick: props.delete
        },
        /* @__PURE__ */ React.createElement(TrashcanIcon_default, { height: "20px", width: "20px" })
      ) : null
    )
  ));
};
var BrowsingTimeSelector = (props) => {
  var _a, _b, _c;
  const [lineRef, setLineRef] = useState88(null);
  const [lineWidth, setLineWidth] = useState88(0);
  const [lineLeftX, setLineLeftX] = useState88(0);
  useEffect61(() => {
    var _a2, _b2;
    setLineWidth(((_a2 = lineRef == null ? void 0 : lineRef.getBoundingClientRect) == null ? void 0 : _a2.call(lineRef).width) ?? 0);
    setLineLeftX(((_b2 = lineRef == null ? void 0 : lineRef.getBoundingClientRect) == null ? void 0 : _b2.call(lineRef).left) ?? 0);
  }, [
    (_a = lineRef == null ? void 0 : lineRef.getBoundingClientRect) == null ? void 0 : _a.call(lineRef).width,
    (_b = lineRef == null ? void 0 : lineRef.getBoundingClientRect) == null ? void 0 : _b.call(lineRef).left
  ]);
  const [mouseX, setMouseX] = useState88(0);
  const handleMouseMove = useCallback12((event) => {
    setMouseX(event.pageX);
  }, []);
  useEffect61(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);
  const [dragInterval, setDragInterval] = useState88(1);
  useEffect61(
    () => setDragInterval(lineWidth * DRAG_INTERVAL / 24),
    [lineWidth]
  );
  return /* @__PURE__ */ React.createElement(Stack110, { width: "100%", height: "22px" }, /* @__PURE__ */ React.createElement(
    Stack110,
    {
      width: "100%",
      height: "4px",
      bgcolor: PALETTE.secondary.grey[2],
      borderRadius: "2px",
      ref: setLineRef,
      position: "relative"
    },
    (_c = props.ranges) == null ? void 0 : _c.map((allowedTimeRange, i) => {
      var _a2;
      const decimalStartTime = dayjs13(allowedTimeRange.startTime).utc().hour() + dayjs13(allowedTimeRange.startTime).utc().minute() / 60;
      const decimalEndTime = dayjs13(allowedTimeRange.endTime).utc().hour() + dayjs13(allowedTimeRange.endTime).utc().minute() / 60;
      const endTimeIsMidnight = dayjs13(allowedTimeRange.endTime).utc().day() > dayjs13(allowedTimeRange.startTime).utc().day();
      return /* @__PURE__ */ React.createElement(
        BrowsingTimeSelectorRange,
        {
          key: i,
          lineWidth,
          lineLeftX,
          dragInterval,
          mouseX,
          start: decimalStartTime,
          end: endTimeIsMidnight ? 24 : decimalEndTime,
          setTimes: (start, end) => {
            return props.setRangeTimes(
              allowedTimeRange.id,
              getISODateString(
                allowedTimeRange.day,
                Math.floor(start),
                Math.floor(start % 1 * 60)
              ),
              getISODateString(
                allowedTimeRange.day,
                Math.floor(end),
                Math.floor(end % 1 * 60)
              )
            );
          },
          delete: () => props.deleteRange(allowedTimeRange.id),
          noDeletion: ((_a2 = props.ranges) == null ? void 0 : _a2.length) === 1
        }
      );
    }),
    /* @__PURE__ */ React.createElement(Stack110, { flex: 1, justifyContent: "space-between", direction: "row" }, [...Array(1 + 24 / DISPLAY_INTERVAL).keys()].filter((x) => !props.halveLabelFrequency || (x - 1) % 2).map((i) => i * DISPLAY_INTERVAL).map((hour) => {
      return /* @__PURE__ */ React.createElement(
        Stack110,
        {
          key: `${hour}${props.halveLabelFrequency}`,
          height: "4px",
          width: "2px",
          bgcolor: PALETTE.secondary.grey[3],
          position: "relative"
        },
        /* @__PURE__ */ React.createElement(
          Stack110,
          {
            position: "absolute",
            bottom: "-20px",
            sx: { transform: "translateX(-50%)" }
          },
          /* @__PURE__ */ React.createElement(
            Typography,
            {
              sx: { fontSize: props.smallerLabelFont ? 8 : 10 },
              variant: "tiny",
              bold: true
            },
            `${hour % 12 || 12}:00${hour === 24 || hour < 12 ? "am" : "pm"}`
          )
        )
      );
    }))
  ));
};
var AllowedTimeRow = (props) => {
  const [sortedTimes, setSortedTimes] = useState88([]);
  useEffect61(
    () => setSortedTimes(_25.sortBy(props.times, (t) => new Date(t.startTime))),
    [props.times]
  );
  const { newSegmentTimes, clearNewSegmentTimes } = useNewSegmentTimes_default(sortedTimes);
  return /* @__PURE__ */ React.createElement(Stack110, { direction: "row", alignItems: "center" }, /* @__PURE__ */ React.createElement(Stack110, { width: "120px" }, /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[3] }, _25.capitalize(props.dayName))), /* @__PURE__ */ React.createElement(
    BrowsingTimeSelector,
    {
      ranges: sortedTimes,
      setRangeTimes: props.setAllowedTimes,
      deleteRange: props.deleteRange,
      smallerLabelFont: props.smallerLabelFont,
      halveLabelFrequency: props.halveLabelFrequency
    }
  ), /* @__PURE__ */ React.createElement(Stack110, { pl: "60px", direction: "row", spacing: "8px" }, /* @__PURE__ */ React.createElement(
    UrsorButton,
    {
      size: "small",
      variant: "secondary",
      backgroundColor: "rgb(255,255,255)",
      onClick: () => {
        newSegmentTimes && props.addAllowedTime(newSegmentTimes[0], newSegmentTimes[1]);
        clearNewSegmentTimes();
      },
      disabled: !newSegmentTimes
    },
    "Add"
  ), /* @__PURE__ */ React.createElement(
    UrsorButton,
    {
      size: "small",
      variant: "secondary",
      backgroundColor: PALETTE.secondary.grey[1],
      borderColor: PALETTE.secondary.grey[1],
      onClick: props.reset
    },
    "Reset"
  )));
};
var AllowedTimeRow_default = AllowedTimeRow;

// src/profile/components/AllowedTimesSection.tsx
var AllowedTimesSection = (props) => /* @__PURE__ */ React.createElement(
  AstroBentoCard,
  {
    title: "Time scheduler",
    info: {
      title: "s et when the Browser can be used",
      text: "s elect the times of the day when you want the Browser to be accessible. Click add to create a new time period if you want an offline period in the middle of the day. Turn this off to allow the Browser to be accessible 24/7."
    },
    infoButtonBelowTitle: true,
    notCollapsible: true,
    topRightStuff: props.topRightElement
  },
  props.allowedTimes ? /* @__PURE__ */ React.createElement(
    Stack111,
    {
      spacing: "36px",
      pb: "12px",
      sx: {
        opacity: props.disabled ? 0.4 : 1,
        pointerEvents: props.disabled ? "none" : void 0,
        transition: "0.2s"
      }
    },
    ["mon", "tue", "wed", "thu", "fri", "s at", "s un"].map((day, i) => /* @__PURE__ */ React.createElement(
      AllowedTimeRow_default,
      {
        key: day,
        dayName: day,
        times: props.allowedTimes.filter(
          (t) => day === "s un" ? t.day === 0 : t.day === i + 1
        ),
        deleteRange: props.deleteRange,
        reset: () => props.reset(day === "s un" ? 0 : i + 1),
        addAllowedTime: (startTime, endTime) => props.addTimeLimit(day === "s un" ? 0 : i + 1, startTime, endTime),
        setAllowedTimes: props.setAllowedTimes,
        halveLabelFrequency: props.halveLabelFrequency
      }
    ))
  ) : null
);
var AllowedTimesSection_default = AllowedTimesSection;

// src/profile/components/LimitsTab.tsx
import dayjs15 from "dayjs";
import utc from "dayjs/plugin/utc";
import { useWindowSize as useWindowSize8 } from "usehooks-ts";

// src/profile/components/MobileAllowedTimesSection.tsx
import React59 from "react";
import { Stack as Stack113 } from "@mui/system";

// src/profile/components/MobileAllowedTimeRow.tsx
import React58, { useEffect as useEffect62, useState as useState89 } from "react";
import { Stack as Stack112 } from "@mui/system";
import dayjs14 from "dayjs";
import _26 from "lodash";
var DAY_FULL_NAMES = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "s aturday",
  0: "s unday"
};
var TimeSelectionColumn = (props) => {
  const [gridRef, setGridRef] = useState89(null);
  const [hideTopGradient, setHideTopGradient] = useState89(true);
  const [hideBottomGradient, setHideBottomGradient] = useState89(false);
  const handleScroll = () => {
    if (gridRef) {
      const { scrollTop, scrollHeight, clientHeight } = gridRef;
      setHideTopGradient(scrollTop < 3);
      setHideBottomGradient(scrollTop + clientHeight >= scrollHeight);
    }
  };
  return /* @__PURE__ */ React58.createElement(Stack112, { spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React58.createElement(Typography, { bold: true, variant: "h5", color: PALETTE.secondary.grey[5] }, dayjs14(props.time).utc().format("hh:mma")), /* @__PURE__ */ React58.createElement(Stack112, { position: "relative", overflow: "hidden" }, /* @__PURE__ */ React58.createElement(
    Stack112,
    {
      position: "absolute",
      top: -1,
      left: 0,
      height: "80px",
      width: "100%",
      sx: {
        opacity: hideTopGradient ? 0 : 1,
        transition: "0.3s",
        pointerEvents: "none",
        background: `linear-gradient(rgb(255,255,255), rgba(255,255,255,0))`,
        transform: "translateY(1px)"
      },
      zIndex: 2
    }
  ), /* @__PURE__ */ React58.createElement(
    Stack112,
    {
      position: "absolute",
      bottom: -1,
      left: 0,
      height: "80px",
      width: "100%",
      sx: {
        opacity: hideBottomGradient ? 0 : 1,
        transition: "0.3s",
        pointerEvents: "none",
        background: `linear-gradient(rgba(255,255,255,0), rgb(255,255,255))`,
        transform: "translateY(1px)"
      },
      zIndex: 2
    }
  ), /* @__PURE__ */ React58.createElement(
    Stack112,
    {
      overflow: "scroll",
      ref: setGridRef,
      onScroll: handleScroll,
      pt: "10px"
    },
    /* @__PURE__ */ React58.createElement(Stack112, { height: "170px", spacing: "6px" }, [
      ...[...Array(24 * 60 / 15).keys()].map((i) => /* @__PURE__ */ React58.createElement(
        Stack112,
        {
          key: i,
          alignItems: "center",
          onClick: () => props.setTime(
            getISODateString(
              props.day,
              Math.floor(i * 15 / 60),
              i * 15 % 60
            )
          )
        },
        /* @__PURE__ */ React58.createElement(Typography, { color: PALETTE.secondary.grey[5] }, dayjs14().utc().hour(0).minute(0).millisecond(0).add(i * 15, "minutes").format("hh:mm a"))
      )),
      /* @__PURE__ */ React58.createElement(
        Stack112,
        {
          key: "midnight",
          alignItems: "center",
          onClick: () => props.setTime(
            getISODateString(props.day < 6 ? props.day + 1 : 0, 24, 0)
          )
        },
        /* @__PURE__ */ React58.createElement(Typography, { color: PALETTE.secondary.grey[5] }, "00:00am")
      )
    ])
  )));
};
var MobileTimeSelectionDialog = (props) => {
  return /* @__PURE__ */ React58.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Select times",
      subtitle: [`Choose this browsing period's start and end time.`],
      width: "422px",
      dynamicHeight: true,
      isMobile: true
    },
    /* @__PURE__ */ React58.createElement(Stack112, { direction: "row", width: "100%" }, /* @__PURE__ */ React58.createElement(Stack112, { flex: 1, justifyContent: "center" }, /* @__PURE__ */ React58.createElement(
      TimeSelectionColumn,
      {
        day: props.day,
        time: props.startTime,
        setTime: props.setStartTime
      }
    )), /* @__PURE__ */ React58.createElement(Typography, { variant: "h5", color: PALETTE.secondary.grey[3] }, "to"), /* @__PURE__ */ React58.createElement(Stack112, { flex: 1 }, /* @__PURE__ */ React58.createElement(
      TimeSelectionColumn,
      {
        day: props.day,
        time: props.endTime,
        setTime: props.setEndTime
      }
    )))
  );
};
var MobileAllowedTimeRowDisplayButton = (props) => {
  const [dialogOpen, setDialogOpen] = useState89(false);
  return /* @__PURE__ */ React58.createElement(React58.Fragment, null, /* @__PURE__ */ React58.createElement(
    Stack112,
    {
      borderRadius: "8px",
      bgcolor: PALETTE.secondary.grey[1],
      alignItems: "center",
      justifyContent: "center",
      direction: "row",
      height: "39px",
      width: "210px",
      px: "14px",
      boxSizing: "border-box",
      spacing: "10px",
      onClick: () => setDialogOpen(true)
    },
    /* @__PURE__ */ React58.createElement(Stack112, { alignItems: "center", direction: "row", spacing: "5px" }, /* @__PURE__ */ React58.createElement(Typography, { bold: true }, dayjs14(props.startTime).utc().format("hh:mma"))),
    /* @__PURE__ */ React58.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[3] }, "to"),
    /* @__PURE__ */ React58.createElement(Stack112, { alignItems: "center", direction: "row", spacing: "5px" }, /* @__PURE__ */ React58.createElement(Typography, { bold: true }, dayjs14(props.endTime).utc().format("hh:mma")))
  ), dialogOpen ? /* @__PURE__ */ React58.createElement(
    MobileTimeSelectionDialog,
    {
      open: true,
      onClose: () => setDialogOpen(false),
      day: props.day,
      startTime: props.startTime,
      setStartTime: props.setStartTime,
      endTime: props.endTime,
      setEndTime: props.setEndTime
    }
  ) : null);
};
var MobileAllowedTimeRow = (props) => {
  const [sortedTimes, setSortedTimes] = useState89([]);
  useEffect62(
    () => setSortedTimes(_26.sortBy(props.times, (t) => new Date(t.startTime))),
    [props.times]
  );
  const { newSegmentTimes, clearNewSegmentTimes } = useNewSegmentTimes_default(sortedTimes);
  const dayName = DAY_FULL_NAMES[props.day];
  return /* @__PURE__ */ React58.createElement(Stack112, { spacing: "4px" }, /* @__PURE__ */ React58.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[3] }, dayName), /* @__PURE__ */ React58.createElement(Stack112, { direction: "row" }, /* @__PURE__ */ React58.createElement(Stack112, { spacing: "4px" }, sortedTimes.map((t) => /* @__PURE__ */ React58.createElement(
    Stack112,
    {
      key: t.id,
      direction: "row",
      spacing: "10px",
      alignItems: "center",
      justifyContent: "space-between"
    },
    /* @__PURE__ */ React58.createElement(
      MobileAllowedTimeRowDisplayButton,
      {
        day: props.day,
        dayName,
        startTime: t.startTime,
        setStartTime: (time) => props.setRangeTimes(t.id, time, t.endTime),
        endTime: t.endTime,
        setEndTime: (time) => props.setRangeTimes(t.id, t.startTime, time)
      }
    ),
    sortedTimes.length > 1 ? /* @__PURE__ */ React58.createElement(
      Stack112,
      {
        sx: {
          svg: {
            path: {
              fill: PALETTE.system.red
            }
          }
        },
        onClick: () => props.deleteRange(t.id)
      },
      /* @__PURE__ */ React58.createElement(X_default, { height: "20px", width: "20px" })
    ) : null
  ))), /* @__PURE__ */ React58.createElement(
    Stack112,
    {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      pb: "3px"
    },
    /* @__PURE__ */ React58.createElement(
      Stack112,
      {
        width: "30px",
        height: "30px",
        bgcolor: PALETTE.secondary.purple[2],
        borderRadius: "100%",
        justifyContent: "center",
        alignItems: "center",
        sx: {
          svg: {
            path: {
              fill: "rgb(255,255,255)"
            }
          }
        },
        onClick: () => {
          newSegmentTimes && props.addRange(newSegmentTimes[0], newSegmentTimes[1]);
          clearNewSegmentTimes();
        }
      },
      /* @__PURE__ */ React58.createElement(PlusIcon_default, { height: "20px", width: "20px" })
    )
  )));
};
var MobileAllowedTimeRow_default = MobileAllowedTimeRow;

// src/profile/components/MobileAllowedTimesSection.tsx
var MobileAllowedTimesSection = (props) => /* @__PURE__ */ React59.createElement(
  AstroBentoCard,
  {
    title: "Time scheduler",
    info: {
      title: "s et when the Browser can be used",
      text: "s elect the times of the day when you want the Browser to be accessible. Click add to create a new time period if you want an offline period in the middle of the day. Turn this off to allow the Browser to be accessible 24/7."
    },
    notCollapsible: true,
    isMobile: true,
    topRightStuff: props.topRightElement
  },
  props.allowedTimes ? /* @__PURE__ */ React59.createElement(
    Stack113,
    {
      spacing: "18px",
      pb: "12px",
      sx: {
        opacity: props.disabled ? 0.4 : 1,
        pointerEvents: props.disabled ? "none" : void 0,
        transition: "0.2s"
      }
    },
    ["mon", "tue", "wed", "thu", "fri", "s at", "s un"].map((day, i) => /* @__PURE__ */ React59.createElement(
      MobileAllowedTimeRow_default,
      {
        key: day,
        day: day === "s un" ? 0 : i + 1,
        times: props.allowedTimes.filter(
          (t) => day === "s un" ? t.day === 0 : t.day === i + 1
        ),
        reset: () => props.reset(day === "s un" ? 0 : i + 1),
        addRange: (startTime, endTime) => props.addTimeLimit(day === "s un" ? 0 : i + 1, startTime, endTime),
        setRangeTimes: props.setAllowedTime,
        deleteRange: props.deleteRange
      }
    ))
  ) : null
);
var MobileAllowedTimesSection_default = MobileAllowedTimesSection;

// src/profile/components/LimitsTab.tsx
dayjs15.extend(utc);
var getISODateString = (day, hours, minutes) => dayjs15.utc().day(day).hour(hours).minute(minutes).second(0).millisecond(0).toISOString();
var DAILY_LIMIT_INCREMENT = 15;
var ALLOWED_TIMES_LABELS_SMALLER_FONT_SIZE_WINDOW_WIDTH_THRESHOLD = 1536;
var HALVE_LABEL_FREQUENCY_WINDOW_WIDTH_THRESHOLD = 1450;
var SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD2 = 1080;
var DevicePageLimitsTab = (props) => {
  const [allowedTimes, setAllowedTimes] = useState90([]);
  const [timeLimits, setTimeLimits] = useState90([]);
  const [deviceConfig, setDeviceConfig] = useState90();
  const loadData = useCallback13(
    () => api_default.getDeviceWithTimesAndConfig(props.deviceId).then(
      (d) => {
        setAllowedTimes(d.allowedTimes);
        setTimeLimits(d.timeLimits);
        setDeviceConfig(d.config);
      }
    ),
    [props.deviceId]
  );
  useEffect63(() => {
    loadData();
  }, [loadData]);
  const addAllowedTime = (day, startTime, endTime) => {
    api_default.addAllowedTimeRange(
      props.deviceId,
      day,
      getISODateString(
        day,
        Math.floor(startTime),
        Math.floor(startTime % 1 * 60)
      ),
      getISODateString(day, Math.floor(endTime), Math.floor(endTime % 1 * 60))
    ).then(loadData);
  };
  const reset = (day) => {
    api_default.resetAllowedTimes(props.deviceId, day).then(loadData);
  };
  const deleteRange = (id) => {
    api_default.removeAllowedTimeRange(id).then(loadData);
  };
  const [allowedTimesEnabled, setAllowedTimesEnabled] = useState90(false);
  const [timeLimitsEnabled, setTimeLimitsEnabled] = useState90(false);
  useEffect63(() => {
    if (deviceConfig) {
      !_27.isUndefined(deviceConfig == null ? void 0 : deviceConfig.allowedTimesEnabled) && setAllowedTimesEnabled(deviceConfig.allowedTimesEnabled);
      !_27.isUndefined(deviceConfig == null ? void 0 : deviceConfig.timeLimitsEnabled) && setTimeLimitsEnabled(deviceConfig.timeLimitsEnabled);
    }
  }, [deviceConfig]);
  const [requestedSites, setRequestedSites] = useState90([]);
  const loadRequestedSites = useCallback13(
    () => api_default.getRequestedSites(props.deviceId).then(setRequestedSites),
    [props.deviceId]
  );
  useEffect63(() => {
    loadRequestedSites();
  }, [loadRequestedSites]);
  const { width } = useWindowSize8();
  const [
    allowedTimesLabelsSmallerFontSize,
    setAllowedTimesLabelsSmallerFontSize
  ] = useState90(false);
  useEffect63(
    () => setAllowedTimesLabelsSmallerFontSize(
      width < ALLOWED_TIMES_LABELS_SMALLER_FONT_SIZE_WINDOW_WIDTH_THRESHOLD && width > SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD2
    ),
    [width]
  );
  const [switchToColumn, setSwitchToColumn] = useState90(false);
  useEffect63(
    () => setSwitchToColumn(width < SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD2),
    [width]
  );
  const [halveLabelFrequency, setHalveLabelFrequency] = useState90(false);
  useEffect63(
    () => setHalveLabelFrequency(
      width < HALVE_LABEL_FREQUENCY_WINDOW_WIDTH_THRESHOLD
    ),
    [width]
  );
  const notificationCtx = useContext20(NotificationContext_default);
  return /* @__PURE__ */ React.createElement(
    ProfilePageTabLayout_default,
    {
      title: "Limits",
      info: {
        title: "How do limits work?",
        text: "For each day you can choose what time you want the Browser to be accessible and set the total amount of time you want your child to be able to spend online. If you don't want to use these features just toggle them off in the top right corner of their respective box!"
      }
    },
    /* @__PURE__ */ React.createElement(Stack114, { spacing: "24px", pb: "33px" }, requestedSites.length > 0 ? /* @__PURE__ */ React.createElement(
      RequestedSitesSection_default,
      {
        sites: requestedSites,
        onUpdate: loadRequestedSites
      }
    ) : null, /* @__PURE__ */ React.createElement(Stack114, { direction: switchToColumn ? "column" : "row", spacing: "24px" }, /* @__PURE__ */ React.createElement(Stack114, { width: switchToColumn ? void 0 : "70%" }, props.isMobile ? /* @__PURE__ */ React.createElement(
      MobileAllowedTimesSection_default,
      {
        topRightElement: /* @__PURE__ */ React.createElement(
          AstroSwitch_default,
          {
            on: allowedTimesEnabled,
            callback: () => {
              setAllowedTimesEnabled(!allowedTimesEnabled);
              api_default.flipAllowedTimesEnabled(
                props.deviceId,
                !allowedTimesEnabled
              );
            }
          }
        ),
        allowedTimes,
        setAllowedTime: (id, startTime, endTime) => {
          setAllowedTimes(
            allowedTimes.map(
              (t) => t.id === id ? { ...t, startTime, endTime } : t
            )
          );
          api_default.changeAllowedTimeRange(id, startTime, endTime);
        },
        deleteRange,
        addTimeLimit: addAllowedTime,
        reset,
        smallerLabelFont: allowedTimesLabelsSmallerFontSize,
        disabled: !allowedTimesEnabled
      }
    ) : /* @__PURE__ */ React.createElement(
      AllowedTimesSection_default,
      {
        topRightElement: /* @__PURE__ */ React.createElement(
          AstroSwitch_default,
          {
            on: allowedTimesEnabled,
            callback: () => {
              setAllowedTimesEnabled(!allowedTimesEnabled);
              api_default.flipAllowedTimesEnabled(
                props.deviceId,
                !allowedTimesEnabled
              );
              notificationCtx.success(
                `Switched allowed times ${allowedTimesEnabled ? "off" : "on"} on this Device`
              );
            }
          }
        ),
        allowedTimes,
        setAllowedTimes: (id, startTime, endTime) => {
          setAllowedTimes(
            allowedTimes.map(
              (t) => t.id === id ? { ...t, startTime, endTime } : t
            )
          );
          api_default.changeAllowedTimeRange(id, startTime, endTime);
        },
        addTimeLimit: addAllowedTime,
        reset,
        deleteRange,
        smallerLabelFont: allowedTimesLabelsSmallerFontSize,
        halveLabelFrequency,
        disabled: !allowedTimesEnabled
      }
    )), /* @__PURE__ */ React.createElement(
      TimeLimitsSection_default,
      {
        topRightElement: /* @__PURE__ */ React.createElement(
          AstroSwitch_default,
          {
            on: timeLimitsEnabled,
            callback: () => {
              setTimeLimitsEnabled(!timeLimitsEnabled);
              api_default.flipTimeLimitsEnabled(
                props.deviceId,
                !timeLimitsEnabled
              );
              notificationCtx.success(
                `Switched time limits ${timeLimitsEnabled ? "off" : "on"} on this Device`
              );
            }
          }
        ),
        isMobile: props.isMobile,
        timeLimits,
        increment: (day) => {
          var _a, _b;
          const limitId = (_a = timeLimits.find((l) => l.day === day)) == null ? void 0 : _a.id;
          if (limitId) {
            setTimeLimits(
              timeLimits.map(
                (l) => l.day === day ? {
                  id: limitId,
                  day: l.day,
                  allowedMinutes: l.allowedMinutes + DAILY_LIMIT_INCREMENT
                } : l
              )
            );
            api_default.setTimeLimit(
              limitId,
              (((_b = timeLimits.find((l) => l.day === day)) == null ? void 0 : _b.allowedMinutes) ?? 0) + DAILY_LIMIT_INCREMENT
            );
          }
        },
        decrement: (day) => {
          var _a, _b;
          const limitId = (_a = timeLimits.find((l) => l.day === day)) == null ? void 0 : _a.id;
          if (limitId) {
            setTimeLimits(
              timeLimits.map(
                (l) => l.day === day ? {
                  id: limitId,
                  day: l.day,
                  allowedMinutes: l.allowedMinutes - DAILY_LIMIT_INCREMENT
                } : l
              )
            );
            api_default.setTimeLimit(
              limitId,
              (((_b = timeLimits.find((l) => l.day === day)) == null ? void 0 : _b.allowedMinutes) ?? 0) - DAILY_LIMIT_INCREMENT
            );
          }
        },
        disabled: !timeLimitsEnabled
      }
    )))
  );
};
var LimitsTab_default = DevicePageLimitsTab;

// src/profile/components/AppToggleCard.tsx
import { Stack as Stack115 } from "@mui/system";
import React60 from "react";
var AppToggleCard = (props) => /* @__PURE__ */ React60.createElement(
  Stack115,
  {
    bgcolor: "rgb(255,255,255)",
    borderRadius: "12px",
    border: `1px solid ${PALETTE.secondary.grey[2]}`,
    p: "16px",
    boxSizing: "border-box",
    alignItems: "space-between",
    justifyContent: "center",
    height: "130px"
  },
  /* @__PURE__ */ React60.createElement(Stack115, { justifyContent: "space-between", spacing: "12px", flex: 1 }, /* @__PURE__ */ React60.createElement(Stack115, { justifyContent: "space-between", direction: "row", alignItems: "center" }, /* @__PURE__ */ React60.createElement(Stack115, { spacing: "16px", direction: "row", flex: 1 }, /* @__PURE__ */ React60.createElement(Stack115, { position: "relative" }, props.enabled ? /* @__PURE__ */ React60.createElement(
    Stack115,
    {
      position: "absolute",
      top: "-6px",
      right: "-10px",
      width: "20px",
      height: "20px",
      bgcolor: PALETTE.secondary.green[4],
      sx: { svg: { path: { fill: "rgb(255,255,255)" } } },
      borderRadius: "100%",
      overflow: "hidden",
      border: "1.5px solid white",
      justifyContent: "center",
      alignItems: "center"
    },
    /* @__PURE__ */ React60.createElement(CheckIcon_default, { width: "12px", height: "12px" })
  ) : null, /* @__PURE__ */ React60.createElement(
    Stack115,
    {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 0 16px rgba(0,0,0,0.08)"
    },
    /* @__PURE__ */ React60.createElement(
      "img",
      {
        src: props.imageUrl,
        height: 41,
        width: 41,
        alt: "platform image"
      }
    )
  )), /* @__PURE__ */ React60.createElement(Stack115, { overflow: "hidden" }, /* @__PURE__ */ React60.createElement(Typography, { maxLines: 1, bold: true }, props.title), /* @__PURE__ */ React60.createElement(
    Typography,
    {
      variant: "small",
      bold: true,
      color: PALETTE.secondary.grey[3],
      maxLines: 1,
      sx: {
        wordBreak: "break-all"
      }
    },
    cleanUrl(props.url).replace(/\/$/, "")
  ))), /* @__PURE__ */ React60.createElement(AstroSwitch_default, { on: props.enabled, callback: props.callback })), /* @__PURE__ */ React60.createElement(Stack115, { flex: 1 }, /* @__PURE__ */ React60.createElement(Typography, { variant: "small", bold: true, color: PALETTE.secondary.grey[3] }, props.description)))
);
var AppToggleCard_default = AppToggleCard;

// src/profile/components/AppsTab.tsx
import { Stack as Stack116 } from "@mui/system";
import { useContext as useContext21, useEffect as useEffect64, useState as useState91 } from "react";
import _28 from "lodash";
var PAGE_SIZE = 20;
var AppsLegend = (props) => /* @__PURE__ */ React.createElement(Stack116, { direction: "row", spacing: "20px" }, /* @__PURE__ */ React.createElement(Stack116, null, /* @__PURE__ */ React.createElement(
  Stack116,
  {
    direction: "row",
    alignItems: "center",
    spacing: props.small ? "7px" : "10px"
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: props.small ? "small" : "normal", bold: true }, "Enabled"),
  /* @__PURE__ */ React.createElement(
    Stack116,
    {
      height: props.small ? "12px" : "16px",
      width: props.small ? "12px" : "16px",
      borderRadius: "100%",
      bgcolor: PALETTE.system.green
    }
  )
)), /* @__PURE__ */ React.createElement(Stack116, null, /* @__PURE__ */ React.createElement(
  Stack116,
  {
    direction: "row",
    alignItems: "center",
    spacing: props.small ? "7px" : "10px"
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: props.small ? "small" : "normal", bold: true }, "Disabled"),
  /* @__PURE__ */ React.createElement(
    Stack116,
    {
      height: props.small ? "12px" : "16px",
      width: props.small ? "12px" : "16px",
      borderRadius: "100%",
      bgcolor: PALETTE.secondary.grey[3]
    }
  )
)));
var DevicePageAppsTab = (props) => {
  const [selectedCategory, setSelectedCategory] = useState91();
  const [categories, setCategories] = useState91([]);
  useEffect64(() => {
    api_default.getAllFilterCategories().then(setCategories);
  }, []);
  const [nPages, setNPages] = useState91(1);
  const [pageIndex, setPageIndex] = useState91(0);
  useEffect64(() => setPageIndex(0), [selectedCategory]);
  const [searchValue, setSearchValue] = useState91("");
  const [apps, setApps] = useState91([]);
  const [filteredApps, setFilteredApps] = useState91([]);
  useEffect64(() => {
    api_default.getApps(
      props.deviceId,
      pageIndex + 1,
      PAGE_SIZE,
      selectedCategory,
      searchValue
    ).then((response) => {
      setApps(_28.sortBy(response.apps, (a) => a.id));
      setNPages(response.pages);
    });
  }, [props.deviceId, pageIndex, selectedCategory, searchValue]);
  useEffect64(
    () => setFilteredApps(
      apps.filter(
        (d) => !searchValue || d.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    [apps, searchValue]
  );
  const notificationCtx = useContext21(NotificationContext_default);
  return /* @__PURE__ */ React.createElement(
    ProfilePageTabLayout_default,
    {
      title: "Apps",
      rightSideElement: !props.isMobile ? /* @__PURE__ */ React.createElement(AppsLegend, null) : void 0,
      info: {
        title: "How do apps work?",
        text: "Apps provide quick access on your kid's Browser to hand-picked resources that provide a lot of value. Toggle them on and they'll be accessible on your kid's Device and we'll make sure the Filter doesn't interfere with access to them. Please note that we do override the Filter to allow access to the Apps that you select! So if you have social media access turned off but toggle on a social media app we will allow access to it."
      }
    },
    props.isMobile ? /* @__PURE__ */ React.createElement(Stack116, { alignItems: "flex-end" }, /* @__PURE__ */ React.createElement(AppsLegend, { small: props.isMobile })) : null,
    /* @__PURE__ */ React.createElement(Stack116, { pb: "32px" }, /* @__PURE__ */ React.createElement(AstroCard_default, null, /* @__PURE__ */ React.createElement(Stack116, { px: "16px", pt: "16px", justifyContent: "center" }, /* @__PURE__ */ React.createElement(
      Stack116,
      {
        direction: "row",
        spacing: "12px",
        justifyContent: "space-between"
      },
      /* @__PURE__ */ React.createElement(Stack116, { overflow: "scroll" }, /* @__PURE__ */ React.createElement(Stack116, { direction: "row", spacing: "12px", pb: "20px" }, [
        /* @__PURE__ */ React.createElement(
          Stack116,
          {
            key: "all",
            height: "32px",
            borderRadius: "6px",
            bgcolor: PALETTE.secondary.grey[1],
            justifyContent: "center",
            alignItems: "center",
            px: "12px",
            onClick: () => setSelectedCategory(void 0),
            sx: {
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { opacity: 0.7 }
            }
          },
          /* @__PURE__ */ React.createElement(
            Typography,
            {
              bold: true,
              sx: { fontSize: 14, whiteSpace: "nowrap" },
              color: _28.isUndefined(selectedCategory) ? PALETTE.secondary.purple[2] : void 0
            },
            "All"
          )
        ),
        ...categories.map((c) => /* @__PURE__ */ React.createElement(
          Stack116,
          {
            key: c.categoryId,
            height: "32px",
            borderRadius: "6px",
            bgcolor: PALETTE.secondary.grey[1],
            justifyContent: "center",
            alignItems: "center",
            px: "12px",
            onClick: () => setSelectedCategory(c.categoryId),
            sx: {
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { opacity: 0.7 }
            }
          },
          /* @__PURE__ */ React.createElement(
            Typography,
            {
              bold: true,
              sx: { fontSize: 14, whiteSpace: "nowrap" },
              color: selectedCategory === c.categoryId ? PALETTE.secondary.purple[2] : void 0
            },
            c.title
          )
        ))
      ])),
      /* @__PURE__ */ React.createElement(Stack116, { pt: "2px" }, /* @__PURE__ */ React.createElement(
        SearchInput,
        {
          value: searchValue,
          callback: setSearchValue,
          clearCallback: () => setSearchValue(""),
          grey: true
        }
      ))
    ), /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "292px", rowGap: "8px", columnGap: "20px" }, filteredApps.map((a, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: a.id, duration: 800, delay: i * 80 }, /* @__PURE__ */ React.createElement(
      AppToggleCard_default,
      {
        ...a,
        callback: () => {
          setFilteredApps(
            filteredApps.map(
              (app) => app.id === a.id ? { ...app, enabled: !app.enabled } : app
            )
          );
          (a.enabled ? api_default.disableApp : api_default.enableApp)(props.deviceId, a.id).then(
            () => notificationCtx.success(
              a.enabled ? `Disabled ${a.title}` : `Enabled ${a.title}`
            )
          );
        }
      }
    )))), /* @__PURE__ */ React.createElement(Stack116, { py: "20px" }, /* @__PURE__ */ React.createElement(
      PageSelector_default,
      {
        pageIndex,
        setPageIndex,
        nPages
      }
    )))))
  );
};
var AppsTab_default = DevicePageAppsTab;

// src/profile/contents/body-desktop.tsx
import { useWindowSize as useWindowSize9 } from "usehooks-ts";
var SWITCH_TO_MOBILE_DEVICE_CARD_WINDOW_WIDTH_THRESHOLD = 1283;
var ProfilePageDesktopBody = (props) => {
  const navigate = useNavigate29();
  const [selectedTab, setSelectedTab] = useState92(
    props.tab ?? "content"
  );
  const { width } = useWindowSize9();
  const [switchToMobileDeviceCard, setSwitchToMobileDeviceCard] = useState92(false);
  useEffect65(() => {
    setSwitchToMobileDeviceCard(
      width < SWITCH_TO_MOBILE_DEVICE_CARD_WINDOW_WIDTH_THRESHOLD
    );
  }, [width]);
  return /* @__PURE__ */ React.createElement(
    PageLayout_default,
    {
      titleRow: props.titleRow,
      titleBackButtonCallback: () => navigate("/profiles"),
      bodyWidth: "100%",
      fullHeight: true,
      selectedSidebarItemId: "devices",
      actions: props.actions,
      maxWidth: 834,
      scrollable: true
    },
    /* @__PURE__ */ React.createElement(Stack117, { pl: "48px" }, switchToMobileDeviceCard ? /* @__PURE__ */ React.createElement(
      MobileDeviceCard_default,
      {
        ...props.device,
        onClickViewScreenTime: () => setSelectedTab("limits"),
        onUpdate: props.onUpdateDevice,
        noDeviceTypeUnderAvatar: true
      }
    ) : /* @__PURE__ */ React.createElement(
      HorizontalDeviceCard_default,
      {
        ...props.device,
        onClickViewScreenTime: () => setSelectedTab("limits"),
        onUpdate: props.onUpdateDevice
      }
    ), /* @__PURE__ */ React.createElement(Stack117, { flex: 1, height: "56px", minHeight: "56px", justifyContent: "center" }, /* @__PURE__ */ React.createElement(
      Stack117,
      {
        height: "1px",
        width: "100%",
        bgcolor: PALETTE.secondary.grey[2]
      }
    ))),
    /* @__PURE__ */ React.createElement(Stack117, { pl: "48px", spacing: "24px" }, /* @__PURE__ */ React.createElement(
      Stack117,
      {
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "fit"
      },
      /* @__PURE__ */ React.createElement(
        AstroTabSwitch_default,
        {
          select: (id) => setSelectedTab(id),
          selected: selectedTab,
          items: [
            {
              text: "Content",
              id: "content"
            },
            {
              text: "Apps",
              id: "apps"
            },
            {
              text: "Insights",
              id: "insights"
            },
            {
              text: "Limits",
              id: "limits"
            }
          ]
        }
      )
    ), selectedTab === "insights" ? /* @__PURE__ */ React.createElement(InsightsTab_default, { deviceId: props.device.id }) : selectedTab === "apps" ? /* @__PURE__ */ React.createElement(AppsTab_default, { deviceId: props.device.id }) : selectedTab === "content" ? /* @__PURE__ */ React.createElement(
      ContentTab_default,
      {
        deviceId: props.device.id,
        deviceName: props.device.name,
        folders: props.folders,
        onUpdate: props.onUpdateFolders,
        openAddFolderDialog: props.openAddFolderDialog
      }
    ) : selectedTab === "limits" ? /* @__PURE__ */ React.createElement(LimitsTab_default, { deviceId: props.device.id }) : null)
  );
};
var body_desktop_default5 = ProfilePageDesktopBody;

// src/profile/contents/body-mobile.tsx
import { Stack as Stack118 } from "@mui/system";
import { useNavigate as useNavigate30 } from "react-router-dom";
import { useState as useState93 } from "react";
var ProfilePageMobileBody = (props) => {
  const navigate = useNavigate30();
  const [selectedTab, setSelectedTab] = useState93(
    props.tab ?? "content"
  );
  return /* @__PURE__ */ React.createElement(
    MobilePageLayout_default,
    {
      titleRow: props.titleRow.slice(-1)[0],
      titleBackButtonCallback: () => navigate("/profiles"),
      selectedPage: "profiles",
      actions: props.actions
    },
    /* @__PURE__ */ React.createElement(Stack118, { spacing: "24px", flex: 1 }, /* @__PURE__ */ React.createElement(
      MobileDeviceCard_default,
      {
        ...props.device,
        onClickViewScreenTime: () => setSelectedTab("limits"),
        onUpdate: props.onUpdateDevice,
        noDeviceTypeUnderAvatar: true
      }
    ), /* @__PURE__ */ React.createElement(Stack118, { width: "100%", alignItems: "center", justifyContent: "center" }, /* @__PURE__ */ React.createElement(
      Stack118,
      {
        height: "1px",
        width: "100%",
        bgcolor: PALETTE.secondary.grey[2]
      }
    )), /* @__PURE__ */ React.createElement(
      AstroTabSwitch_default,
      {
        select: (id) => setSelectedTab(id),
        selected: selectedTab,
        items: [
          {
            text: "Content",
            id: "content"
          },
          {
            text: "Apps",
            id: "apps"
          },
          {
            text: "Insights",
            id: "insights"
          },
          {
            text: "Limits",
            id: "limits"
          }
        ]
      }
    ), selectedTab === "insights" ? /* @__PURE__ */ React.createElement(MobileInsightsTab_default, { deviceId: props.device.id }) : selectedTab === "apps" ? /* @__PURE__ */ React.createElement(AppsTab_default, { deviceId: props.device.id, isMobile: true }) : selectedTab === "content" ? /* @__PURE__ */ React.createElement(
      ContentTab_default,
      {
        deviceId: props.device.id,
        deviceName: props.device.name,
        folders: props.folders,
        onUpdate: props.onUpdateFolders,
        openAddFolderDialog: props.openAddFolderDialog,
        isMobile: true
      }
    ) : selectedTab === "limits" ? /* @__PURE__ */ React.createElement(LimitsTab_default, { deviceId: props.device.id, isMobile: true }) : null)
  );
};
var body_mobile_default5 = ProfilePageMobileBody;

// src/profile/components/AddFolderDialog.tsx
import { Stack as Stack119 } from "@mui/system";
import { useEffect as useEffect66, useState as useState94 } from "react";
var AddFolderDialog = (props) => {
  const [searchValue, setSearchValue] = useState94("");
  const [allFolders, setAllFolders] = useState94([]);
  useEffect66(() => {
    api_default.getGroupFolders(props.groupId).then((d) => setAllFolders(d));
  }, [props.groupId]);
  const [nonAddedFolders, setNonAddedFolders] = useState94([]);
  useEffect66(
    () => setNonAddedFolders(
      allFolders.filter(
        (d) => !props.addedFolders.find((device) => device.id === d.id)
      )
    ),
    [allFolders, props.addedFolders]
  );
  const [filteredFolders, setFilteredFolders] = useState94([]);
  useEffect66(
    () => setFilteredFolders(
      nonAddedFolders.filter(
        (d) => !searchValue || d.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    [nonAddedFolders, searchValue]
  );
  return /* @__PURE__ */ React.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Add a Folder",
      subtitle: [
        "Add all of the Content from the selected Folder to this Device. Or create a new one."
      ],
      width: "434px",
      height: props.isMobile ? "76%" : void 0,
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(
      SearchInput,
      {
        value: searchValue,
        callback: setSearchValue,
        clearCallback: () => setSearchValue(""),
        fullWidth: true,
        height: "41px",
        grey: true
      }
    ),
    nonAddedFolders.length === 0 ? /* @__PURE__ */ React.createElement(Stack119, { flex: 1, justifyContent: "center", width: "66%" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        color: PALETTE.secondary.grey[3],
        bold: true,
        sx: { textAlign: "center" }
      },
      "All of your Content Folders are already on this Device."
    )) : /* @__PURE__ */ React.createElement(Stack119, { overflow: "scroll", flex: 1, width: "100%" }, /* @__PURE__ */ React.createElement(Stack119, { pt: "16px", spacing: "16px", width: "100%", flex: 1, pb: "12px" }, filteredFolders.map((d) => /* @__PURE__ */ React.createElement(
      Stack119,
      {
        key: d.id,
        direction: "row",
        spacing: "8px",
        px: "8px",
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.7 }
        },
        onClick: () => props.onAdd(d.id)
      },
      /* @__PURE__ */ React.createElement(Typography, { maxLines: 1, bold: true }, d.title)
    )))),
    /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        variant: "tertiary",
        endIcon: PlusIcon_default,
        width: "100%",
        onClick: props.openCreateNewDialog
      },
      "Create new"
    )
  );
};
var AddFolderDialog_default = AddFolderDialog;

// src/profile/contents/common.tsx
function ProfilePage(props) {
  const { user } = useAuth_default();
  const [device, setDevice] = useState95();
  const loadDevice = useCallback14(
    () => api_default.getEnrichedDevice(props.deviceId).then((d) => setDevice(d)),
    [props.deviceId]
  );
  const [cuttingEdgeOnlineStatusDevice] = useDeviceOnlineStatus_default(device ? [device] : []);
  useEffect67(() => {
    loadDevice();
  }, [loadDevice]);
  const navigate = useNavigate31();
  const [renameDialogOpen, setRenameDialogOpen] = useState95(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState95(false);
  const [addFolderDialogOpen, setAddFolderDialogOpen] = useState95(false);
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState95(false);
  const [allDevices, setAllDevices] = useState95([]);
  useEffect67(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupEnrichedDevices(user.group_id).then(
      (d) => setAllDevices(d)
    );
  }, [user == null ? void 0 : user.group_id]);
  const [deviceFolders, setDeviceFolders] = useState95(
    []
  );
  const loadFolders = useCallback14(
    () => api_default.getDeviceFolders(props.deviceId).then(
      (folders) => setDeviceFolders(_29.reverse(_29.sortBy(folders, (f) => f.id)))
    ),
    [props.deviceId]
  );
  useEffect67(() => {
    loadFolders();
  }, [loadFolders]);
  const titleRow = [
    {
      text: "All Kids",
      callback: () => navigate("/profiles")
    },
    {
      text: (device == null ? void 0 : device.name) ?? "",
      image: /* @__PURE__ */ React61.createElement(Stack120, { position: "relative", borderRadius: "100%" }, /* @__PURE__ */ React61.createElement(
        Stack120,
        {
          borderRadius: "100%",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: PALETTE.secondary.blue[2],
          height: props.isMobile ? 24 : 36,
          width: props.isMobile ? 24 : 36
        },
        (device == null ? void 0 : device.profileAvatarUrl) ? /* @__PURE__ */ React61.createElement(
          "img",
          {
            src: (device == null ? void 0 : device.profileAvatarUrl) ?? "",
            height: props.isMobile ? 24 : 36,
            width: props.isMobile ? 24 : 36,
            alt: "device profile"
          }
        ) : /* @__PURE__ */ React61.createElement(
          Typography,
          {
            color: "rgb(255,255,255)",
            bold: true,
            variant: "small",
            sx: { transform: "translateY(0.5px)" }
          },
          getInitials((device == null ? void 0 : device.name) ?? "")
        )
      ), (cuttingEdgeOnlineStatusDevice == null ? void 0 : cuttingEdgeOnlineStatusDevice.online) ? /* @__PURE__ */ React61.createElement(
        Stack120,
        {
          height: "11px",
          width: "11px",
          border: `2px solid ${PALETTE.secondary.grey[1]}`,
          borderRadius: "100%",
          bgcolor: PALETTE.system.green,
          position: "absolute",
          bottom: 0,
          right: 0,
          sx: { transform: "translate(2px, 2px)" }
        }
      ) : null),
      options: allDevices.filter((d) => d.id !== props.deviceId).map((d) => ({
        text: d.name,
        imageUrl: d.profileAvatarUrl,
        callback: () => navigate(`/profiles/${d.id}`)
      })),
      label: !props.isMobile && (device == null ? void 0 : device.deviceType) ? DEVICE_TYPE_DISPLAY_NAMES[device.deviceType] : void 0
    }
  ];
  const actions = [
    {
      text: "Edit name",
      kallback: () => setRenameDialogOpen(true),
      icon: Pencil_default
    }
  ];
  const notificationCtx = useContext22(NotificationContext_default);
  const createAndAddFolder = (title) => (user == null ? void 0 : user.group_id) && api_default.createFolder(title, user.group_id).then((response) => {
    api_default.addFolderToDevice(response.contentBucketId, props.deviceId);
    navigate(`/folders/${response.contentBucketId}`);
    notificationCtx.success("Created Folder and added it to the Device.");
  });
  return device ? /* @__PURE__ */ React61.createElement(React61.Fragment, null, props.isMobile ? /* @__PURE__ */ React61.createElement(
    body_mobile_default5,
    {
      device: cuttingEdgeOnlineStatusDevice || device,
      titleRow,
      actions,
      folders: deviceFolders,
      tab: props.tab,
      onUpdateDevice: loadDevice,
      onUpdateFolders: loadFolders,
      openAddFolderDialog: () => setAddFolderDialogOpen(true)
    }
  ) : /* @__PURE__ */ React61.createElement(
    body_desktop_default5,
    {
      device: cuttingEdgeOnlineStatusDevice || device,
      titleRow,
      actions,
      folders: deviceFolders,
      tab: props.tab,
      onUpdateDevice: loadDevice,
      onUpdateFolders: loadFolders,
      openAddFolderDialog: () => setAddFolderDialogOpen(true)
    }
  ), /* @__PURE__ */ React61.createElement(
    DeviceRenameDialog_default,
    {
      open: renameDialogOpen,
      onClose: () => setRenameDialogOpen(false),
      onSubmit: (name) => {
        api_default.renameDevice(props.deviceId, name).then(loadDevice).then(() => notificationCtx.success("Renamed Device"));
        setRenameDialogOpen(false);
      },
      name: device.name ?? "",
      isMobile: props.isMobile
    }
  ), /* @__PURE__ */ React61.createElement(
    DeviceDisconnectDialog_default,
    {
      open: disconnectDialogOpen,
      onClose: () => setDisconnectDialogOpen(false),
      onSubmit: () => null
    }
  ), /* @__PURE__ */ React61.createElement(
    AddFolderDialog_default,
    {
      open: addFolderDialogOpen,
      groupId: user == null ? void 0 : user.group_id,
      onClose: () => setAddFolderDialogOpen(false),
      addedFolders: deviceFolders,
      onAdd: (id) => api_default.addFolderToDevice(id, props.deviceId).then(loadFolders).then(() => setAddFolderDialogOpen(false)).then(() => notificationCtx.success("Added Folder to Device.")),
      openCreateNewDialog: () => {
        setCreateFolderDialogOpen(true);
        setAddFolderDialogOpen(false);
      },
      isMobile: props.isMobile
    }
  ), /* @__PURE__ */ React61.createElement(
    FolderCreationDialog_default,
    {
      open: createFolderDialogOpen,
      onClose: () => setCreateFolderDialogOpen(false),
      onSubmit: createAndAddFolder,
      isMobile: props.isMobile
    }
  )) : /* @__PURE__ */ React61.createElement(React61.Fragment, null);
}

// src/profile/index.tsx
var Profile2 = ({
  params,
  searchParams
}) => {
  return /* @__PURE__ */ React62.createElement(
    ProfilePage,
    {
      deviceId: parseInt(params.id),
      isMobile: isMobile10,
      tab: searchParams.tab
    }
  );
};
var profile_default = Profile2;
export {
  account_default as AccountPage,
  channel_default as ChannelPage,
  filter_default as FilterPage,
  filters_default as FiltersPage,
  folder_default as FolderPage,
  folders_default as FoldersPage,
  profile_default as ProfilePage,
  profiles_default as ProfilesPage
};
//# sourceMappingURL=index.js.map