import React from 'react'
import './UpdatePassword.css'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import Loader from '../layout/Loader/loader'
import { useSelector, useDispatch } from "react-redux"
import { updatePasswowrd, clearErrors } from '../../actions/userActions';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


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

        dispatch(updatePasswowrd(myForm))
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
                <div className="updatePasswordContainer">
                    <h2>Update Profile</h2>
                    <div className="updatePasswordBox">
                        <form className="updatePasswordForm" onSubmit={updatePasswordSubmit} >
                            <div className="loginPassword">
                                <VpnKeyIcon />
                                <input type="password" placeholder='Old Password' required value={oldPassword} onChange={(e) => {
                                    setOldPassword(e.target.value)
                                }} />
                            </div>
                            <div className="loginPassword">
                                <LockOpenIcon />
                                <input type="password" placeholder='New Password' required value={newPassword} onChange={(e) => {
                                    setNewPassword(e.target.value)
                                }} />
                            </div>
                            <div className="loginPassword">
                                <LockIcon />
                                <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }} />
                            </div>
                            <input type="submit" value="Change" className="updatePasswordBtn" />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default UpdatePassword
