import React, { useState } from 'react';
import axios from 'axios'; 

function TravelForm() {

    const [formData, setFormData] = useState({
        kampus_adi: '',
        okul_adi: '',
        isim: '',
        soyisim: '',
        unvan: '',
        tel_no: '',
        email: '',
        program_adi: '',
        ulke: '',
        sehir: '',
        ongorulen_ogrenci_sayisi: '',
        ilgili_sinif: '',
        ilgili_zumre: '',
        kazanim_ve_beklentiler: '',
        ulasim_araci: '',
        gidis_tarihi: '',
        donus_tarihi: '',
        gidilecek_sehir: '',
        donulecek_sehir: '',
        transferler: [
            {
                arac: '',
                kalkilan_durak: '',
                goturulen_durak: '',
            },
        ],
        lokasyons: [
            {
                lokasyon: '',
                giris: '',
                cikis: '',
            },
        ],
    });



    // Form verilerini güncellemek için işlev
    const handleChangeStandard = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Form verilerini güncellemek için işlev
    const handleChange = (e, field, index) => {
        const { name, value } = e.target;
        const updatedData = { ...formData };
        updatedData[field][index][name] = value;
        setFormData(updatedData);
    };


    // Transfer eklemek için işlev
    const handleAddTransfer = () => {
        const updatedData = { ...formData };
        updatedData.transferler.push({
            arac: '',
            kalkilan_durak: '',
            goturulen_durak: '',
        });
        setFormData(updatedData);
    };

    // Transfer kaldırmak için işlev
    const handleRemoveTransfer = (index) => {
        const updatedData = { ...formData };
        updatedData.transferler.splice(index, 1);
        setFormData(updatedData);
    };

    // Lokasyon eklemek için işlev
    const handleAddLokasyon = () => {
        const updatedData = { ...formData };
        updatedData.lokasyons.push({
            lokasyon: '',
            giris: '',
            cikis: '',
        });
        setFormData(updatedData);
    };

    // Lokasyon kaldırmak için işlev
    const handleRemoveLokasyon = (index) => {
        const updatedData = { ...formData };
        updatedData.lokasyons.splice(index, 1);
        setFormData(updatedData);
    };

    // Form verilerini göndermek için işlev
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post("https://senka.valentura.com/api/users/create-travel-form", formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (response.status === 200) {
            // Başarılı bir şekilde gönderildiğinde buraya gelebilirsiniz
            console.log("Form başarıyla gönderildi!");
          } else {
            // Sunucudan hata alındığında buraya gelebilirsiniz
            console.error("Form gönderimi sırasında bir hata oluştu.");
          }
        } catch (error) {
          // Hata durumunda buraya gelebilirsiniz
          console.error("Form gönderimi sırasında bir hata oluştu:", error);
        }
      };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Gezi Seyahat Formu</h1>
            <form onSubmit={handleSubmit}>
                {/* Kampüs adı */}
                <div className="mb-4">
                    <label htmlFor="kampus_adi" className="block text-sm font-medium text-gray-700">
                        Kampüs Adı
                    </label>
                    <input
                        type="text"
                        id="kampus_adi"
                        name="kampus_adi"
                        value={formData.kampus_adi}
                        onChange={handleChangeStandard}
                        className="mt-1 p-2 w-full rounded-md border-gray-300"
                    />
                </div>

                <h5 className="text-xl mb-6 text-blue-900">Kişisel Bilgiler</h5>

                <div className="mb-4 flex space-x-4">
                    {/* İsim */}
                    <div className="w-1/2">
                        <label htmlFor="isim" className="block text-sm font-medium text-gray-700">
                            İsim
                        </label>
                        <input
                            type="text"
                            id="isim"
                            name="isim"
                            value={formData.isim}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>

                    {/* Soyisim */}
                    <div className="w-1/2">
                        <label htmlFor="soyisim" className="block text-sm font-medium text-gray-700">
                            Soyisim
                        </label>
                        <input
                            type="text"
                            id="soyisim"
                            name="soyisim"
                            value={formData.soyisim}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>
                </div>


                <div className="mb-4 flex space-x-4">
                    {/* Okul Adı */}
                    <div className="w-1/2">
                        <label htmlFor="okul_adi" className="block text-sm font-medium text-gray-700">
                            Okul Adı
                        </label>
                        <input
                            type="text"
                            id="okul_adi"
                            name="okul_adi"
                            value={formData.okul_adi}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>

                    {/* Unvan */}
                    <div className="w-1/2">
                        <label htmlFor="unvan" className="block text-sm font-medium text-gray-700">
                            Unvan
                        </label>
                        <input
                            type="text"
                            id="unvan"
                            name="unvan"
                            value={formData.unvan}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>

                    {/* Telefon Numarası */}
                    <div className="w-1/2">
                        <label htmlFor="tel_no" className="block text-sm font-medium text-gray-700">
                            Telefon Numarası
                        </label>
                        <input
                            type="text"
                            id="tel_no"
                            name="tel_no"
                            value={formData.tel_no}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>

                    {/* Email */}
                    <div className="w-1/2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>
                </div>

                <h5 className="text-xl mb-6 text-blue-900"> Kazanım ve Beklentiler</h5>

                {/* Kazanım ve Beklentiler */}
                <div className="mb-10">
                    <label htmlFor="kazanim_ve_beklentiler" className="block text-sm font-medium text-gray-700">
                        Kazanım ve Beklentiler
                    </label>
                    <textarea
                        id="kazanim_ve_beklentiler"
                        name="kazanim_ve_beklentiler"
                        value={formData.kazanim_ve_beklentiler}
                        onChange={handleChangeStandard}
                        className="mt-1 p-2 w-full rounded-md border-gray-300"
                    />
                </div>

                <h5 className="text-xl mb-6 text-blue-900"> Program Detayı</h5>

                {/* Ulaşım Aracı */}
                <div className="mb-4">
                    <label htmlFor="ulasim_araci" className="block text-sm font-medium text-gray-700">
                        Ulaşım Aracı
                    </label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                id="ulasim_araci_ucak"
                                name="ulasim_araci"
                                value="uçak"
                                checked={formData.ulasim_araci === 'uçak'}
                                onChange={handleChangeStandard}
                                className="cursor-pointer"
                            />
                            <span>Uçak</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                id="ulasim_araci_otobus"
                                name="ulasim_araci"
                                value="otobüs"
                                checked={formData.ulasim_araci === 'otobüs'}
                                onChange={handleChangeStandard}
                                className="cursor-pointer"
                            />
                            <span>Otobüs</span>
                        </label>
                    </div>
                </div>

                <div className="mb-4 flex space-x-4">
                    {/* Gidiş Tarihi */}
                    <div>
                        <label htmlFor="gidis_tarihi" className="block text-sm font-medium text-gray-700">
                            Gidiş Tarihi
                        </label>
                        <input
                            type="date"
                            id="gidis_tarihi"
                            name="gidis_tarihi"
                            value={formData.gidis_tarihi}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>

                    {/* Dönüş Tarihi */}
                    <div>
                        <label htmlFor="donus_tarihi" className="block text-sm font-medium text-gray-700">
                            Dönüş Tarihi
                        </label>
                        <input
                            type="date"
                            id="donus_tarihi"
                            name="donus_tarihi"
                            value={formData.donus_tarihi}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
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
                                name="arac"
                                value={transfer.arac}
                                onChange={(e) => handleChange(e, 'transferler', index)}
                                placeholder="Araç"
                                className="p-2 w-1/4 rounded-md border-gray-300"
                            />
                            <input
                                type="text"
                                name="kalkilan_durak"
                                value={transfer.kalkilan_durak}
                                onChange={(e) => handleChange(e, 'transferler', index)}
                                placeholder="Kalkılan Durak"
                                className="p-2 w-1/4 rounded-md border-gray-300"
                            />
                            <input
                                type="text"
                                name="goturulen_durak"
                                value={transfer.goturulen_durak}
                                onChange={(e) => handleChange(e, 'transferler', index)}
                                placeholder="Götürülen Durak"
                                className="p-2 w-1/4 rounded-md border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveTransfer(index)}
                                className="text-red-500 hover:underline"
                            >
                                Sil
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddTransfer}
                        className="text-blue-500 hover:underline"
                    >
                        + Transfer Ekle
                    </button>
                </div>


                <h5 className="text-xl mb-6 text-blue-900"> Talep Edilen Gezi Bilgileri</h5>

                <div className="mb-4 flex space-x-4">
                    {/* Program Adı */}
                    <div>
                        <label htmlFor="program_adi" className="block text-sm font-medium text-gray-700">
                            Program Adı
                        </label>
                        <input
                            type="text"
                            id="program_adi"
                            name="program_adi"
                            value={formData.program_adi}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>

                    {/* Ülke */}
                    <div>
                        <label htmlFor="ulke" className="block text-sm font-medium text-gray-700">
                            Ülke
                        </label>
                        <input
                            type="text"
                            id="ulke"
                            name="ulke"
                            value={formData.ulke}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>

                    {/* Şehir */}
                    <div>
                        <label htmlFor="sehir" className="block text-sm font-medium text-gray-700">
                            Şehir
                        </label>
                        <input
                            type="text"
                            id="sehir"
                            name="sehir"
                            value={formData.sehir}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>

                    {/* Öngörülen Öğrenci Sayısı */}
                    <div>
                        <label htmlFor="ongorulen_ogrenci_sayisi" className="block text-sm font-medium text-gray-700">
                            Öngörülen Öğrenci Sayısı
                        </label>
                        <input
                            type="text"
                            id="ongorulen_ogrenci_sayisi"
                            name="ongorulen_ogrenci_sayisi"
                            value={formData.ongorulen_ogrenci_sayisi}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>
                </div>


                <div className="mb-4 flex space-x-4">
                    {/* İlgili Sınıf */}
                    <div>
                        <label htmlFor="ilgili_sinif" className="block text-sm font-medium text-gray-700">
                            İlgili Sınıf
                        </label>
                        <input
                            type="text"
                            id="ilgili_sinif"
                            name="ilgili_sinif"
                            value={formData.ilgili_sinif}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>

                    {/* İlgili Zümre */}
                    <div>
                        <label htmlFor="ilgili_zumre" className="block text-sm font-medium text-gray-700">
                            İlgili Zümre
                        </label>
                        <input
                            type="text"
                            id="ilgili_zumre"
                            name="ilgili_zumre"
                            value={formData.ilgili_zumre}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>

                    {/* Gidilecek Şehir */}
                    <div>
                        <label htmlFor="gidilecek_sehir" className="block text-sm font-medium text-gray-700">
                            Gidilecek Şehir
                        </label>
                        <input
                            type="text"
                            id="gidilecek_sehir"
                            name="gidilecek_sehir"
                            value={formData.gidilecek_sehir}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
                        />
                    </div>

                    {/* Dönülecek Şehir */}
                    <div>
                        <label htmlFor="donulecek_sehir" className="block text-sm font-medium text-gray-700">
                            Dönülecek Şehir
                        </label>
                        <input
                            type="text"
                            id="donulecek_sehir"
                            name="donulecek_sehir"
                            value={formData.donulecek_sehir}
                            onChange={handleChangeStandard}
                            className="mt-1 p-2 w-full rounded-md border-gray-300"
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
                                name="lokasyon"
                                value={lokasyon.lokasyon}
                                onChange={(e) => handleChange(e, 'lokasyons', index)}
                                placeholder="Lokasyon"
                                className="p-2 w-1/3 rounded-md border-gray-300"
                            />
                            <input
                                type="text"
                                name="giris"
                                value={lokasyon.giris}
                                onChange={(e) => handleChange(e, 'lokasyons', index)}
                                placeholder="Giriş"
                                className="p-2 w-1/4 rounded-md border-gray-300"
                            />
                            <input
                                type="text"
                                name="cikis"
                                value={lokasyon.cikis}
                                onChange={(e) => handleChange(e, 'lokasyons', index)}
                                placeholder="Çıkış"
                                className="p-2 w-1/4 rounded-md border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveLokasyon(index)}
                                className="text-red-500 hover:underline"
                            >
                                Sil
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddLokasyon}
                        className="text-blue-500 hover:underline"
                    >
                        + Lokasyon Ekle
                    </button>
                </div>


                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Gönder
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TravelForm;
