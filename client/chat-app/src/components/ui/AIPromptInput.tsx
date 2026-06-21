import { useState } from 'react'
import { SendIcon, SparkleIcon } from './Icons'

interface AIPromptInputProps {
  placeholder: string
  onSend?: (value: string) => void
}

export function AIPromptInput({ placeholder, onSend }: AIPromptInputProps) {
  const [value, setValue] = useState('')

  function handleSend() {
    if (!value.trim()) return
    onSend?.(value)
    setValue('')
  }

  return (
    <div className="ai-prompt">
      <SparkleIcon className="ai-prompt__icon" />
      <input
        className="ai-prompt__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button type="button" className="ai-prompt__send" aria-label="Send to AI" onClick={handleSend}>
        <SendIcon width={14} height={14} />
      </button>
    </div>
  )
}
