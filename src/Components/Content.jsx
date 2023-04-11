import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Modal from './Modal'
import { baseUrl } from '../API/baseUrl'
import { useDispatch, useSelector } from 'react-redux'
import { removeStudent, storeStudents } from '../Redux/studentSlice'

const Content = () => {
    const [search, setSearch] = useState('')
    const [remove, setRemove] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [showModel, setShowModel] = useState(false)
    const dispatch = useDispatch()
    const students = useSelector((state) => state.studentStore.students)
    console.log(students)
    const handleClose = () => setShowModel(false)
    const studentsData = async () => {
        try {
            console.log('its here')
            const students = await baseUrl.get('/students')
            // setStudents(students.data)
            dispatch(storeStudents(students.data))
        } catch (error) {

        }
    }
    useEffect(() => {
        studentsData()
    }, [])


  
    const handleDelete = async (id) => {
        if (remove === true) {
            const response = await baseUrl.delete(`/delete/${currentId}`)
            dispatch(removeStudent(currentId))
            setRemove(false)
            setShowModel(false)
        } else {
            setShowModel(true)
            setRemove(true)
            setCurrentId(id)
        }

        console.log(id, currentId, '---------id')
    }
    const removeCancel = () => {
        if (remove) setRemove(false)
    }
    const handleClick=()=>{
        setShowModel(true)
    }
    const columns = [

        {
            name: <b>Student ID</b>,
            selector: (row) => row.studentId,
            sortable: true,
        },
        {
            name: <b>Class</b>,
            selector: (row) => row.class,
            sortable: true,
        },
        {
            name: <b>Section</b>,
            selector: (row) => row.section,
            sortable: true,
        },
        {
            name: <b>Student Name</b>,
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: <b>DOB</b>,
            selector: (row) => row.dob,
            sortable: true,
        },
        {
            name: <b>Roll Number</b>,
            selector: (row) => row.rollNo,
            sortable: true,
        },
      
        {
            name: <b>Delete</b>,
            selector: (row) => <button onClick={() => handleDelete(row._id)} className='bg-red-600 text-white p-2 rounded-md'>Delete</button>
        },

    ]


    return (
        <div className='usertable'>
            <DataTable
                className='border border-black border-t-2 ml-3 mr-3'
                columns={columns}
                data={students}
                pagination
                // fixedHeader
                fixedHeaderScrollHeight='390px'
                highlightOnHover
                subHeader
                // subHeaderComponent={
                //     <input type='text' className='border border-b-black ' placeholder='Search Students'
                //         value={search}
                //         onChange={(e) => setSearch(e.target.value)}
                //     />
                // }
            />
            <button onClick={handleClick} className='bg-blue-800 text-white p-2 rounded-md'>Add Students</button>

            <Modal

                onClose={handleClose}
                visible={showModel}
                remove={remove}
                cancel={removeCancel}
                removed={handleDelete}

                
                
            />
        </div>
    )
}

export default Content