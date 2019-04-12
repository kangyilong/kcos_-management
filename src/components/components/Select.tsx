import React, { useState, useEffect, useCallback } from 'react';
import { Select } from 'antd';
import wantOperationApi from '@/methods/api/wantOperationApi';

const { Option } = Select;

interface Props {
  getFieldDecorator: any,
  options: any
}

export default function SelectComponent(props: Props) {
  const [selectData, setSelectData] = useState([]);

  const drawSelect = useCallback(() => {
    if(props.options && props.options.statements) {
      wantOperationApi({statements: props.options.statements}).then(data => {
        setSelectData(data);
      })
    }else if(props.options && props.options.valueData && Array.isArray(props.options.valueData)){
      setSelectData(props.options.valueData);
    }
  }, []);

  useEffect(() => {
    drawSelect();
  }, []);

  return props.getFieldDecorator(props.options.filed ? props.options.filed : props.options.dataIndex, {
      rules: [{
        required: !!props.options.required,
        message: '必填选项'
      }],
    })(
      <Select
        showSearch
        allowClear={ true }
        style={{'minWidth': '160px'}}
        filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {
          Array.isArray(selectData) && selectData.map((item, index) => (
            <Option
              value={ item[props.options.keyName] }
              key={index}
            >
              {
                props.options.valueName.indexOf('-') !== -1 ?
                props.options.valueName.split('-').length === 2 ?
                `${item[props.options.valueName.split('-')[0]]}-${item[props.options.valueName.split('-')[1]]}` :
                `${item[props.options.valueName.split('-')[0]]}-${item[props.options.valueName.split('-')[1]]}-${item[props.options.valueName.split('-')[2]]}` :
                item[props.options.valueName]
              }
            </Option>
          ))
        }
      </Select>
    );
}
