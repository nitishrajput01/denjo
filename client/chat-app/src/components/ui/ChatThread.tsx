import type { ReactNode } from 'react'

interface ChatThreadProps {
  children: ReactNode
}

export function ChatThread({ children }: ChatThreadProps) {
  return <div className="chat-thread">{children}</div>
}
