import React from 'react';
import axios from 'axios';
import { Card, Divider, Image, } from 'semantic-ui-react';

class MyPeeps extends React.Component {
  state = { peeps: [], };

  componentDidMount() {
    axios.get('/api/my_peeps')
      .then( res => this.setState({ peeps: res.data, }) );
  }

  render() {
    const { peeps, } = this.state;
    return (
      <Card.Group itemsPerRow={4}>
        { peeps.map( peep =>
          <Card key={peep.id}>
            <Image src={peep.avatar} />
            <Card.Content>
              <Divider />
              <Card.Header>
                { peep.name }
              </Card.Header>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    )
  }
}

export default MyPeeps;
