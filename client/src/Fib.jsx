import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [tempIndex, setTempIndex] = useState("")
    const [index, setIndex] = useState("");

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, []);

    const fetchValues = async () => {
        const response = await axios.get("/api/values/current");
        setValues(response.data);
    };

    const fetchIndexes = async () => {
        const response = await axios.get("/api/values/all");
        setSeenIndexes(response.data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //check if valid number or empty
        if (isNaN(index) || index === "") {
            return alert("Please enter a valid number");
        }
        // check if number is in the range of 0 to 40
        if (index < 0 || index > 40) {
            return alert("Please enter a number between 0 and 40");
        }
        //check if index already exists
        if (seenIndexes.find((seenIndex) => seenIndex.number === parseInt(index))) {
            return alert("Index already exists");
        }
        
        await axios.post("/api/values", { index });
        setTempIndex(index);
        setIndex("");
        fetchValues(); // Fetch updated values after submitting
        fetchIndexes(); // Fetch updated indexes after submitting
    };

    const renderSeenIndexes = () => {
        return seenIndexes.map(({ number }) => number).join(", ");
    };

    const redderColor = (key) => {
        if (key === tempIndex) {
            return "yellow";
        }
        if (key === index) {
            return "green";
        }

    };

    const renderValues = () => {
        return Object.entries(values).map(([key, value]) => (
            <div key={key}>
                <span style={{ color: redderColor(key) }}>
                    For index {key}, I calculated {value}
                </span>
            </div>
        ));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input
                    type="number"
                    value={index}
                    onChange={(event) => setIndex(event.target.value)}
                />
                <button>Submit</button>
            </form>
            <h3>Indexes I have seen: </h3>
            {renderSeenIndexes()}
            <h3>Calculated Values:</h3>
            {renderValues()}
        </div>
    );
};

export default Fib;
