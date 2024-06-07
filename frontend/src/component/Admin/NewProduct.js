import React, { Fragment, useEffect, useState } from 'react'
import './NewProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createProduct } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material'
import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { useNavigate } from 'react-router-dom'
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';


const NewProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <div className='h-screen w-screen pt-20 flex'>
                <Sidebar />
                <div className="w-4/5 sm:w-3/4 overflow-y-scroll justify-center">
                    <h1 className='text-center text-2xl m-2'>Create Product</h1>
                    <form encType='multipart/form-data' onSubmit={createProductSubmitHandler} className='w-11/12 m-auto border-2 border-slate-200 rounded-md grid grid-rows-5 grid-flow-row gap-3 grid-cols-4 sm:grid-cols-2 p-4' >
                        <div className='col-span-2 flex items-center'>
                            <Input startDecorator={<Spellcheck />} type="text" placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }} />
                        </div>
                        <div className='col-span-2 flex items-center'>
                            <Input startDecorator={<AttachMoney />} type="number" placeholder='Price' required onChange={(e) => setPrice(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }} />
                        </div>
                        <div className='col-span-2 flex items-center'>
                            <Select startDecorator={<AccountTree />} onChange={(e) => setCategory(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }}>
                                <Option value="">Choose category</Option>
                                {
                                    categories.map((cate) => (
                                        <Option value={cate} key={cate} >{cate}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                        <div className='col-span-2 flex items-center'>
                            <Input startDecorator={<Storage />} type='number' placeholder='Stock' required onChange={(e) => setStock(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }} />
                        </div>
                        <div className='col-span-2 flex items-center'>
                            <input type="file" name="avatar" accept='image/*' onChange={createProductImagesChange} multiple className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="multiple_files" />
                        </div>
                        <div className='col-span-2 row-span-3 flex items-start'>
                            <Textarea startDecorator={<Description />} placeholder='Product Description' required cols='30' rows='1' value={description} onChange={(e) => setDescription(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }} ></Textarea>
                        </div>
                        <div className='col-span-2 row-span-2 flex items-center'>
                            {
                                imagesPreview.map((image, index) => (
                                    <img src={image} key={index} alt="Avatar Preview" className='h-16 w-16 mx-2' />
                                ))
                            }
                        </div>
                        <button className='col-start-2 sm:col-start-1 col-span-2 h-10 mt-4 rounded-md width-full height-full bg-main-red text-slate-50 font-medium hover:bg-slate-800' type="submit" disabled={loading ? true : false}>Create</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct
