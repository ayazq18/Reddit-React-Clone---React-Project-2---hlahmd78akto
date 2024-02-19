'use client'
import React, { useContext, useEffect, useMemo, useState } from 'react';
// import '../global.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import { AccountCircle, Close, FilterVintage, Logout, MoreHoriz, PersonAdd, Podcasts, Reddit, Settings, Visibility } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Avatar, Button, Divider, MenuItem, Switch } from '@mui/material';
import { useRouter } from 'next/navigation';
import { trending, home, popular, notification, createicon, chat, advertise, scanner, shop, communitydropdown, thememode, } from '../(Constants)/Asset'
import Login from '../(Login)/Login';
import { context } from '../(Context)/ContextProvider';
import SideNavBar from './SideNavBar';
import SwitchBtn from '../(Switch)/SwitchBtn';
import Community from '../(Community)/Community';
import { apicontext } from '../(Apicontext)/Apicontextprovider';



const NavBarr = ({ children }) => {
    const { router, pop, popup, setpopup, token, settoken, switchDark, switchLight, theme, loginpop, setloginpop, signUpdata, setSignUpdata, handleTabs, activeTabs, setActiveTabs, } = useContext(context)
    const { channel } = useContext(apicontext)
    const ITEM_HEIGHT = 48;
    const route = useRouter()
    const [anchorElinbox, setAnchorElinbox] = useState(false);
    const [inputValue, setInputValue] = useState("")
    const [dropnav, setdropnav] = useState(false)
    const [searchresults, setsearchresults] = useState([])
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const handleToggleDropdown = () => {
        setdropnav(!dropnav);
    };
    const handleSignOut = () => {
        settoken('')
        setSignUpdata('')
        localStorage.removeItem('token')
        router.push('/')
    }
    const handleOpenInboxMenu = (event) => {
        setAnchorElinbox(event.currentTarget);
    };
    const handleCloseInboxMenu = () => {
        setAnchorElinbox(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const fetchResultSearch = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post?search={"author.name":"${inputValue}"}`, {
                method: 'GET',
                headers: {
                    'ProjectID': 'hlahmd78akto',
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            setsearchresults(result.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchResultSearch()
    }, [inputValue])


    return (
        <Box sx={{ top: '0' }}>
            <AppBar elevation={0} sx={{ position: 'relative', backgroundColor: `${theme === 'light' ? '#fff' : '#0b1416'}`, p: '0', zIndex: "10", border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.104)'}`, }}>
                {popup['popcommunity'] && <Box sx={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: { sx: '100%', md: '100vh' }, zIndex: '8', bgcolor: 'rgba(71, 58, 58, 0.758)' }}>
                    <Box sx={{ zIndex: '9' }}><Community pop={pop} /></Box>
                </Box>}
                {loginpop && <Box sx={{ bgcolor: '#fff', zIndex: '19' }}><Login /></Box>}
                {loginpop && <Box onClick={() => setloginpop(false)} sx={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: '18', bgcolor: 'rgba(71, 58, 58, 0.758)' }}></Box>}
                {popup['drawer'] && <Box p={2} sx={{ color: `${theme === 'light' ? '#0b1416' : '#fff'}`, zIndex: '100', position: 'absolute', top: '55px', display: { xs: 'block', md: 'none' }, width: '280px', height: '100vh', borderRight: '1px solid #2c2b2b15', backgroundColor: `${theme === 'light' ? '#fff' : '#0b1416'}`, }}>
                    <Box className={activeTabs === 'Home' && 'activeclass'} onClick={() => { handleTabs('Home'), router.push('/Home') }} sx={{ width: '100%', display: 'flex', gap: '10px', alignItems: 'center', p: '7px 7px 7px 20px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography sx={{ position: 'relative', top: '2px' }}>{home}</Typography><Typography variant='p' sx={{ fontSize: '14px' }}>Home</Typography></Box>
                    <Box className={activeTabs === 'Popular' && 'activeclass'} onClick={() => { handleTabs('Popular'), router.push('/Popular') }} sx={{ display: 'flex', gap: '10px', alignItems: 'center', p: '7px 7px 7px 20px', borderRadius: '7px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography sx={{ position: 'relative', top: '2px' }}>{popular}</Typography><Typography variant='p' sx={{ fontSize: '14px' }}>Popular</Typography></Box>
                    {token && <Box sx={{ borderBottom: '1px solid lightgray' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Box onClick={() => { pop('community') }} sx={{ color: `${theme === 'light' ? '#0b1416' : '#fff'}`, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', borderRadius: '10px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography variant='p' sx={{ fontSize: '13px', letterSpacing: '2px', }}>COMMUNITY</Typography><Typography sx={{ display: 'flex', alignItems: 'center', transform: `${popup['community'] && 'rotate(180deg)'}`, transition: 'all .5s ease' }}>{communitydropdown}</Typography></Box>
                            {!popup['community'] && <Box sx={{ width: '100%' }}>
                                <IconButton onClick={() => pop('popcommunity')} sx={{ color: `${theme === 'light' ? '#0b1416' : '#fff'}`, width: '100%', p: '10px', display: 'flex', alignItems: 'center', borderRadius: '0', justifyContent: 'flex-start', gap: '7px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                                    <Typography sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', }}>{createicon}</Typography>
                                    <Typography variant='h6' sx={{ fontSize: '14px' }}>Create a community</Typography>
                                </IconButton>
                            </Box>}
                        </Box>
                    </Box>}
                </Box>
                }
                {popup['getapp'] && <Box sx={{ display: { xs: 'none', md: 'block' }, p: '20px 10px', width: '520px', height: '500px', bgcolor: '#fff', borderRadius: '6px', position: 'absolute', left: { xs: '-24px', md: '30%' }, top: '50px', zIndex: '9' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', p: '10px' }}>
                        <Typography variant='h3' sx={{ color: '#000', fontSize: '32px', fontWeight: '700' }}>Get the Reddit app</Typography>
                        <Avatar onClick={() => pop('getapp')} sx={{ color: '#000', fontSize: '10px', bgcolor: 'rgba(236, 232, 232, 0.334)' }}>
                            <Close />
                        </Avatar>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
                        <Box sx={{ width: '60%', height: '350px', p: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <Typography variant='h5' sx={{ fontSize: '16px', fontWeight: '700', width: '60%', color: '#000', textAlign: 'center' }}>Scan this QR code to download the app now</Typography>
                            <img style={{ width: '70%' }} src="https://www.redditstatic.com/shreddit/assets/shreddit-qr-code.svg" srcSet="" sizes="" alt="Shreddit QR Code"></img>
                            <Typography variant='p' sx={{ fontSize: '14px', color: '#000', textAlign: 'center' }}>Or check it out in the app stores</Typography>
                            <Box sx={{ display: 'flex' }}>
                                <img src="https://www.redditstatic.com/shreddit/assets/google-play.svg" srcSet="" sizes="" alt="Get it on Google Play" />
                                <img src="https://www.redditstatic.com/shreddit/assets/app-store.svg" srcSet="" sizes="" alt="Download on the App Store" />
                            </Box>
                        </Box>
                    </Box>
                </Box>}
                {popup['getapp'] && <Box sx={{ width: '100vw', height: '100vh', position: 'absolute', bgcolor: 'rgba(71, 58, 58, 0.758)', zIndex: '8' }}></Box>}
                <Container maxWidth="xl" >
                    <Toolbar disableGutters sx={{ p: '1' }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                            <Reddit onClick={() => route.push('/Home')} sx={{ display: { xs: 'none', md: 'flex' }, mr: 0, backgroundColor: 'orangered', borderRadius: '50px', transform: 'scale(1.5)', }} />
                        </Box>
                        <Typography
                            mr={token ? 0 : 20}
                            variant="h4"
                            noWrap
                            component="a"
                            sx={{

                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontSize: '28px',
                                fontWeight: 900,
                                letterSpacing: '-.2rem',
                                color: 'orangered',
                                textDecoration: 'none',
                                width: '110px',
                                color: `${theme === 'light' ? 'orangered' : '#fff'}`
                            }}
                        >
                            reddit
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, }}>
                            {!token && <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                // color="black"
                                onClick={() => pop('drawer')}
                            >
                                <MenuIcon sx={{ color: `${theme === 'light' ? '#000' : '#fff'}` }} />
                            </IconButton>}
                            <Menu
                                id="menu-appbar"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                            </Menu>
                        </Box>
                        <Reddit sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-start', mr: 1, backgroundColor: 'orangered', borderRadius: '50px', transform: 'scale(1.1)' }} />

                        {/* ---------------------Dropdownsidenav----------------- */}
                        {token &&
                            <Box sx={{ borderRadius: '3px', width: '320px', height: 'auto', top: '-15px', border: `${popup['popsidenavbar'] && '1px solid #c9c7c7'}` }}>
                                <Box onClick={() => handleToggleDropdown()} sx={{ position: 'relative', p: '10px', width: '100%', }}>
                                    <Box sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', }}>
                                            <Typography sx={{display: 'flex', alignItems: 'center',}}>{activeTabs === 'Home' ? home : popular}</Typography>
                                            <Typography variant='p' sx={{ fontSize: '16px', display: { xs: 'none', md: 'block' } }}>{activeTabs === 'Home' ? 'Home' : 'Popular'}</Typography>
                                        </Box>
                                        <Typography sx={{ display: 'flex', alignItems: 'center', transform: `${dropnav && 'rotate(180deg)'}`, transition: 'all .5s ease' }}>{communitydropdown}</Typography>
                                    </Box>
                                    {dropnav && <Box width='320px' position='absolute' top='50px' backgroundColor={`${theme === 'light' ? '#fff' : '#0b1416'}`} border={`.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.207)' : 'rgba(224, 224, 247, 0.104)'}`}>
                                        <Box className='popsidenavbar' sx={{ overflowY: 'scroll', p: '20px 5px 20px 15px', height: '70vh', borderRight: `${!token && '1px solid rgba(236, 232, 232, 0.134)'}` }}>
                                            <Box sx={{ borderBottom: '1px solid rgba(236, 232, 232, 0.134)', mb: '10px' }}>
                                                <Box className={activeTabs === 'Home' && 'activeclass'} onClick={() => { handleTabs('Home'), `${token ? router.push('/Home') : router.push('/')}` }} sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, width: '100%', display: 'flex', gap: '10px', alignItems: 'center', p: '7px 7px 7px 20px', borderRadius: '7px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography sx={{ position: 'relative', top: '2px', }}>{home}</Typography><Typography variant='p' sx={{ fontSize: '14px', }}>Home</Typography></Box>
                                                <Box className={activeTabs === 'Popular' && 'activeclass'} onClick={() => { handleTabs('Popular'), router.push('Popular') }} sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: 'flex', gap: '10px', alignItems: 'center', p: '7px 7px 7px 20px', borderRadius: '7px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography sx={{ position: 'relative', top: '2px' }}>{popular}</Typography><Typography variant='p' sx={{ fontSize: '14px', }}>Popular</Typography></Box>
                                            </Box>
                                            {token && <Box sx={{ borderBottom: '1px solid lightgray' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                                    <Box sx={{ color: `${theme === 'light' ? '#0b1416' : '#fff'}`, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', borderRadius: '10px', ":hover": { backgroundColor: 'rgba(236, 232, 232, 0.334)' } }}><Typography variant='p' sx={{ fontSize: '13px', letterSpacing: '2px', }}>COMMUNITY</Typography><Typography sx={{ display: 'flex', alignItems: 'center', transition: 'all .5s ease' }}>{communitydropdown}</Typography></Box>
                                                    <Box sx={{ width: '100%' }}>
                                                        <IconButton onClick={() => pop('popcommunity')} sx={{ color: `${theme === 'light' ? '#0b1416' : '#fff'}`, width: '100%', p: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '7px', borderRadius: '10px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                                                            <Typography sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', }}>{createicon}</Typography>
                                                            <Typography variant='h6' sx={{ fontSize: '14px', }}>Create a community</Typography>
                                                        </IconButton>

                                                        {/* ---------------Channel mapping---------------- */}
                                                        {channel && channel.map((item, index) => (
                                                            <IconButton key={index} onClick={() => { route.push(`/Community/${item._id}`) }} sx={{ color: `${theme === 'light' ? '#0b1416' : '#fff'}`, width: '100%', p: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '7px', borderRadius: '10px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                                                                {item.image ? <img style={{ width: '20px', flexGrow: 0, display: 'flex', alignItems: 'center', }} src={item.image} />
                                                                    : <img style={{ width: '20px', }} src="https://preview.redd.it/me-watching-a-random-drawing-i-made-get-turned-into-a-meme-v0-xib15dbut7tb1.png?width=640&crop=smart&auto=webp&s=218dbe01ffa9c145aa5fef90aec31a21b97ffbbe" />}
                                                                <Typography variant='h6' sx={{ fontSize: '14px', }}>{item.name}</Typography>
                                                            </IconButton>
                                                        ))}
                                                    </Box>
                                                </Box>
                                            </Box>}
                                        </Box>
                                    </Box>}
                                </Box>
                            </Box>
                        }

                        {/* -----------------SearchBar--------------------     */}
                        <Paper
                            className='inputfield'
                            component="form"
                            elevation={popup['search'] ? 1 : 0}
                            sx={{
                                p: '0px 4px', display: 'flex', alignItems: 'center', width: `${token ? '550px' : '720px'}`, position: 'relative', backgroundColor: popup['search'] ? '#fff' : 'rgba(236, 232, 232, 0.534)', borderRadius: popup['search'] ? '20px 20px 0 0' : '50px',
                                "&:hover": popup['search'] && { backgroundColor: 'rgba(236, 232, 232, 0.734)', borderRadius: '50px' }
                            }}
                            onClick={() => pop('search')}
                        >
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1, zIndex: '3' }}
                                placeholder="Search Reddit"
                                inputProps={{ 'aria-label': 'search reddit' }}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            {popup['search'] && <Paper elevation={1} sx={{ overflowY: 'scroll', overflowX: 'hidden', backgroundColor: `${theme === 'light' ? '#fff' : '#16282cfd'}`, alignItems: 'center', borderRadius: '0 0 10px 10px', width: '100%', height: 500, position: 'absolute', top: '45px', left: '0px', zIndex: '9', }}>
                                <Box sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: 'flex', alignItems: 'center', gap: '5px', m: '10px 10px 0 10px' }}><Typography>{trending}</Typography><Typography variant='h6' sx={{ fontSize: '13px', fontWeight: '400', textTransform: 'uppercase', }}>Trending Today</Typography></Box>
                                {searchresults && searchresults.map((item, index) => (
                                    <Box onClick={() => { token && router.push(`/User/${item.author._id}`), setInputValue(item.author.name) }} key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%', borderBottom: '1px solid rgba(236, 232, 232, 0.834)', m: '0px 10px', p: '20px 10px' }}>
                                        <Box>
                                            <Typography variant='h2' sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, fontSize: '.9rem', fontWeight: '700' }}>{item.author.name}</Typography>
                                            <Box>
                                                <Typography variant='h6' sx={{ p: '5px 0', fontSize: '.8rem', color: '#808080', fontWeight: '400' }}>{item.content}</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                    {item.author.profileImage ? <img style={{ width: '1rem', borderRadius: '4px' }} class="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={item.author.profileImage} />
                                                        : <img style={{ width: '1rem', borderRadius: '4px' }} src="https://preview.redd.it/me-watching-a-random-drawing-i-made-get-turned-into-a-meme-v0-xib15dbut7tb1.png?width=640&crop=smart&auto=webp&s=218dbe01ffa9c145aa5fef90aec31a21b97ffbbe" />}
                                                    <Typography variant='h6' sx={{ fontSize: '.8rem', color: '#808080', fontWeight: '400' }}>{item.author.name}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <img style={{ borderRadius: '6px', width: '18%' }} src={item.images[0]} srcSet="" sizes="" alt=""></img>
                                    </Box>
                                ))}
                            </Paper>}
                        </Paper>
                        <Box sx={{ flexGrow: 0, ml: 'auto' }}>
                            {token ?
                                (
                                    <Box sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, flexGrow: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Tooltip title="Advertise on Reddit">
                                            <IconButton sx={{ p: '10px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)', borderRadius: '50px' } }}>
                                                <Typography sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', color: `${theme === 'light' ? '#000' : '#fff'}`, }}>{popular}</Typography>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Open chat">
                                            <IconButton sx={{ p: '10px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)', borderRadius: '50px' } }}>
                                                <Typography sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', color: `${theme === 'light' ? '#000' : '#fff'}`, }}>{chat}</Typography>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Create post">
                                            <IconButton onClick={() => router.push(`/submit/newpost`)} sx={{ p: '10px', display: 'flex', alignItems: 'center', gap: '7px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                                                <Typography sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', color: `${theme === 'light' ? '#000' : '#fff'}`, }}>{createicon}</Typography>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Open inbox">
                                            <IconButton onClick={handleOpenInboxMenu} sx={{ p: '10px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                                                <Typography sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', color: `${theme === 'light' ? '#000' : '#fff'}`, }}>{notification}</Typography>
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            className='notification'
                                            sx={{ mt: '45px', }}
                                            id="menu-appbar"
                                            anchorEl={anchorElinbox}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElinbox)}
                                            onClose={handleCloseInboxMenu}
                                        >
                                            <Box sx={{ width: '350px', height: '350px', }}></Box>
                                        </Menu>
                                        <Tooltip title="Advertise">
                                            <IconButton sx={{ p: '10px', display: 'flex', alignItems: 'center', gap: '7px', borderRadius: '50px', bgcolor: 'rgba(236, 232, 232, 0.734)' }}>
                                                <Typography sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', color: `${theme === 'light' ? '#000' : '#fff'}`, }}><Podcasts /></Typography>
                                            </IconButton>
                                        </Tooltip>

                                        {/* ------------------login buttn------------------    */}
                                        <Tooltip title="Open profile menu" >
                                            <Box onClick={handleClick} sx={{ display: 'flex', alignItems: 'center', gap: '5px', p: '0px 10px', border: { xs: 'none', md: '1px solid rgba(236, 232, 232, 0.734)' }, borderRadius: '5px' }}>
                                                <Box sx={{ p: 0, position: 'relative', }}>
                                                    <img className='profilelogo' style={{ width: '25px', borderRadius: '5px' }} src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" alt="User Avatar" class="max-w-full"></img>
                                                    <Box sx={{ position: 'absolute', bottom: '3px', right: '-3px', width: '7px', height: '7px', bgcolor: '#55bd46', borderRadius: '100%' }}></Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', width: { xs: 'none', md: '150px' }, color: '#000', justifyContent: 'space-between' }}>
                                                    <Box>
                                                        <Typography variant='h6' sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: { xs: 'none', md: 'block' }, fontSize: '12px' }}>{localStorage.getItem('name')}</Typography>
                                                        <Box sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: { xs: 'none', md: 'flex' }, gap: '5px', alignItems: 'center' }}><Typography><FilterVintage sx={{ fontSize: '14px', color: 'orangered' }} /></Typography><Typography variant='h6' sx={{ fontSize: '12px', color: '#808080' }}>1 karma</Typography></Box>
                                                    </Box>
                                                    <Typography sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: { xs: 'block', md: 'flex' }, alignItems: 'center', }}>{communitydropdown}</Typography>
                                                </Box>
                                            </Box>
                                        </Tooltip>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            // onClick={handleClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    backgroundColor: `${theme === 'light' ? '#fff' : '#000'}`,
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&::before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            {/* <img className='profilelogo' style={{ position: 'relative', left: '-5px', width: '33px', borderRadius: '50px' }} src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" alt="User Avatar" class="max-w-full"></img> &nbsp;Profile
                                                <Box sx={{ position: 'absolute', left: '38px', top: '30px', right: '0px', width: '7px', height: '7px', bgcolor: '#55bd46', borderRadius: '100%' }}></Box> */}
                                            <MenuItem sx={{ color: '#808080' }}>
                                                <Avatar /> My Stuff
                                            </MenuItem>
                                            <MenuItem onClick={handleClose} sx={{color: `${theme === 'light' ? '#000' : '#fff'}`}}>
                                                <Avatar sx={{ visibility: 'hidden' }} /> Profile
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem sx={{ color: '#808080' }}>
                                                <Visibility /> &nbsp; View Options
                                            </MenuItem>
                                            <MenuItem sx={{ display: 'flex', gap:'20px', alignItems:'center', p:'0', color: `${theme === 'light' ? '#000' : '#fff'}` }}>
                                                <Avatar sx={{ visibility: 'hidden' }} />
                                                Dark mode
                                                <SwitchBtn theme={theme} switchLight={switchLight} switchDark={switchDark} />
                                            </MenuItem>
                                            <MenuItem onClick={() => { handleClose(), handleSignOut() }} sx={{color: `${theme === 'light' ? '#000' : '#fff'}`}}>
                                                    <Logout fontSize="small" /> &nbsp;&nbsp;&nbsp;&nbsp;
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                )
                                :
                                (<Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                        <Tooltip title="Get the Reddit app">
                                            <IconButton onClick={() => pop('getapp')} sx={{ p: '7px', display: 'flex', alignItems: 'center', textWrap: 'nowrap', bgcolor: 'rgba(236, 232, 232, 0.734)', gap: '7px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
                                                <Typography sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', color: '#000' }}>{scanner}</Typography>
                                                <Typography variant='h6' sx={{ fontSize: '14px', color: '#000' }}>Get app</Typography>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Tooltip title="Log in to Reddit">
                                        <IconButton onClick={() => { setloginpop(true) }} sx={{ p: 0 }}>
                                            <Button variant='contained' sx={{ backgroundColor: '#D93A00', borderRadius: '50px', ":hover": { backgroundColor: '#D93A00' } }}>Login</Button>
                                        </IconButton>
                                    </Tooltip>
                                    <div>
                                        <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={open ? 'long-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <MoreHoriz sx={{ color: `${theme === 'light' ? '#000' : '#fff'}` }} />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            PaperProps={{
                                                style: {
                                                    marginTop: '1ch',
                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                    width: '30ch',
                                                },
                                            }}
                                        >
                                            <MenuItem onClick={() => { handleClose(), setloginpop(true) }}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                Log In / Sign Up
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    {advertise}
                                                </ListItemIcon>
                                                Advertise on Reddit
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    {shop}
                                                </ListItemIcon>
                                                Shop Collectible Avatars
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </Box>)
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box display='flex' gap='30px' width="100%" overflowx='hidden' sx={{ backgroundColor: `${theme === 'light' ? '#fff' : '#000'}`, }}>
                {!token && <Box display={{ xs: 'none', md: 'block' }} ><SideNavBar popup={popup} pop={pop} setpopup={setpopup} token={token} /></Box>}
                <Box width="100%" display='flex' justifyContent='center' >{children}</Box>
            </Box>
        </Box >
    );
}
export default NavBarr;