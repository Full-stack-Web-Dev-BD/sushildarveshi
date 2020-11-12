import Axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const ProductUpdateModal = ({className,productInfo,getAll}) => {
    const [productCode, setproductCode] = useState(productInfo.productCode)
    const [description, setdescription] = useState(productInfo.description)
    const [productGroupCode, setproductGroupCode] = useState(productInfo.productGroupCode)
    const [MOQ, setMOQ] = useState(productInfo.MOQ)
    const [status, setstatus] = useState(productInfo.status)
    const [catalogCode, setcatalogCode] = useState(productInfo.catalogCode)

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    const submitHandler=(e)=>{
        e.preventDefault()
        let obj={
            productCode:productCode,
            description:description,
            productGroupCode:productGroupCode,
            MOQ:MOQ,
            status:status,
            catalogCode:catalogCode
        }
        Axios.post(`/updateProduct/${productInfo._id}`,obj)
        .then(res=>{
            getAll()
            toggle()
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div>
             <i style={{cursor:'pointer'}} className=" tim-icons icon-pencil" onClick={toggle}></i> 
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Create Catalog </ModalHeader>
                <ModalBody>
                    <form onSubmit={e=>submitHandler(e)} className="row">
                        <div className="col-md-6">
                            <label>Catalog  Code</label>
                            <Input type="text" required value={productCode} onChange={e => setproductCode(e.target.value)} placeholder="Product Code" />
                        </div>
                        <div className="col-md-6">
                            <label>Description</label>
                            <Input type="text" required value={description} onChange={e => setdescription(e.target.value)} placeholder="Description" />
                        </div>
                        <ModalFooter>
                            <Button size="sm" className="mr-3" color="primary" type="submit" >Create</Button>
                            <Button size="sm" color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ProductUpdateModal;