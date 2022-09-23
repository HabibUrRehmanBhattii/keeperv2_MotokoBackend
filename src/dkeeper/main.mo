import List "mo:base/List" ;
import Debug "mo:base/Debug" ;



actor Dkeeper {
  public type Note = {
    title: Text; // title of the note (unique). Text is a type alias for String
    content: Text;// content of the note (can be empty) 
   };

  stable var notes: List.List<Note> = List.nil<Note>();

  // add a note to the list of notes
  public func createNote(titleText: Text, contentText: Text){

    // create a new note
    let newNote: Note ={
      title = titleText;
      content = contentText;
    };

    // add the new note to the list of notes
    // notes := List.cons<Note>(newNote, notes);
    notes := List.push(newNote, notes);// push is an alias for cons which is more intuitive for some people

    // print the list of notes
    Debug.print(debug_show(notes));
  };

  // get a note from the list of notes and convert into Array
   public query func readNote(): async [Note]{// query means that the function can be called from the outside (i.e. from the front-end)
   //async is used  to return a future (i.e. a promise) that will be resolved when the function is done
   return  List.toArray(notes);// convert the list of notes into an array of notes (which is a type that can be sent to the front-end) 

   };

    // link deleteNote from the front-end to the back-end
    public func removeNote (id: Nat){
      // take , drop and append are functions that can be used to manipulate lists
      let listFront  = List.take(notes, id);
      let listBack = List.drop(notes, id + 1);
      notes := List.append(listFront, listBack);
      

    };
  
};

