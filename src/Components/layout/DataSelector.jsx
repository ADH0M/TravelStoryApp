/* eslint-disable react/prop-types */
import moment from 'moment';
import  { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { MdClose, MdDateRange } from 'react-icons/md';

const DataSelector = ({date ,setDate}) => {
    const [openDate ,setOpenDate]=useState(false);

  return (
    <>
        <section className=''>
            <button 
                className='inline-flex  items-center mt-2 px-2 py-2 rounded-md bg-cyan-50 hover:bg-primary hover:text-white gap-2 cursor-pointer border border-cyan-100 text-primary w-fit  h-fit'
                onClick={()=>{
                    setOpenDate(true);
                }}
                >
                <MdDateRange className='text-lg'/>
                <span className='text-xs'>
                    {date ? moment(date).format('Do MMM YYYY'): moment().format('Do MMM YYYY')}
                </span>
            </button>

            <>
                {
                    openDate &&
                    <div className='relative py-5 px-7'>
                        <button
                            className='absolute right-7 top-2 bg-cyan-50 text-xl cursor-pointer w-9 h-9 flex justify-center items-center text-primary hover:text-cyan-50 z-10 border border-cyan-600 hover:bg-cyan-200  hover:border-cyan-200 rounded-full'
                            onClick={()=>setOpenDate(false)}
                            >
                            <MdClose/>
                        </button>
                        
                        <DayPicker 
                        captionLayout='dropdown-buttons'
                        mode='single'
                        selected={date}
                        onSelect={setDate}
                        pagedNavigation
                        />
                </div>
                 }
            </>


        </section>
    </>
  )
}

export default DataSelector