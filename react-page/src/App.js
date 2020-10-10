
import React,{useState}from 'react'
import Bar from './Bar'
import './App.css'
import constantData from '../src/data/aitag.json';

import Setting from './Setting'

let total;
function App() {

  return (
    <div className="App">
      <Bar name="Icloud Picture Tag"> </Bar>
      <Setting   />
   
    </div>
  );
}

export default App;