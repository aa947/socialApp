import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from './EditDetails';


import ProfileSkeleton from "../util/ProfileSkeleton";
// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { IconButton, Tooltip } from "@material-ui/core";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';

const styles = {
    paper: {
        padding: 20
    },
    profile_image: {
        width: "100%",
        // height: 200,
        objectFit: "cover",
        maxWidth: "100%"
        //  borderRadius: '50%'
    },
    image_wrapper: {
        textAlign: "center",
        position: "relative"

    },
    button: {
        //  position: "absolute",
        //    top:  "67%",
        //     left: "70%"
    },
    hr: {
        // border: "none",
        margin: "10px auto 10px auto",
        width: "80%",
    },
    profile: {
        "& .profile-details": {
            textAlign: "center",
            "& span, svg": {
                verticalAlign: "middle"
            }
            // '& a': {
            //   color: theme.palette.primary.main
            // }
        },

        "& svg.button": {
            "&:hover": {
                cursor: "pointer"
            }
        }
    },
    buttons: {
        textAlign: "center",
        "& a": {
            margin: "20px 10px"
        }
    }
};

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };
    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.image_wrapper}>
                        <img
                            id="profile_img"
                            src={imageUrl}
                            className={classes.profile_image}
                            alt="profile"
                        />

                        <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={this.handleImageChange}
                        />

                        <br />
                        <MuiLink component={Link} to={`/users/${handle}`} variant="h5">
                            @{handle}
                        </MuiLink>

                      
                        <br /> <br />
                        {bio && <Typography variant="body2">{bio} <br /> <br /> <br /> </Typography>}

                        {location && (
                            <Fragment>
                                <LocationOn color="primary" /> <span>{location}</span>
                            </Fragment>
                        )}
                        <hr className={classes.hr} />
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {" "}
                                    {website}
                                </a>
                                <hr className={classes.hr} />
                            </Fragment>
                        )}
                        <CalendarToday color="primary" />{" "}
                        <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                        <hr className={classes.hr} />
                        <Tooltip title="Logout" placement="top">
                            <IconButton onClick={this.handleLogout} >

                                <KeyboardReturn color="primary" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="change profile photo" placement="top" >
                            <IconButton onClick={this.handleEditPicture} className={classes.button}>
                                <AccountBoxSharpIcon color="primary"></AccountBoxSharpIcon>
                            </IconButton>
                        </Tooltip>

                        <EditDetails />

                    </div>
                </Paper>
            ) : (
                    <Paper className={classes.paper}>
                        <Typography variant="body2" align="center">
                            No profile found, please login again
          </Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/login"
                            >
                                Login
            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                component={Link}
                                to="/signup"
                            >
                                Signup
            </Button>
                        </div>
                    </Paper>
                )
        ) : (
                <p>loading ..</p>
            );

        return profileMarkup;
    }
}

const mapStateToProps = state => ({
    user: state.user
});

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
};

const mapActionsToProps = { logoutUser, uploadImage }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
