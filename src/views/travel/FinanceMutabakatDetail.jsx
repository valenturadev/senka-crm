import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { errorMessage, successMessage } from '../../utils/toast';

function FinanceMutabakatDetail() {
    const [formData, setFormData] = useState({
        id: '',
        isim: '',
        onayli_kisi: '',
        okul_adi: '',
        kampus_adi: '',
        soyisim: '',
        unvan: '',
        tel_no: '',
        email: '',
        program_adi: '',
        ulke: '',
        sehir: '',
        ongorulen_ogrenci_sayisi: '',
        ilgili_sinif: '',
        zumre: '',
        ulasim_araci: '',
        gidis_tarihi: '',
        donus_tarihi: '',
        gidilecek_sehir: '',
        donulecek_sehir: '',
        transferler: [],
        lokasyons: [],
        aktivite_ve_beklentiler: '',
        is_approve: null,
        created_at: '',
        updated_at: '',
    });

    const [isEditable, setIsEditable] = useState(false); // Düzenleme durumunu takip eder
    const [editedData, setEditedData] = useState({}); // Düzenlenen verileri tutar
    const isApproveValue = formData.is_approve !== null ? formData.is_approve : undefined;


    const { formId } = useParams();
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);

    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://dev.senkaturizm.com/api/customer-relations/finance-mutabakat-forms/get-onaylanan-mutabakat-form/id=${formId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then((response) => {
                const responseData = response.data.data;
                const transferler = JSON.parse(responseData.transferler);
                const lokasyons = JSON.parse(responseData.lokasyons);
                setFormData({
                    ...responseData,
                    transferler,
                    lokasyons,
                });
            })
    }, [formId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevEditedData) => ({
            ...prevEditedData,
            [name]: value,
        }));
    };

    // Transferler alanını düzenlerken
    const handleTransferInputChange = (e, index) => {
        const { name, value } = e.target;
        setEditedData((prevEditedData) => {
            const updatedTransferler = [...prevEditedData.transferler]; // Önceki transferler dizisini kopyalayın
            updatedTransferler[index] = {
                ...updatedTransferler[index], // Önceki transfer nesnesini kopyalayın
                [name]: value, // Belirli alanı güncelleyin
            };
            return {
                ...prevEditedData,
                transferler: updatedTransferler, // Güncellenmiş transferler dizisini ayarlayın
            };
        });
    };

    // Lokasyonlar alanını düzenlerken
    const handleLokasyonInputChange = (e, index) => {
        const { name, value } = e.target;
        setEditedData((prevEditedData) => {
            const updatedLokasyons = [...prevEditedData.lokasyons]; // Önceki lokasyonlar dizisini kopyalayın
            updatedLokasyons[index] = {
                ...updatedLokasyons[index], // Önceki lokasyon nesnesini kopyalayın
                [name]: value, // Belirli alanı güncelleyin
            };
            return {
                ...prevEditedData,
                lokasyons: updatedLokasyons, // Güncellenmiş lokasyonlar dizisini ayarlayın
            };
        });
    };

    const handleApprove = () => {
        // Onay API isteği gönderme
        axios({
            method: 'GET',
            url: `https://dev.senkaturizm.com/api/customer-relations/finance-mutabakat-forms/approve-onaylanan-mutabakat-form/id=${formId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then((response) => {
                // Onay işlemi başarılı bir şekilde tamamlandığında yapılacak işlemler
                console.log("Form onaylandı:", response.data);
                successMessage("Form onaylandı")
            })
            .catch((error) => {
                // Hata durumunu işleyin
                console.error("Onay isteği hatası:", error);
                errorMessage("Form onaylanırken hata oluştu")
            });
    };

    const handleReject = () => {
        // Reddetme API isteği gönderme
        axios({
            method: 'GET',
            url: `https://dev.senkaturizm.com/api/customer-relations/finance-mutabakat-forms/reject-onaylanan-mutabakat-form/${formId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then((response) => {
                // Reddetme işlemi başarılı bir şekilde tamamlandığında yapılacak işlemler
                console.log("Form reddedildi:", response.data);
                successMessage("Form reddedildi")
            })
            .catch((error) => {
                // Hata durumunu işleyin
                console.error("Reddetme isteği hatası:", error);
                errorMessage("Form reddedilirken hata oluştu")
            });
    };


    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Gezi Seyahat Formu Detayları</h1>

            <div className="mb-4 space-x-2">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={handleApprove} // Kabul Et butonuna tıklandığında handleApprove fonksiyonunu çağırın
                >
                    Kabul Et
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={handleReject} // Reddet butonuna tıklandığında handleReject fonksiyonunu çağırın
                >
                    Reddet
                </button>
            </div>

            <form>
                {/* ID */}
                <div className="mb-4">
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                        ID
                    </label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}

                        className={`mt-1 p-2 w-full rounded-md border-gray-300 bg-gray-200`}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Kampüs Adı */}
                <div className="mb-4">
                    <label htmlFor="kampus_adi" className="block text-sm font-medium text-gray-700">
                        Kampüs Adı
                    </label>
                    <input
                        type="text"
                        id="kampus_adi"
                        name="kampus_adi"
                        value={isEditable ? editedData.kampus_adi : formData.kampus_adi}
                        readOnly={!isEditable}
                        className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                        onChange={handleInputChange}
                    />
                </div>

                <h5 className="text-xl mb-6 text-blue-900">Kişisel Bilgiler</h5>

                <div className="mb-4 flex space-x-4">
                    {/* İsim */}
                    <div className="flex-1">
                        <label htmlFor="isim" className="block text-sm font-medium text-gray-700">
                            İsim
                        </label>
                        <input
                            type="text"
                            id="isim"
                            name="isim"
                            value={isEditable ? editedData.isim : formData.isim}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Soyisim */}
                    <div className="flex-1">
                        <label htmlFor="soyisim" className="block text-sm font-medium text-gray-700">
                            Soyisim
                        </label>
                        <input
                            type="text"
                            id="soyisim"
                            name="soyisim"
                            value={isEditable ? editedData.soyisim : formData.soyisim}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-4 flex space-x-4">

                    {/* Okul */}
                    <div className="flex-1">
                        <label htmlFor="okul_adi" className="block text-sm font-medium text-gray-700">
                            Okul
                        </label>
                        <input
                            type="text"
                            id="okul_adi"
                            name="okul_adi"
                            value={isEditable ? editedData.okul_adi : formData.okul_adi}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>



                    {/* Ünvan */}
                    <div className="flex-1">
                        <label htmlFor="unvan" className="block text-sm font-medium text-gray-700">
                            Ünvan
                        </label>
                        <input
                            type="text"
                            id="unvan"
                            name="unvan"
                            value={isEditable ? editedData.unvan : formData.unvan}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Telefon Numarası */}
                    <div className="flex-1">
                        <label htmlFor="tel_no" className="block text-sm font-medium text-gray-700">
                            Telefon Numarası
                        </label>
                        <input
                            type="text"
                            id="tel_no"
                            name="tel_no"
                            value={isEditable ? editedData.tel_no : formData.tel_no}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Email */}
                    <div className="flex-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={isEditable ? editedData.email : formData.email}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    /</div>

                <h5 className="text-xl mb-6 text-blue-900"> Kazanım ve Beklentiler</h5>


                {/* Kazanım ve Beklentiler */}
                <div className="mb-4">
                    <label htmlFor="aktivite_ve_beklentiler" className="block text-sm font-medium text-gray-700">
                        Kazanım ve Beklentiler
                    </label>
                    <textarea
                        id="aktivite_ve_beklentiler"
                        name="aktivite_ve_beklentiler"
                        rows="4"
                        value={isEditable ? editedData.aktivite_ve_beklentiler : formData.aktivite_ve_beklentiler}
                        readOnly={!isEditable}
                        className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                        onChange={handleInputChange}
                    />
                </div>

                <h5 className="text-xl mb-6 text-blue-900"> Program Detayı</h5>

                <div className="mb-4 flex space-x-4">

                    {/* Ulaşım Aracı */}
                    <div className="flex-1">
                        <label htmlFor="ulasim_araci" className="block text-sm font-medium text-gray-700">
                            Ulaşım Aracı
                        </label>
                        <input
                            type="text"
                            id="ulasim_araci"
                            name="ulasim_araci"
                            value={isEditable ? editedData.ulasim_araci : formData.ulasim_araci}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Gidiş Tarihi */}
                    <div className="flex-1">
                        <label htmlFor="gidis_tarihi" className="block text-sm font-medium text-gray-700">
                            Gidiş Tarihi
                        </label>
                        <input
                            type="text"
                            id="gidis_tarihi"
                            name="gidis_tarihi"
                            value={isEditable ? editedData.gidis_tarihi : formData.gidis_tarihi}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Dönüş Tarihi */}
                    <div className="flex-1">
                        <label htmlFor="donus_tarihi" className="block text-sm font-medium text-gray-700">
                            Dönüş Tarihi
                        </label>
                        <input
                            type="text"
                            id="donus_tarihi"
                            name="donus_tarihi"
                            value={isEditable ? editedData.donus_tarihi : formData.donus_tarihi}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Transferler */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Transferler</label>
                    {formData.transferler.map((transfer, index) => (
                        <div key={index} className="flex space-x-4 items-center mb-2">
                            <input
                                type="text"
                                name={`transferler[${index}].arac`}
                                value={isEditable ? editedData.transferler[index].arac : transfer.arac}
                                readOnly={!isEditable}
                                className={`p-2 w-1/4 rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                                onChange={handleTransferInputChange}
                            />
                            <input
                                type="text"
                                name={`transferler[${index}].kalkilan_durak`}
                                value={isEditable ? editedData.transferler[index].kalkilan_durak : transfer.kalkilan_durak}
                                readOnly={!isEditable}
                                className={`p-2 w-1/4 rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                                onChange={handleTransferInputChange}
                            />
                            <input
                                type="text"
                                name={`transferler[${index}].goturulen_durak`}
                                value={isEditable ? editedData.transferler[index].goturulen_durak : transfer.goturulen_durak}
                                readOnly={!isEditable}
                                className={`p-2 w-1/4 rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                                onChange={handleTransferInputChange}
                            />
                        </div>
                    ))}
                </div>

                <h5 className="text-xl mb-6 text-blue-900"> Talep Edilen Gezi Bilgileri</h5>


                <div className="mb-4 flex space-x-4">

                    {/* Program Adı */}
                    <div className="flex-1">
                        <label htmlFor="program_adi" className="block text-sm font-medium text-gray-700">
                            Program Adı
                        </label>
                        <input
                            type="text"
                            id="program_adi"
                            name="program_adi"
                            value={isEditable ? editedData.program_adi : formData.program_adi}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Ülke */}
                    <div className="flex-1">
                        <label htmlFor="ulke" className="block text-sm font-medium text-gray-700">
                            Ülke
                        </label>
                        <input
                            type="text"
                            id="ulke"
                            name="ulke"
                            value={isEditable ? editedData.ulke : formData.ulke}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Şehir */}
                    <div className="flex-1">
                        <label htmlFor="sehir" className="block text-sm font-medium text-gray-700">
                            Şehir
                        </label>
                        <input
                            type="text"
                            id="sehir"
                            name="sehir"
                            value={isEditable ? editedData.sehir : formData.sehir}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Öngörülen Öğrenci Sayısı */}
                    <div className="flex-1">
                        <label htmlFor="ongorulen_ogrenci_sayisi" className="block text-sm font-medium text-gray-700">
                            Öngörülen Öğrenci Sayısı
                        </label>
                        <input
                            type="text"
                            id="ongorulen_ogrenci_sayisi"
                            name="ongorulen_ogrenci_sayisi"
                            value={isEditable ? editedData.ongorulen_ogrenci_sayisi : formData.ongorulen_ogrenci_sayisi}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                </div>

                <div className="mb-4 flex space-x-4">

                    {/* İlgili Sınıf */}
                    <div className="flex-1">
                        <label htmlFor="ilgili_sinif" className="block text-sm font-medium text-gray-700">
                            İlgili Sınıf
                        </label>
                        <input
                            type="text"
                            id="ilgili_sinif"
                            name="ilgili_sinif"
                            value={isEditable ? editedData.ilgili_sinif : formData.ilgili_sinif}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Zümre */}
                    <div className="flex-1">
                        <label htmlFor="zumre" className="block text-sm font-medium text-gray-700">
                            Zümre
                        </label>
                        <input
                            type="text"
                            id="zumre"
                            name="zumre"
                            value={isEditable ? editedData.zumre : formData.zumre}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Gidilecek Şehir */}
                    <div className="flex-1">
                        <label htmlFor="gidilecek_sehir" className="block text-sm font-medium text-gray-700">
                            Gidilecek Şehir
                        </label>
                        <input
                            type="text"
                            id="gidilecek_sehir"
                            name="gidilecek_sehir"
                            value={isEditable ? editedData.gidilecek_sehir : formData.gidilecek_sehir}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Dönülecek Şehir */}
                    <div className="flex-1">
                        <label htmlFor="donulecek_sehir" className="block text-sm font-medium text-gray-700">
                            Dönülecek Şehir
                        </label>
                        <input
                            type="text"
                            id="donulecek_sehir"
                            name="donulecek_sehir"
                            value={isEditable ? editedData.donulecek_sehir : formData.donulecek_sehir}
                            readOnly={!isEditable}
                            className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                            onChange={handleInputChange}
                        />
                    </div>

                </div>







                {/* Lokasyonlar */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Lokasyonlar</label>
                    {formData.lokasyons.map((lokasyon, index) => (
                        <div key={index} className="flex space-x-4 items-center mb-2">
                            <input
                                type="text"
                                name={`lokasyons[${index}].lokasyon`}
                                value={isEditable ? editedData.lokasyons[index].lokasyon : lokasyon.lokasyon}
                                readOnly={!isEditable}
                                className={`p-2 w-1/3 rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                                onChange={handleLokasyonInputChange}
                            />
                            <input
                                type="text"
                                name={`lokasyons[${index}].giris`}
                                value={isEditable ? editedData.lokasyons[index].giris : lokasyon.giris}
                                readOnly={!isEditable}
                                className={`p-2 w-1/4 rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                                onChange={handleLokasyonInputChange}
                            />
                            <input
                                type="text"
                                name={`lokasyons[${index}].cikis`}
                                value={isEditable ? editedData.lokasyons[index].cikis : lokasyon.cikis}
                                readOnly={!isEditable}
                                className={`p-2 w-1/4 rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                                onChange={handleLokasyonInputChange}
                            />
                        </div>
                    ))}
                </div>



                {/* Onay Durumu */}
                {/* <div className="mb-4">
                    <label htmlFor="is_approve" className="block text-sm font-medium text-gray-700">
                        Onay Durumu
                    </label>
                    <select
                        id="is_approve"
                        name="is_approve"
                        value={isEditable ? editedData.is_approve : isApproveValue}
                        readOnly={!isEditable}
                        className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                        onChange={handleInputChange}
                    >
                        <option value="null">Seçiniz</option>
                        <option value="true">Onaylandı</option>
                        <option value="false">Reddedildi</option>
                    </select>
                </div>    */}

                {/* Onaylı Kişi */}
                <div className="mb-4">
                    <label htmlFor="onayli_kisi" className="block text-sm font-medium text-gray-700">
                        Onaylı Kişi
                    </label>
                    <input
                        type="text"
                        id="onayli_kisi"
                        name="onayli_kisi"
                        value={isEditable ? editedData.onayli_kisi : formData.onayli_kisi}
                        readOnly={!isEditable}
                        className={`mt-1 p-2 w-full rounded-md border-gray-300 ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Oluşturulma Tarihi */}
                <div className="mb-4">
                    <label htmlFor="created_at" className="block text-sm font-medium text-gray-700">
                        Oluşturulma Tarihi
                    </label>
                    <input
                        type="text"
                        id="created_at"
                        name="created_at"
                        value={formData.created_at}
                        readOnly={true}
                        className="mt-1 p-2 w-full rounded-md border-gray-300 bg-gray-200"
                    />
                </div>

                {/* Güncelleme Tarihi */}
                <div className="mb-4">
                    <label htmlFor="updated_at" className="block text-sm font-medium text-gray-700">
                        Güncelleme Tarihi
                    </label>
                    <input
                        type="text"
                        id="updated_at"
                        name="updated_at"
                        value={formData.updated_at}
                        readOnly={true}
                        className="mt-1 p-2 w-full rounded-md border-gray-300 bg-gray-200"
                    />
                </div>
            </form>
        </div>
    );
}

export default FinanceMutabakatDetail;
