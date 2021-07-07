const loginBtn = document.querySelector('.login');

if(loginBtn) {
  loginBtn.addEventListener('click', e => {
    e.preventDefault();

    const email = document.getElementById('nombre').value;
    const password = document.getElementById('contraseña').value;
    const url = `${location.origin}/api/v1/users/login`

    axios.post(url, {email, password})
      .then(res => {
        if(res.status === 200) {
          location.assign('/')
        } else if (res.status == 404) {
          console.log('LLega')
          alert(res.message)
        }
      }).catch(e => {
        console.log(e.response.data.error)
      }) 
  })
}