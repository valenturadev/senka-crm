import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccountingAgreementForms = () => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const localUser = localStorage.getItem("user");
    const myUser = JSON.parse(localUser);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get('https://senka.valentura.com/api/muhasebe/get-all-onaylanan-mutabakat-forms', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${myUser?.access}`
                    }
                });
                if (!response.data.error) {
                    setForms(response.data.data);
                } else {
                    setError(response.data.errorMsg);
                }
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchForms();
    }, []); // Boş bağımlılıklar dizisi, useEffect'in sadece bir kez çalışmasını sağlar.

    const handleFormClick = (formId) => {
        navigate(`/muhasebe-mutabakat-onay/${formId}`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Mütabakat Formları</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {forms.map(form => (
                    <div 
                        key={form.id} 
                        className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                        onClick={() => handleFormClick(form.id)}
                    >
                        <h2 className="text-xl font-semibold mb-2">{form.program_adi}</h2>
                        <p><strong>İsim:</strong> {form.isim} {form.soyisim}</p>
                        <p><strong>Okul:</strong> {form.okul}</p>
                        <p><strong>Ünvan:</strong> {form.unvan}</p>
                        <p><strong>Tel No:</strong> {form.tel_no}</p>
                        <p><strong>Email:</strong> {form.email}</p>
                        <p><strong>Gidiş Tarihi:</strong> {new Date(form.gidis_tarihi).toLocaleDateString()}</p>
                        <p><strong>Dönüş Tarihi:</strong> {new Date(form.donus_tarihi).toLocaleDateString()}</p>
                        <p><strong>Gidilecek Şehir:</strong> {form.gidilecek_sehir}</p>
                        <p><strong>Dönülecek Şehir:</strong> {form.donulecek_sehir}</p>
                        <p><strong>İlgili Sınıf:</strong> {form.ilgili_sinif}</p>
                        <p><strong>Öngörülen Öğrenci Sayısı:</strong> {form.ongorulen_ogrenci_sayisi}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountingAgreementForms;
