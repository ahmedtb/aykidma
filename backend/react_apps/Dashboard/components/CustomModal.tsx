import React from 'react'
import { Modal } from 'react-bootstrap'


export default function CustomModal(props: {
    label: React.ReactNode,
    icon?: React.ReactNode,
    children: ((handleClose?: () => void, handleShow?: () => void) => React.ReactNode) | React.ReactNode,
    buttonClass?: string,
    size?: "xl" | "sm" | "lg"
}) {
    const label = props.label
    const children = props.children
    const buttonClass = props.buttonClass

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div >

            <button className={buttonClass} onClick={handleShow}>
                {props.icon ?? label}
            </button>

            <Modal show={show} onHide={handleClose} size={props.size ?? "lg"} >
                <div className=''>
                    <Modal.Header>
                        <Modal.Title>{label}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {typeof children === 'function' ? children(handleClose, handleShow) : children}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-secondary' onClick={handleClose}>
                            إغلاق
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    )
}