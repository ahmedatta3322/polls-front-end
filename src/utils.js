export default function closeForm() {
  let polls = document.querySelector('.polls')
  polls.style.display = 'flex'
  let form = document.querySelector('.edit-form')
  form.style.display = 'none'
  let adminPortal = document.querySelector('.admin-portal')
  adminPortal.style.height = '100%'
}
export function toggleFormUtil(editForm) {
  if (editForm) {
    let polls = document.querySelector('.polls')
    polls.style.display = 'none'
    let form = document.querySelector('.edit-form')
    form.style.display = 'block'
    let adminPortal = document.querySelector('.admin-portal')
    adminPortal.style.height = '100vh'
  } else {
    let polls = document.querySelector('.polls')
    polls.style.display = 'none'
    let form = document.querySelector('.create-form')
    form.style.display = 'block'
    let adminPortal = document.querySelector('.admin-portal')
    adminPortal.style.height = '100vh'
  }
}
