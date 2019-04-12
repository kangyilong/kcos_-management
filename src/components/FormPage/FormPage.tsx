import React, { PureComponent } from 'react';
import {
  Form, Input, Button, notification
} from 'antd';
import SelectComponent from '@/components/components/Select';
import wantOperationApi from '@/methods/api/wantOperationApi';

interface Props {
  form: any,
  fileds: Array<any>,
  formAddSubmit?: Function,
  formEditSubmit?: Function,
  statements?: string,
  details?: {
    ID: string,
    tableName: string
  }
}

class FormPage extends PureComponent<Props, any>{

  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  typeComponent = (getFieldDecorator, options) => {
    const TYPE = options.type ? options.type : '';
    switch(TYPE) {
      case '':
        return getFieldDecorator(options.filed, {
                rules: [{
                  required: !!options.required, message: '必填选项',
                }],
              })(
                <Input />
              );
      case 'select':
        return <SelectComponent getFieldDecorator={getFieldDecorator} options={options} />;
    }
  };

  dealComponent = (getFieldDecorator, filedData: any) => {
    return filedData.map((item, index) => (
      <Form.Item
        label={item.title}
        key={index}
      >
        {
          this.typeComponent(getFieldDecorator, item)
        }
      </Form.Item>
    ))
  };

  openNotificationWithIcon = (type, filed) => {
    notification[type]({
      message: `${filed}为必填`,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { details } = this.props;
        if(details && details.ID) {
          this.props.formEditSubmit(values, details.ID);
        }else {
          this.props.formAddSubmit(values);
        }
      }else {
        const errKeys = Object.keys(err);
        this.openNotificationWithIcon('warning', errKeys[0]);
      }
    });
  };

  componentDidMount() {
    const { details, form, fileds } = this.props;
    if(details.ID) {
      const statements = `SELECT * FROM ${details.tableName} WHERE id = '${details.ID}'`;
      const keys = [];
      fileds.forEach(item => {
        keys.push(item.filed);
      });
      wantOperationApi({statements}).then(data => {
        const ans = {};
        keys.forEach(item => {
          ans[item] = data[0][item];
        });
        form.setFieldsValue(ans);
      });
    }
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const { fileds } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {
          this.dealComponent(getFieldDecorator, fileds)
        }
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">确认</Button>
          <Button style={{'marginLeft': '20px'}} onClick={ () => {window.history.go(-1)} }>返回</Button>
        </Form.Item>
      </Form>
    )
  }
}
const WrappedRegistrationForm = Form.create({ name: 'formPage' })<any>(FormPage);
export default WrappedRegistrationForm;
