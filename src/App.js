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
      lastPage: 20,
      total: 200,
      buttonsCount: 8,
      perPage: 10
    }
    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleOnSubmit = this._handleOnSubmit.bind(this);
    this._handleOnGotoPage = this._handleOnGotoPage.bind(this);
  }

  _handleOnChange(e){
    const lastState = {...this.state};
    lastState[e.target.name] = parseInt(e.target.value);
    this.setState({ ...lastState, ...this._generatePaginate(lastState) });
  }
  _generatePaginate({ total, perPage, currentPage }){
    const lastPage = parseInt(total/perPage) + (parseInt(total%perPage)>0?1 : parseInt(total%perPage));
    return {
      lastPage,
      currentPage: lastPage>=currentPage? currentPage: 1
    }
  }

  _handleOnSubmit(e){
    e.preventDefault();
    this.setState({
      ...this._generatePaginate(this.state)
    })
  }

  _handleOnGotoPage(currentPage){
    this.setState({currentPage})
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
            <Col xs={12} md={6}>
              <Form className="myForm" onSubmit={this._handleOnSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label>Current Page</Label>
                      <Input
                        onChange={this._handleOnChange}
                        name="currentPage"
                        value={this.state.currentPage}
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label>Last Page</Label>
                      <Input
                        onChange={this._handleOnChange}
                        name="lastPage"
                        value={this.state.lastPage}
                        disabled
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label>Per Page</Label>
                      <Input
                        onChange={this._handleOnChange}
                        name="perPage"
                        type="select"
                        value={this.state.perPage}
                      >
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
                      <Input
                        onChange={this._handleOnChange}
                        name="total"
                        type="number"
                        value={this.state.total}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label>Buttons Count</Label>
                      <Input
                        onChange={this._handleOnChange}
                        name="buttonsCount"
                        type="select"
                        value={this.state.buttonsCount}
                      >
                        <option value="5">5</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Button color="primary">Generate</Button>
                </FormGroup>
              </Form>
            </Col>
            <Col xs={12} md={6}>
              <Paginations
                size="sm"
                onGotoPage={this._handleOnGotoPage}
                perPage={this.state.perPage}
                total={this.state.total}
                buttonsCount={this.state.buttonsCount}
                currentPage={this.state.currentPage}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
