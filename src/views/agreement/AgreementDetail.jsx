import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditableFormPage({ myUser }) {
  const { formId } = useParams();

  const [formData, setFormData] = useState({
    id: null,
    is_approve: null,
    ogrenci_sayisi: null,
    ogretmen_sayisi: null,
    birim_fiyat: null,
    gelirler: null,
    ulasim_araclari: [
      {
        ulasim_araci_ismi: '',
        ulasim_araci_tipi: '',
        ulasim_araci_rotasi: '',
        arac_kisi_sayisi: '',
        ulasim_araci_birim_fiyat: '',
      },
    ],
    oteller: [
      {
        otel_ismi: '',
        kalinacak_gun_sayisi: '',
        otel_SNG_birim_fiyat: '',
        otel_SNG_oda_sayisi: '',
        otel_DBL_birim_fiyat: '',
        otel_DBL_oda_sayisi: '',
        otel_TRP_birim_fiyat: '',
        otel_TRP_oda_sayisi: '',
      },
    ],
    rehberler: [
      {
        rehber_ismi: '',
        rehber_yevmiyesi: '',
        rehber_gun_sayisi: '',
        rehber_gunluk_yemek_birim_fiyati: '',
        rehber_YD_harc: '',
        rehber_YD_harc_gun_sayisi: '',
      },
    ],
    ogretmenler: {
      pp: '',
      yd_harc: '',
    },
    giris_yapilan_yerler: [
      {
        giris_yapilan_yer: '',
        pp: '',
      },
    ],
    toplam_fiyat: null,
    isim: '',
    onayli_kisi: false,
    okul: '',
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
    kazanim_ve_beklentiler: '',
    created_at: '',
    updated_at: '',
  });

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/operation-team/mutabakat/get-mutabakat-form/id=${formId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        const responseData = response.data.data;
        const ulasim_araclari = JSON.parse(responseData.ulasim_araclari);
        const giris_yapilan_yerler = JSON.parse(responseData.giris_yapilan_yerler);
        const oteller = JSON.parse(responseData.oteller);
        const rehberler = JSON.parse(responseData.rehberler);
        const ogretmenler = JSON.parse(responseData.ogretmenler);
        const transferler = JSON.parse(responseData.transferler);
        const lokasyons = JSON.parse(responseData.lokasyons);
        setFormData({
          ...responseData,
          transferler,
          lokasyons,
          ulasim_araclari,
          giris_yapilan_yerler,
          oteller,
          rehberler,
          ogretmenler,
        });
      })
  }, [formId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleArrayChange = (event, index, arrayName) => {
    const { name, value } = event.target;
    const updatedArray = [...formData[arrayName]];
    updatedArray[index][name] = value;
    setFormData({
      ...formData,
      [arrayName]: updatedArray
    });
  };

  const handleNestedObjectChange = (event, objectName) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [objectName]: {
        ...formData[objectName],
        [name]: value
      }
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Form</h1>
      <form>
        {/* Öğrenci Bilgileri */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Öğrenci Bilgileri</h2>
        <div className="mb-2">
          <label htmlFor="ogrenci_sayisi" className="block font-semibold">Öğrenci Sayısı</label>
          <input
            type="number"
            id="ogrenci_sayisi"
            name="ogrenci_sayisi"
            value={formData.ogrenci_sayisi || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Öğretmen Bilgileri */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Öğretmen Bilgileri</h2>
        <div className="mb-2">
          <label htmlFor="ogretmen_sayisi" className="block font-semibold">Öğretmen Sayısı</label>
          <input
            type="number"
            id="ogretmen_sayisi"
            name="ogretmen_sayisi"
            value={formData.ogretmen_sayisi || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Diğer Alanları da Ekleyin */}

        {/* Ulaşım Araçları */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Ulaşım Araçları</h2>
        {formData.ulasim_araclari.map((ulasim, index) => (
          <div key={index} className="mb-2">
            <label htmlFor={`ulasim_araci_ismi_${index}`} className="block font-semibold">Ulaşım Aracı İsmi</label>
            <input
              type="text"
              id={`ulasim_araci_ismi_${index}`}
              name={`ulasim_araclari[${index}].ulasim_araci_ismi`}
              value={ulasim.ulasim_araci_ismi || ''}
              onChange={(e) => handleArrayChange(e, index, 'ulasim_araclari')}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
            {/* Diğer Alanları da Ekleyin */}
          </div>
        ))}
        {/* Diğer Alanları da Ekleyin */}

        {/* Oteller */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Oteller</h2>
        {formData.oteller.map((otel, index) => (
          <div key={index} className="mb-2">
            <label htmlFor={`otel_ismi_${index}`} className="block font-semibold">Otel İsmi</label>
            <input
              type="text"
              id={`otel_ismi_${index}`}
              name={`oteller[${index}].otel_ismi`}
              value={otel.otel_ismi || ''}
              onChange={(e) => handleArrayChange(e, index, 'oteller')}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
            {/* Diğer Alanları da Ekleyin */}
          </div>
        ))}
        {/* Diğer Alanları da Ekleyin */}

        {/* Rehberler */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Rehberler</h2>
        {formData.rehberler.map((rehber, index) => (
          <div key={index} className="mb-2">
            <label htmlFor={`rehber_ismi_${index}`} className="block font-semibold">Rehber İsmi</label>
            <input
              type="text"
              id={`rehber_ismi_${index}`}
              name={`rehberler[${index}].rehber_ismi`}
              value={rehber.rehber_ismi || ''}
              onChange={(e) => handleArrayChange(e, index, 'rehberler')}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
            {/* Diğer Alanları da Ekleyin */}
          </div>
        ))}
        {/* Diğer Alanları da Ekleyin */}

        {/* Diğer Form Alanlarını da Ekleyin */}
        {/* ...

        {/* Gönder Butonu */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4">
          Gönder
        </button>
      </form>
    </div>
  );
}

export default EditableFormPage;
