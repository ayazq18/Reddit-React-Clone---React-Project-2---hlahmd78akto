'use client'
import { Box, } from '@mui/system'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { context } from '../../(Components)/(Context)/ContextProvider'
import { apicontext } from '../../(Components)/(Apicontext)/Apicontextprovider'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material'
import { communitydropdown, postingIcon, } from '../../(Components)/(Constants)/Asset';
import { Link, Search, } from '@mui/icons-material'
import Community from '../../(Components)/(Community)/Community'
import { postinginstruction, markdown } from '../../(Components)/(Constants)/Asset';

export default function CreatePost(props) {
  const { activepostTabs, postingTabs, pop, popup, token, theme, activeTabs, } = useContext(context)
  const { title, settitle, description, setdescription, setpostimage, fetchCreatePost } = useContext(apicontext)
  const [dropnav, setdropnav] = useState(false)

  const handleToggleDropdown = () => {
    setdropnav(!dropnav);
  };


  const handleCreatpost = () => {
    fetchCreatePost();

  }

  // const handlefilechange = (e) => {
  //   setpostimage(e.target.files[0]);
  // };

  const fetchEditPosts = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${props.params.NewPost}`, {
        method: 'GET',
        headers: {
          'ProjectID': 'hlahmd78akto',
          "Content-Type": "application/json",
        }
      })
      const result = await response.json();
      settitle(result.data.title)
      setdescription(result.data.content)
      setpostimage(result.data.images[0])
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (props.params.NewPost !== 'newpost') {
      fetchEditPosts()
    } else {
      settitle('')
      setdescription('')
      setpostimage('')
    }
  }, [])

  return (
    <Box sx={{ height: '100vh', width: '100vw', p: '20px 0 0 0', backgroundColor: `${theme === 'light' ? '#DAE0E6' : '#000'}`, overflowY: 'scroll', display: 'flex', justifyContent: 'center', gap: '10px' }}>
      {popup['createcommunity'] && <Box sx={{ overflowY: 'scroll', position: 'absolute', top: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', zIndex: '8', bgcolor: 'rgba(24, 23, 23, 0.923)' }}>
        <Box sx={{ zIndex: '9' }}><Community pop={pop} /></Box>
      </Box>}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', boxSizing: 'border-box', width: { xs: '100%', md: '55%', } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', p: '10px', borderRadius: '3px', borderBottom: `1px solid ${theme === 'light' ? '#fff' : '#1a1a1b'}`, }}>
          <Typography variant='h4' sx={{ fontSize: '16px' }}>Create a post</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', p: '5px 10px', borderRadius: '20px', ":hover": { backgroundColor: 'rgba(51, 51, 245, 0.24)' } }}>
            <Typography variant='h5' sx={{ fontSize: '12px', fontWeight: '700', color: `${theme === 'light' ? 'rgb(51, 51, 245)' : '#fff'}`, borderRadius: '20px', letterSpacing: '1.5px' }}>DRAFTS</Typography>
            <Typography sx={{ fontSize: '12px', backgroundColor: `${theme === 'light' ? '#808080' : '#DAE0E6'}`, color: `${theme === 'light' ? '#fff' : '#000'}`, borderRadius: '2px', p: '1px 3px 0px 3px', }}>0</Typography>
          </Box>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ borderRadius: '3px', width: '280px', p: '5px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
            <Box onClick={() => handleToggleDropdown()} sx={{ p: '5px', width: '100%', }}>
              <Box sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', boxSizing: 'border-box' }}>
                  {dropnav ? <Search sx={{ color: '#808080' }} />
                    : <Box sx={{ width: '20px', height: '20px', boxSizing: 'border-box', border: '1px dashed #808080', borderRadius: '20px' }}></Box>}
                  <Typography variant='p' sx={{ fontSize: '14px', display: { xs: 'none', md: 'block' } }}>{activeTabs === 'Home' ? 'Choose a community' : 'Popular'}</Typography>
                </Box>
                <Typography sx={{ display: 'flex', alignItems: 'center', transform: `${dropnav && 'rotate(180deg)'}`, transition: 'all .5s ease' }}>{communitydropdown}</Typography>
              </Box>
            </Box>
          </Box>
          {dropnav && <Box position='absolute' zIndex='9' backgroundColor={`${theme === 'light' ? '#fff' : '#1a1a1b'}`}>
            <Box sx={{ overflowY: 'scroll', width: '280px', p: '20px 5px 20px 15px', borderRight: `${!token && '1px solid rgba(236, 232, 232, 0.134)'}` }}>
              <Box sx={{ borderBottom: '1px solid rgba(236, 232, 232, 0.134)', mb: '10px' }}>
                <Typography variant='h6' sx={{ fontSize: '10px', color: '#808080', textTransform: 'uppercase' }}>Your Profile</Typography>
                <Box sx={{ width: '100%', p: '10px 0', display: 'flex', alignItems: 'center', borderBottom: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
                  <img className='profilelogo' style={{ borderRadius: '3px', position: 'relative', left: '-5px', width: '33px', }} src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" alt="User Avatar" class="max-w-full"></img>
                  <Typography variant='h6' sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, fontSize: '12px' }}>{localStorage.getItem('name')}</Typography>
                </Box>
              </Box>
              <Box sx={{ borderBottom: '1px solid lightgray' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                  <Box sx={{ width: '100%', p: '10px 10px 10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h6' sx={{ color: `${theme === 'light' ? '#808080' : '#fff'}`, fontSize: '10px' }}>YOUR COMMUNITIES</Typography>
                    <Typography onClick={() => pop('createcommunity')} variant='h5' sx={{ fontSize: '12px', fontWeight: '700', color: `${theme === 'light' ? 'rgb(51, 51, 245)' : '#fff'}`, borderRadius: '20px', p: '5px 10px', ":hover": { backgroundColor: 'rgba(51, 51, 245, 0.24)' } }}>Create New</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', height: '50px' }}>
                    <img alt="Subreddit Icon" role="presentation" src="https://www.redditstatic.com/desktop2x/img/avatar_over18.png" class="_34CfAAowTqdbNDYXz5tBTW jpIFeDw811_DQwlQEqBjm " style={{ backgroundColor: "rgb(0, 121, 211)", width: '35px', borderRadius: '50px' }} />
                    <Box>
                      <Typography variant='h5' sx={{ fontSize: '14px', color: `${theme === 'light' ? '#000' : '#fff'}`, }}>r/abs_18</Typography>
                      <Typography variant='h5' sx={{ fontSize: '12px', color: `${theme === 'light' ? '#808080' : '#fff'}`, }}>1 member</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>


            </Box>
          </Box>}
        </Box>



        <Paper sx={{ pb: '50px', width: '100%', height: 'auto', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, boxSizing: 'border-box', border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', borderBottom: `1px solid ${theme === 'light' ? 'rgba(236, 232, 232, 0.534)' : 'rgba(224, 224, 247, 0.54)'}` }}>
            {postingTabs.map((item, index) => (
              <Box key={item.name} className={`${activepostTabs === item.name && (theme === 'light' ? 'activelightposttab' : 'activedarkposttabs')}`} onClick={() => { item.handler(item.name), pop('item') }} sx={{ boxSizing: 'border-box', borderRight: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.04)'}`, color: '#808080', width: '210px', display: 'flex', alignItems: 'center', justifyContent: 'center', p: '10px 30px' }}><Typography>{item.icon}</Typography><Typography variant='h6' sx={{ fontSize: '13px', fontWeight: '700' }}>{item.name}</Typography></Box>
            ))}
            {/* <Box className={activepostTabs === 'ImageLinkPoll' && 'activeposttab'} onClick={()=>handlepostTabs('ImageLinkPoll')} sx={{boxSizing: 'border-box' ,borderRight: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.04)'}`,color:'#808080',width:'200px',display:'flex', alignItems:'center', justifyContent:'center', p:'10px 30px'}}><Typography><Image/></Typography><Typography variant='h6' sx={{fontSize:'13px', fontWeight:'700', textWrap:'nowrap'}}>Image & Video</Typography></Box>
            <Box className={activepostTabs === 'LinkPoll' && 'activeposttab'} onClick={()=>handlepostTabs('LinkPoll')} sx={{boxSizing: 'border-box' ,borderRight: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.04)'}`,color:'#808080',width:'200px',display:'flex', alignItems:'center', justifyContent:'center', p:'10px 30px'}}><Typography><Link/></Typography><Typography variant='h6' sx={{fontSize:'13px', fontWeight:'700'}}>Link</Typography></Box>
            <Box className={activepostTabs === 'Poll' && 'activeposttab'} onClick={()=>handlepostTabs('Poll')} sx={{boxSizing: 'border-box',color:'#808080',width:'200px',display:'flex', alignItems:'center', justifyContent:'center', p:'10px 30px'}}><Typography><Poll/></Typography><Typography variant='h6' sx={{fontSize:'13px', fontWeight:'700'}}>Poll</Typography></Box> */}
          </Box>


          <Box className='postinginput' sx={{ m: '10px', border: `1px solid ${theme === 'light' ? 'rgba(236, 232, 232, 0.534)' : 'rgba(224, 224, 247, 0.14)'}`, color: `${theme === 'light' ? '#808080' : '#fff'}` }}>
            <FormControl sx={{ width: '100%', }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" sx={{ width: '100%', color: '#808080' }}>Title</InputLabel>
              <OutlinedInput
                type="text"
                value={title}
                sx={{ color: `${theme === 'light' ? '#808080' : '#fff'}` }}
                onChange={(e) => settitle(e.target.value)}
                endAdornment={
                  <InputAdornment position="end" >
                    <IconButton
                      aria-label="toggle password visibility"
                    >
                      <Typography variant='h6' sx={{ fontSize: '12px', color: `${theme === 'light' ? '#000' : '#808080'}`, }}>0/300</Typography>
                    </IconButton>
                  </InputAdornment>
                }
                label="Title"
              />
            </FormControl>
          </Box>
          {!popup['item'] ?
            (<Box sx={{ m: '10px', }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: `${theme === 'light' ? '#000' : '#808080'}`, width: '100%', p: '5px 15px', borderRadius: '2px 2px 0 0', border: `1px solid ${theme === 'light' ? 'rgba(236, 232, 232, 0.534)' : 'rgba(224, 224, 247, 0.14)'}`, backgroundColor: `${theme === 'light' ? '#e9ecf08c' : '#1a1a1b'}` }}>
                {!popup['markdown'] ? (<Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', }}>
                  <Typography sx={{ fontSize: '20px', p: '5px 10px', borderRadius: '5px', width: '30px', textAlign: 'center', fontWeight: '700', ":hover": { bgcolor: `${theme === 'light' ? '#c2c8d19c' : '#c2c8d13f'}` } }}>B</Typography>
                  <Typography sx={{ fontSize: '20px', p: '5px 10px', borderRadius: '5px', width: '30px', textAlign: 'center', fontWeight: '700', fontStyle: 'italic', ":hover": { bgcolor: `${theme === 'light' ? '#c2c8d19c' : '#c2c8d13f'}` } }}>i</Typography>
                  <Typography sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', p: '5px 20px', borderRadius: '5px', width: '30px', textAlign: 'center', fontWeight: '700', fontStyle: 'italic', ":hover": { bgcolor: `${theme === 'light' ? '#c2c8d19c' : '#c2c8d13f'}` } }}><Link /></Typography>
                </Box>) :
                  (<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', p: '5px 10px', }}><Typography variant='h6' sx={{ fontSize: '16px' }}>Markdown</Typography><Typography sx={{ width: '15px', display: 'flex', alignItems: 'center' }}>{markdown}</Typography></Box>)
                }
                <Box onClick={() => pop('markdown')} sx={{ p: '5px 30px ', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '30px', color: `${theme === 'light' ? 'rgba(51, 51, 245, .8)' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#c2c8d19c' : '#c2c8d13f'}` } }}>
                  {!popup['markdown'] ? <Typography sx={{ fontSize: '14px', textAlign: 'center', fontWeight: '700' }}>Markdown Mode</Typography>
                    :
                    <Typography sx={{ fontSize: '14px', textAlign: 'center', fontWeight: '700' }}>Switch to Fancy Pants Editor</Typography>}
                </Box>
              </Box>
              <textarea value={description} onChange={(e) => setdescription(e.target.value)} style={{ backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `1px solid ${theme === 'light' ? 'rgba(236, 232, 232, 0.534)' : 'rgba(224, 224, 247, 0.14)'}`, color: `${theme === 'light' ? '#000' : '#fff'}`, padding: '10px', maxWidth: '100%', minWidth: '100%', minHeight: '150px', borderRadius: '2px', }} placeholder="Text (Optional)" />
            </Box>)
            : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', m: '10px', height: '200px', padding: '10px', borderRadius: '2px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `1px solid ${theme === 'light' ? 'rgba(236, 232, 232, 0.834)' : 'rgba(224, 224, 247, 0.14)'}`, color: `${theme === 'light' ? '#000' : '#fff'}` }}>
              <Typography sx={{ color: `${theme === 'light' ? '#000' : '#808080'}`, fontSize: '18px' }}>Drag and drop image or</Typography>
              <input style={{ padding: '10px', backgroungColor: 'blue' }} type="file" onChange={(e) => setpostimage(e.target.files[0])} />
            </Box>
          }
          <Box display='flex' justifyContent='flex-end' gap='10px' sx={{ m: '10px', p: '30px', border: `1px solid ${theme === 'light' ? 'rgba(236, 232, 232, 0.534)' : 'rgba(224, 224, 247, 0.14)'}`, }}>
          </Box>
          <Box display='flex' justifyContent='flex-end' gap='10px' sx={{ m: '10px' }}>
            <Button variant='outlined' disabled={description.trim() == ''} sx={{ borderRadius: '50px' }}>Save Draft</Button>
            <Button variant='contained' disabled={description.trim() == ''} onClick={() => handleCreatpost()} sx={{ borderRadius: '50px' }}>Post</Button>
          </Box>
          <Box display='flex' gap='10px' sx={{ mb: '30px', p: '30px', color: `${theme === 'light' ? 'rgba(51, 51, 245, .8)' : '#fff'}`, border: `1px solid ${theme === 'light' ? 'rgba(236, 232, 232, 0.534)' : 'rgba(224, 224, 247, 0.14)'}`, backgroundColor: `${theme === 'light' ? '#e9ecf08c' : '#1a1a1b'}` }}>
            <input
              margin="normal"
              required
              type='checkbox'
              id='radio'
              name='radio'
              autoFocus
            />
            <Typography variant='h6' sx={{ fontSize: '14px' }}>Send me post reply notifications</Typography>
          </Box>



        </Paper>





      </Box>




      <Box sx={{ width: '25%', p: '19px 10px', height: '100vh', display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ position: 'relative', p: '20px 10px', mt: '20px', width: '100%', borderRadius: '4px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
          <Box display='flex' alignItems='center' gap='10px' sx={{ borderBottom: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.04)'}` }}>
            <Typography sx={{ width: '40px' }}>{postingIcon}</Typography>
            <Typography variant='h6' sx={{ fontSize: '16px', color: `${theme === 'light' ? '#000' : '#fff'}` }}>Posting to Reddit</Typography>
          </Box>
          {postinginstruction.map((item, index) => (
            <Box display='flex' alignItems='center' gap='2px' sx={{ p: '7px', borderBottom: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.04)'}` }}>
              <Typography variant='h6' sx={{ fontSize: '14px', }}>{item.index}.</Typography>
              <Typography variant='h6' sx={{ fontSize: '14px', color: `${theme === 'light' ? '#000' : '#fff'}` }}>{item.instruction}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: '20px', width: '75%', textWrap: 'wrap', fontSize: '12px', color: `${theme === 'light' ? '#000' : '#fff'}` }}>
          <Typography variant='p'>Please be mindful of reddit's content policy and practice good reddiquette.</Typography>
        </Box>
      </Box>
    </Box>
  )
}
