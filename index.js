const TODOS_URL = 'https://api.slingacademy.com/v1/sample-data/photos'
const getFastestLoadedPhoto = [60, 12, 55];

const getLoader = () => {
    const load = document.querySelector('#loader')
    const isloader = load.hasAttribute('hidden')
    if (isloader) {
        load.removeAttribute('hidden')
    } else {
        load.setAttribute('hidden', '')
    }
}

const getAllPhotos = ((ids) => {
    getLoader()
    const requests = ids.map((id) => fetch(`${TODOS_URL}/${id}`))
    Promise.race(requests)
        .then((response)=>{
            if (!response.ok) {
                throw new Error('Ошибка запроса')
            }
            return response.json()
        })
        .then((todo)=>{
            const todoHTML = createTodoElement(todo.photo.url, todo.photo.title)
            dataContainer.append(todoHTML) 
        })
        .catch((error)=>{
            console.error(error)
        })
        .finally(()=>{
            getLoader()
        })
})

const dataContainer = document.querySelector('#data-container')

const createTodoElement = (img, text) => {
    const todoElement = document.createElement('li')
    todoElement.className = 'photo-item'

    const todoElementAnchorImg = document.createElement('img')
    todoElementAnchorImg.className = 'photo-item__image'
    todoElementAnchorImg.src = img

    const todoElementAnchor = document.createElement('h3')
    todoElementAnchor.className = 'photo-item__title'
    todoElementAnchor.textContent = text

    todoElement.append(todoElementAnchorImg, todoElementAnchor)

    return todoElement
}

getAllPhotos(getFastestLoadedPhoto)


/* Для себя
const TODOS_URL = 'https://api.slingacademy.com/v1/sample-data/photos?limit=140'
const getFastestLoadedPhoto = [60, 12, 55];

const getLoader = () => {
    const load = document.querySelector('#loader')
    const isloader = load.hasAttribute('hidden')
    if (isloader) {
        load.removeAttribute('hidden')
    } else {
        load.setAttribute('hidden', '')
    }
}

const getAllPhotos = (() => {
    getLoader()
    const requests = fetch(TODOS_URL, {
        method: 'GET',
    })
    requests
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка!', error)
            }
            return response.json()
        })
        .then((todos)=>{
            const obj = todos.photos
            console.log(todos)
            for(const i of obj) {
                const todoHTML = createTodoElement(i.url, i.title)
                dataContainer.append(todoHTML) 
            }
        })
        .catch((error)=>{
            console.error(error)
        })
        .finally(()=>{
            getLoader()
        })
})

const dataContainer = document.querySelector('#data-container')

const createTodoElement = (img, text) => {
    const todoElement = document.createElement('li')
    todoElement.className = 'photo-item'

    const todoElementAnchorImg = document.createElement('img')
    todoElementAnchorImg.className = 'photo-item__image'
    todoElementAnchorImg.src = img

    const todoElementAnchor = document.createElement('h3')
    todoElementAnchor.className = 'photo-item__title'
    todoElementAnchor.textContent = text

    todoElement.append(todoElementAnchorImg, todoElementAnchor)

    return todoElement
}

getAllPhotos()*/