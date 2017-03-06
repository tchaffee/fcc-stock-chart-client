import fetchJsonp from 'fetch-jsonp';
/**
 * Version 2.0
 */
var Markit = {};
/**
 * Define the InteractiveChartApi.
 * First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
 * Second argument is duration (int) for how many days of history to retrieve.
 */
Markit.InteractiveChartApi = function (symbols, duration) {
    let returnPromise;
    const chartOptions = this.getChartOptions();
    this.duration = duration;
    let promises = [];

    symbols.forEach(symbol => {
      const symbolUpper = symbol.toUpperCase();

      if (symbol === '') {
        returnPromise = Promise.resolve(null);
      } else {
        returnPromise = this.getData(symbolUpper)
          .then(data => {
            let rtn;
            rtn = this.render(symbolUpper, data, chartOptions);
            return rtn;
          });
        }
      promises.push(returnPromise);
    });

    return Promise.all(promises);

};

Markit.InteractiveChartApi.prototype.getData = function(symbol){

    const params = encodeURI(JSON.stringify(this.getInputParams(symbol)));
    const url = 'http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/jsonp'
     + '?parameters=' + params;


//    {
//        parameters: JSON.stringify( this.getInputParams() )
//    }

    //Make JSON request for timeseries data
    return fetchJsonp(url)
    .then(response => response.json());
};

Markit.InteractiveChartApi.prototype.getInputParams = function(symbol) {
    return {
        Normalized: false,
        NumberOfDays: this.duration,
        DataPeriod: "Day",
        Elements: [
            {
                Symbol: symbol,
                Type: "price",
                Params: ["c"] //ohlc, c = close only
            }
        ]
    }
};

Markit.InteractiveChartApi.prototype._fixDate = function(dateIn) {
    var dat = new Date(dateIn);
    return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
};

Markit.InteractiveChartApi.prototype._getOHLC = function(json) {
    var dates = json.Dates || [];
    var elements = json.Elements || [];
    var chartSeries = [];

    if (elements[0]){

        for (var i = 0, datLen = dates.length; i < datLen; i++) {
            var dat = this._fixDate( dates[i] );
            var pointData = [
                dat,
//                elements[0].DataSeries['open'].values[i],
//                elements[0].DataSeries['high'].values[i],
//                elements[0].DataSeries['low'].values[i],
                elements[0].DataSeries['close'].values[i]
            ];
            chartSeries.push( pointData );
        };
    }
    return chartSeries;
};

Markit.InteractiveChartApi.prototype.getChartOptions = function() {
  return {
    rangeSelector: {
      selected: 4
    },

/*
    title: {
      text: 'Stock Prices'
    },
*/
    plotOptions: {
      series: {
        compare: 'percent',
        showInNavigator: true
      }
    },
/*
    yAxis: [{
      title: {
        text: 'Price'
      },
      height: 200,
      lineWidth: 2
    }],
*/
    series: [],
  };

};

Markit.InteractiveChartApi.prototype.render = function(name, data, chartOptions) {
    var ohlc = this._getOHLC(data);

    chartOptions.series.push({
      name: name,
      data: ohlc
    });

    return chartOptions;
};

export default Markit;
