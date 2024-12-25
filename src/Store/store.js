import { configureStore } from "@reduxjs/toolkit";
import favoriteImg from '../Store/favoriteReduer';
const store =configureStore({
    reducer:{favoriteImg:favoriteImg}
});

export default store ;
