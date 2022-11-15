import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../utils/Loading/Loading";
import {
  getAllSpecialty,
  getDetailSpecialty,
} from "../../../../redux/actions/specialtyAction";

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      name: "",
      fileUrl: "",
      loading: false,
      idSpecialty: null,
    };
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevState.idSpecialty !== this.state.idSpecialty) {
      this.getDetailSpecialty();
    }
    if (prevProps.specialty.name !== this.props.specialty.name) {
      let { specialty } = this.props;
      this.setState({
        contentMarkdown: specialty.descriptionMarkdown,
        contentHTML: specialty.descriptionHTML,
        name: specialty.name,
        fileUrl: specialty.image,
      });
    }
  }
  getIdSpecialty = (id) => {
    this.setState({
      idSpecialty: id,
    });
  };
  getAllSpecialty = () => {
    this.props.getAllSpecialty();
  };
  getDetailSpecialty = () => {
    this.props.getDetailSpecialty(this.state.idSpecialty);
  };
  componentDidMount() {
    this.getAllSpecialty();
  }
  changeImage = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) toast.error("No files were uploaded.");

      if (file.size > 1024 * 1024) toast.error("Size too large.");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        toast.error("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      this.setState({
        loading: true,
      });
      const res = await axios.post("/api/upload_image", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: this.props.token,
        },
      });

      this.setState({
        loading: false,
        fileUrl: res.data.url,
      });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  mdParser = new MarkdownIt(/* Markdown-it options */);
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleChangeInput = (e) => {
    const { name, value } = e.target;
    let copyState = { ...this.state };
    copyState[name] = value;
    this.setState({
      ...copyState,
    });
  };
  validate = () => {
    let { name, contentHTML, contentMarkdown, fileUrl } = this.state;
    if (!name || !contentHTML || !contentMarkdown || !fileUrl) {
      toast.error("Missing require paramesters!");
    }
  };
  handleSaveDetail = async () => {
    this.validate();
    let { name, contentHTML, contentMarkdown, fileUrl, idSpecialty } =
      this.state;
    try {
      const res = await axios.post(
        "/api/create-specialty",
        {
          name,
          descriptionHTML: contentHTML,
          descriptionMarkdown: contentMarkdown,
          image: fileUrl,
          id: idSpecialty,
        },
        {
          headers: { Authorization: this.props.token },
        }
      );
      this.getAllSpecialty();
      toast.success(res.data.msg);
    } catch (err) {
      this.getAllSpecialty();
      toast.error(err.response.data.msg);
    }
  };
  handleDelete = async (id) => {
    try {
      let res = await axios.delete(`/api/delete-specialty/${id}`, {
        headers: { Authorization: this.props.token },
      });
      this.getAllSpecialty();
      toast.success(res.data.msg);
    } catch (err) {
      this.getAllSpecialty();
      toast.success(err.response.data.msg);
    }
  };
  handleClearInput = () => {
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      name: "",
      idSpecialty: null,
      fileUrl: ''
    });
  };
  render() {
    let { fileUrl } = this.state;
    let { specialties } = this.props;
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {this.state.loading && <Loading />}
        {/* //Modal list specialty */}
        <div>
          {/* Modal */}
          <div
            className="modal fade"
            id="modelId"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">List specialty</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Name specialty</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specialties &&
                        specialties.length > 0 &&
                        specialties.map((item, index) => {
                          return (
                            <tr>
                              <td scope="row">{index + 1}</td>
                              <td>
                                <img src={item.image} style={{ width: 150 }} />
                              </td>
                              <td>{item.name}</td>
                              <td>
                                <div class="row">
                                  <div className="col-6">
                                    <button
                                      className="btn btn-warning"
                                      data-dismiss="modal"
                                      onClick={() =>
                                        this.getIdSpecialty(item._id)
                                      }
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="col-6">
                                    <button
                                      onClick={() =>
                                        this.handleDelete(item._id)
                                      }
                                      className="btn btn-danger"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-center pt-3">Manage Specialty doctor</h2>
        <div class="row">
          <div className="col-6">
            <Link to="/manage-user" className="btn btn-info my-4 ml-5">
              Back
            </Link>
          </div>
          <div className="col-6">
            <div className="float-right px-5">
              <button
                onClick={() => this.handleClearInput()}
                type="button"
                className="btn btn-success mr-3"
              >
                Clear input
              </button>
              <button
                type="button"
                className="btn btn-info"
                data-toggle="modal"
                data-target="#modelId"
              >
                List specialty
              </button>
            </div>
          </div>
        </div>
        <div className="select-doctor">
          <div className="row px-3">
            <div className="left col-6">
              <label htmlFor="text-left">Name Specialty :</label>
              <input
                onChange={(e) => this.handleChangeInput(e)}
                type="text"
                name="name"
                value={this.state.name}
                id="text-left"
              />
            </div>
            <div className="right col-6">
              <label htmlFor="select-right">Image specialty :</label>
              <input
                onChange={(e) => this.changeImage(e)}
                type="file"
                name="file"
                id="select-right"
              />
              {fileUrl && (
                <img
                  style={{ width: "150px", height: "100px" }}
                  src={fileUrl}
                />
              )}
            </div>
          </div>
        </div>
        <MdEditor
          style={{ height: "500px", padding: "0 5px 50px 5px " }}
          value={this.state.contentMarkdown}
          renderHTML={(text) => this.mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
        <button
          onClick={() => this.handleSaveDetail()}
          className="btn btn-warning my-5 ml-5"
        >
          Save
        </button>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.token,
  users: state.users,
  user: state.user,
  data: state.doctor.data,
  specialties: state.specialty.specialties,
  specialty: state.specialty.specialty,
});

const mapDispatchToProps = {
  getAllSpecialty,
  getDetailSpecialty,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
