import React from 'react'
import Popup from 'reactjs-popup'


function ArticlePreview({toggle1,setToggle1,value}) {
  return (
   <>
  <Popup
        open={toggle1}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{
          width: "90vw",
          height: "90vh",
          overflow: "hidden",
          padding: "30px",
          backdropFilter: "blur(5px)",
          overflow: "scroll",
          backgroundColor: "black",
        }}
        position="center center"
        >
       <div className=" w-[80vw] mx-auto overflow-scroll pt-12   scrollbar-hide  ">
        <div className="carousel-cell h-[400px] w-[88vw] sm:w-[70vw] mx-12 relative overflow-hidden">
          <div className="absolute w-[100%] md:w-[50%] rounded-2xl h-[99%] left-0 top-0 bg-[#4CAF7440] text-white grid place-content-center ">
            <div className=" w-[80%] sm:w-[70%] mx-auto space-y-2 sm:space-y-6">
              <p className="text-4xl ">{value?.heading}</p>
              <p>
               {value?.description}
              </p>
            </div>
          </div>
          <img
            src={value?.articleimg}
            alt=""
            className="h-[400px] w-[70vw] object-cover   rounded-2xl "
          />
        </div>
        <button
          onClick={() => setToggle1(false)}
          className=" absolute top-2 right-2 p-2   text-3xl font-semibold bg-black text-white "
        >
          X
        </button>
    </div>
   </Popup>
   </>
  )
}

export default ArticlePreview
