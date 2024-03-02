import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { apicontext } from '../(Context)/Apicontextprovider'
import { context } from '../(Context)/ContextProvider'
import { arrowdown, arrowdowncliked, arrowup, arrowupclicked } from '../(Constants)/Asset'

export default function LikeDislike({item}) {
  const { theme, } = useContext(context)
  const { Likepost, Dislikepost, liketoggle, disliketoggle, } = useContext(apicontext)

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: `${item.likeCount === item.likeCount+1 ? '#d93a00' : disliketoggle && '#6a5cff'}`, p: '5px', borderRadius: '50px' }}>
                <Typography className="c" onClick={() => { Likepost(item._id) }} sx={{ display: 'flex', alignItems: 'center', p: '5px', color: `${liketoggle ? 'white' : theme === 'light' ? '#000' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#808080' : '#323235'}`, borderRadius: '50px' } }}>{!liketoggle ? arrowup : arrowupclicked}</Typography>
                <Typography variant="p" sx={{ p: '5px', fontSize: '12px', fontWeight: '700', color: `${liketoggle ? '#fff' : disliketoggle && '#fff'}` }}>{item.likeCount}</Typography>
                <Typography className="c" onClick={() => { Dislikepost(item._id) }} sx={{ display: 'flex', alignItems: 'center', color: `${disliketoggle ? 'white' : theme === 'light' ? '#000' : '#fff'}`, p: '5px', ":hover": { bgcolor: `${theme === 'light' ? '#808080' : '#323235'}`, borderRadius: '50px' } }}>{!disliketoggle ? arrowdown : arrowdowncliked}</Typography>
            </Box>
        </div>
    )
}
