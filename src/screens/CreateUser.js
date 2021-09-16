
import { Form, Button } from 'react-bootstrap';
import '../css/style.scss';
import * as yup from 'yup';
import { Formik } from 'formik';
import InputText from '../uicomps/InputText';
import GlobalService from '../utils/GlobalService';
import resturls from '../utils/Apiurls';


function CreateUser(props) {
    const schema = yup.object().shape({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required'),
        username: yup.string().required('Username is required'),
        phone: yup.string().required('Phone number is required'),
    });

    const initialValues = {
        email: '',
        password: '',
        username: '',
        phone: '',
    }

    const handleCreateAccount = (values) => {
        let obj = {
            ...values
        }
        GlobalService.generalSelect(
            async (respdata) => {
                const { userCreated } = respdata;
                if (userCreated) {
                    alert('User Created Successfully')
                    props.handleCloseModal()
                } else {
                    alert('User creation failed')
                }

            },
            resturls.addUser,
            obj,
            'POST',
        );
    }

    return (
        <div className='mt-5 pad-10'>
            <div className='mb-5'>
                <h1 className='mb-4'>Create User</h1>
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
                                <Button variant="primary" type="submit">
                                    Create User
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}

export default CreateUser;
