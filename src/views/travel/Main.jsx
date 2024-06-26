import classNames from "classnames";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth";

function Main() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("waiting");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

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

    try {
      const response = await fetch(`https://senka.valentura.com/api/customer-relations/travel-forms/get-all-travel-forms/status=${_status}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${myUser?.access}`
        }
      });
      const responseData = await response.json();
      const travelFormData = responseData.data;

      setData(travelFormData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  function getButtonClasses(statusButton) {
    return classNames({
      'px-4 py-1 text-sm text-zinc-950 font-semibold rounded-md border border-gray-900 hover:text-white hover:bg-gray-600 hover:border-transparent outline-none ring-2 ring-gray-600 ring-offset-2': statusButton === status,
      'px-4 py-1 text-sm text-zinc-950 font-semibold rounded-md border border-gray-900 hover:text-white hover:bg-gray-600 hover:border-transparent': statusButton !== status
    });
  }

  return (
    <div>
      <h2 className={"text-3xl font-medium leading-none mt-3"}>
        Seyahat Formları
      </h2>
      <div className="flex justify-between items-center px-4 py-3 text-left sm:px-6 ">
        <div className="flex items-center space-x-4">
          <button className={getButtonClasses("waiting")} onClick={() => handleStatus("waiting")}>Bekleyenler</button>
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
              </div>
            ) : (
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
                        {/* Diğer başlıkları ekleyin */}
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
                        {/* Diğer başlıkları ekleyin */}
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
                          {/* Diğer verileri ekleyin */}
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
                          {/* Diğer verileri ekleyin */}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/seyahat-formu-duzenle/${item.id}`}
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
