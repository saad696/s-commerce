import { LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, PageHeader, Tooltip } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import useWindowDimensions from '../window-dimension-hook';

const Header = ({
    children,
    setloggedinORloggedout,
    setShowCart,
    cartProducts,
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
                        <h3 className='ttu fw6 tc mt0 gray mb0'>
                            s-commerce login
                        </h3>
                    ) : (
                        <h6 className='ttu fw6 tc mt0 gray mb0'>
                            s-commerce login
                        </h6>
                    )
                }
                extra={[
                    <Tooltip title='Shopping Cart'>
                        <Badge count={productCount} showZero>
                            <Button
                                type='default'
                                icon={<ShoppingCartOutlined />}
                                onClick={() => {
                                    setShowCart(true);
                                }}
                                size={width < 450 ? 'small' : 'large'}
                            />
                        </Badge>
                    </Tooltip>,

                    <Button
                        onClick={onLogout}
                        type='danger'
                        icon={<LogoutOutlined />}
                        size={width < 450 ? 'small' : 'large'}
                    >
                        Logout
                    </Button>,
                ]}
            ></PageHeader>
        </>
    );
};

export default Header;
