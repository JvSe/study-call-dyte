import { AuthProvider } from "@/hook/auth"
import { MeetProvider } from "@/hook/meet"
import { ReactNode } from "react"

type ProviderProps = {
  children: ReactNode
}
export function Provider({ children }: ProviderProps) {
  return (
    <AuthProvider>
      <MeetProvider>
        {children}
      </MeetProvider>
    </AuthProvider>
  )
}