import { Row, Col, Divider } from 'antd';
import React from 'react';
import useWindowDimensions from '../window-dimension-hook';

const ProductDetail = ({ product }) => {
    const { height, width } = useWindowDimensions();
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={width > 450 ? 12 : 24}>
                    <img src={product.image} alt={product.title} height='200' />
                </Col>
                <Col span={width > 450 ? 12 : 24}>
                    <div className='moon-gray b f7'>
                        Category: {product.category}
                    </div>
                    <div className='gray mt1 flex justify-between'>
                        <span className='f5 b'>{product.title}</span>
                        <span className='gray f7 b flex items-center'>
                            ${product.price}
                        </span>
                    </div>
                    <div className='flex justify-between mt2'>
                        <span className='gray f7 b'>
                            Rating: {product.rating.rate}/5
                        </span>
                        <span className='f7 gray b'>
                            In Stock: {product.rating.count}
                        </span>
                    </div>
                    <Divider className='mv2' />
                    <div className='b f6 gray'>Description:</div>
                    <p className='f6'>{product.description}</p>
                </Col>
            </Row>
        </>
    );
};

export default ProductDetail;
