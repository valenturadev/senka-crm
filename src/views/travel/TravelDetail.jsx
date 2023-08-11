import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


const TravelDetail = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const { formId } = useParams();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(`https://senka.valentura.com/api/müşteri_ilişkileri/Api/get-travel-form/travel-form-id=${formId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "token 6eb4d112b1041a9e1d3ffe273615ae789441f197"
                }
            });
            const data = await response.json();
            console.log(data.data[0]);
            setData(data.data[0]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // "data":{
    //         "id": 7,
    //         "isim": "sdsda",
    //         "soyisim": "sdsda",
    //         "onaylı_kisi": false,
    //         "okul": "gazi",
    //         "kampus_adi": "asdasd",
    //         "ünvan": "asd",
    //         "tel_no": "05124578543",
    //         "email": "asd@asd.asd",
    //         "program_adi": "asdsd",
    //         "ülke": "Türkiye",
    //         "sehir": "ankara",
    //         "öngörülen_tarih": "2023-08-11T07:55:12.609562Z",
    //         "öngörülen_öğrenci_sayısı": 33,
    //         "ilgili_sınıf": "2",
    //         "zumre": "ased",
    //         "kazanım_ve beklentiler": "sdsdasd",
    //         "ulasım_araci": "otobüs",
    //         "gidis_tarihi": "2023-08-11T07:55:12.609649Z",
    //         "dönüs_tarihi": "2023-08-11T07:55:12.609669Z",
    //         "gidilen_sehir": "antalya",
    //         "dönülen_sehir": "istanbul",
    //         "transferler": "asasdasd",
    //         "lokasyon1": "isveç",
    //         "lokasyon2": "londra",
    //         "lokasyon3": "bilbao",
    //         "lokasyon1_giris": "2023-08-11T07:55:12.609707Z",
    //         "lokasyon1_cikis": "2023-08-11T07:55:12.609725Z",
    //         "lokasyon2_giris": "2023-08-11T07:55:12.609743Z",
    //         "lokasyon2_cikis": "2023-08-11T07:55:12.609761Z",
    //         "lokasyon3_giris": "2023-08-11T07:55:12.609779Z",
    //         "lokasyon3_cikis": "2023-08-11T07:55:12.609797Z"
    //     }

    return (
        <div>
            <h2 className="text-3xl font-medium leading-none mt-3">
        Seyahat Formunu Düzenle
      </h2>
            <div className="mt-6">
                <div className="grid grid-cols-1 gap-6">
                    <div className="col-span-1">
                        <div className="bg-white dark:bg-[#232D45] shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                    Seyahat Formu
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                    Seyahat Formu ile ilgili bilgileri düzenleyebilirsiniz.
                                </p>    
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
                                <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            İsim
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {data?.isim}
                                        </dd>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Soyisim
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {data?.soyisim}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Onaylı Kişi
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {data?.onaylı_kisi}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Okul
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {data?.okul}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Kampüs Adı
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {data?.kampus_adi}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Ünvan
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {data?.ünvan}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Telefon Numarası
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {data?.tel_no}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Email Adresi
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {data?.email}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Ülke
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {data?.ülke}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Şehir
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {data?.sehir}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Adres
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {data?.adres}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Posta Kodu
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                        {data?.posta_kodu}  
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Giriş Tarihi 1. Lokasyon
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                        {data?.lokasyon1_giris}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Çıkış Tarihi 1. Lokasyon
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                        {data?.lokasyon1_cikis}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Giriş Tarihi 2. Lokasyon
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                        {data?.lokasyon2_giris}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Çıkış Tarihi 2. Lokasyon
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                        {data?.lokasyon2_cikis}
                                        </dd>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Giriş Tarihi 3. Lokasyon
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                        {data?.lokasyon3_giris}
                                        </dd>       
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Çıkış Tarihi 3. Lokasyon
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                        {data?.lokasyon3_cikis}
                                        </dd>
                                        </div>
                                    </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        
        </div>
    );
};

export default TravelDetail;