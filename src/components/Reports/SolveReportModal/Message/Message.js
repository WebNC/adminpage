import React, { useEffect, useRef } from 'react'
import {Spin, Icon} from 'antd'
import moment from 'moment'
import 'moment/locale/vi'
import MessageContent from './MessageContent'
import './style.css'

moment.locale('vi')
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Message extends React.Component {

  constructor() {
    super();
		this.mesRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }
  
  scrollToBottom = () => {
    this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight;
  };

  render() {
    const {teacher, student, messages} = this.props;

    return (
      <div className="message-component">
        <h4>Nội dung tin nhắn</h4>
        {messages !== undefined ? (
          <div className="message-content" ref={this.mesRef}>
            {messages.content.length === 0 ? (
              <div>
                {`Chưa có tin nhắn giữa ${teacher.username} và ${student.username}`}
              </div>
            ):(
              <>
              {messages.content.map((element) => 
                <MessageContent 
                  message={element.content} 
                  time={moment(element.time).format('lll')} 
                  isTeacher={teacher._id === element.from}
                  name={teacher._id === element.from ? teacher.username : student.username}
                />
              )}
              </>
            )}
          </div>              
        ):(
          <div style={{textAlign: "center"}}>
            <Spin indicator={antIcon} />
          </div>
      )}
     </div>
    );
  }
}

export default Message