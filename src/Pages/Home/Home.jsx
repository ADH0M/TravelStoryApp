import {  useState } from "react";
import image1 from '../../assets/Trovel_Stories/1.jpg';
import image2 from '../../assets/Trovel_Stories/2.jpg';
import Modal from 'react-modal'
import TravalStoryCard from "../../Components/Cards/TravalStoryCard";
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AddEditTravalStroy from "./AddEditTravalStroy";
import { MdAdd } from "react-icons/md";
import ViewTravelStroy from "./ViewTravelStroy";

const images =[
  {_id:1 ,imageUrl:image1 ,title:'image 1',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'cairo'} ,
  {_id:2, imageUrl:image2 ,title:'image 2',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'desouq'} ,
  {_id:1 ,imageUrl:image1 ,title:'image 1',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'cairo'} ,
  {_id:2, imageUrl:image2 ,title:'image 2',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'desouq'} ,
  {_id:1 ,imageUrl:image1 ,title:'image 1',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'cairo'} ,
  {_id:2, imageUrl:image2 ,title:'image 2',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'desouq'} ,
  {_id:1 ,imageUrl:image1 ,title:'image 1',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'cairo'} ,
  {_id:2, imageUrl:image2 ,title:'image 2',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'desouq'} ,
  {_id:1 ,imageUrl:image1 ,title:'image 1',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'cairo'} ,
  {_id:2, imageUrl:image2 ,title:'image 2',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'desouq'} ,
  {_id:1 ,imageUrl:image1 ,title:'image 1',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'cairo'} ,
  {_id:2, imageUrl:image2 ,title:'image 2',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'desouq'} ,
  {_id:1 ,imageUrl:image1 ,title:'image 1',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'cairo'} ,
  {_id:2, imageUrl:image2 ,title:'image 2',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'desouq'} ,
  {_id:1 ,imageUrl:image1 ,title:'image 1',story:'story' , visiteData:1/1/2023 ,isFavourite:false, location:'cairo'} ,

]

const Home = () => {
  const [openAddEditModal, setopenAddEditModal] =useState({
    isShown:false , type:'add' ,data:null
  });

  const [allStories ,setAllStories] = useState(images);



  const handleViewStroy=(data)=>{
    setViewStroy(prev=>({...prev , data ,shown:true}))
  };

  const handleEdite=(data)=>{
    setopenAddEditModal({type:'update',isShown:true ,data:data});
  };
  

  const updateIsFavourite = async ( data ) => {};
  const getAllTravelStory = async ( data ) => {};

  const [viewStroy , setViewStroy] =useState({
    shown:false ,
    data:null,
  });

  const onClose=()=>{
    setViewStroy((prev)=>({...prev , shown:false}));
  };


  console.log('is open next ', openAddEditModal);


  
  return (
    <div className="homePage mt-4">
      <div className="container py-10 mx-auto ">
        <div className="flex gap-7">
          <div className="flex-1">
              {allStories.length > 0 ?
              (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">
                {allStories.map((item)=>{
                  return <TravalStoryCard 
                  key = {item._id}
                  imageUrl = {item.imageUrl}
                  title={item.title}
                  story={item.story}
                  date={item.visiteData}
                  visiteLoaction={item.isFavorite}
                  onEdite={handleEdite}
                  onClick={()=>handleViewStroy(item)}
                  onFavouriteClick= {()=> updateIsFavourite(item)}
                  isFavourite={item.isFavourite}
                  toast={toast}
                  />
                })}
            </div>
              ):<>empety card here </>}
          </div>
        </div>
      </div>

      <Modal
        key={'item1'}
        isOpen={openAddEditModal.isShown}
        onRequestClose={()=>{setopenAddEditModal(prev=>({...prev, isShown:false}))}}
        style=
          {{ overlay: {
            backgroundColor:"rgba(0,0,0,0.2)",
            zIndex:999,

          } }}

          appElement={document.getElementById('root')}
          className={'modal-box'}
      >
        <AddEditTravalStroy
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={()=>{setopenAddEditModal({isShown:false , type:'add' ,data:null})}}
          getAllTravelStory={getAllTravelStory}
        />
      </Modal>

      <Modal
        key={'item2'}
        isOpen={viewStroy.shown}
        style={{
          overlay:{
            background:'rgba(0,0,0,0.2)',
            zIndex:999
          }
        }}
        onRequestClose={()=>setViewStroy({data:'' ,  shown:false}) }
        appElement={document.getElementById('root')}
        className={'modal-box outline-none' }
      >
        <ViewTravelStroy story={viewStroy} setStory={setViewStroy} onClose={onClose} edit={    
            ()=>{
              setViewStroy(prev=>({...prev ,shown:false}));
              handleEdite(viewStroy.data ||null)
            }
          } />
      </Modal>
  
      <button 
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={()=>{setopenAddEditModal((pre)=>{
          return {...pre , isShown:true}
        })}}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer/>
    </div>
  )
}

export default Home