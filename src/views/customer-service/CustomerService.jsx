import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Modal from "react-modal";
import debounce from "lodash/debounce";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 9999,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
    maxWidth: "80%",
    maxHeight: "80%",
    width: "900px",
    zIndex: 10000,
  },
};

const CustomInput = ({ name, placeholder, value, onChange }) => (
  <input
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

const CustomButton = ({ children, onClick, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {children}
  </button>
);

const CustomerService = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({
    ogrenci_adi: "",
    ogrenci_soyadi: "",
    ogrenci_tc: "",
    ogrenci_phone: "",
  });
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const getAuthToken = () => {
    const localUser = localStorage.getItem("user");
    const myUser = JSON.parse(localUser);
    return myUser?.access;
  };

  const makeApiCall = async (url, method = "GET", params = null) => {
    try {
      const response = await axios({
        method,
        url,
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      setError("API çağrısı sırasında hata oluştu");
      console.error("API çağrısı sırasında hata oluştu:", error);
      throw error;
    }
  };

  const fetchStudents = async (filters) => {
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );
      const data = await makeApiCall(
        "https://senka.valentura.com/api/customer-relations/ogrenciler/get-ogrenci",
        "GET",
        params
      );
      setStudents(data?.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // debounce uygulanan fetchStudents fonksiyonu
  const debouncedFetchStudents = useCallback(
    debounce((filters) => fetchStudents(filters), 300),
    []
  );

  useEffect(() => {
    debouncedFetchStudents(filters);
    // Bileşen unmount olduğunda debounce'u temizle
    return () => debouncedFetchStudents.cancel();
  }, [filters, debouncedFetchStudents]);

  const fetchStudentDetails = async (student) => {
    setModalIsOpen(true);
    try {
      const data = await makeApiCall(
        "https://senka.valentura.com/api/customer-relations/ogrenciler/get-ogrenci-details",
        "GET",
        { ogrenci_phone: student.ogrenci_phone }
      );
      setSelectedStudent(data?.data[0]);
      console.log("selectedStudent", selectedStudent);
      console.log("data", data?.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
      setError("Öğrenci detayları alınırken bir hata oluştu");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStudent(null);
  };
  console.log("modalisopen", modalIsOpen);
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Öğrenci Detayları"
      >
        {selectedStudent && (
          <div className="bg-white rounded-lg overflow-y-auto max-h-full p-6">
            <h2 className="text-2xl font-bold mb-6">Öğrenci Detayları</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Kişisel Bilgiler</h3>
                <p>
                  <strong>Ad Soyad:</strong> {selectedStudent.ogrenci_adi}{" "}
                  {selectedStudent.ogrenci_soyadi}
                </p>
                <p>
                  <strong>TC:</strong> {selectedStudent.ogrenci_tc}
                </p>
                <p>
                  <strong>Telefon:</strong> {selectedStudent.ogrenci_phone}
                </p>
                <p>
                  <strong>Email:</strong> {selectedStudent.ogrenci_email}
                </p>
                <p>
                  <strong>Doğum Tarihi:</strong>{" "}
                  {selectedStudent.ogrenci_dogum_tarihi}
                </p>
                <p>
                  <strong>Cinsiyet:</strong>{" "}
                  {selectedStudent.ogrenci_cinsiyet_erkek ? "Erkek" : "Kadın"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Okul ve Veli Bilgileri
                </h3>
                <p>
                  <strong>Okul:</strong> {selectedStudent.ogrenci_okul}
                </p>
                <p>
                  <strong>Kampüs:</strong> {selectedStudent.ogrenci_kampus}
                </p>
                <p>
                  <strong>Sınıf:</strong> {selectedStudent.ogrenci_sinif}
                </p>
                <p>
                  <strong>Veli Ad Soyad:</strong>{" "}
                  {selectedStudent.veli_ad_soyad || "Belirtilmemiş"}
                </p>
                <p>
                  <strong>Veli Telefon:</strong> {selectedStudent.veli_phone}
                </p>
                <p>
                  <strong>Veli TC:</strong>{" "}
                  {selectedStudent.veli_tc || "Belirtilmemiş"}
                </p>
              </div>

              {selectedStudent.gezi && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Gezi Bilgileri</h3>
                  <p>
                    <strong>Program:</strong> {selectedStudent.gezi.program_adi}
                  </p>
                  <p>
                    <strong>Gidilen Şehir:</strong>{" "}
                    {selectedStudent.gezi.gidilen_sehir}
                  </p>
                  <p>
                    <strong>Dönülen Şehir:</strong>{" "}
                    {selectedStudent.gezi.donulen_sehir}
                  </p>
                  <p>
                    <strong>Gidiş:</strong>{" "}
                    {new Date(
                      selectedStudent.gezi.gidis_tarihi
                    ).toLocaleString()}
                  </p>
                  <p>
                    <strong>Dönüş:</strong>{" "}
                    {new Date(
                      selectedStudent.gezi.donus_tarihi
                    ).toLocaleString()}
                  </p>
                  <p>
                    <strong>Ulaşım:</strong>{" "}
                    {JSON.parse(selectedStudent.gezi.ulasim_araci).join(", ")}
                  </p>
                </div>
              )}
            </div>

            {selectedStudent.ogretmenler &&
              selectedStudent.ogretmenler.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Öğretmen Bilgileri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedStudent.ogretmenler.map((ogretmen, index) => (
                      <div key={index} className="border p-2 rounded">
                        <p>
                          <strong>
                            {ogretmen.ogretmen_adi} {ogretmen.ogretmen_soyadi}
                          </strong>
                        </p>
                        <p>{ogretmen.ogretmen_email}</p>
                        <p>{ogretmen.ogretmen_phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {selectedStudent.otobus_listesi &&
              selectedStudent.otobus_listesi.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Otobüs Bilgileri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedStudent.otobus_listesi.map((otobus, index) => (
                      <div key={index} className="border p-2 rounded">
                        <p>
                          <strong>Plaka:</strong> {otobus.otobus_plaka}
                        </p>
                        <p>
                          <strong>Marka/Model:</strong> {otobus.otobus_marka}{" "}
                          {otobus.otobus_model}
                        </p>
                        <p>
                          <strong>Koltuk Sayısı:</strong>{" "}
                          {otobus.otobus_koltuk_sayisi}
                        </p>
                        <p>
                          <strong>Şoför:</strong> {otobus.otobus_sofor} (
                          {otobus.otobus_sofor_phone})
                        </p>
                        <details>
                          <summary className="cursor-pointer">
                            Öğrenci Listesi
                          </summary>
                          <ul className="list-disc pl-5 mt-2">
                            {otobus.otobus_ogrenci_listesi.map(
                              (ogrenci, ogrenciIndex) => (
                                <li key={ogrenciIndex}>
                                  {ogrenci.ogrenci_adi} {ogrenci.ogrenci_soyadi}{" "}
                                  - Koltuk: {ogrenci.numara}
                                </li>
                              )
                            )}
                          </ul>
                        </details>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {selectedStudent.otel_listesi &&
              selectedStudent.otel_listesi.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Otel Bilgileri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedStudent.otel_listesi.map((otel, index) => (
                      <div key={index} className="border p-2 rounded">
                        <p>
                          <strong>Otel Adı:</strong> {otel.otel_adi}
                        </p>
                        <p>
                          <strong>Adres:</strong> {otel.otel_adres}
                        </p>
                        <details>
                          <summary className="cursor-pointer">
                            Öğrenci Listesi
                          </summary>
                          <ul className="list-disc pl-5 mt-2">
                            {otel.otel_ogrenci_listesi.map(
                              (ogrenci, ogrenciIndex) => (
                                <li key={ogrenciIndex}>
                                  {ogrenci.ogrenci_adi} {ogrenci.ogrenci_soyadi}{" "}
                                  - Oda: {ogrenci.numara}
                                </li>
                              )
                            )}
                          </ul>
                        </details>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            <div className="mt-6">
              <CustomButton onClick={closeModal}>Kapat</CustomButton>
            </div>
          </div>
        )}
      </Modal>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Müşteri Hizmetleri Paneli</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSearch} className="mb-4 flex flex-wrap gap-2">
          <CustomInput
            name="ogrenci_adi"
            placeholder="Ad"
            value={filters.ogrenci_adi}
            onChange={handleFilterChange}
          />
          <CustomInput
            name="ogrenci_soyadi"
            placeholder="Soyad"
            value={filters.ogrenci_soyadi}
            onChange={handleFilterChange}
          />
          <CustomInput
            name="ogrenci_tc"
            placeholder="TC"
            value={filters.ogrenci_tc}
            onChange={handleFilterChange}
          />
          <CustomInput
            name="ogrenci_phone"
            placeholder="Telefon"
            value={filters.ogrenci_phone}
            onChange={handleFilterChange}
          />
          <CustomButton type="submit">
            <Search className="w-4 h-4 mr-2 inline-block" />
            Ara
          </CustomButton>
        </form>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b whitespace-nowrap">Ad</th>
                <th className="py-2 px-4 border-b whitespace-nowrap">Soyad</th>
                <th className="py-2 px-4 border-b whitespace-nowrap">TC</th>
                <th className="py-2 px-4 border-b whitespace-nowrap">
                  Telefon
                </th>
                <th className="py-2 px-4 border-b whitespace-nowrap">Email</th>
                <th className="py-2 px-4 border-b whitespace-nowrap">
                  Cinsiyet
                </th>
                <th className="py-2 px-4 border-b whitespace-nowrap">
                  Doğum Tarihi
                </th>
                <th className="py-2 px-4 border-b whitespace-nowrap">Kampüs</th>
                <th className="py-2 px-4 border-b whitespace-nowrap">Okul</th>
                <th className="py-2 px-4 border-b whitespace-nowrap">Sınıf</th>
                <th className="py-2 px-4 border-b whitespace-nowrap">
                  Veli Ad Soyad
                </th>
                <th className="py-2 px-4 border-b whitespace-nowrap">
                  Veli Telefon
                </th>
                <th className="py-2 px-4 border-b whitespace-nowrap">
                  Veli TC
                </th>
              </tr>
            </thead>
            <tbody>
              {students?.map((student) => (
                <tr
                  key={student.ogrenci_tc}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => fetchStudentDetails(student)}
                >
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.ogrenci_adi}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.ogrenci_soyadi}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.ogrenci_tc}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.ogrenci_phone}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.ogrenci_email}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.ogrenci_cinsiyet_erkek ? "Erkek" : "Kadın"}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.ogrenci_dogum_tarihi}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.ogrenci_kampus}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.ogrenci_okul}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.ogrenci_sinif}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.veli_ad_soyad || "Belirtilmemiş"}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.veli_phone}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {student.veli_tc || "Belirtilmemiş"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerService;
