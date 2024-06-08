import React from 'react';
import { auth, db } from '../../src/backend/Firebase';
import { doc, deleteDoc } from "firebase/firestore";

const Message = ({ id, userName, text, imageSource, isOfUser, createdAt }) => {
  
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "messages", id));
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };

  return (
    <div className={`message ${isOfUser ? 'chat-end' : 'chat-start'} p-2 m-2 rounded-lg shadow-xl bg-sky-300 text-black mb-5`}>
      <div className="flex items-center space-x-2">
        <img className="w-10 h-10 rounded-full" src={imageSource} alt={`${userName}'s avatar`} />
        <div>
          <p className="font-bold">{userName}</p>
          <p className="text-xs text-slate-900 font-semibolds">{new Date(createdAt).toLocaleString()}</p>
          <p></p>
        </div>
        {isOfUser && (
          <button
            className="ml-2 bg-red-500 text-white text-xs p-1 rounded"
            onClick={handleDelete}
          >
            Hapus
          </button>
        )}
      </div>
      <p className="mt-2">{text}</p>
    </div>
  );
};

export default Message;
