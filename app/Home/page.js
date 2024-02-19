'use client'
import { Button, Hidden, IconButton, ListItemIcon, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { ArrowUpwardOutlined, LocalFireDepartment, MoreHoriz, NewReleasesTwoTone, Publish, Rocket, Security, VisibilityOff, } from "@mui/icons-material";
import { arrowdown, arrowup, comments, share } from "../(Components)/(Constants)/Asset";
import { context } from "../(Components)/(Context)/ContextProvider";
import Community from "../(Components)/(Community)/Community";
import { apicontext } from "../(Components)/(Apicontext)/Apicontextprovider";


export default function Home() {
  const { theme, router, pop, popup, } = useContext(context)
  const { post, sort, handleselect, getTimeDifference, fetchDeletePost, fetchUpdatePost, Likepost, Disikepost, likedCount, dislikedCount, } = useContext(apicontext)
    const handlelikedcount = (val)=>{
      if(likedCount.status==='success'){
        return val+1;
      }else if(dislikedCount.status==='success'){
        return val-1;
      }else{
        return val;
      }
    }

  return (
    <Box sx={{ height: '100vh', width: '100vw', backgroundColor: `${theme === 'light' ? '#DAE0E6' : '#000'}`, overflowY: 'scroll', display: 'flex', justifyContent: 'center', gap: '10px' }}>
      {popup['createcommunity'] && <Box sx={{ overflowY: 'scroll', position: 'absolute', top: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', zIndex: '8', bgcolor: 'rgba(24, 23, 23, 0.923)' }}>
        <Box sx={{ zIndex: '9' }}><Community pop={pop} /></Box>
      </Box>}
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <Box width='100%' sx={{ display: 'flex', m: '20px 0', borderRadius: '3px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
          <MenuItem >
            <img style={{ position: 'relative', left: '-5px', width: '35px', borderRadius: '50px' }} src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" alt="User Avatar" class="max-w-full"></img>
            <Box sx={{ position: 'absolute', left: '37px', top: '30px', width: '10px', height: '10px', bgcolor: '#55bd46', borderRadius: '100%' }}></Box>
          </MenuItem>
          <Typography onClick={() => router.push('/submit')} variant="h6" sx={{ width: '70%', p: '7px', m: '7px', borderRadius: '5px', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}`, fontSize: '14px', color: '#808080', ":hover": { border: `${theme === 'light' ? '1px solid blue' : '1px solid white'}`, boxSizing: 'border-box' } }}>Create Post</Typography>
        </Box>
        <Box width='100%' sx={{ p: '10px', m: '20px 0', borderRadius: '3px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}` }}>
          <Box sx={{ width: '100%', borderRadius: '0', display: 'flex' }}>
            <Box onClick={() => handleselect('Best')} className={sort === 'Best' && 'activeclass'} sx={{ color: `${theme === 'dark' && '#fff'}`, p: '0 10px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
              <Rocket color='#808080' />
              <Typography variant="h5" sx={{ fontSize: '13px', fontWeight: '700', textAlign: 'center' }}>Best</Typography>
            </Box>
            <Box onClick={() => handleselect('Hot')} className={sort === 'Hot' && 'activeclass'} sx={{ color: `${theme === 'dark' && '#fff'}`, p: '0 10px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
              <LocalFireDepartment color='#808080' />
              <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: '700', textAlign: 'center', p: '5px 0' }}>Hot</Typography>
            </Box>
            <Box onClick={() => handleselect('New')} className={sort === 'New' && 'activeclass'} sx={{ color: `${theme === 'dark' && '#fff'}`, p: '0 10px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
              <NewReleasesTwoTone color='#808080' />
              <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: '700', textAlign: 'center', p: '5px 0' }}>New</Typography>
            </Box>
            <Box onClick={() => handleselect('Top')} className={sort === 'Top' && 'activeclass'} sx={{ color: `${theme === 'dark' && '#fff'}`, p: '0 10px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
              <Publish color='#808080' />
              <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: '700', textAlign: 'center', p: '5px 0' }}>Top</Typography>
            </Box>
          </Box>
        </Box>






        {post && post.map((item, index) => (
          <Box key={index} sx={{ width: { xs: '100%', md: '100%' }, display: 'flex', gap: '5px', mb: '10px', borderRadius: '3px', border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, ":hover": { border: `${theme === 'light' ? '1px solid #808080' : '1px solid white'}` } }}>
            <Box sx={{ p: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '3px 0 0 3px', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, boxSizing: 'border-box' }}>
              <Typography onClick={() => { Likepost(item._id) }} sx={{ display: 'flex', alignItems: 'center', p: '5px', color:`${likedCount.status==='success' ? 'orangered' : '#000'}`, ":hover": { bgcolor: `${theme === 'light' ? '#808080' : '#323235'}` } }}>{arrowup}</Typography>
              <Typography variant="p" sx={{ p: '5px', fontSize: '12px' }}>{handlelikedcount(item.likeCount)}</Typography>
              <Typography onClick={() => { Disikepost(item._id) }} sx={{ display: 'flex', alignItems: 'center', color:`${dislikedCount.status==='success' ? 'blue' :'#000'}`, p: '5px', ":hover": { bgcolor: `${theme === 'light' ? '#808080' : '#323235'}` } }}>{arrowdown}</Typography>
            </Box>
            <Box sx={{ p:'10px',}}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', p: '5px 0' }}>
                {item.author.profileImage ? <img style={{ width: '1rem', borderRadius: '4px' }} class="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={item.author.profileImage} />
                  : <img style={{ width: '1rem', borderRadius: '4px' }} src="https://preview.redd.it/me-watching-a-random-drawing-i-made-get-turned-into-a-meme-v0-xib15dbut7tb1.png?width=640&crop=smart&auto=webp&s=218dbe01ffa9c145aa5fef90aec31a21b97ffbbe" />}
                <Typography onClick={() => router.push(`/User/${item.author._id}`)} variant="p" sx={{ fontSize: '14px', fontWeight: '700' }}>{item.author.name} &nbsp;.</Typography>
                <Typography variant="p" sx={{ fontSize: '10px' }}>{getTimeDifference(item.createdAt)}</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontSize: '22px', mb: '10px' }}>{item.content}</Typography>
              <img style={{ width: '100%', height: '400px' }} src={item.images[0]} srcset="" sizes="" alt=""></img>

              {/* -----------------commen share delete options------------------------ */}
              <Box display='flex' alignItems='center' gap='15px' sx={{ p: '10px 0', height: '50px', cursor:'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                  <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{comments}</Typography>
                  <Typography variant="h6" sx={{ p: '5px', fontSize: '12px' }}>{item.commentCount} Comments</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                  <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px' }}>{share}</Typography>
                  <Typography variant="p" sx={{ p: '5px', fontSize: '12px' }}>Share</Typography>
                </Box>

                {item.author.name === localStorage.getItem('name') && <Box position='relative'>
                 <Box sx={{ display: 'flex', alignItems: 'center', }}><MoreHoriz sx={{ color: `${theme === 'light' ? '#000' : '#fff'}` }} onClick={() => pop('delete')} /></Box>
                  {popup['delete'] && <Box sx={{ position: 'absolute',width:'200px',  p: '10px',backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, }}>
                    <Box onClick={() => { fetchDeletePost(item._id), fetchUpdatePost(item._id), pop('delete') }} sx={{p:'10px 0 10px 20px', textWrap:'nowrap', display: 'flex', alignItems: 'center', gap: '10px',":hover":{bgcolor:'rgba(174, 174, 241, 0.558)'} }}>
                    <VisibilityOff />
                    <Typography variant="contained" >Delete Post</Typography>
                    </Box>
                    <Box  onClick={() => { router.push(`/submit/${item._id}`), pop('delete') }} sx={{p:'10px 0 10px 20px', textWrap:'nowrap', display: 'flex', alignItems: 'center', gap: '10px',":hover":{bgcolor:'rgba(174, 174, 241, 0.558)'} }}>
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
        <Box sx={{ width: '100%', p: '10px', border: '1px solid red', borderRadius: '3px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Security sx={{ color: "orangered", fontSize: '28px' }} />
            <Box>
              <Typography variant="h6" sx={{ fontSize: '11px' }}>Reddit Premium</Typography>
              <Typography variant="h6" sx={{ fontSize: '11px' }}>The best Reddit experience</Typography>
            </Box>
          </Box>
          <Button variant='contained' sx={{ width: '100%', fontSize: '14px', textTransform: 'revert', mt: '5px', borderRadius: '20px', bgcolor: 'orangered', ":hover": { bgcolor: 'orangered' } }}>Try Now</Button>
        </Box>
        <Box sx={{ position: 'relative', pb: '20px', mt: '20px', width: '100%', borderRadius: '4px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
          <img style={{ width: '100%' }} src="/home-banner.png" />
          <Box sx={{ mt: '-16px', display: 'flex', alignItems: 'flex-end', gap: '15px', p: '0 10px' }}>
            <img style={{ width: '40px' }} src="/snoo.png" />
            <Typography> Home</Typography>
          </Box>
          <Box sx={{ width: '100%', textWrap: 'wrap', fontSize: '14px', p: '10px', borderBottom: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.107)' : 'rgba(224, 224, 247, 0.04)'}` }}>
            <Typography variant="" >Your personal Reddit frontpage. Come here to check in with your favorite communities.</Typography>
          </Box>
          <Box sx={{ display: 'flex', pt: '20px', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Button onClick={() => router.push(`/submit/newpost`)} variant='contained' sx={{ width: '90%', p: '3px', fontSize: '14px', textTransform: 'revert', borderRadius: '20px', color: `${theme === 'light' ? '#fff' : '#000'}`, bgcolor: `${theme === 'light' ? 'rgb(70, 70, 218)' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? 'rgb(70, 70, 218)' : '#fff'}` } }}>Create Post</Button>
            <Button onClick={() => pop('createcommunity')} variant='outlined' sx={{ width: '90%', p: '3px', fontSize: '14px', fontWeight: '700', textTransform: 'revert', color: `${theme === 'light' ? 'blue' : '#fff'}`, borderRadius: '20px', border: `1px solid ${theme === 'light' ? 'blue' : '#fff'}`, outline: 'none', ":hover": { border: `1px solid ${theme === 'light' ? 'blue' : '#fff'}` } }}>Create Community</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
