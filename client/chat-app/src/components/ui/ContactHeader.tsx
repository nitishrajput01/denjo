import { Avatar } from './Avatar'
import { IconButton } from './IconButton'
import { CheckIcon, MoreIcon, NoteIcon, PhoneIcon } from './Icons'

interface ContactHeaderProps {
  name: string
  phone: string
}

export function ContactHeader({ name, phone }: ContactHeaderProps) {
  return (
    <header className="contact-header">
      <Avatar name={name} />
      <div className="contact-header__info">
        <span className="contact-header__name">{name}</span>
        <span className="contact-header__phone">{phone}</span>
      </div>
      <div className="contact-header__actions">
        <IconButton label="Call">
          <PhoneIcon />
        </IconButton>
        <IconButton label="Mark as done">
          <CheckIcon />
        </IconButton>
        <IconButton label="Notes">
          <NoteIcon />
        </IconButton>
        <IconButton label="More options">
          <MoreIcon />
        </IconButton>
      </div>
    </header>
  )
}
