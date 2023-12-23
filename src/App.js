import React from 'react';
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';


function App() {
  return(
    <BrowserRouter>
 <div className="App">
  <Header/>
  <ToastContainer position="top-right"/>
  <Routes>
    <Route exact path='/' Component={Home}/>
    <Route path='/add' Component={AddEdit}/>
    <Route path='/about' Component={About}/>
    <Route path='/update/:id' Component={AddEdit}/>
    <Route path='/view/:id' Component={View}/>
  </Routes>
 </div>
 </BrowserRouter>
  );
}

export default App;
