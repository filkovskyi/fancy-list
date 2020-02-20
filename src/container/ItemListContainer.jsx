import React, { Component } from "react"
import { connect } from "react-redux"
import { LIST_FETCH_REQUESTED } from "../constant"
import { List, Row, Col, Layout } from "antd"
import "antd/dist/antd.css"
import FilterBar from "../components/FilterBar"

class ItemListContainer extends Component {
  componentDidMount() {
    this.props.listFetchInitAction()
  }

  render() {
    let data = this.props.filteredData
    //let filteredData = this.props.filteredData
    //filteredData.length > 0 ? (data = filteredData) : (data = this.props.data)
    return (
      <Layout>
        <Row>
          <Col offset={6} span={12}>
            <h3 style={{ marginBottom: 16 }}>All list</h3>
            <List
              bordered
              header={<FilterBar />}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <span>{item.accountNumber} </span>
                  <span>{item.financialAccountCategory} </span>
                  <span>{item.financialAccountCategory} </span>
                  <span>{item.currentVatPercentage}% </span>
                  <span>({item.vatCategoryCode}) </span>
                  <span>{item.name} </span>
                  <button onClick={e => console.log(e)}>Edit</button>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    filteredData: state.filteredData,
    loading: state.loading,
    error: state.error
  }
}

// TODO:REFACTOR make actionCreater in separate file
const mapDispatchToProps = dispatch => {
  return {
    listFetchInitAction: () => {
      dispatch({ type: LIST_FETCH_REQUESTED })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemListContainer)
