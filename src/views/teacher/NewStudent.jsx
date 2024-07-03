import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { errorMessage, successMessage } from '../../utils/toast';

function AddStudent() {
  const [formData, setFormData] = useState({
    ogrenci_adi: '',
    ogrenci_soyadi: '',
    ogrenci_phone: '',
    ogrenci_email: '',
    ogrenci_dogum_tarihi: '',
    ogrenci_tc: '',
    ogrenci_cinsiyet: '',
    ogrenci_sinif: '',
    veli_phone: '',
    ogrenci_phone_country_code: '90',
    veli_phone_country_code: '90'
  });

  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);
  const { geziId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Cinsiyet değişikliği işlemleri
  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setFormData({
      ...formData,
      ogrenci_cinsiyet: gender === "erkek" ? true : false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Telefon numaralarını ülke kodları ile birleştirin ve başındaki "+" işaretini kaldırın
    const dataToSend = {
      ...formData,
      ogrenci_phone: formData.ogrenci_phone_country_code + formData.ogrenci_phone,
      veli_phone: formData.veli_phone_country_code + formData.veli_phone
    };

    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/teacher/add-ogrenci/gezi-id=${geziId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: dataToSend,
    })
      .then((response) => {
        // Başarılı bir şekilde öğrenci oluşturulduğunda yapılacak işlemler
        console.log('Öğrenci başarıyla oluşturuldu', response.data);
        successMessage("Öğrenci başarıyla oluşturuldu");
        window.location.href = "/tum-geziler";
      })
      .catch((error) => {
        errorMessage('Öğrenci oluşturma sırasında hata oluştu');
        console.error('Öğrenci oluşturma sırasında hata oluştu', error);
      });
  };

  return (
    <div>
      <h1>Yeni Öğrenci Oluştur</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="ogrenci_adi" className="block text-gray-700 text-sm font-bold mb-2">
            Öğrenci Adı
          </label>
          <input
            type="text"
            id="ogrenci_adi"
            name="ogrenci_adi"
            value={formData.ogrenci_adi}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ogrenci_soyadi" className="block text-gray-700 text-sm font-bold mb-2">
            Öğrenci Soyadı
          </label>
          <input
            type="text"
            id="ogrenci_soyadi"
            name="ogrenci_soyadi"
            value={formData.ogrenci_soyadi}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ogrenci_phone" className="block text-gray-700 text-sm font-bold mb-2">
            Öğrenci Telefon
          </label>
          <div className="flex">
            <input
              type="text"
              name="ogrenci_phone_country_code"
              value={formData.ogrenci_phone_country_code}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg w-20 mr-2"
            />
            <input
              type="text"
              id="ogrenci_phone"
              name="ogrenci_phone"
              value={formData.ogrenci_phone}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="ogrenci_email" className="block text-gray-700 text-sm font-bold mb-2">
            Öğrenci Email
          </label>
          <input
            type="email"
            id="ogrenci_email"
            name="ogrenci_email"
            value={formData.ogrenci_email}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ogrenci_dogum_tarihi" className="block text-gray-700 text-sm font-bold mb-2">
            Öğrenci Doğum Tarihi
          </label>
          <input
            type="date"
            id="ogrenci_dogum_tarihi"
            name="ogrenci_dogum_tarihi"
            value={formData.ogrenci_dogum_tarihi}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ogrenci_tc" className="block text-gray-700 text-sm font-bold mb-2">
            Öğrenci TC Kimlik Numarası
          </label>
          <input
            type="text"
            id="ogrenci_tc"
            name="ogrenci_tc"
            value={formData.ogrenci_tc}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Öğrenci Cinsiyeti
          </label>
          <div>
            <label className="mr-2">
              <input
                type="radio"
                name="ogrenci_cinsiyet"
                value="erkek"
                checked={formData.ogrenci_cinsiyet === true}
                onChange={handleGenderChange}
              />
              Erkek
            </label>
            <label>
              <input
                type="radio"
                name="ogrenci_cinsiyet"
                value="kiz"
                checked={formData.ogrenci_cinsiyet === false}
                onChange={handleGenderChange}
              />
              Kız
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="ogrenci_sinif" className="block text-gray-700 text-sm font-bold mb-2">
            Öğrenci Sınıfı
          </label>
          <input
            type="text"
            id="ogrenci_sinif"
            name="ogrenci_sinif"
            value={formData.ogrenci_sinif}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="veli_phone" className="block text-gray-700 text-sm font-bold mb-2">
            Veli Telefon Numarası
          </label>
          <div className="flex">
            <input
              type="text"
              name="veli_phone_country_code"
              value={formData.veli_phone_country_code}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg w-20 mr-2"
            />
            <input
              type="text"
              id="veli_phone"
              name="veli_phone"
              value={formData.veli_phone}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg w-full"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        >
          Öğrenci Oluştur
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
