import { Stack, alpha } from "@mui/system";
import HomeIcon from "@/images/icons/HomeIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import { GRID_SPACING } from "../home/AstroContentColumns";
import { useRouter } from "next/navigation";
import { PALETTE } from "ui";
import NavbarSearchBar from "./NavbarSearchBar";

const BUTTON_SIZE = 52;
const BUTTON_SPACING = "12px";
const ICON_SIZE = "28px";
const SHADOW = "0px 0px 26px rgba(0,0,0,0.06)";
export const MAGICAL_GRADIENT =
  "linear-gradient(150deg, #FD9B41, #F279C5, #1D62F6, #0AE799)";

const PADDING = 10;

const SELECTION_BORDER_THICKNESS = 3;

export function NavigationButton(props: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  callback?: () => void;
  selected?: boolean;
}) {
  return (
    <Stack
      width={`${BUTTON_SIZE + 2 * SELECTION_BORDER_THICKNESS}px`}
      minWidth={`${BUTTON_SIZE + 2 * SELECTION_BORDER_THICKNESS}px`}
      height={`${BUTTON_SIZE + 2 * SELECTION_BORDER_THICKNESS}px`}
      sx={{
        background: props.selected
          ? "linear-gradient(180deg, #6596FF, #7B61FF)"
          : undefined,
      }}
      borderRadius="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        height={BUTTON_SIZE}
        width={BUTTON_SIZE}
        borderRadius="100%"
        bgcolor={PALETTE.secondary.grey[1]}
        justifyContent="center"
        alignItems="center"
        sx={{
          ...(!props.selected
            ? {
                "&:hover": { opacity: 0.7, transform: "scale(1.1)" },
                transition: "0.2s",
                cursor: "pointer",
              }
            : {}),
          svg: {
            path: {
              fill: props.color,
            },
          },
        }}
        onClick={props.callback}
      >
        <props.icon height={ICON_SIZE} width={ICON_SIZE} />
      </Stack>
    </Stack>
  );
}

export type NavbarButton = "home" | "videoChannels" | "history";

export interface INavbarProps {
  selected?: NavbarButton;
  noByte?: boolean;
  noSearch?: boolean;
}

export default function Navbar(props: INavbarProps) {
  const router = useRouter();
  return (
    <>
      <Stack
        width="100%"
        py={`${PADDING}px`}
        px={`calc(2*${GRID_SPACING})`}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="white"
        boxSizing="border-box"
        position="relative"
        boxShadow={SHADOW}
      >
        <Stack direction="row" spacing={BUTTON_SPACING}>
          <NavigationButton
            icon={HomeIcon}
            color={alpha(
              PALETTE.secondary.blue[4],
              props.selected === "home" ? 1 : 0.45
            )}
            callback={() => router.push("/home")}
            selected={props.selected === "home"}
          />
          <NavigationButton
            icon={CirclePlayIcon}
            color={alpha(
              PALETTE.system.red,
              props.selected === "videoChannels" ? 1 : 0.45
            )}
            callback={() => router.push("/videoChannels")}
            selected={props.selected === "videoChannels"}
          />
          <NavigationButton
            icon={ClockIcon}
            color={alpha(
              PALETTE.primary.navy,
              props.selected === "history" ? 1 : 0.45
            )}
            callback={() => router.push("/history")}
            selected={props.selected === "history"}
          />
          {/* {dataCtx.lessons.length > 0 ? (
              <NavigationButton
                icon={ClassroomsIcon}
                color={PALETTE.secondary.green[4]}
                callback={() => navigate("/lessons")}
                selected={props.selected === "lessons"}
              />
            ) : null} */}
        </Stack>
        {/* <NavigationButton
        icon={SignoutIcon}
        color={PALETTE.secondary.grey[4]}
        callback={() => {
          userCtx.lockOut();
          userCtx.schoolStudents && userCtx.clear();
          navigate("/");
        }}
      /> */}
        {!props.noSearch ? <NavbarSearchBar /> : null}
      </Stack>
    </>
  );
}
