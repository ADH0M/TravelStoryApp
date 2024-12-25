import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/images/about.jpg';
import image2 from '../../assets/images/vestrahorn.jpg';
import { useState } from 'react';

import DragAndDropTasks from './DragAndDrop/Page';
import Shown from './Inputs/Shown';
import DragAndDropComponent from './Inputs/DragAndDropComponent';

import DragAndDrop from './DragAndDrop';
import Part3 from './part3/Part3';
import DndPage from './part3/Try/DndPage';
import KanbanPage from '../../KanbanSection/KanbanPage';


const images =[
   {_id:1 ,imageUrl:image1 ,title:'image 1',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'cairo'}, 
   {_id:2, imageUrl:image2 ,title:'image 2',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'desouq'},
   {_id:3 ,imageUrl:image1 ,title:'image 3',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'cairo'} 


];

const BestImgs = () => {
    const navigate = useNavigate('/');
    const [currentImages ,setCurrentIamges] = useState(images);
    const [dropImg ,setDropImg]=useState([]);

    const handleDrop = (e)=>{
        const indexImg = e.dataTransfer.getData('element');
        const element = currentImages[indexImg];

        if(!dropImg.some(item => item._id === element._id)){
            setDropImg(prev =>([...prev , element]));
            setCurrentIamges(prev=> prev.filter((item ) => item._id !== element._id));
        };
        
    };

    
    

    return (
    <section>
        <div className='bg-login-bg-img w-full h-[50vh] bg-cover bg-center relative z-40 flex justify-center items-center'>
            <span className='over-lay'></span>
            <div className='z-20 w-fit p-2'>
                <h3 className='text-3xl font-semibold text-primary opacity-80'>Hello there !</h3>
                <button 
                className='w-full m-auto text-secondary opacity-60 text-lg font-semibold uppercase'
                onClick={()=>navigate('/')}
                >home</button>
            </div>
        </div>

        <div className='h-[100vh] mt-0 bg-cyan-50 relative p-2'>
            <div className='w-full grid md:grid-cols-3 gap-3 mb-3' >
                {currentImages.map((img ,index) =>{
                    return(
                            <div 
                                key={img._id} 
                                className='w-full rounded-lg relative' 
                                draggable='true' 
                                onDragStart={(e)=>{
                                    e.dataTransfer.setData('element' ,index);
                                }}

                                id={`drag${index}`}>
                                <img src={img.imageUrl} alt="" className='rounded-lg'/>
                                <span className=' flex justify-center p-2  '>{'img '+ (index + 1) }</span>
                            </div>
                        )
                })}
            </div>

            {/* <div className='relative border border-rose-900 w-full h-[350px] items-center justify-cente overflow-hidden p-4 gap-2 p-2 rounded-lg h-[300px]'
            // onDragOver={(e)=>e.preventDefault()}
            // onDrop={handleDrop}
            >
                <DragAndDropTasks/>
                

            </div> */}
            
            <div className='h-fit mb-32 w-full overflow-hidden  mt-4 '>
                {/* <DragAndDropComponent /> */}
                {/* <KanbanPage/> */}
                <DragAndDrop/>
                {/* <Part3 /> */}
            </div>

            {/* <div className='h-[100vh] mt-0 bg-cyan-50 relative p-2'>
                <DndPage/>
            </div> */}


        </div>
 
    </section>
  )
}

export default BestImgs