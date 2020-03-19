/**
 * @author thucvv
 */
import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { CardBody } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

class LineChartBody extends Component {
  render() {
    const { data, label, labels, isSmall } = this.props;
    const datas = {
      labels: labels,
      datasets: [
        {
          label: label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data
        }
      ]
    };

    const options = {
      tooltips: {
        enabled: true
        // custom: CustomTooltips
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
          }
        ]
      }
    };

    return (
      <CardBody>
        <div className="chart-wrapper" style={{ height: isSmall ? 350 : 500 }}>
          <Line data={datas} options={options} />
        </div>
      </CardBody>
    );
  }
}

export default LineChartBody;
