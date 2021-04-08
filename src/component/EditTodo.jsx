import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import TextField from '@material-ui/core/TextField';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Title', 'Description', 'Importance'];
}


function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Set title';
    case 1:
      return 'Set Description';
    case 2:
      return 'Set importance';
    default:
      return 'Unknown stepIndex';
  }
}

function UpdateTodoWithStepper({id,switchtodo,updatetodo}){
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [display, setDisplay] = useState("block");
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Importance, setImportance] = useState("");
    const [Textvalue, setTextvalue] = useState("");


    const NewTodo = {"id":id,"title":Title,"Description":Description,"Importance":Importance};
    const steps = getSteps();

  const handleNext = () => {
      if(activeStep === steps.length -1){
            setDisplay("none");
            setActiveStep(0);
            switchtodo("block");
            updatetodo(NewTodo);

            
      }
      else{
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      setTextvalue("");

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setTextvalue("");
  };

  const handleReset = () => {
    setActiveStep(0);
    setTextvalue("");
  };
  const handleChange = (e) => {
    activeStep=== 0 ? setTitle(e.target.value) : ( activeStep=== 1 ? setDescription(e.target.value) : setImportance(e.target.value) );
    setTextvalue(e.target.value);
    
    
  };

  return (
    <div style={{"width":"100%","display":display}}>


      <div style={{padding:"55px"}}>
       <TextField id="standard-basic" label={steps[activeStep]} value={Textvalue} onChange={handleChange} />
      </div>

      <div>
      <Stepper style={{backgroundColor:'transparent'}} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Done 😙</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
                color="secondary"
                variant="contained"
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} type="submit">
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default UpdateTodoWithStepper;