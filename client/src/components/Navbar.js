import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, Image, } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'

class Navbar extends React.Component {
  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;
    
    if (user) {
      return (
        <Menu.Menu position='right'>
          <Menu.Item color='red'
            name='logout'
            onClick={ () => handleLogout(this.props.history) }
            active={location.pathname === '/logout'}
          />
        </Menu.Menu>
      )
    } else {
      return (
        <Menu.Menu position='right'>
          <Link to='/login'>
            <Menu.Item color="blue"
              id='login'
              name='login'
              active={location.pathname === '/login'}

            />
          </Link>
          <Link to='/register'>
            <Menu.Item color="green"
              id='register'
              name='register'
              active={location.pathname === '/register'}

            />
          </Link>
        </Menu.Menu>
      )
    };
  };
  
  render() {
    return (
      <>
        <div>
          <Menu pointing secondary>
            <Link to='/'>
              <Menu.Item color="violet"
                name='home'
                id='home'
                active={this.props.location.pathname === '/'}
              />
            </Link>
              { this.rightNavItems() }
          {/* <Image src={requestAnimationFrame('../images/myspace.png')} alt='logo' /> */}
          </Menu>
      </div>
        <div style={{display: 'flex', justifyContent: 'center' }} />
          <div style={{
            disply: 'flex',
            justifyContent: '',
            width: '50%',
            height: '280px'
          }}
          />
      </>
    )
  };
};

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <Navbar { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  ;}
};

const styles = {
  active: {
    color: 'orange',
    fontWeight: 'bold',

  }
};

export default withRouter(ConnectedNavbar);
