/* eslint-disable react/prop-types */
import { getIntials } from '../../utils/helper';


const ProfileInfo = ({userInfo,logout}) => {
    const intialName = getIntials(userInfo.username);

  return (
    <div className='flex  gap-3 items-center'>
        <h3 className='rounded-full w-12 h-12 text-stone-900 flex justify-center items-center bg-stone-100'>{ userInfo.username? intialName:'' }</h3>
        <div className=''>
            <h2 className='font-medium capitalize text-gray-800 text-sm '>{userInfo ? userInfo.username:''}</h2>
            <button className='uppercase underline text-sm' onClick={()=>logout()}>logout</button>
        </div>

    </div>
  )
}

export default ProfileInfo ;