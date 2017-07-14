import React, { Component } from 'react';

class Error extends Component{

  componentWillReceiveProps(nextProps){
    if(Object.is(this.props.errors, nextProps.errors)){
      this.props.errorsShow([])
    }
  }

  render(){
    return(
      <div>
        {
          this.props.errors &&
          <ul>
            {
              this.props.errors.map((el, i) => {
                return <li key={i} style={{color: 'red'}}>{el}</li>
              })
            }
          </ul>

        }
      </div>
    )
  }

}

export default Error