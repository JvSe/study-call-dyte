import { MeetProvider } from "@/hook/user"
import { ReactNode } from "react"

type ProviderProps = {
  children: ReactNode
}
export function Provider({ children }: ProviderProps) {
  return (
    <MeetProvider>
      {children}
    </MeetProvider>
  )
}