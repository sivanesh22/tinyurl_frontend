
import { Form, Button } from 'react-bootstrap';
import '../css/style.scss';
import * as yup from 'yup';
import { Formik } from 'formik';
import InputText from '../uicomps/InputText';
import GlobalService from '../utils/GlobalService';
import resturls from '../utils/Apiurls';

function Signup(props) {
    const schema = yup.object().shape({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required'),
        username: yup.string().required('Username is required'),
        phone: yup.string().required('Phone number is required'),
        account: yup.string().required('Account Name is required')
    });

    const initialValues = {
        email: '',
        password: '',
        username: '',
        phone: '',
        account: ''
    }

    const handleCreateAccount = (values) => {
        let obj = {
            ...values
        }
        GlobalService.generalSelect(
            async (respdata) => {
                props.history.push('/dashboard')
            },
            resturls.saveAccountandUser,
            obj,
            'POST',
        );
    }


    const handleSignin = () => {
        props.history.push('/login')
    }

    return (
        <div className='centerDiv mt-5'>
            <div className='col-3 ' >
                <h1 className='mb-4'>Sign Up</h1>
                <Formik validationSchema={schema} onSubmit={handleCreateAccount} initialValues={initialValues}>
                    {
                        ({ handleSubmit, handleChange, values }) => (
                            <Form onSubmit={handleSubmit} >
                                <InputText className='mb-4' label='Name' handleChange={handleChange}
                                    type='text' name='username' value={values.username} placeholder="Enter username" />
                                <InputText className='mb-4' label='Phone Number' handleChange={handleChange}
                                    type='text' name='phone' value={values.phone} placeholder="Enter phone number" />
                                <InputText className='mb-4' label='Email address' handleChange={handleChange}
                                    type='email' name='email' value={values.email} placeholder="Enter Email" />
                                <InputText className='mb-4' label='Password' handleChange={handleChange}
                                    type='password' name='password' value={values.password} placeholder="Enter password" />
                                <InputText className='mb-4' label='Account Name' handleChange={handleChange}
                                    type='text' name='account' value={values.account} placeholder="Enter account name" />
                                <Button variant="primary" type="submit">
                                    Create
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
                <p className='mt-5'>Already Having an account <u className='pointer' onClick={handleSignin}>Login</u></p>
            </div>
        </div>
    );
}

export default Signup;
