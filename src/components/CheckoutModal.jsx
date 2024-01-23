import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";

const CheckoutModal = () => {
    const [show, setShow] = useState(false)
    const [activeTab, setActiveTab] = useState("visa")
    const [showCardNum, setShowCardNum] = useState(false)

    const handleTabChange = (tabId) => {
        setActiveTab(tabId)
    }

    const location = useLocation()
    const navigate = useNavigate()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div className='modalCard'>
            <Button variant='primary' onClick={handleShow} className='py-2'>
                Proceed to Payment 
            </Button>
            <Modal show={show} onHide={handleClose} animation={false} className='modal fade' centered>
                <div className="modal-dialog">
                    <h5 className="px-3 mb-3">Select Your Payment Method</h5>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="tabs">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a
                                        className={`nav-link ${
                                            activeTab === "visa" ? "active" : ""
                                        }`}
                                        id="visa-tab"
                                        data-toggle="tab"
                                        href="#visa"
                                        role="tab"
                                        aria-controls="visa"
                                        aria-selected={activeTab === "visa"}
                                        onClick={() => handleTabChange("visa")}
                                        >
                                        <img src="https://i.imgur.com/sB4jftM.png" width="80" />
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                        className={`nav-link ${
                                            activeTab === "paypal" ? "active" : ""
                                        }`}
                                        id="paypal-tab"
                                        data-toggle="tab"
                                        href="#paypal"
                                        role="tab"
                                        aria-controls="paypal"
                                        aria-selected={activeTab === "paypal"}
                                        onClick={() => handleTabChange("paypal")}
                                        >
                                        <img src="https://i.imgur.com/yK7EDD1.png" width="80" />
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div id="visa" role='tabpanel' aria-labelledby='visa-tab'
                                    className={`tab-pane fade ${activeTab === "visa" ? "show active" : ""}`}>
                                        <div className="mt-4 mx-4">
                                            <div className="text-center">
                                                <h5>VISA</h5>
                                            </div>
                                            <div className="form mt-3">
                                                <div className="inputbox">
                                                    <input type="text" name='cardName' className="form-control" placeholder='Cardholder Name' required />
                                                </div>
                                                <div className="inputbox cardnum-input">
                                                    <input type={showCardNum ? "text" : "password"} name='cardNumber' className="form-control" placeholder='Card Number' required />
                                                    <FaEye icon="fa-solid fa-eye" className='cardnum-show' onClick={() => setShowCardNum(!showCardNum)}/>
                                                </div>
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="inputbox">
                                                        <input type='date' name='expiryDate' className='form-control expiry-input' required placeholder='Expiration Date' />
                                                    </div>
                                                    <div className="inputbox">
                                                        <input type='number' name='cvv' max={999} className='form-control cvv-input' required placeholder='CVV' />
                                                    </div>
                                                </div>
                                                <button className='btn btn-primary w-100'>Proceed</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="paypal" role='tabpanel' aria-labelledby='paypal-tab'
                                    className={`tab-pane fade ${activeTab === "paypal" ? "show active" : ""}`}>
                                        <div className="mt-4 mx-4">
                                            <div className="text-center">
                                                <h5>Paypal</h5>
                                            </div>
                                            <div className="form mt-3">
                                                <div className="inputbox">
                                                    <input type="text" name='cardName' className="form-control" placeholder='Cardholder Name' required />
                                                </div>
                                                <div className="inputbox cardnum-input">
                                                    <input type={showCardNum ? "text" : "password"} name='cardNumber' className="form-control" placeholder='Card Number' required />
                                                    <FaEye icon="fa-solid fa-eye" className='cardnum-show' onClick={() => setShowCardNum(!showCardNum)}/>
                                                </div>
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="inputbox">
                                                        <input type='date' name='expiryDate' className='form-control expiry-input' required placeholder='Expiration Date' />
                                                    </div>
                                                    <div className="inputbox">
                                                        <input type='number' name='cvv' max={999} className='form-control cvv-input' required placeholder='CVV' />
                                                    </div>
                                                </div>
                                                <button className='btn btn-primary w-100'>Proceed</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CheckoutModal