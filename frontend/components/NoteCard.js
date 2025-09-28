import parse from 'html-react-parser';

export default function NoteCard({ note, onDelete,handleEdit}) {

     const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="hover:border-2 hover:border-orange-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow my-4 bg-orange-100 relative group">
        
      <h2 className="font-bold text-xl mb-3 text-gray-800">
        {note.note_title}
      </h2>
      <p className="text-gray-600 mb-4">
        <span>{parse(note.note_content)}</span>
      </p>
      <button
            onClick={handleEdit}
            className="absolute top-4 right-16 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-blue-50"
            aria-label="Edit note"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
      <button
        onClick={onDelete}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-red-50"
        aria-label="Delete note"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
       <div className="absolute bottom-2 right-4 text-xs text-gray-400">
        Last updated: {formatDate(note.last_update)}
      </div>
    </div>
  );
}
