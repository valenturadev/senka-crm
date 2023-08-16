import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("https://senka.valentura.com/api/müşteri_ilişkileri/Api/get-all-travel-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': "token 6eb4d112b1041a9e1d3ffe273615ae789441f197"
        }
      });
      const data = await response.json();
      console.log(data.data);
      setData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   "data": [
  //       {
  //           "travel_form_id": 7,
  //           "travel_form_isim": "sdsda",
  //           "travel_form_onaylı_kisi": false,
  //           "travel_form_program_adi": "asdsd",
  //           "travel_form_ülke": "Türkiye",
  //           "travel_form_sehir": "ankara",
  //           "travel_form_öngörülen_tarih": "2023-08-11T07:55:12.609562Z",
  //           "travel_form_öngörülen_öğrenci_sayisi": 33,
  //           "travel_form_ilgili_sınıf": "2",
  //           "travel_form_zümre": "ased",
  //           "travel_form_kazanim_ve_beklentiler": "sdsdasd",
  //           "travel_form_ulasim_araci": "otobüs",
  //           "travel_form_gidis_tarihi": "antalya",
  //           "travel_form_dönüs_tarihi": "2023-08-11T07:55:12.609669Z",
  //           "travel_form_gidilen_sehir": "antalya",
  //           "travel_form_dönülen_sehir": "istanbul",
  //           "travel_form_transferler": "asasdasd",
  //           "travel_form_lokasyon1": "isveç",
  //           "travel_form_lokasyon2": "londra",
  //           "travel_form_lokasyon3": "bilbao",
  //           "travel_form_lokasyon1_giris": "2023-08-11T07:55:12.609707Z",
  //           "travel_form_lokasyon1_cikis": "2023-08-11T07:55:12.609725Z",
  //           "travel_form_lokasyon2_giris": "2023-08-11T07:55:12.609743Z",
  //           "travel_form_lokasyon2_cikis": "2023-08-11T07:55:12.609761Z",
  //           "travel_form_lokasyon3_giris": "2023-08-11T07:55:12.609779Z",
  //           "travel_form_lokasyon3_cikis": "2023-08-11T07:55:12.609797Z",
  //           "travel_form_soyisim": "sdsda",
  //           "travel_form_okul_adi": "gazi",
  //           "travel_form_kampus_adi": "asdasd",
  //           "travel_form_ünvan": "asd",
  //           "travel_form_tel_no": "05124578543",
  //           "travel_form_email": "asd@asd.asd",
  //           "travel_form_is_approve": null
  //       }]

  return (
    <div>
      <h2 className="text-3xl font-medium leading-none mt-3">
        Seyahat Formları
      </h2>
      <div className="mt-5">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>) : (
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-900 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-900">
                    <thead className="bg-gray-900">
                      <tr>
                        <th

                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          İsim
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-900">
                      {data.map((item) => (
                        <tr key={item.travel_form_id}>
                          <td className="px-2 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.travel_form_isim}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.travel_form_email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/seyahat-formu-duzenle/${item.travel_form_id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Düzenle
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
