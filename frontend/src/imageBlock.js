import React, { Component } from 'react';
import PhotosService from './photoService';

const photosService = new PhotosService();
class ImageBlock extends Component {
    constructor(props) {
        super(props);
        
        this.state  = {
            image: JSON.parse(props.image),
        };
        // console.log(props);
        this.onFlagClick = this.onFlagClick.bind(this);
        this.onTagClick = this.onTagClick.bind(this);
    }
    
    componentDidMount() {
        var self = this;
        photosService.getPhoto(this.state.image.pk).then(function (result) {
            self.setState({ image: result.data })
        });
    }

    // componentWillUnmount() {
    //     var request = {
    //         theme: this.state.image.fields.theme,
    //         tagged: this.state.image.fields.tagged,
    //         flagged: this.state.image.fields.flagged,
    //     };
    //     photosService.annotatePhoto(this.state.image.pk, request)
    //     // this.props.updateTag(this.state.image.pk, request);
    //     // this.props.updateFlag(this.state.image.pk, request);
    // }

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props !== prevProps) {
    //         let tempState = Object.assign({}, JSON.parse(this.props.image));  
    //         //tempState.image.fields.tagged = !tempState.image.fields.tagged;  
    //         //console.log({'temp': tempState});   
    //         this.setState(tempState);
    //         //console.log("diff", tempState, this.state)
    //         //this.fetchData(this.props.userID);
    //     }
    // }
    // componentWillUnmount

    onTagClick() {
        // here you know which component is that, so you can call parent method
        //console.log(this.state.image.pk)
        //console.log(this.state);
        
        let tempState = Object.assign({}, this.state);  
        tempState.image.fields.tagged = !tempState.image.fields.tagged;  
        //console.log({'temp': tempState});   
        this.setState(tempState);
        // let tempState = Object.assign({}, this.state);  
        // tempState.fields.tagged = !tempState.fields.tagged;  
        // console.log({'temp': tempState});
        // this.setState(tempState);
        //console.log(this.state);
        console.log("tag", this.state.image.fields.tagged);
        var request = {
            theme: this.state.image.fields.theme,
            tagged: this.state.image.fields.tagged,
            flagged: this.state.image.fields.flagged,
        };
        this.props.updateTag(this.state.image.pk, request);
        // var image = this.state.image;
        // var request = {
        //     theme: image.fields.theme,
        //     tagged: !image.fields.tagged,
        //     flagged: image.fields.flagged,
        // };
        // await photosService.annotatePhoto(image.pk, request)
        //console.log("tag", this.props, this.state.image.fields);

        // this.forceUpdate();
    }
    
    onFlagClick() {
        //console.log("flag");
        // here you know which component is that, so you can call parent method
        //console.log(this.state.image.pk)
        let tempState = Object.assign({}, this.state);  
        tempState.image.fields.flagged = !tempState.image.fields.flagged;  
        //console.log({'temp': tempState});   
        this.setState(tempState);
        this.props.updateFlag(this.state.image.pk);
        //this.createGrid();
        // this.forceUpdate();
    }

    // createGrid() {
    //     var result = [];
    //     var image = JSON.parse(this.props.image)
    //     // var image = this.state.image;
    //     //console.log(image);
    //     //console.log(id, data); 
    //     result.push(<div className="image-block">
    //         <div className="image-container">
    //             <img className="image" alt="img/jpg" src={image.fields.url}></img>
    //         </div>
    //         <div className="image-info-bar">
    //             <div className="text">
    //                 <p className="image-detail">Date: {image.fields.date.split("T")[0]}</p>
    //                 <p className="image-detail">Theme: {image.fields.theme}</p>
    //             </div>
    //             <div className="icon-grid-container">
    //                 <div className="icon-grid-item">
    //                     <button className="btn" style={{outline: 'none'}} onClick={this.onTagClick}>
    //                         {image.fields.tagged ? <img className="icon" key="dark_tag" alt="flag" src="https://photogallery-project.s3-us-west-1.amazonaws.com/static/media/Icon_Darken_Tag_2px_Line.png"></img> : <img className="icon" key="tag" alt="tag" src="https://photogallery-project.s3-us-west-1.amazonaws.com/static/media/Icon_Tag_2px_Line.png"></img>}
    //                     </button>
    //                 </div>
    //                 <div className="icon-grid-item">
    //                     <button className="btn" style={{outline: 'none'}} onClick={this.onFlagClick}>
    //                         {image.fields.flagged ? <img className="icon" key="dark_flag" alt="flag" src="https://photogallery-project.s3-us-west-1.amazonaws.com/static/media/Icon_Darken_BookMark_2px_Line.png"></img> : <img className="icon" key="flag" alt="flag" src="https://photogallery-project.s3-us-west-1.amazonaws.com/static/media/Icon_BookMark_2px_Line.png"></img>}</button></div><div className="icon-grid-item"><button className="btn"><img className="icon" alt="delete" src="https://photogallery-project.s3-us-west-1.amazonaws.com/static/media/Icon_Delete_2px_Line.png"></img>
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>);
    //     return result;
    // }

    render() {
        //var result = this.createGrid();
        //console.log(this.state.image)
        var image = this.state.image;
        return (<div className="image-block">
            <div className="image-container">
                <img className="image" alt="img/jpg" src={image.fields.url}></img>
            </div>
            <div className="image-info-bar">
                <div className="text">
                    <p className="image-detail">Date: {image.fields.date.split("T")[0]}</p>
                    <p className="image-detail">Theme: {image.fields.theme}</p>
                </div>
                <div className="icon-grid-container">
                    <div className="icon-grid-item">
                        <button className="btn" style={{outline: 'none'}} onClick={()=>this.onTagClick()}>
                            {image.fields.tagged ? <img className="icon" key="dark_tag" alt="flag" src="https://photogallerystorage.s3-us-west-1.amazonaws.com/static/media/Icon_Darken_Tag_2px_Line.png"></img> : <img className="icon" key="tag" alt="tag" src="https://photogallerystorage.s3-us-west-1.amazonaws.com/static/media/Icon_Tag_2px_Line.png"></img>}
                        </button>
                    </div>
                    <div className="icon-grid-item">
                        <button className="btn" style={{outline: 'none'}} onClick={()=>this.onFlagClick()}>
                            {image.fields.flagged ? <img className="icon" key="dark_flag" alt="flag" src="https://photogallerystorage.s3-us-west-1.amazonaws.com/static/media/Icon_Darken_BookMark_2px_Line.png"></img> : <img className="icon" key="flag" alt="flag" src="https://photogallerystorage.s3-us-west-1.amazonaws.com/static/media/Icon_BookMark_2px_Line.png"></img>}</button></div><div className="icon-grid-item"><button className="btn"><img className="icon" alt="delete" src="https://photogallerystorage.s3-us-west-1.amazonaws.com/static/media/Icon_Delete_2px_Line.png"></img>
                        </button>
                    </div>
                </div>
            </div>
        </div>);
    }
}
export default ImageBlock;