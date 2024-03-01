import { LocalFireDepartment, NewReleasesTwoTone, Publish, Rocket } from '@mui/icons-material'
import { MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { context } from '../(Context)/ContextProvider'
import { apicontext } from '../(Context)/Apicontextprovider'

export default function FilterandCreatePost() {
  const { theme, router} = useContext(context)
  const {  isSwitchOn, sort, sortval, setsortval} = useContext(apicontext)

  function sortingcriteria (val){
    if(val === sortval){
      setsortval("")
    }else{
      setsortval(val)
    }
  }

  return (
    <div>
      <Box width='100%' sx={{ display: 'flex', m: '20px 0', borderRadius: '3px', backgroundColor: `${theme === 'light' ? '#fff' : '#091113'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
        <MenuItem >
          <img style={{ position: 'relative', left: '-5px', width: '35px', borderRadius: '50px' }} src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" alt="User Avatar" className="max-w-full"></img>
          {isSwitchOn && <Box sx={{ position: 'absolute', left: '37px', top: '30px', width: '10px', height: '10px', bgcolor: '#55bd46', borderRadius: '100%' }}></Box>}
        </MenuItem>
        <Typography className="c" onClick={() => router.push('/submit/newpost')} variant="h6" sx={{ width: '70%', p: '7px', m: '7px', borderRadius: '5px', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}`, fontSize: '14px', color: '#808080', ":hover": { border: `${theme === 'light' ? '1px solid blue' : '1px solid white'}`, boxSizing: 'border-box' } }}>Create Post</Typography>
      </Box>
      <Box width='100%' sx={{ p: '10px', m: '20px 0', borderRadius: '3px', backgroundColor: `${theme === 'light' ? '#fff' : '#091113'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}` }}>
        <Box sx={{ width: '100%', borderRadius: '0', display: 'flex' }}>
          <Box onClick={() => sortingcriteria('best')} className={`c ${sortval === 'best' && 'activeclass'}`} sx={{ color: `${theme === 'dark' && '#fff'}`, p: '0 10px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
            <Rocket color='#808080' />
            <Typography variant="h5" sx={{ fontSize: '13px', fontWeight: '700', textAlign: 'center' }}>Best</Typography>
          </Box>
          <Box onClick={() => sortingcriteria('hot')} className={`c ${sortval === 'hot' && 'activeclass'}`} sx={{ color: `${theme === 'dark' && '#fff'}`, p: '0 10px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
            <LocalFireDepartment color='#808080' />
            <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: '700', textAlign: 'center', p: '5px 0' }}>Hot</Typography>
          </Box>
          <Box onClick={() => sortingcriteria('new')} className={`c ${sortval === 'new' && 'activeclass'}`} sx={{ color: `${theme === 'dark' && '#fff'}`, p: '0 10px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
            <NewReleasesTwoTone color='#808080' />
            <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: '700', textAlign: 'center', p: '5px 0' }}>New</Typography>
          </Box>
          <Box onClick={() => sortingcriteria('top')} className={`c ${sortval === 'top' && 'activeclass'}`} sx={{ color: `${theme === 'dark' && '#fff'}`, p: '0 10px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
            <Publish color='#808080' />
            <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: '700', textAlign: 'center', p: '5px 0' }}>Top</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
