import React from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Form, Input, Radio, Button } from "antd"

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 6
    }
  }
}

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = meta.touched && meta.invalid
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  )
}

const AInput = makeField(Input)
const ARadioGroup = makeField(RadioGroup)
const ATextarea = makeField(TextArea)

let SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  const fieldsIsValid = props.valid

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Account number"
        name="accountNumber"
        component={AInput}
        placeholder="Account number"
        hasFeedback
      />
      <Field
        label="Category"
        name="financialAccountCategory"
        component={ARadioGroup}
        buttonStyle="solid"
        hasFeedback
      >
        <Radio.Button value="sales">Sales</Radio.Button>
        <Radio.Button value="purchases">Purchases</Radio.Button>
      </Field>
      <Field
        label="Current Vat Percentage"
        name="currentVatPercentage"
        component={AInput}
        placeholder="Current Vat Percentage"
        hasFeedback
      />
      <Field
        label="Vat category code"
        name="vatCategoryCode"
        component={AInput}
        placeholder="Vat category code"
        hasFeedback
      />
      <Field
        label="Account name"
        name="name"
        component={AInput}
        placeholder="Account name"
        hasFeedback
      />
      <Field
        label="External revenue class"
        name="externalRevenueClass"
        component={AInput}
        placeholder="External revenue class"
      />
      <Field
        label="External tax code"
        name="externalTaxCode"
        component={AInput}
        placeholder="External tax code"
      />
      <Field label="Comment" name="comment" component={ATextarea} />
      <FormItem {...tailFormItemLayout}>
        <Button disabled={pristine || submitting} onClick={reset}>
          Clear
        </Button>
        <Button
          type="primary"
          disabled={!fieldsIsValid}
          htmlType="submit"
          style={{ marginLeft: "10px" }}
        >
          Submit
        </Button>
      </FormItem>
    </Form>
  )
}

const validate = values => {
  const errors = {}
  // Account Number validation
  if (!values.accountNumber || !!isNaN(values.accountNumber)) {
    errors.accountNumber = "Required or Should be a number"
  }

  // Financial Account Category validation
  if (!values.financialAccountCategory) {
    errors.financialAccountCategory = "Required"
  }

  // current Vat Percentage validation
  if (!values.currentVatPercentage || !!isNaN(values.currentVatPercentage)) {
    errors.currentVatPercentage = "Required or Should be a number"
  }

  // Vat Category Code validation
  if (!values.vatCategoryCode) {
    errors.vatCategoryCode = "Required"
  }
  // Account name validation
  if (!values.name) {
    errors.name = "Required"
  }

  return errors
}

SimpleForm = reduxForm({
  form: "simple",
  validate
})(SimpleForm)

const mapStateToProps = state => {
  return {
    initialValues: state.rootReducer.editableForm,
    enableReinitialize: true
  }
}

export default connect(mapStateToProps, null)(SimpleForm)
