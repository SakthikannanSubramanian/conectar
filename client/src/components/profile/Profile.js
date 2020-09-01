import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../layout/Loading";
import { getProfileById } from "../../redux/actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGitHub from "./ProfileGitHub";

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experiences</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((exp, index) => (
                    <ProfileExperience key={index} experience={exp} />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience as of now</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((edu, index) => (
                    <ProfileEducation key={index} education={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education recorded</h4>
              )}
            </div>
            <div className="profile-github">
              <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> Github Repos
              </h2>
              {profile.githubusername && (
                <ProfileGitHub username={profile.githubusername} />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getProfileById: (id) => dispatch(getProfileById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
