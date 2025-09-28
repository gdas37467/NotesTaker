"use client";

import { useEffect, useState } from "react";
import { updateNote,getNotes, createNote, deleteNote } from "../services/notes";
import { useRouter } from 'next/navigation';
import NoteCard from "../components/NoteCard";
import TextEditor from "../components/TextEditor";
import { useAuthStore } from '../store/useAuthStore';


export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [note,setNote] = useState({});
  const [isEditing, setIsEditing] = useState(false);
    // console.log(note)
  const router = useRouter();

  const {clearAuth,user,token,rehydrate} = useAuthStore();
 
  // console.log(user)

  async function fetchNotes() {
    setLoading(true);
    try {
      const data = await getNotes();
      setNotes(data);
    } catch(error)
    {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddNote({title, content}) {
    try{
       await createNote({title,content});
      setShowEditor(false);
       fetchNotes();
    }
    catch (error) {
      console.error('Error saving note:', error);
    }
    
   
  }

  
  
  async function handleDelete(id) {
    await deleteNote(id);
    fetchNotes();
  }
  async function handleUpdateNote(id,title, content) {
    try {
      console.log(typeof(id))
      console.log(title)
      await updateNote(id, title, content );
        setShowEditor(false);
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }
  
  useEffect(() => {
    // hydrate Zustand state from localStorage
    rehydrate();
  }, [rehydrate]);

  useEffect(() => {
    // const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      console.log('Hi')
      router.replace('/signin');
      return;
    }
    fetchNotes();
  }, [router,token]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <div className="flex justify-between items-center mb-0 bg-cyan-500 rounded-sm border-b py-4 px-8">
        <h1 className="text-md font-bold text-gray-800">Keep Notes</h1>
       <div>
          <ul className="flex gap-4 text-sm font-bold">
            <li>About</li>
            <li>Notes</li>
            <li>Contact</li>
            <li onClick={() => {
            
            clearAuth();
            router.replace('/signin');
            return;
          }} className="hover:text-orange-200 ">Logout</li>
          </ul>
       </div>
     
        {/* <button 
          onClick={() => {
            localStorage.removeItem('token');
            router.replace('/signin');
          }}
          className="px-1 py-0 bg-blue-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button> */}
      </div>
    <div className="p-8 max-w-7xl mx-auto bg-orange-50">
      
       <h1 className="text-orange-950 font-bold text-4xl  mb-8  ">Good Morning , {user? user.user_name :''}!</h1>
      
      {!showEditor ? (
        <div 
          className="cursor-pointer p-4 mb-8 rounded-lg border border-gray-300 bg-orange-100 shadow-sm 
          hover:shadow-lg hover:border-blue-400 transition-all duration-300 text-gray-600
          flex items-center space-x-2"
          onClick={() => setShowEditor(true)}
        >
          <span className="text-blue-500">+</span>
          <span className="text-orange-950">Take a note...</span>
        </div>
      ) : (
        <TextEditor
        isEditing = {isEditing}
        note = {note}
          onSave={handleAddNote}
          onUpdate = {handleUpdateNote}
          onClose={() => {setShowEditor(false); setIsEditing(false) ; setNote({})}}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <NoteCard 
            key={note.note_id} 
            note={note} 
           handleEdit={()=>{
              setIsEditing(true);
              setShowEditor(true);
              setNote(note)
            }}
            onDelete={() => handleDelete(note.note_id)}
          />
        ))}
      </div>
    </div>
    </>
  );
}
