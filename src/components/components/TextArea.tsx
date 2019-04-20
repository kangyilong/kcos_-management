import React, { useState, useEffect, useCallback } from 'react';

interface Props {
  getFieldDecorator: any,
  options: any
}
export default function KcosTextArea(props: Props) {
  return props.getFieldDecorator(props.options.filed ? props.options.filed : props.options.dataIndex, {
    rules: [{
      required: !!props.options.required,
      message: '必填选项'
    }],
  })(
    <textarea style={{
      'width': '100%',
      'height': '100px',
      'borderColor': '#ccc',
      'outline': 'none'
    }}></textarea>
  )
}
