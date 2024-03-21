import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function OgrenciIade() {
  const [ogrenciAdiSoyadi, setOgrenciAdiSoyadi] = useState('');
  const [ogrenciOkul, setOgrenciOkul] = useState('');
  const [ogrenciKampus, setOgrenciKampus] = useState('');
  const [programAdi, setProgramAdi] = useState('');
  const [odeyenKisiAdSoyad, setOdeyenKisiAdSoyad] = useState('');
  const [odemeTarihi, setOdemeTarihi] = useState('');
  const [odemeMiktari, setOdemeMiktari] = useState('');
  const [odemeYapilanHesapNoKrediKartiNo, setOdemeYapilanHesapNoKrediKartiNo] = useState('');
  const [iadeSebebi, setIadeSebebi] = useState('');
  const [havaleYapilacakAdSoyad, setHavaleYapilacakAdSoyad] = useState('');
  const [havaleYapilacakTel, setHavaleYapilacakTel] = useState('');
  const [bankaAdi, setBankaAdi] = useState('');
  const [krediKartiNo, setKrediKartiNo] = useState('');
  const [iban, setIban] = useState('');
  const [iadeEdilmesiIstenenTutar, setIadeEdilmesiIstenenTutar] = useState('');
  const [iadeIsteyenKisiAdiSoyadi, setIadeIsteyenKisiAdiSoyadi] = useState('');
  const [tarih, setTarih] = useState('');
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const myUser = JSON.parse(localUser);

    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/users/get-ogrenci-iade/id=${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        const data = response.data.data;
        setOgrenciAdiSoyadi(data.ogrenci_adi_soyadi);
        setOgrenciOkul(data.ogrenci_okul);
        setOgrenciKampus(data.ogrenci_kampus);
        setProgramAdi(data.program_adi);
        setOdeyenKisiAdSoyad(data.odeyen_kisi_ad_soyad);
        setOdemeTarihi(data.odeme_tarihi);
        setOdemeMiktari(data.odeme_miktari);
        setOdemeYapilanHesapNoKrediKartiNo(data.odeme_yapilan_hesap_no_veya_kredi_karti_no);
        setIadeSebebi(data.iade_sebebi);
        setHavaleYapilacakAdSoyad(data.havale_yapilacak_ad_soyad);
        setHavaleYapilacakTel(data.havale_yapilacak_tel);
        setBankaAdi(data.banka_adi);
        setKrediKartiNo(data.kredi_karti_no);
        setIban(data.iban);
        setIadeEdilmesiIstenenTutar(data.iade_edilmesi_istenen_tutar);
        setIadeIsteyenKisiAdiSoyadi(data.iade_isteyen_kisi_adi_soyadi);
        setTarih(data.tarih);
      })
      .catch((error) => {
        setError('API çağrısı sırasında hata oluştu');
        console.error('API çağrısı sırasında hata oluştu:', error);
      });
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // POST isteği göndererek verileri güncelleme işlemi yapabilirsiniz.
    const localUser = localStorage.getItem("user");
    const myUser = JSON.parse(localUser);

    const requestData = {
      odeme_tarihi: odemeTarihi,
      odeme_miktari: odemeMiktari,
      odeme_yapilan_hesap_no_veya_kredi_karti_no: odemeYapilanHesapNoKrediKartiNo,
      iade_sebebi: iadeSebebi,
      havale_yapilacak_ad_soyad: havaleYapilacakAdSoyad,
      havale_yapilacak_tel: havaleYapilacakTel,
      banka_adi: bankaAdi,
      kredi_karti_no: krediKartiNo,
      iban: iban,
      iade_edilmesi_istenen_tutar: iadeEdilmesiIstenenTutar,
      iade_isteyen_kisi_adi_soyadi: iadeIsteyenKisiAdiSoyadi,
      tarih: tarih
    };

    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/users/ogrenci-iade/id=${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: requestData
    })
      .then((response) => {
        setIsEditing(false);
        // Başarı mesajını görüntüleme işlemi burada yapılabilir.
      })
      .catch((error) => {
        setError('Veriler güncellenirken hata oluştu');
        console.error('Veriler güncellenirken hata oluştu:', error);
      });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Öğrenci İade Formu</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Verileri görüntüleme alanları */}
          <div className="mb-4">
            <p><strong>Öğrenci Adı Soyadı:</strong> {ogrenciAdiSoyadi}</p>
            <p><strong>Okul:</strong> {ogrenciOkul}</p>
            <p><strong>Kampus:</strong> {ogrenciKampus}</p>
            <p><strong>Program Adı:</strong> {programAdi}</p>
            {/* Diğer verileri de buraya ekleyin */}
          </div>

          {isEditing ? (
            // Düzenleme modundayken inputları göster
            <div className="mb-4">
              <input
                type="text"
                value={odemeTarihi}
                onChange={(e) => setOdemeTarihi(e.target.value)}
                placeholder="Ödeme Tarihi"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={odemeMiktari}
                onChange={(e) => setOdemeMiktari(e.target.value)}
                placeholder="Ödeme Miktarı"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={odemeYapilanHesapNoKrediKartiNo}
                onChange={(e) => setOdemeYapilanHesapNoKrediKartiNo(e.target.value)}
                placeholder="Ödeme Yapılan Hesap No veya Kredi Kartı No"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={iadeSebebi}
                onChange={(e) => setIadeSebebi(e.target.value)}
                placeholder="İade sebebi"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={havaleYapilacakAdSoyad}
                onChange={(e) => setHavaleYapilacakAdSoyad(e.target.value)}
                placeholder="Havale Yapılacak Ad Soyad"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={havaleYapilacakTel}
                onChange={(e) => setHavaleYapilacakTel(e.target.value)}
                placeholder="Havale Yapılacak Tel"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={bankaAdi}
                onChange={(e) => setBankaAdi(e.target.value)}
                placeholder="Banka Adı"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={krediKartiNo}
                onChange={(e) => setKrediKartiNo(e.target.value)}
                placeholder="Kredi Kartı No"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                placeholder="IBAN"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={iadeEdilmesiIstenenTutar}
                onChange={(e) => setIadeEdilmesiIstenenTutar(e.target.value)}
                placeholder="İade Edilmesi İstenen Tutar"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={iadeIsteyenKisiAdiSoyadi}
                onChange={(e) => setIadeIsteyenKisiAdiSoyadi(e.target.value)}
                placeholder="İade İsteyen Kişi Adı Soyadı"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={tarih}
                onChange={(e) => setTarih(e.target.value)}
                placeholder="Tarih"
                className="border rounded px-3 py-2 w-full"
              />
              {/* Diğer inputları da buraya ekleyin */}
            </div>
          ) : (
            // Düzenleme modunda değilse düzenleme butonunu göster
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleEditClick}
            >
              Düzenle
            </button>
          )}

          {/* Kaydet ve İptal butonları */}
          {isEditing && (
            <>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={handleSaveClick}
              >
                Kaydet
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 ml-4 rounded"
                onClick={() => setIsEditing(false)}
              >
                İptal
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}