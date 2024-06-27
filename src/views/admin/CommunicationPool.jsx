import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const DragDropPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTopicLabel, setSelectedTopicLabel] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const localUser = localStorage.getItem("user");
  const myUser = JSON.parse(localUser);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const schools = await axios.get('https://senka.valentura.com/api/crm/get-schools', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
        });
        const hotels = await axios.get('https://senka.valentura.com/api/crm/get-hotels', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
        });
        const rehbers = await axios.get('https://senka.valentura.com/api/crm/get-rehbers', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
        });
        const restorans = await axios.get('https://senka.valentura.com/api/crm/get-restorans', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
        });
        setTopics([
          { id: 'Okullar', items: schools.data.data, label: 'Okullar' },
          { id: 'Oteller', items: hotels.data.data, label: 'Oteller' },
          { id: 'Rehberler', items: rehbers.data.data, label: 'Rehberler' },
          { id: 'Restoranlar', items: restorans.data.data, label: 'Restoranlar' }
        ]);
      } catch (error) {
        console.error('Error fetching topics:', error);
        toast.error('Konu bilgileri alınamadı.');
      }
    };
    fetchTopics();
  }, [myUser?.access]);

  useEffect(() => {
    if (selectedTopic) {
      fetchMessages(selectedTopic.name);
    }
  }, [selectedTopic]);

  const fetchMessages = async (filtering) => {
    try {
      const response = await axios.post('https://senka.valentura.com/api/users/pools/get-all-pools', {
        filtering: filtering,
        page: 1,
        page_size: 10
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${myUser?.access}`
        }
      });
      setMessages(response.data.data.items);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Mesajlar alınamadı.');
    }
  };

  const handleSendMessage = async () => {
    const payload = {
      related_to: {
        type: selectedTopicLabel,
        name: selectedTopic.name
      },
      subject,
      message: newMessage
    };
    try {
      if (editingMessageId) {
        await axios.post(`https://senka.valentura.com/api/users/pools/edit-pool/id=${editingMessageId}`, payload, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
        });
        toast.success('Mesaj başarıyla güncellendi.');
      } else {
        await axios.post('https://senka.valentura.com/api/users/pools/add-pool', payload, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
        });
        toast.success('Mesaj başarıyla gönderildi.');
      }
      setNewMessage('');
      setSubject('');
      setEditingMessageId(null);
      fetchMessages(selectedTopic.name);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Mesaj gönderilemedi.');
    }
  };

  const handleEditMessage = (message) => {
    setEditingMessageId(message.id);
    setNewMessage(message.message);
    setSubject(message.subject);
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.get(`https://senka.valentura.com/api/users/pools/delete-pool/id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${myUser?.access}`
        }
      });
      toast.success('Mesaj başarıyla silindi.');
      fetchMessages(selectedTopic.name);
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Mesaj silinemedi.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4 text-center">Konu Seçimi</h1>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {topics.map((topic, index) => (
          <div key={index}>
            <label className="block text-lg font-semibold mb-2">{topic.label}</label>
            <select
              onChange={(e) => {
                const selectedItem = topic.items.find(item => item.id === parseInt(e.target.value));
                setSelectedTopic(selectedItem);
                setSelectedTopicLabel(topic.label);
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Seçiniz</option>
              {topic.items.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-100 rounded shadow-md">
        {selectedTopic ? (
          <div>
            <h2 className="text-xl font-bold mb-2">{selectedTopic.name}</h2>
            <p>{selectedTopic.email}</p>
            <p>{selectedTopic.phone}</p>
            <p>{selectedTopic.address}</p>
            {selectedTopic.contact_persons && selectedTopic.contact_persons.length > 0 && (
              <div>
                <h3 className="font-semibold mt-4">İletişim Kişileri</h3>
                {selectedTopic.contact_persons.map((person) => (
                  <div key={person.id} className="mt-2 p-2 bg-white rounded shadow">
                    <p>{person.name} {person.surname}</p>
                    <p>{person.email}</p>
                    <p>{person.phone}</p>
                    <p>{person.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          'Seçilen Konu Yok'
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Yorumlar</h2>
        <div className="space-y-4">
          {messages.length > 0 ? messages.map((message) => (
            <div key={message.id} className="p-4 bg-white rounded shadow-md">
              <div><strong>İsim:</strong> {message.firstname} {message.lastname}</div>
              <div><strong>Konu:</strong> {message.subject}</div>
              <div><strong>Mesaj:</strong> {message.message}</div>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEditMessage(message)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDeleteMessage(message.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Sil
                </button>
              </div>
            </div>
          )) : (
            <div className="p-4 bg-white rounded shadow-md">Mesaj bulunamadı.</div>
          )}
        </div>
      </div>
      <div className="mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Mesaj Gönder</h2>
        <input
          type="text"
          placeholder="Konu"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          placeholder="Mesaj"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        ></textarea>
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Gönder
        </button>
      </div>
    </div>
  );
};

export default DragDropPage;
