import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Icon, Button, Card, Rating, } from 'semantic-ui-react';
import CommentsForm from './CommentsForm';


class Comments extends React.Component {
  state = { comments: [], showForm: false }

  componentDidMount() {
    const { id } = this.props
    axios.get(`/api/posts/${id}/comments`)
      .then(res => {
        this.setState({ comments: res.data })
      })
  };

  showForm = () => this.setState({ showForm: !this.state.showForm })

  addcomment = (comment) => {
    this.setState({ comments: [comment, ...this.state.comments] })
  };

  renderForm = () => {
    const { showForm } = this.state
    if (showForm)
      return (
        <commentForm
          add
          post_id={this.props.id}
          addcomment={this.addcomment}
          toggle={this.showForm}
        />
      )
    return null
  };

  deletecomment = (c_id) => {
    axios.delete(`/api/posts/${this.props.id}/comments/${c_id}`)
      .then(res => {
        const comments = this.state.comments.filter(c => {
          if (c.id !== c_id)
            return c;
        })
        this.setState({ comments, });
      })
  };


  displaycomments = () => {
    const { post_id } = this.props.id
    return this.state.comments.map(r => (
      <Card fluid>
        <Card.Content>
          <Rating
            rating={c.rating}
            defaultRating={5}
            maxRating={5}
            disabled
            icon="star"
            size="massive"
          />
        </Card.Content>
        <Card.Content>
          <Card.Header>{c.title}</Card.Header>
          <Card.Description>{c.body}</Card.Description>
          <Card.Meta>{c.author}</Card.Meta>
          <div style={{ display: 'flex', alignSelf: 'flex-end', marginTop: '10px', width: '100px' }}>
            <Button icon color="red" onClick={() => this.deletecomment(c.id)}>
              <Icon name="trash" />
            </Button>
            <Link to={{
              pathname: `/comment/${r.id}/edit`,
              state: {
                post_id: this.props.id,
              }
            }}
            >
              <Button icon color="blue">
                <Icon name="edit" />
              </Button>
            </Link>
          </div>
        </Card.Content>
      </Card>
    ))
  };

  render() {
    return (
      <div style={{ marginTop: '30px' }}>
        <hr />
        <h1>Product comments</h1>
        <Button color='teal' onClick={this.showForm}>
          <Icon name='comment alternate outline' />
          Write a Comment
        </Button>
        {this.renderForm()}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '30px' }}>
          <Card.Group postsPerRow={3}>
            {this.displaycomments()}
          </Card.Group>
        </div>
      </div>
    )
  };
};

export default Comments;