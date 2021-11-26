import { LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, PageHeader, Tooltip } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import useWindowDimensions from '../window-dimension-hook';
import { Search } from './index';
import logo from '../assets/images/logo.png';

const Header = ({
    children,
    setloggedinORloggedout,
    setShowCart,
    cartProducts,
    setProducts,
    products,
    searchBy,
    setLoading
}) => {
    const [reRender, setReRender] = useState();
    const [productCount, setProductCount] = useState(0);
    const { height, width } = useWindowDimensions();

    const onLogout = () => {
        localStorage.setItem('isLoggedIn', false);
        setReRender(Math.random());
        setloggedinORloggedout(false);
    };

    useEffect(() => {
        let quantity = [];
        for (let p of cartProducts) {
            if (p.qty) {
                quantity.push(p.qty);
            }
        }
        if (quantity.length > 0) {
            const reducer = (previousValue, currentValue) =>
                previousValue + currentValue;
            setProductCount(quantity.reduce(reducer));
        } else {
            setProductCount(0);
        }
    }, [cartProducts]);

    return (
        <>
            <PageHeader
                key={reRender}
                className='shadow-5'
                title={
                    width > 450 ? (
                        <h3
                            className='ttu fw6 tc mt0 mb0 ml2'
                            style={{ color: '#4215cd' }}
                        >
                            scommerce
                        </h3>
                    ) : (
                        <h4
                            className='ttu fw6 tc mt0 mb0'
                            style={{ color: '#4215cd' }}
                        >
                            scommerce
                        </h4>
                    )
                }
                extra={[
                    <span style={width < 450 ? { display: 'none' } : { display: 'block' }}>
                        <Search
                            setProducts={setProducts}
                            products={products}
                            searchBy={searchBy}
                            setIsLoading={setLoading}
                            
                        />
                    </span>,
                    <Tooltip title='Shopping Cart'>
                        <Badge count={productCount} showZero>
                            <Button
                                type='default'
                                icon={<ShoppingCartOutlined />}
                                onClick={() => {
                                    setShowCart(true);
                                }}
                                size={width < 450 ? 'small' : 'middle'}
                            />
                        </Badge>
                    </Tooltip>,

                    <Button
                        onClick={onLogout}
                        type='danger'
                        icon={<LogoutOutlined />}
                        size={width < 450 ? 'small' : 'middle'}
                    >
                        Logout
                    </Button>,
                ]}
            ></PageHeader>
            {width < 450 && (
                <div className='mv3 mh2'>
                    <Search
                        device='sm'
                        setProducts={setProducts}
                        products={products}
                        searchBy={searchBy}
                    />
                </div>
            )}
        </>
    );
};

export default Header;
