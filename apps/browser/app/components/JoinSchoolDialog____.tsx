import { Typography } from "ui";
import UrsorDialog from "../components/UrsorDialog";
import JoiningCodeInput from "./JoiningCodeInput";
import { useState } from "react";

const JoinSchoolDialog = (props: {
  open: boolean;
  closeCallback: () => void;
}) => {
  const [inputedCode, setInputedCode] = useState<string>("");
  const [inputActive, setInputActive] = useState<boolean>(false);
  const [showFailure, setShowFailure] = useState<boolean>(false);
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.closeCallback}
      title="Enter Join Code"
      supertitle="Connect to Group"
      button={{
        text: "Connect",
        callback: () => null,
      }}
    >
      <Typography>
        Ask your teacher to give you a join code. They will find one in their
        teacher account.
      </Typography>
      <JoiningCodeInput
        value={inputedCode}
        callback={(value) => setInputedCode(value)}
        active={inputActive}
        activeCallback={(active) => setInputActive(active)}
        showFailure={showFailure}
        rectWidth="48px"
        rectHeight="60px"
        rectSpacing="8px"
        fontSize="h5"
      />
    </UrsorDialog>
  );
};

export default JoinSchoolDialog;
