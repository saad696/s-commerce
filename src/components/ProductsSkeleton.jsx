import { Card, Col, Row, Skeleton } from 'antd';
import React from 'react';
import useWindowDimensions from '../window-dimension-hook';

const ProductsSkeleton = () => {
    const { height, width } = useWindowDimensions();
    const array = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <>
            <Row
                gutter={width < 450 ? [16, 20] : [40, 50]}
                className={width < 450 ? 'mt5 ph2' : 'mt4 ph4'}
            >
                {array.map((x) => (
                    <Col xs={12} md={8} lg={6} key={x}>
                        <Card>
                            <Skeleton.Image active/>
                            <Skeleton active />
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default ProductsSkeleton;
