import {useEffect, useContext, useState, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {UserContext} from '../state-management/store/UserContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import {
  CardHeader,
  Container,
  IconButton,
  styled, TextField
} from "@mui/material";
import axiosClient from "../api/axiosClient";
import CollapsableComment from '../components/CollapsableComment';

const HomePage = () => {
  const GET_ALL_PROJECTS_URL = '/api/projects';
  const SEARCH_PROJECTS_URL = '/api/projects'

  const navigate = useNavigate();

  const childRef = useRef();
  const [userContext] = useContext(UserContext); // TODO pass it to projects page to post comment with userId
  const [expanded, setExpanded] = useState(false);
  const [projects, setProjects] = useState(null);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(GET_ALL_PROJECTS_URL);
		console.log(response);
        setProjects(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearchTerm = async () => {
      try {
        const response = await axiosClient.get(SEARCH_PROJECTS_URL,{
          params: {
            searchTerm
          }
        });
      } catch (err) {
        console.error(err)
      }
    }
  }, [searchTerm])

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
    childRef.current.handleCommentExpanse(expanded);
  };

  const goToProjectPage = (projectId) => {
    navigate(`/project/${projectId}`, {replace: false, state: projects.find(project => project.id === projectId)});
  }

  return (
    <>
      <Container className="homepage-container" maxWidth="md">
        <TextField className="search-field" id="fullWidth" fullWidth label="Search projects" variant="outlined"
                   onChange={(e) => setSearchTerm(e.target.value)}/>
        {projects?.map(project => (
          <Card key={project.id} sx={{ borderRadius: 3 }} className="project-card">
            <CardHeader
              title={project.topic}
              subheader={project.student.graduationYear}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Student: {project.student.firstname + " " + project.student.lastname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mentor: {project.mentor.firstname} {project.mentor.lastname}
              </Typography><br/>
              <Typography variant="body2" color="text.secondary">
                {project.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button className="open-project-button" size="small" onClick={() => goToProjectPage(project.id)}>Open Project</Button>
            </CardActions>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default HomePage;
