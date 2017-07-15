import React, { Component } from 'react';

window.fbAsyncInit = () => {
  window.FB.init({
    appId      : '1696449613995461',
    xfbml      : true,
    version    : 'v2.8'
  });
};

((d, s, id) => {
  let js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

class Fb extends Component{

  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }

  login(e){
    const obj = this;
    e.preventDefault();

    window.FB.login((response) => {
      if(Object.is(response.status, 'connected')){
        const token = response.authResponse.accessToken;

        fetch('/api/v1/users/fb',{
          method: "POST",
          body: JSON.stringify({token: token}),
          headers: {
            "Content-Type": "application/json"
          },
        }).then((response) => response.json()).then((response) => {
          localStorage.setItem('token', response.token);
          obj.props.callback(response)
        }).catch((e) => console.log(e))

      }else{
        console.log('error FB login')
      }
    })
  }

  render(){
    return(
      <button onClick={this.login}>Fb Login</button>
    )
  }

}

export default Fb
