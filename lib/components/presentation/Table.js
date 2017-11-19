import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import classNames from 'classnames';

const Table = ({data}) => {
  return(
    <div className={styles.tableStyle}>
      <table className={styles.tableMain}>
        <thead className={styles.header}>
          <tr>
            <th className={styles.tableHeads}>Coin</th>
            <th className={styles.tableHeads}>Price</th>
            <th className={styles.tableHeads}>Volume</th>
            <th className={styles.tableHeads}>Change</th>
          </tr>
        </thead>
        <tbody className={styles.tabelBodies}>
          {data.map((d, i) => {
            return <tr key={i} className={classNames(styles.rowBlue,{[styles.rowWhite]: (i % 2 == 0)})} >
              <td className={styles.textAlign}>{d.coin}</td>
              <td className={styles.textAlign}>{d.price}</td>
              <td className={styles.textAlign}>{d.vol}</td>
              <td className={classNames(styles.red, {[styles.green]: (d.change > 0)})}>{(d.change > 0) ? '+' + d.change : d.change}</td>
            </tr>;
          })}
        </tbody>
      </table>
      {(data.length < 1 ) ? <div className={styles.LoadingScreen}>Loading Data...</div> : ''}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Table;
