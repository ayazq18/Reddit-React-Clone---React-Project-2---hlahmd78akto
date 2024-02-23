'use client'
import { DeleteOutline, MoreHoriz } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { context } from '../(Context)/ContextProvider'
import { apicontext } from '../(Apicontext)/Apicontextprovider'

export default function ChildComment({itemcomment, index, item }) {
    const { theme, token, userprofilename} = useContext(context)
    const { popupdelete, handledeletecomment, fetchDeleteComments, getTimeDifference} = useContext(apicontext)
    const [childcommentdata, setchildcommentdata] = useState()
        // -------------------Fetch Userdata for comments section------------------

        const fetchuserdata = async (val) => {
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${val}`, {
                    method: 'GET',
                    headers: {
                        'ProjectID': 'hlahmd78akto',
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                })
                const result = await response.json();
                setchildcommentdata(result.data)
                console.log(result.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        // -------------------Fetch User Profile------------------
    useEffect(()=>{
    fetchuserdata(item.author)
    }, [])
    
    return (
        <>{childcommentdata &&
        <Box key={index} sx={{ width: '100%', border: `1px solid ${theme === 'light' ? '#fff' : '#000'}`, p: '10px', }}>
                <Box key={index} sx={{ width: '100%', bgcolor: '#0079d30d', border: `1px solid ${theme === 'light' ? '#fff' : '#000'}`, p: '10px', }}>
                    <Box sx={{ width: '100%', pl: '10px', borderLeft: `.5px dashed ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {childcommentdata.profileImage ? <img style={{ width: '1rem', borderRadius: '4px' }} class="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={childcommentdata.profileImage} />
                                : <Typography variant='h6' sx={{fontSize:'12px',fontWeight:'700', textTransform:'uppercase', p:'2px 7px', borderRadius:'100%',backgroundColor: '#808080'}}>{childcommentdata.name.charAt(0)}</Typography>}
                                <Typography variant="h6" sx={{ fontSize: '12px' }}>{childcommentdata.name}</Typography>
                                <Typography variant="h4" sx={{ fontSize: '12px', color: '#808080' }}>.&nbsp;&nbsp;{getTimeDifference(item.createdAt)}</Typography>
                            </Box>
                            <Box position='relative'>
                                {childcommentdata.name === userprofilename && <MoreHoriz onClick={() => handledeletecomment(item._id)} />}
                                {popupdelete == item._id && <Box sx={{ zIndex: '9', position: 'absolute', right: '0', p: '10px', bgcolor: 'red', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, border: `1px solid ${theme === 'light' ? 'rgba(236, 232, 232, 0.934)' : 'rgba(224, 224, 247, 0.14)'}`, color: `${theme === 'light' ? '#000' : '#fff'}`, }}>
                                    <Box onClick={() => fetchDeleteComments(item._id)} sx={{ p: '10px', textWrap: 'nowrap', display: 'flex', alignItems: 'center', gap: '10px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>
                                        <DeleteOutline />
                                        <Typography variant="h6" sx={{ fontSize: '14px' }}>Delete Comment</Typography>
                                    </Box>
                                </Box>}
                            </Box>
                        </Box>
                        <Typography variant="h6" sx={{ fontSize: '14px', ml:'25px' }}>{item.content}</Typography>
                    </Box>
                </Box>
        </Box>
        }</>
    )
}
