import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorMessage, successMessage } from "../utils/toast";
import axios from "axios";

const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const navigation = useNavigate();
  const [user, setUser] = useState(
    {
      refresh: "",
      access: "",
      firstname: "abdü samed",
      lastname: "akgül",
      is_customer_relations: false,
      is_operation_team: false,
      is_finance_team: false,
      is_teacher: false,
      is_normal_user: true,
      is_web_team: false,
      is_muhasebe: false
    });

  useEffect(() => {
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);
    setUser(myUser);
  }, []);

  const logout = () => {
    navigation("/giris-yap");
  };

  const login = async (phone, password) => {
    const cleanedNumber = phone?.replace(/[\s()-]/g, "");
    const transformedNumber = "90" + cleanedNumber;

    try {
      const response = await axios.post(
        `https://senka.valentura.com/api/users/auth/login`,
        {
          username: transformedNumber,
          password,
        }
      );
      if (response.data.token.access) {
        let userRole = getTrueKey(response.data);
        let dataUser = {
          refresh: response.data.token.refresh,
          access: response.data.token.access,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          role: userRole
        };
        setUser(dataUser);

        localStorage.setItem("user", JSON.stringify(dataUser));
        navigation("/");
      }
    } catch (error) {
      errorMessage("Giriş Yapılamadı!");
    }
  };

  const register = async (userInfo) => {
    console.log("user ınfo: ", userInfo);
    const cleanedNumber = userInfo?.phone?.replace(/[\s()-]/g, "");
    const transformedNumber = "90" + cleanedNumber;

    try {
      const response = await axios.post(
        `https://senka.valentura.com/api/users/auth/register`,
        {
          firstname: userInfo?.name,
          lastname: userInfo?.surname,
          phone: transformedNumber,
          email: userInfo?.email,
          okul: userInfo?.school,
          kampus: userInfo?.campus,
          unvan: userInfo?.title,
          birthday: userInfo?.birthday,
          is_male: userInfo?.gender == "male" ? true : false,
          password: userInfo?.password,
          password_again: userInfo?.password_again,
        }
      );

      if (response.data.error) {
        errorMessage("Kayıt olurken hata oluştu!");
      } else {
        successMessage("Kayıt işlemi başarılı!");
        navigation("/giris-yap");
      }
    } catch (error) {
      errorMessage("Kayıt Olurken Hata Oluştu!");
      console.log(error);
    }
  };

  const getTrueKey = (obj) => {
    for (const key in obj) {
      if (obj[key] === true) {
        return key;
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
