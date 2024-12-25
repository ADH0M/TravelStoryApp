import moment from 'moment';
import { GrMapLocation } from 'react-icons/gr';
import { MdClose, MdDelete, MdUpdate } from 'react-icons/md';

const ViewTravelStroy = ({setStory , story ,onClose ,edit}) => {
    
  return (
    <div className=''>
        <div className='inline-flex justify-end w-full gap-2 items-center'>
        <p 
            className='small-btn text-primary hover:text-white ' 
            onClick={edit}
        >
            <MdUpdate className=' text-lg mr-1 '/>
            Update Stroy
        </p>
        <p className='small-btn text-rose-500 bg-rose-100 hover:bg-rose-200 border-rose-200 hover:border-rose-300 '>
            <MdDelete className='mr-1'/>
            Delete
        </p>
        <MdClose className='text-gray-500 text-xl cursor-pointer hover:text-rose-400 w-7' onClick={onClose}/>

        </div>

        <div className='flex flex-col mt-5 p-5'>
            <div className=''>
                <h5 className='font-semibold text-2xl mb-4'>{story.data.title}</h5>
                <div className=' inline-flex flex-1 justify-between w-full py-3'>
                    <span className='text-stone-500  text-sm '>{story.data.visiteData?moment(story.data.visiteData).format('Do MM YYYY')
                    :moment().format('Do MM YYYY')}</span>
                    <button className='bg-cyan-200 p-1 rounded-sm flex items-center gap-1'>
                        <GrMapLocation className='text-primary text-sm'/>
                        <span className='text-primary text-sm  whitespace-pre-line'>{story.data.location}</span>

                    </button>
                </div>
            </div>
            <div className='h-[300px] overflow-hidden rounded-md '>
                <img 
                    src={story.data.imageUrl}
                    alt="image view " 
                    className='w-full max-h-[300px] rounded-md '
                />
            </div>

            <div>
                {story.data.story}
            </div>
        </div>
        
    </div>
  )
}

export default ViewTravelStroy