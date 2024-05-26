type AWButtonVariant = "primary" | "secondary";

const DEFAULT_WIDTH = 182;

export function AWButton(props: {
  width?: number;
  variant?: AWButtonVariant;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      style={{
        width: props.width ?? DEFAULT_WIDTH,
        pointerEvents: props.disabled ? "none" : undefined,
      }}
      className={`h-[48px] flex items-center justify-center rounded-xs ${
        props.disabled ? "" : "border-[1px]"
      } border-solid border-buttons-border ${
        props.disabled
          ? "bg-buttons-disabled-bg"
          : props.variant === "secondary"
          ? "bg-buttons-secondary-bg"
          : "bg-buttons-primary-bg"
      } ${props.disabled ? "" : "cursor-pointer"} duration-200`}
      onClick={props.onClick}
    >
      <div
        className={`font-medium ${
          props.disabled
            ? "text-buttons-disabled-text"
            : props.variant === "secondary"
            ? "text-buttons-secondary-text"
            : "text-buttons-primary-text"
        } duration-200`}
      >
        {props.children}
      </div>
    </div>
  );
}
