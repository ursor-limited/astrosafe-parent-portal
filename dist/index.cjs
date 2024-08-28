"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AccountPage: () => account_default,
  ChannelPage: () => channel_default,
  FilterPage: () => filter_default,
  FiltersPage: () => filters_default,
  FolderPage: () => folder_default,
  FoldersPage: () => folders_default,
  ProfilePage: () => profile_default,
  ProfilesPage: () => profiles_default
});
module.exports = __toCommonJS(src_exports);

// src/account/index.tsx
var import_react55 = __toESM(require("react"), 1);
var import_react_device_detect2 = require("react-device-detect");

// src/images/icons/PhoneIcon.svg
var PhoneIcon_default = "./PhoneIcon-MJHFFITM.svg";

// src/images/icons/PeopleIcon.svg
var PeopleIcon_default = "./PeopleIcon-K7ASISCP.svg";

// src/images/icons/ClockIcon.svg
var ClockIcon_default = "./ClockIcon-DSLNP6CH.svg";

// src/account/contents/common.tsx
var import_system48 = require("@mui/system");
var import_react52 = require("react");

// src/ui/ursor-button.tsx
var import_system2 = require("@mui/system");
var import_react2 = __toESM(require("react"), 1);

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
var import_react = __toESM(require("react"), 1);
var import_system = require("@mui/system");
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
  return /* @__PURE__ */ import_react.default.createElement(
    import_system.Box,
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
    props.htmlTag ? /* @__PURE__ */ import_react.default.createElement(
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
var spin = import_system2.keyframes`
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
  const [hovering, setHovering] = (0, import_react2.useState)(false);
  const [pressed, setPressed] = (0, import_react2.useState)(false);
  const [state, setState] = (0, import_react2.useState)("enabled");
  (0, import_react2.useEffect)(() => {
    if (pressed) {
      setState("pressed");
    } else if (hovering) {
      setState("hover");
    } else {
      setState("enabled");
    }
  }, [hovering, pressed]);
  return /* @__PURE__ */ import_react2.default.createElement(
    import_system2.Stack,
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
    props.startIcon ? /* @__PURE__ */ import_react2.default.createElement(
      props.startIcon,
      {
        height: props.iconSize || ICON_SIZES[props.size || "medium"],
        width: props.iconSize || ICON_SIZES[props.size || "medium"]
      }
    ) : null,
    /* @__PURE__ */ import_react2.default.createElement(
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
    props.endIcon ? /* @__PURE__ */ import_react2.default.createElement(
      props.endIcon,
      {
        height: props.iconSize || ICON_SIZES[props.size || "medium"],
        width: props.iconSize || ICON_SIZES[props.size || "medium"]
      }
    ) : null
  );
}

// src/ui/ursor-input-field.tsx
var import_material = require("@mui/material");
var import_react3 = require("react");
var HEIGHT = "40px";
var BORDER_RADIUS = "8px";
var BOLD_FONT_WEIGHT2 = 450;
function UrsorInputField(props) {
  const [hovering, setHovering] = (0, import_react3.useState)(false);
  const [active, setActive] = (0, import_react3.useState)(false);
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
    import_material.Input,
    {
      autoFocus: props.autoFocus,
      endAdornment: props.endIcon ? /* @__PURE__ */ React.createElement(import_material.InputAdornment, { position: "end", sx: { pr: "11px" } }, props.endIcon) : null,
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
var import_react4 = require("react");
var import_material2 = require("@mui/material");
var import_system3 = require("@mui/system");

// src/ui/dynamic-container.tsx
var import_react6 = __toESM(require("react"), 1);
var import_system4 = require("@mui/system");

// src/ui/use-resize-observer.tsx
var import_react5 = require("react");
function useResizeObserver(ref) {
  const [element, setElement] = (0, import_react5.useState)(null);
  const [rect, setRect] = (0, import_react5.useState)(void 0);
  const observer = (0, import_react5.useRef)(void 0);
  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };
  (0, import_react5.useEffect)(() => {
    setElement(ref.current);
  }, [ref]);
  (0, import_react5.useEffect)(() => {
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
  const content = (0, import_react6.useRef)(null);
  const rect = useResizeObserver(content);
  return /* @__PURE__ */ import_react6.default.createElement(
    import_system4.Box,
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
    /* @__PURE__ */ import_react6.default.createElement(
      import_system4.Box,
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
var import_lodash11 = __toESM(require("lodash"), 1);

// src/components/UrsorDialog.tsx
var import_react12 = __toESM(require("react"), 1);
var import_material4 = require("@mui/material");

// src/images/icons/X.svg
var X_default = "./X-RF7X26JX.svg";

// src/images/icons/ChevronLeftIcon.svg
var ChevronLeftIcon_default = "./ChevronLeftIcon-5PUKKS6Q.svg";

// src/components/UrsorDialog.tsx
var import_lodash = __toESM(require("lodash"), 1);
var import_usehooks_ts2 = require("usehooks-ts");

// src/components/InfoButton.tsx
var import_react8 = __toESM(require("react"), 1);
var import_system6 = require("@mui/system");
var import_react9 = require("react");

// src/images/icons/InfoIcon.svg
var InfoIcon_default = "./InfoIcon-EPTUCAUL.svg";

// src/components/UrsorPopover.tsx
var import_react7 = __toESM(require("react"), 1);
var import_system5 = require("@mui/system");
var import_material3 = require("@mui/material");
var import_react_dom = require("react-dom");
var import_react_popper = require("react-popper");
var import_usehooks_ts = require("usehooks-ts");
var fadeIn = import_system5.keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
var fadeOut = import_system5.keyframes`
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
  const [width, setWidth] = (0, import_react7.useState)(void 0);
  const [yOffset, setYOffset] = (0, import_react7.useState)(void 0);
  const [maxWidth, setMaxWidth] = (0, import_react7.useState)(void 0);
  const [maxHeight, setMaxHeight] = (0, import_react7.useState)(void 0);
  const [referenceElement, setReferenceElement] = import_react7.default.useState(null);
  const [popperElement, setPopperElement] = import_react7.default.useState(null);
  const { styles, attributes } = (0, import_react_popper.usePopper)(referenceElement, popperElement, {
    placement: props.placement === "left" || props.buttonWidth ? `${props.top ? "top" : "bottom"}-start` : props.placement === "right" ? `${props.top ? "top" : "bottom"}-end` : `${props.top ? "top" : "bottom"}`,
    modifiers: [{ name: "flip", enabled: props.flip }]
  });
  const [buttonRef, setButtonRef] = (0, import_react7.useState)(null);
  const [isFlipped, setIsFlipped] = (0, import_react7.useState)(false);
  (0, import_react7.useEffect)(
    () => {
      var _a;
      return setIsFlipped(
        !!((_a = attributes.popper) == null ? void 0 : _a["data-popper-placement"].includes("top"))
      );
    },
    [attributes.popper]
  );
  (0, import_react7.useEffect)(() => {
    buttonRef == null ? void 0 : buttonRef.focus();
  }, [buttonRef]);
  const { width: windowWidth, height } = (0, import_usehooks_ts.useWindowSize)();
  (0, import_react7.useEffect)(() => {
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
  return /* @__PURE__ */ import_react7.default.createElement(import_react7.default.Fragment, null, /* @__PURE__ */ import_react7.default.createElement(
    import_system5.Stack,
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
  ), props.open ? (0, import_react_dom.createPortal)(
    /* @__PURE__ */ import_react7.default.createElement(import_react7.default.Fragment, null, !props.noBackdrop ? /* @__PURE__ */ import_react7.default.createElement(
      import_material3.Backdrop,
      {
        sx: {
          background: "transparent",
          //backdropFilter: "blur(3px)",
          zIndex: props.zIndex || 2
        },
        open: props.open,
        onClick: props.closeCallback
      }
    ) : null, /* @__PURE__ */ import_react7.default.createElement(
      import_system5.Box,
      {
        ref: setPopperElement,
        style: styles.popper,
        ...attributes.popper,
        zIndex: props.zIndex || 3
      },
      /* @__PURE__ */ import_react7.default.createElement(
        import_system5.Stack,
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
        props.content ? /* @__PURE__ */ import_react7.default.createElement(
          import_system5.Box,
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
  const [open, setOpen] = (0, import_react9.useState)(false);
  return /* @__PURE__ */ import_react8.default.createElement(
    UrsorPopover,
    {
      open,
      content: /* @__PURE__ */ import_react8.default.createElement(
        import_system6.Stack,
        {
          bgcolor: "rgb(255,255,255)",
          borderRadius: "12px",
          p: "16px",
          boxSizing: "border-box",
          spacing: "6px",
          maxWidth: "333px"
        },
        /* @__PURE__ */ import_react8.default.createElement(Typography, { variant: "small" }, props.text)
      ),
      closeCallback: () => setOpen(false),
      placement: props.rightAlign ? "right" : "left",
      noPadding: true,
      zIndex: 9999
    },
    /* @__PURE__ */ import_react8.default.createElement(
      import_system6.Stack,
      {
        onClick: () => setOpen(true),
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s"
        }
      },
      /* @__PURE__ */ import_react8.default.createElement(
        import_system6.Stack,
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
        /* @__PURE__ */ import_react8.default.createElement(
          Typography,
          {
            variant: "small",
            bold: true,
            color: PALETTE.secondary.grey[3],
            maxLines: 1
          },
          props.title
        ),
        /* @__PURE__ */ import_react8.default.createElement(InfoIcon_default, { width: "14px", height: "14px" })
      )
    )
  );
};
var InfoButton_default = InfoButton;

// src/components/ByteStepper.tsx
var import_react11 = __toESM(require("react"), 1);
var import_system8 = require("@mui/system");

// src/components/Byte.tsx
var import_react10 = __toESM(require("react"), 1);
var import_lottie_react = require("lottie-react");

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
var import_system7 = require("@mui/system");
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
  const { View } = (0, import_lottie_react.useLottie)(options, { height: HEIGHT2 });
  return View;
}
function Byte(props) {
  const [animation, setAnimation] = (0, import_react10.useState)(null);
  (0, import_react10.useEffect)(() => {
    (animation || !noTransitionFromNull.includes(props.animation)) && setTimeout(() => setAnimation(props.animation), props.delay ?? 0);
  }, [props.animation]);
  const noTransitionFromNull = ["disappear"];
  const callbacks = {
    appear: () => null,
    disappear: () => setAnimation(null),
    celebration: () => null
  };
  return /* @__PURE__ */ import_react10.default.createElement(
    import_system7.Box,
    {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: HEIGHT2
    },
    animation ? /* @__PURE__ */ import_react10.default.createElement(
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
var pulse = import_system8.keyframes`
  from {
    transform: translateY(-${PULSE_AMPLITUDE})
  }
  to {
    transform: translateY(${PULSE_AMPLITUDE})
  }
`;
function ByteStepper(props) {
  const getCircle = (disappear) => {
    return /* @__PURE__ */ import_react11.default.createElement(
      import_system8.Box,
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
  const getByte = (animation, delay) => /* @__PURE__ */ import_react11.default.createElement(
    import_system8.Stack,
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
    /* @__PURE__ */ import_react11.default.createElement(
      import_system8.Box,
      {
        sx: {
          animation: `${pulse} ${PULSE_PERIOD} ease-in-out`,
          animationDirection: "alternate",
          animationIterationCount: "infinite"
        }
      },
      /* @__PURE__ */ import_react11.default.createElement(Byte, { animation, delay })
    )
  );
  return /* @__PURE__ */ import_react11.default.createElement(
    import_system8.Box,
    {
      position: "relative",
      width: "fit-content",
      height: CIRCLE_SIZE,
      overflow: "visible",
      sx: { background: PALETTE.secondary.grey[1] },
      borderRadius: ROUNDING
    },
    /* @__PURE__ */ import_react11.default.createElement(import_system8.Box, { width: "100%", height: "100%", position: "absolute" }, /* @__PURE__ */ import_react11.default.createElement(
      import_system8.Box,
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
    /* @__PURE__ */ import_react11.default.createElement(import_system8.Stack, { direction: "row", spacing: SPACING, overflow: "visible" }, [...Array(props.nSteps).keys()].map((n) => {
      return /* @__PURE__ */ import_react11.default.createElement(import_system8.Stack, { key: n, overflow: "visible", alignItems: "center" }, /* @__PURE__ */ import_react11.default.createElement(
        import_system8.Box,
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
var fadeIn2 = import_material4.keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
var fadeOut2 = import_material4.keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;
function UrsorDialog(props) {
  var _a, _b;
  const [bodyFadeout, setBodyFadeout] = (0, import_react12.useState)(false);
  const [canFade, setCanFade] = (0, import_react12.useState)(false);
  (0, import_react12.useEffect)(() => {
    if (canFade && import_lodash.default.isNumber(props.step)) {
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
  const PrimaryButtonEndIcon = import_react12.default.isValidElement(props.button) ? void 0 : (_a = props.button) == null ? void 0 : _a.icon;
  const SecondaryButtonEndIcon = import_react12.default.isValidElement(props.secondaryButton) ? void 0 : (_b = props.secondaryButton) == null ? void 0 : _b.icon;
  const { width: windowWidth } = (0, import_usehooks_ts2.useWindowSize)();
  return /* @__PURE__ */ import_react12.default.createElement(
    import_material4.Dialog,
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
    /* @__PURE__ */ import_react12.default.createElement(
      import_material4.Stack,
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
      props.backButtonCallback ? /* @__PURE__ */ import_react12.default.createElement(
        import_material4.Box,
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
        /* @__PURE__ */ import_react12.default.createElement(ChevronLeftIcon_default, { height: "27px" })
      ) : null,
      import_lodash.default.isNumber(props.step) && props.nSteps ? /* @__PURE__ */ import_react12.default.createElement(
        import_material4.Stack,
        {
          width: "100%",
          alignItems: "center",
          position: "relative",
          marginBottom: STEPPER_TITLE_SEPARATION,
          sx: {
            transform: "translateY(1px)"
          }
        },
        /* @__PURE__ */ import_react12.default.createElement(ByteStepper, { nSteps: props.nSteps, step: props.step })
      ) : null,
      props.onCloseCallback && !props.noCloseButton ? /* @__PURE__ */ import_react12.default.createElement(
        import_material4.Box,
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
        /* @__PURE__ */ import_react12.default.createElement(X_default, { height: props.isMobile ? "26px" : "27px" })
      ) : null,
      /* @__PURE__ */ import_react12.default.createElement(
        import_material4.Stack,
        {
          flex: 1,
          spacing: props.isMobile ? "24px" : props.bunchedUpContent ? "12px" : "25px",
          justifyContent: props.bunchedUpContent ? void 0 : "s pace-between",
          alignItems: "center",
          sx: import_lodash.default.isNumber(props.step) ? animation : null,
          overflow: "hidden"
        },
        props.subtitle || props.title || props.supertitle ? /* @__PURE__ */ import_react12.default.createElement(
          import_material4.Stack,
          {
            spacing: props.isMobile ? "0px" : "12px",
            width: "100%",
            alignItems: "center",
            textAlign: "center",
            boxSizing: "border-box"
          },
          props.supertitle ? /* @__PURE__ */ import_react12.default.createElement(import_material4.Stack, { direction: "row", width: "100%" }, props.supertitle ? /* @__PURE__ */ import_react12.default.createElement(import_material4.Stack, { width: "100%", alignItems: "center" }, /* @__PURE__ */ import_react12.default.createElement(
            Typography,
            {
              variant: props.title ? "medium" : "large",
              bold: true,
              color: PALETTE.font.dark
            },
            props.supertitle
          )) : null) : null,
          props.title ? /* @__PURE__ */ import_react12.default.createElement(import_material4.Stack, { maxWidth: props.titleMaxWidth, spacing: "3px" }, /* @__PURE__ */ import_react12.default.createElement(
            Typography,
            {
              variant: props.isMobile ? "h5" : props.titleSize || "h4",
              bold: true,
              color: PALETTE.secondary.purple[2],
              sx: { maxWidth: props.titleMaxWidth }
            },
            props.title
          ), props.info ? /* @__PURE__ */ import_react12.default.createElement(InfoButton_default, { ...props.info }) : null) : null,
          props.subtitle ? /* @__PURE__ */ import_react12.default.createElement(import_material4.Stack, { alignItems: "center", pt: "6px" }, windowWidth < 750 ? /* @__PURE__ */ import_react12.default.createElement(
            Typography,
            {
              variant: props.isMobile ? "normal" : "medium",
              sx: { textAlign: "center" }
            },
            props.subtitle.join(" ")
          ) : props.subtitle.map((sentence, index) => /* @__PURE__ */ import_react12.default.createElement(
            Typography,
            {
              key: index,
              variant: "medium",
              sx: { textAlign: "center" }
            },
            sentence
          ))) : null
        ) : null,
        /* @__PURE__ */ import_react12.default.createElement(
          import_material4.Stack,
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
        props.button || props.secondaryButton ? /* @__PURE__ */ import_react12.default.createElement(import_material4.Stack, { spacing: "8px", width: "300px", maxWidth: "100%" }, !!props.button ? import_react12.default.isValidElement(props.button) ? props.button : /* @__PURE__ */ import_react12.default.createElement(
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
        ) : null, props.button || props.secondaryButton || props.googleButton || !props.noCloseButton ? /* @__PURE__ */ import_react12.default.createElement(import_material4.Stack, { spacing: "12px", width: "100%", alignItems: "center" }, !!props.secondaryButton ? import_react12.default.isValidElement(props.secondaryButton) ? props.secondaryButton : /* @__PURE__ */ import_react12.default.createElement(
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
var import_system10 = require("@mui/system");
var import_react13 = require("react");

// src/ui/labeled-input-field.tsx
var import_system9 = require("@mui/system");
function LabeledInputField(props) {
  return /* @__PURE__ */ React.createElement(import_system9.Stack, { spacing: "6px" }, props.label ? /* @__PURE__ */ React.createElement(Typography, { variant: "small", color: PALETTE.secondary.grey[4] }, props.label) : null, props.children);
}

// src/account/components/EditProfileDialog.tsx
var EditProfileDialog = (props) => {
  const [nickname, setNickname] = (0, import_react13.useState)("");
  const [name, setName] = (0, import_react13.useState)("");
  (0, import_react13.useEffect)(() => {
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
    /* @__PURE__ */ React.createElement(import_system10.Stack, { spacing: "40px", alignItems: "center", width: "100%" }, /* @__PURE__ */ React.createElement(
      import_system10.Stack,
      {
        direction: props.isMobile ? "column" : "row",
        spacing: "24px",
        alignItems: props.isMobile ? "center" : "flex-end",
        width: "100%"
      },
      /* @__PURE__ */ React.createElement(UserInitialsCircle, { name: name ?? "" }),
      /* @__PURE__ */ React.createElement(
        import_system10.Stack,
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
var import_system11 = require("@mui/system");
var import_react14 = require("react");
var InviteDialog = (props) => {
  const [email, setEmail] = (0, import_react14.useState)();
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
    /* @__PURE__ */ React.createElement(import_system11.Stack, { justifyContent: "space-between", height: "100%", width: "100%" }, /* @__PURE__ */ React.createElement(LabeledInputField, { label: "Email" }, /* @__PURE__ */ React.createElement(
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
var import_system14 = require("@mui/system");

// src/profiles/components/DeviceInstructionsView.tsx
var import_system13 = require("@mui/system");

// src/images/icons/ChevronRight.svg
var ChevronRight_default = "./ChevronRight-FOB27Q5H.svg";

// src/images/icons/DownloadIcon.svg
var DownloadIcon_default = "./DownloadIcon-4VSQMRI6.svg";

// src/profiles/components/DownloadDialog.tsx
var import_system12 = require("@mui/system");
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
  import_system12.Stack,
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
    import_system12.Stack,
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
    import_system12.Stack,
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
var import_react15 = require("react");
var PULSE_AMPLITUDE2 = "12px";
var pulse2 = import_system13.keyframes`
  from {
    transform: translateY(-${PULSE_AMPLITUDE2})
  }
  to {
    transform: translateY(${PULSE_AMPLITUDE2})
  }
`;
var FloatingIntroCards = (props) => /* @__PURE__ */ React.createElement(import_system13.Stack, { position: "relative", width: "100%" }, props.fadedEdges ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
  import_system13.Stack,
  {
    position: "absolute",
    right: 0,
    top: 0,
    width: "230px",
    height: "100%",
    sx: {
      background: `linear-gradient(-90deg, ${PALETTE.secondary.grey[1]}, ${(0, import_system13.alpha)(PALETTE.secondary.grey[1], 0)})`
    },
    zIndex: 2
  }
), /* @__PURE__ */ React.createElement(
  import_system13.Stack,
  {
    position: "absolute",
    left: 0,
    top: 0,
    width: "230px",
    height: "100%",
    sx: {
      background: `linear-gradient(90deg, ${PALETTE.secondary.grey[1]}, ${(0, import_system13.alpha)(PALETTE.secondary.grey[1], 0)})`
    },
    zIndex: 2
  }
)) : null, /* @__PURE__ */ React.createElement(import_system13.Stack, { left: 0, position: "absolute", width: "100%" }, /* @__PURE__ */ React.createElement(import_system13.Stack, { position: "relative", width: "100%", height: "100px" }, /* @__PURE__ */ React.createElement(
  "img",
  {
    src: "https://ursorassets.s3.eu-west-1.amazonaws.com/Vector+86.png",
    fill: true,
    alt: "wave"
  }
))), /* @__PURE__ */ React.createElement(
  import_system13.Stack,
  {
    direction: "row",
    width: "100%",
    spacing: props.spacing,
    justifyContent: "center"
  },
  /* @__PURE__ */ React.createElement(
    import_system13.Stack,
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
    import_system13.Stack,
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
    import_system13.Stack,
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
var MobileIntroCards = (props) => /* @__PURE__ */ React.createElement(import_system13.Stack, { position: "relative", spacing: "16px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
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
  import_system13.Stack,
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
  /* @__PURE__ */ React.createElement(import_system13.Stack, { width: "90%" }, /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "medium",
      bold: true,
      sx: { textAlign: "center", lineHeight: "25px" }
    },
    props.text
  )),
  props.children ? /* @__PURE__ */ React.createElement(import_system13.Stack, { pt: "6px" }, props.children) : null
);
var DeviceInstructionsView = () => {
  const [downloadDialogOpen, setDownloadDialogOpen] = (0, import_react15.useState)(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    import_system13.Stack,
    {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      position: "relative"
    },
    /* @__PURE__ */ React.createElement(
      import_system13.Stack,
      {
        spacing: "8px",
        alignItems: "center",
        sx: {
          transform: "translateY(-160px)"
        }
      },
      /* @__PURE__ */ React.createElement(
        import_system13.Stack,
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
      /* @__PURE__ */ React.createElement(import_system13.Stack, { width: "444px" }, /* @__PURE__ */ React.createElement(
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
    /* @__PURE__ */ React.createElement(import_system14.Stack, { justifyContent: "center", width: "100%", height: "100%" }, props.isMobile ? /* @__PURE__ */ React.createElement(MobileIntroCards, { onOpen: props.onOpen, greyCards: true }) : /* @__PURE__ */ React.createElement(FloatingIntroCards, { onOpen: props.onOpen, spacing: "36px", greyCards: true }))
  );
};
var DeviceConnectDialog_default = DeviceConnectDialog;

// src/images/icons/VerifiedIcon.svg
var VerifiedIcon_default = "./VerifiedIcon-IL7PWZHH.svg";

// src/images/icons/CheckIcon.svg
var CheckIcon_default = "./CheckIcon-FFIJMWGG.svg";

// src/components/UpgradeDialog.tsx
var import_system28 = require("@mui/system");

// src/components/UserContext.tsx
var import_react32 = __toESM(require("react"), 1);
var import_usehooks_ts3 = require("usehooks-ts");

// src/profile/components/MobileInsightsTab.tsx
var import_system26 = require("@mui/system");

// src/images/icons/ChevronLeft.svg
var ChevronLeft_default = "./ChevronLeft-FSXTSQCC.svg";

// src/filter/components/AstroBentoCard.tsx
var import_system15 = require("@mui/system");

// src/images/icons/ChevronDown.svg
var ChevronDown_default = "./ChevronDown-QWYZG6AQ.svg";

// src/filter/components/AstroBentoCard.tsx
var import_react19 = require("react");

// src/components/DynamicContainer.tsx
var import_react17 = __toESM(require("react"), 1);
var import_react18 = require("react");

// src/components/useResizeObserver.tsx
var import_react16 = require("react");
function useResizeObserver2(ref) {
  const [element, setElement] = (0, import_react16.useState)(null);
  const [rect, setRect] = (0, import_react16.useState)(void 0);
  const observer = (0, import_react16.useRef)(void 0);
  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };
  (0, import_react16.useEffect)(() => {
    setElement(ref.current);
  }, [ref]);
  (0, import_react16.useEffect)(() => {
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
  const content = (0, import_react18.useRef)(null);
  const rect = useResizeObserver2(content);
  return /* @__PURE__ */ import_react17.default.createElement(
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
    /* @__PURE__ */ import_react17.default.createElement(
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
  const [collapsed, setCollapsed] = (0, import_react19.useState)(false);
  return /* @__PURE__ */ React.createElement(
    import_system15.Stack,
    {
      bgcolor: "rgb(255,255,255)",
      borderRadius: "12px",
      spacing: "20px",
      p: "16px",
      paddingBottom: props.paddingBottom,
      flex: 1,
      border: `1px solid ${PALETTE.secondary.grey[2]}`
    },
    /* @__PURE__ */ React.createElement(import_system15.Stack, null, /* @__PURE__ */ React.createElement(import_system15.Stack, { justifyContent: "space-between", direction: "row" }, /* @__PURE__ */ React.createElement(import_system15.Stack, { spacing: props.isMobile ? "6px" : void 0 }, /* @__PURE__ */ React.createElement(import_system15.Stack, null, /* @__PURE__ */ React.createElement(
      import_system15.Stack,
      {
        direction: "row",
        sx: props.iconColor ? { svg: { path: { fill: props.iconColor } } } : void 0,
        alignItems: "center",
        spacing: "6px"
      },
      props.icon ? /* @__PURE__ */ React.createElement(props.icon, { height: "20px", width: "20px" }) : null,
      /* @__PURE__ */ React.createElement(Typography, { variant: props.isMobile ? "normal" : "large", bold: true }, props.title),
      props.info && !props.isMobile && !props.infoButtonBelowTitle ? /* @__PURE__ */ React.createElement(
        import_system15.Stack,
        {
          pl: "12px",
          height: "100%",
          justifyContent: "flex-end",
          sx: { transform: "translateY(-2px)" }
        },
        /* @__PURE__ */ React.createElement(InfoButton_default, { small: true, ...props.info })
      ) : null
    ), props.info && (props.isMobile || props.infoButtonBelowTitle) ? /* @__PURE__ */ React.createElement(InfoButton_default, { small: true, ...props.info }) : null), props.subtitle ? /* @__PURE__ */ React.createElement(Typography, { color: PALETTE.secondary.grey[4], variant: "small" }, props.subtitle) : null), /* @__PURE__ */ React.createElement(import_system15.Stack, { direction: "row", spacing: "24px", height: "fit-content" }, props.topRightStuff, !props.notCollapsible ? /* @__PURE__ */ React.createElement(
      import_system15.Stack,
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
    !props.notCollapsible ? /* @__PURE__ */ React.createElement(DynamicContainer2, { duration: 800, fullWidth: true }, collapsed ? null : props.children) : /* @__PURE__ */ React.createElement(import_system15.Stack, { flex: 1 }, props.children)
  );
};

// src/profile/components/MobileInsightsTab.tsx
var import_lodash7 = __toESM(require("lodash"), 1);

// src/profile/components/AstroTimeChart.tsx
var import_system16 = require("@mui/system");
var import_dayjs = __toESM(require("dayjs"), 1);
var import_lodash2 = __toESM(require("lodash"), 1);
var import_react20 = require("react");
var yInterval = 1;
var AstroTimeChart = (props) => {
  const [maxTime, setMaxTime] = (0, import_react20.useState)(0);
  (0, import_react20.useEffect)(
    () => {
      var _a;
      return setMaxTime(
        import_lodash2.default.max(props.times.map((t) => t.screenTime)) ?? ((_a = props.times[0]) == null ? void 0 : _a.screenTime)
      );
    },
    [props.times]
  );
  const [nHorizontalLines, setNHorizontalLines] = (0, import_react20.useState)(1);
  (0, import_react20.useEffect)(() => {
    const nIntervals = Math.ceil(maxTime / (60 * yInterval));
    setNHorizontalLines(nIntervals === 1 ? 1 : nIntervals + 1);
  }, [maxTime]);
  return /* @__PURE__ */ React.createElement(
    import_system16.Stack,
    {
      flex: 1,
      px: props.barsXPadding ? `${props.barsXPadding}px` : "24px",
      position: "relative",
      mr: "56px !important"
    },
    /* @__PURE__ */ React.createElement(import_system16.Stack, { top: 0, left: 0, width: "100%", height: "100%", position: "absolute" }, /* @__PURE__ */ React.createElement(import_system16.Stack, { flex: 1, justifyContent: "space-between", pb: "28px" }, import_lodash2.default.reverse([...Array(nHorizontalLines + 1).keys()]).map((i) => /* @__PURE__ */ React.createElement(
      import_system16.Stack,
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
        import_system16.Stack,
        {
          width: "30px",
          right: "-42px",
          position: "absolute",
          sx: { transform: "translateY(-50%)" }
        },
        /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[3] }, `${i * yInterval}h`)
      )
    )))),
    /* @__PURE__ */ React.createElement(import_system16.Stack, { direction: "row", flex: 1, justifyContent: "space-between", zIndex: 2 }, props.times.map((dayTime, i) => /* @__PURE__ */ React.createElement(
      import_system16.Stack,
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
        import_system16.Stack,
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
          import_system16.Stack,
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
            import_system16.Stack,
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
      /* @__PURE__ */ React.createElement(import_system16.Stack, null, /* @__PURE__ */ React.createElement(
        Typography,
        {
          bold: true,
          color: props.selected === dayTime.date ? void 0 : PALETTE.secondary.grey[3],
          variant: props.labelFontSize ?? "normal"
        },
        (0, import_dayjs.default)(dayTime.date).format(
          (0, import_dayjs.default)().utc().diff(dayTime.date, "days") < 7 ? "ddd" : "MM/DD"
        )
      ), /* @__PURE__ */ React.createElement(
        import_system16.Stack,
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
var import_react31 = require("react");
var import_dayjs5 = __toESM(require("dayjs"), 1);
var import_advancedFormat = __toESM(require("dayjs/plugin/advancedFormat"), 1);

// src/components/CalendarButton.tsx
var import_system18 = require("@mui/system");
var import_react22 = require("react");

// src/components/UrsorCalendar.tsx
var import_react21 = __toESM(require("react"), 1);
var import_system17 = require("@mui/system");
var import_react_calendar = __toESM(require("react-calendar"), 1);
var import_dayjs2 = __toESM(require("dayjs"), 1);
function UrsorCalendar(props) {
  const [viewMonthStartDate, setViewMonthStartDate] = (0, import_react21.useState)(
    (0, import_dayjs2.default)().isAfter(props.value) ? /* @__PURE__ */ new Date() : new Date(props.value.getFullYear(), props.value.getMonth(), 1)
  );
  const showingCurrentMonth = (viewMonthStartDate == null ? void 0 : viewMonthStartDate.getMonth()) === (/* @__PURE__ */ new Date()).getMonth() && (viewMonthStartDate == null ? void 0 : viewMonthStartDate.getFullYear()) === (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ import_react21.default.createElement(
    import_system17.Box,
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
    /* @__PURE__ */ import_react21.default.createElement(DynamicContainer2, { duration: 800 }, /* @__PURE__ */ import_react21.default.createElement(
      import_react_calendar.default,
      {
        onChange: props.onChange,
        onActiveStartDateChange: (x) => setViewMonthStartDate(x.activeStartDate),
        value: props.value,
        prevLabel: /* @__PURE__ */ import_react21.default.createElement(ChevronLeftIcon_default, { height: "20px", width: "20px" }),
        nextLabel: /* @__PURE__ */ import_react21.default.createElement(
          ChevronLeftIcon_default,
          {
            height: "20px",
            width: "20px",
            style: { transform: "rotate(180deg)" }
          }
        ),
        prev2Label: null,
        next2Label: null,
        tileClassName: (tileProps) => props.hidePast && (0, import_dayjs2.default)().diff(tileProps.date, "days") >= 1 ? "hidePast" : props.disableFuture && (0, import_dayjs2.default)(tileProps.date).isAfter((0, import_dayjs2.default)(), "days") ? "hidePast" : "",
        maxDate: /* @__PURE__ */ new Date(),
        minDetail: "month"
      }
    ))
  );
}

// src/components/CalendarButton.tsx
var CalendarButton = (props) => {
  const [open, setOpen] = (0, import_react22.useState)(false);
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
      import_system18.Stack,
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
var import_system23 = require("@mui/system");
var import_dayjs4 = __toESM(require("dayjs"), 1);
var import_react27 = require("react");

// src/profile/components/HistorySection.tsx
var import_system22 = require("@mui/system");
var import_dayjs3 = __toESM(require("dayjs"), 1);
var import_react26 = require("react");
var import_lodash3 = __toESM(require("lodash"), 1);

// src/components/PageSelector.tsx
var import_react23 = __toESM(require("react"), 1);
var import_system19 = require("@mui/system");
var PageSelector = (props) => {
  return /* @__PURE__ */ import_react23.default.createElement(
    import_system19.Stack,
    {
      direction: "row",
      spacing: "4px",
      alignItems: "center",
      justifyContent: "center"
    },
    [
      /* @__PURE__ */ import_react23.default.createElement(
        import_system19.Stack,
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
        /* @__PURE__ */ import_react23.default.createElement(ChevronLeft_default, { height: "15px", width: "15px" })
      ),
      ...[...Array(props.nPages).keys()].map((i) => /* @__PURE__ */ import_react23.default.createElement(
        import_system19.Stack,
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
        /* @__PURE__ */ import_react23.default.createElement(
          Typography,
          {
            bold: true,
            sx: { fontSize: 14 },
            color: i === props.pageIndex ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[3]
          },
          i + 1
        )
      )),
      /* @__PURE__ */ import_react23.default.createElement(
        import_system19.Stack,
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
        /* @__PURE__ */ import_react23.default.createElement(ChevronRight_default, { height: "15px", width: "15px" })
      )
    ]
  );
};
var PageSelector_default = PageSelector;

// src/components/SearchInput.tsx
var import_system20 = require("@mui/system");
var import_react24 = require("react");

// src/images/icons/SearchIcon.svg
var SearchIcon_default = "./SearchIcon-YIM5YRGE.svg";

// src/components/SearchInput.tsx
var import_material5 = require("@mui/material");
var SearchInput = (props) => {
  const [active, setActive] = (0, import_react24.useState)(false);
  const [hovering, setHovering] = (0, import_react24.useState)(false);
  return /* @__PURE__ */ React.createElement(
    import_system20.Stack,
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
      import_material5.Input,
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
      import_system20.Stack,
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
var import_react25 = __toESM(require("react"), 1);
var import_react_fade_in = __toESM(require("react-fade-in"), 1);
var import_system21 = require("@mui/system");
var FULL_SIZE_CLASSNAME = "fullSize";
function UrsorFadeIn(props) {
  return /* @__PURE__ */ import_react25.default.createElement(
    import_system21.Stack,
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
    /* @__PURE__ */ import_react25.default.createElement(
      import_react_fade_in.default,
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
  const [duration, setDuration] = (0, import_react26.useState)(0);
  (0, import_react26.useEffect)(() => {
    setDuration(
      props.duration || (0, import_dayjs3.default)(props.finishedAt).diff(props.searchedAt, "seconds")
    );
  }, [props.duration, props.searchedAt, props.finishedAt]);
  return /* @__PURE__ */ React.createElement(import_system22.Stack, { direction: "row", spacing: "40px", alignItems: "center" }, /* @__PURE__ */ React.createElement(import_system22.Stack, { width: "94px" }, /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[4] }, (0, import_dayjs3.default)(props.searchedAt).format("hh:mm:HHa"))), /* @__PURE__ */ React.createElement(import_system22.Stack, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    import_system22.Stack,
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
      import_system22.Stack,
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
    import_system22.Stack,
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
  const [expanded, setExpanded] = (0, import_react26.useState)(false);
  return /* @__PURE__ */ React.createElement(DynamicContainer2, { duration: 650, fullWidth: true }, /* @__PURE__ */ React.createElement(import_system22.Stack, { spacing: "12px" }, /* @__PURE__ */ React.createElement(
    import_system22.Stack,
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
        duration: import_lodash3.default.sum(
          props.rows.map(
            (r) => (0, import_dayjs3.default)(r.finishedAt).diff(r.searchedAt, "seconds")
          )
        )
      }
    ),
    /* @__PURE__ */ React.createElement(
      import_system22.Stack,
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
    import_system22.Stack,
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
  const [nPages, setNPages] = (0, import_react26.useState)(1);
  const [pageIndex, setPageIndex] = (0, import_react26.useState)(0);
  const [history, setHistory] = (0, import_react26.useState)([]);
  const [searchValue, setSearchValue] = (0, import_react26.useState)("");
  (0, import_react26.useEffect)(() => setPageIndex(0), [searchValue]);
  (0, import_react26.useEffect)(() => {
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
  const [domainGroups, setDomainGroups] = (0, import_react26.useState)([]);
  (0, import_react26.useEffect)(() => {
    const simplisticDomainGroups = import_lodash3.default.reduce(
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
    /* @__PURE__ */ React.createElement(import_system22.Stack, { spacing: "16px" }, domainGroups.map((dg, i) => /* @__PURE__ */ React.createElement(
      UrsorFadeIn,
      {
        key: `${i}${pageIndex}${props.date}`,
        delay: i * 70,
        duration: 600
      },
      /* @__PURE__ */ React.createElement(HistoryDomainRow, { ...dg })
    ))),
    nPages > 1 ? /* @__PURE__ */ React.createElement(import_system22.Stack, { pt: "24px", pb: "9px" }, /* @__PURE__ */ React.createElement(
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
var import_lodash4 = __toESM(require("lodash"), 1);
var MobileHistoryRow = (props) => {
  const [duration, setDuration] = (0, import_react27.useState)(0);
  (0, import_react27.useEffect)(() => {
    setDuration(
      props.duration || (0, import_dayjs4.default)(props.finishedAt).diff(props.searchedAt, "seconds")
    );
  }, [props.duration, props.searchedAt, props.finishedAt]);
  return /* @__PURE__ */ React.createElement(import_system23.Stack, { direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(import_system23.Stack, { direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    import_system23.Stack,
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
  ), /* @__PURE__ */ React.createElement(import_system23.Stack, { justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(import_system23.Stack, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
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
    /* @__PURE__ */ React.createElement(import_system23.Stack, { minWidth: "20%" }, /* @__PURE__ */ React.createElement(
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
  )), /* @__PURE__ */ React.createElement(import_system23.Stack, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Typography, { variant: "tiny", bold: true, color: PALETTE.secondary.grey[4] }, (0, import_dayjs4.default)(props.searchedAt).utc().format("hh:mm a")), /* @__PURE__ */ React.createElement(
    Typography,
    {
      bold: true,
      sx: { lineHeight: "100%" },
      color: PALETTE.secondary.grey[4]
    },
    "-"
  ), duration ? /* @__PURE__ */ React.createElement(
    import_system23.Stack,
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
  const [expanded, setExpanded] = (0, import_react27.useState)(false);
  return /* @__PURE__ */ React.createElement(DynamicContainer2, { duration: 650, fullWidth: true }, /* @__PURE__ */ React.createElement(import_system23.Stack, { spacing: "5px", py: "8px" }, /* @__PURE__ */ React.createElement(
    import_system23.Stack,
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
        duration: import_lodash4.default.sum(
          props.rows.map(
            (r) => (0, import_dayjs4.default)(r.finishedAt).diff(r.searchedAt, "seconds")
          )
        )
      }
    ),
    /* @__PURE__ */ React.createElement(
      import_system23.Stack,
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
    import_system23.Stack,
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
  const [nPages, setNPages] = (0, import_react27.useState)(1);
  const [pageIndex, setPageIndex] = (0, import_react27.useState)(0);
  const [history, setHistory] = (0, import_react27.useState)([]);
  const [searchValue, setSearchValue] = (0, import_react27.useState)("");
  (0, import_react27.useEffect)(() => setPageIndex(0), [searchValue]);
  (0, import_react27.useEffect)(() => {
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
  const [domainGroups, setDomainGroups] = (0, import_react27.useState)([]);
  (0, import_react27.useEffect)(() => {
    const simplisticDomainGroups = import_lodash4.default.reduce(
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
    /* @__PURE__ */ React.createElement(import_system23.Stack, { spacing: "16px" }, domainGroups.map((dg, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: `${i}${pageIndex}`, delay: i * 70, duration: 600 }, /* @__PURE__ */ React.createElement(MobileHistoryDomainRow, { ...dg })))),
    nPages > 1 ? /* @__PURE__ */ React.createElement(import_system23.Stack, { pt: "24px", pb: "9px" }, /* @__PURE__ */ React.createElement(
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
var import_react30 = __toESM(require("react"), 1);
var import_system25 = require("@mui/system");
var import_lodash6 = __toESM(require("lodash"), 1);

// src/profile/components/AllMostVisitedSitesDialog.tsx
var import_react28 = __toESM(require("react"), 1);
var import_system24 = require("@mui/system");
var import_material6 = require("@mui/material");
var import_react29 = require("react");
var import_lodash5 = __toESM(require("lodash"), 1);
var AllMostVisitedSitesDialog = (props) => {
  const [searchValue, setSearchValue] = (0, import_react29.useState)("");
  const [filteredSites, setFilteredSites] = (0, import_react29.useState)([]);
  (0, import_react29.useEffect)(
    () => setFilteredSites(
      props.sites.filter(
        (d) => !searchValue || d.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    [props.sites, searchValue]
  );
  return /* @__PURE__ */ import_react28.default.createElement(
    import_material6.Dialog,
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
    /* @__PURE__ */ import_react28.default.createElement(import_system24.Stack, { spacing: "32px" }, /* @__PURE__ */ import_react28.default.createElement(
      import_system24.Stack,
      {
        direction: props.isMobile ? "column" : "row",
        justifyContent: "space-between",
        spacing: props.isMobile ? "6px" : void 0
      },
      /* @__PURE__ */ import_react28.default.createElement(import_system24.Stack, { direction: "row", justifyContent: "space-between" }, /* @__PURE__ */ import_react28.default.createElement(Typography, { bold: true, variant: props.isMobile ? "large" : "h5" }, "Most visited sites today"), /* @__PURE__ */ import_react28.default.createElement(
        import_system24.Stack,
        {
          width: "40px",
          alignItems: "flex-end",
          pt: "3px",
          onClick: props.onClose
        },
        /* @__PURE__ */ import_react28.default.createElement(X_default, { height: "22px", width: "22px" })
      )),
      /* @__PURE__ */ import_react28.default.createElement(import_system24.Stack, { direction: "row", spacing: "0px", alignItems: "center" }, /* @__PURE__ */ import_react28.default.createElement(
        SearchInput,
        {
          value: searchValue,
          callback: setSearchValue,
          clearCallback: () => setSearchValue(""),
          fullWidth: props.isMobile,
          iconSize: props.isMobile ? "16px" : void 0,
          grey: true
        }
      ), !props.isMobile ? /* @__PURE__ */ import_react28.default.createElement(
        import_system24.Stack,
        {
          width: "40px",
          alignItems: "flex-end",
          pt: "3px",
          onClick: props.onClose
        },
        /* @__PURE__ */ import_react28.default.createElement(X_default, { height: "22px", width: "22px" })
      ) : null)
    ), /* @__PURE__ */ import_react28.default.createElement(import_system24.Stack, null, import_lodash5.default.reverse(filteredSites.slice()).map((site, i) => /* @__PURE__ */ import_react28.default.createElement(
      VisitedSiteRow,
      {
        key: i,
        ...site,
        maxScreenTime: import_lodash5.default.max(props.sites.map((s) => s.screenTime)) ?? 1,
        borderTop: i > 0
      }
    ))))
  );
};
var AllMostVisitedSitesDialog_default = AllMostVisitedSitesDialog;

// src/profile/components/MostVisitedSitesSection.tsx
var VisitedSiteRow = (props) => /* @__PURE__ */ import_react30.default.createElement(
  import_system25.Stack,
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
  /* @__PURE__ */ import_react30.default.createElement(
    "a",
    {
      href: props.url,
      target: "_blank",
      style: {
        textDecoration: "none"
      }
    },
    /* @__PURE__ */ import_react30.default.createElement(import_system25.Stack, { flex: 1, direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ import_react30.default.createElement(
      import_system25.Stack,
      {
        borderRadius: "8px",
        overflow: "hidden",
        minHeight: 42,
        minWidth: 42,
        boxShadow: "0 0 12px rgba(0,0,0,0.1)"
      },
      /* @__PURE__ */ import_react30.default.createElement("img", { src: props.faviconUrl, height: 42, width: 42, alt: "favicon" })
    ), /* @__PURE__ */ import_react30.default.createElement(import_system25.Stack, { spacing: "8px", width: "100%" }, /* @__PURE__ */ import_react30.default.createElement(import_system25.Stack, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ import_react30.default.createElement(
      Typography,
      {
        bold: true,
        maxLines: 1,
        sx: {
          wordBreak: "break-all"
        }
      },
      props.title
    ), /* @__PURE__ */ import_react30.default.createElement(import_system25.Stack, { minWidth: "20%" }, /* @__PURE__ */ import_react30.default.createElement(
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
    ))), /* @__PURE__ */ import_react30.default.createElement(import_system25.Stack, { direction: "row", alignItems: "center", spacing: "12px" }, /* @__PURE__ */ import_react30.default.createElement(
      import_system25.Stack,
      {
        width: `${100 * props.screenTime / props.maxScreenTime}%`,
        height: "8px",
        bgcolor: PALETTE.secondary.purple[1],
        borderRadius: "4px"
      }
    ), /* @__PURE__ */ import_react30.default.createElement(import_system25.Stack, { width: "60px" }, /* @__PURE__ */ import_react30.default.createElement(Typography, { bold: true, variant: "tiny" }, `${Math.floor(
      props.screenTime / 60
    )}h ${Math.floor(props.screenTime % 60)}m`)))))
  )
);
var MostVisitedSitesSection = (props) => {
  const [allMostVisitedSitesDialogOpen, setAllMostVisitedSitesDialogOpen] = (0, import_react30.useState)(false);
  return /* @__PURE__ */ import_react30.default.createElement(import_react30.default.Fragment, null, /* @__PURE__ */ import_react30.default.createElement(
    AstroBentoCard,
    {
      title: "Most visited sites today",
      notCollapsible: true,
      paddingBottom: "0",
      isMobile: props.isMobile,
      topRightStuff: /* @__PURE__ */ import_react30.default.createElement(
        UrsorButton,
        {
          size: "small",
          variant: "secondary",
          onClick: () => setAllMostVisitedSitesDialogOpen(true)
        },
        "View all"
      )
    },
    import_lodash6.default.reverse(props.sites.slice(-3)).map((site, i) => /* @__PURE__ */ import_react30.default.createElement(UrsorFadeIn, { key: site.url, delay: i * 90, duration: 800 }, /* @__PURE__ */ import_react30.default.createElement(
      VisitedSiteRow,
      {
        ...site,
        maxScreenTime: import_lodash6.default.max(props.sites.map((s) => s.screenTime)) ?? 1,
        borderTop: i > 0
      }
    )))
  ), /* @__PURE__ */ import_react30.default.createElement(
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
import_dayjs5.default.extend(import_advancedFormat.default);
var cleanUrl = (url) => url.replace("http://", "").replace("https://", "").replace("www.", "");
var DevicePageMobileInsightsTab = (props) => {
  const [times, setTimes] = (0, import_react31.useState)([]);
  const [selectedDayIndex, setSelectedDayIndex] = (0, import_react31.useState)(0);
  const [rangeEndDayIndex, setRangeEndDayIndex] = (0, import_react31.useState)(0);
  const [rangeStartDayIndex, setRangeStartDayIndex] = (0, import_react31.useState)(6);
  const [visitedSites, setVisitedSites] = (0, import_react31.useState)([]);
  (0, import_react31.useEffect)(() => {
    api_default.getStats(
      props.deviceId,
      (0, import_dayjs5.default)().utc().subtract(rangeStartDayIndex, "days").format("YYYY-MM-DD"),
      (0, import_dayjs5.default)().utc().subtract(rangeEndDayIndex, "days").format("YYYY-MM-DD")
    ).then((stats) => {
      var _a, _b;
      setTimes(stats.screenTime);
      setVisitedSites(
        import_lodash7.default.sortBy(
          ((_b = (_a = stats.visitedWebsites) == null ? void 0 : _a.find(
            (w) => w.date === (0, import_dayjs5.default)().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
          )) == null ? void 0 : _b.websites) || [],
          (t) => t.screenTime
        )
      );
    });
  }, [props.deviceId, rangeStartDayIndex, rangeEndDayIndex, selectedDayIndex]);
  const [timeSpent, setTimeSpent] = (0, import_react31.useState)(0);
  (0, import_react31.useEffect)(
    () => {
      var _a;
      return setTimeSpent(
        ((_a = times.find(
          (t) => t.date === (0, import_dayjs5.default)().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
        )) == null ? void 0 : _a.screenTime) ?? 0
      );
    },
    [times, selectedDayIndex]
  );
  (0, import_react31.useEffect)(() => {
    if (selectedDayIndex < 4) {
      const shiftNDays = selectedDayIndex - 3;
      setRangeStartDayIndex(selectedDayIndex + 3 - shiftNDays);
      setRangeEndDayIndex(Math.max(0, shiftNDays));
    } else {
      setRangeStartDayIndex(selectedDayIndex + 3);
      setRangeEndDayIndex(selectedDayIndex - 3);
    }
  }, [selectedDayIndex, times]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_system26.Stack, { spacing: "12px" }, /* @__PURE__ */ React.createElement(import_system26.Stack, { direction: "row", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(import_system26.Stack, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    import_system26.Stack,
    {
      sx: {
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.6 }
      },
      onClick: () => setSelectedDayIndex(selectedDayIndex + 1)
    },
    /* @__PURE__ */ React.createElement(ChevronLeft_default, { height: "18px", width: "18px" })
  ), /* @__PURE__ */ React.createElement(Typography, { variant: "medium", bold: true }, `${selectedDayIndex === 0 ? "Today" : selectedDayIndex === 1 ? "Yesterday" : `${(0, import_dayjs5.default)().subtract(selectedDayIndex, "days").format("dddd")}`}, ${(0, import_dayjs5.default)().subtract(selectedDayIndex, "days").format("Do MMMM")}`), /* @__PURE__ */ React.createElement(
    import_system26.Stack,
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
      value: (0, import_dayjs5.default)().subtract(selectedDayIndex, "days").toDate(),
      setValue: (date) => setSelectedDayIndex((0, import_dayjs5.default)().diff(date, "days"))
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
      import_system26.Stack,
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
          selected: (0, import_dayjs5.default)().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD"),
          setSelectedDatetime: (datetime) => setSelectedDayIndex((0, import_dayjs5.default)().utc().diff(datetime, "days")),
          labelFontSize: "small",
          barsXPadding: 12,
          barWidth: 22
        }
      ) : null
    )
  ), /* @__PURE__ */ React.createElement(import_system26.Stack, { flex: 1 }, /* @__PURE__ */ React.createElement(MostVisitedSitesSection_default, { sites: visitedSites, isMobile: true })), /* @__PURE__ */ React.createElement(
    MobileHistorySection_default,
    {
      deviceId: props.deviceId,
      date: (0, import_dayjs5.default)().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
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
var UserContext = (0, import_react32.createContext)({ loaded: false });
var useUserContext = () => {
  const context = (0, import_react32.useContext)(UserContext);
  if (context === void 0) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

// src/components/UpgradeDialog.tsx
var import_react_router_dom = require("react-router-dom");
var import_usehooks_ts4 = require("usehooks-ts");
var import_react34 = require("react");

// src/components/AstroSwitch.tsx
var import_system27 = require("@mui/system");
var import_react33 = require("react");
var AstroSwitch = (props) => {
  const [hovering, setHovering] = (0, import_react33.useState)(false);
  return /* @__PURE__ */ React.createElement(
    import_system27.Stack,
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
      import_system27.Stack,
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
var FrequencySwitch = (props) => /* @__PURE__ */ React.createElement(import_system28.Stack, { direction: "row", spacing: "12px", alignItems: "center", height: "26px" }, /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[4] }, "Annual discount"), /* @__PURE__ */ React.createElement(AstroSwitch_default, { on: props.value === "annual", callback: props.callback }));
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
  import_system28.Stack,
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
    import_system28.Stack,
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
  /* @__PURE__ */ React.createElement(import_system28.Stack, { spacing: "2px", alignItems: "center" }, /* @__PURE__ */ React.createElement(import_system28.Stack, { spacing: "20px", justifyContent: "center", alignItems: "center" }, /* @__PURE__ */ React.createElement(import_system28.Stack, { spacing: "4px", alignItems: "center" }, /* @__PURE__ */ React.createElement(import_system28.Stack, { spacing: "4px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
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
  ))), /* @__PURE__ */ React.createElement(import_system28.Stack, { direction: "row", alignItems: "center", spacing: "3px" }, /* @__PURE__ */ React.createElement(
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
    import_system28.Stack,
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
  ), /* @__PURE__ */ React.createElement(import_system28.Stack, { alignItems: "center", width: "100%", pb: "20px" }, /* @__PURE__ */ React.createElement(
    Typography,
    {
      variant: "tiny",
      bold: true,
      color: PALETTE.secondary.grey[props.dark ? 2 : 4]
    },
    props.tinyText
  ))),
  /* @__PURE__ */ React.createElement(
    import_system28.Stack,
    {
      justifyContent: "flex-end",
      sx: props.dark ? {
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s"
      } : void 0,
      onClick: props.callback
    },
    /* @__PURE__ */ React.createElement(import_system28.Stack, { sx: { pointerEvents: props.dark ? "none" : void 0 } }, /* @__PURE__ */ React.createElement(
      UrsorButton,
      {
        dark: true,
        variant: props.dark ? "primary" : "tertiary",
        endIcon: props.icon || (props.noButtonIcon ? void 0 : VerifiedIcon_default)
      },
      props.buttonText
    ))
  ),
  props.items ? /* @__PURE__ */ React.createElement(import_system28.Stack, { spacing: "8px", pt: "18px" }, props.items.map((item, i) => /* @__PURE__ */ React.createElement(import_system28.Stack, { key: i, direction: "row", spacing: "6px" }, /* @__PURE__ */ React.createElement(
    import_system28.Stack,
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
  props.text ? /* @__PURE__ */ React.createElement(import_system28.Stack, { pt: "22px" }, /* @__PURE__ */ React.createElement(
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
  const [upgradedNotificationPending, setUpgradedNotificationPending] = (0, import_usehooks_ts4.useLocalStorage)("upgradedNotificationPending", false);
  const navigate = (0, import_react_router_dom.useNavigate)();
  const [locale, setLocale] = (0, import_react34.useState)("US");
  const getIp = async () => {
    const response = await fetch("https://ipapi.co/json/").then(
      async (response2) => {
        const data = await response2.json();
        data.country_code && setLocale(data.country_code);
      }
    );
  };
  (0, import_react34.useEffect)(() => {
    getIp();
  }, []);
  const [frequency, setFrequency] = (0, import_react34.useState)("annual");
  const [licenseKeyInputValue, setLicenseKeyInputValue] = (0, import_react34.useState)("");
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
    /* @__PURE__ */ React.createElement(import_system28.Stack, { width: "100%", alignItems: "center" }, /* @__PURE__ */ React.createElement(
      FrequencySwitch,
      {
        value: frequency,
        callback: () => setFrequency(frequency === "annual" ? "monthly" : "annual")
      }
    )),
    /* @__PURE__ */ React.createElement(
      import_system28.Stack,
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
        import_system28.Stack,
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
        /* @__PURE__ */ React.createElement(import_system28.Stack, { spacing: "4px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Typography, { color: PALETTE.secondary.grey[4], variant: "h4" }, "License key"), /* @__PURE__ */ React.createElement(Typography, { variant: "small", bold: true, color: PALETTE.secondary.grey[4] }, "Add your AstroSafe license key")),
        /* @__PURE__ */ React.createElement(import_system28.Stack, { alignItems: "center", spacing: "10px" }, /* @__PURE__ */ React.createElement(
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
      import_system28.Stack,
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
var import_react38 = __toESM(require("react"), 1);
var import_material7 = require("@mui/material");
var import_usehooks_ts6 = require("usehooks-ts");

// src/components/UrsorActionButton.tsx
var import_system30 = require("@mui/system");
var import_react36 = __toESM(require("react"), 1);

// src/components/ActionPopup.tsx
var import_react35 = __toESM(require("react"), 1);
var import_system29 = require("@mui/system");
var SPACING2 = "8px";
var ICON_SIZE = "16px";
var PopupList = (props) => /* @__PURE__ */ import_react35.default.createElement(import_system29.Stack, { spacing: SPACING2 }, props.items.map((item, index) => /* @__PURE__ */ import_react35.default.createElement(
  import_system29.Stack,
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
  item.icon ? /* @__PURE__ */ import_react35.default.createElement(item.icon, { height: ICON_SIZE, width: ICON_SIZE }) : null,
  /* @__PURE__ */ import_react35.default.createElement(Typography, { color: item.color, variant: "normal", bold: true }, item.text)
)));
function ActionPopup(props) {
  return /* @__PURE__ */ import_react35.default.createElement(
    UrsorPopover,
    {
      open: props.open,
      content: /* @__PURE__ */ import_react35.default.createElement(PopupList, { items: props.items, closeCallback: props.closeCallback }),
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
  const [open, setOpen] = (0, import_react36.useState)(false);
  return /* @__PURE__ */ import_react36.default.createElement(
    ActionPopup,
    {
      open,
      items: props.actions,
      closeCallback: () => setOpen(false),
      placement: "right",
      zIndex: 9999
    },
    /* @__PURE__ */ import_react36.default.createElement(
      import_system30.Stack,
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
      /* @__PURE__ */ import_react36.default.createElement(
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
var import_system31 = require("@mui/system");
var import_react37 = require("react");
var TitleRowItemCore = (props) => {
  var _a;
  const [open, setOpen] = (0, import_react37.useState)(false);
  const ActualItem = /* @__PURE__ */ React.createElement(
    import_system31.Stack,
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
    /* @__PURE__ */ React.createElement(import_system31.Stack, { justifyContent: "center" }, /* @__PURE__ */ React.createElement(
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
      import_system31.Stack,
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
      content: /* @__PURE__ */ React.createElement(import_system31.Stack, { spacing: "10px" }, (_a = props.options) == null ? void 0 : _a.map((o, i) => /* @__PURE__ */ React.createElement(
        import_system31.Stack,
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
        o.image || o.imageUrl ? /* @__PURE__ */ React.createElement(import_system31.Stack, { borderRadius: "100%", overflow: "hidden" }, /* @__PURE__ */ React.createElement(
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
    import_system31.Stack,
    {
      direction: "row",
      spacing: props.isMobile ? "6px" : "12px",
      alignItems: "center"
    },
    props.items.map((x, i) => {
      var _a, _b, _c;
      const isLast = i === (((_a = props.items) == null ? void 0 : _a.length) ?? 0) - 1;
      return /* @__PURE__ */ React.createElement(
        import_system31.Stack,
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
var React19 = __toESM(require("react"), 1);
var import_system32 = require("@mui/system");
var import_usehooks_ts5 = require("usehooks-ts");

// src/images/icons/BookIcon.svg
var BookIcon_default = "./BookIcon-EOL744IS.svg";

// src/images/icons/GearIcon.svg
var GearIcon_default = "./GearIcon-PWV5I3LC.svg";

// src/images/icons/FilterIcon.svg
var FilterIcon_default = "./FilterIcon-4ZV7IESR.svg";

// src/components/Sidebar.tsx
var import_react_router_dom2 = require("react-router-dom");
var WIDTH2 = "106px";
var Y_PADDING = "26px";
var ICON_SIZE2 = "28px";
var SMALL_ICON_SIZE = "22px";
var BUTTON_SELECTED_BACKGROUND = PALETTE.secondary.purple[2];
var SMALL_ICON_HEIGHT_THRESHOLD = 630;
var NO_TEXT_HEIGHT_THRESHOLD = 469;
var slideIn = import_system32.keyframes`
from {
  transform: translateX(-1000px);
}
to {
  transform: translateX(40px);
}
`;
var slideOut = import_system32.keyframes`
from {
  transform: translateX(40px);
}
to {
  transform: translateX(-1000px);
}
`;
var SidebarItem = (props) => /* @__PURE__ */ React19.createElement(
  import_system32.Stack,
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
    import_system32.Stack,
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
  /* @__PURE__ */ React19.createElement(import_system32.Stack, { flex: 1, spacing: "4px", justifyContent: "center", alignItems: "center" }, props.children, !props.noText ? /* @__PURE__ */ React19.createElement(
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
  const navigate = (0, import_react_router_dom2.useNavigate)();
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
  const getList = (items, small2, noText2) => /* @__PURE__ */ React19.createElement(import_system32.Stack, { spacing: small2 ? "16px" : "24px", width: "100%" }, items.map((item, index) => {
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
  const [ref, { width, height }] = (0, import_usehooks_ts5.useElementSize)();
  const small = !!height && height > 0 && height < SMALL_ICON_HEIGHT_THRESHOLD;
  const noText = !!height && height < NO_TEXT_HEIGHT_THRESHOLD;
  return /* @__PURE__ */ React19.createElement(React19.Fragment, null, /* @__PURE__ */ React19.createElement(
    import_system32.Stack,
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
    /* @__PURE__ */ React19.createElement(import_system32.Stack, { spacing: small ? "16px" : "24px", alignItems: "center" }, getList(topItems, small, noText)),
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
var import_react_dom2 = require("react-dom");
var DynamicallyLoadedPortal = (props) => (0, import_react_dom2.createPortal)(props.children, document.body);
var DynamicallyLoadedPortal_default = DynamicallyLoadedPortal;

// src/components/PageLayout.tsx
var PADDING_TOP = "51px";
var SIDEBAR_X_MARGIN = 48;
var SIDEBAR_Y_MARGIN = "31px";
var PageLayout = (0, import_react38.forwardRef)(
  (props, ref) => {
    var _a, _b, _c, _d;
    const { width } = (0, import_usehooks_ts6.useWindowSize)();
    return /* @__PURE__ */ import_react38.default.createElement(import_react38.default.Fragment, null, /* @__PURE__ */ import_react38.default.createElement(
      import_material7.Stack,
      {
        direction: "row",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        sx: {
          background: PALETTE.secondary.grey[1]
        }
      },
      !props.noSidebar ? /* @__PURE__ */ import_react38.default.createElement(
        import_material7.Stack,
        {
          minWidth: `calc(${WIDTH2} + ${SIDEBAR_X_MARGIN}px)`,
          alignItems: "flex-end",
          py: SIDEBAR_Y_MARGIN,
          mr: "5px",
          justifyContent: "center"
        },
        /* @__PURE__ */ import_react38.default.createElement(
          Sidebar,
          {
            selectedItemId: props.selectedSidebarItemId,
            classroomId: props.classroomId
          }
        )
      ) : null,
      /* @__PURE__ */ import_react38.default.createElement(
        import_material7.Stack,
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
        props.header ? /* @__PURE__ */ import_react38.default.createElement(import_material7.Stack, { pl: "50px", pb: "24px" }, props.header) : null,
        /* @__PURE__ */ import_react38.default.createElement(
          import_material7.Stack,
          {
            spacing: "30px",
            justifyContent: "space-between",
            pl: `${SIDEBAR_X_MARGIN}px`
          },
          /* @__PURE__ */ import_react38.default.createElement(
            import_material7.Stack,
            {
              direction: "row",
              width: "100%",
              justifyContent: "space-between",
              spacing: "18px"
            },
            /* @__PURE__ */ import_react38.default.createElement(
              import_material7.Stack,
              {
                direction: "row",
                spacing: "30px",
                alignItems: "flex-end",
                width: "100%"
              },
              /* @__PURE__ */ import_react38.default.createElement(
                import_material7.Stack,
                {
                  flex: 1,
                  direction: "row",
                  justifyContent: "space-between"
                },
                /* @__PURE__ */ import_react38.default.createElement(import_material7.Stack, { direction: "row", spacing: "15px", alignItems: "center" }, props.titleBackButtonCallback ? /* @__PURE__ */ import_react38.default.createElement(import_material7.Stack, { width: "25px" }, /* @__PURE__ */ import_react38.default.createElement(
                  import_material7.Stack,
                  {
                    sx: {
                      cursor: "pointer",
                      "&:hover": { opacity: 0.6 },
                      transition: "0.2s"
                    },
                    onClick: props.titleBackButtonCallback,
                    justifyContent: "center"
                  },
                  /* @__PURE__ */ import_react38.default.createElement(ChevronLeft_default, { height: "32px", width: "32px" })
                )) : null, /* @__PURE__ */ import_react38.default.createElement(
                  import_material7.Stack,
                  {
                    direction: "row",
                    spacing: "12px",
                    alignItems: "center",
                    overflow: "hidden"
                  },
                  props.dotColor ? /* @__PURE__ */ import_react38.default.createElement(
                    import_material7.Box,
                    {
                      height: "23px",
                      width: "23px",
                      minWidth: "23px",
                      bgcolor: props.dotColor,
                      borderRadius: "100%"
                    }
                  ) : null,
                  /* @__PURE__ */ import_react38.default.createElement(UrsorFadeIn, { delay: 200, duration: 600 }, /* @__PURE__ */ import_react38.default.createElement(
                    import_material7.Stack,
                    {
                      direction: "row",
                      spacing: "20px",
                      alignItems: "flex-end",
                      width: "100%",
                      overflow: "hidden"
                    },
                    /* @__PURE__ */ import_react38.default.createElement(import_material7.Stack, { overflow: "hidden", spacing: "5px" }, props.titleRow ? /* @__PURE__ */ import_react38.default.createElement(TitleRow_default, { items: props.titleRow }) : /* @__PURE__ */ import_react38.default.createElement(
                      Typography,
                      {
                        variant: "h3",
                        color: props.dark ? PALETTE.font.light : PALETTE.font.dark,
                        noWrap: true
                      },
                      props.title
                    ), props.description ? /* @__PURE__ */ import_react38.default.createElement(
                      Typography,
                      {
                        variant: "small",
                        color: PALETTE.secondary.grey[4]
                      },
                      props.description
                    ) : null),
                    props.titleRowLefthandElement ? /* @__PURE__ */ import_react38.default.createElement(
                      import_material7.Stack,
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
                    props.info ? /* @__PURE__ */ import_react38.default.createElement(import_material7.Stack, { sx: { transform: "translateY(-3px)" } }, /* @__PURE__ */ import_react38.default.createElement(InfoButton_default, { ...props.info })) : null
                  ))
                )),
                props.button || props.secondaryButton || props.buttonRowExtraElement || props.actions ? /* @__PURE__ */ import_react38.default.createElement(
                  UrsorFadeIn,
                  {
                    delay: props.buttonsDelay || 600,
                    duration: 1100
                  },
                  /* @__PURE__ */ import_react38.default.createElement(
                    import_material7.Stack,
                    {
                      direction: "row",
                      spacing: "16px",
                      position: "relative",
                      alignItems: "center"
                    },
                    props.buttonRowExtraElement,
                    props.secondaryButton ? /* @__PURE__ */ import_react38.default.createElement(import_material7.Box, { id: (_a = props.button) == null ? void 0 : _a.tourId }, /* @__PURE__ */ import_react38.default.createElement(
                      UrsorButton,
                      {
                        onClick: props.secondaryButton.callback,
                        endIcon: props.secondaryButton.icon,
                        variant: "secondary",
                        disabled: (_b = props.button) == null ? void 0 : _b.disabled
                      },
                      props.secondaryButton.text
                    )) : null,
                    props.button ? /* @__PURE__ */ import_react38.default.createElement(import_material7.Box, { id: (_c = props.button) == null ? void 0 : _c.tourId }, /* @__PURE__ */ import_react38.default.createElement(
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
                    props.actions ? /* @__PURE__ */ import_react38.default.createElement(
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
        /* @__PURE__ */ import_react38.default.createElement(
          import_material7.Stack,
          {
            width: props.bodyWidth ?? "100%",
            height: "100%"
          },
          props.children
        )
      )
    ), props.maxWidth && width < props.maxWidth ? /* @__PURE__ */ import_react38.default.createElement(DynamicallyLoadedPortal_default, null, /* @__PURE__ */ import_react38.default.createElement(
      import_material7.Stack,
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
      /* @__PURE__ */ import_react38.default.createElement(Typography, { bold: true, color: "rgba(255,255,255,0.93)" }, "This screen is too narrow to have a proper Astro experience."),
      /* @__PURE__ */ import_react38.default.createElement(Typography, { bold: true, color: "rgba(255,255,255,0.93)" }, "Please switch to a wider screen.")
    )) : null);
  }
);
PageLayout.displayName = "Page layout";
var PageLayout_default = PageLayout;

// src/account/contents/body-desktop.tsx
var import_system41 = require("@mui/system");

// src/images/icons/LogOutIcon.svg
var LogOutIcon_default = "./LogOutIcon-VCERV6YZ.svg";

// src/images/icons/Pencil.svg
var Pencil_default = "./Pencil-VGUBMJUT.svg";

// src/images/icons/PersonIcon.svg
var PersonIcon_default = "./PersonIcon-JVUN3UUH.svg";

// src/account/components/UsersTable.tsx
var import_react42 = require("react");

// src/components/UrsorTable.tsx
var import_react41 = __toESM(require("react"), 1);
var import_Table = __toESM(require("@mui/material/Table"), 1);
var import_TableBody = __toESM(require("@mui/material/TableBody"), 1);
var import_TableCell = __toESM(require("@mui/material/TableCell"), 1);
var import_TableContainer = __toESM(require("@mui/material/TableContainer"), 1);
var import_TableHead = __toESM(require("@mui/material/TableHead"), 1);
var import_TableRow = __toESM(require("@mui/material/TableRow"), 1);
var import_material8 = require("@mui/material");
var import_system35 = require("@mui/system");

// src/images/icons/ArrowDownIcon.svg
var ArrowDownIcon_default = "./ArrowDownIcon-IZ7QT243.svg";

// src/components/UrsorTable.tsx
var import_dayjs6 = __toESM(require("dayjs"), 1);

// src/components/NewActivityTag.tsx
var import_react39 = __toESM(require("react"), 1);
var import_system33 = require("@mui/system");
var import_lodash8 = __toESM(require("lodash"), 1);
function NewActivityTag(props) {
  return /* @__PURE__ */ import_react39.default.createElement(
    import_system33.Stack,
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
    /* @__PURE__ */ import_react39.default.createElement(
      import_system33.Box,
      {
        borderRadius: "100%",
        bgcolor: "rgb(255,255,255)",
        height: "7.5px",
        width: "7.5px"
      }
    ),
    /* @__PURE__ */ import_react39.default.createElement(
      Typography,
      {
        variant: "tiny",
        bold: true,
        sx: { lineHeight: "100%" },
        color: "rgb(255,255,255)",
        noWrap: true
      },
      import_lodash8.default.isNumber(props.n) ? `${props.n} New` : "New"
    )
  );
}

// src/components/UrsorDropdown.tsx
var import_react40 = __toESM(require("react"), 1);
var import_system34 = require("@mui/system");
var ROW_HEIGHT = "45px";
var X_PADDING = "20px";
var LIST_MAX_HEIGHT = "400px";
function UrsorDropdownListRow(props) {
  return /* @__PURE__ */ import_react40.default.createElement(
    import_system34.Stack,
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
    /* @__PURE__ */ import_react40.default.createElement(import_system34.Stack, { width: "100%", minWidth: 0 }, /* @__PURE__ */ import_react40.default.createElement(
      Typography,
      {
        noWrap: true,
        variant: "small",
        sx: { lineHeight: "100%" },
        color: props.hovering ? PALETTE.secondary.purple[2] : PALETTE.font.dark
      },
      props.value
    ), props.secondaryValue ? /* @__PURE__ */ import_react40.default.createElement(Typography, { noWrap: true, variant: "tiny", color: PALETTE.secondary.grey[3] }, props.secondaryValue) : null)
  );
}
function UrsorDropdownList(props) {
  const [hoverRowId, setHoverRowId] = (0, import_react40.useState)(void 0);
  return /* @__PURE__ */ import_react40.default.createElement(import_system34.Stack, { width: "100%", maxHeight: LIST_MAX_HEIGHT }, props.rows.map((row) => /* @__PURE__ */ import_react40.default.createElement(
    import_system34.Box,
    {
      key: row.id,
      onClick: row.callback,
      onMouseEnter: () => setHoverRowId(row.id),
      onMouseLeave: () => setHoverRowId((prev) => prev === row.id ? void 0 : prev)
    },
    /* @__PURE__ */ import_react40.default.createElement(UrsorDropdownListRow, { ...row, hovering: row.id === hoverRowId })
  )));
}
function UrsorDropdownButton(props) {
  const [popupOpen, setPopupOpen] = (0, import_react40.useState)(false);
  return /* @__PURE__ */ import_react40.default.createElement(
    UrsorPopover,
    {
      open: popupOpen,
      content: /* @__PURE__ */ import_react40.default.createElement(UrsorDropdownList, { rows: props.rows }),
      closeCallback: () => setPopupOpen(false),
      floatButton: "duplicate",
      noPadding: true
    },
    /* @__PURE__ */ import_react40.default.createElement(
      import_system34.Box,
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
    borderLeft: `1px solid ${(0, import_system35.alpha)(PALETTE.secondary.grey[2], 0.5)}`,
    borderTop: `1px solid ${(0, import_system35.alpha)(PALETTE.secondary.grey[3], 0.2)}`
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
var Checkbox = (props) => /* @__PURE__ */ import_react41.default.createElement(
  import_material8.Stack,
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
  props.checked ? /* @__PURE__ */ import_react41.default.createElement(import_material8.Box, { bgcolor: "rgb(0,0,0)", height: "7px", width: "7px", borderRadius: "100%" }) : null
);
var UrsorTableBodyCell = (props) => {
  const [newTagOn, setNewTagOn] = (0, import_react41.useState)(false);
  import_react41.default.useEffect(() => {
    if (props.newTagDatetime && -(0, import_dayjs6.default)(props.newTagDatetime).diff((0, import_dayjs6.default)(), "seconds") < NEW_TAG_DURATION) {
      setNewTagOn(true);
      setTimeout(() => setNewTagOn(false), NEW_TAG_DURATION * 1e3);
    }
  }, [props.newTagDatetime]);
  return /* @__PURE__ */ import_react41.default.createElement(
    import_TableCell.default,
    {
      key: props.columnName,
      width: props.columnName === "title" ? props.titleColumnWidth || "37%" : props.columnName === "domain" || props.columnName === "url" ? "23%" : props.columnName === "accessLevel" ? "40px" : void 0,
      sx: {
        fontFamily: "unset"
      }
    },
    /* @__PURE__ */ import_react41.default.createElement(
      import_material8.Stack,
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
      /* @__PURE__ */ import_react41.default.createElement(
        import_material8.Stack,
        {
          direction: "row",
          spacing: "16px",
          position: "relative",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          minWidth: props.columnName === "title" ? "200px" : void 0
        },
        /* @__PURE__ */ import_react41.default.createElement(
          import_material8.Stack,
          {
            width: "100%",
            direction: "row",
            spacing: "10px",
            alignItems: "center",
            onClick: props.onClick
          },
          props.checkbox ? /* @__PURE__ */ import_react41.default.createElement(
            import_material8.Box,
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
            /* @__PURE__ */ import_react41.default.createElement(Checkbox, { checked: props.checkbox.checked })
          ) : null,
          /* @__PURE__ */ import_react41.default.createElement(
            import_material8.Stack,
            {
              minWidth: "100%",
              maxWidth: 0,
              direction: "row",
              spacing: "10px",
              alignItems: "center",
              overflow: "hidden"
            },
            props.avatar,
            typeof props.item === "s tring" || typeof props.item === "number" ? /* @__PURE__ */ import_react41.default.createElement(
              import_material8.Stack,
              {
                width: "100%",
                sx: {
                  ...props.disabled ? disabledRowItemStyle : {}
                  // ...(props.columnName === "title"
                  //   ? { maxWidth: 0, minWidth: "100%" }
                  //   : {}),
                }
              },
              /* @__PURE__ */ import_react41.default.createElement(
                "a",
                {
                  target: "_blank",
                  href: props.url ? props.url : void 0,
                  style: {
                    textDecoration: "none",
                    width: "100%"
                  }
                },
                /* @__PURE__ */ import_react41.default.createElement(
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
            newTagOn ? /* @__PURE__ */ import_react41.default.createElement(NewActivityTag, null) : null
          )
        ),
        props.button || props.listButton || props.actionButtonItems ? /* @__PURE__ */ import_react41.default.createElement(import_material8.Box, { width: "fit-content" }, props.button ? /* @__PURE__ */ import_react41.default.createElement(
          import_material8.Stack,
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
          /* @__PURE__ */ import_react41.default.createElement(props.button.icon, { height: "20px", width: "20px" })
        ) : null, props.listButton && props.listButton.rows.length > 1 ? /* @__PURE__ */ import_react41.default.createElement(
          import_material8.Stack,
          {
            direction: "row",
            spacing: "4px",
            sx: { opacity: props.rowHovering ? 1 : 0 }
          },
          props.listButton.showCount && props.listButton.rows.length > 1 ? /* @__PURE__ */ import_react41.default.createElement(Typography, { variant: "medium", faded: true }, `+${props.listButton.rows.length - 1}`) : null,
          /* @__PURE__ */ import_react41.default.createElement(UrsorDropdownButton, { rows: props.listButton.rows }, /* @__PURE__ */ import_react41.default.createElement(
            props.listButton.icon,
            {
              height: CELL_BUTTON_SIZE,
              width: CELL_BUTTON_SIZE
            }
          ))
        ) : null, props.actionButtonItems ? /* @__PURE__ */ import_react41.default.createElement(import_material8.Stack, { width: "16px", sx: { opacity: props.rowHovering ? 1 : 0 } }, /* @__PURE__ */ import_react41.default.createElement(UrsorActionButton, { actions: props.actionButtonItems })) : null) : null,
        props.extraElement
      )
    )
  );
};
function UrsorTable(props) {
  const [hoveredRow, setHoveredRow] = (0, import_react41.useState)(null);
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
    return /* @__PURE__ */ import_react41.default.createElement(
      import_TableCell.default,
      {
        key: displayName,
        sx: {
          background: props.noHeaderGradient ? void 0 : `linear-gradient(${PALETTE.secondary.grey[1]}, ${(0, import_system35.alpha)(
            PALETTE.secondary.grey[1],
            0.5
          )}, ${(0, import_system35.alpha)(PALETTE.secondary.grey[1], 0)})`,
          width: fitBodyContent ? 0 : "auto",
          fontFamily: "unset"
        }
      },
      /* @__PURE__ */ import_react41.default.createElement(import_material8.Stack, { direction: "row", spacing: "10px", alignItems: "center" }, selectAll ? /* @__PURE__ */ import_react41.default.createElement(
        import_material8.Box,
        {
          sx: {
            "&:hover": { opacity: 0.75 },
            transition: "0.2s",
            cursor: "pointer"
          },
          onClick: selectAll.callback
        },
        /* @__PURE__ */ import_react41.default.createElement(Checkbox, { checked: selectAll.ticked })
      ) : null, /* @__PURE__ */ import_react41.default.createElement(
        import_material8.Stack,
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
        /* @__PURE__ */ import_react41.default.createElement(Typography, { variant: "small", bold: true }, displayName.toUpperCase()),
        /* @__PURE__ */ import_react41.default.createElement(
          import_material8.Stack,
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
          /* @__PURE__ */ import_react41.default.createElement(ArrowDownIcon_default, { width: "16px", height: "16px" })
        )
      ), button)
    );
  };
  return /* @__PURE__ */ import_react41.default.createElement(
    import_TableContainer.default,
    {
      sx: {
        width: "unset",
        zIndex: 0,
        // needed to prevent the sticky header from being on top of dialogs
        border: BORDER,
        borderRadius: "12px"
      }
    },
    /* @__PURE__ */ import_react41.default.createElement(import_Table.default, { sx: { overflow: "visible" } }, /* @__PURE__ */ import_react41.default.createElement(import_TableHead.default, null, /* @__PURE__ */ import_react41.default.createElement(import_TableRow.default, { sx: headerRowStyle }, [
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
    ])), /* @__PURE__ */ import_react41.default.createElement(
      import_TableBody.default,
      {
        sx: {
          ...bodyCellStyle,
          border: `${BORDER_THICKNESS} solid ${GLASS_WHITE_STROKE}`,
          borderRadius: ROUNDING2
        },
        onMouseLeave: () => setHoveredRow(null)
      },
      props.rows.map((row, rowIndex) => /* @__PURE__ */ import_react41.default.createElement(
        import_TableRow.default,
        {
          key: rowIndex,
          sx: getRowStyle(rowIndex, !!props.rowClickCallback),
          onMouseOver: () => setHoveredRow(rowIndex)
        },
        [
          ...props.columns.map((column) => {
            var _a, _b, _c, _d, _e, _f, _g;
            return /* @__PURE__ */ import_react41.default.createElement(
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
            /* @__PURE__ */ import_react41.default.createElement(
              import_TableCell.default,
              {
                key: "actionButton",
                sx: {
                  width: 0
                }
              },
              /* @__PURE__ */ import_react41.default.createElement(import_material8.Stack, { alignItems: "flex-end" }, /* @__PURE__ */ import_react41.default.createElement(
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
            /* @__PURE__ */ import_react41.default.createElement(
              import_TableCell.default,
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
var import_system36 = require("@mui/system");
var import_dayjs7 = __toESM(require("dayjs"), 1);
var import_lodash9 = __toESM(require("lodash"), 1);
var UsersTable = (props) => {
  const TABLE_COLUMNS = [
    {
      name: "name",
      displayName: `${props.users.length ?? 0} Adult${props.users.length === 1 ? "" : "s "}`,
      sortable: true,
      newTag: true,
      getAvatar: (id) => {
        return /* @__PURE__ */ React.createElement(
          import_system36.Stack,
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
      itemDisplay: (createdAt) => (0, import_dayjs7.default)(createdAt).format("MM/DD/YYYY")
    }
  ];
  const [rows, setRows] = (0, import_react42.useState)(
    []
  );
  (0, import_react42.useEffect)(() => {
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
  const [sortedRows, setSortedRows] = (0, import_react42.useState)([]);
  const [sortedColumn, setSortedColumn] = (0, import_react42.useState)("name");
  const [sortDirection, setSortDirection] = (0, import_react42.useState)("desc");
  (0, import_react42.useEffect)(() => {
    if (!rows) return;
    const sorted = import_lodash9.default.sortBy(
      rows,
      (row) => {
        var _a, _b;
        return (
          //@ts-ignore
          (_b = (_a = row.items) == null ? void 0 : _a[sortedColumn]) == null ? void 0 : _b.toLowerCase()
        );
      }
    );
    setSortedRows(sortDirection === "asc" ? import_lodash9.default.reverse(sorted.slice()) : sorted);
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
var import_react46 = require("react");
var import_system39 = require("@mui/system");
var import_dayjs8 = __toESM(require("dayjs"), 1);
var import_lodash10 = __toESM(require("lodash"), 1);

// src/profiles/components/DeviceCard.tsx
var import_system38 = require("@mui/system");

// src/filter/components/AstroCard.tsx
var import_system37 = require("@mui/system");
var AstroCard = (props) => /* @__PURE__ */ React.createElement(
  import_system37.Stack,
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
var import_react44 = require("react");
var import_react_router_dom3 = require("react-router-dom");
var import_usehooks_ts7 = require("usehooks-ts");

// src/components/NotificationContext.tsx
var import_react43 = require("react");
var NotificationContext = (0, import_react43.createContext)({
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
  import_system38.Stack,
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
  const [setRef, size] = (0, import_usehooks_ts7.useElementSize)();
  return /* @__PURE__ */ React.createElement(import_system38.Stack, { ref: setRef, flex: 1 }, /* @__PURE__ */ React.createElement(DeviceCardSection, { title: "Browsing status" }, /* @__PURE__ */ React.createElement(
    import_system38.Stack,
    {
      direction: "row",
      alignItems: "center",
      justifyContent: "space-between",
      spacing: "6px"
    },
    /* @__PURE__ */ React.createElement(
      import_system38.Stack,
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
var DeviceCardScreenTimeSection = (props) => /* @__PURE__ */ React.createElement(DeviceCardSection, { title: "Screen time left today" }, /* @__PURE__ */ React.createElement(import_system38.Stack, { direction: "row", alignItems: "center", spacing: "38px" }, /* @__PURE__ */ React.createElement(
  import_system38.Stack,
  {
    direction: "row",
    alignItems: "center",
    justifyContent: "space-between",
    spacing: "8px",
    width: "100%"
  },
  /* @__PURE__ */ React.createElement(
    import_system38.Stack,
    {
      flex: 1,
      height: "11px",
      bgcolor: PALETTE.secondary.grey[2],
      borderRadius: "6px",
      position: "relative",
      overflow: "hidden"
    },
    /* @__PURE__ */ React.createElement(
      import_system38.Stack,
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
  const navigate = (0, import_react_router_dom3.useNavigate)();
  return /* @__PURE__ */ React.createElement(DeviceCardSection, { title: "Currently visiting" }, /* @__PURE__ */ React.createElement(
    import_system38.Stack,
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
    /* @__PURE__ */ React.createElement(import_system38.Stack, { direction: "row", spacing: "8px" }, !props.disabled && props.faviconUrl ? /* @__PURE__ */ React.createElement(
      import_system38.Stack,
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
  const [browsingEnabled, setBrowsingEnabled] = (0, import_react44.useState)(false);
  (0, import_react44.useEffect)(
    () => {
      var _a2;
      return setBrowsingEnabled(!!((_a2 = props.config) == null ? void 0 : _a2.browsingAllowed));
    },
    [(_a = props.config) == null ? void 0 : _a.browsingAllowed]
  );
  const navigate = (0, import_react_router_dom3.useNavigate)();
  const onClick = () => navigate(`/profiles/${props.id}`);
  const notificationCtx = (0, import_react44.useContext)(NotificationContext_default);
  return /* @__PURE__ */ React.createElement(AstroCard_default, null, /* @__PURE__ */ React.createElement(import_system38.Stack, { p: "20px", boxSizing: "border-box", position: "relative" }, props.button ? /* @__PURE__ */ React.createElement(
    import_system38.Stack,
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
    import_system38.Stack,
    {
      direction: "row",
      spacing: "18px",
      position: "relative",
      height: props.small ? "58px" : "90px",
      alignItems: "center",
      width: "94%",
      onClick: props.onClick
    },
    /* @__PURE__ */ React.createElement(import_system38.Stack, { position: "relative" }, /* @__PURE__ */ React.createElement(
      import_system38.Stack,
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
      import_system38.Stack,
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
    /* @__PURE__ */ React.createElement(import_system38.Stack, { justifyContent: "center", spacing: "4px" }, /* @__PURE__ */ React.createElement(
      import_system38.Stack,
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
    ), /* @__PURE__ */ React.createElement(import_system38.Stack, { direction: "row", spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(PhoneIcon_default, { height: "16px", width: "16px" }), /* @__PURE__ */ React.createElement(Typography, { maxLines: 1 }, DEVICE_TYPE_DISPLAY_NAMES[props.deviceType])), props.filterName ? /* @__PURE__ */ React.createElement(
      import_system38.Stack,
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
  ), !props.noExtras ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_system38.Stack, { spacing: "12px", pt: "20px" }, /* @__PURE__ */ React.createElement(
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
  )), /* @__PURE__ */ React.createElement(import_system38.Stack, { pt: "20px" }, /* @__PURE__ */ React.createElement(
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
var import_react45 = require("react");
var import_js_cookie = __toESM(require("js-cookie"), 1);
var import_react_router_dom4 = require("react-router-dom");

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
  const [user, setUser] = (0, import_react45.useState)({});
  const navigate = (0, import_react_router_dom4.useNavigate)();
  (0, import_react45.useEffect)(() => {
    const storedUserInfo = import_js_cookie.default.get("user_info");
    if (storedUserInfo) {
      setUser(JSON.parse(storedUserInfo));
      return;
    }
    const accessToken = import_js_cookie.default.get("access_token");
    const pathname = window.location.href;
    if (!accessToken) navigate(`${BACKEND_URL}/login?origin_uri=${pathname}`);
    getUserInfo().then((data) => {
      setUser(data);
      import_js_cookie.default.set("user_info", JSON.stringify(data));
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
  const [devices, setDevices] = (0, import_react46.useState)([]);
  (0, import_react46.useEffect)(() => {
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
          import_system39.Stack,
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
        const hours = (0, import_dayjs8.default)().diff(lastActive, "hours");
        return `${hours} hour${hours === 1 ? "" : "s "} ago`;
      }
    },
    {
      name: "dateJoined",
      displayName: "Date joined",
      sortable: true,
      itemDisplay: (createdAt) => (0, import_dayjs8.default)(createdAt).format("MM/DD/YYYY")
    }
  ];
  const [rows, setRows] = (0, import_react46.useState)([]);
  (0, import_react46.useEffect)(() => {
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
  const [sortedRows, setSortedRows] = (0, import_react46.useState)([]);
  const [sortedColumn, setSortedColumn] = (0, import_react46.useState)("name");
  const [sortDirection, setSortDirection] = (0, import_react46.useState)("desc");
  (0, import_react46.useEffect)(() => {
    if (!rows) return;
    const sorted = import_lodash10.default.sortBy(
      rows,
      (row) => {
        var _a, _b;
        return (
          //@ts-ignore
          (_b = (_a = row.items) == null ? void 0 : _a[sortedColumn]) == null ? void 0 : _b.toLowerCase()
        );
      }
    );
    setSortedRows(sortDirection === "asc" ? import_lodash10.default.reverse(sorted.slice()) : sorted);
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
var import_system40 = require("@mui/system");
var AccountPageHeader = (props) => /* @__PURE__ */ React.createElement(
  import_system40.Stack,
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
    import_system40.Stack,
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
var import_usehooks_ts8 = require("usehooks-ts");
var SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD = 1408;
var AccountPageDesktopBody = (props) => {
  const { width } = (0, import_usehooks_ts8.useWindowSize)();
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
    /* @__PURE__ */ React.createElement(import_system41.Stack, { pl: "50px", spacing: "12px", pb: "31px" }, /* @__PURE__ */ React.createElement(
      import_system41.Stack,
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
        /* @__PURE__ */ React.createElement(import_system41.Stack, { direction: "row", spacing: "20px", alignItems: "center", flex: 1 }, /* @__PURE__ */ React.createElement(UserInitialsCircle, { name: props.user.realName ?? "" }), /* @__PURE__ */ React.createElement(import_system41.Stack, { direction: "row", spacing: "26px", minWidth: "400px" }, /* @__PURE__ */ React.createElement(import_system41.Stack, { width: "100%", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(import_system41.Stack, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
          Typography,
          {
            variant: "tiny",
            bold: true,
            color: PALETTE.secondary.grey[3]
          },
          "Name"
        ), /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.user.realName)), /* @__PURE__ */ React.createElement(import_system41.Stack, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
          Typography,
          {
            variant: "tiny",
            bold: true,
            color: PALETTE.secondary.grey[3]
          },
          "Nickname"
        ), /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.user.displayName)), /* @__PURE__ */ React.createElement(import_system41.Stack, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
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
          import_system41.Stack,
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
          /* @__PURE__ */ React.createElement(import_system41.Stack, { direction: "row", alignItems: "center", spacing: "24px" }, /* @__PURE__ */ React.createElement(import_system41.Stack, { flex: 1 }, PLAN_BANNER_ITEMS[props.planState].map((item, i) => /* @__PURE__ */ React.createElement(
            import_system41.Stack,
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
          ))), props.planState !== "troomi" ? /* @__PURE__ */ React.createElement(import_system41.Stack, { height: "100%", justifyContent: "flex-end" }, /* @__PURE__ */ React.createElement(
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
        topRightStuff: /* @__PURE__ */ React.createElement(import_system41.Stack, { direction: "row", spacing: "12px" }, /* @__PURE__ */ React.createElement(
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
      /* @__PURE__ */ React.createElement(import_system41.Stack, { spacing: "24px" }, /* @__PURE__ */ React.createElement(UsersTable_default, { users: props.allUsers }), /* @__PURE__ */ React.createElement(DevicesTable_default, null))
    ), /* @__PURE__ */ React.createElement(
      import_system41.Stack,
      {
        direction: width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD ? "column" : "row",
        spacing: "12px"
      },
      /* @__PURE__ */ React.createElement(AstroBentoCard, { title: "Boring bits", notCollapsible: true }, /* @__PURE__ */ React.createElement(import_system41.Stack, { spacing: "6px" }, /* @__PURE__ */ React.createElement(
        "a",
        {
          target: "_blank",
          href: "https://www.astrosafe.co/terms-and-conditions",
          style: {
            textDecoration: "none"
          }
        },
        /* @__PURE__ */ React.createElement(
          import_system41.Stack,
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
          import_system41.Stack,
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
var import_system46 = require("@mui/system");

// src/components/MobilePageLayout.tsx
var import_system44 = require("@mui/system");

// src/components/MobileTitleRow.tsx
var import_react47 = __toESM(require("react"), 1);
var import_system42 = require("@mui/system");
var import_react48 = require("react");
var MobileTitleRow = (props) => {
  var _a;
  const [open, setOpen] = (0, import_react48.useState)(false);
  return /* @__PURE__ */ import_react47.default.createElement(import_system42.Stack, { direction: "row", spacing: "6px", alignItems: "center" }, /* @__PURE__ */ import_react47.default.createElement(
    import_system42.Stack,
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
    /* @__PURE__ */ import_react47.default.createElement(
      UrsorPopover,
      {
        open,
        content: /* @__PURE__ */ import_react47.default.createElement(import_system42.Stack, { spacing: "10px" }, (_a = props.item.options) == null ? void 0 : _a.map((o, i) => /* @__PURE__ */ import_react47.default.createElement(
          import_system42.Stack,
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
          o.image || (o.imageUrl ? /* @__PURE__ */ import_react47.default.createElement(import_system42.Stack, { borderRadius: "100%", overflow: "hidden" }, /* @__PURE__ */ import_react47.default.createElement(
            "img",
            {
              src: o.imageUrl,
              height: 20,
              width: 20,
              alt: "option image"
            }
          )) : null),
          /* @__PURE__ */ import_react47.default.createElement(Typography, { bold: true }, o.text)
        ))),
        placement: "left",
        closeCallback: () => setOpen(false)
      },
      /* @__PURE__ */ import_react47.default.createElement(
        import_system42.Stack,
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
        /* @__PURE__ */ import_react47.default.createElement(import_system42.Stack, { justifyContent: "center" }, /* @__PURE__ */ import_react47.default.createElement(
          Typography,
          {
            bold: true,
            variant: "medium",
            maxLines: 1,
            sx: { wordBreak: "break-all" }
          },
          props.item.text
        )),
        props.item.options && props.item.options.length > 0 ? /* @__PURE__ */ import_react47.default.createElement(ChevronDown_default, { height: "20px", width: "20px" }) : null
      )
    )
  ));
};
var MobileTitleRow_default = MobileTitleRow;

// src/components/MobilePageLayout.tsx
var import_react49 = __toESM(require("react"), 1);

// src/images/icons/ThreeBarsIcon.svg
var ThreeBarsIcon_default = "./ThreeBarsIcon-KPCBSQNX.svg";

// src/components/MobileSideBar.tsx
var import_system43 = require("@mui/system");

// src/images/icons/VersionsIcon.svg
var VersionsIcon_default = "./VersionsIcon-WVOYU2VC.svg";

// src/components/MobileSideBar.tsx
var import_react_router_dom5 = require("react-router-dom");
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
  const navigate = (0, import_react_router_dom5.useNavigate)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    import_system43.Stack,
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
    import_system43.Stack,
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
      import_system43.Stack,
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
      /* @__PURE__ */ React.createElement(import_system43.Stack, { onClick: props.onClose }, /* @__PURE__ */ React.createElement(X_default, { height: "28px", width: "28px" }))
    ),
    /* @__PURE__ */ React.createElement(import_system43.Stack, { justifyContent: "space-between", height: "100%" }, /* @__PURE__ */ React.createElement(import_system43.Stack, { spacing: "24px" }, ["profiles", "filters", "content"].map((page) => {
      const Icon = PAGE_ICONS[page];
      return /* @__PURE__ */ React.createElement(
        import_system43.Stack,
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
      import_system43.Stack,
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
  const [sideBarOpen, setSideBarOpen] = (0, import_react49.useState)(false);
  return /* @__PURE__ */ import_react49.default.createElement(import_react49.default.Fragment, null, /* @__PURE__ */ import_react49.default.createElement(
    import_system44.Stack,
    {
      height: "100%",
      width: "100%",
      overflow: "scroll",
      px: "12px",
      py: "24px",
      boxSizing: "border-box"
    },
    props.header ? /* @__PURE__ */ import_react49.default.createElement(import_system44.Stack, { pb: "24px" }, props.header) : null,
    /* @__PURE__ */ import_react49.default.createElement(import_system44.Stack, { pb: "24px", spacing: "4px" }, /* @__PURE__ */ import_react49.default.createElement(
      import_system44.Stack,
      {
        justifyContent: "space-between",
        alignItems: "center",
        direction: "row"
      },
      /* @__PURE__ */ import_react49.default.createElement(import_system44.Stack, { direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ import_react49.default.createElement(import_system44.Stack, { onClick: () => setSideBarOpen(true) }, /* @__PURE__ */ import_react49.default.createElement(ThreeBarsIcon_default, { height: "20px", width: "20px" })), props.titleBackButtonCallback ? /* @__PURE__ */ import_react49.default.createElement(import_system44.Stack, { width: "25px" }, /* @__PURE__ */ import_react49.default.createElement(
        import_system44.Stack,
        {
          sx: {
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s"
          },
          onClick: props.titleBackButtonCallback,
          justifyContent: "center"
        },
        /* @__PURE__ */ import_react49.default.createElement(ChevronLeftIcon_default, { height: "24px", width: "24px" })
      )) : null, props.title ? /* @__PURE__ */ import_react49.default.createElement(Typography, { bold: true, variant: "medium" }, props.title) : null, props.titleRow ? /* @__PURE__ */ import_react49.default.createElement(MobileTitleRow_default, { item: props.titleRow }) : null),
      props.topRightElement,
      props.actions ? /* @__PURE__ */ import_react49.default.createElement(
        UrsorActionButton,
        {
          actions: props.actions,
          iconSize: "14px",
          size: "32px",
          background: "transparent",
          border: true
        }
      ) : null
    ), props.info ? /* @__PURE__ */ import_react49.default.createElement(InfoButton_default, { ...props.info }) : null),
    props.children
  ), /* @__PURE__ */ import_react49.default.createElement(
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
var import_react50 = __toESM(require("react"), 1);
var import_system45 = require("@mui/system");
var MobileAccountPageHeader = (props) => /* @__PURE__ */ import_react50.default.createElement(
  import_system45.Stack,
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
  /* @__PURE__ */ import_react50.default.createElement(import_system45.Stack, { spacing: "16px", direction: "column", p: "12px", boxSizing: "border-box" }, /* @__PURE__ */ import_react50.default.createElement(Typography, { bold: true, color: "rgb(255,255,255)" }, "Upgrade to a Family or School account to get unlimited access!"), /* @__PURE__ */ import_react50.default.createElement(
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
  /* @__PURE__ */ import_react50.default.createElement(import_system45.Stack, { justifyContent: "flex-end", alignItems: "flex-end" }, /* @__PURE__ */ import_react50.default.createElement(
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
  /* @__PURE__ */ React.createElement(import_system46.Stack, { spacing: "12px" }, /* @__PURE__ */ React.createElement(
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
    /* @__PURE__ */ React.createElement(import_system46.Stack, { direction: "row", spacing: "20px", flex: 1 }, /* @__PURE__ */ React.createElement(
      UserInitialsCircle,
      {
        name: props.user.realName ?? "",
        size: 50,
        fontSize: 18
      }
    ), /* @__PURE__ */ React.createElement(import_system46.Stack, { direction: "row", spacing: "26px", minWidth: "400px" }, /* @__PURE__ */ React.createElement(import_system46.Stack, { width: "100%", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(import_system46.Stack, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        variant: "tiny",
        bold: true,
        color: PALETTE.secondary.grey[3]
      },
      "Name"
    ), /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.user.realName)), /* @__PURE__ */ React.createElement(import_system46.Stack, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        variant: "tiny",
        bold: true,
        color: PALETTE.secondary.grey[3]
      },
      "Nickname"
    ), /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.user.displayName)), /* @__PURE__ */ React.createElement(import_system46.Stack, { spacing: "4px", width: "100%" }, /* @__PURE__ */ React.createElement(
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
      import_system46.Stack,
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
        import_system46.Stack,
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
      /* @__PURE__ */ React.createElement(import_system46.Stack, { pt: "12px", direction: "row", alignItems: "center", spacing: "24px" }, /* @__PURE__ */ React.createElement(import_system46.Stack, { flex: 1 }, PLAN_BANNER_ITEMS[props.planState].map((item, i) => /* @__PURE__ */ React.createElement(
        import_system46.Stack,
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
  ), /* @__PURE__ */ React.createElement(AstroBentoCard, { title: "Users in my space", notCollapsible: true, isMobile: true }, /* @__PURE__ */ React.createElement(import_system46.Stack, { spacing: "12px" }, /* @__PURE__ */ React.createElement(import_system46.Stack, { direction: "row", spacing: "12px" }, /* @__PURE__ */ React.createElement(
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
  )), /* @__PURE__ */ React.createElement(UsersTable_default, { users: props.allUsers }), /* @__PURE__ */ React.createElement(DevicesTable_default, null))), /* @__PURE__ */ React.createElement(AstroBentoCard, { title: "Boring bits", notCollapsible: true, isMobile: true }, /* @__PURE__ */ React.createElement(import_system46.Stack, { spacing: "6px" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      target: "_blank",
      href: "https://www.astrosafe.co/terms-and-conditions",
      style: {
        textDecoration: "none"
      }
    },
    /* @__PURE__ */ React.createElement(
      import_system46.Stack,
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
      import_system46.Stack,
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
var import_react51 = __toESM(require("react"), 1);
var import_system47 = require("@mui/system");
var TroomiManagePlanDialog = (props) => {
  return /* @__PURE__ */ import_react51.default.createElement(
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
    /* @__PURE__ */ import_react51.default.createElement(import_system47.Stack, null)
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
  return (_a = name == null ? void 0 : name.split(" ").map((x) => import_lodash11.default.capitalize(x)[0])) == null ? void 0 : _a.slice(0, 2).join("");
};
var UserInitialsCircle = (props) => /* @__PURE__ */ React.createElement(
  import_system48.Stack,
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
  const [planState, setPlanState] = (0, import_react52.useState)("troomi");
  const [editDialogOpen, setEditDialogOpen] = (0, import_react52.useState)(false);
  const [inviteDialogOpen, setInviteDialogOpen] = (0, import_react52.useState)(false);
  const [connectDialogOpen, setConnectDialogOpen] = (0, import_react52.useState)(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = (0, import_react52.useState)(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = (0, import_react52.useState)(false);
  const [allUsers, setAllUsers] = (0, import_react52.useState)([]);
  const loadUsers = (0, import_react52.useCallback)(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupUsers(user.group_id).then(setAllUsers);
  }, [user == null ? void 0 : user.group_id]);
  (0, import_react52.useEffect)(() => {
    loadUsers();
  }, [loadUsers]);
  const [currentUser, setCurrentUser] = (0, import_react52.useState)();
  (0, import_react52.useEffect)(() => {
    (user == null ? void 0 : user.user_id) && setCurrentUser(allUsers.find((u) => u.id === user.user_id));
  }, [user == null ? void 0 : user.user_id, allUsers]);
  const [troomiManagePlanDialogOpen, setTroomiManagePlanDialogOpen] = (0, import_react52.useState)(false);
  const MANAGE_PLAN_CALLBACKS = {
    freeTrial: () => null,
    troomi: () => setTroomiManagePlanDialogOpen(true)
  };
  const notificationCtx = (0, import_react52.useContext)(NotificationContext_default);
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
var import_system49 = require("@mui/system");

// src/components/NotificationProvider.tsx
var import_react53 = __toESM(require("react"), 1);
function NotificationProvider(props) {
  const [type, setType] = (0, import_react53.useState)(null);
  const [message, setMessage] = (0, import_react53.useState)(null);
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
  (0, import_react53.useEffect)(() => {
    message && setTimeout(() => setMessage(null), 2500);
  }, [message]);
  return /* @__PURE__ */ import_react53.default.createElement(
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
var React30 = __toESM(require("react"), 1);
var import_material9 = require("@mui/material");
var import_react54 = require("react");
var import_react_device_detect = require("react-device-detect");
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
  const notificationCtx = (0, import_react54.useContext)(NotificationContext_default);
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
    import_material9.Stack,
    {
      position: "absolute",
      left: 0,
      right: 0,
      margin: "auto auto",
      py: import_react_device_detect.isMobile ? "8px" : 0,
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
      import_material9.Stack,
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
      import_system49.Stack,
      {
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        width: "100vw",
        position: "relative",
        bgcolor: PALETTE.secondary.purple[2]
      },
      /* @__PURE__ */ React.createElement(NotificationProvider, null, /* @__PURE__ */ React.createElement(import_system49.Stack, { width: "100%", justifyContent: "center", zIndex: 999999999 }, /* @__PURE__ */ React.createElement(UrsorNotificationBar, null)), children)
    )
  ));
}

// src/account/index.tsx
var Account = () => {
  return /* @__PURE__ */ import_react55.default.createElement(RootLayout, null, /* @__PURE__ */ import_react55.default.createElement(common_default, { isMobile: import_react_device_detect2.isMobile }));
};
var account_default = Account;

// src/channel/index.tsx
var import_react84 = __toESM(require("react"), 1);
var import_react_device_detect4 = require("react-device-detect");

// src/channel/contents/common.tsx
var import_react82 = __toESM(require("react"), 1);
var import_react_router_dom12 = require("react-router-dom");
var import_react83 = require("react");

// src/images/icons/TrashcanIcon.svg
var TrashcanIcon_default = "./TrashcanIcon-GDIRSPRM.svg";

// src/channel/contents/body-desktop.tsx
var import_react78 = __toESM(require("react"), 1);
var import_system72 = require("@mui/system");

// src/components/DynamicCardGrid.tsx
var import_react56 = __toESM(require("react"), 1);
var DynamicCardGrid = (props) => {
  return /* @__PURE__ */ import_react56.default.createElement(
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
var import_system70 = require("@mui/system");

// src/images/play.svg
var play_default = "./play-3YLE3PKV.svg";

// src/folder/components/ContentCard.tsx
var import_system69 = require("@mui/system");

// src/folder/contents/common.tsx
var import_react76 = __toESM(require("react"), 1);

// src/images/icons/CirclePlay.svg
var CirclePlay_default = "./CirclePlay-NJRUSAOB.svg";

// src/images/icons/LinkIcon.svg
var LinkIcon_default = "./LinkIcon-OZ2WJ36F.svg";

// src/images/icons/VideoCameraIcon.svg
var VideoCameraIcon_default = "./VideoCameraIcon-CDSS5VQP.svg";

// src/folder/contents/common.tsx
var import_lodash15 = __toESM(require("lodash"), 1);
var import_react_router_dom10 = require("react-router-dom");

// src/folder/components/AddDeviceDialog.tsx
var import_system50 = require("@mui/system");
var import_react57 = require("react");
var AddDeviceDialog = (props) => {
  const [searchValue, setSearchValue] = (0, import_react57.useState)("");
  const [allDevices, setAllDevices] = (0, import_react57.useState)([]);
  (0, import_react57.useEffect)(() => {
    props.groupId && api_default.getGroupEnrichedDevices(props.groupId).then(
      (d) => setAllDevices(d)
    );
  }, [props.groupId]);
  const [nonAddedDevices, setNonAddedDevices] = (0, import_react57.useState)([]);
  (0, import_react57.useEffect)(
    () => setNonAddedDevices(
      allDevices.filter(
        (d) => !props.addedDevices.find((device) => device.id === d.id)
      )
    ),
    [allDevices, props.addedDevices]
  );
  const [filteredDevices, setFilteredDevices] = (0, import_react57.useState)([]);
  (0, import_react57.useEffect)(
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
    nonAddedDevices.length === 0 ? /* @__PURE__ */ React.createElement(import_system50.Stack, { flex: 1, justifyContent: "center", width: "66%" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        color: PALETTE.secondary.grey[3],
        bold: true,
        sx: { textAlign: "center" }
      },
      props.emptyText
    )) : /* @__PURE__ */ React.createElement(import_system50.Stack, { pt: "16px", spacing: "16px", width: "100%" }, filteredDevices.map((d) => /* @__PURE__ */ React.createElement(
      import_system50.Stack,
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
        import_system50.Stack,
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
var import_system54 = require("@mui/system");

// src/folder/components/ContentCreationDialog.tsx
var import_react58 = __toESM(require("react"), 1);
var import_system51 = require("@mui/system");
var import_react_device_detect3 = require("react-device-detect");
function ContentCreationDialog(props) {
  return /* @__PURE__ */ import_react58.default.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.closeCallback,
      title: `${props.editing ? "Edit" : "Add a"} ${CONTENT_DISPLAY_NAMES[props.type]}`,
      info: props.info,
      dynamicHeight: true,
      maxWidth: "780px",
      isMobile: import_react_device_detect3.isMobile
    },
    /* @__PURE__ */ import_react58.default.createElement(
      import_system51.Stack,
      {
        boxSizing: "border-box",
        flex: 1,
        width: "100%",
        alignItems: "center",
        spacing: "24px"
      },
      /* @__PURE__ */ import_react58.default.createElement(
        import_system51.Stack,
        {
          direction: import_react_device_detect3.isMobile ? "column" : "row",
          width: "100%",
          height: "100%",
          spacing: "32px",
          justifyContent: "space-between"
        },
        /* @__PURE__ */ import_react58.default.createElement(import_system51.Stack, { flex: 1, spacing: "20px", overflow: "hidden" }, /* @__PURE__ */ import_react58.default.createElement(LabeledInputField, { label: "URL" }, /* @__PURE__ */ import_react58.default.createElement(
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
        )), /* @__PURE__ */ import_react58.default.createElement(LabeledInputField, { label: "Title" }, /* @__PURE__ */ import_react58.default.createElement(
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
        )), props.extraBottomElement ? /* @__PURE__ */ import_react58.default.createElement(import_system51.Stack, null, /* @__PURE__ */ import_react58.default.createElement(import_system51.Stack, { height: "20px" }, /* @__PURE__ */ import_react58.default.createElement(
          import_system51.Stack,
          {
            height: "2px",
            width: "100%",
            bgcolor: PALETTE.secondary.grey[2]
          }
        )), props.extraBottomElement) : null),
        !import_react_device_detect3.isMobile ? /* @__PURE__ */ import_react58.default.createElement(import_system51.Stack, { width: "1px", bgcolor: PALETTE.secondary.grey[2] }) : null,
        /* @__PURE__ */ import_react58.default.createElement(import_system51.Stack, { width: import_react_device_detect3.isMobile ? "100%" : "299px" }, props.children)
      ),
      /* @__PURE__ */ import_react58.default.createElement(
        UrsorButton,
        {
          width: import_react_device_detect3.isMobile ? "100%" : "358px",
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
var import_react60 = require("react");

// src/folder/components/ChannelCard.tsx
var import_system52 = require("@mui/system");
var import_react_router_dom6 = require("react-router-dom");
var IMAGE_HEIGHT = 160;
var ChannelCard = (props) => {
  const navigate = (0, import_react_router_dom6.useNavigate)();
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
      import_system52.Stack,
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
      ) : /* @__PURE__ */ React.createElement(import_system52.Stack, { flex: 1, bgcolor: PALETTE.secondary.grey[2] }),
      props.profileUrl ? /* @__PURE__ */ React.createElement(
        import_system52.Stack,
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
          import_system52.Stack,
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
          ) : /* @__PURE__ */ React.createElement(import_system52.Stack, { flex: 1, bgcolor: PALETTE.secondary.grey[3] })
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
var import_react59 = __toESM(require("react"), 1);
var import_system53 = require("@mui/system");
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
var ProfilePageTabLayout = (props) => /* @__PURE__ */ import_react59.default.createElement(import_system53.Stack, { flex: 1, spacing: "24px" }, /* @__PURE__ */ import_react59.default.createElement(import_system53.Stack, { spacing: "6px" }, /* @__PURE__ */ import_react59.default.createElement(import_system53.Stack, { direction: "row", justifyContent: "space-between", alignItems: "center" }, /* @__PURE__ */ import_react59.default.createElement(import_system53.Stack, { direction: "row", alignItems: "flex-end", spacing: "16px" }, /* @__PURE__ */ import_react59.default.createElement(Typography, { variant: "h5" }, props.title), !props.mobile ? /* @__PURE__ */ import_react59.default.createElement(import_system53.Stack, { sx: { transform: "translateY(1px)" } }, /* @__PURE__ */ import_react59.default.createElement(InfoButton_default, { ...props.info })) : null), props.rightSideElement), props.mobile ? /* @__PURE__ */ import_react59.default.createElement(InfoButton_default, { ...props.info }) : null), props.children);
var ProfilePageTabLayout_default = ProfilePageTabLayout;

// src/folder/components/ChannelCreationDialog.tsx
var ChannelCreationDialog = (props) => {
  const [title, setTitle] = (0, import_react60.useState)("");
  const [url, setUrl] = (0, import_react60.useState)("");
  const [profileUrl, setProfileUrl] = (0, import_react60.useState)("");
  const [bannerUrl, setBannerUrl] = (0, import_react60.useState)("");
  (0, import_react60.useEffect)(() => {
    var _a, _b, _c, _d;
    props.updateDetails && setTitle((_a = props.updateDetails) == null ? void 0 : _a.channel.title);
    props.updateDetails && setUrl((_b = props.updateDetails) == null ? void 0 : _b.channel.url);
    props.updateDetails && setProfileUrl((_c = props.updateDetails) == null ? void 0 : _c.channel.profileUrl);
    props.updateDetails && setBannerUrl((_d = props.updateDetails) == null ? void 0 : _d.channel.bannerUrl);
  }, [props.updateDetails]);
  const notificationCtx = (0, import_react60.useContext)(NotificationContext_default);
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
  const [checked, setChecked] = (0, import_react60.useState)(false);
  const [manuallyChangedTitle, setManuallyChangedTitle] = (0, import_react60.useState)(false);
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
      extraBottomElement: !props.updateDetails ? /* @__PURE__ */ React.createElement(import_system54.Stack, { direction: "row", spacing: "8px" }, /* @__PURE__ */ React.createElement(
        import_system54.Stack,
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
      import_system54.Stack,
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
var import_system55 = require("@mui/system");
var import_react61 = require("react");
var FolderRenameDialog = (props) => {
  const [name, setName] = (0, import_react61.useState)("");
  (0, import_react61.useEffect)(() => setName(props.name), [props.name]);
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
    /* @__PURE__ */ React.createElement(import_system55.Stack, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(LabeledInputField, { label: "Name" }, /* @__PURE__ */ React.createElement(
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
var import_react62 = require("react");
var import_lodash12 = __toESM(require("lodash"), 1);
var useLoadFolderAndContents = (folderId) => {
  const [folder, setFolder] = (0, import_react62.useState)();
  const [contents, setContents] = (0, import_react62.useState)([]);
  const loadFolderAndContents = (0, import_react62.useCallback)(
    () => api_default.getFolder(folderId).then((f) => {
      setFolder(f);
      setContents(
        import_lodash12.default.sortBy(
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
  (0, import_react62.useEffect)(() => {
    loadFolderAndContents();
  }, []);
  return { folder, contents, loadFolderAndContents };
};
var useLoadFolderAndContents_default = useLoadFolderAndContents;

// src/folder/components/VideoCreationDialog.tsx
var import_system56 = require("@mui/system");
var import_react63 = require("react");
var VideoCreationDialog = (props) => {
  const [title, setTitle] = (0, import_react63.useState)("");
  const [url, setUrl] = (0, import_react63.useState)("");
  const [thumbnailUrl, setThumbnailUrl] = (0, import_react63.useState)("");
  (0, import_react63.useEffect)(() => {
    var _a, _b, _c;
    props.updateDetails && setTitle((_a = props.updateDetails) == null ? void 0 : _a.video.title);
    props.updateDetails && setUrl((_b = props.updateDetails) == null ? void 0 : _b.video.url);
    props.updateDetails && setThumbnailUrl((_c = props.updateDetails) == null ? void 0 : _c.video.thumbnailUrl);
  }, [props.updateDetails]);
  const [manuallyChangedTitle, setManuallyChangedTitle] = (0, import_react63.useState)(false);
  const loadPreview = () => {
    api_default.getVideoPreview(
      encodeURIComponent(getAbsoluteUrl(cleanUrl(url)))
    ).then((result) => {
      result.title && !manuallyChangedTitle && setTitle(result.title);
      result.thumbnailUrl && setThumbnailUrl(result.thumbnailUrl);
    }).catch(() => null);
  };
  const notificationCtx = (0, import_react63.useContext)(NotificationContext_default);
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
      import_system56.Stack,
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
var import_system64 = require("@mui/system");

// src/components/SortButton.tsx
var import_react65 = __toESM(require("react"), 1);
var import_system58 = require("@mui/system");

// src/components/UrsorSelectList.tsx
var import_react64 = __toESM(require("react"), 1);
var import_system57 = require("@mui/system");
function UrsorSelectList(props) {
  const [open, setOpen] = (0, import_react64.useState)(false);
  return /* @__PURE__ */ import_react64.default.createElement(import_system57.Stack, { spacing: "6px" }, props.items.map((item) => /* @__PURE__ */ import_react64.default.createElement(
    import_system57.Stack,
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
    /* @__PURE__ */ import_react64.default.createElement(Typography, { variant: "small", bold: true }, item.value)
  )));
}

// src/components/SortButton.tsx
var SortButton = (props) => {
  const [open, setOpen] = (0, import_react65.useState)(false);
  return /* @__PURE__ */ import_react65.default.createElement(
    UrsorPopover,
    {
      open,
      content: /* @__PURE__ */ import_react65.default.createElement(
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
    props.iconOnly ? /* @__PURE__ */ import_react65.default.createElement(
      import_system58.Stack,
      {
        height: "28px",
        width: "28px",
        borderRadius: "28px",
        justifyContent: "center",
        alignItems: "center"
      },
      /* @__PURE__ */ import_react65.default.createElement(FilterIcon_default, { height: "14px", width: "14px" })
    ) : /* @__PURE__ */ import_react65.default.createElement(
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
var import_system59 = require("@mui/system");

// src/images/icons/PlusIcon.svg
var PlusIcon_default = "./PlusIcon-6XAFXQ3T.svg";

// src/folder/components/AddContentButton.tsx
var AddContentButton = (props) => {
  return /* @__PURE__ */ React.createElement(
    import_system59.Stack,
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
      import_system59.Stack,
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
    /* @__PURE__ */ React.createElement(import_system59.Stack, { direction: "row", spacing: "14px", flex: 1 }, /* @__PURE__ */ React.createElement(
      import_system59.Stack,
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
    ), /* @__PURE__ */ React.createElement(import_system59.Stack, { flex: 1, py: "11px", justifyContent: "center" }, /* @__PURE__ */ React.createElement(import_system59.Stack, { width: "fit-content" }, /* @__PURE__ */ React.createElement(Typography, { bold: true, color: props.color }, props.title))), /* @__PURE__ */ React.createElement(
      import_system59.Stack,
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
var import_system63 = require("@mui/system");
var import_react68 = require("react");

// src/components/MobileAllDevicesDialog.tsx
var import_system61 = require("@mui/system");
var import_material10 = require("@mui/material");
var import_react67 = require("react");

// src/profiles/components/MobileDeviceCard.tsx
var import_system60 = require("@mui/system");

// src/images/icons/CheckCircleFillIcon.svg
var CheckCircleFillIcon_default = "./CheckCircleFillIcon-ESFE5D4L.svg";

// src/profiles/components/MobileDeviceCard.tsx
var import_react66 = require("react");
var import_react_router_dom7 = require("react-router-dom");
var MobileDeviceCardFilterRow = (props) => {
  var _a;
  const { user } = useAuth_default();
  const [allFilters, setAllFilters] = (0, import_react66.useState)([]);
  (0, import_react66.useEffect)(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupFilters(user.group_id).then(setAllFilters);
  }, [user == null ? void 0 : user.group_id]);
  const [open, setOpen] = (0, import_react66.useState)(false);
  return /* @__PURE__ */ React.createElement(
    UrsorPopover,
    {
      open,
      content: /* @__PURE__ */ React.createElement(import_system60.Stack, { bgcolor: "rgb(255,255,255)", borderRadius: "12px", spacing: "12px" }, allFilters.map((f, i) => /* @__PURE__ */ React.createElement(
        import_system60.Stack,
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
          import_system60.Stack,
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
    /* @__PURE__ */ React.createElement(import_system60.Stack, { onClick: () => setOpen(true), flex: 1 }, /* @__PURE__ */ React.createElement(
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
  import_system60.Stack,
  {
    maxHeight: "20px",
    height: "20px",
    direction: "row",
    alignItems: "center",
    spacing: "12px",
    justifyContent: "space-between"
  },
  /* @__PURE__ */ React.createElement(
    import_system60.Stack,
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
  const [browsingEnabled, setBrowsingEnabled] = (0, import_react66.useState)(false);
  (0, import_react66.useEffect)(
    () => {
      var _a2;
      return setBrowsingEnabled(!!((_a2 = props.config) == null ? void 0 : _a2.browsingAllowed));
    },
    [(_a = props.config) == null ? void 0 : _a.browsingAllowed]
  );
  const navigate = (0, import_react_router_dom7.useNavigate)();
  const notificationCtx = (0, import_react66.useContext)(NotificationContext_default);
  const onClick = () => navigate(`/profiles/${props.id}`);
  const changeFilter = (id) => api_default.addFilterToDevice(id, props.id).then(props.onUpdate).then(() => notificationCtx.success("Changed Filter"));
  return /* @__PURE__ */ React.createElement(AstroCard_default, null, /* @__PURE__ */ React.createElement(
    import_system60.Stack,
    {
      px: "16px",
      py: "12px",
      boxSizing: "border-box",
      position: "relative",
      justifyContent: "center"
    },
    /* @__PURE__ */ React.createElement(
      import_system60.Stack,
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
      import_system60.Stack,
      {
        spacing: "20px",
        direction: "row",
        justifyContent: "center",
        alignItems: "center",
        onClick: props.onClick
      },
      /* @__PURE__ */ React.createElement(
        import_system60.Stack,
        {
          spacing: "8px",
          position: "relative",
          alignItems: "center",
          width: props.noExtras ? void 0 : "91px"
        },
        /* @__PURE__ */ React.createElement(import_system60.Stack, { position: "relative" }, /* @__PURE__ */ React.createElement(
          import_system60.Stack,
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
          import_system60.Stack,
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
        /* @__PURE__ */ React.createElement(import_system60.Stack, { spacing: "2px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
          Typography,
          {
            variant: "small",
            bold: true,
            maxLines: 1,
            sx: { wordBreak: "break-all" }
          },
          props.name
        ), !props.noDeviceTypeUnderAvatar ? /* @__PURE__ */ React.createElement(import_system60.Stack, { direction: "row", spacing: "6px", alignItems: "center" }, /* @__PURE__ */ React.createElement(PhoneIcon_default, { height: "14px", width: "14px" }), /* @__PURE__ */ React.createElement(Typography, { variant: "small", maxLines: 1 }, DEVICE_TYPE_DISPLAY_NAMES[props.deviceType])) : null)
      ),
      !props.noExtras ? /* @__PURE__ */ React.createElement(import_system60.Stack, { spacing: "8px", flex: 1 }, /* @__PURE__ */ React.createElement(
        MobileDeviceCardRow,
        {
          text: DEVICE_TYPE_DISPLAY_NAMES[props.deviceType],
          icon: PhoneIcon_default,
          iconColor: PALETTE.primary.navy
        }
      ), /* @__PURE__ */ React.createElement(
        import_system60.Stack,
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
        import_system60.Stack,
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
  const [searchValue, setSearchValue] = (0, import_react67.useState)("");
  const [filteredDevices, setFilteredDevices] = (0, import_react67.useState)([]);
  (0, import_react67.useEffect)(
    () => setFilteredDevices(
      props.devices.filter(
        (d) => d.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    [props.devices, searchValue]
  );
  return /* @__PURE__ */ React.createElement(
    import_material10.Dialog,
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
    /* @__PURE__ */ React.createElement(import_system61.Stack, { spacing: "32px", flex: 1 }, /* @__PURE__ */ React.createElement(
      import_system61.Stack,
      {
        justifyContent: "space-between",
        alignItems: "center",
        spacing: "12px"
      },
      /* @__PURE__ */ React.createElement(import_system61.Stack, { direction: "row" }, /* @__PURE__ */ React.createElement(Typography, { variant: "large", bold: true }, props.title), /* @__PURE__ */ React.createElement(
        import_system61.Stack,
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
        button: /* @__PURE__ */ React.createElement(import_system61.Stack, { onClick: () => props.onRemove(d.id) }, /* @__PURE__ */ React.createElement(X_default, { height: 16, width: 16 })),
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
var import_system62 = require("@mui/system");
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
    /* @__PURE__ */ React.createElement(import_system62.Stack, { alignItems: "center", spacing: "2px" }, /* @__PURE__ */ React.createElement(Typography, { sx: { textAlign: "center" } }, "Removing"), /* @__PURE__ */ React.createElement(Typography, { sx: { textAlign: "center" }, bold: true }, props.deviceName), /* @__PURE__ */ React.createElement(Typography, { sx: { textAlign: "center" } }, "from this Folder means that its Contents will no longer be accessible on that Device. Are you sure you want to remove it?")),
    /* @__PURE__ */ React.createElement(import_system62.Stack, { pt: "20px", flex: 1, width: "100%", height: "100%", spacing: "12px" }, /* @__PURE__ */ React.createElement(
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
  const [hoveringOnButton, setHoveringOnButton] = (0, import_react68.useState)(false);
  const [devicesGridDialogOpen, setDevicesGridDialogOpen] = (0, import_react68.useState)(false);
  const [removalConfirmationDialogId, setRemovalConfirmationDialogId] = (0, import_react68.useState)();
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
        button: /* @__PURE__ */ React.createElement(import_system63.Stack, { onClick: () => setRemovalConfirmationDialogId(d.id) }, /* @__PURE__ */ React.createElement(X_default, { height: 16, width: 16 })),
        noExtras: true
      }
    )))) : /* @__PURE__ */ React.createElement(
      import_system63.Stack,
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
    /* @__PURE__ */ React.createElement(import_system63.Stack, { direction: "row", spacing: "12px", pt: "14px" }, /* @__PURE__ */ React.createElement(
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
var import_react_router_dom8 = require("react-router-dom");
var FolderPageMobileBody = (props) => {
  const navigate = (0, import_react_router_dom8.useNavigate)();
  return /* @__PURE__ */ React.createElement(
    MobilePageLayout_default,
    {
      titleRow: props.titleRow.slice(-1)[0],
      titleBackButtonCallback: () => navigate("/folders"),
      selectedPage: "content",
      actions: props.actions
    },
    /* @__PURE__ */ React.createElement(import_system64.Stack, { spacing: "24px", pb: "32px" }, /* @__PURE__ */ React.createElement(
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
    ), /* @__PURE__ */ React.createElement(import_system64.Stack, { justifyContent: "center" }, /* @__PURE__ */ React.createElement(
      import_system64.Stack,
      {
        width: "100%",
        height: "1px",
        bgcolor: PALETTE.secondary.grey[2]
      }
    )), /* @__PURE__ */ React.createElement(import_system64.Stack, { justifyContent: "space-between", spacing: "8px" }, /* @__PURE__ */ React.createElement(Typography, { variant: "medium", bold: true }, `${props.contents.length} item${props.contents.length === 1 ? "" : "s "} in this Folder`), /* @__PURE__ */ React.createElement(import_system64.Stack, { direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
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
    ))), /* @__PURE__ */ React.createElement(import_system64.Stack, { spacing: "12px" }, ["link", "video", "channel"].map((c) => /* @__PURE__ */ React.createElement(
      import_system64.Stack,
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
      import_system64.Stack,
      {
        bgcolor: "rgb(255,255,255)",
        borderRadius: "12px",
        border: `1px solid ${PALETTE.secondary.grey[2]}`,
        p: "16px",
        boxSizing: "border-box"
      },
      /* @__PURE__ */ React.createElement(import_system64.Stack, { overflow: "hidden", flex: 1 }, props.contents.length > 0 ? /* @__PURE__ */ React.createElement(import_system64.Stack, { flex: 1, spacing: "12px" }, props.contents.map((x, i) => /* @__PURE__ */ React.createElement(import_system64.Stack, { key: `${x.content.id}${x.type}` }, /* @__PURE__ */ React.createElement(UrsorFadeIn, { delay: i * 80, duration: 800 }, x.type === "link" ? /* @__PURE__ */ React.createElement(
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
        import_system64.Stack,
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
        /* @__PURE__ */ React.createElement(import_system64.Stack, { width: "444px" }, /* @__PURE__ */ React.createElement(
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
var import_system67 = require("@mui/system");

// src/folder/components/DevicesSection.tsx
var import_system66 = require("@mui/system");
var import_react70 = require("react");

// src/components/AllDevicesDialog.tsx
var import_system65 = require("@mui/system");
var import_material11 = require("@mui/material");
var import_react69 = require("react");
var AllDevicesDialog = (props) => {
  const [searchValue, setSearchValue] = (0, import_react69.useState)("");
  const [filteredDevices, setFilteredDevices] = (0, import_react69.useState)([]);
  (0, import_react69.useEffect)(
    () => setFilteredDevices(
      props.devices.filter(
        (d) => d.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    [props.devices, searchValue]
  );
  return /* @__PURE__ */ React.createElement(
    import_material11.Dialog,
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
    /* @__PURE__ */ React.createElement(import_system65.Stack, { spacing: "32px" }, /* @__PURE__ */ React.createElement(
      import_system65.Stack,
      {
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      /* @__PURE__ */ React.createElement(import_system65.Stack, { direction: "row", spacing: "8px" }, /* @__PURE__ */ React.createElement(Typography, { variant: "h5" }, props.title), /* @__PURE__ */ React.createElement(InfoButton_default, { ...INFOS.folderDevice })),
      /* @__PURE__ */ React.createElement(import_system65.Stack, { direction: "row", spacing: "12px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
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
        button: props.onRemove ? /* @__PURE__ */ React.createElement(import_system65.Stack, { onClick: () => props.onRemove(d.id) }, /* @__PURE__ */ React.createElement(X_default, { height: 16, width: 16 })) : void 0,
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
  const [hoveringOnButton, setHoveringOnButton] = (0, import_react70.useState)(false);
  const [devicesGridDialogOpen, setDevicesGridDialogOpen] = (0, import_react70.useState)(false);
  const removeDevice = (id) => api_default.removeFolderFromDevice(props.folderId, id).then(
    props.onRemove
  );
  const [removalConfirmationDialogId, setRemovalConfirmationDialogId] = (0, import_react70.useState)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: props.title,
      info: INFOS.folderDevice,
      notCollapsible: true,
      topRightStuff: /* @__PURE__ */ React.createElement(import_system66.Stack, { direction: "row", spacing: "12px" }, /* @__PURE__ */ React.createElement(
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
        button: /* @__PURE__ */ React.createElement(import_system66.Stack, { onClick: () => setRemovalConfirmationDialogId(d.id) }, /* @__PURE__ */ React.createElement(X_default, { height: 16, width: 16 })),
        noExtras: true
      }
    )))) : /* @__PURE__ */ React.createElement(
      import_system66.Stack,
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
var import_react72 = require("react");
var import_lodash13 = __toESM(require("lodash"), 1);

// src/components/useColumnWidth.tsx
var import_react71 = require("react");
var import_usehooks_ts9 = require("usehooks-ts");
var MIN_COLUMN_WIDTH = 245;
var MAX_COLUMN_WIDTH = 402;
var IDEAL_COLUMN_WIDTH = 271;
var useColumnWidth = (idealWidth, minWidth, maxWidth) => {
  const [nColumns, setNColumns] = (0, import_react71.useState)(1);
  const { width } = (0, import_usehooks_ts9.useWindowSize)();
  const [columnsContainerRef, setColumnsContainerRef] = (0, import_react71.useState)(null);
  (0, import_react71.useEffect)(() => {
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
var import_react_router_dom9 = require("react-router-dom");
var import_usehooks_ts10 = require("usehooks-ts");
var SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD2 = 1134;
var FolderPageDesktopBody = (props) => {
  const { nColumns, setColumnsContainerRef } = useColumnWidth_default(400, 350, 510);
  const [columns, setColumns] = (0, import_react72.useState)([]);
  (0, import_react72.useEffect)(() => {
    const chunked = import_lodash13.default.chunk(props.contents, nColumns);
    setColumns(
      [...Array(nColumns).keys()].map(
        (i) => import_lodash13.default.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [nColumns, props.contents]);
  const navigate = (0, import_react_router_dom9.useNavigate)();
  const { width } = (0, import_usehooks_ts10.useWindowSize)();
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
    /* @__PURE__ */ React.createElement(import_system67.Stack, { pl: "48px", spacing: "24px", pb: "32px" }, /* @__PURE__ */ React.createElement(
      DevicesSection_default,
      {
        title: `${props.devices.length} ${props.devices.length === 1 ? "Device has" : "Devices have"} access to this Folder`,
        devices: props.devices,
        folderId: props.folderId,
        onAdd: props.setAddDeviceDialogOpen,
        onRemove: props.onRemoveDevice
      }
    ), /* @__PURE__ */ React.createElement(import_system67.Stack, { justifyContent: "center" }, /* @__PURE__ */ React.createElement(
      import_system67.Stack,
      {
        width: "100%",
        height: "1px",
        bgcolor: PALETTE.secondary.grey[2]
      }
    )), /* @__PURE__ */ React.createElement(
      import_system67.Stack,
      {
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      /* @__PURE__ */ React.createElement(Typography, { variant: "large", bold: true }, `${props.contents.length} item${props.contents.length === 1 ? "" : "s "} in this Folder`),
      /* @__PURE__ */ React.createElement(
        import_system67.Stack,
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
      import_system67.Stack,
      {
        direction: width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD2 ? "column" : "row",
        spacing: width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD2 ? "8px" : "24px"
      },
      ["link", "video", "channel"].map((c) => /* @__PURE__ */ React.createElement(
        import_system67.Stack,
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
      import_system67.Stack,
      {
        bgcolor: "rgb(255,255,255)",
        borderRadius: "12px",
        border: `1px solid ${PALETTE.secondary.grey[2]}`,
        p: "16px",
        boxSizing: "border-box"
      },
      /* @__PURE__ */ React.createElement(import_system67.Stack, { ref: setColumnsContainerRef, overflow: "hidden", flex: 1 }, props.contents.length > 0 ? /* @__PURE__ */ React.createElement(import_system67.Stack, { flex: 1, direction: "row", spacing: "20px" }, [
        ...columns.map((column, i) => /* @__PURE__ */ React.createElement(import_system67.Stack, { key: i, flex: 1, spacing: "20px", overflow: "hidden" }, column.map((x, j) => /* @__PURE__ */ React.createElement(import_system67.Stack, { key: `${x.content.id}${x.type}` }, /* @__PURE__ */ React.createElement(UrsorFadeIn, { delay: j * 150 + i * 80, duration: 800 }, x.type === "link" ? /* @__PURE__ */ React.createElement(
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
        import_system67.Stack,
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
        /* @__PURE__ */ React.createElement(import_system67.Stack, { width: "444px" }, /* @__PURE__ */ React.createElement(
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
var import_system68 = require("@mui/system");
var import_react73 = require("react");
var import_lodash14 = __toESM(require("lodash"), 1);
var INPUT_PHRASE = "delete";
var DeletionDialog = (props) => {
  const [inputValue, setInputValue] = (0, import_react73.useState)("");
  const notificationCtx = (0, import_react73.useContext)(NotificationContext_default);
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
      import_system68.Stack,
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
          label: `Type "${INPUT_PHRASE}" to delete this ${import_lodash14.default.capitalize(
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
      /* @__PURE__ */ React.createElement(import_system68.Stack, { spacing: "8px", width: "100%" }, /* @__PURE__ */ React.createElement(
        UrsorButton,
        {
          dark: true,
          variant: "tertiary",
          width: "100%",
          disabled: !props.noConfirmation && inputValue !== INPUT_PHRASE,
          onClick: () => {
            props.onSubmit();
            notificationCtx.negativeSuccess(
              `Deleted ${import_lodash14.default.capitalize(props.type)}`
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
var import_react74 = require("react");
var import_react75 = require("react");
var useDeviceOnlineStatus = (devices) => {
  const { user } = useAuth_default();
  const [cuttingEdgeOnlineStatusDevices, setCuttingEdgeOnlineStatusDevices] = (0, import_react74.useState)([]);
  (0, import_react74.useEffect)(() => setCuttingEdgeOnlineStatusDevices(devices), [devices.length]);
  const setDeviceOnlineStatus = (0, import_react75.useCallback)(
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
  (0, import_react74.useEffect)(() => {
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
  const navigate = (0, import_react_router_dom10.useNavigate)();
  const { user } = useAuth_default();
  const [devices, setDevices] = (0, import_react76.useState)([]);
  const loadDevices = (0, import_react76.useCallback)(
    () => api_default.getFolderDevices(props.folderId).then((d) => setDevices(d)),
    [props.folderId]
  );
  (0, import_react76.useEffect)(() => {
    loadDevices();
  }, [loadDevices]);
  const cuttingEdgeOnlineStatusDevices = useDeviceOnlineStatus_default(devices);
  const { folder, contents, loadFolderAndContents } = useLoadFolderAndContents_default(
    props.folderId
  );
  const [searchValue, setSearchValue] = (0, import_react76.useState)("");
  const [selectedContentType, setSelectedContentType] = (0, import_react76.useState)("all");
  const [filteredContents, setFilteredContents] = (0, import_react76.useState)([]);
  (0, import_react76.useEffect)(
    () => setFilteredContents(
      (0, import_lodash15.default)(contents).filter(
        (c) => selectedContentType === "all" || c.type === selectedContentType
      ).filter(
        (c) => !searchValue || c.content.title.toLowerCase().includes(searchValue.toLowerCase())
      ).reverse().value()
    ),
    [searchValue, selectedContentType, contents]
  );
  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = (0, import_react76.useState)(false);
  const [contentCreationDialogOpen, setContentCreationDialogOpen] = (0, import_react76.useState)();
  const [allFolders, setFolders] = (0, import_react76.useState)([]);
  (0, import_react76.useEffect)(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupFolders(user.group_id).then(setFolders);
  }, [user == null ? void 0 : user.group_id]);
  const [folderRenameDialogOpen, setFolderRenameDialogOpen] = (0, import_react76.useState)(false);
  const notificationCtx = (0, import_react76.useContext)(NotificationContext_default);
  const [linkEditingDialogId, setLinkEditingDialogId] = (0, import_react76.useState)(void 0);
  const [videoEditingDialogId, setVideoEditingDialogId] = (0, import_react76.useState)(void 0);
  const [channelEditingDialogId, setChannelEditingDialogId] = (0, import_react76.useState)(void 0);
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
  const [deletionDialogOpen, setDeletionDialogOpen] = (0, import_react76.useState)(false);
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
  return /* @__PURE__ */ import_react76.default.createElement(import_react76.default.Fragment, null, props.isMobile ? /* @__PURE__ */ import_react76.default.createElement(
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
  ) : /* @__PURE__ */ import_react76.default.createElement(
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
  ), devices ? /* @__PURE__ */ import_react76.default.createElement(
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
  ) : null, /* @__PURE__ */ import_react76.default.createElement(
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
  ), contentCreationDialogOpen ? contentCreationDialogOpen === "video" ? /* @__PURE__ */ import_react76.default.createElement(
    VideoCreationDialog_default,
    {
      open: true,
      onClose: () => {
        setContentCreationDialogOpen(void 0);
      },
      folderId: props.folderId,
      creationCallback: loadFolderAndContents
    }
  ) : contentCreationDialogOpen === "link" ? /* @__PURE__ */ import_react76.default.createElement(
    "aCreationDialog",
    {
      open: true,
      onClose: () => {
        setContentCreationDialogOpen(void 0);
      },
      folderId: props.folderId,
      creationCallback: loadFolderAndContents
    }
  ) : contentCreationDialogOpen === "channel" ? /* @__PURE__ */ import_react76.default.createElement(
    ChannelCreationDialog_default,
    {
      open: true,
      onClose: () => {
        setContentCreationDialogOpen(void 0);
      },
      folderId: props.folderId,
      creationCallback: loadFolderAndContents
    }
  ) : null : null, linkEditingDialogId && contents ? /* @__PURE__ */ import_react76.default.createElement(
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
  ) : null, videoEditingDialogId && contents ? /* @__PURE__ */ import_react76.default.createElement(
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
  ) : null, channelEditingDialogId && contents ? /* @__PURE__ */ import_react76.default.createElement(
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
  ) : null, /* @__PURE__ */ import_react76.default.createElement(
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
var import_lodash16 = __toESM(require("lodash"), 1);
var import_react77 = require("react");
var CONTENT_DISPLAY_NAMES = {
  video: "Video",
  channel: "Channel",
  link: "Link"
};
var ContentCardCore = (props) => {
  const Icon = CONTENT_BRANDING[props.type].icon;
  return /* @__PURE__ */ React.createElement(
    import_system69.Stack,
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
      import_system69.Stack,
      {
        width: "calc(100% - 24px)",
        minHeight: props.twoLineTitleSectionHeight ? "44px" : "24px"
      },
      /* @__PURE__ */ React.createElement(Typography, { bold: true, maxLines: 2 }, props.title)
    ),
    /* @__PURE__ */ React.createElement(
      import_system69.Stack,
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
  const [deletionDialogOpen, setDeletionDialogOpen] = (0, import_react77.useState)(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    import_system69.Stack,
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
    /* @__PURE__ */ React.createElement(import_system69.Stack, { position: "absolute", right: "2px", bottom: "32px" }, !props.noMenu ? /* @__PURE__ */ React.createElement(
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
      subtitle: `Are you sure that you want to get rid of this ${import_lodash16.default.capitalize(
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
      import_system70.Stack,
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
      ) : /* @__PURE__ */ React.createElement(import_system70.Stack, { flex: 1, bgcolor: PALETTE.secondary.grey[2] }),
      /* @__PURE__ */ React.createElement(
        import_system70.Stack,
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
var import_system71 = require("@mui/system");
var EmptyStateIllustration = (props) => /* @__PURE__ */ React.createElement(
  import_system71.Stack,
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
  /* @__PURE__ */ React.createElement(UrsorFadeIn, { delay: 500, duration: 800 }, /* @__PURE__ */ React.createElement(import_system71.Stack, { position: "relative" }, /* @__PURE__ */ React.createElement(import_system71.Stack, { sx: { opacity: 0.3 } }, /* @__PURE__ */ React.createElement(
    "img",
    {
      height: 217,
      width: 217,
      src: "https://ursorassets.s3.eu-west-1.amazonaws.com/wondering_.png",
      alt: "Empty state illustration"
    }
  )), /* @__PURE__ */ React.createElement(
    import_system71.Stack,
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
  return /* @__PURE__ */ import_react78.default.createElement(
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
    props.videos.length > 0 ? /* @__PURE__ */ import_react78.default.createElement(import_system72.Stack, { pt: "20px", pb: "33px", pl: "51px" }, /* @__PURE__ */ import_react78.default.createElement(DynamicCardGrid_default, { cardWidth: "292px", rowGap: "40px", columnGap: "20px" }, props.videos.map((v, i) => /* @__PURE__ */ import_react78.default.createElement(UrsorFadeIn, { key: v.id, duration: 800, delay: i * 90 }, /* @__PURE__ */ import_react78.default.createElement(
      VideoCard_default,
      {
        ...v,
        onDelete: props.onUpdate,
        onOpenEditingDialog: () => props.setVideoEditingDialogId(v.id),
        twoLineTitleSectionHeight: true
      }
    ))))) : /* @__PURE__ */ import_react78.default.createElement(EmptyStateIllustration_default, { paddingTop: 20 }, "No Videos in this Channel")
  );
};
var body_desktop_default3 = ChannelPageDesktopBody;

// src/channel/components/ChannelRenameDialog.tsx
var import_react79 = __toESM(require("react"), 1);
var import_system73 = require("@mui/system");
var import_react80 = require("react");
var ChannelRenameDialog = (props) => {
  const [name, setName] = (0, import_react80.useState)("");
  (0, import_react80.useEffect)(() => setName(props.name), [props.name]);
  return /* @__PURE__ */ import_react79.default.createElement(
    UrsorDialog,
    {
      open: props.open,
      onCloseCallback: props.onClose,
      title: "Rename Channel",
      width: "422px",
      height: "226px",
      isMobile: props.isMobile
    },
    /* @__PURE__ */ import_react79.default.createElement(import_system73.Stack, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ import_react79.default.createElement(LabeledInputField, { label: "Name" }, /* @__PURE__ */ import_react79.default.createElement(
      UrsorInputField,
      {
        value: name,
        onChange: (event) => setName(event.target.value),
        placeholder: "Choose a new name",
        width: "100%",
        leftAlign: true
      }
    )), /* @__PURE__ */ import_react79.default.createElement(
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
var import_react81 = __toESM(require("react"), 1);
var import_react_router_dom11 = require("react-router-dom");
var import_system74 = require("@mui/system");
var ChannelPageMobileBody = (props) => {
  const navigate = (0, import_react_router_dom11.useNavigate)();
  return /* @__PURE__ */ import_react81.default.createElement(
    MobilePageLayout_default,
    {
      titleRow: props.titleRow.slice(-1)[0],
      titleBackButtonCallback: props.onBack,
      selectedPage: "content",
      actions: props.actions
    },
    props.videos.length > 0 ? /* @__PURE__ */ import_react81.default.createElement(import_system74.Stack, { pb: "33px" }, /* @__PURE__ */ import_react81.default.createElement(import_system74.Stack, { spacing: "20px" }, props.videos.map((v, i) => /* @__PURE__ */ import_react81.default.createElement(UrsorFadeIn, { key: v.id, duration: 800, delay: i * 90 }, /* @__PURE__ */ import_react81.default.createElement(
      VideoCard_default,
      {
        ...v,
        onDelete: props.onUpdate,
        onOpenEditingDialog: () => props.setVideoEditingDialogId(v.id),
        twoLineTitleSectionHeight: true
      }
    ))))) : /* @__PURE__ */ import_react81.default.createElement(EmptyStateIllustration_default, { paddingTop: 20 }, "No Videos in this Channel")
  );
};
var body_mobile_default3 = ChannelPageMobileBody;

// src/channel/contents/common.tsx
var ChannelPage = (props) => {
  const navigate = (0, import_react_router_dom12.useNavigate)();
  const [title, setTitle] = (0, import_react83.useState)("");
  const [folderId, setFolderId] = (0, import_react83.useState)();
  const [videos, setVideos] = (0, import_react83.useState)([]);
  const load = (0, import_react83.useCallback)(
    () => api_default.getChannel(props.id).then((c) => {
      setTitle(c.title);
      setFolderId(c.contentBucketId);
      setVideos(c.videos);
    }),
    [props.id]
  );
  (0, import_react82.useEffect)(() => {
    load();
  }, [load]);
  const [folder, setFolder] = (0, import_react83.useState)();
  (0, import_react82.useEffect)(() => {
    folderId && api_default.getFolder(folderId).then(setFolder);
  }, [folderId]);
  const [videoEditingDialogId, setVideoEditingDialogId] = (0, import_react83.useState)();
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
  const [deletionDialogOpen, setDeletionDialogOpen] = (0, import_react83.useState)(false);
  const [renameDialogOpen, setRenameDialogOpen] = (0, import_react83.useState)(false);
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
  const notificationCtx = (0, import_react82.useContext)(NotificationContext_default);
  const deleteChannel = () => api_default.deleteChannel(props.id).then(
    () => navigate(folderId ? `/folders/${folderId}` : "/folders")
  );
  return /* @__PURE__ */ import_react82.default.createElement(import_react82.default.Fragment, null, props.isMobile ? /* @__PURE__ */ import_react82.default.createElement(
    body_mobile_default3,
    {
      videos,
      onUpdate: load,
      titleRow,
      setVideoEditingDialogId,
      actions,
      onBack: () => navigate(folderId ? `/folders/${folderId}` : "/folders")
    }
  ) : /* @__PURE__ */ import_react82.default.createElement(
    body_desktop_default3,
    {
      videos,
      onUpdate: load,
      titleRow,
      setVideoEditingDialogId,
      actions,
      onBack: () => navigate(folderId ? `/folders/${folderId}` : "/folders")
    }
  ), videoEditingDialogId && folderId ? /* @__PURE__ */ import_react82.default.createElement(
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
  ) : null, /* @__PURE__ */ import_react82.default.createElement(
    DeletionDialog_default,
    {
      open: deletionDialogOpen,
      type: "channel",
      onClose: () => setDeletionDialogOpen(false),
      subtitle: "If you remove this Channel, all of its Videos too will be deleted.",
      onSubmit: deleteChannel,
      isMobile: props.isMobile
    }
  ), /* @__PURE__ */ import_react82.default.createElement(
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
  return /* @__PURE__ */ import_react84.default.createElement(RootLayout, null, /* @__PURE__ */ import_react84.default.createElement(common_default2, { id: parseInt(params.id), isMobile: import_react_device_detect4.isMobile }));
};
var channel_default = Channel;

// src/filters/index.tsx
var import_react89 = __toESM(require("react"), 1);
var import_react_device_detect5 = require("react-device-detect");

// src/filters/contents/common.tsx
var import_react88 = require("react");

// src/filters/contents/body-desktop.tsx
var import_react85 = __toESM(require("react"), 1);
var import_system77 = require("@mui/system");
var import_react_router_dom13 = require("react-router-dom");

// src/filter/components/FilterCard.tsx
var import_system76 = require("@mui/system");

// src/images/icons/ListUnorderedIcon.svg
var ListUnorderedIcon_default = "./ListUnorderedIcon-XSAFOQHG.svg";

// src/images/icons/StopIcon.svg
var StopIcon_default = "./StopIcon-TEDRKAKM.svg";

// src/images/icons/LockIcon.svg
var LockIcon_default = "./LockIcon-IPAOEEA7.svg";

// src/filter/components/ProfileImageRow.tsx
var import_system75 = require("@mui/system");
var ProfileImageRow = (props) => /* @__PURE__ */ React.createElement(import_system75.Stack, { direction: "row", spacing: "4px", height: "42px" }, props.devices.length > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_system75.Stack, { direction: "row", spacing: "36px" }, props.devices.slice(0, 3).map((d, i) => /* @__PURE__ */ React.createElement(import_system75.Stack, { key: i, width: 0, position: "relative", overflow: "visible" }, /* @__PURE__ */ React.createElement(import_system75.Stack, { position: "absolute", bottom: 0, left: 0 }, /* @__PURE__ */ React.createElement(
  import_system75.Stack,
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
  import_system75.Stack,
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
) : null) : /* @__PURE__ */ React.createElement(import_system75.Stack, { direction: "row", spacing: "6px", height: "42px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
  import_system75.Stack,
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
  import_system76.Stack,
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
  /* @__PURE__ */ React.createElement(import_system76.Stack, { spacing: "12px" }, /* @__PURE__ */ React.createElement(import_system76.Stack, { direction: "row", spacing: "4px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Typography, { bold: true, variant: props.isMobile ? "medium" : "h5" }, props.title), /* @__PURE__ */ React.createElement(VerifiedIcon_default, { height: "20px", width: "20px" })), /* @__PURE__ */ React.createElement(Typography, { variant: "small", bold: true, color: PALETTE.secondary.grey[4] }, /* @__PURE__ */ React.createElement(
    import_system76.Stack,
    {
      spacing: "4px",
      sx: { svg: { path: { fill: PALETTE.secondary.grey[4] } } }
    },
    /* @__PURE__ */ React.createElement(import_system76.Stack, { spacing: "4px", direction: "row", alignItems: "center" }, /* @__PURE__ */ React.createElement(ListUnorderedIcon_default, { width: "12px", height: "12px" }), /* @__PURE__ */ React.createElement("div", null, `${props.whitelistedCategories ?? 0} ${props.whitelistedCategories === 1 ? "Category" : "Categories"} allowed`)),
    /* @__PURE__ */ React.createElement(import_system76.Stack, { spacing: "4px", direction: "row", alignItems: "center" }, /* @__PURE__ */ React.createElement(StopIcon_default, { width: "12px", height: "12px" }), /* @__PURE__ */ React.createElement("div", null, `${props.blacklistedWords ?? 0} blocked ${props.blacklistedWords === 1 ? "word" : "words"}`))
  ))),
  /* @__PURE__ */ React.createElement(
    import_system76.Stack,
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
  const navigate = (0, import_react_router_dom13.useNavigate)();
  return /* @__PURE__ */ import_react85.default.createElement(
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
    /* @__PURE__ */ import_react85.default.createElement(import_system77.Stack, { pl: "50px" }, /* @__PURE__ */ import_react85.default.createElement(DynamicCardGrid_default, { cardWidth: "350px", rowGap: "20px", columnGap: "20px" }, props.filters.map((f, i) => /* @__PURE__ */ import_react85.default.createElement(
      import_system77.Stack,
      {
        key: f.id,
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.6 }
        },
        onClick: () => navigate(`/filters/${f.id}`)
      },
      /* @__PURE__ */ import_react85.default.createElement(UrsorFadeIn, { duration: 800, delay: i * 150 }, /* @__PURE__ */ import_react85.default.createElement(FilterCard_default, { ...f }))
    ))))
  );
}

// src/filters/contents/body-mobile.tsx
var import_react86 = __toESM(require("react"), 1);
var import_system78 = require("@mui/system");
var import_react_router_dom14 = require("react-router-dom");
function AllFiltersPageMobileBody(props) {
  const navigate = (0, import_react_router_dom14.useNavigate)();
  return /* @__PURE__ */ import_react86.default.createElement(
    MobilePageLayout_default,
    {
      title: "My Filters",
      info: INFOS.filters,
      selectedPage: "filters",
      topRightElement: /* @__PURE__ */ import_react86.default.createElement(
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
    /* @__PURE__ */ import_react86.default.createElement(DynamicCardGrid_default, { cardWidth: "350px", rowGap: "20px", columnGap: "20px" }, props.filters.map((f, i) => /* @__PURE__ */ import_react86.default.createElement(
      import_system78.Stack,
      {
        key: f.id,
        sx: {
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.6 }
        },
        onClick: () => navigate(`/filters/${f.id}`)
      },
      /* @__PURE__ */ import_react86.default.createElement(UrsorFadeIn, { duration: 800, delay: i * 150 }, /* @__PURE__ */ import_react86.default.createElement(FilterCard_default, { ...f, isMobile: true }))
    )))
  );
}

// src/filters/contents/common.tsx
var import_react_router_dom15 = require("react-router-dom");

// src/filter/components/FilterCreationDialog.tsx
var import_system79 = require("@mui/system");
var import_react87 = require("react");
var FilterCreationDialog = (props) => {
  const [name, setName] = (0, import_react87.useState)("");
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
      import_system79.Stack,
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
var import_lodash17 = __toESM(require("lodash"), 1);
var AllFiltersPage = (props) => {
  const { user } = useAuth_default();
  const [filters, setFilters] = (0, import_react88.useState)([]);
  (0, import_react88.useEffect)(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupFilters(user.group_id).then(
      (filtahs) => setFilters(import_lodash17.default.sortBy(filtahs, (f) => f.id))
    );
  }, [user == null ? void 0 : user.group_id]);
  const [filterCreationDialogOpen, setFilterCreationDialogOpen] = (0, import_react88.useState)(false);
  const navigate = (0, import_react_router_dom15.useNavigate)();
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
  return /* @__PURE__ */ import_react89.default.createElement(RootLayout, null, /* @__PURE__ */ import_react89.default.createElement(common_default3, { isMobile: import_react_device_detect5.isMobile }));
};
var filters_default = Filter;

// src/filter/index.tsx
var import_react103 = __toESM(require("react"), 1);
var import_react_device_detect6 = require("react-device-detect");

// src/filter/contents/common.tsx
var import_react102 = __toESM(require("react"), 1);

// src/filter/contents/body-desktop.tsx
var import_react95 = __toESM(require("react"), 1);
var import_system87 = require("@mui/system");

// src/images/icons/ThumbsUpIcon.svg
var ThumbsUpIcon_default = "./ThumbsUpIcon-KOAYIHKO.svg";

// src/filter/components/CategoriesSection.tsx
var import_system80 = require("@mui/system");
var import_react90 = require("react");
var FilterLegend = (props) => /* @__PURE__ */ React.createElement(import_system80.Stack, { direction: "row", spacing: "20px" }, /* @__PURE__ */ React.createElement(import_system80.Stack, null, /* @__PURE__ */ React.createElement(
  import_system80.Stack,
  {
    direction: "row",
    alignItems: "center",
    spacing: props.small ? "7px" : "10px"
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: props.small ? "small" : "normal", bold: true }, "Allowed"),
  /* @__PURE__ */ React.createElement(
    import_system80.Stack,
    {
      height: props.small ? "12px" : "16px",
      width: props.small ? "12px" : "16px",
      borderRadius: "100%",
      bgcolor: PALETTE.system.green
    }
  )
)), /* @__PURE__ */ React.createElement(import_system80.Stack, null, /* @__PURE__ */ React.createElement(
  import_system80.Stack,
  {
    direction: "row",
    alignItems: "center",
    spacing: props.small ? "7px" : "10px"
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: props.small ? "small" : "normal", bold: true }, "Blocked"),
  /* @__PURE__ */ React.createElement(
    import_system80.Stack,
    {
      height: props.small ? "12px" : "16px",
      width: props.small ? "12px" : "16px",
      borderRadius: "100%",
      bgcolor: PALETTE.secondary.grey[3]
    }
  )
)), /* @__PURE__ */ React.createElement(import_system80.Stack, null, /* @__PURE__ */ React.createElement(
  import_system80.Stack,
  {
    direction: "row",
    alignItems: "center",
    spacing: props.small ? "7px" : "10px"
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: props.small ? "small" : "normal", bold: true }, "Custom"),
  /* @__PURE__ */ React.createElement(
    import_system80.Stack,
    {
      height: props.small ? "12px" : "16px",
      width: props.small ? "12px" : "16px",
      borderRadius: "100%",
      bgcolor: PALETTE.system.orange
    }
  )
)));
var CategoryCard = (props) => {
  const [collapsed, setCollapsed] = (0, import_react90.useState)(true);
  const [status, setStatus] = (0, import_react90.useState)("off");
  (0, import_react90.useEffect)(
    () => setStatus(
      props.subCategories.every((c) => props.allowedCategories.includes(c.id)) ? "on" : props.subCategories.some(
        (c) => props.allowedCategories.includes(c.id)
      ) ? "custom" : "off"
    ),
    [props.subCategories, props.allowedCategories]
  );
  const [nAllowedCategories, setNAllowedCategories] = (0, import_react90.useState)(0);
  (0, import_react90.useEffect)(() => {
    setNAllowedCategories(
      props.subCategories.filter(
        (sc) => props.allowedCategories.includes(sc.id)
      ).length ?? 0
    );
  }, [props.allowedCategories]);
  return /* @__PURE__ */ React.createElement(AstroCard_default, { key: props.categoryId }, /* @__PURE__ */ React.createElement(DynamicContainer, { duration: 600 }, /* @__PURE__ */ React.createElement(import_system80.Stack, { p: "16px", spacing: "16px" }, /* @__PURE__ */ React.createElement(
    import_system80.Stack,
    {
      direction: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    /* @__PURE__ */ React.createElement(import_system80.Stack, null, /* @__PURE__ */ React.createElement(Typography, { bold: true }, props.title), /* @__PURE__ */ React.createElement(
      Typography,
      {
        bold: true,
        variant: "small",
        color: PALETTE.secondary.grey[3]
      },
      `${nAllowedCategories} ${nAllowedCategories === 1 ? "Category" : "Categories"} allowed`
    )),
    /* @__PURE__ */ React.createElement(import_system80.Stack, { direction: "row", spacing: "20px" }, /* @__PURE__ */ React.createElement(
      import_system80.Stack,
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
      import_system80.Stack,
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
    import_system80.Stack,
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
    /* @__PURE__ */ React.createElement(import_system80.Stack, { justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(import_system80.Stack, { spacing: "16px", alignItems: "center", direction: "row" }, /* @__PURE__ */ React.createElement(Typography, { maxLines: 1, bold: true }, sc.title))),
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
  /* @__PURE__ */ React.createElement(import_system80.Stack, { spacing: "20px" }, props.categories.map((cg) => /* @__PURE__ */ React.createElement(
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
var import_system82 = require("@mui/system");
var import_dayjs9 = __toESM(require("dayjs"), 1);
var import_react91 = require("react");
var import_lodash18 = __toESM(require("lodash"), 1);

// src/filter/components/FilterWhitelistExceptionDialog.tsx
var import_system81 = require("@mui/system");
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
    /* @__PURE__ */ React.createElement(import_system81.Stack, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(
      import_system81.Stack,
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
        return /* @__PURE__ */ React.createElement(import_system82.Stack, { minWidth: "20px", borderRadius: "100%", overflow: "hidden" }, /* @__PURE__ */ React.createElement(
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
        itemDisplay: (createdAt) => (0, import_dayjs9.default)(createdAt).format("MM/DD/YYYY")
      }
    ]
  ];
  const [rows, setRows] = (0, import_react91.useState)([]);
  (0, import_react91.useEffect)(() => {
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
  const [sortedRows, setSortedRows] = (0, import_react91.useState)([]);
  const [filteredRows, setFilteredRows] = (0, import_react91.useState)([]);
  const [inputValue, setInputValue] = (0, import_react91.useState)("");
  (0, import_react91.useEffect)(() => {
    setFilteredRows(
      rows.filter(
        (row) => inputValue ? [row.items.title, row.items.domain.replace("www.", "")].join("_").toLowerCase().includes(inputValue.toLowerCase()) : true
      )
    );
  }, [rows, inputValue]);
  const [sortedColumn, setSortedColumn] = (0, import_react91.useState)("createdAt");
  const [sortDirection, setSortDirection] = (0, import_react91.useState)("desc");
  (0, import_react91.useEffect)(() => {
    if (!filteredRows) return;
    const sorted = import_lodash18.default.sortBy(
      rows,
      (row) => {
        var _a, _b;
        return (
          //@ts-ignore
          (_b = (_a = row.items) == null ? void 0 : _a[sortedColumn]) == null ? void 0 : _b.toLowerCase()
        );
      }
    );
    setSortedRows(sortDirection === "asc" ? import_lodash18.default.reverse(sorted.slice()) : sorted);
  }, [rows, sortDirection, sortedColumn]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = (0, import_react91.useState)(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      icon: ThumbsUpIcon_default,
      title: `${props.allowedSites.length ?? 0} allowed site exception${props.allowedSites.length === 1 ? "" : "s "}`,
      subtitle: "Add sites here that you always want to be accessible. Even if you block their corresponding Category. Be careful this overrides the Filter!",
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(import_system82.Stack, { spacing: "20px" }, /* @__PURE__ */ React.createElement(
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
var import_system84 = require("@mui/system");
var import_dayjs10 = __toESM(require("dayjs"), 1);
var import_react92 = require("react");
var import_lodash19 = __toESM(require("lodash"), 1);

// src/filter/components/FilterBlacklistExceptionDialog.tsx
var import_system83 = require("@mui/system");
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
    /* @__PURE__ */ React.createElement(import_system83.Stack, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(
      import_system83.Stack,
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
        return /* @__PURE__ */ React.createElement(import_system84.Stack, { minWidth: "20px", borderRadius: "100%", overflow: "hidden" }, /* @__PURE__ */ React.createElement(
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
      itemDisplay: (createdAt) => (0, import_dayjs10.default)(createdAt).format("MM/DD/YYYY")
    }
  ];
  const [rows, setRows] = (0, import_react92.useState)([]);
  (0, import_react92.useEffect)(() => {
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
  const [sortedRows, setSortedRows] = (0, import_react92.useState)([]);
  const [filteredRows, setFilteredRows] = (0, import_react92.useState)([]);
  const [inputValue, setInputValue] = (0, import_react92.useState)("");
  (0, import_react92.useEffect)(() => {
    setFilteredRows(
      rows.filter(
        (row) => inputValue ? [row.items.title, row.items.domain.replace("www.", "")].join("_").toLowerCase().includes(inputValue.toLowerCase()) : true
      )
    );
  }, [rows, inputValue]);
  const [sortedColumn, setSortedColumn] = (0, import_react92.useState)("createdAt");
  const [sortDirection, setSortDirection] = (0, import_react92.useState)("desc");
  (0, import_react92.useEffect)(() => {
    if (!filteredRows) return;
    const sorted = import_lodash19.default.sortBy(
      rows,
      (row) => {
        var _a, _b;
        return (
          //@ts-ignore
          (_b = (_a = row.items) == null ? void 0 : _a[sortedColumn]) == null ? void 0 : _b.toLowerCase()
        );
      }
    );
    setSortedRows(sortDirection === "asc" ? import_lodash19.default.reverse(sorted.slice()) : sorted);
  }, [rows, sortDirection, sortedColumn]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = (0, import_react92.useState)(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      icon: ThumbsDownIcon_default,
      title: `${props.blockedSites.length ?? 0} blocked site exception${props.blockedSites.length === 1 ? "" : "s"}`,
      subtitle: "Add sites here that you never want to be accessible. This will make sure the site isn't accessible even if the rest of the corresponding Category is!",
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(import_system84.Stack, { spacing: "20px" }, /* @__PURE__ */ React.createElement(
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
var import_system85 = require("@mui/system");
var import_react93 = require("react");
var import_material12 = require("@mui/material");
var BlockedWordTag = (props) => /* @__PURE__ */ React.createElement(
  import_system85.Stack,
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
    import_system85.Stack,
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
  const [inputValue, setInputValue] = (0, import_react93.useState)("");
  return /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      icon: StopIcon_default,
      iconColor: PALETTE.system.red,
      title: `${props.blockedSearchWords.length} blocked search word${props.blockedSearchWords.length === 1 ? "" : "s "}`,
      subtitle: "Enter words that you want to be blocked or flagged if they are entered in the search engine on the Device.",
      isMobile: props.isMobile
    },
    /* @__PURE__ */ React.createElement(import_system85.Stack, { spacing: "6px" }, /* @__PURE__ */ React.createElement(
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
    ), props.isMobile ? /* @__PURE__ */ React.createElement(import_material12.Grid, { container: true, gap: "6px" }, props.blockedSearchWords.map((bs, i) => /* @__PURE__ */ React.createElement(import_material12.Grid, { key: i, item: true }, /* @__PURE__ */ React.createElement(
      BlockedWordTag,
      {
        word: bs,
        onClick: () => props.removeWord(bs)
      }
    )))) : /* @__PURE__ */ React.createElement(import_system85.Stack, { direction: "row", spacing: "12px" }, props.blockedSearchWords.map((bs, i) => /* @__PURE__ */ React.createElement(
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
var import_system86 = require("@mui/system");
var import_react_router_dom16 = require("react-router-dom");
var import_react94 = require("react");
var FilterPageDevicesSection = (props) => {
  const navigate = (0, import_react_router_dom16.useNavigate)();
  const [hoveringOnButton, setHoveringOnButton] = (0, import_react94.useState)(false);
  const [devicesGridDialogOpen, setDevicesGridDialogOpen] = (0, import_react94.useState)(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: props.devices.length === 0 ? "No Devices yet have this Filter applied" : props.devices.length === 1 ? "Filter applied to this Device" : `Filter applied to these ${props.devices.length ?? 0} Devices`,
      info: INFOS.filterDevice,
      notCollapsible: true,
      topRightStuff: /* @__PURE__ */ React.createElement(import_system86.Stack, { direction: "row", spacing: "12px" }, /* @__PURE__ */ React.createElement(
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
      import_system86.Stack,
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
            import_system86.Stack,
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
      import_system86.Stack,
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
var import_react_router_dom17 = require("react-router-dom");
function FilterPageDesktopBody(props) {
  const navigate = (0, import_react_router_dom17.useNavigate)();
  return /* @__PURE__ */ import_react95.default.createElement(
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
    /* @__PURE__ */ import_react95.default.createElement(import_system87.Stack, { pl: "49px", pr: "2px", spacing: "20px", pb: "33px" }, /* @__PURE__ */ import_react95.default.createElement(
      FilterDevicesSection_default,
      {
        devices: props.devices,
        onAdd: props.setAddDeviceDialogOpen,
        onRemove: props.onRemoveDevice,
        openChangeFilterDialogForDevice: props.openChangeFilterDialogForDevice
      }
    ), /* @__PURE__ */ import_react95.default.createElement(
      CategoriesSection_default,
      {
        filter: props.filter,
        categories: props.categories,
        allowedCategories: props.allowedCategories,
        flipCategory: props.flipCategory,
        flipSubcategory: props.flipSubcategory
      }
    ), /* @__PURE__ */ import_react95.default.createElement(
      AllowedSitesSection_default,
      {
        allowedSites: props.allowedSites,
        add: props.addAllowedSite,
        delete: props.removeAllowedSite
      }
    ), /* @__PURE__ */ import_react95.default.createElement(
      BlockedSitesSection_default,
      {
        blockedSites: props.blockedSites,
        add: props.addBlockedSite,
        delete: props.removeBlockedSite
      }
    ), /* @__PURE__ */ import_react95.default.createElement(
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
var import_react_router_dom20 = require("react-router-dom");

// src/filter/contents/body-mobile.tsx
var import_react98 = __toESM(require("react"), 1);
var import_system90 = require("@mui/system");

// src/filter/components/MobileFilterDevicesSection.tsx
var import_react96 = __toESM(require("react"), 1);
var import_system88 = require("@mui/system");
var import_react_router_dom18 = require("react-router-dom");
var import_react97 = require("react");
var MobileFilterPageDevicesSection = (props) => {
  const navigate = (0, import_react_router_dom18.useNavigate)();
  const [hoveringOnButton, setHoveringOnButton] = (0, import_react97.useState)(false);
  const [devicesGridDialogOpen, setDevicesGridDialogOpen] = (0, import_react97.useState)(false);
  return /* @__PURE__ */ import_react96.default.createElement(import_react96.default.Fragment, null, /* @__PURE__ */ import_react96.default.createElement(
    AstroBentoCard,
    {
      title: props.devices.length === 0 ? "No Devices yet have this Filter applied" : props.devices.length === 1 ? "Filter applied to this Device" : `Filter applied to these ${props.devices.length ?? 0} Devices`,
      info: INFOS.filterDevice,
      isMobile: true,
      notCollapsible: true
    },
    props.devices.length > 0 ? /* @__PURE__ */ import_react96.default.createElement(DynamicCardGrid_default, { cardWidth: "150px", rowGap: "12px", columnGap: "12px" }, props.devices.map((d, i) => /* @__PURE__ */ import_react96.default.createElement(UrsorFadeIn, { key: i, duration: 800, delay: i * 150 }, /* @__PURE__ */ import_react96.default.createElement(
      import_system88.Stack,
      {
        sx: {
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
          transition: "0.2s"
        }
      },
      /* @__PURE__ */ import_react96.default.createElement(
        MobileDeviceCard_default,
        {
          ...d,
          button: /* @__PURE__ */ import_react96.default.createElement(
            import_system88.Stack,
            {
              onClick: () => props.openChangeFilterDialogForDevice(d)
            },
            /* @__PURE__ */ import_react96.default.createElement(X_default, { height: 16, width: 16 })
          ),
          noExtras: true,
          onClick: () => navigate(`/profiles/${d.id}`)
        }
      )
    )))) : /* @__PURE__ */ import_react96.default.createElement(
      import_system88.Stack,
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
      /* @__PURE__ */ import_react96.default.createElement(PlusIcon_default, { height: "32px", width: "32px" }),
      /* @__PURE__ */ import_react96.default.createElement(
        Typography,
        {
          bold: true,
          color: PALETTE.secondary.grey[hoveringOnButton ? 4 : 3]
        },
        "Add a Device"
      )
    ),
    /* @__PURE__ */ import_react96.default.createElement(import_system88.Stack, { direction: "row", spacing: "12px", pt: "14px" }, /* @__PURE__ */ import_react96.default.createElement(
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
    ), /* @__PURE__ */ import_react96.default.createElement(
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
  ), /* @__PURE__ */ import_react96.default.createElement(
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
var import_system89 = require("@mui/system");
var MobileFilterPageCategoriesSection = (props) => /* @__PURE__ */ React.createElement(
  AstroBentoCard,
  {
    icon: ThumbsUpIcon_default,
    title: `${props.allowedCategories.length} allowed ${props.allowedCategories.length === 1 ? "Category" : "Categories"}`,
    subtitle: "Turn the switch on to allow the Category to be browsed on the assigned Devices.",
    isMobile: true
  },
  /* @__PURE__ */ React.createElement(import_system89.Stack, { spacing: "10px" }, /* @__PURE__ */ React.createElement(import_system89.Stack, { alignItems: "flex-end" }, /* @__PURE__ */ React.createElement(FilterLegend, { small: true })), props.categories.map((c, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: c.categoryId, duration: 800, delay: i * 80 }, /* @__PURE__ */ React.createElement(
    import_system89.Stack,
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
    /* @__PURE__ */ React.createElement(import_system89.Stack, { justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(import_system89.Stack, { spacing: "16px", alignItems: "center", direction: "row" }, /* @__PURE__ */ React.createElement(Typography, { maxLines: 1, bold: true }, c.title))),
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
var import_react_router_dom19 = require("react-router-dom");
function FilterPageMobileBody(props) {
  const navigate = (0, import_react_router_dom19.useNavigate)();
  return /* @__PURE__ */ import_react98.default.createElement(
    MobilePageLayout_default,
    {
      actions: props.actions,
      titleRow: props.titleRow.slice(-1)[0],
      titleBackButtonCallback: () => navigate("/filters"),
      selectedPage: "filters"
    },
    /* @__PURE__ */ import_react98.default.createElement(import_system90.Stack, { spacing: "20px", pb: "33px" }, /* @__PURE__ */ import_react98.default.createElement(
      MobileFilterDevicesSection_default,
      {
        devices: props.devices,
        onAdd: props.setAddDeviceDialogOpen,
        openChangeFilterDialogForDevice: props.openChangeFilterDialogForDevice
      }
    ), /* @__PURE__ */ import_react98.default.createElement(
      MobileCategoriesSection_default,
      {
        filter: props.filter,
        categories: props.categories,
        allowedCategories: props.allowedCategories,
        flipCategory: props.flipCategory,
        flipSubcategory: props.flipSubcategory
      }
    ), /* @__PURE__ */ import_react98.default.createElement(
      AllowedSitesSection_default,
      {
        allowedSites: props.allowedSites,
        add: props.addAllowedSite,
        delete: props.removeAllowedSite,
        isMobile: true
      }
    ), /* @__PURE__ */ import_react98.default.createElement(
      BlockedSitesSection_default,
      {
        blockedSites: props.blockedSites,
        add: props.addBlockedSite,
        delete: props.removeBlockedSite,
        isMobile: true
      }
    ), /* @__PURE__ */ import_react98.default.createElement(
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
var import_system91 = require("@mui/system");
var import_react99 = require("react");
var FilterRenameDialog = (props) => {
  const [name, setName] = (0, import_react99.useState)("");
  (0, import_react99.useEffect)(() => setName(props.name), [props.name]);
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
    /* @__PURE__ */ React.createElement(import_system91.Stack, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(LabeledInputField, { label: "Name" }, /* @__PURE__ */ React.createElement(
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
var import_react100 = __toESM(require("react"), 1);
var import_system92 = require("@mui/system");
var import_react101 = require("react");
var ChangeFilterDialog = (props) => {
  const [allFilters, setAllFilters] = (0, import_react101.useState)([]);
  (0, import_react101.useEffect)(() => {
    api_default.getGroupFilters(props.groupId).then((d) => setAllFilters(d));
  }, [props.groupId]);
  return /* @__PURE__ */ import_react100.default.createElement(
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
    /* @__PURE__ */ import_react100.default.createElement(import_system92.Stack, { pt: "16px", spacing: "16px", width: "100%" }, allFilters.filter((f) => f.id !== props.currentFilterId).map((f) => /* @__PURE__ */ import_react100.default.createElement(
      import_system92.Stack,
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
      /* @__PURE__ */ import_react100.default.createElement(FilterIcon_default, { height: "16px", width: "16px" }),
      /* @__PURE__ */ import_react100.default.createElement(Typography, { maxLines: 1, bold: true }, f.title)
    )))
  );
};
var ChangeFilterDialog_default = ChangeFilterDialog;

// src/filter/contents/common.tsx
var import_system93 = require("@mui/system");
var import_lodash20 = __toESM(require("lodash"), 1);
function FilterPage(props) {
  const { user } = useAuth_default();
  const [filter, setFilter] = (0, import_react102.useState)();
  const loadFilter = (0, import_react102.useCallback)(
    () => api_default.getFilter(props.filterId).then(setFilter),
    [props.filterId]
  );
  (0, import_react102.useEffect)(() => {
    loadFilter();
  }, [loadFilter]);
  const [blockedSites, setBlockedSites] = (0, import_react102.useState)([]);
  const loadBlockedSites = (0, import_react102.useCallback)(
    () => api_default.getBlockedSites(props.filterId).then(setBlockedSites),
    [props.filterId]
  );
  (0, import_react102.useEffect)(() => {
    loadBlockedSites();
  }, [loadBlockedSites]);
  const [allowedSites, setAllowedSites] = (0, import_react102.useState)([]);
  const loadAllowedSites = (0, import_react102.useCallback)(
    () => api_default.getAllowedSites(props.filterId).then(setAllowedSites),
    [props.filterId]
  );
  (0, import_react102.useEffect)(() => {
    loadAllowedSites();
  }, [loadAllowedSites]);
  const [categories, setCategories] = (0, import_react102.useState)([]);
  (0, import_react102.useEffect)(() => {
    api_default.getAllFilterCategories().then(setCategories);
  }, []);
  const [allowedSubcategories, setAllowedSubcategories] = (0, import_react102.useState)([]);
  (0, import_react102.useEffect)(() => {
    api_default.getFilterCategories(props.filterId).then(
      (response) => setAllowedSubcategories(response.map((x) => x.categoryId))
    );
  }, [props.filterId]);
  const [blockedSearchWords, setBlockedSearchWords] = (0, import_react102.useState)([]);
  (0, import_react102.useEffect)(() => {
    api_default.getBlockedSearchWords(props.filterId).then(
      setBlockedSearchWords
    );
  }, [props.filterId]);
  const [exceptionDialogOpen, setExceptionDialogOpen] = (0, import_react102.useState)(false);
  const [renameDialogOpen, setRenameDialogOpen] = (0, import_react102.useState)(false);
  const [devices, setDevices] = (0, import_react102.useState)([]);
  const loadDevices = (0, import_react102.useCallback)(() => {
    (user == null ? void 0 : user.group_id) && api_default.getFilterDevices(props.filterId, user.group_id).then(
      setDevices
    );
  }, [props.filterId, user == null ? void 0 : user.group_id]);
  (0, import_react102.useEffect)(() => {
    loadDevices();
  }, [loadDevices]);
  const cuttingEdgeOnlineStatusDevices = useDeviceOnlineStatus_default(devices);
  const [allFilters, setAllFilters] = (0, import_react102.useState)([]);
  (0, import_react102.useEffect)(() => {
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
  const navigate = (0, import_react_router_dom20.useNavigate)();
  const titleRow = [
    {
      text: "My Filters",
      callback: () => navigate("/filters")
    },
    {
      text: (filter == null ? void 0 : filter.title) ?? "",
      options: allFilters.filter((f) => f.id !== props.filterId).map((f) => ({
        text: f.title,
        image: /* @__PURE__ */ import_react102.default.createElement(
          import_system93.Stack,
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
          /* @__PURE__ */ import_react102.default.createElement(FilterIcon_default, { height: "16px", width: "16px" })
        ),
        callback: () => navigate(`/filters/${f.id}`)
      }))
    }
  ];
  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = (0, import_react102.useState)(false);
  const notificationCtx = (0, import_react102.useContext)(NotificationContext_default);
  const [deletionDialogOpen, setDeletionDialogOpen] = (0, import_react102.useState)(false);
  const [changeFilterDialogOpenForDevice, setChangeFilterDialogOpenForDevice] = (0, import_react102.useState)();
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
        import_lodash20.default.uniq([...allowedSubcategories, ...subcategoryIds])
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
  return filter ? /* @__PURE__ */ import_react102.default.createElement(import_react102.default.Fragment, null, props.isMobile ? /* @__PURE__ */ import_react102.default.createElement(
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
  ) : /* @__PURE__ */ import_react102.default.createElement(
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
  ), devices ? /* @__PURE__ */ import_react102.default.createElement(
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
  ) : null, /* @__PURE__ */ import_react102.default.createElement(
    DeletionDialog_default,
    {
      open: deletionDialogOpen,
      type: "Filter",
      onClose: () => setDeletionDialogOpen(false),
      subtitle: "If you delete this Filter all of the Category configurations, blocked search terms, and blocked and allowed sites will be lost. Any Device still connected to this Filter will be set to the default.",
      onSubmit: deleteFilter,
      isMobile: props.isMobile
    }
  ), /* @__PURE__ */ import_react102.default.createElement(
    FilterRenameDialog_default,
    {
      open: renameDialogOpen,
      onClose: () => setRenameDialogOpen(false),
      name: filter.title,
      onSubmit: (name) => api_default.changeFilterName(props.filterId, name).then(loadFilter).then(() => notificationCtx.success("Renamed Filter")),
      isMobile: props.isMobile
    }
  ), changeFilterDialogOpenForDevice ? /* @__PURE__ */ import_react102.default.createElement(
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
  return /* @__PURE__ */ import_react103.default.createElement(FilterPage, { filterId: parseInt(params.id), isMobile: import_react_device_detect6.isMobile });
};
var filter_default = Filter2;

// src/folders/index.tsx
var import_react107 = __toESM(require("react"), 1);

// src/folders/contents/common.tsx
var import_react_router_dom24 = require("react-router-dom");
var import_react106 = require("react");

// src/folders/contents/body-desktop.tsx
var import_system95 = require("@mui/system");
var import_react_router_dom22 = require("react-router-dom");

// src/components/FolderCard.tsx
var import_react104 = require("react");
var import_system94 = require("@mui/system");

// src/images/Star.svg
var Star_default = "./Star-C4VM577T.svg";

// src/components/FolderCard.tsx
var import_react_router_dom21 = require("react-router-dom");
var import_lodash21 = __toESM(require("lodash"), 1);

// src/images/icons/ArrowUpRight.svg
var ArrowUpRight_default = "./ArrowUpRight-EAFXXM3E.svg";

// src/components/FolderCard.tsx
var spin2 = import_system94.keyframes`
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
  const [stackCard1Color, setStackCard1Color] = (0, import_react104.useState)("#ffffff");
  const [stackCard2Color, setStackCard2Color] = (0, import_react104.useState)("#ffffff");
  (0, import_react104.useEffect)(() => {
    setStackCard1Color(
      PALETTE.secondary[SECONDARY_COLOR_ORDER[import_lodash21.default.random(SECONDARY_COLOR_ORDER.length - 1)]][import_lodash21.default.random(2, 5)]
    );
    setStackCard2Color(
      PALETTE.secondary[SECONDARY_COLOR_ORDER[import_lodash21.default.random(SECONDARY_COLOR_ORDER.length - 1)]][import_lodash21.default.random(2, 5)]
    );
  }, []);
  const [hovering, setHovering] = (0, import_react104.useState)(false);
  const navigate = (0, import_react_router_dom21.useNavigate)();
  const notificationCtx = (0, import_react104.useContext)(NotificationContext_default);
  const [deletionDialogOpen, setDeletionDialogOpen] = (0, import_react104.useState)(false);
  const deleteFolder = () => api_default.removeFolder(props.id).then(() => {
    var _a2;
    (_a2 = props.deletionCallback) == null ? void 0 : _a2.call(props);
    notificationCtx.negativeSuccess("Removed Folder");
  });
  const [renameDialogOpen, setRenameDialogOpen] = (0, import_react104.useState)(false);
  const renameFolder = (title) => api_default.renameFolder(props.id, title).then(() => {
    var _a2;
    (_a2 = props.editingCallback) == null ? void 0 : _a2.call(props);
    notificationCtx.success("Renamed Folder");
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    import_system94.Stack,
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
      import_system94.Stack,
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
      import_system94.Stack,
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
      import_system94.Stack,
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
      import_system94.Stack,
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
        import_system94.Stack,
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
          import_system94.Stack,
          {
            height: "156px",
            minHeight: "156px",
            width: "100%",
            direction: "row",
            spacing: "4px"
          },
          /* @__PURE__ */ React.createElement(
            import_system94.Stack,
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
              import_system94.Stack,
              {
                sx: {
                  animation: `${spin2} 9s linear`,
                  animationIterationCount: "infinite"
                }
              },
              /* @__PURE__ */ React.createElement(Star_default, { height: "52px", width: "52px" })
            ) : null
          ),
          /* @__PURE__ */ React.createElement(import_system94.Stack, { spacing: "4px", width: "30%" }, /* @__PURE__ */ React.createElement(
            import_system94.Stack,
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
              import_system94.Stack,
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
            import_system94.Stack,
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
              import_system94.Stack,
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
        /* @__PURE__ */ React.createElement(import_system94.Stack, { px: "4px" }, /* @__PURE__ */ React.createElement(import_system94.Stack, { direction: "row", flex: 1, minHeight: "58px" }, /* @__PURE__ */ React.createElement(import_system94.Stack, { pt: "8px", flex: 1 }, /* @__PURE__ */ React.createElement(Typography, { bold: true, variant: "medium", maxLines: 2 }, props.title)), /* @__PURE__ */ React.createElement(import_system94.Stack, { minWidth: "27px" })), ((_n = props.preview) == null ? void 0 : _n.devices) ? /* @__PURE__ */ React.createElement(
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
  const navigate = (0, import_react_router_dom22.useNavigate)();
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
    props.folders.length > 0 ? /* @__PURE__ */ React.createElement(import_system95.Stack, { pt: "20px", pb: "33px", pl: "51px" }, /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "292px", rowGap: "40px", columnGap: "20px" }, props.folders.map((f, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: f.id, duration: 800, delay: i * 90 }, /* @__PURE__ */ React.createElement(
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
var import_system96 = require("@mui/system");
var import_react_router_dom23 = require("react-router-dom");
var AllFoldersPageMobileBody = (props) => {
  const navigate = (0, import_react_router_dom23.useNavigate)();
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
    props.folders.length > 0 ? /* @__PURE__ */ React.createElement(import_system96.Stack, { pt: "20px" }, /* @__PURE__ */ React.createElement(import_system96.Stack, { spacing: "36px" }, props.folders.map((f, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: f.id, duration: 800, delay: i * 90, fullWidth: true }, /* @__PURE__ */ React.createElement(
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
var import_system97 = require("@mui/system");
var import_react105 = require("react");
var FolderCreationDialog = (props) => {
  const [name, setName] = (0, import_react105.useState)("");
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
      import_system97.Stack,
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
  const navigate = (0, import_react_router_dom24.useNavigate)();
  const [folders, setFolders] = (0, import_react106.useState)([]);
  const loadFolders = (0, import_react106.useCallback)(
    () => (user == null ? void 0 : user.group_id) && api_default.getEnrichedFolders(user.group_id).then(
      (f) => setFolders(f)
    ),
    [user == null ? void 0 : user.group_id]
  );
  (0, import_react106.useEffect)(() => {
    loadFolders();
  }, [loadFolders]);
  const createFolder = (title) => (user == null ? void 0 : user.group_id) && api_default.createFolder(title, user.group_id).then(
    (response) => navigate(`/folders/${response.contentBucketId}`)
  );
  const [creationDialogOpen, setCreationDialogOpen] = (0, import_react106.useState)(false);
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
var import_react_device_detect7 = require("react-device-detect");
var Folders = () => {
  return /* @__PURE__ */ import_react107.default.createElement(RootLayout, null, /* @__PURE__ */ import_react107.default.createElement(common_default4, { isMobile: import_react_device_detect7.isMobile }));
};
var folders_default = Folders;

// src/folder/index.tsx
var import_react108 = __toESM(require("react"), 1);
var import_react_device_detect8 = require("react-device-detect");
var Folder = ({ params }) => {
  return /* @__PURE__ */ import_react108.default.createElement(FolderPage, { folderId: parseInt(params.id), isMobile: import_react_device_detect8.isMobile });
};
var folder_default = Folder;

// src/profiles/index.tsx
var import_react113 = __toESM(require("react"), 1);
var import_react_device_detect9 = require("react-device-detect");

// src/profiles/contents/common.tsx
var import_react112 = __toESM(require("react"), 1);

// src/profiles/components/DeviceRenameDialog.tsx
var import_system98 = require("@mui/system");
var import_react109 = require("react");
var DeviceRenameDialog = (props) => {
  const [name, setName] = (0, import_react109.useState)("");
  (0, import_react109.useEffect)(() => setName(props.name), [props.name]);
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
      import_system98.Stack,
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
var import_system99 = require("@mui/system");
var import_react110 = require("react");
var INPUT_PHRASE2 = "yes";
var DeviceDisconnectDialog = (props) => {
  const [inputValue, setInputValue] = (0, import_react110.useState)("");
  const notificationCtx = (0, import_react110.useContext)(NotificationContext_default);
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
    /* @__PURE__ */ React.createElement(import_system99.Stack, { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(
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
    ), /* @__PURE__ */ React.createElement(import_system99.Stack, { spacing: "8px", width: "100%" }, /* @__PURE__ */ React.createElement(
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
var import_system101 = require("@mui/system");
var import_react_router_dom25 = require("react-router-dom");

// src/profiles/components/QRCodeView.tsx
var import_system100 = require("@mui/system");
var import_react111 = require("react");
var QRCodeView = () => {
  const { user } = useAuth_default();
  const [image, setImage] = (0, import_react111.useState)("");
  (0, import_react111.useEffect)(() => {
    (user == null ? void 0 : user.group_id) && api_default.getQRCode(user.group_id).then(setImage);
  }, [user == null ? void 0 : user.group_id]);
  return /* @__PURE__ */ React.createElement(
    import_system100.Stack,
    {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      position: "relative",
      spacing: "65px"
    },
    /* @__PURE__ */ React.createElement(import_system100.Stack, { spacing: "8px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
      import_system100.Stack,
      {
        sx: {
          background: `linear-gradient(${PALETTE.secondary.purple[2]}, ${PALETTE.secondary.blue[2]})`,
          "-webkit-text-fill-color": "transparent",
          backgroundClip: "text",
          "-webkit-background-clip": "text"
        }
      },
      /* @__PURE__ */ React.createElement(Typography, { variant: "h4" }, "Welcome to AstroSafe")
    ), /* @__PURE__ */ React.createElement(import_system100.Stack, { width: "444px" }, /* @__PURE__ */ React.createElement(
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
      import_system100.Stack,
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
      /* @__PURE__ */ React.createElement(import_system100.Stack, { width: "267px" }, /* @__PURE__ */ React.createElement(
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
  const navigate = (0, import_react_router_dom25.useNavigate)();
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
    /* @__PURE__ */ React.createElement(import_system101.Stack, { pl: "50px", flex: 1, pb: "31px" }, props.devices.length > 0 ? /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "355px", rowGap: "20px", columnGap: "20px" }, props.devices.map((d, i) => {
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
var import_system102 = require("@mui/system");
var import_react_router_dom26 = require("react-router-dom");
var AllDevicesPageMobileBody = (props) => {
  const navigate = (0, import_react_router_dom26.useNavigate)();
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
        topRightElement: /* @__PURE__ */ React.createElement(import_system102.Stack, { direction: "row", spacing: "8px" }, /* @__PURE__ */ React.createElement(
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
      /* @__PURE__ */ React.createElement(import_system102.Stack, { flex: 1 }, props.devices.length > 0 ? /* @__PURE__ */ React.createElement(import_system102.Stack, { spacing: "12px" }, props.devices.map((d) => {
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
  const [devices, setDevices] = (0, import_react112.useState)([]);
  (0, import_react112.useEffect)(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupEnrichedDevices(user == null ? void 0 : user.group_id).then(setDevices);
  }, [user == null ? void 0 : user.group_id]);
  const [filters, setFilters] = (0, import_react112.useState)([]);
  (0, import_react112.useEffect)(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupFilters(user.group_id).then(setFilters);
  }, [user == null ? void 0 : user.group_id]);
  const [renameDeviceDialogId, setRenameDeviceDialogId] = (0, import_react112.useState)();
  const [connectDialogOpen, setConnectDialogOpen] = (0, import_react112.useState)(false);
  const [disconnectDeviceDialogId, setDisconnectDeviceDialogId] = (0, import_react112.useState)();
  const [downloadDialogOpen, setDownloadDialogOpen] = (0, import_react112.useState)(false);
  const cuttingEdgeOnlineStatusDevices = useDeviceOnlineStatus_default(devices);
  return /* @__PURE__ */ import_react112.default.createElement(import_react112.default.Fragment, null, props.isMobile ? /* @__PURE__ */ import_react112.default.createElement(
    mobile_body_default,
    {
      devices: cuttingEdgeOnlineStatusDevices,
      filters,
      setConnectDialogOpen: () => setConnectDialogOpen(true),
      setRenameDeviceDialogId,
      setDisconnectDialogOpen: setDisconnectDeviceDialogId
    }
  ) : /* @__PURE__ */ import_react112.default.createElement(
    desktop_body_default,
    {
      devices: cuttingEdgeOnlineStatusDevices,
      filters,
      setConnectDialogOpen: () => setConnectDialogOpen(true),
      setRenameDeviceDialogId,
      setDisconnectDialogOpen: setDisconnectDeviceDialogId
    }
  ), renameDeviceDialogId ? /* @__PURE__ */ import_react112.default.createElement(
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
  ) : null, disconnectDeviceDialogId ? /* @__PURE__ */ import_react112.default.createElement(
    DeviceDisconnectDialog_default,
    {
      open: true,
      onClose: () => setDisconnectDeviceDialogId(void 0),
      onSubmit: () => null
    }
  ) : null, /* @__PURE__ */ import_react112.default.createElement(
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
  ), /* @__PURE__ */ import_react112.default.createElement(
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
  return /* @__PURE__ */ import_react113.default.createElement(RootLayout, null, /* @__PURE__ */ import_react113.default.createElement(AllDevicesPage, { isMobile: import_react_device_detect9.isMobile }));
};
var profiles_default = Profile;

// src/profile/index.tsx
var import_react131 = __toESM(require("react"), 1);
var import_react_device_detect10 = require("react-device-detect");

// src/profile/contents/common.tsx
var import_react130 = __toESM(require("react"), 1);
var import_system121 = require("@mui/system");
var import_lodash29 = __toESM(require("lodash"), 1);
var import_react_router_dom31 = require("react-router-dom");

// src/profile/contents/body-desktop.tsx
var import_system118 = require("@mui/system");
var import_react_router_dom29 = require("react-router-dom");

// src/profile/components/AstroTabSwitch.tsx
var import_system103 = require("@mui/system");
var AstroTabSwitch = (props) => /* @__PURE__ */ React.createElement(import_system103.Stack, { direction: "row", spacing: "12px" }, props.items.map((item) => /* @__PURE__ */ React.createElement(
  import_system103.Stack,
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
var import_system104 = require("@mui/system");
var import_lodash22 = __toESM(require("lodash"), 1);
var import_react114 = require("react");
var import_dayjs11 = __toESM(require("dayjs"), 1);
var import_advancedFormat2 = __toESM(require("dayjs/plugin/advancedFormat"), 1);
var import_usehooks_ts11 = require("usehooks-ts");
import_dayjs11.default.extend(import_advancedFormat2.default);
var SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD = 1260;
var DevicePageInsightsTab = (props) => {
  const [times, setTimes] = (0, import_react114.useState)([]);
  const [selectedDayIndex, setSelectedDayIndex] = (0, import_react114.useState)(0);
  const [rangeEndDayIndex, setRangeEndDayIndex] = (0, import_react114.useState)(0);
  const [rangeStartDayIndex, setRangeStartDayIndex] = (0, import_react114.useState)(6);
  const [visitedSites, setVisitedSites] = (0, import_react114.useState)([]);
  (0, import_react114.useEffect)(() => {
    api_default.getStats(
      props.deviceId,
      (0, import_dayjs11.default)().utc().subtract(rangeStartDayIndex, "days").format("YYYY-MM-DD"),
      (0, import_dayjs11.default)().utc().subtract(rangeEndDayIndex, "days").format("YYYY-MM-DD")
    ).then((stats) => {
      var _a, _b;
      setTimes(stats.screenTime);
      setVisitedSites(
        import_lodash22.default.sortBy(
          ((_b = (_a = stats.visitedWebsites) == null ? void 0 : _a.find(
            (w) => w.date === (0, import_dayjs11.default)().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
          )) == null ? void 0 : _b.websites) || [],
          (t) => t.screenTime
        )
      );
    });
  }, [props.deviceId, rangeStartDayIndex, rangeEndDayIndex, selectedDayIndex]);
  const [timeSpent, setTimeSpent] = (0, import_react114.useState)(0);
  (0, import_react114.useEffect)(
    () => {
      var _a;
      return setTimeSpent(
        ((_a = times.find(
          (t) => t.date === (0, import_dayjs11.default)().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
        )) == null ? void 0 : _a.screenTime) ?? 0
      );
    },
    [times, selectedDayIndex]
  );
  (0, import_react114.useEffect)(() => {
    if (selectedDayIndex < 4) {
      const shiftNDays = selectedDayIndex - 3;
      setRangeStartDayIndex(selectedDayIndex + 3 - shiftNDays);
      setRangeEndDayIndex(Math.max(0, shiftNDays));
    } else {
      setRangeStartDayIndex(selectedDayIndex + 3);
      setRangeEndDayIndex(selectedDayIndex - 3);
    }
  }, [selectedDayIndex, times]);
  const { width } = (0, import_usehooks_ts11.useWindowSize)();
  const [switchToColumn, setSwitchToColumn] = (0, import_react114.useState)(false);
  (0, import_react114.useEffect)(() => {
    setSwitchToColumn(width < SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD);
  }, [width]);
  return /* @__PURE__ */ React.createElement(import_system104.Stack, { spacing: "24px", pb: "32px" }, /* @__PURE__ */ React.createElement(import_system104.Stack, { direction: "row", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement(import_system104.Stack, { direction: "row", spacing: "10px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    import_system104.Stack,
    {
      sx: {
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.6 }
      },
      onClick: () => setSelectedDayIndex(selectedDayIndex + 1)
    },
    /* @__PURE__ */ React.createElement(ChevronLeft_default, { height: "24px", width: "24px" })
  ), /* @__PURE__ */ React.createElement(Typography, { variant: "h5" }, `${selectedDayIndex === 0 ? "Today" : selectedDayIndex === 1 ? "Yesterday" : `${(0, import_dayjs11.default)().utc().subtract(selectedDayIndex, "days").format("dddd")}`}, ${(0, import_dayjs11.default)().utc().subtract(selectedDayIndex, "days").format("Do MMMM")}`), /* @__PURE__ */ React.createElement(
    import_system104.Stack,
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
      value: (0, import_dayjs11.default)().utc().subtract(selectedDayIndex, "days").toDate(),
      setValue: (date) => setSelectedDayIndex((0, import_dayjs11.default)().diff(date, "days"))
    }
  )), /* @__PURE__ */ React.createElement(import_system104.Stack, { spacing: "28px", direction: switchToColumn ? "column" : "row" }, /* @__PURE__ */ React.createElement(import_system104.Stack, { width: switchToColumn ? "100%" : "54%", height: "290px" }, /* @__PURE__ */ React.createElement(
    AstroBentoCard,
    {
      title: `${Math.floor(timeSpent / 60)}h ${Math.floor(
        timeSpent % 60
      )}m spent on screen`,
      notCollapsible: true
    },
    /* @__PURE__ */ React.createElement(
      import_system104.Stack,
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
          selected: (0, import_dayjs11.default)().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD"),
          setSelectedDatetime: (datetime) => setSelectedDayIndex((0, import_dayjs11.default)().utc().diff(datetime, "days"))
        }
      ) : null
    )
  )), /* @__PURE__ */ React.createElement(import_system104.Stack, { height: "290px", flex: 1 }, /* @__PURE__ */ React.createElement(MostVisitedSitesSection_default, { sites: visitedSites }))), /* @__PURE__ */ React.createElement(
    HistorySection_default,
    {
      deviceId: props.deviceId,
      date: (0, import_dayjs11.default)().utc().subtract(selectedDayIndex, "days").format("YYYY-MM-DD")
    }
  ));
};
var InsightsTab_default = DevicePageInsightsTab;

// src/profile/components/ContentTab.tsx
var import_system105 = require("@mui/system");
var import_react_router_dom27 = require("react-router-dom");
var import_react115 = require("react");
var DevicePageContentTab = (props) => {
  const navigate = (0, import_react_router_dom27.useNavigate)();
  const [
    folderDeviceRemovalConfirmationDialogId,
    setFolderDeviceRemovalConfirmationDialogId
  ] = (0, import_react115.useState)();
  const notificationCtx = (0, import_react115.useContext)(NotificationContext_default);
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
    props.folders.length > 0 ? /* @__PURE__ */ React.createElement(import_system105.Stack, { pt: "20px" }, /* @__PURE__ */ React.createElement(DynamicCardGrid_default, { cardWidth: "292px", rowGap: "40px", columnGap: "20px" }, props.folders.map((f, i) => /* @__PURE__ */ React.createElement(UrsorFadeIn, { key: f.id, duration: 800, delay: 100 * i }, /* @__PURE__ */ React.createElement(
      FolderCard_default,
      {
        key: f.id,
        ...f,
        clickCallback: () => navigate(`/folders/${f.id}`),
        isMobile: props.isMobile,
        editingCallback: props.onUpdate,
        deletionCallback: props.onUpdate
      }
    ))))) : /* @__PURE__ */ React.createElement(import_system105.Stack, { flex: 1, justifyContent: "center", alignItems: "center" }, /* @__PURE__ */ React.createElement(UrsorFadeIn, { delay: 600, duration: 800 }, /* @__PURE__ */ React.createElement(
      import_system105.Stack,
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
        import_system105.Stack,
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
var import_react127 = require("react");

// src/profiles/components/HorizontalDeviceCard.tsx
var import_system107 = require("@mui/system");
var import_react117 = require("react");
var import_react_router_dom28 = require("react-router-dom");

// src/filter/components/AstroSettingCard.tsx
var import_system106 = require("@mui/system");
var import_react116 = __toESM(require("react"), 1);
var AstroSettingCard = (props) => /* @__PURE__ */ import_react116.default.createElement(
  import_system106.Stack,
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
  /* @__PURE__ */ import_react116.default.createElement(import_system106.Stack, { justifyContent: "space-between" }, /* @__PURE__ */ import_react116.default.createElement(import_system106.Stack, { spacing: "8px", alignItems: "center", direction: "row" }, props.image, /* @__PURE__ */ import_react116.default.createElement(import_system106.Stack, null, /* @__PURE__ */ import_react116.default.createElement(Typography, { maxLines: 1, bold: true, color: props.textColor }, props.title), props.subtitle ? /* @__PURE__ */ import_react116.default.createElement(Typography, { maxLines: 1, variant: "small", color: props.textColor }, props.subtitle) : null))),
  props.rightContent
);
var AstroSettingCard_default = AstroSettingCard;

// src/profiles/components/HorizontalDeviceCard.tsx
var DeviceCardFilterSection = (props) => {
  var _a;
  const { user } = useAuth_default();
  const [allFilters, setAllFilters] = (0, import_react117.useState)([]);
  (0, import_react117.useEffect)(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupFilters(user.group_id).then(setAllFilters);
  }, [user == null ? void 0 : user.group_id]);
  const [open, setOpen] = (0, import_react117.useState)(false);
  return /* @__PURE__ */ React.createElement(
    UrsorPopover,
    {
      open,
      content: /* @__PURE__ */ React.createElement(import_system107.Stack, { bgcolor: "rgb(255,255,255)", borderRadius: "12px", spacing: "8px" }, allFilters.map((f, i) => /* @__PURE__ */ React.createElement(
        import_system107.Stack,
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
              import_system107.Stack,
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
    /* @__PURE__ */ React.createElement(import_system107.Stack, { onClick: () => setOpen(true), flex: 1 }, /* @__PURE__ */ React.createElement(DeviceCardSection, { title: "Filter" }, /* @__PURE__ */ React.createElement(
      import_system107.Stack,
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
        import_system107.Stack,
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
        /* @__PURE__ */ React.createElement(import_system107.Stack, { justifyContent: "center" }, /* @__PURE__ */ React.createElement(FilterIcon_default, { direction: "row", height: "20px", width: "20px" })),
        /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[5] }, (_a = allFilters == null ? void 0 : allFilters.find((f) => f.id == props.filterId)) == null ? void 0 : _a.title)
      ),
      /* @__PURE__ */ React.createElement(ChevronDown_default, { height: "20px", width: "20px" })
    )))
  );
};
var HorizontalDeviceCard = (props) => {
  var _a, _b, _c, _d, _e, _f;
  const [browsingEnabled, setBrowsingEnabled] = (0, import_react117.useState)(false);
  (0, import_react117.useEffect)(
    () => {
      var _a2;
      return setBrowsingEnabled(!!((_a2 = props.config) == null ? void 0 : _a2.browsingAllowed));
    },
    [(_a = props.config) == null ? void 0 : _a.browsingAllowed]
  );
  const navigate = (0, import_react_router_dom28.useNavigate)();
  const onClick = () => navigate(`/profiles/${props.id}`);
  const notificationCtx = (0, import_react117.useContext)(NotificationContext_default);
  const changeFilter = (id) => api_default.addFilterToDevice(id, props.id).then(props.onUpdate).then(() => notificationCtx.success("Changed Filter"));
  return /* @__PURE__ */ React.createElement(AstroCard_default, null, /* @__PURE__ */ React.createElement(import_system107.Stack, { direction: "row", alignItems: "center", px: "16px", spacing: "20px" }, /* @__PURE__ */ React.createElement(
    import_system107.Stack,
    {
      direction: "row",
      spacing: "20px",
      position: "relative",
      height: "104px",
      alignItems: "center",
      boxSizing: "border-box"
    },
    /* @__PURE__ */ React.createElement(import_system107.Stack, { position: "relative" }, /* @__PURE__ */ React.createElement(
      import_system107.Stack,
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
      import_system107.Stack,
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
  ), /* @__PURE__ */ React.createElement(import_system107.Stack, { spacing: "12px", direction: "row", flex: 1 }, /* @__PURE__ */ React.createElement(
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
var import_system115 = require("@mui/system");
var import_react124 = require("react");
var import_lodash27 = __toESM(require("lodash"), 1);

// src/profile/components/RequestedSitesSection.tsx
var import_system108 = require("@mui/system");
var import_react118 = require("react");
var RequestedSiteRow = (props) => /* @__PURE__ */ React.createElement(
  import_system108.Stack,
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
  /* @__PURE__ */ React.createElement(import_system108.Stack, { direction: "row", spacing: "10px", alignItems: "center", flex: 1 }, /* @__PURE__ */ React.createElement(import_system108.Stack, { borderRadius: "100%", overflow: "hidden", minWidth: "32px" }, /* @__PURE__ */ React.createElement(
    import_system108.Stack,
    {
      minHeight: "32px",
      minWidth: "32px",
      borderRadius: "100%",
      overflow: "hidden"
    },
    props.faviconUrl ? /* @__PURE__ */ React.createElement("img", { src: props.faviconUrl, height: 32, width: 32, alt: "favicon" }) : null
  )), /* @__PURE__ */ React.createElement(
    import_system108.Stack,
    {
      sx: { transform: "translateY(-2px)" },
      flex: 1
    },
    /* @__PURE__ */ React.createElement(Typography, { bold: true, maxLines: 1 }, props.title),
    /* @__PURE__ */ React.createElement(import_system108.Stack, { flex: 1 }, /* @__PURE__ */ React.createElement(
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
  /* @__PURE__ */ React.createElement(import_system108.Stack, { direction: "row", spacing: "6px" }, /* @__PURE__ */ React.createElement(
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
  const notificationCtx = (0, import_react118.useContext)(NotificationContext_default);
  return /* @__PURE__ */ React.createElement(import_system108.Stack, { spacing: "12px" }, /* @__PURE__ */ React.createElement(Typography, { variant: "large", bold: true }, `${props.sites.length} requested site${props.sites.length === 1 ? "" : "s "}`), /* @__PURE__ */ React.createElement(import_system108.Stack, { spacing: "12px" }, props.sites.slice(0, 3).map((s) => /* @__PURE__ */ React.createElement(
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
var import_system110 = require("@mui/system");

// src/profile/components/TimeLimitRow.tsx
var import_system109 = require("@mui/system");

// src/images/icons/TimeMinusIcon.svg
var TimeMinusIcon_default = "./TimeMinusIcon-MCJ6EY4R.svg";

// src/images/icons/TimePlusIcon.svg
var TimePlusIcon_default = "./TimePlusIcon-2GMLQDFC.svg";

// src/profile/components/TimeLimitRow.tsx
var import_lodash23 = __toESM(require("lodash"), 1);
var import_react119 = require("react");
var TimeLimitRow = (props) => {
  const [decrementDisabled, setDecrementDisabled] = (0, import_react119.useState)(false);
  const [incrementDisabled, setIncrementDisabled] = (0, import_react119.useState)(false);
  (0, import_react119.useEffect)(() => {
    setDecrementDisabled(props.allowedMinutes < DAILY_LIMIT_INCREMENT);
    setIncrementDisabled(
      props.allowedMinutes > 24 * 60 - DAILY_LIMIT_INCREMENT
    );
  }, [props.allowedMinutes]);
  return /* @__PURE__ */ React.createElement(import_system109.Stack, { direction: "row", justifyContent: "space-between", alignItems: "center" }, /* @__PURE__ */ React.createElement(Typography, { variant: "large", bold: true, color: PALETTE.secondary.grey[3] }, import_lodash23.default.capitalize(props.dayName)), /* @__PURE__ */ React.createElement(import_system109.Stack, { direction: "row", spacing: "6px", alignItems: "center" }, /* @__PURE__ */ React.createElement(
    import_system109.Stack,
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
  ), /* @__PURE__ */ React.createElement(import_system109.Stack, { width: "86px", alignItems: "center" }, /* @__PURE__ */ React.createElement(Typography, { variant: "large", bold: true }, `${Math.floor(
    Math.min((props.allowedMinutes ?? 0) / 60)
  )}:${(props.allowedMinutes ?? 0) % 60 || "00"} hr`)), /* @__PURE__ */ React.createElement(
    import_system109.Stack,
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
    import_system110.Stack,
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
var import_system112 = require("@mui/system");

// src/profile/components/AllowedTimeRow.tsx
var import_system111 = require("@mui/system");
var import_react121 = require("react");
var import_lodash25 = __toESM(require("lodash"), 1);
var import_dayjs13 = __toESM(require("dayjs"), 1);

// src/profile/components/useNewSegmentTimes.tsx
var import_react120 = require("react");
var import_dayjs12 = __toESM(require("dayjs"), 1);
var import_lodash24 = __toESM(require("lodash"), 1);
var MIN_ALLOWED_TIME_ADDITION_PERIOD = 0.75;
var useNewSegmentTimes = (times) => {
  const [newSegmentTimes, setNewSegmentTimes] = (0, import_react120.useState)(null);
  (0, import_react120.useEffect)(() => {
    if (times && times.length > 0) {
      var possibleStartTime = 0;
      var possibleEndTime = (0, import_dayjs12.default)(times[0].startTime).utc().hour() + ((0, import_dayjs12.default)(times[0].startTime).utc().minute() - 30) / 60;
      var finalizedStartTime;
      var finalizedEndTime;
      for (let i = 0; i < times.length + 1; i++) {
        if (possibleStartTime < possibleEndTime && possibleEndTime - possibleStartTime >= MIN_ALLOWED_TIME_ADDITION_PERIOD) {
          finalizedStartTime = possibleStartTime;
          finalizedEndTime = possibleEndTime;
          break;
        } else if (i + 1 < times.length) {
          possibleStartTime = (0, import_dayjs12.default)(times[i].endTime).utc().hour() + ((0, import_dayjs12.default)(times[i].endTime).utc().minute() + 30) / 60;
          possibleEndTime = (0, import_dayjs12.default)(times[i + 1].startTime).utc().hour() + ((0, import_dayjs12.default)(times[i + 1].startTime).utc().minute() - 30) / 60;
        } else if (i + 1 === times.length && (0, import_dayjs12.default)(times[i].endTime).utc().hour() > 0) {
          possibleStartTime = (0, import_dayjs12.default)(times[i].endTime).utc().hour() + ((0, import_dayjs12.default)(times[i].endTime).utc().minute() + 30) / 60;
          possibleEndTime = 24;
        }
      }
      if (import_lodash24.default.isNumber(finalizedStartTime) && finalizedEndTime) {
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
  const [draggingDot1, setDraggingDot1] = (0, import_react121.useState)(false);
  const [draggingDot2, setDraggingDot2] = (0, import_react121.useState)(false);
  const [dot1X, setDot1X] = (0, import_react121.useState)(0);
  const [dot2X, setDot2X] = (0, import_react121.useState)(0);
  (0, import_react121.useEffect)(() => {
    if (import_lodash25.default.isNumber(props.start) && import_lodash25.default.isNumber(props.end)) {
      setDot1X(props.lineWidth * props.start / 24);
      setDot2X(props.lineWidth * props.end / 24);
    }
  }, [props.start, props.end, props.lineWidth]);
  (0, import_react121.useEffect)(() => {
    if (draggingDot1) {
      const newDotX = Math.max(
        0,
        Math.min(props.lineWidth, props.mouseX - props.lineLeftX)
      );
      const lockedEndLineX = Math.round(newDotX / props.dragInterval) * props.dragInterval;
      setDot1X(lockedEndLineX);
    }
  }, [draggingDot1, props.mouseX]);
  (0, import_react121.useEffect)(() => {
    if (draggingDot2) {
      const newDotX = Math.max(
        0,
        Math.min(props.lineWidth, props.mouseX - props.lineLeftX)
      );
      const lockedEndLineX = Math.round(newDotX / props.dragInterval) * props.dragInterval;
      setDot2X(lockedEndLineX);
    }
  }, [draggingDot2, props.mouseX]);
  const handleDraggingEnd = (0, import_react121.useCallback)(() => {
    if (draggingDot1 || draggingDot2) {
      setDraggingDot1(false);
      setDraggingDot2(false);
      props.setTimes(
        Math.max(0, Math.min(dot1X, dot2X) / props.lineWidth * 24),
        Math.min(24, Math.max(dot1X, dot2X) / props.lineWidth * 24)
      );
    }
  }, [dot1X, dot2X, props.lineWidth, draggingDot1, draggingDot2]);
  (0, import_react121.useEffect)(() => {
    window.addEventListener("mouseup", handleDraggingEnd);
    return () => {
      window.removeEventListener("mouseup", handleDraggingEnd);
    };
  }, [handleDraggingEnd]);
  const [hovering, setHovering] = (0, import_react121.useState)(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_system111.Stack, { position: "absolute", left: dot1X, zIndex: 3 }, /* @__PURE__ */ React.createElement(import_system111.Stack, { flex: 1, position: "relative" }, /* @__PURE__ */ React.createElement(
    import_system111.Stack,
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
  ))), /* @__PURE__ */ React.createElement(import_system111.Stack, { position: "absolute", left: dot2X, zIndex: 3 }, /* @__PURE__ */ React.createElement(import_system111.Stack, { flex: 1, position: "relative" }, /* @__PURE__ */ React.createElement(
    import_system111.Stack,
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
    import_system111.Stack,
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
      import_system111.Stack,
      {
        height: "4px",
        width: "100%",
        bgcolor: PALETTE.secondary.blue[1],
        position: "relative"
      },
      !props.noDeletion ? /* @__PURE__ */ React.createElement(
        import_system111.Stack,
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
  const [lineRef, setLineRef] = (0, import_react121.useState)(null);
  const [lineWidth, setLineWidth] = (0, import_react121.useState)(0);
  const [lineLeftX, setLineLeftX] = (0, import_react121.useState)(0);
  (0, import_react121.useEffect)(() => {
    var _a2, _b2;
    setLineWidth(((_a2 = lineRef == null ? void 0 : lineRef.getBoundingClientRect) == null ? void 0 : _a2.call(lineRef).width) ?? 0);
    setLineLeftX(((_b2 = lineRef == null ? void 0 : lineRef.getBoundingClientRect) == null ? void 0 : _b2.call(lineRef).left) ?? 0);
  }, [
    (_a = lineRef == null ? void 0 : lineRef.getBoundingClientRect) == null ? void 0 : _a.call(lineRef).width,
    (_b = lineRef == null ? void 0 : lineRef.getBoundingClientRect) == null ? void 0 : _b.call(lineRef).left
  ]);
  const [mouseX, setMouseX] = (0, import_react121.useState)(0);
  const handleMouseMove = (0, import_react121.useCallback)((event) => {
    setMouseX(event.pageX);
  }, []);
  (0, import_react121.useEffect)(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);
  const [dragInterval, setDragInterval] = (0, import_react121.useState)(1);
  (0, import_react121.useEffect)(
    () => setDragInterval(lineWidth * DRAG_INTERVAL / 24),
    [lineWidth]
  );
  return /* @__PURE__ */ React.createElement(import_system111.Stack, { width: "100%", height: "22px" }, /* @__PURE__ */ React.createElement(
    import_system111.Stack,
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
      const decimalStartTime = (0, import_dayjs13.default)(allowedTimeRange.startTime).utc().hour() + (0, import_dayjs13.default)(allowedTimeRange.startTime).utc().minute() / 60;
      const decimalEndTime = (0, import_dayjs13.default)(allowedTimeRange.endTime).utc().hour() + (0, import_dayjs13.default)(allowedTimeRange.endTime).utc().minute() / 60;
      const endTimeIsMidnight = (0, import_dayjs13.default)(allowedTimeRange.endTime).utc().day() > (0, import_dayjs13.default)(allowedTimeRange.startTime).utc().day();
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
    /* @__PURE__ */ React.createElement(import_system111.Stack, { flex: 1, justifyContent: "space-between", direction: "row" }, [...Array(1 + 24 / DISPLAY_INTERVAL).keys()].filter((x) => !props.halveLabelFrequency || (x - 1) % 2).map((i) => i * DISPLAY_INTERVAL).map((hour) => {
      return /* @__PURE__ */ React.createElement(
        import_system111.Stack,
        {
          key: `${hour}${props.halveLabelFrequency}`,
          height: "4px",
          width: "2px",
          bgcolor: PALETTE.secondary.grey[3],
          position: "relative"
        },
        /* @__PURE__ */ React.createElement(
          import_system111.Stack,
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
  const [sortedTimes, setSortedTimes] = (0, import_react121.useState)([]);
  (0, import_react121.useEffect)(
    () => setSortedTimes(import_lodash25.default.sortBy(props.times, (t) => new Date(t.startTime))),
    [props.times]
  );
  const { newSegmentTimes, clearNewSegmentTimes } = useNewSegmentTimes_default(sortedTimes);
  return /* @__PURE__ */ React.createElement(import_system111.Stack, { direction: "row", alignItems: "center" }, /* @__PURE__ */ React.createElement(import_system111.Stack, { width: "120px" }, /* @__PURE__ */ React.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[3] }, import_lodash25.default.capitalize(props.dayName))), /* @__PURE__ */ React.createElement(
    BrowsingTimeSelector,
    {
      ranges: sortedTimes,
      setRangeTimes: props.setAllowedTimes,
      deleteRange: props.deleteRange,
      smallerLabelFont: props.smallerLabelFont,
      halveLabelFrequency: props.halveLabelFrequency
    }
  ), /* @__PURE__ */ React.createElement(import_system111.Stack, { pl: "60px", direction: "row", spacing: "8px" }, /* @__PURE__ */ React.createElement(
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
    import_system112.Stack,
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
var import_dayjs15 = __toESM(require("dayjs"), 1);
var import_utc = __toESM(require("dayjs/plugin/utc"), 1);
var import_usehooks_ts12 = require("usehooks-ts");

// src/profile/components/MobileAllowedTimesSection.tsx
var import_react123 = __toESM(require("react"), 1);
var import_system114 = require("@mui/system");

// src/profile/components/MobileAllowedTimeRow.tsx
var import_react122 = __toESM(require("react"), 1);
var import_system113 = require("@mui/system");
var import_dayjs14 = __toESM(require("dayjs"), 1);
var import_lodash26 = __toESM(require("lodash"), 1);
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
  const [gridRef, setGridRef] = (0, import_react122.useState)(null);
  const [hideTopGradient, setHideTopGradient] = (0, import_react122.useState)(true);
  const [hideBottomGradient, setHideBottomGradient] = (0, import_react122.useState)(false);
  const handleScroll = () => {
    if (gridRef) {
      const { scrollTop, scrollHeight, clientHeight } = gridRef;
      setHideTopGradient(scrollTop < 3);
      setHideBottomGradient(scrollTop + clientHeight >= scrollHeight);
    }
  };
  return /* @__PURE__ */ import_react122.default.createElement(import_system113.Stack, { spacing: "12px", alignItems: "center" }, /* @__PURE__ */ import_react122.default.createElement(Typography, { bold: true, variant: "h5", color: PALETTE.secondary.grey[5] }, (0, import_dayjs14.default)(props.time).utc().format("hh:mma")), /* @__PURE__ */ import_react122.default.createElement(import_system113.Stack, { position: "relative", overflow: "hidden" }, /* @__PURE__ */ import_react122.default.createElement(
    import_system113.Stack,
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
  ), /* @__PURE__ */ import_react122.default.createElement(
    import_system113.Stack,
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
  ), /* @__PURE__ */ import_react122.default.createElement(
    import_system113.Stack,
    {
      overflow: "scroll",
      ref: setGridRef,
      onScroll: handleScroll,
      pt: "10px"
    },
    /* @__PURE__ */ import_react122.default.createElement(import_system113.Stack, { height: "170px", spacing: "6px" }, [
      ...[...Array(24 * 60 / 15).keys()].map((i) => /* @__PURE__ */ import_react122.default.createElement(
        import_system113.Stack,
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
        /* @__PURE__ */ import_react122.default.createElement(Typography, { color: PALETTE.secondary.grey[5] }, (0, import_dayjs14.default)().utc().hour(0).minute(0).millisecond(0).add(i * 15, "minutes").format("hh:mm a"))
      )),
      /* @__PURE__ */ import_react122.default.createElement(
        import_system113.Stack,
        {
          key: "midnight",
          alignItems: "center",
          onClick: () => props.setTime(
            getISODateString(props.day < 6 ? props.day + 1 : 0, 24, 0)
          )
        },
        /* @__PURE__ */ import_react122.default.createElement(Typography, { color: PALETTE.secondary.grey[5] }, "00:00am")
      )
    ])
  )));
};
var MobileTimeSelectionDialog = (props) => {
  return /* @__PURE__ */ import_react122.default.createElement(
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
    /* @__PURE__ */ import_react122.default.createElement(import_system113.Stack, { direction: "row", width: "100%" }, /* @__PURE__ */ import_react122.default.createElement(import_system113.Stack, { flex: 1, justifyContent: "center" }, /* @__PURE__ */ import_react122.default.createElement(
      TimeSelectionColumn,
      {
        day: props.day,
        time: props.startTime,
        setTime: props.setStartTime
      }
    )), /* @__PURE__ */ import_react122.default.createElement(Typography, { variant: "h5", color: PALETTE.secondary.grey[3] }, "to"), /* @__PURE__ */ import_react122.default.createElement(import_system113.Stack, { flex: 1 }, /* @__PURE__ */ import_react122.default.createElement(
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
  const [dialogOpen, setDialogOpen] = (0, import_react122.useState)(false);
  return /* @__PURE__ */ import_react122.default.createElement(import_react122.default.Fragment, null, /* @__PURE__ */ import_react122.default.createElement(
    import_system113.Stack,
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
    /* @__PURE__ */ import_react122.default.createElement(import_system113.Stack, { alignItems: "center", direction: "row", spacing: "5px" }, /* @__PURE__ */ import_react122.default.createElement(Typography, { bold: true }, (0, import_dayjs14.default)(props.startTime).utc().format("hh:mma"))),
    /* @__PURE__ */ import_react122.default.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[3] }, "to"),
    /* @__PURE__ */ import_react122.default.createElement(import_system113.Stack, { alignItems: "center", direction: "row", spacing: "5px" }, /* @__PURE__ */ import_react122.default.createElement(Typography, { bold: true }, (0, import_dayjs14.default)(props.endTime).utc().format("hh:mma")))
  ), dialogOpen ? /* @__PURE__ */ import_react122.default.createElement(
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
  const [sortedTimes, setSortedTimes] = (0, import_react122.useState)([]);
  (0, import_react122.useEffect)(
    () => setSortedTimes(import_lodash26.default.sortBy(props.times, (t) => new Date(t.startTime))),
    [props.times]
  );
  const { newSegmentTimes, clearNewSegmentTimes } = useNewSegmentTimes_default(sortedTimes);
  const dayName = DAY_FULL_NAMES[props.day];
  return /* @__PURE__ */ import_react122.default.createElement(import_system113.Stack, { spacing: "4px" }, /* @__PURE__ */ import_react122.default.createElement(Typography, { bold: true, color: PALETTE.secondary.grey[3] }, dayName), /* @__PURE__ */ import_react122.default.createElement(import_system113.Stack, { direction: "row" }, /* @__PURE__ */ import_react122.default.createElement(import_system113.Stack, { spacing: "4px" }, sortedTimes.map((t) => /* @__PURE__ */ import_react122.default.createElement(
    import_system113.Stack,
    {
      key: t.id,
      direction: "row",
      spacing: "10px",
      alignItems: "center",
      justifyContent: "space-between"
    },
    /* @__PURE__ */ import_react122.default.createElement(
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
    sortedTimes.length > 1 ? /* @__PURE__ */ import_react122.default.createElement(
      import_system113.Stack,
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
      /* @__PURE__ */ import_react122.default.createElement(X_default, { height: "20px", width: "20px" })
    ) : null
  ))), /* @__PURE__ */ import_react122.default.createElement(
    import_system113.Stack,
    {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      pb: "3px"
    },
    /* @__PURE__ */ import_react122.default.createElement(
      import_system113.Stack,
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
      /* @__PURE__ */ import_react122.default.createElement(PlusIcon_default, { height: "20px", width: "20px" })
    )
  )));
};
var MobileAllowedTimeRow_default = MobileAllowedTimeRow;

// src/profile/components/MobileAllowedTimesSection.tsx
var MobileAllowedTimesSection = (props) => /* @__PURE__ */ import_react123.default.createElement(
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
  props.allowedTimes ? /* @__PURE__ */ import_react123.default.createElement(
    import_system114.Stack,
    {
      spacing: "18px",
      pb: "12px",
      sx: {
        opacity: props.disabled ? 0.4 : 1,
        pointerEvents: props.disabled ? "none" : void 0,
        transition: "0.2s"
      }
    },
    ["mon", "tue", "wed", "thu", "fri", "s at", "s un"].map((day, i) => /* @__PURE__ */ import_react123.default.createElement(
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
import_dayjs15.default.extend(import_utc.default);
var getISODateString = (day, hours, minutes) => import_dayjs15.default.utc().day(day).hour(hours).minute(minutes).second(0).millisecond(0).toISOString();
var DAILY_LIMIT_INCREMENT = 15;
var ALLOWED_TIMES_LABELS_SMALLER_FONT_SIZE_WINDOW_WIDTH_THRESHOLD = 1536;
var HALVE_LABEL_FREQUENCY_WINDOW_WIDTH_THRESHOLD = 1450;
var SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD2 = 1080;
var DevicePageLimitsTab = (props) => {
  const [allowedTimes, setAllowedTimes] = (0, import_react124.useState)([]);
  const [timeLimits, setTimeLimits] = (0, import_react124.useState)([]);
  const [deviceConfig, setDeviceConfig] = (0, import_react124.useState)();
  const loadData = (0, import_react124.useCallback)(
    () => api_default.getDeviceWithTimesAndConfig(props.deviceId).then(
      (d) => {
        setAllowedTimes(d.allowedTimes);
        setTimeLimits(d.timeLimits);
        setDeviceConfig(d.config);
      }
    ),
    [props.deviceId]
  );
  (0, import_react124.useEffect)(() => {
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
  const [allowedTimesEnabled, setAllowedTimesEnabled] = (0, import_react124.useState)(false);
  const [timeLimitsEnabled, setTimeLimitsEnabled] = (0, import_react124.useState)(false);
  (0, import_react124.useEffect)(() => {
    if (deviceConfig) {
      !import_lodash27.default.isUndefined(deviceConfig == null ? void 0 : deviceConfig.allowedTimesEnabled) && setAllowedTimesEnabled(deviceConfig.allowedTimesEnabled);
      !import_lodash27.default.isUndefined(deviceConfig == null ? void 0 : deviceConfig.timeLimitsEnabled) && setTimeLimitsEnabled(deviceConfig.timeLimitsEnabled);
    }
  }, [deviceConfig]);
  const [requestedSites, setRequestedSites] = (0, import_react124.useState)([]);
  const loadRequestedSites = (0, import_react124.useCallback)(
    () => api_default.getRequestedSites(props.deviceId).then(setRequestedSites),
    [props.deviceId]
  );
  (0, import_react124.useEffect)(() => {
    loadRequestedSites();
  }, [loadRequestedSites]);
  const { width } = (0, import_usehooks_ts12.useWindowSize)();
  const [
    allowedTimesLabelsSmallerFontSize,
    setAllowedTimesLabelsSmallerFontSize
  ] = (0, import_react124.useState)(false);
  (0, import_react124.useEffect)(
    () => setAllowedTimesLabelsSmallerFontSize(
      width < ALLOWED_TIMES_LABELS_SMALLER_FONT_SIZE_WINDOW_WIDTH_THRESHOLD && width > SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD2
    ),
    [width]
  );
  const [switchToColumn, setSwitchToColumn] = (0, import_react124.useState)(false);
  (0, import_react124.useEffect)(
    () => setSwitchToColumn(width < SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD2),
    [width]
  );
  const [halveLabelFrequency, setHalveLabelFrequency] = (0, import_react124.useState)(false);
  (0, import_react124.useEffect)(
    () => setHalveLabelFrequency(
      width < HALVE_LABEL_FREQUENCY_WINDOW_WIDTH_THRESHOLD
    ),
    [width]
  );
  const notificationCtx = (0, import_react124.useContext)(NotificationContext_default);
  return /* @__PURE__ */ React.createElement(
    ProfilePageTabLayout_default,
    {
      title: "Limits",
      info: {
        title: "How do limits work?",
        text: "For each day you can choose what time you want the Browser to be accessible and set the total amount of time you want your child to be able to spend online. If you don't want to use these features just toggle them off in the top right corner of their respective box!"
      }
    },
    /* @__PURE__ */ React.createElement(import_system115.Stack, { spacing: "24px", pb: "33px" }, requestedSites.length > 0 ? /* @__PURE__ */ React.createElement(
      RequestedSitesSection_default,
      {
        sites: requestedSites,
        onUpdate: loadRequestedSites
      }
    ) : null, /* @__PURE__ */ React.createElement(import_system115.Stack, { direction: switchToColumn ? "column" : "row", spacing: "24px" }, /* @__PURE__ */ React.createElement(import_system115.Stack, { width: switchToColumn ? void 0 : "70%" }, props.isMobile ? /* @__PURE__ */ React.createElement(
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
var import_system116 = require("@mui/system");
var import_react125 = __toESM(require("react"), 1);
var AppToggleCard = (props) => /* @__PURE__ */ import_react125.default.createElement(
  import_system116.Stack,
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
  /* @__PURE__ */ import_react125.default.createElement(import_system116.Stack, { justifyContent: "space-between", spacing: "12px", flex: 1 }, /* @__PURE__ */ import_react125.default.createElement(import_system116.Stack, { justifyContent: "space-between", direction: "row", alignItems: "center" }, /* @__PURE__ */ import_react125.default.createElement(import_system116.Stack, { spacing: "16px", direction: "row", flex: 1 }, /* @__PURE__ */ import_react125.default.createElement(import_system116.Stack, { position: "relative" }, props.enabled ? /* @__PURE__ */ import_react125.default.createElement(
    import_system116.Stack,
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
    /* @__PURE__ */ import_react125.default.createElement(CheckIcon_default, { width: "12px", height: "12px" })
  ) : null, /* @__PURE__ */ import_react125.default.createElement(
    import_system116.Stack,
    {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 0 16px rgba(0,0,0,0.08)"
    },
    /* @__PURE__ */ import_react125.default.createElement(
      "img",
      {
        src: props.imageUrl,
        height: 41,
        width: 41,
        alt: "platform image"
      }
    )
  )), /* @__PURE__ */ import_react125.default.createElement(import_system116.Stack, { overflow: "hidden" }, /* @__PURE__ */ import_react125.default.createElement(Typography, { maxLines: 1, bold: true }, props.title), /* @__PURE__ */ import_react125.default.createElement(
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
  ))), /* @__PURE__ */ import_react125.default.createElement(AstroSwitch_default, { on: props.enabled, callback: props.callback })), /* @__PURE__ */ import_react125.default.createElement(import_system116.Stack, { flex: 1 }, /* @__PURE__ */ import_react125.default.createElement(Typography, { variant: "small", bold: true, color: PALETTE.secondary.grey[3] }, props.description)))
);
var AppToggleCard_default = AppToggleCard;

// src/profile/components/AppsTab.tsx
var import_system117 = require("@mui/system");
var import_react126 = require("react");
var import_lodash28 = __toESM(require("lodash"), 1);
var PAGE_SIZE = 20;
var AppsLegend = (props) => /* @__PURE__ */ React.createElement(import_system117.Stack, { direction: "row", spacing: "20px" }, /* @__PURE__ */ React.createElement(import_system117.Stack, null, /* @__PURE__ */ React.createElement(
  import_system117.Stack,
  {
    direction: "row",
    alignItems: "center",
    spacing: props.small ? "7px" : "10px"
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: props.small ? "small" : "normal", bold: true }, "Enabled"),
  /* @__PURE__ */ React.createElement(
    import_system117.Stack,
    {
      height: props.small ? "12px" : "16px",
      width: props.small ? "12px" : "16px",
      borderRadius: "100%",
      bgcolor: PALETTE.system.green
    }
  )
)), /* @__PURE__ */ React.createElement(import_system117.Stack, null, /* @__PURE__ */ React.createElement(
  import_system117.Stack,
  {
    direction: "row",
    alignItems: "center",
    spacing: props.small ? "7px" : "10px"
  },
  /* @__PURE__ */ React.createElement(Typography, { variant: props.small ? "small" : "normal", bold: true }, "Disabled"),
  /* @__PURE__ */ React.createElement(
    import_system117.Stack,
    {
      height: props.small ? "12px" : "16px",
      width: props.small ? "12px" : "16px",
      borderRadius: "100%",
      bgcolor: PALETTE.secondary.grey[3]
    }
  )
)));
var DevicePageAppsTab = (props) => {
  const [selectedCategory, setSelectedCategory] = (0, import_react126.useState)();
  const [categories, setCategories] = (0, import_react126.useState)([]);
  (0, import_react126.useEffect)(() => {
    api_default.getAllFilterCategories().then(setCategories);
  }, []);
  const [nPages, setNPages] = (0, import_react126.useState)(1);
  const [pageIndex, setPageIndex] = (0, import_react126.useState)(0);
  (0, import_react126.useEffect)(() => setPageIndex(0), [selectedCategory]);
  const [searchValue, setSearchValue] = (0, import_react126.useState)("");
  const [apps, setApps] = (0, import_react126.useState)([]);
  const [filteredApps, setFilteredApps] = (0, import_react126.useState)([]);
  (0, import_react126.useEffect)(() => {
    api_default.getApps(
      props.deviceId,
      pageIndex + 1,
      PAGE_SIZE,
      selectedCategory,
      searchValue
    ).then((response) => {
      setApps(import_lodash28.default.sortBy(response.apps, (a) => a.id));
      setNPages(response.pages);
    });
  }, [props.deviceId, pageIndex, selectedCategory, searchValue]);
  (0, import_react126.useEffect)(
    () => setFilteredApps(
      apps.filter(
        (d) => !searchValue || d.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    [apps, searchValue]
  );
  const notificationCtx = (0, import_react126.useContext)(NotificationContext_default);
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
    props.isMobile ? /* @__PURE__ */ React.createElement(import_system117.Stack, { alignItems: "flex-end" }, /* @__PURE__ */ React.createElement(AppsLegend, { small: props.isMobile })) : null,
    /* @__PURE__ */ React.createElement(import_system117.Stack, { pb: "32px" }, /* @__PURE__ */ React.createElement(AstroCard_default, null, /* @__PURE__ */ React.createElement(import_system117.Stack, { px: "16px", pt: "16px", justifyContent: "center" }, /* @__PURE__ */ React.createElement(
      import_system117.Stack,
      {
        direction: "row",
        spacing: "12px",
        justifyContent: "space-between"
      },
      /* @__PURE__ */ React.createElement(import_system117.Stack, { overflow: "scroll" }, /* @__PURE__ */ React.createElement(import_system117.Stack, { direction: "row", spacing: "12px", pb: "20px" }, [
        /* @__PURE__ */ React.createElement(
          import_system117.Stack,
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
              color: import_lodash28.default.isUndefined(selectedCategory) ? PALETTE.secondary.purple[2] : void 0
            },
            "All"
          )
        ),
        ...categories.map((c) => /* @__PURE__ */ React.createElement(
          import_system117.Stack,
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
      /* @__PURE__ */ React.createElement(import_system117.Stack, { pt: "2px" }, /* @__PURE__ */ React.createElement(
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
    )))), /* @__PURE__ */ React.createElement(import_system117.Stack, { py: "20px" }, /* @__PURE__ */ React.createElement(
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
var import_usehooks_ts13 = require("usehooks-ts");
var SWITCH_TO_MOBILE_DEVICE_CARD_WINDOW_WIDTH_THRESHOLD = 1283;
var ProfilePageDesktopBody = (props) => {
  const navigate = (0, import_react_router_dom29.useNavigate)();
  const [selectedTab, setSelectedTab] = (0, import_react127.useState)(
    props.tab ?? "content"
  );
  const { width } = (0, import_usehooks_ts13.useWindowSize)();
  const [switchToMobileDeviceCard, setSwitchToMobileDeviceCard] = (0, import_react127.useState)(false);
  (0, import_react127.useEffect)(() => {
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
    /* @__PURE__ */ React.createElement(import_system118.Stack, { pl: "48px" }, switchToMobileDeviceCard ? /* @__PURE__ */ React.createElement(
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
    ), /* @__PURE__ */ React.createElement(import_system118.Stack, { flex: 1, height: "56px", minHeight: "56px", justifyContent: "center" }, /* @__PURE__ */ React.createElement(
      import_system118.Stack,
      {
        height: "1px",
        width: "100%",
        bgcolor: PALETTE.secondary.grey[2]
      }
    ))),
    /* @__PURE__ */ React.createElement(import_system118.Stack, { pl: "48px", spacing: "24px" }, /* @__PURE__ */ React.createElement(
      import_system118.Stack,
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
var import_system119 = require("@mui/system");
var import_react_router_dom30 = require("react-router-dom");
var import_react128 = require("react");
var ProfilePageMobileBody = (props) => {
  const navigate = (0, import_react_router_dom30.useNavigate)();
  const [selectedTab, setSelectedTab] = (0, import_react128.useState)(
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
    /* @__PURE__ */ React.createElement(import_system119.Stack, { spacing: "24px", flex: 1 }, /* @__PURE__ */ React.createElement(
      MobileDeviceCard_default,
      {
        ...props.device,
        onClickViewScreenTime: () => setSelectedTab("limits"),
        onUpdate: props.onUpdateDevice,
        noDeviceTypeUnderAvatar: true
      }
    ), /* @__PURE__ */ React.createElement(import_system119.Stack, { width: "100%", alignItems: "center", justifyContent: "center" }, /* @__PURE__ */ React.createElement(
      import_system119.Stack,
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
var import_system120 = require("@mui/system");
var import_react129 = require("react");
var AddFolderDialog = (props) => {
  const [searchValue, setSearchValue] = (0, import_react129.useState)("");
  const [allFolders, setAllFolders] = (0, import_react129.useState)([]);
  (0, import_react129.useEffect)(() => {
    api_default.getGroupFolders(props.groupId).then((d) => setAllFolders(d));
  }, [props.groupId]);
  const [nonAddedFolders, setNonAddedFolders] = (0, import_react129.useState)([]);
  (0, import_react129.useEffect)(
    () => setNonAddedFolders(
      allFolders.filter(
        (d) => !props.addedFolders.find((device) => device.id === d.id)
      )
    ),
    [allFolders, props.addedFolders]
  );
  const [filteredFolders, setFilteredFolders] = (0, import_react129.useState)([]);
  (0, import_react129.useEffect)(
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
    nonAddedFolders.length === 0 ? /* @__PURE__ */ React.createElement(import_system120.Stack, { flex: 1, justifyContent: "center", width: "66%" }, /* @__PURE__ */ React.createElement(
      Typography,
      {
        color: PALETTE.secondary.grey[3],
        bold: true,
        sx: { textAlign: "center" }
      },
      "All of your Content Folders are already on this Device."
    )) : /* @__PURE__ */ React.createElement(import_system120.Stack, { overflow: "scroll", flex: 1, width: "100%" }, /* @__PURE__ */ React.createElement(import_system120.Stack, { pt: "16px", spacing: "16px", width: "100%", flex: 1, pb: "12px" }, filteredFolders.map((d) => /* @__PURE__ */ React.createElement(
      import_system120.Stack,
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
  const [device, setDevice] = (0, import_react130.useState)();
  const loadDevice = (0, import_react130.useCallback)(
    () => api_default.getEnrichedDevice(props.deviceId).then((d) => setDevice(d)),
    [props.deviceId]
  );
  const [cuttingEdgeOnlineStatusDevice] = useDeviceOnlineStatus_default(device ? [device] : []);
  (0, import_react130.useEffect)(() => {
    loadDevice();
  }, [loadDevice]);
  const navigate = (0, import_react_router_dom31.useNavigate)();
  const [renameDialogOpen, setRenameDialogOpen] = (0, import_react130.useState)(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] = (0, import_react130.useState)(false);
  const [addFolderDialogOpen, setAddFolderDialogOpen] = (0, import_react130.useState)(false);
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = (0, import_react130.useState)(false);
  const [allDevices, setAllDevices] = (0, import_react130.useState)([]);
  (0, import_react130.useEffect)(() => {
    (user == null ? void 0 : user.group_id) && api_default.getGroupEnrichedDevices(user.group_id).then(
      (d) => setAllDevices(d)
    );
  }, [user == null ? void 0 : user.group_id]);
  const [deviceFolders, setDeviceFolders] = (0, import_react130.useState)(
    []
  );
  const loadFolders = (0, import_react130.useCallback)(
    () => api_default.getDeviceFolders(props.deviceId).then(
      (folders) => setDeviceFolders(import_lodash29.default.reverse(import_lodash29.default.sortBy(folders, (f) => f.id)))
    ),
    [props.deviceId]
  );
  (0, import_react130.useEffect)(() => {
    loadFolders();
  }, [loadFolders]);
  const titleRow = [
    {
      text: "All Kids",
      callback: () => navigate("/profiles")
    },
    {
      text: (device == null ? void 0 : device.name) ?? "",
      image: /* @__PURE__ */ import_react130.default.createElement(import_system121.Stack, { position: "relative", borderRadius: "100%" }, /* @__PURE__ */ import_react130.default.createElement(
        import_system121.Stack,
        {
          borderRadius: "100%",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: PALETTE.secondary.blue[2],
          height: props.isMobile ? 24 : 36,
          width: props.isMobile ? 24 : 36
        },
        (device == null ? void 0 : device.profileAvatarUrl) ? /* @__PURE__ */ import_react130.default.createElement(
          "img",
          {
            src: (device == null ? void 0 : device.profileAvatarUrl) ?? "",
            height: props.isMobile ? 24 : 36,
            width: props.isMobile ? 24 : 36,
            alt: "device profile"
          }
        ) : /* @__PURE__ */ import_react130.default.createElement(
          Typography,
          {
            color: "rgb(255,255,255)",
            bold: true,
            variant: "small",
            sx: { transform: "translateY(0.5px)" }
          },
          getInitials((device == null ? void 0 : device.name) ?? "")
        )
      ), (cuttingEdgeOnlineStatusDevice == null ? void 0 : cuttingEdgeOnlineStatusDevice.online) ? /* @__PURE__ */ import_react130.default.createElement(
        import_system121.Stack,
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
  const notificationCtx = (0, import_react130.useContext)(NotificationContext_default);
  const createAndAddFolder = (title) => (user == null ? void 0 : user.group_id) && api_default.createFolder(title, user.group_id).then((response) => {
    api_default.addFolderToDevice(response.contentBucketId, props.deviceId);
    navigate(`/folders/${response.contentBucketId}`);
    notificationCtx.success("Created Folder and added it to the Device.");
  });
  return device ? /* @__PURE__ */ import_react130.default.createElement(import_react130.default.Fragment, null, props.isMobile ? /* @__PURE__ */ import_react130.default.createElement(
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
  ) : /* @__PURE__ */ import_react130.default.createElement(
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
  ), /* @__PURE__ */ import_react130.default.createElement(
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
  ), /* @__PURE__ */ import_react130.default.createElement(
    DeviceDisconnectDialog_default,
    {
      open: disconnectDialogOpen,
      onClose: () => setDisconnectDialogOpen(false),
      onSubmit: () => null
    }
  ), /* @__PURE__ */ import_react130.default.createElement(
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
  ), /* @__PURE__ */ import_react130.default.createElement(
    FolderCreationDialog_default,
    {
      open: createFolderDialogOpen,
      onClose: () => setCreateFolderDialogOpen(false),
      onSubmit: createAndAddFolder,
      isMobile: props.isMobile
    }
  )) : /* @__PURE__ */ import_react130.default.createElement(import_react130.default.Fragment, null);
}

// src/profile/index.tsx
var Profile2 = ({
  params,
  searchParams
}) => {
  return /* @__PURE__ */ import_react131.default.createElement(
    ProfilePage,
    {
      deviceId: parseInt(params.id),
      isMobile: import_react_device_detect10.isMobile,
      tab: searchParams.tab
    }
  );
};
var profile_default = Profile2;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccountPage,
  ChannelPage,
  FilterPage,
  FiltersPage,
  FolderPage,
  FoldersPage,
  ProfilePage,
  ProfilesPage
});
//# sourceMappingURL=index.cjs.map