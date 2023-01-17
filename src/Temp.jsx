import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import {nanoid} from "nanoid"
import { useEffect } from "react";
import TextField from '@mui/material/TextField';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';

export default function Temp() {
    const [text, setText] = useState("")

    const [state, setState] = useState(JSON.parse(localStorage.getItem('tasks')) || [])


    function handleChange(event) {
        setText(event.target.value)
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state))
    }, [state])

    function renderText(text) {
        const obj = {
            id: nanoid(),
            text: text
        }
        setState(prev => [...prev, obj])
    }

    function deleteItem(id) {
        const newState = state.filter(item => item.id !== id)
        setState(newState)
    }

    const elements = state.map(item => {
        return (
            // <Collapse key={item.id}
            //     <h5 key={item.id} onClick={() => deleteItem(item.id)}>{item.text}</h5>
            // </Collapse>
            <Collapse key={item.id}>
                <h5 key={item.id} onClick={() => deleteItem(item.id)}>{item.text}</h5>
            </Collapse>
        )
    })

    return (
        <div className="butt-container">
            <div className="todo--inputs">
                <TextField id="outlined-basic" label="New Task" variant="outlined" className='textfield' size='small' onChange={handleChange} value={text}/>
                <Button 
                    className="butt"
                    variant="contained"
                    onClick={() => {
                        if (text){
                            renderText(text)
                            setText("")
                        }
                    }}
                >
                    Add Task
                </Button>
            </div>
            <TransitionGroup>
                {elements}
            </TransitionGroup>
        </div>
    )
}