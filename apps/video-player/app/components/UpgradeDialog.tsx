import { Stack } from "@mui/system";
import UrsorDialog from "./UrsorDialog";
import RocketIcon from "@/images/icons/RocketIcon.svg";

const UpgradeDialog = (props: { open: boolean; closeCallback: () => void }) => (
  <UrsorDialog
    supertitle="Upgrade"
    title="Upgrade to Premium"
    subtitle={[
      "By upgrading to Premium, you will get",
      "unlimited videos, and help us become wealthy too.",
    ]}
    open={props.open}
    button={{ text: "Upgrade", callback: () => null, icon: RocketIcon }}
    onCloseCallback={props.closeCallback}
  >
    <Stack
      height="380px"
      width="300px"
      sx={{
        backgroundImage: `url(https://cdn.cloud.scenario.com/assets-transform/AVVhXTCZSESeelpX8ZH2UA?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4uY2xvdWQuc2NlbmFyaW8uY29tL2Fzc2V0cy10cmFuc2Zvcm0vQVZWaFhUQ1pTRVNlZWxwWDhaSDJVQT8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA3OTU1MTk5fX19XX0_&Key-Pair-Id=K36FIAB9LE2OLR&Signature=fdQnmseHNB8y30hz95r2HLxY77hagxon2arGWXqUh54s6Gql8kdAXX3sRfH1DdaGWbfnABCJ3vD84NhqRcvJEa9NBY4Hv1R6rrXhVwr2gJ7vs9WEsOdCrRaDh9ru2yZMfsuaby17HbNoCxMS39Opu7n08FOja1Z96m1Ysu14F0VU5n~hC~Q1ksjWl033Jx~cj5jgmJYVzyWEGuW9bfOIIADv70Qx0RaZ056F8tWQFsTcJLhoQMhWSQoXUjFbXYWmRb-quXq1Iv~2-TUELo5t~CXIex4SXdgWyWMsIC-Jgc7xT-3mVt9cjrhLCdVPmu1ffrRrVDi1J8N~No8FYoedsA__)`,
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
    />
  </UrsorDialog>
);

export default UpgradeDialog;
