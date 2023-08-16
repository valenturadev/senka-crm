import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";
import { AuthProvider } from "./context/auth";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AuthProvider>
          <Router />
          <ScrollToTop />
        </AuthProvider>
        <Toaster />
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
