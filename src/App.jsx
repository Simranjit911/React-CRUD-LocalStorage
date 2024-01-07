import React from "react";
import { useEffect } from "react";
import { useState } from "react";
//Local Storage function
function getLocal(){
let list=localStorage.getItem("list")
if(list){
  return (list=JSON.parse(localStorage.getItem("list")))
}else{
  return []
}
}
function App() {
  //Variables
  let [name, setname] = useState("");
  let [list, setlist] = useState(getLocal());
  let [edit, setedit] = useState(false);
  let [editId, seteditId] = useState(null);

  //Setting data in local storage
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
  },[list])

  //function to handle input and edit function
  function handle(e) {
    e.preventDefault();
    if (!name) {
      alert("Enter Something");
    }

    //edit condition
    else if (name && edit) {
      setlist(list.map((i) => {
          if (i.id == editId) {
            return { ...i, title: name };
          }
          return i;
        })
      );
      seteditId(null);
      setedit(false);
      setname("");
    }
     //Adding new todo
    else {
      let newI = { id: new Date().getTime(), title: name };
      setlist([...list, newI]);
      console.log("name")
      setname("");
    }
  }

  //to delete
  function del(id){
    setlist(list.filter((it)=>it.id!=id))
  }

  //to set edit
  function editIt(id){
    let sel=list.find((i)=>i.id==id)
    seteditId(id)
    setedit(true)
    setname(sel.title)
    
  }
  return (
    <div className="h-fit bg-blue-400 text-center">
      <p>Todo App with Localstorage</p>
      <form onSubmit={handle}>
        <input
          type="text"
          value={name}
          placeholder="Enter Something"
          onChange={(e) => setname(e.target.value)}
        />
        <button className="bg-gray-500 rounded-md px-2 shadow-xl cursor-pointer" type="submit">{edit ? "Edit" : "Add"}</button>
      </form>
      <ol className="m-auto flex flex-col">{
        list.map((i,id)=>{
          return <li className="m-auto rounded-md shadow-xl p-1 bg-sky-800 my-2 flex gap-3" key={id}>
            <p>{id+1}</p>
            <p>{i.title}</p>
            <button className="bg-gray-500 rounded-md px-2 shadow-xl cursor-pointer" onClick={()=>editIt(i.id)}>Update</button>
            <button className="bg-gray-500 rounded-md px-2 shadow-xl cursor-pointer" onClick={()=>del(i.id)}>Del</button>

          </li>
        })
      }
      </ol>
    </div>
  );
}

export default App;
