import React, { Component } from "react"
import { connect } from "react-redux"
import { LIST_FETCH_REQUESTED, CREATE_FORM_ITEM } from "../constant"
import "antd/dist/antd.css"
import FilterBar from "../components/FilterBar"
import SimpleForm from "../components/SimpleForm"

import { Row, Col, Layout, Icon, Collapse } from "antd"
const { Panel } = Collapse

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
    const { showCreateForm } = this.props
    return (
      <Layout>
        <Row>
          <Col offset={6} span={12}>
            <h3 style={{ marginBottom: 16 }}>Filkovskyi Sergey</h3>
            <FilterBar />
            {showCreateForm && <SimpleForm onSubmit={this.handleSubmitForm} />}
            <Collapse accordion expandIcon={() => <Icon type="edit" />}>
              {data.map((item, key) => {
                const data = `${item.accountNumber} - ${item.financialAccountCategory} -
                ${item.currentVatPercentage}% - (${item.vatCategoryCode}) -${item.name}`
                return (
                  <Panel header={data} key={key}>
                    {/* <SimpleForm onSubmit={this.handleSubmitForm} /> */}
                  </Panel>
                )
              })}
            </Collapse>
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
    error: state.rootReducer.error,
    showCreateForm: state.rootReducer.showCreateForm
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
