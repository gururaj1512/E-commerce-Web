import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '@mui/joy/Input';
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { getUserDetails, updateUser, clearErrors } from '../../actions/userActions'
import { MailOutline, Person } from '@mui/icons-material'
import Loader from '../layout/Loader/Loader'


const UpdateUser = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams()
    const userId = id;

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoader, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("User updated successfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm));
    };

    return (
        <Fragment>
            {
                loading ? <Loader/> : <Fragment>
                    <MetaData title={'Update User'}></MetaData>
                    <div className='h-screen w-screen pt-20 flex'>
                        <Sidebar />
                        <div className="w-4/5 sm:w-3/4 overflow-y-scroll justify-center">
                            <h1 className='text-center text-2xl m-2'>Update User</h1>
                            <form onSubmit={updateUserSubmitHandler} className='w-11/12 m-auto border-2 border-slate-200 rounded-md grid grid-rows-5 grid-flow-row gap-3 grid-cols-4 sm:grid-cols-2 p-4' >
                                <div className='col-span-2 flex items-center'>
                                    <Input startDecorator={<Person />} type="text" placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }} />
                                </div>
                                <div className='col-span-2 flex items-center'>
                                    <Input startDecorator={<MailOutline />} type="email" placeholder='Email' value={email} required onChange={(e) => setEmail(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }} />
                                </div>
                                <div className='col-span-2 flex items-center'>
                                    <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', height: '100%', minWidth: '200px' }}>
                                        <option value="">Choose Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <button className='col-start-2 sm:col-start-1 col-span-2 h-10 mt-4 rounded-md width-full height-full bg-main-red text-slate-50 font-medium hover:bg-slate-800' type="submit" disabled={updateLoader ? true : false || role === "" ? true : false}>Update</button>
                            </form>
                        </div>
                    </div>
                </Fragment>
            }
                </Fragment>
    )
}

            export default UpdateUser
