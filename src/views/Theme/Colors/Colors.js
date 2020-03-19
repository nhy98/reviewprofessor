import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'

class ThemeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: 'rgb(255, 255, 255)'
    }
  }

  // componentDidMount () {
  //   const elem = ReactDOM.findDOMNode(this).parentNode.firstChild
  //   const color = window.getComputedStyle(elem).getPropertyValue('background-color')

  //   this.setState({
  //     bgColor: color || this.state.bgColor
  //   })
  // }

  render() {
    const {gender,department} = this.props

    return (
      <table className="w-20">
        <tbody>
        <tr>
          <td className="text-muted">Gender:</td>
          <td className="font-weight-bold">{ gender }</td>
        </tr>
        <tr>
          <td className="text-muted">Department:</td>
          <td className="font-weight-bold" style={{ fontSize: 12 + 'px' }}>{ department }</td>
        </tr>
        </tbody>
      </table>
    )
  }
}
class ThemeColor extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {

    // const { className, children, ...attributes } = this.props
    const { className, gender,name,image,department } = this.props

    const classes = classNames(className, 'theme-color w-75 rounded mb-3')

    return (
      <Col xl="2" md="4" sm="6" xs="12" className="mb-4">
        <div /*className={classes}*/ style={{paddingTop: '20px'}}></div>
        <img src={image} height="100px" width="100px"/>
        <h6 style={{paddingTop:'20px'}}>{name}</h6>
        <ThemeView gender={gender} department={department}/>
      </Col>
    )
  }
}
class Colors extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop"></i> Teachers List
          </div>
          <div className="card-body">
            <Row>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
              <ThemeColor className="bg-primary" gender="Male" department="SOICT" image="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/43788168_10205298199970545_8484889497350176768_n.jpg?_nc_cat=101&_nc_oc=AQkVcTDKQ8N8JUNWn3TcVJdKveQdEhWMsKtjhrBJShHXX9Pe8uQJqndbfZTthtcm9pE&_nc_ht=scontent.fhan3-3.fna&oh=c00d539c45beb66f85380126c71443fe&oe=5D2E3CF1" name="Nguyễn Hồng Phương">
              </ThemeColor>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Colors;
