import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home.jsx"
import Note from './components/Note/Note';
import About from './components/About';
import AddNote from './components/Note/AddNote'

function App() {

  return (
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path='/about' element ={<About/>}/>
      <Route path="/collection/:id" element = {<Note/>}/>
      <Route path="/collection/:id/newnote" element = {<AddNote/>}/>
    </Routes>
    
  );
}

export default App;
