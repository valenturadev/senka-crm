import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AracOlustur = () => {
  const { id } = useParams();
  const [aracTipi, setAracTipi] = useState('');
  const [kapasite, setKapasite] = useState(0);
  const [plaka, setPlaka] = useState('');
  const [model, setModel] = useState('');
  const [marka, setMarka] = useState('');
  const [sofor, setSofor] = useState('');
  const [soforTel, setSoforTel] = useState('');
  const [error, setError] = useState(null);
  const [otobusler, setOtobusler] = useState([]);
  const [oteller, setOteller] = useState([]);
  const [otelIsmi, setOtelIsmi] = useState('');
  const [otelAdres, setOtelAdres] = useState('');
  const [otelTel, setOtelTel] = useState('');
  const [otelEmail, setOtelEmail] = useState('');
  const [otel1KisilikOdalar, setOtel1KisilikOdalar] = useState(0);
  const [otel2KisilikOdalar, setOtel2KisilikOdalar] = useState(0);
  const [otel3KisilikOdalar, setOtel3KisilikOdalar] = useState(0);
  const [otel4KisilikOdalar, setOtel4KisilikOdalar] = useState(0);
  const navigate = useNavigate();
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/operation-team/gezi/get-all-otobus/id=${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
    .then((response) => {
      if (response.data.error === false) {
        setOtobusler(response.data.data);
      } else {
        console.error('API Error:', response.data.errorMsg);
      }
    })
    .catch((error) => {
      setError(error);
    });

    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/operation-team/gezi/get-all-otels/id=${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
    .then((response) => {
      if (response.data.error === false) {
        setOteller(response.data.data);
      } else {
        console.error('API Error:', response.data.errorMsg);
      }
    })
    .catch((error) => {
      setError(error);
    });
  }, [id]);

  const handleAracEkle = () => {
    const yeniArac = {
      id: `arac-${Date.now()}`,
      numara: Date.now(),
      tipi: aracTipi,
      kapasite: kapasite,
      students: Array.from({ length: kapasite }, (_, i) => ({
        id: `placeholder-${i + 1}`,
        numara: i + 1,
        placeholder: true,
      }))
    };

    const requestData = {
      plaka,
      model,
      marka,
      sofor,
      sofor_tel: soforTel,
      otobus_kapasitesi: kapasite,
      type: aracTipi
    };

    if (aracTipi === 'otobus' || aracTipi === 'ucak') {
      axios({
        method: 'POST',
        url: `https://senka.valentura.com/api/operation-team/gezi/add-otobus/id=${id}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${myUser?.access}`
        },
        data: JSON.stringify(requestData)
      })
      .then((response) => {
        if (response.data.error === false) {
          setOtobusler([...otobusler, yeniArac]);
          setPlaka('');
          setModel('');
          setMarka('');
          setSofor('');
          setSoforTel('');
          setKapasite(0);
        } else {
          console.error('API Error:', response.data.errorMsg);
        }
      })
      .catch((error) => {
        setError(error);
      });
    } else {
      setOtobusler([...otobusler, yeniArac]);
    }
  };

  const handleOtelEkle = () => {
    const requestData = {
      otel_ismi: otelIsmi,
      otel_adres: otelAdres,
      otel_tel: otelTel,
      otel_email: otelEmail,
      otel_1_kişilik_odalar: otel1KisilikOdalar,
      otel_2_kişilik_odalar: otel2KisilikOdalar,
      otel_3_kişilik_odalar: otel3KisilikOdalar,
      otel_4_kişilik_odalar: otel4KisilikOdalar
    };

    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/operation-team/gezi/add-otel/id=${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: JSON.stringify(requestData)
    })
    .then((response) => {
      if (response.data.error === false) {
        setOteller([...oteller, requestData]);
        setOtelIsmi('');
        setOtelAdres('');
        setOtelTel('');
        setOtelEmail('');
        setOtel1KisilikOdalar(0);
        setOtel2KisilikOdalar(0);
        setOtel3KisilikOdalar(0);
        setOtel4KisilikOdalar(0);
      } else {
        console.error('API Error:', response.data.errorMsg);
      }
    })
    .catch((error) => {
      setError(error);
    });
  };

  const handleAracClick = (aracId) => {
    navigate(`/ogrenci-listesi/${id}/${aracId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-medium leading-none mt-3">Araç Oluştur</h1>
      <div className="mt-4">
        <label className="block mb-2 text-lg font-semibold">Ulaşım Aracı Seçin:</label>
        <select
          className="border rounded-md p-2 mb-4 w-full"
          value={aracTipi}
          onChange={(e) => setAracTipi(e.target.value)}
        >
          <option value="">Seçiniz</option>
          <option value="otobus">Otobüs</option>
          <option value="ucak">Uçak</option>
        </select>
        {aracTipi && (
          <div className="mb-4">
            {aracTipi === 'otobus' && (
              <>
                <label className="block mb-2 text-lg font-semibold">Plaka:</label>
                <input
                  type="text"
                  className="border rounded-md p-2 mb-4 w-full"
                  value={plaka}
                  onChange={(e) => setPlaka(e.target.value)}
                />
                <label className="block mb-2 text-lg font-semibold">Model:</label>
                <input
                  type="text"
                  className="border rounded-md p-2 mb-4 w-full"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
                <label className="block mb-2 text-lg font-semibold">Marka:</label>
                <input
                  type="text"
                  className="border rounded-md p-2 mb-4 w-full"
                  value={marka}
                  onChange={(e) => setMarka(e.target.value)}
                />
                <label className="block mb-2 text-lg font-semibold">Şoför:</label>
                <input
                  type="text"
                  className="border rounded-md p-2 mb-4 w-full"
                  value={sofor}
                  onChange={(e) => setSofor(e.target.value)}
                />
                <label className="block mb-2 text-lg font-semibold">Şoför Telefon:</label>
                <input
                  type="text"
                  className="border rounded-md p-2 mb-4 w-full"
                  value={soforTel}
                  onChange={(e) => setSoforTel(e.target.value)}
                />
              </>
            )}
            <label className="block mb-2 text-lg font-semibold">Kapasite Girin:</label>
            <input
              type="number"
              className="border rounded-md p-2 w-full"
              value={kapasite}
              onChange={(e) => setKapasite(Number(e.target.value))}
            />
            <button
              className="mt-2 bg-blue-500 text-white p-2 rounded-md"
              onClick={handleAracEkle}
            >
              Ekle
            </button>
          </div>
        )}
      </div>
      {error && <div className="text-red-500">Hata oluştu: {error.message}</div>}
      <h2 className="text-2xl font-medium leading-none mt-8">Mevcut Araçlar</h2>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {otobusler.map((arac) => (
          <div
            key={arac.id}
            className="border p-2 rounded-lg shadow-lg bg-white w-full flex flex-col justify-center items-center text-center cursor-pointer"
            onClick={() => handleAracClick(arac.id)}
          >
            <p className="text-lg font-semibold">{arac.type === 'otobus' ? 'Otobüs' : 'Uçak'}</p>
            <p className="text-gray-700 text-sm">Kapasite: {arac.otobus_kapasitesi}</p>
            <p className="text-gray-700 text-sm">Plaka: {arac.plaka}</p>
            <p className="text-gray-700 text-sm">Model: {arac.model}</p>
            <p className="text-gray-700 text-sm">Marka: {arac.marka}</p>
            <p className="text-gray-700 text-sm">Şoför: {arac.sofor}</p>
            <p className="text-gray-700 text-sm">Şoför Tel: {arac.sofor_tel}</p>
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-medium leading-none mt-8">Otel Oluştur</h1>
      <div className="mt-4">
        <label className="block mb-2 text-lg font-semibold">Otel İsmi:</label>
        <input
          type="text"
          className="border rounded-md p-2 mb-4 w-full"
          value={otelIsmi}
          onChange={(e) => setOtelIsmi(e.target.value)}
        />
        <label className="block mb-2 text-lg font-semibold">Adres:</label>
        <input
          type="text"
          className="border rounded-md p-2 mb-4 w-full"
          value={otelAdres}
          onChange={(e) => setOtelAdres(e.target.value)}
        />
        <label className="block mb-2 text-lg font-semibold">Telefon:</label>
        <input
          type="text"
          className="border rounded-md p-2 mb-4 w-full"
          value={otelTel}
          onChange={(e) => setOtelTel(e.target.value)}
        />
        <label className="block mb-2 text-lg font-semibold">E-posta:</label>
        <input
          type="text"
          className="border rounded-md p-2 mb-4 w-full"
          value={otelEmail}
          onChange={(e) => setOtelEmail(e.target.value)}
        />
        <label className="block mb-2 text-lg font-semibold">1 Kişilik Odalar:</label>
        <input
          type="number"
          className="border rounded-md p-2 mb-4 w-full"
          value={otel1KisilikOdalar}
          onChange={(e) => setOtel1KisilikOdalar(Number(e.target.value))}
        />
        <label className="block mb-2 text-lg font-semibold">2 Kişilik Odalar:</label>
        <input
          type="number"
          className="border rounded-md p-2 mb-4 w-full"
          value={otel2KisilikOdalar}
          onChange={(e) => setOtel2KisilikOdalar(Number(e.target.value))}
        />
        <label className="block mb-2 text-lg font-semibold">3 Kişilik Odalar:</label>
        <input
          type="number"
          className="border rounded-md p-2 mb-4 w-full"
          value={otel3KisilikOdalar}
          onChange={(e) => setOtel3KisilikOdalar(Number(e.target.value))}
        />
        <label className="block mb-2 text-lg font-semibold">4 Kişilik Odalar:</label>
        <input
          type="number"
          className="border rounded-md p-2 mb-4 w-full"
          value={otel4KisilikOdalar}
          onChange={(e) => setOtel4KisilikOdalar(Number(e.target.value))}
        />
        <button
          className="mt-2 bg-blue-500 text-white p-2 rounded-md"
          onClick={handleOtelEkle}
        >
          Ekle
        </button>
      </div>
      <h2 className="text-2xl font-medium leading-none mt-8">Mevcut Oteller</h2>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {oteller.map((otel) => (
          <div
            key={otel.id}
            className="border p-2 rounded-lg shadow-lg bg-white w-full flex flex-col justify-center items-center text-center cursor-pointer"
          >
            <p className="text-lg font-semibold">{otel.otel_ismi}</p>
            <p className="text-gray-700 text-sm">Adres: {otel.otel_adres}</p>
            <p className="text-gray-700 text-sm">Telefon: {otel.otel_tel}</p>
            <p className="text-gray-700 text-sm">E-posta: {otel.otel_email}</p>
            <p className="text-gray-700 text-sm">1 Kişilik Odalar: {otel.otel_1_kişilik_odalar}</p>
            <p className="text-gray-700 text-sm">2 Kişilik Odalar: {otel.otel_2_kişilik_odalar}</p>
            <p className="text-gray-700 text-sm">3 Kişilik Odalar: {otel.otel_3_kişilik_odalar}</p>
            <p className="text-gray-700 text-sm">4 Kişilik Odalar: {otel.otel_4_kişilik_odalar}</p>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500">Hata oluştu: {error.message}</div>}
    </div>
  );
};

export default AracOlustur;
