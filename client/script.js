async function getMessages() {
    const response = await fetch(
        'https://simple-chat-app-server.onrender.com/messages'
    )
    const messages = await response.json()

    const container = document.getElementById('message-container')

    container.innerHTML = ''

    for (const message of messages) {
        console.log(message)
        const li = document.createElement('li')
        li.innerText = message.text
        container.appendChild(li)
    }
}
getMessages()

const input = document.getElementById('input')
const button = document.getElementById('button')

button.addEventListener('click', async () => {
    await fetch('https://simple-chat-app-server.onrender.com/message', {
        body: JSON.stringify({
            text: input.value,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })
    input.value = ''
    getMessages()
})
