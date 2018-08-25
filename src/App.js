import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import logo from './logo.svg';
import Paginations from './components/paginations';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      currentPage: 1,
      lastPage: 4,
      total: 200,
      buttonsCount: 8,
      perPage: 10
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Container>
          <h4 className="title">Generate Pagination Buttons.</h4>
          <Row>
            <Col xs={12} md={{size: 6, offset:3}}>
              <Form className="myForm">
                <Row>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label>Current Page</Label>
                      <Input name="currentPage" value={this.state.currentPage} type="number"/>
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label>Last Page</Label>
                      <Input name="lastPage" value={this.state.lastPage} disabled type="number"/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label>Per Page</Label>
                      <Input name="perPage" type="select" value={this.state.perPage}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label>Total</Label>
                      <Input name="total" type="number" value={this.state.total}/>
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label>Buttons Count</Label>
                      <Input name="buttonCount" type="select" value={this.state.buttonCount}>
                        <option value="10">5</option>
                        <option value="25">8</option>
                        <option value="50">10</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Button color="primary">Generate</Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
        <Container>
          <Col xs={12}>
            <Paginations
              size="sm"
              lastPage={this.state.lastPage}
              perPage={this.state.perPage}
              total={this.state.total}
              buttonsCount={this.state.buttonsCount}
              currentPage={this.state.currentPage}
            />
          </Col>
        </Container>
      </div>
    );
  }
}

export default App;
