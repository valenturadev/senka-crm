import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";
import { AuthProvider } from "./context/auth";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AuthProvider>
          <Router />
          <ScrollToTop />
        </AuthProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
