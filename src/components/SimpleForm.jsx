import React from "react"
import { Field, reduxForm } from "redux-form"
import { Form, Input, Radio, Select, Checkbox, Button, DatePicker } from "antd"

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { TextArea } = Input
const { RangePicker } = DatePicker

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

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
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
        value="purchases"
      >
        <Radio value="sale">Sale</Radio>
        <Radio value="purchases">Purchases</Radio>
      </Field>
      <Field
        label="Vat category code"
        name="vatCategoryCode"
        component={AInput}
        placeholder="Vat category code"
      />
      <Field label="Account name" name="name" component={AInput} placeholder="Account name" />
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
        <Button style={{ marginRight: "35%" }} icon="delete" />
        <Button disabled={pristine || submitting} onClick={reset}>
          Clear
        </Button>
        <Button
          type="primary"
          disabled={pristine || submitting}
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
  if (!values.firstName) {
    errors.firstName = "Required"
  }

  return errors
}

export default reduxForm({
  form: "simple", // a unique identifier for this form
  validate
})(SimpleForm)
