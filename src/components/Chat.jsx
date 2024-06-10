import React, { useEffect, useState, useRef } from 'react';
import { db, auth, storage } from '../../src/backend/Firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Message from './Message';
import SkeletonLoader from './SkeletonLoader';
import toast, { Toaster } from 'react-hot-toast';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(collection(db, "messages"), orderBy("timestamp"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
      });
      return () => unsubscribe();
    } else {
      toast.error("Anda harus login untuk mengakses pesan!", {
        position: "bottom-right",
        duration: 3000,
        className: "bg-red-500 text-white font-semibold"
      });
    }
  }, [auth.currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
  
    if (!auth.currentUser) {
      toast.error("Anda harus login terlebih dahulu untuk mengirim pesan!", {
        position: "bottom-right",
        duration: 3000,
        className: "bg-red-500 text-white font-semibold"
      });
      return;
    }
    if (input.trim() || image) {
      let imageUrl = null;
      if (image) {
        try {
          const imageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(imageRef, image);
          imageUrl = await getDownloadURL(imageRef);
        } catch (error) {
          console.error("Error uploading image: ", error);
          toast.error("Gagal mengunggah gambar. Pastikan Anda memiliki izin yang benar.", {
            position: "bottom-right",
            duration: 3000,
            className: "bg-red-500 text-white font-semibold"
          });
          return;
        }
      }

      await addDoc(collection(db, "messages"), {
        text: input,
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL || 'https://w7.pngwing.com/pngs/306/70/png-transparent-computer-icons-management-admin-silhouette-black-and-white-neck-thumbnail.png',
        timestamp: serverTimestamp(),
        isAdmin: auth.currentUser.email === 'admin@example.com',
        imageUrl: imageUrl || null
      });

      toast.success("Pesan terkirim!", {
        position: "bottom-right",
        duration: 3000,
        className: "bg-blue-500 text-white font-semibold relative -top-40"
      });
    
      setInput("");
      setImage(null);
    }
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <div className="flex flex-col h-screen bottom-10 mt-20 sticky bg-transparent bg-gradient-to-r from-indigo-400 to-sky-700">
      <div className="flex-1 overflow-y-scroll p-4">
        {isLoading ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : (
          messages.map(({ id, text, displayName, photoURL, uid, timestamp, isAdmin, imageUrl }) => (
            <Message
              key={id}
              id={id}
              userName={displayName}
              text={text}
              imageSource={photoURL}
              isOfUser={auth.currentUser.uid === uid}
              createdAt={timestamp?.toDate()}
              isAdmin={isAdmin}
              imageUrl={imageUrl}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex items-center p-2 bg-slate-200 rounded-xl w-96 mx-auto md:w-full border-t border-gray-300">
        <input
          type="file"
          onChange={handleImageChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer p-2">
          <img src="https://img.icons8.com/ios-filled/50/000000/attach.png" alt="Attach" className="w-6 h-6"/>
        </label>
        <input
          value={input}
          placeholder="Tulis pesan..."
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 mx-2 border border-gray-300 rounded-lg outline-none"
        />
        <button type="submit" className="p-2 text-white bg-transparent rounded-full">
          <img src="https://static-00.iconduck.com/assets.00/send-icon-2048x1863-u8j8xnb6.png" alt="Send" className="w-6 h-6"/>
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default Chat;
