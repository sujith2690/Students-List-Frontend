import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    students:[]
}
const studentSlice = createSlice({
    name:'studentSlice',
    initialState,
    reducers:{
        storeStudents:(state,action)=>{
            state.students = action.payload
        },
        addStudent:(state,action)=>{
            state.students.unshift(action.payload)
        },
        removeStudent:(state,action)=>{
            state.students = state.students.filter((std)=>std._id!==action.payload)
        },
        updateStudent:(state,action)=>{
            state.students = state.students.filter((std)=>std._id!==action.payload.id)
            state.students.unshift(action.payload.student)
        }
    }
})

export const {storeStudents,addStudent,removeStudent,updateStudent} =studentSlice.actions;
export default studentSlice.reducer;
