import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Empty, Row } from 'antd';
import React, { useEffect } from 'react';
import TextTruncate from 'react-text-truncate';
import { useState } from 'react/cjs/react.development';
import emptyCartImg from '../assets/images/empty-cart.png';

const Cart = ({
    products,
    onAdd,
    onRemove,
    setShowCart,
    onDelete,
    emptyCart,
    emptyCartFlag,
}) => {
    const [cartTotal, setCartTotal] = useState(0);
    const calculateTotal = () => {
        let totalArr = [];
        if (!emptyCartFlag) {
            products.map((product) => {
                if (product.qty > 1) {
                    let amount = product.qty * product.price;
                    totalArr.push(amount);
                } else {
                    totalArr.push(product.price);
                }
            });

            if (totalArr.length > 0) {
                const reducer = (previousValue, currentValue) =>
                    previousValue + currentValue;
                setCartTotal(totalArr.reduce(reducer).toFixed(2));
            }
        } else {
            setCartTotal(0)
        }
    };

    useEffect(() => {
        calculateTotal();
    }, [products, emptyCartFlag]);

    return (
        <>
            <h4 className='b ttu tr'>Total: ${cartTotal}</h4>
            {products.length === 0 ? (
                <div
                    className='flex items-center justify-center'
                    style={{ height: '80vh' }}
                >
                    <Empty
                        image={emptyCartImg}
                        imageStyle={{
                            height: 60,
                        }}
                        description={<span>No Cart Items!</span>}
                    >
                        <Button
                            type='primary'
                            onClick={() => {
                                setShowCart(false);
                            }}
                        >
                            Add Now
                        </Button>
                    </Empty>
                </div>
            ) : (
                products.map((product) => (
                    <Card
                        key={product.id}
                        className='mv4 shadow-4'
                        actions={[
                            <Button
                                type='text'
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    onDelete(product);
                                }}
                            />,
                            <Button
                                type='text'
                                onClick={() => {
                                    onAdd(product);
                                }}
                                primary
                                icon={<PlusOutlined />}
                            />,
                            <Button
                                type='text'
                                danger
                                icon={<MinusOutlined />}
                                onClick={() => {
                                    onRemove(product);
                                }}
                            />,
                        ]}
                    >
                        <Row>
                            <Col span={8}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    height='100'
                                />
                            </Col>
                            <Col span={16}>
                                <div className='b moon-gray f7'>
                                    Category: {product.category}
                                </div>
                                <div className='b gray f6'>{product.title}</div>
                                <div className='mt3'>
                                    <div className='fw6 f7'>
                                        Quantity: {product.qty}
                                    </div>
                                    <div className='fw6 f7'>
                                        Initial Price: $
                                        {product.price.toFixed(2)}
                                    </div>
                                    <div className='fw6 f7'>
                                        Total Price: $
                                        {(product.qty * product.price).toFixed(
                                            2
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                ))
            )}
            <div className='flex justify-between'>
                <Button className='w-100' size='large' type='text' primary>
                    Checkout
                </Button>
                <Button
                    className='w-100'
                    size='large'
                    type='text'
                    danger
                    onClick={emptyCart}
                >
                    Empty Cart
                </Button>
            </div>
        </>
    );
};

export default Cart;
