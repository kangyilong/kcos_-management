import React, { useState, useEffect, useCallback, PureComponent } from 'react';
import {
  Form, Input, Button, Select
} from 'antd';
import SelectComponent from '@/components/components/Select';

interface Props {
  columns?: Array<any>,
  form: any,
  screeningList?: Function
}

export default class ListPageHeader extends PureComponent<Props, any> {

  typeComponent = (getFieldDecorator, options) => {
    const TYPE = options.type ? options.type : '';
    switch(TYPE) {
      case '':
        return getFieldDecorator(options.dataIndex, {
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

  dealComponent = (getFieldDecorator, filedData: Array<any>) => {
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const v = Object.values(values);
      const k = Object.keys(values);
      let sv = {};
      v.forEach((item, index) => {
        if(item !== undefined) {
          sv[k[index]] = item;
        }
      });
      this.props.screeningList(sv);
    });
  };

  render () {
    const { form, columns } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        {
          this.dealComponent(getFieldDecorator, columns)
        }
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{'marginRight': '20px'}}
          >
            搜索
          </Button>
          <Button onClick={() => {form.resetFields();}}>
            重置
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
