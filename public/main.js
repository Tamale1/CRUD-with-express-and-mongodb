

const update = document.querySelector('#update-button')
const deleteBtn = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/quotes', {
      method:'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name:'Rhys Monteroe',
        quote:'The problem you visualise your self as a bad person'
      })
    }).then(res=>{
        if (res.ok) {
            return res.json()
        }
    }).then(
        response=>{
            
            window.location.reload(true)
        }
    )
  })
  deleteBtn.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
       headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name:'Rhys Monteroe'
      })
      })
      .then(res => {
        if(res.ok) 
        return res.json()
      
    })
    .then(response=>{
        if (response === 'No quote to delete') {
            messageDiv.textContent = 'No Rhys Monteroe quote to delete'
          } else {
            window.location.reload(true)
          }
        })
    })

    
    
    
