
// import React from 'react';

// const LoadingSpinner = () => (
//     <div className="center-div">
//         <i className="fa fa-spinner fa-spin" /> Loading...
//       </div>
// );

// export default LoadingSpinner;

import React from 'react';

class LoadingMessage extends React.Component {
    constructor(props) {
        super(props);
        this.enableMessage = this.enableMessage.bind(this);

        this.state = {
            displayMessage: false,
        };

        this.timer = setTimeout (this.enableMessage, 25000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    enableMessage() {
        this.setState({ displayMessage: true });
    }

    render() {
        const { displayMessage } = this.state;
        if (!displayMessage) {
            return null;
        }

        return <div className="center-div">
            <i className="fa fa-spinner fa-spin" /> Loading...
        </div>;
    }
}

export default LoadingMessage;