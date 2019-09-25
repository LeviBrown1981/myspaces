import React from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'semantic-ui-react';


class PostForm extends React.Component {
  state = { title: '', body: '' }

  componentDidMount() {
    const { match: { params: { id, people_id } } } = this.props
    if (id && people_id)
      axios.get(`/api/peoples/${people_id}/posts/${id}`)
        .then(res => {
          const { title, body, } = res.data
          this.setState({ title, body, })
        })
        .catch(err => {
          console.log(err.response)
        })
  }

  handleChange = (e) => {
    const { target: { title, value } } = e
    this.setState({ [title]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const post = { ...this.state }
    const { match: { params: { id, people_id } } } = this.props
    if (id && people_id) {
      axios.put(`/api/peoples/${people_id}/posts/${id}`, post)
        .then(res => {
          this.props.history.push(`/peoples/${people_id}/posts/${id}`)
        })
    } else {
      axios.post(`/api/peoples/${people_id}/posts`, post)
        .then(res => {
          this.props.history.push(`/peoples/${people_id}`)
        })
    }
  }

  render() {
    const { name, body, } = this.state
    return (
      <Container style={{marginTop: "100px"}}>
        <Form onSubmit={this.handleSubmit}>
          <input
            name="name"
            placeholder="Post Name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <input
            name="body"
            placeholder="body"
            value={body}
            onChange={this.handleChange}
            required
          />
          <Button color='green' style={{marginTop: "30px"}}>Submit</Button>
        </Form>
      </Container>
    )
  }
}

export default PostForm;