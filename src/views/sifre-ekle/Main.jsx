import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Main() {
  const { phoneNumber } = useParams();
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [message, setMessage] = useState('');

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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Oluştur
        </button>
        <p className="mt-2 text-red-500">{message}</p>
        <p>Telefon Numarası: {phoneNumber}</p>
      </form>
    </div>
  );
}

export default Main;