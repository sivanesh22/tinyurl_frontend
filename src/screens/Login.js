
import { Form, Button } from 'react-bootstrap';
import '../css/style.scss';
import * as yup from 'yup';
import { Formik } from 'formik';
import InputText from '../uicomps/InputText';
import GlobalService from '../utils/GlobalService';
import resturls from '../utils/Apiurls';


function Login(props) {
    const schema = yup.object().shape({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const initialValues = {
        email: 'siva@gmail.com',
        password: '123123123123'
    }

    const submitLoginDetails = (values) => {
        let obj = {
            ...values
        }
        GlobalService.generalSelect(
            async (respdata) => {
                const { isCredentialValid, userDetails, errorMsg } = respdata;
                if (isCredentialValid) {
                    props.history.push({
                        pathname: '/dashboard',
                        state: {
                            userDetails
                        }
                    });
                } else if (errorMsg) {
                    alert(errorMsg)
                } else {
                    alert('Invalid Credentials')
                }
            },
            resturls.validateLogin,
            obj,
            'POST',
        );
    }


    const handleSignup = () => {
        props.history.push('/signup')
    }



    return (
        <div className='centerDiv mt-5'>
            <div className='col-3 ' >
                <h1 className='mb-4'>Login</h1>
                <Formik validationSchema={schema} onSubmit={submitLoginDetails} initialValues={initialValues}>
                    {
                        ({ handleSubmit, handleChange, values }) => (
                            <Form onSubmit={handleSubmit} >
                                <InputText className='mb-4' label='Email address' handleChange={handleChange}
                                    type='email' name='email' value={values.email} placeholder="Enter Email" />
                                <InputText className='mb-4' label='Password' handleChange={handleChange}
                                    type='password' name='password' value={values.password} placeholder="Enter Password" />
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
                <p className='mt-5'>Dont have an account <u className='pointer' onClick={handleSignup}>Sign Up</u></p>
            </div>
        </div>
    );
}

export default Login;
