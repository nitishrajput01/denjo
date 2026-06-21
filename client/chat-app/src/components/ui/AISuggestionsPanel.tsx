import { AIPromptInput } from './AIPromptInput'
import { AISuggestionCard } from './AISuggestionCard'

interface AISuggestionsPanelProps {
  suggestions: string[]
  onSelect?: (text: string) => void
}

export function AISuggestionsPanel({ suggestions, onSelect }: AISuggestionsPanelProps) {
  return (
    <div className="ai-panel">
      <AIPromptInput placeholder="Ask OpenPhone AI to write a response..." />
      <div className="ai-panel__list">
        {suggestions.map((suggestion) => (
          <AISuggestionCard key={suggestion} text={suggestion} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
