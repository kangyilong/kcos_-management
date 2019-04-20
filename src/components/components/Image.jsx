import React, { useState, useEffect, useCallback } from 'react';
import { Upload, Icon, Modal } from 'antd';
export default function KcosImage(props) {
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const uploadButton = () => {
        return (<div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>);
    };
    const fileListFn = useCallback((pic) => {
        const filed = props.options.filed ? props.options.filed : props.options.dataIndex;
        if (typeof pic[filed] === 'string') {
            const lists = pic[filed].split('||').map((item, index) => {
                return {
                    key: index,
                    uid: item,
                    name: item,
                    status: 'done',
                    url: item
                };
            });
            setFileList(lists);
        }
    }, []);
    const handleCancel = useCallback(() => {
        setPreviewVisible(false);
    }, []);
    const handlePreview = useCallback((file) => {
        setPreviewImage(file.url || file.thumbUrl);
        setPreviewVisible(true);
    }, []);
    const handleChange = useCallback(({ fileList }) => {
        setFileList(fileList);
    }, []);
    useEffect(() => {
        fileListFn(props.pic_url);
    }, [props.pic_url]);
    return (<>
      {props.getFieldDecorator(props.options.filed ? props.options.filed : props.options.dataIndex, {
        rules: [{
                required: !!props.options.required,
                message: '必填选项'
            }],
    })(<Upload action="" listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
            {fileList.length >= 3 ? null : uploadButton()}
          </Upload>)}
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage}/>
      </Modal>
    </>);
}
//# sourceMappingURL=Image.jsx.map