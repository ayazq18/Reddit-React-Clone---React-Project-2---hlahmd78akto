import { Security } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { context } from '../(Context)/ContextProvider'

export default function PremiumandHomeDetails() {
    const { theme, router, pop, homeorpopular } = useContext(context)
    return (
        <div>
            <Box sx={{ width: '100%', p: '10px', border: '1px solid red', borderRadius: '3px', backgroundColor: `${theme === 'light' ? '#fff' : '#091113'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Security sx={{ color: "orangered", fontSize: '28px' }} />
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: '11px' }}>Reddit Premium</Typography>
                        <Typography variant="h6" sx={{ fontSize: '11px' }}>The best Reddit experience</Typography>
                    </Box>
                </Box>
                <Button variant='contained' onClick={() => router.push('/Premium')} sx={{ width: '100%', fontSize: '14px', textTransform: 'revert', mt: '5px', borderRadius: '20px', bgcolor: 'orangered', ":hover": { bgcolor: 'orangered' } }}>Try Now</Button>
            </Box>
            <Box sx={{ position: 'relative', pb: '20px', mt: '20px', width: '100%', borderRadius: '4px', backgroundColor: `${theme === 'light' ? '#fff' : '#091113'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
                <img style={{ width: '100%' }} src="/home-banner.png" />
                <Box sx={{ mt: '-16px', display: 'flex', alignItems: 'flex-end', gap: '15px', p: '0 10px' }}>
                    <img style={{ width: '40px' }} src="/snoo.png" />
                    <Typography>{homeorpopular === 'Home' ? 'Home' : 'Popular'}</Typography>
                </Box>
                <Box sx={{ width: '100%', textWrap: 'wrap', fontSize: '14px', p: '10px', borderBottom: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.107)' : 'rgba(224, 224, 247, 0.04)'}` }}>
                    <Typography variant="" >Your personal Reddit frontpage. Come here to check in with your favorite communities.</Typography>
                </Box>
                <Box sx={{ display: 'flex', pt: '20px', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <Button onClick={() => router.push(`/submit/newpost`)} variant='contained' sx={{ width: '90%', p: '3px', fontSize: '14px', textTransform: 'revert', borderRadius: '20px', color: `${theme === 'light' ? '#fff' : '#000'}`, bgcolor: `${theme === 'light' ? 'rgb(70, 70, 218)' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? 'rgb(70, 70, 218)' : '#fff'}` } }}>Create Post</Button>
                    <Button onClick={() => pop('createcommunity')} variant='outlined' sx={{ width: '90%', p: '3px', fontSize: '14px', fontWeight: '700', textTransform: 'revert', color: `${theme === 'light' ? 'blue' : '#fff'}`, borderRadius: '20px', border: `1px solid ${theme === 'light' ? 'blue' : '#fff'}`, outline: 'none', ":hover": { border: `1px solid ${theme === 'light' ? 'blue' : '#fff'}` } }}>Create Community</Button>
                </Box>
            </Box>
        </div>
    )
}
