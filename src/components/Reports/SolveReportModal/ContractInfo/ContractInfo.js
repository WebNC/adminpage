/* eslint-disable camelcase */
import React from 'react';
import {Icon} from 'antd'
import 'antd/dist/antd.css';
import moment from 'moment';
import './style.css'

class DetailInfo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        
    }
  }

    render() {
      const {contract, teacher, student} = this.props;
      const skills =[];
      contract.skill.forEach(element => {
        skills.push(
          <h5 style={{fontSize: 14, textAlign: "left"}} >
            {element.name}
          </h5>
        );
      });

      return (
        <>
          {contract.skill ? 
          (<div className="info-contract">
            <h4>Nội dung hợp đồng</h4>
            <div className="d-flex">
              <div className="item-info-contract mr-5">
                <h5 className="title-contract">Create at :</h5>
                <h5>
                  {moment(contract.createAt).format('DD/MM/YYYY')} 
                </h5>
              </div>
            </div>
            <div className="item-info-contract">
              <h5 className="title-contract">Student : </h5> 
              <h5>
                {student}
              </h5> 
            </div>
            <div className="item-info-contract">
              <h5 className="title-contract">Teacher : </h5> 
              <h5>
                {teacher}
              </h5> 
            </div>
            <div className="item-info-contract">
              <h5 className="title-contract">Studying at :</h5>
              <h5>
                {`${contract.address.address}, ${contract.address.district}, Hồ Chí Minh` } 
              </h5>
            </div>
            <div className="item-info-contract">
              <h5 className="title-contract">Time :</h5>
              <h5>
                {contract.fromDate !== undefined ? 
                  ` Từ ${moment(contract.fromDate).format('DD/MM/YYYY')} đến ${moment(contract.toDate).format('DD/MM/YYYY')}` 
                    : ''
                } 
              </h5>
            </div>
            <div className="item-info-contract">
              <h5 className="title-contract">Skill :</h5>
              <div style={{display: "block"}}>
                {skills}
              </div>
            </div>
            <div className="item-info-contract">
              <h5 className="title-contract">Hour :</h5> 
              <h5>
                {contract.hour }
              </h5>
            </div>
            <div className="item-info-contract">
              <h5 className="title-contract">Status :</h5>
              <h5>
                {contract.status} 
              </h5>
            </div>
            { contract.statusPay ? 
              <div className="item-info-contract">
                <h5 className="title-contract">Pay at:</h5>
                <h5>
                  {moment(contract.payDate).format('DD/MM/YYYY')} 
                </h5>
              </div> : <></>
            }
            <div className="item-info-contract">
              <h5 className="title-contract">Đánh giá :</h5>
              {contract.comment !== undefined ? (
                <div style={{display: "flex"}}>
                  <h5>
                    {contract.rating} 
                  </h5>
                  <Icon type="star" theme="filled" style={{color:"#faad14", paddingTop: "3px"}}/>
                  <h5>{` - ${contract.comment.comment}`}</h5> 
                </div>
              ):(
                <h5>
                  Chưa có đánh giá từ người học
                </h5>
              )}
            </div>
            <div className="item-info-contract">
              <h5 className="title-contract " >Total : </h5>
              <h5 >
                {`${contract.value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </h5>
            </div>
          </div>
          ):(
            <></>
          ) 
          }
        </>
      );
    }
}

export default DetailInfo;
