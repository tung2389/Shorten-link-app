import React from 'react';
import './App.css';
import isUrl from 'is-url';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

class App extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            url:undefined,
            shortened_url:undefined
        }
        this.save_url = this.save_url.bind(this);
        this.shorten_url = this.shorten_url.bind(this);
        this.display_short_link = this.display_short_link.bind(this);
    }
    save_url(e)
    {
        this.setState({url:e.target.value});
    }
    async shorten_url()
    {
        if(!isUrl(this.state.url))
        {
            alert("This is not a url");
        }
        else
        {
        let response = await fetch('https://ztz.herokuapp.com/',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                url: this.state.url
            })
        });
        let data = await response.text();
        let new_url = 'ztz.herokuapp.com/' + data;
        this.setState({shortened_url:new_url});
        alert("Your link has been shortened successfully");
        }
    }
    display_short_link()
    {
        if(this.state.shortened_url !== undefined)
        {
            return (<div className = "info">Your short url is {this.state.shortened_url}</div>);
        }
    }
    render(){
        return(
            <div className = "background">
                <AppBar position = "fixed" className = "positionFixed">App for getting shorter links</AppBar>
                {this.display_short_link()}
                <div className = "center">
                <TextField onChange = {this.save_url} label = "Enter your url" className = "input"></TextField>
                </div>
                <div className = "btn_holder">
                <Button color = "primary" variant = "contained" className = "btn" onClick = {this.shorten_url}>Get your short link</Button>
                </div>
            </div>
        );
    }
}
export default App;