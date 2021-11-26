import { Switch, Typography, Select, Divider, Breadcrumb } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Filters = ({ setSearchBy, setSort, setProducts, setLoading }) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState()

    const { Text } = Typography;
    const { Option } = Select;

    const onSwicthChange = (checked) => {
        setSearchBy(checked);
    };

    const handleGridChange = (value) => {
        console.log(value);
        setSort(value);
    };

    const changeCategory = async (name) => {
        setCategory(name)
        if (name === 'All') {
            setLoading(true);
            const { data } = await axios.get(
                `https://fakestoreapi.com/products`
            );
            setProducts(data);
            setLoading(false);
        } else {
            setLoading(true);
            const { data } = await axios.get(
                `https://fakestoreapi.com/products/category/${name}`
            );
            setProducts(data);
            setLoading(false);
        }
    };

    useEffect(async () => {
        setLoading(true);
        const { data } = await axios.get(
            'https://fakestoreapi.com/products/categories'
        );
        setCategories(['All', ...data]);
        setLoading(false);
    }, []);

    return (
        <>
            <div className='flex justify-between items-center mt3 mh3'>
                <div>
                    <Breadcrumb separator=''>
                        <Breadcrumb.Item className='fw6 gray'>
                            Categories
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator>:</Breadcrumb.Separator>
                        {categories?.map((x) => (
                            <span key='x'>
                                <Breadcrumb.Item
                                    className={category === x ? 'pointer fw6 link dim blue ' : 'pointer fw6 link dim gray'}
                                    onClick={() => {
                                        changeCategory(x);
                                    }}
                                >
                                    {x}
                                </Breadcrumb.Item>
                            </span>
                        ))}
                    </Breadcrumb>
                </div>
                <span className='flex'>
                    <div>
                        <Text>Search by :</Text> <br />
                        <Switch
                            checkedChildren='Products'
                            unCheckedChildren='Categories'
                            defaultChecked
                            onChange={onSwicthChange}
                        />
                    </div>
                    <div className='ml3'>
                        <Text>Sort :</Text> <br />
                        <Select
                            defaultValue='asc'
                            style={{ width: 120 }}
                            onChange={(value) => handleGridChange(value)}
                        >
                            <Option value='asc'>Ascending</Option>
                            <Option value='desc'>Descending</Option>
                        </Select>
                    </div>
                </span>
            </div>
            <Divider className='mb0 mt2' />
        </>
    );
};

export default Filters;
