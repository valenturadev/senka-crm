import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import moment from 'moment';

function EditableFormPage() {
  const { formId } = useParams();
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

  const [formData, setFormData] = useState({
    id: formId,
    kampüs: '',
    gidis_tarihi: '',
    donus_tarihi: '',
    ogrenci_sayisi: 0,
    ogretmen_sayisi: 0,
    birim_fiyat: 0.0,
    toplam_fiyat_ogrenci_ogretmen: 0.0,
    ulasim_araclari: [],
    oteller: [],
    rehberler: [],
    ogretmenler: [],
    giris_yapilan_yerler: [],
    diger: [],
    toplam_fiyat: 0.0,
    // Read-only fields
    isim: '',
    soyisim: '',
    unvan: '',
    tel_no: '',
    email: '',
    program_adi: '',
    ulke: '',
    sehir: '',
    onayli_kisi: false,
    okul: '',
    ilgili_sinif: '',
    zumre: '',
    gidilecek_sehir: '',
    donulecek_sehir: '',
    kazanim_ve_beklentiler: '',
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
        setFormData({
          ...responseData,
          ulasim_araclari: Array.isArray(responseData.ulasim_araclari) ? responseData.ulasim_araclari : [],
          oteller: Array.isArray(responseData.oteller) ? responseData.oteller : [],
          rehberler: Array.isArray(responseData.rehberler) ? responseData.rehberler : [],
          ogretmenler: Array.isArray(responseData.ogretmenler) ? responseData.ogretmenler : [],
          giris_yapilan_yerler: Array.isArray(responseData.giris_yapilan_yerler) ? responseData.giris_yapilan_yerler : [],
          diger: Array.isArray(responseData.diger) ? responseData.diger : []
        });
      })
      .catch((error) => {
        toast.error("Veriler alınırken hata oluştu!");
      });
  }, [formId]);

  const handleAddField = (field) => {
    const newItem = {};

    switch (field) {
      case 'ulasim_araclari':
        newItem.ulasim_araci = '';
        newItem.arac_kisi_sayisi = 0;
        newItem.ulasim_araci_birim_fiyat = 0;
        newItem.ulasim_araci_toplam_fiyat = 0;
        break;
      case 'oteller':
        newItem.kalinacak_gun_sayisi = 0;
        newItem.otel_SNG_birim_fiyat = 0;
        newItem.otel_SNG_oda_sayisi = 0;
        newItem.otel_DBL_birim_fiyat = 0;
        newItem.otel_DBL_oda_sayisi = 0;
        newItem.otel_TRP_birim_fiyat = 0;
        newItem.otel_TRP_oda_sayisi = 0;
        newItem.otel_toplam_fiyat = 0;
        break;
      case 'rehberler':
        newItem.rehber_ismi = '';
        newItem.rehber_yevmiyesi = 0;
        newItem.rehber_gun_sayisi = 0;
        newItem.rehber_gunluk_yemek_birim_fiyati = 0;
        newItem.rehber_YD_harc = 0;
        newItem.rehber_YD_harc_gun_sayisi = 0;
        break;
      case 'ogretmenler':
        newItem.ogretmen_ismi = '';
        newItem.yd_harc = 0;
        break;
      case 'giris_yapilan_yerler':
        newItem.giris_yapilan_yer = '';
        newItem.pp = 0;
        break;
      case 'diger':
        newItem.ad = '';
        newItem.miktar = 0;
        newItem.fiyat = 0;
        break;
      default:
        return;
    }

    setFormData(prevState => ({
      ...prevState,
      [field]: [...prevState[field], newItem]
    }));
  };

  const handleRemoveField = (index, field) => {
    const updatedItems = formData[field].filter((_, i) => i !== index);
    setFormData(prevState => ({
      ...prevState,
      [field]: updatedItems
    }));
  };

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;
    const updatedItems = [...formData[field]];
    updatedItems[index][name] = value;

    setFormData(prevState => ({
      ...prevState,
      [field]: updatedItems
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    const formattedData = {
      ogrenci_sayisi: formData.ogrenci_sayisi,
      ogretmen_sayisi: formData.ogretmen_sayisi,
      birim_fiyat: formData.birim_fiyat,
      ulasim_araclari: formData.ulasim_araclari.map(item => ({
        ulasim_araci_ismi: item.ulasim_araci,
        arac_kisi_sayisi: item.arac_kisi_sayisi,
        ulasim_araci_birim_fiyat: item.ulasim_araci_birim_fiyat
      })),
      oteller: formData.oteller.map(item => ({
        kalinacak_gun_sayisi: item.kalinacak_gun_sayisi,
        otel_SNG_birim_fiyat: item.otel_SNG_birim_fiyat,
        otel_SNG_oda_sayisi: item.otel_SNG_oda_sayisi,
        otel_DBL_birim_fiyat: item.otel_DBL_birim_fiyat,
        otel_DBL_oda_sayisi: item.otel_DBL_oda_sayisi,
        otel_TRP_birim_fiyat: item.otel_TRP_birim_fiyat,
        otel_TRP_oda_sayisi: item.otel_TRP_oda_sayisi
      })),
      rehberler: formData.rehberler.map(item => ({
        rehber_yevmiyesi: item.rehber_yevmiyesi,
        rehber_gun_sayisi: item.rehber_gun_sayisi,
        rehber_gunluk_yemek_birim_fiyati: item.rehber_gunluk_yemek_birim_fiyati,
        rehber_YD_harc: item.rehber_YD_harc,
        rehber_YD_harc_gun_sayisi: item.rehber_YD_harc_gun_sayisi
      })),
      ogretmenler: formData.ogretmenler.map(item => ({
        pp: item.pp,
        yd_harc: item.yd_harc
      })),
      giris_yapilan_yerler: formData.giris_yapilan_yerler.map(item => ({
        giris_yapilan_yer: item.giris_yapilan_yer,
        pp: item.pp
      })),
      diger: formData.diger.map(item => ({
        ad: item.ad,
        miktar: item.miktar,
        fiyat: item.fiyat
      }))
    };

    axios({
      method: 'PATCH',
      url: `https://senka.valentura.com/api/operation-team/mutabakat/edit-mutabakat-form/id=${formId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: formattedData
    })
      .then((response) => {
        toast.success("Veriler başarıyla kaydedildi!");
      })
      .catch((error) => {
        toast.error("Veriler kaydedilirken hata oluştu!");
      });
  };

  const renderFieldGroup = (fieldGroup, fields) => {
    return formData[fieldGroup].map((item, index) => (
      <div key={index} className="mb-4 flex items-center">
        <button
          type="button"
          onClick={() => handleRemoveField(index, fieldGroup)}
          className="mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Sil
        </button>
        <div className="flex space-x-4 w-full">
          {fields.map((field, fieldIndex) => (
            <div key={fieldIndex} className="w-1/4">
              <label htmlFor={`${field.name}_${index}`} className="block font-semibold">{field.label}</label>
              <input
                type={field.type}
                id={`${field.name}_${index}`}
                name={field.name}
                value={item[field.name]}
                onChange={(e) => handleInputChange(e, index, fieldGroup)}
                className="w-full p-2 border rounded bg-white"
              />
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const handleApprove = () => {
    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/operation-team/mutabakat/approve-mutabakat-form/id=${formId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        toast.success("Form başarıyla onaylandı!");
      })
      .catch((error) => {
        toast.error("Form onaylanırken hata oluştu!");
      });
  };

  const handleReject = () => {
    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/operation-team/mutabakat/reject-mutabakat-form/id=${formId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        toast.success("Form başarıyla reddedildi!");
      })
      .catch((error) => {
        toast.error("Form reddedilirken hata oluştu!");
      });
  };

  return (
    <div className="editable-form-container bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Form</h1>
      <form>
        <Toaster />

        {/* Read-only Fields */}
        <div className="mb-4">
        
          <div className="mb-2">
            <label htmlFor="isim" className="block font-semibold">İsim</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.isim}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="soyisim" className="block font-semibold">Soyisim</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.soyisim}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="unvan" className="block font-semibold">Unvan</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.unvan}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="tel_no" className="block font-semibold">Telefon Numarası</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.tel_no}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block font-semibold">Email</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.email}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="program_adi" className="block font-semibold">Program Adı</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.program_adi}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="ulke" className="block font-semibold">Ülke</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.ulke}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="sehir" className="block font-semibold">Şehir</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.sehir}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="okul" className="block font-semibold">Okul</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.okul}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="ilgili_sinif" className="block font-semibold">İlgili Sınıf</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.ilgili_sinif}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="zumre" className="block font-semibold">Zümre</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.zumre}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="gidilecek_sehir" className="block font-semibold">Gidilecek Şehir</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.gidilecek_sehir}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="donulecek_sehir" className="block font-semibold">Dönülecek Şehir</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.donulecek_sehir}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="kazanim_ve_beklentiler" className="block font-semibold">Kazanç ve Beklentiler</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.kazanim_ve_beklentiler}
            </div>
          </div>
        </div>

        {/* ID */}
        <div className="mb-2">
          <label htmlFor="id" className="block font-semibold">ID</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.id}
          </div>
        </div>

        {/* Kampüs */}
        <div className="mb-2">
          <label htmlFor="kampüs" className="block font-semibold">Kampüs</label>
          <input
            type="text"
            id="kampüs"
            name="kampüs"
            value={formData.kampus_adi}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
          />
        </div>

        {/* Gidiş ve Dönüş Tarihi */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="gidis_tarihi" className="block font-semibold">Gidiş Tarihi</label>
            <input
              type="date"
              id="gidis_tarihi"
              name="gidis_tarihi"
              value={moment(formData.gidis_tarihi).format('YYYY-MM-DD')}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="donus_tarihi" className="block font-semibold">Dönüş Tarihi</label>
            <input
              type="date"
              id="donus_tarihi"
              name="donus_tarihi"
              value={moment(formData.donus_tarihi).format('YYYY-MM-DD')}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
            />
          </div>
        </div>

        {/* Öğrenci ve Öğretmen Sayısı */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="ogrenci_sayisi" className="block font-semibold">Öğrenci Sayısı</label>
            <input
              type="number"
              id="ogrenci_sayisi"
              name="ogrenci_sayisi"
              value={formData.ogrenci_sayisi}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="ogretmen_sayisi" className="block font-semibold">Öğretmen Sayısı</label>
            <input
              type="number"
              id="ogretmen_sayisi"
              name="ogretmen_sayisi"
              value={formData.ogretmen_sayisi}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
            />
          </div>
        </div>

        {/* Birim Fiyat ve Toplam Fiyat */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="birim_fiyat" className="block font-semibold">Birim Fiyat</label>
            <input
              type="number"
              id="birim_fiyat"
              name="birim_fiyat"
              value={formData.birim_fiyat}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="toplam_fiyat_ogrenci_ogretmen" className="block font-semibold">Toplam Fiyat (Öğrenci ve Öğretmen)</label>
            <input
              type="number"
              id="toplam_fiyat_ogrenci_ogretmen"
              name="toplam_fiyat_ogrenci_ogretmen"
              value={formData.toplam_fiyat_ogrenci_ogretmen}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
            />
          </div>
        </div>

        {/* Ulaşım Araçları */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Ulaşım Araçları</h2>
        {renderFieldGroup('ulasim_araclari', [
          { label: 'Ulaşım Aracı', name: 'ulasim_araci', type: 'text' },
          { label: 'Araç Kişi Sayısı', name: 'arac_kisi_sayisi', type: 'number' },
          { label: 'Ulaşım Aracı Birim Fiyatı', name: 'ulasim_araci_birim_fiyat', type: 'number' },
          { label: 'Ulaşım Aracı Toplam Fiyat', name: 'ulasim_araci_toplam_fiyat', type: 'number' }
        ])}
        <button
          type="button"
          onClick={() => handleAddField('ulasim_araclari')}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Ulaşım Aracı Ekle
        </button>

        {/* Oteller */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Oteller</h2>
        {renderFieldGroup('oteller', [
          { label: 'Kalınacak Gün Sayısı', name: 'kalinacak_gun_sayisi', type: 'number' },
          { label: 'Otel SNG Birim Fiyat', name: 'otel_SNG_birim_fiyat', type: 'number' },
          { label: 'Otel SNG Oda Sayısı', name: 'otel_SNG_oda_sayisi', type: 'number' },
          { label: 'Otel DBL Birim Fiyat', name: 'otel_DBL_birim_fiyat', type: 'number' },
          { label: 'Otel DBL Oda Sayısı', name: 'otel_DBL_oda_sayisi', type: 'number' },
          { label: 'Otel TRP Birim Fiyat', name: 'otel_TRP_birim_fiyat', type: 'number' },
          { label: 'Otel TRP Oda Sayısı', name: 'otel_TRP_oda_sayisi', type: 'number' },
          { label: 'Otel Toplam Fiyat', name: 'otel_toplam_fiyat', type: 'number' }
        ])}
        <button
          type="button"
          onClick={() => handleAddField('oteller')}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Otel Ekle
        </button>

        {/* Rehberler */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Rehberler</h2>
        {renderFieldGroup('rehberler', [
          { label: 'Rehber İsmi', name: 'rehber_ismi', type: 'text' },
          { label: 'Rehber Yevmiyesi', name: 'rehber_yevmiyesi', type: 'number' },
          { label: 'Rehber Gün Sayısı', name: 'rehber_gun_sayisi', type: 'number' },
          { label: 'Rehber Günlük Yemek Birim Fiyatı', name: 'rehber_gunluk_yemek_birim_fiyati', type: 'number' },
          { label: 'Rehber YD Harcı', name: 'rehber_YD_harc', type: 'number' },
          { label: 'Rehber YD Harcı Gün Sayısı', name: 'rehber_YD_harc_gun_sayisi', type: 'number' }
        ])}
        <button
          type="button"
          onClick={() => handleAddField('rehberler')}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Rehber Ekle
        </button>

        {/* Öğretmenler */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Öğretmenler</h2>
        {renderFieldGroup('ogretmenler', [
          { label: 'Öğretmen İsmi', name: 'ogretmen_ismi', type: 'text' },
          { label: 'Öğretmen YD Harcı', name: 'yd_harc', type: 'number' }
        ])}
        <button
          type="button"
          onClick={() => handleAddField('ogretmenler')}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Öğretmen Ekle
        </button>

        {/* Giriş Yapılan Yerler */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Giriş Yapılan Yerler</h2>
        {renderFieldGroup('giris_yapilan_yerler', [
          { label: 'Giriş Yapılan Yer', name: 'giris_yapilan_yer', type: 'text' },
          { label: 'PP', name: 'pp', type: 'number' }
        ])}
        <button
          type="button"
          onClick={() => handleAddField('giris_yapilan_yerler')}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Giriş Yapılan Yer Ekle
        </button>

        {/* Diğer */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Diğer</h2>
        {renderFieldGroup('diger', [
          { label: 'Ad', name: 'ad', type: 'text' },
          { label: 'Miktar', name: 'miktar', type: 'number' },
          { label: 'Fiyat', name: 'fiyat', type: 'number' }
        ])}
        <button
          type="button"
          onClick={() => handleAddField('diger')}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Diğer Ekle
        </button>

        {/* Toplam Fiyat */}
        <div className="mb-2">
          <label htmlFor="toplam_fiyat" className="block font-semibold">Toplam Fiyat</label>
          <input
            type="number"
            id="toplam_fiyat"
            name="toplam_fiyat"
            value={formData.toplam_fiyat}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
          />
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Kaydet
          </button>
          <button onClick={handleApprove}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600">Kabul Et</button>
      <button onClick={handleReject}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600">Red Et</button>
        </div>
      </form>
    </div>
  );
}

export default EditableFormPage;
