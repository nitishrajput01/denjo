import { useState } from 'react'
import { IconButton } from './IconButton'
import {
  ClockIcon,
  CodeIcon,
  EmojiIcon,
  PaperclipIcon,
  SendIcon,
  SparkleIcon,
} from './Icons'

interface MessageComposerProps {
  initialValue?: string
  onSend?: (value: string) => void
  openAIPanel?: () => void
}

export function MessageComposer({ initialValue = '', onSend, openAIPanel }: MessageComposerProps) {
  const [value, setValue] = useState(initialValue)

  function handleSend() {
    if (!value.trim()) return
    onSend?.(value)
    setValue('')
  }

  return (
    <div className="composer">
      <input
        className="composer__input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Write a message..."
      />
      <div className="composer__toolbar">
        <div className="composer__toolbar-group">
          <IconButton label="AI assist" variant="primary" onClick={() => openAIPanel?.()}>
            <SparkleIcon />
          </IconButton>
          <IconButton label="Insert snippet">
            <CodeIcon />
          </IconButton>
          <IconButton label="Attach file">
            <PaperclipIcon />
          </IconButton>
          <IconButton label="Insert emoji">
            <EmojiIcon />
          </IconButton>
        </div>
        <div className="composer__toolbar-group">
          <IconButton label="Message history">
            <ClockIcon />
          </IconButton>
          <IconButton label="Send message" variant="muted" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
