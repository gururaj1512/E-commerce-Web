import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader'
import { useSelector, useDispatch } from "react-redux"
import { updateProfile, clearErrors, loadUser } from '../../actions/userActions';
import { useAlert } from 'react-alert'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import { Mail, Person } from '@mui/icons-material';
import Input from '@mui/joy/Input';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector((state) => state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [avatar, setAvatar] = useState("");
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
                <div className="w-screen h-screen flex sm:flex-col-reverse items-center justify-center bg-white">
                    <div className="w-1/3 md:w-1/2 sm:w-5/6 min-w-52 flex flex-col items-center justify-center box-border overflow-hidden bg-slate-50 rounded-xl py-4 ,t-8">
                        <h2 className='my-3 text-xl'>Update Profile</h2>
                        <form
                            className="flex items-center flex-col m-auto padding-6 h-5/6 w-full transition-all duration-500 pb-2"
                            encType="multipart/form-data"
                            onSubmit={updateProfileSubmit}
                        >
                            <div className="flex items-center w-5/6 my-2">
                                <Input startDecorator={<Person />} type="text" placeholder="Name" required name="name" value={name} onChange={(e) => setName(e.target.value)} className='w-full' sx={{fontSize: '14px'}} />
                            </div>
                            <div className="flex items-center w-5/6 my-2">
                                <Input startDecorator={<Mail />} type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full' sx={{fontSize: '14px'}} />
                            </div>
                            <div className="flex items-center w-5/6 my-2">
                                <img className='h-9 w-9 mr-4 rounded-full' src={avatarPreview} alt="Avatar Preview" />
                                <Input type="file" name="avatar" accept="image/*" value={""} onChange={updateProfileDataChange} size='small' className='w-full' sx={{fontSize: '14px'}} />
                            </div>
                            <Input type="submit" value="Update" className='w-5/6 hover:bg-red-700 transition-all duration-300 py-1 mt-6' sx={{backgroundColor: '#DB4444', color: '#ebebeb'}} />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default UpdateProfile
