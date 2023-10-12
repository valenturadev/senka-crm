import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { errorMessage, successMessage } from '../../utils/toast';

function MutabakatForms() {
    const [geziler, setGeziler] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        let localUser = localStorage.getItem("user");
        let myUser = JSON.parse(localUser);
        try {
            const response = await axios({
                method: 'GET',
                url: 'https://dev.senkaturizm.com/api/web-team/get-all-onaylanan-form',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${myUser?.access}`
                }
            })
            setGeziler(response.data.data);
        } catch (error) {
            errorMessage("Geziler getirilemedi!")
        }
    };

    const addToSite = async (formId) => {
        let localUser = localStorage.getItem("user");
        let myUser = JSON.parse(localUser);
        try {
            const response = await axios.get(
                `https://dev.senkaturizm.com/api/web-team/add-to-website-travel/id=${formId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${myUser?.access}`
                    },
                }
            );
            successMessage("Form siteye eklendi!");
        } catch (error) {
            errorMessage("Form siteye eklenirken hata oluştu!")
        }
    };

    return (
        <div>
            <h1 className="text-xl font-semibold mb-8">Gezi Tablosu</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Aktif
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Siteye Ekle
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Ulaşım Aracı Birim Fiyatı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Ulaşım Aracı Toplam Fiyatı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Otel İsmi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Oda Sayısı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Kalınacak Gün Sayısı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Otel SNG Birim Fiyat
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Otel DBL Birim Fiyat
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Otel TRP Birim Fiyat
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Otel Toplam Fiyat
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Rehber Yevmiyesi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Rehber Günlük Yemek Birim Fiyatı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Rehber Gün Sayısı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Rehber Yol Harcı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Rehber Toplam Fiyat
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Öğretmen Yevmiyesi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Öğretmen Kişi Sayısı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Öğretmen Yol Harcı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Öğretmen Toplam Fiyat
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Giriş Yapılan Yerler
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Giriş Yerleri Birim Fiyatları
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Giriş Yapılan Yer Toplam Fiyat
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                İsim
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Onaylı Kişi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Okul
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Kampüs Adı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Soyisim
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Unvan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Telefon No
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Program Adı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Ülke
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Şehir
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Öngörülen Tarih
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Öngörülen Öğrenci Sayısı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                İlgili Sınıf
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Zümre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Ulaşım Aracı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Gidiş Tarihi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Dönüş Tarihi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Gidilecek Şehir
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Dönülecek Şehir
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Transferler
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Lokasyon 1
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Lokasyon 1 Giriş
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Lokasyon 1 Çıkış
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Lokasyon 2
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Lokasyon 2 Giriş
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Lokasyon 2 Çıkış
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Lokasyon 3
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Lokasyon 3 Giriş
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Lokasyon 3 Çıkış
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Kazanım ve Beklentiler
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Oluşturulma Tarihi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Güncellenme Tarihi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {geziler?.map((gezi) => (
                            <tr key={gezi.id}>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    <Link to={`/gezi-formu/${gezi.id}`} className="text-blue-500 font-semibold">
                                        {gezi.id}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.is_approve ? '✓' : '✗'}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    <button
                                        onClick={() => addToSite(gezi.id)}
                                        className="bg-blue-500 rounded-md text-white px-4 py-2 hover:bg-blue-700 cursor-pointer">
                                        Ekle
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.ulasim_araci_birim_fiyati}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.ulasim_araci_toplam_fiyati}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.otel_ismi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.oda_sayisi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.kalinacak_gun_sayisi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.otel_SNG_birim_fiyat}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.otel_DBL_birim_fiyat}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.otel_TRP_birim_fiyat}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.otel_toplam_fiyat}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.rehber_yevmiyesi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.rehber_gunluk_yemek_birim_fiyati}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.rehber_gun_sayisi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.rehber_YD_harc}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.rehber_toplam_fiyat}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.ogretmen_yevmiyesi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.ogretmen_kisi_sayisi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.ogretmen_YD_harc}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.ogretmen_toplam_fiyat}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.giris_yapilan_yerler}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.giris_yerleri_birim_fiyatlari}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.giris_yapilan_yer_toplam_fiyat}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.isim}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.onayli_kisi ? '✓' : '✗'}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.okul}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.kampus_adi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.soyisim}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.unvan}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.tel_no}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.email}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.program_adi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.ulke}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.sehir}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {moment(gezi.ongorulen_tarih).format('DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.ongorulen_ogrenci_sayisi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.ilgili_sinif}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.zumre}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.ulasim_araci}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {moment(gezi.gidis_tarihi).format('DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {moment(gezi.donus_tarihi).format('DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.gidilecek_sehir}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.donulecek_sehir}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.transferler}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.lokasyon1}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {moment(gezi.lokasyon1_giris).format('DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {moment(gezi.lokasyon1_cikis).format('DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.lokasyon2}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {moment(gezi.lokasyon2_giris).format('DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {moment(gezi.lokasyon2_cikis).format('DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.lokasyon3}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {moment(gezi.lokasyon3_giris).format('DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {moment(gezi.lokasyon3_cikis).format('DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {gezi.kazanim_ve_beklentiler}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {moment(gezi.created_at).format('DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">
                                    {moment(gezi.updated_at).format('DD/MM/YYYY')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MutabakatForms;
