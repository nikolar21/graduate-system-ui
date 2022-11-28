import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box"
import {
  AppBar, Avatar, Button, Container,
  IconButton,
  Menu, MenuItem,
  Toolbar, Tooltip,
  Typography
} from "@mui/material";
import {useState, useContext, useEffect} from "react";
import {UserContext} from "../state-management/store/UserContext";
import * as userRoles from "../utils/globalVars";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userContext, setUserContext] = useContext(UserContext);
  const [pages, setPages] = useState([{name: 'Login', path: '/login'}, {name: 'Register', path: '/register'}]);
  const adminPages = [{name: 'Add user', path: '/add-user'}, {name: 'Users', path: '/users'}];
  const inspectorPages = [{name: 'Add Project', path: '/inspector/add-project'}];

  useEffect(() => {
    if (userContext?.isLoggedIn && userContext?.roles.includes(userRoles.ROLE_INSPECTOR)) {
      setPages(inspectorPages);
    }
    if (userContext?.isLoggedIn && userContext?.roles.includes(userRoles.ROLE_ADMIN)) {
      setPages(adminPages);
    }
    if (userContext?.isLoggedIn && userContext?.roles.includes(userRoles.ROLE_USER)) {
      setPages([{name: '', path: ''}]);
    }
    if (!userContext?.isLoggedIn) {
      setPages([{name: 'Login', path: '/login'}, {name: 'Register', path: '/register'}]);
    }
  }, [userContext])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseUserMenu = (functionName) => {
    switch (functionName) {
      case 'logoutUser': logoutUser(); break;
      default: break;
    }
    setAnchorElUser(null);
  };

  const handlePageChange = (path) => {
    navigate(path, { replace: true });
  }

  const logoutUser = () => {
    setUserContext({isLoggedIn: false, username: '', id: '', role: []});
    sessionStorage.removeItem('jwt-token');
    navigate('/login', {replace: true});
  }

  return (
    <AppBar position="static" style={{ background: '#0a1931' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div onClick={() => navigate('/', {replace: true})} style={{cursor: "pointer"}}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Graduates System
            </Typography>
          </div>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handlePageChange}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={() => handlePageChange(page.path)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                onClick={() => handlePageChange(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} >
            <Tooltip title="Logout User">
              { userContext?.isLoggedIn ?
                <>
                  <MenuItem onClick={() => handleCloseUserMenu("logoutUser")}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </> : <MenuItem/> }
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

}

export default Navbar;