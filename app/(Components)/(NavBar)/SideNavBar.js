// 'use client'
// import React, { useContext, useState } from 'react'
// import { home, popular, createicon, communitydropdown } from '../(Constants)/Asset'
// import { Box } from '@mui/system'
// import { IconButton, Typography } from '@mui/material'
// import Community from '../(Community)/Community';
// import { context } from '../(Context)/ContextProvider'
// import { apicontext } from '../(Apicontext)/Apicontextprovider'


// export default function SideNavBar({ }) {
//     const { router, switchDark, switchLight, theme, popup, pop, setpopup, token, activeTabs, setActiveTabs, handleTabs } = useContext(context)
//     const { channel, setChannel } = useContext(apicontext)


//     return (
//         <Box sx={{}}>
//             {popup['popcom'] && <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', zIndex: '8', bgcolor: 'rgba(71, 58, 58, 0.758)' }}>
//                 <Box sx={{ zIndex: '9' }}><Community pop={pop} /></Box>
//             </Box>}
//             <Box className='sidenavBar' sx={{ overflowY: 'scroll', width: '280px', p: '20px 5px 20px 15px', height: '100vh',borderRight: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.104)'}`,}}>
//                 <Box sx={{ borderBottom: '1px solid rgba(236, 232, 232, 0.134)', mb: '10px', borderBottom: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.104)'}`, }}>
//                     <Box className={activeTabs === 'Home' && 'activeclass'} onClick={() => { handleTabs('Home'), `${token ? router.push('/Home') : router.push('/')}` }} sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, width: '100%', display: 'flex', gap: '10px', alignItems: 'center', p: '7px 7px 7px 20px', borderRadius: '7px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography sx={{ position: 'relative', top: '2px', }}>{home}</Typography><Typography variant='p' sx={{ fontSize: '14px', }}>Home</Typography></Box>
//                     <Box className={activeTabs === 'Popular' && 'activeclass'} onClick={() => { handleTabs('Popular'), `${token ? router.push('/Popular') : router.push('/PopularHome')}`  }} sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: 'flex', gap: '10px', alignItems: 'center', p: '7px 7px 7px 20px', borderRadius: '7px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography sx={{ position: 'relative', top: '2px' }}>{popular}</Typography><Typography variant='p' sx={{ fontSize: '14px', }}>Popular</Typography></Box>
//                 </Box>
                
//             </Box>
//         </Box>
//     )
// }

// {/* {token && <Box sx={{ borderBottom: '1px solid lightgray' }}>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', }}>
//                         <Box onClick={() => { pop('community') }} sx={{ color: `${theme === 'light' ? '#0b1416' : '#fff'}`, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', borderRadius: '10px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography variant='p' sx={{ fontSize: '13px', letterSpacing: '2px', }}>COMMUNITY</Typography><Typography sx={{ display: 'flex', alignItems: 'center', transition: 'all .5s ease' }}>{communitydropdown}</Typography></Box>
//                         <Box sx={{ width: '100%' }}>
//                             <IconButton sx={{ color: `${theme === 'light' ? '#0b1416' : '#fff'}`, width: '100%', p: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '7px', borderRadius: '10px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
//                                 <Typography sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', }}>{createicon}</Typography>
//                                 <Typography variant='h6' sx={{ fontSize: '14px', }}>Create a community</Typography>
//                             </IconButton>
//                             {channel.map((item, index) => (
//                                 <IconButton key={index} onClick={() => pop('popcom')} sx={{ color: `${theme === 'light' ? '#0b1416' : '#fff'}`, width: '100%', p: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '7px', borderRadius: '10px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
//                                     <img style={{ width: '20px', flexGrow: 0, display: 'flex', alignItems: 'center', }} src={item.image} />
//                                     <Typography variant='h6' sx={{ fontSize: '14px', }}>{item.name}</Typography>
//                                 </IconButton>
//                             ))}
//                         </Box>
//                     </Box>
//                 </Box>} */}