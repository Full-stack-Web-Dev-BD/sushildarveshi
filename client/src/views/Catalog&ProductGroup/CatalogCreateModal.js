/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import Axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const CatalogCreateModal = (props) => {
    const {
        buttonLabel,
        className,
        getAll
    } = props;

    const [catalogCode, setCatalogCode] = useState('')
    const [description, setdescription] = useState('')

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    const submitHandler=(e)=>{
        e.preventDefault()
        let obj={
            catalogCode:catalogCode.toUpperCase(),
            description:description
        }
        Axios.post('/createProductCatalog',obj)
        .then(res=>{
            toggle()
            getAll()
        })
        .catch(err=>{
            toggle()
            alert('This Catalog is Existing  or Try later ')
            console.log(err);
        })
    }
    

    return (
        <div>
            <Button color="success" size="sm" onClick={toggle}>Create A Catalog</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Create Product </ModalHeader>
                <ModalBody>
                    <form className="row" onSubmit={e=>submitHandler(e)}>
                        <div className="col-md-6">
                            <label>Catalog Code</label>
                            <Input style={{textTransform:'uppercase'}} type="text" required onChange={e => setCatalogCode(e.target.value)} placeholder="Catalog Code" />
                        </div>
                        <div className="col-md-6">
                            <label>Description</label>
                            <Input type="text"  onChange={e => setdescription(e.target.value)} placeholder="Description" />
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

export default CatalogCreateModal;