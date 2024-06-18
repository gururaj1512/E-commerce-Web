import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material'
import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import './styles/CheckoutSteps.css'

const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
            label: <Typography variant="caption">Shipping Details</Typography>,
            icon: <LocalShipping />
        },
        {
            label: <Typography variant="caption">Confirm Order</Typography>,
            icon: <LibraryAddCheck />
        },
        {
            label: <Typography variant="caption">Payment</Typography>,
            icon: <AccountBalance />
        },
    ]

    const stepStyles = {
        boxSizing: 'border-box',
        padding: "20px 0 10px 0"
    }

    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} >
                {
                    steps.map((item, index) => (
                        <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false} >
                            <StepLabel icon={item.icon} style={{
                                color: activeStep >= index ? "#DB4444" : "rgb(0, 0, 0, 0.7)"
                            }}>
                                {item.label}
                            </StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </Fragment>
    )
}

export default CheckoutSteps
