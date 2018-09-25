import React, { Component } from "react";
import Page from '../../components/page';

import styled from "styled-components";
import logo from "../../assets/logo_yukstay.svg";
import { clearFix } from "polished";
import { Link } from "react-router-dom";
import Axios from "axios";
import Grid from "styled-components-grid";

import breakpoint from "styled-components-breakpoint";

class FAQ extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedQuestion: 0,
      faqs: []
    };
    this.openQuestion = this.openQuestion.bind(this);
  }
  
  getFaqs = (type) => {
    // list of FAQs
    Axios.get("http://yukstay-server.us-east-1.elasticbeanstalk.com/api/v2/faq/"+type).then((response) => {
      let listFaq = response.data.result.list;
      let faqs = [];
      listFaq.map(faq => {
        faqs.push({
          id : faq.id,
          ...faq.fields
        })
      })
      this.setState({
        faqs : faqs
      })
    })
  
  }

  componentWillUpdate(){
    this.getFaqs(this.props.type);
  }

  componentDidMount(){
    this.getFaqs(this.props.type);
  }

  openQuestion(index) {
    this.setState({
    	selectedQuestion: (this.state.selectedQuestion === index ? -1 : index)
    });
  }
  
  render() {
    const faqs = this.state.faqs;

    return (
      <div>
        
        {
          this.props.isHome ?
          <Wrapper>
            <FaqHome>
              <Grid>
                <Grid.Unit size={{ zero: 1 / 1, md: 1 / 2}}>
                  <a href={"/faq/tenant"} >Tenant</a>
                </Grid.Unit>
                <Grid.Unit size={{ zero: 1 / 1, md: 1 / 2 }}>
                  <a href={"/faq/owner"} >Owner</a>
                </Grid.Unit>
                
              </Grid>
            </FaqHome>
            
            
          </Wrapper>
          :
          <Wrapper>
            <Breadcrumb>
              <Link to="/faq">FAQ</Link> &gt; 
              <Link to={"/faq/"+this.props.type}> {this.props.type}</Link>
              
            </Breadcrumb>
              {faqs && faqs.map((item, index) => (
              <Item key={`item-${index}`}>
                <Questions>
                    <p>
                      <Link to={"/faq/"+this.props.type+"/"+item.id}>{item.question}</Link>
                    </p>
                    <p>
                      <span>
                        {((!this.props.id && index == 0) || (this.props.id === item.id)) ? item.question : ''}
                      </span>                    
                      <span dangerouslySetInnerHTML={{__html: ((!this.props.id && index == 0) || (this.props.id === item.id)) ? item.answer.replace(/\n/g, "<br />") : ''}}>
                      </span>
                    </p>
                </Questions>
              </Item>
            ))}
          </Wrapper>
        }
      </div>
    )
  }
}


export default (props) => {
  return (
      <Page id="faq" title="FAQ" description="This is FAQ">
      
        <Header>
          <Nav>
            <Link to="/"><img alt="YukStay" src={logo}/></Link>
            <h1>FAQs</h1>
          </Nav>
          
        </Header>
    
        <Container>
          <FAQ isHome={(props.match.params.type === undefined )} id={(props.match.params.id) ? props.match.params.id : null} match={props.match} type={props.match.params.type} />
        </Container>
      </Page>
    )
  
}

const FaqHome = styled.div`
  div > div {
    a{
      color: #ffffff;
      text-transform: uppercase;
      display:block;
      background: #1278ce;
      margin: 1rem;
      text-align: center;
      border-radius: 24px;
      padding: 0.5rem 0;
    }
  }
`;
const Questions = styled.section`
  ${clearFix()}
  
  p{
    a{
      font-size: 1rem;
    }
    

    ${breakpoint("md")`
      position: fixed;
      top: 5rem;
      right: 0;
      width: 70%;
    `}
  }

  p:first-child{
    cursor: pointer;
    border-bottom: 1px solid #efefef;

    ${breakpoint("md")`
      position: static;
      width: 30%
      border-bottom: none;
    `}
  }

`;

const Header = styled.div`
  text-align: left;
  
  
  h2{
    border-bottom: 1px solid #ccc;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    margin-right: 1.5rem;

    ${breakpoint("md")`
      margin: 0;
      padding: 0;
      border: none;
    `}
  }

  img{
    width: 2rem;
  }

`;

const Wrapper = styled.div`
  position: relative;
  
`;

const Container = styled.div`
  background-color: #ffffff;
  padding: 0 3rem 3rem 3rem;
  min-height: 70vh;
  font-family: Source Sans Pro;

  ${clearFix()}

`;

const Breadcrumb = styled.div`
  font-size: 0.8rem;
  margin-bottom: 1rem;
  
  ${clearFix()}

  a{
    padding: 0 0.5rem;
    color: #717171;
  }
`;

const Nav = styled.div`
  ${clearFix()}
  padding: 1rem 2rem 0 2rem;
  border-bottom: solid 1px #ededed;
  

  img {
    width: 7rem;
  }

  h1{
    font-size: 2rem;
    float: right;
    font-family: Source Sans Pro;
  }

  
  ${breakpoint("md")`
    box-shadow: 5px 10px #888888;
  `}
  
  
`;

const Item = styled.div`
  p{
    color: ${props => props.theme.palette.accent1.fgLight};
    font-size: 0.8rem;
    margin: 0;
    line-height: normal;
    letter-spacing: normal;
    font-weight: normal;
    line-height: 3rem;
    
    text-align: left;

    ${breakpoint("md")`
      border-right: 1px solid #ccc;
      padding-right: 2rem;
      line-height: 2rem;
      border-bottom: 0;
    `}
    
  }
  span{
    color: ${props => props.theme.palette.fgBold};
    font-size: 0.8rem;
    font-size: 0.9rem;
    display: block;
    line-height: 1.8rem;
    border: none;
    
  }
  p:first-child{
    &:hover {
      text-decoration: underline;
      
    }
  }
  p:last-child{
    
    line-height: 1.5rem;
    margin: 0;
    border-right: none;
    padding-right: 2rem;
    background: #fff;
    margin-top: -0.5rem;
    margin-bottom: 1rem;

    ${breakpoint("md")`
      padding: 3rem 4rem 0 4rem;
      margin: 0;
      background: none;
    `}
  
    span:first-child{
      display: none;

      ${breakpoint("md")`
      font-size: 1.5rem;
      margin-bottom: 1rem;
      display: block
    `}
  }
`;









