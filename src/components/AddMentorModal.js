import {useState} from 'react';
import Typography from '@mui/material/Typography';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

const AddMentorModal = ({submitMentor}) => {
  const [mentorFirstName, setMentorFirstName] = useState();
  const [mentorLastName, setMentorLastName] = useState();
  const [mentorFaculty, setMentorFaculty] = useState();
  const [mentorTitle, setMentorTitle] = useState();
  const [mentorDiscipline, setMentorDiscipline] = useState();

  const handleMentorSubmit = () => {
    submitMentor(mentorFirstName, mentorLastName, mentorFaculty, mentorTitle, mentorDiscipline)
  }

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Fill mentor info
      </Typography><br/>
      <TextField label="First name"
                 onChange={(e) => setMentorFirstName(e.target.value)}></TextField><br/><br/>
      <TextField label="Last name"
                 onChange={(e) => setMentorLastName(e.target.value)}></TextField><br/><br/>
      <TextField label="Faculty"
                 onChange={(e) => setMentorFaculty(e.target.value)}></TextField><br/><br/>
      <TextField label="Title"
                 onChange={(e) => setMentorTitle(e.target.value)}></TextField><br/><br/>
      <TextField label="Discipline"
                 onChange={(e) => setMentorDiscipline(e.target.value)}></TextField><br/><br/>
      <Button onClick={handleMentorSubmit}>Add Mentor</Button>
    </>
  )

}

export default AddMentorModal;
