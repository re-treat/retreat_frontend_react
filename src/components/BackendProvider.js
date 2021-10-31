import axios from 'axios'
const host = 'https://delta-trees-327003.wl.r.appspot.com/'
// const host = 'http://127.0.0.1:8000/'
const getUrl = (url)=>host + url

const queryStory = (emotion) => {
    let url = getUrl(`storyboard/post/?emotion=${emotion}`)
    return axios.get(url)
}

const queryExerciseByEmotion = (emotion) => {
    let url = getUrl(`exercise/exercise_obj/get_exercise_by_emotion/?emotion=${emotion}`)
    return axios.get(url)
}

const respondStory = (id,response) => {
    let payload = { response }
    let url = getUrl(`storyboard/post/${id}/respond/`)
    return axios.post(url,payload)
}

const getStory = (id) => {
    let url = getUrl(`storyboard/post/${id}/`)
    return axios.get(url)
}

const postStory = (author,body,emotion,type,parent) => {
    let payload = { author,body,emotion,type,parent }
    let url = getUrl(`storyboard/post/`)
    return axios.post(url,payload)
}

const postEmotionStory = (author,body,emotion) => {
    return postStory(author,body,emotion,0,null)
}

const postAdvice = (author,body,emotion,parent) => {
    return postStory(author,body,emotion,2,parent)
}

const postComment = (author,body,emotion,parent) => {
    return postStory(author,body,emotion,1,parent)
}

const getResponseHistory = ()=>{
    let responses = []
    try {
        responses =JSON.parse( localStorage.getItem('responses')) || []
    } catch {

    }
    return responses
}
const recordResponse = (id)=>{
    let responses = getResponseHistory()
    responses.push(id)
    localStorage.setItem('responses',JSON.stringify(responses))
    return
}

const checkResponse = (id)=>{
    let responses = getResponseHistory()
    return responses.includes(id)
}

const register = (username,password,nickname)=>{
    let url = getUrl(`user/register/`)
    return axios.post(url,{username,password,nickname})
}

const login = (username,password)=>{
    let url = getUrl(`user/login/`)
    return axios.post(url,{username,password}).then(
        (response)=>{
            if(response?.data?.token) {
                localStorage.setItem('loginToken',response?.data?.token)
            }
        }
    )
}

const logout = ()=>{
    localStorage.removeItem('loginToken')
}
const hasLoggedIn = ()=>{
    return !! localStorage.getItem('loginToken')
}

const getUserInfo = ()=>{
    let url = getUrl(`user/whoami/`)
    return axios.get(url, {headers: {'Authorization': 'JWT ' + localStorage.getItem('loginToken')}})
}


export{
    queryStory,
    respondStory,
    postStory,
    postEmotionStory,
    postAdvice,
    postComment,
    queryExerciseByEmotion,
    getStory,
    checkResponse,
    recordResponse,
    register,
    login,
    getUserInfo,
    logout,
    hasLoggedIn
};

