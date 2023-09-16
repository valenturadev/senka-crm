import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import TraveInputBox from "../../components/editInputBox/main";
import TravelRadioButton from "../../components/travelRadioButton/main";
import axios from "axios";
import AuthContext from "../../context/auth";
import { errorMessage, successMessage } from "../../utils/toast";
import TraveInputDateBox from "../../components/travelInputDateBox/main";
import CircularProgress from "@mui/material/CircularProgress";

const TravelDetail = () => {
  const { formId } = useParams();

  const { user } = useContext(AuthContext);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [campusName, setCampusName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [expectations, setExpectations] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [transfers, setTransfers] = useState("");
  const [programName, setProgramName] = useState("");
  const [travelCountry, setTravelCountry] = useState("");
  const [expectedDate, setExpectedDate] = useState(new Date());
  const [expectedStudentAmount, setExpectedStudentAmount] = useState("");
  const [classes, setClasses] = useState("");
  const [department, setDepartment] = useState("");
  const [locationOne, setLocationOne] = useState("");
  const [locationOneDeparture, setLocationOneDeparture] = useState(new Date());
  const [locationOneReturn, setLocationOneReturn] = useState(new Date());
  const [locationTwo, setLocationTwo] = useState("");
  const [locationtwoDeparture, setLocationTwoDeparture] = useState(new Date());
  const [locationTwoReturn, setLocationTwoReturn] = useState(new Date());
  const [locationThree, setLocationThree] = useState("");
  const [locationThreeDeparture, setLocationThreeDeparture] = useState(new Date());
  const [locationThreeReturn, setLocationThreeReturn] = useState(new Date());
  const [schoolName, setSchoolName] = useState("");
  const [city, setCity] = useState("");
  const [travelCity, setTravelCity] = useState("");
  const [returnCity, setReturnCity] = useState("");
  const [isApprove, setIsApprove] = useState(false)
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);
    try {
      const response = await axios.get(
        `https://senka.valentura.com/api/customer-relations/travel-forms/get-travel-form/id=${formId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          },
        }
      );
      const responseData = await response.data.data;
      setData(responseData);
      if (responseData) {
        setName(responseData.isim || "");
        setSurname(responseData.soyisim || "");
        setTitle(responseData.unvan || "");
        setPhone(responseData.tel_no || "");
        setMail(responseData.email || "");
        setExpectations(responseData.kazanim_ve_beklentiler || "");
        setDepartureDate(responseData.gidis_tarihi);
        setReturnDate(responseData.donus_tarihi);
        setTransfers(responseData.transferler || "");
        setProgramName(responseData.program_adi || "");
        setTravelCountry(responseData.ulke || "");
        setExpectedDate(responseData.ongorulen_tarih);
        setExpectedStudentAmount(responseData.ongorulen_ogrenci_sayisi || "");
        setClasses(responseData.ilgili_sinif || "");
        setDepartment(responseData.zumre || "");
        setLocationOne(responseData.lokasyon1 || "");
        setLocationOneDeparture(responseData.lokasyon1_cikis);
        setLocationOneReturn(responseData.lokasyon1_giris);
        setLocationTwo(responseData.lokasyon2 || "");
        setLocationTwoDeparture(responseData.lokasyon2_cikis);
        setLocationTwoReturn(responseData.lokasyon2_giris);
        setLocationThree(responseData.lokasyon3 || "");
        setLocationThreeDeparture(responseData.lokasyon3_cikis);
        setLocationThreeReturn(responseData.lokasyon3_giris);
        setSchoolName(responseData.okul || "");
        setCity(responseData.sehir || "");
        setTravelCity(responseData.gidilen_sehir || "");
        setReturnCity(responseData.dönülen_sehir || "");
        setCampusName(responseData.kampus_adi || "");
        setSelectedOption(responseData.ulasim_araci || "");
        setIsApprove(responseData.travel_form_is_approve || false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTravelForm = async () => {
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);
    try {
      setLoading(true);
      const response = await axios.post(
        `https://senka.valentura.com/api/customer-relations/travel-forms/edit-travel-form/id=${formId}`,
        {
          kampus_adi: campusName,
          okul_adi: schoolName,
          isim: name,
          soyisim: surname,
          unvan: title,
          tel_no: phone,
          email: mail,
          program_adi: programName,
          ulke: travelCountry,
          sehir: city,
          ongorulen_tarih: expectedDate,
          ongorulen_ogrenci_sayisi: expectedStudentAmount,
          ilgili_sinif: classes,
          ilgili_zumre: department,
          kazanim_ve_beklentiler: expectations,
          ulasim_araci: selectedOption,
          gidis_tarihi: departureDate,
          donus_tarihi: returnDate,
          gidilecek_sehir: travelCity,
          donulecek_sehir: returnCity,
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
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          },
        }
      );
      setLoading(false);
      successMessage("Seyahat formu başarıyla güncellendi!")
    } catch (error) {
      errorMessage("Seyahat formu düzenlenirken hata oluştu!")
      console.error(error);
    }
  };

  const verifyTravelForm = async () => {
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);
    try {
      const response = await axios.get(
        `https://senka.valentura.com/api/customer-relations/travel-forms/approve-travel-form/id=${formId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myUser?.access}`,
          },
        }
      );
      successMessage("Form başarıyla onaylandı!");
    } catch (error) {
      console.log(error);
    }
  };

  const declineTravelForm = async () => {
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);
    try {
      const response = await axios.get(
        `https://senka.valentura.com/api/customer-relations/travel-forms/reject-travel-form/id=${formId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myUser?.access}`,
          },
        }
      );
      successMessage("Form başarıyla reddedildi!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                  <div className="flex flex-row items-center">
                    {isApprove ?
                      <button
                        disabled
                        className="text-white text-center font-medium font-poppins text-m leading-5 bg-yellow-500 border-none rounded-lg w-36 h-12 flex flex-col justify-center my-[5.12px] items-center"
                      >
                        KABUL EDİLMİŞ
                      </button>
                      : <button
                        onClick={() => {
                          verifyTravelForm();
                        }}
                        className="text-white text-center font-medium font-poppins text-xl leading-5 bg-green-500 border-none rounded-lg w-36 h-12 flex flex-col justify-center my-[5.12px] items-center"
                      >
                        KABUL ET
                      </button>}
                    <button
                      onClick={() => {
                        declineTravelForm();
                      }}
                      className="text-white text-center font-medium font-poppins text-xl leading-5 bg-red-500 border-none rounded-lg w-36 h-12 flex flex-col justify-center my-[5.12px] items-center ml-2"
                    >
                      REDDET
                    </button>
                  </div>
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
                        <TraveInputDateBox
                          label="Gidiş Tarihi:"
                          id="gidis_tarihi"
                          selectedDate={new Date(departureDate)}
                          onChange={date => setDepartureDate(date)}
                        />
                      </div>
                      <div className='min-md-w-[531px]'>
                        <TraveInputDateBox
                          label="Dönüş Tarihi:"
                          id="donus_tarihi"
                          selectedDate={new Date(returnDate)}
                          onChange={date => setReturnDate(date)}
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
                        <TraveInputDateBox
                          label="Ön Görülen Tarih:"
                          id="on_gorulen_tarih"
                          selectedDate={new Date(expectedDate)}
                          onChange={date => setExpectedDate(date)}
                        />
                      </div>
                      <div className="min-md-w-[531px]">
                        <TraveInputBox
                          label="Ön Görülen Öğrenci Sayısı:"
                          id="ongorulen_ogrenci_sayisi"
                          placeholder=""
                          value={expectedStudentAmount}
                          onChange={(e) =>
                            setExpectedStudentAmount(e.target.value)
                          }
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
                        <TraveInputDateBox
                          label="Giriş Tarihi:"
                          id="giris_tarihi"
                          selectedDate={new Date(locationOneDeparture)}
                          onChange={date => setLocationOneDeparture(date)}
                        />
                      </div>
                      <div className="md:min-w-[231px]">
                        <TraveInputDateBox
                          label="Çıkış Tarihi:"
                          id="cikis_tarihi_1"
                          selectedDate={new Date(locationOneReturn)}
                          onChange={date => setLocationOneReturn(date)}
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
                        <TraveInputDateBox
                          label="Giriş Tarihi:"
                          id="giris_tarihi_2"
                          selectedDate={new Date(locationtwoDeparture)}
                          onChange={date => setLocationTwoDeparture(date)}
                        />
                      </div>
                      <div className="md:min-w-[231px]">
                        <TraveInputDateBox
                          label="Çıkış Tarihi:"
                          id="cikis_tarihi_2"
                          selectedDate={new Date(locationTwoReturn)}
                          onChange={date => setLocationTwoReturn(date)}
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
                        <TraveInputDateBox
                          label="Giriş Tarihi:"
                          id="giris_tarihi_3"
                          selectedDate={new Date(locationThreeDeparture)}
                          onChange={date => setLocationThreeDeparture(date)}
                        />
                      </div>
                      <div className="md:min-w-[231px]">
                        <TraveInputDateBox
                          label="Çıkış Tarihi:"
                          id="cikis_tarihi_3"
                          selectedDate={new Date(locationThreeReturn)}
                          onChange={date => setLocationThreeReturn(date)}
                        />
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
                  {
                    loading ?
                      <div style={{ width: "300px", marginLeft: 30, marginTop: "12px" }}>
                        <CircularProgress style={{ 'color': 'red' }} />
                      </div> :
                      <button
                        onClick={() => {
                          editTravelForm();
                        }}
                        className="text-white text-center font-medium font-poppins text-3xl font-normal leading-5 bg-red-500 border-none rounded-lg w-52 h-14 flex flex-col justify-center my-[5.12px] items-center"
                      >
                        DÜZENLE
                      </button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TravelDetail;
