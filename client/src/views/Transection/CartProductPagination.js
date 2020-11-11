import React, { PureComponent } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Table } from 'reactstrap';


export class CartProductPagination extends PureComponent {

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
                    previousLabel={(<i style={{ fontWeight: 'bold', cursor: 'pointer' }} className="tim-icons icon-minimal-left" />)}
                    nextLabel={(<i style={{ fontWeight: 'bold', cursor: 'pointer' }} className="tim-icons icon-minimal-right" />)}
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
                                <th>Code </th>
                                <th>Product</th>
                                <th>Qty </th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tableData.map(el => {
                                    return (
                                        <tr>
                                            <td>{el.productCode} </td>
                                            <td>Product </td>
                                            <td> qty </td>
                                            <td>Amount</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr className="bg-warning text-white">
                                <td></td>
                                <td className="text-right">Total : </td>
                                <td>43</td>
                                <td>34532</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default CartProductPagination
//  this is  default  component