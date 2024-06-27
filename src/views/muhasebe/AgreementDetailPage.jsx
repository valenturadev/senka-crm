import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import moment from 'moment';

function MuhasebePage() {
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
      yd_harc: 0,
      diger: []
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
    giris_yapilan_yerler_toplam_fiyati: 0.0,
  });

  const [currencyRates, setCurrencyRates] = useState({});
  useEffect(() => {
    const fetchFormData = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `https://senka.valentura.com/api/muhasebe/get-onaylanan-mutabakat-form/id=${formId}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${myUser?.access}`
                }
            });

            if (response && response.data && response.data.data) {
                const responseData = response.data.data;
                console.log('Response Data:', responseData); // Debug log

                setCurrencyRates(responseData.currency?.data || {});

                setFormData({
                    ...responseData,
                    ulasim_araclari: safeJsonParse(responseData.ulasim_araclari),
                    oteller: safeJsonParse(responseData.oteller),
                    rehberler: safeJsonParse(responseData.rehberler).map(item => ({
                        ...item,
                        diger: safeJsonParse(item.diger)
                    })),
                    ogretmenler: {
                        ...safeJsonParse(responseData.ogretmenler),
                        diger: safeJsonParse(responseData.ogretmenler.diger)
                    },
                    giris_yapilan_yerler: safeJsonParse(responseData.giris_yapilan_yerler),
                    diger: safeJsonParse(responseData.diger),
                });
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            toast.error("Veriler alınırken hata oluştu!");
            console.error('Error fetching data:', error); // Debug log
        }
    };

    fetchFormData();
}, [formId]);

