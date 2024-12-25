import { createSlice } from "@reduxjs/toolkit";
import image1 from '../assets/images/login.jpg' 
import image2 from '../assets/images/signup.jpg' 
import image3 from '../assets/images/vestrahorn.jpg';

const initialState = [
    { id: 1 , imgUrl :image1,name:'image-1' , date:`2024-05-21` } ,
    { id: 2 , imgUrl :image2,name:'image-2' , date:`2024-08-20` } ,
    { id: 3 , imgUrl :image3,name:'image-3' , date:`2024-04-02` } ,
    { id: 4 , imgUrl :image1,name:'image-1' , date:`2024-04-02` } ,
    { id: 5 , imgUrl :image2,name:'image-2' , date:`2024-04-02` } ,
    { id: 6 , imgUrl :image3,name:'image-3' , date:`2024-04-02` } ,
    { id: 7 , imgUrl :image1,name:'image-1' , date:`2024-04-02` } ,
    { id: 8 , imgUrl :image2,name:'image-2' , date:`2024-04-02` } ,
    { id: 9 , imgUrl :image3,name:'image-3' , date:`2024-04-02` } ,
];


const favoriteImgSlice = createSlice({
    name:'favoriteImg' ,
    initialState , 
    reducers:{
        addImg:(state , action )=>{
            [...state , {...action.payload}]
        },
        reSortImg:(state ,action)=>{
            return [...action.payload]
        },
        removeImg:(state ,action)=>{
            return state.filter(item=> item.id !=action.payload );
        }
    },
});


export const{addImg , reSortImg ,removeImg} = favoriteImgSlice.actions ;
export default favoriteImgSlice.reducer ;