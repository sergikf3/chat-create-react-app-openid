import React from 'react';
import configuration from '../utils/configuration';
import userManager from '../utils/userManager';


//const Nav = () => {
    class Nav extends React.Component {

  handleLogout = function(){
            console.log('Slo Initialization');
            userManager.removeUser();
            var redirect = `${window.location.protocol}//${window.location.hostname}:${window.location.port}` 
            window.location = configuration.logoutUrl + redirect ;
        }


   render() {
    return(
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">RoboChatter</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="javascript:void(0)" onClick={this.handleLogout.bind(this)}>Log Out</a></li>
          </ul>
          </div>
        </div>
      </nav>
  );
}
}
    
export default Nav;
