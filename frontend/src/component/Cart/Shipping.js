import React, { Fragment, useState } from 'react'
import './Shipping.css'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartAction'
import MetaData from '../layout/MetaData'
import { PinDrop, Home, LocationCity, Phone, Public, TransferWithinAStation } from '@mui/icons-material/';
import { Country, State } from 'country-state-city';
import { useAlert } from 'react-alert'
import CheckoutSteps from '../Cart/CheckoutSteps.js'
import { useNavigate } from 'react-router-dom'


const Shipping = () => {

    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart);
    const alert = useAlert();
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length !== 10) {
            alert.error("Phone Number should be 10 digtis");
            return;
        }

        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        navigate('/order/confirm');
    }

    return (
        <Fragment>
            <MetaData title={'Shipping Details'}></MetaData>
            <CheckoutSteps activeStep={2} />
            <div className="shippingContainer">
                <h2 className="shippingHeading">Shipping Details</h2>
                <div className="shippingBox">
                    <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit} >
                        <div>
                            <Home />
                            <input type="text" placeholder='Address' required value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div>
                            <LocationCity />
                            <input type="text" placeholder='City' required value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div>
                            <PinDrop />
                            <input type="number" placeholder='PinCode' required value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                        </div>
                        <div>
                            <Phone />
                            <input type="number" placeholder='Phone Number' required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} size={10}/>
                        </div>
                        <div>
                            <Public />
                            <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value="">Country</option>
                                {
                                    Country && Country.getAllCountries().map((item) => {
                                        return <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        {
                            <div>
                                <TransferWithinAStation />
                                <select required value={state} onChange={(e) => setState(e.target.value)} disabled={!country ? true : false}>
                                    <option value="">State</option>
                                    {
                                        State && State.getStatesOfCountry(country).map((item) => {
                                            return <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>

                        }

                        <span className='shippingBtnDiv'>
                            <input type='submit' value="Continue" className='shippingBtn' disabled={state ? false : true} />
                        </span>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}


export default Shipping
