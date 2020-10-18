import React, { Component } from 'react';
// import { Redirect, Link } from "react-router-dom"; 
// import { useHistory } from "react-router-dom";
import PhotosService from './photoService';
import ImageBlock from './imageBlock';

const photosService = new PhotosService();
class ImageGrid extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            //image_list: [],
            images: {},
            nextPageURL:  '',
            num_pages: 0,
            current_page: props.location.search,//parseInt(props.location.search.split("=")[1]),
        };
        //console.log(props);

        // this.nextPage  =  this.nextPage.bind(this);
        // this.updateState = this.updateState.bind(this);
        this.updateTag = this.updateTag.bind(this);
        this.updateFlag = this.updateFlag.bind(this);
        this.createGrid = this.createGrid.bind(this);
        this.onNavClick = this.onNavClick.bind(this);
    }
    
    componentDidMount() {
        var self = this;
        var dict = {};
        var image_list = [];
        photosService.getPhotos(self.props.location.search).then(function (result) {
            var current_page = self.props.location.search;
            var num_pages = Math.ceil(result.data.num/18);
            if (!current_page || current_page.split("=")[1] < 1 || current_page.split("=")[1] > num_pages) {
                console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', num_pages)
                current_page = "?path=1";
                self.props.history.push({
                    pathname: '/',
                    search: '?path=1',
                })
                //dict = { images: {}, image_list: result.data.image_list, nextPageURL: result.next_page, num_pages: num_pages, current_page: current_page}; 
            }
            image_list = result.data.image_list;
            //var current_page = self.props.location.search; //: (self.props.location.search)? "?path=1"
            dict = { images: {}, nextPageURL: result.next_page, num_pages: num_pages, current_page: current_page}; 
        }).then(function () {
            image_list.forEach((data)=>{//.split("T")[0]
                dict.images[data.pk] = data.fields;
                return data.fields;
            });
            self.setState(state=>(dict));
        })
    }

    updateTag(id, request) {
        //var image = this.state.images[id];
        // var request = {
        //     theme: image.theme,
        //     tagged: !image.tagged,
        //     flagged: image.flagged,
        // };
        const result = photosService.annotatePhoto(id, request)
        
        let tempState = Object.assign({}, this.state);  
        tempState.images[id].tagged = result.tagged;
        this.setState(tempState); 
        console.log(result.tagged, this.state.images[id].tagged)
    }
    
    updateFlag(id) {
        var image = this.state.images[id];
        var request = {
            theme: this.state.images[id].theme,
            tagged: image.tagged,
            flagged: !image.flagged,
        };
        const result = photosService.annotatePhoto(id, request)
        let tempState = Object.assign({}, this.state);  
        tempState.images[id].flagged = result.flagged;
        this.setState(tempState); 
        //console.log(result, this.state.images[id])
    }

    createGrid() {
        //var self = this;
        //var list = this.state.image_list;
        var list = this.state.images;
        //console.log(list.values());
        var result = [];
        for (const [index, image] of list.entries()) {
            result.push(<div key={index} className="grid-item"><ImageBlock image={JSON.stringify(image)} updateTag={this.updateTag} updateFlag={this.updateFlag}/></div>); //<ImageBlock image={JSON.stringify(image)} updateTag={this.updateTag} updateFlag={this.updateFlag}/>
        }
        return result;
    }

    async onNavClick(navPage) {
        var dict = {}
        const result = await photosService.getPhotos("?page="+(navPage).toString());
        //console.log(result)
        dict = { images: {}, image_list: result.data.image_list, nextPageURL: result.next_page, num_pages: Math.ceil(result.data.num/18), current_page: "?page="+(navPage).toString()};
        //console.log(dict); 
        dict.image_list.forEach((data)=>{//.split("T")[0]
            dict.images[data.pk] = data.fields;
            return data.fields;
        });
        //this.createGrid();
        this.setState(dict);
        
    }

    // ()=>{
    //     let tempState = Object.assign({}, this.state);  
    //     tempState.current_page = "/?page="+(current_page-1).toString();
    //     this.setState(tempState);                         
    // }
    // ()=>{ 
    //     let tempState = Object.assign({}, this.state);  
    //     tempState.current_page = "/?page="+(current_page+1).toString();
    //     this.setState(tempState);                      
    // }
    // generateGrids() {
    //     console.log(this.state);
    //     var pages = this.state.num_pages;
    //     var current_page = parseInt(this.state.current_page.split("=")[1]);
    //     var list = this.state.image_list;
    //     //console.log(list.values());
    //     var grids = [];
    //     for (const [index, image] of list.entries()) {
    //         grids.push(<div key={index} className="grid-item"><ImageBlock image={JSON.stringify(image)} updateTag={this.updateTag} updateFlag={this.updateFlag}/></div>); //<ImageBlock image={JSON.stringify(image)} updateTag={this.updateTag} updateFlag={this.updateFlag}/>
    //     }
    //     return grids;
    //     // var pages = this.state.num_pages;
    //     // var current_page = parseInt(this.state.current_page.split("=")[1]);
    //     // var result = [];
    //     // if (current_page > 1) result.push(<button className="navigation" style={{outline: 'none'}} onClick={()=>this.onNavClick(current_page-1)}>Prev</button>);//<a className="navigation" href={}>Prev</a>);<Link to={"/?page="+(current_page-1).toString()}>Prev</Link>
    //     // if (current_page < pages) result.push(<button className="navigation" style={{outline: 'none'}} onClick={()=>this.onNavClick(current_page+1)}>Next</button>);//<Link to={"/?page="+(current_page+1).toString()}></Link><a className="navigation" href={}>Next</a>);
    //     // return result;
    // }

    render() {
        //console.log(this.state);
        var pages = this.state.num_pages;
        var current_page = parseInt(this.state.current_page.split("=")[1]);
        var list = this.state.images;
        //console.log(list.values());
        var grids = [];
        for (const key in list) {
            grids.push(<div key={key} className="grid-item"><ImageBlock image={JSON.stringify({"pk":key, "fields": list[key]})} updateTag={this.updateTag} updateFlag={this.updateFlag}/></div>); //<ImageBlock image={JSON.stringify(image)} updateTag={this.updateTag} updateFlag={this.updateFlag}/>
        }
        //console.log(this.props.location.search)

        return (
            <div className="base-layout">
                <div className="content">
                    <div className="site-header" key={this.props.location.search}>
                        <h1 className="name">Photo Gallery</h1>
                    </div>
                    <div className="grid-container">
                        {grids}
                    </div>
                    <div className="site-footer">
                        {(current_page > 1) ? <a href={"/?page="+(current_page-1).toString()}><button className="navigation" style={{outline: 'none'}}>Prev</button></a> : <p></p>}
                        {(current_page < pages) ? <a href={"/?page="+(current_page+1).toString()}><button className="navigation" style={{outline: 'none'}}>Next</button></a> : <p></p>}
                    </div>
                </div>
            </div>
        );
    }
}
//  <div className="site-footer">
// {(current_page > 1) ? <button onClick={() => history.push("?page="+(current_page-1).toString())}>Prev</button> : <p></p>} 
// {(current_page < pages) ? <button onClick={() => location.search.push("?page="+(current_page+1).toString())}>Next</button> : <p></p>}
// </div>
// <Link onClick={() => location.search.push('/')} to={"?page="+(current_page+1).toString()}>Next</Link> : <p></p>}
//<button className="navigation" style={{outline: 'none'}} onClick={()=>this.onNavClick(current_page-1)}><Link to={"?page="+(current_page-1).toString()}>Prev</Link></button>
//<button className="navigation" style={{outline: 'none'}} onClick={()=>this.onNavClick(current_page+1)}><Link to={"?page="+(current_page+1).toString()}>Next</Link></button> : <p></p>}
//<Link to={"?page="+(current_page-1).toString()}>Prev</Link> : <p></p>}
export default ImageGrid;