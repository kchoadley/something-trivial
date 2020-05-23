import React from 'react';

class TrivialFooter extends React.Component {
  render() {
    const footerStyle = {
      width: '100%',
      position: 'fixed',
      left: 0,
      bottom: 0,
      backgroundColor: '#ffd919',
      color: 'black',
      textAlign: 'center'
    }

    return (
      <footer className="page-footer font-small grey pt-2" style={footerStyle}>
        <div className="">© 2020 Something Trivial
            <a href="https://github.com/kchoadley/something-trivial" style={{ color: 'grey' }}> Github</a>
        </div>
      </footer>
    );
  }
}

export default TrivialFooter;
