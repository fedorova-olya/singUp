const pass1 = document.getElementById('pass1')

const pass2 = document.getElementById('pass2')
pass2.disabled = true

const submit = document.getElementById('submit')
submit.disabled = true

let hash = '',
    test

pass1.oninput = function (event) {
    event.target.test = Boolean(event.target.value.length > 7 &&
        event.target.value.match(/\d/) &&
        event.target.value.match(/\w/))
    event.target.style.color = event.target.test ? 'green' : 'red'
}
pass1.onchange = function (event) {
    if (event.target.test) {
        pass2.disabled = false
    }
}

pass2.oninput = function (event) {
    event.target.style.color =
        event.target.value === pass1.value ?
        'green' : 'red'
}

pass2.onchange = function (event) {
    if (event.target.value === pass1.value) {
        hash = Sha256.hash(event.target.value)
        submit.disabled = !(hash && login.value.match(/\S/))
    }
}

submit.onclick = function (event) {
    fetch(`https://garevna-rest-api.glitch.me/user/${login.value}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            passhash: hash
        })
    }).then(response => console.log(response.ok))
}

fetch('http://garevna-rest-api.glitch.me/users/all')
    .then(response => response.json())
    .then(response => console.log(response))

function deleteUser(user) {
    fetch('https://garevna-rest-api.glitch.me/user/' + user, {
        method: 'delete',
    }).then(response => console.log(response.ok))
}
deleteUser()