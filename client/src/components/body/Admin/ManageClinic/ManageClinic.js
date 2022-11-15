import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../utils/Loading/Loading";
import { getAllClinic,getDetailClinic } from "../../../../redux/actions/clinicAction";

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      name: "",
      address: "",
      fileUrl: "",
      loading: false,
      idClinic: null,
    };
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevState.idClinic !== this.state.idClinic) {
      this.getDetailClinic();
    }
    if (prevProps.clinic.name !== this.props.clinic.name) {
      let { clinic } = this.props;
      this.setState({
        contentMarkdown: clinic.descriptionMarkdown,
        contentHTML: clinic.descriptionHTML,
        name: clinic.name,
        fileUrl: clinic.image,
        address: clinic.address,
      });
    }
  }
  getIdClinic = (id) => {
    this.setState({
      idClinic: id,
    });
  };
  getAllClinic = () => {
    this.props.getAllClinic();
  };
  getDetailClinic = () => {
    this.props.getDetailClinic(this.state.idClinic);
  };
  componentDidMount() {
    this.getAllClinic();
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
    let { name, contentHTML, contentMarkdown, fileUrl, address, idClinic } =
      this.state;
    try {
      const res = await axios.post(
        "/api/create-clinic",
        {
          name,
          descriptionHTML: contentHTML,
          descriptionMarkdown: contentMarkdown,
          image: fileUrl,
          address,
          id: idClinic,
        },
        {
          headers: { Authorization: this.props.token },
        }
      );
      this.getAllClinic();
      toast.success(res.data.msg);
    } catch (err) {
      this.getAllClinic();
      toast.error(err.response.data.msg);
    }
  };
  handleDelete = async (id) => {
    try {
      let res = await axios.delete(`/api/delete-clinic/${id}`, {
        headers: { Authorization: this.props.token },
      });
      this.getAllClinic();
      toast.success(res.data.msg);
    } catch (err) {
      this.getAllClinic();
      toast.success(err.response.data.msg);
    }
  };

  handleClearInput = () => {
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      name: "",
      address: "",
      fileUrl: "",
      idClinic: null,
    });
  }
  render() {
    let { fileUrl } = this.state;
    let { clinics } = this.props;
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
                  <h5 className="modal-title">List Clinic</h5>
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
                        <th>Name Clinic</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clinics &&
                        clinics.length > 0 &&
                        clinics.map((item, index) => {
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
                                      onClick={() => this.getIdClinic(item._id)}
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

        <h2 className="text-center pt-3">Manage Clinic</h2>
        <div className="row">
          <div className="col-6">
            <Link to="/" className="btn btn-info my-4 ml-5">
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
                List Clinic
              </button>
            </div>
          </div>
        </div>

        <div className="select-doctor">
          <div className="row px-3">
            <div className="left col-6">
              <label htmlFor="text-left">Name Clinic :</label>
              <input
                onChange={(e) => this.handleChangeInput(e)}
                type="text"
                name="name"
                id="text-left"
                value={this.state.name}
              />
            </div>
            <div className="right col-6">
              <label htmlFor="select-right">Image Clinic :</label>
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
          <div className="row px-3 py-3">
            <div className="left col-6">
              <label htmlFor="text-left">Address clinic:</label>
              <input
                onChange={(e) => this.handleChangeInput(e)}
                type="text"
                name="address"
                id="text-left"
                value={this.state.address}
              />
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
  clinics: state.clinic.clinics,
  clinic: state.clinic.clinic
});

const mapDispatchToProps = {
  getAllClinic,
  getDetailClinic,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
