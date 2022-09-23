import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';


function CreateArea(props) { //1. Create a constant that keeps track of the title and content.
  //props.onAdd is the function that is passed from the App component.

  const [isExpanded, setIsExpanded] = useState(false);

  const [note, setNote] = useState({ // useState is a hook that allows us to use state in functional components (instead of class components) 
    title:"",// we are using an object to store the title and content of the note
    content:""
  });

  function handleChange(event){
    const {name, value} = event.target;// in the name there are two values: title and content
    // and value the text that the user types in the textarea field

    //setNote is a function thaSt allows us to change the value of the note object.
    setNote(prevValue =>{                //prevValue is the previous value of the note and => is the arrow function 
      return {
        ...prevValue,                   //spread operator. It copies the previous value of the note  and then we can add the new value to it.. because we are not changing the previous value of the note, we are just adding the new value to it. That's why we are using spread operator. if we use = instead of spread operator, then the previous value of the note will be replaced by the new value.
        [name]: value                   //name is title or content and value is the value of the input field. because we have two input fields, we need to use name to differentiate between them. bec we have two input fields, we need to use name to differentiate between them. because we have two input fields, we need to use name to differentiate between them.
      }
    })
  }

  //2. Pass the new note back to the App.
  function sumbitNote(event){

    props.onAdd(note); //pass the new note back to the App.
    setNote({
      title:"",
      content:""
    });
    event.preventDefault();// this is to prevent the page from refreshing when we click the button.
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && <input 
        name="title" 
        onChange={handleChange} 
        value={note.title} 
        placeholder="Title" 
        />
        }
        <textarea 
        name="content" //name is used to identify the input field in the event handler function 
        onChange={handleChange}
        onClick={() => {
          setIsExpanded(true);
        }}//when the user clicks on the textarea field, the setIsExpanded function is called and the value of the isExpanded constant is set to true.
        value={note.content} 
        placeholder="Take a note..." rows={isExpanded ? 3 : 1 } //rows is for the height of the text area
        />
      <Zoom in={isExpanded}>
        <Fab onClick={sumbitNote} ><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
