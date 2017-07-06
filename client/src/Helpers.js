export function userInfo(callback) {
  fetch('/api/v1/sessions/current_user',{
    headers: {
      "Authorization": `Token token=${localStorage.getItem('token')}`
    },
  }).then((data)=> data.json())
    .then((response)=>{
      if(response.error){
        console.log(response.error)
      }else{
        callback(response)
      }
    }).catch((e)=> {console.log(e)})
}