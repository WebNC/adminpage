/* eslint-disable camelcase */
import React from 'react';
import moment from 'moment';
import {Modal} from 'react-bootstrap'
import MyAvatar from '../MyAvatar/MyAvatar'

class UserDetailModal extends React.PureComponent {


  render(){
    const { information, open, handleShow} = this.props;
    const style={
      width : '100px',
      textAlign: 'right'
    }
    
    let skill = '';
    let address = null;

    if(information.skill !== undefined && information.address !== undefined){
      let str  = ''
      information.skill.forEach((ele)=>{
        str += `${ele.name}, `
      })
      skill = str.slice(0, -2);
      if(information.address.address !== undefined){
        address = `${information.address.address}, ${information.address.district}, HCM`
      }
    }
    
    return (
      <Modal show={open} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
            <div className="row p-3 ">
              <div className="col-7">
                <div className=" d-flex">
                    <h6 className="mr-3" style={style}>Tên :</h6>
                    <p >{`${information.username  } - ${  information.type}`}</p>
                </div>
                <div className=" d-flex mt-1">
                   <h6 className="mr-3" style={style}>Email : </h6>
                    <p >{information.email}</p>
                </div>

                <div className=" d-flex mt-1">
                    <h6 className="mr-3"  style={style}>Giới tính :</h6>
                    <p >{information.sex|| `Nam`}</p>
                </div>
                <div className=" d-flex mt-2">
                    <h6 className="mr-3" style={style}>Phone :</h6>
                    <p  >{information.phone || '01234xxxx'}</p>
                </div>
                {information.birthday && <div className=" d-flex mt-1">
                  <h6 className="mr-3" style={style}>Ngày sinh :</h6>
                    <p >{moment(information.birthday).format('DD/MM/YYYY')}</p>
                </div>}
                        
                { address &&
                <div className=" d-flex mt-1">
                  <h6 className="mr-3" style={style}> Địa chỉ : </h6>
                  <p>{address}</p>
                </div>}
                        
                        
              </div>

              <div className="col-5">
                <div style={{display: "flex", justifyContent: "center"}}>
                  <MyAvatar canNotChange user={information}/>
                </div>
                {/* <img src="http://placehold.it/1000" height="120" width="120" alt="avatar" className="avartar"/> */}
                {
                  ( information.type === 'Người dạy') ?
                  <div className="mt-5">
                    <div className=" d-flex mt-1">
                          <h6 className="mr-3" style={style}> Nghề nghiệp: </h6>
                          <p >{information.major}</p>
                    </div>
                    <div className=" d-flex mt-1">
                        <h6 className="mr-3" style={style}>Kỹ năng: </h6>
                        <p >{skill}</p>
                    </div>
                  </div> : <></>
                }
                
              </div>
              {
                  information.type === 'Người dạy' ? 
                  <div className=" d-flex  ml-2">
                    <h6 className="mr-3" style={style}>Introduction : </h6>
                    <p >{information.intro || 'Nothing'}</p>
                  </div> : <></>
                }
          </div>
            
                

        </div>
      </Modal.Body>
   </Modal>
          

  )}
}

export default UserDetailModal;