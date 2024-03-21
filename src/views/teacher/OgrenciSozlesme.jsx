import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function OgrenciSozlesme() {
  const [studentData, setStudentData] = useState(null);
  const [link, setLink] = useState(null);
  const { studentId } = useParams();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const myUser = JSON.parse(localUser);

    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/teacher/sozlesme-getir/id=${studentId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        setStudentData(response.data.data.ogrenci);
        setLink(response.data.data.link);
      })
      .catch((error) => {
        console.error('API çağrısı sırasında hata oluştu:', error);
      });
  }, [studentId]);

  const copyLinkToClipboard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = link;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    alert('Link kopyalandı: ' + link);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Öğrenci Sözleşmesi</h1>
      {studentData ? (
        <div className="bg-white shadow-md rounded-lg p-6 mx-auto max-w-xl">
          <div className="mb-4">
            <p className="text-gray-700"><strong>Öğrenci Adı Soyadı:</strong> {studentData.ogrenci_adi_soyadi}</p>
            <p className="text-gray-700"><strong>Veli Adı Soyadı:</strong> {studentData.veli_ad_soyad}</p>
            <p className="text-gray-700"><strong>Adres:</strong> {studentData.adres}</p>
            <p className="text-gray-700"><strong>Telefon No:</strong> {studentData.tel_no}</p>
            <p className="text-gray-700"><strong>Email:</strong> {studentData.email}</p>
            <p className="text-gray-700"><strong>Program İsmi:</strong> {studentData.program_ismi}</p>
            <p className="text-gray-700"><strong>Veli TC:</strong> {studentData.veli_tc}</p>
            <p className="text-gray-700"><strong>Oluşturulma Tarihi:</strong> {studentData.created_at}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700"><strong>Öğrenci ID:</strong> {studentData.id}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              Sözleşme Linki:
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {link}
              </a>
              <button onClick={copyLinkToClipboard} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Linki Kopyala
              </button>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center">Yükleniyor...</p>
      )}
    </div>
  );
}