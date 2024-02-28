import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { context } from '../(Context)/ContextProvider'
import { apicontext } from '../(Context)/Apicontextprovider'
import { communitydropdown, home, popular } from '../(Constants)/Asset'

export default function SideNavbar() {
    const { token, theme, activeTabs, handleTabs, setloginpop, router } = useContext(context)
    const { recentChannels} = useContext(apicontext)
    return (
        <div>
            <Box sx={{ borderBottom: '1px solid rgba(236, 232, 232, 0.134)', mb: '10px', borderBottom: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : '#101414'}`, }}>
                <Box className={`c ${activeTabs === 'Home' && 'activeclass'}`} onClick={() => { handleTabs('Home'), `${token ? router.push('/Home') : router.push('/')}` }} sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, width: '100%', display: 'flex', gap: '10px', alignItems: 'center', p: '7px 7px 7px 20px', borderRadius: '7px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography sx={{ position: 'relative', top: '2px', }}>{home}</Typography><Typography variant='p' sx={{ fontSize: '14px', }}>Home</Typography></Box>
                <Box className={`c ${activeTabs === 'Popular' && 'activeclass'}`} onClick={() => { handleTabs('Popular'), `${token ? router.push('/Popular') : router.push('/PopularHome')}` }} sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: 'flex', gap: '10px', alignItems: 'center', p: '7px 7px 7px 20px', borderRadius: '7px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography sx={{ position: 'relative', top: '2px' }}>{popular}</Typography><Typography variant='p' sx={{ fontSize: '14px', }}>Popular</Typography></Box>
            </Box>
            {/* ---------------Channel mapping---------------- */}
            <Box sx={{ borderBottom: '1px solid lightgray' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                    <Box sx={{ color: `${theme === 'light' ? '#0b1416' : '#fff'}`, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', borderRadius: '10px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography variant='p' sx={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>Recent</Typography><Typography sx={{ display: 'flex', alignItems: 'center', transition: 'all .5s ease' }}>{communitydropdown}</Typography></Box>
                    <Box sx={{ width: '100%' }}>
                        {recentChannels && recentChannels.map((item, index) => (
                            <IconButton key={index} onClick={() => setloginpop(true)} sx={{ color: `${theme === 'light' ? '#0b1416' : '#fff'}`, width: '100%', p: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '7px', borderRadius: '10px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                                {item.image ? <img style={{ width: '20px', flexGrow: 0, display: 'flex', alignItems: 'center',borderRadius: '100%', }} src={item.image} />
                                    : <Box variant='h6' sx={{ width:'30px', height:'30px',textTransform: 'uppercase',borderRadius: '100%', backgroundColor: '#808080', display:'flex', alignItems:'center', justifyContent:'center' }}><Typography  fontWeight='700'>{item.name.charAt(0)}</Typography></Box>}
                                <Typography variant='h6' sx={{ fontSize: '14px', }}>{item.name}</Typography>
                            </IconButton>
                        ))}
                    </Box>
                </Box>
            </Box>
            {/* ---------------Channel mapping---------------- */}
        </div>
    )
}
