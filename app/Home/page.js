'use client'
import { Button, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, } from "react";
import { LocalFireDepartment, MoreHoriz, NewReleasesTwoTone, Publish, Rocket, Security, VisibilityOff, } from "@mui/icons-material";
import { arrowdown, arrowup, comments, share } from "../(Components)/(Constants)/Asset";
import { context } from "../(Components)/(Context)/ContextProvider";
import Community from "../(Components)/(Community)/Community";
import { apicontext } from "../(Components)/(Context)/Apicontextprovider";
import FilterandCreatePost from "../(Components)/(SmallComponents)/FilterandCreatePost";
import PremiumandHomeDetails from "../(Components)/(SmallComponents)/PremiumandHomeDetails";


export default function Home() {
  const { theme, router, pop, popup, userprofilename } = useContext(context)
  const {  post, getTimeDifference, fetchDeletePost, fetchUpdatePost, Likepost, Disikepost, likedCount, dislikedCount, popupdelete, handledeletecomment, } = useContext(apicontext)
  const handlelikedcount = (val) => {
    if (likedCount.status === 'success') {
      return val + 1;
    } else if (dislikedCount.status === 'success') {
      return val - 1;
    } else {
      return val;
    }
  }

  return (
    <Box className='home' sx={{ width: '100vw', backgroundColor: `${theme === 'light' ? '#DAE0E6' : '#000'}`, display: 'flex', justifyContent: 'center', gap: '10px' }}>
      {popup['createcommunity'] && <Box sx={{ position: 'absolute', top: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', zIndex: '8', bgcolor: 'rgba(24, 23, 23, 0.923)' }}>
        <Box sx={{ zIndex: '9' }}><Community pop={pop} /></Box>
      </Box>}
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>

        {/* --------Create post and Filters------------- */}
        <FilterandCreatePost />
        {/* --------Create post and Filters------------- */}

        {post && post.map((item, index) => (
          <Box key={index} sx={{ width: { xs: '100%', md: '100%' }, display: 'flex', gap: '5px', mb: '10px', borderRadius: '3px', border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, ":hover": { border: `${theme === 'light' ? '1px solid #808080' : '1px solid white'}` } }}>
            <Box sx={{ p: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '3px 0 0 3px', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, boxSizing: 'border-box' }}>
              <Typography className="c" onClick={() => { Likepost(item._id) }} sx={{ display: 'flex', alignItems: 'center', p: '5px', color: `${likedCount.status === 'success' ? 'orangered' : theme === 'light' ? '#000' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#808080' : '#323235'}` } }}>{arrowup}</Typography>
              <Typography variant="p" sx={{ p: '5px', fontSize: '12px' }}>{handlelikedcount(item.likeCount)}</Typography>
              <Typography className="c" onClick={() => { Disikepost(item._id) }} sx={{ display: 'flex', alignItems: 'center', color: `${dislikedCount.status === 'success' ? 'blue' : theme === 'light' ? '#000' : '#fff'}`, p: '5px', ":hover": { bgcolor: `${theme === 'light' ? '#808080' : '#323235'}` } }}>{arrowdown}</Typography>
            </Box>
            <Box sx={{ p: '10px', width: '100%' }}>
              <Box className="c" sx={{ display: 'flex', alignItems: 'center', gap: '5px', p: '5px 0' }}>
                {item.author.profileImage ? <img style={{ width: '1rem', borderRadius: '4px' }} className="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={item.author.profileImage} />
                  : <Typography variant='h6' sx={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', p: '2px 7px', borderRadius: '100%', backgroundColor: '#808080' }}>{item.author.name.charAt(0)}</Typography>}
                <Typography onClick={() => router.push(`/User/${item.author._id}`)} variant="p" sx={{ fontSize: '14px', fontWeight: '700' }}>{item.author.name} &nbsp;.</Typography>
                <Typography variant="p" sx={{ fontSize: '10px' }}>{getTimeDifference(item.createdAt)}</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontSize: '18px', mb: '10px' }}>{item.content}</Typography>
              <img style={{ width: '100%', height: '400px' }} src={item.images[0]} srcSet="" sizes="" alt=""></img>

              {/* -----------------comment share delete options------------------------ */}
              <Box display='flex' alignItems='center' gap='15px' sx={{ p: '10px 0', height: '50px', cursor: 'pointer' }}>
                <Box onClick={() => router.push(`/PostComments/${item.author._id}?PostId=${item._id}`)} sx={{ display: 'flex', alignItems: 'center', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                  <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{comments}</Typography>
                  <Typography variant="h6" sx={{ p: '5px', fontSize: '12px' }}>{item.commentCount} Comments</Typography>
                </Box>

                {item.author.name === userprofilename && <Box position='relative'>
                  <Box sx={{ display: 'flex', alignItems: 'center', }}><MoreHoriz sx={{ color: `${theme === 'light' ? '#000' : '#fff'}` }} onClick={() => handledeletecomment(item._id)} /></Box>
                  {popupdelete == item._id && <Box sx={{ position: 'absolute', width: '200px', p: '10px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, }}>
                    <Box onClick={() => { fetchDeletePost(item._id), fetchUpdatePost(item._id), pop('delete') }} sx={{ p: '10px 0 10px 20px', textWrap: 'nowrap', display: 'flex', alignItems: 'center', gap: '10px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>
                      <VisibilityOff />
                      <Typography variant="contained" >Delete Post</Typography>
                    </Box>
                    <Box onClick={() => { router.push(`/submit/${item._id}`), pop('delete') }} sx={{ p: '10px 0 10px 20px', textWrap: 'nowrap', display: 'flex', alignItems: 'center', gap: '10px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>
                      <VisibilityOff />
                      <Typography variant="contained">Edit Post</Typography>
                    </Box>
                  </Box>}
                </Box>}
              </Box>
              {/* -----------------commen share delete options------------------------ */}

            </Box>
          </Box>))}
      </Box>
      <Box sx={{ width: '25%', p: '19px 10px', height: '100vh', display: { xs: 'none', md: 'block' } }}>

        {/* --------Premium and Detail Section------------- */}
        <PremiumandHomeDetails />
        {/* --------Premium and Detail Section------------- */}

      </Box>
    </Box>
  )
}
