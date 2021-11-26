import React, { useEffect, useState } from 'react';
import { message, Select, Spin, Switch } from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const Search = ({ setProducts, products, searchBy, device, setIsLoading }) => {
    const [loading, setLoading] = useState();
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState([]);

    let _searchArr = [];

    const onChange = async (value) => {
        console.log(value);
        if (value && value !== undefined) {
            if (searchBy) {
                let _products = [...products];
                if (_products.length > 0) {
                    const prods = _products.filter((product) => {
                        console.log(product.title);
                        return product.title === value;
                    });
                    setProducts(prods);
                }
            } else {
                const { data } = await axios.get(
                    `https://fakestoreapi.com/products/category/${value}`
                );
                setProducts(data);
            }
        } else {
            const { data } = await axios.get(
                `https://fakestoreapi.com/products`
            );
            setProducts(data);
        }
    };

    const onSearch = (text) => {
        setLoading(true);
        if (text.length > 2) {
            try {
                if (searchBy) {
                    products.map((product) => {
                        if (product.title.toLowerCase().includes(text)) {
                            _searchArr.push(product);
                        }
                    });
                } else {
                    categories.map((x) => {
                        if (x.includes(text)) {
                            _searchArr.push(x);
                        }
                    });
                }

                setSearch(_searchArr);
                setLoading(false);
            } catch (err) {
                message.error('Something went wrong!');
                setLoading(false);
            }
        }
    };

    useEffect(async () => {
        const { data } = await axios.get(
            'https://fakestoreapi.com/products/categories'
        );
        setCategories(data);
    }, []);

    return (
        <>
            <Select
                showSearch
                style={ device === 'sm' ? { width: '100%' } : { width: 400 }}
                placeholder='Search...'
                optionFilterProp='children'
                onChange={(value) => onChange(value)}
                onSearch={onSearch}
                suffixIcon={<SearchOutlined />}
                notFoundContent={loading ? <Spin size='small' /> : null}
                allowClear
                onClear={() => {
                    setSearch([]);
                }}
                filterOption={(input, option) =>
                    option.children &&
                    option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                }
            >
                {search.map((s) =>
                    searchBy ? (
                        <Option key={s.id} value={s.title}>
                            {s.title}
                        </Option>
                    ) : (
                        <Option key={s} value={s}>
                            {s}
                        </Option>
                    )
                )}
            </Select>
        </>
    );
};

export default Search;
