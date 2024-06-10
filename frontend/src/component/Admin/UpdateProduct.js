import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material'
import Sidebar from './Sidebar'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';


const UpdateProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

    const { error, product } = useSelector((state) => state.productDetails);
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
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

    const productId = id;

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
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
            alert.success("Product Updated Successfully");
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, navigate, isUpdated, productId, product, updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([])

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
            <MetaData title={'Create Product'}></MetaData>
            <div className='h-screen w-screen pt-20 flex'>
                <Sidebar />
                <div className="w-4/5 sm:w-3/4 overflow-y-scroll justify-center">
                    <h1 className='text-center text-2xl m-2'>Create Product</h1>
                    <form encType='multipart/form-data' onSubmit={updateProductSubmitHandler} className='w-11/12 m-auto border-2 border-slate-200 rounded-md grid grid-rows-5 grid-flow-row gap-3 grid-cols-4 sm:grid-cols-2 p-4' >
                        <div className='col-span-2 flex items-center'>
                            <Input startDecorator={<Spellcheck />} type="text" placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }} />
                        </div>
                        <div className='col-span-2 flex items-center'>
                            <Input startDecorator={<AttachMoney />} type="number" placeholder='Price' value={price} required onChange={(e) => setPrice(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }} />
                        </div>
                        <div className='col-span-2 flex items-center'>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', height: '100%', minWidth: '200px' }}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='col-span-2 flex items-center'>
                            <Input startDecorator={<Storage />} type='number' placeholder='Stock' value={stock} required onChange={(e) => setStock(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }} />
                        </div>
                        <div className='col-span-2 flex items-center'>
                            <input type="file" name="avatar" accept='image/*' onChange={updateProductImagesChange} multiple className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="multiple_files" />
                        </div>
                        <div className='col-span-2 row-span-3 flex items-start'>
                            <Textarea startDecorator={<Description />} placeholder='Product Description' required cols='30' rows='1' value={description} onChange={(e) => setDescription(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }} ></Textarea>
                        </div>

                        <div className='col-span-2 row-span-2 flex items-center'>
                            {
                                oldImages && oldImages.map((image, index) => (
                                    <img src={image.url} key={index} alt="Old Product Preview" className='h-16 w-16 mx-2' />
                                ))
                            }
                        </div>
                        <div className='col-span-2 row-span-2 flex items-center'>
                            {
                                imagesPreview.map((image, index) => (
                                    <img src={image} key={index} alt="Product Preview" className='h-16 w-16 mx-2' />
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

export default UpdateProduct
