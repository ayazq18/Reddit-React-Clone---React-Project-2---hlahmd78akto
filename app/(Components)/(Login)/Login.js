'use client'
import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Apple, Close, Google } from '@mui/icons-material';
import { backicon, google } from '../(Constants)/Asset';
import { Input, Paper } from '@mui/material';
import { context } from '../(Context)/ContextProvider';
const defaultTheme = createTheme();

export default function Login({ }) {
  const { token, settoken, switchDark, switchLight, theme, signUpdata, setSignUpdata, handleSignUp, handleSubmit, popup, setpopup, pop, loginpop, setloginpop } = useContext(context)
  const [isSignup, setIsSignUp] = useState(true)


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            margin: { xs: 0, md: 0.5 },
            p: '10px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: { xs: '100vw', md: '540px' }, height: '100vh', borderRadius: { xs: '0', md: '15px' },
            position: 'absolute', left: { xs: '0px', md: '30%' },
            backgroundColor: `${theme === 'light' ? '#fff' : '#0b1416'}`,
          }}
        >
          <Avatar onClick={() => setloginpop(false)} sx={{ position: 'absolute', top: '10px', right: '20px', color: '#000', fontSize: '10px', bgcolor: 'rgba(236, 232, 232, 0.334)' }}>
            <Close />
          </Avatar>
          <Box sx={{
            width: { xs: '100vw', md: '520px' }, height: '80%', overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Box sx={{ width: '350px', p: '20px 0 0 0', color: `${theme === 'light' ? '#000' : '#fff'}`, }}>
              <Typography component="h1" variant="h5" sx={{ fontWeight: '900' }}>
                Log in
              </Typography>
              <Typography component="p" sx={{ fontSize: '14px' }}>By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.</Typography>
            </Box>

            <Box sx={{ width: '350px', p: '20px 0', m: '0', }}>
              <Box mb={1} sx={{ width: '100%', p: '5px', color: `${theme === 'light' ? '#000' : '#fff'}`, borderTop: '3px solid rgba(236, 232, 232, 0.334)', borderBottom: '3px solid rgba(236, 232, 232, 0.334)', borderRadius: '15px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
                <Box display='flex' justifyContent='space-between' p='0 5px'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', }}>
                    <img style={{ width: '1rem', height: '1rem', borderRadius: '50px' }} src="https://styles.redditmedia.com/t5_3is08/styles/communityIcon_i0bub98epp4a1.png" srcset="" sizes="" alt="Icon for r/"></img>
                    <Box display='flex' flexDirection='column'>
                      <Typography variant='p' sx={{ fontSize: '10px' }}>Continue as Ayaz Qureshi</Typography>
                      <Typography variant='p' sx={{ fontSize: '10px' }}>ayazq18@gmail.com</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: '1rem', display: 'flex', alignItems: 'center' }}>{google}</Box>
                </Box>
              </Box>
              <Box sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: 'flex', alignItems: 'center', gap: '80px', p: '5px', width: '100%', border: '3px solid rgba(236, 232, 232, 0.334)', borderRadius: '20px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
                <Apple />
                <Typography variant='p' sx={{ fontSize: '13px' }}>Continue with Apple</Typography>
              </Box>
            </Box>
            {isSignup && <Box component="form" noValidate sx={{ width: '350px', height: '200px' }}>
              <TextField
                className='input'
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
                value={signUpdata.email}
                onChange={(e) => setSignUpdata({ ...signUpdata, email: e.target.value })}
              />
              <TextField
                className='input'
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={signUpdata.password}
                onChange={(e) => setSignUpdata({ ...signUpdata, password: e.target.value })}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Grid >
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot your username or password?
                  </Link>
                </Grid>
                <Grid item>
                  <Box variant="p" display='flex' alignItems='center' gap='5px' fontSize='12px' color={`${theme === 'light' ? '#000' : '#fff'}`} >
                    New to Reddit? <Typography fontSize='12px' color='blue' onClick={() => setIsSignUp(false)}>Sign Up</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Button
              onClick={(e) => { handleSubmit(e) }} 
                type="submit"
                fullWidth
                variant="contained"
                sx={{ p: '10px', mt: 3, mb: 2, bgcolor: '#d93a00', borderRadius: '50px' }}
              >
                Log In
              </Button>
            </Box>}
            {!isSignup && <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '350px', height: '200px' }}>
              <TextField
                className='input'
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{ notched: false }}
                value={signUpdata.email}
                onChange={(e) => setSignUpdata({ ...signUpdata, email: e.target.value })}
              />
              <Grid item>
                <Box variant="p" mt={2} display='flex' alignItems='center' gap='5px' fontSize='12px' color={`${theme === 'light' ? '#000' : '#fff'}`}>
                  Already a Redditor? <Typography fontSize='12px' color='blue' onClick={() => setIsSignUp(true)}>Log In</Typography>
                </Box>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 15, mb: 2, p: '10px 0', bgcolor: '#d93a00', borderRadius: '20px' }}
                onClick={() => signUpdata.email && pop('continue')}
              >
                Continue
              </Button>
            </Box>}
            {popup['continue'] &&
              <Box sx={{ p: '50px', position: 'absolute', top: '0', left: '0px', width: { xs: '100vw', md: '520px' }, height: '100%', backgroundColor: `${theme === 'light' ? '#fff' : '#0b1416'}`, borderRadius: { xs: 'none', md: '15px' }, zIndex: '2' }}>
                <Typography onClick={() => pop('continue')} sx={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', p: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: `${theme === 'light' ? '#000' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#808080' : '#fff'}`, borderRadius: '100%' } }}>{backicon}</Typography>
                <Box sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, width: '400px', p: '30px' }}>
                  <Typography component="h1" variant="h5" sx={{ fontWeight: '900' }}>
                    Create your name and password
                  </Typography>
                  <Typography component="p" sx={{ fontSize: '14px' }}>Reddit is anonymous, so your name is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it.</Typography>
                  <Box>
                    <TextField
                      className='input'
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="name"
                      name="name"
                      autoComplete="text"
                      autoFocus
                      value={signUpdata.name}
                      onChange={(e) => setSignUpdata({ ...signUpdata, name: e.target.value })}
                    />
                    <TextField
                      className='input'
                      margin="normal"
                      required
                      fullWidth
                      min={8}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={signUpdata.password}
                      onChange={(e) => setSignUpdata({ ...signUpdata, password: e.target.value })}
                    />
                    {signUpdata.name && signUpdata.password !== '' && <Box mt={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', p: '5px', width: '80%', height: '80px', border: '1px solid rgba(236, 232, 232, 1)', bgcolor: 'rgba(236, 232, 232, 0.734)', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
                      <Box display='flex' alignItems='center' gap={2}>
                        <TextField
                          className='inputcheckbox'
                          margin="normal"
                          required
                          name="checkbox"
                          type="checkbox"
                        />
                        <Typography sx={{ fontSize: '14px' }}>I'm not a robot</Typography>
                      </Box>
                      <img style={{ width: '20px', height: '20px' }} src='https://www.gstatic.com/recaptcha/api2/logo_48.png' />
                    </Box>}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 5, mb: 2, p: '10px 0', bgcolor: '#d93a00', borderRadius: '20px' }}
                      onClick={(e) => { signUpdata.password.length === 8 && handleSignUp(e) }}
                    >
                      Continue
                    </Button>
                  </Box>
                </Box>
              </Box>
            }
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}