import React, { useState } from 'react'
import './tag.css'
import {Button} from 'react-bootstrap'
let ta


let Tag =(e)=>
{let [ai,seta]=useState()

let t
let [clas , setclas]=useState()
 let [text,setText]=useState()    
    let handlechange =(e)=>
    {
    ta=e.target.value
    }

    let handlesubmit=(e)=>
    {
        e.preventDefault()

        setText(ta)
        return(text)
    }


    let meta = new FormData()



   function piclist(picture ){
    meta.append("pictures", picture)
    meta.append('tags',ta)
    }

    const PictureStore = () => {
       
        const pictures = Array.from(document.getElementById('PictureUpload').files)
        
        pictures.forEach(piclist)
        if (pictures.length <= 0) {
          window.alert('Upload a picture to star');
          return;
        }

      fetch("http://localhost:3006/", {
          method: "POST",
          body: meta
        })
        .then(function(res) {
          return res.json();
      }).then(function (data) {
     
        seta(data) 

      }).catch()



      }


  return (
<div className="tag">
<h1></h1>
    <form onSubmit={handlesubmit}>
      <input type="text" className="tagText" onChange={handlechange}>
   </input>   

   <input type="submit" className="tagb" value="submit"  onSubmit={handlesubmit} onClick={PictureStore}>
   </input>  
    </form>
    <div className="tagc">

  <div className="aiTag"  >
    <p>
    The AI label the picture as:
    </p>
    <p className="aip" >
     
      {ai} 
 
    </p>
  
  </div>
    </div>
 
  
 
</div>

    )
}
export default Tag