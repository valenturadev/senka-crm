import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MuhasebeSayfasi() {
  const [ogrenciler, setOgrenciler] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

  useEffect(() => {
    setIsLoading(true);

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${myUser?.access}`
    };

    const url = 'https://senka.valentura.com/api/muhasebe/get-all-makbuz';

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    axios
      .get(url, requestOptions)
      .then((response) => {
        setOgrenciler(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Öğrenci verilerini alırken hata oluştu:', error);
        setIsLoading(false);
      });
  }, []);

  const handleOnayClick = (ogrenciId) => {
    const onayUrl = `https://senka.valentura.com/api/muhasebe/approve-makbuz/id=${ogrenciId}`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${myUser?.access}`
    };
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    axios
      .get(onayUrl, requestOptions, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${myUser?.access}`
        }
      })
      .then(() => {
        // Onaylama başarılı olduğunda sayfayı yeniden yükle
        window.location.reload();
      })
      .catch((error) => {
        console.error('Makbuz onaylama işlemi sırasında hata oluştu:', error);
      });
  };

  const handleReddetClick = (ogrenciId) => {
    // Reddetme işlemi buraya eklenebilir, aynı şekilde istek atarak işlem yapabilirsiniz.
  };

  return (
    <div>
      <h1>Muhasebe Sayfası</h1>
      {isLoading ? (
        <div>Veriler yükleniyor...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Gezi Adı</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Öğrenci Adı</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Makbuz</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Onay</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Reddet</th>
            </tr>
          </thead>
          <tbody>
            {ogrenciler.map((ogrenci) => (
              <tr key={ogrenci.id}>
                <td className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">{`${ogrenci.gezi_adi}`}</td>
                <td className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">{`${ogrenci.ogrenci_adi} ${ogrenci.ogrenci_soyadi}`}</td>
                <td className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  <a href={"https://dev.senkaturizm.com" + ogrenci.makbuz} target="_blank" rel="noopener noreferrer">
                    Makbuz Görüntüle
                  </a>
                </td>
                <td>
                  <button className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" onClick={() => handleOnayClick(ogrenci.id)}>Onayla</button>
                </td>
                <td>
                  <button className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" onClick={() => handleReddetClick(ogrenci.id)}>Reddet</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MuhasebeSayfasi;
