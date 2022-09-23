import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      dkeeper.createNote(newNote.title, newNote.content);
      return [newNote, ...prevNotes];
    });
  }


  // useing useEffect to get all notes from the blockchain and display them on the page 
  //useEffect is a hook that runs after the first render of the page 
  useEffect(() => {
    console.log("useEffect");
    fetchData();
}, []);

  async function fetchData() {
    const notesArray = await dkeeper.readNote();
    setNotes(notesArray);
  }



  //4. Delete the note from the App.
  //we are passing the id of the note that we want to delete to the onDelete function.

  function deleteNote(id) {
    dkeeper.removeNote(id);
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {/* //3. Render the notes. */}
      {/* //we are passing the notes array to the Note component 
      //and then we are mapping through the array and rendering each note 
      // noteItem is the name of the array item. 
      // index in map is a second parameter that is the index of the array item.when we are mapping through the array, we are passing the index of the array item to the Note component as a key. 
      // can be used as a unique identifier for the array item. 
      // which help in deleting the note from the App.
      */}
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote} //we are passing the onDelete function to the Note component so that we can delete the note from the App.
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
