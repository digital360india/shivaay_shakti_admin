import React from 'react'
import Popup from 'reactjs-popup'
const SurveyPreview = ({data,toggle,setToggle}) => {
  return (
    <>
     <Popup
     open={toggle}
     closeOnDocumentClick={false}
     closeOnEscape={false}
     contentStyle={{
       width: "90vw",
       height: "95vh",
       overflow: "hidden",
       padding: "30px",
       backdropFilter: "blur(5px)",
       overflow: "scroll",
       backgroundColor: "red",
     }}
     position="center center"
   >
     <button
          onClick={() => setToggle(false)}
          className=" absolute top-2 right-2 p-2   text-3xl font-semibold bg-black text-white "
        >  X
        </button>
            <div className=' w-full h-full  text-white text-left text-xl '>
                <table cellPadding={5} cellSpacing={5}  className='w-full  ' >
                   <tr className=' border border-white' >
                    <th className=' text-black border border-white   '>Name</th>
                    <td>{data?.name}</td>
                   </tr>
                   <tr className=' border border-white' >
                    <th className=' text-black border border-white   '>Contact</th>
                    <td>{data?.contact}</td>
                   </tr>
                   <tr className=' border border-white' >
                    <th className=' text-black border border-white   '>Email</th>
                    <td>{data?.email}</td>
                   </tr>
                   <tr className=' border border-white'>
                    <th className=' text-black   border border-white '>Birth Date</th>
                    <td>{data?.born}</td>
                   </tr>
                   <tr className=' border border-white'>
                    <th className=' text-black  border border-white '>Country</th>
                    <td>{data?.country}</td>
                   </tr>
                   <tr className=' border border-white'>
                    <th className=' text-black  border border-white '>Gender</th>
                    <td>{data?.gender}</td>
                   </tr>
                   <tr className=' border border-white'>
                    <th className=' text-black  border border-white  '>Specific Gender</th>
                    <td>{data?.sgender|| "-"}</td>
                   </tr>
                   <tr className=' border border-white'>
                    <th className=' text-black  border border-white  '>Height (inches)</th>
                    <td>{data?.height}</td>
                   </tr>
                   <tr className=' border border-white'>
                    <th className=' text-black   border border-white '>Weight (Kg)</th>
                    <td>{data?.weight}</td>
                   </tr>
                   <tr className=' border border-white'>
                    <th className=' text-black  border border-white '>Level</th>
                    <td>{data?.level}</td>
                   </tr>
                   <tr className=' border border-white'>
                    <th className='text-black  border border-white  '>Goals</th>
                    <td>{data?.goals?.map(v=>
                       <span>{v},</span> 
                        )}</td>
                   </tr>
                   <tr className=' border border-white'>
                    <th className=' text-black  border border-white '>Specific Goals</th>
                    <td>{data?.gspecify}</td>
                   </tr>
                   <tr className=' border border-white'>
                    <th className=' text-black  border border-white  '>Daily Life Looks</th>
                    <td className=' text-white '>
                    {data?.daily_life?.map(v=>
                    <>
                       <span>{v},</span>
                       </>
                        )}
                        </td> 
                   
                   </tr>
                   <tr className=' border border-white'>
                    <th className=' text-black  border border-white   '>Morning</th>
                    <td> {data?.morning?.map(v=>
                      <span>{v},</span>
                        )}</td>
                   </tr>
                   <tr className=' border border-white'>
                    <th className=' text-black  border border-white '>Evening</th>
                    <td>{data?.evening?.map(v=>
                       <span>{v}</span> 
                        )}</td>
                   </tr>
                </table>
            </div>
        

    </Popup>
    </>
  )
}

export default SurveyPreview
