import React, { Component } from 'react';
import SpacexLaunch from './space/SpacexLaunch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import querystring from 'querystring';
import './App.css';

const API = "https://api.spacexdata.com/v3/launches?limit=100";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      api: {
        limit: 100,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      },
    }
  }
  componentDidMount() {
    this.fetchAPI(this.state.api);
  }

  fetchAPI(api) {
    const URL = API + querystring.stringify({ ...api });
    this.setState({ isLoaded: false, api });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          data
        });
      });
  }

  updateAPI(type, value) {
    if (this.state.api[type] === value) {
      value = undefined;
    }

    const api = {
      ...this.state.api,
      [type]: value,
    };

    this.fetchAPI(api);
  }

  render() {
    const { isLoaded, data } = this.state;
    const LaunchYear = new Array(16).fill(0).map((item, index) => 2006 + index);

    if (!isLoaded) {
      return <div className="loading">
        <span>Loading....</span>
      </div>
    }

    else {
      return (
        <div className="App">
          <h1 className="App-header">SpaceX Launch Programs</h1>
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={6} lg={3}>
                <Card className="App-filter-card">
                  <Card.Body>
                    <Card.Title className="filter-header">
                      Filters
                    </Card.Title>
                    <Card.Text className="launch-year">
                      Launch Year
                      <hr className="filters-hr" />
                    </Card.Text>

                    <Row>
                      <div className="button-container">
                        {LaunchYear.map((year) => {
                          return (
                            <Button
                              className="button-filter"
                              variant={
                                this.state.api.launch_year ===
                                  year.toString()
                                  ? "success"
                                  : "outline-success"
                              }
                              value={year}
                              onClick={(e) =>
                                this.updateAPI(
                                  "launch_year",
                                  e.target.value
                                )
                              }
                            >
                              {year}
                            </Button>
                          );
                        })}
                      </div>
                    </Row>

                    <Card.Text className="filter-heading">
                      Successful Launch
                      <hr className="filters-hr" />
                    </Card.Text>

                    <div className="button-container">
                      <Button
                        className="button-filter"
                        variant={
                          this.state.api.launch_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateAPI(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="button-filter"
                        variant={
                          this.state.api.launch_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateAPI(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>

                    <Card.Text className="filter-heading">
                      Successful Landing
                      <hr className="filters-hr" />
                    </Card.Text>
                    <div className="button-container">
                      <Button
                        className="button-filter"
                        variant={
                          this.state.api.land_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateAPI("land_success", e.target.value)
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="button-filter"
                        variant={
                          this.state.api.land_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateAPI("land_success", e.target.value)
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Row>
                  {data.map((details) => {
                    return (
                      <Col md={12} lg={3}>
                        <SpacexLaunch details={details} />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
            <div>
              <h5 className="DevelopersName">
                Developed by : Shilpi Dhiman
              </h5>
            </div>
          </Container>


        </div>
      );
    }
  }
}

export default App;
