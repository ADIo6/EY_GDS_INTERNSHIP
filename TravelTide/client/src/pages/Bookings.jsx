import React, { useState } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import classnames from 'classnames';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const bookings = {
    all: [
      { id: 1, title: "Beach Resort Stay", status: "Upcoming", details: "3 nights in Bali, starting Jan 20, 2025" },
      { id: 2, title: "City Tour", status: "Completed", details: "Explore NYC on Dec 15, 2024" },
      { id: 3, title: "Mountain Adventure", status: "Canceled", details: "5 days in the Alps, canceled on Dec 10, 2024" },
    ],
    upcoming: [
      { id: 1, title: "Beach Resort Stay", status: "Upcoming", details: "3 nights in Bali, starting Jan 20, 2025" },
    ],
    completed: [
      { id: 2, title: "City Tour", status: "Completed", details: "Explore NYC on Dec 15, 2024" },
    ],
    canceled: [
      { id: 3, title: "Mountain Adventure", status: "Canceled", details: "5 days in the Alps, canceled on Dec 10, 2024" },
    ],
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">My Bookings</h2>
      
      {/* Navigation Tabs */}
      <Nav tabs className="mb-4">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => toggleTab('1')}
          >
            All Bookings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => toggleTab('2')}
          >
            Upcoming
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => toggleTab('3')}
          >
            Completed
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => toggleTab('4')}
          >
            Canceled
          </NavLink>
        </NavItem>
      </Nav>

      {/* Tab Content */}
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            {bookings.all.map((booking) => (
              <Col md="4" className="mb-3" key={booking.id}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{booking.title}</CardTitle>
                    <CardText>{booking.details}</CardText>
                    <span className={`badge bg-${booking.status === "Upcoming" ? "primary" : booking.status === "Completed" ? "success" : "danger"}`}>
                      {booking.status}
                    </span>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            {bookings.upcoming.map((booking) => (
              <Col md="4" className="mb-3" key={booking.id}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{booking.title}</CardTitle>
                    <CardText>{booking.details}</CardText>
                    <span className="badge bg-primary">{booking.status}</span>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            {bookings.completed.map((booking) => (
              <Col md="4" className="mb-3" key={booking.id}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{booking.title}</CardTitle>
                    <CardText>{booking.details}</CardText>
                    <span className="badge bg-success">{booking.status}</span>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            {bookings.canceled.map((booking) => (
              <Col md="4" className="mb-3" key={booking.id}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{booking.title}</CardTitle>
                    <CardText>{booking.details}</CardText>
                    <span className="badge bg-danger">{booking.status}</span>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default Bookings;
