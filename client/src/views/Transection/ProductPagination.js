// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import ReactPaginate from 'react-paginate';


// const PorductPagination = ({ allProduct }) => {
//     const [offset, setOffset] = useState(0)
//     const [tableData, setTableData] = useState([])
//     const [orgtableData, setOrgtableData] = useState([])
//     const [perPage, setPerPage] = useState(10)
//     const [currentPage, setCurrentPage] = useState(0)
//     const [pageCount, setPageCount] = useState(0)

//     const handlePageClick = (e) => {
//         const selectedPage = e.selected;
//         const offset = selectedPage * perPage;

//         setCurrentPage(selectedPage)
//         setOffset(offset)
//         loadMoreData()

//     };

//     const loadMoreData = () => {
//         const data = orgtableData;
//         const slice = data.slice(offset, offset + perPage)
//         setPageCount(Math.ceil(data.length / perPage))
//         setTableData(slice)
//     }
//     useEffect(() => {
//         getData()
//     }, [])
//     const getData = () => {
//         axios.get('/getAllProduct')
//             .then(res => {
//                 var tdata = res.data;
//                 var slice = tdata.slice(offset, offset + perPage)
//                 setPageCount(Math.ceil(tdata.length / perPage))
//                 setOrgtableData(tdata)
//                 setTableData(slice)
//             })
//     }


//     return (
//         <div>
//             <h1>Gk Techy</h1>

//             <table border="1">
//                 <thead>
//                     <th>Id</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Body</th>

//                 </thead>
//                 <tbody>
//                     {
//                         tableData.map((tdata, i) => (
//                             <tr>
//                                 <td>{tdata.id}</td>
//                                 <td>{tdata.name}</td>
//                                 <td>{tdata.email}</td>
//                                 <td>{tdata.body}</td>
//                             </tr>

//                         ))
//                     }

//                 </tbody>
//             </table>
//             <ReactPaginate
//                 previousLabel={"prev"}
//                 nextLabel={"next"}
//                 breakLabel={"..."}
//                 breakClassName={"break-me"}
//                 pageCount={pageCount}
//                 marginPagesDisplayed={2}
//                 pageRangeDisplayed={5}
//                 onPageChange={e=>handlePageClick(e)}
//                 containerClassName={"pagination"}
//                 subContainerClassName={"pages pagination"}
//                 activeClassName={"active"} />
//         </div>
//     )
// }

// export default PorductPagination

import React, { PureComponent } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Table } from 'reactstrap';


export class ProductPagination extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this);

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice
        })

    }

    componentDidMount() {
        this.getData();
    }
    getData() {
        axios
            .get('/getAllProduct')
            .then(res => {
                var tdata = res.data;
                console.log('data-->' + JSON.stringify(tdata))
                var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData: tdata,
                    tableData: slice
                })
            });
    }


    render() {
        return (
            <div>
                <ReactPaginate
                    previousLabel={(<i style={{fontWeight:'bold',cursor:'pointer'}} className="tim-icons icon-minimal-left" />)}
                    nextLabel={(<i style={{fontWeight:'bold',cursor:'pointer'}} className="tim-icons icon-minimal-right" />)}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} 
                />
                <div className="table-full-width table-responsive">
                    <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                            <tr>
                            {/* PRODUCT CODE,	DESCRIPTION,	PRODUCT GROUP CODE,	MOQ,	STATUS	CATALOG CODE,	ACTION */}
                                <th>PRODUCT CODE </th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>MOQ</th>
                                <th>Quota</th>
                                <th>Qty </th>
                                <th>Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tableData.map(el => {
                                    return (
                                        <tr>
                                            <td>{ el.productCode} </td>
                                            <td>Product </td>
                                            <td> MRP </td>
                                            <td> {el.MOQ} </td>
                                            <td>quota</td>
                                            <td><input type="number" placeholder="QTY" style={{width:'70px ',border:"0", borderBottom:'1px solid '}} /></td>
                                            <td> <i style={{fontWeight:'bold',cursor:'pointer'}} className="tim-icons icon-check-2" /> </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default ProductPagination
//  this is  default  component 