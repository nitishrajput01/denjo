interface AISuggestionCardProps {
  text: string
  onSelect?: (text: string) => void
}

export function AISuggestionCard({ text, onSelect }: AISuggestionCardProps) {
  return (
    <button type="button" className="ai-suggestion" onClick={() => onSelect?.(text)}>
      {text}
    </button>
  )
}