const safeJsonParse = (jsonString) => {
    try {
        return jsonString ? JSON.parse(jsonString) : [];
    } catch (error) {
        console.error('JSON parse error:', error);
        return [];
    }
};

  const renderChanges = () => {
    if (!formData.degisiklikler || formData.degisiklikler.length === 0) {
      return "Değişiklik yok";
    }

    return formData?.degisiklikler?.map((change, index) => {
      const oldValue = JSON.parse(change.old_value);
      const newValue = JSON.parse(change.new_value);

      return (
        <div key={index} className="mb-2 p-2 border rounded bg-gray-100">
          <p><strong>Alan:</strong> {change.field}</p>
          <p><strong>Eski Veri:</strong> {JSON.stringify(oldValue, null, 2)}</p>
          <p><strong>Yeni Veri:</strong> {JSON.stringify(newValue, null, 2)}</p>
        </div>
      );
    });
  };

  const renderFieldGroup = (fieldGroup, fields, isSubField = false, parentIndex = null) => {
    const items = isSubField ? formData.rehberler[parentIndex].diger : formData[fieldGroup];
    return items.map((item, index) => (
      <div key={index} className="mb-4 p-4 border rounded bg-white shadow-md">
        <div className="flex justify-between items-center mb-4">
          {fields.map((field, fieldIndex) => (
            <div key={fieldIndex} className={`w-${isSubField ? '1/2' : '1/3'}`}>
              <label htmlFor={`${field.name}_${index}`} className="block font-semibold">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  id={`${field.name}_${index}`}
                  name={field.name}
                  value={item[field.name]}
                  onChange={(e) => handleInputChange(e, index, fieldGroup, isSubField ? parentIndex : null)}
                  className="w-full p-2 border rounded bg-gray-50"
                  disabled
                >
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={`${field.name}_${index}`}
                  name={field.name}
                  value={item[field.name]}
                  onChange={(e) => handleInputChange(e, index, fieldGroup, isSubField ? parentIndex : null)}
                  className="w-full p-2 border rounded bg-gray-50"
                  readOnly
                />
              )}
            </div>
          ))}
        </div>
      </div>
    ));
  };


  const renderOtelGroup = () => {
    return formData.oteller?.map((item, index) => (
      <div key={index} className="mb-4 p-4 border rounded bg-white shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/3">
            <label htmlFor={`otel_ismi_${index}`} className="block font-semibold">Otel Adı</label>
            <input
              type="text"
              id={`otel_ismi_${index}`}
              name="otel_ismi"
              value={item.otel_ismi}
              onChange={(e) => handleInputChange(e, index, 'oteller')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div className="w-1/3">
            <label htmlFor={`kalinacak_gun_sayisi_${index}`} className="block font-semibold">Kalınacak Gün Sayısı</label>
            <input
              type="number"
              id={`kalinacak_gun_sayisi_${index}`}
              name="kalinacak_gun_sayisi"
              value={item.kalinacak_gun_sayisi}
              onChange={(e) => handleInputChange(e, index, 'oteller')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div className="w-1/3">
            <label htmlFor={`para_birimi_${index}`} className="block font-semibold">Para Birimi</label>
            <select
              id={`para_birimi_${index}`}
              name="para_birimi"
              value={item.para_birimi}
              onChange={(e) => handleInputChange(e, index, 'oteller')}
              className="w-full p-2 border rounded bg-gray-50"
              disabled
            >
              <option value="TRY">TRY</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CHF">CHF</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div>
            <label htmlFor={`otel_SNG_birim_fiyat_${index}`} className="block font-semibold">Otel SNG Birim Fiyat</label>
            <input
              type="number"
              id={`otel_SNG_birim_fiyat_${index}`}
              name="otel_SNG_birim_fiyat"
              value={item.otel_SNG_birim_fiyat}
              onChange={(e) => handleInputChange(e, index, 'oteller')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label htmlFor={`otel_SNG_oda_sayisi_${index}`} className="block font-semibold">Otel SNG Oda Sayısı</label>
            <input
              type="number"
              id={`otel_SNG_oda_sayisi_${index}`}
              name="otel_SNG_oda_sayisi"
              value={item.otel_SNG_oda_sayisi}
              onChange={(e) => handleInputChange(e, index, 'oteller')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block font-semibold">Otel SNG Toplam Fiyat</label>
            <div className="w-full p-2 border rounded bg-gray-50">
              {item.otel_SNG_birim_fiyat * item.otel_SNG_oda_sayisi}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div>
            <label htmlFor={`otel_DBL_birim_fiyat_${index}`} className="block font-semibold">Otel DBL Birim Fiyat</label>
            <input
              type="number"
              id={`otel_DBL_birim_fiyat_${index}`}
              name="otel_DBL_birim_fiyat"
              value={item.otel_DBL_birim_fiyat}
              onChange={(e) => handleInputChange(e, index, 'oteller')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label htmlFor={`otel_DBL_oda_sayisi_${index}`} className="block font-semibold">Otel DBL Oda Sayısı</label>
            <input
              type="number"
              id={`otel_DBL_oda_sayisi_${index}`}
              name="otel_DBL_oda_sayisi"
              value={item.otel_DBL_oda_sayisi}
              onChange={(e) => handleInputChange(e, index, 'oteller')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block font-semibold">Otel DBL Toplam Fiyat</label>
            <div className="w-full p-2 border rounded bg-gray-50">
              {item.otel_DBL_birim_fiyat * item.otel_DBL_oda_sayisi}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div>
            <label htmlFor={`otel_TRP_birim_fiyat_${index}`} className="block font-semibold">Otel TRP Birim Fiyat</label>
            <input
              type="number"
              id={`otel_TRP_birim_fiyat_${index}`}
              name="otel_TRP_birim_fiyat"
              value={item.otel_TRP_birim_fiyat}
              onChange={(e) => handleInputChange(e, index, 'oteller')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label htmlFor={`otel_TRP_oda_sayisi_${index}`} className="block font-semibold">Otel TRP Oda Sayısı</label>
            <input
              type="number"
              id={`otel_TRP_oda_sayisi_${index}`}
              name="otel_TRP_oda_sayisi"
              value={item.otel_TRP_oda_sayisi}
              onChange={(e) => handleInputChange(e, index, 'oteller')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block font-semibold">Otel TRP Toplam Fiyat</label>
            <div className="w-full p-2 border rounded bg-gray-50">
              {item.otel_TRP_birim_fiyat * item.otel_TRP_oda_sayisi}
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Otel Toplam Fiyat</label>
          <div className="w-full p-2 border rounded bg-gray-50">
            {item.otel_toplam_fiyat}
          </div>
        </div>
      </div>
    ));
  };

  const renderOgretmenDigerFieldGroup = () => {
    return formData.ogretmenler.diger.map((item, subIndex) => (
      <div key={subIndex} className="mb-2 p-2 border rounded">
        <div className="mb-2">
          <label htmlFor={`ogretmen_diger-${subIndex}-maliyet_adi`} className="block font-semibold">Maliyet Adı</label>
          <input
            type="text"
            id={`ogretmen_diger-${subIndex}-maliyet_adi`}
            name="maliyet_adi"
            value={item.maliyet_adi}
            onChange={(e) => handleInputChange(e, null, 'ogretmen_diger', subIndex)}
            className="w-full p-2 border rounded bg-white"
            readOnly
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`ogretmen_diger-${subIndex}-maliyet`} className="block font-semibold">Maliyet</label>
          <input
            type="number"
            id={`ogretmen_diger-${subIndex}-maliyet`}
            name="maliyet"
            value={item.maliyet}
            onChange={(e) => handleInputChange(e, null, 'ogretmen_diger', subIndex)}
            className="w-full p-2 border rounded bg-white"
            readOnly
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`ogretmen_diger-${subIndex}-para_birimi`} className="block font-semibold">Para Birimi</label>
          <select
            id={`ogretmen_diger-${subIndex}-para_birimi`}
            name="para_birimi"
            value={item.para_birimi}
            onChange={(e) => handleInputChange(e, null, 'ogretmen_diger', subIndex)}
            className="w-full p-2 border rounded bg-white"
            disabled
          >
            <option value="TRY">TRY</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CHF">CHF</option>
          </select>
        </div>
      </div>
    ));
  };

  const calculateOtelToplamFiyat = () => {
    return formData.oteller.reduce((acc, item) => acc + parseFloat(item.otel_toplam_fiyat || 0), 0);
  };

  return (
    <div className="editable-form-container bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Form Düzenleme</h1>
      <div className="mb-2">
        <label htmlFor="degisiklikler" className="block font-semibold">Değişiklikler</label>
        <div className="w-full p-2 rounded bg-white">
          {renderChanges()}
        </div>
      </div>
      <Toaster />

      {/* Döviz Kurları */}
      <div className="overflow-x-auto whitespace-nowrap mb-4">
        <div className="flex space-x-4">
          {Object.keys(currencyRates).map((currency, index) => (
            <div key={index} className="p-2 bg-gray-200 rounded shadow-md min-w-max">
              {currency}: {currencyRates[currency]}
            </div>
          ))}
        </div>
      </div>

      {/* Read-only Fields */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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
          className="w-full p-2 border rounded bg-white"
          readOnly
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
            className="w-full p-2 border rounded bg-white"
            readOnly
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="donus_tarihi" className="block font-semibold">Dönüş Tarihi</label>
          <input
            type="date"
            id="donus_tarihi"
            name="donus_tarihi"
            value={moment(formData.donus_tarihi).format('YYYY-MM-DD')}
            className="w-full p-2 border rounded bg-white"
            readOnly
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
            className="w-full p-2 border rounded bg-white"
            readOnly
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="ogretmen_sayisi" className="block font-semibold">Öğretmen Sayısı</label>
          <input
            type="number"
            id="ogretmen_sayisi"
            name="ogretmen_sayisi"
            value={formData.ogretmen_sayisi}
            className="w-full p-2 border rounded bg-white"
            readOnly
          />
        </div>
      </div>

      {/* Birim Fiyat ve Para Birimi */}
      <div className="flex space-x-4 mb-4">
        <div className="w-1/2">
          <label htmlFor="birim_fiyat" className="block font-semibold">Birim Fiyat</label>
          <input
            type="number"
            id="birim_fiyat"
            name="birim_fiyat"
            value={formData.birim_fiyat}
            className="w-full p-2 border rounded bg-white"
            readOnly
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="para_birimi" className="block font-semibold">Para Birimi</label>
          <select
            id="para_birimi"
            name="para_birimi"
            value={formData.para_birimi}
            className="w-full p-2 border rounded bg-white"
            disabled
          >
            <option value="TRY">TRY</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CHF">CHF</option>
          </select>
        </div>
      </div>

      {/* Ulaşım Araçları */}
      <h2 className="text-xl font-semibold mt-4 mb-2">Ulaşım Araçları</h2>
      {renderFieldGroup('ulasim_araclari', [
        {
          label: 'Ulaşım Aracı',
          name: 'ulasim_araci_ismi',
          type: 'select',
          options: [
            { label: 'Uçak', value: 'ucak' },
            { label: 'Otobüs', value: 'otobus' },
          ]
        },
        { label: 'Araç Kişi Sayısı', name: 'arac_kisi_sayisi', type: 'number' },
        { label: 'Birim Fiyat', name: 'ulasim_araci_birim_fiyat', type: 'number' },
        { label: 'Toplam Fiyat', name: 'ulasim_araci_toplam_fiyat', type: 'number' },
        {
          label: 'Para Birimi',
          name: 'para_birimi',
          type: 'select',
          options: [
            { label: 'TRY', value: 'TRY' },
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
            { label: 'CHF', value: 'CHF' }
          ]
        }
      ])}
      <div className="mb-2">
        <label htmlFor="ulasim_araclari_toplam_fiyati" className="block font-semibold">Ulaşım Araçları Toplam Fiyatı</label>
        <div className="w-full p-2 border rounded bg-white">
          {formData.ulasim_araclari_toplam_fiyati}
        </div>
      </div>

      {/* Oteller */}
      <h2 className="text-xl font-semibold mt-4 mb-2">Oteller</h2>
      {renderOtelGroup()}
      <div className="mb-4">
        <label className="block font-semibold">Oteller Toplam Fiyatı</label>
        <div className="w-full p-2 border rounded bg-white">
          {calculateOtelToplamFiyat()}
        </div>
      </div>

      {/* Rehberler */}
      <h2 className="text-xl font-semibold mt-4 mb-2">Rehberler</h2>
      {formData.rehberler.map((rehber, index) => (
        <div key={index} className="mb-4 p-4 border rounded bg-white shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div className="w-1/3">
              <label htmlFor={`rehber_ismi_${index}`} className="block font-semibold">Rehber İsmi</label>
              <input
                type="text"
                id={`rehber_ismi_${index}`}
                name="rehber_ismi"
                value={rehber.rehber_ismi}
                onChange={(e) => handleInputChange(e, index, 'rehberler')}
                className="w-full p-2 border rounded bg-gray-50"
                readOnly
              />
            </div>
            <div className="w-1/3">
              <label htmlFor={`rehber_maliyet_${index}`} className="block font-semibold">Maliyet</label>
              <input
                type="number"
                id={`rehber_maliyet_${index}`}
                name="rehber_maliyet"
                value={rehber.rehber_maliyet}
                onChange={(e) => handleInputChange(e, index, 'rehberler')}
                className="w-full p-2 border rounded bg-gray-50"
                readOnly
              />
            </div>
            <div className="w-1/3">
              <label htmlFor={`rehber_para_birimi_${index}`} className="block font-semibold">Para Birimi</label>
              <select
                id={`rehber_para_birimi_${index}`}
                name="para_birimi"
                value={rehber.para_birimi}
                onChange={(e) => handleInputChange(e, index, 'rehberler')}
                className="w-full p-2 border rounded bg-gray-50"
                disabled
              >
                <option value="TRY">TRY</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CHF">CHF</option>
              </select>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Rehberler Ek Harcamalar</h3>
          {rehber.diger.map((digerItem, subIndex) => (
            <div key={subIndex} className="flex justify-between items-center mb-4">
              <div className="w-1/3">
                <label htmlFor={`maliyet_adi_${index}_${subIndex}`} className="block font-semibold">Maliyet Adı</label>
                <input
                  type="text"
                  id={`maliyet_adi_${index}_${subIndex}`}
                  name="maliyet_adi"
                  value={digerItem.maliyet_adi}
                  onChange={(e) => handleInputChange(e, index, 'rehber_diger', subIndex)}
                  className="w-full p-2 border rounded bg-gray-50"
                  readOnly
                />
              </div>
              <div className="w-1/3">
                <label htmlFor={`maliyet_${index}_${subIndex}`} className="block font-semibold">Maliyet</label>
                <input
                  type="number"
                  id={`maliyet_${index}_${subIndex}`}
                  name="maliyet"
                  value={digerItem.maliyet}
                  onChange={(e) => handleInputChange(e, index, 'rehber_diger', subIndex)}
                  className="w-full p-2 border rounded bg-gray-50"
                  readOnly
                />
              </div>
              <div className="w-1/3">
                <label htmlFor={`rehber_para_birimi_${index}_${subIndex}`} className="block font-semibold">Para Birimi</label>
                <select
                  id={`rehber_para_birimi_${index}_${subIndex}`}
                  name="para_birimi"
                  value={digerItem.para_birimi}
                  onChange={(e) => handleInputChange(e, index, 'rehber_diger', subIndex)}
                  className="w-full p-2 border rounded bg-gray-50"
                  disabled
                >
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CHF">CHF</option>
                </select>
              </div>
            </div>
          ))}
          <div className="mb-2">
            <label htmlFor="rehberler_toplam_fiyati" className="block font-semibold">Rehberler Toplam Fiyatı</label>
            <div className="w-full p-2 border rounded bg-white">
              {formData.rehberler_toplam_fiyati}
            </div>
          </div>
        </div>
      ))}

      {/* Öğretmenler */}
      <h2 className="text-xl font-semibold mb-2">Öğretmenler</h2>
      <div className="mb-4 p-2 border rounded">
        <div className="mb-2">
          <label htmlFor="ogretmenler-pp" className="block font-semibold">Kişi Başı Maliyet</label>
          <input
            type="number"
            id="ogretmenler-pp"
            name="pp"
            value={formData.ogretmenler.pp}
            onChange={(e) => handleInputChange(e, null, 'ogretmenler')}
            className="w-full p-2 border rounded bg-white"
            readOnly
          />
        </div>
        <div className="mb-2">
          <label htmlFor="ogretmenler-yd_harc" className="block font-semibold">YD Harç</label>
          <input
            type="number"
            id="ogretmenler-yd_harc"
            name="yd_harc"
            value={formData.ogretmenler.yd_harc}
            onChange={(e) => handleInputChange(e, null, 'ogretmenler')}
            className="w-full p-2 border rounded bg-white"
            readOnly
          />
        </div>
        <div className="mb-2">
          <label htmlFor="ogretmenler-para_birimi" className="block font-semibold">Para Birimi</label>
          <select
            id="ogretmenler-para_birimi"
            name="para_birimi"
            value={formData.ogretmenler.para_birimi}
            onChange={(e) => handleInputChange(e, null, 'ogretmenler')}
            className="w-full p-2 border rounded bg-white"
            disabled
          >
            <option value="TRY">TRY</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CHF">CHF</option>
          </select>
        </div>
        <h3 className="text-lg font-semibold mb-2">Öğretmenler Ek Harcamalar</h3>
        {renderOgretmenDigerFieldGroup()}
        <div className="mb-2">
          <label htmlFor="ogretmenler_toplam_fiyati" className="block font-semibold">Öğretmenler Toplam Fiyatı</label>
          <div className="w-full p-2 border rounded bg-white">
            {formData.ogretmenler_toplam_fiyati}
          </div>
        </div>
      </div>

      {/* Giriş Yapılan Yerler */}
      <h2 className="text-xl font-semibold mt-4 mb-2">Giriş Yapılan Yerler</h2>
      {renderFieldGroup('giris_yapilan_yerler', [
        { label: 'Giriş Yapılan Yer', name: 'giris_yapilan_yer', type: 'text' },
        { label: 'PP', name: 'pp', type: 'number' },
        { label: 'Kişi Sayısı', name: 'kisi_sayisi', type: 'number' },
        {
          label: 'Para Birimi',
          name: 'para_birimi',
          type: 'select',
          options: [
            { label: 'TRY', value: 'TRY' },
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
            { label: 'CHF', value: 'CHF' }
          ]
        }
      ])}
      <div className="mb-2">
        <label htmlFor="giris_yapilan_yerler_toplam_fiyati" className="block font-semibold">Giriş Yapılan Yerler Toplam Fiyatı</label>
        <div className="w-full p-2 border rounded bg-white">
          {formData.giris_yapilan_yerler_toplam_fiyati}
        </div>
      </div>

      {/* Diğer */}
      <h2 className="text-xl font-semibold mt-4 mb-2">Diğer</h2>
      {renderFieldGroup('diger', [
        { label: 'Açıklama', name: 'ad', type: 'text' },
        { label: 'Adet', name: 'miktar', type: 'number' },
        { label: 'Birim Fiyat', name: 'fiyat', type: 'number' },
        {
          label: 'Para Birimi',
          name: 'para_birimi',
          type: 'select',
          options: [
            { label: 'TRY', value: 'TRY' },
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
            { label: 'CHF', value: 'CHF' }
          ]
        }
      ])}

      {/* Toplam Fiyat */}
      <div className="mb-2">
        <label htmlFor="toplam_fiyat" className="block font-semibold">Beklenen Kar</label>
        <input
          type="number"
          id="toplam_fiyat"
          name="toplam_fiyat"
          value={formData.toplam_fiyat}
          className="w-full p-2 border rounded bg-white"
          readOnly
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
    </div>
  );
}

export default MuhasebePage;
