import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/router";

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};
