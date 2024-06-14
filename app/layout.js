'use client'
import NavBarr from './(Components)/(NavBar)/NavBarr'
import './globals.css'
import { ContextProvider } from './(Components)/(Context)/ContextProvider'
import Apicontextprovider from './(Components)/(Context)/Apicontextprovider'
import { SnackbarProvider, useSnackbar } from 'notistack';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <SnackbarProvider>
        <ContextProvider>
          <Apicontextprovider>
        <div className='scrollbar' style={{width:'100vw', position:'fixed', overflowY:'scroll', height:'100%', top:'0',}}>
          <NavBarr children={children}/>
        </div>
        </Apicontextprovider>
        </ContextProvider>
        </SnackbarProvider>
      </body>
    </html>
  )
}
