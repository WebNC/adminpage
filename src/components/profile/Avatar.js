import React from 'react'
import Avatar from 'react-avatar-edit'

class AvatarIMG extends React.Component {

    constructor(props) {
        super(props)
        const src = 'http://placehold.it/1000'
        this.state = {
            preview: null,
            src
        }
    }

    onClose = () => {
        this.setState({ preview: null })
    }

    onBeforeFileLoad = elem => {
        const e = elem;
        const {storeAvatarURL} = this.props;
        const {target} = e;
        if (target.files[0].size > 71680) {
            alert("File is too big!");
            e.target.value = "";
        } else {
            storeAvatarURL(target.value)
        }
    }

    componentDidMount = () => {
        const {url} = this.props;
        this.setState({
            src:  url || 'http://placehold.it/1000'
        })
    }

    render() {
        const {src, preview} = this.state;
        return (
            <Avatar
                width={150}
                height={150}
                onClose={this.onClose}
                onBeforeFileLoad={this.onBeforeFileLoad}
                src={src}
                preview={preview}
            />
        )
    }
}


export default AvatarIMG;