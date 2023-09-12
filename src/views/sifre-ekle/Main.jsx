import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Main() {
  const { phoneNumber } = useParams();
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [message, setMessage] = useState('');
  const [teacherExists, setTeacherExists] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [teacherSurname, setTeacherSurname] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherOkul, setTeacherOkul] = useState('');
  const [teacherCampus, setTeacherCampus] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordAgainChange = (e) => {
    setPasswordAgain(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordAgain = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === passwordAgain) {
      setMessage('Şifreler eşleşiyor!');
      const apiUrl = 'https://senka.valentura.com/api/teacher/add-password-teacher/';
      const requestBody = {
        password: password,
        password2: passwordAgain,
      };
      try {
        const response = await fetch(apiUrl + 'phone=' + phoneNumber, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        if (response.ok) {
          setMessage('Şifre başarıyla oluşturuldu');
        } else {
          setMessage('API isteği başarısız oldu');
        }
      } catch (error) {
        setMessage('API isteği sırasında bir hata oluştu: ' + error.message);
      }
    } else {
      setMessage('Şifreler eşleşmiyor. Lütfen aynı şifreyi girin.');
    }
  };

  useEffect(() => {
    // Sayfa yüklendiğinde öğretmenin varlığını sorgulamak için bir API isteği gönderelim
    const apiUrl = 'https://senka.valentura.com/api/teacher/get-teacher/';
    
    fetch(apiUrl + 'phone=' + phoneNumber)
      .then((response) => {
        if (response.ok) {
          setTeacherExists(true);
          response.json().then((data) => {
            setTeacherName(data.data.firstname);
            setTeacherSurname(data.data.lastname);
            setTeacherEmail(data.data.email);
            setTeacherOkul(data.data.school);
            setTeacherCampus(data.data.campus);
          });
        } else {
          setTeacherExists(false);
        }
      })
      .catch((error) => {
        // Hata işleme burada ekleyebilirsiniz
        console.error('Öğretmen sorgusu sırasında hata oluştu: ' + error.message);
      });
  }, [phoneNumber]);

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold">
            Şifre
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3 text-gray-600"
            >
              {showPassword ? 'Gizle' : 'Göster'}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="passwordAgain" className="block text-gray-700 font-bold">
            Şifreyi Tekrar Girin
          </label>
          <div className="relative">
            <input
              type={showPasswordAgain ? 'text' : 'password'}
              id="passwordAgain"
              name="passwordAgain"
              value={passwordAgain}
              onChange={handlePasswordAgainChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <button
              type="button"
              onClick={toggleShowPasswordAgain}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3 text-gray-600"
            >
              {showPasswordAgain ? 'Gizle' : 'Göster'}
            </button>
          </div>
        </div>
        <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${!teacherExists ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!teacherExists}>
          Oluştur
        </button>
        <p className="mt-2 text-red-500">{message}</p>
        <p>Telefon Numarası: {phoneNumber}</p>
        {teacherExists ? <p>Öğretmen mevcut.</p> : <p>Öğretmen mevcut değil.</p>}
        {teacherExists ? <p>Öğretmen adı: {teacherName}</p> : null}
        {teacherExists ? <p>Öğretmen soyadı: {teacherSurname}</p> : null}
        {teacherExists ? <p>Öğretmen email: {teacherEmail}</p> : null}
        {teacherExists ? <p>Öğretmen okul: {teacherOkul}</p> : null}
        {teacherExists ? <p>Öğretmen kampüs: {teacherCampus}</p> : null}
      </form>
    </div>
  );
}

export default Main;