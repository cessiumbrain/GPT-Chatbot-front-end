import { useRef } from "react"

function ChatFrame(props){
   
   

    return(
      <div ref={props.divRef} className='chat-box'>
        {
          props.chatHistory.map((item, idx)=>{
            
            return(
              <p key={idx}><span className={item.role}>{item.role}: </span>{item.content}</p>
            )
          })
        }
      </div>
    )
  }

  export default ChatFrame