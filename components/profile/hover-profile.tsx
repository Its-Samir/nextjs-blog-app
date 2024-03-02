import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

export default function HoverProfile({children}: {children: React.ReactNode}) {
  return (
    <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
            {children}
        </HoverCardTrigger>
        <HoverCardContent>
            <h1>Testing</h1>
        </HoverCardContent>
    </HoverCard>
  )
}
