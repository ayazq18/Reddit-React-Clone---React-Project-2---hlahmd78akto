'use client'
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, } from "react";
import { Delete, MoreHoriz, VisibilityOff, } from "@mui/icons-material";
import CreateIcon from '@mui/icons-material/Create';
import { comments, share } from "../(Components)/(Constants)/Asset";
import { context } from "../(Components)/(Context)/ContextProvider";
import Community from "../(Components)/(Community)/Community";
import { apicontext } from "../(Components)/(Context)/Apicontextprovider";
import FilterandCreatePost from "../(Components)/(SmallComponents)/FilterandCreatePost";
import PremiumandHomeDetails from "../(Components)/(SmallComponents)/PremiumandHomeDetails";
import LikeDislike from "../(Components)/(SmallComponents)/LikeDislike";


export default function Home() {
  const { theme, router, pop, popup, loginInfo } = useContext(context)
  const { post, getTimeDifference, fetchDeletePost, fetchUpdatePost, popupdelete, handledeletecomment, setpopupdelete, } = useContext(apicontext)

  return (
    <Box className='home' sx={{ width: '100vw', backgroundColor: `${theme === 'light' ? '#DAE0E6' : '#0b1416'}`, display: 'flex', justifyContent: 'center', gap: '10px' }}>
      
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>

        {/* --------Create post and Filters------------- */}
        <FilterandCreatePost />
        {/* --------Create post and Filters------------- */}

        {post && post.map((item, index) => (
          <Box key={index} sx={{ width: { xs: '100%', md: '100%' }, display: 'flex', gap: '5px', mb: '10px', borderRadius: '3px', border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, backgroundColor: `${theme === 'light' ? '#fff' : '#091113'}`, ":hover": { border: `${theme === 'light' ? '1px solid #808080' : '1px solid white'}` } }}>
            <Box sx={{width:'7%', p: '10px', borderRadius: '3px 0 0 3px', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, boxSizing: 'border-box' }}>
              {/* -------Like Dislike Component---------- */}
              <LikeDislike item={item} />
              {/* -------Like Dislike Component---------- */}
            </Box>
            <Box sx={{ p: '10px', width: '92%'}}>
              <Box className="c" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box className="c" sx={{ display: 'flex', alignItems: 'center', gap: '5px', p: '5px 0' }}>
                  {item.author.profileImage ? <img style={{ width: '1rem', borderRadius: '4px' }} className="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={item.author.profileImage} />
                    : <Typography variant='h6' sx={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', p: '2px 7px', borderRadius: '100%', backgroundColor: '#808080' }}>{item.author.name.charAt(0)}</Typography>}
                  <Typography onClick={() => router.push(`/User/${item.author._id}`)} variant="p" sx={{ fontSize: '14px', fontWeight: '700' }}>{item.author.name} &nbsp;.</Typography>
                  <Typography variant="p" sx={{ fontSize: '10px' }}>{getTimeDifference(item.createdAt)}</Typography>
                </Box>
                {item.author._id === loginInfo && <Box position='relative'>
                  <Box sx={{ display: 'flex', alignItems: 'center', }}><MoreHoriz sx={{ color: `${theme === 'light' ? '#000' : '#fff'}` }} onClick={() => handledeletecomment(item._id)} /></Box>
                  {popupdelete == item._id && <Box sx={{ position: 'absolute', right: '0', width: '200px', p: '10px', borderRadius: '5px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, }}>
                    <Box onClick={() => { fetchDeletePost(item._id) }} sx={{ p: '10px 0 10px 20px', textWrap: 'nowrap', display: 'flex', alignItems: 'center', gap: '10px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>
                      <Delete />
                      <Typography variant="contained" >Delete Post</Typography>
                    </Box>
                    <Box onClick={() => { router.push(`/submit/${item._id}`), setpopupdelete(null) }} sx={{ p: '10px 0 10px 20px', textWrap: 'nowrap', display: 'flex', alignItems: 'center', gap: '10px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>
                      <CreateIcon />
                      <Typography variant="contained">Edit Post</Typography>
                    </Box>
                  </Box>}
                </Box>}
              </Box>
              <Typography variant="h6" sx={{ fontSize: '18px', overflowWrap: 'break-word', wordWrap: 'break-word', mb: '10px'}}>{item.content}</Typography>

              <img style={{ width: '100%', }} src={item.images[0]} />

              {/* -----------------comment share delete options------------------------ */}
              <Box display='flex' alignItems='center' gap='15px' sx={{ p: '10px 0', height: '50px', cursor: 'pointer' }}>
                <Box onClick={() => router.push(`/PostComments/${item.author._id}?PostId=${item._id}`)} sx={{ display: 'flex', alignItems: 'center', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                  <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{comments}</Typography>
                  <Typography variant="h6" sx={{ p: '5px', fontSize: '12px' }}>{item.commentCount} Comments</Typography>
                </Box>
              </Box>
              {/* -----------------commen share delete options------------------------ */}

            </Box>
          </Box>))}
      </Box>
      <Box sx={{ width: '25%', p: '19px 10px', height: '100vh', display: { xs: 'none', md: 'block' }, position: 'sticky', top: '60px' }}>

        {/* --------Premium and Detail Section------------- */}
        <PremiumandHomeDetails />
        {/* --------Premium and Detail Section------------- */}

      </Box>
    </Box>
  )
}
