import moment from 'moment';
import { minBy, maxBy, range, sumBy } from 'lodash';

import { formatDouble } from './utils';

const isOneDayRange = (intervalType) => {
  return intervalType === 'hour';
};

const intervalTypeDateFormat = {
  hour: 'HH:00',
  day: 'MM/DD/YYYY',
  month: 'MM/YYYY',
};

const getChartMoments = (series, intervalType) => {
  if (isOneDayRange(intervalType)) {
    return range(24).map(hours =>
      moment().set({ hours }).format(intervalTypeDateFormat.hour));
  }
  const moments = [];
  const minDate = minBy(series, s => moment(s.date)).date;
  const maxDate = maxBy(series, s => moment(s.date)).date;
  let current = moment(minDate).startOf(intervalType);
  const last = moment(maxDate);
  while (current.isSameOrBefore(last)) {
    moments.push(current.format(intervalTypeDateFormat[intervalType]));
    current = current.add(1, intervalType);
  }

  return moments;
};

const getChartSeries = (moments, series, intervalType, fieldsToAggregate) => {
  const chartSeries = {};
  fieldsToAggregate.forEach((field) => {
    chartSeries[field] = [];
  });

  moments.forEach((m) => {
    fieldsToAggregate.forEach((field) => {
      const total = sumBy(
        series.filter(s => (s[field] &&
          m === moment(s.date).format(intervalTypeDateFormat[intervalType]))),
        field,
      );
      chartSeries[field].push(formatDouble(total));
    });
  });

  return chartSeries;
};

export const buildChartSeries = (series, intervalType, fieldsToAggregate) => {
  const chartMoments = getChartMoments(series, intervalType);
  const chartSeries = getChartSeries(chartMoments, series, intervalType, fieldsToAggregate);
  return { chartMoments, chartSeries };
};
