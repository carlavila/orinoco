

fetch("http://localhost:3000/api/teddies")

.then(response => { return response.json() })

.then(data => {
    console.log(data)
})

