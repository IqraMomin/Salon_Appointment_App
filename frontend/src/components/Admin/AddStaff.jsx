import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { staffFields } from '../../data/staffFields';

const initialState = {
    name:"",email:"",phone:"",gender:"",specialization:"",
    status:"",experience:"",profileImage:""
}
function AddStaff() {
    const [staffData,setStaffData] = useState(initialState);
    const handleChange=(e)=>{
        const {name,value} = e.target;
        setStaffData((prev)=>({...prev,[name]:value})
        );
    }
    const formSubmitHandler = (e)=>{
        e.preventDefault();
        console.log(staffData);

    }
    return (
        <div>
            <Form onSubmit={formSubmitHandler}>
                {staffFields.map(ele=>{
                    return  <Form.Group key={ele.name}>
                    {ele.type==="select" ? <Form.Select>
                    <option value="">Select {ele.name}</option>
                    {ele.options.map(option=>{
                        return <option key={option.value} 
                        value={option.value}>{option.label}</option>
                    })}
                    </Form.Select>
                    :
                    <Form.Control type={ele.type} 
                    name={ele.name} 
                    placeholder={ele.placeholder}
                   value={staffData[ele.name]}
                   onChange={handleChange}/>}
                    
                    </Form.Group>
                })}
            
            <Button type='submit'>Add Staff</Button>
            </Form>

        </div>
    )
}

export default AddStaff
