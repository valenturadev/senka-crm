import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import moment from 'moment';
import * as XLSX from 'xlsx';

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
    program_file: null,
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
    degisiklikler: [],
  });

  const [currencyRates, setCurrencyRates] = useState({
    TRY: 1,
    USD: 0,
    EUR: 0,
    GBP: 0,
    CHF: 0
  });

  const [expirationDate, setExpirationDate] = useState(new Date());

  const handleDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

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
  
        const { data: currencyData } = responseData.currency;
        setCurrencyRates({
          TRY: currencyData.TRY,
          USD: currencyData.USD,
          EUR: currencyData.EUR,
          GBP: currencyData.GBP,
          CHF: currencyData.CHF,
        });
  
        setFormData({
          ...responseData,
          ulasim_araclari: safeJsonParse(responseData.ulasim_araclari),
          oteller: safeJsonParse(responseData.oteller),
          rehberler: safeJsonParse(responseData.rehberler)?.map(item => ({
            ...item,
            diger: safeJsonParse(item.diger)
          })) || [],
          ogretmenler: {
            ...safeJsonParse(responseData.ogretmenler),
            diger: safeJsonParse(responseData.ogretmenler?.diger)
          },
          giris_yapilan_yerler: safeJsonParse(responseData.giris_yapilan_yerler),
          diger: safeJsonParse(responseData.diger),
        });
      })
      .catch((error) => {
        toast.error("Veriler alınırken hata oluştu!");
        console.error('Error fetching data:', error);
      });
  }, [formId]);
  

  const safeJsonParse = (jsonString) => {
    try {
      return jsonString ? JSON.parse(jsonString) : [];
    } catch (error) {
      console.error('JSON parse error:', error);
      return [];
    }
  };  
  
  const handleExportToExcel = () => {
    const wb = XLSX.utils.book_new();
  
    // Initialize the worksheet data array
    const wsData = [];
  
    // Kampüs bilgileri
    wsData.push(['Kampüs', 'Öğrenci Sayısı', 'Öğretmen Sayısı', 'Birim Fiyat', 'Toplam Fiyat']);
    wsData.push([
      formData.kampus_adi,
      formData.ogrenci_sayisi,
      formData.ogretmen_sayisi,
      formData.birim_fiyat,
      formData.toplam_fiyat_ogrenci_ogretmen,
    ]);
    wsData.push([]); // Add an empty row for spacing
  
    // Ulaşım Araçları
    wsData.push(['Ulaşım Aracı', 'Kişi Sayısı', 'Birim Fiyat', 'Toplam Fiyat', 'Para Birimi']);
    formData.ulasim_araclari.forEach(item => {
      wsData.push([
        item.ulasim_araci_ismi,
        item.arac_kisi_sayisi,
        item.ulasim_araci_birim_fiyat,
        item.ulasim_araci_toplam_fiyat,
        item.para_birimi,
      ]);
    });
    wsData.push([]); // Add an empty row for spacing
  
    // Oteller
    wsData.push(['Otel Adı', 'Kalınacak Gün Sayısı', 'SNG Birim Fiyat', 'SNG Oda Sayısı', 'DBL Birim Fiyat', 'DBL Oda Sayısı', 'TRP Birim Fiyat', 'TRP Oda Sayısı', 'Toplam Fiyat', 'Para Birimi']);
    formData.oteller.forEach(item => {
      wsData.push([
        item.otel_ismi,
        item.kalinacak_gun_sayisi,
        item.otel_SNG_birim_fiyat,
        item.otel_SNG_oda_sayisi,
        item.otel_DBL_birim_fiyat,
        item.otel_DBL_oda_sayisi,
        item.otel_TRP_birim_fiyat,
        item.otel_TRP_oda_sayisi,
        item.otel_toplam_fiyat,
        item.para_birimi,
      ]);
    });
    wsData.push([]); // Add an empty row for spacing
  
    // Rehberler
    wsData.push(['Rehber İsmi', 'Maliyet', 'Para Birimi', 'Ek Harcama Adı', 'Ek Harcama Maliyeti', 'Ek Harcama Para Birimi']);
    formData.rehberler.forEach(item => {
      wsData.push([
        item.rehber_ismi,
        item.rehber_maliyet,
        item.para_birimi,
      ]);
      item.diger.forEach(digerItem => {
        wsData.push([
          '',
          '',
          '',
          digerItem.maliyet_adi,
          digerItem.maliyet,
          digerItem.para_birimi,
        ]);
      });
    });
    wsData.push([]); // Add an empty row for spacing
  
    // Giriş Yapılan Yerler
    wsData.push(['Giriş Yapılan Yer', 'PP', 'Kişi Sayısı', 'Para Birimi']);
    formData.giris_yapilan_yerler.forEach(item => {
      wsData.push([
        item.giris_yapilan_yer,
        item.pp,
        item.kisi_sayisi,
        item.para_birimi,
      ]);
    });
    wsData.push([]); // Add an empty row for spacing
  
    // Diğer
    wsData.push(['Açıklama', 'Adet', 'Birim Fiyat', 'Para Birimi']);
    formData.diger.forEach(item => {
      wsData.push([
        item.ad,
        item.miktar,
        item.fiyat,
        item.para_birimi,
      ]);
    });
  
    // Create the worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);
  
    // Apply styles (optional)
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + '1';
      if (!ws[address]) continue;
      ws[address].s = {
        font: {
          bold: true,
          color: { rgb: "FFFFFF" },
        },
        fill: {
          fgColor: { rgb: "4F81BD" },
        },
      };
    }
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
  
    // Save the file
    XLSX.writeFile(wb, `form_${formId}.xlsx`);
  };

  const handleAddField = (field, index = null) => {
    const newItem = {};

    switch (field) {
      case 'ulasim_araclari':
        newItem.ulasim_araci_ismi = 'Uçak';
        newItem.arac_kisi_sayisi = 0;
        newItem.ulasim_araci_birim_fiyat = 0;
        newItem.ulasim_araci_toplam_fiyat = 0;
        newItem.para_birimi = 'TRY';
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
        newItem.para_birimi = 'TRY';
        break;
      case 'rehberler':
        newItem.rehber_ismi = '';
        newItem.rehber_maliyet = 0;
        newItem.diger = [];
        newItem.para_birimi = 'TRY';
        break;
      case 'rehber_diger':
        newItem.maliyet_adi = '';
        newItem.maliyet = 0;
        newItem.para_birimi = 'TRY';
        break;
      case 'ogretmen_diger':
        newItem.maliyet_adi = '';
        newItem.maliyet = 0;
        newItem.para_birimi = 'TRY';
        break;
      case 'giris_yapilan_yerler':
        newItem.giris_yapilan_yer = '';
        newItem.pp = 0;
        newItem.para_birimi = 'TRY';
        break;
      case 'diger':
        newItem.ad = '';
        newItem.miktar = 0;
        newItem.fiyat = 0;
        newItem.para_birimi = 'TRY';
        break;
      default:
        return;
    }

    if (field === 'rehber_diger') {
      const updatedRehberler = [...formData.rehberler];
      updatedRehberler[index].diger.push(newItem);
      setFormData(prevState => ({
        ...prevState,
        rehberler: updatedRehberler
      }));
    } else if (field === 'ogretmen_diger') {
      const updatedOgretmenler = { ...formData.ogretmenler };
      updatedOgretmenler.diger.push(newItem);
      setFormData(prevState => ({
        ...prevState,
        ogretmenler: updatedOgretmenler
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [field]: [...prevState[field], newItem]
      }));
    }
  };

  const handleRemoveField = (index, field, subIndex = null) => {
    if (subIndex !== null && field === 'rehber_diger') {
      const updatedRehberler = [...formData.rehberler];
      updatedRehberler[index].diger = updatedRehberler[index].diger.filter((_, i) => i !== subIndex);
      setFormData(prevState => ({
        ...prevState,
        rehberler: updatedRehberler
      }));
    } else if (subIndex !== null && field === 'ogretmen_diger') {
      const updatedOgretmenler = { ...formData.ogretmenler };
      updatedOgretmenler.diger = updatedOgretmenler.diger.filter((_, i) => i !== subIndex);
      setFormData(prevState => ({
        ...prevState,
        ogretmenler: updatedOgretmenler
      }));
    } else {
      const updatedItems = formData[field].filter((_, i) => i !== index);
      setFormData(prevState => ({
        ...prevState,
        [field]: updatedItems
      }));
    }
  };

  const renderChanges = () => {
    // Check if formData.degisiklikler is a string and parse it if necessary
    if (typeof formData.degisiklikler === 'string') {
      try {
        formData.degisiklikler = JSON.parse(formData.degisiklikler);
      } catch (error) {
        console.error('Invalid JSON string:', error);
        return "Geçersiz değişiklik verisi";
      }
    }

    if (!Array.isArray(formData.degisiklikler) || formData.degisiklikler.length === 0) {
      return "Değişiklik yok";
    }

    return formData.degisiklikler.map((change, index) => {
      let oldValue, newValue;
      try {
        oldValue = JSON.parse(change.old_value);
        newValue = JSON.parse(change.new_value);
      } catch (error) {
        oldValue = change.old_value;
        newValue = change.new_value;
      }

      const renderDetails = (data) => {
        if (Array.isArray(data)) {
          return data.map((item, i) => (
            <div key={i} className="mb-1">
              {Object.entries(item).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                </p>
              ))}
            </div>
          ));
        } else if (typeof data === 'object') {
          return Object.entries(data).map(([key, value]) => (
            <p key={key}>
              <strong>{key.replace(/_/g, ' ')}:</strong> {value}
            </p>
          ));
        } else {
          return <p>{data}</p>;
        }
      };

      return (
        <div key={index} className="mb-2 p-2 border rounded bg-gray-100">
          <p><strong>Alan:</strong> {change.field}</p>
          <div>
            <strong>Eski Veri:</strong>
            <div className="ml-4">
              {renderDetails(oldValue)}
            </div>
          </div>
          <div>
            <strong>Yeni Veri:</strong>
            <div className="ml-4">
              {renderDetails(newValue)}
            </div>
          </div>
        </div>
      );
    });
  };


  const handleInputChange = (e, index, field, subIndex = null) => {
    const { name, value } = e.target;
  
    if (field === 'ogretmenler') {
      if (subIndex !== null) {
        const updatedOgretmenler = { ...formData.ogretmenler };
        updatedOgretmenler.diger[subIndex][name] = value;
        setFormData(prevState => ({
          ...prevState,
          ogretmenler: updatedOgretmenler
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          ogretmenler: {
            ...prevState.ogretmenler,
            [name]: value
          }
        }));
      }
      return;
    }
  
    const updatedItems = [...formData[field]];
  
    if (subIndex !== null && field === 'rehber_diger') {
      updatedItems[index].diger[subIndex][name] = value;
    } else if (subIndex !== null && field === 'ogretmen_diger') {
      const updatedOgretmenler = { ...formData.ogretmenler };
      updatedOgretmenler.diger[subIndex][name] = value;
      setFormData(prevState => ({
        ...prevState,
        ogretmenler: updatedOgretmenler
      }));
      return;
    } else if (field === 'rehberler') {
      if (subIndex !== null) {
        updatedItems[index].diger[subIndex][name] = value;
      } else {
        updatedItems[index][name] = value;
      }
    } else {
      updatedItems[index][name] = value;
    }
  
    setFormData(prevState => ({
      ...prevState,
      [field]: updatedItems
    }));
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'program_file') {
      setFormData(prevState => ({
        ...prevState,
        [name]: e.target.files[0]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  
  const handleSave = async () => {
    const calculateCarpan = (paraBirimi) => {
      if (paraBirimi === 'TRY') return 1;
      return 1 / (currencyRates[paraBirimi] || 1);
    };
  
    const addCarpanAndCurrency = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(item => addCarpanAndCurrency(item));
      } else if (typeof obj === 'object' && obj !== null) {
        const paraBirimi = obj.para_birimi || 'TRY';
        const carpan = calculateCarpan(paraBirimi);
        const updatedObj = {
          ...obj,
          carpan,
          para_birimi: paraBirimi,
        };
  
        // Recursively update nested objects
        for (const key in updatedObj) {
          if (updatedObj.hasOwnProperty(key) && typeof updatedObj[key] === 'object') {
            updatedObj[key] = addCarpanAndCurrency(updatedObj[key]);
          }
        }
  
        return updatedObj;
      }
      return obj;
    };
  
    const payload = {
      ...formData,
      ulasim_araclari: JSON.stringify(addCarpanAndCurrency(formData.ulasim_araclari)), // JSON string format
      oteller: JSON.stringify(addCarpanAndCurrency(formData.oteller)), // JSON string format
      rehberler: JSON.stringify(addCarpanAndCurrency(formData.rehberler)), // JSON string format
      giris_yapilan_yerler: JSON.stringify(addCarpanAndCurrency(formData.giris_yapilan_yerler)), // JSON string format
      diger: JSON.stringify(addCarpanAndCurrency(formData.diger)), // JSON string format
      ogretmenler: JSON.stringify(addCarpanAndCurrency(formData.ogretmenler)) // JSON string format
    };
  
    const formDataToSend = new FormData();
    for (const key in payload) {
      formDataToSend.append(key, payload[key]);
    }
  
    if (formData.program_file) {
      formDataToSend.append('program_file', formData.program_file);
    }
  
    console.log('Payload:', payload); // Debug log
  
    try {
      const response = await axios.patch(
        `https://senka.valentura.com/api/operation-team/mutabakat/edit-mutabakat-form/id=${formId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${myUser?.access}`
          }
        }
      );
      console.log('Save Response:', response.data); // Debug log
      if (response.data.error === false) {
        toast.success("Form başarıyla kaydedildi!");
      } else {
        toast.error("Form kaydedilirken hata oluştu!");
      }
    } catch (error) {
      toast.error("Form kaydedilirken hata oluştu!");
      console.error('Save Error:', error); // Debug log
    }
  };
  
  const handleApprove = async () => {
    try {
      await axios.post(
        `https://senka.valentura.com/api/operation-team/mutabakat/approve-mutabakat-form/id=${formId}`,
        { expiration_date: moment(expirationDate).format('YYYY-MM-DD') },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
        }
      );
      toast.success("Form başarıyla onaylandı!");
    } catch (error) {
      toast.error("Form onaylanırken hata oluştu!");
      console.error('Error approving form:', error); // Debug log
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(
        `https://senka.valentura.com/api/operation-team/mutabakat/reject-mutabakat-form/id=${formId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
        }
      );
      toast.success("Form başarıyla reddedildi!");
    } catch (error) {
      toast.error("Form reddedilirken hata oluştu!");
      console.error('Error rejecting form:', error); // Debug log
    }
  };

  const renderFieldGroup = (fieldGroup, fields, isSubField = false, parentIndex = null) => {
    const items = isSubField ? formData.rehberler[parentIndex].diger || [] : formData[fieldGroup];
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
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleRemoveField(index, fieldGroup, isSubField ? parentIndex : null)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Sil
          </button>
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
            >
              <option value="TRY">TRY</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CHF">CHF</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveField(index, 'oteller')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Sil
          </button>
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
            />
          </div>
          <div>
            <label className="block font-semibold">Otel SNG Toplam Fiyat</label>
            <div className="w-full p-2 border rounded bg-gray-50">
              {(item.otel_SNG_birim_fiyat * item.otel_SNG_oda_sayisi * item.kalinacak_gun_sayisi).toFixed(2)}
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
            />
          </div>
          <div>
            <label className="block font-semibold">Otel DBL Toplam Fiyat</label>
            <div className="w-full p-2 border rounded bg-gray-50">
              {(item.otel_DBL_birim_fiyat * item.otel_DBL_oda_sayisi * item.kalinacak_gun_sayisi).toFixed(2)}
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
            />
          </div>
          <div>
            <label className="block font-semibold">Otel TRP Toplam Fiyat</label>
            <div className="w-full p-2 border rounded bg-gray-50">
              {(item.otel_TRP_birim_fiyat * item.otel_TRP_oda_sayisi * item.kalinacak_gun_sayisi).toFixed(2)}
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="oteller_toplam_fiyati" className="block font-semibold">Oteller Birim Fiyatı</label>
          <div className="w-full p-2 border rounded bg-white">
            {(
              (item.otel_SNG_birim_fiyat * item.otel_SNG_oda_sayisi +
              item.otel_DBL_birim_fiyat * item.otel_DBL_oda_sayisi +
              item.otel_TRP_birim_fiyat * item.otel_TRP_oda_sayisi) * item.kalinacak_gun_sayisi
            ).toFixed(2)}
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
            onChange={(e) => handleInputChange(e, null, 'ogretmenler', subIndex)}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`ogretmen_diger-${subIndex}-maliyet`} className="block font-semibold">Maliyet</label>
          <input
            type="number"
            id={`ogretmen_diger-${subIndex}-maliyet`}
            name="maliyet"
            value={item.maliyet}
            onChange={(e) => handleInputChange(e, null, 'ogretmenler', subIndex)}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`ogretmen_diger-${subIndex}-para_birimi`} className="block font-semibold">Para Birimi</label>
          <select
            id={`ogretmen_diger-${subIndex}-para_birimi`}
            name="para_birimi"
            value={item.para_birimi}
            onChange={(e) => handleInputChange(e, null, 'ogretmenler', subIndex)}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="TRY">TRY</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CHF">CHF</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => handleRemoveField(null, 'ogretmen_diger', subIndex)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Sil
        </button>
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
        <label htmlFor="soyisim" className="block font-semibold">Değişiklikler</label>
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
              {currency}: {(1 / currencyRates[currency]).toFixed(4)}
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

      {/* Birim Fiyat */}
      <div className="mb-4">
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
        { label: 'Bilet fiyatı (Uçak)', name: 'ulasim_araci_birim_fiyat', type: 'number' },
        { label: 'Otobüs Fiyat', name: 'ulasim_araci_toplam_fiyat', type: 'number' },
        {
          label: 'Para Birimi',
          name: 'para_birimi',
          type: 'select',
          options: [
            { label: 'TRY', value: 'TRY' },
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
            { label: 'CHF' , value: 'CHF' }
          ]
        }
      ])}
      <div className="mb-2">
        <label htmlFor="ulasim_araclari_toplam_fiyati" className="block font-semibold">Ulaşım Araçları Toplam Fiyatı</label>
        <div className="w-full p-2 border rounded bg-white">
          {formData.ulasim_araclari_toplam_fiyati}
        </div>
      </div>
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
    {formData.oteller_toplam_fiyati}
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
        >
          <option value="TRY">TRY</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="CHF">CHF</option>
        </select>
      </div>
      <button
        type="button"
        onClick={() => handleRemoveField(index, 'rehberler')}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
      >
        Sil
      </button>
    </div>
    <h3 className="text-lg font-semibold mb-2">Rehberler Ek Harcamalar</h3>
    {rehber.diger.map((digerItem, subIndex) => (
      <div key={subIndex} className="flex justify-between items-center mb-4">
        <div className="w-1/2">
          <label htmlFor={`maliyet_adi_${index}_${subIndex}`} className="block font-semibold">Maliyet Adı</label>
          <input
            type="text"
            id={`maliyet_adi_${index}_${subIndex}`}
            name="maliyet_adi"
            value={digerItem.maliyet_adi}
            onChange={(e) => handleInputChange(e, index, 'rehber_diger', subIndex)}
            className="w-full p-2 border rounded bg-gray-50"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor={`maliyet_${index}_${subIndex}`} className="block font-semibold">Maliyet</label>
          <input
            type="number"
            id={`maliyet_${index}_${subIndex}`}
            name="maliyet"
            value={digerItem.maliyet}
            onChange={(e) => handleInputChange(e, index, 'rehber_diger', subIndex)}
            className="w-full p-2 border rounded bg-gray-50"
          />
        </div>
        <button
          type="button"
          onClick={() => handleRemoveField(index, 'rehber_diger', subIndex)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Sil
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => handleAddField('rehber_diger', index)}
      className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
    >
      Ek Harcama Ekle
    </button>
    <div className="mb-2">
      <label htmlFor="rehberler_toplam_fiyati" className="block font-semibold">Rehberler Toplam Fiyatı</label>
      <div className="w-full p-2 border rounded bg-white">
        {rehber.rehber_maliyet + rehber.diger.reduce((acc, diger) => acc + parseFloat(diger.maliyet || 0), 0)}
      </div>
    </div>
  </div>
))}
<button
  type="button"
  onClick={() => handleAddField('rehberler')}
  className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
>
  Rehber Ekle
</button>


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
        <button
          type="button"
          onClick={() => handleAddField('ogretmen_diger')}
          className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Ek Harcama Ekle
        </button>
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
      <button
        type="button"
        onClick={() => handleAddField('diger')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Diğer Ekle
      </button>
      <div className="mb-2">
  <label htmlFor="diger_toplam_fiyat" className="block font-semibold">Diğer Toplam Fiyat</label>
  <div className="w-full p-2 border rounded bg-white">
    {formData.diger.reduce((acc, item) => acc + (parseFloat(item.fiyat) * parseFloat(item.miktar)), 0)}
  </div>
</div>


<div>
      <label htmlFor="expiration_date" className="block font-semibold">Geçerlilik Tarihi</label>
      <input
        type="date"
        id="expiration_date"
        name="expiration_date"
        value={moment(expirationDate).format('YYYY-MM-DD')}
        onChange={handleDateChange}
        className="w-full p-2 border rounded bg-gray-50"
      />
    </div>
    



      <div className="mb-4">
  <label htmlFor="program_file" className="block font-semibold">Program Akışı</label>
  <input
    type="file"
    id="program_file"
    name="program_file"
    onChange={handleChange}
    className="w-full p-2 border rounded bg-white"
  />
</div>




<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
  <div className="mb-4 border-b pb-4">
    <h2 className="text-2xl font-semibold">Hak ediş tablosu</h2>
  </div>

  <div className="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label htmlFor="toplam_fiyat" className="block font-semibold">Beklenen Kar</label>
      <input
        type="number"
        id="toplam_fiyat"
        name="toplam_fiyat"
        value={formData.toplam_fiyat}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-gray-50"
      />
    </div>

    <div>
      <label htmlFor="total_ciro" className="block font-semibold">Toplam Ciro</label>
      <div className="w-full p-2 border rounded bg-gray-50">
        {formData.total_ciro}
      </div>
    </div>

    <div>
      <label htmlFor="total_maliyet" className="block font-semibold">Toplam Maliyet</label>
      <div className="w-full p-2 border rounded bg-gray-50">
        {formData.total_maliyet}
      </div>
    </div>

    <div>
      <label htmlFor="kisi_basi_maliyet" className="block font-semibold">Kişi Başı Maliyet</label>
      <div className="w-full p-2 border rounded bg-gray-50">
        {formData.kisi_basi_maliyet}
      </div>
    </div>

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
           <button onClick={handleExportToExcel}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">Excel'e Aktar</button>
      </div>
    </div>
  );
}

export default EditableFormPage;
