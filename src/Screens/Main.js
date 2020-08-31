import React from "react";
import '../App.css';
import { Box, TextField, Button, Typography, Card, CardContent, Avatar, Dialog, DialogContent, DialogContentText, DialogActions, Tooltip, IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUsersPageOne, getUsersPageTwo, addUser, deleteUser, updateUser } from "../Actions/userAction";
const myAvatar = require("../Assets/avt.js");
class Main extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            open: false,
            all_users: {}
        };
    }
    static getDerivedStateFromProps(props, state) {
        console.log("PROPS: ",props,"STATE: ",state);
        if (props.all_users !== state.all_users) {
            state.all_users = props.all_users;
            return { all_users: props.all_users }
        }
        else {
            state.all_users = props.all_users;
            return { all_users: props.all_users }
        }
    }
    componentDidMount() {
        if (this.props.all_users.length === undefined || this.props.all_users.length === 0) {
            this.props.getUsersPageOne();
        }
    }
    handleChange = event => {
        this.setState({ searchString: event.target.value.trim().toLowerCase() });
    }
    handleFirstNameChange = event => {
        this.setState({ first_name: event.target.value });
    }
    handleLastNameChange = event => {
        this.setState({ last_name: event.target.value });
    }
    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    }
    handleUpdateUsers = (index) => {
        this.props.updateUser({
            id: index.id,
            first_name: (this.state.first_name) ? this.state.first_name : index.first_name,
            last_name: this.state.last_name ? this.state.last_name : index.last_name,
            email: this.state.email ? this.state.email : index.email,
        })
        this.handleClose();
        setTimeout(() => { window.location.reload(true) }, 2700);
    }
    handleAddUser = (event) => {
        event.preventDefault();
        this.props.addUser({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            avatar: myAvatar.default
        })
        this.setState({
            first_name: "",
            last_name: "",
            email: "",
        })
        setTimeout(() => { window.location.reload(true) }, 2700);
    }
    handleDelete = (id) => {
        this.props.deleteUser(id);
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    };
    render() {
        return (
            <Box>
                <form className="add-person" noValidate autoComplete="off" onSubmit={this.handleAddUser}>
                    <TextField required label="First name" className="input-text" onChange={this.handleFirstNameChange} />
                    <TextField required label="Last name" className="input-text" onChange={this.handleLastNameChange} />
                    <TextField required label="Email" className="input-text" onChange={this.handleEmailChange} />
                    <Button color="primary" type="submit">Add person</Button>
                </form>
                <Box className="grid-container">
                    <Box className="grid-row">
                        <Box className="grid-row">
                            {
                                (undefined !== this.props.all_users && this.props.all_users.length) ? this.state.all_users.map(index => {
                                    return <Card className="card-root" variant="outlined" key={index.id}>
                                        <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Avatar alt={index.first_name} src={index.avatar} />
                                            <Typography variant="h5" component="h2">
                                                {index.first_name}&nbsp;{index.last_name}
                                            </Typography>
                                            <Tooltip title="Edit" aria-label="edit" arrow>
                                                <IconButton aria-label="edit" onClick={this.handleClickOpen}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Dialog
                                                    open={this.state.open}
                                                    onClose={this.handleClose}>
                                                    <DialogContent>
                                                        <DialogContentText style={{ width: '100%' }}>First Name</DialogContentText>
                                                        <TextField type="text" className="field-input" defaultValue={index.first_name} onChange={this.handleFirstNameChange} />
                                                    </DialogContent>
                                                    <DialogContent>
                                                        <DialogContentText style={{ width: '100%' }}>Last Name</DialogContentText>
                                                        <TextField type="text" className="field-input" defaultValue={index.last_name} onChange={this.handleLastNameChange} />
                                                    </DialogContent>
                                                    <DialogContent>
                                                        <DialogContentText style={{ width: '100%' }}>Email</DialogContentText>
                                                        <TextField type="text" className="field-input" defaultValue={index.email} onChange={this.handleEmailChange} />
                                                    </DialogContent>
                                                    <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                                                        <Button color="primary" onClick={() => this.handleUpdateUsers(index)}>Update User</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            <Tooltip title="Delete" aria-label="delete" arrow>
                                                <IconButton aria-label="delete" onClick={() => this.handleDelete(index.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </CardContent>
                                    </Card>
                                }) : null
                            }
                        </Box>
                    </Box>
                </Box>
                <Box style={{ display:'flex', justifyContent: 'space-between'}}>
                        <Button onClick={()=>this.props.getUsersPageOne()}>{"<"}Page 1</Button>
                        <Button onClick={()=>this.props.getUsersPageTwo()}>Page 2 {">"}</Button>
                </Box>
            </Box>
        )
    }
}
const mapStateToProps = state => {
    const { user } = state;
    const { all_users } = user;
    return ({ all_users })
};
export default connect(mapStateToProps, { getUsersPageOne, getUsersPageTwo, addUser, deleteUser, updateUser })(withRouter(Main));