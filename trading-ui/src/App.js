import Chart from 'react-google-charts'
import useFetch from 'use-http'
import './App.css';

function App() {
  const { data, loading, error } = useFetch('http://localhost:8080/api/v1/asset-values/info', {}, [])

  if (loading) {
    return 'loading...'
  }
  if (error) {
    return 'Opps something went wrong'
  }

  const latestValues = data ? [
    ...data.latestValues.map(item => ([
      new Date(item.timestamp),
      item.value
    ]))
  ] : []

  return (
    <div className="App">
      <p>Avg day: {data ? data.avgDay : '-'}</p>
      <p>Avg month: {data ? data.avgMonth : '-'}</p>
      <p>Avg year: {data ? data.avgYear : '-'}</p>
      <div className="chart-wrapper">
        <Chart
          chartType="Line"
          loader={<div>Loading Chart</div>}
          data={[
            [
              { type: 'date', label: 'Day' },
              'Price'
            ],
            ...latestValues
          ]}
          options={{
            width: 900,
            height: 500,
          }}
          rootProps={{ 'data-chart': 'trend' }}
        />
      </div>
    </div>
  );
}

export default App;
