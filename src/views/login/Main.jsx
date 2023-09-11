import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.svg";
import logoBig from "@/assets/images/senka/senka-logo.png";

import illustrationUrl from "@/assets/images/illustration.svg";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth";
import InputMask from "react-input-mask";

function Main() {
  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const { login } = useContext(AuthContext);

  const [user, setUser] = useState({
    phone: "",
    password: "",
  });

  const loginSystem = async () => {
    await login(user.phone, user.password);
  };

  return (
    <>
      <div>
        {/* <DarkModeSwitcher /> */}
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <img alt="Senka" className="w-40" src={logoBig} />
                {/* <span className="text-white text-lg ml-3"> Rubick </span> */}
              </a>
              <div className="my-auto">
                <img
                  alt="Senka"
                  className="-intro-x w-1/2 -mt-16"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                  Senka Turizm <br />
                  Dünyasına Giriş Yap!
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Gezi ve Mutakabat Formlarını Yönet, <br />
                  Otel ve Araç Programları Oluşturun.
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Giriş Yap
                </h2>
                <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                  Senka Turizm Dünyasına Giriş Yap!
                </div>
                <div className="intro-x mt-8">
                  <InputMask
                    className="intro-x login__input form-control py-3 px-4 block"
                    mask="(999) 999-9999"
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                    placeholder="Telefon Numarası"
                  />

                  <input
                    type="password"
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Parola"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                {/* <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                  <div className="flex items-center mr-auto">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="form-check-input border mr-2"
                    />
                    <label
                      className="cursor-pointer select-none"
                      htmlFor="remember-me"
                    >
                      Beni Hatırla
                    </label>
                  </div>
                  <a href="">Şifreni mi Unuttun?</a>
                </div> */}
                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                  <button
                    onClick={() => loginSystem()}
                    className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                  >
                    Giriş Yap
                  </button>
                  <Link
                    to="/kayit-ol"
                    className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                  >
                    Kayıt Ol
                  </Link>
                </div>
                {/* <div className="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                  By signin up, you agree to our
                  <a className="text-primary dark:text-slate-200" href="">
                    Hükümler ve Koşulları
                  </a>
                  &
                  <a className="text-primary dark:text-slate-200" href="">
                    Privacy Policy
                  </a>
                </div> */}
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
