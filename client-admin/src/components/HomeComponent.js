import React, { Component } from 'react';

class Home extends Component {
  render() {
    const backgroundImageUrl = 'https://pdp.edu.vn/wp-content/uploads/2021/01/hinh-nen-4k-tuyet-dep-cho-may-tinh.jpg';
    const containerStyle = {
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100vw', // Change width to '100vw' to cover the entire viewport width
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };

    // Thêm kiểu CSS để body và html che phủ toàn bộ màn hình
    const fullScreenStyle = {
      height: '100vh',
      margin: 0,
      overflow: 'hidden',
    };

    return (
      <div style={fullScreenStyle}>
        <div style={containerStyle}></div>
      </div>
    );
  }
}

export default Home;
