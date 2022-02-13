import React, { Component } from "react";
// This will require to npm install axios
import dataProvider from "../providers/dataProvider";
//import { TextInput,SimpleForm } from 'react-admin';
 
export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeIndexID = this.onChangeIndexID.bind(this);
    this.onChangeIndexName = this.onChangeIndexName.bind(this);
    this.onChangeApplicationName = this.onChangeApplicationName.bind(this);
    this.onChangePolicy = this.onChangePolicy.bind(this);
    this.onChangeDataStream = this.onChangeDataStream.bind(this);
    this.onChangeShard = this.onChangeShard.bind(this);
    this.onChangeReplica = this.onChangeReplica.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      index_id: "",
      index_name: "",
      application_name: "",
      policy: "",
      data_stream: "",
      shard: "",
      replica: "",
    };
  }
 
  // These methods will update the state properties.
  onChangeIndexID(e) {
    this.setState({
      index_id: e.target.value,
    });
  }
 
  onChangeIndexName(e) {
    this.setState({
      index_name: e.target.value,
    });
  }
 
  onChangeApplicationName(e) {
    this.setState({
      application_name: e.target.value,
    });
  }
  onChangePolicy(e) {
    this.setState({
      policy: e.target.value,
    });
  }
  onChangeDataStream(e) {
    this.setState({
      data_stream: e.target.value,
    });
  }
  onChangeShard(e) {
    this.setState({
      shard: e.target.value,
    });
  }
  onChangeReplica(e) {
    this.setState({
      replica: e.target.value,
    });
  }
 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newindex = {
      index_id: this.state.index_id,
      index_name: this.state.index_name,
      application_name: this.state.application_name,
      policy: this.state.policy,
      data_stream: this.state.data_stream,
      shard: this.state.shard,
      replica: this.state.replica,
    };
 
     dataProvider
      .create("http://localhost:27130/inventory/add", newindex)
      .then((res) => console.log(res.data));
 
    // We will empty the state after posting the data to the database
    this.setState({
        index_id: "",
        index_name: "",
        application_name: "",
        policy: "",
        data_stream: "",
        shard: "",
        replica: "",
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
        <div>
        <h3 align="center">Create</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Index ID: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.index_id}
              onChange={this.onChangeIndexID}
            />
          </div>
          <div className="form-group">
            <label>Index Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.index_name}
              onChange={this.onChangeIndexName}
            />
          </div>
          <div className="form-group">
            <label>Application Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.application_name}
              onChange={this.onChangeApplicationName}
            />
          </div>
          <div className="form-group">
            <label>Policy: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.policy}
              onChange={this.onChangePolicy}
            />
          </div>
          <div className="form-group">
            <label>Data Stream: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.data_stream}
              onChange={this.onChangeDataStream}
            />
          </div>
          <div className="form-group">
            <label>Shards: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.shard}
              onChange={this.onChangeShard}
            />
          </div>
          <div className="form-group">
            <label>Replica: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.replica}
              onChange={this.onChangeReplica}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create"
              className="btn btn-primary"
              
            />
          </div>  
        </form>
      </div>
    );
  }
}