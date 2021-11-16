import {
    EyeOutlined,
    EyeTwoTone,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    Divider,
    Drawer,
    message,
    Modal,
    PageHeader,
    Row,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TextTruncate from 'react-text-truncate';
import useWindowDimensions from '../window-dimension-hook';
import Cart from './Cart';
import Header from './Header';
import ProductDetail from './ProductDetail';

const ProductList = ({ setloggedinORloggedout }) => {
    const [products, setProducts] = useState([]);
    const [clickedProduct, setClickedProduct] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [emptyCartFlag, setEmptyCartFlag] = useState(false);
    const { height, width } = useWindowDimensions();

    const getProducts = async () => {
        const { data } = await axios.get('https://fakestoreapi.com/products');
        setProducts(data);
    };

    const onProductClick = (product) => setClickedProduct(product);

    const addToCart = (product) => {
        setEmptyCartFlag(false)
        const exist = cartProducts.find((x) => x.id === product.id);
        if (exist) {
            setCartProducts(
                cartProducts.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCartProducts([...cartProducts, { ...product, qty: 1 }]);
        }
        message.success('Item added sucessfully')
    };

    const onRemove = (product) => {
        const exist = cartProducts.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setCartProducts(cartProducts.filter((x) => x.id !== product.id));
        } else {
            setCartProducts(
                cartProducts.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
        message.success('Item removed sucessfully')
    };

    const onDelete = (product) => {
        setCartProducts(cartProducts.filter((x) => x.id !== product.id));
        message.success('Item deleted sucessfully')
    };

    const emptyCart = () => {
        setCartProducts([]);
        setEmptyCartFlag(true);
        message.success('Cart items removed sucessfully')
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <Header
                setloggedinORloggedout={setloggedinORloggedout}
                setShowCart={setShowCart}
                cartProducts={cartProducts}
            />
            <Row gutter={[16, 50]} className='mt5 ph4'>
                {products?.map((product) => (
                    <Col xs={24} md={8} lg={6} key={product.id}>
                        <Card
                            className='p0 shadow-4 product-card'
                            bodyStyle={{ height: 300 }}
                            actions={[
                                <span
                                    className='ttu b w-100'
                                    onClick={() => {
                                        addToCart(product);
                                    }}
                                >
                                    <ShoppingCartOutlined className='mr2' />
                                    Add to cart
                                </span>,
                                <span
                                    className='ttu b w-100'
                                    onClick={() => {
                                        onProductClick(product);
                                    }}
                                >
                                    <EyeOutlined className='mr2' />
                                    view product
                                </span>,
                            ]}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                height='150'
                            />
                            <div className='mt3'>
                                <span className='moon-gray b f7'>
                                    Category: {product.category}
                                </span>
                                <Row>
                                    <Col span={18}>
                                        <a
                                            className='b f5'
                                            onClick={() => {
                                                onProductClick(product);
                                            }}
                                        >
                                            <TextTruncate
                                                line={2}
                                                text={product.title}
                                                truncateText='…'
                                            />
                                        </a>
                                    </Col>
                                    <Col span={6} className='tr'>
                                        <span className='fw6 f5'>
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                visible={clickedProduct}
                onCancel={() => {
                    setClickedProduct(null);
                }}
                okText={
                    <span className='ttu'>
                        <ShoppingCartOutlined className='mr1' /> add to cart
                    </span>
                }
            >
                <ProductDetail product={clickedProduct} />
            </Modal>

            <Drawer
                title={<h3 className='ttu b gray'>shopping cart</h3>}
                visible={showCart}
                width={width > 450 ? '50%' : '100%'}
                onClose={() => {
                    setShowCart(false);
                }}
            >
                <Cart
                    products={cartProducts}
                    onAdd={addToCart}
                    onRemove={onRemove}
                    setShowCart={setShowCart}
                    onDelete={onDelete}
                    emptyCart={emptyCart}
                    emptyCartFlag={emptyCartFlag}
                />
            </Drawer>
        </>
    );
};

export default ProductList;
