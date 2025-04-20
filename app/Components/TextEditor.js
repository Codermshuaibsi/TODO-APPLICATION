"use client";
import { Bold, Italic, AlignRight, AlignCenter, AlignLeft, Trash2Icon, Underline, ArrowLeft, Save } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function TextEditor({ todo, goBack }) {
    const editorRef = useRef(null);
    const [editorContent, setEditorContent] = useState("");

    const applyFormat = (command) => {
        document.execCommand(command, false, null);
        editorRef.current.focus();
    };

    const handleEditorChange = () => {
        const content = editorRef.current.innerHTML;
        setEditorContent(content);
    };

    useEffect(() => {
        if (todo && editorRef.current) {
            editorRef.current.innerHTML = todo.details;
            setEditorContent(todo.details);
        }
    }, [todo]);

    const saveTodo = () => {
        try {
          const response = axios.put(`http://localhost:5000/api/updatetodo/${todo._id}`, {
            details: editorContent
          });
          if (response.status === 200) {
            goBack(); 
          }
        } catch (error) {
          console.error("Error saving todo:", error);
        }
      };
      
  
    const deleteTodo = () => {
        try {
            axios.delete(`http://localhost:5000/api/deletetodo/${todo._id}`); 
            goBack(); 
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    if (!todo) return null;

    return (
        <div
            className="container bg-white mb-5 mt-4 p-4 rounded border position-relative"
            style={{ maxWidth: "800px", zIndex: 1111 }}
        >
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-3">
                    <button onClick={goBack} className="btn btn-sm btn-light">
                        <ArrowLeft size={18} />
                    </button>

                    <h1 className="h5 fw-bold mb-0">New Additions</h1>
                </div>
                <button className="btn btn-sm btn-light" onClick={deleteTodo}>
                    <Trash2Icon size={18} />
                </button>
            </div>

            <div className="d-flex gap-2 border-bottom pb-3 mb-3">
                <button className="btn btn-sm btn-light" onClick={() => applyFormat('bold')}><Bold size={18} /></button>
                <button className="btn btn-sm btn-light" onClick={() => applyFormat('italic')}><Italic size={18} /></button>
                <button className="btn btn-sm btn-light" onClick={() => applyFormat('underline')}><Underline size={18} /></button>
                <button className="btn btn-sm btn-light" onClick={() => applyFormat('justifyright')}><AlignRight size={18} /></button>
                <button className="btn btn-sm btn-light" onClick={() => applyFormat('justifycenter')}><AlignCenter size={18} /></button>
                <button className="btn btn-sm btn-light" onClick={() => applyFormat('justifyleft')}><AlignLeft size={18} /></button>
            </div>

            <div
                ref={editorRef}
                contentEditable
                className="border-none"
                style={{ minHeight: '400px' }}
                suppressContentEditableWarning={true}
                onInput={handleEditorChange}
            />

            {/* Save button */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button onClick={saveTodo} className="btn btn-sm btn-success">
                    <Save size={18} /> Save Todo
                </button>
            </div>
        </div>
    );
}

export default TextEditor;
