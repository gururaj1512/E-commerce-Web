import React from 'react'
import './UpdateProfile.css'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Loader from '../layout/Loader/Loader'
import { useSelector, useDispatch } from "react-redux"
import { updateProfile, clearErrors, loadUser } from '../../actions/userActions';
import { useAlert } from 'react-alert'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector((state) => state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm))
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate('/account');

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [alert, dispatch, error, isUpdated, navigate, user])

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={"Update Profile"} />
                <div className="UpdateProfileContainer">
                    <h2>Update Profile</h2>
                    <div className="UpdateProfileBox">
                        <form
                            className="UpdateProfileForm"
                            encType="multipart/form-data"
                            onSubmit={updateProfileSubmit}
                        >
                            <div className="UpdateProfileName">
                                <PermIdentityIcon />
                                <input type="text" placeholder="Name" required name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="UpdateProfileEmail">
                                <EmailOutlinedIcon />
                                <input type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="UpdateProfileImage">
                                <img className='demoProfile' src={avatarPreview} alt="Avatar Preview" />
                                <input type="file" name="avatar" accept="image/*" onChange={updateProfileDataChange} />
                            </div>
                            <input type="submit" value="Update" className="UpdateProfileBtn" />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default UpdateProfile
