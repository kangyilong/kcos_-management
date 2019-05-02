import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'antd';
export default function ListPageTable(props) {
    const [columns, setColumns] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const initialData = useCallback(() => {
        setColumns(props.columns);
        setSelectedData(props.selectedData);
        console.log(props.columns);
        console.log(props.selectedData);
    }, []);
    useEffect(() => {
        initialData();
    }, [props.selectedData]);
    return (<Table columns={columns} dataSource={props.selectedData} rowSelection={props.rowSelection} rowKey={record => record.id} loading={props.loading}></Table>);
}
//# sourceMappingURL=ListPageTable.jsx.map