import React, { useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddUser() {
    const [value, setValue] = useState({
        name: '',
        fathername: '',
        email: '',
        phone: ''
    });

    const handleOnchange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const CloseRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const adduser = await axios.post('http://localhost:8080/api/create', value, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = adduser.data;
            if (response.success) {
                toast.success(response.message);
                CloseRef.current.click();
            } else {
                toast.error(response.message);
            }
            console.log(response);
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.log('Response error:', error.response.data);
                toast.error(error.response.data.message || 'Server error');
            } else if (error.request) {
                // Request was made but no response was received
                console.log('Request error:', error.request);
                toast.error('No response from server');
            } else {
                // Something else happened while setting up the request
                console.log('Error', error.message);
                toast.error('Error: ' + error.message);
            }
        }
    };

    return (
        <>
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title">Add Employee</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-hidden="true" ref={CloseRef}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" value={value.name} name='name' onChange={handleOnchange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Father</label>
                                    <input type="text" value={value.fathername} name='fathername' onChange={handleOnchange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" value={value.email} name='email' onChange={handleOnchange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" value={value.phone} name='phone' onChange={handleOnchange} className="form-control" required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-bs-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-primary" value="Add" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
