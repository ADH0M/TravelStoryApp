import { FaHeart } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment/moment";
const TravalStoryCard = ({
    imageUrl,
    title,
    story,
    date,
    visiteLoaction,
    onEdite,
    onClick,
    onFavouriteClick,
    isFavourite,
    toast
}) => {
  return (

    <div className="overflow-hidden rounded-lg border  bg-white hover:shadow-slate-100 transition-all ease-in-out cursor-pointer relative">
        <img src={imageUrl} alt={title}
            className=" h-56 object-cover rounded-lg w-full"
            onClick={onClick}
        />
        <button className=" w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4 "
            onClick={()=>toast.success('succefull update story')}

        >
            <FaHeart className={`icon-btn ${isFavourite ?"text-red-500":"text-white"}`} />

        </button>
        <div className="p-4" onClick={onClick}>
            <div className="flex items-center gap-3">
                <div className="flex-1 ">
                    <h6 className="text-sm font-">{title}</h6>
                    <span className="text-xs font-medium">
                        {date? moment(date).format('Do MMM YYYY'):""}
                    </span>
                </div>
                {/* <p className="text-xs text-slate-600 mt-2"> {story?.slice(0,60)}</p> */}
            </div>
            
            <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1">
                <GrMapLocation className="text-sm"/>
                {/* {visiteLoaction.map((item ,index)=> 
                    visiteLoaction.length == index +1 ?`${item}` :`${item},`
                )} */}india
            </div>

        </div>
    </div>
  )
}

export default TravalStoryCard