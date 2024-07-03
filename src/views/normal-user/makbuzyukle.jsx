import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { errorMessage, successMessage } from '../../utils/toast';

export default function MakbuzYukle() {
  const { studentId } = useParams(); // Params'dan ID alınıyor
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Lütfen bir dosya seçin');
      return;
    }

    const formData = new FormData();
    formData.append('makbuz', file);

    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/users/add-makbuz-for-ogrenci/id=${studentId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: formData,
    })
      .then((response) => {
        // Başarılı bir şekilde makbuz yüklendiğinde yapılacak işlemler
        console.log('Makbuz başarıyla yüklendi', response.data);
        successMessage("Makbuz başarıyla yüklendi");
        // Başarılı yükleme sonrası gerekli işlemler veya yönlendirme
      })
      .catch((error) => {
        errorMessage('Makbuz yükleme sırasında hata oluştu');
        console.error('Makbuz yükleme sırasında hata oluştu', error);
        setError('Makbuz yükleme sırasında hata oluştu. Lütfen tekrar deneyiniz.');
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Makbuz Yükle</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
            Makbuz Dosyası
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="px-3 py-2 border rounded-lg w-full"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        >
          Makbuz Yükle
        </button>
      </form>
    </div>
  );
}
