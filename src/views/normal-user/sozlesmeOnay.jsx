import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { errorMessage, successMessage } from '../../utils/toast';

function SozlesmeOnay() {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({});
    const [file, setFile] = useState(null); // Yüklenen dosya için state
    const [error, setError] = useState(null);
    const { tel, id } = useParams();
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);

    // State tanımlamaları
    const [isPdf1Selected, setIsPdf1Selected] = useState(false);
    const [isPdf2Selected, setIsPdf2Selected] = useState(false);

    // PDF dosya adlarını belirtin (assets klasöründe)
    const pdf1FileName = 'GizlilikSozlesmesi.pdf';
    const pdf2FileName = 'HizmetSozlesmesi.pdf';

    // PDF dosyalarının yolunu oluşturun
    const pdf1FilePath = `../../assets/${pdf1FileName}`;
    const pdf2FilePath = `../../assets/${pdf2FileName}`;

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

        axios({
            method: 'PATCH',
            url: `https://senka.valentura.com/api/users/sozlesme-edit/phone=${tel}/id=${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            },
            data: {
                veli_ad_soyad: editedFields.veli_ad_soyad,
                adres: editedFields.adres,
                veli_tc: editedFields.veli_tc
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
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Sözleşmeler</h2>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isPdf1Selected}
                            onChange={() => setIsPdf1Selected(!isPdf1Selected)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <a
                            href={pdf1FilePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {pdf1FileName}
                        </a>
                    </label>

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isPdf2Selected}
                            onChange={() => setIsPdf2Selected(!isPdf2Selected)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <a
                            href={pdf2FilePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {pdf2FileName}
                        </a>
                    </label>
                </div>
            </div>

        </div>
    );
}

export default SozlesmeOnay;
