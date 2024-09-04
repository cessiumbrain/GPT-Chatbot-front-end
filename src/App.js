import './App.css';
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import ChatFrame from './ChatFrame';



function App() {

  const [text, setText] = useState('')
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      content: 'I am a helpful assistant.  How may I assist you today?'
  }
  ])

  async function sendChat(){
    //update chat history with variables as well as with state
    const chatHistoryPlusUser = [...chatHistory, {
      role: 'user',
      content: text
    }]
    console.log('send chat function call')

    //add text to chat history
    setChatHistory(chatHistoryPlusUser)

    //reset the text
    setText('')

    //reset the textarea cursor
    textAreaRef.current.setSelectionRange(0,0)

    //scroll the chat window to bottom
    resetChatUI()

    //send post request to server with new chatHistory
    console.log('post request', chatHistory)
    axios.post('https://gpt-chatbot-server.onrender.com', {
      messageHistory: chatHistoryPlusUser
    })
    .then(function (response) {
      console.log('chat history', chatHistory, 'response.data', response.data)
      setChatHistory([...chatHistoryPlusUser, response.data])
      setTimeout(()=>{
        resetChatUI()
      }, 3000)
      

      //reset textarea cursor
      textAreaRef.current.setSelectionRange(0,0)
      
    })
    .catch(function (error) {
      setChatHistory([...chatHistoryPlusUser, {
        role: 'assistant',
        content: `I'm sorry, an error occurred trying to process your request, please try again later.`
      }])
      console.log(error);
    });
  }

  const divRef = useRef(null)
  const textAreaRef = useRef(null)

  function resetChatUI(){
    console.log('scrolltoBottom', divRef.current.scrollTop, divRef.current.scrollHeight)
    divRef.current.scrollTop = divRef.current.scrollHeight;

    
  }

  useEffect(()=>{
    //every time the chat history is changed scroll the chatframe to the bottom
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [chatHistory])


  return (
    <div className="App">
      <ChatFrame 
      textAreaRef={textAreaRef}
      divRef={divRef}
      chatHistory={chatHistory}
      ></ChatFrame>
      <div className="text-box-wrapper">
        <textarea 
        ref={textAreaRef}
        type="text" 
        onChange={(e)=>setText(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key === 'Enter'){
            sendChat()
          }
        }}
        value={text}
        className="text-box-content"></textarea>
      
        {/* <IoMdSend size="2em"></IoMdSend> */}
       <div 
       
       className="send-btn-wrapper">
          <IoMdSend onClick={sendChat}size="2em"></IoMdSend>
       </div>
      </div>
      
    </div>
  );
}


export default App;
