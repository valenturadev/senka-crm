import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import moment from 'moment';

function EditableFormPage() {
  const { formId } = useParams();
  const localUser = localStorage.getItem("user");
  const myUser = JSON.parse(localUser);

  const [formData, setFormData] = useState({
    id: formId,
    kampus_adi: '',
    gidis_tarihi: '',
    donus_tarihi: '',
    ogrenci_sayisi: 0,
    ogretmen_sayisi: 0,
    birim_fiyat: 0.0,
    toplam_fiyat_ogrenci_ogretmen: 0.0,
    ulasim_araclari: [],
    oteller: [],
    rehberler: [],
    ogretmenler: {
      pp: 0,
      yd_harc: 0
    },
    giris_yapilan_yerler: [],
    diger: [],
    toplam_fiyat: 0.0,
    para_birimi: 'TRY',
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
    total_ciro: 0.0,
    total_maliyet: 0.0,
    kisi_basi_maliyet: 0.0,
    ulasim_araclari_toplam_fiyati: 0.0,
    oteller_toplam_fiyati: 0.0,
    rehberler_toplam_fiyati: 0.0,
    ogretmenler_toplam_fiyati: 0.0,
    giris_yapilan_yerler_toplam_fiyati: 0.0
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
        console.log('Response Data:', responseData); // Debug log
        setFormData({
          ...responseData,
          ulasim_araclari: JSON.parse(responseData.ulasim_araclari || '[]'),
          oteller: JSON.parse(responseData.oteller || '[]'),
          rehberler: JSON.parse(responseData.rehberler || '[]'),
          giris_yapilan_yerler: JSON.parse(responseData.giris_yapilan_yerler || '[]'),
          diger: JSON.parse(responseData.diger || '[]'),
          ogretmenler: JSON.parse(responseData.ogretmenler || '{"pp": 0, "yd_harc": 0}')
        });
      })
      .catch((error) => {
        toast.error("Veriler alınırken hata oluştu!");
        console.error('Error fetching data:', error); // Debug log
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
        newItem.otel_ismi = '';
        break;
      case 'rehberler':
        newItem.rehber_ismi = '';
        newItem.rehber_maliyet = 0;
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

  const handleOgretmenChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      ogretmenler: {
        ...prevState.ogretmenler,
        [name]: value
      }
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
        ulasim_araci_birim_fiyat: item.ulasim_araci_birim_fiyat,
        ulasim_araci_toplam_fiyat: item.ulasim_araci_toplam_fiyat
      })),
      oteller: formData.oteller.map(item => ({
        otel_ismi: item.otel_ismi,
        kalinacak_gun_sayisi: item.kalinacak_gun_sayisi,
        otel_SNG_birim_fiyat: item.otel_SNG_birim_fiyat,
        otel_SNG_oda_sayisi: item.otel_SNG_oda_sayisi,
        otel_DBL_birim_fiyat: item.otel_DBL_birim_fiyat,
        otel_DBL_oda_sayisi: item.otel_DBL_oda_sayisi,
        otel_TRP_birim_fiyat: item.otel_TRP_birim_fiyat,
        otel_TRP_oda_sayisi: item.otel_TRP_oda_sayisi,
        otel_toplam_fiyat: item.otel_toplam_fiyat
      })),
      rehberler: formData.rehberler.map(item => ({
        rehber_ismi: item.rehber_ismi,
        rehber_maliyet: item.rehber_maliyet
      })),
      ogretmenler: {
        pp: formData.ogretmenler.pp,
        yd_harc: formData.ogretmenler.yd_harc
      },
      giris_yapilan_yerler: formData.giris_yapilan_yerler.map(item => ({
        giris_yapilan_yer: item.giris_yapilan_yer,
        pp: item.pp
      })),
      diger: formData?.diger?.map(item => ({
        ad: item.ad,
        miktar: item.miktar,
        fiyat: item.fiyat
      })),
      toplam_fiyat: formData.toplam_fiyat,
      para_birimi: formData.para_birimi
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
      .then(() => {
        toast.success("Form başarıyla güncellendi!");
      })
      .catch((error) => {
        toast.error("Form güncellenirken hata oluştu!");
        console.error('Error saving data:', error); // Debug log
      });
  };

  const renderFieldGroup = (fieldGroup, fields) => {
    return formData[fieldGroup]?.map((item, index) => (
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

  const renderOtelGroup = () => {
    return formData.oteller?.map((item, index) => (
      <div key={index} className="mb-4">
        <button
          type="button"
          onClick={() => handleRemoveField(index, 'oteller')}
          className="mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Sil
        </button>
        <div className="mb-2">
          <label htmlFor={`otel_ismi_${index}`} className="block font-semibold">Otel Adı</label>
          <input
            type="text"
            id={`otel_ismi_${index}`}
            name="otel_ismi"
            value={item.otel_ismi}
            onChange={(e) => handleInputChange(e, index, 'oteller')}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`kalinacak_gun_sayisi_${index}`} className="block font-semibold">Kalınacak Gün Sayısı</label>
          <input
            type="number"
            id={`kalinacak_gun_sayisi_${index}`}
            name="kalinacak_gun_sayisi"
            value={item.kalinacak_gun_sayisi}
            onChange={(e) => handleInputChange(e, index, 'oteller')}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`otel_SNG_birim_fiyat_${index}`} className="block font-semibold">Otel SNG Birim Fiyat</label>
          <input
            type="number"
            id={`otel_SNG_birim_fiyat_${index}`}
            name="otel_SNG_birim_fiyat"
            value={item.otel_SNG_birim_fiyat}
            onChange={(e) => handleInputChange(e, index, 'oteller')}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`otel_SNG_oda_sayisi_${index}`} className="block font-semibold">Otel SNG Oda Sayısı</label>
          <input
            type="number"
            id={`otel_SNG_oda_sayisi_${index}`}
            name="otel_SNG_oda_sayisi"
            value={item.otel_SNG_oda_sayisi}
            onChange={(e) => handleInputChange(e, index, 'oteller')}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`otel_DBL_birim_fiyat_${index}`} className="block font-semibold">Otel DBL Birim Fiyat</label>
          <input
            type="number"
            id={`otel_DBL_birim_fiyat_${index}`}
            name="otel_DBL_birim_fiyat"
            value={item.otel_DBL_birim_fiyat}
            onChange={(e) => handleInputChange(e, index, 'oteller')}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`otel_DBL_oda_sayisi_${index}`} className="block font-semibold">Otel DBL Oda Sayısı</label>
          <input
            type="number"
            id={`otel_DBL_oda_sayisi_${index}`}
            name="otel_DBL_oda_sayisi"
            value={item.otel_DBL_oda_sayisi}
            onChange={(e) => handleInputChange(e, index, 'oteller')}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`otel_TRP_birim_fiyat_${index}`} className="block font-semibold">Otel TRP Birim Fiyat</label>
          <input
            type="number"
            id={`otel_TRP_birim_fiyat_${index}`}
            name="otel_TRP_birim_fiyat"
            value={item.otel_TRP_birim_fiyat}
            onChange={(e) => handleInputChange(e, index, 'oteller')}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`otel_TRP_oda_sayisi_${index}`} className="block font-semibold">Otel TRP Oda Sayısı</label>
          <input
            type="number"
            id={`otel_TRP_oda_sayisi_${index}`}
            name="otel_TRP_oda_sayisi"
            value={item.otel_TRP_oda_sayisi}
            onChange={(e) => handleInputChange(e, index, 'oteller')}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`otel_toplam_fiyat_${index}`} className="block font-semibold">Otel Toplam Fiyat</label>
          <input
            type="number"
            id={`otel_toplam_fiyat_${index}`}
            name="otel_toplam_fiyat"
            value={item.otel_toplam_fiyat}
            onChange={(e) => handleInputChange(e, index, 'oteller')}
            className="w-full p-2 border rounded bg-white"
          />
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
        console.error('Error approving form:', error); // Debug log
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
        console.error('Error rejecting form:', error); // Debug log
      });
  };

  const calculateOtelToplamFiyat = () => {
    return formData.oteller.reduce((acc, item) => acc + parseFloat(item.otel_toplam_fiyat || 0), 0);
  };

  return (
    <div className="editable-form-container bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Form</h1>
      <form>
        <Toaster />

        {/* Para Birimi */}
        <div className="mb-4">
          <label htmlFor="para_birimi" className="block font-semibold">Para Birimi</label>
          <select
            id="para_birimi"
            name="para_birimi"
            value={formData.para_birimi}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="TRY">TRY</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

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
        {renderOtelGroup()}
        <div className="mb-4">
          <label className="block font-semibold">Oteller Toplam Fiyatı</label>
          <div className="w-full p-2 border rounded bg-white">
            {calculateOtelToplamFiyat()}
          </div>
        </div>
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
          { label: 'Maliyet', name: 'rehber_maliyet', type: 'number' },
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
        <div className="mb-4 flex items-center">
          <div className="flex space-x-4 w-full">
            <div className="w-1/2">
              <label htmlFor="pp" className="block font-semibold">Kişi başı maliyet</label>
              <input
                type="number"
                id="pp"
                name="pp"
                value={formData.ogretmenler.pp}
                onChange={handleOgretmenChange}
                className="w-full p-2 border rounded bg-white"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="yd_harc" className="block font-semibold">YD Harç</label>
              <input
                type="number"
                id="yd_harc"
                name="yd_harc"
                value={formData.ogretmenler.yd_harc}
                onChange={handleOgretmenChange}
                className="w-full p-2 border rounded bg-white"
              />
            </div>
          </div>
        </div>

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
          { label: 'Açıklama', name: 'ad', type: 'text' },
          { label: 'Adet', name: 'miktar', type: 'number' },
          { label: 'Birim Fiyat', name: 'fiyat', type: 'number' }
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

        {/* Total Ciro */}
        <div className="mb-2">
          <label htmlFor="total_ciro" className="block font-semibold">Toplam Ciro</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.total_ciro}
          </div>
        </div>

        {/* Total Maliyet */}
        <div className="mb-2">
          <label htmlFor="total_maliyet" className="block font-semibold">Toplam Maliyet</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.total_maliyet}
          </div>
        </div>

        {/* Kişi Başı Maliyet */}
        <div className="mb-2">
          <label htmlFor="kisi_basi_maliyet" className="block font-semibold">Kişi Başı Maliyet</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.kisi_basi_maliyet}
          </div>
        </div>

        {/* Ulaşım Araçları Toplam Fiyatı */}
        <div className="mb-2">
          <label htmlFor="ulasim_araclari_toplam_fiyati" className="block font-semibold">Ulaşım Araçları Toplam Fiyatı</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.ulasim_araclari_toplam_fiyati}
          </div>
        </div>

        {/* Oteller Toplam Fiyatı */}
        <div className="mb-2">
          <label htmlFor="oteller_toplam_fiyati" className="block font-semibold">Oteller Toplam Fiyatı</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.oteller_toplam_fiyati}
          </div>
        </div>

        {/* Rehberler Toplam Fiyatı */}
        <div className="mb-2">
          <label htmlFor="rehberler_toplam_fiyati" className="block font-semibold">Rehberler Toplam Fiyatı</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.rehberler_toplam_fiyati}
          </div>
        </div>

        {/* Öğretmenler Toplam Fiyatı */}
        <div className="mb-2">
          <label htmlFor="ogretmenler_toplam_fiyati" className="block font-semibold">Öğretmenler Toplam Fiyatı</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.ogretmenler_toplam_fiyati}
          </div>
        </div>

        {/* Giriş Yapılan Yerler Toplam Fiyatı */}
        <div className="mb-2">
          <label htmlFor="giris_yapilan_yerler_toplam_fiyati" className="block font-semibold">Giriş Yapılan Yerler Toplam Fiyatı</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.giris_yapilan_yerler_toplam_fiyati}
          </div>
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
