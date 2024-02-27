'use client'
import { Close } from '@mui/icons-material'
import { Avatar, Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { commType, } from '../(Constants)/Asset'
import { context } from '../(Context)/ContextProvider'
import { apicontext } from '../(Context)/Apicontextprovider'

export default function Community({ pop }) {
    const {theme,} = useContext(context)
    const { subredditname, setsubredditname, fetchCreatesubreddit} = useContext(apicontext)
    const [letterCount, setLetterCount] = useState(0)
    const handleNameLength = (e) => {
        setLetterCount(e.target.value.length)
    }

    const handlecreatesubreddit = ()=>{
        fetchCreatesubreddit();
        pop('popcom')
    }

    return (
        <Box sx={{ m: { xs: '0', md: '10px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <Box className='community' sx={{backgroundColor: `${theme === 'light' ? '#fff' : 'rgb(26,26,27)'}`,border:`1px solid ${theme === 'light' ? '#fff' : '#303031'}`, p: '15px', width: { xs: '100%', md: '37vw' }, height: { xs: '100vh', md: '85vh' },borderRadius: { xs: '0', md: '5px' } }}>
                <Box sx={{ mb: '10px', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ pb: '10px', width: '100%', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${theme === 'light' ? 'rgba(24, 23, 23, 0.26)' : '#303031'}`   }}>
                        <Typography variant='h5' sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, textWrap: 'nowrap', fontSize: { xs: '20px', md: '15px' } }}>Create a community</Typography>
                    </Box>
                    <Avatar onClick={() => pop('popcom')} sx={{ cursor: 'pointer', color: `${theme === 'light' ? '#000' : '#fff'}`, fontSize: '5px', bgcolor: `${theme === 'light' ? '#fff' : 'rgb(26,26,27)'}`}}>
                        <Close />
                    </Avatar>
                </Box>
                <Typography variant='h5' sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, textWrap: 'nowrap', fontSize: { xs: '20px', md: '15px' } }}>Name</Typography>
                <Typography sx={{ color: `${theme === 'light' ? '#000' : '#808080'}`, fontSize: '12px', lineHeight: '1.5' }}>Community names including capitalization cannot be changed.</Typography>
                <input
                    className='input'
                    required
                    id="name"
                    placeholder='name'
                    name="name"
                    style={{ width: '100%', padding: '10px', margin: '20px 0', outline: `${letterCount < 3 && '1px solid red'}`, border: 'none', borderRadius: '3px', bgcolor: 'rgba(236, 232, 232, 0.334)' }}
                      value={subredditname}
                    onChange={(e) => {setsubredditname(e.target.value), handleNameLength(e)}}
                />
                <Box sx={{ p: '0 0px', display: 'flex', justifyContent: 'space-between', color: '#000' }}>
                    {letterCount < 3 ?
                        (<Typography variant='p' sx={{ fontSize: '10px', color: 'red' }}>Please lengthen this text to 3 characters or more (you are currently using {letterCount} character).</Typography>)
                        :
                        (<Typography sx={{ fontSize: '12px' }}>Choose wisely. Once you pick a name, it can't be changed.</Typography>)}
                    <Typography sx={{ fontSize: '12px' }}>{letterCount}</Typography>
                </Box>
                <Typography variant='h6' sx={{m:'20px 0 10px 0', fontSize: '14px', color: `${theme === 'light' ? '#000' : '#fff'}`,}}>Community type</Typography>
                {commType.map((com, index) => (
                    <label for={`radio${index}`}>
                        <Box key={index} sx={{mb:'10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <input
                                style={{fontSize:'20px'}}
                                    margin="normal"
                                    required
                                    type='radio'
                                    id={`radio${index}`}
                                    name='radio'
                                    autoFocus
                                />
                                <Typography sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: 'flex', alignItems: 'center', width: '15px' }}>{com.icon}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Typography variant='h6' sx={{ fontSize: '14px', color: `${theme === 'light' ? '#000' : '#fff'}` }}>{com.type}</Typography>
                                    <Typography variant='p' sx={{ fontSize: '12px', color: '#808080', textWrap: 'nowrap' }}>{com.permission}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </label>
                ))}
                <Box sx={{ }}>
                    <Box sx={{ width: '100%',mt:'30px', p: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',  }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input type='checkbox' style={{width:'20px', height:'20px'}}/>
                            <Typography variant='h6' sx={{backgroundColor:'red', fontSize:'12px',p:'0 3px'}}>NSFW</Typography>
                            <Typography variant='h6' sx={{ fontSize: '14px', color: '#808080' }}>18+ year old community</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box display='flex' width='100%' mt='30px' p='10px' justifyContent='flex-end' alignItems='center' gap='5px'>
                    <Button onClick={()=>pop('popcom')} variant='outlined' sx={{ borderRadius: '20px', fontSize: '12px', fontWeight:'700', p: '5px 20px', }}>Cancel</Button>
                    <Button onClick={()=>handlecreatesubreddit()} variant='contained' disabled={subredditname == ''} sx={{ borderRadius: '30px', fontSize: '12px', fontWeight:'700', p: '5px 20px' , bgColor: `${theme === 'light' ? '#0045ac' : '#fff'}`, textTransform: 'revert' }}>Create Community</Button>
                </Box>
            </Box>
        </Box>
    )
}
