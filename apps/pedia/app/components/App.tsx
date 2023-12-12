/*global chrome*/
import "./App.css";
import PediaCollectionPage from "./pages/PediaCollectionPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactComponent as SpaceGlow } from "./images/spaceGlow.svg";
import Background from "./images/backgrounds/dark.png";
import PediaPage from "./pages/PediaPage";
import { Stack } from "@mui/system";

function App() {
  return (
    <Stack
      position="relative"
      sx={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
      width="100vw"
      height="100vh"
      overflow="hidden"
    >
      <Stack flex={1} zIndex={1}>
        <BrowserRouter>
          <Routes>
            <Route path={"/c/:id"} element={<PediaCollectionPage />} />
            <Route path={"/p/:id"} element={<PediaPage />} />
          </Routes>
        </BrowserRouter>
      </Stack>
      <Stack width="100%" position="fixed" bottom={0} zIndex={0}>
        <SpaceGlow width="100%" height="auto" />
      </Stack>
    </Stack>
  );
}

export default App;
