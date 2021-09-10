

import React, { useEffect, useState } from 'react';
import '../css/style.scss';
import { Button, Form } from 'react-bootstrap';
import GlobalService from '../utils/GlobalService';
import resturls from '../utils/Apiurls';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { restbaseurl } from '../utils/Constants';
import { useSelector, useDispatch } from 'react-redux'
import { updateUserInfo } from '../redux/actions';


function Dashboard(props) {
    const [urlList, updateUrlList] = useState([]);
    const [loading, handleLoadingChange] = useState(true);
    const [longUrl, handleLongUrlChange] = useState('');



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

    const { userDetails } = props.location.state;
    const userName = useSelector(state => state.userInfo.username);
    const dispatch = useDispatch();
    return (

        loading ? null : <div className='container mt-5'>
            <div className='' >
                {userName ? <span>Welcome  {userName}</span> : <button
                    onClick={() => dispatch(updateUserInfo(userDetails))}
                >
                    Save Info to store
                </button>}
                
                <span className='right pointer' onClick={logoutUser}>Logout</span>
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
