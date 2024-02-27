import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { context } from '../(Context)/ContextProvider'
import { apicontext } from '../(Context)/Apicontextprovider'

export default function PopularCommunities() {
    const { theme, setloginpop, popup, } = useContext(context)
  const { channel, getTimeDifference, } = useContext(apicontext)

  return (
    <div>
        <Typography sx={{ mb: '20px', textTransform: 'uppercase', color: '#576f76', fontSize: '14px' }}>Popular Communities</Typography>
        <Box sx={{ height: `${popup['seemorecommunities'] ? 'auto' : '350px'}`, overflow: 'hidden', backgroundColor: '#fff' }}>
          {channel && channel.map((item, index) => (<Box key={index} onClick={() => setloginpop(true)} sx={{ p: '10px', display: 'flex', gap: '10px', borderRadius: '5px', alignItems: 'center', ":hover": { bgcolor: '#dae0e691' } }}>
            {item.image ? <img style={{ width: '30px', borderRadius: '100%' }} src={item.image} />
              : <Box variant='h6' sx={{ width:'30px', height:'30px',textTransform: 'uppercase',borderRadius: '100%', backgroundColor: '#808080', display:'flex', alignItems:'center', justifyContent:'center' }}><Typography  fontWeight='700'>{item.name.charAt(0)}</Typography></Box>}
            <Box>
              <Typography variant="h5" sx={{ fontSize: '16px', color: `${theme === 'light' ? '#000' : '#fff'}` }}>{item.name}</Typography>
              <Typography sx={{ fontSize: '12px', color: `${theme === 'light' ? '#808080' : '#fff'}` }}>{getTimeDifference(item.createdAt)}</Typography>
            </Box>
          </Box>))}
        </Box>
        <Box sx={{ width: 'fit-content', p: '10px', mt: '10px', borderRadius: '20px', display: 'flex', alignItems: 'center', ":hover": { bgcolor: '#dae0e691' } }}><Typography variant="h6" sx={{ fontSize: '14px' }} onClick={() => pop('seemorecommunities')}>{popup['seemorecommunities'] ? 'See less' : 'See more'}</Typography></Box>
    </div>
  )
}
