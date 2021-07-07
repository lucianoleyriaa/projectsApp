const createAccountBtn = document.querySelector('.createAccount');

console.log('cliente side')

if(createAccountBtn) {
  createAccountBtn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log('Llego')

    const name = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('contraseña').value;
    const passwordConfirm = document.getElementById('confirmarContraseña').value;
    const url = `${location.origin}/api/v1/users/signup`

    console.log(name, email, password, passwordConfirm);

    axios.post(url, {name, email, password, passwordConfirm})
      .then(res => {
        if(res.status === 201) {
          location.assign('/login');
        }
      }).catch(e => {
        console.log(e)
      })
  })
}