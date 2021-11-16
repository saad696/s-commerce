import React, { useState } from 'react';
import { Button, Form, Input, Card, message, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { TextLoop } from 'react-text-loop-next';

const Login = ({ setloggedinORloggedout }) => {
    const [loginDetails, setLoginDetails] = useState({
        id: 'scommerce',
        pass: 'scommerce@123',
    });

    const [form] = useForm();

    const onFormSubmit = (values) => {
        if (
            values.username === loginDetails.id &&
            values.password === loginDetails.pass
        ) {
            message.success('Successfully logged in');
            localStorage.setItem('isLoggedIn', true);
            setloggedinORloggedout(true);
            form.resetFields();
        } else {
            message.error('Wrong login details');
            form.resetFields();
        }
    };

    return (
        <>
            <div className='vh-100 flex justify-center items-center'>
                <Card
                    className='w-40 shadow-4'
                    bodyStyle={{ padding: '0px 0px 20px' }}
                >
                    <Alert
                        banner
                        type='info'
                        message={
                            <TextLoop mask>
                                <div>
                                    Username:{' '}
                                    <span className='fw6'>scommerce</span>
                                </div>
                                <div>
                                    Password:{' '}
                                    <span className='fw6'>scommerce@123</span>
                                </div>
                            </TextLoop>
                        }
                    />
                    <h1 className='ttu fw6 tc mt0 gray'>s-commerce login</h1>
                    <Form
                        form={form}
                        onFinish={onFormSubmit}
                        layout='vertical'
                        className='ph4'
                    >
                        <Form.Item
                            name='username'
                            label='Username'
                            rules={[
                                {
                                    required: true,
                                    message: 'Username is required.',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                maxLength={20}
                                placeholder='Enter Username'
                                autoComplete='off'
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Password is required.',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                maxLength={20}
                                placeholder='Enter Password'
                                autoComplete='off'
                            />
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Login
                        </Button>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default Login;
