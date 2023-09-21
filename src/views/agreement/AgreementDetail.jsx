import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import TraveInputBox from "../../components/editInputBox/main";
import TravelRadioButton from "../../components/travelRadioButton/main";
import axios from "axios";
import AuthContext from "../../context/auth";
import { errorMessage, successMessage } from "../../utils/toast";

const AgreementDetail = () => {
    const { formId } = useParams();

    const { user, logout } = useContext(AuthContext);
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

    // Expected travel-form

    const [vehicleUnitPrice, setvehicleUnitPrice] = useState(0);
    const [vehicleTotalPrice, setvehicleTotalPrice] = useState(0);
    const [hotelName, setHotelName] = useState("");
    const [roomAmount, setRoomAmount] = useState(0);
    const [stayingDayAmount, setStayingDayAmount] = useState(0)
    const [hotelTotalPrice, setHotelTotalPrice] = useState(0)
    const [hotelSNGUnitPrice, sethotelSNGUnitPrice] = useState(0)
    const [hotelDBLUnitPrice, sethotelDBLUnitPrice] = useState(0)
    const [hotelTRPUnitPrice, sethotelTRPUnitPrice] = useState(0)
    const [guidePrice, setGuidePrice] = useState(0)
    const [guidePerDayMealUnitPrice, setGuidePerDayMealUnitPrice] = useState(0)
    const [guideDayAmount, setGuideDayAmount] = useState(0)
    const [guideYDPrice, setGuideYDPrice] = useState(0)
    const [guideTotalPrice, setGuideTotalPrice] = useState(0)
    const [teacherPerDayPrice, setTeacherPerDayPrice] = useState(0)
    const [teacherNumberOfPeople, setTeacherNumberOfPeople] = useState(0)
    const [teacherYDPrice, setTeacherYDPrice] = useState(0)
    const [teacherTotalPrice, setTeacherTotalPrice] = useState(0)
    const [entrancePlaces, setEntrancePlaces] = useState([])
    const [entrancePlacesUnitPrice, setEntrancePlacesUnitPrice] = useState([])
    const [entrancePlacesTotalPrice, setEntrancePlacesTotalPrice] = useState(0)
    const [isApprove, setIsApprove] = useState(false)


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let localUser = localStorage.getItem("user");
        let myUser = JSON.parse(localUser);
        try {
            const response = await axios.get(
                `https://senka.valentura.com/api/operation-team/mutabakat/get-mutabakat-form/id=${formId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${myUser?.access}`
                    },
                }
            );
            const responseData = await response.data.data;
            setData(responseData);
            setLoading(false);

            if (responseData) {
                setName(responseData.isim || "");
                setSurname(responseData.soyisim || "");
                setTitle(responseData.unvan || "");
                setPhone(responseData.tel_no || "");
                setMail(responseData.email || "");
                setExpectations(responseData.kazanim_ve_beklentiler || "");
                setDepartureDate(responseData.gidis_tarihi || "");
                setReturnDate(responseData.donus_tarihi || "");
                setTransfers(responseData.transferler || "");
                setProgramName(responseData.program_adi || "");
                setTravelCountry(responseData.ulke || "");
                setExpectedDate(responseData.ongorulen_tarih || "");
                setExpectedStudentAmount(responseData.ongorulen_ogrenci_sayısı || "");
                setClasses(responseData.ilgili_sinif || "");
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

                setvehicleUnitPrice(responseData.ulasim_araci_birim_fiyati || 0);
                setvehicleTotalPrice(responseData.ulasim_araci_toplam_fiyati || 0);
                setHotelName(responseData.otel_ismi || "");
                setRoomAmount(responseData.oda_sayisi || 0);
                setStayingDayAmount(responseData.kalinacak_gun_sayisi || 0);
                setHotelTotalPrice(responseData.otel_toplam_fiyat || 0);
                sethotelSNGUnitPrice(responseData.otel_SNG_birim_fiyat || 0);
                sethotelDBLUnitPrice(responseData.otel_DBL_birim_fiyat || 0);
                sethotelTRPUnitPrice(responseData.otel_TRP_birim_fiyat || 0);
                setGuidePrice(responseData.rehber_yevmiyesi || 0);
                setGuidePerDayMealUnitPrice(responseData.rehber_gunluk_yemek_birim_fiyati || 0);
                setGuideDayAmount(responseData.rehber_gun_sayisi || 0);
                setGuideYDPrice(responseData.rehber_YD_harc || 0);
                setGuideTotalPrice(responseData.rehber_toplam_fiyat || 0);
                setTeacherPerDayPrice(responseData.ogretmen_yevmiyesi || 0);
                setTeacherNumberOfPeople(responseData.ogretmen_kisi_sayisi || 0);
                setTeacherYDPrice(responseData.ogretmen_YD_harc || 0);
                setTeacherTotalPrice(responseData.ogretmen_toplam_fiyat || 0);
                setEntrancePlaces(responseData.giris_yapilan_yerler || "");
                setEntrancePlacesUnitPrice(responseData.giris_yerleri_birim_fiyatlari || "");
                setEntrancePlacesTotalPrice(responseData.giris_yapilan_yer_toplam_fiyat || 0);
                setIsApprove(responseData.is_approve || false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const editTravelForm = async () => {
        let localUser = localStorage.getItem("user");
        let myUser = JSON.parse(localUser);
        try {
            axios(
                {
                    method: 'PATCH',
                    url: `https://senka.valentura.com/api/operation-team/mutabakat/edit-mutabakat-form/id=${formId}`,
                    data: {
                        ulasim_araci_birim_fiyati: vehicleUnitPrice,
                        otel_ismi: hotelName,
                        oda_sayisi: roomAmount,
                        kalinacak_gun_sayisi: stayingDayAmount,
                        otel_SNG_birim_fiyat: hotelSNGUnitPrice,
                        otel_DBL_birim_fiyat: hotelDBLUnitPrice,
                        otel_TRP_birim_fiyat: hotelTRPUnitPrice,
                        rehber_yevmiyesi: guidePrice,
                        rehber_gunluk_yemek_birim_fiyati: guidePerDayMealUnitPrice,
                        rehber_gun_sayisi: guideDayAmount,
                        rehber_YD_harc: guideYDPrice,
                        ogretmen_yevmiyesi: teacherPerDayPrice,
                        ogretmen_kisi_sayisi: teacherNumberOfPeople,
                        ogretmen_YD_harc: teacherYDPrice,
                        giris_yapilan_yerler: entrancePlaces,
                        giris_yerleri_birim_fiyatlari: entrancePlacesUnitPrice,
                    },
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${myUser?.access}`
                    },
                }
            );
            successMessage("Form düzenlendi!")
            getData()
        } catch (error) {
            errorMessage("Form düzenlenirken bir hata oluştu!")
            console.error(error);
        }
    };

    const verifyMutabakatForm = async () => {
        let localUser = localStorage.getItem("user");
        let myUser = JSON.parse(localUser);
        try {
            const response = await axios.get(
                `https://senka.valentura.com/api/operation-team/mutabakat/approve-mutabakat-form/id=${formId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${myUser?.access}`
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    const declineMutabakatForm = async () => {
        let localUser = localStorage.getItem("user");
        let myUser = JSON.parse(localUser);
        try {
            const response = await axios.get(
                `https://senka.valentura.com/api/finans/Api/non-verify-mutabakat-form/mutabakat-id=${formId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${myUser?.access}`
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            <div>
                <h2 className="text-3xl font-medium leading-none mt-3">
                    Mutabakat Formunu Düzenle
                </h2>
                <div className="mt-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="col-span-1">
                            <div className="bg-white dark:bg-[#232D45] shadow overflow-hidden sm:rounded-lg">
                                <div className="flex flex-row items-center">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                            Mutabakat Formu
                                        </h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                            Mutabakat Formu ile ilgili bilgileri düzenleyebilirsiniz.
                                        </p>
                                    </div>
                                    <div className="flex flex-row">
                                        <button
                                            onClick={() => {
                                                verifyMutabakatForm()
                                            }}
                                            className="text-white text-center font-medium font-poppins text-xl font-normal leading-5 bg-green-500 border-none rounded-lg w-36 h-12 flex flex-col justify-center my-[5.12px] items-center"
                                        >
                                            KABUL ET
                                        </button>
                                        <button
                                            onClick={() => {
                                                declineMutabakatForm()
                                            }}
                                            className="text-white text-center font-medium font-poppins text-xl font-normal leading-5 bg-red-500 border-none rounded-lg w-36 h-12 flex flex-col justify-center my-[5.12px] items-center ml-2"
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
                                                readOnly={true}
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
                                                        readOnly={true}
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
                                                        readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    className="block min-h-[110px] text-start h-full dark:text-white dark:bg-[#bddeff] bg-[#bddeff] w-full px-4 py-2 border border-gray-500 rounded-xl focus:ring focus:ring-red-300 focus:outline-none focus:border-red-300 transition-all duration-300"
                                                    readOnly={true}
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
                                                readOnly={true}
                                            />
                                            <TravelRadioButton
                                                value="otobüs"
                                                checked={selectedOption === "otobüs"}
                                                label="Otobüs"
                                                readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Çıkış Tarihi:"
                                                    id="telNo"
                                                    placeholder=""
                                                    value={locationOneReturn}
                                                    onChange={(e) => setLocationOneReturn(e.target.value)}
                                                    classNa={""}
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Çıkış Tarihi:"
                                                    id="telNo"
                                                    placeholder=""
                                                    value={locationTwoReturn}
                                                    onChange={(e) => setLocationTwoReturn(e.target.value)}
                                                    classNa={""}
                                                    readOnly={true}
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
                                                    readOnly={true}
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
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Çıkış Tarihi:"
                                                    id="telNo"
                                                    placeholder=""
                                                    value={locationThreeReturn}
                                                    onChange={(e) => setLocationThreeReturn(e.target.value)}
                                                    classNa={""}
                                                    readOnly={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className="text-base font-semibold flex flex-shrink-0 w-135 mb-[22.36px] flex-col justify-center dark:text-red-500 text-[#6C6A6A] font-Poppins font-semibold text-19.393 leading-21.332">
                                        FİYATLAMA
                                    </h2>
                                    <div>
                                        <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Ulaşım Aracı Birim Fiyatı:"
                                                    id="vehicleUnitPrice"
                                                    placeholder=""
                                                    value={vehicleUnitPrice}
                                                    onChange={(e) => setvehicleUnitPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Ulaşım Aracı Toplam Fiyatı:"
                                                    id="vehicleTotalPrice"
                                                    placeholder=""
                                                    value={vehicleTotalPrice}
                                                    onChange={(e) =>
                                                        setvehicleTotalPrice(e.target.value)
                                                    }
                                                    classNa={""}
                                                />
                                            </div>
                                        </div>
                                        <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Otel İsmi:"
                                                    id="hotelName"
                                                    placeholder=""
                                                    value={hotelName}
                                                    onChange={(e) => setHotelName(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Oda Sayısı:"
                                                    id="roomAmount"
                                                    placeholder=""
                                                    value={roomAmount}
                                                    onChange={(e) => setRoomAmount(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                        </div>
                                        <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Kalınacak Gün Sayısı:"
                                                    id="stayingDayAmount"
                                                    placeholder=""
                                                    value={stayingDayAmount}
                                                    onChange={(e) => setStayingDayAmount(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Otel Toplam Fiyat:"
                                                    id="hotelTotalPrice"
                                                    placeholder=""
                                                    value={hotelTotalPrice}
                                                    onChange={(e) =>
                                                        setHotelTotalPrice(e.target.value)
                                                    }
                                                    classNa={""}
                                                />
                                            </div>
                                        </div>
                                        <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Otel DBL Birim Fiyatı:"
                                                    id="hotelDBLUnitPrice"
                                                    placeholder=""
                                                    value={hotelDBLUnitPrice}
                                                    onChange={(e) => sethotelDBLUnitPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Otel SNG Birim Fiyatı:"
                                                    id="hotelSNGUnitPrice"
                                                    placeholder=""
                                                    value={hotelSNGUnitPrice}
                                                    onChange={(e) => sethotelSNGUnitPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Otel TRP Birim Fiyatı:"
                                                    id="hotelTRPUnitPrice"
                                                    placeholder=""
                                                    value={hotelTRPUnitPrice}
                                                    onChange={(e) => sethotelTRPUnitPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                        </div>
                                        <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Rehber Yevmiyesi:"
                                                    id="guidePrice"
                                                    placeholder=""
                                                    value={guidePrice}
                                                    onChange={(e) => setGuidePrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Rehber Yemek Birim Fiyatı:"
                                                    id="guidePerDayMealUnitPrice"
                                                    placeholder=""
                                                    value={guidePerDayMealUnitPrice}
                                                    onChange={(e) => setGuidePerDayMealUnitPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Rehber Gün Sayısı:"
                                                    id="guideDayAmount"
                                                    placeholder=""
                                                    value={guideDayAmount}
                                                    onChange={(e) => setGuideDayAmount(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Rehber YD Harç:"
                                                    id="guideYDPrice"
                                                    placeholder=""
                                                    value={guideYDPrice}
                                                    onChange={(e) => setGuideYDPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Rehber Toplam Fiyatı:"
                                                    id="guideTotalPrice"
                                                    placeholder=""
                                                    value={guideTotalPrice}
                                                    onChange={(e) => setGuideTotalPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                        </div>
                                        <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Öğretmen Yevmiyesi:"
                                                    id="teacherPerDayPrice"
                                                    placeholder=""
                                                    value={teacherPerDayPrice}
                                                    onChange={(e) => setTeacherPerDayPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Öğretmen Kişi Sayısı:"
                                                    id="teacherNumberOfPeople"
                                                    placeholder=""
                                                    value={teacherNumberOfPeople}
                                                    onChange={(e) => setTeacherNumberOfPeople(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Öğretmen YD Harç:"
                                                    id="teacherYDPrice"
                                                    placeholder=""
                                                    value={teacherYDPrice}
                                                    onChange={(e) => setTeacherYDPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Öğretmen Toplam Fiyat:"
                                                    id="teacherTotalPrice"
                                                    placeholder=""
                                                    value={teacherTotalPrice}
                                                    onChange={(e) => setTeacherTotalPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                        </div>
                                        <div className="my-[20.36px] flex flex-wrap gap-[26.36px] ">
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Giriş Yapılan Yerler:"
                                                    id="entrancePlaces"
                                                    placeholder=""
                                                    value={entrancePlaces}
                                                    onChange={(e) => setEntrancePlaces(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Giriş Yerleri Birim Fiyatları:"
                                                    id="entrancePlacesUnitPrice"
                                                    placeholder=""
                                                    value={entrancePlacesUnitPrice}
                                                    onChange={(e) => setEntrancePlacesUnitPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Giriş Yerleri Toplam Fiyat:"
                                                    id="entrancePlacesTotalPrice"
                                                    placeholder=""
                                                    value={entrancePlacesTotalPrice}
                                                    onChange={(e) => setEntrancePlacesTotalPrice(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                            <div className="md:min-w-[231px]">
                                                <TraveInputBox
                                                    label="Onay:"
                                                    id="isApprove"
                                                    placeholder=""
                                                    value={isApprove}
                                                    onChange={(e) => setIsApprove(e.target.value)}
                                                    classNa={""}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            editTravelForm()
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
        </>
    );
};

export default AgreementDetail;
