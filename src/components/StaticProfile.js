import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

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

const StaticProfile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location }
  } = props;

  return (
    <Fragment>
    <p style={{textAlign:'center'}}> {handle} Profile</p>
    <Paper className={classes.paper}>
                    

      <div className={classes.profile}>
        <div className={classes.image_wrapper}>
          <img src={imageUrl} alt="profile" className={classes.profile_image} />
        </div>
        <hr className={classes.hr} />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <br /> <br />
          {/* <hr className={classes.hr} /> */}
          {bio && <Typography  variant="body2">{bio}</Typography>}
         <br /> <br /> 
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr className={classes.hr} />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {' '}
                {website}
              </a>
              <hr className={classes.hr} />
            </Fragment>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
    </Fragment>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);