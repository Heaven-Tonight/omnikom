import React from 'react';
import tableMixin from './mixins/tableMixin.js';
import paginationMixin from './mixins/paginationMixin.js';
import createReactClass from 'create-react-class';
import Pagination from './Pagination.js';
import axios from 'axios';
import ApiMixinFactory from './mixins/apiMixin.js';

const apiMixin = new ApiMixinFactory().getApiMixin(axios);

const App = createReactClass({
  mixins: [tableMixin, paginationMixin, apiMixin],
  
  render: function () {
    const start = this.state.itemsPerPage * (this.state.activePage - 1);
    const end = start + this.state.itemsPerPage;
    
    return (
      <div>
        <label htmlFor="#search">Поиск</label>
        <br />
        <input id="search" onChange={this.handleSearchChange} type="string" value={this.state.value} />
        <div>{this.renderTable(this.state.universities.slice(start, end))}</div>
        <Pagination
          itemsPerPage={this.state.itemsPerPage}
          totalItems={this.state.universities.length}
          onClick={this.handleClick}
          activePage={this.getActiveCurrentPage()}
        />
        <div>{this.state.color}</div>
      </div>
    );
  },
});

export default App;
