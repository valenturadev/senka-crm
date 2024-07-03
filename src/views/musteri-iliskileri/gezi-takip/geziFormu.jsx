import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function GeziDetay() {
  const [geziVerisi, setGeziVerisi] = useState(null);
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);
  const { formId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/customer-relations/gezi-takip/get-travel/id=${formId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        setGeziVerisi(response.data.data);
      })
      .catch((error) => {
        console.error('API çağrısı sırasında hata oluştu:', error);
      });
  }, [formId]);

  if (!geziVerisi) {
    return <div>Veri yükleniyor...</div>;
  }

  function handleOgretmenEkle() {
    navigate('/ogretmen-ekle/' + formId);
  }

  function handleButunOgretmenler() {
    navigate('/tum-ogretmenler/' + formId);
  }

  function handleOgrenciListesi() {
    navigate('/ogrenci-listesi-müsteri-iliskileri/' + formId);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gezi Detayları</h1>
      <div className="mb-6">
        <button
          onClick={handleOgretmenEkle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Geziye Öğretmen Ekle
        </button>
        <button
          onClick={handleButunOgretmenler}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Gezideki Bütün Öğretmenler
        </button>
        <button
          onClick={handleOgrenciListesi}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Gezideki Bütün Öğrenciler
        </button>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 px-4 py-2">Alan</th>
              <th className="w-2/3 px-4 py-2">Değer</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="border px-4 py-2">ID</td>
              <td className="border px-4 py-2">{geziVerisi.id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Aktif Mi</td>
              <td className="border px-4 py-2">{geziVerisi.is_active ? 'Evet' : 'Hayır'}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Mutabakat</td>
              <td className="border px-4 py-2">
                <ul>
                  <li>ID: {geziVerisi.mutabakat.id}</li>
                  <li>Onay Durumu: {geziVerisi.mutabakat.is_approve === null ? 'Beklemede' : (geziVerisi.mutabakat.is_approve ? 'Onaylandı' : 'Reddedildi')}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Okul</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.okul}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">İsim</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.isim}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Soyisim</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.soyisim}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Gezi talep eden kişinin telefonu</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.tel_no}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Gezi talep eden kişinin emaili</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.email}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Program Adı</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.program_adi}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Ülke</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.ulke}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Şehir</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.sehir}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Ulaşım Aracı</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.ulasim_araci}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Gidiş Tarihi</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.gidis_tarihi}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Dönüş Tarihi</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.donus_tarihi}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Gidilecek Şehir</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.gidilecek_sehir}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Dönülecek Şehir</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.donulecek_sehir}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Transferler</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.transferler}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">1. Lokasyon</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.lokasyon1}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">1. Lokasyon Giriş</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.lokasyon1_giris}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">1. Lokasyon Çıkış</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.lokasyon1_cikis}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2. Lokasyon</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.lokasyon2}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2. Lokasyon Giriş</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.lokasyon2_giris}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2. Lokasyon Çıkış</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.lokasyon2_cikis}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3. Lokasyon</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.lokasyon3}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3. Lokasyon Giriş</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.lokasyon3_giris}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3. Lokasyon Çıkış</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.lokasyon3_cikis}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Kazanım ve Beklentiler</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.kazanim_ve_beklentiler}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Oluşturulma Tarihi</td>
              <td className="border px-4 py-2">{geziVerisi.mutabakat.created_at}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GeziDetay;
