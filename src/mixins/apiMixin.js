import React from 'react';

class ApiMixinFactory {
  getApiMixin(httpClient) {
    return {
      // Добавила этот префикс по просьбе Реакта (dev tools)
      UNSAFE_componentWillMount() {
        this.apiClient = httpClient;
        this.setState({
          universities: [],
          value: 'Russian Federation',
          number: 1,
          activePage: 1,
        });
      },
      
      componentDidMount() {
        this.search();
      },
      
      componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
          this.search();
        }
      },
      
      search() {
        const { value } = this.state;
        
        const baseUrl = 'http://universities.hipolabs.com';
        const url = new URL(baseUrl);
        url.pathname = '/search';
        url.searchParams.append('country', `${value}`);
        
        this.apiClient({
          url: url.href,     //`http://universities.hipolabs.com/search?country=${value}`,
          method: 'GET',
        })
          .then(({ data }) => this.setTable(data))
          .catch((err) =>  console.log(err));
      },
      
      handleSearchChange(e) {
        this.setState({value: e.target.value});
      },
    };
  }
}

export default ApiMixinFactory;
