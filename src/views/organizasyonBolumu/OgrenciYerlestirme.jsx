import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const OgrenciListesi = () => {
  const { id, aracId } = useParams();
  const [ogrenciler, setOgrenciler] = useState([]);
  const [error, setError] = useState(null);
  const [arac, setArac] = useState(null);
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/operation-team/gezi/get-all-students-by-gezi-id/id=${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        if (response.data.error === false) {
          setOgrenciler(response.data.data);
        } else {
          console.error('API Error:', response.data.errorMsg);
        }
      })
      .catch((error) => {
        setError(error);
      });

    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/operation-team/gezi/get-otobus/id=${aracId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        if (response.data.error === false) {
          const aracData = response.data.data;
          const studentsWithPlaceholders = Array.from({ length: aracData.otobus_kapasitesi }, (_, i) => ({
            id: `placeholder-${i + 1}`,
            numara: i + 1,
            placeholder: true,
            ogrenci_adi: '',
            ogrenci_soyadi: '',
            ogrenci_sinif: '',
            ogrenci_phone: ''
          }));
          aracData.students = studentsWithPlaceholders;
          setArac(aracData);
        } else {
          console.error('API Error:', response.data.errorMsg);
        }
      })
      .catch((error) => {
        setError(error);
      });

    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/operation-team/gezi/get-otobus-ogrenci-listesi/id=${aracId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        if (response.data.error === false) {
          const studentData = response.data.data;
          setArac(prevArac => {
            const updatedArac = { ...prevArac };
            studentData.forEach(item => {
              const { numara, ogrenci } = item;
              updatedArac.students[numara - 1] = { ...ogrenci, placeholder: false };
            });
            return updatedArac;
          });
        } else {
          console.error('API Error:', response.data.errorMsg);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [id, aracId]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceDroppableId === 'ogrenciler' && destinationDroppableId === 'arac') {
      const sourceItems = Array.from(ogrenciler);
      const destinationItems = Array.from(arac.students);

      const [movedItem] = sourceItems.splice(sourceIndex, 1);
      const destinationItem = destinationItems[destinationIndex];

      if (destinationItem.placeholder) {
        destinationItems[destinationIndex] = { ...movedItem, placeholder: false };
        setOgrenciler(sourceItems);
        setArac({
          ...arac,
          students: destinationItems,
        });
      }
    } else if (sourceDroppableId === 'arac' && destinationDroppableId === 'ogrenciler') {
      const sourceItems = Array.from(arac.students);
      const destinationItems = Array.from(ogrenciler);

      const [movedItem] = sourceItems.splice(sourceIndex, 1);

      if (!movedItem.placeholder) {
        destinationItems.push({ 
          id: movedItem.id, 
          ogrenci_adi: movedItem.ogrenci_adi, 
          ogrenci_soyadi: movedItem.ogrenci_soyadi, 
          ogrenci_sinif: movedItem.ogrenci_sinif, 
          ogrenci_phone: movedItem.ogrenci_phone 
        });
        sourceItems.splice(sourceIndex, 0, {
          id: `placeholder-${sourceIndex + 1}`,
          numara: sourceIndex + 1,
          placeholder: true,
          ogrenci_adi: '',
          ogrenci_soyadi: '',
          ogrenci_sinif: '',
          ogrenci_phone: ''
        });

        setOgrenciler(destinationItems);
        setArac({
          ...arac,
          students: sourceItems,
        });
      }
    } else if (sourceDroppableId === 'arac' && destinationDroppableId === 'arac') {
      const items = Array.from(arac.students);
      const [movedItem] = items.splice(sourceIndex, 1);

      if (items[destinationIndex].placeholder) {
        items.splice(destinationIndex, 0, { ...movedItem, placeholder: false });
        items.splice(sourceIndex, 0, {
          id: `placeholder-${sourceIndex + 1}`,
          numara: sourceIndex + 1,
          placeholder: true,
          ogrenci_adi: '',
          ogrenci_soyadi: '',
          ogrenci_sinif: '',
          ogrenci_phone: ''
        });
        setArac({
          ...arac,
          students: items,
        });
      }
    }
  };

  const handleKaydet = () => {
    const ogrencilerData = arac.students
      .filter(student => !student.placeholder)
      .map((student, index) => ({
        id: student.id,
        numara: index + 1,
      }));

    const data = {
      ogrenciler: ogrencilerData,
    };

    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/operation-team/gezi/edit-otobus-ogrenci/id=${aracId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: JSON.stringify(data)
    })
    .then((response) => {
      if (response.data.error === false) {
        alert('Öğrenci atamaları başarıyla kaydedildi!');
      } else {
        console.error('API Error:', response.data.errorMsg);
      }
    })
    .catch((error) => {
      setError(error);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-medium leading-none mt-3">Öğrenci Listesi</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          Toplam Öğrenci Sayısı: {ogrenciler.length}
        </div>
        <div className="text-lg font-semibold">
          Toplam Araç Sayısı: {arac ? 1 : 0}
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="ogrenciler">
          {(provided) => (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4" {...provided.droppableProps} ref={provided.innerRef}>
              {ogrenciler.map((ogrenci, index) => (
                <Draggable key={ogrenci.id} draggableId={ogrenci.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      className="border p-2 rounded-lg shadow-lg bg-white w-24 h-24 flex flex-col justify-center items-center text-center"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p className="text-sm font-semibold">{ogrenci.ogrenci_adi} {ogrenci.ogrenci_soyadi}</p>
                      <p className="text-gray-700 text-xs"><span className="font-semibold">Sınıf:</span> {ogrenci.ogrenci_sinif}</p>
                      <p className="text-gray-700 text-xs"><span className="font-semibold">Telefon:</span> {ogrenci.ogrenci_phone}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {arac && (
          <Droppable droppableId="arac">
            {(provided) => (
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{arac.type ? arac.type.charAt(0).toUpperCase() + arac.type.slice(1) : 'Araç'} {arac.plaka}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2" {...provided.droppableProps} ref={provided.innerRef}>
                  {arac.students.map((student, index) => (
                    <div
                      key={student.id}
                      className={`border p-2 rounded-lg shadow-lg bg-white w-24 h-24 flex flex-col justify-center items-center text-center ${
                        student.placeholder ? 'bg-gray-200' : ''
                      }`}
                    >
                      {student.placeholder ? (
                        <div>
                          <p className="text-sm font-semibold">{student.numara}</p>
                          {student.ogrenci_adi && (
                            <div>
                              <p className="text-sm font-semibold">{student.ogrenci_adi} {student.ogrenci_soyadi}</p>
                              <p className="text-gray-700 text-xs"><span className="font-semibold">Sınıf:</span> {student.ogrenci_sinif}</p>
                              <p className="text-gray-700 text-xs"><span className="font-semibold">Telefon:</span> {student.ogrenci_phone}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Draggable key={student.id} draggableId={student.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              className="w-full h-full flex flex-col justify-center items-center text-center"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <p className="text-sm font-semibold">{student.ogrenci_adi} {student.ogrenci_soyadi}</p>
                              <p className="text-gray-700 text-xs"><span className="font-semibold">Telefon:</span> {student.ogrenci_phone}</p>
                            </div>
                          )}
                        </Draggable>
                      )}
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
          onClick={handleKaydet}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default OgrenciListesi;
