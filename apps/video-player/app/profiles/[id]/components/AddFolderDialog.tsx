import ApiController from "@/app/api";
import { SearchInput } from "@/app/components/SearchInput";
import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { PALETTE, Typography, UrsorButton } from "ui";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { DUMMY_GROUP_ID } from "@/app/filters/contents/body-desktop";
import { IContentBucket } from "./ContentTab";
import { IGroup } from "@/app/folders/[id]/contents/common";
import { IEnrichedContentBucket } from "@/app/folders/contents/common";
import PlusIcon from "@/images/icons/PlusIcon.svg";

const AddFolderDialog = (props: {
  open: boolean;
  onClose: () => void;
  onAdd: (id: IDevice["id"]) => void;
  openCreateNewDialog: () => void;
  addedFolders: IEnrichedContentBucket[];
  isMobile?: boolean;
  groupId: IGroup["id"];
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [allFolders, setAllFolders] = useState<IContentBucket[]>([]);
  useEffect(() => {
    ApiController.getGroupFolders(props.groupId).then((d) => setAllFolders(d));
  }, [props.groupId]);

  const [nonAddedFolders, setNonAddedFolders] = useState<IContentBucket[]>([]);
  useEffect(
    () =>
      setNonAddedFolders(
        allFolders.filter(
          (d) => !props.addedFolders.find((device) => device.id === d.id)
        )
      ),
    [allFolders, props.addedFolders]
  );

  const [filteredFolders, setFilteredFolders] = useState<IContentBucket[]>([]);
  useEffect(
    () =>
      setFilteredFolders(
        nonAddedFolders.filter(
          (d) =>
            !searchValue ||
            d.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      ),
    [nonAddedFolders, searchValue]
  );
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Add a Folder"
      subtitle={[
        "Add all of the Content from the selected Folder to this Device. Or create a new one.",
      ]}
      width="434px"
      height={props.isMobile ? "76%" : undefined}
      isMobile={props.isMobile}
    >
      <SearchInput
        value={searchValue}
        callback={setSearchValue}
        clearCallback={() => setSearchValue("")}
        fullWidth
        height="41px"
        grey
      />
      {nonAddedFolders.length === 0 ? (
        <Stack flex={1} justifyContent="center" width="66%">
          <Typography
            color={PALETTE.secondary.grey[3]}
            bold
            sx={{ textAlign: "center" }}
          >
            All of your Content Folders are already on this Device.
          </Typography>
        </Stack>
      ) : (
        <Stack pt="16px" spacing="16px" width="100%" flex={1}>
          {filteredFolders.map((d) => (
            <Stack
              key={d.id}
              direction="row"
              spacing="8px"
              px="8px"
              sx={{
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { opacity: 0.7 },
              }}
              onClick={() => props.onAdd(d.id)}
            >
              {/* <Stack
                borderRadius="100%"
                overflow="hidden"
                minWidth={23}
                minHeight={23}
              >
                <Image
                  src={d.profileAvatarUrl}
                  height={23}
                  width={23}
                  alt="avatar"
                />
              </Stack> */}
              <Typography maxLines={1} bold>
                {d.title}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
      <UrsorButton
        dark
        variant="tertiary"
        endIcon={PlusIcon}
        width="100%"
        onClick={props.openCreateNewDialog}
      >
        Create new
      </UrsorButton>
    </UrsorDialog>
  );
};

export default AddFolderDialog;
