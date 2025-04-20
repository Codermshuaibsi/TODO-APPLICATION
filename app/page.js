"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import TextEditor from './Components/TextEditor';
import Todos from './Components/Todos';
import { useState } from 'react';
export default function Home() {
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleSelectTodo = (todo) => setSelectedTodo(todo);
  const handleBack = () => setSelectedTodo(null);

  return (
    <div className="bg-light">
      <div className="row px-3 mx-0">
       
        <div
          className={`col-12 col-md-5 ${selectedTodo ? 'd-none d-md-block' : ''}`}
          style={{ zIndex: selectedTodo ? -1 : 1 }}
        >
          <Todos onSelectTodo={handleSelectTodo} />
        </div>

  
        <div className="d-none d-md-block col-md-1" />

       
        <div
          className={`col-12 col-md-6 ${selectedTodo ? '' : 'd-none d-md-block'}`}
          style={{ zIndex: selectedTodo ? 1111 : 1 }}
        >
          <TextEditor todo={selectedTodo} goBack={handleBack} />
        </div>
      </div>
    </div>
  );
}
