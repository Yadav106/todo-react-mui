import React from "react";
import { Button, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import {nanoid} from "nanoid"
import { useEffect } from "react";
import TextField from '@mui/material/TextField';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import {AppBar, Toolbar} from "@mui/material"
import ToggleButton from '@mui/material/ToggleButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Temp() {

    const [text, setText] = useState("")
    const [state, setState] = useState(JSON.parse(localStorage.getItem('tasks')) || [])
    const [isDark, setisDark] = useState(JSON.parse(localStorage.getItem('theme')) || false)

    function handleChange(event) {
        setText(event.target.value)
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state))
    }, [state])

    useEffect(() => {
      localStorage.setItem('theme', JSON.stringify(isDark))
    }, [isDark])

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

    function editItem(id) {
      const newTask = prompt("Edit Task")
      if(newTask) {
        const newData = state.map(data => {
          if (data.id === id){
            data.text = newTask
          }
          return data
        })
        setState(newData)
      }
    }

    function handleToggle() {
      setisDark(prev => !prev)
    }

    const elements = state.map(item => {
        return (
            <Collapse key={item.id} className="collapse" style={{background: isDark ? "#5a48a7" : ""}}>
                <Typography
                  className="taskItem"  
                  variant="h6"
                >
                  {item.text}
                </Typography>
                <DeleteIcon color="error" onClick={() => deleteItem(item.id)} style={{cursor: "pointer"}}/>
                <EditIcon className="editIcon" onClick={() => editItem(item.id)}/>
            </Collapse>
        )
    })

    return (
        <div className="page" style={{background: isDark ? "#311b92" : ""}}>
          <CssBaseline />
          {/* Top Bar */}
          <AppBar position="relative" style={{background: isDark ? "#221266" : ""}}>
            <Toolbar className="toolbar">
              <div style={{display: "flex"}}>
                <ListAltIcon style={{marginRight: "10px"}} />
                <Typography>To-Do</Typography>
              </div>
              <ToggleButton value="darkMode" selected={isDark} onClick={handleToggle} className="toggle--button">
                {
                  isDark
                  ?
                  <DarkModeIcon color="secondary"/>
                  :
                  <LightModeIcon />
                }
              </ToggleButton>
            </Toolbar>
          </AppBar>
          

          <main>
              <div className="todo--inputs">
                  <TextField 
                    label="New Task" 
                    variant="outlined" 
                    className='textfield' 
                    onChange={handleChange} 
                    value={text}
                    color={isDark ? "secondary" : "primary"}
                    style={{background : isDark ? "#5a48a7" : "", borderRadius:"4px"}}
                  />
                  <Button 
                      className="butt"
                      variant="contained"
                      onClick={() => {
                          if (text){
                              renderText(text)
                              setText("")
                          }
                      }}
                      style={{background: isDark ? "#5a48a7" : ""}}
                  >
                      <Typography variant="h4" style={{color: "black"}}>+</Typography>
                  </Button>
              </div>
              <TransitionGroup>
                  {elements}
              </TransitionGroup>
          </main>
        </div>
    )
}