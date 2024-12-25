import { MdAdd, MdClose, MdDelete, MdUpdate } from 'react-icons/md'
import DataSelector from '../../Components/layout/DataSelector'
import { useState } from 'react'
import ImageSelector from '../../Components/layout/ImageSelector';
import WebcamCapture from '../../Components/layout/WebCapImg';
import TagInputs from '../../Components/layout/TagInputs';

const AddEditTravalStroy = ({
    storyInfo, 
    type, 
    onClose,
    getAllTravelStory
}) => {
    const [changeDate ,setChangeDate] =useState(null);
    const [titel , setTitle ] =useState(storyInfo?.title || '')
  return (
    <div className=''>
        <div  className=' flex justify-between '>
        <h4 className='capitalize text-xl font-semibold text-gray-700'>
                {type === 'add' ? 'add Stroy ' :'update story'}
        </h4>
        <div className='flex items-center gap-2'>

                {type ==='add' ? 
                    (<>
                        <p className='inline-flex  items-center border text-primary border-primary bg-cyan-50 px-2 rounded-md hover:bg-white hover:text-cyan-800 cursor-pointer'>
                            <MdAdd className=' text-lg '/>
                            Add Stroy
                        </p>
                        <MdClose className='text-gray-500 text-xl cursor-pointer hover:text-rose-400 w-7' onClick={onClose}/>
                
                    </>)
                :
                    (<>
                        
                        <p className='small-btn text-rose-500 bg-rose-100 hover:bg-rose-200 hover:border-rose-300 '>
                            <MdDelete className='mr-1'/>
                            Delete
                        </p>
                        <MdClose className='text-gray-500 text-xl cursor-pointer hover:text-rose-400 w-7' onClick={onClose}/>
                
                    </>)
                }
        </div>
        </div>
        
        <div className='mt-7'>
                <h6 className='text-slate-400 capitalize py-3' >
                    tiltle
                </h6>
                <input type="text" name='title-input' placeholder='A Day at the Great Wall' 
                    value={titel}
                    onChange={(e)=>{setTitle( e.target.value )}}
                    className='px-2 bg-gray-50 py-2 rounded-lg w-full text-xl text-left outline-none border  text-gray-800 hover:border-blue-200 '  />
               
               <DataSelector date={changeDate} setDate={setChangeDate}/>
               <ImageSelector img={storyInfo?.imageUrl}/>
               
               <TagInputs/>
        </div>

    </div>
  )
}

export default AddEditTravalStroy