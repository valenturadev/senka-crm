import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function GeziDetay() {
  const [geziVerisi, setGeziVerisi] = useState(null);
  const { formId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGeziVerisi = async () => {
      try {
        const localUser = localStorage.getItem("user");
        const myUser = JSON.parse(localUser);

        const response = await axios({
          method: 'GET',
          url: `https://senka.valentura.com/api/web-team/get-travel/id=${formId}`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
        });

        setGeziVerisi(response.data.data);
      } catch (error) {
        console.error('API çağrısı sırasında hata oluştu:', error);
      }
    };

    fetchGeziVerisi();
  }, [formId]);

  if (!geziVerisi) {
    // Veri henüz yüklenmediyse bir yükleme gösterebilirsiniz.
    return <div>Veri yükleniyor...</div>;
  }

  function handleOgretmenEkle() {
    navigate('/ogretmen-ekle/' + formId);
  }

  function handleButunOgretmenler() {
    navigate('/tum-ogretmenler/' + formId);
  }

  const renderTransferler = (transferler) => {
    if (!transferler) return null;
    const parsedTransferler = JSON.parse(transferler);
    return (
      <ul>
        {parsedTransferler.map((transfer, index) => (
          <li key={index}>
            <strong>Arac:</strong> {transfer.arac}, <strong>Kalkılan Durak:</strong> {transfer.kalkilan_durak}, <strong>Götürülen Durak:</strong> {transfer.goturulen_durak}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Gezi Detayları</h1>
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
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">Gezi talep eden kişinin emaili</td>
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
              <td>{renderTransferler(geziVerisi.mutabakat.transferler)}</td>
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
              <td>{new Date(geziVerisi.mutabakat.created_at).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <button
          onClick={handleOgretmenEkle}
          className="mr-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Öğretmen Ekle
        </button>
        <button
          onClick={handleButunOgretmenler}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Bütün Öğretmenler
        </button>
      </div>
    </div>
  );
}

export default GeziDetay;
