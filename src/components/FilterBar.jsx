import React, { Component } from "react"
import { connect } from "react-redux"
import { LIST_FILTER_BY_NAME, LIST_FILTER_BY_NUMBER } from "../constant"
import { debounce } from "lodash"
import { Slider, Row, Col, Input, Button } from "antd"

class FilterBar extends Component {
  state = {
    inputValue: this.props.maxNumber
  }

  filterByNameHandler = debounce(text => {
    this.props.filterItemsByName(text)
  }, 500)

  filterByAccountNumberHandler = accountNumber => {
    this.setState({
      inputValue: accountNumber
    })

    this.props.filterItemsByNumber(accountNumber)
  }

  render() {
    const { inputValue } = this.state
    const maxNumber = this.props.maxNumber

    return (
      <Row type="flex" justify="center">
        <Col span={6}>
          <span>Bookkeeping accounts</span>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="center">
            <Col span={9}>
              <Input
                onChange={e => this.filterByNameHandler(e.target.value)}
                type="text"
                placeholder={"Filter by Name"}
              />{" "}
            </Col>

            <Col span={10} offset={1}>
              <Slider
                min={1}
                max={maxNumber}
                onChange={this.filterByAccountNumberHandler}
                value={typeof inputValue === "number" ? inputValue : 0}
              />
            </Col>
            <Col span={4}>
              <Input value={inputValue} onChange={this.onChange} />
            </Col>
          </Row>
        </Col>
        <Col span={5} offset={1}>
          <Button
            type="primary"
            icon="plus"
            className="header-action"
            onClick={e => console.log(e)}
          >
            New Account
          </Button>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    maxNumber: state.maxNumber
  }
}

// TODO:REFACTOR make actionCreater in separate file
const mapDispatchToProps = dispatch => {
  return {
    filterItemsByName: param => {
      dispatch({ type: LIST_FILTER_BY_NAME, payload: param })
    },
    filterItemsByNumber: param => {
      dispatch({ type: LIST_FILTER_BY_NUMBER, payload: param })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)
