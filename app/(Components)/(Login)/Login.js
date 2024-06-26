'use client'
import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Apple, Close, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { backicon, google } from '../(Constants)/Asset';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, } from '@mui/material';
import { context } from '../(Context)/ContextProvider';
import { typography } from '@mui/system';
const defaultTheme = createTheme();

export default function Login({ }) {
  const { isSignup, setIsSignUp, token, settoken, switchDark, switchLight, theme, signUpdata, setSignUpdata, handleSignUp, handleSubmit, popup, setpopup, pop, loginpop, setloginpop } = useContext(context)

  // -----Password visibility---------
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // -----Password visibility---------

  const handlepassword = (e)=>{
    setSignUpdata({ ...signUpdata, password: e.target.value })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // margin: { xs: 0, md: 0 },
            // p: '10px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: { xs: '100vw', md: '520px' }, height: '100vh', borderRadius: { xs: '0', md: '15px' },
            position: 'absolute', left: { xs: '0px', md: '30%' },
            backgroundColor: `${theme === 'light' ? '#fff' : '#0b1416'}`,
          }}
        >
          <Avatar className='c' onClick={() => { setloginpop(false), setIsSignUp(true), setSignUpdata({ name: '', email: '', password: '' }) }} sx={{ position: 'absolute', top: '10px', right: '20px', color: '#000', fontSize: '10px', bgcolor: 'rgba(236, 232, 232, 0.334)' }}>
            <Close />
          </Avatar>
          <Box sx={{
            width: { xs: '100vw', md: '420px' }, height: '90%',
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

            <Box sx={{ width: '350px',p: '20px 0', m: '0', }}>
              <Box mb={1} sx={{ width: '100%', p: '5px', color: `${theme === 'light' ? '#000' : '#fff'}`, borderTop: '3px solid rgba(236, 232, 232, 0.334)', borderBottom: '3px solid rgba(236, 232, 232, 0.334)', borderRadius: '15px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
                <Box display='flex' justifyContent='space-between' p='0 5px'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
                  <Box sx={{ width: '1rem', display: 'flex', alignItems: 'center' }}>{google}</Box>
                    <Box >
                      <Typography variant='p' sx={{ fontSize: '13px',color:'red', cursor:'pointer'}}>Continue with Google (Feature coming soon)</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ color: `${theme === 'light' ? '#000' : '#fff'}`, display: 'flex', alignItems: 'center', gap: '10px', p: '5px', width: '100%', border: '3px solid rgba(236, 232, 232, 0.334)', borderRadius: '20px', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
                <Apple />
                <Typography variant='p' sx={{ fontSize: '13px',color:'red', cursor:'pointer' }}>Continue with Apple (Feature Coming soon)</Typography>
              </Box>
            </Box>

            {/* ------------------Login---------------- */}
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

              <FormControl sx={{ mt: 3, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  className='input'
                  value={signUpdata.password}
                  inputProps={{ min: 8 }}
                  sx={{bgcolor:'white'}}
                  onChange={(e)=>handlepassword(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Grid >
                <Grid item>
                  <Box variant="p" mt='10px' display='flex' alignItems='center' gap='5px' fontSize='12px' color={`${theme === 'light' ? '#000' : '#fff'}`} >
                    New to Reddit? <Typography className='c' fontSize='12px' color={`${theme=='light' ? 'blue' : 'Yellow'}`} onClick={() => { setIsSignUp(false), setSignUpdata({ name: '', email: '', password: '' }) }}>Sign Up</Typography>
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
            {/* ------------------Login---------------- */}


            {/* ------------------Signup---------------- */}

            {!isSignup &&
              <Box sx={{ width: '350px', height: '200px' }}>
                <TextField
                  className='input'
                  margin="normal"
                  required
                  fullWidth
                  type='email'
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  sx={{bgcolor:'white'}}
                  value={signUpdata.email}
                  onChange={(e) => setSignUpdata({ ...signUpdata, email: e.target.value })}
                />
                <Grid item>
                  <Box variant="p" display='flex' alignItems='center' gap='5px' fontSize='12px' color={`${theme === 'light' ? 'black' : 'white'}`}>
                    Already a Redditor? <Typography className='c' fontSize='12px' color={`${theme === 'light' ? 'blue' : 'yellow'}`} onClick={() => { setIsSignUp(true), setSignUpdata({ name: '', email: '', password: '' }) }}>Log In</Typography>
                  </Box>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={signUpdata.email === ''}
                  sx={{ mt: 5, mb: 2, p: '10px 0', bgcolor: '#d93a00', borderRadius: '20px', border:'1p solid red' }}
                  onClick={() => pop('continue') }
                >
                  Continue
                </Button>
                {popup['continue'] &&
                  <Box sx={{ p: '50px', position: 'absolute', top: '0', left: '0px', width: { xs: '100vw', md: '100%' }, backgroundColor: `${theme === 'light' ? '#fff' : '#0b1416'}`, borderRadius: { xs: 'none', md: '15px' }, zIndex: '2' }}>
                    <Typography onClick={() => {pop('continue'), setSignUpdata({ ...signUpdata, isChecked: false })}} sx={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', p: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: `${theme === 'light' ? '#000' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#808080' : '#fff'}`, borderRadius: '100%' } }}>{backicon}</Typography>
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
                          // autoFocus
                          sx={{bgcolor:'white'}}
                          value={signUpdata.name}
                          onChange={(e) => setSignUpdata({ ...signUpdata, name: e.target.value })}
                        />

                        <FormControl sx={{ mt: 3, width: '100%' }} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                          <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            className='input'
                            value={signUpdata.password}
                            inputProps={{ min: 8 }}
                            sx={{bgcolor:'white'}}
                            onChange={(e) => setSignUpdata({ ...signUpdata, password: e.target.value })}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                        </FormControl>

                        {signUpdata.name && signUpdata.password !== '' && <Box mt={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', p: '5px', width: '80%', height: '80px', border: '1px solid rgba(236, 232, 232, 1)', bgcolor: 'rgba(236, 232, 232, 0.734)', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.334)' } }}>
                          <Box display='flex' alignItems='center' gap={2}>
                            <TextField
                              className='inputcheckbox'
                              margin="normal"
                              required
                              value={signUpdata.isChecked}
                              onClick={() => setSignUpdata({ ...signUpdata, isChecked: !signUpdata.isChecked })}
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
                          onClick={handleSignUp}
                        >
                          Continue
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                }
              </Box>}

            {/* ------------------Signup---------------- */}


          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}