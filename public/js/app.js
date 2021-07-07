'use strict'

const editProjectForm = document.querySelector('#editProjectForm');
const editProjectBtn = document.querySelector('.editProject')
const deleteProjectBtn = document.querySelector('.deleteProject');
const btnConfirmDelete = document.querySelector('.btn__delete-project');
const editTaskBtn = document.querySelectorAll('.btn__edit-task');
const editTaskForm = document.querySelector('#btn__edit-task');
const addTask = document.querySelector('#addTask');
const overlay = document.querySelector('.overlay');
const modalAddTask = document.querySelector('.modal__add-task');
const modalEditTask = document.querySelector('.modal__edit-task');
const modalDeteleProject = document.querySelector('.modal__delete-project');
const modalEditProject = document.querySelector('.modal__edit-project');
const activeProject = document.querySelectorAll('.projects__li');

activeProject.forEach(project => {
  project.addEventListener('click', (e) => {
    project.classList.add('projects__li--active');
  });
})

console.log(activeProject);

if(btnConfirmDelete) {

  btnConfirmDelete.addEventListener('click', e => {
    e.preventDefault();

    console.log(e.target.dataset.iddeleteproject);
    const id = e.target.dataset.iddeleteproject;
    const url = `${location.origin}/api/v1/projects/deleteProject/${id}`

    axios.delete(url, { params: id })
      .then(res => {
        console.log(res)
        // Redireccionamiento
        if (res.status === 204) {
          alert('Proyecto eliminado correctamente');
          window.setTimeout(() => {
            location.assign('/')
          }, 150)
        }
      }).catch(e => {
        console.log(e)
      });
  });
}

if(editProjectForm) {
  editProjectForm.addEventListener('click', e => {
    e.preventDefault();

    const nombre = document.getElementById('projectName').value;
    const descripcion = document.getElementById('description').value;

    const id = e.target.dataset.idproject

    const url = `${location.origin}/api/v1/projects/updateProject/${id}`

    axios.patch(url, {
      name: nombre,
      description: descripcion
    })
      .then(res => {
        if(res.status === 200) {
          document.querySelector('.project__name').textContent = nombre;
          document.querySelector('.project__description span').textContent = descripcion;
          closeModal();
        }
      }).catch(e => {
        console.log(e)
      })
  })
}

if(deleteProjectBtn) {
  deleteProjectBtn.addEventListener('click', () => {
    openModal(modalDeteleProject);
  });
}

if (editProjectBtn) {
  editProjectBtn.addEventListener('click', () => {
    openModal(modalEditProject);
  })
}

if (addTask) {
  addTask.addEventListener('click', (e) => {
    e.preventDefault();
  
    openModal(modalAddTask);
  
  });
}

if (editTaskBtn) {
  editTaskBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      document.querySelector('.input__edit-task').value = e.target.dataset.nameedittask;
      const idProject = e.target.dataset.idproject;
      const idTask = e.target.dataset.idtask;
      openModal(modalEditTask);

      editTaskForm.addEventListener('click', (e) => {
        e.preventDefault();

        const tarea = document.querySelector('.input__edit-task').value;
        const url = `${location.origin}/api/v1/projects/${idProject}/tasks/editTask/${idTask}`;

        axios.patch(url, {name: tarea})
        .then(res => {
          if(res.status === 200) {
            setTimeout(() => {
              location.assign(`/projects/${idProject}`);
            }, 150)
          }
        }).catch(e => {
          console.log(e)
        })
      });
    })
  })
}

// Cerrar modal window
const closeModal = function() {
  overlay.classList.add('hidden');
  modalAddTask.classList.add('hidden');
  modalEditTask.classList.add('hidden');
  modalDeteleProject.classList.add('hidden');
  modalEditProject.classList.add('hidden');
};

const openModal = function(modal) {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
};



if (overlay) {
  overlay.addEventListener('click', () => {
    closeModal();
  });
}

