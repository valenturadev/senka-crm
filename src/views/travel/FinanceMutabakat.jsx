import classNames from "classnames";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth";

function FinanceMutabakat() {
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
            const response = await fetch(`https://dev.senkaturizm.com/api/customer-relations/finance-mutabakat-forms/get-all-onaylanan-forms`, {
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
    return (
        <div>
            <h2 className={"text-3xl font-medium leading-none mt-3"}>
                Finans Mutabakat Formları
            </h2>
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
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                                >
                                                    Onay/Red
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
                                                            to={`/finans-mutabakat-duzenle/${item.id}`}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Detay
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

export default FinanceMutabakat;
