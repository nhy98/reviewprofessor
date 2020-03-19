/**
 * @author thucvv
 */
import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { CardBody } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

class MultiLineChart extends Component {
  render() {
    const { data, label, labels, colors, lineNumber } = this.props;
    let dataset = [];
    for (let i = 0; i < lineNumber; i++) {
      dataset.push({
        label: label[i],
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors[i],
        borderColor: colors[i], //"rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors[i],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors[i],
        pointHoverBorderColor: colors[i],
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data[i],
        yAxisID: ""
      });
    }
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
            }
          },
          {
            id: "y-right",
            position: "right",
            ticks: {
              beginAtZero: true,
              min: 0
            }
          }
        ]
      }
    };

    return (
      <CardBody>
        <div className="chart-wrapper">
          <Line data={datas} options={options} />
        </div>
      </CardBody>
    );
  }
}

export default MultiLineChart;
