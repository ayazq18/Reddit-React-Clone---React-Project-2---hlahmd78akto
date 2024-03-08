'use client'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { context } from '../(Context)/ContextProvider'
import { apicontext } from '../(Context)/Apicontextprovider'
import { FilterVintage } from '@mui/icons-material'

export default function Userprofiledetails({userprops}) {
    const { userprofilename, theme, pop, popup } = useContext(context)
    const { formatDate, userdata, handlefollowuser,} = useContext(apicontext)
  console.log(userprops)
    return (
        <Box sx={{ position: 'relative', pb: '20px', mt: '0px', height: `${popup['moreoptions'] ? 'fit-content' : '320px'}`, borderRadius: '4px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
            <Box sx={{ position: 'relative', width: '100%', height: '100px', borderRadius: '4px 4px 0 0', bgcolor: '#33a8ff', }}>
            </Box>
            <Box sx={{ position: 'absolute', top: '40px', left: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', width: '80px', height: '80px', backgroundColor: `${theme === 'light' ? '#fff' : '#000'}` }}>
                {userdata.profileImage ? <img style={{ width: '70px', borderRadius: '4px' }} className="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={userdata.profileImage} />
                    : <Typography variant='h6' sx={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', p: '2px 7px', borderRadius: '100%', backgroundColor: '#808080' }}>{userdata.name.charAt(0)}</Typography>}
            </Box>
            <Typography sx={{ m: '20px 0px 10px 15px', fontSize: '12px' }}>{userdata.name}</Typography>
            <Box sx={{ p: '0 15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <Box sx={{}}>
                    <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '500' }}>Email</Typography>
                    <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', }}>
                        <FilterVintage sx={{ fontSize: '14px', color: 'orangered' }} />
                        <Typography variant="p" sx={{ fontSize: '12px', color: '#808080' }}>{userdata.email}</Typography>
                    </Box>
                </Box>
                <Box sx={{}}>
                    <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '500' }}>Created on</Typography>
                    <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', }}>
                        <FilterVintage sx={{ fontSize: '14px', color: 'orangered' }} />
                        <Typography variant="p" sx={{ fontSize: '12px', color: '#808080' }}>{formatDate(userdata.createdAt)}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', mt: '10px', p: '15px', justifyContent: 'flex-start', alignItems: 'center', gap: '10px' }}>
                {userprofilename !== userdata.name ?
                    <Button variant='contained' sx={{ width: '40%', p: '3px', fontSize: '14px', textTransform: 'revert', borderRadius: '20px', color: `${theme === 'light' ? '#fff' : '#000'}`, bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}` } }} onClick={() => { handlefollowuser(userprops) }}>{userdata.isFollowed === true ? 'Unfollow' : 'Follow'}</Button>
                    :
                    <Typography sx={{ width: '40%', p: '3px', fontSize: '14px', textTransform: 'uppercase', textAlign: 'center', color: `${theme === 'light' ? '#fff' : '#000'}`, bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}` } }}>My Profile</Typography>
                }
            </Box>
            <Box sx={{ width: '100%' }}>
                <Typography className="c" onClick={() => pop('moreoptions')} variant="h5" sx={{ fontSize: '15px', fontWeight: '700', color: '#177ac5', textAlign: 'end', p: '0 10px' }}>{popup['moreoptions'] ? 'Fewer options' : 'More Options'}</Typography>
            </Box>
            {popup['moreoptions'] && <Box sx={{ p: '10px', width: '100%', }}>
                <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '500' }}>Skills :</Typography>
                {userdata.skills.map((item, index) => (<Typography variant="h6" sx={{ mb: '5px', fontSize: '14px', color: '#177ac5' }}>{item}</Typography>))}
            </Box>}
        </Box>
    )
}
