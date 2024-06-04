import { Stack } from "@mui/system";
import { useEffect, useState } from "react";

type AWButtonVariant = "primary" | "secondary";

const DEFAULT_WIDTH = 182;

const HEIGHT_REGULAR = 48;
const HEIGHT_XS = 32;

export function AWButton(props: {
  width?: number | string;
  variant?: AWButtonVariant;
  size?: "regular" | "xs";
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
}) {
  const [hovering, setHovering] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);

  const [iconColor, setIconColor] = useState<string>();
  useEffect(
    () =>
      setIconColor(
        props.variant === "secondary"
          ? props.disabled
            ? "#ACC6C5"
            : pressed
            ? "#00474B"
            : hovering
            ? "#147C83"
            : "#147C83"
          : pressed
          ? "#86D3D9"
          : hovering
          ? "#A9E8EC"
          : "#F8F8F8"
      ),
    [hovering, pressed, props.variant, props.disabled]
  );

  return (
    <div
      style={{
        width: props.width ?? DEFAULT_WIDTH,
        height: props.size === "xs" ? HEIGHT_XS : HEIGHT_REGULAR,
        pointerEvents: props.disabled ? "none" : undefined,
      }}
      className={`flex items-center justify-center rounded-xs ${
        props.icon ? "gap-[10px]" : ""
      } ${
        !props.disabled || props.variant === "secondary" ? "border-[1px]" : ""
      } border-solid ${
        props.disabled
          ? props.variant === "secondary"
            ? "border-buttons-disabled-text"
            : ""
          : hovering
          ? props.variant === "secondary"
            ? "border-buttons-secondary-border_hover"
            : "border-buttons-primary-border_hover"
          : "border-buttons-border"
      } ${
        props.disabled
          ? props.variant === "secondary"
            ? ""
            : "bg-buttons-disabled-bg"
          : props.variant === "secondary"
          ? hovering
            ? pressed
              ? "bg-buttons-secondary-bg_pressed"
              : "bg-buttons-secondary-bg_hover"
            : "bg-buttons-secondary-bg"
          : hovering
          ? pressed
            ? "bg-buttons-primary-bg_pressed"
            : "bg-buttons-primary-bg_hover"
          : "bg-buttons-primary-bg"
      } ${props.disabled ? "" : "cursor-pointer"} duration-200`}
      onClick={props.onClick}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <div
        className={`font-medium ${
          props.size === "xs" ? "text-sm" : "text-regular"
        } ${
          props.disabled
            ? "text-buttons-disabled-text"
            : props.variant === "secondary"
            ? hovering
              ? pressed
                ? "text-buttons-secondary-text_pressed"
                : "text-buttons-secondary-text_hover"
              : "text-buttons-secondary-text"
            : "text-buttons-primary-text"
        } duration-200`}
      >
        {props.children}
      </div>
      <Stack
        sx={{
          svg: {
            path: {
              fill: iconColor,
              stroke: iconColor,
            },
          },
        }}
      >
        {props.icon ? <props.icon width="16px" height="16px" /> : null}
      </Stack>
    </div>
  );
}
