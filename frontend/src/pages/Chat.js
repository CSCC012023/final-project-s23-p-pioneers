import React, { useState } from 'react'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'

const Chat = () => {
	const [username, setUsername] = useState('')

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
		return (
			<div style={{ color: 'black'}}>
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
                    style={{ color: 'black' }}
				/>
				<button onClick={() => createDirectChat(creds)} style={{ color: 'black'}}>
					Create
				</button>
			</div>
		)
	}
    const userName = localStorage.getItem("username")
    const password = localStorage.getItem("password")

	return (
            
        <ChatEngine
            height='90vh'
            projectID="211d0b46-aff7-4e68-8206-304093e6abbf"
            userName={userName}
            userSecret={password}
            renderNewChatForm={(creds) => renderChatForm(creds)}
        />
	)
}

export default Chat;