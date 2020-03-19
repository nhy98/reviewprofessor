/**
 * @author thucvv
 */
import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { CardBody } from "reactstrap";
import ReactDOM from "react-dom";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

class TwoLineChart extends Component {
  getCardBodyHeight() {
    let node = ReactDOM.findDOMNode(CardBody);
    if (node) {
      console.log("height card body: ", node.clientHeight);

      return node.clientHeight;
    }
    return 0;
  }

  render() {
    const { data, label, labels, colors, nameAxis, isSmall } = this.props;

    let dataset = [
      {
        label: label[0],
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors[0],
        borderColor: colors[0], //"rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors[0],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors[0],
        pointHoverBorderColor: colors[0],
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data[0],
        yAxisID: "y-left"
      },
      {
        label: label[1],
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors[1],
        borderColor: colors[1], //"rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors[1],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors[1],
        pointHoverBorderColor: colors[1],
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data[1],
        yAxisID: "y-right"
      }
    ];

    const datas = {
      labels: labels,
      datasets: dataset
    };

    const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            id: "y-left",
            position: "left",
            ticks: {
              beginAtZero: true,
              min: 0
            },
            scaleLabel: {
              display: true,
              labelString: nameAxis[0]
            }
          },
          {
            id: "y-right",
            position: "right",
            ticks: {
              beginAtZero: true,
              min: 0
            },
            scaleLabel: {
              display: true,
              labelString: nameAxis[1]
            }
          }
        ]
      }
    };

    return (
      <CardBody>
        {/* height: 350 */}
        <div className="chart-wrapper" style={{ height: isSmall ? 350 : 500 }}>
          <Line data={datas} options={options} />
        </div>
      </CardBody>
    );
  }
}

export default TwoLineChart;
