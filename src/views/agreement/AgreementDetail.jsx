import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditableFormPage({ }) {
  const { formId } = useParams();
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

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

  const [editedData, setEditedData] = useState({
    ogrenci_sayisi: null,
    ogretmen_sayisi: null,
    birim_fiyat: null,
    ulasim_araclari: [],
    oteller: [],
    rehberler: [],
    ogretmenler: {
      pp: null,
      yd_harc: null
    },
    giris_yapilan_yerler: []
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
    setEditedData({
      ...editedData,
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

  const handleTransferChange = (e, index, field) => {
    const newTransferler = [...formData.transferler];
    newTransferler[index][field] = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      transferler: newTransferler,
    }));
  };

  const handleLokasyonChange = (e, index, field) => {
    const newLokasyons = [...formData.lokasyons];
    newLokasyons[index][field] = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      lokasyons: newLokasyons,
    }));
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

  const handleApprove = () => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/operation-team/mutabakat/approve-mutabakat-form/id=${formId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        // İşlem başarılı olduğunda yapmak istediğiniz eylemler
      })
      .catch(error => {
        // Hata durumunda yapmak istediğiniz eylemler
      });
  };

  const handleReject = () => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/operation-team/mutabakat/reject-mutabakat-form/id=${formId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        // İşlem başarılı olduğunda yapmak istediğiniz eylemler
      })
      .catch(error => {
        // Hata durumunda yapmak istediğiniz eylemler
      });
  };
  const saveChanges = () => {
    axios({
      method: 'PATCH',
      url: `https://senka.valentura.com/api/operation-team/mutabakat/edit-mutabakat-form/id=${formId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: editedData
    })
    .then(response => {
      // İşlem başarılı olduğunda yapmak istediğiniz eylemler.
      // Örneğin: Kullanıcıya başarılı mesajı göstermek, sayfayı yenilemek vb.
    })
    .catch(error => {
      // Hata durumunda yapmak istediğiniz eylemler.
      // Örneğin: Kullanıcıya hata mesajı göstermek.
    });
  };

  return (
    <div className="editable-form-container bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Form</h1>
      <form>

        {/* İd */}
        <div className="mb-2">
          <label htmlFor="id" className="block font-semibold">ID</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.id}
          </div>
        </div>

        {/* Kampüs Adı */}
        <div className="mb-2">
          <label htmlFor="kampus_adi" className="block font-semibold">Kampüs adı</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.kampus_adi}
          </div>
        </div>

        <h5 className="text-xl mb-6 text-blue-900">Kişisel Bilgiler</h5>

        <div className="flex space-x-4 mb-4">
          {/* İsim */}
          <div className="w-1/2">
            <label htmlFor="isim" className="block font-semibold">İsim</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.isim}
            </div>
          </div>

          {/* Soyisim */}
          <div className="w-1/2">
            <label htmlFor="soyisim" className="block font-semibold">Soyisim</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.soyisim}
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          {/* Okul */}
          <div className="w-1/4">
            <label htmlFor="okul" className="block font-semibold">Okul</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.okul}
            </div>
          </div>

          {/* Unvan */}
          <div className="w-1/4">
            <label htmlFor="unvan" className="block font-semibold">Unvan</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.unvan}
            </div>
          </div>

          {/* Telefon Numarası */}
          <div className="w-1/4">
            <label htmlFor="tel_no" className="block font-semibold">Telefon Numarası</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.tel_no}
            </div>
          </div>

          {/* Email */}
          <div className="w-1/4">
            <label htmlFor="email" className="block font-semibold">Email</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.email}
            </div>
          </div>
        </div>


        <h5 className="text-xl mb-6 text-blue-900">Kazanım ve Beklentiler</h5>

        {/* Kazanım ve Beklentiler */}
        <div className="mb-2">
          <label htmlFor="kazanim_ve_beklentiler" className="block font-semibold">Kazanım ve Beklentiler</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.kazanim_ve_beklentiler}
          </div>
        </div>

        <h5 className="text-xl mb-6 text-blue-900">Program Detayı</h5>

        <div className="flex space-x-4 mb-4">

          {/* Ulaşım Aracı */}
          <div className="w-1/3">
            <label htmlFor="ulasim_araci" className="block font-semibold">Ulaşım Aracı</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.ulasim_araci}
            </div>
          </div>

          {/* Gidiş Tarihi */}
          <div className="w-1/3">
            <label htmlFor="gidis_tarihi" className="block font-semibold">Gidiş Tarihi</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.gidis_tarihi}
            </div>
          </div>

          {/* Dönüş Tarihi */}
          <div className="w-1/3">
            <label htmlFor="donus_tarihi" className="block font-semibold">Dönüş Tarihi</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.donus_tarihi}
            </div>
          </div>
        </div>

        {/* Transferler */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Transferler</h2>

        <div>
          {formData.transferler.map((transfer, index) => (
            <div key={index} className="mb-4">
              <div className="flex space-x-4 mb-2">
                <div className="w-1/3">
                  <label className="block font-semibold">Araç</label>
                  <div className="w-full p-2 border rounded bg-white">
                    {transfer.arac}
                  </div>
                </div>
                <div className="w-1/3">
                  <label className="block font-semibold">Kalkılan Durak</label>
                  <div className="w-full p-2 border rounded bg-white">
                    {transfer.kalkilan_durak}
                  </div>
                </div>
                <div className="w-1/3">
                  <label className="block font-semibold">Götürülen Durak</label>
                  <div className="w-full p-2 border rounded bg-white">
                    {transfer.goturulen_durak}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h5 className="text-xl mb-6 text-blue-900">Talep Edilen Gezi Bilgileri</h5>

        <div className="flex space-x-4 mb-4">
          {/* Program Adı */}
          <div className="w-1/4">
            <label htmlFor="program_adi" className="block font-semibold">Program Adı</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.program_adi}
            </div>
          </div>

          {/* Ülke */}
          <div className="w-1/4">
            <label htmlFor="ulke" className="block font-semibold">Ülke</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.ulke}
            </div>
          </div>

          {/* Şehir */}
          <div className="w-1/4">
            <label htmlFor="sehir" className="block font-semibold">Şehir</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.sehir}
            </div>
          </div>

          {/* Öngörülen Öğrenci Sayısı */}
          <div className="w-1/4">
            <label htmlFor="ongorulen_ogrenci_sayisi" className="block font-semibold">Öngörülen Öğrenci Sayısı</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.ongorulen_ogrenci_sayisi}
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          {/* İlgili Sınıf */}
          <div className="w-1/4">
            <label htmlFor="ilgili_sinif" className="block font-semibold">İlgili Sınıf </label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.ilgili_sinif}
            </div>
          </div>

          {/* Zumre */}
          <div className="w-1/4">
            <label htmlFor="zumre" className="block font-semibold">Zumre</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.zumre}
            </div>
          </div>

          {/* Gidilecek Şehir */}
          <div className="w-1/4">
            <label htmlFor="gidilecek_sehir" className="block font-semibold">Gidilecek Şehir</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.gidilecek_sehir}
            </div>
          </div>

          {/* Dönüş Şehir */}
          <div className="w-1/4">
            <label htmlFor="donulecek_sehir" className="block font-semibold">Dönüş Şehir</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.donulecek_sehir}
            </div>
          </div>
        </div>

        {/* Lokasyonlar */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Lokasyonlar</h2>
        <div>
          {formData.lokasyons.map((lokasyon, index) => (
            <div key={index} className="mb-4">
              <div className="flex space-x-4 mb-2">
                <div className="w-1/3">
                  <label className="block font-semibold">Lokasyon</label>
                  <div className="w-full p-2 border rounded bg-white">
                    {lokasyon.lokasyon}
                  </div>
                </div>
                <div className="w-1/3">
                  <label className="block font-semibold">Giriş</label>
                  <div className="w-full p-2 border rounded bg-white">
                    {lokasyon.giris}
                  </div>
                </div>
                <div className="w-1/3">
                  <label className="block font-semibold">Çıkış</label>
                  <div className="w-full p-2 border rounded bg-white">
                    {lokasyon.cikis}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4 mb-4">
          {/* Created At */}
          <div className="w-1/2">
            <label htmlFor="created_at" className="block font-semibold">Oluşturma tarihi</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.created_at}
            </div>
          </div>

          {/* Updated At */}
          <div className="w-1/2">
            <label htmlFor="updated_at" className="block font-semibold">Güncelleme tarihi</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.updated_at}
            </div>
          </div>
        </div>

        <div className="mb-20"></div>


        {/* is_approve
        <div className="mb-2">
          <label htmlFor="is_approve" className="block font-semibold">Onay Durumu</label>
          <input
            type="text"
            id="is_approve"
            name="is_approve"
            value={formData.is_approve || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div> */}

        {/* ogrenci_sayisi */}
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

        {/* ogretmen_sayisi */}
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

        {/* birim_fiyat */}
        <div className="mb-2">
          <label htmlFor="birim_fiyat" className="block font-semibold">Birim Fiyat</label>
          <input
            type="number"
            id="birim_fiyat"
            name="birim_fiyat"
            value={formData.birim_fiyat || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* gelirler */}
        <div className="mb-2">
          <label htmlFor="gelirler" className="block font-semibold">Gelirler</label>
          <input
            type="number"
            id="gelirler"
            name="gelirler"
            value={formData.gelirler || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

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

            <label htmlFor={`ulasim_araci_tipi${index}`} className="block font-semibold">Ulaşım Aracı tipi</label>
            <input
              type="text"
              id={`ulasim_araci_tipi${index}`}
              name={`ulasim_araclari[${index}].ulasim_araci_tipi`}
              value={ulasim.ulasim_araci_tipi || ''}
              onChange={(e) => handleArrayChange(e, index, 'ulasim_araclari')}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />

            <label htmlFor={`ulasim_araci_rotasi${index}`} className="block font-semibold">Ulaşım Aracı rotası</label>
            <input
              type="text"
              id={`ulasim_araci_rotasi${index}`}
              name={`ulasim_araci_rotasi[${index}].ulasim_araci_rotasi`}
              value={ulasim.ulasim_araci_rotasi || ''}
              onChange={(e) => handleArrayChange(e, index, 'ulasim_araclari')}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />

            <label htmlFor={`arac_kisi_sayisi${index}`} className="block font-semibold">Ulaşım Aracı kişi sayısı</label>
            <input
              type="text"
              id={`arac_kisi_sayisi${index}`}
              name={`arac_kisi_sayisi[${index}].arac_kisi_sayisi`}
              value={ulasim.arac_kisi_sayisi || ''}
              onChange={(e) => handleArrayChange(e, index, 'ulasim_araclari')}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />

            <label htmlFor={`ulasim_araci_birim_fiyat${index}`} className="block font-semibold">Ulaşım Aracı birim fiyatı</label>
            <input
              type="text"
              id={`ulasim_araci_birim_fiyat${index}`}
              name={`ulasim_araci_birim_fiyat[${index}].ulasim_araci_birim_fiyat`}
              value={ulasim.ulasim_araci_birim_fiyat || ''}
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
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor={`otel_ismi_${index}`} className="block font-semibold">Otel İsmi</label>
                <input
                  type="text"
                  id={`otel_ismi_${index}`}
                  name={`oteller[${index}].otel_ismi`}
                  value={otel.otel_ismi || ''}
                  onChange={(e) => handleArrayChange(e, index, 'oteller')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor={`otel_ismi_${index}`} className="block font-semibold">Kalınacak gün sayısı</label>
                <input
                  type="text"
                  id={`kalinacak_gun_sayisi${index}`}
                  name={`oteller[${index}].kalinacak_gun_sayisi`}
                  value={otel.kalinacak_gun_sayisi || ''}
                  onChange={(e) => handleArrayChange(e, index, 'oteller')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor={`otel_SNG_birim_fiyat_${index}`} className="block font-semibold">Otel SNG birim fiyatı</label>
                <input
                  type="text"
                  id={`otel_SNG_birim_fiyat${index}`}
                  name={`oteller[${index}].otel_SNG_birim_fiyat`}
                  value={otel.otel_SNG_birim_fiyat || ''}
                  onChange={(e) => handleArrayChange(e, index, 'oteller')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor={`otel_SNG_oda_sayisi_${index}`} className="block font-semibold">Otel SNG oda sayısı</label>
                <input
                  type="text"
                  id={`otel_SNG_oda_sayisi${index}`}
                  name={`oteller[${index}].otel_SNG_oda_sayisi`}
                  value={otel.otel_SNG_oda_sayisi || ''}
                  onChange={(e) => handleArrayChange(e, index, 'oteller')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor={`otel_DBL_birim_fiyat_${index}`} className="block font-semibold">Otel DBL birim fiyatı</label>
                <input
                  type="text"
                  id={`otel_DBL_birim_fiyat${index}`}
                  name={`oteller[${index}].otel_DBL_birim_fiyat`}
                  value={otel.otel_DBL_birim_fiyat || ''}
                  onChange={(e) => handleArrayChange(e, index, 'oteller')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor={`otel_DBL_oda_sayisi_${index}`} className="block font-semibold">Otel DBL oda sayısı</label>
                <input
                  type="text"
                  id={`otel_DBL_oda_sayisi${index}`}
                  name={`oteller[${index}].otel_DBL_oda_sayisi`}
                  value={otel.otel_DBL_oda_sayisi || ''}
                  onChange={(e) => handleArrayChange(e, index, 'oteller')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor={`otel_TRP_birim_fiyat_${index}`} className="block font-semibold">Otel TRP birim fiyatı</label>
                <input
                  type="text"
                  id={`otel_TRP_birim_fiyat${index}`}
                  name={`oteller[${index}].otel_TRP_birim_fiyat`}
                  value={otel.otel_TRP_birim_fiyat || ''}
                  onChange={(e) => handleArrayChange(e, index, 'oteller')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor={`otel_TRP_oda_sayisi_${index}`} className="block font-semibold">Otel TRP oda sayısı</label>
                <input
                  type="text"
                  id={`otel_TRP_oda_sayisi${index}`}
                  name={`oteller[${index}].otel_TRP_oda_sayisi`}
                  value={otel.otel_TRP_oda_sayisi || ''}
                  onChange={(e) => handleArrayChange(e, index, 'oteller')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

          </div>
        ))}
        {/* Diğer Alanları da Ekleyin */}

        {/* Rehberler */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Rehberler</h2>
        {formData.rehberler.map((rehber, index) => (
          <div key={index} className="mb-2">
            <div className="flex space-x-4">
              <div className="w-1/3">
                <label htmlFor={`rehber_ismi_${index}`} className="block font-semibold">Rehber İsmi</label>
                <input
                  type="text"
                  id={`rehber_ismi_${index}`}
                  name={`rehberler[${index}].rehber_ismi`}
                  value={rehber.rehber_ismi || ''}
                  onChange={(e) => handleArrayChange(e, index, 'rehberler')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="w-1/3">
                <label htmlFor={`rehber_yevmiyesi${index}`} className="block font-semibold">Rehber Yevmiyesi</label>
                <input
                  type="text"
                  id={`rehber_yevmiyesi${index}`}
                  name={`rehberler[${index}].rehber_yevmiyesi`}
                  value={rehber.rehber_yevmiyesi || ''}
                  onChange={(e) => handleArrayChange(e, index, 'rehberler')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="w-1/3">
                <label htmlFor={`rehber_gun_sayisi${index}`} className="block font-semibold">Rehber gün sayısı</label>
                <input
                  type="text"
                  id={`rehber_gun_sayisi${index}`}
                  name={`rehberler[${index}].rehber_gun_sayisi`}
                  value={rehber.rehber_gun_sayisi || ''}
                  onChange={(e) => handleArrayChange(e, index, 'rehberler')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/3">
                <label htmlFor={`rehber_gunluk_yemek_birim_fiyati${index}`} className="block font-semibold">Rehber günlük yemek birim sayısı</label>
                <input
                  type="text"
                  id={`rehber_gunluk_yemek_birim_fiyati${index}`}
                  name={`rehberler[${index}].rehber_gunluk_yemek_birim_fiyati`}
                  value={rehber.rehber_gunluk_yemek_birim_fiyati || ''}
                  onChange={(e) => handleArrayChange(e, index, 'rehberler')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="w-1/3">
                <label htmlFor={`rehber_YD_harc${index}`} className="block font-semibold">Rehber YD harcı</label>
                <input
                  type="text"
                  id={`rehber_YD_harc${index}`}
                  name={`rehberler[${index}].rehber_YD_harc`}
                  value={rehber.rehber_YD_harc || ''}
                  onChange={(e) => handleArrayChange(e, index, 'rehberler')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="w-1/3">
                <label htmlFor={`rehber_YD_harc_gun_sayisi${index}`} className="block font-semibold">Rehber YD harc gün sayısı</label>
                <input
                  type="text"
                  id={`rehber_YD_harc_gun_sayisi${index}`}
                  name={`rehberler[${index}].rehber_YD_harc_gun_sayisi`}
                  value={rehber.rehber_YD_harc_gun_sayisi || ''}
                  onChange={(e) => handleArrayChange(e, index, 'rehberler')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
        {/* Diğer Alanları da Ekleyin */}

        {/* Ogretmenler */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Öğretmenler</h2>
        <div className="mb-2">
          <div className="flex space-x-4 mb-2">
            <div className="w-1/2">
              <label htmlFor="ogretmenler.pp" className="block font-semibold">PP</label>
              <input
                type="text"
                id="ogretmenler.pp"
                name="ogretmenler.pp"
                value={formData.ogretmenler.pp || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="ogretmenler.yd_harc" className="block font-semibold">YD Harc</label>
              <input
                type="text"
                id="ogretmenler.yd_harc"
                name="ogretmenler.yd_harc"
                value={formData.ogretmenler.yd_harc || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

        </div>

        {/* Giriş Yapılan Yerler */}
        <h2 className="text-xl font-semibold mt-4 mb-2">Giriş Yapılan Yerler</h2>
        {formData.giris_yapilan_yerler.map((yer, index) => (
          <div key={index} className="mb-2">
            <div className="flex space-x-4 mb-2">
              <div className="w-1/2">
                <label htmlFor={`giris_yapilan_yer_${index}`} className="block font-semibold">Giriş Yapılan Yer</label>
                <input
                  type="text"
                  id={`giris_yapilan_yer_${index}`}
                  name={`giris_yapilan_yerler[${index}].giris_yapilan_yer`}
                  value={yer.giris_yapilan_yer || ''}
                  onChange={(e) => handleArrayChange(e, index, 'giris_yapilan_yerler')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor={`pp${index}`} className="block font-semibold">PP</label>
                <input
                  type="text"
                  id={`pp${index}`}
                  name={`giris_yapilan_yerler[${index}].pp`}
                  value={yer.pp || ''}
                  onChange={(e) => handleArrayChange(e, index, 'giris_yapilan_yerler')}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

          </div>
        ))}
        {/* Diğer Alanları da Ekleyin */}

        {/* Toplam Fiyat */}
        <div className="mb-2">
          <label htmlFor="toplam_fiyat" className="block font-semibold">Toplam Fiyat</label>
          <input
            type="number"
            id="toplam_fiyat"
            name="toplam_fiyat"
            value={formData.toplam_fiyat || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Onaylı Kişi */}
        {/* <div className="mb-2">
          <label htmlFor="onayli_kisi" className="block font-semibold">Onaylı Kişi</label>
          <input
            type="checkbox"
            id="onayli_kisi"
            name="onayli_kisi"
            checked={formData.onayli_kisi}
            onChange={handleChange}
            className="w-4 h-4 mr-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div> */}



        {/* Submit Button */}
        <div className="mt-4 flex space-x-4">
          <button  onClick={saveChanges}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Kaydet
          </button>

          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Onayla
          </button>

          <button
            onClick={handleReject}xs
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Red Et
          </button>
        </div>

      </form>
    </div>
  );
}

export default EditableFormPage;
