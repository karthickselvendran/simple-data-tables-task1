import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Action from '../action/Action';
import Pagination from '../components/Pagination';
import { Row, Col } from "react-bootstrap";
import '../App.css';

const columnHeader = ["id", "name", "email", "body"];

class SimpleDataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            switchSort: false,
            currentRowData: [],
            itemLength: 50,
            perPage: 50,
            input: ""
        }
    }

    componentDidMount() {
        this.props.getData()
        let totalItemsCount = this.state.tableData.length;
        let currentRowData = this.state.tableData.slice(0, 50);
        this.setState({
            currentRowData,
            itemLength: totalItemsCount
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.tableDatas) {
            this.setState({
                tableData: nextProps.tableDatas,
            },
                () => {
                    let totalItemsCount = this.state.tableData.length;
                    let currentRowData = this.state.tableData.slice(0, 50);
                    this.setState({
                        currentRowData,
                        itemLength: totalItemsCount
                    })
                })
        }
    }

    handleSort = (key) => {
        this.setState({
            switchSort: !this.state.switchSort
        })
        let copyTableData = [...this.state.tableData];
        copyTableData.sort(this.compareByDesc(key));
        this.setState({
            currentRowData: copyTableData.slice(0, 50)
        })
    }
    compareByDesc = (key) => {
        if (this.state.switchSort) {
            return function (a, b) {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            };
        } else {
            return function (a, b) {
                if (a[key] > b[key]) return -1;
                if (a[key] < b[key]) return 1;
                return 0;
            };
        }
    }
    generateHeader = () => {
        let res = [];
        for (var i = 0; i < columnHeader.length; i++) {
            res.push(<th key={columnHeader[i]}>
                <a href="#" id={columnHeader[i]} key={columnHeader[i]}
                    onClick={(e) => this.handleSort(e.target.id)}>{columnHeader[i]}</a>
            </th>)
        }
        return res;
    }
    generateTableData() {
        let res = [];
        let tableData = this.state.currentRowData;
        for (var i = 0; i < tableData.length; i++) {
            res.push(
                <tr key={i}>
                    <td key={tableData[i].id}>{tableData[i].id}</td>
                    <td key={tableData[i].name}>{tableData[i].name}</td>
                    <td key={tableData[i].email}>{tableData[i].email}</td>
                    <td key={tableData[i].body}>{tableData[i].body}</td>
                </tr>
            )
        }
        return res;
    }
    handlePageChange = (pageNumber) => {
        let upperLimit = parseInt(pageNumber) * 50;
        let lowerLimit = upperLimit - 50;
        let data = [];
        if (upperLimit <= this.state.itemLength) {
            data = this.state.tableData.slice(lowerLimit, upperLimit);
        } else {
            data = this.state.tableData.slice(lowerLimit);
        }
        this.setState({
            currentRowData: data
        })
    }

    keyWordChange = (e) => {
        this.setState({
            input: e.target.value
        },
            () => {
                let result = this.props.tableDatas.filter(data => (data.name.toLowerCase().includes(this.state.input.toLowerCase()) || data.email.toLowerCase().includes(this.state.input.toLowerCase()) || data.body.toLowerCase().includes(this.state.input.toLowerCase())));
                this.setState({
                    currentRowData: result.splice(0, 50)
                })
            }
        )
    }
    render() {
        return (
            <div>
                <h1 className="textAlnCr">Simple data table</h1><br />
                <Row>
                    <Col>
                        <Pagination
                            perPage={this.state.perPage}
                            tableDatas={this.state.itemLength}
                            paginate={this.handlePageChange}
                        />
                    </Col>
                    <Col></Col>
                    <Col>
                        <input
                            id="inputValue"
                            value={this.state.input}
                            onChange={(e) => this.keyWordChange(e)}
                            class="form-control form-control-sm"
                            type="text"
                            placeholder="Search by name or email or body"
                            aria-label=".form-control-sm example">
                        </input>
                    </Col>
                </Row><br />
                <table className="table table-hover textAlnCr">
                    <thead>
                        <tr>
                            {this.generateHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        tableDatas: state && state.datas ? state.datas : ""

    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        Object.assign({}, Action), dispatch);
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SimpleDataTable);