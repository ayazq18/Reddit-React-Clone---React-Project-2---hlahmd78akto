'use client'
import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Close, FilterVintage, LocalFireDepartment, NewReleasesTwoTone, Publish, Rocket, } from "@mui/icons-material";
import { arrowdown, arrowup, comments, followedicon, google, share } from "../../(Components)/(Constants)/Asset";
import { context } from "../../(Components)/(Context)/ContextProvider";
import { apicontext } from "../../(Components)/(Context)/Apicontextprovider";
import ParentComment from "@/app/(Components)/(ParentComment)/ParentComment";
import LikeDislike from "@/app/(Components)/(SmallComponents)/LikeDislike";

export default function Comments(props) {
    const { theme, pop, popup, router, userprofilename } = useContext(context)
    const { getTimeDifference, formatDate, followbtntxt, item, liketoggle, disliketoggle, fetchCommentsPosts, userdata, setpopfollowuser, toggleuserfollow, fetchUserProfile, toggle, postingComments, setpostingComments, usercommenttoggle, popfollowuser, handlefollowuser, postcomments, fetchPostComments, fetchPostingComments, } = useContext(apicontext)

    useEffect(() => {
        fetchUserProfile(props.params.Comments)
        fetchCommentsPosts(props.searchParams.PostId)
        fetchPostComments(props.searchParams.PostId)
    }, [usercommenttoggle, toggle, toggleuserfollow, liketoggle, disliketoggle])

    return (
        <>
            {item && userdata && <Box sx={{ width: '100vw', height: '100vw', backgroundColor: `${theme === 'light' ? '#DAE0E6' : '#000'}`, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '10px', flexDirection: { xs: 'column-Reverse', md: 'row' } }}>

                {/* ---------------Follow unfollow popup------------------ */}
                {popfollowuser && <Paper sx={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'absolute', top: '450px', width: '40%', height: '60px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, zIndex: '9' }}>
                    <Box display='flex' alignItems='center' justifyContent='center' borderRadius='5px 0 0 5px' bgcolor='red' height='100%' width='40px' color={`${theme === 'light' ? 'black' : '#fff'}`} sx={{ ":hover": { transform: 'scale(1.5)', borderRadius: '50px', transition: 'all 1s ease' } }} onClick={() => setpopfollowuser(false)}><Close /></Box>
                    {followbtntxt !== 'Follow' ? <Box display='flex' alignItems='center' gap='10px'><Typography sx={{ width: '30px' }}>{followedicon}</Typography><Typography variant="h5" sx={{ color: 'green', fontSize: '15px' }}>You Followed {userdata.name}</Typography></Box>
                        : <Box display='flex' alignItems='center' gap='10px'><Typography sx={{ width: '30px' }}>{followedicon}</Typography><Typography variant="h5" sx={{ color: 'red', fontSize: '15px' }}>You Unfollowed {userdata.name}</Typography></Box>}
                </Paper>}
                {/* ---------------Follow unfollow popup------------------ */}


                <Box sx={{ width: { xs: '100%', md: '50%', } }}>

                    {/* ---------------Post section------------------ */}

                    <Box sx={{ width: { xs: '100%', md: '100%' }, display: 'flex', gap: '5px', m: '20px 0', borderRadius: '3px', border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, ":hover": { border: `${theme === 'light' ? '1px solid #808080' : '1px solid white'}` } }}>
                        <Box sx={{width:'50px', p: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '3px 0 0 3px', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, boxSizing: 'border-box' }}>

                            {/* ---------------LikeDislike section------------------ */}
                            <LikeDislike item={item} />
                            {/* ---------------LikeDislike section------------------ */}

                        </Box>
                        <Box sx={{ width: '92%', }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', p: '5px 0' }}>
                                {item.author.profileImage ? <img style={{ width: '1rem', borderRadius: '4px' }} className="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={item.author.profileImage} />
                                    : <Typography variant='h6' sx={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', p: '2px 7px', borderRadius: '100%', backgroundColor: '#808080' }}>{item.author.name.charAt(0)}</Typography>}
                                <Typography onClick={() => router.push(`/User/${item.author._id}`)} variant="p" sx={{ fontSize: '14px', fontWeight:'700' }}>{item.author.name} &nbsp;.</Typography>
                                <Typography variant="p" sx={{ fontSize: '10px' }}>{getTimeDifference(item.createdAt)}</Typography>
                            </Box>
                            <Typography variant="h6" sx={{ fontSize: '18px', overflowWrap: 'break-word', wordWrap: 'break-word', mb: '10px'}}>{item.content}</Typography>
                            <img style={{ width: '100%', }} src={item.images} />
                            <Box display='flex' alignItems='center' gap='10px' sx={{ p: '10px 0', height: '50px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                                    <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{comments}</Typography>
                                    <Typography variant="h6" sx={{ p: '5px', fontSize: '12px' }}>{item.commentCount} Comments</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', ml: '10px' }}><Typography sx={{ fontSize: '12px' }}>Comment as</Typography><Typography sx={{ fontSize: '12px', fontWeight: '700', color: 'red' }}> {userprofilename}</Typography></Box>
                            <textarea value={postingComments} onChange={(e) => setpostingComments(e.target.value)} style={{ backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `1px solid ${theme === 'light' ? 'rgba(236, 232, 232, 0.534)' : 'rgba(224, 224, 247, 0.14)'}`, color: `${theme === 'light' ? '#000' : '#fff'}`, padding: '10px', maxWidth: '100%', minWidth: '98%', minHeight: '150px', borderRadius: '2px', }} placeholder="What are your thoughts?" />
                            <Box sx={{ width: '98%', backgroundColor: `${theme === 'light' ? 'rgba(190, 190, 245, 0.148)' : '#1a1a1b'}`, textAlign: 'end', p: '10px' }}>
                                <Button onClick={() => fetchPostingComments(props.searchParams.PostId)} disabled={postingComments == ''} variant='contained' sx={{ fontSize: '12px', borderRadius: '50px', bgcolor: 'rgb(240, 11, 49)', p: '5px 20px' }}>Comment</Button>
                            </Box>

                            {postcomments && postcomments.map((itemcomment, index) => (
                                <ParentComment itemcomment={itemcomment} index={index} />
                            ))}
                        </Box>
                    </Box>

                    {/* ---------------Post section------------------ */}

                </Box>


                {/* ---------------UserDetails sec------------------ */}

                {userdata && <Box sx={{ p: '19px 10px', height: '100%', width: { xs: '100%', md: '300px' } }}>
                    <Box sx={{ position: 'relative', pb: '20px', mt: '0px', width: { xs: '100%', md: '300px' }, height: `${popup['moreoptions'] ? 'fit-content' : '300px'}`, borderRadius: '4px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
                        <Box sx={{ position: 'relative', width: '100%', height: '100px', borderRadius: '4px 4px 0 0', bgcolor: '#33a8ff', }}>
                        </Box>
                        <Box sx={{ position: 'absolute', top: '40px', left: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', width: '80px', height: '80px', backgroundColor: `${theme === 'light' ? '#fff' : '#000'}` }}>
                            {userdata.profileImage && <img style={{ width: '70px', borderRadius: '4px' }} className="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={userdata.profileImage} />}
                            {userdata.profileImage === null && <Typography variant='h6' sx={{ fontSize: '50px', fontWeight: '700', textTransform: 'uppercase', p: '2px 7px', borderRadius: '100%', }}>{userdata.name.charAt(0)}</Typography>}
                        </Box>
                        <Typography sx={{ m: '25px 0px 10px 15px', fontSize: '12px' }}>{userdata.name}</Typography>
                        <Box sx={{ p: '0 15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{}}>
                                <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '500' }}>Karma</Typography>
                                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', }}>
                                    <FilterVintage sx={{ fontSize: '14px', color: 'orangered' }} />
                                    <Typography variant="p" sx={{ fontSize: '12px', color: '#808080' }}>{userdata.gender}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{}}>
                                <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '500' }}>Cake day</Typography>
                                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', }}>
                                    <FilterVintage sx={{ fontSize: '14px', color: 'orangered' }} />
                                    <Typography variant="p" sx={{ fontSize: '12px', color: '#808080' }}>{formatDate(userdata.createdAt)}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', mt: '10px', p: '15px', justifyContent: 'flex-start', alignItems: 'center', gap: '10px' }}>
                            {userprofilename !== userdata.name ?
                                <Button variant='contained' sx={{ width: '40%', p: '3px', fontSize: '14px', textTransform: 'revert', borderRadius: '20px', color: `${theme === 'light' ? '#fff' : '#000'}`, bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}` } }} onClick={() => { handlefollowuser(props.params.Comments)}}>{userdata.isFollowed === true ? 'Unfollow' : 'Follow'}</Button>
                                :
                                <Typography sx={{ width: '40%', p: '3px', fontSize: '14px', textTransform: 'uppercase', textAlign: 'center', color: `${theme === 'light' ? '#fff' : '#000'}`, bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}` } }}>My Profile</Typography>
                            }
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Typography onClick={() => pop('moreoptions')} variant="h5" sx={{ fontSize: '15px', fontWeight: '700', color: '#177ac5', textAlign: 'end', p: '0 40px', m: '15px 0 0 0' }}>{popup['moreoptions'] ? 'Fewer options' : 'More Options'}</Typography>
                        </Box>
                        {popup['moreoptions'] && <Box sx={{ p: '10px', width: '100%', }}>
                            <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '500' }}>Skills :</Typography>
                            {userdata.skills.map((item, index) => (<Typography variant="h6" sx={{ mb: '5px', fontSize: '14px', color: '#177ac5' }}>{item}</Typography>))}
                        </Box>}
                    </Box>
                </Box>}

                {/* ---------------UserDetails sec------------------ */}

            </Box>}
        </>
    )
}
