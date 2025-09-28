import api from "../lib/axios";

export async function getNotes() {
  const { data } = await api.get("/notes/");
  console.log(data);
  return data;
}

export async function createNote(title, content) {
  const { data } = await api.post("/notes/",  title, content );
  
  return data;
}

export async function updateNote(id, title, content) {
    console.log(id)
    console.log(typeof(id))
    console.log(title)
    console.log(content)
  const { data } = await api.put(`/notes/${id}`,  {title, content} );
  return data;
}

export async function deleteNote(id) {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
}

