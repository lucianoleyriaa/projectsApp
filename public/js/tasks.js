const doneBtn = document.querySelectorAll('.taskDone');
// const editTaskForm1 = document.querySelectorAll('.editTaskForm');
const deleteTaskBtn = document.querySelectorAll('.taskDelete');

if(doneBtn) {
  doneBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      console.log(e.target.parentElement.parentElement)

      const id = e.target.dataset.id;
      const url = `${location.origin}/api/v1/tasks/${id}`

      axios.patch(url, {
        id: id
      }).then(res => {
        if(res.status === 200) {
          console.log(res.data.estado)
          btn.classList.toggle('btn-complete')
          if (res.data.estado) {
            btn.textContent = 'Realizada'
          } else {
            btn.innerHTML = 'Pendiente'
          }
        }
      }).catch(e => {
        console.log(e)
      })
    })
  })
}

// if(editTaskForm1) {
//   editTaskForm1.forEach((btn) => {
//     btn.addEventListener('submit', (e) => {
//       e.preventDefault();
  
//       const idTask = e.target.dataset.idtask;
//       const idProject = e.target.dataset.idproject;
//       const url = `${location.origin}/api/v1/projects/${idProject}/tasks/editTask/${idTask}`

//       const taskName = document.getElementById('name').value;
//       // console.log(taskName);

//       axios.patch(url, {name: taskName})
//         .then(res => {
//           if(res.status === 200) {
//             setTimeout(() => {
//               location.assign(`/${idProject}`);
//             }, 150)
//           }
//         }).catch(e => {
//           console.log(e)
//         })
  
//     })

//   })
// }

if(deleteTaskBtn) {
  deleteTaskBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();

      const id = e.target.dataset.id;
      const url = `${location.origin}/api/v1/tasks/${id}`

      axios.delete(url)
        .then(res => {
          if(res.status === 204) {
            console.log('Eliminada')
            e.target.parentElement.parentElement.remove(e.target.parentElement.parentElement)
          }
        }).catch(e => {
          console.log(e)
        })
    })
  })
}