import { Switch, Typography, Select, Divider, Breadcrumb } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useWindowDimensions from '../window-dimension-hook';

const Filters = ({ setSearchBy, setSort, setProducts, setLoading }) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const { height, width } = useWindowDimensions();

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
        setCategory(name);
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
            <div
                className={`flex items-start justify-end mt1 ${
                    width < 450 ? 'mr1' : 'mr4'
                }`}
            >
                <div>
                    <Text className={width < 450 && 'f7'}>Search by :</Text>{' '}
                    <br />
                    <Switch
                        size={width < 450 ? 'small' : 'default'}
                        checkedChildren='Products'
                        unCheckedChildren='Categories'
                        defaultChecked
                        onChange={onSwicthChange}
                    />
                </div>
                <div className='ml3'>
                    <Text className={width < 450 && 'f7'}>Sort :</Text> <br />
                    <Select
                        size={width < 450 ? 'small' : 'default'}
                        defaultValue='asc'
                        style={width < 450 ? { width: 150 } : { width: 250 }}
                        onChange={(value) => handleGridChange(value)}
                    >
                        <Option value='asc'>Ascending</Option>
                        <Option value='desc'>Descending</Option>
                    </Select>
                </div>
                <div className='ml3'>
                    <Text className={width < 450 && 'f7'}>Category :</Text>{' '}
                    <br />
                    <Select
                        size={width < 450 ? 'small' : 'default'}
                        defaultValue='All'
                        style={width < 450 ? { width: 150 } : { width: 250 }}
                        onChange={(value) => changeCategory(value)}
                    >
                        {categories?.map((x) => (
                            <Option key={x} value={x}>
                                {x}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
            <Divider className='mb0 mt2' />
        </>
    );
};

export default Filters;
