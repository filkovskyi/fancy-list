import React, { Component } from "react"
import { connect } from "react-redux"
import { listFetchInitAction, submitForm, editableFormHandler, deleteItemHandler } from "../actions"
import "antd/dist/antd.css"
import FilterBar from "../components/FilterBar"
import SimpleForm from "../components/SimpleForm"

import { Row, Col, Layout, Icon, Collapse, Button } from "antd"
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

  editFormPathValue(key) {
    if (key !== undefined) {
      this.props.editableFormHandler(key)
    }
    return
  }

  deleteItem(key) {
    this.props.deleteItemHandler(key)
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
            <Collapse
              accordion
              expandIconPosition={"right"}
              expandIcon={() => <Icon type="edit" />}
              onChange={this.editFormPathValue.bind(this)}
            >
              {data.map((item, key) => {
                const data = `${item.accountNumber} - ${item.financialAccountCategory} -
                ${item.currentVatPercentage}% - (${item.vatCategoryCode}) -${item.name}`
                return (
                  <Panel header={data} key={key}>
                    <SimpleForm data={item} onSubmit={this.handleSubmitForm} />
                    <Button
                      onClick={() => this.deleteItem(key)}
                      style={{ marginRight: "35%" }}
                      icon="delete"
                    />
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

const mapDispatchToProps = dispatch => {
  return {
    listFetchInitAction: () => dispatch(listFetchInitAction()),
    submitForm: data => dispatch(submitForm(data)),
    editableFormHandler: data => dispatch(editableFormHandler(data)),
    deleteItemHandler: data => dispatch(deleteItemHandler(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemListContainer)
