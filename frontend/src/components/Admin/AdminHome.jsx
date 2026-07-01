import React from 'react'
import { Button } from 'react-bootstrap'
import AddStaff from './AddStaff'

function AdminHome() {
    return (
        <div>
            <Button>Add New Staff</Button>
            <AddStaff/>
        </div>
    )
}

export default AdminHome
