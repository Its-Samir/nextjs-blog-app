import { Card } from "./ui/card";

export default function CardWrapper({children}: {children: React.ReactNode}) {
  return (
    <Card className="shadow-none p-3 flex flex-col gap-3 w-[20rem] rounded-none">{children}</Card>
  )
}
