import React, { Component } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
  Input
} from "reactstrap";

var spotifyApi = new SpotifyWebApi();

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      userId: props.userId,
      artist: props.params.artist,
      searchItem: props.params.artist,
      artists: []
    };
  }

  componentDidMount() {
    // gets search results on mount
    spotifyApi
      .searchArtists(this.state.artist, { limit: 5 })
      .then(response => {
        console.log(response.artists.items);
        this.setState({
          artist: "",
          artists: response.artists.items
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  searchArtist = () => {
    // get search results again if user decides to enter something else
    spotifyApi
      .searchArtists(this.state.artist, { limit: 5 })
      .then(response => {
        console.log(response.artists.items);
        this.setState({
          searchItem: this.state.artist,
          artist: "",
          artists: response.artists.items
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateArtist = e => {
    this.setState({
      artist: e.target.value
    });
  };

  render() {
    return (
      <Container className="mb-5">
        <h1 className="mt-3 text-center">
          Results for {this.state.searchItem}
        </h1>
        <p className="text-center">
          Search for an artist and then click on them to get a list of related
          artists.
        </p>
        {this.state.loggedIn && (
          <div>
            <Row>
              <Col />
              <Col sm="6" lg="5" className="text-center">
                <Input
                  type="text"
                  name="artist"
                  placeholder="Artist Name"
                  className="rounded-0"
                  value={this.state.artist}
                  onChange={this.updateArtist}
                  required
                />
              </Col>
              <Col />
            </Row>
            {this.state.artist && (
              <div className="text-center">
                <Button
                  className="btn badge-pill btn-success btn-lg mt-4"
                  onClick={() => this.searchArtist()}
                >
                  <span id="go" className="p-4 text-uppercase">
                    Search Artist
                  </span>
                </Button>
              </div>
            )}
            <Row className="mt-4">
              {this.state.artists.map((item, index) => (
                <Col sm="6" md="4" lg="3" key={index}>
                  <Card className="mt-4 shadow-sm border-0 rounded-0">
                    <Link to={`/create/${item.id}/${window.location.hash}`}>
                      <CardImg
                        className="rounded-0"
                        top
                        width=""
                        src={
                          item.images.length > 0
                            ? item.images[0].url
                            : "https://a1yola.com/wp-content/uploads/2018/05/default-artist.jpg"
                        }
                        alt=""
                      />
                    </Link>
                    <CardBody>{item.name}</CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    );
  }
}

export default Artist;
