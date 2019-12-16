import React from 'react';
import 'antd/dist/antd.css';

class Logo extends React.PureComponent {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     isFirstLoad: true,
    //   };
    // }

  render() {
    const {size} = this.props;
    return (
      <img src="logo.png" alt="" width={size} height={size} />
    );
  }
}

export default Logo