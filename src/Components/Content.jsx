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
    const [filteredUsers, setFilteredUsers] = useState([])
    const handleClose = () => setShowModel(false)
    const studentsData = async () => {
        try {
            const students = await baseUrl.get('/students')
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

    }
    const removeCancel = () => {
        if (remove) setRemove(false)
    }
    const handleClick=()=>{
        setShowModel(true)
    }
    const getRowNumber = (rowIndex) => {
        return rowIndex + 1; 
      }
    const columns = [

        {
            name: <b>No</b>,
            selector: (row,index) =>getRowNumber(index),
        },
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
            selector: (row) => row.dob.slice(0, 10),
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
    useEffect(() => {
        const results = students.filter((user) => {
          return user.name.toLowerCase().match(search.toLowerCase()) 
        });
        console.log(results,'--filter')
        setFilteredUsers(results)
      }, [search])


    return (
        <div className='usertable'>
            <DataTable
                className='border border-black border-t-2 ml-3 mr-3'
                columns={columns}
                data={filteredUsers.length === 0 ? students: filteredUsers}
                pagination
                // fixedHeader
                fixedHeaderScrollHeight='350px'
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <input type='text' className='userSearch' placeholder='Search Student'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                }
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