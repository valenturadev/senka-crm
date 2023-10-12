import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ogretmenEkle() {
  const [ogretmenBilgileri, setOgretmenBilgileri] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    school: "",
    campus: "",
    title: "",
  });
  const { geziId } = useParams();
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);
  const [responseMsg, setResponseMsg] = useState('');
  const [inputErrors, setInputErrors] = useState({
    firstname: false,
    lastname: false,
    phone: false,
    email: false,
    school: false,
    campus: false,
    title: false,
  });

  const handleOgretmenEkle = () => {
    const phonePattern = /^90[0-9]{10}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let hasErrors = false;
    const errors = { ...inputErrors };

    if (!phonePattern.test(ogretmenBilgileri.phone)) {
      errors.phone = true;
      hasErrors = true;
    } else {
      errors.phone = false;
    }

    if (!emailPattern.test(ogretmenBilgileri.email)) {
      errors.email = true;
      hasErrors = true;
    } else {
      errors.email = false;
    }

    // Eğer hata varsa işlemi durdurun
    if (hasErrors) {
      setInputErrors(errors);
      return;
    }
    axios({
      method: 'POST',
      url: `https://dev.senkaturizm.com/api/customer-relations/gezi-takip/add-ogretmen/gezi-id=${geziId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: JSON.stringify(ogretmenBilgileri)
    })
      .then((response) => {
        console.log(response);
        setResponseMsg(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Gezi ID'sini component state'e kaydet
    setOgretmenBilgileri({
      ...ogretmenBilgileri,
      geziId,
    });
  }, [geziId]);

  const copyLink = () => {
    // Linki kopyala işlemi
    const el = document.createElement('textarea');
    el.value = responseMsg;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Öğretmen Ekle</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="İsim"
            className={`mt-1 p-2 w-full rounded-md border ${inputErrors.firstname ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring ${inputErrors.firstname ? 'ring-red-500' : 'ring-blue-200'
              }`}
            value={ogretmenBilgileri.firstname}
            onChange={(e) =>
              setOgretmenBilgileri({ ...ogretmenBilgileri, firstname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Soyisim"
            className={`mt-1 p-2 w-full rounded-md border ${inputErrors.firstname ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring ${inputErrors.firstname ? 'ring-red-500' : 'ring-blue-200'
              }`}
            value={ogretmenBilgileri.lastname}
            onChange={(e) =>
              setOgretmenBilgileri({ ...ogretmenBilgileri, lastname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Telefon (90 Başta olacak şekilde)"
            className={`mt-1 p-2 w-full rounded-md border ${inputErrors.firstname ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring ${inputErrors.firstname ? 'ring-red-500' : 'ring-blue-200'
              }`}
            value={ogretmenBilgileri.phone}
            onChange={(e) =>
              setOgretmenBilgileri({ ...ogretmenBilgileri, phone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="E-posta"
            className={`mt-1 p-2 w-full rounded-md border ${inputErrors.firstname ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring ${inputErrors.firstname ? 'ring-red-500' : 'ring-blue-200'
              }`}
            value={ogretmenBilgileri.email}
            onChange={(e) =>
              setOgretmenBilgileri({ ...ogretmenBilgileri, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Okul"
            className={`mt-1 p-2 w-full rounded-md border ${inputErrors.firstname ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring ${inputErrors.firstname ? 'ring-red-500' : 'ring-blue-200'
              }`}
            value={ogretmenBilgileri.school}
            onChange={(e) =>
              setOgretmenBilgileri({ ...ogretmenBilgileri, school: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Kampüs"
            className={`mt-1 p-2 w-full rounded-md border ${inputErrors.firstname ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring ${inputErrors.firstname ? 'ring-red-500' : 'ring-blue-200'
              }`}
            value={ogretmenBilgileri.campus}
            onChange={(e) =>
              setOgretmenBilgileri({ ...ogretmenBilgileri, campus: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Unvan"
            className={`mt-1 p-2 w-full rounded-md border ${inputErrors.firstname ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring ${inputErrors.firstname ? 'ring-red-500' : 'ring-blue-200'
              }`}
            value={ogretmenBilgileri.title}
            onChange={(e) =>
              setOgretmenBilgileri({ ...ogretmenBilgileri, title: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          onClick={handleOgretmenEkle}
        >
          Öğretmen Ekle
        </button>
        {responseMsg && (
          <div className="mt-4">
            <p>{responseMsg}</p>
            <button
              onClick={copyLink}
              className="mt-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
            >
              Linki Kopyala
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ogretmenEkle;