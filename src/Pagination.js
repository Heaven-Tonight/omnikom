import React from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.activePage || 1,
    };
  }
  
  componentDidUpdate(prevProps) {
    const { totalItems, itemsPerPage } = this.props;
    
    if (totalItems !== prevProps.totalItems || itemsPerPage !== prevProps.itemsPerPage) {
      this.setState({ currentPage: 1 });
    }
  }
  
  handleClick = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    this.props.onClick(pageNumber);
  };
  
  render() {
    const { currentPage } = this.state;
    const { itemsPerPage, totalItems } = this.props;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const displayPages = 10;
    const half = Math.floor(displayPages / 2);
    const minPageNumber = 1;
    const startPageNumber = Math.max(minPageNumber, currentPage - half);
    const endPageNumber = Math.min(totalPages, currentPage + half);
    
    if (totalPages <= 1) {
      return null;
    }
    
    const pageNumbers = [];
    for (let i = startPageNumber; i <= endPageNumber; i += 1) {
      pageNumbers.push(i);
    }
    
    const firstPage = pageNumbers[0];
    const lastPage = pageNumbers[pageNumbers.length - 1];
    
    return (
      <div className="pagination">
        {currentPage > 2 &&  firstPage > 1 && <button onClick={() => this.handleClick(minPageNumber)}>1</button>}
        {currentPage > 3 &&  firstPage > 2 && <span>&hellip;</span>}
        {pageNumbers.map((number, index, array) => (
          <React.Fragment key={number}>
            {index > 0 && number !== array[index - 1] + 1 && <span>&hellip;</span>}
            <button
              onClick={() => this.handleClick(number)}
              className={number === currentPage ? 'active' : ''}
            >
              {number}
            </button>
          </React.Fragment>
        ))}
        {totalPages - lastPage > 2 && <span>&hellip;</span>}
        {totalPages - lastPage > 1 && (
          <>
            <button onClick={() => this.handleClick(totalPages - 1)}>{totalPages - 1}</button>
            <button onClick={() => this.handleClick(totalPages)}>{totalPages}</button>
          </>
        )}
        {totalPages - lastPage > 0 && <button onClick={() => this.handleClick(totalPages)}>&raquo;</button>}
      </div>
    );
  }
}

export default Pagination;
