import { useState } from 'react'
import { AISuggestionsPanel } from '../components/ui/AISuggestionsPanel'
import { ChatThread } from '../components/ui/ChatThread'
import { ContactHeader } from '../components/ui/ContactHeader'
import { MessageBubble } from '../components/ui/MessageBubble'
import { MessageComposer } from '../components/ui/MessageComposer'
import '../components/ui/ui.css'

const contact = {
  name: 'Angela Campbell',
  phone: '(269) 682-1892',
}

const messages = [
  { id: 1, direction: 'outgoing' as const, text: 'Hey, could you add Alex to tomorrow’s meeting?' },
  { id: 2, direction: 'incoming' as const, text: 'Their email is alex@icecap.io' },
]

const aiSuggestions = [
  'No problem, Alex has been added to the meeting invite for tomorrow. Thanks for letting me know!',
  'Done, I just sent an invite to Alex for tomorrow’s meeting. Let me know if there’s anything else I can do for you.',
  'Sure thing, Alex has been included in the meeting invite that was just sent out. If they have any questions or concerns, please let me know.',
]

export function Dashboard() {
  const [isAiPanel, setOpenAiPanel] = useState(false);
  const toggleAiSuggestionPanel = () => {
    setOpenAiPanel((prev) => !prev);
  }
  return (
    <div className="conversation">
      <ContactHeader name={contact.name} phone={contact.phone} />

      <ChatThread>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            direction={message.direction}
            text={message.text}
            avatarName={contact.name}
          />
        ))}
      </ChatThread>

      {isAiPanel && <AISuggestionsPanel suggestions={aiSuggestions} /> }

      <MessageComposer initialValue="/AI" openAIPanel={toggleAiSuggestionPanel}/>
    </div>
  )
}
