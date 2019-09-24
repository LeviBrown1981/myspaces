import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { Header, Image, Card, Button, Icon, } from 'semantic-ui-react';

class Home extends React.Component {
  state = { people: [], };
  
  componentDidMount() {
    axios.get('/api/people')
      .then(res => this.setState({ people: res.data, }))
  }
  
  downVote = (id) => {
    const { cats, } = this.state;
    this.setState({ cats: cats.filter( c => c.id !== id ), });
  }

  upvote = (id) => {
    const { cats, } = this.state;
    axios.put(`/api/cats/${id}`)
      .then( () => this.setState({ cats: cats.filter( c => c.id !== id ), }) )
  }

  sample = () => {
    const { people, } = this.state;

    if (people.length) {
      const index = Math.floor(Math.random() * people.length);
      return people[index];
    } else {
      return null;
    }
  }
  
  render() {
    const person = this.sample();
    if (person) {
      return (
        <div>
          <br />
          <Header as='h1'>person Tinder</Header>
          <br />
          <Card key={person.id}>
            <Image src={person.avatar} />
            <Card.Content>
              <Card.Header>
                { person.name }
              </Card.Header>
              <Card.Description>
                { person.breed }
              </Card.Description>
              <Card.Meta>
                { person.registry }
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <Button color="red" icon basic onClick={() => this.downVote(person.id)}>
              <Icon name="thumbs down" />
            </Button>
            <Button color="green" icon basic onClick={() => this.upvote(person.id)}>
              <Icon name="thumbs up" />
            </Button>
            </Card.Content>
          </Card>
          <Link to="/my_people">
            <Button color="blue">
              My People
            </Button>
          </Link>
        </div>
      );
    } else {
      return <Header textAlign="center">No More People</Header>
    }
  }
}

export default Home;
