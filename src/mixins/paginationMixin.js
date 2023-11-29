const paginationMixin = {
  
  paginate() {
    const { universities, activePage, itemsPerPage } = this.state;
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = activePage * itemsPerPage;
    const paginatedUniversities = universities.slice(startIndex, endIndex);
    this.setState({ universities: paginatedUniversities });
  },
  
  getActiveCurrentPage() {
    const { activePage, itemsPerPage, universities, totalItems } = this.state;
    
    return typeof activePage === 'boolean'
      ? Math.ceil(Number(activePage * itemsPerPage + (universities - totalItems * itemsPerPage * activePage)))
      : activePage;
  },
};

export default paginationMixin;
