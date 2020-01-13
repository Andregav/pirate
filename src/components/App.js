import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './../styles/styles.scss';
import data from "./data.json";

let slideIndex = 1;
let slides = document.getElementsByClassName("slide");
let newData = data;
let object3 = newData[2];
let arrcountries = object3.coutries;
let newarr = [];
newarr.push(newData[3], newData[4]);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errormessage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.slidesShow = this.slidesShow.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    myChangeHandler(event) {
        this.setState({ username: event.target.value });
    }
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }
    componentDidMount() {
        this.slidesShow();
        this.setAttrubute();
    }
    showSlides(slideIndex) {}

    plusSlides(n) {
        let i;
        let next = document.getElementById("next");
        let prev = document.getElementById("prev");
        let submit = document.getElementById("submit");
        this.showSlides(slideIndex += n);
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";

        if (slideIndex === slides.length) {
            next.style.display = "none";
            submit.style.display = "inline-block";
        } else {
            next.style.display = "block";
            submit.style.display = "none";
        }

        (slideIndex < 2) ? prev.style.display = "none": prev.style.display = "block";
    }

    slidesShow(n) {
        let prev = document.getElementById("prev");
        (slideIndex < 2) ? prev.style.display = "none": prev.style.display = "block";
    }

    submitForm(event) {
        event.preventDefault();
        let newUser = {};
        let allitems = document.getElementsByClassName("form__item");
        newUser.fullName = allitems.name.value;
        newUser.birthDate = allitems.bday.value;
        newUser.place = allitems.coutry.value;
        newUser.email = allitems.email.value;
        newUser.password = allitems.password.value;
        newUser.numberGuests = allitems.number.value;
        newUser.visitDate = allitems.vdaytime.value;
        newUser.feedback = allitems.feedback.value;

        var err = '';


        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const regbdate = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;
        const emailRegex = /^\S+@\S+\.\S+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;
        const numberRegex = /[0-5]/g;
        const feedbackRegex = /[a-zA-Z]/;
        if (!feedbackRegex.test(allitems.feedback.value)) {
            err = <strong className="errormessage">{newData[7].error}</strong>;
            if (!numberRegex.test(allitems.number.value)) {
                err = <strong className="errormessage">{newData[5].error}</strong>;
                if (!passwordRegex.test(allitems.password.value)) {
                    err = <strong className="errormessage">{newData[4].error}</strong>;
                    if (!emailRegex.test(allitems.email.value)) {
                        err = <strong className="errormessage">{newData[3].error}</strong>;
                        if (!regbdate.test(allitems.bday.value)) {
                            err = <strong className="errormessage">{newData[1].error}</strong>;
                            if (!regName.test(allitems.name.value)) {
                                err = <strong className="errormessage">{newData[0].error}</strong>;
                            }
                        }
                    }
                }
            }
        } else {
            console.log(newUser);
        }
        this.setState({ errormessage: err });
    }
    setAttrubute() {
        const password = document.getElementById("password");
        password.setAttribute("autoComplete", "off");
    }


    render() {
        return (
            <div className="form-wrap">
              <form className="form" onSubmit={this.submitForm}>
                <h1 className="form__title">Hi pirate {this.state.username},  before we start let's get to know each other</h1>
                <div className="form__blocks">
                  <div className="form__block-wrap slide">
                  <div className="form__block">
                    <label htmlFor={data[0].name}>{data[0].label}</label>
                    <input
                      type={data[0].type}
                      id={data[0].name}
                      name={data[0].name}
                      onChange={this.myChangeHandler}                      
                      className="form__item"
                    />
                  </div>
                  <div className="form__block">
                    <label htmlFor={data[1].name}>{data[1].label}</label>              
                    <DatePicker
                      id={data[1].name}
                      name={data[1].name}
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      className="form__item"
                      showYearDropdown
                    />
                  </div>
                  <div className="form__block">
                    <label htmlFor="place">{data[2].label}</label>   
                    <select id="place" className="form__item" name={data[2].name}>
                      {
                        arrcountries.map((item) => {
                        return <option key={item} value={item}>{item}</option>
                        })
                      }
                    </select>
                  </div>
                  {this.state.errormessage}
                </div>
                <div className="form__block-wrap slide">
                <h2 className="form__title-email">it’s better to create your account</h2>
                  {
                    newarr.map((account) => {                        
                        return (                          
                            <div className="form__block" key={account.type}>
                              <label htmlFor={account.type}>{account.label}</label>
                              <input 
                              type={account.type}
                              id={account.type}
                              className="form__item"
                              name={account.type}                              
                              />
                            </div>
                          )
                    })
                  } 
                  {this.state.errormessage}                
                </div>
                <div className="form__block-wrap slide">
                <h2 className="form__title-number">{data[5].title}</h2>
                  <div className="form__block">
                    <label htmlFor={data[5].type} >{data[5].label}</label>              
                    <input 
                      type={data[5].type} 
                      name={data[5].type}  
                      min="1" 
                      max="5" 
                      id={data[5].type}
                      className="form__item"
                    />
                  </div>
                  <div className="form__block">
                    <label htmlFor={data[6].name}>{data[6].label}</label>  
                    <DatePicker
                      name={data[6].name}
                      id={data[6].name}
                      className="form__item"
                      selected={this.state.startDate}
                      onChange={this.handleChange}                            
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      showTimeInput
                    />                     
                  </div>
                  {this.state.errormessage}
                </div>
                <div className="form__block-wrap slide">                
                  <label htmlFor="feedback">{data[7].label}</label>
                  <textarea 
                    rows="10" 
                    cols="45" 
                    name={data[7].name} 
                    id={data[7].name}
                    className="form__item"
                  >
                  </textarea>
                  {this.state.errormessage}
                </div>
                <button 
                  type='button' 
                  className="prev" 
                  onClick={this.plusSlides.bind(this, -1)} 
                  id="prev"
                >❮</button>
                <button 
                  type='button' 
                  className="next" 
                  onClick={this.plusSlides.bind(this, 1)} 
                  id="next"
                >❯</button>
                </div>
                
                <input
                  type='submit'
                  className="form__submit-button"
                  id="submit"
                  value="Send"
                />
              </form>               
           </div>
        );
    }
}

export default App;