import React from 'react';
import {Tooltip, Typography} from 'antd';

const {Text} = Typography;

const MessageContent = (props) => {
  const {message, time, isTeacher, name} = props;
  let styleDiv = {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px 0',
    wordWrap: 'break-word',
  };

  let styleText = {
    maxWidth: '80%',
    backgroundColor: '#1890ff',
    color: '#ffffff',
    padding: '0 10px',
    borderRadius: '5px',
    lineHeight: '35px',
  };

  let tooltip = 'left';

  if (isTeacher) {
    styleDiv = {
      display: 'flex',
      margin: '10px 0',
      wordWrap: 'break-word',
    };

    styleText = {
      maxWidth: '80%',
      backgroundColor: '#f5f5f5',
      color: '#262626',
      padding: '0 10px',
      borderRadius: '5px',
      marginLeft: '5px',
      lineHeight: '35px',
    };

    tooltip = 'right';
  }

  return (
    <div style={styleDiv}>
      <Tooltip placement={tooltip} title={`${name}-${time}`}>
        <Text style={styleText}>{message}</Text>
      </Tooltip>
    </div>
  );
};

export default MessageContent;
