import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./studentSlice";

const store =configureStore({
    reducer:{
        studentStore:studentSlice
    }
})

export default store;