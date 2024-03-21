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
      url: `https://senka.valentura.com/api/web-team/get-travel/id=${formId}`,
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
  }, []);

  if (!geziVerisi) {
    // Veri henüz yüklenmediyse bir yükleme gösterebilirsiniz.
    return <div>Veri yükleniyor...</div>;
  }

  function handleOgretmenEkle() {
    console.log("Öğretmen ekleme butonuna tıklandı");
    navigate('/ogretmen-ekle/' + formId);
  }

  function handleButunOgretmenler() {
    // Öğretmenlerin listesini görüntülemek için bir işlem ekleyebilirsiniz.
    // Örneğin, bir modal pencere veya ayrı bir sayfa açabilirsiniz.
    console.log('Öğretmenler listesi butonuna tıklandı');
    navigate('/tum-ogretmenler/' + formId);
    // Öğretmenlerin listesini görüntülemek için gerekli işlemi burada gerçekleştirin.
  }

  return (
    <div>

      <h1>Gezi Detayları</h1>
      {/* {geziVerisi && (
        <div>
          <button
            onClick={handleOgretmenEkle}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
          >
            Geziye Öğretmen Ekle
          </button>
          <button
            onClick={handleButunOgretmenler}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Gezideki Bütün Öğretmenler
          </button>
        </div>


      )} */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Alan</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Değer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">ID</td>
              <td>{geziVerisi.id}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Aktif Mi</td>
              <td>{geziVerisi.is_active ? 'Evet' : 'Hayır'}</td>
            </tr>

            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Mutabakat</td>
              <td>
                <ul>
                  <li>ID: {geziVerisi.mutabakat.id}</li>
                  <li>Onay Durumu: {geziVerisi.mutabakat.is_approve === null ? 'Beklemede' : (geziVerisi.mutabakat.is_approve ? 'Onaylandı' : 'Reddedildi')}</li>
                  {/* Diğer mutabakat alanlarını ekleyin */}
                </ul>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Okul</td>
              <td>{geziVerisi.mutabakat.okul}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">İsim</td>
              <td>{geziVerisi.mutabakat.isim}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Soyisim</td>
              <td>{geziVerisi.mutabakat.soyisim}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Gezi talep eden kişinin telefonu</td>
              <td>{geziVerisi.mutabakat.tel_no}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Gezii talep eden kişinin emaili</td>
              <td>{geziVerisi.mutabakat.email}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Program Adı</td>
              <td>{geziVerisi.mutabakat.program_adi}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Ülke</td>
              <td>{geziVerisi.mutabakat.ulke}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Şehir</td>
              <td>{geziVerisi.mutabakat.sehir}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Şehir</td>
              <td>{geziVerisi.mutabakat.sehir}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Ulaşım Aracı</td>
              <td>{geziVerisi.mutabakat.ulasim_araci}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Gidiş Tarihi</td>
              <td>{geziVerisi.mutabakat.gidis_tarihi}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Dönüş Tarihi</td>
              <td>{geziVerisi.mutabakat.donus_tarihi}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Gidilecek Şehir</td>
              <td>{geziVerisi.mutabakat.gidilecek_sehir}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Dönülecek Şehir</td>
              <td>{geziVerisi.mutabakat.donulecek_sehir}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Transferler</td>
              <td>{geziVerisi.mutabakat.transferler}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">1. Lokasyon</td>
              <td>{geziVerisi.mutabakat.lokasyon1}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">1. Lokasyon Giriş</td>
              <td>{geziVerisi.mutabakat.lokasyon1_giris}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">1. Lokasyon Çıkış</td>
              <td>{geziVerisi.mutabakat.lokasyon1_cikis}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">2. Lokasyon</td>
              <td>{geziVerisi.mutabakat.lokasyon2}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">2. Lokasyon Giriş</td>
              <td>{geziVerisi.mutabakat.lokasyon2_giris}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">2. Lokasyon Çıkış</td>
              <td>{geziVerisi.mutabakat.lokasyon2_cikis}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">3. Lokasyon</td>
              <td>{geziVerisi.mutabakat.lokasyon3}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">3. Lokasyon Giriş</td>
              <td>{geziVerisi.mutabakat.lokasyon3_giris}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">3. Lokasyon Çıkış</td>
              <td>{geziVerisi.mutabakat.lokasyon3_cikis}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Kazanım ve Beklentiler</td>
              <td>{geziVerisi.mutabakat.kazanim_ve_beklentiler}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Oluşturulma Tarihi</td>
              <td>{geziVerisi.mutabakat.created_at}</td>
            </tr>
            {/* Diğer veri alanlarını buraya ekleyin */}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default GeziDetay;