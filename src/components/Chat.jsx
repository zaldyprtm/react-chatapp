import React, { useEffect, useState } from 'react';
import { db, auth } from '../../src/backend/Firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Message from './Message';
import toast, { Toaster } from 'react-hot-toast';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      await addDoc(collection(db, "messages"), {
        text: input,
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        timestamp: serverTimestamp(),
        isAdmin: auth.currentUser.email === 'admin@example.com'  // Tambahkan status isAdmin
      });
      toast.success("Pesan terkirim!", {
        position: "bottom-right",
        duration: 3000,
        className: "bg-blue-500 text-white font-semibold relative -top-36"
      });
      setInput("");
    }
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <div className="flex flex-col h-screen bottom-0 sticky bg-transparent bg-gradient-to-r from-indigo-400 to-sky-700">
      <div className="flex-1 overflow-y-scroll p-4">
        {messages.map(({ id, text, displayName, photoURL, uid, timestamp, isAdmin }) => (
          <Message
            key={id}
            id={id}
            userName={displayName}
            text={text}
            imageSource={photoURL}
            isOfUser={auth.currentUser.uid === uid}
            createdAt={timestamp?.toDate()}
            isAdmin={isAdmin}  // Pastikan status isAdmin diteruskan
          />
        ))}
      </div>
      <form onSubmit={sendMessage} className="bg-sky-400 rounded-xl p-4 flex">
        <input
          value={input}
          placeholder='Tulis pesan...'
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-2xl border border-gray-400"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-xl ml-2 font-bold">Kirim</button>
      </form>
 
    </div>
  );
};

export default Chat;
