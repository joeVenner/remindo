import React,{useState,useEffect} from 'react';
import {Button,TextField,Accordion,AccordionSummary,Typography,AccordionDetails,Container,Grid,MenuItem,Menu} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../css/Todo.css';
import Task from '../images/task';
import UpdateTodoWithStepper from './EditTodo';


function Todo() {
    const [todos,setTodos] = useState([]);
    const [Title,setTitle] = useState('');
    const [Description,setDescription] = useState('');
    const [anchorEl,setAnchorEl] = useState(null);
    const [level,setLevel] = useState("normal");
    const [updatetodo,setupdatetodo] = useState();
    const [displayV,setDisplayV] = useState("block");



    const addTodo = (event) =>{
        event.preventDefault();
        if(event.target[0].value!==""){ 
            const cid = todos.length; 
            setTodos([...todos,{id:cid,"title":Title,"Description":Description,"Level":level}]);
            setLevel("normal");
        }
        setTitle("")
        setDescription("")
        
    }
    const handlechangeLevel = (event) =>{
        setAnchorEl(event.currentTarget);
    }
    const handlecloseLevel = (event)=>{
        setLevel(event.nativeEvent.target.outerText);
        setAnchorEl(null);
        
    }
    const handlechangeTitle = e=>{
        setTitle(e.target.value);
      };

    const handlechangeDescription = e=>{
        setDescription(e.target.value);
      };
    const ChangeTodo = (data)=>{
        setDisplayV(data);
    }
    const editTodo = (id)=>{
        setDisplayV("none");
        setupdatetodo(<UpdateTodoWithStepper id={id} displayV={displayV} switchtodo={ChangeTodo}/>);
    }
    const deleteTodo = (id)=>{
        var newTodos = todos.filter((todo)=>todo.id !== id);
        setTodos(newTodos);
    }

    const TodosList = todos.map((todo,index)=>
        
        <div className="todo">
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={1}
        >
        <Grid item xs={8} sm={8}>
        <Accordion style={{"width":"100%"}} value={todo} className={todo.Level === "High" ? "red" : "gray" }>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <Typography >{todo.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
                        <Typography>
                            {todo.Description}
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                    <Button color="primary" 
                            onClick={()=>editTodo(todo.id)} 
                            variant="contained" id={todo.id}>
                                Edit
                    </Button>  
                </Grid>
                <Grid item xs={2} sm={2}>  
                <Button 
                    variant="contained" 
                    color="secondary" 
                    id={todo.id} onClick={()=>deleteTodo(todo.id)} >
                        Delete
                </Button>  
                </Grid>
            </Grid>
            </div>
            
            )

            return (
                <div>
    <Container  maxWidth="sm">
        <Grid container className="title">
        <Grid item xs={5} >

        <h1 >
            What to Do? 
        </h1>
        </Grid >
        <Grid item xs={3}>
        <Task />

        </Grid>
        </Grid>

            <form onSubmit={addTodo}>  
        <Grid className="add" container spacing={1} 
                        direction="row"
                        display="flex"
                        justify="space-between"
                        alignItems="center"
                        >
            <Grid item xs={3} sm={3}>
                <TextField className="text_todo" id="outlined-basic" label="Todo Title" variant="outlined" value={Title} onChange={handlechangeTitle} />
            </Grid>
            <Grid item xs={4} sm={4}>
                <TextField id="outlined-basic" label="Short Description" variant="outlined" value={Description} onChange={handlechangeDescription} />
            </Grid>
            <Grid item xs={3} sm={3}>
                <Button aria-controls="simple-menu" aria-haspopup="true" variant="contained" color="secondary"  onClick={handlechangeLevel}>
                    Importance 
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handlecloseLevel}                    
                    >
                    <MenuItem data={0} onClick={handlecloseLevel}>High</MenuItem>
                    <MenuItem  data={1} onClick={handlecloseLevel}>Normal</MenuItem>
                </Menu>
            </Grid>
            <Grid item xs={2} sm={2}>
                <Button variant="contained" color="primary" type="submit">ADD</Button>
            </Grid>
        </Grid>
            </form>
     
        
        <div className="todos_backgroud">
         <ul style={{paddingLeft:0}}>
            <div>
            {displayV == "block" ? 
            TodosList
                :
            updatetodo}
            </div>
        </ul>
        </div> 
        
    </Container>
        </div>
    )
}

export default Todo;
