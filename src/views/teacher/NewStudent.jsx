import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddStudent() {
  const [formData, setFormData] = useState({
    ogrenci_adi: '',
    ogrenci_soyadi: '',
    ogrenci_phone: '',
    ogrenci_email: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

   
    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/teacher/add-ogrenci/gezi-id=`+geziId,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: formData,
    })
      .then((response) => {
        // Başarılı bir şekilde öğrenci oluşturulduğunda yapılacak işlemler
        console.log('Öğrenci başarıyla oluşturuldu', response.data);

        // Öğrenci oluşturulduktan sonra belirli bir sayfaya yönlendirebilirsiniz
        // Örneğin, başka bir sayfaya yönlendirme yapabilirsiniz.
      })
      .catch((error) => {
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
          <input
            type="text"
            id="ogrenci_phone"
            name="ogrenci_phone"
            value={formData.ogrenci_phone}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg w-full"
          />
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
