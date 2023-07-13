import React from 'react';
import styles from "./Card.scss"
import { Box, Container } from '@mui/material';

const Card = ({children, cardClass}) => {
  return (
    <Container>
        <Box>    
            {children}
        </Box>
    </Container>
  )
}

export default Card;