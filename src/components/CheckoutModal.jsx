import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

const CheckoutModal = () => {
    const [show, setShow] = useState(false)
    const [activeTab, setActiveTab] = useState("visa")

    const location = useLocation()
    const navigate = useNavigate()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div className='modalCard'>
            <Button variant='primary' onClick={handleShow} className='py-2'>
                Proceed to Checkout 
            </Button>
            <Modal show={show} onHide={handleClose} animation={false} className='modal fade' centered>
                <div className="modal-dialog">
                    <h5 className="px-3 mb-3">Select Your Payment Method</h5>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="tabs mt-3">
                                <ul className="nav nav-tabs" id='myTab' role='tablist'>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CheckoutModal