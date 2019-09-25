import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { Header, Image, Card, Button, Icon, Grid, } from 'semantic-ui-react';

class Home extends React.Component {
  state = { peoples: [], };
  
  componentDidMount() {
    axios.get('/api/peoples')
      .then(res => this.setState({ peoples: res.data, }))
  }
  
  downVote = (id) => {
    const { peoples, } = this.state;
    this.setState({ peoples: peoples.filter( p => p.id !== id ), });
  }

  upvote = (id) => {
    const { peoples, } = this.state;
    axios.put(`/api/people/${id}`)
      .then( () => this.setState({ peoples: peoples.filter( p => p.id !== id ), }) )
  }

  sample = () => {
    const { peoples, } = this.state;

    if (peoples.length) {
      const index = Math.floor(Math.random() * peoples.length);
      return peoples[index];
    } else {
      return null;
    }
  }
  
  render() {
    const peoples = this.sample();
    if (peoples) {
      return (
        <Grid columns='three' divided>
          <Grid.Row>
            <Grid.Column>
              <div>
                <br />
                <Header as='h1'>Myspaced</Header>
                <br />
                <Card key={peoples.id}>
                  <Image src={peoples.avatar} />
                  <Card.Content>
                    <Card.Header>
                      { peoples.name }
                    </Card.Header>
                    <Card.Description>
                      { peoples.breed }
                    </Card.Description>
                    <Card.Meta>
                      { peoples.registry }
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                  <Button color="red" icon basic onClick={() => this.downVote(peoples.id)}>
                    <Icon name="thumbs down" />
                  </Button>
                  <Button color="green" icon basic onClick={() => this.upvote(peoples.id)}>
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return <Header textAlign="center">No Peeps</Header>
    }
  }
}

export default Home;
