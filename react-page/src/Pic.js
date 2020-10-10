import React, { useState,useRef, useReducer } from 'react'
import {Image} from 'react-bootstrap'
import './pic.css'

let i
let  Pic = (props) => {
  const {
    id = true
  } = props
  const ref = useRef()
  const [u, blockUpdate] = useReducer(s => s + 1, 1)
    const [tag, setTag] = useState([])
  const pL= useRef([])
  const setpL = (v) => {
    pL.current = v
      blockUpdate()
  }


function plist(element)
{

      i++
      const tempList = []
      const key = i
        tempList.push(
        {
          name: element.name,
          key: key
        }
        )
        setpL(tempList)
        setTag(tempList.map(i => ''))
        const index = tempList.length - 1
        const read = new FileReader()
        read.readAsDataURL(element)
        read.onload = function () 
        {
          const tmpList = pL.current
          tmpList[index].src = this.result
          setpL(tmpList)
        }

    
}

let handleClick = (e)=>
{
  console.log(e.target)
  e.preventDefault()
}

  
  const pickPicture = (e) => {
    const files = document.getElementById(props.id).files
    Array.from(files).forEach(plist)
    e.preventDefault()
  }



  const objPicture = {
    id,    
    onChange: pickPicture
  }



  const fileUpload =
   <div>
    <input type="file" className="fup" accept="image/*"{...objPicture} />
  </div>



  const picShow = <div className="picBox">
    {
      pL.current.map((p, index) => (
        <div>
          {p.src ?
            <React.Fragment>
              <Image src={p.src} thumbnail className="pic" onClick={handleClick} />
            </React.Fragment>
            : <div ></div>}
        </div>
      ))
    }
  </div>



  return {
    fileUpload:  fileUpload,
    picShow: picShow,
    tag
  }
}
export default Pic