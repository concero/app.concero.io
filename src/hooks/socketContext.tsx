import { createContext, type FC, useContext } from 'react'
import { io } from 'socket.io-client'

interface SocketContextType {}
export const socket = io('ws://localhost:4000')
export const SocketContext = createContext<SocketContextType | undefined>(undefined)
export const useSocket = () => useContext(SocketContext)
export const SocketProvider: FC = ({ children }) => <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
