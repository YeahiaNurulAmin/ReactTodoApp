import ToDo from "./components/ToDo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { ContextTodos } from "./contexts/contextTodos";
import { useState } from "react";


// Metarial UI them
const theme = createTheme({
    palette: {
        primary: {
            main: "#5fa9fe",
        },
        secondary: {
            main: "#ffff",
        },
    },
    typography: {
    fontFamily: "playwrite",
  },
});


//* ====Main App==== */
function App() {
  let [arrTodos, setArrTodos] = useState(() => {
    // Load from localStorage (if available)
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
    return (
        <>
          <ContextTodos.Provider value={{arrTodos, setArrTodos}}>
            <ThemeProvider theme={theme}>
                <h1 style={{fontFamily: "marker", padding: "5px 0 5px", margin: "0"}} className="mainHeader">To Do List</h1>
                <ToDo />
            </ThemeProvider>
          </ContextTodos.Provider>
            
        </>
    );
}

export default App;
