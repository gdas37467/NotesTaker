'use client';
import { useState, useRef ,useEffect} from 'react';

export default function SimpleEditor({ onSave, onClose, onUpdate, isEditing, note }) {
  const [title, setTitle] = useState(note.note_title);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && note.note_content) {
      editorRef.current.innerHTML = note.note_content;
    }
  }, [note]);

  console.log(title)
  console.log(editorRef)

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleSave = () => {
    const content = editorRef.current.innerHTML;
    onSave({ title, content });
    setTitle('');
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  const handleUpdateNote = () =>{
   const content = editorRef.current.innerHTML;
    onUpdate(note.note_id , title, content);
    setTitle('');
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  }
const handleClose = () => {
    setTitle('');
    if (editorRef.current) {
        editorRef.current.innerHTML = '';
    }
    onClose();
};

return (
    <div className="bg-orange-100 border border-gray-200 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto my-6">
        <div className="editor-header mb-4">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-semibold border-b-2 border-orange-700 w-full mb-4 pb-2 focus:outline-none focus:border-orange-800 transition-colors duration-200"
            />
            <div className="flex space-x-3 mb-4">
                <button onClick={() => handleFormat('bold')} title="Bold" className="px-3.5 py-1.5 border border-gray-300 rounded-md hover:bg-orange-600 transition-colors duration-200 font-semibold">B</button>
                <button onClick={() => handleFormat('italic')} title="Italic" className="px-3.5 py-1.5 border border-gray-300 rounded-md hover:bg-orange-600 transition-colors duration-200 italic">I</button>
                <button onClick={() => handleFormat('underline')} title="Underline" className="px-3.5 py-1.5 border border-gray-300 rounded-md hover:bg-orange-600 transition-colors duration-200 underline">U</button>
                
            </div>
        </div>
        <div
            ref={editorRef}
            className="min-h-[150px] border border-orange-400 p-4 mb-4 rounded-md focus:outline-none focus:border-orange-800 focus:ring-1 focus:ring-orange-800 overflow-auto transition-colors duration-200"
            contentEditable
            placeholder="Take a note..."
        />
        <div className="flex justify-end space-x-3">
            <button onClick={isEditing ? handleUpdateNote : handleSave } className="px-8 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium">Add</button>
            <button onClick={handleClose} className="px-8 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 font-medium">Close</button>
        </div>
    </div>
);
}