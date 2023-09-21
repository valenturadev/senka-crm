import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { errorMessage, successMessage } from '../../utils/toast';

function SozlesmeOnay() {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({});
    const [error, setError] = useState(null);
    const { tel, id } = useParams();
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);
    const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
    const [showServicePopup, setShowServicePopup] = useState(false);
    const [controlPrivacyPopup, setControlPrivacyPopup] = useState(false);
    const [controlServicePopup, setControlServicePopup] = useState(false);

    // PDF dosyalarının yolları
    const privacyPdfPath = '/src/assets/pdf/GizlilikSozlesmesi.pdf';
    const servicePdfPath = '/src/assets/pdf/HizmetSozlesmesi.pdf';

    const openPrivacyPopup = () => {
        setShowPrivacyPopup(true);
        if (controlPrivacyPopup) {
            setControlPrivacyPopup(false);
        } else {
            setControlPrivacyPopup(true);
        }
    };

    const openServicePopup = () => {
        setShowServicePopup(true);
        if (controlServicePopup) {
            setControlServicePopup(false);
        } else {
            setControlServicePopup(true);
        }
    };

    const closePopup = () => {
        setShowPrivacyPopup(false);
        setShowServicePopup(false);
    };

    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/users/sozlesme-getir/phone=${tel}/id=${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then((response) => {
                setUserData(response.data.data);
            })
            .catch((error) => {
                setError('API çağrısı sırasında hata oluştu');
                console.error('API çağrısı sırasında hata oluştu:', error);
            });
    }, [tel, id, myUser?.access]);

    const renderBoolean = (value) => {
        return value ? '✓' : '✗';
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleFieldChange = (field, value) => {
        if (
            field === 'ogrenci_adi_soyadi' ||
            field === 'veli_ad_soyad' ||
            field === 'adres' ||
            field === 'tel_no' ||
            field === 'email' ||
            field === 'program_ismi'
        ) {
            setEditedFields((prevState) => ({
                ...prevState,
                [field]: value,
            }));
        }
    };

    const handleSaveClick = () => {
        if (!controlPrivacyPopup || !controlServicePopup) {
            errorMessage("Lütfen Gizlilik ve Hizmet Sözleşmelerini kabul edin.");
            return;
        }

        axios({
            method: 'PATCH',
            url: `https://senka.valentura.com/api/users/sozlesme-edit/phone=${tel}/id=${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            },
            data: {
                veli_ad_soyad: editedFields.veli_ad_soyad,
                adres: "sadd",
                veli_tc: "31232132113"
            }
        })
            .then((response) => {
                successMessage("Veriler güncellendi!");
                setEditedFields({});
            })
            .catch((error) => {
                errorMessage("Veriler güncellenirken hata oluştu!")
            });
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-2">Sözleşme Onay</h1>

            {!isEditing && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded float-right m-4"
                    onClick={() => handleEditClick()}
                >
                    Düzenle
                </button>
            )}
            <div className="border rounded p-4">
                {Object.keys(userData).map((field) => (
                    // IP alanını hariç tut
                    field !== 'ip' && (
                        <div key={field} className="mb-2 flex">
                            <span className="font-semibold w-40">
                                {field.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase())}:
                            </span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedFields[field] || userData[field]}
                                    onChange={(e) => handleFieldChange(field, e.target.value)}
                                    className="border rounded px-2 py-1 flex-grow"
                                />
                            ) : (
                                <span className="px-2 py-1 flex-grow">
                                    {field.startsWith('is_') ? renderBoolean(userData[field]) : userData[field]}
                                </span>
                            )}
                        </div>
                    )
                ))}
                {isEditing && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
                        onClick={handleSaveClick}
                    >
                        Kaydet
                    </button>
                )}
                {isEditing && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded ml-4"
                        onClick={() => { setIsEditing(false) }}
                    >
                        İptal
                    </button>
                )}

                {/* Gizlilik Sözleşmesi ve Hizmet Sözleşmesi Checkboxları */}
                <div className="mt-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox"
                            onChange={openPrivacyPopup}
                        />
                        <span className="ml-2">Gizlilik Sözleşmesi'ni kabul ediyorum</span>
                    </label>
                    <label className="flex items-center mt-2">
                        <input
                            type="checkbox"
                            className="form-checkbox"
                            onChange={openServicePopup}
                        />
                        <span className="ml-2">Hizmet Sözleşmesi'ni kabul ediyorum</span>
                    </label>
                </div>
            </div>
            {showPrivacyPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 max-w-3xl mx-auto rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={closePopup}
                        >
                            X
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Gizlilik Sözleşmesi</h2>
                        <div className="h-96 overflow-y-auto">
                            <iframe
                                src={privacyPdfPath}
                                title="Gizlilik Sözleşmesi"
                                width="100%"
                                height="100%"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
            {showServicePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 max-w-3xl mx-auto rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={closePopup}
                        >
                            X
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Hizmet Sözleşmesi</h2>
                        <div className="h-96 overflow-y-auto">
                            <iframe
                                src={servicePdfPath}
                                title="Hizmet Sözleşmesi"
                                width="100%"
                                height="100%"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SozlesmeOnay;