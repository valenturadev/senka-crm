import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const OgrenciOteleYerlestir = () => {
  const { geziId } = useParams();
  const [students, setStudents] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

  useEffect(() => {
    const fetchStudentsAndHotels = async () => {
      try {
        const studentResponse = await axios({
          method: 'GET',
          url: `https://senka.valentura.com/api/teacher/get-all-ogrenci-for-otel/id=${geziId}`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
        });

        if (studentResponse.data.error === false) {
          setStudents(studentResponse.data.data.ogrenci_list);
        } else {
          console.error('API Error:', studentResponse.data.errorMsg);
        }

        const hotelResponse = await axios({
          method: 'GET',
          url: `https://senka.valentura.com/api/teacher/get-all-otels/id=${geziId}`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
        });

        if (hotelResponse.data.error === false) {
          const hotelData = hotelResponse.data.data;
          setHotels(hotelData);
          const roomPlaceholders = [];
          let roomNumber = 1;
          hotelData.forEach((hotel) => {
            for (let i = 1; i <= hotel.otel_1_kişilik_odalar; i++) {
              roomPlaceholders.push({ id: `1-kişilik-${hotel.id}-${i}`, hotelId: hotel.id, capacity: 1, students: [], roomNumber: roomNumber++ });
            }
            for (let i = 1; i <= hotel.otel_2_kişilik_odalar; i++) {
              roomPlaceholders.push({ id: `2-kişilik-${hotel.id}-${i}`, hotelId: hotel.id, capacity: 2, students: [], roomNumber: roomNumber++ });
            }
            for (let i = 1; i <= hotel.otel_3_kişilik_odalar; i++) {
              roomPlaceholders.push({ id: `3-kişilik-${hotel.id}-${i}`, hotelId: hotel.id, capacity: 3, students: [], roomNumber: roomNumber++ });
            }
            for (let i = 1; i <= hotel.otel_4_kişilik_odalar; i++) {
              roomPlaceholders.push({ id: `4-kişilik-${hotel.id}-${i}`, hotelId: hotel.id, capacity: 4, students: [], roomNumber: roomNumber++ });
            }
          });
          setRooms(roomPlaceholders);

          // Öğrencileri odalarına yerleştir
          await fetchRoomAssignments(hotelData, roomPlaceholders);
        } else {
          console.error('API Error:', hotelResponse.data.errorMsg);
        }
      } catch (error) {
        console.error('API çağrısı sırasında hata oluştu:', error);
      }
    };

    const fetchRoomAssignments = async (hotels, roomPlaceholders) => {
      try {
        const updatedRooms = [...roomPlaceholders];
        for (const hotel of hotels) {
          const response = await axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/teacher/get-otel-ogrenci-listesi/id=${hotel.id}`,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${myUser?.access}`
            }
          });

          if (response.data.error === false) {
            const roomAssignments = response.data.data;
            roomAssignments.forEach((assignment) => {
              const room = updatedRooms.find(r => r.roomNumber === assignment.numara && r.hotelId === hotel.id);
              if (room) {
                room.students.push(assignment.ogrenci);
              }
            });
          } else {
            console.error('API Error:', response.data.errorMsg);
          }
        }
        setRooms(updatedRooms);
      } catch (error) {
        console.error('API çağrısı sırasında hata oluştu:', error);
      }
    };

    fetchStudentsAndHotels();
  }, [geziId, myUser?.access]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceDroppableId === 'students' && destinationDroppableId !== 'students') {
      // Öğrenciyi odadan çıkarma
      const sourceItems = Array.from(students);
      const destinationRoom = rooms.find(room => room.id === destinationDroppableId);

      if (destinationRoom.students.length < destinationRoom.capacity) {
        const [movedItem] = sourceItems.splice(sourceIndex, 1);
        destinationRoom.students.push(movedItem);
        setStudents(sourceItems);
        setRooms([...rooms]);
      }
    } else if (sourceDroppableId !== 'students' && destinationDroppableId === 'students') {
      // Öğrenciyi odaya yerleştirme
      const destinationItems = Array.from(students);
      const sourceRoom = rooms.find(room => room.id === sourceDroppableId);
      const [movedItem] = sourceRoom.students.splice(sourceIndex, 1);
      destinationItems.push(movedItem);
      setStudents(destinationItems);
      setRooms([...rooms]);
    } else if (sourceDroppableId !== 'students' && destinationDroppableId !== 'students') {
      // Öğrenciyi bir odadan diğerine taşıma
      const sourceRoom = rooms.find(room => room.id === sourceDroppableId);
      const destinationRoom = rooms.find(room => room.id === destinationDroppableId);
      if (destinationRoom.students.length < destinationRoom.capacity) {
        const [movedItem] = sourceRoom.students.splice(sourceIndex, 1);
        destinationRoom.students.push(movedItem);
        setRooms([...rooms]);
      }
    }
  };

  const handleSave = () => {
    hotels.forEach(hotel => {
      const hotelRooms = rooms.filter(room => room.hotelId === hotel.id);
      const ogrenciler = [];
      hotelRooms.forEach(room => {
        room.students.forEach(student => {
          ogrenciler.push({
            id: student.id,
            numara: room.roomNumber
          });
        });
      });

      axios({
        method: 'POST',
        url: `https://senka.valentura.com/api/teacher/add-ogrenci-to-otel/id=${hotel.id}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${myUser?.access}`
        },
        data: { ogrenciler }
      })
      .then(response => {
        if (response.data.error === false) {
          console.log('Başarıyla kaydedildi:', response.data);
        } else {
          console.error('API Error:', response.data.errorMsg);
        }
      })
      .catch(error => {
        console.error('API çağrısı sırasında hata oluştu:', error);
      });
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-medium leading-none mt-3">Öğrencileri Otele Yerleştir</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="students">
          {(provided) => (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4" {...provided.droppableProps} ref={provided.innerRef}>
              {students.map((student, index) => (
                <Draggable key={student.id} draggableId={student.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      className="border p-4 rounded-lg shadow-lg bg-white w-32 h-32 flex flex-col justify-center items-center text-center m-2"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p className="text-sm font-semibold">{student.ogrenci_adi}</p>
                      <p className="text-gray-700 text-xs">{student.ogrenci_soyadi}</p>
                      <p className="text-gray-700 text-xs">{student.ogrenci_sinif}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="mt-8">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{hotel.otel_adi}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rooms.filter(room => room.hotelId === hotel.id).map((room) => (
                  <Droppable key={room.id} droppableId={room.id}>
                    {(provided) => (
                      <div
                        className="border p-4 rounded-lg shadow-lg bg-white w-64 h-64 flex flex-col justify-center items-center text-center m-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <h3 className="text-lg font-semibold">Oda {room.roomNumber}</h3>
                        {room.students.map((student, index) => (
                          <Draggable key={student.id} draggableId={`${room.id}-${student.id}`} index={index}>
                            {(provided) => (
                              <div
                                className="w-full h-10 border border-dashed border-gray-400 mt-1 flex items-center justify-center"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="w-full h-full flex flex-col justify-center items-center">
                                  <p className="text-sm font-semibold">{student.ogrenci_adi}</p>
                                  <p className="text-gray-700 text-xs">{student.ogrenci_soyadi}</p>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {Array.from({ length: room.capacity - room.students.length }).map((_, index) => (
                          <div key={index} className="w-full h-10 border border-dashed border-gray-400 mt-1 flex items-center justify-center">
                            <p className="text-gray-400 text-xs">Boş</p>
                          </div>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default OgrenciOteleYerlestir;
