import React from 'react'
import Pic from './Pic'
import Tag from './Tag'
let Setting =(propos)=>
{
    
    const {fileUpload, picShow} = Pic({ id: 'PictureUpload' })
    var setting =" "
     setting = propos.type
    


return(

<div className="picBox" >
<div className="content3">
{picShow}
</div>
<div className="content1">
{fileUpload}
<p className="p">
click this button to upload your picture
</p>

</div>
<div className="content2">

<Tag aitag={propos.aitag}/>
</div>

</div>

)




}

export default Setting