import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import axiosClient from "../api/axiosClient";
import Modal from "@mui/material/Modal";
import AddMentorModal from "./AddMentorModal";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const steps = ['Project information', 'Upload Project File', 'Student Information', 'Mentor information'];

const GET_MENTORS_URL = "/api/mentors";
const ADD_PROJECT_URL = "/api/inspector/projects";
const ADD_PROJECT_FILE_URL = "/api/inspector/projects/upload";
const ADD_MENTOR = "/api/mentors";

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const [mentors, setMentors] = useState();
  const [selectedMentor, setSelectedMentor] = useState();

  const [topic, setTopic] = useState();
  const [subject, setSubject] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [commission, setCommission] = useState();
  const [reviewer, setReviewer] = useState();
  const [review, setReview] = useState();
  const [projectFile, setProjectFile] = useState();
  const [projectFileName, setProjectFileName] = useState();

  const [studentFirstName, setStudentFirstName] = useState();
  const [studentLastName, setStudentLastName] = useState();
  const [studentFaculty, setStudentFaculty] = useState();
  const [studentSpecialty, setStudentSpecialty] = useState();
  const [studentFacultyGroup, setStudentFacultyGroup] = useState();
  const [studentFacultyNumber, setStudentFacultyNumber] = useState();
  const [studentEducationalDegree, setStudentEducationalDegree] = useState();
  const [studentGraduationYear, setStudentGraduationYear] = useState();

  const [openModal, setOpenModal] = useState(false);

  const handleGetMentors = async() => {
    try {
      const response = await axiosClient.get(GET_MENTORS_URL);
	  console.log(response);
      setMentors(response.data.content);
    } catch(err) {
      console.error(err);
    }

  }

  useEffect(() => {
    handleGetMentors();
  }, []);

  useEffect(() => {}, [mentors]);

  useEffect(() => {console.log(selectedMentor)}, [selectedMentor]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      handleSubmit().then(setSelectedMentor(null));
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        topic: topic,
        subject: subject,
        type: type,
        description: description,
        commission: commission,
        reviewer: reviewer,
        review: review,
        student: {
          firstName: studentFirstName,
          lastName: studentLastName,
          faculty: studentFaculty,
          specialty: studentSpecialty,
          facultyGroup: studentFacultyGroup,
          facultyNumber: studentFacultyNumber,
          educationalDegree: studentEducationalDegree,
          graduationYear: studentGraduationYear
        },
        mentorId: selectedMentor.id
      };
      const response1 = await axiosClient.post(ADD_PROJECT_URL, payload);
      const formData = new FormData();
      formData.append("file", projectFile);
      formData.append("projectId", response1.data.id);
      console.log(response1);
      const response2 = await axiosClient.post(ADD_PROJECT_FILE_URL, formData);
    } catch (err) {
      console.error(err);
    }

  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const addNewMentor = () => {
    handleOpenModal();
  }

  const submitAddMentor = async (mentorFirstName, mentorLastName, mentorFaculty, mentorTitle, mentorDiscipline) => {
    try {
      const response = await axiosClient.post(ADD_MENTOR, {mentorFirstName, mentorLastName, mentorFaculty, mentorTitle, mentorDiscipline});
      if (response.status === 200) {
        console.log("successfully added mentor");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleMentorSubmit = (mentorFirstName, mentorLastName, mentorFaculty, mentorTitle, mentorDiscipline) => {
    submitAddMentor(mentorFirstName, mentorLastName, mentorFaculty, mentorTitle, mentorDiscipline)
      .then(setMentors([]))
      .then(handleGetMentors())
      .then(handleCloseModal());
  }

  const handleFileInput = (file, fileName) => {
    setProjectFile(file);
    setProjectFileName(fileName);
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Project info submitted <br/>
              If you want to create another project press reset
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            {activeStep === 0 ?
              <><br/><br/>
                <TextField id="topic standard-basic" label="Topic" variant="standard" type="text"
                           onChange={(e)=>setTopic(e.target.value)}/>
                <br/><br/>
                <TextField id="subject standard-basic" label="Subject" variant="standard" type="text"
                           onChange={(e)=>setSubject(e.target.value)}/>
                <br/><br/>
                <TextField id="type standard-basic" label="Type" variant="standard" type="text"
                           onChange={(e)=>setType(e.target.value)}/>
                <br/><br/>
                <TextField id="description standard-basic" label="Description" variant="outlined" type="text"
                           multiline sx={{width: 500, maxWidth: '100%',}}
                           onChange={(e)=>setDescription(e.target.value)}/>
                <br/><br/>
                <TextField id="commission standard-basic" label="Commission" variant="outlined" type="text"
                           multiline sx={{width: 500, maxWidth: '100%',}}
                           onChange={(e)=>setCommission(e.target.value)}/>
                <br/><br/>
                <TextField id="reviewer standard-basic" label="Reviewer" variant="standard" type="text"
                           onChange={(e) => setReviewer(e.target.value)}/>
                <br/><br/>
                <TextField id="review standard-basic" label="Review" variant="outlined" type="text"
                           multiline sx={{width: 500, maxWidth: '100%',}}
                           onChange={(e)=>setReview(e.target.value)}/>
                <br/><br/>
              </>
              : activeStep === 1 ?
                <>
                  <br/><br/>
                  <Button variant="outlined" component="label">
                    Upload Project File
                    <input type="file" accept="application/pdf" hidden
                           onChange={(e) => handleFileInput(e.target.files[0], e.target.value)}/>
                  </Button>
                  <br/><br/>
                  {projectFileName ? <Typography>{projectFileName.substr(projectFileName.lastIndexOf("\\") + 1, projectFileName.length)}</Typography> : null}
                  <br/><br/>
                </>
                : activeStep === 2 ?
                <>
                  <br/><br/>
                  <TextField id="firstName standard-basic" label="First name" variant="standard" type="text"
                             onChange={(e)=>setStudentFirstName(e.target.value)}/>
                  <br/><br/>
                  <TextField id="lastName standard-basic" label="Last name" variant="standard" type="text"
                             onChange={(e)=>setStudentLastName(e.target.value)}/>
                  <br/><br/>
                  <TextField id="faculty standard-basic" label="Faculty" variant="standard" type="text"
                             onChange={(e)=>setStudentFaculty(e.target.value)}/>
                  <br/><br/>
                  <TextField id="specialty standard-basic" label="Specialty" variant="standard" type="text"
                             onChange={(e)=>setStudentSpecialty(e.target.value)}/>
                  <br/><br/>
                  <TextField id="facultyGroup standard-basic" label="Faculty Group" variant="standard" type="text"
                             onChange={(e)=>setStudentFacultyGroup(e.target.value)}/>
                  <br/><br/>
                  <TextField id="facultyNumber standard-basic" label="Faculty Number" variant="standard" type="text"
                             onChange={(e)=>setStudentFacultyNumber(e.target.value)}/>
                  <br/><br/>
                  <TextField id="educationalDegree standard-basic" label="Educational Degree" variant="standard" type="text"
                             onChange={(e)=>setStudentEducationalDegree(e.target.value)}/>
                  <br/><br/>
                  <TextField id="graduationYear standard-basic" label="Graduation Year" variant="standard" type="text"
                             onChange={(e)=>setStudentGraduationYear(e.target.value)}/>
                  <br/><br/><br/><br/>
                </>
                :
                <>
                  <br/><br/>
                    <InputLabel id="demo-simple-select-label">Select Mentor from the Dropdown menu</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select mentor for the project"
                      onChange={(e) => setSelectedMentor(e.target.value)}
                    >
                        {mentors?.map(mentor => (
                          <MenuItem key={mentor.id} value={mentor}> {mentor.firstname} {mentor.lastname} </MenuItem>
                        ))}
                      <MenuItem key="new" onClick={() => addNewMentor()}> Add new mentor </MenuItem>
                    </Select>
                  <br/><br/>
                  {
                    selectedMentor ?
                      <>
                        <TextField label="First name" inputProps={{readOnly: true}} defaultValue={selectedMentor.firstname}/><br/><br/>
                        <TextField label="Last name" inputProps={{readOnly: true}} defaultValue={selectedMentor.lastname}/><br/><br/>
                        <TextField label="Faculty" inputProps={{readOnly: true}} defaultValue={selectedMentor.faculty}/><br/><br/>
                        <TextField label="Title" inputProps={{readOnly: true}} defaultValue={selectedMentor.title}/><br/><br/>
                        <TextField label="Discipline" inputProps={{readOnly: true}} defaultValue={selectedMentor.disciplines}/>
                      </> : null
                  }
                  <br/><br/>
                </>
            }
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddMentorModal submitMentor={handleMentorSubmit}></AddMentorModal>
        </Box>
      </Modal>
    </>
  );
}