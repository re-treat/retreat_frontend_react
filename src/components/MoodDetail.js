import react, { useEffect, useRef, useState } from 'react'
import {queryStory,respondStory,getStory,checkResponse,recordResponse,postEmotionStory,postAdvice,postComment,queryExerciseByEmotion} from './BackendProvider'
import {Container,Row,Col,Button} from 'react-bootstrap'
import bg from '../assets/images/bg.jpg'
import {getEmojiByKey,RESP_EMOJI,getRandName} from './constants'
import { useHistory } from "react-router-dom";
import refresh from "../assets/images/refresh_icon.gif";
import paperplane from "../assets/images/paper_plane.gif";

function PostCard(
    {post,onChange,isCounselor,changeCounselor}
) {
    const[name,setName] = useState(getRandName())
    const [expand,setExpand] = useState(false)

    const getChildren = ()=>{
        if (expand) {
            return post.children.slice(0,2)
        }
        return post.children
    }
    const ref = useRef();
    let responses = post.responses || {};
    let keys = Object.keys(responses);
    keys = keys.filter(e=>responses[e]>0)
    let num_responses = 0
    if (keys.length){
        keys = keys.sort((a,b)=>responses[a]-responses[b]).reverse()
        num_responses = keys.map(e=>responses[e]).reduce((a,b)=>a+b)
    } 
    return (
        <Row div className="mood-post-card">
            
            <div className="mood-post-row-1">
                <div className="mood-avatar"></div>
                <span> Anonymous {post.author}</span></div>
            <div className="mood-post-row-2">
                {post.body}
            </div>
            <div className="mood-post-row-3">
                
                {keys.map(e=><div>{RESP_EMOJI[e]}</div>)}
                
                <div>  {num_responses} responses </div>
                <div style={{flexGrow:1}}></div>
                {!checkResponse(post.id)?<div className="respond-bar">
                    {
                        Object.entries(RESP_EMOJI).map(
                            ([k,v])=><div className="respond-icon" onClick={
                                ()=>respondStory(post.id,k).then(
                                    e=>{
                                        recordResponse(post.id)
                                        onChange()

                                    }
                                )
                            }>{v}</div>
                        )
                    }
                    I feel you!</div>:""}
                </div>
                <div className="mood-post-row-4">
                    <input type="text" ref={ref} placeholder="Enter your comments" />
                    <img className="comment-ico" src={paperplane} onClick={()=>{
                        if(isCounselor){
                            postAdvice("Counselor",ref.current.value,post.emotion,post.id).then(onChange);
                        } else {
                            postComment(name,ref.current.value,post.emotion,post.id).then(onChange);
                        }
                        
                        }} />
                </div>
                <div className="mood-post-row-5">
                   {!isCounselor?<div>Select Your display name {name} <img className="refresh-ico" onClick={()=>setName(getRandName())} src={refresh} />
                   </div>:""}
                   <span style={{flexGrow:1}}></span>
                   <input type="checkbox" checked={isCounselor} onChange={()=>changeCounselor(!isCounselor)}/>
                   <span>I'm a Counselor</span>
                </div> 
                <hr/>
                {/* <div className="mood-post-row-6">
                 {JSON.stringify(getChildren())}
                </div>  */}
                <div className="mood-post-row-6">
                 {getChildren().map(comment=><div>
                    <div className="mood-post-row-1">
                <div className="mood-avatar"></div>
                <span>  {comment.type==2?comment.author:"Anonymous "+comment.author}</span> <span>: {comment.body}</span>
                
                </div>
                 </div>)}
                </div> 
                {post.children.length>2?<div className="mood-post-collapse" onClick={()=>setExpand(!expand)}>
                    {expand?"Collapse Comments":"More Comments"}
                </div>:""}
               
        </Row>
    )

}
function MoodDetail ({match}) {
    let params = match.params
    let emotion = params.emotion
    const [story,setStory] = useState([])
    const [exercise,setExercise] = useState()
    const [isCounselor,setisCounselor] = useState(false)

    // const [] = {};
    let history = useHistory()
    useEffect(
        ()=>{
            queryStory(emotion).then(res=>setStory(res.data));
            queryExerciseByEmotion(emotion).then(res=>setExercise(res.data));
        },
        [match]
    )
    const updatePost = (id)=>{
        getStory(id).then(
            (response)=>{
                let data = response.data;
                setStory( (story)=>story.map(
                    e=>e.id==data.id?data:e
                ))
            }
        )
    }
    return (
        <Container className={["moodboard-container","mood-detail-container"]}>

            <Row>
                            
                <img src={bg} className="moodboard-bg"/>
                <Row className="mooddetail-header-row">
                    <Button variant="outline-secondary" className="mood-back" onClick={()=>history.push('/')}>&lt;</Button>
                    <img className="mood-detail-header-img" src={getEmojiByKey(emotion)} />
                    <span className="moodboard-text">{'#'+ emotion}</span>
                    
                    
                </Row>
                </Row>

            <Row className="mooddetail-head">
                <h2> Todays Challenge</h2>
            </Row>
            <Row>
                {exercise?<div className="exercise-card">
                <Row className="exercise-card-title">🌿 {exercise.name}</Row>
                <Row className="exercise-card-body">
                    <Col md={6}>
                        <img src={"/img/"+exercise.image}></img>
                    </Col>
                    <Col md={6}>
                        <div>
                    🎯Targeting Emotion:<br></br>
                    {(exercise.detail?.labels_q1).join(',')}<br></br><br></br>
                    🏆Effect/goal<br></br>
                    {exercise.detail?.labels_q3}</div>
                    </Col>
                </Row>
                </div>:""}
            </Row>
            <Row className="mooddetail-head">
                <h2> Shared Stories</h2>
            </Row>
            <Row className="moodpost-container">
                {story.length?story.map(
                    e=><PostCard post={e} onChange={()=>updatePost(e.id)}
                    
                    isCounselor={isCounselor}
                    changeCounselor={setisCounselor}/>
                    ):""}
            </Row>

        </Container>
   )
}

export default MoodDetail;