'use client'
import { IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { arrowdown, arrowup, comments, communitydropdown, home, popular, share } from "../(Components)/(Constants)/Asset";
import { context } from "../(Components)/(Context)/ContextProvider";
import { useRouter } from "next/navigation";
import { apicontext } from "../(Components)/(Context)/Apicontextprovider";
import SideNavbar from "../(Components)/(SmallComponents)/SideNavbar";
import PopularCommunities from "../(Components)/(SmallComponents)/PopularCommunities";


export default function page() {
  const [post, setpost] = useState([])
  const { token, theme, pop, popup, activeTabs, handleTabs, setloginpop } = useContext(context)
  const { channel, getTimeDifference, recentChannels } = useContext(apicontext)
  const router = useRouter()


  const fetchPosts = async () => {
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/reddit/post?limit=100', {
        method: 'GET',
        headers: {
          'ProjectID': 'hlahmd78akto',
          "Content-Type": "application/json",
        }
      })
      const result = await response.json();
      setpost(result.data)
      console.log(result)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()
    if (token) {
      router.push('/Popular')
    } else {
      router.push('/PopularHome')
    }
  }, [])

  return (
    <Box sx={{ height: '100vh', width: '100vw', overflowY: 'scroll', display: 'flex', justifyContent: 'space-beween', gap: '20px', mb: '50px' }}>
      <Box className='sidenavBar' sx={{ position: 'sticky', top: '0px', overflowY: 'scroll', width: '280px', p: '20px 5px 20px 15px', height: '100vh', borderRight: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.104)'}`, }}>

        {/* -----------------SideNavbar----------------- */}
        <SideNavbar />
        {/* -----------------SideNavbar----------------- */}

      </Box>

      <Box sx={{ width: { xs: '100%', md: '48%' }, }}>
        <Box width='100%' height='50px' sx={{ p: '10px', mb: '5px', borderBottom: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.104)'}`, }}>
        </Box>
        {post && post.map((item, index) => item.likeCount >= 10 && (
          <Box key={index} sx={{ width: { xs: '100vw', md: '100%' }, p: '10px', borderBottom: '1px solid #2c2b2b15', borderRadius: '15px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', p: '5px 0' }}>
              {item.author.profileImage ? <img style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50px' }} src={item.author.profileImage} srcSet="" sizes="" alt="Icon for r/"></img>
                : <img style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50px' }} src='https://preview.redd.it/me-watching-a-random-drawing-i-made-get-turned-into-a-meme-v0-xib15dbut7tb1.png?width=640&crop=smart&auto=webp&s=218dbe01ffa9c145aa5fef90aec31a21b97ffbbe' srcSet="" sizes="" alt="Icon for r/"></img>}
              <Typography variant="p" sx={{ fontSize: '14px', fontWeight: '700' }}>{item.author.name} &nbsp;.</Typography>
              <Typography variant="p" sx={{ fontSize: '10px' }}>{getTimeDifference(item.createdAt)}</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontSize: '18px', mb: '10px', overflowX: 'hidden', textWrap: 'noWrap', textOverflow: 'ellipsis' }}>{item.content}</Typography>
            <img style={{ borderRadius: '15px', width: '100%', height: '400px' }} src={item.images[0]} srcSet="" sizes="" alt=""></img>
            <Box display='flex' alignItems='center' gap='10px' sx={{ p: '10px 0', height: '50px' }}>
              <Box sx={{ p: '5px 0', display: 'flex', alignItems: 'center', borderRadius: '50px', bgcolor: 'rgba(236, 232, 232, 0.734)' }}>
                <Typography onClick={() => setloginpop(true)} sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{arrowup}</Typography>
                <Typography variant="p" sx={{ p: '5px', fontSize: '12px' }}>{item.likeCount}</Typography>
                <Typography onClick={() => setloginpop(true)} sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{arrowdown}</Typography>
              </Box>
              <Box onClick={() => setloginpop(true)} sx={{ display: 'flex', alignItems: 'center', borderRadius: '50px', bgcolor: 'rgba(236, 232, 232, 0.734)' }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{comments}</Typography>
                <Typography variant="p" sx={{ p: '5px', fontSize: '12px' }}>{item.commentCount}</Typography>
              </Box>
              <Box onClick={() => setloginpop(true)} sx={{ display: 'flex', alignItems: 'center', borderRadius: '50px', bgcolor: 'rgba(236, 232, 232, 0.734)' }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{share}</Typography>
                <Typography variant="p" sx={{ p: '5px', fontSize: '12px' }}>Share</Typography>
              </Box>
            </Box>
          </Box>))}
      </Box>

      {/* -----------------PopularCommunities----------------- */}

      <Box className='seemorecommunities' sx={{ display: { xs: 'none', md: 'block' }, position: 'sticky', top: '20px', width: '25%', mt: '20px', height: `${popup['seemorecommunities'] ? '70vh' : '480px'}`, overflowY: 'scroll', p: '20px', backgroundColor: `${theme === 'light' ? '#dae0e62a' : '#000'}`, borderRadius: '10px', }}>
        <PopularCommunities />
      </Box>

      {/* -----------------PopularCommunities----------------- */}


    </Box>
  )
}
