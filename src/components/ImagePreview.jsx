import React from 'react'
const ImagePreview = ({image,setImage}) => {
  if(!image) return ;
  return (
    <>

    <div className="flex fixed top-0  bg-black/70 z-[20]  left-0 w-full justify-center items-items min-h-screen">
    <div onClick={()=>setImage(null)}  className="flex fixed top-0 left-0  bg-black w-full h-full z-[10] " />
  <div className=" relative z-[50] flex justify-center w-[300px]  h-[300px] min-h-screen items-center">
<img src={image} alt="problems" />
</div>

</div>
</>
  )
}

export default ImagePreview