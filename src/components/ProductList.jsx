import {
    CloseCircleOutlined,
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
import {
    Cart,
    Header,
    ProductDetail,
    Filters,
    Slider,
    ProductSkeleton,
    Footer
} from './index';

const ProductList = ({ setloggedinORloggedout }) => {
    const [products, setProducts] = useState([]);
    const [clickedProduct, setClickedProduct] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [emptyCartFlag, setEmptyCartFlag] = useState(false);
    const [searchBy, setSearchBy] = useState(true);
    const [sort, setSort] = useState();
    const [loading, setLoading] = useState(false);
    const { height, width } = useWindowDimensions();

    const getProducts = async () => {
        setLoading(true);
        const { data } = await axios.get('https://fakestoreapi.com/products');
        setProducts(data);
        setLoading(false);
    };

    const onProductClick = (product) => setClickedProduct(product);

    const addToCart = (product) => {
        setEmptyCartFlag(false);
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
        message.success('Item added sucessfully');
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
        message.success('Item removed sucessfully');
    };

    const onDelete = (product) => {
        setCartProducts(cartProducts.filter((x) => x.id !== product.id));
        message.success('Item deleted sucessfully');
    };

    const emptyCart = () => {
        setCartProducts([]);
        setEmptyCartFlag(true);
        message.success('Cart items removed sucessfully');
    };

    const onSortChange = async () => {
        setLoading(true);
        const { data } = await axios.get(
            `https://fakestoreapi.com/products?sort=${sort}`
        );
        setProducts(data);
        setLoading(false);
    };

    const Head = () => {
        return (
            <div className='flex justify-between items-center'>
                <h3 className='ttu b gray mb0'>shopping cart</h3>
                <Button
                    onClick={() => {
                        setShowCart(false);
                    }}
                    icon={<CloseCircleOutlined />}
                >
                    Close
                </Button>
            </div>
        );
    };

    useEffect(() => {
        onSortChange();
    }, [sort]);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className='bg-near-white'>
            <Header
                setloggedinORloggedout={setloggedinORloggedout}
                setShowCart={setShowCart}
                cartProducts={cartProducts}
                setProducts={setProducts}
                products={products}
                searchBy={searchBy}
                setLoading={setLoading}
            />

            <Slider />

            <Filters
                setSearchBy={setSearchBy}
                setSort={setSort}
                setProducts={setProducts}
                setLoading={setLoading}
            />

            {loading ? (
                <ProductSkeleton />
            ) : (
                <>
                    <Row
                        gutter={width < 450 ? [16, 20] : [40, 50]}
                        className={width < 450 ? 'mt5 ph2' : 'mt4 ph4'}
                    >
                        {products?.map((product) => (
                            <Col xs={12} md={8} lg={6} key={product.id}>
                                <Card
                                    className='p0 shadow-4 product-card'
                                    bodyStyle={
                                        width < 450
                                            ? { height: 300, padding: 15 }
                                            : { height: 300 }
                                    }
                                    actions={[
                                        <span
                                            className={
                                                width < 450
                                                    ? 'ttu b w-100 f5'
                                                    : 'ttu b w-100 f7'
                                            }
                                            onClick={() => {
                                                addToCart(product);
                                            }}
                                        >
                                            <ShoppingCartOutlined className='mr2' />
                                            {width > 450 && 'Add to cart'}
                                        </span>,
                                        <span
                                            className={
                                                width < 450
                                                    ? 'ttu b w-100 f5'
                                                    : 'ttu b w-100 f7'
                                            }
                                            onClick={() => {
                                                onProductClick(product);
                                            }}
                                        >
                                            <EyeOutlined className='mr2' />
                                            {width > 450 && ' view product'}
                                        </span>,
                                    ]}
                                >
                                    <div className='flex justify-center'>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            height='150'
                                        />
                                    </div>
                                    <div className='mt3'>
                                        <span className='moon-gray b f7'>
                                            Category: {product.category}
                                        </span>
                                        <Row>
                                            <Col xs={24} md={18}>
                                                <a
                                                    className={
                                                        width < 450
                                                            ? 'b f6'
                                                            : 'b f5'
                                                    }
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
                                            <Col
                                                xs={24}
                                                md={6}
                                                className={
                                                    width < 450
                                                        ? 'tr mt1'
                                                        : 'tr'
                                                }
                                            >
                                                <span
                                                    className={
                                                        width < 450
                                                            ? 'fw6 f6'
                                                            : 'fw6 f5'
                                                    }
                                                >
                                                    ${product.price.toFixed(2)}
                                                </span>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}

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
                onOk={() => {
                    addToCart(clickedProduct);
                }}
            >
                <ProductDetail product={clickedProduct} />
            </Modal>

            <Drawer
                title={<Head />}
                closeIcon={''}
                onClose={() => {
                    setShowCart(false);
                }}
                visible={showCart}
                width={width > 450 ? '50%' : '100%'}
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
            <Footer />
        </div>
    );
};

export default ProductList;
