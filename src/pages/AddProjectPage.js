import HorizontalLinearStepper from "../components/HorizontalLinearStepper";
import {Container} from "@mui/material";

const AddProjectPage = () => {
    return (
      <>
        <Container className="stepper-container">
          <HorizontalLinearStepper></HorizontalLinearStepper>
        </Container>
      </>
    );
  }

export default AddProjectPage;
