/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import Axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const ProductCreateModal = (props) => {
    const {
        buttonLabel,
        className
    } = props;
    const [productCode, setproductCode] = useState('')
    const [description, setdescription] = useState('')
    const [productGroupCode, setproductGroupCode] = useState('')
    const [MOQ, setMOQ] = useState('')
    const [status, setstatus] = useState('')
    const [catalogCode, setcatalogCode] = useState('')

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    const submitHandler=()=>{
        let obj={
            state:this.state.state,
            productCode:this.state.productCode,
            description:this.state.description,
            productGroupCode:this.state.productGroupCode,
            MOQ:this.state.MOQ,
            status:this.state.status,
            catalogCode:this.state.catalogCode
        }
        Axios.post('/createProduct',obj)
        .then(res=>{
            toggle()
        })
        .catch(err=>{
            console.log(err);
        })
    }
    

    return (
        <div>
            <Button color="success" size="sm" onClick={toggle}>Create A Product</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Create Product </ModalHeader>
                <ModalBody>
                    <form className="row">
                        <div className="col-md-6">
                            <label>Product Code</label>
                            <Input type="text" required onChange={e => setproductCode(e.target.value)} placeholder="Product Code" />
                        </div>
                        <div className="col-md-6">
                            <label>Description</label>
                            <Input type="text" required onChange={e => setdescription(e.target.value)} placeholder="Description" />
                        </div>
                        <div className="col-md-6">
                            <label>Product Group Code</label>
                            <Input type="text" required onChange={e => setproductGroupCode(e.target.value)} placeholder="Product GroupCode" />
                        </div>
                        <div className="col-md-6">
                            <label>MOQ</label>
                            <Input type="text" required onChange={e => setMOQ(e.target.value)} placeholder="MOQ" />
                        </div>
                        <div className="col-md-6">
                            <label>Status</label>
                            <Input type="text" required onChange={e => setstatus(e.target.value)} placeholder="Status" />
                        </div>
                        <div className="col-md-6">
                            <label>Catalog Code</label>
                            <Input type="text" required onChange={e => setcatalogCode(e.target.value)} placeholder="Catalog Code" />
                        </div>

                        <ModalFooter>
                            <Button size="sm" className="mr-3" color="primary" type="submit" >Create </Button>
                            <Button size="sm" color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ProductCreateModal;