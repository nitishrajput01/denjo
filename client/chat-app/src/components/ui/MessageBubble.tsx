import { Avatar } from './Avatar'

interface MessageBubbleProps {
  text: string
  direction: 'incoming' | 'outgoing'
  avatarName?: string
}

export function MessageBubble({ text, direction, avatarName }: MessageBubbleProps) {
  return (
    <div className={`message-row message-row--${direction}`}>
      {direction === 'incoming' && avatarName && <Avatar name={avatarName} size="sm" />}
      <p className={`message-bubble message-bubble--${direction}`}>{text}</p>
    </div>
  )
}
