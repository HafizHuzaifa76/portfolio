import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'justify',
    fontSize: '1.2em',
    fontWeight: 500,
    marginLeft: '40px',
    top: '10',
    marginTop: 20,
    // Make text container scrollable
    overflowY: 'auto',
    height: '550px', // Set a fixed height for the scroll area
  },
  introImageContainer: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    position: 'sticky', // Make the image container sticky
    top: '0', // Ensure it stays at the top of the column
    height: '100%', // Full height for alignment
    overflow: 'hidden',
  },
  introImage: {
    maxHeight: '100%', // Adjust the max height to fit your design
    width: 'auto',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown children={text} />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col style={styles.introTextContainer}>
                    {parseIntro(data.about)}
                  </Col>
                  <Col style={styles.introImageContainer}>
                    <img src={data?.imageSource} alt="profile" style={styles.introImage} />
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;

// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import { Container, Col, Row } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import Fade from 'react-reveal';
// import Header from './Header';
// import endpoints from '../constants/endpoints';
// import FallbackSpinner from './FallbackSpinner';

// const styles = {
//   introTextContainer: {
//     margin: 10,
//     flexDirection: 'column',
//     whiteSpace: 'pre-wrap',
//     textAlign: 'justify',
//     fontSize: '1.2em',
//     fontWeight: 500,
//     marginLeft: '40px',
//     // Ensure text does not overflow and stays within its container
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//   },
//   introImageContainer: {
//     margin: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     display: 'flex',
//     marginTop: '-30px',
//     // Set a fixed height to ensure the image stays aligned with the text
//     height: '100%',
//     overflow: 'hidden',
//   },
//   introImage: {
//     maxHeight: '100%', // Adjust the max height to fit your design
//     width: 'auto',
//   },
// };

// function About(props) {
//   const { header } = props;
//   const [data, setData] = useState(null);

//   const parseIntro = (text) => (
//     <ReactMarkdown
//       children={text}
//     />
//   );

//   useEffect(() => {
//     fetch(endpoints.about, {
//       method: 'GET',
//     })
//       .then((res) => res.json())
//       .then((res) => setData(res))
//       .catch((err) => err);
//   }, []);

//   return (
//     <>
//       <Header title={header} />
//       <div className="section-content-container">
//         <Container>
//           {data
//             ? (
//               <Fade>
//                 <Row>
//                   <Col style={styles.introTextContainer}>
//                     {parseIntro(data.about)}
//                   </Col>
//                   <Col style={styles.introImageContainer}>
//                     <img src={data?.imageSource} alt="profile" style={styles.introImage} />
//                   </Col>
//                 </Row>
//               </Fade>
//             )
//             : <FallbackSpinner />}
//         </Container>
//       </div>
//     </>
//   );
// }

// About.propTypes = {
//   header: PropTypes.string.isRequired,
// };

// export default About;
