import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { ArticleComponent, AdminArticleComponent } from './index';

class AllArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      user: null,
      admin: null,
      allArticles: []
    }

    const data = {}
    axios.post('//localhost:3000/allArticle', data)
      .then(response => {
        if (response.data.success) {
          if(response.data.role === "user"){
            const allArticles = response.data.content;
            this.setState({ allArticles, user: true });
          }
          else if(response.data.role === "admin"){
            const allArticles = response.data.content;
            this.setState({ allArticles, admin: true });
          }
          
        } else {
          this.setState({ error: true })
        }
      })
  }



  render() {
    const { allArticles } = this.state;
    return (

      <div style={{ paddingTop: 60 ,direction:"rtl", textAlign:"right",marginLeft:40 }}>
        <Container>
          <h2 style={{ paddingBottom: 40,color:"teal" }}>همه مقاله ها</h2>

          { this.state.user && allArticles.map(article => { return <ArticleComponent article={article} /> }) }

          { this.state.admin && allArticles.map(article => { return <AdminArticleComponent article={article} /> }) }
          
        </Container>
        {this.state.error && <p style={{ color: 'red' }}>خظا در نمایش همه مقاله ها</p>}
      </div>
    )
  }
}

export { AllArticle };



