/* eslint-disable react/prop-types */
import React from 'react';

const TopPage = (props) => {
    const {text} = props ;
  return (
    <div className='w-full bg-signup-bg-img h-[400px] bg-center bg-cover' loading=''>
        <div className='flex justify-center items-center h-full w-full text-white font-semibold text-4xl uppercase'>
            <h2> {text} </h2>
        </div>
    </div>
  )
}

export default React.memo(TopPage);