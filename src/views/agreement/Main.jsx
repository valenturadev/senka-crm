import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { errorMessage } from "../../utils/toast";
import AuthContext from "../../context/auth";

function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    user.role == "is_operations_team" && getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("https://senka.valentura.com/api/operasyon_ekibi/Api/get-all-mutabakat-forms", {
        method: "GET",
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
      errorMessage("Mutabakat formları getirilemedi!")
    }
  };

  return (
    <>
      {user?.role == "" ?
        <div>
          <h2 className="text-3xl font-medium leading-none mt-3">
            Mutabakat Formları
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
                          {data?.map((item) => (
                            <tr key={item.id}>
                              <td className="px-2 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {item.soyisim}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {item.email}
                                    </div>
                                  </div>
                                </div>
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
        :
        <div
          className="
          flex
          items-center
          justify-center
          h-screen
          bg-gradient-to-r
          from-indigo-600
          to-blue-400">
          <div class="px-40 py-20 bg-white rounded-md shadow-xl">
            <div class="flex flex-col items-center">

              <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span class="text-red-500">Oops!</span> Yetkiniz YOK
              </h6>

              <p class="text-center text-gray-500 md:text-lg">
                Burayı operasyon ekibi görebilir.
              </p>

            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Main;
