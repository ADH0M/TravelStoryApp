import  { useEffect, useRef, useState } from 'react';
import { FaRegFileImage } from 'react-icons/fa';
import { MdDelete, MdDeleteOutline } from 'react-icons/md';


const ImageSelector = ({img}) => {
    const [imgUrl , setImgUrl ] = useState(img || null);
    const [previewImg , setPreviewImg ] = useState(null);
    const [loading ,setLoading] = useState(false);

    const imgRef = useRef(null);

    const handleOpenImgFile = ()=> {
        imgRef.current.click();
    };

    console.log(img);
    

    const handleChangeImg = (e)=>{
        const file = e.target.files[0];
        if(file){
            const isValidType = file.type.startsWith('image/');
            const isValidSize = file.size <= 25 * 1024 * 1024; // 5MB limit

            if (!isValidType) {
                alert('Only image files are allowed.');
                return;
            };

            if (!isValidSize) {
                alert('File size exceeds the 25MB limit.');
                return;
            };
            setLoading(true);
            setImgUrl(file);
        }
        
    };

    const handleDeleteFile =()=>{
        setImgUrl(null);
        setPreviewImg(null);
        setLoading(false);
        if(imgRef.current) imgRef.current.value ='';
        return;
    }

    const handleOnload =()=>{
        setLoading(false);
    };

    useEffect(()=> {
        if(typeof imgUrl === 'string'){
            setImgUrl(imgUrl);
            console.log('preeee one' , previewImg);

        }else if(imgUrl){
            setPreviewImg(URL.createObjectURL(imgUrl));
            console.log('preeee two eeeeee' , previewImg );
            
        }else{
            setPreviewImg(null);
        };
        return ()=>{
            if(previewImg && typeof previewImg === 'string' && !imgUrl){
                URL.revokeObjectURL(previewImg);
            } 
        }
    },[imgUrl]);  


    return (
        <>
    <div className='mt-2 w-full h-[300px] overflow-hidden '>
        <input 
            type="file" 
            ref={imgRef}
            accept='image/*'
            className='hidden'
            onChange={handleChangeImg}
        />
        
        {!imgUrl ? 
            <button 
            className='flex justify-center items-center gap-2 flex-col w-full p-4 h-[220px] border border-gray-300 my-4 rounded-lg p-4'
            onClick={handleOpenImgFile}
            >
            <div className='my-2'>
                <FaRegFileImage className='text-xl text-primary '/>
            </div>
            <p className='text-sm font-semibold capitalize opacity-80 text-gray-600'>
                Browse image files upload
            </p>

            </button>
            :

            <div 
                className='my-4  rounded-xl w-full relative'
            >
                { loading && <span className='loadding-spp'></span>}
                <img src={previewImg ? previewImg :imgUrl} alt="image-upload" height={300} className={`w-full${loading ? 'hidden' :'block'} `} onLoad={handleOnload}/>
                
                <button
                onClick={handleDeleteFile} 
                className='absolute top-4 right-4 px-5  py-1 bg-rose-100 rounded-lg hover:bg-rose-500 hover:text-white'>
                    <MdDeleteOutline className=''/>
                </button>
            </div>

        }



    </div>

    </>

  )
};

export default ImageSelector