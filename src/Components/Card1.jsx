import react, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import EditCourse from './EditCourse';
let i=1;
export default function Card1({value,toggle,setToggle}) {
  const [toggle1,setToggle1]=useState(false);
  async function handledelete()
  {
    //console.log(value)
    try{
    const res=await axios.delete(`http://localhost:5000/api/course/${value?._id}`,
    {
      headers:{
        Authorization:localStorage.getItem('jwt')
      }
  
    });
    if(res.data.success===true)
    {
      //console.log(res.data.success);
      setToggle(i++);}

    }
    catch(e)
    {
      //console.log(e);
    }
  }
 function handleedit()
{
  setToggle1(true);
}
  return (
    <>
    <div className="cardcontainer  rounded-xl   ">
    <Card sx={{ maxWidth:320 ,minWidth:320 }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={value?.main_url}
          alt="green iguana"
        />
        <CardContent className=' bg-[#E6F5FA] '>
          <Typography gutterBottom variant="h5" className="heading-class" component="div">
          <span className='heading  text-xl '>{value.name}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <span className='para text-md text-black '>{value.description}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className='   bg-[#E6F5FA]  ' style={{paddingBottom:"18px"}} >
        <Button size="small" color="primary">
          <span  className='knowmorebtn text-md  font-semibold  normal-case   ' style={{width:"140px"}} >Know more</span>
        </Button>
      </CardActions>
    </Card>
    <div className=' m-2  flex justify-between '>
    <button onClick={handleedit} className='px-3 py-1  text-xl  bg-green-500 text-white rounded-md '>Edit</button>
    <button onClick={handledelete} className='px-3 py-1  text-xl  bg-red-500 text-white rounded-md' >Delete</button>
   <EditCourse toggle1={toggle1} setToggle1={setToggle1} setToggle={setToggle} value={value} />
  </div>
    </div>
  
    </>
  );
}

