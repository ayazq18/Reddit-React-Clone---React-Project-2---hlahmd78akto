'use client'
import NavBarr from './(Components)/(NavBar)/NavBarr'
import './globals.css'
import { ContextProvider } from './(Components)/(Context)/ContextProvider'
import Apicontextprovider from './(Components)/(Apicontext)/Apicontextprovider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <ContextProvider>
          <Apicontextprovider>
        <div style={{width:'100%', overflow:'hidden',position:'fixed', top:'0',}}>
          <NavBarr children={children}/>
        </div>
        </Apicontextprovider>
        </ContextProvider>
      </body>
    </html>
  )
}
