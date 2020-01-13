import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import App from './components/App.js';
import Loader from './components/Loader.js';
import sound from './media/yo-ho-ho.mp3';

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = <Loader />;
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState(<App />)
        }, 3000)
    }

    render() {
        return (
            <div>
                { this.state }
                <audio controls className="audio">
                    <source src={sound} type="audio/mpeg"/>
                </audio>
            </div>
        );
    }
}




ReactDOM.render(<Page />, document.getElementById('root'));