"use client";
import React, { useEffect, useState } from 'react';
import { ListPlus, Search } from 'lucide-react';
import axios from 'axios';

const Todos = ({ onSelectTodo }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchBtn, setSearchBtn] = useState(false);

    const fetchTodos = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/alltodos");
            setData(res.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const handleAddTodo = async () => {
        try {
            const newTodo = { details: "New Todo created" };
            const response = await axios.post("http://localhost:5000/api/addtodo", newTodo);
            if (response.status === 200) {
                await fetchTodos(); 
            }
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [handleAddTodo])



    const handleSearchButton = () => setSearchBtn(!searchBtn);

    const filteredTodos = data.filter((todo) =>
        todo.details.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4 p-3">
            <div className="d-flex justify-content-between align-items-center">
                <button onClick={handleAddTodo} className="btn btn-sm btn-dark">
                    <ListPlus /> <span className="ms-1">Todo</span>
                </button>

                <div className="d-flex align-items-center gap-2">
                    <button onClick={handleSearchButton} className="btn btn-sm btn-light">
                        <Search />
                    </button>
                    {searchBtn && (
                        <input
                            type="search"
                            placeholder="Search todos"
                            className="form-control form-control-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: "200px", transition: "all 0.3s" }}
                        />
                    )}
                </div>
            </div>

            <div className="d-flex flex-column mt-3">
                {filteredTodos.map((d, i) => (
                    <div
                        key={i}
                        className="card border border-2 p-2 border-black my-3"
                        style={{ cursor: "pointer", position: "relative" }}
                        onClick={() => onSelectTodo(d)}
                    >
                        <h2 className="fs-5 fw-bold">New Todo</h2>
                        <p className="mb-0">{d.details}</p>
                        <p className="position-absolute end-0 bottom-0 m-2 text-muted" style={{ fontSize: "0.8rem" }}>
                            {new Date(d.date).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todos;
