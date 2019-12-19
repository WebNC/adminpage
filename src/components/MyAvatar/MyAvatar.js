import React from 'react'
import { Icon, Button, Avatar, Tooltip, Result} from 'antd';
import { Modal} from 'react-bootstrap'
import './style.css'
import {updateAvatar} from '../../api/admin.action';

class MyAvatar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      file: null,
      successMessage: false,
      errMessage: false,
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      isFirstLoadModal: true
    });
  };

 onFormSubmit = (e) => {
    e.preventDefault();
    const {user} = this.props;
    const {file} = this.state
    updateAvatar({
      id: user._id,
      file
    }).then(res=>{
        if(res){
            this.setState({
                successMessage: true
            })
        }
    })
}

  onChange = (e) => {
      this.setState({file: e.target.files[0]});
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(e.target.files[0])
  }

  render() {
    const { imageUrl} = this.props;
    const {visible, imagePreviewUrl, successMessage, errMessage} = this.state;
    return (
      <div>
        <Tooltip placement="bottom" title="Cập nhật ảnh đại diện">
          <Button className="btn-avatar" onClick={this.showModal}>
            <Avatar size={130} src={imageUrl} className="avatar-img" />
          </Button>
        </Tooltip>
        <div> </div>
        <Button className="mt-3 ml-4" onClick={this.showModal}>Change</Button>

        <Modal show={visible} onHide={this.handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật ảnh đại diện</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {successMessage ? (
              <Result
                status="success"
                title="Cập nhật ảnh đại diện thành công!"
              />
            ): (
              <>
                {errMessage ? (
                <Result
                  status="warning"
                  title="There are some problems with your operation."
                />
                ):(
                  <>
                    <div className="preview-avatar mb-5">
                      <Avatar size={200} src={imagePreviewUrl || imageUrl} />
                    </div>

                    <form onSubmit={this.onFormSubmit}     >
                        <input type="file" name="myImage" onChange={this.onChange} />
                    </form>
                  </>
                )
              }
            </>
            )
          }
          </Modal.Body>
          <Modal.Footer>
              <Button type="primary" onClick={this.onFormSubmit}>Change</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}



export default MyAvatar;