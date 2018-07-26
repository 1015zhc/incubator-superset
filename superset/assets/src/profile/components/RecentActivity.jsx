import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import TableLoader from './TableLoader';

const propTypes = {
  user: PropTypes.object,
};

export default class RecentActivity extends React.PureComponent {
  render() {
    const rowLimit = 50;
    const mutator = function (data) {
      return data
        .filter(row => row.action === 'dashboard' || row.action === 'explore')
        .map(row => ({
          '名称': <a href={row.item_url}>{row.item_title}</a>,
          '类型': row.action,
          '时间': moment.utc(row.time).locale('zh-cn').fromNow(),
          _time: row.time,
        }));
    };
    return (
      <div>
        <TableLoader
          className="table table-condensed"
          mutator={mutator}
          sortable
          dataEndpoint={`/superset/recent_activity/${this.props.user.userId}/?limit=${rowLimit}`}
        />
      </div>
    );
  }
}
RecentActivity.propTypes = propTypes;
