var React = require('react')

var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false
    }
  },
  _Search: function(location) {
    var that = this; // grants access to 'this' keyword in the scope of the Promise

    // debugger;
    this.setState({ isLoading: true });

    openWeatherMap.getTemp(location).then(function (temp) {
      that.setState({
        location: location,
        temp: temp,
        isLoading: false
      })
    }, function (errorMessage) {
      that.setState({ isLoading: false });
      alert(errorMessage);
    })
  },
  render: function() {
    var {isLoading, temp, location} = this.state;

    function renderMessage() {
      if (isLoading) {
        return <h3>Fetching weather...</h3>;
      } else if (temp && location) {
        return <WeatherMessage temp={temp} location={location}/>;
      }
    }

    return (
      <div>
        <h3>Weather Component</h3>
        <WeatherForm onSearch={this._Search}/>
        {renderMessage()}
      </div>
    )
  }
});

module.exports = Weather;
