import {useLocation} from "react-router-dom";
import {useState, useContext, useEffect, useRef} from "react";
import {UserContext} from "../state-management/store/UserContext";
import Grid from "@mui/material/Grid";
import GridItem from "@mui/material/Grid";
import {Container, Divider, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import CollapsableComment from "../components/CollapsableComment";
import axiosClient from "../api/axiosClient";

const ADD_COMMENT_URL = '/api/comments';
const DOWNLOAD_PROJECT_URL = '/api/projects/download/';
const GET_PROJECT = '/api/projects/'

const ProjectPage = () => {
  const {state} = useLocation();
  const [userContext] = useContext(UserContext);
  const [projectInfo, setProjectInfo] = useState();
  const [commentContent, setCommentContent] = useState("");
  const commentContentRef=useRef(0);

  const fetchProjectInfo = async () => {
    try {
      const response = await axiosClient.get(GET_PROJECT + `${state.id}`);
      setProjectInfo(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchProjectInfo();
  }, []);

  useEffect(() => {}, [projectInfo]);

  const handlePostComment = async () => {
    const requestData = {projectId: projectInfo.id, userId: userContext.id, comment: commentContent}
    commentContentRef.current.value="";
    await axiosClient.post(ADD_COMMENT_URL, requestData).then(setProjectInfo(null)).then(fetchProjectInfo);
  }

  const handleDownloadProject = async () => {
      console.log(DOWNLOAD_PROJECT_URL + `${projectInfo.projectFileName}`);
      axiosClient.get(DOWNLOAD_PROJECT_URL + `${projectInfo.projectFileName}`, {responseType: 'arraybuffer'})
        .then(response => {
          let blob = new Blob([response.data], {type: 'application/pdf'}),
            url = window.URL.createObjectURL(blob)
          window.open(url);
        });
  }

  return(
    <Container maxWidth="lg" style={{backgroundColor: "rgb(255,255,255)", paddingTop: "2px", marginTop: "20px", borderRadius: "15px"}}>
      <h1>{projectInfo?.topic}</h1>
      <span className="lower-opacity-info">Subject:</span> <span className="higher-opacity-info">{projectInfo?.subject}</span><br/><br/>
      <span className="lower-opacity-info">Type:</span> <span className="higher-opacity-info">{projectInfo?.type}</span><br/><br/>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GridItem>
            <h2>Student information:</h2>
            <span className="lower-opacity-info">Name:</span> <span className="higher-opacity-info">{projectInfo?.student.firstname} {projectInfo?.student.lastname}</span><br/><br/>
            <span className="lower-opacity-info">Faculty: </span> <span className="higher-opacity-info">{projectInfo?.student.faculty}</span><br/><br/>
            <span className="lower-opacity-info">Specialty:</span> <span className="higher-opacity-info">{projectInfo?.student.specialty}</span><br/><br/>
            <span className="lower-opacity-info">Faculty Group:</span> <span className="higher-opacity-info">{projectInfo?.student.facultyGroup}</span><br/><br/>
            <span className="lower-opacity-info">Faculty Number:</span> <span className="higher-opacity-info">{projectInfo?.student.facultyNumber}</span><br/><br/>
            <span className="lower-opacity-info">Graduation year:</span> <span className="higher-opacity-info">{projectInfo?.student.graduationYear}</span><br/><br/>
            <span className="lower-opacity-info">Degree:</span> <span className="higher-opacity-info">{projectInfo?.student.educationalDegree}</span><br/><br/>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem>
            <h2>Mentor information:</h2>
            <span className="lower-opacity-info">Name:</span> <span className="higher-opacity-info">{projectInfo?.mentor.firstname} {projectInfo?.mentor.lastname}</span><br/><br/>
            <span className="lower-opacity-info">Title:</span> <span className="higher-opacity-info">{projectInfo?.mentor.title}</span><br/><br/>
            <span className="lower-opacity-info">Faculty: </span> <span className="higher-opacity-info">{projectInfo?.mentor.faculty}</span><br/><br/>
            <span className="lower-opacity-info">Disciplines:</span> <span className="higher-opacity-info">{projectInfo?.mentor.disciplines}</span><br/><br/>
          </GridItem>
        </Grid>
        <Grid item xs={10}>
          <GridItem>
            <h2>Additional information:</h2>
            <span className="lower-opacity-info">Commission: </span> <span className="higher-opacity-info">{projectInfo?.commission}</span><br/><br/>
            <span className="lower-opacity-info">Reviewer: </span> <span className="higher-opacity-info">{projectInfo?.reviewer}</span><br/><br/>
            <span className="lower-opacity-info">Review: </span> <span className="higher-opacity-info">{projectInfo?.review}</span><br/><br/>
            <span className="lower-opacity-info">Description: </span> <span className="higher-opacity-info">{projectInfo?.description}</span><br/><br/>
            <Button variant="contained" onClick={() => handleDownloadProject()}>Download project file</Button>
          </GridItem>
        </Grid>
      </Grid><br/>
      {userContext?.isLoggedIn ?
        <>
          <Divider></Divider>
          <br/>
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            label="Add comment..."
            multiline
            sx={{
              width: 700,
              maxWidth: '100%',
            }}
            maxRows={4}
            onChange={(e) => setCommentContent(e.target.value)}
            ref={commentContentRef}
          />
          <Button variant="outlined" style={{marginLeft: "10px"}}
                  disabled={commentContent === ""}
                  onClick={() => handlePostComment()}>Post comment</Button><br/><br/>
        </>: null
      }
      {projectInfo?.comments?.map(tmpComment => (
        <CollapsableComment tmpComment={tmpComment}/>
      ))}
    </Container>
  )
}

export default ProjectPage;