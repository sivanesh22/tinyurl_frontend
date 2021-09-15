

import React, { useEffect, useState } from 'react';
import '../css/style.scss';
import { Button, Form, Modal } from 'react-bootstrap';
import GlobalService from '../utils/GlobalService';
import resturls from '../utils/Apiurls';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { restbaseurl } from '../utils/Constants';
import { useSelector, useDispatch } from 'react-redux'
import { updateUserInfo } from '../redux/actions';
import BootstrapModal from '../uicomps/BootstrapModal'
import CreateUser from './CreateUser';

function Dashboard(props) {
    const [urlList, updateUrlList] = useState([]);
    const [loading, handleLoadingChange] = useState(true);
    const [longUrl, handleLongUrlChange] = useState('');
    const [showModal, setShowModal] = useState('');
    const [emailList, handleChangeEmailList] = useState('');
    const [tempObj, handleChangeTempObj] = useState({ tinyUrl: '', originalUrl: '' })

    useEffect(() => {
        fetchAllUrls()
    }, []);

    const fetchAllUrls = () => {
        GlobalService.generalSelect(
            async (respdata) => {
                updateUrlList(respdata.urlList)
                handleLoadingChange(false)
            },
            resturls.fetchAllUrl,
            {},
            'GET',
        );
    }

    const removeUrl = (tinyUrl) => {
        GlobalService.generalSelect(
            async (respdata) => {

                updateUrlList(respdata.urlList)
            },
            resturls.removeTinyUrl,
            { tinyUrl },
            'POST',
        );
    }

    const generateTinyURL = () => {
        GlobalService.generalSelect(
            async (respdata) => {
                if (respdata.newTinyurlCreated) {
                    handleLongUrlChange('')
                    alert('Created Successfully')
                }else if(respdata.alreadyExists){
                    alert('Tinyurl already generated')
                }
            },
            resturls.generateTinyURL,
            { longUrl },
            'POST',
        );
    }

    const handleValueChange = (e) => {
        if (e.target.name === 'longUrl') {
            handleLongUrlChange(e.target.value)
        } else if (e.target.name === 'emailList') {
            handleChangeEmailList(e.target.value)
        }
    }

    const logoutUser = () => {
        GlobalService.generalSelect(
            async (respdata) => {
                props.history.push('/login')
            },
            resturls.logout,
            {},
            'GET',
        );
    }


    const shareViaEmail = () => {
        let emailDataList = emailList.replace(/\s/g, "").split(',');
        GlobalService.generalSelect(
            async (respdata) => {
                hideModal();
                alert('Shared successfully')
            },
            resturls.shareTinyUrlViaEmail,
            { emailList: emailDataList, tinyUrl: tempObj.tinyUrl, originalUrl: tempObj.originalUrl },
            'POST',
        );
    }

    const { userDetails } = props.location;
    console.log(userDetails,'userDetails')
    const userName = useSelector(state => state.userInfo.username);
    const dispatch = useDispatch();


    const hideModal = () => setShowModal('');
    const handleShow = (tinyUrl, originalUrl) => {
        const tempObj = {};
        tempObj.tinyUrl = tinyUrl;
        tempObj.originalUrl = originalUrl;
        handleChangeTempObj(tempObj)
        setShowModal('emailModal');
    }
    let displayModalData = '';
    switch (showModal) {

        case 'emailModal':
            displayModalData = <><Modal.Body>
                <p>You can provide multiple email address by comma seperated</p>
                <Form.Control onChange={handleValueChange} type='text' name='emailList' value={emailList}
                    placeholder='Enter Email' />
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={shareViaEmail}>
                        Send Email
                    </Button>
                    <Button variant="secondary" onClick={hideModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </>
            break;
        case 'userCreationModal':
            displayModalData = <CreateUser  handleCloseModal={hideModal} />
            break;
        default:
            displayModalData = '';

    }


    return (

        loading ? null : <div className='container mt-5'>
            {displayModalData ? <BootstrapModal showModal={true}>
                {displayModalData}
            </BootstrapModal> : null}
            <div className='' >
                {userName ? <span>Welcome  {userName}</span> : <button
                    onClick={() => dispatch(updateUserInfo(userDetails))}
                >
                    Save Info to store
                </button>}

                <span className='right pointer' onClick={logoutUser}>Logout</span>
                <Button className=' pointer ml-10' type='button' onClick={() => setShowModal('userCreationModal')}>Create User</Button>
                <h1 className='mt-5'>Create New Short URL</h1>
                <Form.Control onChange={handleValueChange} type='text' name='longUrl' value={longUrl}
                    placeholder='Enter Long URL' />
                <Button className='mt-3' type='button' onClick={generateTinyURL}>Create Tiny Url</Button>
                <Button className='mt-3 ml-10' onClick={fetchAllUrls}>Fetch All URLs</Button>
            </div>
            <h1 className='mt-5'>URL list</h1>
            <table>
                {/* path: '/tinyurl/{code}', */}
                <tbody>
                    <tr>
                        <th>Original URL</th>
                        <th>Tiny Url</th>
                        <th>Copy to clipboard</th>
                        <th>Share via email</th>
                        <th>Remove</th>
                    </tr>
                    {urlList.length ? urlList.map(data => {
                        return (
                            <tr key={data.tinyUrl}>
                                <td>{data.originalUrl}</td>
                                <td>{data.tinyUrl}</td>
                                <td>
                                    <CopyToClipboard text={`${restbaseurl}${resturls.redirectTinyUrl}/${data.tinyUrl}`}
                                        onCopy={() => alert('Copied')}>
                                        <button className='removebutton'>Copy to clipboard </button>
                                    </CopyToClipboard></td>
                                <td><button className='removebutton' onClick={() => handleShow(data.tinyUrl, data.originalUrl)} >Email</button></td>
                                <td><button className='removebutton' onClick={() => removeUrl(data.tinyUrl)} >Remove</button></td>
                            </tr>
                        )
                    }) : <tr>
                        <td colSpan='3'>No data found</td>
                    </tr>}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
