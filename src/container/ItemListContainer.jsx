import React, { Component } from "react"
import { connect } from "react-redux"
import { LIST_FETCH_REQUESTED, CREATE_FORM_ITEM } from "../constant"
import { List, Row, Col, Layout, Button } from "antd"
import "antd/dist/antd.css"
import FilterBar from "../components/FilterBar"
// import WrappedAccountForm from "../components/AccountForm"
import SimpleForm from "../components/SimpleForm"

class ItemListContainer extends Component {
  constructor(props) {
    super(props)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }
  componentDidMount() {
    this.props.listFetchInitAction()
  }

  handleSubmitForm(values) {
    this.props.submitForm(values)
  }

  render() {
    let data = this.props.filteredData
    return (
      <Layout>
        <Row>
          <Col offset={6} span={12}>
            <h3 style={{ marginBottom: 16 }}>Filkovskyi Sergey</h3>
            <SimpleForm onSubmit={this.handleSubmitForm} />

            <List
              bordered
              header={<FilterBar />}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Col className="account-label" span={22}>
                    {item.accountNumber} -{item.financialAccountCategory} -
                    {item.currentVatPercentage}% - ({item.vatCategoryCode}) -{item.name}
                  </Col>
                  <Col span={2}>
                    <Button icon="edit" type="link" onClick={e => console.log(e)}>
                      Edit
                    </Button>
                  </Col>
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
    data: state.rootReducer.data,
    filteredData: state.rootReducer.filteredData,
    loading: state.rootReducer.loading,
    error: state.rootReducer.error
  }
}

// TODO:REFACTOR make actionCreater in separate file
const mapDispatchToProps = dispatch => {
  return {
    listFetchInitAction: () => {
      dispatch({ type: LIST_FETCH_REQUESTED })
    },
    submitForm: param => {
      dispatch({ type: CREATE_FORM_ITEM, payload: param })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemListContainer)
