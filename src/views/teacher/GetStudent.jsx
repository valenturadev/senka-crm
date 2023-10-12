import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { successMessage } from '../../utils/toast';

function StudentDetail() {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [file, setFile] = useState(null); // Yüklenen dosya için state
  const [fileUploaded, setFileUploaded] = useState(false); // Dosya yüklendi mi kontrolü
  const [error, setError] = useState(null); // Hata durumu
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);
  const { studentId } = useParams();


  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://dev.senkaturizm.com/api/teacher/get-ogrenci/id=${studentId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        setStudent(response.data.data);
      })
      .catch((error) => {
        setError('API çağrısı sırasında hata oluştu');
        console.error('API çağrısı sırasında hata oluştu:', error);
      });
  }, []);

  const renderBoolean = (value) => {
    return value ? '✓' : '✗';
  };

  const handleEditClick = (field) => {
    if (field === 'ogrenci_adi' || field === 'ogrenci_soyadi' || field === 'ogrenci_email' || field === 'ogrenci_phone' || field === 'ogrenci_dogum_tarihi' || field === 'ogrenci_tc' || field === 'ogrenci_cinsiyet_erkek' || field === 'ogrenci_sinif' || field === 'veli_phone') {
      setIsEditing(true);
    }
  };

  const handleFieldChange = (field, value) => {
    if (field === 'ogrenci_adi' || field === 'ogrenci_soyadi' || field === 'ogrenci_email' || field === 'ogrenci_phone' || field === 'ogrenci_dogum_tarihi' || field === 'ogrenci_tc' || field === 'ogrenci_cinsiyet_erkek' || field === 'ogrenci_sinif' || field === 'veli_phone') {
      setEditedFields((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };

  const handleSaveClick = () => {
    const updatedFields = { ...student, ...editedFields };

    axios({
      method: 'PATCH',
      url: `https://dev.senkaturizm.com/api/teacher/update-ogrenci/id=${studentId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: updatedFields
    })
      .then((response) => {
        setIsEditing(false);
        setEditedFields({});
        successMessage("Veriler başarıyla güncellendi.")
        // window.location.reload();
      })
      .catch((error) => {
        setError('Bilgileri güncelleme sırasında hata oluştu');
        console.error('Bilgileri güncelleme sırasında hata oluştu:', error);
      });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileUploaded(false);
  };

  const handleUploadClick = () => {
    if (file) {
      const formData = new FormData();
      formData.append('makbuz', file);

      axios({
        method: 'POST',
        url: `https://dev.senkaturizm.com/api/teacher/add-makbuz-for-ogrenci/id=${studentId}`,
        headers: {
          "Authorization": `Bearer ${myUser?.access}`
        },
        data: formData
      })
        .then((response) => {
          successMessage("Makbuz başarıyla gönderildi.")
          setFileUploaded(true);
        })
        .catch((error) => {
          setError('Fotoğraf yükleme sırasında hata oluştu');
          console.error('Fotoğraf yükleme sırasında hata oluştu:', error);
        });
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">Öğrenci Detay Sayfası</h1>
      <div className="border rounded p-4">
        {Object.keys(student).map((field) => (
          <div key={field} className="mb-2 flex">
            <span className="font-semibold w-40">{field}:</span>
            {field === 'ogrenci_adi' || field === 'ogrenci_soyadi' || field === 'ogrenci_email' || field === 'ogrenci_phone' || field === 'ogrenci_dogum_tarihi' || field === 'ogrenci_tc' || field === 'ogrenci_cinsiyet_erkek' || field === 'ogrenci_sinif' || field === 'veli_phone' ? (
              isEditing ? (
                field === 'ogrenci_cinsiyet_erkek' ?
                  <div>{student['ogrenci_cinsiyet_erkek'] ? "Erkek" : "Kız"}</div> :
                  <input
                    type="text"
                    value={editedFields[field] || student[field]}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    className="border rounded px-2 py-1 flex-grow"
                  />
              ) : (
                <span className="px-2 py-1 flex-grow">
                  {field.startsWith('is_') ? renderBoolean(student[field]) : student[field]}
                </span>
              )
            ) : (
              <span className="px-2 py-1 flex-grow">
                {field.startsWith('is_') ? renderBoolean(student[field]) : student[field]}
              </span>
            )}
            {!isEditing && (
              field === 'ogrenci_adi' || field === 'ogrenci_soyadi' || field === 'ogrenci_email' || field === 'ogrenci_phone' || field === 'ogrenci_dogum_tarihi' || field === 'ogrenci_tc' || field === 'ogrenci_sinif' || field === 'veli_phone' ? (
                <button
                  className="ml-2 text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditClick(field)}
                >
                  Düzenle
                </button>
              ) : (
                <span></span>
              )
            )}
          </div>
        ))}
        {isEditing && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
            onClick={handleSaveClick}
          >
            Kaydet
          </button>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Makbuz Yükle</h2>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded"
          onClick={handleUploadClick}
        >
          Gönder
        </button>
        {fileUploaded && <p>Dosya başarıyla yüklendi.</p>}
      </div>
    </div>
  );
}

export default StudentDetail;
