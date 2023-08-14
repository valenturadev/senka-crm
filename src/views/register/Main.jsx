import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.svg";
import logoBig from "@/assets/images/senka/senka-logo.png";
import illustrationUrl from "@/assets/images/illustration.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Main() {
  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  return (
    <>
      <div>
        {/* <DarkModeSwitcher /> */}
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Register Info */}
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
            {/* END: Register Info */}
            {/* BEGIN: Register Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Kayıt Ol
                </h2>
                <div className="intro-x mt-2 text-slate-400 dark:text-slate-400 xl:hidden text-center">
                  Senka Turizm Dünyasına Kayıt Ol!
                </div>
                <div className="intro-x mt-8">
                  <input
                    type="text"
                    className="intro-x login__input form-control py-3 px-4 block"
                    placeholder="İsim"
                  />
                  <input
                    type="text"
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Soyisim"
                  />
                  <input
                    type="text"
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Parola"
                  />
                  {/* <div className="intro-x w-full grid grid-cols-12 gap-4 h-1 mt-3">
                    <div className="col-span-3 h-full rounded bg-success"></div>
                    <div className="col-span-3 h-full rounded bg-success"></div>
                    <div className="col-span-3 h-full rounded bg-success"></div>
                    <div className="col-span-3 h-full rounded bg-slate-100 dark:bg-darkmode-800"></div>
                  </div> */}
                  {/* <a
                    href=""
                    className="intro-x text-slate-500 block mt-2 text-xs sm:text-sm"
                  >
                    What is a secure password?
                  </a> */}
                  <input
                    type="text"
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Parola Onay"
                  />
                </div>
                <div className="intro-x flex items-center text-slate-600 dark:text-slate-500 mt-4 text-xs sm:text-sm">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="form-check-input border mr-2"
                  />
                  <label
                    className="cursor-pointer select-none"
                    htmlFor="remember-me"
                  >
                    Senka Turizm'in
                  </label>
                  <Link
                    className="text-primary dark:text-slate-200 ml-1 font-bold"
                    to="/gizlilik-sozlesmesi"
                  >
                    Gizlilik Sözleşmesini
                  </Link>
                  <label
                    className="cursor-pointer select-none ml-1"
                    htmlFor="remember-me"
                  >
                    onaylıyorum.
                  </label>
                </div>
                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                  <button
                    onClick={() => {
                      console.log("register");
                    }}
                    className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                  >
                    Kayıt Ol
                  </button>
                  <Link
                    to="/giris-yap"
                    className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                  >
                    Giriş Yap
                  </Link>
                </div>
              </div>
            </div>
            {/* END: Register Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
