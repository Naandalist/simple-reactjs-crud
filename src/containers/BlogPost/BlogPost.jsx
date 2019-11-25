import React, { Component } from "react";
import Axios from 'axios';
import "./BlogPost.css";
import CardPost from "../../components/cardPost/CardPost";

class BlogPost extends Component {
  state = {
    post: [],
    formBlogPost:{
      "userId": 1,
      "id": 0,
      "title": "",
      "body": "",
    },
    isUpdate: false,

  };
  getPostAPI =() =>{
    Axios.get('http://localhost:4000/posts')
    .then((response)=>{
        console.log(response.data)
        this.setState({
            post: response.data
        })
    })
  }
  postdataAPI =() =>{
    Axios.post('http://localhost:4000/posts', this.state.formBlogPost)
      .then((response)=>{
        this.getPostAPI()
        console.log(response)
        this.setState({
          formBlogPost:{
            "userId": 1,
            "id": 0,
            "title": "",
            "body": "",
          },
        })
      }, (error)=>{
        console.log('error: ',error)
      })
  }
  putDataAPI = (id) => {
      Axios.put(`http://localhost:4000/posts/${this.state.formBlogPost.id}`, this.state.formBlogPost)
        .then((result)=>{
          console.log(result)
          this.getPostAPI()
          this.setState({
            formBlogPost:{
              "userId": 1,
              "id": 0,
              "title": "",
              "body": "",
            },
            isUpdate: false
          })
        },(error)=>{
          console.log(error)
      })
  }

  handleRemove = (id) =>{
    //console.log(id)
    Axios.delete(`http://localhost:4000/posts/${id}`)
        .then((result)=>{
            this.getPostAPI()
            console.log('SUCCESS: ', result)
        })
  }
  handleUpdate = (data) => {
    console.log('data: ', data)
    this.setState({
      formBlogPost : data,
      isUpdate : true
    })
  }

  handleFormChange = (event) =>{
    let formBlogPostNew = {...this.state.formBlogPost}
    let timestamp = new Date().getTime()
    if (!this.state.isUpdate){
      formBlogPostNew['id'] = timestamp;
    }
    formBlogPostNew[event.target.name] = event.target.value
    this.setState({
      formBlogPost : formBlogPostNew
    })
  }

  handleSubmit = () => {
    console.log('Handle Submit: ',this.state.formBlogPost)
    
    if (this.state.isUpdate){
      this.putDataAPI()
    } else {
      this.postdataAPI()
    }

  }

  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then(response => response.json())
    //   .then(json => {
    //     console.log(json);
    //     this.setState({
    //       post: json
    //     });
    //   });

    this.getPostAPI()
  }
  render() {
    let status= this.state.isUpdate ? 'Update' : 'Add'
    return (
      <>
        <div className="nav-header center">
          <p>Blog Post</p>
        </div>
        <p className="section-title"> {`Blog Post ${status}`} </p>
        <div className="form-add-post form-data">
            <label htmlFor="title">Title</label><br/>
            <input onChange={this.handleFormChange} value={this.state.formBlogPost.title} type="text" name="title" placeholder="add data"/>
            <label htmlFor="body">Blog Content</label><br/>
            <textarea onChange={this.handleFormChange} value={this.state.formBlogPost.body} name="body" id="body" cols="30" rows="10"></textarea>
            <button onClick={this.handleSubmit} className="btn-submit">Simpan</button>
            
        </div>

        {this.state.post.map((element, index) => {
          return <CardPost
           key={index}
           title={element.title}
           desc={element.body}
           data={element}
           remove={this.handleRemove}
           update={this.handleUpdate}
           />;
        })}
      </>
    );
  }
}
export default BlogPost;
