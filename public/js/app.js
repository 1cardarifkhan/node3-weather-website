const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From javaScript'


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''

    const location = search.value

    urlAddress= 'http://localhost:3000/weather?address=' + location

    fetch(urlAddress).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageOne.textContent= data.error
            //console.log(data.error)

        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.summary

            //console.log(data.location)
            console.log(data.forecast)
        }
    })
})
    console.log(location)
})