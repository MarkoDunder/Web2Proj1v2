import React from 'react'
import {ListGroup} from 'react-bootstrap'
function Schedule() {
  return (
    <div>
    <ListGroup>
      <ListGroup.Item>Saturday 5th November</ListGroup.Item>
      <ListGroup.Item>Leeds United 15:00 Bournemouth</ListGroup.Item>
      <ListGroup.Item>Manchester City 15:00 Fulham</ListGroup.Item>
      <ListGroup.Item>Nottingham Forest 15:00 Brentford</ListGroup.Item>
      <ListGroup.Item>Wolverhampton Wanderers	15:00 Brighton and Hove Albion	
</ListGroup.Item>
      <ListGroup.Item>Everton 17:30 Leicester City</ListGroup.Item>
    </ListGroup>
    <br/>
    <ListGroup>
      <ListGroup.Item>Saturday 6th November</ListGroup.Item>
      <ListGroup.Item>Chelsea 12:00 Arsenal</ListGroup.Item>
      <ListGroup.Item>Aston Villa 14:00 Manchester United</ListGroup.Item>
      <ListGroup.Item>Southampton 14:00 Newcastle United</ListGroup.Item>
      <ListGroup.Item>West Ham United	14:00 Crystal Palace</ListGroup.Item>
      <ListGroup.Item>Tottenham Hotspur 16:30 Liverpool</ListGroup.Item> 
    </ListGroup>
    </div>
  )
}

export default Schedule