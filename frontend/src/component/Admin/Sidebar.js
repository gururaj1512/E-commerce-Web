import React from 'react'
import Logo from "../../images/logo.png";
import { Link } from 'react-router-dom';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const Sidebar = () => {



    return (
        <div className='h-full w-1/5 sm:w-1/4 bg-slate-100'>
            <Link to="/" className="">
                <img src={Logo} alt="Ecommerce" className='w-5/6 mx-auto py-4' />
            </Link>
            <SimpleTreeView>
                <TreeItem itemId="grid" label="Products">
                    <Link to={'/admin/products'}>
                        <TreeItem itemId="grid-community" label="All" />
                    </Link>
                    <Link to={'/admin/product'}>
                        <TreeItem itemId="grid-pro" label="Create" />
                    </Link>
                </TreeItem>
                <Link to={'/admin/orders'}>
                    <TreeItem itemId="pickers" label="Orders" />
                </Link>
                <Link to={'/admin/users'}>
                    <TreeItem itemId="charts" label="Users"></TreeItem>
                </Link>
                <Link to={'/admin/reviews'}>
                    <TreeItem itemId="tree-view" label="Reviews"></TreeItem>
                </Link>
            </SimpleTreeView>
        </div>
    )
}

export default Sidebar
