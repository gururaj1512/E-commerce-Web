import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { updatePassword, clearErrors } from '../../actions/userActions';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Input from '@mui/joy/Input';


const UpdatePassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated } = useSelector((state) => state.profile)

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            navigate('/account');

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [alert, dispatch, error, isUpdated, navigate])

    return (
        <Fragment>
            {<Fragment>
                <MetaData title={"Change Profile"} />
                <div className="w-screen h-screen flex sm:flex-col-reverse items-center justify-center bg-white">
                    <div className="w-1/3 md:w-1/2 sm:w-5/6 min-w-52 flex flex-col items-center justify-center box-border overflow-hidden bg-slate-50 rounded-xl py-4">
                        <h2 className='my-3 text-xl'>Update Profile</h2>
                        <form className="flex items-center flex-col m-auto padding-6 h-5/6 w-full transition-all duration-500 pb-2" onSubmit={updatePasswordSubmit} >
                            <div className="flex items-center w-5/6 my-2">
                                <Input startDecorator={<VpnKeyIcon />} type="password" placeholder='Old Password' required value={oldPassword} onChange={(e) => {
                                    setOldPassword(e.target.value)
                                }} className='w-full' sx={{fontSize: '14px'}} />
                            </div>
                            <div className="flex items-center w-5/6 my-2">
                                <Input startDecorator={<LockOpenIcon />} type="password" placeholder='New Password' required value={newPassword} onChange={(e) => {
                                    setNewPassword(e.target.value)
                                }} className='w-full' sx={{fontSize: '14px'}} />
                            </div>
                            <div className="flex items-center w-5/6 my-2">
                                <Input startDecorator={<LockIcon />} type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }} className='w-full' sx={{fontSize: '14px'}} />
                            </div>
                            <Input type="submit" value="Change" className='w-5/6 hover:bg-red-700 transition-all duration-300 py-1 mt-6' sx={{backgroundColor: '#DB4444', color: '#ebebeb'}}  />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default UpdatePassword
