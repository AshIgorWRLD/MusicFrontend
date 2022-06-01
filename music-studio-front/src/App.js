import React from 'react'
import './styles/App.css'
import About from "./pages/About";
import {BrowserRouter, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Route path="/about">
                <About/>
            </Route>
        </BrowserRouter>
    )
}

export default App;
