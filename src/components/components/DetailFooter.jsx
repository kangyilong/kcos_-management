import React from 'react';
import { Button } from 'antd';
export default function DetailFooter() {
    return (<>
      <div style={{ 'marginLeft': '150px', 'marginTop': '50px' }}><Button onClick={() => { window.history.go(-1); }}>返回</Button></div>
    </>);
}
//# sourceMappingURL=DetailFooter.jsx.map