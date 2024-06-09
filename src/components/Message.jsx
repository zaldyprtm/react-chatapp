import React from 'react';
import { auth, db } from '../../src/backend/Firebase';
import { doc, deleteDoc } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';

const Message = ({ id, userName, text, imageSource, isOfUser, createdAt, isAdmin }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "messages", id));
      toast.success("Pesan dihapus", {
        position: "bottom-right",
        duration: 3000,
        className: "bg-red-500 text-white font-semibold relative -top-40"
      });
    } catch (error) {
      console.error("Error deleting message: ", error);
      toast.error("Gagal menghapus pesan", {
        position: "top-right",
        duration: 3000,
        className: "bg-red-500 text-white font-semibold"
      });
    }
  };

  return (
    <>
      <div className={`message ${isOfUser ? 'chat-end' : 'chat-start'} p-2 m-2 rounded-lg shadow-xl bg-sky-300 text-black mb-5 hover:bg-sky-500 transition duration-300`}>
        <div className="flex items-center space-x-2">
          <img className="w-10 h-10 rounded-full hover:scale-125 transition duration-300" src={imageSource} alt={`${userName}'s avatar`} />
          <div>
            <p className="font-bold">{userName}{isAdmin && ' (Admin)'}</p>
            <p className="text-xs text-slate-900 font-semibolds">{createdAt ? new Date(createdAt).toLocaleString() : ''}</p>
          </div>
          {(isOfUser || isAdmin) && (
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
      <Toaster />
    </>
  );
};

export default Message;
