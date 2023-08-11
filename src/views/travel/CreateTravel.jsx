import { useContext } from "react";
import AuthContext from "../../context/auth";
import { useState } from "react"
import TraveInputBox from "../../components/travelInputBox/main"
import TravelRadioButton from "../../components/travelRadioButton/main";
import axios from "axios";

const CreateTravel = () => {
  // const { logout } = useContext(AuthContext);


      /*
    Post https://senka.valentura.com/api/crm/Api/create-travel-form
    {
        "kampus_adi": "beşevler",
        "okul_adi": "gazi",
        "isim": "samet",
        "soyisim": "akgül",
        "unvan": "öğrenci",
        "tel_no": "054337802960",
        "email": "tahakoner@gmail.com",
        "program_adi": "endüstri mühendisliği",
        "ülke": "türkiye",
        "sehir": "ankara",
        "öngörülen_tarih":"2023-07-06",
        "öngörülen_ogrenci_sayisi":"10",
        "ilgili_sinif":"2",
        "ilgili_zumre":"zumre",
        "kazanim_ve_beklentiler":"kazanim_ve_beklentiler",
        "ulasim_araci":"otobüs",
        "gidis_tarihi":"2023-10-10",
        "dönüs_tarihi":"2023-12-10",
        "gidilecek_sehir":"antalya",
        "dönülecek_sehir":"istanbul",
        "transferler":"transferler",
        "lokasyon1":"lokasyon1",
        "lokasyon1_giris":"2023-10-10",
        "lokasyon1_cikis":"2023-10-10",
        "lokasyon2":"lokasyon2",
        "lokasyon2_giris":"2023-11-10",
        "lokasyon2_cikis":"2023-11-10",
        "lokasyon3":"lokasyon3",
        "lokasyon3_giris":"2023-12-10",
        "lokasyon3_cikis":"2023-12-10",
        "aktivite_ve_beklentiler":"aktivite_ve_beklentiler"
    }*/
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const [campusName, setCampusName] = useState("")

    const [inputValue, setInputValue] = useState("");
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [title, setTitle] = useState("")
    const [phone, setPhone] = useState("")
    const [mail, setMail] = useState("")

    const [expectations, setExpectations] = useState("")

    const [departureDate, setDepartureDate] = useState("")
    const [returnDate, setReturnDate] = useState('')
    const [transfers,setTransfers] = useState("")

    const [programName, setProgramName] = useState("")
    const [travelCountry,setTravelCountry] = useState("")
    const [expectedDate, setExpectedDate] = useState("")
    const [expectedStudentAmount, setExpectedStudentAmount] = useState("")
    const [classes,setClasses] = useState("")
    const [department,setDepartment] = useState("")

    const [locationOne,setLocationOne] = useState("")
    const [locationOneDeparture, setLocationOneDeparture] = useState("")
    const [locationOneReturn, setLocationOneReturn] = useState("")

    const [locationTwo,setLocationTwo] = useState("")
    const [locationtwoDeparture, setLocationTwoDeparture] = useState("")
    const [locationTwoReturn, setLocationTwoReturn] = useState("")

    const [locationThree,setLocationThree] = useState("")
    const [locationThreeDeparture, setLocationThreeDeparture] = useState("")
    const [locationThreeReturn, setLocationThreeReturn] = useState("")

    const [schoolName, setSchoolName] = useState("")
    const [city, setCity] = useState("")
    const [travelCity, setTravelCity] = useState("")
    const [returnCity, setReturnCity] = useState("")

    const [activities, setActivities] = useState("")

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const sendTravelForm = async () => {
      try {
          const response = await fetch(
              'https://senka.valentura.com/api/crm/Api/create-travel-form',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length':'<calculated when request is sent>',
                  'Host':'<calculated when request is sent>',
                  'User-Agent':'PostmanRuntime/7.32.3',
                  'Accept':'*/*',
                  'Accept-Encoding':'gzip, deflate, br',
                  'Connection':'keep-alive',
                  // Authorization: `token ${localStorage.getItem('token')}`
                  // Authorization: `token 96b7224fca8210ea7e5454b8137f5229bdc1795a`
                },
                body: JSON.stringify({
                  kampus_adi: campusName,
                  okul_adi: 'gazi',
                  isim: name,
                  soyisim: surname,
                  unvan: title,
                  tel_no: phone,
                  email: mail,
                  program_adi: programName,
                  ülke: travelCountry,
                  sehir: 'ankara',
                  öngörülen_tarih: expectedDate,
                  öngörülen_ogrenci_sayisi: expectedStudentAmount,
                  ilgili_sinif: classes,
                  ilgili_zumre: department,
                  kazanim_ve_beklentiler: expectations,
                  ulasim_araci: selectedOption,
                  gidis_tarihi: departureDate,
                  dönüs_tarihi: returnDate,
                  gidilecek_sehir: 'antalya',
                  dönülecek_sehir: 'istanbul',
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
                  aktivite_ve_beklentiler: activities
                }
                )
                
              }
          );
          const json = await response.json()

          // return json
          
          console.log(json);  // Output the response data
      } catch (error) {
          console.log(error);
      }
  };
  

  return (
    <div>
      <h2 className="text-3xl font-medium leading-none mt-3">
        Gezi Talep Formu Oluştur
      </h2>
      <div className="relative mt-8">
         <div className="md-w-[531px] mb-[11.64px]">
                <TraveInputBox
                    label="Kampüs Adı"
                    id="campusName"
                    placeholder=""
                    value={campusName}
                    onChange={(e)=>setCampusName(e.target.value)}
                    classNa={''}

                />
            </div>
            
    </div>


    <h2 className="text-base font-semibold flex flex-shrink-0 w-135 mb-[22.36px] flex-col justify-center text-red-500 font-Poppins font-semibold text-19.393 leading-21.332">
                KİŞİ BİLGİLERİ </h2>
            <div>
                <div className='my-[20.36px] flex flex-wrap gap-[26.36px]'>
                    <div className="flex gap-4  w-full"> <div className='w-full'>
                        <TraveInputBox
                            label="Adı:"
                            id="fullName"
                            placeholder=""
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='w-full mr-6'>
                        <TraveInputBox
                            label="Soyadı:"
                            id="fullName"
                            placeholder=""
                            value={surname}
                            onChange={(e)=>setSurname(e.target.value)}
                            classNa={''}

                        />
                    </div></div>
                   
                    <div className='min-md-w-[531px]'>
                        <TraveInputBox
                            label="Ünvanı:"
                            id="title"
                            placeholder=""
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='min-md-w-[531px]'>
                        <TraveInputBox
                            label="Cep Telefonu:"
                            id="telNo"
                            placeholder=""
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='min-md-w-[531px]'>
                        <TraveInputBox
                            label="Eposta Adresi:"
                            id="campusName"
                            placeholder=""
                            value={mail}
                            onChange={(e)=>setMail(e.target.value)}
                            classNa={''}

                        />
                    </div>

                </div>


            </div>

            <h2 className="text-base font-semibold flex flex-shrink-0 w-135 mb-[22.36px] flex-col justify-center text-red-500 font-Poppins font-semibold text-19.393 leading-21.332">
                KAZANIMLAR VE BEKLENTİLER </h2>
            <div>
                <div className='my-[20.36px] flex flex-col'>
                    <div className='min-w-full '>
                        <textarea
                            type="text"
                            id='outcomeExpectation'
                            value={expectations}
                            onChange={(e)=>setExpectations(e.target.value)}
                            className="block min-h-[110px] text-start h-full bg-[#F1F5F9] w-full px-4 py-2 border border-gray-500 rounded-xl focus:ring focus:ring-red-300 focus:outline-none focus:border-red-300 transition-all duration-300"
                        />
                    </div>
                    <p className="text-red-500 font-Poppins font-semibold text-16.484 leading-21.332 flex flex-shrink-0 w-994 flex-col justify-center">
                        Size daha iyi program hazırlayabilmemiz için aşağıdaki konularda detaylı bilgilendirme vermenizi önemle rica ederiz.
                    </p>

                </div>

            </div>

            <h2 className="text-base font-semibold mb-4 flex flex-shrink-0 w-135 flex-col justify-center text-red-500 font-Poppins font-semibold text-19.393 leading-21.332">
               PROGRAM DETAYI
            </h2>

            <div>
                <div>

                    <span className='mr-[45px] px-2 font-normal text-[#6C6A6A] left-[7px] -top-[13.2px]  text-gray-500 pointer-events-none transition-all duration-300'> Gezi Ulaşım Aracı :</span>
                    <TravelRadioButton
                        value="uçak"
                        checked={selectedOption === "uçak"}
                        onChange={handleOptionChange}
                        label="Uçak"
                    />

                    <TravelRadioButton
                        value="otobüs"
                        checked={selectedOption === "otobüs"}
                        onChange={handleOptionChange}
                        label="Otobüs"
                    />
                </div>
                <div className='my-[20.36px] flex flex-wrap gap-[26.36px]'>
                    <div className='min-md-w-[531px]'>
                        <TraveInputBox
                            label="Gidiş Tarihi:"
                            id="fullName"
                            placeholder=""
                            value={departureDate}
                            onChange={(e)=>setDepartureDate(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='min-md-w-[531px]'>
                        <TraveInputBox
                            label="Dönüş Tarihi:"
                            id="title"
                            placeholder=""
                            value={returnDate}
                            onChange={(e)=>setReturnDate(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='min-w-full'>
                        <TraveInputBox
                            label="Transferler:"
                            id="title"
                            placeholder=""
                            value={transfers}
                            onChange={(e)=>setTransfers(e.target.value)}
                            classNa={''}

                        />
                    </div>


                </div>

            </div>
    
            <h2 className="text-base font-semibold flex flex-shrink-0 w-135 mb-[22.36px] flex-col justify-center text-red-500 font-Poppins font-semibold text-19.393 leading-21.332">
                TALEP EDİLEN GEZİ BİLGİLERİ </h2>
            <div>
                <div className='my-[20.36px] flex flex-wrap gap-[26.36px] '>
                    <div className='min-md-w-[531px]'>
                        <TraveInputBox
                            label="Program Adı:"
                            id="fullName"
                            placeholder=""
                            value={programName}
                            onChange={(e)=>setProgramName(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='min-md-w-[531px]'>
                        <TraveInputBox
                            label="Gidilecek Ülke/Şehir(ler):"
                            id="title"
                            placeholder=""
                            value={travelCountry}
                            onChange={(e)=>setTravelCountry(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='min-md-w-[531px]'>
                        <TraveInputBox
                            label="Ön Görülen Tarih:"
                            id="telNo"
                            placeholder=""
                            value={expectedDate}
                            onChange={(e)=>setExpectedDate(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='min-md-w-[531px]'>
                        <TraveInputBox
                            label="Ön Görülen Öğrenci Sayısı:"
                            id="campusName"
                            placeholder=""
                            value={expectedStudentAmount}
                            onChange={(e)=>setExpectedStudentAmount(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='min-md-w-[531px]'>
                        <TraveInputBox
                            label="İlgili Sınıf/Sınıflar:"
                            id="telNo"
                            placeholder=""
                            value={classes}
                            onChange={(e)=>setClasses(e.target.value)}
                            classNa={''}
                        />
                    </div>
                    <div className='min-md-w-[531px]'>
                        <TraveInputBox
                            label="İlgili Zümre:"
                            id="campusName"
                            placeholder=""
                            value={department}
                            onChange={(e)=>setDepartment(e.target.value)}
                            classNa={''}

                        />
                    </div>

                </div>


            </div>
            <h2 className="text-base font-semibold flex flex-shrink-0 w-135 mb-[22.36px] flex-col justify-center text-[#6C6A6A] font-Poppins font-semibold text-19.393 leading-21.332">
                KONAKLAMA</h2>
            <div>
                <div className='my-[20.36px] flex flex-wrap gap-[26.36px] '>
                    <div className='md:min-w-[231px]'>
                        <TraveInputBox
                            label="1.Lokasyon:"
                            id="fullName"
                            placeholder=""
                            value={locationOne}
                            onChange={(e)=>setLocationOne(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='md:min-w-[231px]'>
                        <TraveInputBox
                            label="Giriş Tarihi:"
                            id="title"
                            placeholder=""
                            value={locationOneDeparture}
                            onChange={(e)=>setLocationOneDeparture(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='md:min-w-[231px]'>
                        <TraveInputBox
                            label="Çıkış Tarihi:"
                            id="telNo"
                            placeholder=""
                            value={locationOneReturn}
                            onChange={(e)=>setLocationOneReturn(e.target.value)}
                            classNa={''}

                        />
                    </div>


                </div>
                <div className='my-[20.36px] flex flex-wrap gap-[26.36px] '>
                    <div className='md:min-w-[231px]'>
                        <TraveInputBox
                            label="2.Lokasyon:"
                            id="fullName"
                            placeholder=""
                            value={locationTwo}
                            onChange={(e)=>setLocationTwo(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='md:min-w-[231px]'>
                        <TraveInputBox
                            label="Giriş Tarihi:"
                            id="title"
                            placeholder=""
                            value={locationtwoDeparture}
                            onChange={(e)=>setLocationTwoDeparture(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='md:min-w-[231px]'>
                        <TraveInputBox
                            label="Çıkış Tarihi:"
                            id="telNo"
                            placeholder=""
                            value={locationTwoReturn}
                            onChange={(e)=>setLocationTwoReturn(e.target.value)}
                            classNa={''}

                        />
                    </div>


                </div>
                <div className='my-[20.36px] flex flex-wrap gap-[26.36px] '>
                    <div className='md:min-w-[231px]'>
                        <TraveInputBox
                            label="3.Lokasyon:"
                            id="fullName"
                            placeholder=""
                            value={locationThree}
                            onChange={(e)=>setLocationThree(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='md:min-w-[231px]'>
                        <TraveInputBox
                            label="Giriş Tarihi:"
                            id="title"
                            placeholder=""
                            value={locationThreeDeparture}
                            onChange={(e)=>setLocationThreeDeparture(e.target.value)}
                            classNa={''}

                        />
                    </div>
                    <div className='md:min-w-[231px]'>
                        <TraveInputBox
                            label="Çıkış Tarihi:"
                            id="telNo"
                            placeholder=""
                            value={locationThreeReturn}
                            onChange={(e)=>setLocationThreeReturn(e.target.value)}
                            classNa={''}

                        />
                    </div>


                </div>
                <div className='my-[20.36px] flex flex-wrap gap-[26.36px] '>
                  
                    <div className='my-[20.36px] flex flex-col w-full'>
                    <div className='min-w-full '>
                    <div className="relative">
            <label
                htmlFor={'fullName'}
                className={`absolute px-2 font-normal left-[7px] -top-[13.2px] bg-[#F1F5F9] text-gray-500 pointer-events-none transition-all duration-300`}
            >
                Aktiviteler ve Diğer Beklentiler:
            </label>
                        <textarea
                            type="text"
                            id='outcomeExpectation'
                            value={activities}
                            onChange={(e)=>setActivities(e.target.value)}
                            className="block min-h-[110px] text-start h-full bg-[#F1F5F9] w-full px-4 py-2 border border-gray-500 rounded-xl focus:ring focus:ring-red-300 focus:outline-none focus:border-red-300 transition-all duration-300"
                        />
                    </div>
                    </div>


                </div>

                </div>

                <p className="text-red-500 font-Poppins font-semibold text-16.484 leading-21.332 flex flex-shrink-0 w-994 flex-col justify-center">
                    NOT: * Lütfen elinizde varsa günlük program detayını bizimle paylaşınız. </p>
                <p className="text-red-500 font-Poppins font-semibold text-16.484 leading-21.332 flex flex-shrink-0 w-994 flex-col justify-center">
                    ** Gezi talebinize en geç 3 iş günü içerisinde dönüş yapılacaktır. </p>

            </div>
            <button
            onClick={sendTravelForm}
            className="text-white text-center font-medium font-poppins text-3xl font-normal leading-5 bg-red-500 border-none rounded-lg w-52 h-14 flex flex-col justify-center my-[5.12px] items-center">
                        GÖNDER
                    </button>

    </div>
  );
};

export default CreateTravel;
