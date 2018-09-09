import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Exchanger extends React.Component {

    render() {
        return (
            <HorizontalContainer>
                <VerticalContainer>
                    <Body>
                        exchanger
                    </Body>
                </VerticalContainer>
            </HorizontalContainer>
        );
    }

}

const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
`;

const VerticalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Body = styled.div`
    
`;

function mapStateToProps(state) {
    return {
        state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchanger);
