import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import TraveInputBox from "../../components/editInputBox/main";
import TravelRadioButton from "../../components/travelRadioButton/main";
import axios from "axios";
import AuthContext from "../../context/auth";
import { errorMessage, successMessage } from "../../utils/toast";

const TravelDetail = () => {
  const { formId } = useParams();

  const { user } = useContext(AuthContext);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [campusName, setCampusName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [expectations, setExpectations] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [transfers, setTransfers] = useState("");
  const [programName, setProgramName] = useState("");
  const [travelCountry, setTravelCountry] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [expectedStudentAmount, setExpectedStudentAmount] = useState("");
  const [classes, setClasses] = useState("");
  const [department, setDepartment] = useState("");
  const [locationOne, setLocationOne] = useState("");
  const [locationOneDeparture, setLocationOneDeparture] = useState("");
  const [locationOneReturn, setLocationOneReturn] = useState("");
  const [locationTwo, setLocationTwo] = useState("");
  const [locationtwoDeparture, setLocationTwoDeparture] = useState("");
  const [locationTwoReturn, setLocationTwoReturn] = useState("");
  const [locationThree, setLocationThree] = useState("");
  const [locationThreeDeparture, setLocationThreeDeparture] = useState("");
  const [locationThreeReturn, setLocationThreeReturn] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [city, setCity] = useState("");
  const [travelCity, setTravelCity] = useState("");
  const [returnCity, setReturnCity] = useState("");
  const [activities, setActivities] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://senka.valentura.com/api/müşteri_ilişkileri/Api/get-travel-form/travel-form-id=${formId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "token 6eb4d112b1041a9e1d3ffe273615ae789441f197",
          },
        }
      );
      const responseData = await response.data.data[0];
      setData(responseData);
      setLoading(false);

      if (responseData) {
        setName(responseData.isim || "");
        setSurname(responseData.soyisim || "");
        setTitle(responseData.ünvan || "");
        setPhone(responseData.tel_no || "");
        setMail(responseData.email || "");
        setExpectations(responseData.kazanım_ve_beklentiler || "");
        setDepartureDate(responseData.gidis_tarihi || "");
        setReturnDate(responseData.dönüs_tarihi || "");
        setTransfers(responseData.transferler || "");
        setProgramName(responseData.program_adi || "");
        setTravelCountry(responseData.ülke || "");
        setExpectedDate(responseData.öngörülen_tarih || "");
        setExpectedStudentAmount(responseData.öngörülen_öğrenci_sayısı || "");
        setClasses(responseData.ilgili_sınıf || "");
        setDepartment(responseData.zumre || "");
        setLocationOne(responseData.lokasyon1 || "");
        setLocationOneDeparture(responseData.lokasyon1_cikis || "");
        setLocationOneReturn(responseData.lokasyon1_giris || "");
        setLocationTwo(responseData.lokasyon2 || "");
        setLocationTwoDeparture(responseData.lokasyon2_cikis || "");
        setLocationTwoReturn(responseData.lokasyon2_giris || "");
        setLocationThree(responseData.lokasyon3 || "");
        setLocationThreeDeparture(responseData.lokasyon3_cikis || "");
        setLocationThreeReturn(responseData.lokasyon3_giris || "");
        setSchoolName(responseData.okul || "");
        setCity(responseData.sehir || "");
        setTravelCity(responseData.gidilen_sehir || "");
        setReturnCity(responseData.dönülen_sehir || "");
        setCampusName(responseData.kampus_adi || "");
        setSelectedOption(responseData.ulasım_araci || "");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const editTravelForm = async () => {
    try {
      const response = await axios.post(
        `https://senka.valentura.com/api/müşteri_ilişkileri/Api/edit-travel-form/travel-form-id=${formId}`,
        {
          kampus_adi: campusName,
          okul_adi: "gazi",
          isim: name,
          soyisim: surname,
          ünvan: title,
          tel_no: phone,
          email: mail,
          program_adi: programName,
          ülke: travelCountry,
          sehir: "ankara",
          öngörülen_tarih: expectedDate,
          öngörülen_ogrenci_sayisi: expectedStudentAmount,
          ilgili_sinif: classes,
          ilgili_zumre: department,
          kazanim_ve_beklentiler: expectations,
          ulasim_araci: selectedOption,
          gidis_tarihi: departureDate,
          dönüs_tarihi: returnDate,
          gidilecek_sehir: "antalya",
          dönülecek_sehir: "istanbul",
          transferler: transfers,
          lokasyon1: locationOne,
          lokasyon1_giris: locationOneDeparture,
          lokasyon1_cikis: locationOneReturn,
          lokasyon2: locationTwo,
          lokasyon2_giris: locationtwoDeparture,
          lokasyon2_cikis: locationTwoReturn,
          lokasyon3: locationThree,
          lokasyon3_giris: locationThreeDeparture,
          lokasyon3_cikis: locationThreeReturn,
          aktivite_ve_beklentiler: activities,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "token 6eb4d112b1041a9e1d3ffe273615ae789441f197",
          },
        }
      );

      console.log(response.data); // Output the response data
    } catch (error) {
      console.error(error);
    }
  };

  const verifyTravelForm = async () => {
    try {
      const response = await axios.get(
        `https://senka.valentura.com/api/müşteri_ilişkileri/Api/verify-travel-forms/travel-id=${formId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user?.token}`,
          },
        }
      );

      console.log(response.data); // Output the response data

      successMessage("Form başarıyla onaylandı!");
    } catch (error) {
      console.log(error);
    }
  };

  const declineTravelForm = async () => {
    try {
      const response = await axios.get(
        `https://senka.valentura.com/api/müşteri_ilişkileri/Api/non-verify-travel-forms/travel-id=${formId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user?.token}`,
          },
        }
      );

      console.log(response.data); // Output the response data
      errorMessage("Form başarıyla reddedildi!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user?.role === "is_customer_relations" ? (
        <div>
          <h2 className="text-3xl font-medium leading-none mt-3">
            Seyahat Formunu Düzenle
          </h2>
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="col-span-1">
                <div className="bg-white dark:bg-[#232D45] shadow overflow-hidden sm:rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Seyahat Formu
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                        Seyahat Formu ile ilgili bilgileri düzenleyebilirsiniz.
                      </p>
                    </div>
                    {user?.role === "is_customer_relations" && (
                      <div className="flex flex-row">
                        <button
                          onClick={() => {
                            verifyTravelForm();
                          }}
                          className="text-white text-center font-medium font-poppins text-xl leading-5 bg-green-500 border-none rounded-lg w-36 h-12 flex flex-col justify-center my-[5.12px] items-center"
                        >
                          KABUL ET
                        </button>
                        <button
                          onClick={() => {
                            declineTravelForm();
                          }}
                          className="text-white text-center font-medium font-poppins text-xl leading-5 bg-red-500 border-none rounded-lg w-36 h-12 flex flex-col justify-center my-[5.12px] items-center ml-2"
                        >
                          REDDET
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="relative mt-8">
                      <div className="md-w-[531px] mb-[11.64px]">
                        <TraveInputBox
                          label="Kampüs Adı"
                          id="campusName"
                          placeholder=""
                          value={campusName}
                          onChange={(e) => setCampusName(e.target.value)}
                          classNa={""}
                        />
                      </div>
                    </div>
                    <h2 className="text-base font-semibold flex flex-shrink-0 w-135 mb-[22.36px] flex-col justify-center text-red-500 font-Poppins font-semibold text-19.393 leading-21.332">
                      KİŞİ BİLGİLERİ{" "}
                    </h2>
                    <div>
                      <div className="my-[20.36px] flex flex-wrap gap-[26.36px]">
                        <div className="flex gap-4  w-full">
                          {" "}
                          <div className="w-full">
                            <TraveInputBox
                              label="Adı:"
                              id="fullName"
                              placeholder=""
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              classNa={""}
                            />
                          </div>
                          <div className="w-full mr-6">
                            <TraveInputBox
                              label="Soyadı:"
                              id="fullName"
                              placeholder=""
                              value={surname}
                              onChange={(e) => setSurname(e.target.value)}
                              classNa={""}
                            />
                          </div>
                        </div>

                        <div className="min-md-w-[531px]">
                          <TraveInputBox
                            label="Ünvanı:"
                            id="title"
                            placeholder=""
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            classNa={""}
                          />
                        </div>
                        <div className="min-md-w-[531px]">
                          <TraveInputBox
                            label="Cep Telefonu:"
                            id="telNo"
                            placeholder=""
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            classNa={""}
                          />
                        </div>
                        <div className="min-md-w-[531px]">
                          <TraveInputBox
                            label="Eposta Adresi:"
                            id="campusName"
                            placeholder=""
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            classNa={""}
                          />
                        </div>
                      </div>
                    </div>

                    <h2 className="text-base font-semibold flex flex-shrink-0 w-135 mb-[22.36px] flex-col justify-center text-red-500 font-Poppins font-semibold text-19.393 leading-21.332">
                      KAZANIMLAR VE BEKLENTİLER{" "}
                    </h2>
                    <div>
                      <div className="my-[20.36px] flex flex-col">
                        <div className="min-w-full ">
                          <textarea
                            type="text"
                            id="outcomeExpectation"
                            value={expectations}
                            onChange={(e) => setExpectations(e.target.value)}
                            className="block min-h-[110px] text-start h-full dark:text-white dark:bg-[#232D45] bg-[#F1F5F9] w-full px-4 py-2 border border-gray-500 rounded-xl focus:ring focus:ring-red-300 focus:outline-none focus:border-red-300 transition-all duration-300"
                          />
                        </div>
                        <p className="text-red-500 font-Poppins font-semibold text-16.484 leading-21.332 flex flex-shrink-0 w-994 flex-col justify-center">
                          Size daha iyi program hazırlayabilmemiz için aşağıdaki
                          konularda detaylı bilgilendirme vermenizi önemle rica
                          ederiz.
                        </p>
                      </div>
                    </div>

                    <h2 className="text-base font-semibold mb-4 flex flex-shrink-0 w-135 flex-col justify-center text-red-500 font-Poppins font-semibold text-19.393 leading-21.332">
                      PROGRAM DETAYI
                    </h2>

                    <div>
                      <div>
                        <span className="mr-[45px] px-2 font-normal text-[#6C6A6A] left-[7px] -top-[13.2px] dark:text-white  text-gray-500 pointer-events-none transition-all duration-300">
                          {" "}
                          Gezi Ulaşım Aracı :
                        </span>
                        <TravelRadioButton
                          value="uçak"
                          checked={selectedOption === "uçak"}
                          label="Uçak"
                        />

                        <TravelRadioButton
                          value="otobüs"
                          checked={selectedOption === "otobüs"}
                          label="Otobüs"
                        />
                      </div>
                      <div className="my-[20.36px] flex flex-wrap gap-[26.36px]">
                        <div className="min-md-w-[531px]">
                          <TraveInputBox
                            label="Gidiş Tarihi:"
                            id="fullName"
                            placeholder=""
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            classNa={""}
                          />
                        </div>
                        <div className="min-md-w-[531px]">
                          <TraveInputBox
                            label="Dönüş Tarihi:"
                            id="title"
                            placeholder=""
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            classNa={""}
                          />
                        </div>
                        <div className="min-w-full">
                          <TraveInputBox
                            label="Transferler:"
                            id="title"
                            placeholder=""
                            value={transfers}
                            onChange={(e) => setTransfers(e.target.value)}
                            classNa={""}
                          />
                        </div>
                      </div>
                    </div>

                    <h2 className="text-base font-semibold flex flex-shrink-0 w-135 mb-[22.36px] flex-col justify-center text-red-500 font-Poppins font-semibold text-19.393 leading-21.332">
                      TALEP EDİLEN GEZİ BİLGİLERİ{" "}
                    </h2>
                    <div>
                      <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                        <div className="min-md-w-[531px]">
                          <TraveInputBox
                            label="Program Adı:"
                            id="fullName"
                            placeholder=""
                            value={programName}
                            onChange={(e) => setProgramName(e.target.value)}
                            classNa={""}
                          />
                        </div>
                        <div className="min-md-w-[531px]">
                          <TraveInputBox
                            label="Gidilecek Ülke/Şehir(ler):"
                            id="title"
                            placeholder=""
                            value={travelCountry}
                            onChange={(e) => setTravelCountry(e.target.value)}
                            classNa={""}
                          />
                        </div>
                        <div className="min-md-w-[531px]">
                          <TraveInputBox
                            label="Ön Görülen Tarih:"
                            id="telNo"
                            placeholder=""
                            value={expectedDate}
                            onChange={(e) => setExpectedDate(e.target.value)}
                            classNa={""}
                          />
                        </div>
                        <div className="min-md-w-[531px]">
                          <TraveInputBox
                            label="Ön Görülen Öğrenci Sayısı:"
                            id="campusName"
                            placeholder=""
                            value={expectedStudentAmount}
                            onChange={(e) =>
                              setExpectedStudentAmount(e.target.value)
                            }
                            classNa={""}
                          />
                        </div>
                        <div className="min-md-w-[531px]">
                          <TraveInputBox
                            label="İlgili Sınıf/Sınıflar:"
                            id="telNo"
                            placeholder=""
                            value={classes}
                            onChange={(e) => setClasses(e.target.value)}
                            classNa={""}
                          />
                        </div>
                        <div className="min-md-w-[531px]">
                          <TraveInputBox
                            label="İlgili Zümre:"
                            id="campusName"
                            placeholder=""
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            classNa={""}
                          />
                        </div>
                      </div>
                    </div>
                    <h2 className="text-base font-semibold flex flex-shrink-0 w-135 mb-[22.36px] flex-col justify-center dark:text-red-500 text-[#6C6A6A] font-Poppins font-semibold text-19.393 leading-21.332">
                      KONAKLAMA
                    </h2>
                    <div>
                      <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                        <div className="md:min-w-[231px]">
                          <TraveInputBox
                            label="1.Lokasyon:"
                            id="fullName"
                            placeholder=""
                            value={locationOne}
                            onChange={(e) => setLocationOne(e.target.value)}
                            classNa={""}
                          />
                        </div>
                        <div className="md:min-w-[231px]">
                          <TraveInputBox
                            label="Giriş Tarihi:"
                            id="title"
                            placeholder=""
                            value={locationOneDeparture}
                            onChange={(e) =>
                              setLocationOneDeparture(e.target.value)
                            }
                            classNa={""}
                          />
                        </div>
                        <div className="md:min-w-[231px]">
                          <TraveInputBox
                            label="Çıkış Tarihi:"
                            id="telNo"
                            placeholder=""
                            value={locationOneReturn}
                            onChange={(e) =>
                              setLocationOneReturn(e.target.value)
                            }
                            classNa={""}
                          />
                        </div>
                      </div>
                      <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                        <div className="md:min-w-[231px]">
                          <TraveInputBox
                            label="2.Lokasyon:"
                            id="fullName"
                            placeholder=""
                            value={locationTwo}
                            onChange={(e) => setLocationTwo(e.target.value)}
                            classNa={""}
                          />
                        </div>
                        <div className="md:min-w-[231px]">
                          <TraveInputBox
                            label="Giriş Tarihi:"
                            id="title"
                            placeholder=""
                            value={locationtwoDeparture}
                            onChange={(e) =>
                              setLocationTwoDeparture(e.target.value)
                            }
                            classNa={""}
                          />
                        </div>
                        <div className="md:min-w-[231px]">
                          <TraveInputBox
                            label="Çıkış Tarihi:"
                            id="telNo"
                            placeholder=""
                            value={locationTwoReturn}
                            onChange={(e) =>
                              setLocationTwoReturn(e.target.value)
                            }
                            classNa={""}
                          />
                        </div>
                      </div>
                      <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                        <div className="md:min-w-[231px]">
                          <TraveInputBox
                            label="3.Lokasyon:"
                            id="fullName"
                            placeholder=""
                            value={locationThree}
                            onChange={(e) => setLocationThree(e.target.value)}
                            classNa={""}
                          />
                        </div>
                        <div className="md:min-w-[231px]">
                          <TraveInputBox
                            label="Giriş Tarihi:"
                            id="title"
                            placeholder=""
                            value={locationThreeDeparture}
                            onChange={(e) =>
                              setLocationThreeDeparture(e.target.value)
                            }
                            classNa={""}
                          />
                        </div>
                        <div className="md:min-w-[231px]">
                          <TraveInputBox
                            label="Çıkış Tarihi:"
                            id="telNo"
                            placeholder=""
                            value={locationThreeReturn}
                            onChange={(e) =>
                              setLocationThreeReturn(e.target.value)
                            }
                            classNa={""}
                          />
                        </div>
                      </div>
                      <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                        <div className="my-[20.36px] flex flex-col w-full">
                          <div className="min-w-full ">
                            <div className="relative">
                              <label
                                htmlFor={"fullName"}
                                className={`absolute px-2 font-normal left-[7px] -top-[13.2px] dark:text-white dark:bg-[#232D45] bg-[#F1F5F9] text-gray-500 pointer-events-none transition-all duration-300`}
                              >
                                Aktiviteler ve Diğer Beklentiler:
                              </label>
                              <textarea
                                type="text"
                                id="outcomeExpectation"
                                value={activities}
                                onChange={(e) => setActivities(e.target.value)}
                                className="block min-h-[110px] text-start h-full dark:text-white dark:bg-[#232D45] bg-[#F1F5F9] w-full px-4 py-2 border border-gray-500 rounded-xl focus:ring focus:ring-red-300 focus:outline-none focus:border-red-300 transition-all duration-300"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-red-500 font-Poppins font-semibold text-16.484 leading-21.332 flex flex-shrink-0 w-994 flex-col justify-center">
                        NOT: * Lütfen elinizde varsa günlük program detayını
                        bizimle paylaşınız.{" "}
                      </p>
                      <p className="text-red-500 font-Poppins font-semibold text-16.484 leading-21.332 flex flex-shrink-0 w-994 flex-col justify-center">
                        ** Gezi talebinize en geç 3 iş günü içerisinde dönüş
                        yapılacaktır.{" "}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        editTravelForm();
                      }}
                      className="text-white text-center font-medium font-poppins text-3xl font-normal leading-5 bg-red-500 border-none rounded-lg w-52 h-14 flex flex-col justify-center my-[5.12px] items-center"
                    >
                      DÜZENLE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="
                  flex
                  items-center
                  justify-center
                  h-screen
                  bg-gradient-to-r
                  from-indigo-600
                  to-blue-400"
        >
          <div class="px-40 py-20 bg-white rounded-md shadow-xl">
            <div class="flex flex-col items-center">
              <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span class="text-red-500">Oops!</span> Yetkiniz YOK
              </h6>

              <p class="text-center text-gray-500 md:text-lg">
                Burayı yalnızca müşteri ilişkileri görebilir.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TravelDetail;
