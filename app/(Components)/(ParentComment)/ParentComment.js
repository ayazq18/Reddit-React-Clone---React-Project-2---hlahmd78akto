'use client'
import { DeleteOutline, MoreHoriz } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { context } from '../(Context)/ContextProvider'
import { apicontext } from '../(Context)/Apicontextprovider'
import ChildComment from './ChildComment'

export default function ParentComment({ itemcomment, index, }) {
    const { theme, token, loginInfo, router } = useContext(context)
    const { popupdelete, handledeletecomment, fetchDeleteComments, getTimeDifference} = useContext(apicontext)
    const [data, setdata] = useState()
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
            setdata(result.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    // -------------------Fetch User Profile------------------
    useEffect(() => {
        fetchuserdata(itemcomment.author)
        loginInfo
    }, [])

    return (
        <>
            {data && <Box key={index} sx={{ width: '100%', border: `1px solid ${theme === 'light' ? '#fff' : '#000'}`, ":hover": { border: `1px solid ${theme === 'light' ? '#000' : '#fff'}` }, p: '10px', }}>
                <Box sx={{ width: '100%', pl: '10px', borderLeft: `.5px dashed ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box className='c' sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {data.profileImage ? <img style={{ width: '1rem', borderRadius: '4px' }} className="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={data.profileImage} />
                                : <Typography variant='h6' sx={{fontSize:'12px',fontWeight:'700', textTransform:'uppercase', p:'2px 7px', borderRadius:'100%',backgroundColor: '#808080'}}>{data.name.charAt(0)}</Typography>}
                            <Typography onClick={() => router.push(`/User/${data._id}`)} variant="h6" sx={{ fontSize: '12px' }}>{data.name}</Typography>
                            <Typography variant="h4" sx={{ fontSize: '12px', color: '#808080' }}>.&nbsp;&nbsp;{getTimeDifference(itemcomment.createdAt)}</Typography>
                        </Box>
                        <Box position='relative'>
                            {data._id == loginInfo && <MoreHoriz onClick={() => handledeletecomment(itemcomment._id)} />}
                            {popupdelete == itemcomment._id && <Box sx={{ zIndex: '9', position: 'absolute', right: '0', p: '10px', bgcolor: 'red', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, border: `1px solid ${theme === 'light' ? 'rgba(236, 232, 232, 0.934)' : 'rgba(224, 224, 247, 0.14)'}`, color: `${theme === 'light' ? '#000' : '#fff'}`, }}>
                                <Box onClick={() => fetchDeleteComments(itemcomment._id)} sx={{ p: '10px', textWrap: 'nowrap', display: 'flex', alignItems: 'center', gap: '10px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>
                                    <DeleteOutline />
                                    <Typography variant="h6" sx={{ fontSize: '14px' }}>Delete Comment</Typography>
                                </Box>
                            </Box>}
                        </Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontSize: '14px', ml:'25px' }}>{itemcomment.content}</Typography>
                </Box>
                {itemcomment.children.map((item, index) => (
                    <ChildComment key={index} item={item} index={index} />
                ))}

            </Box>}
        </>
    )
}
