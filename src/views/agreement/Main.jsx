import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { errorMessage } from "../../utils/toast";
import AuthContext from "../../context/auth";
import axios from 'axios';

function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState("waiting");

  useEffect(() => {
    getData("waiting");
  }, []);

  const handleStatus = (stringStatus) => {
    setStatus(stringStatus);
    setLoading(true);
    getData(stringStatus);
  };

  const getData = async (_status) => {
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);
    setLoading(true);
    try {
      const response = await axios.get(`https://senka.valentura.com/api/operation-team/mutabakat/get-all-mutabakat-forms/status=${_status}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${myUser?.access}`
        }
      });
      const responseData = response.data;
      setData(responseData.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorMessage("Mutabakat formları getirilemedi!\nYöneticinizle iletişime geçin.");
    }
  };

  function getButtonClasses(statusButton) {
    if (statusButton === status) {
      return `px-4 py-1 text-sm text-zinc-950 font-semibold rounded-full border border-gray-900 hover:text-white hover:bg-gray-600 hover:border-transparent outline-none ring-2 ring-gray-600 ring-offset-2`;
    } else {
      return 'px-4 py-1 text-sm text-zinc-950 font-semibold rounded-full border border-gray-900 hover:text-white hover:bg-gray-600 hover:border-transparent';
    }
  }

  return (
    <>
      <div>
        <h2 className="text-3xl font-medium leading-none mt-3">
          Mutabakat Formları
        </h2>
        <div className="flex justify-between items-center px-4 py-3 text-left sm:px-6 ">
          <div className="flex items-center space-x-4">
            <button className={getButtonClasses("waiting")} onClick={() => handleStatus("waiting")} >Bekleyenler</button>
            <button className={getButtonClasses("approved")} onClick={() => handleStatus("approved")}>Onaylananlar</button>
            <button className={getButtonClasses("rejected")} onClick={() => handleStatus("rejected")}>Onaylanmayanlar</button>
            <button className={getButtonClasses("all")} onClick={() => handleStatus("all")}>Hepsi</button>
          </div>
        </div>
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
                            Program Adı
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Okul
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Kampüs Adı
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            İsim
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Soyisim
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Mail
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Telefon Numarası
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Gidilecek Şehir
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-900">
                        {data?.map((item) => (
                          <tr key={item.id}>
                            <td className="px-2 py-4 whitespace-nowrap">
                              {item.program_adi}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                              {item.okul}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                              {item.kampus_adi}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                              {item.isim}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                              {item.soyisim}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                              {item.email}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                              {item.tel_no}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                              {item.gidilecek_sehir}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                to={`/mutakabat-formu-duzenle/${item.id}`}
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
    </>
  );
}

export default Main;
