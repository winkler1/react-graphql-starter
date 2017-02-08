import React, { Component } from 'react';
//import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// description, image, title
class NewBook extends Component {
  state = {
    authorId: 0, // HARDCODED
    id: new Date().getTime(),
    description: 'aaa',
    image: 'bbb',
    title: 'ccc'
  }

  canSave = () => {
    return this.state.description && this.state.image && this.state.title
  }

  // Calls `this.props.mutate` function.
  handleSave = () => {
    const {authorId, id, description, image, title} = this.state;
    this.props.mutate({variables: {authorId, id, description, image, title}})
      .then(()=> {
        console.log("Saved book!");
        this.handleCancel()
      })
  }

  handleCancel = () => {
    this.props.router.replace('/')
  }

  render() {
    return (
      <div style={{padding: "20px"}}>
        <input
          autoFocus
          size={75}
          value={this.state.title}
          placeholder='Title'
          onChange={(e) => this.setState({title: e.target.value})}
        />
        <br/>
        <br/>
        <textarea
          cols={73}
          rows={3}
          value={this.state.description}
          placeholder='description'
          type="text"
          onChange={(e) => this.setState({description: e.target.value})}
        />
        <br/>
        <br/>
        <input
          value={this.state.image}
          placeholder='Image URL'
          size={75}
          onChange={(e) => this.setState({image: e.target.value})}
        />
        <br/>
        <br/>
        <div>
          <button onClick={this.handleCancel}>Cancel</button>
          {this.canSave()
            ? <button onClick={this.handleSave}>Save</button>
            : <button disabled>Save</button>
          }
        </div>
      </div>
    );
  }
}

const createBookMutation = gql`
mutation addBook($authorId: String!, $description: String!, $id: String!, $image: String!, $title: String!) {
 addBook(authorId: $authorId, description: $description, id: $id, image: $image, title: $title) {
  book {
   id
  }
 }
}
`;

const NewBookWithMutation = graphql(createBookMutation)(NewBook);

export default NewBookWithMutation;
