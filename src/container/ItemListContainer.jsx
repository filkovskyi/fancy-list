import React, { Component } from "react"
import { connect } from "react-redux"
import { LIST_FETCH_REQUESTED } from "../constant"
import { List } from "antd"

class ItemListContainer extends Component {
  componentDidMount() {
    this.props.listFetchInitAction()
  }

  render() {
    const data = this.props.data

    return (
      <div>
        <h3 style={{ marginBottom: 16 }}>All list</h3>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta title={<span>{item.accountName}</span>} />
            </List.Item>
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => ({
  listFetchInitAction: () => {
    dispatch({ type: LIST_FETCH_REQUESTED })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemListContainer)
