var React = require('react');
var DataHelper = require('./scripts/helpers/DataHelper');
var Graph = require('./scripts/components/Graph');
var testData = require('./scripts/data/test');

var data = DataHelper.process(testData);

React.render(
    <Graph data={data} />,
    document.getElementById('content')
    );