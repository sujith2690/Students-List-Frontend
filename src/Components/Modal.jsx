import React, { useState } from 'react'
import { baseUrl } from '../API/baseUrl';
import { useDispatch } from 'react-redux';
import { addStudent } from '../Redux/studentSlice';
import { GrClose } from 'react-icons/gr'

const Modal = ({ visible, onClose, removed, remove, cancel }) => {
    const dispatch = useDispatch()
    const [formState, setFormState] = useState({
        name: '',
        studentId: '',
        class: '',
        section: '',
        dob: '',
        rollNo: '',
    });
    //............................
    if (!visible) return null
    const handleClose = (e) => {
        if (e.target.id === "container") {
            // removed()
            onClose()
        }
    }
    // ..................Modal
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await baseUrl.post('/create', formState)
            console.log(response.data)
            dispatch(addStudent(response.data.student))
            resetForm();
            onClose()
        } catch (err) {
            console.log(err)
        }
    };
    const initialFormState = {
        name: '',
        studentId: '',
        class: '',
        section: '',
        dob: '',
        rollNo: '',
    };
    const resetForm = () => {
        setFormState(initialFormState);
    };
    const handleRemove = async () => {
        if (remove) {
            removed()
            onClose()
        }
    }
    const handleRemoveCancel = async () => {
        cancel()
        onClose()
    }
    const handleEditCancel = async () => {
        onClose()
    }
    

    return (
        <div
            id='container'
            onClick={handleClose}
            className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
            {remove ?
                <div className='bg-blue-950 p-10 rounded'>
                    <p className='text-white text-xl'>Are You Sure..?</p>
                    <div className='flex gap-3'>
                        <button className="px-5 py-2  bg-red-800 text-white rounded" onClick={handleRemove}>Yes</button>
                        <button className="px-5 py-2  bg-green-800 text-white rounded" onClick={handleRemoveCancel}>No</button>
                    </div>
                </div>
                :
                // !edit ?
                <div className=' flex bg-white'>
                    <form action="submit" onSubmit={handleSubmit}>
                        <div className=" p-2 rounded w-100">
                            <h1 className="font-semibold text-center text-xl text-gray-700">
                                Add Students Details
                            </h1>

                            <div className="flex flex-col mt-3">
                                <div className='flex gap-1'>
                                    <input
                                        type="text"
                                        required
                                        className="border border-gray-700 p-2 rounded mb-5"
                                        placeholder="Name"
                                        name="name"
                                        id="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="number"
                                        required
                                        className="border border-gray-700 p-2 rounded mb-5"
                                        placeholder="Roll No"
                                        name="rollNo"
                                        id="rollNo"
                                        value={formState.rollNo}
                                        onChange={handleChange}
                                    />


                                </div>
                                <div className='flex gap-1'>
                                    <input
                                        type="text"
                                        required
                                        className="border border-gray-700 p-2 rounded mb-5"
                                        placeholder="Student ID"
                                        name="studentId"
                                        id="studentId"
                                        value={formState.studentId}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        required
                                        className="border border-gray-700 p-2 rounded mb-5"
                                        placeholder="Section"
                                        name="section"
                                        id="section"
                                        value={formState.section}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex gap-1'>
                                    <select
                                        required
                                        className="border border-gray-700 p-2 rounded mb-5"
                                        name="class"
                                        id="class"
                                        value={formState.class}
                                        onChange={handleChange}
                                    >
                                        <option value="">Class</option>
                                        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="date"
                                        date-format="dd-mm-yyyy"
                                        required
                                        className="border border-gray-700 p-2 rounded mb-5"
                                        placeholder="Date Of Birth"
                                        name="dob"
                                        id="dob"
                                        min='1899-01-01' max='2000-10-10'
                                        value={formState.dob}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            <div className="text-center flex gap-1 flex-row-reverse">
                                <button
                                    type='submit'
                                    className="px-5 py-2  bg-green-800 text-white rounded">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className='bg-red cursor-pointer ' onClick={handleEditCancel} >
                        <GrClose className='text-red-500' />
                    </div>
                </div>
                
            }
        </div>
    )
}

export default Modal