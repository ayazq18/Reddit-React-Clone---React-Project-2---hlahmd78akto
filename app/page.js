'use client'
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { arrowdown, arrowup, comments, share } from "./(Components)/(Constants)/Asset";
import { context } from "./(Components)/(Context)/ContextProvider";
import { useRouter } from "next/navigation";
import { apicontext } from "./(Components)/(Apicontext)/Apicontextprovider";


export default function Home() {
  const [post, setpost] = useState([])
  const { token, theme, pop, popup } = useContext(context)
  const { channel } = useContext(apicontext)
  const router = useRouter()

  const getTimeDifference = (createdAt) => {
    const currentDate = new Date();
    const postDate = new Date(createdAt);
    const timeDifference = currentDate.getTime() - postDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      if (days === 1) {
        return "1 day ago";
      } else {
        return `${days} days ago`;
      }
    } else if (hours > 0) {
      if (hours === 1) {
        return "1 hour ago";
      } else {
        return `${hours} hours ago`;
      }
    } else if (minutes > 0) {
      if (minutes === 1) {
        return "1 minute ago";
      } else {
        return `${minutes} minutes ago`;
      }
    } else {
      return "Just now";
    }
  };


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
      router.push('/Home')
    } else {
      router.push('/')
    }
  }, [])

  return (
    <Box sx={{ height: '100vh', width: '100vw', overflowY: 'scroll', display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
      <Box sx={{ width: { xs: '100%', md: '50%' }, }}>
        <Box width='100%' height='50px' sx={{ p: '10px', mb: '5px', borderBottom: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.104)'}`, }}>
          {/* <Box title="Open sort options"
            onClick={() => popup('select')}
            sx={{ position: 'relative', width: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', p: '5px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)', borderRadius: '50px' } }}>
            <Typography sx={{ fontSize: '12px' }}>{sort}</Typography>
            <ArrowDropDown fontSize="12px" />
            {pop['select'] && <Paper sx={{ width: '80px', position: 'absolute', top: '40px', borderRadius: '0' }}>
              <Typography variant="h6" sx={{ fontSize: '14px', textAlign: 'center', p: '10px 0' }}>Sort by</Typography>
              <Typography onClick={() => handleselect('Best')} className={sort === 'Best' && 'activeclass'} variant="h6" sx={{ fontSize: '13px', fontWeight: '400', textAlign: 'center', p: '10px 0', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>Best</Typography>
              <Typography onClick={() => handleselect('Hot')} className={sort === 'Hot' && 'activeclass'} variant="h6" sx={{ fontSize: '13px', fontWeight: '400', textAlign: 'center', p: '10px 0', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>Hot</Typography>
              <Typography onClick={() => handleselect('New')} className={sort === 'New' && 'activeclass'} variant="h6" sx={{ fontSize: '13px', fontWeight: '400', textAlign: 'center', p: '10px 0', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>New</Typography>
              <Typography onClick={() => handleselect('Top')} className={sort === 'Top' && 'activeclass'} variant="h6" sx={{ fontSize: '13px', fontWeight: '400', textAlign: 'center', p: '10px 0', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>Top</Typography>
            </Paper>}
          </Box> */}
        </Box>
        {post && post.map((item, index) => (
          <Box sx={{ width: { xs: '100%', md: '100%' }, p: '20px', borderBottom: '1px solid #2c2b2b15', borderRadius: '15px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', p: '5px 0' }}>
              {item.author.profileImage ? <img style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50px' }} src={item.author.profileImage} srcSet="" sizes="" alt="Icon for r/"></img>
                : <img style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50px' }} src='https://preview.redd.it/me-watching-a-random-drawing-i-made-get-turned-into-a-meme-v0-xib15dbut7tb1.png?width=640&crop=smart&auto=webp&s=218dbe01ffa9c145aa5fef90aec31a21b97ffbbe' srcSet="" sizes="" alt="Icon for r/"></img>}

              <Typography variant="p" sx={{ fontSize: '14px', fontWeight: '700' }}>{item.author.name} &nbsp;.</Typography>
              <Typography variant="p" sx={{ fontSize: '10px' }}>{getTimeDifference(item.createdAt)}</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontSize: '22px', mb: '10px', overflowX: 'hidden', textWrap: 'noWrap', textOverflow: 'ellipsis' }}>{item.content}</Typography>
            <img style={{ borderRadius: '15px', width: '100%', height: '400px' }} src={item.images[0]} srcSet="" sizes="" alt=""></img>
            <Box display='flex' alignItems='center' gap='10px' sx={{ p: '10px 0', height: '50px' }}>
              <Box sx={{ p: '5px 0', display: 'flex', alignItems: 'center', borderRadius: '50px', bgcolor: 'rgba(236, 232, 232, 0.734)' }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{arrowup}</Typography>
                <Typography variant="p" sx={{ p: '5px', fontSize: '12px' }}>{item.likeCount - item.dislikeCount}</Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{arrowdown}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '50px', bgcolor: 'rgba(236, 232, 232, 0.734)' }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{comments}</Typography>
                <Typography variant="p" sx={{ p: '5px', fontSize: '12px' }}>{item.commentCount}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '50px', bgcolor: 'rgba(236, 232, 232, 0.734)' }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{share}</Typography>
                <Typography variant="p" sx={{ p: '5px', fontSize: '12px' }}>Share</Typography>
              </Box>
            </Box>
          </Box>))}
      </Box>

      <Box className='seemorecommunities' sx={{ display: { xs: 'none', md: 'block' }, width: '25%', mt: '20px', height: `${popup['seemorecommunities'] ? '100vh' : '480px'}`, overflowY:'scroll', p: '20px', backgroundColor: `${theme === 'light' ? '#dae0e64f' : '#000'}`, borderRadius: '10px', }}>
        <Typography sx={{ mb: '20px', textTransform: 'uppercase', color: '#576f76', fontSize: '14px' }}>Popular Communities</Typography>
        <Box sx={{ height: `${popup['seemorecommunities'] ? 'auto' : '350px'}`, overflow: 'hidden', bgColor: '#fff' }}>
          {channel && channel.map((item, index) => (<Box key={index} sx={{ p: '10px', display: 'flex', gap: '10px', borderRadius: '5px', alignItems: 'center', ":hover": { bgcolor: '#dae0e691' } }}>
            {item.image ? <img style={{ width: '30px', borderRadius: '4px' }} class="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={item.image} />
              : <img style={{ width: '30px', borderRadius: '4px' }} src="https://preview.redd.it/me-watching-a-random-drawing-i-made-get-turned-into-a-meme-v0-xib15dbut7tb1.png?width=640&crop=smart&auto=webp&s=218dbe01ffa9c145aa5fef90aec31a21b97ffbbe" />}
            <Box>
              <Typography variant="h5" sx={{ fontSize: '16px', color: `${theme === 'light' ? '#000' : '#fff'}` }}>{item.name}</Typography>
              <Typography sx={{ fontSize: '12px', color: `${theme === 'light' ? '#808080' : '#fff'}` }}>25222 members</Typography>
            </Box>
          </Box>))}
        </Box>
        <Box sx={{width:'fit-content', p:'10px', mt:'10px', borderRadius:'20px', display:'flex', alignItems:'center', ":hover":{ bgcolor: '#dae0e691' }}}><Typography variant="h6" sx={{fontSize:'14px'}} onClick={() => pop('seemorecommunities')}>{popup['seemorecommunities'] ? 'See less' : 'See more'}</Typography></Box>
      </Box>
    </Box>
  )
}
