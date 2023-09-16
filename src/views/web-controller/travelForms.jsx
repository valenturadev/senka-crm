import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bold } from 'lucide';
import AuthContext from '../../context/auth';

function TravelForms() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [status, setStatus] = useState("all");
    useEffect(() => {
        getData("all")
    }, []);

    const verifyTravelForm = async (formId) => {
        let localUser = localStorage.getItem("user");
        let myUser = JSON.parse(localUser);
        try {
            const response = await axios.get(
                `https://senka.valentura.com/api/web-team/activate-travel/id=${formId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${myUser?.access}`
                    },
                }
            );
            getData(status)
        } catch (error) {
            console.error(error);
        }
    };

    const declineTravelForm = async (formId) => {
        let localUser = localStorage.getItem("user");
        let myUser = JSON.parse(localUser);
        try {
            const response = await axios.get(
                `https://senka.valentura.com/api/web-team/deactivate-travel/id=${formId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${myUser?.access}`
                    },
                }
            );
            getData(status)
        } catch (error) {
            console.error(error);
        }
    };

    const getData = async (_status) => {
        let localUser = localStorage.getItem("user");
        let myUser = JSON.parse(localUser);
        try {
            const response = await fetch(`https://senka.valentura.com/api/web-team/get-all-travels/status=${_status}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${myUser?.access}`
                }
            });
            const data = await response.json();
            console.log(data.data);
            setData(data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            errorMessage("Geziler getirilemedi!")
        }
    };

    const handleStatus = (stringStatus) => {
        setStatus(stringStatus);
        setLoading(true);
        getData(stringStatus);
    };

    function getButtonClasses(statusButton) {
        if (statusButton === status) {
            return `px-4 py-1 text-sm text-zinc-950 font-semibold rounded-full border border-gray-900 hover:text-white hover:bg-gray-600 hover:border-transparent outline-none ring-2 ring-gray-600 ring-offset-2`

        } else {
            return 'px-4 py-1 text-sm text-zinc-950 font-semibold rounded-full border border-gray-900 hover:text-white hover:bg-gray-600 hover:border-transparent'

        }
    }

    return (
        <div>
            <h1>Gezi Tablosu</h1>
            <div className="flex justify-between items-center px-4 py-3 text-left sm:px-6 ">
                <div className="flex items-center space-x-4">
                    <button className={getButtonClasses("true")} onClick={() => handleStatus("true")} >Açık</button>
                    <button className={getButtonClasses("false")} onClick={() => handleStatus("false")}>Kapalı</button>
                    <button className={getButtonClasses("all")} onClick={() => handleStatus("all")}>Hepsi</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Aktif
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Siteye Ekle
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Program Adı
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Okul
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Telefon
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                İsim
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Soyisim
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Gidiş Tarihi
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Dönüş Tarihi
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Gidilecek Şehir
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Dönülecek Şehir
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Oluşturulma Tarihi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((gezi) => (
                            <tr key={gezi.id}>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    <Link to={`/gezi-formu/${gezi.id}`} style={{ color: 'blue', fontWeight: Bold }}>
                                        {gezi.id}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.is_active ? (
                                        <button onClick={() => declineTravelForm(gezi.id)}>✗ Reddet</button>
                                    ) : (
                                        <button onClick={() => verifyTravelForm(gezi.id)}>✓ Onayla</button>
                                    )}
                                </td>
                                {/*TODO: siteye kle*/}
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.is_active ? (
                                        <button onClick={() => declineTravelForm(gezi.id)}>✗ Reddet</button>
                                    ) : (
                                        <button onClick={() => verifyTravelForm(gezi.id)}>✓ Onayla</button>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.mutabakat.program_adi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.mutabakat.okul}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.mutabakat.tel_no}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.mutabakat.email}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.mutabakat.isim}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.mutabakat.soyisim}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.mutabakat.gidis_tarihi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.mutabakat.donus_tarihi}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.mutabakat.gidilecek_sehir}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.mutabakat.donulecek_sehir}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                    {gezi.mutabakat.created_at}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TravelForms;