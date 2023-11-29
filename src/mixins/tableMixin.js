import React from 'react';

const tableMixin = {
  setTable(res) {
    this.setState({
      universities: res,
      totalItems: res.length,
      itemsPerPage: 10,
      activePage: 1,
    });
  },

  handleClick(page) {
    this.setState({
      activePage: page,
    });
  },

  renderTable(rows = []) {
    if (!this.state.universities.length) {
      return null;
    }
    return (
      <table>
        <thead>
        <tr>
          <th>University name</th>
          <th>Country code</th>
          <th>Domains</th>
        </tr>
        </thead>
        <tbody>
        {rows.map((u, id) => (
          <tr key={id}>
            <td>{u.name}</td>
            <td>{u.alpha_two_code}</td>
            <td>
              {u.domains.map((d, index) => (
                <span key={index}>
                  <a href={`https://${d}`} target="_blank" rel="noopener noreferrer">
                    {d}
                  </a>
                  {index < u.domains.length - 1 && ', '}
                </span>
              ))}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  },
};

export default tableMixin;
