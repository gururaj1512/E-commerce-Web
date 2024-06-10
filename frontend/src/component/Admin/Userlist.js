import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import { getAllUsers, clearErrors, deleteUser } from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userConstants';


const Userlist = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, users } = useSelector((state) => state.allUsers);
    const { error: deleteError, message, isDeleted } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    let columns = [
        { field: "id", headerName: "User ID", minWidth: 150, flex: 0.5 },
        {
            field: "email",
            headerName: "Email",
            minWidth: 100,
            flex: 0.4,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 0.4,
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 60,
            flex: 0.2,
            cellClassName: (params) => {
                return params.api.getCellValue(params.id, 'status') === "admin" ? "redColor" : "greenColor"
            }
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 80,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.id}`}>
                            <Edit sx={{ color: '#1e293b' }} />
                        </Link>
                        <Button sx={{ padding: 0, minWidth: '24px' }} onClick={() => deleteUserHandler(params.id)}>
                            <Delete sx={{ color: '#dc2626' }} />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    let rows = [];

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
        });
    });

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors)
        }
        if (isDeleted) {
            alert.success(message)
            navigate('/admin/users')
            dispatch({type : DELETE_USER_RESET})
        }
        dispatch(getAllUsers())
    }, [dispatch, alert, error, deleteError, navigate, isDeleted, message])

    return (
        <Fragment>
            <MetaData title={`All Users --> Admin`}></MetaData>
            <div className='max-w-100 h-auto pt-20 sm:pt-16'>
                <div className='w-11/12 mx-auto'>
                    <h1 className='text-center text-2xl mb-2'>All Users</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[10, 20, 50, 100]}
                        disableRowSelectionOnClick
                        className="productListTable"
                        autoHeight
                        sx={{
                            fontSize: '14px',
                            '@media (max-width: 780px)': {
                                fontSize: '12px'
                            },
                            '& .css-yrdy0g-MuiDataGrid-columnHeaderRow': {
                                backgroundColor: 'red',
                                background: 'red'
                            },
                            '& .redColor': {
                                color: "red",
                                fontWeight: 500,
                            },
                            '& .greenColor': {
                                color: "green",
                                fontWeight: 500,
                            }
                        }}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default Userlist
