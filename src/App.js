import React, { Component } from 'react';
import './App.css';
import AvatarEditor from 'react-avatar-editor'

class App extends Component {

  editor;
  previewImageRef = React.createRef();

  state = {
    zoom: 1,
    rotate: 0,
    radius: 0,
    size: 400,
    file: null,
    previewUrl: ''
  }

  onZoomChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onRotateChange = (event) => {
    event.persist();
    let angle = this.state.rotate;
    if (event.target.name == 'left')
      angle -= 90;
    else
      angle += 90;
    this.setState({ rotate: angle })
  }

  onRadiusChange = (event) => {
    event.persist();
    this.setState({ radius: event.target.value });
  }

  onFileSelectChange = (event) => {
    event.persist();
    let selectedFile = event.target.files[0];
    this.setState({ file: selectedFile });
  }

  downloadBlob = (fileName, blob) => {
    blob.lastModifiedDate = new Date();
    blob.name = fileName;
    let url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName;
    a.click();
  }

  saveImage = (editor) => {
    if (this.editor) {
      this.editor.getImage()
        .toBlob((blob) => {
          let url = URL.createObjectURL(blob);
          this.previewImageRef.current.src = url;
          this.downloadBlob("cropped.png", blob);
        });
      return;
    }
  }

  setEditorRef = (editor) => this.editor = editor

  render() {
    return (
      <div className="App">
        <h1>React Avatar Editor</h1>
        <div style={{display: 'inline-block'}}>
          <AvatarEditor
            ref={this.setEditorRef}
            // image="https://image.freepik.com/free-vector/children-group-back-school_1012-224.jpg"
            image={this.state.file}
            width={this.state.size}
            height={this.state.size}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            borderRadius={this.state.radius}
            border={0}
            color={[0, 0, 0, 1]}
            rotate={this.state.rotate}
            scale={this.state.zoom}
            className="avatar_editor"
          />
          <span>Image preview</span>
          <img ref={this.previewImageRef} src={this.state.previewUrl}  width="400" height="400" />
        </div>
        <div>
          <label>File</label>
          <input type="file" name="file" onChange={this.onFileSelectChange} />
        </div>
        <div className="controls_box">
          <div>
            <label>Zoom</label>
            <input type="range" min="1" max="50" value={this.state.zoom} onChange={this.onZoomChange} name="zoom" />
          </div>
          <div>
            <label>Rotate</label>
            <button name="left" onClick={this.onRotateChange}>Left</button>
            <button name="right" onClick={this.onRotateChange}>Right</button>
          </div>
          <div>
            <label>Radius</label>
            <input type="range" min="1" max={this.state.size / 2} value={this.state.radius} onChange={this.onRadiusChange} name="radius" />
          </div>
        </div>
        <button onClick={this.saveImage}>Save Image</button>
      </div>
    );
  }

}

export default App;
